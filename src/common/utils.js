/**
 * Zip two arrays. The length of the arrays must be equal.
 */
const zip = (a, b) => {
    return a.map((element, idx) => [element, b[idx]])
}

const stringCompare = (str1, str2) => {
    return str1.toString().localeCompare(str2.toString());
}


export {
    zip,
    stringCompare,
};