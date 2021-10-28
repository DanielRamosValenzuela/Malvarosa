import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  CardActions,
} from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import Swal from "sweetalert2";
import useStyles from "./stylesProduct";

export const ProductNoStock = ({ product }) => {
  const classes = useStyles();

  const handleNoStock = () => {
    Swal.fire({
      icon: "error",
      title: "Sin stock",
      text: "No tenemos en este momento este producto en stock",
      confirmButtonText: "Aceptar",
    });
  };

  return (
    <div>
      <Card
        className={classes.root}
        style={{ borderColor: "red", borderStyle: "solid", borderWidth: "1px" }}
      >
        <CardMedia
          className={classes.media}
          image={product.image.url}
          title={product.name}
        />
        <CardContent>
          <div className={classes.cardContent}>
            <Typography variant="h5" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="h5">
              {product.price.formatted_with_symbol}
            </Typography>
          </div>
          <Typography
            dangerouslySetInnerHTML={{ __html: product.description }}
            variant="inherit"
            color="textSecondary"
          />
        </CardContent>
        <CardActions disabledspacing="true" className={classes.cardActions}>
          <IconButton
            aria-label="Añadir al carro"
            color="error"
            onClick={handleNoStock}
          >
            <AddShoppingCart />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};
