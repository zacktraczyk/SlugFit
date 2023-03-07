// Tailwind Config File
// -------------------
// "The theme section is where you define your color palette, font stacks, type
// scale, border sizes, breakpoints — anything related to the visual design of
// your site."

module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: '',
        body: '',
        bebas: ['BebasNeue_400Regular'], // Add loaded font to taillwind font family
        sans: ['BebasNeue_400Regular'],
      },
    },
    colors: {
      darkBlue: '#19639E',
      lightBlue: '#BADEFB',
      darkRed: '#B92916',
      lightRed: '#FFC0B8',
    },
  },
};
