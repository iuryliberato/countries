import React from "react"
import ChartPopulation from "./ChartPopulation"
import ChartArea from "./ChartArea"
import { Typography } from 'antd'

const { Title } = Typography

const Charts = () => {



  return (
    <>
      <Title level={2} style={{ display: "flex", justifyContent: "center", fontSize: 50, marginTop: 20 }}>Most Populated Countries</Title>
      <ChartPopulation />
      <Title level={2} style={{ display: "flex", justifyContent: "center", fontSize: 50, marginTop: 20 }}>Biggest Countries</Title>
      <ChartArea />
    </>

  )

}

export default Charts