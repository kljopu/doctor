import {
    Entity,
    Column,
    ManyToOne,
    RelationId
} from "typeorm";
import { Board } from "./board.entity";
import { User } from "./user.entity";
import { BaseModel } from "./base.entity";

@Entity()
export class Comment extends BaseModel {
    @Column({ type: "varchar" })
    comments: string

    @ManyToOne(() => User, user => user.comments, { onDelete: "CASCADE" })
    user: User

    @RelationId((comment: Comment) => comment.user)
    userId: number

    @ManyToOne(() => Board, board => board.comments, { onDelete: "CASCADE" })
    board: Board

    @RelationId((comment: Comment) => comment.board)
    boardId: number
}