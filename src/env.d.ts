// Vite environment variable typings
declare global {
  interface ImportMetaEnv {
    VITE_GOOGLE_SHEETS_SCRIPT_URL: string;
    // Add other env vars here if needed
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}
export {};
