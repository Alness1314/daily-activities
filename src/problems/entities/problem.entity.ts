import { Report } from "src/reports/entities/report.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('find_problems')
export class Problem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'nvarchar', length: 64, nullable: true})
    name: string;

    @Column({type: 'nvarchar', length: 255, nullable: true})
    description: string;

    @Column({ type: 'bool', default: true })
    deleted: boolean;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createAt: Date;

    @ManyToOne(() => Report, (report) => report.problems)
    report: Report;
}
