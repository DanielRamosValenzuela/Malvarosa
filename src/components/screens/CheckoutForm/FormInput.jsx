import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Grid } from "@material-ui/core";

export const FormInput = ({ name, label, required }) => {
  const { control } = useForm();
  const isError = false;
  return (
    <Grid item xs={12} sm={6}>
      <Controller
        name={name}
        control={control}
        render={() => (
          <TextField
            label={label}
            required={required}
            error={isError}
            fullWidth
          />
        )}
      />
    </Grid>
  );
};
