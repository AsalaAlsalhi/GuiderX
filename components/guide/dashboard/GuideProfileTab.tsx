"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore, type GuideProfile } from "@/app/lib/store/auth";
import {
  FiUser,
  FiUploadCloud,
  FiTrash2,
  FiEdit2,
  FiSave,
  FiX,
  FiCheckCircle,
  FiBriefcase,
  FiHash,
  FiClock,
  FiMapPin,
  FiGlobe,
  FiPhone,
  FiFileText,
} from "react-icons/fi";

type ToastType = "success" | "error";

export default function GuideProfileTab() {
  const { userType, profileCompleted, guideProfile, updateGuideProfile, setProfileCompleted } =
    useAuthStore();

  if (userType !== "guide") return null;

  const [isEditing, setIsEditing] = useState(!profileCompleted);
  const [form, setForm] = useState<GuideProfile>(guideProfile);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showConfirm, setShowConfirm] = useState(false);

  const [toast, setToast] = useState<{ type: ToastType; msg: string } | null>(null);

  const photoInputRef = useRef<HTMLInputElement | null>(null);
  const docInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => setForm(guideProfile), [guideProfile]);
  useEffect(() => setIsEditing(!profileCompleted), [profileCompleted]);

  const requiredFields = useMemo(
    () => ["licenseNumber", "yearsOfExperience", "serviceRegions", "languagesSpoken", "phoneNumber"] as const,
    []
  );

  const progress = useMemo(() => {
    const filled = requiredFields.filter((k) => {
      const v = (form as any)[k];
      return typeof v === "string" ? v.trim().length > 0 : !!v;
    }).length;
    return Math.round((filled / requiredFields.length) * 100);
  }, [form, requiredFields]);

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

  function validate() {
    const next: Record<string, string> = {};

    requiredFields.forEach((k) => {
      const v = (form as any)[k];
      if (!String(v ?? "").trim()) next[String(k)] = "Required";
    });

    if (form.phoneNumber && !/^\+?\d{7,15}$/.test(form.phoneNumber)) {
      next["phoneNumber"] = "Invalid phone number";
    }

    if (form.yearsOfExperience && Number(form.yearsOfExperience) < 0) {
      next["yearsOfExperience"] = "Invalid number";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

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
      setFieldError("profilePhotoDataUrl", "Max 5MB");
      return;
    }
    clearFieldError("profilePhotoDataUrl");

    const dataUrl = await readFileAsDataUrl(file);
    setForm((p) => ({ ...p, profilePhotoDataUrl: dataUrl }));
  };

  const onRemovePhoto = () => setForm((p) => ({ ...p, profilePhotoDataUrl: null }));

  const onPickDoc = (file: File | null) => {
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setFieldError("verificationDocName", "Max 10MB");
      return;
    }
    clearFieldError("verificationDocName");
    setForm((p) => ({ ...p, verificationDocName: file.name }));
  };

  const onRemoveDoc = () => setForm((p) => ({ ...p, verificationDocName: null }));

  function onCancel() {
    setForm(guideProfile);
    setErrors({});
    setShowConfirm(false);
    if (profileCompleted) setIsEditing(false);
  }

  function onSaveClick(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) {
      setToast({ type: "error", msg: "Fix the required fields." });
      setTimeout(() => setToast(null), 1800);
      return;
    }
    setShowConfirm(true);
  }

  function doSave() {
    updateGuideProfile(form);
    if (progress === 100) setProfileCompleted(true);

    setShowConfirm(false);
    setIsEditing(false);

    setToast({ type: "success", msg: "Saved ✅" });
    setTimeout(() => setToast(null), 1800);
  }

  return (
    <div className="space-y-5">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            className={[
              "fixed top-6 right-6 z-[80] flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm shadow-lg",
              toast.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-red-200 bg-red-50 text-red-700",
            ].join(" ")}
          >
            {toast.type === "success" ? <FiCheckCircle className="text-lg" /> : <FiX className="text-lg" />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Card */}
      <form onSubmit={onSaveClick} className="surface p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--brand-green)]">Profile</h2>

            <div className="mt-2 flex items-center gap-3">
              <div className="progress-rail w-40">
                <div className="progress-bar" style={{ width: `${progress}%` }} />
              </div>
              <div className="text-sm font-semibold text-[var(--brand-green)]">{progress}%</div>
            </div>
          </div>

          {profileCompleted && !isEditing && (
            <button type="button" onClick={() => setIsEditing(true)} className="btn-base btn-outline">
              <FiEdit2 />
              Edit
            </button>
          )}
        </div>

        {/* Photo */}
        <div className="rounded-3xl border border-[color-mix(in_oklab,var(--brand-gold)_18%,white)] bg-white p-5 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative h-24 w-24 rounded-full bg-white border border-[color-mix(in_oklab,var(--brand-gold)_35%,white)] overflow-hidden flex items-center justify-center">
              {form.profilePhotoDataUrl ? (
                <img src={form.profilePhotoDataUrl} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <FiUser className="text-3xl text-[var(--brand-olive)]" />
              )}
            </div>

            <div className="flex-1">
              <div className="font-semibold text-[var(--brand-green)]">Profile Photo</div>
              {errors.profilePhotoDataUrl && (
                <div className="mt-1 text-xs text-red-600">{errors.profilePhotoDataUrl}</div>
              )}
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
                  <FiUploadCloud />
                  Upload
                </button>

                {form.profilePhotoDataUrl && (
                  <button type="button" onClick={onRemovePhoto} className="btn-base btn-outline">
                    <FiTrash2 />
                    Remove
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field icon={<FiBriefcase />} label="Company Name" value={form.companyName} disabled={!isEditing}
            onChange={(v) => setForm((p) => ({ ...p, companyName: v }))} />

          <Field icon={<FiHash />} label="License Number *" value={form.licenseNumber} error={errors.licenseNumber}
            disabled={!isEditing} onChange={(v) => setForm((p) => ({ ...p, licenseNumber: v }))} />

          <Field icon={<FiClock />} label="Years of Experience *" type="number" value={form.yearsOfExperience}
            error={errors.yearsOfExperience} disabled={!isEditing}
            onChange={(v) => setForm((p) => ({ ...p, yearsOfExperience: v }))} />

          <Field icon={<FiMapPin />} label="Service Regions *" value={form.serviceRegions} error={errors.serviceRegions}
            disabled={!isEditing} onChange={(v) => setForm((p) => ({ ...p, serviceRegions: v }))} />

          <div className="sm:col-span-2">
            <Field icon={<FiGlobe />} label="Languages Spoken *" value={form.languagesSpoken} error={errors.languagesSpoken}
              disabled={!isEditing} onChange={(v) => setForm((p) => ({ ...p, languagesSpoken: v }))} />
          </div>

          <div className="sm:col-span-2">
            <Field icon={<FiPhone />} label="Phone Number *" value={form.phoneNumber} error={errors.phoneNumber}
              disabled={!isEditing} onChange={(v) => setForm((p) => ({ ...p, phoneNumber: v }))} />
          </div>

          {/* Documents */}
          <div className="sm:col-span-2 surface p-5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 font-semibold text-[var(--brand-green)]">
                  <FiFileText className="text-[var(--brand-olive)]" />
                  Verification Document
                </div>

                {form.verificationDocName && (
                  <div className="mt-2 text-sm text-[var(--brand-green)]">
                    <span className="font-semibold">{form.verificationDocName}</span>
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
                    <FiUploadCloud />
                    Upload
                  </button>

                  {form.verificationDocName && (
                    <button type="button" onClick={onRemoveDoc} className="btn-base btn-outline">
                      <FiTrash2 />
                      Remove
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        {isEditing && (
          <div className="flex flex-col sm:flex-row gap-3 pt-6">
            <button type="submit" className="btn-base btn-book flex-1">
              <FiSave />
              Save
            </button>

            <button type="button" onClick={onCancel} className="btn-base btn-outline flex-1">
              <FiX />
              Cancel
            </button>
          </div>
        )}
      </form>

      {/* Confirm modal */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => { if (e.target === e.currentTarget) setShowConfirm(false); }}
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl border border-[color-mix(in_oklab,var(--brand-gold)_25%,white)]"
            >
              <div className="text-lg font-extrabold text-[var(--brand-green)]">Save changes?</div>
              <div className="mt-2 text-sm text-[var(--brand-olive)]">Confirm to continue.</div>

              <div className="mt-5 flex justify-end gap-2">
                <button type="button" onClick={() => setShowConfirm(false)} className="btn-base btn-outline">
                  Cancel
                </button>
                <button type="button" onClick={doSave} className="btn-base btn-book">
                  Yes, Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  icon,
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  disabled,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[var(--brand-green)] mb-1">{label}</label>

      <div className="relative">
        {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--brand-olive)]">{icon}</div>}

        <input
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={[
            "input",
            icon ? "pl-11 pr-4" : "px-4",
            disabled ? "bg-white/60 opacity-80" : "",
            error ? "input-error" : "",
          ].join(" ")}
        />
      </div>

      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
