export const getFilledArray = (size, toFillWith) => {
    return Array(size).fill(toFillWith);
};

export const getNestedFilledArray = (first, second, toFillWith) => {
    return getFilledArray(first, getFilledArray(second, toFillWith));
};

export const sumElements = (arr, startN, n) => {
    let sum = 0;
    for(let i = startN; i < startN + n; i++){
        sum += arr[i];
    }
    return sum;
};

export const removeDuplicates = array => Array.from(new Set(array.map(JSON.stringify))).map(JSON.parse);

export const filterObjects = (baseArray, removeArray) => {
    const stringBase = baseArray.map(JSON.stringify);
    const stringRemove = removeArray.map(JSON.stringify); 
    const stringFiltered = stringBase.filter(item => stringRemove.indexOf(item) === -1);
    return stringFiltered.map(JSON.parse);
}