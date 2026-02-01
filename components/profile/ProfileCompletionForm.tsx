"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useAuthStore,
  type TouristProfile,
  type GuideProfile,
} from "@/app/lib/store/auth";
import {
  CheckCircle2,
  UploadCloud,
  Trash2,
  Pencil,
  X,
  Save,
  User,
  ShieldCheck,
  Phone,
  MapPin,
  Languages,
  Briefcase,
  CreditCard,
  Calendar,
  Clock,
} from "lucide-react";

type Mode = "complete" | "edit";

export default function ProfileCompletionForm() {
  const router = useRouter();

  const {
    userType,
    profileCompleted,
    touristProfile,
    guideProfile,
    updateTouristProfile,
    updateGuideProfile,
    setProfileCompleted,
  } = useAuthStore();

  if (!userType) return null;

  const isTourist = userType === "tourist";

  // State
  const initialMode: Mode = profileCompleted ? "edit" : "complete";
  const [mode, setMode] = useState<Mode>(initialMode);
  const [isEditing, setIsEditing] = useState(!profileCompleted);
  const [touristForm, setTouristForm] = useState<TouristProfile>(touristProfile);
  const [guideForm, setGuideForm] = useState<GuideProfile>(guideProfile);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const photoInputRef = useRef<HTMLInputElement | null>(null);
  const docInputRef = useRef<HTMLInputElement | null>(null);

  // Effects
  useEffect(() => setTouristForm(touristProfile), [touristProfile]);
  useEffect(() => setGuideForm(guideProfile), [guideProfile]);
  useEffect(() => {
    setIsEditing(!profileCompleted);
    setMode(profileCompleted ? "edit" : "complete");
  }, [userType, profileCompleted]);

  // Computed
  const requiredFields = useMemo(() => {
    if (isTourist)
      return ["countryOfResidence", "dateOfBirth", "phoneNumber"] as const;

    return [
      "licenseNumber",
      "yearsOfExperience",
      "serviceRegions",
      "languagesSpoken",
      "phoneNumber",
    ] as const;
  }, [isTourist]);

  const progress = useMemo(() => {
    const form = isTourist ? touristForm : guideForm;
    const filled = requiredFields.filter((k) => {
      const v = (form as any)[k];
      return typeof v === "string" ? v.trim().length > 0 : !!v;
    }).length;
    return Math.round((filled / requiredFields.length) * 100);
  }, [requiredFields, isTourist, touristForm, guideForm]);

  // Validation helpers
  function setFieldError(name: string, msg: string) {
    setErrors((p) => ({ ...p, [name]: msg }));
  }
  function clearFieldError(name: string) {
    setErrors((p) => {
      const copy = { ...p };
      delete copy[name];
      return copy;
    });
  }

  const validate = () => {
    const next: Record<string, string> = {};
    const form = isTourist ? touristForm : guideForm;

    requiredFields.forEach((k) => {
      const v = (form as any)[k];
      if (!String(v ?? "").trim()) next[String(k)] = "Required";
    });

    const phone = isTourist ? touristForm.phoneNumber : guideForm.phoneNumber;
    if (phone && !/^\+?\d{7,15}$/.test(phone)) {
      next["phoneNumber"] = "Phone must be digits, optionally starting with +";
    }

    if (isTourist && touristForm.dateOfBirth) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(touristForm.dateOfBirth)) {
        next["dateOfBirth"] = "Invalid date format";
      }
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // File handlers
  const readFileAsDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(String(r.result));
      r.onerror = reject;
      r.readAsDataURL(file);
    });

  const onPickPhoto = async (file: File | null) => {
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setFieldError("profilePhotoDataUrl", "Max 5MB allowed");
      return;
    }
    clearFieldError("profilePhotoDataUrl");

    const dataUrl = await readFileAsDataUrl(file);

    if (isTourist) setTouristForm((p) => ({ ...p, profilePhotoDataUrl: dataUrl }));
    else setGuideForm((p) => ({ ...p, profilePhotoDataUrl: dataUrl }));
  };

  const onRemovePhoto = () => {
    if (isTourist) setTouristForm((p) => ({ ...p, profilePhotoDataUrl: null }));
    else setGuideForm((p) => ({ ...p, profilePhotoDataUrl: null }));
  };

  const onPickDoc = (file: File | null) => {
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setFieldError("verificationDocName", "Max 10MB allowed");
      return;
    }
    clearFieldError("verificationDocName");
    setGuideForm((p) => ({ ...p, verificationDocName: file.name }));
  };

  const onRemoveDoc = () => setGuideForm((p) => ({ ...p, verificationDocName: null }));

  // Actions
  const onCancel = () => {
    setTouristForm(touristProfile);
    setGuideForm(guideProfile);
    setErrors({});
    setShowConfirm(false);
    setToast(null);
    if (profileCompleted) setIsEditing(false);
  };

  const onSaveClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setShowConfirm(true);
  };

  const doSave = () => {
    if (isTourist) updateTouristProfile(touristForm);
    else updateGuideProfile(guideForm);

    const willBeCompleted = progress === 100;
    if (willBeCompleted) setProfileCompleted(true);

    setShowConfirm(false);
    setIsEditing(false);

    setToast(profileCompleted ? "Profile updated successfully ✅" : "Profile completed successfully ✅");
    setTimeout(() => setToast(null), 1500);

    
    if (willBeCompleted) {
      setTimeout(() => {
        if (userType === "guide") router.replace("/guide/dashboard");
        else router.replace("/tourist/dashboard");
      }, 700);
    }
  };

  const currentPhoto = isTourist
    ? touristForm.profilePhotoDataUrl
    : guideForm.profilePhotoDataUrl;

  return (
    <div className="space-y-6">
      {/* Banner for incomplete */}
      {progress < 100 && (
        <div className="surface p-4 border border-[color-mix(in_oklab,var(--brand-gold)_25%,white)]">
          <div className="text-sm font-semibold text-[var(--brand-green)]">
            Your profile is incomplete.
          </div>
          <div className="text-xs text-[var(--brand-olive)] mt-1">
            Complete required fields to unlock core features.
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-[60] flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 shadow-lg">
          <CheckCircle2 className="w-4 h-4" />
          {toast}
        </div>
      )}

      {/* Progress card */}
      <div className="surface p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <div className="text-sm font-extrabold text-[var(--brand-green)]">
                {isTourist ? "Tourist Profile" : "Guide Profile"}
              </div>

              <span
                className={[
                  "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-bold",
                  progress === 100
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-[color-mix(in_oklab,var(--brand-gold)_35%,white)] bg-white text-[var(--brand-green)]",
                ].join(" ")}
              >
                {progress}% completed
              </span>
            </div>

            <div className="mt-3 progress-rail max-w-md">
              <div className="progress-bar" style={{ width: `${progress}%` }} />
            </div>

            {progress < 100 && (
              <div className="mt-2 text-xs text-[var(--brand-olive)]">
                Complete required fields to unlock features.
              </div>
            )}
          </div>

          {!isEditing && (
            <button type="button" onClick={() => setIsEditing(true)} className="btn-base btn-outline">
              <Pencil className="w-4 h-4" />
              Edit
            </button>
          )}
        </div>
      </div>

      {/* Form Section */}
      <div className="space-y-6">
        {/* Photo */}
        <Section title="Profile photo" icon={<User className="w-4 h-4" />}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 rounded-full bg-white border-2 border-[color-mix(in_oklab,var(--brand-gold)_35%,white)] overflow-hidden flex items-center justify-center shadow-sm">
                {currentPhoto ? (
                  <img src={currentPhoto} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <User className="w-10 h-10 text-[var(--brand-olive)]" strokeWidth={2} />
                )}
              </div>
              <div>
                <div className="text-sm font-semibold text-[var(--brand-green)]">
                  Upload your profile photo
                </div>
                {errors.profilePhotoDataUrl && (
                  <div className="mt-2 text-xs text-red-600">{errors.profilePhotoDataUrl}</div>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="flex items-center gap-2">
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onPickPhoto(e.target.files?.[0] ?? null)}
                />
                <button type="button" onClick={() => photoInputRef.current?.click()} className="btn-base btn-outline">
                  <UploadCloud className="w-4 h-4" />
                  Upload
                </button>
                {currentPhoto && (
                  <button type="button" onClick={onRemovePhoto} className="btn-base btn-outline">
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                )}
              </div>
            )}
          </div>
        </Section>

        {/* Tourist */}
        {isTourist ? (
          <Section title="Tourist details" icon={<MapPin className="w-4 h-4" />}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                icon={<MapPin className="w-4 h-4" />}
                label="Country of Residence *"
                value={touristForm.countryOfResidence}
                error={errors.countryOfResidence}
                disabled={!isEditing}
                onChange={(v) => setTouristForm((p) => ({ ...p, countryOfResidence: v }))}
              />

              <Field
                icon={<Calendar className="w-4 h-4" />}
                label="Date of Birth *"
                type="date"
                value={touristForm.dateOfBirth}
                error={errors.dateOfBirth}
                disabled={!isEditing}
                onChange={(v) => setTouristForm((p) => ({ ...p, dateOfBirth: v }))}
              />

              <SelectField
                label="Gender (optional)"
                value={touristForm.gender}
                disabled={!isEditing}
                onChange={(v) => setTouristForm((p) => ({ ...p, gender: v as any }))}
                options={[
                  { label: "Select…", value: "" },
                  { label: "Female", value: "female" },
                  { label: "Male", value: "male" },
                  { label: "Prefer not to say", value: "prefer-not" },
                ]}
              />

              <Field
                icon={<Phone className="w-4 h-4" />}
                label="Phone Number *"
                value={touristForm.phoneNumber}
                error={errors.phoneNumber}
                disabled={!isEditing}
                onChange={(v) => setTouristForm((p) => ({ ...p, phoneNumber: v }))}
              />

              <div className="sm:col-span-2">
                <Field
                  icon={<ShieldCheck className="w-4 h-4" />}
                  label="Emergency Contact (optional)"
                  value={touristForm.emergencyContact}
                  disabled={!isEditing}
                  onChange={(v) => setTouristForm((p) => ({ ...p, emergencyContact: v }))}
                />
              </div>
            </div>
          </Section>
        ) : (
          <>
            {/* Guide details */}
            <Section title="Guide details" icon={<Briefcase className="w-4 h-4" />}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  icon={<Briefcase className="w-4 h-4" />}
                  label="Company Name (optional)"
                  value={guideForm.companyName}
                  disabled={!isEditing}
                  onChange={(v) => setGuideForm((p) => ({ ...p, companyName: v }))}
                />

                <Field
                  icon={<CreditCard className="w-4 h-4" />}
                  label="License / Certification Number *"
                  value={guideForm.licenseNumber}
                  error={errors.licenseNumber}
                  disabled={!isEditing}
                  onChange={(v) => setGuideForm((p) => ({ ...p, licenseNumber: v }))}
                />

                <Field
                  icon={<Clock className="w-4 h-4" />}
                  label="Years of Experience *"
                  type="number"
                  value={guideForm.yearsOfExperience}
                  error={errors.yearsOfExperience}
                  disabled={!isEditing}
                  onChange={(v) => setGuideForm((p) => ({ ...p, yearsOfExperience: v }))}
                />

                <Field
                  icon={<MapPin className="w-4 h-4" />}
                  label="Service Regions / Operating Areas *"
                  value={guideForm.serviceRegions}
                  error={errors.serviceRegions}
                  disabled={!isEditing}
                  onChange={(v) => setGuideForm((p) => ({ ...p, serviceRegions: v }))}
                />

                <div className="sm:col-span-2">
                  <Field
                    icon={<Languages className="w-4 h-4" />}
                    label="Languages Spoken *"
                    value={guideForm.languagesSpoken}
                    error={errors.languagesSpoken}
                    disabled={!isEditing}
                    onChange={(v) => setGuideForm((p) => ({ ...p, languagesSpoken: v }))}
                  />
                </div>

                <div className="sm:col-span-2">
                  <Field
                    icon={<Phone className="w-4 h-4" />}
                    label="Phone Number *"
                    value={guideForm.phoneNumber}
                    error={errors.phoneNumber}
                    disabled={!isEditing}
                    onChange={(v) => setGuideForm((p) => ({ ...p, phoneNumber: v }))}
                  />
                </div>
              </div>
            </Section>

            {/* Documents */}
            <Section title="Verification documents" icon={<ShieldCheck className="w-4 h-4" />}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-sm font-semibold text-[var(--brand-green)]">
                    Upload your verification files
                  </div>
                  <div className="text-xs text-[var(--brand-olive)]">Max 10MB.</div>

                  {guideForm.verificationDocName && (
                    <div className="mt-2 text-sm text-[var(--brand-green)]">
                      Current: <span className="font-semibold">{guideForm.verificationDocName}</span>
                    </div>
                  )}

                  {errors.verificationDocName && (
                    <div className="mt-2 text-xs text-red-600">{errors.verificationDocName}</div>
                  )}
                </div>

                {isEditing && (
                  <div className="flex items-center gap-2">
                    <input
                      ref={docInputRef}
                      type="file"
                      className="hidden"
                      onChange={(e) => onPickDoc(e.target.files?.[0] ?? null)}
                    />
                    <button type="button" onClick={() => docInputRef.current?.click()} className="btn-base btn-outline">
                      <UploadCloud className="w-4 h-4" />
                      Upload
                    </button>
                    {guideForm.verificationDocName && (
                      <button type="button" onClick={onRemoveDoc} className="btn-base btn-outline">
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    )}
                  </div>
                )}
              </div>
            </Section>
          </>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          {isEditing && (
            <>
              <button type="button" onClick={onSaveClick} className="btn-base btn-book flex-1">
                <Save className="w-4 h-4" />
                {profileCompleted ? "Save Changes" : "Save & Complete Profile"}
              </button>

              <button type="button" onClick={onCancel} className="btn-base btn-outline flex-1">
                <X className="w-4 h-4" />
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      {/* Confirm modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl border border-[color-mix(in_oklab,var(--brand-gold)_25%,white)]">
            <div className="text-lg font-extrabold text-[var(--brand-green)]">
              {profileCompleted ? "Save changes?" : "Complete profile now?"}
            </div>
            <div className="mt-2 text-sm text-[var(--brand-olive)]">Please confirm to continue.</div>
            <div className="mt-5 flex justify-end gap-2">
              <button type="button" onClick={() => setShowConfirm(false)} className="btn-base btn-outline">
                Cancel
              </button>
              <button type="button" onClick={doSave} className="btn-base btn-book">
                Yes, Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- UI helpers ---------- */

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="surface p-6">
      <div className="flex items-center gap-2">
        <span className="text-[var(--brand-olive)]">{icon}</span>
        <h3 className="text-sm font-extrabold text-[var(--brand-green)]">{title}</h3>
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  disabled,
  icon,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[var(--brand-green)] mb-1">{label}</label>

      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--brand-olive)]">{icon}</span>}

        <input
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={[
            icon ? "pl-10 pr-4" : "px-4",
            disabled ? "bg-white/60 opacity-80" : "",
            "input",
            error ? "input-error" : "",
          ].join(" ")}
        />
      </div>

      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[var(--brand-green)] mb-1">{label}</label>

      <select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={["input", disabled ? "bg-white/60 opacity-80" : ""].join(" ")}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
