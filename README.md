# Panalpina Kosmos team presents : supply chain challenge2 implementation

## Github repository url
https://github.com/pan-hackers/challenge2

## AWS demo url
http://express2-env.29yafm5yqm.us-east-1.elasticbeanstalk.com/

## Idea of the app
We want to send shipments between two locations. We have 4 major stages for every shipment:
- PUP  "Pickup from Shipper / Supplier ",
- DEP "Goods confirmed on Board 1st Flight",
- ARR "Arrived at Last Airport"
- POD "Delivery to Door"

We want to make it easy to track objects we are shipping by using GS1 code to scan and register them within the process.
We want to make a chain of events tamper proof by encoding them inside blockchain.

## Description
Just run the app and you will see that app consist of three sections

### Track...
you see all the shipments here, if possible you can select one to edit/view the events inside

### ...with GS1...
This pane is simulating activity of our users. In reality the will be scanning GS1 based ids in a form of bar codes. All of our objects are annotated with GS1 ids.

You create new shipments with **Scan SSCC** button
After you select your shipment you are able to add events (Milestones) to it in a sequential order with **Scan SSCC + GTIN** buttons

### ...and blockchain
here you will check how we build our blockchain out of the events user is adding. Each Milestone (PUP, DEP, ARR, POD) consolidates shipment events and make a block out of them.
