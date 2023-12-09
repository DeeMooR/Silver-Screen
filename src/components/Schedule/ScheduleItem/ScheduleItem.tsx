import React, { FC } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { compareTimeNowStart, getAudio, getRoomVideo, getTodayDayMonthYear } from 'src/helpers'
import { ISeance } from 'src/interfaces'
import './ScheduleItem.css'

interface IScheduleItem {
    video: string,
    seance: ISeance
}

const ScheduleItem:FC<IScheduleItem> = ({video, seance}) => {
    const navigate = useNavigate();
    const searchDate = useSelector(({store}) => store.search.date).split(', ')[1];
    const {id} = useParams<{id: string}>();

    const nowTimeMoreStart = (getTodayDayMonthYear() === searchDate) ? compareTimeNowStart(seance.time) : false;

    // переход на страницу сеанса
    const clickSeance = () => {
        if (!nowTimeMoreStart) navigate(`/buy-ticket/${id}/${searchDate}/${seance.id}`);
    }
    
    return (
        <div className={`scheduleItem ${nowTimeMoreStart ? 'alreadyStart' : ''}`} onClick={clickSeance}>
            <p className='scheduleItem__time'>{seance.time}</p>
            <p className='scheduleItem__audio'>{getAudio(seance.room_id)} {video}</p>
            <p className='scheduleItem__room'>Зал {seance.room_id} {getRoomVideo(+seance.room_id)}</p>
        </div>
    )
}

export default ScheduleItem
