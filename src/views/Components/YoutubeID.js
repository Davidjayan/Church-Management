import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { url } from '../Constants';
import { AlertMessage } from './Support/AlertMessage';


const YoutubeID = () => {
    const [links, setlinks] = useState([{ sno: 1, id: '' }]);
    const [count, setcount] = useState(2);
    const [notify, setNotify] = useState({ isOpen: false, message: '', variant: 'filled', severity: 'error' });

    let id = links.map((k) => k.id);

    const submit = () => {
        fetch(`${url}/youtubeid.php`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                id: id

            })
        })
            .then(res => res.json())
            .then((result) => {
                setNotify({
                    ...notify,
                    isOpen:true,
                    message:result
                })
                window.location.reload();
            }).catch((error) => {
                console.error(error);
            });

    }




    return (
        <Grid
            container
            direction={"column"}
            alignContent={"flex-start"}
        >
            <AlertMessage
            notify={notify}
            setNotify={setNotify}
            />
            <Button
                onClick={() => {
                    setlinks(currentPeople => [...currentPeople, {
                        sno: count,
                        id: ''
                    }]); setcount(count + 1);
                }} >
                <Typography
                    variant='h6'
                >
                    Add New
                </Typography>
            </Button>

            {links.map((k) => {
                return (
                    <Grid
                        key={k.sno}
                        item
                        container
                        justifyItems={"center"}
                        justifyContent={"center"}
                    >
                        <TextField
                            margin="dense"
                            key={k.sno}
                            onChange={(event) => {
                                const temp = event.target.value;
                                const id = temp.slice(17);
                                setlinks((currentPeople) => currentPeople.map(x => x.sno === k.sno ? {
                                    ...x,
                                    id
                                } : x));
                            }} placeholder="Enter the link" />

                        <IconButton variant="contained" onClick={
                            () => {
                                setlinks(currentPeople => currentPeople.filter(x => x.sno !== k.sno)); setcount(count - 1)
                            }
                        }><DeleteSweepIcon />
                        </IconButton>
                    </Grid>

                )
            })}
            <Grid
                item
                container
                justifyContent={"center"}
                justifyItems={"center"}
                alignContent={"center"}
                alignItems={"center"}
            >
                <Button onClick={() => submit()}>Submit</Button>
            </Grid>
        </Grid>
    )
}

export default YoutubeID;