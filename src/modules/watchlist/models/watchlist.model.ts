import { Column, Table, Model, ForeignKey } from "sequelize-typescript";
import { user } from "src/modules/user/models/user.model";

@Table
export class Watchlist extends Model {
    @ForeignKey(() => user)
    user: user;

    @Column
    name: string;

    @Column
    assetId: string;
}