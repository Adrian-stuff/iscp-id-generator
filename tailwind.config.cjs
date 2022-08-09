/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    // ({ matchUtilities, theme }) => {
    //   matchUtilities(
    //     // https://gist.github.com/olets/9b833a33d01384eed1e9f1e106003a3b
    //     {
    //       aspect: (value) => ({
    //         "@supports (aspect-ratio: 1 / 1)": {
    //           aspectRatio: value,
    //         },
    //         "@supports not (aspect-ratio: 1 / 1)": {
    //           // https://github.com/takamoso/postcss-aspect-ratio-polyfill

    //           "&::before": {
    //             content: '""',
    //             float: "left",
    //             paddingTop: `calc(100% / (${value}))`,
    //           },
    //           "&::after": {
    //             clear: "left",
    //             content: '""',
    //             display: "block",
    //           },
    //         },
    //       }),
    //     },
    //     { values: theme("aspectRatio") }
    //   );
    // },
  ],
  theme: {
    aspectRatio: {
      auto: "auto",
      square: "1 / 1",
      video: "16 / 9",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      10: "10",
      11: "11",
      12: "12",
      13: "13",
      14: "14",
      15: "15",
      16: "16",
    },
  },
};
