'use server'

import Anthropic from "@anthropic-ai/sdk";
import { getAnthropicApiKey } from "./utils";


export async function antropicImageAnalysis(imageBase64: string): Promise<string> {
  const anthropic = new Anthropic({apiKey: getAnthropicApiKey()});
  const antropicResponse = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20240620",
    max_tokens: 1800,
    temperature: 0,
    system: "You are a helpful assistant that extracts text from images and returns a json format of the events, also include a property gcal_link to add to google calendar, make sure all the events are in 2024 and timezone is EST. remember to just return the json and nothing else.",
    messages: [
      {
      "role": "user",
      "content": [
          {
          "type": "text",
          "text": 'make sure all the events are in 2024 and timezone is EST.'
          },
          {
            "type": "image",
            "source": {
              "type": "base64",
              "media_type": "image/png",
              "data": imageBase64
            }
          }
      ]
      }
    ]
  });

  const contentBlock = antropicResponse.content[0];
  return 'text' in contentBlock ? contentBlock.text : 'no response';
}