import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import "./News.scss";
import Cards from '../../components/cards/Cards';
import Insight from "../../components/insight/Insight.js"
import astheticBg from "../../assests/asthetic_bg.jpg"
import axios from "axios";
import Footer from '../../components/footer/Footer';

const News = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://data-visualizor-dashboard.onrender.com/api/v1/getdata");
        setData(res.data);
      } catch (error) {
        console.error("An error occurred while fetching news data:", error);
      }
    }
    fetchData();
  }, [])


  return (
    <div className="news">
      <Sidebar />
      <div className="news_container">
        <Navbar />
        <div className="cards_container">

          <div className="top_section">
            <div className="insight">
              <Insight />
            </div>
            <div className="asthetic_bg">
              <img src={astheticBg} alt="" />
            </div>
          </div>

          <span style={{ fontSize: "30px", fontWeight: "500", marginLeft: "30px", marginBottom: "-10px" }}>News :</span>
          <div className="cards_inner_container">
            {data.map((item) => (
              <Cards key={item._id} title={item.title} url={item.url} source={item.source} published={item.published} insight={item.insight}  className="cards" />
            ))}
          </div>
        </div>
        <Footer/>
      </div>
    </div>
  );
};

export default News;
