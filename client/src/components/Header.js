// client/src/components/Header.js
import React from 'react'
import '../App.css' //* Importing the main styles *//
import hamburgerLogo from '../assets/Hamburger Menue Logo.svg'
import cyftaskmateLogo from '../assets/CYFTASKMATE.svg'
import TaskCurrentTime from './TaskCurrentTime'

const Header = () => {
	return (
		<header>
			<div className='header-left'>
				<img src={cyftaskmateLogo} alt='CYFTASKMATE Logo' />
			</div>
			<div className='header-right'>
				<div className='hamburger-menu'>
					<img src={hamburgerLogo} alt='Hamburger Menu' />
				</div>
			</div>
			<TaskCurrentTime />
		</header>
	)
}

export default Header
