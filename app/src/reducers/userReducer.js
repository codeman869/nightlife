export default (state={}, action) => {
    switch(action.type) {
        case 'LOGIN_USER':
            state = { ...state, name: 'Fetch' }
            break
    }
    return state   
}