"use client";

import { useEffect } from "react";

const RESUME_URL = "https://sagbho.com/files/Sagar_Singh_Bhola_Resume.pdf";

export default function Resume() {
  useEffect(() => {
    window.location.replace(RESUME_URL);
  }, []);

  return null;
}
