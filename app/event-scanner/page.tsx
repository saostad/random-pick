"use client";

import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
} from '@clerk/nextjs';
import UploadForm, { ApiResponse } from "./components/UploadForm";
import { useState, useEffect } from 'react';
import EventsList from './components/EventsList';
import { getSampleApiResponse } from './utils/sampleApiResponse';

export default function EventScanner() {
    const [response, setResponse] = useState<ApiResponse | null>(null);

    useEffect(() => {
        if (response && response.success) {
            console.log(response.modelResponse);
        }
    }, [response]);

    useEffect(() => {
        getSampleApiResponse().then((response) => {
            setResponse({modelResponse: JSON.stringify(response), success: true});
        });
    }, []);

    return (
        <ClerkProvider>
            <div className="flex flex-col items-center justify-center">
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
                <div className="divider"></div>
                <h1 className="text-4xl font-bold">Event Scanner</h1>
                <UploadForm setResponse={setResponse} />
                {response && response.success && (
                    <EventsList events={JSON.parse(response.modelResponse).events} />
                )}
                </SignedIn>
            </div>
        </ClerkProvider>
    );
}

