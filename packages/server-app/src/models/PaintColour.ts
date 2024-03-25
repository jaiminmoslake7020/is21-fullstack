import { IsNotEmpty } from 'class-validator';
import {Column, Entity, PrimaryColumn} from 'typeorm';

export const MethodologyData = ['Agile','Waterfall'];

// enum StockStatus {
//     Available = 'available',
//     RunningLow = 'running-low',
//     OutOfStock = 'out-of-stock'
// }

@Entity()
export class PaintColour {

    @IsNotEmpty()
    @PrimaryColumn()
    public name: string;

    @IsNotEmpty()
    @Column()
    public stockStatus: string;

    public toString(): string {
        return `${this.name}`;
    }
}
