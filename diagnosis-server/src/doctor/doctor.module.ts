import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Diagnosis } from '../../../domains/dist/domains';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Diagnosis])
  ],
  providers: [DoctorService],
  controllers: [DoctorController],
  exports: [DoctorService]
})
export class DoctorModule { }
