import { redis, redisVectoreStore } from "./redis-store"

async function search() {
    await redis.connect()

    const response = await redisVectoreStore.similaritySearchWithScore(
        "tem garantia?",
        5
    )
    await redis.disconnect()
}
search()