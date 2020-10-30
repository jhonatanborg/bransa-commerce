module.exports = {
  apps: [
    {
      name: "bransa-commerce",
      script: "index.js",
      watch: ".",
    },
    {
      script: "npm",
      args: "run deploy",
      watch: false,
    },
  ],
};
