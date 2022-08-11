type TVariant = 'contract' | 'proposing' | 'rejected' | 'proposed';

function getHeightByVariant(variant: TVariant) {
  if (variant === 'contract' || variant === 'proposed') {
    return 537;
  } else if (variant === 'proposing') {
    return 565;
  } else if (variant === 'rejected') {
    return 647;
  }
}

export default getHeightByVariant;
