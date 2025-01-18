import React from 'react';
import './Cards.scss';
import bg from "../../assests/colorful_bg1.jpg"

const Cards = ({ title, url, source, published,insight }) => {
  return (
    <div className="cards">
      <div className="bg_image" style={{ backgroundImage: `url(${bg})` }}></div>
      <div className="main_content">
        <a href={url} target='_blank' rel="noreferrer">
          <h3 className="cards_title">{title}</h3>
          <p className="cards_content">{insight}</p>
          <p className="cards_source">source: {source}</p>
        </a>
      </div>
    </div>
  );
};

export default Cards;
