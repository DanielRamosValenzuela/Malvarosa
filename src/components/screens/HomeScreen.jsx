import React from "react";
import { Products } from "../Product/Products";

import { MainCarousel } from "../Carousel/MainCarousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Box, Typography } from "@material-ui/core";

export const HomeScreen = ({
  onAddToCart,
  search,
  caseFilter,
  filterProducts,
  categoriesInput,
}) => {
  return (
    <section>
      {caseFilter === 0 && <MainCarousel />}
      {caseFilter === 2 && (
        <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
          <Typography variant="h4">Productos de {categoriesInput}</Typography>
        </Box>
      )}

      <Products
        filterProducts={filterProducts}
        onAddToCart={onAddToCart}
        search={search}
      />
    </section>
  );
};
