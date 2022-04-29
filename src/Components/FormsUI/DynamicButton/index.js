import * as React from 'react';
import Button from '@mui/material/Button';

export default function ButtonWrapper({children,...otherProps
}) {
  return (
    <Button variant="contained" size="small" { ...otherProps
    }>
        {children}
        </Button>

  );
}
