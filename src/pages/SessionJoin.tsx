import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";

const SessionJoin = () => {
  const { sessionId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate session joining process
    const joinSession = async () => {
      try {
        setLoading(true);
        // Replace this with actual API call to join the session
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API delay

        // Check if sessionId is valid (replace with actual validation logic)
        if (sessionId === "123") {
          console.log("Session joined successfully!");
        } else {
          throw new Error("Invalid session ID.");
        }
      } catch (err: any) {
        setError(err.message || "Failed to join session.");
      } finally {
        setLoading(false);
      }
    };

    joinSession();
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">
          Join Session
        </h1>

        {loading && (
          <div className="text-center">
            <p className="text-gray-600">Joining session...</p>
          </div>
        )}

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm leading-5 font-medium text-red-800">
              {error}
            </div>
          </div>
        )}

        {!loading && !error && (
          <div className="rounded-md bg-green-50 p-4">
            <div className="text-sm leading-5 font-medium text-green-800">
              You have successfully joined the session!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionJoin;
