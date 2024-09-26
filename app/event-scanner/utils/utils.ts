/* eslint-disable no-process-env */
import 'server-only';

export const getAnthropicApiKey = () => {
    return process.env.ANTHROPIC_API_KEY;
}