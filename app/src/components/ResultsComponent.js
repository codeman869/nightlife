import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import MediaQuery from 'react-responsive'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import * as s from '../actions/searchActions'
import { getAttendance, attend, cancel } from '../actions/attendanceActions'

import Result from './Result'

@connect((store)=>{
    return {
       results: store.search.results,
       attendance: store.attendance,
       auth: store.auth,
    }
}, (dispatch) => {
    return {
        getAttendance: (location) => dispatch(getAttendance(location)),
        attend: (location) => dispatch(attend(location)),
        cancel: (location) => dispatch(cancel(location)),
    }
})
export default class ResultsComponent extends Component {
    constructor(props) {
        super(props)
        this.oldResults = [] 
        this.styles = {
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            width: "100%",
            gridGap: 10 + "px",
            
        }
        
        this.mobileStyles = {
            display: "grid",
            gridTemplateColumns: "1fr",
            width: 100 + "%",
            gridGap: 10  + "px",
        }
        this.tabletStyles = {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            width: 100 + "%",
            gridGap: 10  + "px",
        }
    }
    
    componentDidMount() {
        
        this.props.getAttendance()
    }
    
   attend(location) {
        this.props.attend(location)    
   } 
   
   cancel(location) {
      this.props.cancel(location) 
   }
   
   buildResults(results) {
       let resultsDisplay = [] 
       
       const currentUser = this.props.auth.username
          
            for(let i = 0; i < results.length; i++) {
                let attendances = this.props.attendance.todaysAttendance.filter((item) => item.place === results[i].id)
                let numAttendances = attendances.length
                
                let isCurrentUserAttending = attendances.filter((item) => item.username === currentUser).length === 1 
                resultsDisplay.push(<Result cancelAttend={this.cancel.bind(this)} handleAttend={this.attend.bind(this)} key={results[i].id} amAttending={isCurrentUserAttending} going={numAttendances} {...results[i]}/>)
                
                
            } 
                return resultsDisplay
   }
   notify(message) {
       toast.info(message)
   }
   componentWillReceiveProps(nextProps) {
       
       if(nextProps.attendance.error) {
           this.notify(nextProps.attendance.errorMessage)
       }
   } 
    render() {
        
        const { results } = this.props
        let resultsOutput
        
        if(results) {
            resultsOutput = this.buildResults(results) 
       } else if(this.oldResults.length) {
            resultsOutput = this.buildResults(this.oldResults)
        } else {
            resultsOutput = null
        }
        
        return (
                <div>
                <ToastContainer
                    position='top-right'
                    type='info'
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    pauseOnHover />
                <MediaQuery maxDeviceWidth={599}>
                    <div style={this.mobileStyles}>
                        { resultsOutput }
                    </div>
                </MediaQuery>
                <MediaQuery minDeviceWidth={600} maxDeviceWidth={899}>
                    <div style={this.mobileStyles}>
                        { resultsOutput }
                    </div>
                </MediaQuery>
                <MediaQuery minDeviceWidth={900} maxDeviceWidth={1199}>
                    <div style={this.tabletStyles}>
                        { resultsOutput }
                    </div>
                </MediaQuery>
                <MediaQuery minDeviceWidth={1200}>
                    <div style={this.styles}>
                        { resultsOutput }
                    </div>
                </MediaQuery>
                </div>
            ) 
    }
}