function stringToBooleanOrNull(stringValue: string) {
  if (stringValue === 'null') {
    return null;
  } else {
    return JSON.parse(stringValue.toLocaleLowerCase().trim());
  }
}

export default stringToBooleanOrNull;
