import axios from 'axios'

export function checkToken(token) {
   
   return dispatch => {
       return dispatch({
        type: 'CHECK_TOKEN',
        payload: axios.post('/auth', {token: token })    
       }).then(({ value }) => {
           dispatch(setUserData(value.data, token))
       }).catch((err) => {
           console.log("Invalid JWT, please log in") 
       })
       
   } 
        
  
}

export function setUserData(data, token) {
    
    const { username, domain, exp, profileImage } = data 
    
    return {
        type: 'SET_USER_DATA',
        payload: {
            username,
            domain,
            exp,
            authToken: token,
            profileImage
        } 
    }
}

export function logoutUser(token) {
    return {
       type: 'LOGOUT_USER',
       payload: axios.delete('/auth/token',  {
           headers: {
               'authorization-token': token
           }
       }) 
    }
}