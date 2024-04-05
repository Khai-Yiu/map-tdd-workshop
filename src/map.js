function checkIsPlainObject(value) {
    return (
        value !== null &&
        typeof value === 'object' &&
        Object.getPrototypeOf(value) === Object.prototype
    );
}

function map(func, functor) {
    let mappedFunctor;
    const isPlainObject = checkIsPlainObject(functor);

    if (isPlainObject) {
        mappedFunctor = {};

        for (const [key, value] of Object.entries(functor)) {
            mappedFunctor[key] = func(value);
        }
    } else if (Array.isArray(functor)) {
        mappedFunctor = [];

        for (let i = 0; i < functor.length; i++) {
            mappedFunctor[i] = func(functor[i]);
        }
    } else if (typeof functor === 'function') {
        mappedFunctor = (value) => {
            return func(functor(value));
        };
    }

    return mappedFunctor;
}

export default map;
