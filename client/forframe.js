var forFrame = (function () {

    console.log('I am forFrame!');

    var ani = [];

    return {

        // add the given for frame object
        add: function (ffObj) {

            // just push it in for now
            ani.push(ffObj);

            console.log('ff client: added animation: ' + ffObj.name);

        }

    };

}
    ());
