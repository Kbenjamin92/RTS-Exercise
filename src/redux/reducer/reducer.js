export const initialState = {
    searchCollection: [],
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_SEARCHED_TERM':
            console.log(state.searchCollection)
            return {
                searchCollection: [action.payload, ...state.searchCollection]
            }
        default: 
            return state
    }

}
