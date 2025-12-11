export default interface Order {
    id?: number,
    fkidUser: number,
    fkidCar: number,
    amount: number,
    date: Date,
    address: string,
    phone: string,
    status: number // 1. Completed   2 . In process     3. Canceled   4. Unpaid
}