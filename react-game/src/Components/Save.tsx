import PlayingCard from "./PlayingCard";

export default interface Save {
    cardsCount: number,
    soundEffectsVolume: number,
    musicVolume: number,
    timer: number,
    isHardGame: boolean,
    isTimeGame: boolean,
    wrongGuesses: number,
    guessedPairs: number,
    cards: PlayingCard[],
    isGuess: boolean,
    isGameEnded: boolean,
    isActiveGame: boolean,
    firstCardGuess: PlayingCard | null,
    secondCardGuess: PlayingCard | null,
    startTimer: boolean,
}