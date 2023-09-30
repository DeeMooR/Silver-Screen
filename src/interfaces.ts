export interface IMovie {
    id: number,
    image: string,
    title: string,
    age: number,
    language: 'RU' | 'ENG',
    genres: string[],
}

export interface IDate {
    dayOfWeek: string,
    dateNumMonth: string,
}