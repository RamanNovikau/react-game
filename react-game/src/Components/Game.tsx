import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { nanoid } from 'nanoid'
import Card from './Card';
import Settings from './Settings';
import CardsImages from '../assets/cards';
import PlayingCard from './PlayingCard';
import Button from '@material-ui/core/Button';
import Save from './Save';
import useDidMountEffect from './UseDidMountEffect';
import GameScore from './GameScore';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { Howl } from 'howler';


export function shuffleArray(array: any[] | PlayingCard[]) {
    return array.sort(() => .5 - Math.random());
}

export function createCards(count: number) {

    const images = shuffleArray(CardsImages);
    const cards = [];

    for (let i = 0; i < count; i += 1) {
        cards.push({
            id: nanoid(),
            img: `static/front/${images[i]}`,
            isFlipped: false,
            isVisible: true,
        });
        cards.push({
            id: nanoid(),
            img: `static/front/${images[i]}`,
            isFlipped: false,
            isVisible: true,
        });
    }
    return shuffleArray(cards) as PlayingCard[];
}

function createSave() {
    let save = {
        cardsCount: 8,
        soundEffectsVolume: 0.1,
        musicVolume: 0.1,
        timer: 39,
        isHardGame: false,
        isTimeGame: false,
        wrongGuesses: 0,
        guessedPairs: 0,
        cards: createCards(8),
        isGuess: true,
        isGameEnded: true,
        isActiveGame: false,
        firstCardGuess: null,
        secondCardGuess: null,
        startTimer: false,
    };
    const sData = localStorage.getItem('game-save');
    if (sData !== null) {
        save = (JSON.parse(sData));
    }
    return save as Save;
}

