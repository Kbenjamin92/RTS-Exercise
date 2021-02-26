export const initialState = {
    searchTermCollection: [],
    responseApiData: [],
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_SEARCHED_TERM':
            return {
                searchTermCollection: [action.payload, ...state.searchTermCollection]
            }
        case 'GET_API_DATA':
            return {
                responseApiData: [action.payload, ...state.responseApiData]
            }
        default: 
            return state
    }

}
