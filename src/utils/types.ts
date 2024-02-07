export type UserHoldingItem = {
  symbol: string;
  quantity: number;
  ltp: number;
  avgPrice: number;
  close: number;
};

export type UserHoldingItemModified = {
  symbol: string;
  quantity: number;
  ltp: number;
  avgPrice: number;
  close: number;
  currentPnL: string;
};

export type PortfolioResponse = {
  userHolding: UserHoldingItem[];
};
