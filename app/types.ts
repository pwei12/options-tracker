export enum OptionType {
  CALL = "call",
  PUT = "put",
}

export type Option = {
  id: string;
  name: string;
  premium: number;
  strikePrice: number;
  expirationDate: string;
  optionType: OptionType;
  buyDate?: string;
  sellDate?: string;
};
