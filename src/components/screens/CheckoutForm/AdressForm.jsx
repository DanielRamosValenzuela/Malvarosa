import React, { useState, useEffect } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { commerce } from "../../lib/commerce";

import { FormInput } from "./FormInput";

export const AdressForm = ({ checkoutToken, test }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");
  const methods = useForm();

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );

    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  //   const fetchSubdivisions = async (countryCode) => {
  //     const { subdivisions } = await commerce.services.localeListSubdivisions(
  //       countryCode
  //     );

  //     setShippingSubdivisions(subdivisions);
  //     setShippingSubdivision(Object.keys(subdivisions)[0]);
  //   };

  //   const fetchShippingOptions = async (
  //     checkoutTokenId,
  //     country,
  //     stateProvince = null
  //   ) => {
  //     const options = await commerce.checkout.getShippingOptions(
  //       checkoutTokenId,
  //       { country, region: stateProvince }
  //     );

  //     setShippingOptions(options);
  //     setShippingOption(options[0].id);
  //   };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, [checkoutToken.id]);

  //   useEffect(() => {
  //     if (shippingCountry) fetchSubdivisions(shippingCountry);
  //   }, [shippingCountry]);

  //   useEffect(() => {
  //     if (shippingSubdivision)
  //       fetchShippingOptions(
  //         checkoutToken.id,
  //         shippingCountry,
  //         shippingSubdivision
  //       );
  //   }, [shippingSubdivision]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Dirección de envío
      </Typography>
      <FormProvider {...methods}>
        <form>
          <Grid container spacing={3}>
            <FormInput required name="firstName" label="Nombre" />
            <FormInput required name="lastName" label="Apellido" />
            <FormInput required name="adress1" label="Dirección" />
            <FormInput required name="email" label="Email" />
            <FormInput required name="zip" label="Código postal (ZIP)" />

            <Grid item xs={12} sm={6}>
              <InputLabel>País</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {Object.entries(shippingCountries)
                  .map(([code, name]) => ({ id: code, label: name }))
                  .map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.label}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Región</InputLabel>
              <Select
                value={shippingSubdivision}
                fullWidth
                onChange={(e) => setShippingSubdivision(e.target.value)}
              >
                {Object.entries(shippingSubdivisions)
                  .map(([code, name]) => ({ id: code, label: name }))
                  .map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.label}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select
                value={shippingOption}
                fullWidth
                onChange={(e) => setShippingOption(e.target.value)}
              >
                {shippingOptions
                  .map((sO) => ({
                    id: sO.id,
                    label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
                  }))
                  .map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.label}
                    </MenuItem>
                  ))}
              </Select>
            </Grid> */}
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};