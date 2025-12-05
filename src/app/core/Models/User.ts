export default interface User {
    id?: number,
    name: string,
    email: string,
    password: string,
    birthdate: Date | null,
    document: string | null,
    phone: string | null
}