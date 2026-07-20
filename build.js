#!/usr/bin/env node

import { execSync } from "child_process";

const isVercel = !!process.env.VERCEL;

try {
  console.log(`Building in ${isVercel ? "Vercel" : "local"} environment...`);

  if (isVercel) {
    // Di Vercel: skip TinaCMS build, langsung ke Next.js build
    console.log("Skipping TinaCMS build on Vercel...");
    execSync("next build", { stdio: "inherit" });
  } else {
    // Di lokal: jalankan TinaCMS build + Next.js build
    console.log("Running TinaCMS build locally...");
    execSync("tinacms build --local && next build", { stdio: "inherit" });
  }
} catch (error) {
  process.exit(1);
}
