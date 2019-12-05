import React, { useState } from 'react';
import ReactDOM from 'react-dom';

export const CustomerForm = ({
  firstName,
  lastName,
  phoneNumber,
  onSubmit,
}) => {
  const [customer, setCustomer] = useState({
    firstName,
    lastName,
    phoneNumber,
  });

  const handleChangeFirstName = ({ target: { name, value } }) =>
    setCustomer(customer => ({
      ...customer,
      [name]: value
    }));

  return (
    <form
      id="customer"
      onSubmit={ () => onSubmit(customer) }
    >
      <label htmlFor="firstName">First name</label>
      <input
        type="text"
        name="firstName"
        id="firstName"
        value={customer.firstName}
        onChange={handleChangeFirstName}
      />
      <label htmlFor="lastName">Last name</label>
      <input
        type="text"
        name="lastName"
        id="lastName"
        value={customer.lastName}
        onChange={handleChangeFirstName}
      />
      <label htmlFor="phoneNumber">Phone number</label>
      <input
        type="text"
        name="phoneNumber"
        id="phoneNumber"
        value={customer.phoneNumber}
        onChange={handleChangeFirstName}
      />
      <input type="submit" value="Add" />
    </form>
  )
};