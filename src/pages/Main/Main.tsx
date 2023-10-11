import React from 'react'
import PageTemplate from 'src/components/PageTemplate'
import SliderSwiper from 'src/components/SliderSwiper';
import SliderMovies from 'src/components/SliderMovies';
import './Main.css'

const Main = () => {
  return (
    <PageTemplate>
        <div className='main'>
            <SliderSwiper />
            {/* <SliderMovies /> */}
        </div>
    </PageTemplate>
  )
}

export default Main
