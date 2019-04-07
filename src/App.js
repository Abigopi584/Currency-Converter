import React, { Component } from 'react';
import CurrencyCalc from './Components/CurrencyConverter';
import './Scss/Apps.scss';

// Main app
class App extends Component {
  constructor(props){
      super(props);
      this.changeInCurrencyCode =  this.changeInCurrencyCode.bind(this);
      this.state={
          baseCurrency:'',
          convertedCurrency:'',
      }
  }

    changeInCurrencyCode(bCur,cCur){
      this.setState({
          baseCurrency:bCur,
          convertedCurrency:cCur
      })

  }

  render() {
    return (
      <div className="App">
        <Header bCur={this.state.baseCurrency} cCur={this.state.convertedCurrency}/>
        <CurrencyCalc changeInCurrencyCode={this.changeInCurrencyCode} />

      </div>
    );
  }
}

// Stateless Header Component
function Header(props){
  return(
      <div id="header">
          <div>
              <p style={{"display":"inline-block","marginTop":"40px"}} className='headerDisplay'> Currency Converter</p>
          </div>
          <div>
              {(typeof props.bCur !== "undefined" && props.bCur !== '') &&
                  <p className='currP' style={{'float':'left', marginLeft:"27%"}} key='bcur'>Base Currency: {props.bCur}</p>
              }
              {(typeof props.cCur !== "undefined" && props.cCur !== '') &&
                  <p className='currP' style={{'float':'right',marginRight  :"25%"}} key='ccur'>Converted Currency: {props.cCur}</p>
              }
          </div>


      </div>
  )
}

export default App;
