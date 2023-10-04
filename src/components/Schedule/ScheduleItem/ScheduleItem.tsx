import React, { FC } from 'react'
import { getAudio, getRoomVideo } from 'src/helpers'
import './ScheduleItem.css'

interface IScheduleItem {
    video: string,
    seance: {
        room: string,
        time: string
    }
}

const ScheduleItem:FC<IScheduleItem> = ({video, seance}) => {

    return (
        <div className='scheduleItem'>
            <p className='scheduleItem__time'>{seance.time}</p>
            <p className='scheduleItem__audio'>{getAudio(+seance.room)} {video}</p>
            <p className='scheduleItem__room'>Зал {seance.room} {getRoomVideo(+seance.room)}</p>
        </div>
    )
}

export default ScheduleItem
