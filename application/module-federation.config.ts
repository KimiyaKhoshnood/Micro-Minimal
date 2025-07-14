export const mfConfig = {
  name: "application",
  exposes: {},
  remotes: {
    "components": "components@http://localhost:1001/mf-manifest.json"
  },
  shared: ["react", "react-dom"],
};
