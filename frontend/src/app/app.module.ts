import 'hammerjs';

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { GridModule } from '@progress/kendo-angular-grid';
import { LayoutModule } from '@progress/kendo-angular-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConsoleComponent } from './console/console.component';
import { MainComponent } from './main/main.component';
import { ScanComponent } from './scan/scan.component';
import { SensorDetailComponent } from './sensor-detail/sensor-detail.component';
import { ShipmentDetailRouteComponent } from './shipment-detail-route/shipment-detail-route.component';
import { ShipmentDetailComponent } from './shipment-detail/shipment-detail.component';

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
    HttpClientModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
