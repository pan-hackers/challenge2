import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { getDirection, isMilestoneReached, checkTrackingEntityDetails } from '../_shared/constants/shipment-functions';
import { Store } from '@ngrx/store'
@Component({
    selector: 'kosmos-shipment-detail-route',
    templateUrl: './shipment-detail-route.component.html',
    styleUrls: ['./shipment-detail-route.component.css']
})

export class ShipmentDetailRouteComponent implements OnInit {
    //public milestones=[{},{},{},{}]
    public milestones = [{
        "milestoneTitle": "CUV - Nas Couves",
        "milestoneType": "APUP",
        "scheduledLoc": "GBLON",
        "scheduledLocLong": "-0.12",
        "scheduledLocLat": "51.51",
        "scheduledTime": "2019-01-28T22:30: 00Z",
        "estimatedLoc": "GBLON",
        "estimatedLocText": "London",
        "estimatedLocLong": "-0.12",
        "estimatedLocLat": "51.51",
        "estimatedTime": "2019-01-28T22:30:00Z",
        "actualLoc": "GBLON",
        "actualLocText": "London",
        "actualLocLong": "-0.12",
        "actualLocLat": "51.51",
        "actualTime": "2019-01-29T17:00:00Z",
        "iconTag": "ImportDoor"
    }, {
        "milestoneTitle": "DEP - Goods confirmed on board of 1st Flight",
        "milestoneType": "ADE1",
        "scheduledLoc": "LHR",
        "scheduledLocLong": "-0.4614",
        "scheduledLocLat": "51.477500",
        "scheduledTime": "2019-01-30T22:30:00Z",
        "estimatedLoc": "LHR",
        "estimatedLocText": "London Heathrow",
        "estimatedLocLong": "-0.4614",
        "estimatedLocLat": "51.477500",
        "estimatedTime": "2019-01-30T22:30:00Z",
        "iconTag": "MainCarriageAir"
    }, {
        "milestoneTitle": "ARR - Flight Arrival at Last Airport",
        "milestoneType": "AARL",
        "scheduledLoc": "MEX",
        "scheduledLocLong": "-99.0721",
        "scheduledLocLat": "19.436303",
        "scheduledTime": "2019-01-31T05:55:00Z",
        "estimatedLoc": "MEX",
        "estimatedLocText": "Mexico City Juarez International",
        "estimatedLocLong": "-99.0721",
        "estimatedLocLat": "19.436303",
        "estimatedTime": "2019-01-31T05:55:00Z",
        "iconTag": "LastAirport"
    }, {
        "milestoneTitle": "SPC - Self-Pick Up by Customer",
        "milestoneType": "ASPO",
        "scheduledLoc": "MEX",
        "scheduledLocLong": "-99.0721",
        "scheduledLocLat": "19.436303",
        "scheduledTime": "2019-02-01T05:55:00Z",
        "estimatedLoc": "MEX",
        "estimatedLocText": "Mexico City Juarez International",
        "estimatedLocLong": "-99.0721",
        "estimatedLocLat": "19.436303",
        "estimatedTime": "2019-02-01T05:55:00Z",
        "iconTag": "ImportStation"
    }];
    public scrollElements;
    public shipment;
    @Input() public latestActualMilestone;
    @Input() public shipmentId: number;
    @Input() public showGreenGap: boolean;
    public finished: boolean;
    public previewLegLength: number = 30;
    public iconUrl: string = 'assets/Icons/';
    public iconPath: string = '';
    public fixedElement;
    public shipmentMilestones = [];
    public milestonesTagsGreen = ["ImportDoorGreen", "MainCarriageAirGreenLeft", "LastAirportGreenLeft", "ImportStationGreen"];
    public milestonesTagsGrey = ["ImportDoorDarkGreey", "MainCarriageAirDarkGreyLeft", "LastAirportDarkGreyLeft", "ImportStationDarkGrey"];
    public subscription;
    // milestone variables
    public milestonesWithDirection: string[] = [
        'OLD1',
        'OLAL',
        'OFD1',
        'OFAL',
        'DDE2',
        'DDE1',
        'DARR',
        'ADE1',
        'AARL',
        'DDE3',
        'DAR2'];

    constructor(private readonly store: Store<any>) { }

    ngOnInit() {
        this.subscription = this.store.subscribe((newState) => {
            this.shipment = newState.RootReducer.shipmentState.shipments.find((shipment) => {
                return shipment._id === this.shipmentId;
            })
            this.shipment.milestones.map((milestone, index) => {
                console.log("milestone", milestone)
                this.shipment.milestones[index] = this.milestones[index];
            })
            let iconIndex = this.shipment.milestones.length;
            while (this.shipment.milestones.length < 4) {


                if (this.shipment.milestones === undefined) {
                    this.shipment.milestones = []
                }
                this.shipment.milestones.push({
                    milestoneTitle: "SPC - Self-Pick Up by Customer",
                    iconTag: this.milestonesTagsGrey[iconIndex]
                })
                iconIndex++;
            }
            console.log(newState.RootReducer.shipmentState)
            console.log(this.shipment)
        });

        this.scrollElements = this.milestones.map((item, index) => {
            if (item.actualTime !== undefined && item.actualTime !== null) {
                this.latestActualMilestone = index;
            }

            return item;
        });
        this.fixedElement = this.scrollElements[this.scrollElements.length - 1];





    }

    public getMilestoneIconPath(milestoneDetail, index): string {

        const milestoneStatus = isMilestoneReached(index,
            this.latestActualMilestone) ? 'Green' : 'DarkGrey';
        let iconPath = this.iconUrl + milestoneDetail.iconTag + milestoneStatus + '.svg';

        return iconPath;
    }

    public fillarray = (array) => {
        while (array.length < 4) {
            array.push({})
        }
        return array
    }



}
