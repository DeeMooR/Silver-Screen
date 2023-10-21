import React, { FC } from 'react'
import { getAudio, getRoomVideo } from 'src/helpers'
import { ISeance } from 'src/interfaces'
import './ScheduleItem.css'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

interface IScheduleItem {
    video: string,
    seance: ISeance
}

const ScheduleItem:FC<IScheduleItem> = ({video, seance}) => {
    const navigate = useNavigate();
    const searchDate = useSelector(({ search }) => search.date).split(', ')[1];
    const {id} = useParams<{id: string}>();

    const clickSeance = () => {
        navigate(`/afisha/${id}/${searchDate}/${seance.room}/${seance.time}`);
    }
    
    return (
        <div className='scheduleItem' onClick={clickSeance}>
            <p className='scheduleItem__time'>{seance.time}</p>
            <p className='scheduleItem__audio'>{getAudio(seance.room)} {video}</p>
            <p className='scheduleItem__room'>Зал {seance.room} {getRoomVideo(+seance.room)}</p>
        </div>
    )
}

export default ScheduleItem
