import React from "react";
import { Grid } from "@material-ui/core";

import { Product } from "./Product";

import useStyles from "./stylesProducts";

export const Products = ({ products, onAddToCart }) => {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justifyContent="center" spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={4}>
            <Product product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
