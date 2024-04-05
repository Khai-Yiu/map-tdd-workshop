import map from './map';

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
});
