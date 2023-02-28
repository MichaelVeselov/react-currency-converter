import { useState, useEffect, useRef } from 'react';

import Block from './Block';

function App() {
  // const [rates, setRates] = useState({});

  const ratesRef = useRef({});

  const [fromCurrency, setFromCurrency] = useState('RUB');
  const [toCurrency, setToCurrency] = useState('USD');
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(1);

  /*   useEffect(() => {
    fetch('https://api.apilayer.com/fixer/latest?base=USD', {
      method: 'GET',
      redirect: 'follow',
      headers: { apikey: 'WyJuCcafU37UBrA7y13RDnhNS3oMuPbO' },
    })
      .then((response) => response.json())
      .then((json) => {
        setRates(json.rates);
        console.log(json.rates);
      })
      .catch((error) => console.warn(error));
  }, []); */

  useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/latest.js')
      .then((response) => response.json())
      .then((json) => {
        const rates = { ...json.rates, RUB: 1 };
        //setRates(rates);
        ratesRef.current = rates;
        onChangeToValue(1);
      })
      .catch((error) => console.warn(error));
  }, []);

  const onChangeFromValue = (value) => {
    const resultAmount = (value / ratesRef.current[fromCurrency]) * ratesRef.current[toCurrency];
    setToValue(resultAmount.toFixed(2));
    setFromValue(value);
  };

  const onChangeToValue = (value) => {
    const resultAmount = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
    setFromValue(resultAmount.toFixed(2));
    setToValue(value);
  };

  useEffect(() => {
    fromValue && onChangeFromValue(fromValue);
  }, [fromCurrency]);

  useEffect(() => {
    toValue && onChangeToValue(toValue);
  }, [toCurrency]);

  return (
    <div className='App'>
      <Block
        value={fromValue}
        activeCurrency={fromCurrency}
        onChangeCurrency={(currency) => setFromCurrency(currency)}
        onChangeValue={onChangeFromValue}
      />
      <Block
        value={toValue}
        activeCurrency={toCurrency}
        onChangeCurrency={(currency) => setToCurrency(currency)}
        onChangeValue={onChangeToValue}
      />
    </div>
  );
}

export default App;
