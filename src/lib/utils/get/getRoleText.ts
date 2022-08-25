function getRoleText(isKid: boolean, isFemale: boolean) {
  let roleText;
  if (isKid === false && isFemale === false) {
    roleText = '아빠';
  } else if (isKid === false && isFemale === true) {
    roleText = '엄마';
  } else if (isKid === true && isFemale === false) {
    roleText = '아들';
  } else {
    roleText = '딸';
  }
  return roleText;
}

export default getRoleText;
