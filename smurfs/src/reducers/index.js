const initialState = {
    smurfs: [],
    formSmurf: {
        name: '',
        age: '',
        height: '',
    }
}

function reducer(state = initialState, action) {
    console.log("reducer:", action);
    switch(action.type) {
        case "SMURF_UPDATE":
            return {
                ...state,
                smurfs: action.payload,
            };
        case "FORM_SMURF_NAME_CHANGE":
            return {
                ...state,
                formSmurf: {
                    ...state.formSmurf,
                    name: action.payload,
                },
            };
        case "FORM_SMURF_AGE_CHANGE":
            return {
                ...state,
                formSmurf: {
                    ...state.formSmurf,
                    age: action.payload,
                },
            };
        case "FORM_SMURF_HEIGHT_CHANGE":
            return {
                ...state,
                formSmurf: {
                    ...state.formSmurf,
                    height: action.payload,
                },
            };
        case "POST_SMURF":
            return {
                ...state
            }
        default:
            return state;
    }
}

export default reducer;