import { Alert, Collapse,Slide ,IconButton } from "@mui/material";
import React,{ useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

export const AlertMessage=(props)=>{
  const {notify,setNotify} = props;
    return(
        <Slide direction="down" in={notify.isOpen}>
        <Alert
          severity={notify.severity}
          variant={notify.variant}
          style={{
            alignContent:"center",
            alignItems:"center",
            fontSize:18,
            position:'fixed',
            zIndex:3,
            marginLeft:'25%'
          }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="large"
              onClick={() => {
                setNotify({...notify,isOpen:false});
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb:7 }}
          points="0,100 50,00, 100,100"
        >
         {notify.message}
        </Alert>
      </Slide>
    )
}