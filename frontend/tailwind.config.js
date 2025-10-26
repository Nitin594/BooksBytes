const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html", // If you use index.html directly
  ],
  theme: {
    extend: {
      fontFamily: {
        // -------------------------------------------------------------------
        // OPTION 1: Override default font stacks (e.g., make Poppins the default sans-serif)
        // This means any element with 'font-sans' will use Poppins first.
        // 'sans' will replace Tailwind's default 'sans' stack.
        // 'serif' will replace Tailwind's default 'serif' stack.
        // -------------------------------------------------------------------
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
        serif: ['Libre Baskerville', ...defaultTheme.fontFamily.serif],
        // mono: ['Sono', ...defaultTheme.fontFamily.mono], // Uncomment if you want to set Sono as default mono

        // -------------------------------------------------------------------
        // OPTION 2: Create new custom utility classes (e.g., font-heading, font-special)
        // These will be available as specific utility classes like 'font-bebas'
        // -------------------------------------------------------------------
        bebas: ['Bebas Neue', 'sans-serif'],
        bungee: ['Bungee', 'cursive'], // Bungee is often very decorative, 'cursive' is a good generic fallback
        fjalla: ['Fjalla One', 'sans-serif'],
        libre: ['Libre Baskerville', 'serif'], // Already used to override 'serif' above, but can be separate
        parkinsans: ['Parkinsans', 'sans-serif'], // Note: You might want to check the actual font-family name if it's 'Parkinsans'
        poppins: ['Poppins', 'sans-serif'], // Already used to override 'sans' above, but can be separate
        sono: ['Sono', 'monospace'], // 'monospace' is a good generic fallback for Sono
        ubuntu: ['Ubuntu', 'sans-serif'],
      },
    },
  },
  plugins: [],
};