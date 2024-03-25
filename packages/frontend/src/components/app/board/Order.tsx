import React from 'react';
import {Dialog, DialogTitle} from '@mui/material';
import PaintColourForm from './PaintColourForm';
import {Paint} from '../../../types/app';
import Icon from '../../base/Icon'

function Order(props: {
  onSubmit: Function,
  defaultValues: Paint,
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
      <div className="p-4 min-w-[90vw] sm:min-w-[500px]" >
        <PaintColourForm
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          updateType={updateType}
        />
      </div>
    </Dialog>
  );
}

Order.defaultProps = {};

export default Order;
