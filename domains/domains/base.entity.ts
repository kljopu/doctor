import {
    BaseEntity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Entity,
    CreateDateColumn
} from "typeorm";

@Entity()
export abstract class BaseModel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    @DeleteDateColumn()
    deletedAt!: Date
}