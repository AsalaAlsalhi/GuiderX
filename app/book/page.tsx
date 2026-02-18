// "use client";

// import { useMemo, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   MapPin,
//   Navigation,
//   CalendarDays,
//   BadgeCheck,
//   CreditCard,
//   CheckCircle2,
//   ArrowLeft,
//   ArrowRight,
//   ShieldCheck,
// } from "lucide-react";

// /** Mock data */
// type Guide = {
//   id: string;
//   name: string;
//   rating: number;
//   tripsDone: number;
//   status: "available" | "busy";
//   photoUrl?: string;
// };

// type GuideTripUnit = "hours" | "days";
// type GuideTrip = {
//   id: string;
//   name: string;
//   duration: number;
//   unit: GuideTripUnit;
//   places: string[];
// };

// const GUIDES: Guide[] = [
//   {
//     id: "ahmed-bulushi",
//     name: "Ahmed Al Bulushi",
//     rating: 4.9,
//     tripsDone: 87,
//     status: "available",
//     photoUrl: "/oman/01.jpg",
//   },
//   {
//     id: "fatima-lawati",
//     name: "Fatima Al Lawati",
//     rating: 4.7,
//     tripsDone: 63,
//     status: "busy",
//     photoUrl: "/oman/02.jpg",
//   },
//   {
//     id: "rashid-muttrah",
//     name: "Rashid Al Harthy",
//     rating: 4.8,
//     tripsDone: 128,
//     status: "available",
//     photoUrl: "/oman/03.jpg",
//   },
// ];

// const GUIDE_TRIPS: Record<string, GuideTrip[]> = {
//   "ahmed-bulushi": [
//     {
//       id: "t1",
//       name: "Muttrah & Old Muscat",
//       duration: 6,
//       unit: "hours",
//       places: ["Muttrah Souq", "Muttrah Corniche", "Al Alam Palace"],
//     },
//     {
//       id: "t2",
//       name: "Nizwa Day Trip",
//       duration: 1,
//       unit: "days",
//       places: ["Nizwa Fort", "Nizwa Souq", "Bahla Fort"],
//     },
//   ],
//   "fatima-lawati": [
//     {
//       id: "t3",
//       name: "Grand Mosque & Opera House",
//       duration: 5,
//       unit: "hours",
//       places: ["Sultan Qaboos Grand Mosque", "Royal Opera House"],
//     },
//   ],
//   "rashid-muttrah": [
//     {
//       id: "t4",
//       name: "Wadi Shab Adventure",
//       duration: 1,
//       unit: "days",
//       places: ["Wadi Shab", "Tiwi", "Bimmah Sinkhole"],
//     },
//     {
//       id: "t5",
//       name: "Jebel Akhdar (2 Days)",
//       duration: 2,
//       unit: "days",
//       places: ["Jebel Akhdar", "Viewpoints", "Rose Gardens"],
//     },
//   ],
// };

// const steps = [
//   { key: 1, title: "Trip Details", icon: MapPin },
//   { key: 2, title: "Schedule", icon: CalendarDays },
//   { key: 3, title: "Confirm Guide", icon: BadgeCheck },
//   { key: 4, title: "Payment", icon: CreditCard },
// ] as const;

// type StepKey = (typeof steps)[number]["key"];

// type BookingState = {
//   pickup: string;
//   tripId: string;

//   date: string;
//   time: string;

//   paymentMethod: "card" | "cash";
//   agree: boolean;

//   done: boolean;
// };

// const initialState: BookingState = {
//   pickup: "",
//   tripId: "",
//   date: "",
//   time: "",
//   paymentMethod: "card",
//   agree: false,
//   done: false,
// };

// export default function BookPage() {
//   const router = useRouter();
//   const sp = useSearchParams();
//   const guideId = sp.get("guide") || "";

//   const guide = useMemo(
//     () => GUIDES.find((g) => g.id === guideId) ?? null,
//     [guideId]
//   );

//   const trips = useMemo(
//     () => (guideId ? GUIDE_TRIPS[guideId] ?? [] : []),
//     [guideId]
//   );