export default function Game() {
    const [save] = useState(createSave());

    const [cardsCount, setCardsCount] = useState(save.cardsCount);
    const [cards, setCards] = useState(save.cards);

    const [soundEffectsVolume, setSoundEffectsVolume] = useState(save.soundEffectsVolume);
    const [musicVolume, setMusicVolume] = useState(save.musicVolume);
    const [timer, setTimer] = useState(save.timer);

    const [wrongGuesses, setWrongGuesses] = useState(save.wrongGuesses);
    const [guessedPairs, setGuessedPairs] = useState(save.guessedPairs);

    const [isHardGame, setIsHardGame] = useState(save.isHardGame);
    const [isTimeGame, setIsTimeGame] = useState(save.isTimeGame);

    const [gameMode, setGameMode] = useState(1);
    const [isGuess, setIsGuess] = useState(save.isGuess);
    const [isGameEnded, setIsGameEnded] = useState(save.isGameEnded);

    const [isActiveGame, setIsActiveGame] = useState(save.isActiveGame);

    const [firstCardGuess, setFirstCardGuess] = useState<PlayingCard | null>(save.firstCardGuess);
    const [secondCardGuess, setSecondCardGuess] = useState<PlayingCard | null>(save.secondCardGuess);
    const [startTimer, setStartTimer] = useState(save.startTimer);

    const [gameMusic] = useState(new Howl({
        src: ['static/audio/puzzle-sound-loop.mp3'],
        volume: musicVolume,
        loop: true,
    }));

    const [soundEffects] = useState(new Howl({
        src: ['static/audio/Card-flip.mp3'],
        volume: soundEffectsVolume,
    }));

    const [open, setOpen] = useState(false);

    useEffect(() => {
        const save = {
            cardsCount, soundEffectsVolume, musicVolume, timer, isHardGame, isTimeGame, wrongGuesses, guessedPairs, cards, isGuess, firstCardGuess, secondCardGuess, startTimer,
        }
        localStorage.setItem('game-save', JSON.stringify(save));
    }, [cardsCount, soundEffectsVolume, musicVolume, timer, isHardGame, isTimeGame, wrongGuesses, guessedPairs, cards, isGuess, isGameEnded, isActiveGame, firstCardGuess, secondCardGuess, startTimer]);



    useEffect(() => {
        soundEffects.volume(soundEffectsVolume);
    }, [soundEffects, soundEffectsVolume]);
    useEffect(() => {
        gameMusic.volume(musicVolume);
    }, [gameMusic, musicVolume]);


    const onWrongGuess = useCallback(() => {
        setCardIsFlipped(firstCardGuess!.id, false);
        setCardIsFlipped(secondCardGuess!.id, false);
        setFirstCardGuess(null);
        setSecondCardGuess(null);
        setIsGuess(false);
        setWrongGuesses(wrongGuesses + 1);
    }, [firstCardGuess, secondCardGuess, wrongGuesses]);

    const onCorrectGuess = useCallback(() => {
        setCardIsVisible(firstCardGuess!.id, false);
        setCardIsVisible(secondCardGuess!.id, false);
        setFirstCardGuess(null);
        setSecondCardGuess(null);
        setGuessedPairs((prev) => prev + 1);
        setIsGuess(false);
    }, [firstCardGuess, secondCardGuess]);

    const newGame = useCallback(() => {
        setCards(createCards(cardsCount));
        setIsGuess(true);
        setGuessedPairs(0);
        setWrongGuesses(0);
        setIsGameEnded(true);
    }, [cardsCount]);

    useEffect(() => {
        if (!firstCardGuess || !secondCardGuess)
            return;
        setIsGuess(true);
        (firstCardGuess.img === secondCardGuess.img) ? onCorrectGuess() : onWrongGuess();
    }, [firstCardGuess, onCorrectGuess, onWrongGuess, secondCardGuess]);

    useEffect(() => {
        if (guessedPairs === cards.length / 2) {
            alert('YoU WIN!')
            newGame();
        }
    }, [cards.length, guessedPairs, newGame])

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
        }
    }, [isActiveGame]);

    useDidMountEffect(() => {
        if (isActiveGame) {
            setIsActiveGame(false);
            soundEffects.play();
            setCards(prev => prev.map(c => {
                return { ...c, isFlipped: true };
            }));
            setTimeout(() => {
                setCards(prev => prev.map(c => {
                    return { ...c, isFlipped: false };
                }));
                setIsGuess(false);
                setIsGameEnded(false);
                if (isTimeGame || isHardGame)
                    setStartTimer(true);
            }, 2000);
        }
    }, [cards]);

    function onStartClick() {
        setIsActiveGame(true);
        setStartTimer(false);

        gameMusic.play();
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
        if (!startTimer)
            setTimer(timer);
        if (timer > 0 && startTimer) {
            setTimeout(() => {
                setTimer(timer - 1);
            }, 1000);
        }
        if (timer === 0 && startTimer) {
            setStartTimer(false);
            newGame();
        }
    }, [timer, startTimer, newGame]);

    useDidMountEffect(() => {
        if (gameMode === 1) {
            setIsHardGame(false);
            setIsTimeGame(false);
        }
        if (gameMode === 2) {
            setIsTimeGame(true);
        }
        if (gameMode === 3) {
            setIsTimeGame(false);
            setIsHardGame(true);
        }
    }, [gameMode]);



    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const musicHandleChange = (event: any, newValue: number | number[]) => {
        setMusicVolume(newValue as number);
    };

    const soundEffectsHandleChange = (event: any, newValue: number | number[]) => {
        setSoundEffectsVolume(newValue as number);
    };

    const handle = useFullScreenHandle();

    return (
        <div className={'game-container'}>
            DI
            <Button variant="contained" color="primary" onClick={handle.enter}>Fullscreen</Button>
            <Button variant="contained" color="primary" onClick={handleOpen}>Settings</Button>
            <Button variant="contained" color="primary" onClick={() => onStartClick()}>Best scores</Button>
            <FullScreen handle={handle}>
                <GameScore
                    correct={guessedPairs}
                    wrong={wrongGuesses}
                    initialTime={timer}
                    isTimeGame={isTimeGame}
                    isHardGame={isHardGame}
                ></GameScore>
                <Button variant="contained" color="primary" onClick={() => onStartClick()}>New Game</Button>
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
                    onChange={(event: React.ChangeEvent<{ name?: string; value: unknown }>) => setCardsCount((value) => value = Number(event.target.value))}
                    count={cardsCount}
                    gameMode={gameMode}
                    open={open}
                    isTimeGame={isTimeGame}
                    handleClose={handleClose}
                    musicVolume={musicVolume}
                    soundEffectsVolume={soundEffectsVolume}
                    musicHandleChange={musicHandleChange}
                    soundEffectsHandleChange={soundEffectsHandleChange}
                    onModeChange={(event: React.ChangeEvent<{ name?: string; value: unknown }>) => setGameMode((value) => value = Number(event.target.value))}
                />
            </FullScreen>
        </div >
    )
}