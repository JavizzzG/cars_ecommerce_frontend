export default interface CarDetail {
    id?: number,
    fkidCar: number,
    door: string | null,
    seat: string | null,
    motor: string | null,
    hp: number,
    km: number,
    max_velocity: number,
    torque: number,
    fuel: number, //1 Gasoline, 2 Diesel, 3 Electric, 4 Hybrid
    hybrid: number,
    autonomy: number,
    brake: number, //1 Mechanical, 2 Hydraulic, 3 Electric
    modified: number,
    description: string | null
}