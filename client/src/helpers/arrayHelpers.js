export const getFilledArray = (size, toFillWith) => {
    return Array(size).fill(toFillWith);
};

export const getNestedFilledArray = (first, second, toFillWith) => {
    return getFilledArray(first, getFilledArray(second, toFillWith));
}