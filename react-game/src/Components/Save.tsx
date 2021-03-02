import PlayingCard from "./PlayingCard";

export default interface Save {
    cardsCount: number,
    soundEffectsVolume: number,
    musicVolume: number,
    timer: number,
    timePenaltyMode: boolean,
    hardMode: boolean,
    wrongGuesses: number,
    guessedPairs: number,
    cards: PlayingCard[],
    isGuess: boolean,
    isGameEnded: boolean,
    firstCardGuess: PlayingCard | null,
    secondCardGuess: PlayingCard | null,
}