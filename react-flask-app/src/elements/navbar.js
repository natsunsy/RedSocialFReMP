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
                        <Avatar src="https://scontent.flim11-1.fna.fbcdn.net/v/t1.0-9/130249199_4085934954754163_3099918067762144354_n.jpg?_nc_cat=101&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeHQfj-ySbhveZyUGvRhOKopRs1cdnmMOm9GzVx2eYw6b2-aJ_wuroadDOfGAB7a8Pff-r76GyKzGMExSxFU20jR&_nc_ohc=MXzxM-zn6IAAX8-bXQn&_nc_ht=scontent.flim11-1.fna&oh=1f9a0965813770f603b008be42eeb9ba&oe=602CCDBE"/></div>
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