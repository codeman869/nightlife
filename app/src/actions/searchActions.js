import axios from 'axios'

export function search(location) {
   
  return dispatch => {
      return dispatch({
         type: 'SEARCH',
         payload: axios.get('/api/v1/business', {params: {
                location 
            }})
          
      }).then(( { value }) => {
          
          localStorage.setItem('searchResults', JSON.stringify(value.data.businesses))
      })
  }
    
}

export function clearResults() {
    localStorage.removeItem('savedSearch')
    localStorage.removeItem('searchResults')
    
    return {
        type: 'CLEAR_RESULTS'
    }
}

export function setLocation(location) {
    
   localStorage.setItem('savedSearch', location)   
   
    return {
        type: 'SET_LOCATION',
        payload: {
            location
        }
       
    }
}

export function restoreResults(results) {
   return {
       type: 'RESTORE_RESULTS',
       payload: results
   } 
}

