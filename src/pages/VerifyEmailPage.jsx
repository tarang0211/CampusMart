import React, {
  useEffect,
  useRef,
  useState
} from "react";

import {
  useSearchParams,
  Link
} from "react-router-dom";

export const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();

  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("");

  // Prevent duplicate verification request
  const verificationStarted = useRef(false);

  useEffect(() => {
    const token = searchParams.get("token");

    // Token missing
    if (!token) {
      setStatus("error");
      setMessage("Verification token is missing.");
      return;
    }

    // Prevent React StrictMode from calling API twice
    if (verificationStarted.current) {
      return;
    }

    verificationStarted.current = true;

    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/auth/verify-email?token=${encodeURIComponent(
            token
          )}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Email verification failed."
          );
        }

        // Verification successful
        setStatus("success");
        setMessage(
          data.message ||
            "Email verified successfully."
        );

      } catch (error) {
        console.error(
          "Verification error:",
          error
        );

        setStatus("error");
        setMessage(
          error.message ||
            "Email verification failed."
        );
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="text-center text-white max-w-lg">

        {/* VERIFYING */}
        {status === "verifying" && (
          <>
            <h1 className="text-3xl font-bold mb-4">
              Verifying Email...
            </h1>

            <p className="text-gray-300">
              Please wait while we verify your
              email address.
            </p>
          </>
        )}

        {/* SUCCESS */}
        {status === "success" && (
          <>
            <h1 className="text-3xl font-bold mb-4">
              Email Verified! ✅
            </h1>

            <p className="mb-6 text-gray-300">
              {message}
            </p>

            <Link
              to="/login"
              className="inline-block px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Go to Login
            </Link>
          </>
        )}

        {/* ERROR */}
        {status === "error" && (
          <>
            <h1 className="text-3xl font-bold mb-4">
              Verification Failed ❌
            </h1>

            <p className="mb-6 text-gray-300">
              {message}
            </p>

            <Link
              to="/login"
              className="inline-block px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Go to Login
            </Link>
          </>
        )}

      </div>
    </div>
  );
};

export default VerifyEmailPage;