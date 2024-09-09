/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#6C63FF', // A soft purple for primary actions
                secondary: '#FF6584', // A contrasting color for secondary actions
                background: '#1E1E2F', // Dark background color
                surface: '#2C2C3A', // Surface color for cards and inputs
                textPrimary: '#FFFFFF', // Main text color
                textSecondary: '#A5A6F6', // Secondary text color
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'], // A clean, modern font
            },
            spacing: {
                18: '4.5rem', // Custom spacing value
                36: '9rem',
            },
        },
    },
    variants: {
        extend: {},
    },

    // plugins: [require("daisyui")],
}