const initialState = {
    todaysAttendance: [],
    error: false,
    errorMessage: "",
}

export default (state=initialState, action) => {
    switch(action.type) {
       case 'ATTEND_PENDING':
           state = { ...state, error: false, errorMessage: "" }
           break
       case 'ATTEND_FULFILLED':
           let newAttendance = action.payload.data
           let newAttendances = state.todaysAttendance.concat([newAttendance])
           state = { ...state, todaysAttendance : newAttendances }
            break
       case 'ATTEND_REJECTED':
           const { message } = action.payload.response.data
            state = { ...state, error: true, errorMessage: message }
            break
       case 'GET_ATTENDANCE_FULFILLED':
           let todaysAttendance = action.payload.data
           state = { ...state, todaysAttendance }
           break
        case 'CANCEL_ATTEND_PENDING':
            break
        case 'CANCEL_ATTEND_FULFILLED':
            break
        case 'CANCEL_ATTEND_REJECTED':
            break
            // code
            break;
        
        
       
    }
    return state
}