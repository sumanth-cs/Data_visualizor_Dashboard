import React, { useState } from 'react'
import "./Sidebar.scss";

//icons
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

import bottomImg from "../../assests/logo1.png"
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <div className="sidebar_container">
      <button className="btn S_btn" onClick={handleToggleSidebar}>
        <MenuRoundedIcon/>
      </button>
      </div>

      <div className={`sidebar ${showSidebar ? "show" : "hide"}`}> 
        <div className="top">
          <span className='logo'>Dashboard</span>
        </div>
        <div className="center">
          <ul>
            <p className="title">MAIN MENU</p>

            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'active' : 'inactive')}
            >
              <li>
                <HomeRoundedIcon className='icon' />
                <span>Home</span>
              </li>
            </NavLink>

            <NavLink
              to="/analysis"
              className={({ isActive }) => (isActive ? 'active' : 'inactive')}
            >
              <li>
                <QueryStatsIcon className='icon' />
                <span>Analysis</span>
              </li>
            </NavLink>

            <NavLink
              to="/news"
              className={({ isActive }) => (isActive ? 'active' : 'inactive')}
            >
              <li>
                <NewspaperIcon className='icon' />
                <span>News</span>
              </li>
            </NavLink>
          </ul>
        </div>
        <div className="bottom">
          <img src={bottomImg} alt="" className='btm_image' />
        </div>
      </div>
    </>
  )
}

export default Sidebar