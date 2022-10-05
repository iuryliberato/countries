import { useEffect, useMemo, useRef } from "react"
import { Chart } from '@antv/g2'
import { useQuery } from "react-query"




const fetchCharts = async () => {
  const res = await fetch('https://restcountries.com/v3.1/all')
  return res.json()
}


const ChartArea = () => {

  const { data, status } = useQuery('main', fetchCharts)

  const biggestCountries = useMemo(() => {
    return data ? data.sort((countryOne, countryTwo) => {
      return countryTwo.area - countryOne.area
    }).slice(0, 7) : []
  }, [data])


  const areas = biggestCountries.map(country => country.area)
  const maxPopulation = Math.max(...areas)

  const betterData = useMemo(() => {
    return biggestCountries.map(country => ({
      name: country.name.common,
      area: country.area
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
      chart.current.axis('area', false);
      chart.current.interval().position('name*area');
      betterData.forEach((item) => {
        chart.current
          .annotation()
          .text({
            position: [item.name, item.area],
            content: `${item.area.toLocaleString()} km²`,
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
      container: 'chart-area',
      autoFit: true,
      height: 500,
      padding: [50, 20, 50, 20],
    })
  }, [])
  return (
    <div>

      <div className="chart" id="chart-area"></div>

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

export default ChartArea