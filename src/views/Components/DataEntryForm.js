import { CButton, CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CFormTextarea } from '@coreui/react'
import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { AlertMessage } from './Support/AlertMessage'



export const DataEntryForms = (props)=>{
    const data = props.data;
    const familyheads = props.familyheads;
    return(
        <CForm direction={'column'} alignItems={'center'} justifyItems={'stretch'} container item validated={props.validated} >
      <AlertMessage
      closeFunc={window.location.reload}
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
          value={data.FamilyID}
          margin="dense"
          variant="outlined"
          onChange={(event) => {
            props.setData({ ...data, FamilyID: event.target.value.toUpperCase() })
          }}
          placeholder="Family ID"
          label="Family ID"
          required
          invalid={data.FamilyID ? false : true}
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
          value={data.SelfID}
          margin="dense"
          variant="outlined"
          onFocus={() => props.setData({ ...data, SelfID: data.FamilyID.slice(3) })}
          placeholder="Self ID"
          label="Self ID"
          required
          readOnly
          invalid={data.SelfID ? false : true}
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
          value={data.Name}
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
            props.setData({ ...data, Name: Name1 })
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
          value={data.DOB}
          onChange={(event) => props.setData({ ...data, DOB: event.target.value })}
          label="Enter DOB"
          required
          invalid={data.DOB ? false : true}
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
          value={data.Gender}
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
            onChange={(event) => props.setData({ ...data, Gender: event.target.value })}
          />
          <FormControlLabel
            value="female"
            name="gender"
            label={'Female'}
            control={<Radio />}
            onChange={(event) => props.setData({ ...data, Gender: event.target.value })}
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
          value={data.Married==1||data.Married==true?true:false}
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
              props.setData({ ...data, Married: event.target.value == 'true' ? true : false })
            }}
          />
          <FormControlLabel
            value={false}
            control={<Radio />}
            label={'Unmarried'}
            onChange={(event) => {
              props.setData({ ...data, Married: event.target.value == 'true' ? true : false })
            }}
          />
        </RadioGroup>
      </CCol>
      <CCol md={4}
        style={{
          display: data.Married == true || data.Married==1? 'block' : 'none',
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
          value={data.WeddingDate}
          onChange={(event) => props.setData({ ...data, WeddingDate:event.target.value })}
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
          onChange={(event) => props.setData({ ...data, EmailID: event.target.value })}
          value={data.EmailID}
          invalid={(!data.EmailID || (data.EmailID.includes('@') && data.EmailID.includes('.com'))) ? false : true}
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
          value={data.Mobile}
          onChange={(event) => {
            let patt = /[^0-9]/g
            const ph = event.target.value.replace(patt, '')
            props.setData({ ...data, Mobile: ph.slice(0, 10) })
          }}
          required
          invalid={(data.Mobile.length === 10) ? false : true}
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
          value={data.Address}
          onChange={(event) => {
            const str = event.target.value.split(',')
            for (let i = 0; i < str.length; i++) {
              str[i] = str[i].charAt(0).toUpperCase() + str[i].substring(1)
            }
            const address = str.join(',')
            props.setData({ ...data, Address: address })
          }}
          required
          invalid={data.Address ? false : true}
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
          value={data.FamilyHead}
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
            props.setData({ ...data, FamilyHead: familyheadname })
          }}
          required
          invalid={data.FamilyHead ? false : true}
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
          value={data.Baptized==true||data.Baptized==1?true:false}
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
              props.setData({ ...data, Baptized: event.target.value == 'true' ? true : false })
            }
          />
          <FormControlLabel
            value={false}
            control={<Radio />}
            label={'Not Baptized'}
            onChange={(event) =>
              props.setData({ ...data, Baptized: event.target.value == 'true' ? true : false })
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
          value={data.Android==1||data.Android==true?true:false}
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
              props.setData({ ...data, Android: event.target.value == 'true' ? true : false })
            }
          />
          <FormControlLabel
            label={'Normal'}
            value={false}
            control={<Radio />}
            onChange={(event) =>
              props.setData({ ...data, Android: event.target.value == 'true' ? true : false })
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