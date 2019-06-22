import { combineReducers } from "@ngrx/store";
import {shipmentReducer as shipmentState}  from './shipment-reducer';
export const RootReducer = combineReducers({shipmentState});
