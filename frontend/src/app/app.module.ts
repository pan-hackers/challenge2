import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from '@progress/kendo-angular-grid';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShipmentDetailRouteComponent} from './shipment-detail-route/shipment-detail-route.component'
import { MainComponent } from './main/main.component';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { ScanComponent } from './scan/scan.component';
import { ConsoleComponent } from './console/console.component';
import { ShipmentDetailComponent } from './shipment-detail/shipment-detail.component';
import { SensorDetailComponent } from './sensor-detail/sensor-detail.component';
import { ChartsModule } from '@progress/kendo-angular-charts';
import 'hammerjs';





@NgModule({
  declarations: [
    AppComponent,
    ShipmentDetailRouteComponent,
    MainComponent,
    ScanComponent,
    ConsoleComponent,
    ShipmentDetailComponent,
    SensorDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridModule,
    BrowserAnimationsModule,
    LayoutModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
