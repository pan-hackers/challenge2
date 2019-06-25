import { NEW_BUTTON_STATE, CREATE_SHIPMENT, CREATE_PUP, CREATE_DEP, CREATE_ARR, CREATE_POD } from '../../_shared/actionTypes';

export const navigationReducer = (state, action) => {
    if (!state) {
        return {
            createShipment: true,
            createPup: false,
            createDep: false,
            createArr: false,
            createPod: false
        };
    }

    switch (action.type) {
        case NEW_BUTTON_STATE: {
            return state;
        }
        case CREATE_SHIPMENT: {
            return {
                left: action.payload
            };
        }
        case CREATE_PUP: {
            return state;
        }
        case CREATE_DEP: {
            return state;

        }
        case CREATE_ARR: {
            return state;

        }
        case CREATE_POD: {
            return state;

        }
        default:
            return state;
    }
};

