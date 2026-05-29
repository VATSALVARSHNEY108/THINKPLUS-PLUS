/**
 * Next.js configuration for Think++.
 * This sets the Turbopack root to the project directory to silence the multiple lockfile warning.
 */
export const turbopack = {
  // Ensure Turbopack treats this folder as the workspace root.
  root: __dirname,
};

/**
 * You can also add other custom Next.js configuration here if needed.
 */
export default {
  // Example: reactStrictMode: true,
};
