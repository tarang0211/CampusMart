import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { UserPlus, ShieldCheck } from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(false);

  const handleGoogleSuccess = async (credentialResponse) => {
    if (!credentialResponse?.credential) {
      showToast("Google authentication failed.", "error");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://bitmart-backend-r83h.onrender.com/api/auth/google",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            credential: credentialResponse.credential,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Google authentication failed"
        );
      }

      // ==========================================
      // NEW GOOGLE USER
      // ==========================================

      if (data.isNewUser) {
        localStorage.setItem(
          "BitMart_profile_completion_token",
          data.token
        );

        localStorage.setItem(
          "BitMart_profile_completion_user",
          JSON.stringify(data.user)
        );

        showToast(
          "Google registration successful. Complete your profile.",
          "success"
        );

        navigate("/complete-profile");
        return;
      }

      // ==========================================
      // EXISTING GOOGLE USER
      // ==========================================

      login(data.user, data.token);

      showToast(
        "Google login successful!",
        "success"
      );

      navigate("/");
    } catch (error) {
      console.error("Google registration error:", error);

      showToast(
        error.message || "Something went wrong",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    console.error("Google authentication failed");

    showToast(
      "Google authentication failed. Please try again.",
      "error"
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 sm:p-12">
      <div className="text-center space-y-3 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md shadow-blue-500/30">
          <UserPlus className="w-7 h-7" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
          Create Your BitMart Account
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
          Register using your Google account and complete your
          profile with your phone number and hostel.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex justify-center">
          {loading ? (
            <div className="w-full max-w-sm py-3 rounded-xl border border-gray-200 dark:border-slate-700 text-center text-sm font-semibold text-gray-600 dark:text-gray-300">
              Signing you in with Google...
            </div>
          ) : (
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap={false}
              theme="outline"
              size="large"
              text="continue_with"
              shape="rectangular"
              width="350"
            />
          )}
        </div>

        <div className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-300 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />

          <div>
            <p className="font-semibold mb-1">
              Secure Google Registration
            </p>

            <p>
              Your Google account verifies your identity. We do not
              require a separate email verification link or password
              for registration.
            </p>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500 dark:text-gray-400">
          After Google authentication, new users will be asked to
          provide their phone number and hostel before completing
          registration.
        </div>
      </div>

      <div className="pt-8 text-center text-xs text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
        >
          Log In
        </Link>
      </div>
    </div>
  );
};