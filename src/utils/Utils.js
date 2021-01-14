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

export const getCurrentScrollHeight = () => {
    const currentScrollValue = document.documentElement.scrollTop;
    const widnowHeight = window.innerHeight;
    return currentScrollValue + widnowHeight;
}

export const isScrollEnd = (currentScrollHeight) => {
    return currentScrollHeight > document.body.scrollHeight;
}

export const isScrollNotEnd = (currentScrollHeight) => {
    return currentScrollHeight <= document.body.scrollHeight;
}
