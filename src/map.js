function map(functionToApply, array) {
    const mappedArray = [];

    for (let i = 0; i < array.length; i++) {
        mappedArray[i] = functionToApply(array[i]);
    }

    return mappedArray;
}

export default map;
