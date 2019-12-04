import React, { useState } from 'react';
import ReactDOM from 'react-dom';

export const Appointment = ({ customer: { firstName } }) => {
  return (<div>{firstName}</div>);
};

const formatAppoitmentTime = startsAt => {
  const [h, m] = new Date(startsAt).toTimeString().split(':');
  return `${h}:${m}`;
}

export const AppointmentsDayView = ({ appointments }) => {
  const [selectedAppointment, setSelectedAppointment] = useState(0);
  return (
    <div id="appointmentsDayView">
      <ol>
        {
          appointments.map((appointment, index) => (
            <li key={appointment.startsAt}>
              <button
                type="button"
                onClick={() => setSelectedAppointment(index)}
              >
                {formatAppoitmentTime(appointment.startsAt)}
              </button>
            </li>
          ))
        }
      </ol>
      { appointments.length > 0 ? 
        <Appointment customer={appointments[selectedAppointment].customer} />
        : (<p>There are no appointments scheduled for today</p>)
      }
    </div>
  );
};