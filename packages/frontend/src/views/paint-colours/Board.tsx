import React, {useCallback, useState, useEffect} from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import SwimLane from '../../components/app/board/SwimLane';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import Feedback from '../../components/base/Feedback';
import {addNewErrorMsgWithTitle, addNewInfoMsgWithTitle} from '../../utils/helpers/feedback';
import {
  Paint, PaintColour, ResourceActionsMap, StockType, User
} from '../../types/app';
import Loading from '../../components/base/LoadingBase';
import BulkOrder from '../../components/app/board/BulkOrder';
import {colourList} from '../../data/colour-list';
import {bulkUpdatePaintColours, getPaintColours, updatePaintColours} from '../../services/api';
import {addNotification} from '../../redux/reducers/feedback';

function Board() {
  const { user } = useAppSelector((store) => store.user);
  const {
    role, permissions
  } = user || {};
  const { 'paint-colours': PaintColours } = permissions || {} as ResourceActionsMap;
  const canView = PaintColours ? PaintColours.includes('view') : false;
  const canUpdate = PaintColours ? PaintColours.includes('update') : false;

  const [originalData, setOriginalData] = useState<Paint[]>([]);
  const [formattedData, setFormattedData] = useState<Record<StockType, PaintColour[]> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [update, setUpdate] = useState<null | 'order' | 'pickup'>(null);

  const dispatch = useAppDispatch();
  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    const mount = () => {
      getPaintColours().then((responseMain) => {
        const { isSuccess, error, response } = responseMain;
        if (isSuccess && response) {
          setOriginalData(response);
        } else {
          const eTwo = addNewErrorMsgWithTitle();
          dispatch(addNotification(eTwo));
        }
      });
    };
    return mount();
  }, []);

  const changeSwimLane = useCallback((data:Paint) => {
    setLoading(true);
    updatePaintColours(data).then((responseMain) => {
      const { isSuccess, error, response } = responseMain;
      if (isSuccess && response) {
        const newOriginalData = originalData.map((p:Paint) => {
          let newStockStatus = p.stockStatus
          if (p.name === response.name) {
            newStockStatus = response.stockStatus
          }
          return {...p, stockStatus: newStockStatus};
        });
        setOriginalData(newOriginalData);
      } else {
        setLoading(false);
        const eTwo = addNewErrorMsgWithTitle();
        dispatch(addNotification(eTwo));
      }
    });
  }, [originalData]);

  const updateSwimLanes = useCallback((data:{
    colourList: PaintColour[],
    stockStatus: StockType
  }) => {
    setLoading(true);
    bulkUpdatePaintColours({
      name: data.colourList,
      stockStatus: data.stockStatus
    }).then((responseMain) => {
      const { isSuccess, error, response } = responseMain;
      if (isSuccess && response) {
        setOriginalData(response);
        setUpdate(null);
      } else {
        const eTwo = addNewErrorMsgWithTitle();
        dispatch(addNotification(eTwo));
        setUpdate(null);
        setLoading(false);
      }
    });
  }, [originalData]);

  useEffect(() => {
    const mount = () => {
      let newData = {
        available: [],
        'running-low': [],
        'out-of-stock': [],
      } as Record<StockType, PaintColour[]>;
      originalData.forEach((p:Paint) => {
        const newStockStatus = p.stockStatus
        newData = {...newData, [newStockStatus]: [...newData[newStockStatus], p.name]}
      });
      setFormattedData(newData);
      setLoading(false);
    };
    return mount();
  }, [originalData]);

  return (
    user && role && permissions && canView
      ? (
        <div className="flex flex-col gap-4">
          {
            canUpdate
              ? (
                <header className="flex flex-row justify-end" >
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      setUpdate(role === 'painter' ? 'pickup' : 'order')
                    }}
                  >
                    Bulk
                    {' '}
                    {
                      role === 'painter' ? 'Pickup' : 'Order'
                    }
                  </button>
                </header>
              ) : null
          }
          <DndProvider backend={HTML5Backend}>
            { loading ? <Loading loading={loading} />
              : (
                <div className="paint-board-page" >
                  <div style={{ overflow: 'hidden', clear: 'both' }} className="paint-board-page-child" >
                    {
                      formattedData && Object.keys(formattedData).map((f:string) => {
                        return <SwimLane key={f} swimLaneType={f} colorsList={formattedData[f as StockType]} role={role} permissions={permissions} changeSwimLane={changeSwimLane} />;
                      })
                    }
                  </div>
                </div>
              ) }
          </DndProvider>
          {
            update ? (
              <BulkOrder
                onClose={() => {
                  setUpdate(null);
                }}
                onSubmit={updateSwimLanes}
                updateType={update}
                defaultValues={{
                  colourList,
                  stockStatus: update === 'pickup' ? 'running-low' : 'available'
                }}
              />
            ) : null
          }
        </div>
      ) : <Feedback notification={addNewInfoMsgWithTitle('Permissions', 'User does not have permission to view or update paint colours.')} remove={() => {}} showRealError={false} />
  );
}

Board.defaultProps = {};

export default Board;
