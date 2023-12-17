/* ---------  USER  --------- */

export interface IUserTMS {
    username: string,
    email: string,
    password: string
}

export interface IUser {
    id: number,
    my_card: [],
    my_seat_select: [],
    my_movie: []
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

export interface IDataMyMovie {
    date: string,
    i_row: number,
    i_column: number,
    type_id: string,
    movie_id: number,
    seance_id: number
}

export interface IDataCardSelect {
    card_id: number,
    number: number,
    cost: number
}

export interface IDataSeatSelect {
    id: number,
    i_row: number,
    i_column: number,
    seat_type: string,
    seance_id: number
}


/* ---------  DATA  --------- */

export interface IMovie {
    id: number,
    image: string,
    title: string,
    age: number,
    language: 'RU' | 'ENG' | 'BEL',
    genres: string[],
    sub: boolean,
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
    id: number,
    room_id: number,
    time: string,
    places: number[][]
}

export interface ISlide {
    id: number,
    image: string,
    movie_id?: number,
    title?: string,
    text?: string,
    text_button?: string,
    link?: string
}

export interface ICard {
    id: number,
    image: string,
    cost: number,
    amount: number
}

export interface IRoom {
    id: number,
    cost_single: number,
    cost_sofa: number,
    rows: IRow[]
}

export interface IRow {
    id: number,
    type_id: string,
    seats: number
}

export interface ISeatType {
    type: string,
    image: string,
    image_select: string,
    description: string
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