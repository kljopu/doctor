import { Controller, Get, UseGuards, Res, HttpStatus, Post, Req, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { DoctorService } from '../doctor/doctor.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { UserIsClient } from 'src/auth/decorator/userIsClient.guard';
import { DiagnosisEntity } from './DTO/diagnosis.interface';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
        private doctorService: DoctorService
    ) { }

    @UseGuards(JwtAuthGuard, UserIsClient)
    @Get('doctor')
    async getDoctors(
        @Res() res
    ) {
        try {
            const result = await this.doctorService.getDoctors()
            return res.status(HttpStatus.ACCEPTED).json(result)
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
        }
    }

    @UseGuards(JwtAuthGuard, UserIsClient)
    @Post('diagnosis')
    async createDiagnosis(
        @Req() req,
        @Res() res,
        @Body() diagnosisInput: DiagnosisEntity
    ) {
        try {
            const result = await this.userService.fulfillApplication(diagnosisInput.symptom, req.user, diagnosisInput.doctorId)
            return res.status(HttpStatus.ACCEPTED).json(result)
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
        }
    }
}
