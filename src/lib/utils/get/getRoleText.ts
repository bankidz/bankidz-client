function getRoleText(isKid: boolean, isFemale: boolean) {
  if (isKid === false && isFemale === false) {
    return '아빠';
  } else if (isKid === false && isFemale === true) {
    return '엄마';
  } else if (isKid === true && isFemale === false) {
    return '아들';
  } else {
    return '딸';
  }
}

export default getRoleText;
