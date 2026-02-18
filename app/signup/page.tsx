// // 

// import Link from "next/link";

// export default function Page() {
//   return (
//     <main className="page-bg">
//       <div className="container px-4 py-16">
//         <div className="surface p-8 text-center max-w-xl mx-auto">
//           <h1 className="text-2xl font-extrabold text-[var(--brand-green)]">
//             Coming Soon
//           </h1>
//           <p className="mt-2 text-[var(--brand-olive)]">
//             This feature is not available yet. Please join the waitlist.
//           </p>

//           <div className="mt-6 flex flex-col gap-3">
//             <a
//               href="https://guiderx-waitlist.onrender.com/"
//               target="_blank"
//               rel="noreferrer"
//               className="btn-base btn-book"
//             >
//               Join Waitlist
//             </a>

//             <Link href="/" className="btn-base">
//               Back to Home
//             </Link>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }


import SignUpForm from "@/components/auth/SignUpForm";

export default function SignUpPage() {
  return (
    <main className="page-bg">
      <div className="container px-4 py-12">
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="surface p-6 sm:p-8 text-center">
              <h1 className="text-2xl font-extrabold text-[var(--brand-green)] mb-2">
                Join GuiderX
              </h1>

              <p className="text-[var(--brand-olive)] mb-6">
                We are launching soon 
              </p>

              <SignUpForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
