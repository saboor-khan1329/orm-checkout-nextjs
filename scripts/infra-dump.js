#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const basePath = process.cwd();
const timestamp = new Date()
  .toISOString()
  .replace(/T/, "_")
  .replace(/:/g, "-")
  .split(".")[0];

const args = process.argv.slice(2);
const outputArg = args.find((arg) => arg.startsWith("--output="));

const outputFile = outputArg
  ? outputArg.replace("--output=", "")
  : path.join(basePath, `infra-dump-${timestamp}.txt`);

const targets = [
  // Core Next.js
  "package.json",
  "next.config.mjs",
  "jsconfig.json",
  "src/app",
  "src/componenets",
  "src/context",
  "src/hooks",
  "src/lib",
  "src/providers",
];

console.log("Creating Next.js infrastructure dump...");
console.log("Output:", outputFile);

ensureDirectoryExists(path.dirname(outputFile));

const handle = fs.createWriteStream(outputFile, { flags: "w" });

targets.forEach((target) => {
  const fullPath = path.join(basePath, target);

  if (fs.existsSync(fullPath)) {
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      dumpDirectory(fullPath);
    } else if (stat.isFile()) {
      dumpFile(fullPath);
    }
  } else {
    console.warn("Skipped (not found):", target);
  }
});

handle.end(() => {
  console.log("✔ Infrastructure dump completed successfully.");
});

/**
 * Recursively dump directory
 */
function dumpDirectory(directory) {
  const files = fs.readdirSync(directory);

  files.forEach((file) => {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      dumpDirectory(fullPath);
    } else {
      dumpFile(fullPath);
    }
  });
}

/**
 * Dump single file
 */
function dumpFile(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase();

    // 🚫 Skip CSS and SCSS files
    if (ext === ".css" || ext === ".scss") {
      return;
    }

    const buffer = fs.readFileSync(filePath);

    // Skip binary files
    if (!isText(buffer)) return;

    const relativePath = path.relative(basePath, filePath);

    handle.write("\n");
    handle.write(`FILE: ${relativePath}\n`);
    handle.write(buffer.toString("utf8"));
    handle.write("\n\n");
  } catch (err) {
    // silently skip unreadable files
  }
}

/**
 * Simple text detection
 */
function isText(buffer) {
  const sample = buffer.slice(0, 1000).toString("utf8");
  return !sample.includes("\u0000");
}

/**
 * Ensure directory exists
 */
function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}
