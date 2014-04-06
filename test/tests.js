if (typeof module !== 'undefined' && module.exports) {
    var expect = require('expect.js');
    var sope = require('../sope');
}

describe('sope tests', function() {

    it('should pass in the context', function() {
        sope({ foo: 'bar' })
            .use(function() {
                expect(this.foo).to.equal('bar');
            })
            .run();
    });

    it('should execute in the correct order', function() {

        sope()
            .use(function(memo) {
                expect(memo.count).to.equal(2);
                memo.count++;
            })
            .use(function(memo) {
                expect(memo.count).to.equal(3);
                memo.count++;
            })
            .use(function(memo) {
                expect(memo.count).to.equal(4);
                memo.count++;
            })
            .init(function(memo) {
                expect(memo.count).to.equal(0);
                memo.count++;
            })
            .use(function(memo) {
                expect(memo.count).to.equal(1);
                memo.count++;
            }, 99)
            .run({ count: 0 });
    });

});