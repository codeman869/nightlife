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
       })
   } 
}