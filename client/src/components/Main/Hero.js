import {useState,useEffect, useCallback, useRef} from 'react'
import img from '../../images/img.svg'

const Hero = () => {
  const [name, setName] = useState('')
  const spanRef = useRef('')
  const appNames = ['lists', 'projects', 'budgets', 'folders']
  const nameChange = useCallback(() => {
    const randName= Math.floor(Math.random() * appNames.length);
    setName(appNames[randName]);
  }, [setName]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      nameChange()
    }, 2000);
    return () => clearInterval(intervalId);
  }, [nameChange]);


  return (
    <div className="mainSite__hero">
      <section className={`mainSite__hero-left ${name}`}>
        <div className={`mainSite__hero-left-div ${name}`}></div>
        <p className="mainSite__hero-left-title">AX Office</p>
        <p className="mainSite__hero-left-desc">
          One app a lot of tools <br />
          Create and work like you want <br />
          Best option for organize all your  
          <span className={`mainSite__hero-left-desc ${name}`} ref={spanRef}> {name}</span>
        </p>

      </section>
      <section className="mainSite__hero-right">
        <img src={img} alt="" className="mainSite__hero-right-img" />
      </section>
    </div>
  )
}

export default Hero
