const initialState = {
    smurfs: [],
}

function reducer(state = initialState, action) {
    console.log("reducer:", action);
    switch(action.type) {
        case "SMURF_UPDATE":
            return {
                ...state,
                smurfs: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;