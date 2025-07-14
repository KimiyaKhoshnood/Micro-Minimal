export const mfConfig = {
  name: "components",
  exposes: {
    "./NewestBooking" : "./src/post/newest-booking.tsx",
    "./Upload" : "./src/upload/upload.tsx",
    "./Table" : "./src/table/table.tsx"
  },
  shared: ["react", "react-dom"],
};
