import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField, Grid } from "@material-ui/core";

export const FormInput = ({ name, label, required }) => {
  const { control } = useFormContext();
  const isError = false;
  return (
    <Grid item xs={12} sm={6}>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, isDirty, error },
        }) => (
          <TextField
            label={label}
            required={required}
            onChange={onChange}
            inputRef={ref}
            error={isError}
            fullWidth
          />
        )}
      />
    </Grid>
  );
};
