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

function getModalStyle() {
    const top = 5;

    return {
        top: `${top}%`,
        margin: 'auto',
        // left: `${left}%`,
        // transform: `translate(-${top}%, -${left}%)`,
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
            alignItems: 'center',
            rowGap: '1rem',
            justifyContent: 'center',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        divider: {
            width: '100%',
        },

    }),
);

export default function Settings({ count, gameMode, onChange, open, handleClose, onModeChange, musicHandleChange, soundEffectsHandleChange, isTimeGame, musicVolume, soundEffectsVolume }:
    {
        count: number, gameMode: number, onChange: (event: React.ChangeEvent<{ name?: string; value: unknown }>) => void, open: boolean,
        handleClose: () => void, onModeChange: (event: React.ChangeEvent<{ name?: string; value: unknown }>) => void,
        isTimeGame: boolean, musicVolume: number, soundEffectsVolume: number,
        musicHandleChange: (event: any, newValue: number | number[]) => void,
        soundEffectsHandleChange: (event: any, newValue: number | number[]) => void
    }) {
    const classes = useStyles();

    const [modalStyle] = React.useState(getModalStyle);



    const body = (
        <div style={modalStyle} className={classes.paper} >
            <Typography variant="h4" style={{ textAlign: 'center', }} gutterBottom>
                Settings
                    </Typography>
            <Divider className={classes.divider} />
            <div className={'settings-section'} >
                <Typography variant="h4" gutterBottom>
                    Volume
                    </Typography>
                <Typography id="continuous-slider" gutterBottom>
                    Music volume
                          </Typography>
                <Slider
                    onChange={musicHandleChange}
                    value={musicVolume}
                    aria-labelledby="continuous-slider"
                    min={0}
                    max={1}
                    step={0.1}
                />
                <Typography id="continuous-slider" gutterBottom>
                    Effects volume
                          </Typography>
                <Slider
                    onChange={soundEffectsHandleChange}
                    value={soundEffectsVolume}
                    aria-labelledby="continuous-slider"
                    min={0}
                    max={1}
                    step={0.1} />
            </div>
            <Divider className={classes.divider} />
            <div className={'settings-section'} >
                <Typography variant="h4" gutterBottom>
                    Pairs of cards
                    </Typography>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="cards-pairs">Pairs of cards</InputLabel>
                    <Select
                        native
                        value={count}
                        onChange={onChange}
                        inputProps={{
                            name: 'cardPairs',
                            id: 'cards-pairs',
                        }}
                    >
                        <option value={8}>8 pairs</option>
                        <option value={12}>12 pairs</option>
                        <option value={16}>16 pairs</option>
                    </Select>

                </FormControl>
            </div>
            <Divider className={classes.divider} />
            <div className={'settings-section'}>
                <Typography variant="h4" gutterBottom>
                    Game Mode
                    </Typography>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="cards-pairs">Game mode</InputLabel>
                    <Select
                        native
                        value={gameMode}
                        onChange={onModeChange}
                        inputProps={{
                            name: 'cardPairs',
                            id: 'cards-pairs',
                        }}
                    >
                        <option value={1}>Normal Game</option>
                        <option value={2}>Time Game</option>
                        <option value={3}>Hard Game</option>
                    </Select>

                </FormControl>
                <FormControl className={(isTimeGame ? classes.formControl : classes.hidenForm)}>
                    <InputLabel htmlFor="cards-pairs">Time</InputLabel>
                    <Select
                        native
                        value={gameMode}
                        onChange={onModeChange}
                        inputProps={{
                            name: 'cardPairs',
                            id: 'cards-pairs',
                        }}
                    >
                        <option value={30}>30 seconds</option>
                        <option value={60}>60 seconds</option>
                        <option value={90}>90 seconds</option>
                    </Select>

                </FormControl>
            </div>
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