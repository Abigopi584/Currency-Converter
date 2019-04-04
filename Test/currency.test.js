import React from 'react';
import Currency from '../Components/Currency';
import renderer from  'react-test-renderer';
import ReactDOM from "react-dom";
import ReactTestUtils from 'react-dom/test-utils';

describe('Currency Component', () => {
    it('component matches to snapshot',()=>{
        const component= renderer.create(<Currency type='base'
                                                   label='Currency'
                                                   currency='BGN'
                                                   countryCodesMoneyVals={[['INR', 3], ['ABC', 4], ['USD', 20]]}
                                                   currencyMoneyValue={3}/>);

        comp.updateCurrencyMoneyValue();
        comp.updateSelectOptionForCurreny();
        let comp = component.toJSON();
        expect(comp).toMatchSnapshot();
    })
})
