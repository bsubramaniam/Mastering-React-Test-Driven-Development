import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import {
  Appointment,
  AppointmentsDayView
} from '../src/Appointment';

const createContainer = () => {
  const container = document.createElement('div');
  return container;
}

let container;
let customer;

const render = component => ReactDOM.render(component, container);

describe('Appointment', () => {
  beforeEach(() => {
    container = createContainer();
  })
  it('renders the customer first name', () => {
    customer = { firstName: 'Ash' };
    render(<Appointment customer={customer} />);
    expect(container.textContent).toMatch('Ash')
  });
  it('renders the another customer first name', () => {
    customer = { firstName: 'Jordan' };
    render(<Appointment customer={customer} />);
    expect(container.textContent).toMatch('Jordan')
  });
});

describe('AppointmentsDayView', () => {
  const today = new Date();
  const appointments = [
    {
      startsAt: today.setHours(12, 0),
      customer: { firstName: 'Ash' }
    },
    {
      startsAt: today.setHours(13, 0),
      customer: { firstName: 'Jordan' }
    },
  ];
  beforeEach(() => {
    container = createContainer();
  })
  it('renders a div with right id', () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(container.querySelector('div#appointmentsDayView')).not.toBeNull();
  });

  it('initially shows a message saying there are no appointments today', () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(container.textContent).toMatch(
      'There are no appointments scheduled for today'
    );
  });

  it('renders multiple appointments in an ol element', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(container.querySelector('ol').children).toHaveLength(2);
  });

  it('renders each appointment in an li', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(container.querySelectorAll('li')).toHaveLength(2);
    expect(container.querySelectorAll('li')[0].textContent).toEqual('12:00');
    expect(container.querySelectorAll('li')[1].textContent).toEqual('13:00');
  });

  it('has a button element in each li', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(
      container.querySelectorAll('li > button')
    ).toHaveLength(
      2
    );
    expect(
      container.querySelectorAll('li > button')[0].type
    ).toEqual('button');
  });

  it('selects the first appointment by default', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(container.textContent).toMatch(
      'Ash'
    );
  });

  it('renders another appointment when selected', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    const button = container.querySelectorAll('button')[1];
    ReactTestUtils.Simulate.click(button);
    expect(container.textContent).toMatch(
      'Jordan'
    );
  });
});