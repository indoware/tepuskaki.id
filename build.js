#!/usr/bin/env node

import { execSync } from "child_process";

const isVercel = !!process.env.VERCEL;

try {
  console.log(`Building in ${isVercel ? "Vercel" : "local"} environment...`);

  if (isVercel) {
    // Di Vercel: jalankan TinaCMS build untuk Tina Cloud
    console.log("Running TinaCMS build on Vercel...");
    execSync("tinacms build && next build", { stdio: "inherit" });
  } else {
    // Di lokal: jalankan TinaCMS build + Next.js build (local mode)
    console.log("Running TinaCMS build locally...");
    execSync("tinacms build --local && next build", { stdio: "inherit" });
  }
} catch (error) {
  process.exit(1);
}
