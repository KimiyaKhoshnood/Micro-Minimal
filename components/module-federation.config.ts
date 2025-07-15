export const mfConfig = {
  name: "components",
  exposes: {
    "./NewestBooking": "./src/post/newest-booking.tsx",
    "./Upload": "./src/upload/upload.tsx",
    "./Table": "./src/table/table.tsx",
    "./ProductCard": "./src/modules/shop/products/ProductCard.tsx",
    "./ProductsView": "./src/modules/shop/products/ProductsView.tsx",
  },
  shared: ["react", "react-dom"],
};
