import React, { Component } from 'react';
import CurrencyCalc from './Components/CurrencyConverter';
import './Scss/Apps.scss';

// Main app
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <CurrencyCalc/>

      </div>
    );
  }
}

// Stateless Header Component
function Header(props){
  return(
      <div id="header">
          <p style={{"display":"inline-block","marginTop":"40px"}} className='headerDisplay'> Currency Converter</p>
      </div>
  )
}

export default App;
