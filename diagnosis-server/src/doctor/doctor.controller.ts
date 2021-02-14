import { Controller, Post, UseGuards, Body, Req, Res, HttpStatus, Param, Get } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { UserIsDoctor } from "../auth/decorator/userIdDoctor.guard"

@Controller('doctor')
export class DoctorController {
    constructor(
        private doctorService: DoctorService
    ) { }

    @UseGuards(JwtAuthGuard, UserIsDoctor)
    @Get('diagnosis')
    async getMydiagnosis(
        @Req() req,
        @Res() res
    ) {
        try {
            const result = await this.doctorService.getMyDiagnosis(req.user)
            return res.status(HttpStatus.ACCEPTED).json(result)
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
        }
    }

    @UseGuards(JwtAuthGuard, UserIsDoctor)
    @Post('diagnosis/:id')
    async diagnosis(
        @Param('id') id: number,
        @Body('comment') comment: string,
        @Req() req,
        @Res() res
    ) {
        try {
            const result = await this.doctorService.diagnosis(comment, id)
            return res.status(HttpStatus.ACCEPTED).json(result)
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
        }
    }

}
