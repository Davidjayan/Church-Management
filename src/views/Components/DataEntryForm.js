import React, { useEffect, useState } from 'react'
import { url } from '../Constants'
import { Grid, Button, FormControlLabel, RadioGroup, Radio, Autocomplete, formLabelClasses } from '@mui/material'
import { CAlert, CButton, CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CFormSwitch, CFormTextarea } from '@coreui/react'
import { AlertMessage } from './Support/AlertMessage'
import { AppFooter } from 'src/components'
import { DataEntryForm } from './DataEntryForm'



export const DataEntryForms = (props)=>{
    const data = props.data;
    const familyheads = props.familyheads;
    return(
        <CForm direction={'column'} alignItems={'center'} justifyItems={'stretch'} container item validated={props.validated}>
      <AlertMessage
        notify={props.notify}
        setNotify={props.setNotify}
      />
      <CCol md={4}>
        <CFormLabel>
          Family ID
        </CFormLabel>
        <CFormInput
          style={{ width: 300, marginRight: 15 }}
          name="familyid"
          value={data.familyid}
          margin="dense"
          variant="outlined"
          onChange={(event) => {
            props.setData({ ...data, familyid: event.target.value.toUpperCase() })
          }}
          placeholder="Family ID"
          label="Family ID"
          required
          invalid={data.familyid ? false : true}
        />
        <CFormFeedback
          invalid
        >Field is required</CFormFeedback>
      </CCol>
      <CCol md={4} >
        <CFormLabel>
          Self ID
        </CFormLabel>
        <CFormInput
          name="selfid"
          style={{ width: 300, marginRight: 15 }}
          value={data.selfid}
          margin="dense"
          variant="outlined"
          onFocus={() => props.setData({ ...data, selfid: data.familyid.slice(3) })}
          placeholder="Self ID"
          label="Self ID"
          required
          readOnly
          invalid={data.selfid ? false : true}
        />
        <CFormFeedback
          invalid
        >
          Field is required
        </CFormFeedback>
      </CCol>

      <CCol>
        <CFormLabel>
          Name
        </CFormLabel>
        <CFormInput
          name="name"
          value={data.name}
          style={{ width: 300, marginRight: 15 }}
          margin="dense"
          variant="outlined"
          onChange={(event) => {
            const str = event.target.value.split(' ')
            for (let i = 0; i < str.length; i++) {
              str[i] = str[i].charAt(0).toUpperCase() + str[i].substring(1)
            }
            const patt = /[^a-zA-Z ]/g;
            const Name1 = str.join(' ').replace(patt, '');
            props.setData({ ...data, name: Name1 })
          }}
          placeholder="Enter Name"
          label="Enter Name"
          // invalid={data.name ? false : true}
          required
        />
        <CFormFeedback
          invalid
        >
          Please fill this field
        </CFormFeedback>
      </CCol>
      <CCol md={4} >
        <CFormLabel>
          Date Of Birth
        </CFormLabel>
        <CFormInput
          type={'date'}
          style={{ width: 300, marginRight: 15 }}
          value={data.dob}
          onChange={(event) => props.setData({ ...data, dob: event.target.value })}
          label="Enter DOB"
          required
          invalid={data.dob ? false : true}
        />
        <CFormFeedback
          invalid
        >
          Field is required
        </CFormFeedback>
      </CCol>
      <CCol md={4} >
        <CFormLabel>
          Gender
        </CFormLabel>
        <RadioGroup
          row
          aria-label="gender"
          name="row-radio-buttons-group"
          style={{
            width: 300,
            justifyContent: 'space-evenly',
          }}
        >
          <FormControlLabel
            value="male"
            name="gender"
            label={'Male'}
            control={<Radio />}
            onChange={(event) => props.setData({ ...data, gender: event.target.value })}
          />
          <FormControlLabel
            value="female"
            name="gender"
            label={'Female'}
            control={<Radio />}
            onChange={(event) => props.setData({ ...data, gender: event.target.value })}
          />
        </RadioGroup>
      </CCol>
      <CCol md={4} >
        <CFormLabel>
          Martial status
        </CFormLabel>
        <RadioGroup
          row
          aria-label="martial-status"
          name="row-radio-buttons-group"
          style={{
            width: 300,
            justifyContent: 'space-evenly',
          }}
        >
          <FormControlLabel
            value={true}
            label={'Married'}
            control={<Radio />}
            onChange={(event) => {
              props.setData({ ...data, married: event.target.value == 'true' ? true : false })
            }}
          />
          <FormControlLabel
            value={false}
            control={<Radio />}
            label={'Unmarried'}
            onChange={(event) => {
              props.setData({ ...data, married: event.target.value == 'true' ? true : false })
            }}
          />
        </RadioGroup>
      </CCol>
      <CCol md={4}
        style={{
          display: data.married === true ? 'block' : 'none',
          width: 300,
          marginRight: 15,
        }}
      >
        <CFormLabel>
          Wedding Date
        </CFormLabel>
        <CFormInput
          type="date"
          label="Wedding Date"
          margin="dense"
          variant="outlined"
          value={data.weddingdate}
          onChange={(event) => props.setData({ ...data, weddingdate:event.target.value })}
        />
      </CCol>

      <CCol>
        <CFormLabel>
          Email
        </CFormLabel>
        <CFormInput
          name="emailid"
          placeholder='Enter Emailid'
          margin="dense"
          label="Email ID"
          style={{ width: 300, marginRight: 15 }}
          variant="outlined"
          onChange={(event) => props.setData({ ...data, emailid: event.target.value })}
          value={data.emailid}
          invalid={(!data.emailid || (data.emailid.includes('@') && data.emailid.includes('.com'))) ? false : true}
        />
        <CFormFeedback
          invalid
        >
          Please input valid email address
        </CFormFeedback>
      </CCol>
      <CCol>
        <CFormLabel>
          Mobile
        </CFormLabel>
        <CFormInput
          name="mobile"
          style={{ width: 300, marginRight: 15 }}
          label="Mobile"
          placeholder='Enter mobile number'
          margin="dense"
          variant="outlined"
          value={data.mobile}
          onChange={(event) => {
            let patt = /[^0-9]/g
            const ph = event.target.value.replace(patt, '')
            props.setData({ ...data, mobile: ph.slice(0, 10) })
          }}
          required
          invalid={(data.mobile.length === 10) ? false : true}
        />
        <CFormFeedback invalid>
          Enter valid number
        </CFormFeedback>
      </CCol>



      <CCol>
        <CFormLabel>
          Address
        </CFormLabel>
        <CFormTextarea
          name="address"
          label="Address"
          placeholder='Enter address'
          style={{ width: 300, marginRight: 15 }}
          margin="dense"
          variant="outlined"
          value={data.address}
          onChange={(event) => {
            const str = event.target.value.split(',')
            for (let i = 0; i < str.length; i++) {
              str[i] = str[i].charAt(0).toUpperCase() + str[i].substring(1)
            }
            const address = str.join(',')
            props.setData({ ...data, address: address })
          }}
          required
          invalid={data.address ? false : true}
        />
        <CFormFeedback
          invalid
        >
          Field is required
        </CFormFeedback>
      </CCol>
      <CCol md={4}>
        <CFormLabel>
          Family head
        </CFormLabel>
        <CFormInput
          name="familyhead"
          value={data.familyhead}
          margin="dense"
          placeholder='Enter family head'
          variant="outlined"
          label="Family Head"
          onChange={(event) => {
            const str = event.target.value.split(' ')
            for (let i = 0; i < str.length; i++) {
              str[i] = str[i].charAt(0).toUpperCase() + str[i].substring(1)
            }
            const familyheadname = str.join(' ')
            props.setData({ ...data, familyhead: familyheadname })
          }}
          required
          invalid={data.familyhead ? false : true}
          list='listforfamilyheads'
        />
        <datalist id='listforfamilyheads'>
          {familyheads.map((f, key) => {
            return (
              <option key={key} >{f}</option>
            )
          })}
        </datalist>
        <CFormFeedback invalid>
          Field is required
        </CFormFeedback>
      </CCol>
      <CCol md={4}>
        <CFormLabel>
          Baptism
        </CFormLabel>
        <RadioGroup
          row
          aria-label="Baptizm"
          name="row-radio-buttons-group"
          style={{
            width: 300,
            justifyContent: 'space-evenly',
          }}
        >
          <FormControlLabel
            control={<Radio />}
            value={true}
            label={'Baptized'}
            onChange={(event) =>
              props.setData({ ...data, baptized: event.target.value == 'true' ? true : false })
            }
          />
          <FormControlLabel
            value={false}
            control={<Radio />}
            label={'Not Baptized'}
            onChange={(event) =>
              props.setData({ ...data, baptized: event.target.value == 'true' ? true : false })
            }
          />
        </RadioGroup>
      </CCol>
      <CCol md={4}>
        <CFormLabel>
          Mobile type
        </CFormLabel>
        <RadioGroup
          row
          aria-label="mobile-type"
          name="row-radio-buttons-group"
          style={{
            width: 300,
            justifyContent: 'space-evenly',
          }}
        >
          <FormControlLabel
            label={'Android'}
            value={true}
            control={<Radio />}
            onChange={(event) =>
              props.setData({ ...data, android: event.target.value == 'true' ? true : false })
            }
          />
          <FormControlLabel
            label={'Normal'}
            value={false}
            control={<Radio />}
            onChange={(event) =>
              props.setData({ ...data, android: event.target.value == 'true' ? true : false })
            }
          />
        </RadioGroup>
      </CCol>

      <CButton onClick={props.handleSubmit} >
        Add to records
      </CButton>
    </CForm>
    )
} 