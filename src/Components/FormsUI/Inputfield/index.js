import React from 'react';
import { useField, useFormikContext } from 'formik';
import { Button } from '@material-ui/core';
const TextfieldWrapper = ({
  name,
  setEditMode,
  ...otherProps
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, mata] = useField(name);
  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: 'outlined',

  };

  if (mata && mata.touched && mata.error) {
    configTextfield.error = true;
    configTextfield.helperText = mata.error;
    console.log('mata.error',mata.error)
  }

  const handleChange = evt => {
    setEditMode(false)
    setFieldValue(name, [evt.target.files[0].name,evt.target.files[0].type,evt.target.files[0]]);    
    };

  return (
 <>
    
    <input
  accept="image/*"
  style={{ display: 'none' }}
  id="raised-button-file"
  multiple
  type="file"
  onChange={handleChange }
/>
{configTextfield.error && <div>{configTextfield.helperText}</div>}

<label htmlFor="raised-button-file">
  <Button variant="raised" component="span" >
    Upload
  </Button>
</label> 

    </>
  );
};

export default TextfieldWrapper;