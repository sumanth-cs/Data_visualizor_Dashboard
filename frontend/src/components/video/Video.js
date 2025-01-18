import React from 'react'
import video from "../../assests/video.mp4"
import "./Video.scss"

const Video = () => {
  return (
    <div className="video_wrapper">
      <video src={video} autoPlay loop muted className='video'>
      </video>
      <p className='overlay_text'>You are capable of <br/> achieving great things</p>
    </div>
  )
}

export default Video