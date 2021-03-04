import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { nanoid } from 'nanoid';

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
            display:'flex',
            alignItems: 'center',
            rowGap: '1rem',
            justifyContent: 'center',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            fontSize:'28px',
        },
        divider: {
            width: '100%',
        },

    }),
);

export default function GameEnd
    ({
        result,
        open,
        handleClose,
    }:
        {
            result: boolean,
            open: boolean,
            handleClose: () => void,
        }) {
    const classes = useStyles();

    const [modalStyle] = React.useState(getModalStyle);



    const body = (
        <div style={modalStyle} className={classes.paper} >
            {(result ? 'You did it!' : 'You lose! Try again!')}
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