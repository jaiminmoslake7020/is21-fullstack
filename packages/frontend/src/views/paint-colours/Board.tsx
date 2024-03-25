import React, {useCallback, useState, useEffect} from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import SwimLane from '../../components/app/board/SwimLane';
import {useAppSelector} from '../../redux/store';
import Feedback from '../../components/base/Feedback';
import {addNewInfoMsgWithTitle} from '../../utils/helpers/feedback';
import {Paint, ResourceActionsMap} from '../../types/app';
import paintColoursData from '../../data/api-data/paint-colours.json';

function Board() {
  const { user } = useAppSelector((store) => store.user);
  const {
    role, permissions
  } = user || {};
  const { 'paint-colours': PaintColours } = permissions || {} as ResourceActionsMap;
  const canView = PaintColours ? PaintColours.includes('view') : false;

  const [originalData, setOriginalData] = useState<Paint[]>(paintColoursData as any as Paint[]);

  const changeSwimLane = useCallback((data:Paint) => {
    console.log('changeSwimLane', data);
    setOriginalData(originalData.map((p:Paint) => {
      let newStockStatus = p.stockStatus
      if (p.name === data.name) {
        newStockStatus = data.stockStatus
      }
      return {...p, stockStatus: newStockStatus};
    }));
  }, [originalData]);

  useEffect(() => {

  }, []);

  return (
    user && role && permissions && canView
      ? (
        <DndProvider backend={HTML5Backend}>
          <div className="paint-board-page" >
            <div style={{ overflow: 'hidden', clear: 'both' }} className="paint-board-page-child" >
              <SwimLane swimLaneType="available" colorsList={['blue', 'gray']} role={role} permissions={permissions} changeSwimLane={changeSwimLane} />
              <SwimLane swimLaneType="running-low" colorsList={['white', 'black']} role={role} permissions={permissions} changeSwimLane={changeSwimLane} />
              <SwimLane swimLaneType="out-of-stock" colorsList={['purple']} role={role} permissions={permissions} changeSwimLane={changeSwimLane} />
            </div>
          </div>
        </DndProvider>
      ) : <Feedback notification={addNewInfoMsgWithTitle('Permissions', 'User does not have permission to view or update paint colours.')} remove={() => {}} showRealError={false} />
  );
}

Board.defaultProps = {};

export default Board;
