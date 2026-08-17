import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Building,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";
import { HOSTELS } from "../data/dummyData";

export const ProfileCompletionPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();

  const profileToken = localStorage.getItem(
    "BitMart_profile_completion_token"
  );

  const savedUser = localStorage.getItem(
    "BitMart_profile_completion_user"
  );

  let googleUser = null;

  try {
    googleUser = savedUser ? JSON.parse(savedUser) : null;
  } catch (error) {
    console.error("Error reading profile completion user:", error);
  }

  const [phone, setPhone] = useState("");
  const [hostel, setHostel] = useState(
    googleUser?.hostel || "HOSTEL-1"
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!profileToken || !googleUser) {
    return (
      <div className="min-h-[calc(100vh-64px)] w-full bg-[#f5f3ee] px-4 py-10 sm:py-14 dark:bg-[#0f1512]">
        <div className="mx-auto w-full max-w-xl">
          <div className="rounded-3xl border border-[#e3e0d8] bg-white p-8 text-center shadow-sm sm:p-12 dark:border-[#303a35] dark:bg-[#18201d]">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
              <ShieldCheck className="h-8 w-8" />
            </div>

            <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-[#222220] dark:text-white">
              Profile Completion Session Expired
            </h2>

            <p className="mb-7 text-sm leading-relaxed text-[#77746d] dark:text-[#929b95]">
              Please start registration again using your Google account.
            </p>

            <Button
              variant="primary"
              onClick={() => navigate("/register")}
              icon={ShieldCheck}
            >
              Continue with Google
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handlePhoneChange = (e) => {
    const value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 10);

    setPhone(value);

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedPhone = phone.trim();
    const trimmedHostel = hostel.trim();

    if (!trimmedPhone) {
      setError("Phone number is required");
      return;
    }

    if (!/^\d{10}$/.test(trimmedPhone)) {
      setError("Phone number must be exactly 10 digits");
      return;
    }

    if (!trimmedHostel) {
      setError("Hostel / Residence is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://bitmart-backend-r83h.onrender.com/api/auth/complete-profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${profileToken}`,
          },
          body: JSON.stringify({
            phone: trimmedPhone,
            hostel: trimmedHostel,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to complete profile"
        );
      }

      login(data.user, data.token);

      localStorage.removeItem(
        "BitMart_profile_completion_token"
      );

      localStorage.removeItem(
        "BitMart_profile_completion_user"
      );

      showToast(
        "Profile completed successfully! Welcome to BitMart 🎉",
        "success"
      );

      navigate("/");
    } catch (error) {
      console.error("Profile completion error:", error);

      showToast(
        error.message ||
          "Something went wrong. Please try again.",
        "error"
      );

      if (
        error.message?.toLowerCase().includes("expired") ||
        error.message
          ?.toLowerCase()
          .includes("profile completion")
      ) {
        localStorage.removeItem(
          "BitMart_profile_completion_token"
        );

        localStorage.removeItem(
          "BitMart_profile_completion_user"
        );

        setError(
          "Your registration session has expired. Please register again with Google."
        );
      } else {
        setError(
          error.message ||
            "Unable to complete your profile."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] w-full bg-[#f5f3ee] px-4 py-10 sm:py-14 dark:bg-[#0f1512]">
      <div className="mx-auto w-full max-w-2xl">

        <div className="overflow-hidden rounded-3xl border border-[#e3e0d8] bg-white shadow-sm dark:border-[#303a35] dark:bg-[#18201d]">

          {/* HEADER */}
          <div className="px-6 pt-8 text-center sm:px-10 sm:pt-10">

            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8f3ef] text-[#176b5b] dark:bg-[#123b32] dark:text-[#3faf91]">
              <CheckCircle2 className="h-7 w-7" />
            </div>

            <h2 className="text-2xl font-extrabold tracking-tight text-[#222220] sm:text-3xl dark:text-white">
              Complete Your Profile
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#77746d] dark:text-[#929b95]">
              One last step. Add your phone number and hostel
              to complete your BitMart registration.
            </p>

          </div>

          {/* CONTENT */}
          <div className="px-6 pb-8 pt-7 sm:px-10 sm:pb-10">

            {/* GOOGLE ACCOUNT */}
            <div className="mb-6 rounded-2xl border border-[#e3e0d8] bg-[#f7f6f2] p-4 dark:border-[#303a35] dark:bg-[#202a26]">

              <div className="flex items-center gap-4">

                {googleUser?.profilePicture ? (
                  <img
                    src={googleUser.profilePicture}
                    alt="Profile"
                    className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-[#d8e9e3] dark:ring-[#31574e]"
                  />
                ) : (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e8f3ef] text-[#176b5b] dark:bg-[#123b32] dark:text-[#3faf91]">
                    <User className="h-6 w-6" />
                  </div>
                )}

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-[#222220] dark:text-white">
                    {googleUser?.name || "Google User"}
                  </p>

                  <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-[#77746d] dark:text-[#929b95]">
                    <Mail className="h-3.5 w-3.5 shrink-0" />
                    {googleUser?.email || "Google account"}
                  </p>
                </div>

                <div className="ml-auto hidden shrink-0 sm:block">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#cfe5dc] bg-[#edf7f3] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#176b5b] dark:border-[#28594c] dark:bg-[#123b32] dark:text-[#3faf91]">
                    <ShieldCheck className="h-3 w-3" />
                    Verified
                  </span>
                </div>

              </div>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <Input
                label="Phone Number (WhatsApp)"
                name="phone"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                placeholder="9876543210"
                icon={Phone}
                value={phone}
                onChange={handlePhoneChange}
                error={
                  error && !/^\d{10}$/.test(phone)
                    ? error
                    : ""
                }
                required
              />

              {/* HOSTEL */}
              <div className="flex flex-col space-y-1.5">

                <label className="text-xs font-semibold uppercase tracking-wider text-[#4b4b47] dark:text-[#c6ccc8]">
                  Hostel / Residence{" "}
                  <span className="text-rose-500">*</span>
                </label>

                <div className="relative">

                  <Building className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#99968f]" />

                  <select
                    name="hostel"
                    value={hostel}
                    onChange={(e) => {
                      setHostel(e.target.value);

                      if (error) {
                        setError("");
                      }
                    }}
                    className="h-11 w-full appearance-none rounded-xl border border-[#d8d5cc] bg-white pl-11 pr-4 text-sm text-[#222220] outline-none transition-colors focus:border-[#176b5b] focus:ring-2 focus:ring-[#176b5b]/10 dark:border-[#39443f] dark:bg-[#202a26] dark:text-white dark:focus:border-[#3faf91] dark:focus:ring-[#3faf91]/10"
                    required
                  >
                    {HOSTELS.filter(
                      (hostelName) =>
                        hostelName !== "All Hostels"
                    ).map((hostelName) => (
                      <option
                        key={hostelName}
                        value={hostelName}
                      >
                        {hostelName}
                      </option>
                    ))}
                  </select>

                </div>
              </div>

              {/* ERROR */}
              {error && (
                <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-400">
                  {error}
                </div>
              )}

              {/* SECURITY INFO */}
              <div className="flex items-start gap-3 rounded-2xl border border-[#cfe5dc] bg-[#edf7f3] p-4 text-xs text-[#31574e] dark:border-[#28594c] dark:bg-[#123b32] dark:text-[#b5d8cd]">

                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#176b5b] dark:text-[#3faf91]" />

                <div>
                  <p className="mb-1 font-bold text-[#176b5b] dark:text-[#3faf91]">
                    Your Google account is verified
                  </p>

                  <p className="leading-relaxed">
                    Your name and email were obtained directly
                    from Google. Your phone number and hostel
                    are required to complete your BitMart profile.
                  </p>
                </div>

              </div>

              {/* SUBMIT */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={loading}
                icon={CheckCircle2}
                className="!border-[#176b5b] !bg-[#176b5b] !text-white hover:!bg-[#125849] focus:!ring-[#176b5b]/30 py-3 font-bold text-base"
              >
                {loading
                  ? "Completing Profile..."
                  : "Complete Registration"}
              </Button>

            </form>

            <div className="mt-6 text-center">
              <p className="text-[11px] leading-relaxed text-[#99968f] dark:text-[#747e78]">
                Your information is used only to help students
                connect safely within the BitMart campus marketplace.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};