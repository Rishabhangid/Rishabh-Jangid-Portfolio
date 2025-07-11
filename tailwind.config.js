/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", 
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#014308",   // Custom blue
        // primary: "#FFFFFF",   // Custom blue
        secondary: "#9333EA", // Custom purple
        mainheading: "#151313",
        registerheading: "#333333",
        textyellow: "#FFEB3C",
        testing:"#B2A59B",
        accent: "#F59E0B",    // Custom yellow-orange
        dark: "#1E293B",      // Custom dark gray
        mainbutton: "#D4AF37",
        charcoldark:"#1C1C1C",

        secondprimary:"#796853",

        pinkmain: "#9A0056",
        pinkbox:"#F9F5F0"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],  // Custom primary font
        heading: ["Poppins", "sans-serif"],  // Custom heading font
        fancy: ["EB Garamond"],  // Custom fancy font
        subheading: ["Brown"],  // Custom fancy font
        brown: ['MyCustomFont', 'sans-serif'],
      },
      fontSize: {
        'menu-text': '16px',    
        'body-text': '1px',        
        'new-title': '3px',        
        'hero-text': '5px',        
        'banner-text': '6px',      
        'tiny-label': '0.625px',   
      },
      backgroundImage: {
        "nav-gradient": 'linear-gradient(to right, #014308, #026C10)',
        "nav-dark": "linear-gradient(to right, #0A2A12, #114D22)",
        "nav-dark2": "linear-gradient(to right, #101B14, #1B3E2B)",
        "nav-dark3": "linear-gradient(to right, #081B10, #122D1A)",
        "green-gradient": "linear-gradient(to bottom right, #014308, #026C10, #5CA362)",
        "golden-gradient": "linear-gradient(to bottom right, #D4AF37, #B8860B, #8B6508)",
        'gold-gradient': 'linear-gradient(to right, #D4AF37, #B8860B, #8B6508)',
        'gold-gradient-light': 'linear-gradient(to right, #D4AF37, #E6C97F, #F7EBD0)',
      },
    },
  },

 

  plugins: [
    require('daisyui')
  ],
};
