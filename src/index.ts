import { CSVLoader } from "@langchain/community/document_loaders/fs/csv"
import { DirectoryLoader } from "langchain/document_loaders/fs/directory"
import { TokenTextSplitter } from "langchain/text_splitter"
import { RedisVectorStore } from '@langchain/redis'
import path from "path";
import { createClient } from "redis";
import { OllamaEmbeddings } from '@langchain/ollama';

const loader = new DirectoryLoader(
    path.resolve(__dirname, "../tmp"),
    {
        '.csv': path => new CSVLoader(path, {
            column: "resposta",
            separator: ";"
        })
    }
)

async function load() {
    const docs = await loader.load()

    // somente necessario se tiver textos muitos grandes
    const splitter = new TokenTextSplitter({
        encodingName: "cl100k_base",
        chunkSize: 600,
        chunkOverlap: 0
    })

    const spllitedDocuments = await splitter.splitDocuments(docs)

    const redis = createClient({
        url: "redis://127.0.0.1:6379"
    })

    await redis.connect()
    await RedisVectorStore.fromDocuments(
        spllitedDocuments,
        new OllamaEmbeddings({
            model: "nomic-embed-text", // Trocando de llama2 para nomic-embed-text
            baseUrl: "http://localhost:11434", // URL base do Ollama
        }),
        {
            indexName: "faq-embeddings",
            redisClient: redis,
            keyPrefix: "faq:"
        }
    )

    await redis.disconnect()
}

load()