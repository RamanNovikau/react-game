import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Components/Game';
import 'fontsource-roboto';
import './styles/main.css';
import './styles/card.css';
import './styles/settings.css';
import './styles/game-score.css';
import './styles/normalize.css';

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);