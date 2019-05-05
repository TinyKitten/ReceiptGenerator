import { IProduct, IReceiptInfo } from '../models/Receipt';

export const initialProducts: IProduct[] = [
  {
    name: 'オタク',
    price: 334
  }
];

export const initialReceipt: IReceiptInfo = {
  amountReceived: 1000,
  posNo: 334,
  staffName: 'オタク',
  storeAddress: '群馬県伊勢崎市のどっか',
  storeName: 'レシートジェネレータ 伊勢崎店',
  storeTel: '0270-19-1919',
  tax: 8
};
