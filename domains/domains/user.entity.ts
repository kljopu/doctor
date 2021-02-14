import * as bcryptjs from "bcryptjs"
import {
  Entity,
  Column,
  CreateDateColumn,
  BeforeInsert,
  OneToMany,
} from "typeorm";
import {
  InternalServerErrorException,
  BadRequestException
} from "@nestjs/common"
import { Board } from "./board.entity";
import { Comment } from "./comment.entity";
import { BaseModel } from "./base.entity";
import { Diagnosis } from "./diagnosis.entity";

export enum UserRole {
  Client = 'Client',
  Doctor = 'Doctor'
}

@Entity()
export class User extends BaseModel {

  @Column({ type: "varchar", length: 20, nullable: false })
  name: string;

  @Column({ type: "varchar", unique: true })
  email: string

  @Column({ type: "varchar" })
  password!: string

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: "enum", enum: UserRole, default: UserRole.Client })
  role: UserRole

  @OneToMany(() => Comment, (comments) => comments.user)
  comments: Comment[]

  @OneToMany(() => Board, (boards) => boards.user)
  boards: Board[]

  @OneToMany(() => Diagnosis, (diagnosis) => diagnosis.patient)
  diagnosis: Diagnosis[]

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