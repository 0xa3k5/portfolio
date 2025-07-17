"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "./button";

interface PasswordWallProps {
  onSuccess: () => void;
}

export default function PasswordWall({ onSuccess }: PasswordWallProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/check-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        onSuccess();
      } else {
        setError("Incorrect password");
      }
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-midnight">
      <div className="max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foam mb-2">Bike Adventures</h1>
          <p className="text-foam/60">
            Enter password to access private content
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              data-error={!!error}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className={`
                    w-full p-4 bg-foam/5 rounded-xl text-foam placeholder-foam/40 focus:outline-none focus:border-daisy transition-colors
                    border border-foam/20 text-lg
                    data-[error=true]:border-red-400/80
                    data-[error=true]:bg-red-400/5
                    `}
              disabled={isLoading}
            />
          </div>

          <Button
            variant="primary"
            type="submit"
            disabled={isLoading || !password}
            className="w-full"
          >
            {isLoading ? "Checking..." : "Access Content"}
          </Button>
          {/* <button
              type="submit"
              disabled={isLoading || !password}
              className="w-full px-4 py-3 bg-daisy text-midnight font-semibold rounded-lg hover:bg-daisy/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Checking..." : "Access Content"}
            </button> */}
        </form>
        <Button
          variant="secondary"
          onClick={() => router.push("/")}
          className="w-full mt-2"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}
