import React, { Component } from "react";
import Header from "../elements/header";
import MessageSender from "../elements/messagesender";
import Post from "../elements/post";
import './muro.css'
export default class Muro extends Component{
    render(){
        return(
            <div>
                <Header title="Inicio"/>
                <div className="feed">
                    <MessageSender/>
                    <Post 
                        profilePic="https://scontent.flim11-1.fna.fbcdn.net/v/t1.0-9/130249199_4085934954754163_3099918067762144354_n.jpg?_nc_cat=101&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeHQfj-ySbhveZyUGvRhOKopRs1cdnmMOm9GzVx2eYw6b2-aJ_wuroadDOfGAB7a8Pff-r76GyKzGMExSxFU20jR&_nc_ohc=MXzxM-zn6IAAX8-bXQn&_nc_ht=scontent.flim11-1.fna&oh=1f9a0965813770f603b008be42eeb9ba&oe=602CCDBE"
                        message='Funcionó'
                        timestamp="Esta es la hora"
                        username="Alex Chung"
                        image="https://cdn.vox-cdn.com/thumbor/KlvsWuCP3MFABXFVc42v8h5rX8g=/1400x788/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/13720701/shaggyyy.jpg" 
                    />
                    <Post 
                        profilePic="https://scontent.flim11-1.fna.fbcdn.net/v/t1.0-9/130249199_4085934954754163_3099918067762144354_n.jpg?_nc_cat=101&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeHQfj-ySbhveZyUGvRhOKopRs1cdnmMOm9GzVx2eYw6b2-aJ_wuroadDOfGAB7a8Pff-r76GyKzGMExSxFU20jR&_nc_ohc=MXzxM-zn6IAAX8-bXQn&_nc_ht=scontent.flim11-1.fna&oh=1f9a0965813770f603b008be42eeb9ba&oe=602CCDBE"
                        message='Funcionó'
                        timestamp="Esta es la hora"
                        username="Alex Chung"
                    />
                </div>
            </div>
        )
    }
}