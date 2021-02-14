import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Diagnosis } from '../../../domains/dist/domains';
import { DoctorModule } from 'src/doctor/doctor.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Diagnosis]),
    forwardRef(() => DoctorModule),
    AuthModule
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService]
})
export class UserModule { }
