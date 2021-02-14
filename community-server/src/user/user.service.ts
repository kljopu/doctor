import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../domains/dist/domains';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly users: Repository<User>
    ) { }

    async findByEmail(email: string): Promise<User | undefined> {
        try {
            const user: User = await this.users.findOne({ email })
            if (!user) throw new NotFoundException()
            return user
        } catch (error) {
            return error
        }
    }
}
