import React from 'react'

import '../styles/LayoutStyles.css';
import { adminMenu, userMenu } from '../Data/data';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {message} from 'antd'

const Layout = ({ children }) => {
    const location = useLocation()
    const {user} = useSelector(state => state.user)
    const navigate = useNavigate()

    // logout func
    const handleLogout = () => {
        localStorage.clear()
        message.success('Logout Successfully')
        navigate("/login")
    }

    // redering menu list
    const SidebarMenu = user?.isAdmin ? adminMenu : userMenu;

  return (
    <div className="main">
        <div className="layout">
            <div className="sidebar">
                <div className="logo">
                    <h6>DOC APP</h6>
                    <hr />
                </div>
                <div className="menu">
                    {SidebarMenu.map(menu => {
                        const isActive = location.pathname === menu.path
                        return (
                            <>
                                <div className={`menu-item ${isActive && "active"}`}>
                                    <Link to={menu.path}>
                                        <div>
                                            <i className={menu.icon}></i>
                                            {menu.name}
                                        </div>
                                    </Link>
                                </div>
                            </>
                        )
                    })}
                    <div className={`menu-item`} onClick={handleLogout}>
                        <Link to="/login">
                            <div>
                                <i className='fa-solid fa-right-from-bracket'></i>
                                Logout
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="header">
                    <div className="header-content">
                        <i class="fa-solid fa-bell"></i>
                        <Link to='/profile'>{user?.name}</Link>
                    </div>
                </div>
                <div className="body">{children}</div>
            </div>
        </div>
    </div>
  )
}

export default Layout