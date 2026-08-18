export const formatToOptionExpirationDate = (dateString: string): string => {
  return dateString.slice(0, 10).split("-").join("");
};
