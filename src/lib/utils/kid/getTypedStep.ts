const getTypedStep = (parsedStep: number) => {
  if (parsedStep > 0 && parsedStep <= 5) {
    return parsedStep as 1 | 2 | 3 | 4 | 5;
  } else {
    throw 'step error';
  }
};

export default getTypedStep;
