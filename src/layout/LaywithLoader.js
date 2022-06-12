import { Loader } from "src/views/Components/Support/Loader"
import DefaultLayout from "./DefaultLayout"
import React, { useState } from "react"

export const LaywithLoader=(props)=>{
    const [loading,setLoading] = useState(false);
    return(
        <div>
            <Loader loading={loading} />
            <DefaultLayout setLoading={setLoading} {...props}/>
        </div>
    )
}