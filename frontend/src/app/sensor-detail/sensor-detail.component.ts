import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { getDirection, isMilestoneReached, checkTrackingEntityDetails } from '../_shared/constants/shipment-functions';

@Component({
    selector: 'kosmos-sensor-detail',
    templateUrl: './sensor-detail.component.html',
    styleUrls: ['./sensor-detail.component.css']
})

export class SensorDetailComponent implements OnInit {
    public temperaturEvents = [
        { date: "yy.mm.dd", celsius: 18, fahrenheit: 23 },
        { date: "yy.mm.dd", celsius: 18, fahrenheit: 23 },
        { date: "yy.mm.dd", celsius: 19, fahrenheit: 23 },
        { date: "yy.mm.dd", celsius: 13, fahrenheit: 23 },
        { date: "yy.mm.dd", celsius: 12, fahrenheit: 23 },
        { date: "yy.mm.dd", celsius: 82, fahrenheit: 23 },
        { date: "yy.mm.dd", celsius: 1, fahrenheit: 23 },
        { date: "yy.mm.dd", celsius: 8, fahrenheit: 23 },
        { date: "yy.mm.dd", celsius: 28, fahrenheit: 23 },
        { date: "yy.mm.dd", celsius: 48, fahrenheit: 23 },
        { date: "yy.mm.dd", celsius: 12, fahrenheit: 23 },
        { date: "yy.mm.dd", celsius: 5, fahrenheit: 23 },
        { date: "yy.mm.dd", celsius: 18, fahrenheit: 23 },
        { date: "yy.mm.dd", celsius: 14, fahrenheit: 23 },
        { date: "yy.mm.dd", celsius: 18, fahrenheit: 23 },
        { date: "yy.mm.dd", celsius: 18, fahrenheit: 23 },
        { date: "yy.mm.dd", celsius: 19, fahrenheit: 23 },
        { date: "yy.mm.dd", celsius: 18, fahrenheit: 23 },
        { date: "yy.mm.dd", celsius: 99, fahrenheit: 23 }
    ]

    public mainLine= [];

    constructor() { }

    ngOnInit() {
        this.generateMainLine(this.temperaturEvents);
        console.log(this.mainLine)
    }
    public generateMainLine = (eventArray) => {
        eventArray.map((event) => {
            if(event!==undefined){
                this.mainLine.push(event.value);
            }
        });
    }


}
