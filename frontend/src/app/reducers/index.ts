import { combineReducers } from '@ngrx/store';

import { shipmentReducer as shipmentState } from './shipment-reducer';
import { navigationReducer as navigationState } from './navigation-reducer';

export const RootReducer = combineReducers({ shipmentState, navigationState });
