function getHeightByVariant(variant: string) {
  if (variant === 'contract') {
    return 544;
  } else if (variant === 'proposed') {
    return 532;
  } else if (variant === 'proposing') {
    return 560;
  } else if (variant === 'rejected') {
    return 656;
  }
}

export default getHeightByVariant;
