import { create } from "zustand";

export type UserType = "tourist" | "guide";
export type Step = "start" | "email" | "otp";

export type TouristGender = "" | "female" | "male" | "prefer-not";

export type TouristProfile = {
  countryOfResidence: string;
  dateOfBirth: string; 
  gender: TouristGender;
  phoneNumber: string;
  emergencyContact: string;
  profilePhotoDataUrl: string | null; // UI-only
};

export type GuideTripUnit = "hours" | "days";

export type GuideTrip = {
  id: string;
  name: string;
  duration: string; // string for inputs
  unit: GuideTripUnit;
  places: string[];
};

export type GuideProfile = {
  companyName: string;
  licenseNumber: string;
  yearsOfExperience: string;
  serviceRegions: string;
  languagesSpoken: string;
  phoneNumber: string;
  profilePhotoDataUrl: string | null; // UI-only
  verificationDocName: string | null; // UI-only
};

type AuthState = {
  
  step: Step;
  setStep: (s: Step) => void;

  userType: UserType | null;
  profileCompleted: boolean;

  touristProfile: TouristProfile;
  guideProfile: GuideProfile;

  // trips ALWAYS exists
  guideTrips: GuideTrip[];

  setUserType: (t: UserType | null) => void;
  setProfileCompleted: (v: boolean) => void;

  updateTouristProfile: (data: Partial<TouristProfile>) => void;
  updateGuideProfile: (data: Partial<GuideProfile>) => void;

  addGuideTrip: (trip: Omit<GuideTrip, "id">) => void;
  removeGuideTrip: (id: string) => void;

  resetProfiles: () => void;
};

const emptyTouristProfile: TouristProfile = {
  countryOfResidence: "",
  dateOfBirth: "",
  gender: "",
  phoneNumber: "",
  emergencyContact: "",
  profilePhotoDataUrl: null,
};

const emptyGuideProfile: GuideProfile = {
  companyName: "",
  licenseNumber: "",
  yearsOfExperience: "",
  serviceRegions: "",
  languagesSpoken: "",
  phoneNumber: "",
  profilePhotoDataUrl: null,
  verificationDocName: null,
};

const emptyGuideTrips: GuideTrip[] = [];

function safeId() {
  try {
    return globalThis.crypto?.randomUUID?.() ?? String(Date.now());
  } catch {
    return String(Date.now());
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  step: "start",
  setStep: (step) => set({ step }),

  userType: null,
  profileCompleted: false,

  touristProfile: emptyTouristProfile,
  guideProfile: emptyGuideProfile,

  guideTrips: emptyGuideTrips,

  setUserType: (userType) => set({ userType }),
  setProfileCompleted: (profileCompleted) => set({ profileCompleted }),

  updateTouristProfile: (data) =>
    set((state) => ({
      touristProfile: { ...state.touristProfile, ...data },
    })),

  updateGuideProfile: (data) =>
    set((state) => ({
      guideProfile: { ...state.guideProfile, ...data },
    })),

  addGuideTrip: (trip) =>
    set((state) => ({
      guideTrips: [...state.guideTrips, { ...trip, id: safeId() }],
    })),

  removeGuideTrip: (id) =>
    set((state) => ({
      guideTrips: state.guideTrips.filter((t) => t.id !== id),
    })),

  resetProfiles: () =>
    set({
      touristProfile: emptyTouristProfile,
      guideProfile: emptyGuideProfile,
      guideTrips: emptyGuideTrips,
      profileCompleted: false,
    }),
}));
