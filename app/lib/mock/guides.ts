// lib/mock/guides.ts
export type GuideTripUnit = "hours" | "days";

export type GuideTrip = {
  id: string;
  name: string;
  duration: string; // "3"
  unit: GuideTripUnit; // "hours" | "days"
  places: string[];
};

export type GuideOnMap = {
  id: string;
  name: string;
  initials: string;
  status: "available" | "busy";
  rating: number;
  tripsCompleted: number;
  imageUrl?: string;

  lat: number;
  lng: number;

  guideTrips: GuideTrip[];
};

export const GUIDES: GuideOnMap[] = [
  {
    id: "ahmed-bulushi",
    name: "Ahmed Al Bulushi",
    initials: "AB",
    status: "available",
    rating: 4.9,
    tripsCompleted: 87,
    lat: 23.6075,
    lng: 58.4166, // Muscat
    guideTrips: [
      {
        id: "t1",
        name: "Muscat City Tour",
        duration: "4",
        unit: "hours",
        places: ["Mutrah Corniche", "Matrah Souq", "Al Alam Palace"],
      },
      {
        id: "t2",
        name: "Nizwa Day Trip",
        duration: "1",
        unit: "days",
        places: ["Nizwa Fort", "Nizwa Souq"],
      },
    ],
  },
  {
    id: "fatima-lawati",
    name: "Fatima Al Lawati",
    initials: "FL",
    status: "busy",
    rating: 4.7,
    tripsCompleted: 63,
    lat: 23.588,
    lng: 58.3829,
    guideTrips: [
      {
        id: "t1",
        name: "Coastal Highlights",
        duration: "6",
        unit: "hours",
        places: ["Mutrah Corniche", "Royal Opera House"],
      },
    ],
  },
  {
    id: "rashid-al-harthy",
    name: "Rashid Al Harthy",
    initials: "RH",
    status: "available",
    rating: 4.8,
    tripsCompleted: 128,
    lat: 23.563,
    lng: 58.525,
    guideTrips: [
      {
        id: "t1",
        name: "Wadi Shab Adventure",
        duration: "1",
        unit: "days",
        places: ["Wadi Shab", "Tiwi"],
      },
      {
        id: "t2",
        name: "Old Muscat Walk",
        duration: "3",
        unit: "hours",
        places: ["Al Alam Palace", "Old Muscat", "Mutrah"],
      },
    ],
  },
];

export function getGuideById(id: string | null | undefined) {
  if (!id) return null;
  return GUIDES.find((g) => g.id === id) ?? null;
}
