import React, { Component } from "react";
import Navbar from '../elements/navbar';
import './diario.css'

export default class Diario extends Component{
  
  constructor(props){
    super(props)
    this.data = {}
    this.data = localStorage.getItem('today');
    if (this.data == null) {
      this.data = {
        "morning" : '',
        "night" : '',
        "nextday" : ''
      }
    }else{
      this.data = JSON.parse(this.data);
    }

    this.state = {
      dmorning: this.data.morning,
      dnight: this.data.night,
      dnextday: this.data.nextday
    }
  }
  componentDidMount() {
    let t = new Date()
    let Hr = t.getHours()

    if (Hr < 12){
      window.scrollTo(50,0)
    }else if (Hr < 18){
      window.scrollTo(50,450)
    }else{
      window.scrollTo(50,850)
    }

  }

   handleChangeMorning = (e) => {
    this.setState({dmorning: e.target.value});
    this.data.morning =  e.target.value
    localStorage.setItem('today', JSON.stringify(this.data) );
     console.log(this.data)
    console.log(this.state.dmorning)
   }

  handleChangeNight = (e) => {
    this.setState({dnight: e.target.value});
    this.data.night =  e.target.value
    localStorage.setItem('today', JSON.stringify(this.data) );
     console.log(this.data)
    console.log(this.state.dnight)
   }

  handleChangeNextday = (e) => {
    this.setState({dnextday: e.target.value});
    this.data.nextday =  e.target.value
    localStorage.setItem('today', JSON.stringify(this.data) );
     console.log(this.data)
    console.log(this.state.dnextday)
   }

   handleSubmit = (e) => {
     let hoy = {
       "morning": this.state.dmorning,
       "night": this.state.dnight,
       "dnextday": this.state.dnextday
     }
     alert(JSON.stringify(hoy));
     console.log(hoy);
    e.preventDefault();
   }

    render(){
        return(
          <>
            <div>
                <Navbar title="Diario"/>
                <div id = "today-label">Hoy</div>
            </div>
         <form className = "form-diario" onSubmit = {this.handleSubmit}>
             <div>
            <div>
                <div>
                    <div className = "text">¿Qué planes tengo hoy?</div>
                </div>
                <textarea class="text_diario" name="ftmorning" onChange = {this.handleChangeMorning} rows="4" cols="25">
                    {this.state.dmorning}
                </textarea>
            </div>
            <div>
                <div>
                    <div className = "text">¿Qué hizo que este sea un buen día?</div>
                </div>            
                <textarea className="text_diario" name="ftnight" onChange = {this.handleChangeNight} rows="4" cols="50">
                    {this.state.dnight}
                </textarea>
            </div>

            <div>
                <div>
                    <div className = "text">¿Qué puedo hacer mañana?</div>
                </div>
                <textarea className="text_diario" name="ftnextday" onChange = {this.handleChangeNextday} rows="4" cols="50">
                    {this.state.dnextday}
                </textarea>
            </div>
              <input type="submit" className="saveDay" value="Guardar" />
            </div>
            </form>
          </>
        )
    }
}
