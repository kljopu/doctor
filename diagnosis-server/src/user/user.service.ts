import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, Diagnosis } from '../../../domains/dist/domains';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly users: Repository<User>,
        @InjectRepository(Diagnosis)
        private readonly diagnosis: Repository<Diagnosis>

    ) { }

    async findByEmail(email) {
        try {
            const user: User = await this.users.findOne({ email: email })
            if (!user) throw new NotFoundException()
            return user
        } catch (error) {
            return error
        }
    }

    async fulfillApplication(symptom: string, user: User, doctorId: number) {
        try {
            const diagnosis: Diagnosis = await this.diagnosis.save(
                this.diagnosis.create({
                    symptom,
                    patient: user,
                    doctorId
                })
            )
            let { patient, ...rest } = diagnosis
            return rest

        } catch (error) {
            return error
        }
    }
}
