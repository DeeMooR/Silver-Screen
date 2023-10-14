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

export interface ISlide {
    id: number,
    image: string,
    idFilm?: number,
    title?: string,
    text?: string,
    textButton?: string,
}

export interface INews {
    id: number,
    image: string,
    background_image: string,
    title: string,
    description: string,
    date?: string,
}