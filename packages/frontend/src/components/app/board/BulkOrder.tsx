import React from 'react';
import {Dialog, DialogTitle} from '@mui/material';
import BulkPaintColourOne from './BulkPaintColourOne';
import {Paint, PaintColour, StockType} from '../../../types/app';
import Icon from '../../base/Icon'

function BulkOrder(props: {
  onSubmit: Function,
  defaultValues: {
    colourList: PaintColour[],
    stockStatus: StockType
  },
  updateType: 'order' | 'pickup',
  onClose: Function
}) {
  const {
    onSubmit, defaultValues, updateType, onClose
  } = props;
  return (
    <Dialog open >
      <DialogTitle >
        <div className="w-full flex justify-between">
          <span className="capitalize">
            Bulk
            {' '}
            {updateType}
          </span>
          <button type="button"
            onClick={() => {
              onClose();
            }} >
            <Icon icon="times" />
          </button>
        </div>
      </DialogTitle>
      <div className="p-4 min-w-[70vw] sm:min-w-[500px]" >
        <BulkPaintColourOne
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          updateType={updateType}
        />
      </div>
    </Dialog>
  );
}

BulkOrder.defaultProps = {};

export default BulkOrder;
