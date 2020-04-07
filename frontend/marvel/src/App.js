import React from 'react';
import './App.css';
import HeroesContainer from './container/heroes-container';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <HeroesContainer />
      </div>
    );

  } 
}

export default App;
