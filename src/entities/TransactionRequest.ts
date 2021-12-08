import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from 'typeorm';
import { Transaction } from './Transaction';
import { TransactionRequestTrace } from './TransactionRequestTrace';

@Entity()
@Unique(['requestId', 'transactionId'])
export class TransactionRequest extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    requestId: string;

    @Column()
    transactionId: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(
        () => Transaction,
        (transaction) => transaction.transactionRequests,
        { onDelete: 'CASCADE', onUpdate: 'CASCADE' }
    )
    transaction: Transaction;

    @OneToMany(
        () => TransactionRequestTrace,
        (transactionRequestTrace) => transactionRequestTrace.transactionRequest
    )
    transactionRequestTraces: TransactionRequestTrace[];
}
