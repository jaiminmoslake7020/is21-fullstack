import React, {useCallback, useState} from 'react';
import {Checkbox, FormControl, FormControlLabel} from '@mui/material';
import {useForm} from 'react-hook-form';
import {Paint, PaintColour, StockType} from '../../../types/app';
import { capitalize } from '../../../utils/helpers/string';

export function CheckBox(props: {colourList:PaintColour[], colour:PaintColour, setColourList: Function}) {
  const {
    colourList, colour, setColourList
  } = props;
  const checked = colourList.includes(colour);
  return (
    <FormControlLabel
      control={(
        <Checkbox inputProps={{
          'aria-label': colour
        }}
        checked={checked}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          if (event.target.checked) {
            setColourList([...colourList, colour]);
          } else {
            setColourList(colourList.filter((c) => c !== colour));
          }
        }} />
      )}
      label={capitalize(colour)}
    />
  )
}

function PaintColourForm(props: { defaultValues : {
  colourList: PaintColour[],
  stockStatus: StockType
}, onSubmit : Function, updateType: 'order' | 'pickup' }) {
  const {
    defaultValues, onSubmit, updateType
  } = props;

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const [colourList, setColourList] = useState<PaintColour[]>(defaultValues.colourList);

  const handleFormSubmit = useCallback((data:any) => {
    setFormSubmitted(true);
    onSubmit({
      colourList,
      stockStatus: data.stockStatus
    });
  }, [colourList]);

  return (
    <div className="paint-colour-form-page" >
      <form className="user-update-form" onSubmit={handleSubmit(handleFormSubmit)}>
        <FormControl className="form-control-checkbox text-left" >
          <label htmlFor="userStatus" className="text-left w-full md:w-fit">Paint Colour</label>
          <div className="" >
            {defaultValues.colourList.map((c:string) => <CheckBox key={c} colourList={colourList} colour={c as any} setColourList={setColourList} />)}
          </div>
        </FormControl>
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
