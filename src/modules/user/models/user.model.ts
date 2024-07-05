import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { Watchlist } from "src/modules/watchlist/models/watchlist.model";

@Table
export class user extends Model{ //extends расширяет класс user классом Model
    @Column
    firstName: string

    @Column
    userName: string

    @Column
    email: string

    @Column
    password: string

    @HasMany(() => Watchlist, {  //используем для удаления ненужных записей из таблицы
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    watchlist: Watchlist[]

}