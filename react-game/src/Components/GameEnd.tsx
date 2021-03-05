import React, { useRef } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

function getModalStyle() {
    const top = 35;

    return {
        top: `${top}%`,
        margin: 'auto',
    };
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            display: 'block',
            marginTop: theme.spacing(2),
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        hidenForm: {
            display: 'none',
        },
        paper: {
            position: 'absolute',
            flexDirection: 'column',
            maxHeight: '600px',
            overflowY: 'auto',
            display: 'flex',
            alignItems: 'center',
            rowGap: '1rem',
            justifyContent: 'center',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            fontSize: '28px',
        },
        result: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            rowGap: '1rem',
            justifyContent: 'center',
        },
        divider: {
            width: '100%',
        },

    }),
);

const seveResult = (result: any) => {
    console.log(result);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ result })
    };
    fetch('https://rnovikau-mgame-backend.herokuapp.com/save-score', requestOptions)
        .then(response => response.json());
}

export default function GameEnd
    ({
        result,
        open,
        handleClose,
        wrongGuesses,
        cardsCount,
        timer,
        gameMode,
        attemts,
        saved,
        changeSaved,
    }:
        {
            result: boolean | null,
            open: boolean,
            handleClose: () => void,
            wrongGuesses: number;
            cardsCount: number;
            timer: number;
            gameMode: number;
            attemts: number;
            saved: boolean,
            changeSaved: () => void,
        }) {
    const classes = useStyles();

    const [modalStyle] = React.useState(getModalStyle);
    const nickname = useRef<HTMLInputElement | null>(null);


    const body = (
        <div style={modalStyle} className={classes.paper} >
            {(result === null ? <div className={classes.result}><h3>No scored results!</h3></div> : (result === true ?
                <div className={classes.result}>
                    <h3>You did it!</h3>
                    {(gameMode === 2 || gameMode === 3 ? <div>Time Left: {timer}s</div> : '')}
                    {(gameMode === 3 ? <div>Attemts Left: {attemts}</div> : <div>Wrong Guesses: {wrongGuesses}</div>)}
                    {(saved ? '' :
                        <FormControl className={classes.result}>
                            <TextField id="outlined-basic" label="Nickname" variant="outlined" inputRef={nickname}
                                error={nickname?.current?.value === ""}
                                helperText={nickname?.current?.value === "" ? 'Enter nickname' : ' '} />
                            <Button variant="contained" color="primary" onClick={() => {
                                //changeSaved();

                                if (nickname?.current?.value.length) {
                                    console.log(nickname?.current?.value.length)
                                    console.log('33333')
                                    const name = nickname?.current?.value;
                                    seveResult({
                                        name,
                                        wrongGuesses,
                                        cardsCount,
                                        timer,
                                        gameMode,
                                        attemts,
                                    });
                                    changeSaved();
                                }
                            }}>Save Score</Button>
                        </FormControl>
                    )}

                </div>
                : <div className={classes.result}><h3>You lose! Try again!</h3></div>))}
        </div >
    );

    return (
        <div>
            <Modal
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 15 }}
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>

    )
}