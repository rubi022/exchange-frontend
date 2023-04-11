import {sortAsks, sortBids} from "./sortByPrice";

export const handleIncrementalUpdate = (depthOld, newLevel, type) => {
    if (newLevel.length !== 2) {
        return depthOld;
    }
    const index = depthOld.findIndex(([price]) => +price === +newLevel[0]);
    if (index === -1 && +newLevel[1]) {
        const data = [...depthOld, newLevel];
        if (type === 'asks') {
            return sortAsks(data);
        }
        return sortBids(data);
    }
    const result = [...depthOld];
    if (Number(newLevel[1]) !== 0) {
        result[index] = newLevel;
    }
    else {
        result.splice(index, 1);
    }
    return result;
};

export const handleIncrementalUpdateArray = (depthOld, newLevels, type) => {
    const prices = {};
    for (let i = 0; i < newLevels.length; i += 1) {
        prices[newLevels[i][0]] = newLevels[i][1];
    }
    const rest = depthOld.filter(([price]) => !prices[price]);
    const newData = newLevels.filter(([_, amount]) => Number(amount) !== 0);
    const result = [...rest, ...newData];
    if (type === 'asks') {
        return sortAsks(result);
    }
    return sortBids(result);
};
