import React, { useEffect, useState } from "react";
import "./Insight.scss";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";

const Insight = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/v1/getdata`)
        setData(res.data);
      } catch (error) {
        console.log("Error fetching data", error);
      }

    }
    fetchData();
  }, [])

  return (
    <div className="insight">
      <Swiper
        slidesPerView={1}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {data.map((item, i) => {
          if (i === 10) {
            return null
          }
          return (
            <SwiperSlide key={i} >
              <a href={item.url} target="_blank" rel="noreferrer">
                <div className="slides">
                  <p className="insight_heading">Insight:<br />{item.insight}</p>
                  <p className="source">source: {item.source}</p>
                </div>
              </a>
            </SwiperSlide>
          )
        })
        }
      </Swiper>
    </div>
  );
};

export default Insight;
