const initialState = {
    loggedIn: false,
    loggingIn: false,
    authToken: null,
    expires: null,
    username: null,
    domain: null,
    profileImage: null,
}

export default (state=initialState, action) => {
    switch(action.type) {
        case 'CHECK_TOKEN_PENDING':
            state = { ...state, loggingIn: true }
            break
        case 'CHECK_TOKEN_FULFILLED':
            state = { ...state, loggingIn: false, loggedIn: true }
            break
        case 'CHECK_TOKEN_REJECTED':
            state = { ...state, loggingIn: false, loggedIn: false }
            break
        case 'SET_USER_DATA':
            const { username, domain, exp, authToken, profileImage } = action.payload
            state = { ...state, username, domain, expires: exp, authToken, profileImage }
            break
        case 'LOGOUT_USER_PENDING':
            break
        case 'LOGOUT_USER_FULFILLED':
            state = { ...initialState }
            break
        case 'LOGOUT_USER_REJECTED':
            break
    }
    return state   
}