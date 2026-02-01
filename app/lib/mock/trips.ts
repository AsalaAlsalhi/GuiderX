// lib/mock/trips.ts
export type Trip = {
  id: string;
  title: string;
  city: string;
  tag: string;           
  image: string;         
  rating: number;        
  guideName: string;
  duration: string;     
  price: number;      
};

export const TRIPS: Trip[] = [
  {
    id: "muttrah-corniche",
    title: "Muttrah Corniche Walk",
    city: "Muscat",
    tag: "City",
    image: "/oman/01.jpg",
    rating: 4.8,
    guideName: "Almas Salam",
    duration: "3h",
    price: 12,
  },
  {
    id: "nizwa-fort",
    title: "Nizwa Fort & Souq",
    city: "Nizwa",
    tag: "Culture",
    image: "/oman/02.jpg",
    rating: 4.9,
    guideName: "Yusuf Al Hinai",
    duration: "6h",
    price: 25,
  },
  {
    id: "wadi-shab",
    title: "Wadi Shab Hike & Swim",
    city: "Tiwi",
    tag: "Adventure",
    image: "/oman/03.jpg",
    rating: 4.7,
    guideName: "Maha Al Lawati",
    duration: "1 day",
    price: 30,
  },
  {
    id: "jabal-akhdar",
    title: "Jabal Akhdar Viewpoints",
    city: "Al Dakhiliyah",
    tag: "Mountains",
    image: "/oman/02.jpg",
    rating: 4.9,
    guideName: "Hamed Al Abri",
    duration: "1 day",
    price: 40,
  },
  {
    id: "sur-dhow",
    title: "Sur Dhow Yard",
    city: "Sur",
    tag: "Heritage",
    image: "/oman/01.jpg",
    rating: 4.6,
    guideName: "Fatma Al Hadhrami",
    duration: "4h",
    price: 18,
  },
  {
    id: "salalah-khareef",
    title: "Salalah Khareef Highlights",
    city: "Salalah",
    tag: "Nature",
    image: "/oman/03.jpg",
    rating: 4.8,
    guideName: "Hilal Al Rashdi",
    duration: "1 day",
    price: 45,
  },
];

export const TAGS = Array.from(new Set(TRIPS.map(t => t.tag)));

export function searchTrips(q?: string, tag?: string): Trip[] {
  let out = TRIPS;
  if (tag) out = out.filter(t => t.tag.toLowerCase() === tag.toLowerCase());
  if (q && q.trim()) {
    const s = q.trim().toLowerCase();
    out = out.filter(t =>
      `${t.title} ${t.city} ${t.tag}`.toLowerCase().includes(s)
    );
  }
  return out;
}
