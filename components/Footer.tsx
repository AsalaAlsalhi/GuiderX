"use client";

import Link from "next/link";
import { Mail, Phone, Instagram, Linkedin } from "lucide-react";
import { FaApple, FaAndroid, FaWhatsapp } from "react-icons/fa";

function Icon({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center hover:bg-black/5 transition"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{ backgroundColor: "#ffffff", borderColor: "rgba(0,0,0,0.06)" }}
    >
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
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

          <div>
            <h3 className="font-extrabold mb-3 text-[var(--brand-green)]">
              Support
            </h3>
            <ul className="space-y-2 text-sm text-black/60">
              <li>Help Center</li>
              <li>Terms of Service</li>
            </ul>
          </div>

          <div>
            <h3 className="font-extrabold mb-3 text-[var(--brand-green)]">
              Contact
            </h3>

            <div className="space-y-2 text-sm text-black/60">
              <a
                href="mailto:info@guiderx.co"
                className="flex items-center gap-2 hover:underline"
              >
                <Mail className="w-4 h-4 text-[var(--brand-gold)]" />
                Info@guiderx.co
              </a>

              <a
                href="tel:+96891176103"
                className="flex items-center gap-2 hover:underline"
              >
                <Phone className="w-4 h-4 text-[var(--brand-gold)]" />
                +968 9117 6103
              </a>
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
            <Icon href="https://www.instagram.com/guiderx.co">
              <Instagram className="w-4 h-4" />
            </Icon>

            <Icon href="https://linkedin.com/in/guider-x-7831a1348">
              <Linkedin className="w-4 h-4" />
            </Icon>

            <Icon href="https://wa.me/96891176103">
              <FaWhatsapp className="w-4 h-4" />
            </Icon>
          </div>
        </div>
      </div>
    </footer>
  );
}