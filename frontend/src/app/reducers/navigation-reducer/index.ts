import { CHANGE_LEFT_PANEL } from '../../_shared/actionTypes';

export const shipmentReducer = (state, action) => {
    console.log(action);
    if (!state) {
        return {
            left: 'main'
        };
    }

    switch (action.type) {
        case CHANGE_LEFT_PANEL: {
            return {
                left: action.payload
            };
        }
        default:
            return state;
    }
}
