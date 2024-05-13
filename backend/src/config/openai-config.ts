import { ClientOptions } from "openai";

export const configureOpenAi = (): ClientOptions => {
    const config: ClientOptions = {
        apiKey: process.env.OPEN_AI_SECRET || "",
        organization: process.env.OPEN_AI_ORGANIZATION_ID || "",
    };
    return config;
};