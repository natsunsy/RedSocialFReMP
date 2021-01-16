import React, {useState} from 'react';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { SidebarData } from './sidebardata';
import { IconContext } from 'react-icons';
import { Avatar } from '@material-ui/core';
import './navbar.css';

export default function Navbar({title}){
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar)

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
                        <div className="avatar">
                        <Avatar/></div>
                        <h4>Software Engineer</h4>
                    </div>
                    {SidebarData.map((item,index) => {
                    return(
                        <li key={index} className={item.cName}>
                            <Link to={item.path}>
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