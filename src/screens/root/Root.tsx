import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import * as React from 'react';

interface TitleProps {
  children?: React.ReactNode;
}

export default function Title(props: TitleProps) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}

export const Root = () => {
  return (
    <Container component="main">
      <div className="row">
        <div className="col-11">asdas</div>
      </div>
      <div className="row">
        <div className="col-1">asdasd</div>
      </div>
    </Container>
  );
};
