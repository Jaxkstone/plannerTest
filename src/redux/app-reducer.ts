const INITIALIZED_SUCCESS:String = 'INITIALIZED_SUCCESS';

interface IAppInitialize {
    initializedApp: boolean
}


const initialState:IAppInitialize = {
    initializedApp: false
}

const appReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initializedApp: true
            };

        default:
            return state;
    }
}

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});

export const initializeApp = () => (dispatch:any) => {
    dispatch(initializedSuccess());
};

export default appReducer

