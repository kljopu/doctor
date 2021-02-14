import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ormConfig } from '../../domains';
import { UserModule } from './user/user.module';
import { DoctorModule } from './doctor/doctor.module';
import { ConfigModule } from "@nestjs/config"
// import {} from ""

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      ...ormConfig as any,
      autoLoadEntities: true
    }),
    // AuthModule,
    UserModule,
    DoctorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
