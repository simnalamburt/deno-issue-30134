import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";

import puppeteer from "npm:puppeteer@^24.14.0";

const executablePath = await findChromeExecutable();
if (executablePath == null) {
  console.error("Failed to find Chrome installation");
  process.exit(1);
}

const browser = await puppeteer.launch({ executablePath, headless: false });
await delay(3000);
await browser.close();

export async function findChromeExecutable(): Promise<string | null> {
  const platform = os.platform();
  const commonPaths = platform === "win32"
    ? [
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
      path.join(
        os.homedir(),
        "AppData\\Local\\Google\\Chrome\\Application\\chrome.exe",
      ),
    ]
    : platform === "darwin"
    ? [
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    ]
    : platform === "linux"
    ? [
      "/usr/bin/google-chrome",
      "/opt/google/chrome/chrome",
    ]
    : [];

  for (const p of commonPaths) {
    try {
      await fs.promises.access(p, fs.constants.X_OK);
      return p;
    } catch {
      // File does not exist or is not executable. Continue searching.
    }
  }
  return null; // Chrome not found.
}

function delay(durationMs: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, durationMs));
}
