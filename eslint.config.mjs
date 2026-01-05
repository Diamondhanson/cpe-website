import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

// Next.js v16 uses ESLint flat config. These exports are already flat-config compatible.
export default [
  ...nextCoreWebVitals,
  ...nextTypeScript,
];
