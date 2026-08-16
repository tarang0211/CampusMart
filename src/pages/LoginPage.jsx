import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Building2,
  ShieldCheck,
  LogIn,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { GoogleLogin } from "@react-oauth/google";

export const LoginPage = () => {
  const navigate = useNavigate();

  const { login } = useAuth();
  const { showToast } = useToast();

  const [googleLoading, setGoogleLoading] = useState(false);

  // =========================
  // GOOGLE LOGIN
  // =========================

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      setGoogleLoading(true);

      if (!credentialResponse?.credential) {
        throw new Error("Google authentication failed.");
      }

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
          data.message || "Google login failed."
        );
      }

      if (!data.token || !data.user) {
        throw new Error(
          "Invalid response from server."
        );
      }

      // Existing Google user
      if (data.isNewUser) {
        showToast(
          "Please complete your profile first.",
          "info"
        );

        navigate("/complete-profile", {
          state: {
            token: data.token,
            user: data.user,
          },
        });

        return;
      }

      login(data.user, data.token);

      showToast(
        "Welcome back to BitMart! 👋",
        "success"
      );

      navigate("/");
    } catch (error) {
      console.error("Google login error:", error);

      showToast(
        error.message ||
          "Google login failed. Please try again.",
        "error"
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden">

        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* =========================
              LEFT SIDE
          ========================= */}

          <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 sm:p-12 text-white flex flex-col justify-between">

            <div className="space-y-6">

              <Link
                to="/"
                className="inline-flex items-center gap-2.5"
              >
                <div className="w-10 h-10 rounded-xl bg-white text-blue-600 flex items-center justify-center shadow-lg">
                  <Building2 className="w-6 h-6" />
                </div>

                <span className="font-extrabold text-2xl">
                  BitMart
                </span>
              </Link>

              <div className="space-y-2 pt-4">

                <h2 className="text-3xl font-extrabold tracking-tight">
                  Exclusive Marketplace for College Students
                </h2>

                <p className="text-blue-100 text-sm leading-relaxed">
                  Connect directly with hostel mates to buy and sell
                  textbooks, electronics, and room gear effortlessly.
                </p>

              </div>

            </div>

            <div className="my-8">

              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
                alt="Campus Students"
                className="w-full h-48 object-cover rounded-2xl border border-white/20 shadow-xl"
              />

            </div>

            <div className="flex items-center gap-2 text-xs text-blue-200 font-medium">

              <ShieldCheck className="w-4 h-4 text-emerald-400" />

              <span>
                Secure Student Authentication
              </span>

            </div>

          </div>

          {/* =========================
              RIGHT SIDE
          ========================= */}

          <div className="p-8 sm:p-12 flex flex-col justify-center">

            <div className="w-full max-w-md mx-auto space-y-7">

              <div className="text-center space-y-2">

                <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">

                  <LogIn className="w-7 h-7" />

                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Welcome Back
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Sign in securely using your BIT Mesra Google account.
                </p>

              </div>

              {/* GOOGLE LOGIN */}

              <div className="flex justify-center">

                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => {
                    showToast(
                      "Google login failed.",
                      "error"
                    );
                  }}
                  useOneTap={false}
                  theme="outline"
                  size="large"
                  text="continue_with"
                  shape="rectangular"
                  width="100%"
                />

              </div>

              {googleLoading && (
                <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                  Signing in with Google...
                </p>
              )}

              {/* SECURITY MESSAGE */}

              <div className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-300 flex items-start gap-2">

                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />

                <span>
                  Only verified <strong>@bitmesra.ac.in</strong> Google
                  accounts can access BitMart.
                </span>

              </div>

              {/* REGISTER */}

              <div className="pt-2 text-center text-xs text-gray-500 dark:text-gray-400">

                Don't have an account yet?{" "}

                <Link
                  to="/register"
                  className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Create College Account
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};