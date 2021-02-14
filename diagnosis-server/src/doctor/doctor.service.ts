import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, Diagnosis } from '../../../domains/dist/domains';
import { Repository } from 'typeorm';

@Injectable()
export class DoctorService {
    constructor(
        @InjectRepository(User)
        private readonly users: Repository<User>,
        @InjectRepository(Diagnosis)
        private readonly diagnoses: Repository<Diagnosis>
    ) { }

    async getDoctors() {
        try {
            const doctor = await this.users.find({
                where: { role: "Doctor" }
            })
            return doctor
        } catch (error) {
            return error
        }
    }

    async diagnosis(comment: string, diagnosisId: number) {
        try {
            const diagnosis: Diagnosis = await this.diagnoses.findOne({ id: diagnosisId })
            diagnosis.comment = comment
            await this.diagnoses.save(diagnosis)
            let { patient, ...rest } = diagnosis
            return rest
        } catch (error) {

        }
    }

    async getMyDiagnosis(user: User) {
        try {
            const diagnosis: Diagnosis[] = await this.diagnoses.find({ doctorId: user.id })
            return diagnosis
        } catch (error) {
            return error
        }
    }
}
