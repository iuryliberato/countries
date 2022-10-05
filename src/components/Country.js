import React from "react"
import { Card, Col, Divider, Statistic } from 'antd'
const { Meta } = Card;



const Country = ({ country }) => {

  const languages = Object.values(country.languages || {})

  return (
    <Col span={8} style={{ display: "flex" }}>
      <Card
        hoverable style={{ flexGrow: 1 }}
        cover={<img style={{ height: 400, objectFit: "contain" }} alt={country.name.common} src={country.flags.png} />}

      >
        <Meta title={country.name.common} description={`Capital:${country.capital}`} />
        <Statistic title="Population" value={country.population} />
        <Divider />

        <p> Subregion: {country.subregion}</p>
        <p> Language: {languages[0] || 'None'}</p>
      </Card>
    </Col>
  )
}

export default Country;