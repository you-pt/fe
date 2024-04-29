import withMT from "@material-tailwind/react/utils/withMT";
import animations from "tailwindcss-animated";

/** @type {import('tailwindcss').Config} */

export default withMT({
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [animations],
});
