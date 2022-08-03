import { Report } from "src/reports/entities/report.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('other_points')
export class Other {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'nvarchar', length: 64, nullable: true})
    point: string;

    @Column({type: 'nvarchar', length: 128, nullable: true})
    assigned: string;

    @Column({type: 'datetime', nullable: true})
    date: Date;

    @Column({ type: 'bool', default: false })
    deleted: boolean;

    @CreateDateColumn({ name: 'created_at', type: 'datetime' })
    createAt: Date;

    @ManyToOne(() => Report, (report) => report.othersPoints)
    report: Report;
}
