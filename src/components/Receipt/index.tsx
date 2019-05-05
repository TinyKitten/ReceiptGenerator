import 'dayjs/locale/ja';

import dayjs from 'dayjs';
import Konva from 'konva';
import React, { useEffect, useState } from 'react';
import { Image, Layer, Rect, Stage, Text } from 'react-konva';

import {
  MAX_LOGO_HEIGHT,
  MAX_LOGO_WIDTH,
  STAGE_HEIGHT,
  STAGE_WIDTH
} from '../../constants/size';
import { IProduct, IReceiptInfo } from '../../models/Receipt';

interface IProps {
  receipt: IReceiptInfo;
  products: IProduct[];
  onStageChange: (stage: Stage | null) => void;
}

dayjs.locale('ja');

const Receipt = (props: IProps) => {
  const [imageNode, setImageNode] = useState<Konva.Image | null>(null);

  useEffect(() => {
    if (imageNode) {
      imageNode.cache({});
    }
  }, [imageNode, props.receipt.logo]);

  const today = dayjs().format('YYYY年MM月DD日(dd) hh:mm');

  let totalPrice = 0;
  props.products.forEach(prod => {
    totalPrice += prod.price;
  });
  const includedTax = Math.floor((totalPrice / 1.08) * 0.08);
  const changeAmount = props.receipt.amountReceived - totalPrice;

  const productsUnderBasePos = 200 + (props.products.length + 1) * 15;

  return (
    <Stage ref={props.onStageChange} width={STAGE_WIDTH} height={STAGE_HEIGHT}>
      <Layer>
        <Rect
          x={0}
          y={0}
          width={STAGE_WIDTH}
          height={STAGE_HEIGHT}
          fill="#fcfcfc"
        />
        {props.receipt.logo ? (
          <Image
            x={20}
            y={20}
            crop={{
              height: MAX_LOGO_HEIGHT,
              width: MAX_LOGO_WIDTH,
              x: (props.receipt.logo.width - MAX_LOGO_WIDTH) / 2,
              y: (props.receipt.logo.height - MAX_LOGO_HEIGHT) / 2
            }}
            width={MAX_LOGO_WIDTH}
            height={MAX_LOGO_HEIGHT}
            image={props.receipt.logo}
            filters={[Konva.Filters.Grayscale]}
            ref={node => {
              setImageNode(node);
            }}
          />
        ) : null}
        <Text
          width={MAX_LOGO_WIDTH}
          x={20}
          y={92}
          fontSize={12}
          fontStyle="bold"
          text={props.receipt.storeName}
        />
        <Text
          width={MAX_LOGO_WIDTH}
          x={20}
          y={106}
          fontSize={12}
          text={props.receipt.storeAddress}
        />
        <Text
          width={MAX_LOGO_WIDTH}
          x={20}
          y={120}
          fontSize={12}
          text={`電話：${props.receipt.storeTel}`}
        />
        <Text
          width={MAX_LOGO_WIDTH}
          x={20}
          y={150}
          fontSize={12}
          text={today}
        />
        <Text
          width={MAX_LOGO_WIDTH}
          x={20}
          y={165}
          fontSize={12}
          text={`レジ： #${props.receipt.posNo} 責：${props.receipt.staffName}`}
        />
        <Text
          width={MAX_LOGO_WIDTH}
          x={20}
          y={190}
          fontSize={15}
          text="領収書"
          fontStyle="bold"
          align="center"
        />
        {props.products.map((prod, i) => (
          <React.Fragment key={i}>
            <Text
              width={MAX_LOGO_WIDTH}
              x={20}
              y={200 + (i + 1) * 15}
              fontSize={12}
              text={prod.name}
            />
            <Text
              width={MAX_LOGO_WIDTH}
              x={20}
              y={200 + (i + 1) * 15}
              fontSize={12}
              text={`￥${prod.price}`}
              align="right"
            />
          </React.Fragment>
        ))}
        <Text
          width={MAX_LOGO_WIDTH}
          x={20}
          y={productsUnderBasePos}
          fontSize={15}
          fontStyle="bold"
          text="合計"
        />
        <Text
          width={MAX_LOGO_WIDTH}
          x={20}
          y={productsUnderBasePos}
          fontSize={15}
          fontStyle="bold"
          text={`￥${totalPrice}`}
          align="right"
        />
        <Text
          width={MAX_LOGO_WIDTH}
          x={20}
          y={productsUnderBasePos + 15}
          fontSize={12}
          text="(内消費税"
        />
        <Text
          width={MAX_LOGO_WIDTH}
          x={20}
          y={productsUnderBasePos + 15}
          fontSize={12}
          text={`￥${includedTax})`}
          align="right"
        />
        <Text
          width={MAX_LOGO_WIDTH}
          x={20}
          y={productsUnderBasePos + 30}
          fontSize={12}
          text="お預り"
        />
        <Text
          width={MAX_LOGO_WIDTH}
          x={20}
          y={productsUnderBasePos + 30}
          fontSize={12}
          text={`￥${props.receipt.amountReceived}`}
          align="right"
        />
        <Text
          width={MAX_LOGO_WIDTH}
          x={20}
          y={productsUnderBasePos + 45}
          fontSize={15}
          fontStyle="bold"
          text="お釣"
        />
        <Text
          width={MAX_LOGO_WIDTH}
          x={20}
          y={productsUnderBasePos + 45}
          fontSize={15}
          fontStyle="bold"
          text={`￥${changeAmount}`}
          align="right"
        />
        <Text
          width={MAX_LOGO_WIDTH}
          x={20}
          y={productsUnderBasePos + 65}
          fontSize={12}
          text="上記正に領収いたしました"
        />
      </Layer>
    </Stage>
  );
};

export default Receipt;
