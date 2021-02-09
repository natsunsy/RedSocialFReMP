import { Avatar } from '@material-ui/core'
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Header from '../elements/header'

export default class Perfil extends Component {
    constructor(props){
        super(props)
        const sessionStr = localStorage.getItem("session")
        const sessionJson = JSON.parse(sessionStr)
        let loggedIn
            if(sessionStr == null)
                loggedIn = false
            else
                loggedIn = sessionJson.loggedIn

        this.state = {
            loggedIn,

        }
    }

    componentDidMount(){
        const sessionStr = localStorage.getItem("session")
        if(sessionStr != null){
        const sessionJson = JSON.parse(sessionStr)
        const userId = sessionJson.user._id
        }
    }

    render(){
        if(!this.state.loggedIn){
            return <Redirect to = "/"/>
        }
        const sessionStr = localStorage.getItem("session")
        const sessionJson = JSON.parse(sessionStr)
        const user = sessionJson.user
        return(
            
            <div>
                <Header title="Perfil"/>
                <div className="inicio">
                    <div className="feed">
                        <div className="profile-info">
                            <div className="avatar">
                                <Avatar src="https://scontent.flim11-1.fna.fbcdn.net/v/t1.0-9/130249199_4085934954754163_3099918067762144354_n.jpg?_nc_cat=101&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeHQfj-ySbhveZyUGvRhOKopRs1cdnmMOm9GzVx2eYw6b2-aJ_wuroadDOfGAB7a8Pff-r76GyKzGMExSxFU20jR&_nc_ohc=MXzxM-zn6IAAX8-bXQn&_nc_ht=scontent.flim11-1.fna&oh=1f9a0965813770f603b008be42eeb9ba&oe=602CCDBE"/>
                            </div>
                            <h4>{user.name}</h4>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
