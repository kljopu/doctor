import { Injectable, NotFoundException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, Board, Comment } from '../../../domains/dist/domains';
import { BoardEntity } from './DTO/board.interface';
import { CommentEntity } from './DTO/comment.interface';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(Board)
        private readonly boards: Repository<Board>,
        @InjectRepository(User)
        private readonly users: Repository<User>,
        @InjectRepository(Comment)
        private readonly comments: Repository<Comment>
    ) { }

    async createBoard(boardInput, user): Promise<any> {
        try {
            const { title, contents } = boardInput
            console.log(boardInput);
            const board = await this.boards.save(
                this.boards.create({
                    title,
                    contents,
                    user
                })
            ).catch((r) => {
                console.log(r);
            })
            return board
        } catch (error) {
            return error
        }
    }

    async getBoards(): Promise<any> {
        try {
            const boards: Board[] = await this.boards.find()
            return {
                boards: boards
            }
        } catch (error) {
            return error
        }
    }

    async getBoard(boardId: number): Promise<Board> {
        try {
            const board: Board = await this.boards.findOne(boardId)
            if (!board) throw new NotFoundException()
            let { user, ...result } = board
            return board
        } catch (error) {
            return error
        }
    }

    async searchBoard(userId, title): Promise<any> {
        try {
            let board
            board = (userId === undefined) ?
                (title === undefined ?
                    await this.boards.find() :
                    await this.boards.find({ title: title })) :
                (title === undefined ?
                    await this.boards.find({ user: { id: userId } }) :
                    await this.boards.find({ where: { user: { id: userId }, title } }))

            return {
                boards: board
            }
        } catch (error) {
            return error
        }
    }

    async editBoard(boardInput: BoardEntity, user: User): Promise<any> {
        try {
            const board: Board = await this.boards.findOne({ id: boardInput.id })
            if (!board) throw new NotFoundException()
            board.title = boardInput.title
            board.contents = boardInput.contents
            this.boards.save(board)
            let { user, ...result } = board
            return result
        } catch (error) {
            return error
        }
    }

    async deleteBoard(boardId, user: User): Promise<any> {
        try {
            const board: Board = await this.boards.findOne({ id: boardId })
            if (!board) throw new NotFoundException()
            if (user.id !== board.userId) throw new UnauthorizedException()
            await this.boards.softDelete(board.id).catch((r) => {
                console.log(r);
                throw new InternalServerErrorException()
            })
            return {
                ok: true
            }
        } catch (error) {
            console.log(error);
            return error
        }
    }

    async createComment(comments: string, boardId: number, user: User): Promise<Comment> {
        try {
            const board: Board = await this.boards.findOne({ id: boardId })
            const comment = await this.comments.save(
                this.comments.create({
                    comments,
                    user: user,
                    board
                })
            )
            return comment
        } catch (error) {
            return error
        }
    }
}
