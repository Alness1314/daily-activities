import { Report } from './../../reports/entities/report.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('activities')
export class Activity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'nvarchar', length: 128, nullable: false})
    name: string;

    @Column({type: 'nvarchar', length: 600, nullable: false})
    description: string;

    @Column({type: 'nvarchar', length:128, nullable: false})
    status: string;

    @Column({ type: 'bool', default: false })
    deleted: boolean;

    @CreateDateColumn({ name: 'created_at', type: 'datetime' })
    createAt: Date;

    @ManyToOne(() => Report, (report) => report.activity)
    report: Report;
}
