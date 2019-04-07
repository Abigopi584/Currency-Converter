import React from 'react'; 
import App from './App';
import {shallow,mount} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CurrencyConverter from  './Components/CurrencyConverter';
import Currency from './Components/Currency'



configure({ adapter: new Adapter()});

describe('App',()=>{
    let app = mount(<App/>);

    const minProps ={
        cCur:'INR',
        bCur:'USD'
    }

    it('Has the Main App redered',()=>{
        expect(app.find('div')).toHaveLength(9) ;
    })

    it('Render Header Component Correctly',()=>{
        expect(app.find('Header').length).toEqual(1)
    })

    it("check if header component receives props",()=>{
        expect(app.find('Header').prop('cCur')).toBe("");
        expect(app.find('Header').prop('bCur')).toBe("")

    });

    it("check if Header Component has the property passed currently",()=>{
        app.instance().changeInCurrencyCode('INR','USD')
        app.update();
        expect(app.find('Header').prop('bCur')).toBe("INR");
        expect(app.find('Header').prop('cCur')).toBe("USD");
    })

    it("check if Currency Converter Component is present",()=>{
        expect(app.find('CurrencyConverter').length).toEqual(1);
    })

    it("Check if the Update in Currency Component Updates the Header",()=>{
        let currencyWrapper = mount(<Currency />)
    })
});


describe('CurrencyConverter',()=>{
    let cConverter  = mount(<CurrencyConverter />);

    it('has Currency Convertor rendered child Components rendered Properly',()=>{
        expect(cConverter.find('Currency').length).toEqual(2)
    })

    it('Check if the function updates the selectOption correctly',()=>{
         cConverter.setState(
                    {
                        initialBaseCurrenciesAndMoneyValues:  [["INR",68],["USD",1]],
                        baseCurrencyMoneyValue: 2
                    });

        cConverter.instance().updateSelectOptionForSecondaryCurreny('INR');
        cConverter.update();
        expect(cConverter.state('convertedCurrency').toEqual('INR'))
    })

    it('Checks if the converted MOney Value is Updated',()=>{
        cConverter.setState(
            {
                baseCurrencyMoneyValue:3,
                convertedCurrencyMoneyValue:10,
                convertedMoney: 2,
                convertedCurrency:'USD'

            });

        cConverter.instance().updateConvertedCurrencyMoneyValue('');
        cConverter.update();
        expect(cConverter.state('convertedCurrencyMoneyValue')).toEqual('');
        cConverter.instance().updateConvertedCurrencyMoneyValue(20);
        cConverter.update();
        expect(cConverter.state('convertedCurrencyMoneyValue')).toEqual(40);
    })

    it('Check if the base money Value is updated',()=>{
        cConverter.setState({
            convertedCurrency:'CAD',
            convertedMoneyValueUpdatedFirstTime:false,
        })

        cConverter.instance().updateBaseCurrencyMoneyValue('');
        cConverter.update();
        expect(cConverter.state('baseCurrencyMoneyValue')).toEqual('');
        cConverter.instance().updateBaseCurrencyMoneyValue(5);
        cConverter.update();
        expect(cConverter.state('baseCurrencyMoneyValue')).toEqual(30);
    })
})

