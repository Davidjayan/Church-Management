import React, { useEffect, useState } from 'react'
import { url } from '../Constants'
import { Grid, Button, FormControlLabel, RadioGroup, Radio, Autocomplete, formLabelClasses } from '@mui/material'
import { CAlert, CButton, CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CFormSwitch, CFormTextarea } from '@coreui/react'
import { AlertMessage } from './Support/AlertMessage'
import { AppFooter } from 'src/components'
import { DataEntryForms } from './DataEntryForm'


const Dataentry = () => {
  const [familyheads, setFamilyheads] = useState([]);
  const [notify, setNotify] = useState({ isOpen: false, message: '', variant: 'filled', severity: 'error' });


  const [data, setData] = useState({
    name: '',
    dob: '',
    gender: 'male',
    weddingdate: '',
    emailid: '',
    mobile: '',
    address: '',
    familyhead: '',
    familyid: '',
    selfid: '',
    android: false,
    baptized: false,
    married: false,
  })

  let age
  useEffect(() => {


    let yearDifference = 31536000000;
    age = parseInt(parseInt((new Date().getTime()-new Date(data.dob).getTime())/yearDifference).toString().replace("-",""));


    console.log(age);
  }, [data.dob])
  


  const [validated, setValidated] = useState(false)

  const handleSubmit = (event) => {
    const form = event.currentTarget

    if (form.checkValidity() == false) {
      event.preventDefault()

      event.stopPropagation()
    }
    else {
      setValidated(true)
      addrecords();
    }

  }
  

  const addrecords = () => {
    if (validated) {
      let Familyid = data.familyid
      let Selfid = data.selfid
      let Name = data.name
      let Dob = data.dob
      let Age = age
      let Gender = data.gender
      let Married = data.married==false?0:data.married;
      let Weddingdate = data.weddingdate
      let Emailid = data.emailid
      let Mobile = data.mobile
      let Address = data.address
      let Familyhead = data.familyhead
      let Baptized = data.baptized==false?0:data.baptized
      let Android = data.android==false?0:data.android

      fetch(`${url}/member_details.php`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: Name,
          dob: Dob,
          age: Age,
          gender: Gender,
          married: Married,
          weddingdate: Weddingdate,
          emailid: Emailid,
          mobile: Mobile,
          address: Address,
          familyhead: Familyhead,
          baptized: Baptized,
          android: Android,
          familyid: Familyid,
          selfid: Selfid,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          setNotify({
            ...notify,
            isOpen:true,
            severity:result['status']==1?"success":"error",
            message:String(result['message'])
          });
          setData({
            name: '',
            dob: new Date(),
            gender: 'male',
            weddingdate: '',
            emailid: '',
            mobile: '',
            address: '',
            familyhead: '',
            familyid: '',
            selfid: '',
            android: false,
            baptized: false,
            married: false,
          });
        })
        .catch((error) => {
          console.error(error)
        })
    } else {
      setNotify({
        ...notify,
        isOpen:true,
        message:"Input all required"
      })
    }
  }

  const searchfamilyhead = () => {
    fetch(`${url}/searchfamilyhead.php`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((result) => {
        let filteredresult = [...new Set(result)]
        setFamilyheads(filteredresult)
      })
      .catch((error) => {
        console.error(error)
      })
  }
  useEffect(() => {
    searchfamilyhead()
  }, [])

  return (
    <DataEntryForms
    familyheads={familyheads}
    data={data}
    notify={notify}
    setNotify={setNotify}
    setData={setData}
    validated={validated}
    handleSubmit={handleSubmit}
    />
  )
}

export default Dataentry
