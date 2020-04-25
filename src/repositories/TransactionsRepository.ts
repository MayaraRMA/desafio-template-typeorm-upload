import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const findIncomeTransaction = await this.find({
      where: { type: 'income' },
    });
    const income = findIncomeTransaction.reduce((sum, curTransaction) => {
      return sum + curTransaction.value;
    }, 0);

    const findOutcomeTransaction = await this.find({
      where: { type: 'outcome' },
    });
    const outcome = findOutcomeTransaction.reduce((sum, curTransaction) => {
      return sum + curTransaction.value;
    }, 0);

    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }
}

export default TransactionsRepository;
