import React, { useEffect, useState } from 'react'
import { shortList, list, longList } from './data'
import { FaQuoteRight } from 'react-icons/fa';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

const Carousel = () => {
    const [poeple, setPoeple] = useState(longList);
    const [currentPerson,setCurrentPerson] = useState(5);
   const prevSlide =()=>{
    setCurrentPerson((oldPerson)=>{
      const result = (oldPerson - 1 +poeple.length ) % poeple.length;
      return result;
    })
   }
   const nextSlide =()=>{
    setCurrentPerson((oldPerson)=>{
      const result = (oldPerson + 1) % poeple.length;
      return result;
    })
   }

   useEffect(()=>{
   let slideId= setInterval(() => {
      nextSlide();
    }, 3000);
    return ()=>{
      clearInterval(slideId);
    }
   },[currentPerson])

  return (

    <div className='slider-container'>
      {poeple.map((person,personIndex)=>{
        const{id,image, name, title,quote} = person;
        return <article key={id} className='slide' style={{transform:`translateX(${100 * (personIndex - currentPerson)}%)`, opacity: personIndex === currentPerson? 1 : 0, visibility: personIndex === currentPerson? 'visible': 'hidden'}}>
            <img src={image} alt={name}  className='person-img'/>
            <h5 className="name">{name}</h5>
            <p className="title">{title}</p>
            <p className="text">{quote}</p>
            <FaQuoteRight  className='icon'/>
        </article>
      })}

      <button type='button' className='prev' onClick={prevSlide}>
        <FiChevronLeft />
      </button>
      <button type='button' className='next' onClick={nextSlide}><FiChevronRight /></button>
    </div>
  )
}

export default Carousel
