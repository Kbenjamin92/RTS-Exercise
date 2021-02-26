export const initialState = {
    searchTermCollection: [],
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_SEARCHED_TERM':
            return {
                searchTermCollection: [action.payload, ...state.searchTermCollection]
            }
        default: 
            return state
    }

}
