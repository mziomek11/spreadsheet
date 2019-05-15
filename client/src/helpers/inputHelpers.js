export const isArrowKey = e => {
    return e.keyCode >= 37 && e.keyCode <= 40;
};

export const isLetter = e => {
    return e.key.length === 1;
};

export const isBackspace = e => {
    return e.key === "Backspace";
};

export const isEnter = e => {
    return e.key === "Enter";
};