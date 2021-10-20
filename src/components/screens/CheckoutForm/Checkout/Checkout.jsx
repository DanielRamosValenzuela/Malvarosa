import React, { useState, useEffect } from "react";
import { Paper, Stepper, Step, StepLabel, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { AdressForm } from "../AdressForm";
import { PaymentForm } from "../PaymentForm";
import { commerce } from "../../../lib/commerce";

import useStyles from "./stylesCheckout";

const steps = ["Dirección", "Detalles"];

export const Checkout = ({ cart }) => {
  const classes = useStyles();
  const history = useHistory();
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const Confirmation = () => <div>Confirmar</div>;

  useEffect(() => {
    if (cart.id) {
      const generateToken = async () => {
        try {
          const token = await commerce.checkout.generateToken(cart.id, {
            type: "cart",
          });

          setCheckoutToken(token);
          // console.log(token);
        } catch {
          if (activeStep !== steps.length) history.push("/");
        }
      };

      generateToken();
    }
  }, [cart, activeStep, history]);

  const test = (data) => {
    setShippingData(data);

    nextStep();
  };

  const Form = () =>
    activeStep === 0 ? (
      <AdressForm
        checkoutToken={checkoutToken}
        nextStep={nextStep}
        setShippingData={setShippingData}
        test={test}
      />
    ) : (
      <PaymentForm
        checkoutToken={checkoutToken}
        nextStep={nextStep}
        backStep={backStep}
        shippingData={shippingData}
      />
    );

  return (
    <>
      <div className={classes.toolbar} />
      <div>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Pagar
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </div>
    </>
  );
};
