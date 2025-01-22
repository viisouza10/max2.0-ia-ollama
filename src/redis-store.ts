import { RedisVectorStore } from '@langchain/redis'
import { createClient } from "redis";
import { OllamaEmbeddings } from '@langchain/ollama';


export const redis = createClient({
    url: "redis://127.0.0.1:6379"
})


export const redisVectoreStore = new RedisVectorStore(
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

