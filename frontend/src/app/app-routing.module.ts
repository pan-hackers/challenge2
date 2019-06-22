import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ShipmentDetailComponent } from './shipment-detail/shipment-detail.component';

const routes: Routes = [
  {
    path: 'track',
    component: MainComponent,
    data: {
      title: 'Track - Shipments Overview',
    },

  },
  {
    path: 'details',
    component: ShipmentDetailComponent,
    data: {
      title: 'Shipment Details',
    },
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
