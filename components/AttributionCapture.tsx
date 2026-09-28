"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

/** Apunta de dónde llega la visita en cuanto entra, sea cual sea la primera página. */
export function AttributionCapture() {
  useEffect(() => captureAttribution(), []);
  return null;
}
