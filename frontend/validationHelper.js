export const containsSpecialChars = (str) => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
};
export const containsOnlyNumbers = (num) => {
    const number = /^[0-9]\d*(\.\d+)?$/;
    return number.test(num);
};
export const containsNumAlpha = (numAlpha) => {
    const numberAlpha = /^[a-zA-Z0-9 ]*$/;
    return numberAlpha.test(numAlpha);
};

export const containsOnlyAlphabets = (str) => {
    const Alphabet = /^[A-Za-z\s]*$/;
    return Alphabet.test(str);
};



export const CamelCaseConverter = (str) => {
    return str.split(" ").filter((y) => y).map((z) => z = z.charAt(0).toUpperCase() + z.slice(1).toLowerCase()).join(" ");
}
