import { UPDATE_SHIPMENTS, UPDATE_BLOCKS, ADD_SHIPMENT } from '../actionTypes'
//These actions are the searchReducer actions

export const updateShipments = (shipments) => ({
    type: UPDATE_SHIPMENTS,
    payload: shipments
})
export const updateBlocks = (blocks) => ({
    type: UPDATE_BLOCKS,
    payload: blocks
})
export const addShipmet = (shipment) => ({
    type: ADD_SHIPMENT,
    payload: shipment
})