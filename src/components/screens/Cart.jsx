import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

import useStyles from "./stylesCart";
import { CartItem } from "./CartItem/CartItem";

export const Cart = ({
  cart,
  onUpdateCartQty,
  onRemoveFromCart,
  onEmptyCart,
}) => {
  const classes = useStyles();

  const handleEmptyCart = () => onEmptyCart();

  const renderEmptyCart = () => (
    <Typography variant="subtitle1">
      No tienes nada en tu carrito.
      <Link className={classes.link} to="/">
        Empieza agregar ahora.
      </Link>
    </Typography>
  );

  if (!cart.line_items) return "Cargando...";

  const renderCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((lineItem) => (
          <Grid item xs={12} sm={4} key={lineItem.id}>
            <CartItem
              item={lineItem}
              onUpdateCartQty={onUpdateCartQty}
              onRemoveFromCart={onRemoveFromCart}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">
          Subtotal: {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={handleEmptyCart}
          >
            Vaciar carro
          </Button>
          <Button
            className={classes.checkoutButton}
            component={Link}
            to="/checkout"
            size="large"
            type="button"
            variant="contained"
            color="primary"
          >
            Pagar
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h2" gutterBottom>
        Tus compras
      </Typography>
      {!cart.line_items.length ? renderEmptyCart() : renderCart()}
    </Container>
  );
};
