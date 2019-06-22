import { UPDATE_SHIPMENTS, UPDATE_BLOCKS } from '../../_shared/actionTypes'

export const shipmentReducer = (state, action) => {
    console.log(action)
    if (!state) {
        return {
            shipments: null,
            blocks: null
        }
    }

    switch (action.type) {
        case UPDATE_SHIPMENTS: {

            return {
                shipments: action.payload,
                blocks:state.blocks
            }
        }
        case UPDATE_BLOCKS: {
            return {
                shipments: state.shipments,
                blocks: action.payload
            };
        }
        default:
            return state
    }
}