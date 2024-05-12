import { ClientOptions } from "openai";

export const configureOpenAi = (): ClientOptions => {
    const config: ClientOptions = {
        apiKey: process.env.OPEN_AI_SECRET || "", // Make sure to provide a default value or handle missing environment variables
        organization: process.env.OPEN_AI_ORGANIZATION_ID || "", // Make sure to provide a default value or handle missing environment variables
    };
    return config;
};