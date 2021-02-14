import { Module, forwardRef } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { User, Board, Comment } from '../../../domains/dist/domains';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Board, Comment]),
    forwardRef(() => UserModule),
    AuthModule
  ],
  providers: [BoardService],
  controllers: [BoardController],
  exports: [BoardService, TypeOrmModule]
})
export class BoardModule { }
