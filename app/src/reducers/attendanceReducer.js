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
            state = { ...state, error: false, errorMessage: "" }
            break
        case 'CANCEL_ATTEND_FULFILLED':
            todaysAttendance = state.todaysAttendance.filter((item) => item.place !== action.payload.data.location )
            state = { ...state, todaysAttendance, error: false, errorMessage: "" }
            break
        case 'CANCEL_ATTEND_REJECTED':
            state = { ...state, error: true, errorMessage: "Failed to remove atteandance" }
            break
       
    }
    return state
}