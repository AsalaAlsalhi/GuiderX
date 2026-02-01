"use client";

import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import { FaApple, FaAndroid } from "react-icons/fa";

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <span className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center hover:bg-black/5 transition">
      {children}
    </span>
  );
}

export default function Footer() {
  return (
   <footer
  className="border-t"
  style={{ backgroundColor: "#FEF3E2", borderColor: "rgba(0,0,0,0.06)" }}
>

      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Quick Links */}
          <div>
            <h3 className="font-extrabold mb-3 text-[var(--brand-green)]">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-black/60">
              <li><Link href="/search">Search</Link></li>
              <li><Link href="/map">Map</Link></li>
              <li><Link href="/book">Book</Link></li>
              <li><Link href="/profile">Profile</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-extrabold mb-3 text-[var(--brand-green)]">
              Support
            </h3>
            <ul className="space-y-2 text-sm text-black/60">
              <li>Help Center</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>FAQ</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-extrabold mb-3 text-[var(--brand-green)]">
              Contact
            </h3>

            <div className="space-y-2 text-sm text-black/60">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[var(--brand-gold)]" />
                GuiderX@gmail.com
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[var(--brand-gold)]" />
                +968 9117 6103
              </p>
            </div>

            <div className="mt-4 flex gap-2">
              <button className="btn-mini"><FaApple /> iOS</button>
              <button className="btn-mini"><FaAndroid /> Android</button>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-black/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-black/50">
            © {new Date().getFullYear()} GuiderX
          </p>

          <div className="flex items-center gap-2">
            <Icon><Facebook className="w-4 h-4" /></Icon>
            <Icon><Instagram className="w-4 h-4" /></Icon>
            <Icon><Youtube className="w-4 h-4" /></Icon>
            <Icon><Linkedin className="w-4 h-4" /></Icon>
          </div>
        </div>
      </div>
    </footer>
  );
}
