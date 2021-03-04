import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import IconButton from '@material-ui/core/IconButton';
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

export default function Settings(
    { count,
        gameMode,
        timer,
        cardBack,
        cardFront,
        onCountChange,
        open,
        handleClose,
        onModeChange,
        onTimerChange,
        onCardBackChange,
        onCardFrontChange,
        musicHandleChange,
        soundEffectsHandleChange,
        isTimeGame,
        musicVolume,
        soundEffectsVolume,
        cardBacks,
        muted,
        mutedEffects,
        clickMuted,
        clickEffectsMuted,
    }:
        {
            onCountChange: (event: React.ChangeEvent<{ name?: string; value: unknown }>) => void,
            onModeChange: (event: React.ChangeEvent<{ name?: string; value: unknown }>) => void,
            onTimerChange: (event: React.ChangeEvent<{ name?: string; value: unknown }>) => void,
            onCardBackChange: (event: React.ChangeEvent<{ name?: string; value: unknown }>) => void,
            onCardFrontChange: (event: React.ChangeEvent<{ name?: string; value: unknown }>) => void,
            musicHandleChange: (event: any, newValue: number | number[]) => void,
            soundEffectsHandleChange: (event: any, newValue: number | number[]) => void,
            open: boolean,
            handleClose: () => void,
            count: number,
            gameMode: number,
            cardBack: string,
            cardFront: string,
            musicVolume: number,
            soundEffectsVolume: number,
            isTimeGame: boolean,
            timer: number,
            cardBacks: string[],
            muted: boolean,
            mutedEffects: boolean,
            clickMuted: () => void,
            clickEffectsMuted: () => void,
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
                <div className={'sub-settings-section'}>
                    <Typography id="continuous-slider" gutterBottom>
                        Music volume
                          </Typography>
                    <Slider
                        onChange={musicHandleChange}
                        value={musicVolume}
                        aria-labelledby="continuous-slider"
                        min={0}
                        max={1}
                        step={0.05}
                    />
                    <IconButton aria-label="off-sound" onClick={clickMuted}>
                        {(muted ? <VolumeOffIcon /> : <VolumeUpIcon />)}
                    </IconButton>
                </div>
                <div className={'sub-settings-section'}>


                    <Typography id="continuous-slider" gutterBottom>
                        Effects volume
                          </Typography>
                    <Slider
                        onChange={soundEffectsHandleChange}
                        value={soundEffectsVolume}
                        aria-labelledby="continuous-slider"
                        min={0}
                        max={1}
                        step={0.05} />
                    <IconButton aria-label="off-sound" onClick={clickEffectsMuted}>
                        {(mutedEffects ? <VolumeOffIcon /> : <VolumeUpIcon />)}
                    </IconButton>
                </div>
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
                        onChange={onCountChange}
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
                    <InputLabel htmlFor="mode">Game mode</InputLabel>
                    <Select
                        native
                        value={gameMode}
                        onChange={onModeChange}
                        inputProps={{
                            name: 'mode',
                            id: 'mode',
                        }}
                    >
                        <option value={1}>Normal Game</option>
                        <option value={2}>Time Game</option>
                        <option value={3}>Hard Game</option>
                    </Select>

                </FormControl>
                <FormControl className={(gameMode === 2 ? classes.formControl : classes.hidenForm)}>
                    <InputLabel htmlFor="timer">Time</InputLabel>
                    <Select
                        native
                        value={timer}
                        onChange={onTimerChange}
                        inputProps={{
                            name: 'timer',
                            id: 'timer',
                        }}
                    >
                        <option value={30}>30 seconds</option>
                        <option value={60}>60 seconds</option>
                        <option value={90}>90 seconds</option>
                    </Select>

                </FormControl>
            </div>
            <Divider className={classes.divider} />
            <div className={'settings-section'}>
                <Typography variant="h4" gutterBottom>
                    Card Style
                </Typography>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="front">Front</InputLabel>
                    <Select
                        native
                        value={cardFront}
                        onChange={onCardFrontChange}
                        inputProps={{
                            name: 'front',
                            id: 'front',
                        }}
                    >
                        <option value={1}>Classic Deck</option>
                        <option value={2}>Cartoon Deck</option>
                    </Select>

                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="back">Back</InputLabel>
                    <Select
                        value={cardBack}
                        onChange={onCardBackChange}
                        inputProps={{
                            name: 'front',
                            id: 'front',
                        }}>
                        {cardBacks.map((back) => (
                            <MenuItem key={nanoid()} value={back}>
                                {back}
                            </MenuItem>
                        ))}
                    </Select>

                </FormControl>
            </div>
            <Divider className={classes.divider} />
            <div className={'settings-section'}>
                <Typography variant="h4" gutterBottom>
                    Hot Keys
                </Typography>
                <div className={'hot-keys-card'}> W - Enter Fullscreen</div>
                <div className={'hot-keys-card'}> R - Start New game</div>
                <div className={'hot-keys-card'}> S - Settings</div>
                <div className={'hot-keys-card'}> M - Mute Music</div>
                <div className={'hot-keys-card'}> T - Best Scores</div>
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