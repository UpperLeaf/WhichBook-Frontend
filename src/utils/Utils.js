export const isNotEmpty = (item) => {
    return !(
        item === undefined ||
        item === null ||
        !isNaN(item) ||
        (Array.isArray(item) && item.length === 0));
}

export const isEmpty = (item) => {
    return !isNotEmpty(item);
}

export const scrollIsEnd = () => {
    const currentScrollValue = document.documentElement.scrollTop;
    const widnowHeight = window.innerHeight;
    const scrollHeight = document.body.scrollHeight;
    return currentScrollValue + widnowHeight >= scrollHeight
}