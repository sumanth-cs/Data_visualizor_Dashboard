import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import "./Navbar.scss"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="left">
        <div className="search">
          <input type="text" placeholder='search here' />
          <SearchIcon style={{ color: "#2c698d" }} />
        </div>
      </div>
      <div className="right">
        <div className="item">
          <AccountCircleIcon style={{ color: "#9F7037", fontSize: "40px" }}  />
        </div>
      </div>
    </div>
  )
}

export default Navbar