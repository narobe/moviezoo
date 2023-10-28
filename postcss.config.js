const autoprefixer = require("autoprefixer");
// const postcssMixins = require("postcss-mixins");
const postcssnested = require("postcss-nested");
const postcssImport = require("postcss-import");
const cssnano = require("cssnano");
const postcssPresetEnv = require("postcss-preset-env");
module.exports = {
  plugins: [
    autoprefixer,
    postcssPresetEnv({ stage: 1 }),
    postcssImport,
    postcssnested,
    // postcssMixins,
    cssnano,
  ],
};
