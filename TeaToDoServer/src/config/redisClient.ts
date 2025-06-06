import { createClient, type RedisClientType } from "redis";

let client: RedisClientType | null = null;

export const initializeRedisClient = async () => {
    if (!client) {
        client = createClient();

        client.on("error", (error) => {
            console.log(error);
        });

        client.on("connect", () => {
            console.log("Redis connected");
        });

        await client.connect();
    };

    return client;
};