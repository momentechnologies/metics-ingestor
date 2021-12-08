import {
    BaseEntity,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';
import { TransactionRequest } from './TransactionRequest';

@Entity()
export class Transaction extends BaseEntity {
    @PrimaryColumn()
    id: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(
        () => TransactionRequest,
        (transactionRequest) => transactionRequest.transactionId
    )
    transactionRequests: TransactionRequest[];
}
