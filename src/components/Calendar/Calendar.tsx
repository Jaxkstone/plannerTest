import React, {useState} from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import {connect} from "react-redux";
import { compose } from 'redux';
import {addMyEvent} from "../../redux/calendar-reducer";

interface CalendarProps {
    addMyEvent(title:string, date:string): void
    myEvents:[]
}

const Calendar: React.FC<CalendarProps> = ({addMyEvent, myEvents}) => {

    const [eventTitle, setEventTitle] = useState('');
    const [eventDate, setEventDate]= useState('');


    const changeEvent = (e: React.ChangeEvent<HTMLInputElement>, setEvent:any) => {
        let textValue = e.currentTarget.value;
        setEvent(textValue)
    };

    const addEvents = () => {
        const newEvent:any = {
            title: eventTitle,
            date: eventDate
        };

        if(newEvent.title.length > 0){
            addMyEvent(newEvent.title, newEvent.date);

            setEventTitle('');
            setEventDate('')
        }
    };

    return (
        <div>
            <input type="text"
                   placeholder='Название события'
                   value={eventTitle}
                   onChange={(e) => changeEvent(e, setEventTitle)}
                   required
            />
            <input type="date"
                   value={eventDate}
                   onChange={(e) => changeEvent(e, setEventDate)}
                   required
            />
            <button className="waves-effect waves-light btn" disabled={!eventTitle} onClick={addEvents}>
                <i className="material-icons right">add_to_photos</i>save
            </button>

            <FullCalendar
                defaultView="dayGridMonth"
                plugins={[ dayGridPlugin ]}
                events={myEvents}
            />
        </div>
    )
}

const mapStateToProps = (state:any) => {
    return{
        myEvents: state.calendar.events
    }
}

const CalendarContainer: React.FC = compose(
    connect(mapStateToProps,{addMyEvent})
)(Calendar)

export default CalendarContainer