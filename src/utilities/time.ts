export const is24HoursOrMore = (givenDate: Date) => {
  const now = new Date();
  const differenceInMs = now.getTime() - givenDate.getTime();

  // 24 hours in milliseconds
  const twentyFourHoursInMs = 24 * 60 * 60 * 1000;

  // Check if 24 hours or more have passed
  return differenceInMs >= twentyFourHoursInMs;
};
