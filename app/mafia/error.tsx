"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container">
      <h2>Something went wrong!</h2>
      <button
        className="btn btn-lg"
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
