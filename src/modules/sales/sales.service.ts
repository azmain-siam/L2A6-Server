import Transaction from "../transactions/transaction.model";

const getSalesHistory = async (userId: string) => {
  const result = await Transaction.find({
    "transactionInfo.sellerID": userId,
  }).populate(["transactionInfo.buyerID", "transactionInfo.itemID"]);

  return result;
};

export const SalesService = {
  getSalesHistory,
};
