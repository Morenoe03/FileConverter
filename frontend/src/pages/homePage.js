import React from 'react';
import { Button } from '@mui/material';

const homePage = () => {
  return (
    <>
      <Button variant="contained" color="primary">Click Me</Button>
      <div>
        <h1>Welcome to My React App!</h1>
        <p>This is the home page content.</p>
      </div>
    </>
  );
};

export default homePage;
