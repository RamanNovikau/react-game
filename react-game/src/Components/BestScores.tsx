import React, { useEffect, useRef, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import Typography from '@material-ui/core/Typography';
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
        scores: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            rowGap: '1rem',
            justifyContent: 'center',
            border: '2px solid black',
            backgroundColor: '#f9f9f9',
        },
        score: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: '2px solid black',
            "&:last-child": {
                borderBottom: 'none',
            }
        }

    }),
);

interface Score {
    _id: string,
    nickname: string,
    gameMode: number
    score: string,
}

export default function BestScores
    ({open,handleClose,
    }:{open: boolean,handleClose: () => void,}) {
    const classes = useStyles();

    const [scores, setScores] = useState<Score[] | null>(null);

    const [modalStyle] = React.useState(getModalStyle);

    useEffect(() => {
        fetch('https://rnovikau-mgame-backend.herokuapp.com/best-scores')
            .then(response => response.json())
            .then(data => setScores(data));
    }, []);

    useEffect(() => {
        console.log(scores)
    }, [scores]);

    const body = (
        <div style={modalStyle} className={classes.paper} >
            <Typography variant="h4" gutterBottom>
                Best Scores
                </Typography>
            <div className={classes.scores}>
                {scores?.map((score, i) => (
                    <div className={classes.score} key={nanoid()}>
                        <div>
                            {i + 1}) Nickname: {score.nickname}
                        </div>
                        <div>
                            Game Mode: {(score.gameMode === 1) ? 'Normal Game' : ''}{(score.gameMode === 2) ? 'Time Game' : ''}{(score.gameMode === 3) ? 'Hard Game' : ''}
                        </div>
                        <div>
                            Score: {score.score}
                        </div>
                    </div>
                ))}
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