import {
    Column,
    OneToOne,
    JoinColumn,
    Entity,
    ManyToOne,
    RelationId
} from "typeorm";
import { BaseModel } from "./base.entity";
import { User } from "./user.entity";

@Entity()
export class Diagnosis extends BaseModel {
    @Column({ type: "varchar" })
    symptom: string

    @Column({ type: "varchar", default: null })
    comment: string

    @ManyToOne(() => User, patient => patient.diagnosis, { onDelete: "CASCADE" })
    patient: User

    @RelationId((diagnosis: Diagnosis) => diagnosis.patient)
    patientId: number

    @Column({ type: "int" })
    doctorId: number
}