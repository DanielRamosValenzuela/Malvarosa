import React, { useState, useEffect } from "react";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Divider,
  Button,
  CssBaseline,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { AdressForm } from "../AdressForm";
import { PaymentForm } from "../PaymentForm";
import { commerce } from "../../../lib/commerce";

import useStyles from "./stylesCheckout";
import { Loading } from "../../../Loading";

const steps = ["Detalles de envío", "Sistema de pago"];

export const Checkout = ({ cart, onCaptureCheckout, order, error }) => {
  const classes = useStyles();
  const history = useHistory();
  const [didMount, setDidMount] = useState(false);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  useEffect(() => {
    //https://stackoverflow.com/questions/54954385/react-useeffect-causing-cant-perform-a-react-state-update-on-an-unmounted-comp
    setDidMount(true); // para error:Can't perform a React state update on an unmounted component
    return () => setDidMount(false); //didMount will be true in the unmounted state (ver if al final)
  }, []);

  useEffect(() => {
    if (cart.id) {
      const generateToken = async () => {
        try {
          const token = await commerce.checkout.generateToken(cart.id, {
            type: "cart",
          });

          setCheckoutToken(token);
        } catch {
          if (activeStep !== steps.length) history.push("/");
        }
      };

      generateToken();
    }
  }, [cart, activeStep, history]);

  const savingData = (data) => {
    setShippingData(data);
    nextStep();
  };

  let Confirmation = () =>
    order.customer ? (
      <>
        <div style={{ marginBottom: "15px" }}>
          <Typography variant="h5">
            Gracias por su compra, {order.customer.firstname}{" "}
            {order.customer.lastname}!
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant="subtitle2">
            Número de referencia: {order.customer_reference}
          </Typography>
        </div>
        <Button component={Link} variant="outlined" type="button" to="/">
          Volver a la tienda
        </Button>
      </>
    ) : (
      <Loading />
    );

  if (error) {
    Confirmation = () =>
      Swal.fire({
        icon: "error",
        title: "Su compra tuvo un error",
        text: "No hemos recibido su compra",
        footer:
          '<Button component={Link} variant="outlined" type="button" to="/">Volver a la tienda</Button>',
      });
  }

  const Form = () =>
    activeStep === 0 ? (
      <AdressForm checkoutToken={checkoutToken} savingData={savingData} />
    ) : (
      <PaymentForm
        checkoutToken={checkoutToken}
        nextStep={nextStep}
        backStep={backStep}
        shippingData={shippingData}
        onCaptureCheckout={onCaptureCheckout}
      />
    );

  if (!didMount) {
    //The component mounts, then the effect runs and sets didMount to true, then the component unmounts but didMount is never reset
    return null; //This was a method that I solve an SSR issue in my app thought will go with this case as well. If not promise should be cancelled I guess
  }

  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <div>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Procedimiento de pago
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
