// "use client";

// import Link from "next/link";
// import { useAuthStore } from "@/app/lib/store/auth";

// import LoginForm from "@/components/auth/LoginForm";
// import ProfileCompletionForm from "@/components/profile/ProfileCompletionForm";

// export default function ProfilePage() {
//   const { userType, profileCompleted } = useAuthStore();
//   const isNewUser = !userType;

//   return (
//     <main className="page-bg">
//       <div className="container px-4 py-12">
//         <div className="min-h-[calc(100vh-80px-280px)] flex items-center justify-center">
//           <div className="w-full max-w-2xl">
//             {isNewUser ? (
//               <div className="surface p-6 sm:p-8">
//                 <div className="text-center mb-6">
//                   <h1 className="mt-1 text-2xl font-extrabold text-[var(--brand-green)]">
//                     Login
//                   </h1>
                  
//                 </div>

//                 <LoginForm />

//                 <div className="mt-5 text-center text-sm text-[var(--brand-olive)]">
//                   Don’t have an account?{" "}
//                   <Link
//                     href="/signup"
//                     className="font-extrabold text-[var(--brand-gold)] hover:opacity-90"
//                   >
//                     Create Account
//                   </Link>
//                 </div>
//               </div>
//             ) : (
//               <>
//                 {!profileCompleted && (
//                   <div className="mb-4 rounded-2xl border border-[var(--brand-gold)]/25 bg-[color-mix(in_oklab,var(--brand-cream)_55%,white)] px-4 py-3 text-sm text-[var(--brand-green)]">
//                     Your profile is incomplete.
//                   </div>
//                 )}

//                 {profileCompleted && (
//                   <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
//                     Your profile is complete.
//                   </div>
//                 )}

//                 <div className="surface p-6 sm:p-8">
//                   <ProfileCompletionForm />
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

import Link from "next/link";

export default function Page() {
  return (
    <main className="page-bg">
      <div className="container px-4 py-16">
        <div className="surface p-8 md:p-10 text-center max-w-xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--brand-green)]">
            Coming Soon
          </h1>

          <p className="mt-2 text-sm md:text-base text-[var(--brand-olive)]">
            This feature is not available yet. Please join the waitlist.
          </p>

          <div className="mt-7 flex flex-col gap-3">
            <a
              href="https://guiderx-waitlist.onrender.com/"
              target="_blank"
              rel="noreferrer"
              className="btn-base btn-book w-full h-12"
            >
              Join Waitlist
            </a>

            <Link
              href="/"
              className="btn-base btn-outline w-full h-12"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}