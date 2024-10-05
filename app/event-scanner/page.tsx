"use client";

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import UploadForm from "./components/UploadForm";
import { useState } from "react";
import EventsList from "./components/EventsList";
import { ApiResponse } from "./typings/antropic-api";

export default function EventScanner() {
  const [response, setResponse] = useState<ApiResponse | null>(null);

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
          {response && !("error" in response) && (
            <EventsList events={response.events} />
          )}
          {response && "error" in response && (
            <div className="alert alert-error w-96">{response.error}</div>
          )}
        </SignedIn>
      </div>
    </ClerkProvider>
  );
}
