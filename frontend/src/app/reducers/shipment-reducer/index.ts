import { ADD_SHIPMENT, UPDATE_BLOCKS, UPDATE_SHIPMENTS } from '../../_shared/actionTypes';

export const shipmentReducer = (state, action) => {
  console.log(action)
  if (!state) {
    return {
      shipments: [],
      blocks: null
    }
  }

  switch (action.type) {
    case UPDATE_SHIPMENTS: {

      return {
        shipments: action.payload,
        blocks: state.blocks
      }
    }
    case UPDATE_BLOCKS: {

      return {
        shipments: state.shipments,
        blocks: action.payload
      };
    }
    case ADD_SHIPMENT: {
      let shipmentsArray = state.shipments;
      return {
        shipments: shipmentsArray.push(action.payload),
        blocks: action.payload
      };
    }
    default:
      return state
  }
}
