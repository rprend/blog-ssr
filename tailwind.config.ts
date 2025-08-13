import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#232325",
        secondary: "#666",
        background: "#ffffff",
        "muted-red": "#A65D57",
      },
      fontFamily: {
        headline: ['"Afacad Flux"', "sans-serif"],
        body: ['"Space Grotesk"', "sans-serif"],
      },
      fontSize: {
        headline: ["4vw", "1"],
        "headline-mobile": ["12vw", "1"],
      },
      borderRadius: {
        project: "9999px",
      },
      spacing: {
        section: "6rem",
      },
      typography: {
        primary: {
          css: {
            '--tw-prose-body': '#232325',
            '--tw-prose-headings': '#232325',
            '--tw-prose-lead': '#666',
            '--tw-prose-links': '#232325',
            '--tw-prose-bold': '#232325',
            '--tw-prose-counters': '#666',
            '--tw-prose-bullets': '#666',
            '--tw-prose-hr': '#e5e5e5',
            '--tw-prose-quotes': '#232325',
            '--tw-prose-quote-borders': '#e5e5e5',
            '--tw-prose-captions': '#666',
            '--tw-prose-code': '#232325',
            '--tw-prose-pre-code': '#e5e5e5',
            '--tw-prose-pre-bg': '#232325',
            '--tw-prose-th-borders': '#e5e5e5',
            '--tw-prose-td-borders': '#e5e5e5',
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;