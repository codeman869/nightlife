import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import * as A from '../actions/authActions'

@connect((store) => {
    return {
        auth: store.auth
    }    
})
export default class LoginPage extends Component {
   
 render() {
    axios.get('/auth/test').then((data) => console.log(data))
    return (
        <div>
            <h1>Login Success! </h1> 
        </div>
        )
 }   
}