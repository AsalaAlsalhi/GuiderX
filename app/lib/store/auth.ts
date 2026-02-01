import { create } from "zustand";

export type UserType = "tourist" | "guide";
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
  duration: string; 
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

/** // Login steps */
export type AuthStep = "start" | "email" | "otp";

type AuthState = {
  userType: UserType | null;
  profileCompleted: boolean;

  touristProfile: TouristProfile;
  guideProfile: GuideProfile;

  guideTrips: GuideTrip[];

  // login flow state
  step: AuthStep;
  identifier: string; // email / phone
  otp: string;

  setUserType: (t: UserType | null) => void;
  setProfileCompleted: (v: boolean) => void;

  updateTouristProfile: (data: Partial<TouristProfile>) => void;
  updateGuideProfile: (data: Partial<GuideProfile>) => void;

  addGuideTrip: (trip: Omit<GuideTrip, "id">) => void;
  removeGuideTrip: (id: string) => void;

  
  setStep: (s: AuthStep) => void;
  setIdentifier: (v: string) => void;
  setOtp: (v: string) => void;
  resetLoginFlow: () => void;

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

export const useAuthStore = create<AuthState>((set) => ({
  userType: null,
  profileCompleted: false,

  touristProfile: emptyTouristProfile,
  guideProfile: emptyGuideProfile,

  guideTrips: emptyGuideTrips,

  /// default login step
  step: "start",
  identifier: "",
  otp: "",

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
      guideTrips: [
        ...state.guideTrips,
        { ...trip, id: globalThis.crypto?.randomUUID?.() ?? String(Date.now()) },
      ],
    })),

  removeGuideTrip: (id) =>
    set((state) => ({
      guideTrips: state.guideTrips.filter((t) => t.id !== id),
    })),

  // login flow
  setStep: (step) => set({ step }),
  setIdentifier: (identifier) => set({ identifier }),
  setOtp: (otp) => set({ otp }),
  resetLoginFlow: () => set({ step: "start", identifier: "", otp: "" }),

  resetProfiles: () =>
    set({
      touristProfile: emptyTouristProfile,
      guideProfile: emptyGuideProfile,
      guideTrips: emptyGuideTrips,
      profileCompleted: false,
    }),
}));