//   const [step, setStep] = useState<StepKey>(1);
//   const [data, setData] = useState<BookingState>(initialState);
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   const selectedTrip = useMemo(
//     () => trips.find((t) => t.id === data.tripId) ?? null,
//     [trips, data.tripId]
//   );

//   if (!guideId) {
//     return (
//       <main className="page-bg">
//         <div className="container px-4 py-10">
//           <div className="mx-auto max-w-3xl surface p-8">
//             <h1 className="text-2xl font-extrabold text-[var(--brand-green)]">
//               Booking
//             </h1>
//             <p className="mt-2 text-sm text-[var(--brand-olive)]">
//               No guide selected. Please go back to the map and choose a guide.
//             </p>

//             <button
//               type="button"
//               onClick={() => router.push("/map")}
//               className="mt-6 btn-base btn-outline gap-2"
//             >
//               <ArrowLeft className="h-4 w-4" />
//               Back to Map
//             </button>
//           </div>
//         </div>
//       </main>
//     );
//   }

//   function validate(current: StepKey) {
//     const next: Record<string, string> = {};

//     if (current === 1) {
//       if (!data.pickup.trim()) next.pickup = "Pick-up location is required";
//       if (!data.tripId) next.tripId = "Please select a trip";
//     }
//     if (current === 2) {
//       if (!data.date) next.date = "Select a date";
//       if (!data.time) next.time = "Select a time";
//     }
//     if (current === 4) {
//       if (!data.paymentMethod) next.paymentMethod = "Choose payment method";
//       if (!data.agree) next.agree = "Please confirm to continue";
//     }

//     setErrors(next);
//     return Object.keys(next).length === 0;
//   }

//   function goNext() {
//     if (!validate(step)) return;
//     setErrors({});
//     setStep((prev) => (prev < 4 ? ((prev + 1) as StepKey) : prev));
//   }

//   function goPrev() {
//     setErrors({});
//     setStep((prev) => (prev > 1 ? ((prev - 1) as StepKey) : prev));
//   }

//   function finish() {
//     if (!validate(4)) return;
//     setData((p) => ({ ...p, done: true }));
//   }

//   const progressPct = ((step - 1) / (steps.length - 1)) * 100;

//   return (
//     <main className="page-bg">
//       <div className="container px-4 py-8 sm:py-10">
//         <div className="mx-auto max-w-4xl space-y-6">
//           {/* top action */}
//           <div className="flex items-center justify-between">
//             <div />
//             <button
//               type="button"
//               onClick={() => router.push("/map")}
//               className="btn-mini"
//             >
//               <ArrowLeft className="h-4 w-4" />
//               Map
//             </button>
//           </div>

//           {/* Card */}
//           <div className="surface p-5 sm:p-7">
//             {/* Stepper */}
//             <div className="mb-6">
//               <div className="flex items-start justify-between gap-2">
//                 {steps.map((s) => {
//                   const Icon = s.icon;
//                   const active = s.key === step;
//                   const done = s.key < step;

//                   return (
//                     <div key={s.key} className="flex flex-1 flex-col items-center">
//                       <div
//                         className={[
//                           "step-dot",
//                           done ? "step-dot-done" : active ? "step-dot-active" : "",
//                         ].join(" ")}
//                       >
//                         {done ? (
//                           <CheckCircle2 className="h-5 w-5" />
//                         ) : (
//                           <Icon className="h-5 w-5" />
//                         )}
//                       </div>
//                       <div
//                         className={[
//                           "step-title",
//                           active ? "" : "step-title-muted",
//                         ].join(" ")}
//                       >
//                         {s.title}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>

//               <div className="mt-4 progress-rail">
//                 <div className="progress-bar" style={{ width: `${progressPct}%` }} />
//               </div>
//             </div>

//             {/* Body */}
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={data.done ? 999 : step}
//                 initial={{ opacity: 0, x: 35 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -35 }}
//                 transition={{ duration: 0.22 }}
//               >
//                 {data.done ? (
//                   <SuccessCard guide={guide} trip={selectedTrip} data={data} />
//                 ) : (
//                   <>
//                     {step === 1 && (
//                       <Step1
//                         guide={guide}
//                         trips={trips}
//                         data={data}
//                         errors={errors}
//                         onChange={(patch) => setData((p) => ({ ...p, ...patch }))}
//                       />
//                     )}

//                     {step === 2 && (
//                       <Step2
//                         trip={selectedTrip}
//                         data={data}
//                         errors={errors}
//                         onChange={(patch) => setData((p) => ({ ...p, ...patch }))}
//                       />
//                     )}

//                     {step === 3 && <Step3 guide={guide} trip={selectedTrip} data={data} />}

//                     {step === 4 && (
//                       <Step4
//                         guide={guide}
//                         trip={selectedTrip}
//                         data={data}
//                         errors={errors}
//                         onChange={(patch) => setData((p) => ({ ...p, ...patch }))}
//                       />
//                     )}

//                     {/* Footer buttons */}
//                     <div className="mt-8 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
//                       <button
//                         type="button"
//                         onClick={goPrev}
//                         disabled={step === 1}
//                         className="btn-base btn-outline gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
//                       >
//                         <ArrowLeft className="h-4 w-4" />
//                         Previous
//                       </button>

//                       {step < 4 ? (
//                         <button type="button" onClick={goNext} className="btn-base btn-book gap-2">
//                           Next
//                           <ArrowRight className="h-4 w-4" />
//                         </button>
//                       ) : (
//                         <button type="button" onClick={finish} className="btn-base btn-book gap-2">
//                           <ShieldCheck className="h-4 w-4" />
//                           Confirm Booking
//                         </button>
//                       )}
//                     </div>
//                   </>
//                 )}
//               </motion.div>
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

// /* -------- UI pieces -------- */

// function FieldError({ msg }: { msg?: string }) {
//   if (!msg) return null;
//   return <p className="mt-1 text-xs text-red-600">{msg}</p>;
// }

// function Avatar({ name, photoUrl }: { name: string; photoUrl?: string }) {
//   const initials = name
//     .split(" ")
//     .slice(0, 2)
//     .map((s) => s[0]?.toUpperCase())
//     .join("");

//   return (
//     <div className="h-14 w-14 rounded-full overflow-hidden border border-[var(--brand-gold)]/25 bg-white flex items-center justify-center">
//       {photoUrl ? (
//         <img src={photoUrl} alt={name} className="h-full w-full object-cover" />
//       ) : (
//         <span className="text-sm font-extrabold text-[var(--brand-green)]">{initials}</span>
//       )}
//     </div>
//   );
// }

// function Step1({
//   guide,
//   trips,
//   data,
//   errors,
//   onChange,
// }: {
//   guide: Guide | null;
//   trips: GuideTrip[];
//   data: BookingState;
//   errors: Record<string, string>;
//   onChange: (patch: Partial<BookingState>) => void;
// }) {
//   const selectedTrip = useMemo(
//     () => trips.find((t) => t.id === data.tripId) ?? null,
//     [trips, data.tripId]
//   );

//   return (
//     <div className="space-y-5">
//       <div className="rounded-3xl border border-[var(--brand-gold)]/15 bg-white/70 p-4">
//         <div className="flex items-center gap-3">
//           <Avatar name={guide?.name ?? "Guide"} photoUrl={guide?.photoUrl} />
//           <div className="flex-1">
//             <div className="text-sm font-extrabold text-[var(--brand-green)]">
//               {guide?.name ?? "Selected Guide"}
//             </div>
//             <div className="text-xs text-[var(--brand-olive)]">
//               Rating {guide?.rating ?? "-"} · {guide?.tripsDone ?? "-"} trips
//             </div>
//           </div>
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-bold text-[var(--brand-green)]">
//           Pick-up Location *
//         </label>
//         <div className="relative mt-2">
//           <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--brand-olive)]" />
//           <input
//             value={data.pickup}
//             onChange={(e) => onChange({ pickup: e.target.value })}
//             className={["input pl-11", errors.pickup ? "input-error" : ""].join(" ")}
//           />
//         </div>
//         <FieldError msg={errors.pickup} />
//       </div>

//       <div>
//         <label className="block text-sm font-bold text-[var(--brand-green)]">
//           Destination / Trip *
//         </label>

//         <div className="relative mt-2">
//           <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--brand-olive)]" />
//           <select
//             value={data.tripId}
//             onChange={(e) => onChange({ tripId: e.target.value })}
//             className={["input pl-11 pr-10 appearance-none", errors.tripId ? "input-error" : ""].join(" ")}
//           >
//             <option value="" disabled>
//               Select a trip...
//             </option>

//             {trips.length === 0 ? (
//               <option value="" disabled>
//                 No trips available
//               </option>
//             ) : (
//               trips.map((t) => (
//                 <option key={t.id} value={t.id}>
//                   {t.name} · {t.duration} {t.unit}
//                 </option>
//               ))
//             )}
//           </select>

//           <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--brand-olive)]">
//             ▾
//           </span>
//         </div>

//         <FieldError msg={errors.tripId} />

//         {selectedTrip ? (
//           <div className="mt-3 rounded-2xl border border-[var(--brand-gold)]/15 bg-white/70 p-4">
//             <div className="flex items-start justify-between gap-3">
//               <div className="font-extrabold text-[var(--brand-green)]">{selectedTrip.name}</div>
//               <span className="text-xs font-bold text-[var(--brand-olive)]">
//                 {selectedTrip.duration} {selectedTrip.unit}
//               </span>
//             </div>

//             <div className="mt-3 flex flex-wrap gap-2">
//               {selectedTrip.places.slice(0, 6).map((p) => (
//                 <span key={p} className="chip">
//                   {p}
//                 </span>
//               ))}
//               {selectedTrip.places.length > 6 && (
//                 <span className="text-[11px] text-[var(--brand-olive)]">
//                   +{selectedTrip.places.length - 6} more
//                 </span>
//               )}
//             </div>
//           </div>
//         ) : null}
//       </div>
//     </div>
//   );
// }

// function Step2({
//   trip,
//   data,
//   errors,
//   onChange,
// }: {
//   trip: GuideTrip | null;
//   data: BookingState;
//   errors: Record<string, string>;
//   onChange: (patch: Partial<BookingState>) => void;
// }) {
//   return (
//     <div className="space-y-5">
//       <div className="rounded-3xl border border-[var(--brand-gold)]/15 bg-white/70 p-4">
//         <div className="flex items-center gap-2 font-extrabold text-[var(--brand-green)]">
//           <CalendarDays className="h-5 w-5 text-[var(--brand-gold)]" />
//           Trip Scheduling
//         </div>
//         <div className="mt-1 text-sm text-[var(--brand-olive)]">
//           {trip ? (
//             <>
//               <span className="font-bold text-[var(--brand-green)]">{trip.name}</span> ·{" "}
//               {trip.duration} {trip.unit}
//             </>
//           ) : (
//             <span>Select a trip in Step 1 first.</span>
//           )}
//         </div>
//       </div>

//       <div className="grid gap-4 sm:grid-cols-2">
//         <div>
//           <label className="block text-sm font-bold text-[var(--brand-green)]">Date *</label>
//           <input
//             type="date"
//             value={data.date}
//             onChange={(e) => onChange({ date: e.target.value })}
//             className={["input mt-2", errors.date ? "input-error" : ""].join(" ")}
//           />
//           <FieldError msg={errors.date} />
//         </div>

//         <div>
//           <label className="block text-sm font-bold text-[var(--brand-green)]">Time *</label>
//           <input
//             type="time"
//             value={data.time}
//             onChange={(e) => onChange({ time: e.target.value })}
//             className={["input mt-2", errors.time ? "input-error" : ""].join(" ")}
//           />
//           <FieldError msg={errors.time} />
//         </div>
//       </div>
//     </div>
//   );
// }

// function Step3({
//   guide,
//   trip,
//   data,
// }: {
//   guide: Guide | null;
//   trip: GuideTrip | null;
//   data: BookingState;
// }) {
//   const isAvailable = guide?.status === "available";

//   return (
//     <div className="space-y-5">
//       <div className="rounded-3xl border border-[var(--brand-gold)]/15 bg-white/70 p-4">
//         <div className="flex items-center gap-2 font-extrabold text-[var(--brand-green)]">
//           <BadgeCheck className="h-5 w-5 text-[var(--brand-gold)]" />
//           Confirm Guide (Read only)
//         </div>
//       </div>

//       <div className="rounded-3xl border border-[var(--brand-gold)]/15 bg-white p-5">
//         <div className="flex items-center gap-3">
//           <Avatar name={guide?.name ?? "Guide"} photoUrl={guide?.photoUrl} />
//           <div className="flex-1">
//             <div className="text-sm font-extrabold text-[var(--brand-green)]">{guide?.name ?? "-"}</div>
//             <div className="text-xs text-[var(--brand-olive)]">
//               Rating {guide?.rating ?? "-"} · {guide?.tripsDone ?? "-"} trips
//             </div>
//           </div>

//           <span
//             className={[
//               "rounded-full px-3 py-1 text-xs font-extrabold border",
//               isAvailable
//                 ? "border-emerald-200 bg-emerald-50 text-emerald-700"
//                 : "border-gray-200 bg-gray-50 text-gray-700",
//             ].join(" ")}
//           >
//             {isAvailable ? "Available" : "Busy"}
//           </span>
//         </div>

//         <div className="mt-5 grid gap-3 sm:grid-cols-2">
//           <InfoRow label="Pick-up" value={data.pickup || "-"} />
//           <InfoRow label="Date & Time" value={data.date && data.time ? `${data.date} · ${data.time}` : "-"} />
//         </div>

//         <div className="mt-5 rounded-2xl border border-[var(--brand-gold)]/15 bg-[color-mix(in_oklab,var(--brand-cream)_55%,white)] p-4">
//           <div className="flex items-center gap-2 font-bold text-[var(--brand-green)]">
//             <MapPin className="h-4 w-4 text-[var(--brand-gold)]" />
//             Selected Trip
//           </div>

//           {trip ? (
//             <>
//               <div className="mt-2 text-sm font-extrabold text-[var(--brand-green)]">{trip.name}</div>
//               <div className="mt-1 text-xs text-[var(--brand-olive)]">
//                 Duration: {trip.duration} {trip.unit}
//               </div>
//               <div className="mt-3 flex flex-wrap gap-2">
//                 {trip.places.map((p) => (
//                   <span key={p} className="chip">
//                     {p}
//                   </span>
//                 ))}
//               </div>
//             </>
//           ) : (
//             <p className="mt-2 text-sm text-[var(--brand-olive)]">Please select a trip in Step 1.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// function Step4({
//   guide,
//   trip,
//   data,
//   errors,
//   onChange,
// }: {
//   guide: Guide | null;
//   trip: GuideTrip | null;
//   data: BookingState;
//   errors: Record<string, string>;
//   onChange: (patch: Partial<BookingState>) => void;
// }) {
//   return (
//     <div className="space-y-5">
//       <div className="rounded-3xl border border-[var(--brand-gold)]/15 bg-white/70 p-4">
//         <div className="flex items-center gap-2 font-extrabold text-[var(--brand-green)]">
//           <CreditCard className="h-5 w-5 text-[var(--brand-gold)]" />
//           Payment & Confirmation
//         </div>
//         <p className="mt-1 text-sm text-[var(--brand-olive)]">
//           (Mock for now) Later we’ll connect real payment gateway with backend.
//         </p>
//       </div>

//       <div className="rounded-3xl border border-[var(--brand-gold)]/15 bg-white p-5 space-y-4">
//         <div className="grid gap-3 sm:grid-cols-2">
//           <div>
//             <label className="block text-sm font-bold text-[var(--brand-green)]">Payment Method *</label>
//             <select
//               value={data.paymentMethod}
//               onChange={(e) => onChange({ paymentMethod: e.target.value as any })}
//               className={["input mt-2", errors.paymentMethod ? "input-error" : ""].join(" ")}
//             >
//               <option value="card">Card</option>
//               <option value="cash">Cash</option>
//             </select>
//             <FieldError msg={errors.paymentMethod} />
//           </div>

//           <div className="rounded-2xl border border-[var(--brand-gold)]/15 bg-[color-mix(in_oklab,var(--brand-cream)_55%,white)] p-4">
//             <div className="text-xs font-bold text-[var(--brand-olive)]">Summary</div>
//             <div className="mt-1 text-sm font-extrabold text-[var(--brand-green)]">{guide?.name ?? "-"}</div>
//             <div className="mt-1 text-xs text-[var(--brand-olive)]">{trip ? trip.name : "No trip selected"}</div>
//           </div>
//         </div>

//         <label className="flex items-start gap-3 rounded-2xl border border-[var(--brand-gold)]/15 bg-white p-4">
//           <input
//             type="checkbox"
//             checked={data.agree}
//             onChange={(e) => onChange({ agree: e.target.checked })}
//             className="mt-1 h-4 w-4 accent-[var(--brand-green)]"
//           />
//           <div>
//             <div className="text-sm font-extrabold text-[var(--brand-green)]">
//               I confirm the booking details are correct
//             </div>
//             <div className="text-xs text-[var(--brand-olive)]">
//               Later: backend will create booking record + payment integration.
//             </div>
//             <FieldError msg={errors.agree} />
//           </div>
//         </label>
//       </div>
//     </div>
//   );
// }

// function InfoRow({ label, value }: { label: string; value: string }) {
//   return (
//     <div className="rounded-2xl border border-[var(--brand-gold)]/15 bg-[color-mix(in_oklab,white_88%,var(--brand-cream))] px-4 py-3">
//       <div className="text-[11px] font-bold text-[var(--brand-olive)]">{label}</div>
//       <div className="mt-1 text-sm font-extrabold text-[var(--brand-green)]">{value}</div>
//     </div>
//   );
// }

// function SuccessCard({
//   guide,
//   trip,
//   data,
// }: {
//   guide: Guide | null;
//   trip: GuideTrip | null;
//   data: BookingState;
// }) {
//   return (
//     <div className="text-center space-y-4 py-6">
//       <div className="mx-auto h-14 w-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
//         <CheckCircle2 className="h-7 w-7 text-emerald-600" />
//       </div>

//       <h2 className="text-2xl font-extrabold text-[var(--brand-green)]">Booking confirmed</h2>
//       <p className="text-sm text-[var(--brand-olive)]">Your request has been created successfully.</p>

//       <div className="mx-auto max-w-xl rounded-3xl border border-[var(--brand-gold)]/15 bg-white p-5 text-left">
//         <div className="text-sm font-extrabold text-[var(--brand-green)]">Summary</div>
//         <div className="mt-3 grid gap-3 sm:grid-cols-2">
//           <InfoRow label="Guide" value={guide?.name ?? "-"} />
//           <InfoRow label="Trip" value={trip?.name ?? "-"} />
//           <InfoRow label="Pick-up" value={data.pickup || "-"} />
//           <InfoRow label="Schedule" value={data.date && data.time ? `${data.date} · ${data.time}` : "-"} />
//         </div>
//       </div>
//     </div>
//   );
// }

import Link from "next/link";

export default function Page() {
  return (
    <main className="page-bg">
      <div className="container px-4 py-16">
        <div className="surface p-8 text-center max-w-xl mx-auto">
          <h1 className="text-2xl font-extrabold text-[var(--brand-green)]">
            Coming Soon
          </h1>
          <p className="mt-2 text-[var(--brand-olive)]">
            This feature is not available yet. Please join the waitlist.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <a
              href="https://guiderx-waitlist.onrender.com/"
              target="_blank"
              rel="noreferrer"
              className="btn-base btn-book"
            >
              Join Waitlist
            </a>

            <Link href="/" className="btn-base">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

