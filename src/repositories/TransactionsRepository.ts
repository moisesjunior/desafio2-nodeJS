import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Response {
  transactions: Array<Transaction>;
  balance: {
    income: number;
    outcome: number;
    total: number;
  };
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Response {
    const { transactions } = this;
    const balance = this.getBalance();

    return { transactions, balance };
  }

  public getBalance(): Balance {
    let totalIncome = 0;
    let totalOutcome = 0;
    const income = this.transactions.reduce(function incomeValue(acc, val) {
      if (val.type === 'income') {
        totalIncome = val.value + acc;
      }

      return totalIncome;
    }, 0);

    const outcome = this.transactions.reduce(function outcomeValue(acc, val) {
      if (val.type === 'outcome') {
        totalOutcome = val.value + acc;
      }

      return totalOutcome;
    }, 0);

    const total = totalIncome - totalOutcome;

    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
