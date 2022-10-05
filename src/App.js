import { useState } from 'react'
import Navbar from "./components/Navbar"
import Main from "./components/Main"
import Charts from "./components/Charts"
import { QueryClient, QueryClientProvider } from 'react-query'
import 'antd/dist/antd.css'

const queryClient = new QueryClient()

function App() {

  const [page, setPage] = useState('main')


  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <Navbar setPage={setPage} />
      <div className="counties-content">
        {page === 'main' ? <Main /> : <Charts />}
      </div>
    </QueryClientProvider>
  )
}

export default App;
