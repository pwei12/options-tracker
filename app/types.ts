export enum OptionType {
  CALL = "call",
  PUT = "put",
}

export enum TradingType {
  BUY = "buy",
  SELL = "sell",
}

export type Option = {
  id: string;
  name: string;
  premium: number;
  strikePrice: number;
  expirationDate: string;
  optionType: OptionType;
  tradingType: TradingType;
};
