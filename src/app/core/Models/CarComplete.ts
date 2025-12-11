import { CarDetail } from "../../pages/cars/car-detail/car-detail";
import Car from "./Car";

export default interface CarComplete {

    id: number,
    name: string,
    model: string,
    year: string,
    fkid_brand: number,
    price: number,
    for_sale: boolean,
    fkid_user: number
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