module.exports = {
  syntax: 'postcss-scss',
  parser: 'postcss-scss',

  plugins: [
    require('autoprefixer'),
    require('postcss-nested')
  ]
};