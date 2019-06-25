import {
    UPDATE_SHIPMENTS, UPDATE_BLOCKS, ADD_SHIPMENT,
    SELECT_SHIPMENT, CHANGE_LEFT_PANEL,
    NEW_BUTTON_STATE, CREATE_SHIPMENT,
     CREATE_PUP, CREATE_DEP, CREATE_ARR, CREATE_POD
} from '../actionTypes';
//These actions are the searchReducer actions

export const updateShipments = (shipments) => ({
    type: UPDATE_SHIPMENTS,
    payload: shipments
});
export const updateBlocks = (blocks) => ({
    type: UPDATE_BLOCKS,
    payload: blocks
});
export const addShipmet = (shipment) => ({
    type: ADD_SHIPMENT,
    payload: shipment
});
export const selectShipment = (shipment) => ({
    type: SELECT_SHIPMENT,
    payload: shipment
});
export const changeLeftPanel = (navigateString) => ({
    type: CHANGE_LEFT_PANEL,
    payload: navigateString
});

export const newButtonState = (shipment) => ({
    type: NEW_BUTTON_STATE,
    payload: shipment
});
export const createShipment = (shipment) => ({
    type: CREATE_SHIPMENT,
    payload: shipment
});
export const createPup = (navigateString) => ({
    type: CREATE_PUP,
    payload: navigateString
});
export const createDep = (shipment) => ({
    type: CREATE_DEP,
    payload: shipment
});
export const createArr = (shipment) => ({
    type: CREATE_ARR,
    payload: shipment
});
export const createPod = (navigateString) => ({
    type: CREATE_POD,
    payload: navigateString
});

