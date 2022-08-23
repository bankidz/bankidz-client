function isBetween(target: number, min: number, max: number) {
  if (min <= target && target <= max) {
    return target;
  } else {
    console.error('부적절한 접근입니다.');
  }
}

export default isBetween;
