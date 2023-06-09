const formatDate = (date: Date) => {
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default formatDate;
