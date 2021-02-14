import * as bcryptjs from "bcryptjs"
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BaseEntity,
  BeforeInsert,
} from "typeorm";
import { InternalServerErrorException, BadRequestException } from "@nestjs/common";

export enum DoctorRole {
  Doctor = 'Doctor'
}

@Entity()
export class Doctor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 20, nullable: false })
  name: string;

  @Column({ type: "varchar" })
  password!: string

  @Column({ type: "varchar", unique: true })
  email: string

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: "enum", enum: DoctorRole, default: DoctorRole.Doctor })
  role: DoctorRole

  @BeforeInsert()
  async savePassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcryptjs.hash(this.password, 10)
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException("Password Hassing Faild")
      }
    }
  }
  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      const ok = await bcryptjs.compare(aPassword, this.password)
      return ok
    } catch (error) {
      console.log("err:", error);
      throw new InternalServerErrorException()
    }
  }

  @BeforeInsert()
  async checkReg(): Promise<void> {
    var regex = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    if (!regex.test(this.password)) {
      throw new BadRequestException('Invalid RegExp')
    }
  }
}
