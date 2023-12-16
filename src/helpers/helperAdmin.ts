export interface IForeignKeys {
    room_id?: number,
    user_id?: number,
    number_card?: number,
    genres?: string[]
}

export interface IDataInputAdmin {
    name: string,
    type: string,
    auto?: boolean
}

export interface ITable {
    title: string,
    url?: string,
    primary_key: IDataInputAdmin[],
    foreign_key: IDataInputAdmin[],
    inputs: IDataInputAdmin[]
}

export const tables = [
    {
        title: "movie",
        primary_key: [],
        foreign_key: [
            {name: 'genres', type: 'string[]'}
        ],
        inputs: [
            {name: 'language', type: 'RU|ENG|BEL'},
            {name: 'sub', type: 'boolean'},
            {name: 'image', type: 'string'},
            {name: 'title', type: 'string'},
            {name: 'age', type: 'number'},
            {name: 'video', type: 'string'},
            {name: 'duration', type: 'number'},
            {name: 'description', type: 'string'},
            {name: 'trailer', type: 'string'}
        ] 
    },
    {
        title: "schedule",
        primary_key: [],
        foreign_key: [
            {name: 'movie_id', type: 'number'}
        ],
        inputs: [
            {name: 'date', type: '01.01.2001'}
        ] 
    },
    {
        title: "seance",
        primary_key: [],
        foreign_key: [
            {name: 'room_id', type: 'number'},
            {name: 'schedule_id', type: 'number'}
        ],
        inputs: [
            {name: 'time', type: '10:24'}
        ] 
    },
    {
        title: "slider",
        primary_key: [],
        foreign_key: [],
        inputs: [
            {name: 'image', type: 'string'},
            {name: 'title?', type: 'string'},
            {name: 'text?', type: 'string'},
            {name: 'text_button?', type: 'string'},
            {name: 'link?', type: 'string'},
            {name: 'movie_id?', type: 'number'}
        ] 
    },
    {
        title: "card",
        primary_key: [],
        foreign_key: [],
        inputs: [
            {name: 'image', type: 'string'},
            {name: 'cost', type: 'number'},
            {name: 'amount', type: 'number'}
        ] 
    },
    {
        title: "pageNews",
        url: "page_news",
        primary_key: [],
        foreign_key: [],
        inputs: [
            {name: 'page', type: 'string'},
            {name: 'title', type: 'string'},
            {name: 'image', type: 'string'},
            {name: 'background_image?', type: 'string'},
            {name: 'description', type: 'string'},
            {name: 'date?', type: '01.01.2001'},
            {name: 'link?', type: 'string'}
        ] 
    },
    {
        title: "change card status",
        primary_key: [],
        foreign_key: [
            {name: 'user_id', type: 'number'},
            {name: 'number_card', type: 'number'}
        ],
        inputs: [] 
    }
];

// проверить полностью ли заполнен объект
export const checkFullObjIsFill = (obj: Record<string, any>) => {
    for (const key in obj) {
        if (!key.includes('?')) {
            const value = obj[key];
            if (value === undefined || value === null || (Array.isArray(value) && value.length === 0) || (typeof value === 'string' && value.trim() === '')) {
                return false;
            }
        }
    }
    return true;
}