"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore, type GuideTrip, type GuideTripUnit } from "@/app/lib/store/auth";
import {
  FiMapPin,
  FiClock,
  FiPlus,
  FiTrash2,
  FiX,
  FiCheckCircle,
  FiAlertTriangle,
} from "react-icons/fi";

const EMPTY_TRIPS: GuideTrip[] = [];

const POPULAR_PLACES = [
  "Matrah Souq",
  "Mutrah Corniche",
  "Sultan Qaboos Grand Mosque",
  "Royal Opera House",
  "Al Alam Palace",
  "Nizwa Fort",
  "Wahiba Sands",
  "Wadi Shab",
  "Wadi Bani Khalid",
  "Jebel Akhdar",
  "Salalah",
  "Musandam",
];

export default function TripsTab() {
  const userType = useAuthStore((s) => s.userType);
  const tripsFromStore = useAuthStore((s) => s.guideTrips);
  const addGuideTrip = useAuthStore((s) => s.addGuideTrip);
  const removeGuideTrip = useAuthStore((s) => s.removeGuideTrip);

  const trips = tripsFromStore ?? EMPTY_TRIPS;

  if (userType !== "guide") return null;

  const [showAdd, setShowAdd] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<string | null>(null);

  const [draft, setDraft] = useState<Omit<GuideTrip, "id">>({
    name: "",
    duration: "",
    unit: "hours",
    places: [],
  });

  const [newPlace, setNewPlace] = useState("");

  const canSaveDraft = useMemo(() => {
    if (!draft.name.trim()) return false;
    if (!draft.duration.trim()) return false;
    if (Number(draft.duration) <= 0) return false;
    if (draft.places.length === 0) return false;
    return true;
  }, [draft]);

  function openAdd() {
    setErrors({});
    setDraft({ name: "", duration: "", unit: "hours", places: [] });
    setNewPlace("");
    setShowAdd(true);
  }

  function closeAdd() {
    setShowAdd(false);
    setErrors({});
    setNewPlace("");
  }

  function validateDraft() {
    const next: Record<string, string> = {};
    if (!draft.name.trim()) next["name"] = "Trip name is required";
    if (!draft.duration.trim()) next["duration"] = "Duration is required";
    if (draft.duration && Number(draft.duration) <= 0) next["duration"] = "Duration must be > 0";
    if (draft.places.length === 0) next["places"] = "Add at least 1 place";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function addCustomPlace() {
    const p = newPlace.trim();
    if (!p) return;

    if (draft.places.some((x) => x.toLowerCase() === p.toLowerCase())) {
      setNewPlace("");
      return;
    }

    setDraft((d) => ({ ...d, places: [...d.places, p] }));
    setNewPlace("");
  }

  function addPopular(place: string) {
    if (draft.places.includes(place)) return;
    setDraft((d) => ({ ...d, places: [...d.places, place] }));
  }

  function removePlace(place: string) {
    setDraft((d) => ({ ...d, places: d.places.filter((p) => p !== place) }));
  }

  function addTrip() {
    if (!validateDraft()) return;

    addGuideTrip({
      name: draft.name.trim(),
      duration: draft.duration.trim(),
      unit: draft.unit,
      places: draft.places.map((p) => p.trim()).filter(Boolean),
    });

    setToast("Trip added successfully ✅");
    setTimeout(() => setToast(null), 2000);
    closeAdd();
  }

  function deleteTrip(id: string) {
    removeGuideTrip(id);
    setToast("Trip removed ✅");
    setTimeout(() => setToast(null), 1600);
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
            className="fixed top-6 right-6 z-[80] flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 shadow-lg"
          >
            <FiCheckCircle />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <button type="button" onClick={openAdd} className="btn-base btn-outline">
          <FiPlus />
          Add New Trip
        </button>
      </div>

      {/* Empty state */}
      {trips.length === 0 ? (
        <div className="surface p-6 text-sm">
          No trips yet. Click <span className="font-semibold">Add New Trip</span> to create your first one.
        </div>
      ) : (
        <div className="space-y-4">
          {trips.map((t) => (
            <div key={t.id} className="surface p-6 hover:shadow-sm transition">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <FiMapPin className="text-[var(--brand-olive)]" />
                    <h3 className="text-lg font-extrabold text-[var(--brand-green)]">{t.name}</h3>
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-sm text-[var(--brand-olive)]">
                    <FiClock />
                    <span>
                      {t.duration} {t.unit}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => deleteTrip(t.id)}
                  className="btn-base btn-outline"
                >
                  <FiTrash2 />
                  Delete
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {t.places.map((p, idx) => (
                  <span key={`${t.id}-${idx}`} className="tag-chip">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showAdd && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) closeAdd();
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl surface p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-extrabold text-[var(--brand-green)]">Add New Trip</h3>
                  
                </div>

                <button type="button" onClick={closeAdd} className="btn-base btn-outline !h-10 !px-3">
                  <FiX />
                </button>
              </div>

              <div className="mt-6 space-y-5">
                {/* Trip name */}
                <div>
                  <label className="block text-sm font-semibold text-[var(--brand-green)] mb-1">
                    Trip Name *
                  </label>
                  <input
                    value={draft.name}
                    onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                    className={["input", errors.name ? "input-error" : ""].join(" ")}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                </div>

                {/* Duration + unit */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[var(--brand-green)] mb-1">
                      Duration *
                    </label>
                    <input
                      type="number"
                      value={draft.duration}
                      onChange={(e) => setDraft((d) => ({ ...d, duration: e.target.value }))}
                      className={["input", errors.duration ? "input-error" : ""].join(" ")}
                    />
                    {errors.duration && <p className="mt-1 text-xs text-red-600">{errors.duration}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[var(--brand-green)] mb-1">
                      Unit *
                    </label>
                    <select
                      value={draft.unit}
                      onChange={(e) => setDraft((d) => ({ ...d, unit: e.target.value as GuideTripUnit }))}
                      className="input"
                    >
                      <option value="hours">Hours</option>
                      <option value="days">Days</option>
                    </select>
                  </div>
                </div>

                {/* Places box */}
                <div className="surface p-5">
                  <div className="flex items-center gap-2 font-extrabold text-[var(--brand-green)]">
                    <FiMapPin className="text-[var(--brand-olive)]" />
                    Places / Destinations *
                  </div>

                  {errors.places && (
                    <div className="mt-3 inline-flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                      <FiAlertTriangle />
                      {errors.places}
                    </div>
                  )}

                  {/* Add custom */}
                  <div className="mt-4 flex flex-col sm:flex-row gap-2">
                    <input
                      value={newPlace}
                      onChange={(e) => setNewPlace(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addCustomPlace();
                        }
                      }}
                      className="input flex-1"
                      placeholder="Type a place and press Add"
                    />
                    <button type="button" onClick={addCustomPlace} className="btn-base btn-book">
                      <FiPlus />
                      Add
                    </button>
                  </div>

                  {/* Popular places */}
                  <div className="mt-4">
                    <div className="text-xs text-[var(--brand-olive)] mb-2">Popular Places:</div>
                    <div className="flex flex-wrap gap-2">
                      {POPULAR_PLACES.map((p) => {
                        const selected = draft.places.includes(p);
                        return (
                          <button
                            key={p}
                            type="button"
                            onClick={() => addPopular(p)}
                            disabled={selected}
                            className={[
                              "tag-chip",
                              selected ? "opacity-40 cursor-not-allowed" : "",
                            ].join(" ")}
                          >
                            {p}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Selected places */}
                  {draft.places.length > 0 && (
                    <div className="mt-4">
                      <div className="text-xs text-[var(--brand-olive)] mb-2">Selected Places:</div>
                      <div className="flex flex-wrap gap-2">
                        {draft.places.map((p) => (
                          <span key={p} className="chip">
                            {p}
                            <button
                              type="button"
                              onClick={() => removePlace(p)}
                              className="ml-2 rounded-full p-1 hover:bg-[color-mix(in_oklab,var(--brand-cream)_70%,white)]"
                              aria-label="Remove place"
                            >
                              <FiX />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={addTrip}
                    disabled={!canSaveDraft}
                    className="btn-base btn-outline flex-1 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <FiCheckCircle />
                    Add Trip
                  </button>

                  <button type="button" onClick={closeAdd} className="btn-base btn-outline flex-1">
                    <FiX />
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
