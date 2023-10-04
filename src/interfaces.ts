export interface IMovie {
    id: number,
    image: string,
    title: string,
    age: number,
    language: 'RU' | 'ENG' | 'BEL',
    isSUB?: boolean,
    genres: string[],
    video: string,
    duration: number,
    description: string,
    trailer: string,
    schedule: {
        date: string,
        seances: ISeance[]
    }[]
}

export interface ISeance {
    room: string,
    time: string
}