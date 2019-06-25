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
    public defaultMilestones = [{
        "milestoneTitle": "PUP - Pickup form Shipper / Supplier ",
        "milestoneType": "PUP",
        "scheduledLoc": "GBLON",
        "scheduledLocLong": "-0.12",
        "scheduledLocLat": "51.51",
        "scheduledTime": "2019-01-28T22:30: 00Z",
        "estimatedLoc": "GBLON",
        "estimatedLocText": "London",
        "estimatedLocLong": "-0.12",
        "estimatedLocLat": "51.51",
        "estimatedTime": "2019-01-28T22:30:00Z",
        "actualTime": "2019-01-29T17:00:00Z",
        "iconTag": "ImportDoorDarkGrey",
        "isReached": false
    }, {
        "milestoneTitle": "DEP - Goods confirmed on board of 1st Flight",
        "milestoneType": "DEP",
        "scheduledLoc": "LHR",
        "scheduledLocLong": "-0.4614",
        "scheduledLocLat": "51.477500",
        "scheduledTime": "2019-01-30T22:30:00Z",
        "estimatedLoc": "LHR",
        "estimatedLocText": "London Heathrow",
        "estimatedLocLong": "-0.4614",
        "estimatedLocLat": "51.477500",
        "estimatedTime": "2019-01-30T22:30:00Z",
        "iconTag": "MainCarriageAirDarkGreyLeft",
        "isReached": false
    }, {
        "milestoneTitle": "ARR - Flight Arrival at Last Airport",
        "milestoneType": "ARR",
        "scheduledLoc": "ATL",
        "scheduledLocLong": "-99.0721",
        "scheduledLocLat": "19.436303",
        "scheduledTime": "2019-01-31T05:55:00Z",
        "estimatedLoc": "MEX",
        "estimatedLocText": "Atlanta Hartsfiels-jackson",
        "estimatedLocLong": "-99.0721",
        "estimatedLocLat": "19.436303",
        "estimatedTime": "2019-01-31T05:55:00Z",
        "iconTag": "LastAirportDarkGreyLeft",
        "isReached": false
    }, {
        "milestoneTitle": "POD - Delivery to Door",
        "milestoneType": "POD",
        "scheduledLoc": "ATL",
        "scheduledLocLong": "-99.0721",
        "scheduledLocLat": "19.436303",
        "scheduledTime": "2019-02-01T05:55:00Z",
        "estimatedLoc": "ATL",
        "estimatedLocText": "Atlanta",
        "estimatedLocLong": "-99.0721",
        "estimatedLocLat": "19.436303",
        "estimatedTime": "2019-02-01T05:55:00Z",
        "iconTag": "ImportStationDarkGrey",
        "isReached": false
    }];
    public milestones = [{
        "milestoneTitle": "PUP - Pickup form Shipper / Supplier ",
        "milestoneType": "PUP",
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
        "iconTag": "ImportDoorGreen",
        "isReached": true
    }, {
        "milestoneTitle": "DEP - Goods confirmed on board of 1st Flight",
        "milestoneType": "DEP",
        "scheduledLoc": "LHR",
        "scheduledLocLong": "-0.4614",
        "scheduledLocLat": "51.477500",
        "scheduledTime": "2019-01-30T22:30:00Z",
        "estimatedLoc": "LHR",
        "estimatedLocText": "London Heathrow",
        "estimatedLocLong": "-0.4614",
        "estimatedLocLat": "51.477500",
        "estimatedTime": "2019-01-30T22:30:00Z",
        "actualLoc": "GBLON",
        "actualLocText": "London",
        "actualLocLong": "-0.12",
        "actualLocLat": "51.51",
        "actualTime": "2019-01-30T22:30:00Z",
        "iconTag": "MainCarriageAirGreenLeft",
        "isReached": true
    }, {
        "milestoneTitle": "ARR - Flight Arrival at Last Airport",
        "milestoneType": "ARR",
        "scheduledLoc": "ATL",
        "scheduledLocLong": "-99.0721",
        "scheduledLocLat": "19.436303",
        "scheduledTime": "2019-01-31T05:55:00Z",
        "estimatedLoc": "MEX",
        "estimatedLocText": "Atlanta Hartsfiels-jackson",
        "estimatedLocLong": "-99.0721",
        "estimatedLocLat": "19.436303",
        "estimatedTime": "2019-01-31T05:55:00Z",
        "actualLoc": "GBLON",
        "actualLocText": "London",
        "actualLocLong": "-0.12",
        "actualLocLat": "51.51",
        "actualTime": "2019-01-30T22:30:00Z",
        "iconTag": "LastAirportGreenLeft",
        "isReached": true
    }, {
        "milestoneTitle": "POD - Delivery to Door",
        "milestoneType": "POD",
        "scheduledLoc": "ATL",
        "scheduledLocLong": "-99.0721",
        "scheduledLocLat": "19.436303",
        "scheduledTime": "2019-02-01T05:55:00Z",
        "estimatedLoc": "ATL",
        "estimatedLocText": "Atlanta",
        "estimatedLocLong": "-99.0721",
        "estimatedLocLat": "19.436303",
        "estimatedTime": "2019-02-01T05:55:00Z",
        "iconTag": "ImportStationGreen",
        "isReached": true
    }];
    public scrollElements;
    public shipment = {
        milestones: []
    };
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
    public milestonesTagsGrey = ["ImportDoorDarkGrey", "MainCarriageAirDarkGreyLeft", "LastAirportDarkGreyLeft", "ImportStationDarkGrey"];
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
            const returnShipment = { milestones: this.defaultMilestones };
            const shipment = newState.RootReducer.shipmentState.shipments.find((ship) => {
                return ship._id === this.shipmentId;
            });
            console.log('Shipment 1', shipment);


            if (shipment.milestones === undefined || shipment.milestones.length === 0) {
                console.log("was empty", shipment);
                returnShipment.milestones = this.defaultMilestones;
            } else {
                console.log("executed alternative calculations")
                shipment.milestones.map((milestone, index) => {
                    console.log("milestone", milestone);
                    returnShipment.milestones[index] = { ...this.milestones[index], ...returnShipment.milestones[index] };
                    returnShipment.milestones[index].iconTag = this.milestonesTagsGreen[index];
                    returnShipment.milestones[index].isReached = true;
                });

                let iconIndex = returnShipment.milestones.length;
                while (returnShipment.milestones.length < 4) {
                    returnShipment.milestones.push(this.defaultMilestones[iconIndex]);
                    iconIndex++;
                };
            }
            console.log('Shipment 2', shipment);


            this.fixedElement = returnShipment.milestones[3];
            this.shipment = returnShipment;
        });






    }

    public getMilestoneIconPath(milestoneDetail, index): string {

        const milestoneStatus = isMilestoneReached(index,
            this.latestActualMilestone) ? 'Green' : 'DarkGrey';
        let iconPath = this.iconUrl + milestoneDetail.iconTag +
            '.svg';

        return iconPath;
    }

    public fillarray = (array) => {
        while (array.length < 4) {
            array.push({})
        }
        return array
    }



}
