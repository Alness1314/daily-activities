import { Activity } from './../../activity/entities/activity.entity';
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Problem } from 'src/problems/entities/problem.entity';
import { Other } from 'src/other/entities/other.entity';

@Entity('daily_report')
export class Report {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'datetime', name: 'report_date', nullable: false})
    reportDate: Date;
    
    //relation many to one with users
    /*@Column({type: 'nvarchar', length: 64, nullable: false})*/
    @ManyToOne(() => User, (user) => user.report , {eager: true})
    user: User
    
    @Column({type: 'nvarchar', length: 64, nullable: false})
    company: string;
    
    @Column({type: 'nvarchar', length: 64, nullable: false})
    area: string;
    
    @Column({type: 'nvarchar', length: 32, nullable: false})
    status: string;
    
    //relation many to many with activities
    /*@Column({type: 'nvarchar', length: 128, nullable: true})*/
    @OneToMany(() => Activity, (activity) => activity.report, {eager: true})
    activity: Activity[];
    
    //relation many to many with problems
    //@Column({type: 'nvarchar', length: 128, nullable: true})
    @OneToMany(() => Problem, (Problem) => Problem.report, {eager: true})
    problems: Problem[];

    //relation many to many with others points
    //@Column({type: 'nvarchar', length: 128, nullable: true})
    @OneToMany(() => Other, (other) => other.report, {eager: true})
    othersPoints: Other[];
    
    @Column({ type: 'bool', default: false })
    deleted: boolean;
    
    @CreateDateColumn({ name: 'created_at', type: 'datetime' })
    createAt: Date;
}
