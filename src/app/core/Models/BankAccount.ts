export default interface BankAccount {
    id?: number,
    fkcodeBrank: string,
    document: string,
    name: string,
    password: string,
    balance: number,
    status: number
}