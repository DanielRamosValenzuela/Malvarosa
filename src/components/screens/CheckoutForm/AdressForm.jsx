import React, { useState, useEffect } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";

import { commerce } from "../../lib/commerce";
import { FormInput } from "./FormInput";

export const AdressForm = ({ checkoutToken, savingData }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");
  const [didMount, setDidMount] = useState(false);
  const methods = useForm();
  let tokenSaved = checkoutToken.id;

  useEffect(() => {
    //https://stackoverflow.com/questions/54954385/react-useeffect-causing-cant-perform-a-react-state-update-on-an-unmounted-comp
    setDidMount(true); // para error:Can't perform a React state update on an unmounted component
    return () => setDidMount(false); //didMount will be true in the unmounted state (ver if al final)
  }, []);

  useEffect(() => {
    (async () => {
      const fetchShippingCountries = async () => {
        const { countries } =
          await commerce.services.localeListShippingCountries(tokenSaved);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
      };

      fetchShippingCountries();
    })();
  }, [tokenSaved]);

  useEffect(() => {
    setShippingOptions([]);
    setShippingOption("");
    if (!!shippingCountry)
      (async () => {
        const fetchSubdivisions = async () => {
          const { subdivisions } =
            await commerce.services.localeListShippingSubdivisions(
              tokenSaved,
              shippingCountry
            );
          setShippingSubdivisions(subdivisions);
          setShippingSubdivision(Object.keys(subdivisions)[0]);
        };
        fetchSubdivisions();
      })();
  }, [shippingCountry, tokenSaved]);

  useEffect(() => {
    (async () => {
      const fetchShippingOptions = async () => {
        if (!!shippingSubdivision) {
          const options = await commerce.checkout.getShippingOptions(
            tokenSaved,
            {
              country: shippingCountry,
              region: shippingSubdivision,
            }
          );
          setShippingOptions(options);
          setShippingOption(options[0].id);
        }
      };
      fetchShippingOptions();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shippingSubdivision, tokenSaved]);

  if (!didMount) {
    //The component mounts, then the effect runs and sets didMount to true, then the component unmounts but didMount is never reset
    return null; //This was a method that I solve an SSR issue in my app thought will go with this case as well. If not promise should be cancelled I guess
  }

  return (
    !!shippingCountries && (
      <>
        <Typography variant="h6" gutterBottom>
          Dirección de envío
        </Typography>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit((data) =>
              savingData({
                ...data,
                shippingCountry,
                shippingSubdivision,
                shippingOption,
              })
            )}
          >
            <Grid container spacing={3}>
              <FormInput required name="firstName" label="Nombre" />
              <FormInput required name="lastName" label="Apellido" />
              <FormInput required name="address1" label="Dirección" />
              <FormInput required name="city" label="Ciudad" />
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
              {shippingOption.length > 0 && (
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
              )}
              {shippingOption.length > 0 && (
                <Grid item xs={12} sm={6}>
                  <InputLabel>Cobro por despacho</InputLabel>
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
                </Grid>
              )}
            </Grid>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "15px",
              }}
            >
              <Button component={Link} variant="outlined" to="/cart">
                Volver
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Siguiente
              </Button>
            </div>
          </form>
        </FormProvider>
      </>
    )
  );
};
