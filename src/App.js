import React, { useEffect, useState } from 'react'

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

  useEffect(() => {
    setTimeout(() => {
      setRound(currRound => currRound === 'spin-wheel-first' ? 'spin-wheel-main' : currRound)
    }, 2000)

  }, [currRound])


  const handleSpin = () => {
    if (!currRound) {
      setRound('spin-wheel-first')
    } else {
      document.documentElement.style.setProperty('--deg', `rotate(${3600 + getItemDeg('B')}deg)`)
      setRound('spin-wheel-last');
      setTimeout(() => {
        wheel.style.animationPlayState = 'paused';
      }, 4950)
    }
  }

  return (
    <div className='w-[300px] relative'>
      <button
        className='outline-0 p-2 bg-red-400 rounded-md m-5 mb-20'
        onClick={handleSpin}
        disabled={currRound === 'spin-wheel-last'} >
        START/STOP
      </button>

      <div className={`spin-bg ${currRound}`} id='wheel'></div>

      <svg width="100" height="100" className='absolute -rotate-[135deg] right-10 top-[22%]'>
        <polygon points="20, 50, 40, 100, 0, 100" fill="black" />
      </svg>

    </div>

  )
}

export default App