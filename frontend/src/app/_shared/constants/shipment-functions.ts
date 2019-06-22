// these funcitons could later be added to a servie!

/**
  * Check if the milestone has been reached
  * @param milestoneIndex of the milestone within the milestones' array
  * @param latestActualMilestone last milestone to compare to
  */
export const isMilestoneReached = (milestoneIndex: number,
    latestActualMilestone: number): boolean => {
    // Check against the latested reached milestone index

    if (milestoneIndex >= 0 && milestoneIndex <= latestActualMilestone) {
        return true;
    } else {
        return false;
    }
};
/**
   * Calculates the orientation of the route between two milestones
   * 
   * @param milestoneDetailFrom start milestone
   * @param milestoneDetailTo finish milestone
   */
export const getDirection = (milestoneDetailFrom, milestoneDetailTo): string => {
    let rightOrLeft: string;

    // right direction is the default so we don't had the 'Right' suffix
    if (milestoneDetailFrom.actualLocText) {
        if (milestoneDetailTo.actualLocText) {
            rightOrLeft = parseFloat(milestoneDetailFrom.actualLocLong) >
                parseFloat(milestoneDetailTo.actualLocLong) ? 'Left' : '';
        } else if (milestoneDetailTo.estimatedLocText) {
            rightOrLeft = parseFloat(milestoneDetailFrom.actualLocLong) >
                parseFloat(milestoneDetailTo.estimatedLocLong) ? 'Left' : '';
        }
    } else { //use estimatedLoc
        if (milestoneDetailFrom.actualLocText) {
            rightOrLeft = parseFloat(milestoneDetailFrom.estimatedLocLong) >
                parseFloat(milestoneDetailTo.actualLocLong) ? 'Left' : '';
        } else if (milestoneDetailTo.estimatedLocText) {
            rightOrLeft = parseFloat(milestoneDetailFrom.estimatedLocLong) >
                parseFloat(milestoneDetailTo.estimatedLocLong) ? 'Left' : '';
        }
    }
    return rightOrLeft;
}


// To check undefined value
export const checkTrackingEntityDetails = (data, model): string => {
    if (data[model] !== undefined && data[model] !== null) {
        return data[model];
    } else {
        return '';
    }
};

// To append customer reference values
export const setCustomerReference = (data): string => {
    let customerReference = '';
    data.forEach(item => {
        if (customerReference !== '') {
            customerReference = customerReference + ', ' + item.reference;
        } else {
            customerReference = item.reference;
        }
    });
    return customerReference;

};
