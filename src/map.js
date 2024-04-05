function checkIsPlainObject(value) {
    return (
        value !== null &&
        typeof value === 'object' &&
        Object.getPrototypeOf(value) === Object.prototype
    );
}

function checkIsTransformer(value) {
    return (
        typeof value['@@transducer/init'] === 'function' &&
        typeof value['@@transducer/result'] === 'function' &&
        typeof value['@@transducer/step'] === 'function'
    );
}

function map(func, functor) {
    if (functor === null || functor === undefined) {
        throw new TypeError();
    }

    let mappedFunctor;

    if (checkIsPlainObject(functor)) {
        if (typeof functor.map === 'function' && functor.map.length === 1) {
            mappedFunctor = functor.map(func);
        } else if (checkIsTransformer(functor)) {
            const initialValue = functor['@@transducer/init'];
            const result = functor['@@transducer/result'];
            const step = functor['@@transducer/step'];

            mappedFunctor = {
                f: function add1(func) {
                    return result(step(func, initialValue));
                },
                xf: functor
            };
        } else {
            mappedFunctor = {};

            for (const [key, value] of Object.entries(functor)) {
                mappedFunctor[key] = func(value);
            }
        }
    } else if (Array.isArray(functor)) {
        mappedFunctor = [];

        for (let i = 0; i < functor.length; i++) {
            mappedFunctor[i] = func(functor[i]);
        }
    } else if (typeof functor === 'function') {
        mappedFunctor = (valueToMap) => {
            return func(functor(valueToMap));
        };
    }

    return mappedFunctor;
}

export default map;
