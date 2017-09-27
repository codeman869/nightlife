import axios from 'axios'

export function attend(location) {
   return (dispatch, getState) => {
       
       const { authToken } = getState().auth
       
       if(!authToken) {
           return null
       }
       
       return dispatch({
           type: 'ATTEND',
           payload: axios.post('/attendance/new', {
              place: location 
           }, {
               headers: {
                   'authorization-token': authToken
               }
           }) 
       }).catch((err)=>{
           console.log(err)
       })
   } 
}

export function getAttendance() {
    return {
        type: 'GET_ATTENDANCE',
        payload: axios.get('/attendance')
    }
}

export function cancel(location) {
    return (dispatch, getState) => {
       const auth = getState().auth 
       
       return dispatch({
           type: 'CANCEL_ATTEND',
           payload: axios.delete(`/attendance/${location}`, {
              headers: {
                  'authorization-token': auth.authToken
              } 
           }).then((data)=>{
               dispatch(getAttendance())
           })
       })
    }
}