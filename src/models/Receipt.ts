export interface IProduct {
  name: string;
  price: number;
}

export interface IReceiptInfo {
  tax: number; // default: 8
  storeName: string;
  storeAddress: string;
  storeTel: string;
  posNo: number;
  staffName: string;
  logo?: ImageBitmap;
  amountReceived: number;
}
