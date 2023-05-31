import type { Config } from 'tailwindcss'

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            zIndex: {
                1000: '1000',
                2000: '2000',
                5000: '5000',
                5050: '5050',
            },
        },
    },
    plugins: [],
} satisfies Config;
