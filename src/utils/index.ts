export const convertDateToYMD = (dateString: string, style: 'dash' | 'dot' = 'dash'): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return style === 'dash' ? `${year}-${month}-${day}` : `${year}.${month}.${day}`;
};
