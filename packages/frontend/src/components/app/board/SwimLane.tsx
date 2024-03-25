import { useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import PaintColourBox from './PaintColourBox';
import {PaintColour, ResourceActionsMap} from '../../../types/app';

export type DustbinProps = {
  swimLaneType: string,
  colorsList: PaintColour[],
  role: string,
  permissions: ResourceActionsMap,
  changeSwimLane: Function
}

function SwimLane(props:DustbinProps) {
  const {
    swimLaneType, colorsList, role, permissions, changeSwimLane
  } = props;
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop: () => ({
        name: `${swimLaneType}`,
      }),
      collect: (monitor: any) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [swimLaneType],
  )

  const isActive = canDrop && isOver
  return (
    <div ref={drop} className={` dustbin dustbin-${swimLaneType} `} >
      <div className="dustbin-container" >
        <h2 className="swim-lane-name" >
          {swimLaneType.replaceAll('-', ' ')}
        </h2>
        <div className="colours-list" >
          {
            colorsList.map((c) => (
              <PaintColourBox key={c}
                changeSwimLane={(newSwimLane:string) => {
                  changeSwimLane({
                    name: c,
                    stockStatus: newSwimLane
                  });
                }}
                currentSwimLane={swimLaneType}
                name={c}
                role={role}
                permissions={permissions} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default SwimLane;
