# Panalpina Kosmos team presents : supply chain challenge2 implementation

## Github repository url
https://github.com/pan-hackers/challenge2

### Running app locally

- Install MongoDB and start it up with default settings.
- enter the 'express-2' folder and type 'npm install && npm start'
- enter the 'frontend' folder and type 'npm install && npm start’
- visit http://localhost:4200

## AWS demo url
http://express2-env.29yafm5yqm.us-east-1.elasticbeanstalk.com/

## Idea of the app
We want to send shipments between two locations. We have 4 major stages for every shipment:
- PUP  "Pickup from Shipper / Supplier ",
- DEP "Goods confirmed on Board 1st Flight",
- ARR "Arrived at Last Airport"
- POD "Delivery to Door"

### How we use GS1 standards ###
We want to make it easy to track objects we are shipping by using GS1 code to scan and register them within the process.

We use GS1 to create
- company prefixes
- GLN to identify locations
- GTIN to identify Trade and Consumable Units
- SSCC to identify Logistic Units


### How we use blockchain ###
We want to make a chain of events tamper proof by encoding them inside blockchain. When shipment reaches a milestone we dump all the events as a payload for a new block that we create and attach to the blockchain (home made implementation).

### Description
Just run the app and you will see that app consist of three sections

### Track...
you see all the shipments here, if possible you can select one to edit/view the events inside

### ...with GS1...
This pane is simulating activity of our users. In reality the will be scanning GS1 based ids in a form of bar codes. 

You create new shipments with **Scan SSCC** button
After you select your shipment you are able to add events (Milestones) to it in a sequential order with **Scan SSCC + GTIN** buttons

### ...and blockchain
here you will check how we build our blockchain out of the events user is adding. Each Milestone (PUP, DEP, ARR, POD) consolidates shipment events and make a block out of them.
