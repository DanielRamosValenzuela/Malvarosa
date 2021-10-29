import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { FaTruckMoving, FaClock } from "react-icons/fa";
import { ImLocation2 } from "react-icons/im";

import { Products } from "../Product/Products";
import { MainCarousel } from "../Carousel/MainCarousel";
import { Loading } from "../lib/Loading";

import "react-responsive-carousel/lib/styles/carousel.min.css";

export const HomeScreen = ({
  onAddToCart,
  search,
  caseFilter,
  filterProducts,
  categoriesInput,
  orderBy,
  handleChangeOrderBy,
  pagination,
  setPagination,
  page,
  setPage,
}) => {
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    //https://stackoverflow.com/questions/54954385/react-useeffect-causing-cant-perform-a-react-state-update-on-an-unmounted-comp
    setDidMount(true); // para error:Can't perform a React state update on an unmounted component
    return () => setDidMount(false); //didMount will be true in the unmounted state (ver if al final)
  }, []);

  if (!didMount) {
    //The component mounts, then the effect runs and sets didMount to true, then the component unmounts but didMount is never reset
    return <Loading />; //This was a method that I solve an SSR issue in my app thought will go with this case as well. If not promise should be cancelled I guess
  }
  return (
    <>
      {caseFilter === 0 && <MainCarousel />}
      <section style={{ marginTop: "100px" }}>
        {caseFilter === 0 && (
          <Box
            sx={{ p: 5 }}
            px={{ xs: 3, sm: 10 }}
            py={{ xs: 5, sm: 10 }}
            textAlign="center"
          >
            <Container maxWidth={"lg"}>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={4}>
                  <Box align="center">
                    <ImLocation2 size="98px" color="DarkOrange" />
                    <Typography variant="subtitle1">
                      Locales: Av.Pedro de validiva 578.
                      <br />
                      Av.Suezia 142.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box align="center">
                    <FaClock size="98px" color="green" />
                    <Typography variant="subtitle1">
                      Lunes a viernes desde 09:00 a 19:00 horas.
                      <br />
                      Sábado de 10:00 a 14:00 horas.
                      <br />
                      Domingo y festivo cerrado.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box align="center">
                    <FaTruckMoving size="98px" color="red" />
                    <Typography variant="subtitle1">
                      Despacho a Chile y Argentina. Los precios están en CLP.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>
        )}
        {caseFilter === 2 && (
          <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
            <Typography variant="h4">Productos de {categoriesInput}</Typography>
          </Box>
        )}
        {caseFilter === 1 && (
          <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
            <Typography variant="h4">
              Buscando los productos por su nombre...
            </Typography>
            <Typography variant="h6">
              Aprete inicio para volver al menu principal
            </Typography>
          </Box>
        )}
        {caseFilter !== 1 && (
          <div style={{ paddingTop: "60px" }}>
            <Grid
              container
              direction="row-reverse"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Grid item xs={8} md={3}>
                <FormControl fullWidth variant="standard">
                  <InputLabel id="filter">Ordenar por</InputLabel>
                  <Select
                    labelId="filter"
                    id="filter-select"
                    value={orderBy}
                    onChange={handleChangeOrderBy}
                  >
                    <MenuItem value={0}>Precio de menor a mayor</MenuItem>
                    <MenuItem value={1}>Precio de mayor a menor</MenuItem>
                    <MenuItem value={2}>Nuevos productos</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </div>
        )}
        <Products
          filterProducts={filterProducts}
          onAddToCart={onAddToCart}
          search={search}
          orderBy={orderBy}
          pagination={pagination}
          setPagination={setPagination}
          page={page}
          setPage={setPage}
        />
      </section>
    </>
  );
};
