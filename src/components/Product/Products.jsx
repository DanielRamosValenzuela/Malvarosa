import React from "react";
import { Grid, Typography } from "@material-ui/core";

import { Product } from "./Product";

import useStyles from "./stylesProducts";

export const Products = ({ onAddToCart, search, filterProducts }) => {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justifyContent="center" spacing={4}>
        {filterProducts.length > 0 ? (
          filterProducts.map((product) => {
            return (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={4}>
                <Product product={product} onAddToCart={onAddToCart} />
              </Grid>
            );
          })
        ) : (
          <Typography>No existen productos con el nombre "{search}"</Typography>
        )}
      </Grid>
    </div>
  );
};
