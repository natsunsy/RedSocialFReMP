import React, { Component } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Webcam from "react-webcam";
import * as IoIcons from 'react-icons/io5';

export default class Photo extends Component{
    constructor(props){
        super(props)
        const user = localStorage.getItem("user")
        let loggedIn = true
        console.log(user)
        if(user == null){
            loggedIn = false
        }
        this.state={loggedIn}
    }
    setRef = webcam => {
        this.webcam = webcam;
      };
    
    capture = () => {
        const imageSrc = this.webcam.getScreenshot();
        const photo = {photo:imageSrc}
        const response = fetch("/photo",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(photo),
            withCredentials: "include"
        }).then(res=>res.json())
        .then(data=>{
            console.log(data.feeling)
        })
        this.props.history.push("/inicio")
      };

    render(){
        if(!this.state.loggedIn){
            return <Redirect to = "/"/>
        }
        const videoConstraints = {
            width: 1280,
            height: 720,
            facingMode: "user"
          };
        return(
            <div className="auth-wrapper">
            <div className="auth-inner">
            <form className="cameraFrame">
                <Webcam
                audio={false}
                height={350}
                ref={this.setRef}
                screenshotFormat="image/jpeg"
                width={350}
                videoConstraints={videoConstraints}
                />
                <button type="submit" className="btn btn-light btn-circle btn-xl" onClick={this.capture}>
                <IoIcons.IoCamera size='medium'/>
                </button>
            </form>
            </div>
            </div>
        )
    }
}