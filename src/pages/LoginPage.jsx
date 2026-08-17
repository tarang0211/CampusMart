import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Building2,
  ShieldCheck,
  LogIn,
  ArrowLeft,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { GoogleLogin } from "@react-oauth/google";

export const LoginPage = () => {
  const navigate = useNavigate();

  const { login } = useAuth();
  const { showToast } = useToast();

  const [googleLoading, setGoogleLoading] = useState(false);

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
        throw new Error(data.message || "Google login failed.");
      }

      if (!data.token || !data.user) {
        throw new Error("Invalid response from server.");
      }

      if (data.isNewUser) {
        showToast("Please complete your profile first.", "info");

        navigate("/complete-profile", {
          state: {
            token: data.token,
            user: data.user,
          },
        });

        return;
      }

      login(data.user, data.token);

      showToast("Welcome back to BitMart! 👋", "success");

      navigate("/");
    } catch (error) {
      console.error("Google login error:", error);

      showToast(
        error.message || "Google login failed. Please try again.",
        "error"
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f7f6f2] px-4 py-8 sm:py-10 dark:bg-[#111614]">
      <div className="mx-auto max-w-5xl">

        {/* BACK */}
        <Link
          to="/"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[#77746d] transition-colors hover:text-[#176b5b] dark:text-[#929b95] dark:hover:text-[#3faf91]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to marketplace
        </Link>

        {/* MAIN CARD */}
        <div className="overflow-hidden rounded-2xl border border-[#dedbd3] bg-white shadow-sm dark:border-[#303a35] dark:bg-[#18201d]">

          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* =========================================
                LEFT SIDE
            ========================================= */}

            <div className="flex flex-col justify-between border-b border-[#e5e2da] bg-[#eeece6] p-8 sm:p-10 lg:border-b-0 lg:border-r dark:border-[#303a35] dark:bg-[#151c19]">

              <div>

                {/* BRAND */}

                <Link
                  to="/"
                  className="inline-flex items-center gap-3"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#176b5b] text-white shadow-sm">
                    <span className="text-lg font-bold">
                      B
                    </span>
                  </div>

                  <div className="leading-none">
                    <span className="text-xl font-bold tracking-tight text-[#171717] dark:text-[#f3f4f1]">
                      BIT
                      <span className="text-[#176b5b] dark:text-[#3faf91]">
                        Mart
                      </span>
                    </span>

                    <span className="mt-1 block text-[10px] font-medium text-[#77746d] dark:text-[#8f9993]">
                      BIT Mesra Marketplace
                    </span>
                  </div>
                </Link>


                {/* HERO COPY */}

                <div className="mt-12 max-w-md">

                  <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#176b5b] dark:text-[#3faf91]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#176b5b] dark:bg-[#3faf91]" />
                    Student marketplace
                  </div>

                  <h1 className="text-3xl font-bold leading-[1.15] tracking-tight text-[#171717] sm:text-4xl dark:text-[#f3f4f1]">
                    Your campus.
                    <br />
                    Your marketplace.
                  </h1>

                  <p className="mt-5 max-w-lg text-sm leading-7 text-[#6b6963] sm:text-base dark:text-[#a8afa9]">
                    Buy and sell textbooks, electronics, cycles, hostel
                    essentials and more — directly with students at BIT Mesra.
                  </p>

                </div>


                {/* IMAGE */}

                <div className="mt-9 overflow-hidden rounded-xl border border-[#d8d5cd] bg-[#e5e2da] dark:border-[#35403a] dark:bg-[#202a26]">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000"
                    alt="College students"
                    className="h-48 w-full object-cover"
                  />
                </div>

              </div>


              {/* TRUST */}

              <div className="mt-8 flex items-start gap-3 border-t border-[#d8d5cd] pt-5 dark:border-[#303a35]">

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#dfece8] text-[#176b5b] dark:bg-[#183b32] dark:text-[#3faf91]">
                  <ShieldCheck className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-xs font-bold text-[#363431] dark:text-[#e5e8e5]">
                    Secure student access
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-[#77746d] dark:text-[#8f9993]">
                    BitMart is restricted to verified BIT Mesra student
                    accounts.
                  </p>
                </div>

              </div>

            </div>


            {/* =========================================
                RIGHT SIDE
            ========================================= */}

            <div className="flex items-center justify-center p-8 sm:p-12">

              <div className="w-full max-w-md">

                {/* HEADER */}

                <div className="text-center">

                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#e4efeb] text-[#176b5b] dark:bg-[#183b32] dark:text-[#3faf91]">
                    <LogIn className="h-5 w-5" />
                  </div>

                  <h2 className="mt-5 text-2xl font-bold tracking-tight text-[#171717] dark:text-[#f3f4f1]">
                    Welcome back
                  </h2>

                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#77746d] dark:text-[#929b95]">
                    Sign in with your BIT Mesra Google account to continue.
                  </p>

                </div>


                {/* GOOGLE LOGIN */}

                <div className="mt-8 flex w-full justify-center">

                  <div className="flex w-full justify-center">

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
                    />

                  </div>

                </div>


                {/* LOADING */}

                {googleLoading && (
                  <div className="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-[#77746d] dark:text-[#929b95]">

                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#d6d3cb] border-t-[#176b5b] dark:border-[#35403a] dark:border-t-[#3faf91]" />

                    Signing you in...

                  </div>
                )}


                {/* SECURITY BOX */}

                <div className="mt-7 rounded-xl border border-[#cfe1db] bg-[#f0f6f3] p-4 dark:border-[#285448] dark:bg-[#15332c]">

                  <div className="flex items-start gap-3">

                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#176b5b] dark:text-[#3faf91]" />

                    <div>

                      <p className="text-xs font-bold text-[#285c50] dark:text-[#8bd1bd]">
                        BIT Mesra accounts only
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#58736b] dark:text-[#9db9b1]">
                        Only verified{" "}
                        <strong className="font-semibold text-[#176b5b] dark:text-[#8bd1bd]">
                          @bitmesra.ac.in
                        </strong>{" "}
                        Google accounts can access BitMart.
                      </p>

                    </div>

                  </div>

                </div>


                {/* DIVIDER */}

                <div className="my-7 flex items-center gap-3">

                  <div className="h-px flex-1 bg-[#e5e2da] dark:bg-[#303a35]" />

                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#aaa69e]">
                    New here?
                  </span>

                  <div className="h-px flex-1 bg-[#e5e2da] dark:bg-[#303a35]" />

                </div>


                {/* REGISTER */}

                <Link
                  to="/register"
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#d6d3cb] bg-white text-sm font-semibold text-[#363431] transition-colors hover:border-[#176b5b] hover:text-[#176b5b] dark:border-[#35403a] dark:bg-[#18201d] dark:text-[#e5e8e5] dark:hover:border-[#3faf91] dark:hover:text-[#3faf91]"
                >
                  <Building2 className="h-4 w-4" />
                  Create College Account
                </Link>


                {/* FOOTNOTE */}

                <p className="mt-5 text-center text-[11px] leading-5 text-[#99968f] dark:text-[#747e78]">
                  By continuing, you agree to use BitMart responsibly and
                  follow campus marketplace guidelines.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};