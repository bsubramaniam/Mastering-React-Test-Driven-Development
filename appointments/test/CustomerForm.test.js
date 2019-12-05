import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { createContainer } from './domManipulators';
import { CustomerForm } from '../src/CustomerForm';

describe('CustomerForm', () => {
  let render, container;
  const form = id => container.querySelector(`form[id="${id}"]`);
  const expectToBeInputFieldOfType = type => formElement => {
    expect(formElement).not.toBeNull();
    expect(formElement.tagName).toMatch('INPUT');
    expect(formElement.type).toMatch('text');
  };

  const field = name => {
    return form("customer").elements[name];
  };

  const labelFor = formElementName => {
    return container.querySelector(
      `label[for=${formElementName}]`
    );
  }

  const itRendersAsATextBox = (fieldName) =>
    it('renders as a text box', () => {
      render(<CustomerForm />);
      expectToBeInputFieldOfType('text')(field(fieldName));
    });

  const itIncludesTheExistingValue = (fieldName) =>
    it('includes the existing value', () => {
      render(<CustomerForm { ...{[fieldName]: 'value'} } />);
      expect(field(fieldName).value).toEqual('value');
    });

  const itRendersALabel = (fieldName, labelText) =>
    it('renders a label', () => {
      render(<CustomerForm />);
      expect(labelFor(fieldName).textContent).toEqual(labelText);
    });

  const itAssignsIdThatMatchesLabelId = (fieldName) =>
    it('assigns an id that matches the label id', () => {
      render(<CustomerForm />);
      expect(field(fieldName).id).toEqual(fieldName);
    });

  const itSavesExistingValueWhenSubmitted = (fieldName, existingValue) =>
    it('saves existing value when submitted', async () => {
      expect.hasAssertions();
      render(<CustomerForm
        { ...{[fieldName]: existingValue} }
        onSubmit={({ [fieldName]: value }) =>
          expect(value).toEqual(existingValue)
        }
      />);
      await ReactTestUtils.Simulate.submit(form('customer'));
    });

  const itSavesNewValueWhenSubmitted = (fieldName, existingValue, value) =>
    it('saves new value when submitted', async () => {
      expect.hasAssertions();
      render(<CustomerForm
        { ...{[fieldName]: existingValue} }
        onSubmit={({ [fieldName]: value }) =>
          expect(value).toEqual(value)
        }
      />);
      await ReactTestUtils.Simulate.change(
        field(fieldName),
        {
          target: {
            value,
            name: fieldName
          }
        }
      );
      await ReactTestUtils.Simulate.submit(form('customer'));
    });

  beforeEach(() => {
    (
      { render, container } = createContainer()
    );
  });

  it('renders a form', () => {
    render(<CustomerForm />);
    expect(form("customer")).not.toBeNull();
  });


  describe('first name field', () => {
    itRendersAsATextBox('firstName');

    itIncludesTheExistingValue('firstName');

    itRendersALabel('firstName', 'First name');

    itAssignsIdThatMatchesLabelId('firstName');

    itSavesExistingValueWhenSubmitted('firstName', 'existingValue');

    itSavesNewValueWhenSubmitted('firstName', 'existingValue', 'newValue');
  });

  describe('last name field', () => {

    itRendersAsATextBox('lastName');

    itIncludesTheExistingValue('lastName');

    itRendersALabel('lastName', 'Last name');

    itAssignsIdThatMatchesLabelId('lastName');

    itSavesExistingValueWhenSubmitted('lastName', 'existingValue');

    itSavesNewValueWhenSubmitted('lastName', 'existingValue', 'newValue');
  });

  describe('phone number field', () => {
    itRendersAsATextBox('phoneNumber');

    itIncludesTheExistingValue('phoneNumber');

    itRendersALabel('phoneNumber', 'Phone number');

    itAssignsIdThatMatchesLabelId('phoneNumber');

    itSavesExistingValueWhenSubmitted('phoneNumber', '012345');

    itSavesNewValueWhenSubmitted('phoneNumber', '012345', '0123456');
  });

  it('has a submit button', () => {
    render(<CustomerForm />);
    const submitButton = container.querySelector(
      'input[type="submit"]'
    );
    expect(submitButton).not.toBeNull();
  })
});
