import { Buffer } from 'buffer';

const Base64ToFile = (base64Image: string) => {
  const arr: any = base64Image.split(',');
  if (!!arr.length && arr !== null) {
    const mime = arr[0].match('/:(.*?);/');
    const bstr = Buffer.from(arr[1], 'base64').toString(); // atob 사용안댐 ㅅㅂ
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], '으이그', { type: mime });
  }
};

export default Base64ToFile;
