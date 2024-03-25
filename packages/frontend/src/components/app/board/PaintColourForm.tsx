import React, {useCallback, useState} from 'react';
import {FormControl} from '@mui/material';
import {useForm} from 'react-hook-form';
import {Paint} from '../../../types/app';

function PaintColourForm(props: { defaultValues : Paint, onSubmit : Function, updateType: 'order' | 'pickup' }) {
  const {
    defaultValues, onSubmit, updateType
  } = props;

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const handleFormSubmit = useCallback((data:any) => {
    setFormSubmitted(true);
    onSubmit(data);
  }, []);

  return (
    <div className="paint-colour-form-page" >
      <form className="user-update-form" onSubmit={handleSubmit(handleFormSubmit)}>
        <p className="text-sm font-semibold flex gap-1 text-gray-600" >
          <span>Please choose new stock status for</span>
          <span className="font-bold capitalize text-gray-900" >{defaultValues.name}</span>
        </p>
        <FormControl className="form-control" >
          <label htmlFor="role">New Stock Status</label>
          <div className="input-holder" >
            <div className="select-wrapper" >
              <select id="stockStatus"
                {...register('stockStatus', {
                  required: true,
                })
                }
              >
                <option value="available">Available</option>
                <option value="running-low">Running Low</option>
                <option value="out-of-stock">Out Of Stock</option>
              </select>
            </div>
            {errors.stockStatus && <span>Stock Status is required</span>}
          </div>
        </FormControl>
        <div className="flex w-full justify-end">
          <button className="btn btn-primary mt-4 capitalize" type="submit" disabled={formSubmitted} >{updateType}</button>
        </div>
      </form>
    </div>
  );
}

PaintColourForm.defaultProps = {};

export default PaintColourForm;
