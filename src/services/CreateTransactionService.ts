import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Request): Transaction {
    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });

    const balance = this.transactionsRepository.getBalance();

    if (balance.total < value && type === 'outcome') {
      throw Error(
        'Não é possível fazer uma transação de saída se o saldo é pouco',
      );
    } else {
      return transaction;
    }
  }
}

export default CreateTransactionService;
