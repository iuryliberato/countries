import { useState } from "react"
import { useQuery } from "react-query"
import Country from "./Country"
import { Input, Button, Row } from 'antd'


const fetchMain = async () => {
  const res = await fetch('https://restcountries.com/v3.1/all')

  return res.json()
}


const Main = () => {
  const [search, setSearch] = useState('')
  const [continent, setContinent] = useState('')

  const onSearch = (e) => {
    setSearch(e.target.value)
  }


  const { data, status } = useQuery('main', fetchMain)


  const continentsList = data ? data.map(country => country.continents[0]) : []
  const continents = [...new Set(continentsList)]

  return (
    <div>
      {/* <p> {status}</p> */}
      {status === 'loading' && (
        <p>Loading Data...</p>
      )}
      {status === 'error' && (
        <p>Error feching this Data</p>
      )}
      {status === 'success' && (
        <div>
          <div className="search">
            <Input placeholder="Search Countries 🔎" onChange={onSearch} />
            {continents.map(c => {
              return <Button type={c === continent ? 'primary' : 'default'} onClick={() => setContinent(c)}>{c}</Button>
            })}
            <Button type={continent === '' ? 'primary' : 'default'} onClick={() => setContinent('')}>All</Button>
          </div>
          <Row justify="space-evenly" gutter={[16, 16]} style={{ padding: 16, alignItems: "stretch" }}>
            {
              data
                .filter(country => (
                  country.name.common.toLowerCase().includes(search.toLowerCase())
                ))
                .filter(country => (
                  continent ? country.continents.includes(continent) : true
                ))
                .map(country =>
                  <Country key={country.cca3} country={country} />
                )}
          </Row>
        </div>
      )}

    </div>

  )

}

export default Main