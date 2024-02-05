import React from 'react'
import '../App.css'
import hamburgerLogo from '../assets/Hamburger Menue Logo.svg'
import cyftaskmateLogo from '../assets/CYFTASKMATE.svg'
import CurrentTime from './CurrentTime'

const Header = () => {
	return (
		<header className='header'>
			<div className='header-left'>
				<img src={cyftaskmateLogo} alt='CYFTASKMATE Logo' />
			</div>
			<div className='current-time'>
				<CurrentTime />
			</div>
			<div className='header-right'>
				<div className='hamburger-menu'>
					<img src={hamburgerLogo} alt='Hamburger Menu' />
				</div>
			</div>
		</header>
	)
}

export default Header
