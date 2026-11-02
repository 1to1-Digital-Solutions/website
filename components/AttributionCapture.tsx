"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

/** Records where the visit comes from as soon as it lands, whatever the first page is. */
export function AttributionCapture() {
  useEffect(() => captureAttribution(), []);
  return null;
}
