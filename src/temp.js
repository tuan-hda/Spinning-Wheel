import React, { useEffect, useState } from 'react'
import imgSrc from './images/WHEEL.png'

const speedInTime = 2000;
const currItem = 'H';
const ITERATIONS = 1;

const App = () => {
  const [isSpinning, setSpinning] = useState(true);
  const [currDeg, setDeg] = useState(0);

  const wheel = document.getElementById('wheel');

  const getItemDeg = (item) => {
    const randomValue = Math.floor(Math.random() * 30);
    const arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const index = arr.indexOf(item);
    const res = randomValue + 360 - 45 * (index) - 4 + 360;
    return res;
  }

  const getRestDeg = (iterations) => {
    //return 360;
    return getItemDeg(currItem);
  }

  const getSpeedInTime = (iterations) => {
    //return (360 - getCurrDegree()) * speedInTime / 360;
    return (getItemDeg(currItem) - getCurrDegree()) * speedInTime / 360;
    //return (360 - getCurrDegree() - getItemDeg(currItem)) * speedInTime / 360 + iterations * speedInTime;
  }

  useEffect(() => {
    if (wheel) {
      wheel.style.animationPlayState = isSpinning ? 'running' : 'paused';
      if (!isSpinning) {
        let myDeg = 360;
        let t1 = ((360 - getCurrDegree()) * speedInTime / 360)
        wheel.animate([
          { transform: `rotate(${myDeg}deg)` }
        ], {
          duration: t1,
          fill: 'forwards'
        })

        let totalTime = t1;
        let t = 1000;
        for (let i = 0; i < 5; i++) {
          myDeg += 180;
          t *= 1.5;
          setTimeout(() => {
            wheel.animate([
              { transform: `rotate(${myDeg}deg)` }
            ], {
              duration: t,
              fill: 'forwards'
            })
          }, totalTime)
          totalTime += t;
        }
        // const t1 = getRestDeg(ITERATIONS);
        // wheel.animate([
        //   { transform: `rotate(${t1}deg)` }
        // ], {
        //   duration: getSpeedInTime(ITERATIONS),
        //   fill: 'forwards',
        // });
        // setTimeout(() => {
        //   wheel.animate([
        //     { transform: `rotate(${t1 + 180}deg)` }
        //   ], {
        //     duration: speedInTime,
        //     fill: 'forwards',
        //   });
        // }, getSpeedInTime(ITERATIONS))
      }
    }
  }, [isSpinning])


  const getCurrDegree = () => {
    let st = window.getComputedStyle(document.getElementById('wheel'), null);
    let value = st.getPropertyValue('transform').split('(')[1].split(')')[0].split(',');;
    let isNegative = Math.asin(value[1]) * 180 / Math.PI < 0;
    let cos = Math.acos(value[0]) * 180 / Math.PI;
    let deg = isNegative ? 360 - cos : cos;
    return deg;
  }

  const handleClick = () => {
    setSpinning(!isSpinning);
    setDeg(getCurrDegree());
  }

  return (
    <div className='w-[300px] relative'>
      <button
        className='outline-0 p-2 bg-red-400 rounded-md m-5 mb-20'
        onClick={handleClick}>START/STOP</button>

      <img src={imgSrc}
        alt='spinning wheel'
        id='wheel'
        className='w-80 spin-wheel' />

      <svg width="100" height="100" className='absolute -rotate-[135deg] right-10 top-[22%]'>
        <polygon points="20, 50, 40, 100, 0, 100" fill="black" />
      </svg>

      <div className='m-10'>
        {currDeg}
      </div>
    </div >

  )
}

export default App