import React, { useCallback } from 'react';
import ReactCountryFlag from "react-country-flag";

const CurrencyItem = (props) => {
  const code = useCallback(() => {
    switch (props.country) {
      case 'colombia':
        return 'co';
      case 'usa':
        return 'us';
      case 'europa':
        return 'eu';
      default:
        return 'co';
    }
  }, [props.country]);

  const currencyAbbr = useCallback(() => {
    switch (props.country) {
      case 'colombia':
        return 'COP';
      case 'usa':
        return 'USA';
      case 'europa':
        return 'EUR';
      default:
        return 'co';
    }
  }, [props.country])

  return (
    <>
      <ReactCountryFlag 
        code={code()} 
        styleProps={{
          width: '22px',
          height: '22px'
        }} 
        svg />
        <span style={{marginLeft: 5}}>{currencyAbbr()}</span>
    </>
  )
}

export default CurrencyItem;