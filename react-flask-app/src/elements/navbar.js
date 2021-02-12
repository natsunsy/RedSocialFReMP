import React, {useState} from 'react';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { SidebarData } from './sidebardata';
import { IconContext } from 'react-icons';
import { Avatar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import './navbar.css';

const ProfileAvatar = withStyles({
    root: {
      width: "40%",
      height: "40%",
      margin:"auto",
      marginTop:"20%",
      marginBottom:"2%"
    },
  })(Avatar);

export default function Navbar({title}){
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar)

    const sessionStr = localStorage.getItem("session")
    const sessionJson = JSON.parse(sessionStr)
    const user = sessionJson.user

    return(
        <>
         <IconContext.Provider value={{ color: '#000' }}>
            <div className='navbar'>
                <Link to="#" className='menu-bars'>
                    <FaIcons.FaBars onClick={showSidebar}/>
                </Link>
                <span className="title">{title}</span>
            </div>
            <div className={sidebar ? 'nav-menu-shadow active':'nav-menu-shadow'} onClick={showSidebar}>

            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                
                <ul className='nav-menu-items' onClick={showSidebar}>
                    <div className="profile-info">
                        
                        <ProfileAvatar src={user.imageUrl}/>
                        <h4>{user.labor}</h4>
                    </div>
                    {SidebarData.map((item,index) => {
                    return(
                        <li key={index} className={item.cName}>
                            <Link to={item.path} onClick={item.onClick}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    )
                })}
                </ul>
            </nav>
        </IconContext.Provider>
        </>
    )
}