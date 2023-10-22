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
    room: number,
    time: string,
    places?: number[][]
}

export interface ISlide {
    id?: number,
    image: string,
    idFilm?: number,
    title?: string,
    text?: string,
    textButton?: string,
    link?: string,
    type?: string
}

export interface INews {
    id: number,
    image: string,
    background_image?: string,
    title: string,
    description: string,
    date?: string,
    link?: string,
}

export interface IUser {
    username: string,
    email: string,
    password: string
}

export interface IDataGiftCard {
    id: number,
    image: string,
    cost: number,
    amount: number
}

export interface IDataGiftSelect {
    idCard: number,
    number: number,
    cost: number
}

export interface IDataMyCard {
    numberCard: number,
    idCard: number,
    start: string,
    end: string,
    status: boolean
}

export interface IRoom {
    room: number,
    costSingle: number,
    costSofa: number,
    rows: IRow[]
}

export interface IRow {
    idRow: number,
    type: string,
    seats: number
}

export interface ISeatType {
    type: string,
    image: string,
    imageSelect: string,
    description: string
}

export interface IUserBuy {
    id: number,
    cards: [],
    movies: []
}