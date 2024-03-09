import React, { useState, useEffect } from 'react'
import '../App.css'
import playerPlay from '../assets/playerPlay.svg'
import playStop from '../assets/playerStop.svg'

const Timer = ({ todoId }) => {
	const [isTimerRunning, setTimerRunning] = useState(false)
	const [startTime, setStartTime] = useState(null)
	const [endTime, setEndTime] = useState(null)
	const [elapsedTime, setElapsedTime] = useState(0)

	const formatTime = (timeInSeconds) => {
		const hours = Math.floor(timeInSeconds / 3600)
		const minutes = Math.floor((timeInSeconds % 3600) / 60)
		const seconds = timeInSeconds % 60
		return `${hours}h ${minutes}m ${seconds}s`
	}

	const handleStart = async () => {
		try {
			const response = await fetch(`http://localhost:5001/todos/${todoId}/start`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
			})
			console.log('Response from server:', response) // Log the response object
			if (response.ok) {
				setTimerRunning(true)
				setStartTime(new Date())
			} else {
				console.error('Failed to start timer')
			}
		} catch (error) {
			console.error('Error:', error)
		}
		console.log('isTimerRunning after handleStart:', isTimerRunning)
	}

	useEffect(() => {
		console.log('isTimerRunning inside useEffect:', isTimerRunning)
	}, [isTimerRunning])

	const handleStop = () => {
		setTimerRunning(false)
		setEndTime(new Date())
	}

	useEffect(() => {
		let intervalId
		if (isTimerRunning) {
			intervalId = setInterval(() => {
				const currentTime = new Date()
				const elapsedSeconds = Math.floor((currentTime - startTime) / 1000)
				setElapsedTime(elapsedSeconds)
			}, 1000)
		} else {
			clearInterval(intervalId)
		}
		console.log('elapsedTime:', elapsedTime)
		return () => clearInterval(intervalId)
	}, [elapsedTime,isTimerRunning, startTime])

	useEffect(() => {
		// Store duration when timer stops
		if (!isTimerRunning && endTime) {
			const durationInSeconds = Math.floor((endTime - startTime) / 1000)
			// Send API request to store duration in backend
			fetch(`http://localhost:5001/todos/${todoId}/end`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ duration: durationInSeconds }),
			})
				.then((response) => response.json())
				.then((data) => console.log(data)) 
				.catch((error) => console.error('Error:', error))
		}
	}, [isTimerRunning, startTime, endTime, todoId])

	return (
		<div className='todo-timer'>
			<img
				src={isTimerRunning ? playStop : playerPlay}
				alt={isTimerRunning ? 'Stop Timer' : 'Start Timer'}
				onClick={() => {
					console.log('Clicked on play button')
					isTimerRunning ? handleStop() : handleStart()
				}}
				style={{ cursor: 'pointer' }}
			/>
			{isTimerRunning ? (
				<span>{`Elapsed Time: ${formatTime(elapsedTime)}`}</span>
			) : (
				elapsedTime > 0 && (
					<span>{`Recorded Time: ${formatTime(elapsedTime)}`}</span>
				)
			)}
		</div>
	)
}

export default Timer
