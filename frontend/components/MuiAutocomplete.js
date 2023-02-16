import React,{useState} from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { Controller } from "react-hook-form";

function AutocompleteSelect({
  divClassname = "",
  autocompleteStyle = {},
  textFieldStyle = {},
  options,
  control,
  label,
  onChange,
  registerName,
  errorObject,
}) {
  return (
    <div className={divClassname}>
      <Controller
        name={registerName}
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            onChange={(event,value) => {field.onChange(value);onChange}}
            isOptionEqualToValue={(option,value) => option === value}
            sx={autocompleteStyle}
            options={options}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={textFieldStyle}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "disable", //disable browser autocomplete and autofill
                }}
                label={label}
              />
            )}
          />
        )}
      />
      {errorObject && <p className="error">{errorObject.message}</p>}
    </div>
  );
}

function AsyncAutoComplete({
  divClassname,
  autocompleteStyle = {},
  textFieldStyle = {},
  options,
  control,
  label,
  onChange,
  registerName,
  errorObject,
}) {
  const [open, setOpen] = useState(false);
  const loading = open && options.length === 0;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={divClassname}>
      <Controller
        name={registerName}
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            onChange={(event,value) => {field.onChange(value);onChange}}
            loading={loading}
            onOpen={handleOpen}
            onClose={handleClose}
            sx={autocompleteStyle}
            isOptionEqualToValue={(option,value) => option === value}
            options={options}
            renderInput={(params) => (
              <TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
                sx={textFieldStyle}
                label={label}
              />
            )}
          />
        )}
      />
      {errorObject && <p className="error">{errorObject.message}</p>}
    </div>
  );
}
