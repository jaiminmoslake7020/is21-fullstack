import type { DragSourceMonitor } from 'react-dnd'
import { useDrag } from 'react-dnd'
import {useState} from 'react';
import { ItemTypes } from './ItemTypes';
import {Paint, ResourceActionsMap} from '../../../types/app';
import Order from './Order';

export type BoxProps = {
  name: string,
  role: string,
  permissions: ResourceActionsMap,
  currentSwimLane:string,
  changeSwimLane: Function
}

interface DropResult {
  allowedDropEffect: string
  dropEffect: string
  name: string,
}

function PaintColourBox(props:BoxProps) {
  const {
    name, role, permissions, currentSwimLane, changeSwimLane
  } = props;
  const { 'paint-colours': PaintColours } = permissions;
  const canUpdate = PaintColours ? PaintColours.includes('update') : false;
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: { name },
      end(item, monitor) {
        const dropResult = monitor.getDropResult() as DropResult
        if (item && dropResult) {
          const isDropAllowed = currentSwimLane !== dropResult.name;
          if (isDropAllowed) {
            changeSwimLane(dropResult.name);
          }
        }
      },
      collect: (monitor: DragSourceMonitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [name, currentSwimLane],
  )
  const [update, setUpdate] = useState<null | 'order' | 'pickup'>(null);

  return (
    <div ref={drag} style={{ opacity }} className={`drag-box box-${name} `} >
      <h2 className="capitalize" >{name}</h2>
      {
        canUpdate
          ? (
            <div >
              <button type="button"
                className="btn btn-primary"
                onClick={() => {
                  setUpdate(role === 'painter' ? 'pickup' : 'order')
                }}
              >
                {
                  role === 'painter' ? 'Pickup' : 'Order'
                }
              </button>
            </div>
          )
          : null
      }
      {
        update ? (
          <Order
            onClose={() => {
              setUpdate(null);
            }}
            onSubmit={(data:Paint) => {
              changeSwimLane(data.stockStatus);
            }}
            updateType={update}
            defaultValues={{
              name,
              stockStatus: currentSwimLane
            } as Paint}
          />
        ) : null
      }
    </div>
  )
}

export default PaintColourBox;
