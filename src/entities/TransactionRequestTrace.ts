import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { TransactionRequest } from './TransactionRequest';

@Entity()
export class TransactionRequestTrace extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(
        () => TransactionRequest,
        (transactionRequest) => transactionRequest.transactionRequestTraces,
        { onDelete: 'CASCADE', onUpdate: 'CASCADE' }
    )
    transactionRequest: TransactionRequest;

    @Column()
    message: string;

    @Column()
    type: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
