export interface IMovie {
    id: number,
    image: string,
    title: string,
    age: number,
    language: 'RU' | 'ENG',
    genres: string[],
    video: string,
    duration: number,
    description: string,
    trailer: string,
    schedule: {
        date: string,
        room1: string[] | [],
        room2: string[] | [],
        room3: string[] | [],
        room4: string[] | [],
        room5: string[] | [],
        room6: string[] | [],
    }[]
}