import React from 'react'
import NavigationItem from './NavigationItem'
import './Navigation.css'

import calendar from "../../icons/calendar.png"
import video from "../../icons/video.png"
import audio from "../../icons/audio.png"
import language from "../../icons/language.png"

const Navigation = () => {
  return (
    <div className='navigation'>
      <div className='navigation__item'><NavigationItem icon={calendar} type='calendar' /></div>
      <div className='navigation__item'><NavigationItem icon={video} text='Формат' type='video' /></div>
      <div className='navigation__item'><NavigationItem icon={audio} text='Звук' type='audio' /></div>
      <div className='navigation__item'><NavigationItem icon={language} text='Прочее' type='language' /></div>
    </div>
  )
}

export default Navigation
