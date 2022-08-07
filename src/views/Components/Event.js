import { Button, Checkbox, FormControlLabel, Grid, MenuItem, Paper, Select, Table, TableBody, TableCell, TableHead, TextField, Typography } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { url } from '../Constants';
import { AlertMessage } from './Support/AlertMessage';

const Event = (props) => {
    const { setLoading } = props;
    const [trigger, settrigger] = useState(true);
    const [notify, setNotify] = useState({ isOpen: false, message: '', variant: 'filled', severity: 'error' });
    const [starttime, setStarttime] = useState();
    const [endTime, setEndTime] = useState();
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({
        "Event": "",
        "day": "",
        "specialEvent": 0,
        "timingFrom": "",
        "timingTo": ""
    })

    const daysinaweek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    useEffect(() => {
        setLoading(true);
        fetch(`${url}/get-event.php`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            }
        }).then(res => res.json())
            .then((result) => {
                setLoading(false);
                setEvents(result.message);


            }).catch((error) => {
                console.error(error);
            });
    }, [trigger])


    function insertEvent() {
        setLoading(true);
        trigger == true ? settrigger(false) : settrigger(true);
        fetch(`${url}/insert-event.php`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(
                newEvent
            )
        }).then(res => res.json())
            .then((result) => {
                setLoading(false);
                setNotify({
                    isOpen: true,
                    message: result.message,
                })
            }).catch((error) => {
                console.error(error);
            });

    }

    function deleteEvent(id) {
        setLoading(true);
        trigger == true ? settrigger(false) : settrigger(true);
        fetch(`${url}/delete-event.php`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                id: id
            })
        }).then(res => res.json())
            .then(() => {
                setLoading(false);
            }).catch((error) => {
                console.error(error);
            });
    }

    return (
        <Grid>
            <AlertMessage
                notify={notify}
                setNotify={setNotify}
            />
            <Typography boxShadow={1} padding={0.5} color='Highlight' borderColor={'Highlight'} border={1} marginBottom={10} variant='caption' >
                Note:If week is 0 then then the event occurs for every week.
            </Typography>
            <Paper style={{
                overflowX: 'auto'
            }}>

                <Table>
                    <TableHead>
                        <TableCell>
                            <Typography>
                                ID
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>
                                Event Name
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>
                                Event occurs on
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>
                                Start time
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>
                                End time
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>
                                Week number
                            </Typography>
                        </TableCell>
                    </TableHead>
                    {events.map((val, index) => {
                        return (
                            <TableBody key={index}>
                                <TableCell>
                                    <Typography>{index + 1}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>{val.Event}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>{val.day}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>{val.timingFrom}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>{val.timingTo}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>{val.weekNo}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color={'green'} >{val.specialEvent==1?"Special":''}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Button variant='contained' color='error' onClick={() => deleteEvent(val.id)}>Delete</Button>
                                </TableCell>
                            </TableBody>
                        )
                    })}
                </Table>
            </Paper>
            <Typography marginTop={10} variant='h4'>
                Add events
            </Typography>
            <Grid>
                <TextField
                    style={{ margin: 10 }}
                    placeholder='Event name'
                    onChange={(e) => {
                        let text = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
                        setNewEvent({ ...newEvent, Event: text })
                    }}
                    value={newEvent.Event}
                />
                <TimePicker
                    label="Start time"
                    onChange={(val) => {
                        let time = moment(val).format("hh:mm a");
                        setStarttime(val);
                        setNewEvent({ ...newEvent, timingFrom: time })
                    }}
                    value={starttime==''?new Date():starttime}
                    renderInput={(params) => <TextField style={{ margin: 10 }} {...params} />}
                />
                <TimePicker
                    label="End time"

                    onChange={(val) => {
                        let time = moment(val).format("hh:mm a");
                        setEndTime(val);
                        setNewEvent({ ...newEvent, timingTo: time })
                    }}
                    value={endTime == '' ? new Date() : endTime}
                    renderInput={(params) => <TextField style={{ margin: 10 }}  {...params} />}
                />
                <Select
                    style={{ margin: 10 }}
                    placeholder='Day'
                    onChange={(e) => {
                        setNewEvent({ ...newEvent, day: e.target.value })
                    }}
                    value={newEvent.day}
                >
                    {daysinaweek.map((val,ind)=>{
                        return(
                            <MenuItem value={val} key={ind} >{val}</MenuItem>
                        )
                    })}
                </Select>
                <TextField
                    style={{ margin: 10 }}
                    placeholder='Week number'
                    onChange={(e) => {
                        setNewEvent({ ...newEvent, weekNo: parseFloat(e.target.value) })
                    }}
                />
                <FormControlLabel control={<Checkbox onChange={(e) => {
                    setNewEvent({ ...newEvent, specialEvent: e.target.checked })
                }}
                    value={newEvent.specialEvent}
                />} label="Special event" />
                <Button variant='contained' onClick={() => {
                    if (newEvent.weekNo > 5) {
                        setNotify({
                            message: "Please input valid week number",
                            isOpen: true,
                            severity: 'error',
                            variant: 'filled'
                        })
                    }
                    else {
                        insertEvent();
                        console.log(newEvent);
                    }
                }}>Submit</Button>
            </Grid>
        </Grid>
    )
}

export default Event