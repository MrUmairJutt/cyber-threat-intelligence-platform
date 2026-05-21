/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        rajdhani: ["Rajdhani", "sans-serif"],
        inter: ["Inter", "sans-serif"]
      },
      colors: {
        abyss: "#02050b",
        navy: "#06111f",
        panel: "rgba(8, 19, 32, 0.72)",
        neon: "#18ff9a",
        cyan: "#22d3ee",
        danger: "#ff3158",
        amber: "#fbbf24"
      },
      boxShadow: {
        neon: "0 0 28px rgba(24, 255, 154, 0.3)",
        cyan: "0 0 30px rgba(34, 211, 238, 0.25)",
        danger: "0 0 28px rgba(255, 49, 88, 0.28)"
      },
      backgroundImage: {
        "cyber-radial":
          "radial-gradient(circle at 20% 10%, rgba(34,211,238,.18), transparent 26%), radial-gradient(circle at 82% 18%, rgba(24,255,154,.13), transparent 24%), radial-gradient(circle at 70% 80%, rgba(255,49,88,.12), transparent 25%)"
      },
      animation: {
        scan: "scan 4s linear infinite",
        matrix: "matrix 16s linear infinite",
        pulseGlow: "pulseGlow 2.4s ease-in-out infinite",
        float: "float 6s ease-in-out infinite"
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" }
        },
        matrix: {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0)" }
        },
        pulseGlow: {
          "0%, 100%": { opacity: ".55", filter: "drop-shadow(0 0 8px rgba(24,255,154,.35))" },
          "50%": { opacity: "1", filter: "drop-shadow(0 0 22px rgba(24,255,154,.8))" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" }
        }
      }
    }
  },
  plugins: []
};
