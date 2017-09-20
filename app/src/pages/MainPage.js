import React, { Component } from 'react'
import { connect } from 'react-redux'

import SearchComponent from '../components/SearchComponent'
import ResultsComponent from '../components/ResultsComponent'
@connect((store) => {
    return {
        
    }    
    
})
export default class MainPage extends Component {
 render() {
     
     let rv1 = (
         <div className="container-fluid">
            <div className="row">
                <div className="col-md-4 col-md-offset-4 col-xs-offset-2 col-xs-8">
                    <SearchComponent />
                </div>
            </div>
            <div className="row">
                <div className="col-md-8 col-md-offset-2 col-xs-offset-2 col-xs-8">
                    <ResultsComponent /> 
                </div>
            </div>
        </div>
         )
         
        let rv2 = (
            <div className="container-fluid">
            <div className="row">
                <div className="col-xl-4 col-xl-offset-4 col-xs-12">
                    <SearchComponent />
                </div>
            </div>
                    <ResultsComponent /> 
        </div>    
            
        )
     
    return rv2
 }   
}