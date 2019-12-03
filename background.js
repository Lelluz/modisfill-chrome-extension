function isLastDay(dt) {
  return new Date(dt.getTime() + 86400000).getDate() === 1;
}