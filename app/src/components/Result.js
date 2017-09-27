import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Results extends Component {
    constructor(props) {
        super(props)
        this.imageStyle = {
            borderTopLeftRadius: 20 + "px",
            borderTopRightRadius: 20 + "px",
            gridColumn: "1 / 1",
            width: "100%",
            height: "auto",
            gridRow: "1 / 2",
            maxHeight: "250px",
            
        }
        this.cardStyle = {
           borderRadius: 20 + "px",
           backgroundColor: "#111",
           display: "grid",
           padding: "10px",
           gridTemplateRows: "1 fr",
           
        }
    }
   
   handleClick() {
       const { id } = this.props
       this.props.handleAttend(id)
   } 
   
   handleCanx() {
       const { id } = this.props
       this.props.cancelAttend(id)
   }
    
    render() {
       
       const { name, image_url, location, going, phone, display_phone, price, rating, id, url } = this.props
       
     return (
         
         
         <div style={this.cardStyle} key={id + "card"} >
         
            <img style={this.imageStyle} key={id+"image"} src={image_url}/>
               <h4 key={id+"title"}>{ name }</h4>
                <span key={id+"address"}> { location.display_address[0]} </span>
                <span key={id+"address2"}>{location.display_address[1]}</span>
                <span key={id+"phone"}>{display_phone}</span>
                <span key={id+"price"}>
                Price: {price}</span>
                <span key={id+"rating"}>Rating: {rating} / 5</span>
                <span key={id+"going"}>{going} Going</span>
                <div style={{margin: "auto"}} className="btn-group" key={id+"buttons"}>
                    <a key={id+"Imgoing"} className="btn btn-default" onClick={this.handleClick.bind(this)}>I'm Going</a>
                    <a key={id+"MoreInfo"} className="btn btn-primary" href={url}>More Info</a>
                    { this.props.amAttending &&
                       <a key={id+"canxAttend"} className="btn btn-danger" onClick={this.handleCanx.bind(this)}>Cancel</a>
                       
                        }
                    
                    
                </div>
         </div>
         
        )    
    }
}