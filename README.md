## sope.js

sope.js is a minimalistic boot library.

### Sample

```javascript

// the first argument of 'sope'
// is the context to which 'this'
// of the registered functions references
// in this sample it references to a jquery object.

sope($({}))

    // 'init' is a shortcut
    // for .use(fn, 0);
    .init(function() {
        // I will run first (sorting=0)
    })

    // this function will run with
    // the default sorting param of 100
    .use(function(claim) {
        // I will run third (sorting=100)
        console.log(claim); // 'i like sope.js'
    })

    // this function will get skipped
    // mocha style!
    skip.use(function() {

    })

    .use(function() {
        // I will run fourth (sorting=100, second defined)

    })
    // this function has the sorting param
    // of 50

    .use(function() {
        // I will run second (sorting = 50)
    }, 50)

    .run('i like sope.js');

```

### Installation

#### Node.JS

```
npm install limits.js
```

#### Browser

```
bower install limits.js
```

### Usage

```javascript

var service = limits({

                           // The Number of calls permitted...
    secondly:   Number,    // ...in one second
    minutely:   Number,    // ...in one minute
    quarterly:  Number,    // ...in an quarter of an hour
    hourly:     Number,    // ...in an hour
    daily:      Number,    // ...in one day
    weekly:     Number,    // ...in one week

    history:    Array,     // Array of timestamps ( Date.now() )
                           // from previous calls

    onCall:     Function,  // Callback Function which gets fired
                           // everytime a call gets executed. Passed
                           // in as first argument you get the delay
                           // in milliseconds with which the function
                           // was called.
                           // Can be used to persist the call history.

    onClear:    Function,  // Callback Function which gets fired
                           // everytime a part of the backlog can be cleared.
                           // First parameter is a Timestamp which indicates
                           // from where on to the past it's save to delete
                           // the history.
});

// You can also specify the number of calls permitted
// in an certain timerange like this:

service.secondly(Numeric);
service.minutely(Numeric);
service.quarterly(Numeric);
service.hourly(Numeric);
service.daily(Numeric);
service.weekly(Numeric);

// The predefined ranges don't fit to your requirements?
// No problem, try this:

service.within(timerange, maxcalls);

// With the 'push' method you are able to push a function
// into the execution stack.
// If the call doesn't get aborted by the second conditional function
// you will get an object in return containing an 'delay' property, which indicates
// with which delay the function will get called and an 'timer' property which
// holds the return of the setTimeout function.

var myCall = service.push(function() {
    // Here we do our API call.
    // The execution of this function will get
    // delayed if we have reached the limitations.

}, function(delay) {
    // This is an optional conditional function.
    // It gets an parameter 'delay' passed in which
    // indicates when the call will get executed.
    // If delay is 0 the call will get executed immediately (although asynchronily).

    // Returning 'false' will prevent the call from being executed.
});

```


## License
Copyright (c) 2014 Simon Kusterer
Licensed under the MIT license.