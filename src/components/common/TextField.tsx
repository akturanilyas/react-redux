import React, { FormEventHandler } from 'react';
import { LinearProgress, List, TextField } from '@mui/material';

interface TextFieldProps {
  text?: string;
  onSubmit?: (event:any) => void;
  onChange?: (event:any) => void;
}

export const CustomizedTextField = (props: TextFieldProps) => {
  const { text, onSubmit, onChange } = props;

  return <>
    <TextField
      className={'w-full my-2 h-16'}
      value={text}
      onKeyDown={onSubmit}
      onChange={onChange}
      onSubmit={onSubmit}/>
  </>;
};
