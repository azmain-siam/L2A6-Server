import Transaction from "../transactions/transaction.model";

const getPurchaseHistory = async (userId: string) => {
  const result = await Transaction.find({ buyerID: userId }).populate([
    "sellerID",
    "itemID",
  ]);

  return result;
};

export const PurchaseService = {
  getPurchaseHistory,
};
