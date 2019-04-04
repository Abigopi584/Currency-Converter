import React, { Component } from 'react';
import Currency from './Currency';

class CurrencyConverter extends Component{
    constructor(props){
        super(props);
        this.updateBaseCurrencyMoneyValue = this.updateBaseCurrencyMoneyValue.bind(this);
        this.updateSelectOptionForBaseCurrency = this.updateSelectOptionForBaseCurrency.bind(this);
        this.updateConvertedCurrencyMoneyValue = this.updateConvertedCurrencyMoneyValue.bind(this);
        this.updateSelectOptionForSecondaryCurreny = this.updateSelectOptionForSecondaryCurreny.bind(this);
        this.state={
            initialBaseCurrenciesAndMoneyValues:null,
            initialConvertedCurrenciesAndMoneyValues:null,
            baseCurrency:'',
            convertedCurrency:'',
            baseCurrencyMoneyValue:'',
            convertedCurrencyMoneyValue:'',
            baseMoney:'',
            convertedMoney:'',
            convertedCurrencyDefaultIdx:0,
            convertedMoneyValueUpdatedFirstTime:false
        }
    }

    // Called before the component is mounted
    componentWillMount(){
        fetch('/latest',{
            method:'GET',
            mode:'cors'
        }).then(response =>response.json())
            .then(data =>{
                this.setState({
                    initialBaseCurrenciesAndMoneyValues: Object.entries(data.rates).sort(),
                })
        }).catch(error => console.log('Error=>'+error.message))
    }

    // called when the base currency code is selected or changed
    updateSelectOptionForBaseCurrency(val){
        var url = (val === '') ? '/latest' : '/latest?base='+val
        fetch(url,{
            method:'GET',
            mode:'cors'
        }).then(response =>response.json())
            .then(data =>{
                var entryData = Object.entries(data.rates);
                var idx = this.state.convertedCurrencyDefaultIdx;
                if(this.state.convertedCurrency !== '' && this.state.convertedCurrency !== null){
                    for(var i=0;i<entryData.length;i++){
                        if(entryData[i][0] === this.state.convertedCurrency ){
                            idx = i;
                            break;
                        }
                    }
                }
                this.setState({
                    initialBaseCurrenciesAndMoneyValues: Object.entries(data.rates).sort(),
                    baseCurrency:data.base,
                    baseCurrencyMoneyValue:1,
                    baseMoney:1,
                },this.updateConvertedCurrencyValue)
            }).catch(error => console.log('Error=>'+error.message))
    }

    //called when the converted currency code is selected or changed
    updateSelectOptionForSecondaryCurreny(val){
        var currencyCodeAndValue = this.state.initialBaseCurrenciesAndMoneyValues;
        var baseCurrencyMoneyValue =  this.state.baseCurrencyMoneyValue
        for(var i=0;i<currencyCodeAndValue.length;i++){
            var item = currencyCodeAndValue[i];
            if(item[0] === val){
                this.setState ({
                    convertedCurrency:val,
                    convertedCurrencyMoneyValue:(this.state.baseCurrencyMoneyValue != '')?parseFloat(baseCurrencyMoneyValue) * parseFloat(item[1]) :'',
                    convertedMoney:parseFloat(item[1]),
                    convertedCurrencyDefaultIdx: i,
                    convertedMoneyValueUpdatedFirstTime:false
                })
                break;
            }
        }
    }

    // Called to update the existing converted Currency & Money value when the base currency changes
    updateConvertedCurrencyValue(){
        var baseMoneyValue = this.state.baseCurrencyMoneyValue;
        this.state.initialBaseCurrenciesAndMoneyValues.map((currencyAndMoneyValues)=>{
            if(this.state.convertedCurrency === currencyAndMoneyValues[0] ){
                this.setState({
                    convertedCurrencyMoneyValue:parseFloat(baseMoneyValue) *  parseFloat(currencyAndMoneyValues[1]),
                    convertedMoney:currencyAndMoneyValues[1]
                })
            }
        })

    }

    //Called to Update the converted currency value when the base money value changes
    updateConvertedCurrencyMoneyValue(val){
        if(val !== '' && this.state.convertedCurrency !== ''){
            let convertedCurrencyValue = this.state.convertedMoney;
            this.setState({
                baseCurrencyMoneyValue:val,
                convertedCurrencyMoneyValue: parseFloat(val) * parseFloat(convertedCurrencyValue)
            })
        } else {
            this.setState({
                baseCurrencyMoneyValue:val,
                convertedCurrencyMoneyValue:val
            })
        }
    }


    //Called to change the base currency money value when the converted currency money value changes
    updateBaseCurrencyMoneyValue(val){
        if (val !== '' ){
            if(typeof this.state.convertedCurrency !== 'undefined' && this.state.convertedCurrency !== null){
                if( !this.state.convertedMoneyValueUpdatedFirstTime ){
                    fetch('/latest?base='+this.state.convertedCurrency)
                        .then(response =>response.json())
                        .then(data =>{
                            var codes =Object.entries(data.rates);
                            var baseCurrencyExchangeRate = 1;
                            for(var i=0;i<codes.length;i++){
                                var code = codes[i];
                                if(code[0] === this.state.baseCurrency){
                                    baseCurrencyExchangeRate = code[1];
                                    this.setState({
                                        convertedCurrencyMoneyValue:val,
                                        initialConvertedCurrenciesAndMoneyValues:codes.sort(),
                                        baseCurrencyMoneyValue:parseFloat(baseCurrencyExchangeRate) * parseFloat(val),
                                        convertedMoneyValueUpdatedFirstTime:true
                                    })
                                    break;
                                }
                            }
                        })
                        .catch(error=> console.log('Error=>'+error))
                } else {
                    var convertedCodes = this.state.initialConvertedCurrenciesAndMoneyValues;
                    for(var i=0;i<convertedCodes.length;i++){
                        var code = convertedCodes[i];
                        if(code[0] === this.state.baseCurrency){
                            var baseCurrencyExchangeRate = code[1];
                            this.setState({
                                convertedCurrencyMoneyValue:val,
                                baseCurrencyMoneyValue:parseFloat(baseCurrencyExchangeRate) * parseFloat(val),
                            })
                            break;
                        }
                    }

                }
            }
        } else {
            this.setState({
                baseCurrencyMoneyValue:val,
                convertedCurrencyMoneyValue:val
            })
        }

    }

    render(){
        return (
            <main id="mainContent">
                <div id="currency-wrapper">
                        <Currency type='base'
                                  label='Currency'
                                  currency={this.state.baseCurrency}
                                  countryCodesMoneyVals={this.state.initialBaseCurrenciesAndMoneyValues}
                                  currencyMoneyValue={this.state.baseCurrencyMoneyValue}
                                  updateInputMoneyValue={this.updateConvertedCurrencyMoneyValue}
                                  updateSelectOption={this.updateSelectOptionForBaseCurrency}
                        />
                        <Currency type='converted'
                                  label='Converted Currency'
                                  currency={this.state.convertedCurrency}
                                  countryCodesMoneyVals={this.state.initialBaseCurrenciesAndMoneyValues}
                                  currencyMoneyValue={this.state.convertedCurrencyMoneyValue}
                                  updateInputMoneyValue={this.updateBaseCurrencyMoneyValue}
                                  updateSelectOption={this.updateSelectOptionForSecondaryCurreny}
                        />
                </div>
            </main>

        )
    }
}


export default CurrencyConverter;