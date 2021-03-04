export default function GameScore({ initialTime, wrong, correct, attemts, isTimeGame, isHardGame }: { initialTime: number, wrong: number, attemts: number, correct: number, isTimeGame: boolean, isHardGame: boolean }) {

  return (
    <div className={'score-container'}>
      <div className={'score-card' + (isHardGame || isTimeGame ? " hiden-score-card" : " ")}>Normal Game</div>
      <div className={'score-card' + (isHardGame ? "" : " hiden-score-card")}>Hard Game</div>
      <div className={'score-card' + (isTimeGame ? "" : " hiden-score-card")}>Time Game</div>
      <div className={'score-card' + (isTimeGame || isHardGame ? "" : " hiden-score-card")}><div>Timer:</div> {initialTime}s</div>
      <div className={'score-card' + (isHardGame ? " hiden-score-card" : " ")}><div>Wrong:</div> {wrong}</div>
      <div className={'score-card' + (isHardGame ? "" : " hiden-score-card")}><div>Attemts:</div> {attemts}</div>
      <div className={'score-card'}><div>Correct:</div> {correct}</div>
    </div>
  );
}