const getPnLTextColor = (value: number) => {
  if (value > 0) {
    return 'green';
  }
  if (value < 0) {
    return 'red';
  }
  return 'black';
};

export {getPnLTextColor};
