import React, { Fragment } from 'react'
import './App.css'

import Header from './components/Header'
import Footer from './components/Footer'
import SummaryActivities from './components/SummaryActivities.js'
import Inprogress from './components/Inprogress'
import DailySummary from './components/DailySummary'

function App() {
	return (
		<Fragment>
			<div className='container'>
				<Header />
				<SummaryActivities />
				<Inprogress />
				<DailySummary />
				<Footer />
			</div>
		</Fragment>
	)
}

export default App
