import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { getDirection, isMilestoneReached, checkTrackingEntityDetails } from '../_shared/constants/shipment-functions';

@Component({
    selector: 'kosmos-shipment-detail-route',
    templateUrl: './shipment-detail-route.component.html',
    styleUrls: ['./shipment-detail-route.component.css']
})

export class ShipmentDetailRouteComponent implements OnInit {
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
    @Input() public latestActualMilestone;
    @Input() public showGreenGap: boolean;
    @Input() public header: string;
    @Input() public navigateToMilestone: Function;
    public finished: boolean;
    public previewLegLength: number = 30;
    public iconUrl: string = 'assets/Icons/';
    public iconPath: string = '';
    public fixedElement;

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

    constructor() { }

    ngOnInit() {
        this.scrollElements = this.milestones.map((item, index) => {
            if (item.actualTime !== undefined && item.actualTime !== null) {
                this.latestActualMilestone = index;
            }
            return item;
        });
        this.fixedElement = this.scrollElements[this.scrollElements.length - 1];
        //public fixedElement = this.milestones.slice(0, this.milestones.length - 1);
        console.log(this.fixedElement)
    }

    public getMilestoneIconPath(milestoneDetail, index): string {

        const milestoneStatus = isMilestoneReached(index,
            this.latestActualMilestone) ? 'Green' : 'DarkGrey';
        let iconPath = this.iconUrl + milestoneDetail.iconTag + milestoneStatus + '.svg';

        // calculate direction based on the following milestone
        // if last milestone use direction of previous one
        let direction: string = '';

        if (index < this.milestones.length - 1) {
            const nextMilestone = this.milestones[index + 1];

            if (this.milestonesWithDirection.indexOf(milestoneDetail.milestoneType) > -1) {
                if (this.milestonesWithDirection.indexOf(nextMilestone.milestoneType) > -1) {
                    direction = getDirection(milestoneDetail, nextMilestone);
                } else {
                    //get previous milestone
                    direction = getDirection(this.milestones[index - 1], milestoneDetail);
                }
                iconPath = this.iconUrl + milestoneDetail.iconTag +
                    milestoneStatus + direction + '.svg';
            }
        } else {
            //last milestone
            if (this.milestonesWithDirection.indexOf(milestoneDetail.milestoneType) > -1) {
                //get previous milestone
                direction = getDirection(this.milestones[index - 1], milestoneDetail);
                iconPath = this.iconUrl + milestoneDetail.iconTag +
                    milestoneStatus + direction + '.svg';
            }
        }
        return iconPath;
    }



}
