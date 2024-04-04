function getIsPlainObject(value) {
    return (
        value !== null &&
        typeof value === 'object' &&
        value.constructor === Object
    );
}

function map(func, functor) {
    let mappedFunctor;
    const isPlainObject = getIsPlainObject(functor);

    if (Array.isArray(functor)) {
        mappedFunctor = [];

        for (let i = 0; i < functor.length; i++) {
            mappedFunctor[i] = func(functor[i]);
        }
    } else if (isPlainObject) {
        mappedFunctor = {};

        for (const [key, value] of Object.entries(functor)) {
            mappedFunctor[key] = func(value);
        }
    }

    return mappedFunctor;
}

export default map;
