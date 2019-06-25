import { ADD_SHIPMENT, UPDATE_BLOCKS, UPDATE_SHIPMENTS, SELECT_SHIPMENT } from '../../_shared/actionTypes';

export const shipmentReducer = (state, action) => {
  console.log(action);
  if (!state) {
    return {
      shipments: [],
      blocks: null,
      selectedShipment: null
    }
  }

  switch (action.type) {
    case SELECT_SHIPMENT: {
      return {
        shipments: state.shipments,
        blocks: state.blocks,
        selectedShipment: action.payload,
      };
    }
    case UPDATE_SHIPMENTS: {

      return {
        shipments: action.payload,
        blocks: state.blocks,
        selectedShipment: state.selectedShipment
      };
    }
    case UPDATE_BLOCKS: {

      return {
        shipments: state.shipments,
        blocks: action.payload,
        selectedShipment: state.selectedShipment
      };
    }
    case ADD_SHIPMENT: {
      const shipmentsArray = state.shipments;
      return {
        shipments: shipmentsArray.push(action.payload),
        blocks: action.payload,
        selectedShipment: state.selectedShipment
      };
    }
    default:
      return state;
  }
}
