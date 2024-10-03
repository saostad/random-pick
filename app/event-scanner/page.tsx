"use client";

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import UploadForm, { ApiResponse } from "./components/UploadForm";
import { useState, useEffect } from "react";
import EventsList from "./components/EventsList";
import { getSampleApiResponse } from "./utils/sampleApiResponse";

export default function EventScanner() {
  const [response, setResponse] = useState<ApiResponse | null>(null);

  // useEffect(() => {
  //   if (response && response.success) {
  //     console.log(response.modelResponse);
  //   }
  // }, [response]);

  // useEffect(() => {
  //   // if we are in dev mode, we want to use the sample api response
  //   // eslint-disable-next-line no-process-env
  //   if (process.env.NODE_ENV === "development") {
  //     getSampleApiResponse().then((response) => {
  //       setResponse({ modelResponse: JSON.stringify(response), success: true });
  //     });
  //   }
  // }, []);

  return (
    <ClerkProvider>
      <div className="flex flex-col items-center justify-center">
        <SignedOut>
          <div className="divider"></div>
          <h1 className="text-4xl my-6 font-bold">Event Scanner</h1>
          <h3 className="text-xl mb-6">
            scan handwritten, appointment cards, ...
          </h3>
          <p className="text-xl mb-6">Please sign in to continue</p>
          <SignInButton mode="modal">
            <button className="btn btn-primary btn-lg font-bold text-xl px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition duration-300">
              Sign In
            </button>
          </SignInButton>

          <div className="divider"></div>
        </SignedOut>
        <SignedIn>
          <div className="divider"></div>
          <UserButton />
          <div className="divider"></div>
          <h1 className="text-4xl my-6 font-bold">Event Scanner</h1>
          <UploadForm setResponse={setResponse} />
          {response && response.success && (
            <EventsList events={JSON.parse(response.modelResponse).events} />
          )}
        </SignedIn>
      </div>
    </ClerkProvider>
  );
}
