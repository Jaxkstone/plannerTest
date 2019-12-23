const ADD_NEW_EVENTS = 'ADD_NEW_EVENTS';

const initialState:any = {
    events: [
        {title: null, date: null}
    ]

};

const calendarReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case ADD_NEW_EVENTS:
            const newEvent = {
                title: action.title,
                date: action.date
            };

            return {
                ...state,
                events: [...state.events, newEvent]
            };

        default:
            return state;
    }
};

export const addMyEvent = (title:string, date:string) => ({type: ADD_NEW_EVENTS, title, date});

export default calendarReducer