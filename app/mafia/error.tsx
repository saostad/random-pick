"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="prose container mx-auto p-8">
      <h2>Something went wrong!</h2>
      <button
        className="btn btn-lg btn-primary m-4"
        onClick={() => {
          // clear the local storage
          localStorage.clear();
          reset();
        }}
      >
        Try again
      </button>
    </div>
  );
}
