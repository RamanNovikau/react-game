export default function GameScore({ initialTime, wrong, correct, isTimeGame, isHardGame }: { initialTime: number, wrong: number, correct: number, isTimeGame: boolean, isHardGame: boolean }) {

  return (
    <div className={'score-container'}>
      <div className={'score-card' + (isTimeGame || isHardGame ? "" : " hiden-score-card")}><div>Timer:</div> {initialTime}s</div>
      <div className={'score-card' + (isHardGame ? " hiden-score-card" : " ")}><div>Wrong:</div> {wrong}</div>
      <div className={'score-card' + (isHardGame ? "" : " hiden-score-card")}><div>Attemts:</div> {wrong}</div>
      <div className={'score-card'}><div>Correct:</div> {correct}</div>
    </div>
  );
}