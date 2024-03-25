import { IsNotEmpty } from 'class-validator';
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

// enum Role {
//     Painter = 'painter',
//     InventoryManager = 'inventory-manager',
//     SystemAdmin = 'system-admin'
// }
//
// enum UserStatus {
//     Enabled = 'enabled',
//     Disabled = 'disabled',
// }

export type Resources = 'paint-colours' | 'users';
export type Actions = 'view' | 'update';
export type ResourceActionsMap = Record<Resources, Actions[]>;

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @IsNotEmpty()
    @Column()
    public name: string;

    @IsNotEmpty()
    @Column()
    public username: string;

    @IsNotEmpty()
    @Column()
    public role: string;

    @IsNotEmpty()
    @Column({ type: 'json', nullable: true })
    public permissions: string;

    @IsNotEmpty()
    @Column()
    public userStatus: string;

    public toString(): string {
        return `${this.name}`;
    }

}
