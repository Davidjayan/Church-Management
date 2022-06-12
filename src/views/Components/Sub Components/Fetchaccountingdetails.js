import React, { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Accordion, AccordionDetails, AccordionSummary, Alert, Autocomplete, Button, Grid, MenuItem, Select, Table, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { url } from '../../Constants';
import { CFormInput, CTable, CTableBody, CTableDataCell, CTableFoot, CTableHead, CTableHeaderCell, CTableRow, CAlert } from '@coreui/react';
import { AlertMessage } from '../Support/AlertMessage';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Controller, useForm } from 'react-hook-form';
import { CDatePicker } from '@coreui/react-pro';
import { Datepicker } from '../Support/Datepicker';
import { SelectComp } from '../Support/SelectComp';
import { toDate } from 'date-fns';



const Fetchaccountingdetails = () => {
  const [notify, setNotify] = useState({ isOpen: false, message: '', variant: 'filled', severity: 'error' });
  const [offeringtype, setofferingtype] = useState();
  const [fromdate, setfromdate] = useState();
  const [namelist, setnamelist] = useState([]);
  const [name, setname] = useState();
  const [todate, settodate] = useState();
  const [searchbynameobj, setsearchbynameobj] = useState([]);
  const [searchbydateobj, setsearchbydateobj] = useState([]);
  const [objoftotals, setsobjoftotals] = useState([]);
  const [display1, setdisplay1] = useState('none');
  const [display2, setdisplay2] = useState('none');
  const [display3, setdisplay3] = useState('none');
  const [namearray, setnamearray] = useState([]);
  const printref = useRef();

  const offeringTypes = [
    { "name": "Select", "value": "Select" },
    { "name": "Tithe", "value": "Tithe" },
    { "name": "Offering", "value": "Offering" },
    { "name": "Missionary", "value": "Missionary" },
    { "name": "Special Offering", "value": "Special Offering" },
    { "name": "Baptism Offering", "value": "Baptism Offering" },
    { "name": "Birthday Offering", "value": "Birthday Offering" },
    { "name": "Wedding Offering", "value": "Wedding Offering" },
    { "name": "Child Dedication Offering", "value": "Child Dedication Offering" },
    { "name": "Committed Offering", "value": "Committed Offering" },
    { "name": "Building Fund", "value": "Building Fund" }
  ]

  let flag = 0;

  let count = 0;

  const submitbyname = () => {
    if (fromdate !== undefined && todate !== undefined) {
      fetch(`${url}/accounting-submitbyname.php`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',

        },
        body: JSON.stringify({
          name: name,
          fromdate: fromdate,
          todate: todate

        })
      })
        .then(res => res.json())
        .then((result) => {
          if (result !== "No matches found on Record") {
            setNotify({
              ...notify,
              message:result
            })
            console.log(result,"RES")
            // setsearchbynameobj(result);
            // setdisplay1("block");

          } else {
            setdisplay1("none");
            setNotify({
              isOpen: true,
              message: result,
              variant: "filled",
              severity: "error"
            })


          }
        }).catch((error) => {
          console.error(error);
        });

    }


    else {
      setNotify({
        isOpen: true,
        message: "Input required",
        variant: "filled",
        severity: "error"
      })
    }
  }

  const submitbydate = () => {
    if (fromdate !== undefined && todate !== undefined) {
      fetch(`${url}/accounting-submitbydate.php`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',

        },
        body: JSON.stringify({
          fromdate: fromdate,
          todate: todate

        })
      })
        .then(res => res.json())
        .then((result) => {
          if (result !== "No matches found on Record") {
            setsearchbydateobj(result);
            setdisplay2("block");
            result.map((l) => {
              setnamearray(cp => [...cp, l.Name]);
            })

          } else {
            setdisplay2("none");
            return (
              setNotify({
                ...notify,
                isOpen: true,
                message: result
              })
            )

          }
        }).catch((error) => {
          console.error(error);
        });

    }
    else {
      setNotify({
        isOpen: true,
        message: "Input All required",
        variant: "filled",
        severity: "error"
      })
    }
  }

  const searchapi = () => {
    fetch(`${url}/searchname.php`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',

      },
    })
      .then(res => res.json())
      .then((result) => {
        setnamelist(result);
      }).catch((error) => {
        console.error(error);
      });
  }
  useEffect(() => {
    searchapi();
  }, [1])

  const submitbydateglobal = () => {
    if (fromdate !== undefined && todate !== undefined) {
      fetch(`${url}/accounting-submitchurchofferings-totals.php`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',

        },
        body: JSON.stringify({

          fromdate: fromdate,
          todate: todate

        })
      })
        .then(res => res.json())
        .then((result) => {
          if (result !== "No matches found on Record") {
            setsobjoftotals(result);
            setdisplay3("block");

          } else {
            setNotify({
              isOpen: true,
              message: result,
              variant: "filled",
              severity: "error"
            })
            setdisplay3("none");

          }
        }).catch((error) => {
          console.error(error);
        });

    }


    else {
      setNotify({
        isOpen: true,
        message: "Input All required",
        variant: "filled",
        severity: "error"
      })
    }
  }

  let titheTotalofp = searchbynameobj.reduce((accumulator, item) => item.Type === 'Tithe' ? accumulator + parseFloat(item.Amount) : accumulator, 0);

  let offeringTotalofp = searchbynameobj.reduce((accumulator, item) => item.Type === 'Offering' ? accumulator + parseFloat(item.Amount) : accumulator, 0);

  let missionaryTotalofp = searchbynameobj.reduce((accumulator, item) => item.Type === 'Missionary' ? accumulator + parseFloat(item.Amount) : accumulator, 0);

  let specialofferingTotalofp = searchbynameobj.reduce((accumulator, item) => item.Type === 'Special Offering' ? accumulator + parseFloat(item.Amount) : accumulator, 0);

  let baptismofferingTotalofp = searchbynameobj.reduce((accumulator, item) => item.Type === 'Baptism Offering' ? accumulator + parseFloat(item.Amount) : accumulator, 0);

  let birthdayofferingTotalofp = searchbynameobj.reduce((accumulator, item) => item.Type === 'Birthday Offering' ? accumulator + parseFloat(item.Amount) : accumulator, 0);

  let weddingofferingTotalofp = searchbynameobj.reduce((accumulator, item) => item.Type === 'Wedding Offering' ? accumulator + parseFloat(item.Amount) : accumulator, 0);

  let childdedicationofferingTotalofp = searchbynameobj.reduce((accumulator, item) => item.Type === 'Child Dedication Offering' ? accumulator + parseFloat(item.Amount) : accumulator, 0);

  let committedofferingTotalofp = searchbynameobj.reduce((accumulator, item) => item.Type === 'Committed Offering' ? accumulator + parseFloat(item.Amount) : accumulator, 0);

  let buildingfundTotalofp = searchbynameobj.reduce((accumulator, item) => item.Type === 'Building Fund' ? accumulator + parseFloat(item.Amount) : accumulator, 0);




  let titheTotal = searchbydateobj.reduce((accumulator, item) => item.Type === 'Tithe' ? accumulator + parseFloat(item.Amount) : accumulator, 0);

  let offeringTotal = searchbydateobj.reduce((accumulator, item) => item.Type === 'Offering' ? accumulator + parseFloat(item.Amount) : accumulator, 0);

  let missionaryTotal = searchbydateobj.reduce((accumulator, item) => item.Type === 'Missionary' ? accumulator + parseFloat(item.Amount) : accumulator, 0);

  let specialofferingTotal = searchbydateobj.reduce((accumulator, item) => item.Type === 'Special Offering' ? accumulator + parseFloat(item.Amount) : accumulator, 0);

  let baptismofferingTotal = searchbydateobj.reduce((accumulator, item) => item.Type === 'Baptism Offering' ? accumulator + parseFloat(item.Amount) : accumulator, 0);

  let birthdayofferingTotal = searchbydateobj.reduce((accumulator, item) => item.Type === 'Birthday Offering' ? accumulator + parseFloat(item.Amount) : accumulator, 0);

  let weddingofferingTotal = searchbydateobj.reduce((accumulator, item) => item.Type === 'Wedding Offering' ? accumulator + parseFloat(item.Amount) : accumulator, 0);

  let childdedicationofferingTotal = searchbydateobj.reduce((accumulator, item) => item.Type === 'Child Dedication Offering' ? accumulator + parseFloat(item.Amount) : accumulator, 0);

  let committedofferingTotal = searchbydateobj.reduce((accumulator, item) => item.Type === 'Committed Offering' ? accumulator + parseFloat(item.Amount) : accumulator, 0);

  let buildingfundTotal = searchbydateobj.reduce((accumulator, item) => item.Type === 'Building Fund' ? accumulator + parseFloat(item.Amount) : accumulator, 0);

  let Total = isNaN(searchbydateobj.reduce((accumulator, item) => isNaN(accumulator) ? 0 : accumulator + parseFloat(item.Amount), 0)) ? 0 : searchbydateobj.reduce((accumulator, item) => isNaN(accumulator) ? 0 : accumulator + parseFloat(item.Amount), 0);

  let grandTotal = (1 * objoftotals.reduce((accumulator, item) => accumulator + parseFloat(item.One), 0)) + (2 * objoftotals.reduce((accumulator, item) => accumulator + parseFloat(item.Two), 0)) + (5 * objoftotals.reduce((accumulator, item) => accumulator + parseFloat(item.Five), 0)) + (10 * objoftotals.reduce((accumulator, item) => accumulator + parseFloat(item.Ten), 0)) + (20 * objoftotals.reduce((accumulator, item) => accumulator + parseFloat(item.Twenty), 0)) + (50 * objoftotals.reduce((accumulator, item) => accumulator + parseFloat(item.Fifty), 0)) + (100 * objoftotals.reduce((accumulator, item) => accumulator + parseFloat(item.Hundreds), 0)) + (200 * objoftotals.reduce((accumulator, item) => accumulator + parseFloat(item.TwoHundreds), 0)) + (500 * objoftotals.reduce((accumulator, item) => accumulator + parseFloat(item.FiveHundreds), 0)) + (2000 * objoftotals.reduce((accumulator, item) => accumulator + parseFloat(item.TwoThousands), 0));
  const churchOffering = grandTotal - Total;

  return (
    <Grid style={{ display: 'grid', justifyContent: 'center', marginTop: '15px' }} >
      <AlertMessage
        notify={notify}
        setNotify={setNotify}
      />
      <Accordion>

        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography
            variant='subtitle2'
          >Name</Typography>
        </AccordionSummary>
        <AccordionDetails>

          <CFormInput placeholder="Enter Name"
            list="namelist"
            value={name}
            style={{
              width: 250,
              margin: 2
            }}
            onChange={(event) => {
              const str = event.target.value.split(' ');
              for (let i = 0; i < str.length; i++) {

                str[i] = str[i].charAt(0).toUpperCase() + str[i].substring(1);
              }

              const Name = str.join(' ');

              setname(Name);
            }}
          />
          <datalist style={{ backgroundColor: "black" }} id="namelist">
            {namelist.map((k, key) => {
              return (
                <option key={key} >{k}</option>
              )
            })}
          </datalist>
          <Grid>
            <Datepicker
              label='From Date'
              value={fromdate}
              setValue={setfromdate}
            />
            <Datepicker
              label='To Date'
              value={todate}
              setValue={settodate}
            />
          </Grid>
          <Grid>
            <SelectComp
              setValue={setofferingtype}
              list={offeringTypes}
            />
            {/* <Select
              onChange={(event) => setofferingtype(event.target.value)}
              defaultValue=""
              variant='outlined'
              size='small'
              style={{
                marginTop: 15,
                marginBottom: 15
              }}
            >
              {offeringTypes.map((types,key)=>{
                return(
                  <MenuItem value={types.value} >{types.name}</MenuItem>
                )
              })}
            </Select> */}
          </Grid>
          <Button
            variant='contained'
            onClick={() => submitbyname()}
          > Submit
          </Button>




          <Grid style={{ display: display1 }}>
            <CTable >
              <CTableHead>
                <CTableHeaderCell>Name</CTableHeaderCell>
                <CTableHeaderCell>Type Of Offering</CTableHeaderCell>
                <CTableHeaderCell>Amount</CTableHeaderCell>
                <CTableHeaderCell>Date</CTableHeaderCell>
              </CTableHead>
              <CTableBody>
                {
                  searchbynameobj !== '' ? searchbynameobj.map(
                    (k) => {

                      if (k.Type === offeringtype) {
                        return (
                          <CTableRow>
                            <CTableDataCell>
                              {k.Name}
                            </CTableDataCell>
                            <CTableDataCell>
                              {k.Type}
                            </CTableDataCell>
                            <CTableDataCell>
                              {k.Amount}
                            </CTableDataCell>
                            <CTableDataCell>
                              {new Date(k.Date).toLocaleDateString()}
                            </CTableDataCell>
                          </CTableRow>
                        )

                      }
                      else {
                        return (
                          <Grid>

                          </Grid>
                        )
                      }
                    }
                  ) : ''
                }
              </CTableBody>
            </CTable>

            <Typography
              fontStyle={'italic'}
              fontWeight={900}
            >{offeringtype} Total of {name}
              from {new Date(fromdate ? fromdate : '').toLocaleDateString()} to {new Date(todate ? todate : '').toLocaleDateString()}
              : {offeringtype === "Tithe" ? titheTotalofp : offeringtype === "Offering" ? offeringTotalofp : offeringtype === "Missionary" ? missionaryTotalofp : offeringtype === "Special Offering" ? specialofferingTotalofp : offeringtype === "Baptism Offering" ? baptismofferingTotalofp : offeringtype === "Birthday Offering" ? birthdayofferingTotalofp : offeringtype === "Wedding Offering" ? weddingofferingTotalofp : offeringtype === "Child Dedication Offering" ? childdedicationofferingTotalofp : offeringtype === "Committed Offering" ? committedofferingTotalofp : offeringtype === "Building Fund" ? buildingfundTotalofp : 0}
            </Typography>
          </Grid>
        </AccordionDetails>

      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography
            variant='subtitle2'
          >Date</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Datepicker
            label='From Date'
            value={fromdate}
            setValue={setfromdate}
          />
          <Datepicker
            label='To Date'
            value={todate}
            setValue={settodate}
          />
          <SelectComp
            setValue={setofferingtype}
            list={offeringTypes}
          />
          {/* <Select onChange={(event) => setofferingtype(event.target.value)} >
            {offeringTypes.map((types,key)=>{
              return(
                <MenuItem value={types.value} >{types.name}</MenuItem>
              )
            })}
          </Select> */}
          <Button className="btn2" onClick={() => submitbydate()} >Submit</Button>

          <Grid style={{ display: display2 }}>

            <CTable>
              <CTableHead>
                <CTableHeaderCell>Name</CTableHeaderCell>
                <CTableHeaderCell>Amount</CTableHeaderCell>
                <CTableHeaderCell>Date</CTableHeaderCell>
                <CTableHeaderCell>Type</CTableHeaderCell>
              </CTableHead>
              <CTableBody>
                {searchbydateobj.map((k) => {
                  if (offeringtype === "default") {
                    return (
                      <CTableRow>
                        <CTableDataCell>{k.Name}</CTableDataCell>
                        <CTableDataCell>{k.Amount}</CTableDataCell>
                        <CTableDataCell>{k.Date}</CTableDataCell>
                        <CTableDataCell>{k.Type}</CTableDataCell>
                      </CTableRow>
                    )
                  }
                  else if (k.Type === offeringtype) {

                    return (
                      <CTableRow>
                        <CTableDataCell>{k.Name}</CTableDataCell>
                        <CTableDataCell>{k.Amount}</CTableDataCell>
                        <CTableDataCell>{k.Date}</CTableDataCell>
                      </CTableRow>
                    )
                  }
                  else {
                    return (
                      <Grid>

                      </Grid>
                    )
                  }
                })}
              </CTableBody>
            </CTable>
            <Typography>
              Tithe Total from {new Date(fromdate ? fromdate : '').toLocaleDateString()} to {new Date(todate ? todate : '').toLocaleDateString()}: {titheTotal}
            </Typography>
            <Typography>
              Offering Total from {new Date(fromdate ? fromdate : '').toLocaleDateString()} to {new Date(todate ? todate : '').toLocaleDateString()}: {offeringTotal}
            </Typography>
            <Typography>
              Missionary Total from {new Date(fromdate ? fromdate : '').toLocaleDateString()} to {new Date(todate ? todate : '').toLocaleDateString()}: {missionaryTotal}
            </Typography>
            <Typography>
              Special offering Total from {new Date(fromdate ? fromdate : '').toLocaleDateString()} to {new Date(todate ? todate : '').toLocaleDateString()}: {specialofferingTotal}
            </Typography>
            <Typography>
              Baptism offering Total from {new Date(fromdate ? fromdate : '').toLocaleDateString()}  to {new Date(todate ? todate : '').toLocaleDateString()}: {baptismofferingTotal}
            </Typography>
            <Typography>
              Birthday Offering Total from {new Date(fromdate ? fromdate : '').toLocaleDateString()} to {new Date(todate ? todate : '').toLocaleDateString()}: {birthdayofferingTotal}
            </Typography>
            <Typography>
              Wedding offering Total from {new Date(fromdate ? fromdate : '').toLocaleDateString()} to {new Date(todate ? todate : '').toLocaleDateString()}: {weddingofferingTotal}
            </Typography>
            <Typography>
              Child Dedication offering Total from {new Date(fromdate ? fromdate : '').toLocaleDateString()} to {new Date(todate ? todate : '').toLocaleDateString()}: {childdedicationofferingTotal}
            </Typography>
            <Typography>
              Committed offering Total from {new Date(fromdate ? fromdate : '').toLocaleDateString()} to {new Date(todate ? todate : '').toLocaleDateString()}: {committedofferingTotal}
            </Typography>
            <Typography>
              Building Fund offering Total from {new Date(fromdate ? fromdate : '').toLocaleDateString()} to {new Date(todate ? todate : '').toLocaleDateString()}: {buildingfundTotal}
            </Typography>
          </Grid>
        </AccordionDetails>



      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography
            variant='subtitle2'
          >Church Offerings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Datepicker
            value={fromdate}
            label='From Date'
            setValue={setfromdate}
          />
          <Datepicker
            value={todate}
            label='To Date'
            setValue={settodate}
          />
          <Button className="btn2" onClick={() => submitbydateglobal()}>Submit</Button>

          {objoftotals.map(
            (k) => {
              if (k.ChurchOffering !== "0") {
                flag = 1;
                return (
                  <Typography>Church Offering on {k.Date} : Rs.{k.ChurchOffering} </Typography>
                )
              } else {
                return (
                  <Grid>
                    {setNotify({
                      ...notify,
                      message: 'No values found'
                    })}
                  </Grid>
                )
              }

            }
          )}
        </AccordionDetails>

      </Accordion>
      <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography
            variant='subtitle2'
          >Find Denominations</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Datepicker
            label='From Date'
            value={fromdate}
            setValue={setfromdate}
          />
          <Datepicker
            value={todate}
            label='To Date'
            setValue={settodate}
          />
          <Button className="btn2" onClick={() => { submitbydateglobal() }}>Submit</Button>

          <CTable style={{ display: display3 }} >
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>S.No</CTableHeaderCell>
                <CTableHeaderCell>2000s</CTableHeaderCell>
                <CTableHeaderCell>500s</CTableHeaderCell>
                <CTableHeaderCell>200s</CTableHeaderCell>
                <CTableHeaderCell>100s</CTableHeaderCell>
                <CTableHeaderCell>50s</CTableHeaderCell>
                <CTableHeaderCell>20s</CTableHeaderCell>
                <CTableHeaderCell>10s</CTableHeaderCell>
                <CTableHeaderCell>5s</CTableHeaderCell>
                <CTableHeaderCell>2s</CTableHeaderCell>
                <CTableHeaderCell>1s</CTableHeaderCell>
                <CTableHeaderCell>Date</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>

              {

                objoftotals.map(
                  (k) => {
                    count = count + 1;
                    return (
                      <CTableRow key={count}>
                        <CTableDataCell>{count}</CTableDataCell>
                        <CTableDataCell>{k.TwoThousands}</CTableDataCell>
                        <CTableDataCell>{k.FiveHundreds}</CTableDataCell>
                        <CTableDataCell>{k.TwoHundreds}</CTableDataCell>
                        <CTableDataCell>{k.Hundreds}</CTableDataCell>
                        <CTableDataCell>{k.Fifty}</CTableDataCell>
                        <CTableDataCell>{k.Twenty}</CTableDataCell>
                        <CTableDataCell>{k.Ten}</CTableDataCell>
                        <CTableDataCell>{k.Five}</CTableDataCell>
                        <CTableDataCell>{k.Two}</CTableDataCell>
                        <CTableDataCell>{k.One}</CTableDataCell>
                        <CTableDataCell>{k.Date}</CTableDataCell>
                      </CTableRow>
                    )
                  }
                )}

            </CTableBody>
            <CTableFoot>
              <CTableRow>
                <CTableDataCell>Total</CTableDataCell>
                <CTableDataCell>{objoftotals.reduce((accumulator, item) => accumulator + parseFloat(item.TwoThousands), 0)}</CTableDataCell>
                <CTableDataCell>{objoftotals.reduce((accumulator, item) => accumulator + parseFloat(item.FiveHundreds), 0)}</CTableDataCell>
                <CTableDataCell>{objoftotals.reduce((accumulator, item) => accumulator + parseFloat(item.TwoHundreds), 0)}</CTableDataCell>
                <CTableDataCell>{objoftotals.reduce((accumulator, item) => accumulator + parseFloat(item.Hundreds), 0)}</CTableDataCell>
                <CTableDataCell>{objoftotals.reduce((accumulator, item) => accumulator + parseFloat(item.Fifty), 0)}</CTableDataCell>
                <CTableDataCell>{objoftotals.reduce((accumulator, item) => accumulator + parseFloat(item.Twenty), 0)}</CTableDataCell>
                <CTableDataCell>{objoftotals.reduce((accumulator, item) => accumulator + parseFloat(item.Ten), 0)}</CTableDataCell>
                <CTableDataCell>{objoftotals.reduce((accumulator, item) => accumulator + parseFloat(item.Five), 0)}</CTableDataCell>
                <CTableDataCell>{objoftotals.reduce((accumulator, item) => accumulator + parseFloat(item.Two), 0)}</CTableDataCell>
                <CTableDataCell>{objoftotals.reduce((accumulator, item) => accumulator + parseFloat(item.One), 0)}</CTableDataCell>
              </CTableRow>
            </CTableFoot>
          </CTable>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography
            variant='subtitle2'
          >Full Record</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid>
            <Datepicker
              label='From Date'
              value={fromdate}
              setValue={setfromdate}
            />
            <Datepicker
              label='To Date'
              value={todate}
              setValue={settodate}
            />
            <Button className="btn2" onClick={() => { submitbydate(); submitbydateglobal() }}>Submit</Button>
          </Grid>
          <Grid ref={printref}
            style={{
              margin: 20
            }}
          >
            <CTable >
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell colSpan="11" >
                    JEHOVAH NISSI AG CHURCH ACCOUNTS REPORT
                  </CTableHeaderCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell colSpan="11" >
                    REPORT FROM {new Date(fromdate ? fromdate : '').toLocaleDateString()} TO {new Date(todate ? todate : '').toLocaleDateString()}
                  </CTableHeaderCell>
                </CTableRow>

                <CTableRow>
                  <CTableHeaderCell>Name</CTableHeaderCell>
                  <CTableHeaderCell>Tithe</CTableHeaderCell>
                  <CTableHeaderCell>Offering</CTableHeaderCell>
                  <CTableHeaderCell>Missionary</CTableHeaderCell>
                  <CTableHeaderCell>Special Offering</CTableHeaderCell>
                  <CTableHeaderCell>Baptism Offering</CTableHeaderCell>
                  <CTableHeaderCell>Birthday Offering</CTableHeaderCell>
                  <CTableHeaderCell>Wedding Offering</CTableHeaderCell>
                  <CTableHeaderCell>Child Dedication Offering</CTableHeaderCell>
                  <CTableHeaderCell>Committed Offering</CTableHeaderCell>
                  <CTableHeaderCell>Building Fund</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>

                {[...new Set(namearray)].map((k, key) => {
                  return (
                    <CTableRow key={key} >
                      <CTableDataCell>{k}</CTableDataCell>
                      <CTableDataCell>
                        {searchbydateobj.map((l) => {
                          if (l.Name === k && l.Type === "Tithe") {
                            return (
                              <p>
                                {l.Amount}
                              </p>
                            )
                          }


                        })}
                      </CTableDataCell>
                      <CTableDataCell>
                        {searchbydateobj.map((l) => {
                          if (l.Name === k && l.Type === "Offering") {
                            return (
                              <p>
                                {l.Amount}
                              </p>
                            )
                          }


                        })}
                      </CTableDataCell>
                      <CTableDataCell>
                        {searchbydateobj.map((l) => {
                          if (l.Name === k && l.Type === "Missionary") {
                            return (
                              <p>
                                {l.Amount}
                              </p>
                            )
                          }


                        })}
                      </CTableDataCell>
                      <CTableDataCell>
                        {searchbydateobj.map((l) => {
                          if (l.Name === k && l.Type === "Special Offering") {
                            return (
                              <p>
                                {l.Amount}
                              </p>
                            )
                          }


                        })}
                      </CTableDataCell>
                      <CTableDataCell>
                        {searchbydateobj.map((l) => {
                          if (l.Name === k && l.Type === "Baptism Offering") {
                            return (
                              <p>
                                {l.Amount}
                              </p>
                            )
                          }


                        })}
                      </CTableDataCell>
                      <CTableDataCell>
                        {searchbydateobj.map((l) => {
                          if (l.Name === k && l.Type === "Birthday Offering") {
                            return (
                              <p>
                                {l.Amount}
                              </p>
                            )
                          }


                        })}
                      </CTableDataCell>
                      <CTableDataCell>
                        {searchbydateobj.map((l) => {
                          if (l.Name === k && l.Type === "Wedding Offering") {
                            return (
                              <p>
                                {l.Amount}
                              </p>
                            )
                          }


                        })}
                      </CTableDataCell>
                      <CTableDataCell>
                        {searchbydateobj.map((l) => {
                          if (l.Name === k && l.Type === "Child Dedication Offering") {
                            return (
                              <p>
                                {l.Amount}
                              </p>
                            )
                          }


                        })}
                      </CTableDataCell>
                      <CTableDataCell>
                        {searchbydateobj.map((l) => {
                          if (l.Name === k && l.Type === "Committed Offering") {
                            return (
                              <p>
                                {l.Amount}
                              </p>
                            )
                          }


                        })}
                      </CTableDataCell>
                      <CTableDataCell>
                        {searchbydateobj.map((l) => {
                          if (l.Name === k && l.Type === "Building Fund") {
                            return (
                              <p>
                                {l.Amount}
                              </p>
                            )
                          }

                        })}
                      </CTableDataCell>


                    </CTableRow>
                  )
                })}
                <CTableRow>
                  <CTableHeaderCell>Total</CTableHeaderCell>
                  <CTableDataCell>{titheTotal}</CTableDataCell>
                  <CTableDataCell>{offeringTotal}</CTableDataCell>
                  <CTableDataCell>{missionaryTotal}</CTableDataCell>
                  <CTableDataCell>{specialofferingTotal}</CTableDataCell>
                  <CTableDataCell>{baptismofferingTotal}</CTableDataCell>
                  <CTableDataCell>{birthdayofferingTotal}</CTableDataCell>
                  <CTableDataCell>{weddingofferingTotal}</CTableDataCell>
                  <CTableDataCell>{childdedicationofferingTotal}</CTableDataCell>
                  <CTableDataCell>{committedofferingTotal}</CTableDataCell>
                  <CTableDataCell>{buildingfundTotal}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell colSpan="7"></CTableDataCell>
                  <CTableHeaderCell colSpan="2">Church Offering</CTableHeaderCell>
                  <CTableDataCell colSpan="2">{churchOffering}</CTableDataCell></CTableRow>
                <CTableRow>
                  <CTableDataCell colSpan="7"></CTableDataCell>
                  <CTableHeaderCell colSpan="2">Grand Total</CTableHeaderCell><CTableDataCell colSpan="2">{grandTotal}</CTableDataCell></CTableRow>
              </CTableBody>
            </CTable>

            <Grid className="deno">
              <Table
                size='small'
              >
                <TableHead>
                  <TableRow>
                    <TableCell colSpan="2" >DENOMINATIONS</TableCell>
                  </TableRow>
                </TableHead>
                <TableRow> <TableCell>2000 x {objoftotals.reduce((accumulator, item) => accumulator + parseFloat(item.TwoThousands), 0)} = {2000 * (objoftotals.reduce((accumulator, item) => accumulator + parseFloat(item.TwoThousands), 0))} </TableCell></TableRow>
                <TableRow><TableCell>500 x {objoftotals.reduce((accumulator, item) => accumulator + parseFloat(item.FiveHundreds), 0)}=  {500 * (objoftotals.reduce((accumulator, item) => accumulator + parseFloat(item.FiveHundreds), 0))} </TableCell></TableRow>
                <TableRow><TableCell>200 x {objoftotals.reduce((accumulator, item) => accumulator + parseFloat(item.TwoHundreds), 0)} = {200 * (objoftotals.reduce((accumulator, item) => accumulator + parseFloat(item.TwoHundreds), 0))} </TableCell></TableRow>
                <TableRow><TableCell>100 x {objoftotals.reduce((accumulator, item) => accumulator + parseFloat(item.Hundreds), 0)} =  {100 * (objoftotals.reduce((accumulator, item) => accumulator + parseFloat(item.Hundreds), 0))} </TableCell></TableRow>
                <TableRow><TableCell>50 x {objoftotals.reduce((accumulator, item) => accumulator + parseFloat(item.Fifty), 0)}= {50 * (objoftotals.reduce((accumulator, item) => accumulator + parseFloat(item.Fifty), 0))} </TableCell></TableRow>
                <TableRow><TableCell>20 x {objoftotals.reduce((accumulator, item) => accumulator + parseFloat(item.Twenty), 0)} = {20 * (objoftotals.reduce((accumulator, item) => accumulator + parseFloat(item.Twenty), 0))} </TableCell></TableRow>
                <TableRow><TableCell>10 x {objoftotals.reduce((accumulator, item) => accumulator + parseFloat(item.Ten), 0)} = {10 * (objoftotals.reduce((accumulator, item) => accumulator + parseFloat(item.Ten), 0))} </TableCell></TableRow>
                <TableRow><TableCell>5 x {objoftotals.reduce((accumulator, item) => accumulator + parseFloat(item.Five), 0)}= {5 * (objoftotals.reduce((accumulator, item) => accumulator + parseFloat(item.Five), 0))}</TableCell> </TableRow>
                <TableRow><TableCell>2 x {objoftotals.reduce((accumulator, item) => accumulator + parseFloat(item.Two), 0)}= {2 * (objoftotals.reduce((accumulator, item) => accumulator + parseFloat(item.Two), 0))} </TableCell></TableRow>
                <TableRow><TableCell>1 x {objoftotals.reduce((accumulator, item) => accumulator + parseFloat(item.One), 0)}= {1 * (objoftotals.reduce((accumulator, item) => accumulator + parseFloat(item.One), 0))}</TableCell> </TableRow>

              </Table>
            </Grid>

          </Grid>


          <Button
            variant='contained'
            onClick={useReactToPrint({
              content: () => printref.current, documentTitle: new Date(fromdate ? fromdate : '').toLocaleDateString() + " to " + new Date(todate ? todate : '').toLocaleDateString()
            })} >Save as PDF</Button>

        </AccordionDetails>
      </Accordion>

    </Grid>
  )

}
export default Fetchaccountingdetails;