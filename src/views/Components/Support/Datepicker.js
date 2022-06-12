import React, { useEffect, useRef, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {TextField } from '@mui/material';

export const Datepicker =(props) =>{

    return(
        <DatePicker
            label={props.label}
            value={props.value}
            orientation='landscape'
            onChange={(newValue) => {
              const date = new Date(newValue).toLocaleDateString();
              const tempArr = date.split('/');
              props.setValue(`${tempArr[2]}-${tempArr[1]}-${tempArr[0]}`);
            }}
            renderInput={(params) => 
              <TextField variant='standard' 
              value={props.value}
              style={{
                marginRight:20
              }} {...params} />
            }
          />
    )
}