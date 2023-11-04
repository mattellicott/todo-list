/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [require("postcss-sorting")],
};

module.exports = {
  plugins: {
    "postcss-sorting": {
      order: [
        "custom-properties",
        "dollar-variables",
        "declarations",
        "at-rules",
        "rules",
      ],

      "properties-order": "alphabetical",

      "unspecified-properties-position": "bottom",
    },
  },
};
