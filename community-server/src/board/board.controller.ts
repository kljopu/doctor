import {
    Get,
    Post,
    Put,
    Delete,
    Res,
    Req,
    Body,
    Query,
    Param,
    UseGuards,
    HttpStatus,
    Controller
} from '@nestjs/common';
import { BoardService } from './board.service';
import { User } from '../../../domains/dist/domains';
import { BoardEntity } from './DTO/board.interface';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { UserAuthorGuard } from 'src/auth/decorator/user.author.guard';
import { UserIsClient } from 'src/auth/decorator/userIsClient.guard';

@Controller('board')
export class BoardController {
    constructor(
        private boardService: BoardService
    ) { }

    @UseGuards(JwtAuthGuard, UserIsClient)
    @Post('')
    async createBoard(
        @Req() req,
        @Body() board: BoardEntity,
        @Res() res,
    ) {
        try {
            const user: User = req.user
            const result = await this.boardService.createBoard(board, user)
            return res.status(HttpStatus.ACCEPTED).json(result)
        } catch (error) {
            return error
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllBoards(
        @Req() req,
        @Param() id,
        @Res() res
    ) {
        try {
            const result = await this.boardService.getBoards()
            return res.status(HttpStatus.ACCEPTED).json(result)
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('/boards')
    async searchBoards(
        @Query('userId') userId: number | undefined,
        @Query('title') title: string | undefined,
        @Res() res
    ) {
        const result = await this.boardService.searchBoard(userId, title)
        return res.status(HttpStatus.ACCEPTED).json(result)
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getBoard(
        @Param() id,
        @Res() res
    ) {
        try {
            const result = await this.boardService.getBoard(id.id)
            return res.status(HttpStatus.ACCEPTED).json(result)
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
        }
    }

    @UseGuards(JwtAuthGuard, UserAuthorGuard)
    @Put(':id')
    async editBoard(
        @Req() req,
        @Res() res,
        @Body('boardInput') boardInput: BoardEntity
    ) {
        try {
            const user: User = req.user
            const result = await this.boardService.editBoard(boardInput, user)
            return res.status(HttpStatus.ACCEPTED).json(result)
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
        }
    }

    @UseGuards(JwtAuthGuard, UserAuthorGuard)
    @Delete(':id')
    async deleteBoard(
        @Param('id') id: number,
        @Req() req,
        @Res() res
    ) {
        try {
            const user: User = req.user
            const result = await this.boardService.deleteBoard(id, user)
            return res.status(HttpStatus.ACCEPTED).json(result)
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id/comment')
    async createComment(
        @Body() comments: string,
        @Param('id') id: number,
        @Res() res,
        @Req() req
    ) {
        try {
            const user = req.user
            const result = await this.boardService.createComment(comments, id, user)
            res.status(HttpStatus.ACCEPTED).json(result)
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
        }
    }
}
