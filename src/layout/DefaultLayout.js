import { PanoramaPhotosphereOutlined } from '@mui/icons-material'
import React, { useState } from 'react'
import { Loader } from 'src/views/Components/Support/Loader'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

const DefaultLayout = (props) => {
  // props.setLoading(true);
    return (
      <div>
        <AppSidebar setLoading={props.setLoading} />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader setLoading={props.setLoading} />
          <div className="body flex-grow-1 px-3">
            <AppContent setLoading={props.setLoading} />
          </div>
          <AppFooter setLoading={props.setLoading} />
        </div>
      </div>
    )
}

export default DefaultLayout
