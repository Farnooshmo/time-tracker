import React from 'react'
import '../App.css'

const Footer = () => {
	return (
		<footer className='footer'>
			<p>
				©{' '}
				<a
					href='https://www.codeyourfuture.io/'
					target='_blank'
					rel='noopener noreferrer'
					className='footer-link'
				>
					Code Your Future
				</a>{' '}
				2024
			</p>
		</footer>
	)
}

export default Footer
