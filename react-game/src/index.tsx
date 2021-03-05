import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Components/Game';
import 'fontsource-roboto';
import './styles/main.css';
import './styles/card.css';
import './styles/settings.css';
import './styles/game-score.css';
import './styles/end-game.css';
import './styles/normalize.css';
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';

ReactDOM.render(
  <div>
    <Header />,
    <Game />,
    <Footer />,
    </div>,
  document.getElementById('root')
);