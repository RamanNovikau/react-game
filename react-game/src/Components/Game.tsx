import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import useDidMountEffect from './UseDidMountEffect';

import PlayingCard from './PlayingCard';
import Save from './Save';
import Card from './Card';
import Settings from './Settings';
import GameScore from './GameScore';

import CardsBacks from '../assets/card-backs';
import CardsImages from '../assets/cards';
import CardsImagesCartoon from '../assets/cards-cartoon';

import { nanoid } from 'nanoid'
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { Howl } from 'howler';
import GameEnd from './GameEnd';
import BestScores from './BestScores';


export function shuffleArray(array: any[] | PlayingCard[]) {
    return array.sort(() => .5 - Math.random());
}

export function createCards(count: number, back: string, front: string) {
    let src = `static/front/`;
    let images = shuffleArray(CardsImages);
    if (front === '2') {
        images = shuffleArray(CardsImagesCartoon);
        src = `static/front-cartoon/`;
    }
    const cards = [];

    for (let i = 0; i < count; i += 1) {
        cards.push({
            id: nanoid(),
            img: `${src}${images[i]}`,
            back: back,
            isFlipped: false,
            isVisible: true,
        });
        cards.push({
            id: nanoid(),
            img: `${src}${images[i]}`,
            back: back,
            isFlipped: false,
            isVisible: true,
        });
    }
    return shuffleArray(cards) as PlayingCard[];
}

export function createCardBacks() {

    const cardBacks = CardsBacks;

    return cardBacks;
}

function createSave() {
    let save = {
        cardsCount: 8,
        soundEffectsVolume: 0.1,
        musicVolume: 0.1,
        timer: 90,
        gameMode: 1,
        isHardGame: false,
        isTimeGame: false,
        wrongGuesses: 0,
        guessedPairs: 0,
        attemts: 12,
        cards: createCards(8, 'blue.png', '1'),
        isGuess: true,
        isGameEnded: true,
        isActiveGame: false,
        firstCardGuess: null,
        secondCardGuess: null,
        startTimer: false,
        gameSettings: {
            cardsCount: 8,
            musicVolume: 0.2,
            effectsVolume: 0.2,
            gameMode: 1,
            timer: 90,
            cardBack: 'blue.png',
            cardFront: '1',
        }
    };
    const sData = localStorage.getItem('game-save');
    if (sData !== null) {
        save = (JSON.parse(sData));
    }
    return save as Save;
}

