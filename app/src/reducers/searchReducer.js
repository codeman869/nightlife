const initialState = {
   location: null,
   results: [],
   fetching: false,
}

export default (state=initialState, action) => {
    let results, location   
    switch(action.type) {
        case 'SET_LOCATION':
            location = action.payload.location
            state = { ...state, location }
            break
        case 'SEARCH_PENDING':
            state = { ...state, fetching: true }
            break
        case 'SEARCH_FULFILLED':
           const { data } = action.payload
            state = { ...state, fetching: false, results: data.businesses}
            break
        case 'RESTORE_RESULTS':
            results = action.payload
            state = { ...state, results }
            break 
        case 'CLEAR_RESULTS':
            results = []
            location = ''
            state = { ...state, results, location }
            break
    }
    return state   
}