export enum OptionType {
  CALL = "call",
  PUT = "put",
}

export enum TradingType {
  LONG = "long",
  SHORT = "short",
}

export type Option = {
  id: string;
  name: string;
  premium: number;
  strikePrice: number;
  expirationDate: string;
  optionType: OptionType;
  tradingType: TradingType;
  openDate: string;
  closeDate?: string;
  closePrice?: number;
};
