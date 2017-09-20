import axios from 'axios'

export function loginuser() {
    
    return {
        type: 'LOGIN_USER',
        payload: {
            name: 'TEST',
            age: 35
        }
    }
    
}
