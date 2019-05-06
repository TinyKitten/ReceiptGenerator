import '../../polyfill/createImageBitmap';

import React, { SyntheticEvent, useEffect, useState } from 'react';
import GithubCorner from 'react-github-corner';
import { Stage } from 'react-konva';

import InitialLogo from '../../assets/logo.png';
import Footer from '../../components/Footer';
import Receipt from '../../components/Receipt';
import { MAX_LOGO_HEIGHT, MAX_LOGO_WIDTH } from '../../constants/size';
import { initialProducts, initialReceipt } from '../../fixture/receipt';
import styles from './styles.module.scss';

const HomeScreen: React.FC = () => {
  const [receipt, setReceipt] = useState(initialReceipt);
  const [products, setProducts] = useState(initialProducts);
  const [primaryStage, setPrimaryStage] = useState<Stage | null>(null);

  useEffect(() => {
    const image = new Image();
    const c = document.createElement('canvas');
    const ctx = c.getContext('2d');

    image.src = InitialLogo;
    image.onload = async () => {
      c.width = image.naturalWidth;
      c.height = image.naturalHeight;
      if (ctx) {
        ctx.drawImage(image, 0, 0);
        c.toBlob(async blob => {
          const bmpObj = await window.createImageBitmap(blob as any);
          setReceipt(prevReceipt => ({ ...prevReceipt, logo: bmpObj }));
        });
      }
    };
  }, []);

  const onLogoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.value) {
      return;
    }
    if (!e.currentTarget.files || e.currentTarget.files.length > 1) {
      return;
    }

    const file = e.currentTarget.files[0];

    const bmpObj = await window.createImageBitmap(file);
    setReceipt(prevReceipt => ({ ...prevReceipt, logo: bmpObj }));
  };

  const handleDownload = () => {
    if (primaryStage) {
      const a = document.getElementById(
        'hiddenLink'
      ) as HTMLAnchorElement | null;
      if (!a) {
        return;
      }
      const dataUrl = primaryStage
        .getStage()
        .toDataURL({ pixelRatio: window.devicePixelRatio });
      a.href = dataUrl;
      a.download = 'receipt.png';
      a.click();
    }
  };

  const onProductChange = (
    e: SyntheticEvent<HTMLInputElement>,
    index: number
  ) => {
    const nextProducts = products.concat();
    if (!nextProducts[index]) {
      nextProducts[index] = {
        name: '',
        price: 0
      };
    }
    nextProducts[index].name = e.currentTarget.value;
    setProducts(nextProducts);
  };

  const onProductPriceChange = (
    e: SyntheticEvent<HTMLInputElement>,
    index: number
  ) => {
    const nextProducts = products.concat();
    if (!nextProducts[index]) {
      nextProducts[index] = {
        name: '',
        price: 0
      };
    }
    nextProducts[index].price = parseInt(e.currentTarget.value, 10);
    setProducts(nextProducts);
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Receipt Generator</h1>
      <h2 className={styles.subtitle}>
        スーパーのレシートっぽいものを作れるあれ
      </h2>
      <Receipt
        onStageChange={setPrimaryStage}
        products={products}
        receipt={receipt}
      />

      <button className={styles.downloadBtn} onClick={() => handleDownload()}>
        ダウンロード
      </button>
      <a aria-hidden id="hiddenLink" href="/" className={styles.hiddenLink}>
        hidden link
      </a>
      <form className={styles.form}>
        <label className={styles.label}>
          ロゴ(幅{MAX_LOGO_WIDTH}px、高さ{MAX_LOGO_HEIGHT}
          px以上は切り取られます):
        </label>
        <input type="file" accept="image/*" onChange={onLogoFileChange} />
        <label className={styles.label}>店舗名:</label>
        <input
          placeholder={initialReceipt.storeName}
          onChange={e =>
            setReceipt(prevReceipt => ({
              ...prevReceipt,
              storeName: e.currentTarget.value
            }))
          }
        />
        <label className={styles.label}>店舗住所:</label>
        <input
          placeholder={initialReceipt.storeAddress}
          onChange={e =>
            setReceipt(prevReceipt => ({
              ...prevReceipt,
              storeAddress: e.currentTarget.value
            }))
          }
        />
        <label className={styles.label}>店舗電話番号:</label>
        <input
          placeholder={initialReceipt.storeTel}
          onChange={e =>
            setReceipt(prevReceipt => ({
              ...prevReceipt,
              storeTel: e.currentTarget.value
            }))
          }
        />
        <label className={styles.label}>レジ番号:</label>
        <input
          type="number"
          placeholder={initialReceipt.posNo.toString()}
          onChange={e =>
            setReceipt(prevReceipt => ({
              ...prevReceipt,
              posNo: parseInt(e.currentTarget.value, 10)
            }))
          }
        />
        <label className={styles.label}>責任者:</label>
        <input
          placeholder={initialReceipt.staffName}
          onChange={e =>
            setReceipt(prevReceipt => ({
              ...prevReceipt,
              staffName: e.currentTarget.value
            }))
          }
        />
        <label className={styles.label}>買ったやつ1(名前):</label>
        <input
          placeholder={products[0] ? products[0].name : ''}
          onChange={e => onProductChange(e, 0)}
        />
        <label className={styles.label}>買ったやつ1(値段):</label>
        <input
          type="number"
          placeholder={products[0] ? products[0].price.toString() : ''}
          onChange={e => onProductPriceChange(e, 0)}
        />
        <label className={styles.label}>買ったやつ2(名前):</label>
        <input
          placeholder={products[2] ? products[1].name : ''}
          onChange={e => onProductChange(e, 1)}
        />
        <label className={styles.label}>買ったやつ2(値段):</label>
        <input
          type="number"
          placeholder={products[2] ? products[1].price.toString() : ''}
          onChange={e => onProductPriceChange(e, 1)}
        />
        <label className={styles.label}>買ったやつ3(名前):</label>
        <input
          placeholder={products[2] ? products[2].name : ''}
          onChange={e => onProductChange(e, 2)}
        />
        <label className={styles.label}>買ったやつ3(値段):</label>
        <input
          type="number"
          placeholder={products[2] ? products[2].price.toString() : ''}
          onChange={e => onProductPriceChange(e, 2)}
        />
        <label className={styles.label}>預かり金額:</label>
        <input
          type="number"
          placeholder={initialReceipt.amountReceived.toString()}
          onChange={e =>
            setReceipt(prevReceipt => ({
              ...prevReceipt,
              amountReceived: parseInt(e.currentTarget.value, 10)
            }))
          }
        />
      </form>

      <Footer />
      <GithubCorner href="https://github.com/TinyKitten/ReceiptGenerator" />
    </div>
  );
};

export default HomeScreen;
