import { Autocomplete, Button, Grid, Grow, IconButton, Select, Table, TableCell, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { url } from "../Constants";
import { AlertMessage } from "./Support/AlertMessage";

const Verse = (props) => {
    const {setLoading} = props;
    const [notify, setNotify] = useState({ isOpen: false, message: '', variant: 'filled', severity: 'error' });
    const Books = [

        { name: "Genesis", index: 0 },
        { name: "Exodus", index: 1 },
        { name: "Leviticus", index: 2 },
        { name: "Numbers", index: 3 },
        { name: "Deuteronomy", index: 4 },
        { name: "Joshua", index: 5 },
        { name: "Judges", index: 6 },
        { name: "Ruth", index: 7 },
        { name: "Samuel1", index: 8 },
        { name: "Samuel2", index: 9 },
        { name: "Kings1", index: 10 },
        { name: "Kings2", index: 11 },
        { name: "Chronicles1", index: 12 },
        { name: "Chronicles2", index: 13 },
        { name: "Ezra", index: 14 },
        { name: "Nehemiah", index: 15 },
        { name: "Esther", index: 16 },
        { name: "Job", index: 17 },
        { name: "Psalms", index: 18 },
        { name: "Proverbs", index: 19 },
        { name: "Ecclesiastes", index: 20 },
        { name: "Song_of_solomon", index: 21 },
        { name: "Isaiah", index: 22 },
        { name: "Jeremiah", index: 23 },
        { name: "Lamentations", index: 24 },
        { name: "Ezekiel", index: 25 },
        { name: "Daniel", index: 26 },
        { name: "Hosea", index: 27 },
        { name: "Joel", index: 28 },
        { name: "Amos", index: 29 },
        { name: "Obadiah", index: 30 },
        { name: "Jonah", index: 31 },
        { name: "Micah", index: 32 },
        { name: "Nahum", index: 33 },
        { name: "Habakkuk", index: 34 },
        { name: "Zephaniah", index: 35 },
        { name: "Haggai", index: 36 },
        { name: "Zecharia", index: 37 },
        { name: "Malachi", index: 38 },
        { name: "Mathew", index: 49 },
        { name: "Mark", index: 40 },
        { name: "Luke", index: 41 },
        { name: "John", index: 42 },
        { name: "Acts", index: 43 },
        { name: "Romans", index: 44 },
        { name: "Corinthians1", index: 45 },
        { name: "Corinthians2", index: 46 },
        { name: "Galatians", index: 47 },
        { name: "Ephesians", index: 48 },
        { name: "Philippians", index: 49 },
        { name: "Colossians", index: 50 },
        { name: "Thessalonians1", index: 51 },
        { name: "Thessalonians2", index: 52 },
        { name: "Timothy1", index: 53 },
        { name: "Timothy2", index: 54 },
        { name: "Titus", index: 55 },
        { name: "Philemon", index: 56 },
        { name: "Hebrews", index: 57 },
        { name: "James", index: 58 },
        { name: "Peter1", index: 59 },
        { name: "Peter2", index: 60 },
        { name: "John1", index: 61 },
        { name: "John2", index: 62 },
        { name: "John3", index: 63 },
        { name: "Jude", index: 64 },
        { name: "Revelation", index: 65 }
    ];

    const [values, setValues] = useState([
        { Book: 0, Chapter: 0, Verse: 0 }
    ]);

    useEffect(() => {
        console.log(values);
    }, [values]);


    const submit =()=>{
        setLoading(true);
        fetch(`${url}/insertverse.php`,{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
    
            },
            body:JSON.stringify({
               values 
            })
        }).then(res => res.json())
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

    return (
        <Grid
            container
            justifyContent={"space-evenly"}
            direction={"row"}
        >
            <Table>
            <AlertMessage
                notify={notify}
                setNotify={setNotify}
            />
            {
                values.map((val, index) => {
                    return (
                        <Grid>
                            <TableRow>
                            <TableCell>

                            <Autocomplete
                                options={Books}
                                getOptionLabel={Books => Books.name}
                                onChange={(e, v) => {
                                    let Book = v?.index;
                                    setValues((val) => val.map((x, id) => id === index ? {
                                        ...x,
                                        Book
                                    } : x));
                                }}
                                renderInput={(params) =>
                                    <TextField
                                    fullWidth={false}
                                    style={{width:200}}
                                        {...params}
                                        placeholder="Enter Book"
                                    />
                                }
                            />
                            </TableCell>
                            <TableCell>

                            <TextField
                                style={{ margin: 20 }}
                                type='number'
                                onChange={(e) => {
                                    setValues((val) => val.map((x, id) => id === index ? {
                                        ...x,
                                        Chapter: e.target.valueAsNumber
                                    } : x));
                                }}
                                value={values.Chapter}
                                placeholder="Enter chapter"
                            />
                            </TableCell>
                            <TableCell>

                            <TextField
                                style={{ margin: 20 }}
                                type='number'
                                onChange={(e) => {
                                    setValues((val) => val.map((x, id) => id === index ? {
                                        ...x,
                                        Verse: e.target.valueAsNumber
                                    } : x));
                                }}
                                value={values.verse}
                                placeholder="Enter verse"
                            />
                            </TableCell>
                            </TableRow>

                        </Grid>
                    )
                })
            }
            </Table>
            <Button
                onClick={submit}

            >Submit</Button>
            <IconButton
            
                onClick={() => {
                    setValues([...values, { Book: 0, Chapter: 0, Verse: 0 }]);
                }}
            ><AddCircleOutlineIcon /></IconButton>
        </Grid>

    )

}

export default Verse;