import React, { useState } from 'react'
import "./Analysis.scss"

import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import BarChart from '../../components/barChart/BarChart'
import CircularBar from '../../components/circularBar/CircularBar'
import DataTable from '../../components/dataTable/DataTable'
import Footer from '../../components/footer/Footer'


const Analysis = () => {

  const [selectedOption, setSelectedOption] = useState("");

  const handleSelect = (e) => {
    setSelectedOption(e.target.value)
  }

  return (
    <div className="analysis">
      <Sidebar />
      <div className="analysis_container">
        <Navbar />
        <div className="top_section">
          <p style={{ fontSize: "25px", fontWeight: "500" }}>Overview :</p>
          <CircularBar percentage={19} color={"#0E8388"} title={"SECTORS"} />
          <CircularBar percentage={98} color={"#03C988"} title={"TOPICS"} />
          <CircularBar percentage={24} color={"#FF6D60"} title={"REGIONS"} />
          <CircularBar percentage={10} color={"#3C2A21"} title={"PEST"} />
          <CircularBar percentage={404} color={"#810CA8"} title={"SOURCE"} />
          <CircularBar percentage={57} color={"#9C3D54"} title={"COUNTRIES"} />
        </div>
        <div className="middle_section">
          <div className="filter">
            <p style={{ fontSize: "20px", fontWeight: "500" }}>select here to filter : </p>
            <select value={selectedOption} onChange={handleSelect}>
              <option value="">sector</option>
              <option value="option1">topic</option>
              <option value="option2">region</option>
              <option value="option3">PEST</option>
              <option value="option4">source</option>
              <option value="option5">country</option>
              <option value="option6">end year</option>
            </select>
          </div>
          {selectedOption === "" && <BarChart filtername={"sector"} />}
          {selectedOption === 'option1' && <BarChart filtername={"topic"} />}
          {selectedOption === 'option2' && <BarChart filtername={"region"} />}
          {selectedOption === 'option3' && <BarChart filtername={"pestle"} />}
          {selectedOption === 'option4' && <BarChart filtername={"source"} />}
          {selectedOption === 'option5' && <BarChart filtername={"country"} />}
          {selectedOption === 'option6' && <BarChart filtername={"end_year"} />}
        </div>
        <div className="bottom_section">
          <div className="heading">
            <p>Data Table :</p>
          </div>
          <div className="data_table">
            <DataTable />
          </div>
        </div>
        <Footer/>
      </div>
    </div>
  )
}

export default Analysis