export default function Game() {
    const [save] = useState(createSave());

    const [gameSettings, setGameSettings] = useState({
        cardsCount: save.gameSettings.cardsCount,
        musicVolume: save.gameSettings.musicVolume,
        effectsVolume: save.gameSettings.effectsVolume,
        gameMode: save.gameSettings.gameMode,
        timer: save.gameSettings.timer,
        cardBack: save.gameSettings.cardBack,
        cardFront: save.gameSettings.cardFront,
    });

    const [result, setResult] = useState({
        wrongGuesses: 0,
        cardsCount: 0,
        timer: 0,
        gameMode: 0,
        attemts: 0,
        saved: false,
    });

    const [cardsCount] = useState(save.cardsCount);
    const [cards, setCards] = useState(save.cards);

    const [cardBacks] = useState(createCardBacks());

    const [soundEffectsVolume] = useState(save.soundEffectsVolume);
    const [musicVolume] = useState(save.musicVolume);
    const [muted, setMuted] = useState(false);
    const [mutedEffects, setMutedEffects] = useState(false);
    const [timer, setTimer] = useState(save.timer);

    const [wrongGuesses, setWrongGuesses] = useState(save.wrongGuesses);
    const [guessedPairs, setGuessedPairs] = useState(save.guessedPairs);
    const [attemts, setAttemts] = useState(save.attemts);

    const [isHardGame, setIsHardGame] = useState(save.isHardGame);
    const [isTimeGame, setIsTimeGame] = useState(save.isTimeGame);

    const [gameMode] = useState(save.gameMode);
    const [isGuess, setIsGuess] = useState(save.isGuess);
    const [isGameEnded, setIsGameEnded] = useState(save.isGameEnded);

    const [isActiveGame, setIsActiveGame] = useState(save.isActiveGame);

    const [firstCardGuess, setFirstCardGuess] = useState<PlayingCard | null>(save.firstCardGuess);
    const [secondCardGuess, setSecondCardGuess] = useState<PlayingCard | null>(save.secondCardGuess);
    const [startTimer, setStartTimer] = useState(save.startTimer);

    const [open, setOpen] = useState(false);

    const [openEnd, setOpenEnd] = useState(false);

    const [openScores, setOpenScores] = useState(false);

    const [winState, setWinState] = useState<boolean | null>(null);

    const [gameMusic] = useState(new Howl({
        src: ['static/audio/puzzle-sound-loop.mp3'],
        volume: musicVolume,
        loop: true,
    }));

    const [soundEffects] = useState(new Howl({
        src: ['static/audio/Card-flip.mp3'],
        volume: soundEffectsVolume,
    }));

    const [wrongEffect] = useState(new Howl({
        src: ['static/audio/wrong.wav'],
        volume: musicVolume,
    }));

    const [correctEffect] = useState(new Howl({
        src: ['static/audio/correct.mp3'],
        volume: musicVolume,
    }));

    useEffect(() => {
        const save = {
            cardsCount,
            soundEffectsVolume,
            musicVolume,
            gameMode,
            timer,
            isHardGame,
            isTimeGame,
            wrongGuesses,
            guessedPairs,
            attemts,
            cards,
            isGuess,
            firstCardGuess,
            secondCardGuess,
            startTimer,
            gameSettings,
        }
        localStorage.setItem('game-save', JSON.stringify(save));
    }, [cardsCount,
        soundEffectsVolume,
        gameMode,
        musicVolume,
        timer,
        isHardGame,
        isTimeGame,
        wrongGuesses,
        guessedPairs,
        attemts,
        cards,
        isGuess,
        isGameEnded,
        isActiveGame,
        firstCardGuess,
        secondCardGuess,
        startTimer,
        gameSettings,
    ]);

    useEffect(() => {
        soundEffects.volume(gameSettings.effectsVolume);
        wrongEffect.volume(gameSettings.effectsVolume);
        correctEffect.volume(gameSettings.effectsVolume);
    }, [soundEffects, gameSettings.effectsVolume, wrongEffect, correctEffect]);

    useEffect(() => {
        gameMusic.volume(gameSettings.musicVolume);
    }, [gameMusic, gameSettings.musicVolume]);

    useEffect(() => {
        gameMusic.mute(muted);
    }, [gameMusic, muted]);

    useEffect(() => {
        soundEffects.mute(mutedEffects);
        correctEffect.mute(mutedEffects);
        wrongEffect.mute(mutedEffects);
    }, [correctEffect, mutedEffects, soundEffects, wrongEffect]);


    const onWrongGuess = useCallback(() => {
        setCardIsFlipped(firstCardGuess!.id, false);
        setCardIsFlipped(secondCardGuess!.id, false);
        setFirstCardGuess(null);
        setSecondCardGuess(null);
        setIsGuess(false);
        setWrongGuesses(wrongGuesses + 1);
        setAttemts(attemts - 1);
        wrongEffect.play();
    }, [attemts, firstCardGuess, secondCardGuess, wrongEffect, wrongGuesses]);

    const onCorrectGuess = useCallback(() => {
        setCardIsVisible(firstCardGuess!.id, false);
        setCardIsVisible(secondCardGuess!.id, false);
        setFirstCardGuess(null);
        setSecondCardGuess(null);
        setGuessedPairs((prev) => prev + 1);
        setIsGuess(false);
        correctEffect.play();
    }, [correctEffect, firstCardGuess, secondCardGuess]);

    const newGame = useCallback(() => {
        if (!gameMusic.playing())
            gameMusic.play();
        setCards(createCards(gameSettings.cardsCount, gameSettings.cardBack, gameSettings.cardFront));
        setIsGuess(true);
        setGuessedPairs(0);
        setWrongGuesses(0);
        setIsGameEnded(true);
        if (gameSettings.gameMode === 1) {
            setIsTimeGame(false);
            setIsHardGame(false);
        }
        if (gameSettings.gameMode === 2) {
            setIsTimeGame(true);
            setIsHardGame(false);
        }
        if (gameSettings.gameMode === 3) {
            setIsTimeGame(false);
            setIsHardGame(true);
            setAttemts(gameSettings.cardsCount + 4);
        }
    }, [gameMusic, gameSettings.cardBack, gameSettings.cardFront, gameSettings.cardsCount, gameSettings.gameMode]);

    useEffect(() => {
        if (guessedPairs === cards.length / 2) {
            setResult({
                wrongGuesses: wrongGuesses,
                cardsCount: cards.length,
                timer: timer,
                gameMode: gameSettings.gameMode,
                attemts: attemts,
                saved: false,
            });
            setWinState(true);
            setStartTimer(false);
            setOpenEnd(true);
            newGame();
        }
        if (timer === 0 && startTimer) {
            setResult({
                wrongGuesses: wrongGuesses,
                cardsCount: cards.length,
                timer: timer,
                gameMode: gameSettings.gameMode,
                attemts: attemts,
                saved: false,
            });
            setWinState(false);
            setStartTimer(false);
            setOpenEnd(true);
            newGame();
        }
        if (isHardGame && attemts === 0) {
            setResult({
                wrongGuesses: wrongGuesses,
                cardsCount: cards.length,
                timer: timer,
                gameMode: gameSettings.gameMode,
                attemts: attemts,
                saved: false,
            });
            setWinState(false);
            setStartTimer(false);
            setOpenEnd(true);
            newGame();
        }
    }, [attemts, cards.length, guessedPairs, isHardGame, newGame, startTimer, timer]);

    useEffect(() => {
        if (!firstCardGuess || !secondCardGuess)
            return;
        setIsGuess(true);
        (firstCardGuess.img === secondCardGuess.img) ? onCorrectGuess() : onWrongGuess();
    }, [firstCardGuess, onCorrectGuess, onWrongGuess, secondCardGuess]);



    useDidMountEffect(() => {
        newGame();
        setStartTimer(false);
    }, [cardsCount])

    function setCardIsFlipped(cardID: string, isFlipped: boolean) {
        setCards(prev => prev.map(c => {
            if (c.id !== cardID)
                return c;
            return { ...c, isFlipped };
        }));
    }

    function setCardIsVisible(cardID: string, isVisible: boolean) {
        setCards(prev => prev.map(c => {
            if (c.id !== cardID)
                return c;
            return { ...c, isVisible };
        }));
    }

    useDidMountEffect(() => {
        if (isActiveGame) {
            newGame();
            setStartTimer(false);
        }
    }, [isActiveGame]);

    useDidMountEffect(() => {
        if (isActiveGame) {
            setIsActiveGame(false);
            soundEffects.play();
            setCards(prev => prev.map(c => {
                return { ...c, isFlipped: true };
            }));
            let revealTime = 3000;

            if (isHardGame) {
                revealTime = 1000;
            }

            setTimeout(() => {
                setCards(prev => prev.map(c => {
                    return { ...c, isFlipped: false };
                }));
                setIsGuess(false);
                setIsGameEnded(false);
                if (isTimeGame || isHardGame)
                    setStartTimer(true);
            }, revealTime);
        }
    }, [cards]);

    function onStartClick() {
        setIsActiveGame(true);
    }

    function onCardClick(card: PlayingCard) {
        if (!isGuess) {
            soundEffects.play();
            setCardIsFlipped(card.id, true);
        }
    }

    function onTransitionEnd(event: React.TransitionEvent, card: PlayingCard) {
        if (event.propertyName === 'transform') {
            if (!isGuess)
                if (card.isFlipped)
                    (firstCardGuess) ? setSecondCardGuess(card) : setFirstCardGuess(card);
        }
    }

    useEffect(() => {
        if (!startTimer) {
            (isHardGame) ? setTimer(45) : setTimer(gameSettings.timer);
        }
        if (timer > 0 && startTimer) {
            setTimeout(() => {
                setTimer(timer - 1);
            }, 1000);
        }

    }, [timer, startTimer, gameSettings.timer, isHardGame]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEndClose = () => {
        setOpenEnd(false);
    };

    const handleScoresClose = () => {
        setOpenScores(false);
    };

    const handle = useFullScreenHandle();

    return (
        <div className={'game-container'}>
            <KeyboardEventHandler
                handleKeys={['W', 'R', 'T', 'S', 'M', 'Y']}
                onKeyEvent={(key: string, e: React.KeyboardEvent) => {
                    if (key === 'W') {
                        (handle.active ? handle.exit() : handle.enter())
                    }
                    if (key === 'M') {
                        setMuted(!muted);
                    }
                    if (key === 'S') {
                        setOpen(true)
                    }
                    if (key === 'R') {
                        setIsActiveGame(true);
                    }
                    if (key === 'T') {
                        setOpenScores(true);
                    }
                    if (key === 'Y') {
                        setOpenEnd(true);
                    }
                }} />
            <div className={'control-buttons'}>
                <Button variant="contained" color="primary" onClick={(e) => {
                    handle.enter();
                    e.currentTarget.blur();
                }}>Fullscreen</Button>
                <Button variant="contained" color="primary" onClick={
                    (e) => {
                        handleOpen();
                        e.currentTarget.blur();
                    }}>Settings</Button>
                <Button variant="contained" color="primary" onClick={(e) => {
                    setOpenScores(true);
                    e.currentTarget.blur();
                }}>Best scores</Button>
                <Button variant="contained" color="primary" onClick={(e) => {
                    setOpenEnd(true);
                    e.currentTarget.blur();
                }}>Previous Result</Button>
            </div>
            <FullScreen handle={handle}>
                <GameScore
                    correct={guessedPairs}
                    wrong={wrongGuesses}
                    attemts={attemts}
                    initialTime={timer}
                    isTimeGame={isTimeGame}
                    isHardGame={isHardGame}
                ></GameScore>
                <Button variant="contained" color="primary" onClick={(e) => {
                    e.currentTarget.blur();
                    onStartClick();
                }}>New Game</Button>
                <div className={'cards'}>
                    {cards.map(card =>
                        <Card
                            onClick={() => { onCardClick(card) }}
                            onTransitionEnd={(event: React.TransitionEvent) => onTransitionEnd(event, card)}
                            key={card.id}
                            {...card}
                        />)
                    }
                </div>
                <Settings
                    onCountChange={(event: React.ChangeEvent<{ name?: string; value: unknown }>) => setGameSettings(prevState => {
                        return { ...prevState, cardsCount: Number(event.target.value) }
                    })}
                    onModeChange={(event: React.ChangeEvent<{ name?: string; value: unknown }>) => setGameSettings(prevState => {
                        return { ...prevState, gameMode: Number(event.target.value) }
                    })}
                    onTimerChange={(event: React.ChangeEvent<{ name?: string; value: unknown }>) => setGameSettings(prevState => {
                        return { ...prevState, timer: Number(event.target.value) }
                    })}
                    onCardBackChange={(event: React.ChangeEvent<{ name?: string; value: unknown }>) => setGameSettings(prevState => {
                        return { ...prevState, cardBack: event.target.value as string }
                    })}
                    onCardFrontChange={(event: React.ChangeEvent<{ name?: string; value: unknown }>) => setGameSettings(prevState => {
                        return { ...prevState, cardFront: event.target.value as string }
                    })}
                    musicHandleChange={(event: any, newValue: number | number[]) => setGameSettings(prevState => {
                        return { ...prevState, musicVolume: newValue as number }
                    })}
                    soundEffectsHandleChange={(event: any, newValue: number | number[]) => setGameSettings(prevState => {
                        return { ...prevState, effectsVolume: newValue as number }
                    })}
                    count={gameSettings.cardsCount}
                    gameMode={gameSettings.gameMode}
                    cardBack={gameSettings.cardBack}
                    cardFront={gameSettings.cardFront}
                    musicVolume={gameSettings.musicVolume}
                    timer={gameSettings.timer}
                    soundEffectsVolume={gameSettings.effectsVolume}
                    open={open}
                    isTimeGame={isTimeGame}
                    handleClose={handleClose}
                    cardBacks={cardBacks}
                    muted={muted}
                    mutedEffects={mutedEffects}
                    clickMuted={() => {
                        setMuted(!muted)
                    }}
                    clickEffectsMuted={() => {
                        setMutedEffects(!mutedEffects)
                    }}
                />
                <GameEnd
                    result={winState}
                    open={openEnd}
                    handleClose={handleEndClose}
                    {...result}
                    changeSaved={() => setResult(prevState => {
                        return { ...prevState, saved: true }
                    })}
                />
                <BestScores
                    open={openScores}
                    handleClose={handleScoresClose}></BestScores>
            </FullScreen>
        </div >
    )
}