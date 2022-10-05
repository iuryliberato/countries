
import { useEffect, useMemo, useRef } from "react"
import { Chart } from '@antv/g2'
import { useQuery } from "react-query"




const fetchCharts = async () => {
  const res = await fetch('https://restcountries.com/v3.1/all')
  return res.json()
}


const ChartPopulation = () => {

  const { data, status } = useQuery('main', fetchCharts)

  const biggestCountries = useMemo(() => {
    return data ? data.sort((countryOne, countryTwo) => {
      return countryTwo.population - countryOne.population
    }).slice(0, 7) : []
  }, [data])


  const populations = biggestCountries.map(country => country.population)
  const maxPopulation = Math.max(...populations)

  const betterData = useMemo(() => {
    return biggestCountries.map(country => ({
      name: country.name.common,
      population: country.population
    }))
  }, [biggestCountries])

  console.log(betterData)

  const chart = useRef()

  useEffect(() => {
    if (betterData.length && chart.current) {
      console.log('draw our content on the chart')
      chart.current.tooltip({
        showMarkers: false,
      });
      // code to show stuff on chart
      chart.current.data(betterData)
      chart.current.axis('name', {
        // tickLine: {
        //   alignTick: false,
        // },
      });
      chart.current.axis('population', false);
      chart.current.interval().position('name*population');
      betterData.forEach((item) => {
        chart.current
          .annotation()
          .text({
            position: [item.name, item.population],
            content: item.population.toLocaleString(),
            style: {
              textAlign: 'center',
            },
            offsetY: -15
          })
      })
      chart.current.interaction('element-active');

      chart.current.render();

    }
  }, [betterData])

  useEffect(() => {
    console.log('draw our chart')
    chart.current = new Chart({
      container: 'chart',
      autoFit: true,
      height: 500,
      padding: [50, 20, 50, 20],
    })
  }, [])
  return (
    <div>

      <div className="chart" id="chart"></div>

      {status === 'loading' && (
        <p>Loading Data...</p>
      )}
      {status === 'error' && (
        <p>Error feching this Data</p>
      )}
      {status === 'success' && (
        <>


        </>
      )}
    </div>

  )

}

export default ChartPopulation