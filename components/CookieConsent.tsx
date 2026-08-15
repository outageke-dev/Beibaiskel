"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "bei-baiskeli-cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie notice">
      <p>
        We use cookies for site functionality and, with your consent, to show ads via Google
        AdSense. See our{" "}
        <Link href="/cookies">cookie policy</Link> and{" "}
        <Link href="/privacy">privacy policy</Link>.
      </p>
      <button type="button" className="button" onClick={accept}>
        Accept
      </button>
    </div>
  );
}
