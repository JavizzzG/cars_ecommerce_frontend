export default interface Car {
    id?: number,
    name: string,
    model: string,
    year: string,
    fkidBrand: number,
    price: number,
    for_sale: boolean,
    fkidUser: number
    image?: string | null
}