;(function(glob) {

    // 'this' of every registered function
    // will point to the ctx-object.
    var sope = function(ctx) {
        var o = ctx || {},
            stack = [],
            noop = function() { return ret },
            ret = {

                // register a function
                // the 'sorting' parameter influences
                // the order in which the function will
                // get called.
                use: function(fn, sorting) {
                    stack.push({
                        fn: fn,
                        sorting: typeof sorting !== 'number' ? 100 : sorting,
                        idx: stack.length
                    });

                    return this;
                },

                // register a function with
                // the sorting set to 0, so
                // it will get called at first.
                init: function(fn) {
                    return this.use(fn, 0);
                },

                // run all registered functions
                // according to their sorting order
                // arguments passed in will get handed
                // into the registered functions.
                run: function() {
                    stack.sort(function(a, b) {
                        if (a.sorting > b.sorting) return 1;
                        if (a.sorting < b.sorting) return -1;
                        if (a.idx > b.idx) return 1;
                        if (a.idx < b.idx) return -1;
                        return 0;
                    });

                    for (var i = 0, len = stack.length; i < len; i++) {
                        stack[i].fn.apply(o, arguments);
                    }

                    return this;
                },

                // allows us to skip the execution
                // of some registered functions.
                // mocha style :)
                skip: { use: noop, init: noop, run: noop }

            };

        return ret;
    };

    // Node.js / browserify
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = sope;
    }
    // AMD
    else if (typeof define !== 'undefined' && define.amd) {
        define([], function () {
            return sope;
        });
    }
    // <script>
    else {
        glob.sope = sope;
    }

})(this);