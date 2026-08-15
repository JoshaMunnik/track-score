
const formatDateOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
};

const dateFormatter = new Intl.DateTimeFormat('en-US', formatDateOptions);

export function formatDate(date: Date): string {
  try {
    return dateFormatter.format(date);
  }
  catch {
    return 'invalid date';
  }
}

 /**
 * Returns the rank with the correct postfix
 *
 * @param rank
 *
 * @returns rank + post fix
 */
export function rankName(rank: number)  {
  switch(rank % 10) {
    case 1:
      return (rank % 100) !== 11 ? rank + 'st' : rank + 'th';
    case 2:
      return (rank % 100) !== 12 ? rank + 'nd' : rank + 'th';
    case 3:
      return (rank % 100) !== 13 ? rank + 'rd' : rank + 'th';
    default:
      return rank + 'th';
  }
}
