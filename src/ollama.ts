import { Ollama } from '@langchain/ollama'
import { PromptTemplate } from '@langchain/core/prompts'
import { createRetrievalChain } from "langchain/chains/retrieval";
import { redis, redisVectoreStore } from './redis-store';
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";

const ollamaAiChat = new Ollama({
    model: "gemma2", // Trocando de llama2 para nomic-embed-text
    baseUrl: "http://localhost:11434", // URL base do Ollama
    temperature: 0.3,
})

const prompt = new PromptTemplate({
    template: `
        Você responde perguntar sobre minha empresa.
        O usuário esta abrindo um chamado de ajuda.
        Use a faq com perguntar e respostas para responder a pergunta do usuário.
        Se a resposta não for encontrada na faq, responda que você não sabe, não tente inventar uma resposta.

        Contexto:
        {context}

        Pergunta:
        {input}
    `.trim(),
    inputVariables: ['context', 'input'],
})

async function getChain() {


    const combineDocsChain = await createStuffDocumentsChain({
        llm: ollamaAiChat,
        prompt,
    })
    return await createRetrievalChain({
        retriever: redisVectoreStore.asRetriever(),
        combineDocsChain

    })

}


async function main() {
    // Pegar a pergunta dos argumentos da linha de comando
    const pergunta = process.argv[2];

    if (!pergunta) {
        console.log('Por favor, forneça uma pergunta. Exemplo: npm run start "Qual o horário de funcionamento?"');
        process.exit(1);
    }

    const chain = await getChain()
    await redis.connect()
    const response = await chain?.invoke({ input: pergunta });

    console.log(response)

    await redis.disconnect()
}
main()

