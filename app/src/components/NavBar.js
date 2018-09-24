import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import MediaQuery from 'react-responsive'
import { logoutUser, checkToken } from '../actions/authActions'

@connect((store) => {
    return {
        auth: store.auth
    }    
}, (dispatch) => {
    return {
       logout: (token) => dispatch(logoutUser(token)), 
       checkToken: (token) => dispatch(checkToken(token)),
    }
})
export default class NavBar extends Component {
    
    componentWillMount() {
        //check cookies for an authorized user and post to verify token
       const cookieArray = document.cookie.split(';')
       
       for(let i = 0; i < cookieArray.length; i++) {
          
          let tempCookie = cookieArray[i].split('=')
          
          let cookieName = tempCookie[0].replace(/^\s+/g, '')
          cookieName =  cookieName.replace(/\s+$/g, '')  
         
          if(cookieName == 'user') {
              let cookieValue = unescape(tempCookie[1].replace(/^\s+/g, ''))
              cookieValue = cookieValue.replace(/\s+$/g, '')
              this.props.checkToken(cookieValue)
              break
          }
          
          
       }
       
    }   
    
    logoutUser() {
       const { loggedIn, authToken } = this.props.auth
       if(loggedIn) {
           this.props.logout(authToken)
       }
    }
    
    render() {
        const { username, loggedIn, profileImage } = this.props.auth
        let displayValue
        if(loggedIn) {
            
            displayValue = (
                    <div>
                    <MediaQuery maxDeviceWidth={750}>
                     <nav className="navbar navbar-default">
                        <div className="container-fluid">
                            <div style={{
                               display: "grid",
                               gridTemplateColumns: "2fr 1fr",
                               gridTemplateRows: "1fr 1fr 1fr",
                               width: "100%",
                               gridGap: "5px",
                               
                                
                            }}>
                                <Link style={{gridColumn: "1 / 1", gridRow: "2 / 2"}} to="/" className="navbar-brand">NightLife</Link> 
                                
                                    <img src={ profileImage } style={{borderRadius: 100 + "%", 
                                        gridArea: "2 / 2 / 2 / 2",
                                        margin: "auto"
                                    }}/>
                                    <span style={{
                                        gridArea: "1 / 2 / 1 / 2",
                                        margin: "auto",
                                        textAlign: "center",
                                    }} className="navbar-text"> Logged in as {username} </span>
                                    <a onClick={this.logoutUser.bind(this)} className="btn nav-btn" style={{
                                        gridArea: "3 / 2 / 3 / 2",
                                        margin: "auto"
                                    }}> Logout</a>
                            </div>
                    </div>
                </nav>
                </MediaQuery>
                <MediaQuery minDeviceWidth={751}>
                    <nav className="navbar navbar-default">
                    <div className="container-fluid">
                            <Link to="/" className="navbar-brand">NightLife</Link> 
                            <ul className="nav navbar-nav navbar-right">
                               <li>
                                <img src={ profileImage } style={{borderRadius: 100 + "%"}}/>
                               </li>
                                <li>
                                    <span className="navbar-text"> Logged in as {username} </span>
                                </li>
                                <li>
                                    <a onClick={this.logoutUser.bind(this)}> Logout</a>
                                </li>
                            </ul>
                    </div>
                </nav> 
                </MediaQuery>
                </div>
            ) 
        } else {
            displayValue = (
                <nav className="navbar navbar-default">
                    <Link to="/" className="navbar-brand">NightLife</Link> 
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <a href="/auth/twitter"> Log in with Twitter </a>
                        </li>
                    </ul>
                </nav>
            )    
        }
     return displayValue 
    }
}