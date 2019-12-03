import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import CurrencyItem from "./CurrencyItem";
import './styles.scss';

const countries = ['colombia', 'usa', 'europa'];

const Example = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [country, setCountry] = useState('colombia')

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} className="currency-selector">
      <DropdownToggle caret>
        <CurrencyItem country={country} />
      </DropdownToggle>

      <DropdownMenu>
      {
        countries.map(country => (
          <DropdownItem onClick={() => {
            setCountry(country); 
            props.onChangeCurrency(country);
          }}>
            <CurrencyItem country={country} />
          </DropdownItem>
        ))
      }
      </DropdownMenu>
    </Dropdown>
  );
}

export default Example;