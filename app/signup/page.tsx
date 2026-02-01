import SignUpForm from "@/components/auth/SignUpForm";

export default function SignUpPage() {
  return (
    <main className="page-bg">
      <div className="container px-4 py-12">
        <div className="min-h-[calc(100vh-80px-280px)] flex items-center justify-center">
          <div className="w-full max-w-xl">
            <div className="surface p-6 sm:p-8">
              <div className="text-center mb-6">
                <h1 className="mt-1 text-2xl font-extrabold text-[var(--brand-green)]">
                  Create Account
                </h1>
                <p className="text-[var(--brand-olive)]">
                  Join as a Tourist or a Guide
                </p>
              </div>

              <SignUpForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
