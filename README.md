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

    // execute the boot chain
    // and pass in some variable which
    // will get handed over as first argument
    // into the registered functions.
    .run('i like sope.js');

```

### Installation

```
bower install sope.js
```


## License
Copyright (c) 2014 Simon Kusterer
Licensed under the MIT license.