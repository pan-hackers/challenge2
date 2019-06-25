import { UPDATE_SHIPMENTS, UPDATE_BLOCKS, ADD_SHIPMENT, SELECT_SHIPMENT, CHANGE_LEFT_PANEL } from '../actionTypes';
//These actions are the searchReducer actions

export const updateShipments = (shipments) => ({
    type: UPDATE_SHIPMENTS,
    payload: shipments
});
export const updateBlocks = (blocks) => ( {
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
