export default interface Car {
    id: number,
    name: string,
    model: string,
    year: string,
    fkid_brand: number,
    price: number,
    for_sale: boolean,
    fkid_user: number
    image?: string | null
}