export default interface Payment {
    id?: number,
    fkidOrder: number,
    amount: number,
    fkcodeBank: string,
    status: number, // 1 Aproved, 2. In process, 3. Canceled
    created_at?: Date,
    updated_at?: Date
}