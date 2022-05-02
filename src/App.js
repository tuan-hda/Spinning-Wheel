import React, { useEffect, useState } from 'react'
import imgSrc from './images/WHEEL.png'

const App = () => {
  const [currRound, setRound] = useState('');

  const wheel = document.getElementById('wheel');

  const getItemDeg = (item) => {
    const randomValue = Math.floor(Math.random() * 35);
    const arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const index = arr.indexOf(item);
    const res = randomValue + 360 - 45 * (index) - 10 + 360;
    return res;
  }

  const handleSpin = () => {
    if (!currRound) {
      setRound('spin-wheel-first')
      setTimeout(() => {
        setRound('spin-wheel-main')
      }, 2000)
    } else {
      document.documentElement.style.setProperty('--deg', `rotate(${3600 + getItemDeg('B')}deg)`)
      setRound('spin-wheel-last');
      setTimeout(() => {
        wheel.style.animationPlayState = 'paused';
      }, 4950)
    }
  }

  console.log('b');

  return (
    <div className='w-[300px] relative'>
      <button
        className='outline-0 p-2 bg-red-400 rounded-md m-5 mb-20'
        onClick={handleSpin} disabled={currRound === 'spin-wheel-last' || currRound === 'spin-wheel-first'}>START/STOP</button>

      <div className={`spin-bg ${currRound}`} id='wheel'></div>

      <svg width="100" height="100" className='absolute -rotate-[135deg] right-10 top-[22%]'>
        <polygon points="20, 50, 40, 100, 0, 100" fill="black" />
      </svg>

    </div >

  )
}

export default App