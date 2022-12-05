import CryptoJS from 'crypto-js';

const key = process.env.REACT_APP_CRYPTO_KEY!;

const substitutionsAfterEncryption: Map<string, string> = new Map([['/', '_']]);
const substitutionsBeforeDecryption: Map<string, string> = new Map([
  ['_', '/'],
]);

export const cipher = (parsedData: string) => {
  const encrypted = CryptoJS.AES.encrypt(parsedData, key).toString();

  return encrypted.replace(
    /[/]/g,
    (match: string) => substitutionsAfterEncryption.get(match) ?? match,
  );
};

export const decipher = (encryptedData: string) => {
  try {
    const toDecrypt = encryptedData.replace(
      /[_]/g,
      (match: string) => substitutionsBeforeDecryption.get(match) ?? match,
    );
    console.log(
      CryptoJS.AES.decrypt(toDecrypt, key).toString(CryptoJS.enc.Utf8),
    );
    return JSON.parse(
      CryptoJS.AES.decrypt(toDecrypt, key).toString(CryptoJS.enc.Utf8),
    );
  } catch (e) {
    throw new Error('invalid code');
  }
};
