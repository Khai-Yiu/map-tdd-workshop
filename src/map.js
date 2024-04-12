function checkIsPlainObject(value) {
    return (
        value !== null &&
        typeof value === 'object' &&
        Object.getPrototypeOf(value) === Object.prototype
    );
}

function checkIsTransducer(value) {
    return (
        typeof value.f === 'function' &&
        (checkIsPlainObject(value.xf) || checkIsTransformer(value.xf))
    );
}

function checkIsTransformer(value) {
    return (
        typeof value['@@transducer/init'] === 'function' &&
        typeof value['@@transducer/result'] === 'function' &&
        typeof value['@@transducer/step'] === 'function'
    );
}

function map(mapperFunction, functor) {
    if (arguments.length === 1) {
        return function (valueToMap) {
            return map(mapperFunction, valueToMap);
        };
    }

    if (functor === null || functor === undefined) {
        throw new TypeError();
    }

    let mappedFunctor;

    if (checkIsTransformer(functor) || checkIsTransducer(functor)) {
        mappedFunctor = {
            f: mapperFunction,
            xf: functor
        };
    } else if (checkIsPlainObject(functor)) {
        if (typeof functor.map === 'function' && functor.map.length === 1) {
            mappedFunctor = functor.map(mapperFunction);
        } else {
            mappedFunctor = {};

            for (const [key, value] of Object.entries(functor)) {
                mappedFunctor[key] = mapperFunction(value);
            }
        }
    } else if (Array.isArray(functor)) {
        mappedFunctor = [];

        for (let i = 0; i < functor.length; i++) {
            mappedFunctor[i] = mapperFunction(functor[i]);
        }
    } else if (typeof functor === 'function') {
        mappedFunctor = (valueToMap) => {
            return mapperFunction(functor(valueToMap));
        };
    }

    return mappedFunctor;
}

export default map;
