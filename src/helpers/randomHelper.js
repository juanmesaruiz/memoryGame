export const getRandom = (max, min = 1) => {
    return Math.floor(Math.random() * (max - min)) + min;
};