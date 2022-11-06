import { TReceiptModalVariant } from './TReceiptModalVariant';

function getHeightByVariant(variant: TReceiptModalVariant) {
  if (variant === 'contract' || variant === 'proposed') {
    return 537;
  } else if (variant === 'proposing') {
    return 565;
  } else if (variant === 'rejected') {
    return 647;
  }
}

export default getHeightByVariant;
