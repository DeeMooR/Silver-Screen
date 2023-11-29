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
        seances: number[]
    }[]
}

export interface ISeance {
    id: number,
    room: number,
    time: string,
    places: number[][]
}

export interface ISlide {
    image: string,
    movie_id?: number,
    title?: string,
    text?: string,
    text_button?: string,
    link?: string
}

export interface IUserTMS {
    username: string,
    email: string,
    password: string
}

export interface ICard {
    id: number,
    image: string,
    cost: number,
    amount: number
}

export interface IDataCardSelect {
    card_id: number,
    number: number,
    cost: number
}

export interface IDataMyCard {
    card_id: number,
    number_card: number,
    start: string,
    end: string,
    status: boolean
}

export interface IAddMyCard {
    number_card: number,
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

export interface IUser {
    id: number,
    my_card: [],
    my_seat_select: [],
    my_movie: []
}

export interface IDataSeatSelect {
    idMovie: number,
    date: string,
    row: number,
    column: number,
    cost: number,
    typeSeat: string,
    idSeance: number
}

export interface IPageTitle {
    page: string,
    image: string,
    title: string,
    text: string
}

export interface INews {
    id: number,
    page: string,
    image: string,
    background_image?: string,
    title: string,
    description: string,
    date?: string,
    link?: string,
}
