import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from '@progress/kendo-angular-grid';
import { LayoutModule } from '@progress/kendo-angular-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConsoleComponent } from './console/console.component';
import { MainComponent } from './main/main.component';
import { ScanComponent } from './scan/scan.component';
import { ShipmentDetailRouteComponent } from './shipment-detail-route/shipment-detail-route.component';

@NgModule({
  declarations: [
    AppComponent,
    ShipmentDetailRouteComponent,
    MainComponent,
    ScanComponent,
    ConsoleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
