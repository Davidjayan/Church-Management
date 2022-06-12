import { CSpinner } from "@coreui/react"
import { Grid } from "@mui/material"
import React,{ useState } from "react";

export const Loader =(props)=>{
    return(
        <Grid
        container
        style={{
            backgroundColor:"rgb(0,0,0,0.8)",
            width:"100%",
            height:"100%",
            position:"fixed",

            zIndex:9999,
            // display:"grid"
            display:props.loading==false?"none":"grid"
        }}
        alignContent={"center"}
        justifyContent="center"
        >
            <CSpinner
            variant="grow"
            color="danger"
            style={{
               transform:"scale(5,5)"
            }}
            />
        </Grid>
    )
}