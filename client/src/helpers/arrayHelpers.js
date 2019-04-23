export const getFilledArray = (size, toFillWith) => {
    return Array(size).fill(toFillWith);
};

export const getNestedFilledArray = (first, second, toFillWith) => {
    return getFilledArray(first, getFilledArray(second, toFillWith));
}

export const sumElements = (arr, startN, n) => {
    let sum = 0;
    for(let i = startN; i < startN + n; i++){
        sum += arr[i];
    }
    return sum;
};