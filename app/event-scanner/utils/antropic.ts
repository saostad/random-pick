"use server";

import Anthropic from "@anthropic-ai/sdk";
import { getAnthropicApiKey } from "./utils";
import {
  ApiResponse,
  ErrorResponseSchema,
  ApiSuccessResponseSchema,
} from "../typings/antropic-api";
import { z } from "zod";

export async function antropicImageAnalysis({
  imageBase64,
  imageType,
}: {
  imageBase64: string;
  imageType: "image/jpeg" | "image/png" | "image/gif";
}): Promise<ApiResponse> {
  const anthropic = new Anthropic({ apiKey: getAnthropicApiKey() });

  // get today's date in the format of mm-dd-yyyy
  const today = new Date().toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  const antropicResponse = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20240620",
    max_tokens: 1800,
    temperature: 0,
    system:
      "You are a helpful assistant that extracts text from images and returns a json format of the events, also include a property gcal_link to add to google calendar. remember to just return the json and nothing else. here is the shape of the json: {events: [{name: string, date: string, time: string, location: string, gcal_link: string}]}. if you couldn't find at least one event in the image, return a response in this format: {events: [], error: 'Error description here.'}. FYI today's date is " +
      today +
      ".",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "make sure all the events are in 2024 and timezone is EST.",
          },
          {
            type: "image",
            source: {
              type: "base64",
              media_type: imageType,
              data: imageBase64,
            },
          },
        ],
      },
    ],
  });

  if (antropicResponse.stop_reason !== "end_turn") {
    return {
      events: [],
      error: "Error: " + antropicResponse.stop_reason,
    };
  }

  const contentBlock = antropicResponse.content[0];

  if (!("text" in contentBlock)) {
    return {
      events: [],
      error: "Error: no text in content block",
    };
  }

  try {
    const response = JSON.parse(contentBlock.text);

    // check if error is present
    if ("error" in response) {
      const { success, error, data } = ErrorResponseSchema.safeParse(response);
      if (success) {
        return data;
      } else {
        return {
          events: [],
          error: "Error Parsing Error response: " + error,
        };
      }
    }

    // validate the response
    const { success, data, error } =
      ApiSuccessResponseSchema.safeParse(response);
    if (success) {
      return data;
    } else {
      return {
        events: [],
        error:
          "Error Parsing Event response: " +
          error +
          " " +
          JSON.stringify(response),
      };
    }
  } catch (error) {
    return {
      events: [],
      error: "Error: " + error,
    };
  }
}
