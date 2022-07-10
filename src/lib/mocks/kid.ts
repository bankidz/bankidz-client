export function kidMock() {
  const getFamily = async () => {
    await wait(20);
    return [
      { username: '엄마이름', userId: 1, isFemale: true, isKid: false },
      { username: '아빠이름', userId: 2, isFemale: false, isKid: false },
    ];
  };

  return { getFamily };
}

const wait = (milliSeconds: number) =>
  new Promise((resolve) => setTimeout(resolve, milliSeconds));
