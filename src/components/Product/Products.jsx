import React, { useEffect, useState } from "react";
import { Grid, Typography, Pagination } from "@mui/material";

import { Product } from "./Product";
import { ProductNoStock } from "./ProductNoStock";

import useStyles from "./stylesProducts";
import { Loading } from "../lib/Loading";

const numberPerPage = 6;

export const Products = ({ onAddToCart, search, filterProducts, orderBy }) => {
  const [pagination, setPagination] = useState(1);
  const [arrProducts, setArrProducts] = useState([]);
  const [page, setPage] = useState(0);
  const classes = useStyles();
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    //https://stackoverflow.com/questions/54954385/react-useeffect-causing-cant-perform-a-react-state-update-on-an-unmounted-comp
    setDidMount(true); // para error:Can't perform a React state update on an unmounted component
    return () => setDidMount(false); //didMount will be true in the unmounted state (ver if al final)
  }, []);

  const totalPages = parseInt(filterProducts.length / numberPerPage) + 1;

  // console.log(filterProducts);
  useEffect(() => {
    const sortProducts = filterProducts.sort(function (a, b) {
      switch (orderBy) {
        case 0:
          if (a.price.raw > b.price.raw) {
            return 1;
          }
          if (a.price.raw < b.price.raw) {
            return -1;
          }
          break;
        case 1:
          if (a.price.raw < b.price.raw) {
            return 1;
          }
          if (a.price.raw > b.price.raw) {
            return -1;
          }
          break;
        case 2:
          if (a.created < b.created) {
            return 1;
          }
          if (a.created > b.created) {
            return -1;
          }
          break;

        default:
          break;
      }
      return 0;
    });
    const slicedArray = sortProducts.slice(
      page * numberPerPage,
      (page + 1) * numberPerPage
    );

    setArrProducts(slicedArray);
  }, [filterProducts, page, orderBy]);

  const handleChangePagination = (e, value) => {
    setPage(value - 1);
    setPagination(value);
  };

  if (!didMount) {
    //The component mounts, then the effect runs and sets didMount to true, then the component unmounts but didMount is never reset
    return <Loading />; //This was a method that I solve an SSR issue in my app thought will go with this case as well. If not promise should be cancelled I guess
  }
  return (
    <div className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justifyContent="center" spacing={4}>
        {arrProducts.length > 0 ? (
          arrProducts.map((product) => {
            if (product.inventory.available === 0) {
              return (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={4}>
                  <ProductNoStock product={product} />
                </Grid>
              );
            } else {
              return (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={4}>
                  <Product product={product} onAddToCart={onAddToCart} />
                </Grid>
              );
            }
          })
        ) : (
          <Typography>No existen productos con el nombre "{search}"</Typography>
        )}
      </Grid>
      <div
        style={{
          marginTop: "15px",
          marginRight: "15px",
          justifyContent: "flex-end",
          display: "flex",
        }}
      >
        <Pagination
          count={totalPages}
          page={pagination}
          color="secondary"
          variant="outlined"
          onChange={handleChangePagination}
        />
      </div>
    </div>
  );
};
