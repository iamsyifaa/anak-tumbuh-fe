export const getLocalDateKey = (date = new Date()): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formatIndonesianDate = (dateKey?: string): string => {
  const date = dateKey ? new Date(`${dateKey}T00:00:00`) : new Date();
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};

export const toDateInputValue = (date = new Date()): string => getLocalDateKey(date);
