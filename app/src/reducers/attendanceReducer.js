const initialState = {
    todaysAttendance: []
}

export default (state=initialState, action) => {
    switch(action.type) {
       case 'ATTEND_PENDING':
           break
       case 'ATTEND_FULFILLED':
           let newAttendance = action.payload.data
           let newAttendances = state.todaysAttendance.concat([newAttendance])
           state = { ...state, todaysAttendance : newAttendances }
            break
       case 'ATTEND_REJECTED':
            break
       case 'GET_ATTENDANCE_FULFILLED':
           let todaysAttendance = action.payload.data
           state = { ...state, todaysAttendance }
        
       
    }
    return state
}