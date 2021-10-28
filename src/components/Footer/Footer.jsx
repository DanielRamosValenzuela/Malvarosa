import React from "react";
import { Container, Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { FaInstagram, FaWhatsapp, FaFacebook, FaTwitter } from "react-icons/fa";
import useStyles from "./stylesFooter";
import logo from "../../assets/image/logo.png";
import stripe from "../../assets/image/stripe.png";

export const Footer = ({ childre, ...restProps }) => {
  const classes = useStyles();
  return (
    <Box sx={{ p: 5 }} px={{ xs: 3, sm: 10 }} py={{ xs: 5, sm: 10 }}>
      <Container maxWidth={"lg"}>
        <Box
          textAlign="center"
          pt={{ xs: 5, sm: 10 }}
          pb={{ xs: 5, sm: 0 }}
          sx={{ m: 5 }}
        >
          <a href="https://stripe.com/es-419-us">
            <img
              src={stripe}
              alt="Stripe"
              height="150px"
              className={classes.img}
            ></img>
          </a>
        </Box>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Box borderBottom={1}>
              <img src={logo} alt="Malvarosa Verde" height="50px"></img>
            </Box>
            <Box>
              <Link to="/" className={classes.link}>
                Quiénes somos
              </Link>
            </Box>
            <Box>
              <Link to="/" className={classes.link}>
                Provedores
              </Link>
            </Box>
            <Box>
              <Link to="/" className={classes.link}>
                Sistema de regalos
              </Link>
            </Box>
            <Box>
              <Link to="/" className={classes.link}>
                Términos y condiciones
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box borderBottom={1}>
              <Typography variant="h6">Ayuda</Typography>
            </Box>
            <Box>
              <Link to="/" className={classes.link}>
                Contacto
              </Link>
            </Box>
            <Box>
              <Link to="/" className={classes.link}>
                Soporte
              </Link>
            </Box>
            <Box>
              <Link to="/" className={classes.link}>
                Póliticas de privacidad
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box borderBottom={1}>
              <Typography variant="h6">Redes sociales</Typography>
            </Box>
            <Box>
              <Link to="/" className={classes.link}>
                <FaInstagram /> Instagram
              </Link>
            </Box>
            <Box>
              <Link to="/" className={classes.link}>
                <FaFacebook /> Facebook
              </Link>
            </Box>
            <Box>
              <Link to="/" className={classes.link}>
                <FaWhatsapp /> Whatsapp
              </Link>
            </Box>
            <Box>
              <Link to="/" className={classes.link}>
                <FaTwitter /> Twiter
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
          @daniel.andres.ramos.v@gmail.com &reg; {new Date().getFullYear()}
        </Box>
      </Container>
    </Box>
  );
};
