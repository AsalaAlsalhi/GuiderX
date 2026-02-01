"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@//app/lib/store/auth";
import { FcGoogle } from "react-icons/fc";
import { Mail } from "lucide-react";

export default function LoginForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const { setUserType, setProfileCompleted } = useAuthStore();

  const inputClass = (hasError?: boolean) => (hasError ? "input input-error" : "input");

  const onGoogleLogin = async () => {
    setServerError(null);
    setServerSuccess(null);

    try {
      // frontend mock (مثل SignUp)
      setUserType("tourist");
      setProfileCompleted(false);

      setServerSuccess("Logged in (frontend only). Please complete your profile.");
      router.push("/profile");
    } catch (err) {
      console.error(err);
      setServerError("Unexpected error on client.");
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    setServerSuccess(null);

    // validation بسيطة نفس روح SignUp
    if (!email.trim()) {
      setServerError("Email is required");
      return;
    }
    if (!password.trim()) {
      setServerError("Password is required");
      return;
    }

    try {
      // frontend mock (مثل SignUp)
      setUserType("tourist");
      setProfileCompleted(false);

      setServerSuccess("Logged in (frontend only). Please complete your profile.");
      router.push("/profile");
    } catch (err) {
      console.error(err);
      setServerError("Unexpected error on client.");
    }
  };

  return (
    <div className="space-y-5">
      {/* Google button (نفس ستايل أزراركم) */}
      <button
  type="button"
  onClick={onGoogleLogin}
  className="btn-base btn-outline w-full gap-3"
>
  <FcGoogle className="h-5 w-5" />
  <span>Login with Google</span>
</button>


      {/* OR */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-[var(--brand-green)]/10" />
        <span className="text-xs font-semibold text-[var(--brand-olive)]">OR</span>
        <div className="h-px flex-1 bg-[var(--brand-green)]/10" />
      </div>

      {/* Email + Password */}
      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass(false)}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-semibold">Password</label>

            <Link href="#" className="text-sm text-[var(--brand-olive)] hover:opacity-80">
              Forgot Password?
            </Link>
          </div>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass(false)}
          />
        </div>

        {serverError && (
          <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-2xl px-4 py-2">
            {serverError}
          </p>
        )}

        {serverSuccess && (
          <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-2">
            {serverSuccess}
          </p>
        )}

        {/* نفس Create Account بالضبط */}
        <button type="submit"   className="btn-base btn-book w-full disabled:opacity-60 disabled:cursor-not-allowed"
>
          Login
        </button>
      </form>
    </div>
  );
}

