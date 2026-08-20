export const formatDateToYYYYMMDD = (dateString: string): string => {
  return dateString.slice(0, 10).split("-").join("");
};

export const formatDateWithSeparator = (
  dateString: string,
  options: { separator?: string; reverse?: boolean } = {},
): string => {
  const { separator = "/", reverse = true } = options;
  const dateParts = dateString.slice(0, 10).split("-");
  if (reverse) {
    dateParts.reverse();
  }
  return dateParts.join(separator);
};
