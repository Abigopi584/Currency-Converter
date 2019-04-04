import React from "react";


class Currency extends React.Component{
    constructor(props){
        super(props);
        this.updateCurrencyMoneyValue = this.updateCurrencyMoneyValue.bind(this);
        this.updateSelectOptionForCurreny = this.updateSelectOptionForCurreny.bind(this);
        this.state={
            initialRender:true
        }
    }

    // Lifting the state(evt val) up to the func  updateSelectOptionForSecondaryCurreny & updateSelectOptionForBaseCurrency  in currencyConverter
    updateCurrencyMoneyValue(evt){
        let val = ((typeof evt.target === "undefined" && evt.target.value === null) || (evt.target.value === '') ) ? '': evt.target.value;
        if(!isNaN((Number(val)) && isFinite(val))){
            this.props.updateInputMoneyValue(evt.target.value)
        }
    }

    // Lifting the state(evt value) up to the func updateConvertedCurrencyMoneyValue & updateBaseCurrencyMoneyValue  in currencyConverter
    updateSelectOptionForCurreny(evt){
        let val = ((typeof evt.target === "undefined" && evt.target.value === null) || (evt.target.value === '') ) ? '': evt.target.value;
        this.props.updateSelectOption(val);
        this.setState({
            initialRender:false
        })
    }

    render(){
        let inputKeyType = (this.props.type === 'base') ? 'input1' :'input2';
        return(
            <div style={{'width':'50%',"float":"left","marginTop":"10%",}}>
                <div className='currency'>
                    <label  className='currencyLabel'>{this.props.label}</label><br/>
                    <select className='selectCurrency' onChange={this.updateSelectOptionForCurreny}>
                        {this.state.initialRender &&
                            <option value="">Choose From Below Currency Code</option>
                        }
                        {typeof this.props.countryCodesMoneyVals !== "undefined" && this.props.countryCodesMoneyVals !== null &&
                            this.props.countryCodesMoneyVals.map(
                                    (entry)=> <option key={entry[0]} value={entry[0]}>{entry[0]}</option>
                        )}
                    </select><br/>
                    <input type='text'
                           key={inputKeyType}
                           className='inputForCurrencyValues'
                           value={this.props.currencyMoneyValue}
                           onChange={this.updateCurrencyMoneyValue}/>
                </div>
            </div>
        )
    }
}

export default Currency;