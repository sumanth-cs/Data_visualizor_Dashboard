import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import "./Home.scss"
import Video from "../../components/video/Video.js"
import Insight from "../../components/insight/Insight.js"
import CircularBar from '../../components/circularBar/CircularBar';
import DataTable from '../../components/dataTable/DataTable';
import Footer from '../../components/footer/Footer';

const Home = () => {

    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext)

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login")
        }
    }, [isAuthenticated, navigate])

    return (
        <>
            <div className="home">
                <Sidebar />
                <div className="home_container">
                    <Navbar />
                    <div className="top_section">
                        <Video />
                        <Insight />
                    </div>
                    <div className="middle_section">
                        <p style={{ fontSize: "25px", fontWeight: "500" }}>Overview :</p>
                        <CircularBar percentage={19} color={"#0E8388"} title={"SECTORS"} />
                        <CircularBar percentage={98} color={"#03C988"} title={"TOPICS"} />
                        <CircularBar percentage={24} color={"#FF6D60"} title={"REGIONS"} />
                        <CircularBar percentage={10} color={"#3C2A21"} title={"PEST"} />
                        <CircularBar percentage={404} color={"#810CA8"} title={"SOURCE"} />
                        <CircularBar percentage={57} color={"#9C3D54"} title={"COUNTRIES"} />
                    </div>
                    <div className="bottom_section">
                        <div className="heading">
                            <p>Data Table :</p>
                        </div>
                        <div className="data_table">
                            <DataTable />
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Home