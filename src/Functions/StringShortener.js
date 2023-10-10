const stringShortener = string => {
    return string.length >= 20 ? string.slice(0, 19).concat('...') : string;
};

export default stringShortener;