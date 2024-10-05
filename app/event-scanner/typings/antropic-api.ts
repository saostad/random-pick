import { z } from "zod";

const EventSchema = z.object({
  name: z.string(),
  date: z.string(),
  time: z.string(),
  location: z.string(),
  gcal_link: z.string().url(),
});

export const ErrorResponseSchema = z.object({
  // empty array
  events: z.tuple([]),
  error: z.string(),
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

export type Event = z.infer<typeof EventSchema>;

export const ApiSuccessResponseSchema = z.object({
  events: z.array(EventSchema),
});

export type ApiSuccessResponse = z.infer<typeof ApiSuccessResponseSchema>;

export type ApiResponse = ApiSuccessResponse | ErrorResponse;
