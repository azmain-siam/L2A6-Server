import Transaction from "../transactions/transaction.model";

const getPurchaseHistory = async (userId: string) => {
  const result = await Transaction.find({
    "transactionInfo.buyerID": userId,
  }).populate(["transactionInfo.sellerID", "transactionInfo.itemID"]);

  return result;
};

export const PurchaseService = {
  getPurchaseHistory,
};
