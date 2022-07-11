export function kidMock() {
  const getFamily = async () => {
    await wait(20);
    return [
      { username: '엄마이름', isFemale: true, isKid: false },
      { username: '아빠이름', isFemale: false, isKid: false },
    ];
  };

  return { getFamily };
}

const wait = (milliSeconds: number) =>
  new Promise((resolve) => setTimeout(resolve, milliSeconds));
