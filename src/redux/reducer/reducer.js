export const initialState = {
    searchTermCollection: [],
    responseApiData: [],
    author: '',
    title: '',
    url: '',
    comments: ''
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_SEARCHED_TERM':
            return {
                ...state,
                searchTermCollection: [...state.searchTermCollection, action.payload]
            }
        default: 
            return state
    }

}
