import React, { Component } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Webcam from "react-webcam";

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
            alert("¡Estas "+data.feeling+"!")
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="55" height="70" fill="currentColor" className="bi bi-camera-fill" viewBox="0 0 16 16">
                       <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                       <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"/>
                    </svg>
                </button>
            </form>
        )
    }
}