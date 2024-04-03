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
});
