import React from 'react'
import PageTemplate from 'src/components/PageTemplate'
import SliderSwiper from 'src/components/SliderSwiper';
import './Main.css'

const Main = () => {
  return (
    <PageTemplate>
        <div className='main'>
            <SliderSwiper />
        </div>
    </PageTemplate>
  )
}

export default Main
