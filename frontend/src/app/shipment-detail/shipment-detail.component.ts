import { Component, Input, OnInit } from '@angular/core';
import { checkTrackingEntityDetails } from '../_shared/constants/shipment-functions'
import { Store } from '@ngrx/store'
import { changeLeftPanel } from '../_shared/actions';
@Component({
    selector: 'kosmos-shipment-detail',
    templateUrl: './shipment-detail.component.html',
    styleUrls: ['./shipment-detail.component.css']
})

export class ShipmentDetailComponent implements OnInit {
    @Input() public onBack: Function;
    @Input() public shipmentId;
    public shipment;
    public subscription;
    public state;

    public checkTrackingEntityDetails = checkTrackingEntityDetails;
    public milestones = [{
        "milestoneTitle": "pickup from shipper / supplier",
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
        "iconTag": "ImportDoor"
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
        "iconTag": "MainCarriageAir"
    }, {
        "milestoneTitle": "ARR - Flight Arrival at Last Airport",
        "milestoneType": "AAR",
        "scheduledLoc": "ATL",
        "scheduledLocLong": "-99.0721",
        "scheduledLocLat": "19.436303",
        "scheduledTime": "2019-01-31T05:55:00Z",
        "estimatedLoc": "MEX",
        "estimatedLocText": "Hartsfield-Jackson Atlanta",
        "estimatedLocLong": "-99.0721",
        "estimatedLocLat": "19.436303",
        "estimatedTime": "2019-01-31T05:55:00Z",
        "iconTag": "LastAirport"
    }, {
        "milestoneTitle": "Delivery to Door",
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
        "iconTag": "ImportStation"
    }];
    public shipmentDetail = {
        "id": 4650640,
        "entityKey": "OFWO_121982717",
        "utn": "79711041343",
        "entityType": "OFWO",
        "entityTypeText": "Ocean Forwarding Entity",
        "entitySubType": "FCL",
        "fileId": 121982717,
        "shipNum": "YYZ041343",
        "mainFrom": "Montreal",
        "mainTo": "Southampton",
        "exportBU": "711",
        "exportBUText": "PA TORONTO (CA)",
        "issueDate": "2019-04-08T16:32:00Z",
        "grosw": "2200 KG",
        "pieces": 27,
        "volume": " ",
        "voyageText": "OOL MONTREAL EXPRESS / 303E",
        "partners": [],
        "relations": [],
        "milestones": []
    };
    constructor(private readonly store: Store<any>) { }

    ngOnInit() {
        this.subscription = this.store.subscribe((newState) => {
            this.shipment = newState.RootReducer.shipmentState.shipments.find((shipment) => {
                return shipment._id === this.shipmentId;
            });
            this.state = newState;
        });
    }

    public onBackButtonClick = () => {
        this.store.dispatch(changeLeftPanel('main'));
    }

}
