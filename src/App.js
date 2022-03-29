import "./App.css";
import React, { useState } from 'react'
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoadingBar from 'react-top-loading-bar'

const App = (props) => {
  const apiKey = process.env.REACT_APP_NEWS_API
  const pageSize = 6;

  const [progress, setprogress] = useState(0);

  return (
    <Router>
      <div>
        <Navbar />
        <LoadingBar
          color='#f11946'
          height='1px'
          progress={progress}
        // onLoaderFinished={() => setProgress(0)}
        />
        <Routes>
          {/* exact is use for rebound component to old component and key for unique identification */}
          <Route exact path="/" element={<News setprogress={setprogress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general" />} />
          <Route exact path="/business" element={<News setprogress={setprogress} apiKey={apiKey} key="business" pageSize={pageSize} country="in" category="business" />} />
          <Route exact path="/entertainment" element={<News setprogress={setprogress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="in" category="entertainment" />} />
          <Route exact path="/general" element={<News setprogress={setprogress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general" />} />
          <Route exact path="/health" element={<News setprogress={setprogress} apiKey={apiKey} key="health" pageSize={pageSize} country="in" category="health" />} />
          <Route exact path="/science" element={<News setprogress={setprogress} apiKey={apiKey} key="science" pageSize={pageSize} country="in" category="science" />} />
          <Route exact path="/sports" element={<News setprogress={setprogress} apiKey={apiKey} key="sports" pageSize={pageSize} country="in" category="sports" />} />
          <Route exact path="/technology" element={<News setprogress={setprogress} apiKey={apiKey} key="technology" pageSize={pageSize} country="in" category="technology" />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App