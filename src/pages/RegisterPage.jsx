import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import {
  ShieldCheck,
  UserPlus,
  CheckCircle2,
} from "lucide-react";

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
    <div className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-8 bg-[#f4f6f3] dark:bg-[#0b1210]">

      <div className="w-full max-w-5xl bg-[#111916] rounded-3xl border border-[#29332f] shadow-2xl overflow-hidden">

        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* =========================================
              LEFT PANEL
          ========================================= */}

          <div className="bg-[#141c19] border-b lg:border-b-0 lg:border-r border-[#29332f] p-8 sm:p-12 flex flex-col justify-between">

            <div className="space-y-10">

              {/* BRAND */}

              <Link
                to="/"
                className="inline-flex items-center gap-3"
              >
                <div className="w-11 h-11 rounded-xl bg-[#238c76] text-white flex items-center justify-center shadow-lg shadow-emerald-950/30">
                  <span className="text-xl font-extrabold">
                    B
                  </span>
                </div>

                <div className="leading-none">
                  <div className="text-2xl font-extrabold tracking-tight text-white">
                    BIT<span className="text-[#43b99b]">Mart</span>
                  </div>

                  <div className="mt-1.5 text-[11px] font-medium text-[#81918b]">
                    BIT Mesra Marketplace
                  </div>
                </div>
              </Link>

              {/* HERO */}

              <div className="space-y-5">

                <div className="flex items-center gap-2 text-[#42b99a]">
                  <span className="w-2 h-2 rounded-full bg-[#42b99a]" />

                  <span className="text-xs font-extrabold tracking-[0.14em] uppercase">
                    Student Marketplace
                  </span>
                </div>

                <h1 className="text-4xl sm:text-[42px] leading-[1.12] font-extrabold tracking-tight text-[#f3f5f2]">
                  Join your campus.
                  <br />
                  Start trading.
                </h1>

                <p className="max-w-md text-base leading-7 text-[#9aa9a3]">
                  Create your BitMart account and connect directly
                  with students at BIT Mesra to buy and sell
                  textbooks, electronics, cycles, hostel essentials
                  and more.
                </p>

              </div>

              {/* IMAGE */}

              <div className="relative overflow-hidden rounded-2xl border border-[#34413c]">

                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000"
                  alt="Campus students"
                  className="w-full h-52 object-cover opacity-80"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#111916]/70 via-transparent to-transparent" />

              </div>

            </div>

            {/* SECURITY */}

            <div className="flex items-center gap-2.5 pt-8 text-xs font-medium text-[#8fa099]">

              <ShieldCheck className="w-4 h-4 text-[#43b99b]" />

              <span>
                Secure student-only registration
              </span>

            </div>

          </div>

          {/* =========================================
              RIGHT PANEL
          ========================================= */}

          <div className="bg-[#111916] p-8 sm:p-12 flex flex-col justify-center">

            <div className="w-full max-w-md mx-auto space-y-7">

              {/* HEADER */}

              <div className="text-center space-y-3">

                <div className="w-14 h-14 rounded-2xl bg-[#16483d] text-[#43b99b] flex items-center justify-center mx-auto border border-[#236657]">

                  <UserPlus className="w-7 h-7" />

                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#f3f5f2]">
                  Create your account
                </h2>

                <p className="text-sm leading-6 text-[#82918b]">
                  Register securely with your BIT Mesra Google
                  account to get started.
                </p>

              </div>

              {/* GOOGLE LOGIN */}

              <div className="flex justify-center min-h-[48px]">

                {loading ? (
                  <div className="w-full h-12 rounded-xl border border-[#35423d] bg-[#18211e] flex items-center justify-center text-sm font-semibold text-[#a5b2ad]">

                    <span className="mr-2 h-4 w-4 rounded-full border-2 border-[#52615b] border-t-[#43b99b] animate-spin" />

                    Creating your account...

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

              {/* SECURITY CARD */}

              <div className="rounded-2xl border border-[#235c4e] bg-[#12352e] p-4">

                <div className="flex items-start gap-3">

                  <ShieldCheck className="w-5 h-5 text-[#43c2a0] shrink-0 mt-0.5" />

                  <div className="space-y-1.5">

                    <p className="text-sm font-bold text-[#67d0b3]">
                      BIT Mesra accounts only
                    </p>

                    <p className="text-xs leading-5 text-[#9fc2b7]">
                      Only verified{" "}
                      <strong className="text-[#d1e8e1]">
                        @bitmesra.ac.in
                      </strong>{" "}
                      Google accounts can access BitMart.
                    </p>

                  </div>

                </div>

              </div>

              {/* WHAT HAPPENS NEXT */}

              <div className="space-y-3">

                <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#65746e]">
                  What happens next
                </p>

                <div className="space-y-2.5">

                  <div className="flex items-center gap-3">

                    <CheckCircle2 className="w-4 h-4 text-[#43b99b] shrink-0" />

                    <span className="text-xs text-[#9aa8a2]">
                      Authenticate with your college Google account
                    </span>

                  </div>

                  <div className="flex items-center gap-3">

                    <CheckCircle2 className="w-4 h-4 text-[#43b99b] shrink-0" />

                    <span className="text-xs text-[#9aa8a2]">
                      Add your phone number and hostel
                    </span>

                  </div>

                  <div className="flex items-center gap-3">

                    <CheckCircle2 className="w-4 h-4 text-[#43b99b] shrink-0" />

                    <span className="text-xs text-[#9aa8a2]">
                      Start buying and selling on campus
                    </span>

                  </div>

                </div>

              </div>

              {/* DIVIDER */}

              <div className="relative flex items-center py-2">

                <div className="flex-1 border-t border-[#303b36]" />

                <span className="px-4 text-[10px] font-bold tracking-[0.14em] text-[#68766f]">
                  ALREADY REGISTERED?
                </span>

                <div className="flex-1 border-t border-[#303b36]" />

              </div>

              {/* LOGIN */}

              <div className="text-center">

                <Link
                  to="/login"
                  className="text-sm font-bold text-[#43b99b] hover:text-[#62ceb0] transition-colors"
                >
                  Sign in to your account
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};