import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import MediaQuery from 'react-responsive'

import * as s from '../actions/searchActions'
import * as A from '../actions/attendanceActions'

import Result from './Result'

@connect((store)=>{
    return {
       results: store.search.results,
       attendance: store.attendance,
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
    
    componentWillMount() {
        const oldResults= localStorage.getItem('searchResults')     
        if(oldResults!= null) {
            const results =   JSON.parse(oldResults)
            this.props.dispatch(s.restoreResults(results))
            this.oldResults = results 
        }
        this.props.dispatch(A.getAttendance())
    }
    
   attend(location) {
        this.props.dispatch(A.attend(location))     
   } 
   
   buildResults(results) {
       let resultsDisplay = [] 
        console.log(this.props) 
        
            for(let i = 0; i < results.length; i++) {
                let numAttendances = this.props.attendance.todaysAttendance.filter((item) => item.place === results[i].id).length
                resultsDisplay.push(<Result handleAttend={this.attend.bind(this)} key={results[i].id} going={numAttendances} {...results[i]}/>)
                
                
            } 
                return resultsDisplay
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