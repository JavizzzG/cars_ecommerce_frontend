export default interface BankCard {
    id?: number,
    fkcodeBank: string,
    number: string,
    cvc: string,
    name: string,
    expire_date: string,
    balance: number,
    status: number
}