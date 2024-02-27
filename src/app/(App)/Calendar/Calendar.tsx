'use client'
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './calendar.module.css';

type CalendarComponentProps = {
  initialDate: string; 
};

const CalendarComponent: React.FC<CalendarComponentProps> = ({ initialDate }) => {
  const [date, setDate] = useState<Date | null>();

  useEffect(() => {
    setDate(new Date(initialDate));
  }, [initialDate]);

  const formatDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString();
    }
  };

  if (!date) {
    return <span className="loading loading-dots loading-xs"></span>
  }

  return (
    <div className="dropdown dropdown-bottom dropdown-end ">
      <div tabIndex={0} role="button" className="btn m-1">{formatDate(date)}</div>
      <div tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
        <Calendar
          onChange={(newDate) => setDate(newDate as Date)}
          className={styles.reactCalendar}
          value={date}
          minDate={new Date()}
          locale="en-US"
          prev2Label={null}
          next2Label={null}
        />
      </div>
    </div>
  );
}

export default CalendarComponent;
