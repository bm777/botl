module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      [
        "babel-preset-expo",
        // 'module:metro-react-native-babel-preset',
        {unstable_transformProfile: 'hermes-stable'},
      ],
    ],
    plugins: ["nativewind/babel"],
  };
};
