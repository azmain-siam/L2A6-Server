import { ITransaction } from "./transaction.interface";
import Transaction from "./transaction.model";

const createTransaction = async (payload: ITransaction) => {
  const result = await Transaction.create(payload);

  return result;
};

export const TransactionService = {
  createTransaction,
};
