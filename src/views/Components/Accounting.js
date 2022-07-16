import { Grid, TextField, Select, MenuItem, Button, IconButton, Typography, Table, TableBody, TableCell, TableRow, Autocomplete } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { url } from "../Constants";
import { AlertMessage } from "./Support/AlertMessage";
import { Datepicker } from "./Support/Datepicker";



const Accounting = (props) => {
  const {setLoading} = props;
  const [people, setPeople] = useState([{ id: 1, Name: '', type: '', Amount: '' }]);
  const [count, setCount] = useState(2);
  const [names, setnames] = useState([]);
  const [notify, setNotify] = useState({ isOpen: false, message: '', variant: 'filled', severity: 'error' });


  const arrOfferingTypes = [
    { "name": "Select", "value": "" },
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


  const [dateofofferings, setdateofofferings] = useState();

  const [offeringsAsObject, setOfferings] = useState(
    [
      { "price": 2000, "cnt": 0, "tot": 0 },
      { "price": 500, "cnt": 0, "tot": 0 },
      { "price": 200, "cnt": 0, "tot": 0 },
      { "price": 100, "cnt": 0, "tot": 0 },
      { "price": 50, "cnt": 0, "tot": 0 },
      { "price": 20, "cnt": 0, "tot": 0 },
      { "price": 10, "cnt": 0, "tot": 0 },
      { "price": 5, "cnt": 0, "tot": 0 },
      { "price": 2, "cnt": 0, "tot": 0 },
      { "price": 1, "cnt": 0, "tot": 0 },
    ]
  );

  let name = people.map((k) => k.Name);

  let type = people.map((k) => k.type);

  let amount = people.map((k) => k.Amount);





  let today = new Date();

  let dd = today.getDate();
  dd = dd < 10 ? "0" + dd : dd;


  let mm = (today.getMonth() + 1) > 12 ? today.getMonth() : today.getMonth() + 1;
  mm = mm < 10 ? "0" + mm : mm;
  if (dd === "00") {
    dd = 31;
    mm = mm - 1;
  }
  let yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;

  let grandTotal = offeringsAsObject.reduce((accumulator, item) => accumulator + item.tot, 0);
  grandTotal = isNaN(grandTotal) ? 0 : grandTotal;

  let Total = isNaN(people.reduce((accumulator, item) => isNaN(accumulator) ? 0 : accumulator + parseFloat(item.Amount), 0)) ? 0 : people.reduce((accumulator, item) => isNaN(accumulator) ? 0 : accumulator + parseFloat(item.Amount), 0);

  const churchOffering = isNaN(grandTotal - Total) ? 0 : grandTotal - Total;



  let titheTotal = isNaN(people.reduce((accumulator, item) => item.type === 'Tithe' ? accumulator + parseFloat(item.Amount) : accumulator, 0)) ? 0 : people.reduce((accumulator, item) => item.type === 'Tithe' ? accumulator + parseFloat(item.Amount) : accumulator, 0);

  let offeringTotal = isNaN(people.reduce((accumulator, item) => item.type === 'Offering' ? accumulator + parseFloat(item.Amount) : accumulator, 0)) ? 0 : people.reduce((accumulator, item) => item.type === 'Offering' ? accumulator + parseFloat(item.Amount) : accumulator, 0);

  let missionaryTotal = isNaN(people.reduce((accumulator, item) => item.type === 'Missionary' ? accumulator + parseFloat(item.Amount) : accumulator, 0)) ? 0 : people.reduce((accumulator, item) => item.type === 'Missionary' ? accumulator + parseFloat(item.Amount) : accumulator, 0);

  let specialofferingTotal = isNaN(people.reduce((accumulator, item) => item.type === 'Special Offering' ? accumulator + parseFloat(item.Amount) : accumulator, 0)) ? 0 : people.reduce((accumulator, item) => item.type === 'Special Offering' ? accumulator + parseFloat(item.Amount) : accumulator, 0);

  let baptismofferingTotal = isNaN(people.reduce((accumulator, item) => item.type === 'Baptism Offering' ? accumulator + parseFloat(item.Amount) : accumulator, 0)) ? 0 : people.reduce((accumulator, item) => item.type === 'Baptism Offering' ? accumulator + parseFloat(item.Amount) : accumulator, 0);

  let birthdayofferingTotal = isNaN(people.reduce((accumulator, item) => item.type === 'Birthday Offering' ? accumulator + parseFloat(item.Amount) : accumulator, 0)) ? 0 : people.reduce((accumulator, item) => item.type === 'Birthday Offering' ? accumulator + parseFloat(item.Amount) : accumulator, 0);

  let weddingofferingTotal = isNaN(people.reduce((accumulator, item) => item.type === 'Wedding Offering' ? accumulator + parseFloat(item.Amount) : accumulator, 0)) ? 0 : people.reduce((accumulator, item) => item.type === 'Wedding Offering' ? accumulator + parseFloat(item.Amount) : accumulator, 0);

  let childdedicationofferingTotal = isNaN(people.reduce((accumulator, item) => item.type === 'Child Dedication Offering' ? accumulator + parseFloat(item.Amount) : accumulator, 0)) ? 0 : people.reduce((accumulator, item) => item.type === 'Child Dedication Offering' ? accumulator + parseFloat(item.Amount) : accumulator, 0);

  let committedofferingTotal = isNaN(people.reduce((accumulator, item) => item.type === 'Committed Offering' ? accumulator + parseFloat(item.Amount) : accumulator, 0)) ? 0 : people.reduce((accumulator, item) => item.type === 'Committed Offering' ? accumulator + parseFloat(item.Amount) : accumulator, 0);

  let buildingfundTotal = isNaN(people.reduce((accumulator, item) => item.type === 'Building Fund' ? accumulator + parseFloat(item.Amount) : accumulator, 0)) ? 0 : people.reduce((accumulator, item) => item.type === 'Building Fund' ? accumulator + parseFloat(item.Amount) : accumulator, 0);

  let arrOfTotals = [
    { "name": "Total", "value": Total },
    { "name": "Tithe Total", "value": titheTotal },
    { "name": "Offering Total", "value": offeringTotal },
    { "name": "Special Offering Total", "value": specialofferingTotal },
    { "name": "Missionary Total", "value": missionaryTotal },
    { "name": "Church Offering", "value": churchOffering },
    { "name": "Grand Total", "value": grandTotal }
  ]

  const submit = () => {
    if (name[0] && dateofofferings && (amount !== 0) && churchOffering >= 0) {
      setLoading(true);
      fetch(`${url}/accounting.php`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',

        },
        body: JSON.stringify({
          name: name,
          type: type,
          amount: amount,
          dateofofferings: dateofofferings,
          churchOffering: churchOffering,
          titheTotal: titheTotal,
          grandTotal: grandTotal,
          offeringTotal: offeringTotal,
          missionaryTotal: missionaryTotal,
          specialofferingTotal: specialofferingTotal,
          buildingfundTotal: buildingfundTotal,
          baptismofferingTotal: baptismofferingTotal,
          birthdayofferingTotal: birthdayofferingTotal,
          weddingofferingTotal: weddingofferingTotal,
          childdedicationofferingTotal: childdedicationofferingTotal,
          committedofferingTotal: committedofferingTotal,
          twothousands: offeringsAsObject[0].cnt,
          twohundreds: offeringsAsObject[2].cnt,
          fivehundreds: offeringsAsObject[1].cnt,
          hundreds: offeringsAsObject[3].cnt,
          fiftys: offeringsAsObject[4].cnt,
          twentys: offeringsAsObject[5].cnt,
          tens: offeringsAsObject[6].cnt,
          fives: offeringsAsObject[7].cnt,
          twos: offeringsAsObject[8].cnt,
          ones: offeringsAsObject[9].cnt

        })
      })
        .then(res => res.json())
        .then((result) => {
          setLoading(false);
          setNotify({
            isOpen: true,
            message: result['message'],
            severity:result['status']==1?'success':'error',
            variant: 'filled'
          })

        }).catch((error) => {
          console.error(error);
        });

    }


    else {
      setNotify({
        ...notify,
        isOpen: true,
        message: "Input required",
        severity: "error"
      })
    }
  }


  const searchapi = () => {
    setLoading(true);
    fetch(`${url}/searchname.php`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',

      },
    })
      .then(res => res.json())
      .then((result) => {
        setLoading(false);
        setnames(result);
      }).catch((error) => {
        console.error(error);
      });
  }
  useEffect(() => {
    searchapi();
  }, [])


  useEffect(()=>{
    console.log("-------------");
console.log(people,"PEOPLE");
  },[people])


  return (
    <Grid>

      <AlertMessage
        notify={notify}
        setNotify={setNotify}
      />
      <Grid
        container
        justifyContent={"space-evenly"}
        direction={"row"}
      >
        <Grid>
          <Table
            size="small"
          >
            {people.map((p,index) => {
              let name = '';
              return (
                <Grid key={p.id}>
                  <TableRow>
                    <TableCell>
                      <Autocomplete
                        options={names}
                        fullWidth={false}
                        style={{ width: 200 }}
                        onChange={(val,event) => {
                          let str = event;
                            name = str;
                            setPeople(...[people],people[index].Name = str);
                          
                          
                        }}

                        onInputChange={(event, newInputValue) => {
                          if(p.Name=='' || newInputValue.includes(p.Name)){
                            setPeople(...[people],people[index].Name = newInputValue);
                            console.log(people[index]);

                          }
                        }}

                        value={p.Name}

                        renderInput={params =>
                          <TextField
                            {...params}
                            margin="dense"
                            onChange={(e)=>{
                            setPeople(...[people],people[index].Name = e.target.value);
                              console.log(e.target.value);

                            }}
                            ref={params.InputProps.ref}
                            size="small"
                            placeholder="Enter Name"
                            value={p.Name}
                          />
                        }
                        
                      />
                    </TableCell>
                    <TableCell>

                      <Select
                        size="small"
                        style={{ width: 200, marginTop: 7 }}
                        onChange={(event) => {
                          const type = event.target.value;
                          setPeople((currentPeople) => currentPeople.map(x => x.id === p.id ? {
                            ...x,
                            type
                          } : x));

                        }}
                      >

                        {arrOfferingTypes.map((val, key) => {
                          return (
                            <MenuItem
                              key={key}
                              value={val.value}
                            >
                              {val.name}
                            </MenuItem>
                          )
                        })}
                      </Select>
                    </TableCell>
                    <TableCell>

                      <TextField
                        margin="dense"
                        size="small"
                        style={{ width: 200 }}
                        onChange={(event) => {
                          const Am = event.target.value;
                          let patt = /[^0-9]/g;
                          const Amount = parseFloat(Am.replace(patt, ''));
                          setPeople((currentPeople) => currentPeople.map(x => x.id === p.id ? {
                            ...x,
                            Amount
                          } : x));
                        }}
                        value={p.Amount}
                        type="number"
                        placeholder="Enter Amount" />
                    </TableCell>
                    <TableCell>

                      <IconButton
                        style={{ justifySelf: "center", alignSelf: "center" }}
                        onClick={
                          () => {
                            setPeople(currentPeople => currentPeople.filter(x => x.id !== p.id)); setCount(count - 1)
                          }
                        }>
                        <DeleteOutlineIcon
                          style={{ justifySelf: "center", alignSelf: "center" }}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </Grid>
              )

            })}
          </Table>
          <IconButton
            onClick={() => {
              setPeople(currentPeople => [...currentPeople, {
                id: count,
                Name: '',
                type: '',
                Amount: '',
              }]); setCount(count + 1)
            }}
          ><AddCircleOutlineIcon /></IconButton>
          <Table>
            <TableBody>
              {arrOfTotals.map((val, key) => {
                return (
                  <TableRow
                    key={key}
                  >
                    <TableCell>{val.name}</TableCell>
                    <TableCell>{val.value}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
          <Button
            variant="contained"
            onClick={submit}
          >
            Submit
          </Button>
        </Grid>
        <Grid>
          <Datepicker
            value={dateofofferings}
            setValue={setdateofofferings}
            label='Set Date'
          />
          <Button
            onClick={() => setdateofofferings(today)}
          >
            Click if date is todays date
          </Button>
          <Table
            size="small"
          >
            <TableBody>
              {offeringsAsObject.map((k, key) => {
                return (
                  <TableRow
                    key={key}
                    direction={"row"}
                    justifyItems={"center"}
                    alignItems={"center"}
                  >
                    <TableCell>
                      <Typography
                        margin={3}
                      >{k.price} x </Typography>
                    </TableCell>
                    <TableCell>
                      <TextField
                        style={{ width: 100 }}
                        margin="dense"
                        size="small"
                        onChange={(e) => {
                          let value = e.target.value
                          setOfferings(cp => cp.map((l, lkey) => lkey === key ?
                            {
                              ...l,
                              cnt: parseInt(value == '' ? 0 : value),
                              tot: parseInt(value == '' ? 0 : value) * k.price
                            }
                            : l))
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography> = {isNaN(k.tot) ? 0 : k.tot}</Typography>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Grid>

      </Grid>
    </Grid>

  )
}
export default Accounting;