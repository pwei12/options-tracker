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

export const normalizeDate = (date: Date): Date => {
  const normalized = new Date(date);

  normalized.setHours(0, 0, 0, 0);

  return normalized;
};

export const getToday = (): Date => {
  const date = new Date();

  date.setHours(0, 0, 0, 0);

  return date;
};

export const toDbDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
