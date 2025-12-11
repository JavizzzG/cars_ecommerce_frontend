export default interface OrderComplete {
    id?: number,
    fkidUser: number,
    fkidCar: number,
    amount: number,
    date: Date,
    address: string,
    phone: string,
    status: number,
    name: string,
    price: number,
    image?: string | null
}