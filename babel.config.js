module.exports = {
  presets: ['next/babel', '@babel/preset-typescript'],
  plugins: [
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-object-rest-spread',
  ],
};
