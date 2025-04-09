import Transaction from "../transactions/transaction.model";

const getSalesHistory = async (userId: string) => {
  const result = await Transaction.find({ sellerID: userId }).populate([
    "buyerID",
    "itemID",
  ]);

  return result;
};

export const SalesService = {
  getSalesHistory,
};
