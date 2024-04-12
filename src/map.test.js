import map from './map';
import R from 'ramda';

describe('map', () => {
    var times2 = function (x) {
        return x * 2;
    };
    var add1 = function (x) {
        return x + 1;
    };
    var dec = function (x) {
        return x - 1;
    };

    const listXf = {
        '@@transducer/init': function () {
            return [];
        },
        '@@transducer/step': function (acc, x) {
            return acc.concat([x]);
        },
        '@@transducer/result': function (x) {
            return x;
        }
    };

    it('maps simple functions over arrays', () => {
        expect(map(times2, [1, 2, 3, 4])).toEqual([2, 4, 6, 8]);
    });
    it('maps over objects', () => {
        expect(map(dec, {})).toEqual({});
        expect(map(dec, { x: 4, y: 5, z: 6 })).toEqual({ x: 3, y: 4, z: 5 });
    });
    it('interprets ((->) r) as a functor', function () {
        var f = function (a) {
            return a - 1;
        };
        var g = function (b) {
            return b * 2;
        };
        var h = map(f, g);
        expect(h(10)).toEqual(10 * 2 - 1);
    });
    it('dispatches to objects that implement `map`', function () {
        var obj = {
            x: 100,
            map: function (f) {
                return f(this.x);
            }
        };
        expect(map(add1, obj)).toEqual(101);
    });
    it('dispatches to transformer objects', function () {
        expect(map(add1, listXf)).toEqual({
            f: add1,
            xf: listXf
        });
    });
    it('throws a TypeError on null and undefined', function () {
        expect(() => {
            map(times2, null);
        }).toThrow(TypeError);
        expect(() => {
            map(times2, undefined);
        }).toThrow(TypeError);
    });
    it('composes', function () {
        var mdouble = map(times2);
        var mdec = map(dec);
        expect(mdec(mdouble([10, 20, 30]))).toEqual([19, 39, 59]);
    });
    it('can compose transducer-style', function () {
        var mdouble = map(times2);
        var mdec = map(dec);
        var xcomp = mdec(mdouble(listXf));

        expect(xcomp.xf).toEqual({ xf: listXf, f: times2 });
        expect(xcomp.f).toEqual(dec);
    });
});
