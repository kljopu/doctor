import {
    Column,
    ManyToOne,
    RelationId,
    Entity,
    OneToMany
} from "typeorm";
import { User } from "./user.entity";
import { Comment } from "./comment.entity";
import { BaseModel } from "./base.entity";

@Entity()
export class Board extends BaseModel {
    @Column({ type: "varchar" })
    title: string

    @Column({ type: "varchar" })
    contents: string

    @OneToMany(() => Comment, (comments) => comments.board)
    comments: Comment[]

    @ManyToOne(() => User, user => user.boards, { onDelete: "CASCADE" })
    user: User

    @RelationId((board: Board) => board.user)
    userId: number
}