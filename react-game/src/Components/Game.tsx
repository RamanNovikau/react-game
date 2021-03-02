import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { nanoid } from 'nanoid'
import Card from './Card';
import Settings from './Settings';
import CardsImages from '../assets/cards';
import PlayingCard from './PlayingCard';
import Button from '@material-ui/core/Button';
import Save from './Save';


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
        soundEffectsVolume: 0.5,
        musicVolume: 0.5,
        timer: 2,
        timePenaltyMode: false,
        hardMode: false,
        wrongGuesses: 0,
        guessedPairs: 0,
        cards: createCards(8),
        isGuess: true,
        isGameEnded: true,
        firstCardGuess: null,
        secondCardGuess: null,
    };
    const sData = localStorage.getItem('game-save');
    if (sData !== null) {
        save = (JSON.parse(sData));
    }
    return save as Save;
}

export default function Game() {
    const [save, setSave] = useState(createSave());

    const [cardsCount, setCardsCount] = useState(save.cardsCount);
    const [soundEffectsVolume, setSoundEffectsVolume] = useState(save.soundEffectsVolume);
    const [musicVolume, setMusicVolume] = useState(save.musicVolume);
    const [timer, setTimer] = useState(save.timer);
    const [timePenaltyMode, setTimePenaltyMode] = useState(save.timePenaltyMode);
    const [hardMode, setHardMode] = useState(save.hardMode);
    const [wrongGuesses, setWrongGuesses] = useState(save.wrongGuesses);
    const [guessedPairs, setGuessedPairs] = useState(save.guessedPairs);

    const [cards, setCards] = useState(save.cards);

    const [isGuess, setIsGuess] = useState(save.isGuess);
    const [isGameEnded, setIsGameEnded] = useState(save.isGameEnded);
    const [firstCardGuess, setFirstCardGuess] = useState<PlayingCard | null>(save.firstCardGuess);
    const [secondCardGuess, setSecondCardGuess] = useState<PlayingCard | null>(save.secondCardGuess);

    useEffect(() => {
        const save = {
            cardsCount, soundEffectsVolume, musicVolume, timer, timePenaltyMode, hardMode, wrongGuesses, guessedPairs, cards, isGuess, firstCardGuess, secondCardGuess,
        }
        localStorage.setItem('game-save', JSON.stringify(save));
        console.log('saved');
    }, [cardsCount, soundEffectsVolume, musicVolume, timer, timePenaltyMode, hardMode, wrongGuesses, guessedPairs, cards, isGuess, isGameEnded, firstCardGuess, secondCardGuess]);

    const onWrongGuess = useCallback(() => {
        setCardIsFlipped(firstCardGuess!.id, false);
        setCardIsFlipped(secondCardGuess!.id, false);
        setFirstCardGuess(null);
        setSecondCardGuess(null);
        setIsGuess(false);
    }, [firstCardGuess, secondCardGuess]);

    const onCorrectGuess = useCallback(() => {
        setCardIsVisible(firstCardGuess!.id, false);
        setCardIsVisible(secondCardGuess!.id, false);
        setFirstCardGuess(null);
        setSecondCardGuess(null);
        setGuessedPairs((prev) => prev + 1);
        setIsGuess(false);
    }, [firstCardGuess, secondCardGuess]);

    const newGame = useCallback(() => {
        setIsGuess(true);
        setGuessedPairs(0);
        setCards(createCards(cardsCount));
        setIsGameEnded(true);
    }, [cardsCount]);

    useEffect(() => {
        if (!firstCardGuess || !secondCardGuess)
            return;
        setIsGuess(true);
        (firstCardGuess.img === secondCardGuess.img) ? onCorrectGuess() : onWrongGuess();
    }, [firstCardGuess, onCorrectGuess, onWrongGuess, secondCardGuess]);

    useEffect(() => {
        console.log(cards.length / 2); console.log(guessedPairs);
        if (guessedPairs === cards.length / 2) {
            alert('YoU WIN!')
            newGame();
        }
    }, [cards.length, guessedPairs, newGame])



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

    function onStartClick() {
        let isFlipped = true;
        setCards(prev => prev.map(c => {
            return { ...c, isFlipped };
        }));
        isFlipped = false;
        setTimeout(() => {
            setCards(prev => prev.map(c => {
                return { ...c, isFlipped };
            }));
            setIsGuess(false);
            setIsGameEnded(false);
        }, 2000);
    }

    function onCardClick(card: PlayingCard) {
        if (!isGuess)
            setCardIsFlipped(card.id, true);
    }

    function onTransitionEnd(event: React.TransitionEvent, card: PlayingCard) {
        if (event.propertyName === 'transform') {
            if (!isGuess)
                if (card.isFlipped)
                    (firstCardGuess) ? setSecondCardGuess(card) : setFirstCardGuess(card);
        }
    }

    return (
        <div>
            {guessedPairs}
            <Button variant="contained" color="primary" onClick={() => onStartClick()}>New Game</Button>
            <div className={'cards'}>
                {cards.map(card =>
                    <Card
                        onClick={() => onCardClick(card)}
                        onTransitionEnd={(event: React.TransitionEvent) => onTransitionEnd(event, card)}
                        key={card.id}
                        {...card}
                    />)
                }
            </div>
            <Settings
                onChange={(event: React.ChangeEvent<{ name?: string; value: unknown }>) => setCardsCount((value) => value = Number(event.target.value))}
                count={cardsCount}
            />
        </div >
    )
}