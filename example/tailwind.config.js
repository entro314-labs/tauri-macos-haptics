/**
 * Tailwind CSS v4 Configuration
 *
 * Note: Tailwind v4 uses CSS-first configuration via @import and @theme directives.
 * This file is kept for compatibility with tools that expect it, but the actual
 * configuration is in src/styles.css using the new @theme directive.
 *
 * @see https://tailwindcss.com/docs/v4-beta
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  plugins: [],
};
