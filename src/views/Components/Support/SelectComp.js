import { Select,MenuItem } from '@mui/material';
import React from 'react';

export const SelectComp = (props) => {
    return (
        <Select
            onChange={(event) => props.setValue(event.target.value)}
            variant='outlined'
            size='small'
            style={{
                marginTop: 15,
                marginBottom: 15
            }}
        >
            {props.list.map((types,key) => {
                return (
                    <MenuItem key={key} value={types.value} >{types.name}</MenuItem>
                )
            })}
        </Select>
    )
}