var forFrame = (function () {

    var container = document.getElementById('ff') || document.body;

    // the api for the init methods of a ff object
    var initAPI = {

        add: function (type, id, draw) {

            if (type === 'graphics') {

                var obj = {

                    id: id,
                    disp: this.game.add.graphics(0, 0),
                    draw: draw || function () {}

                };

                obj.draw.call(obj.disp, this);

                this.obj.push(obj);

            }

        }

    },

    ffAPI = {

        get: function (id) {

            return _.find(this.obj, {
                id: id
            });

        }

    },

    tick = function (ff) {

        // step fram index
        ff.i += 1;
        if (ff.i >= ff.maxFrame) {

            ff.i = 0;

        }

    };

    return function (ff) {

        // set starting values
        ff.i = 0;
        ff.maxFrame = ff.maxFrame || 50;
        ff.per = 0;
        ff.bias = 0;
        ff.obj = [];
        ff.width = ff.width || 320;
        ff.height = ff.height || 240;
        ff.name = ff.name || 'untitled';

        // these should be given, but default to noop anyway
        ff.init = ff.init || function () {};
        ff.forFrame = ff.forFrame || function () {};

        // using phaser
        ff.game = new Phaser.Game(ff.width, ff.height, Phaser.AUTO, container, {

                create: function () {

                    ff.init.call(_.merge(ff, initAPI));

                    ff.game.input.onDown.add(function () {

                        console.log('yeah');
                        tick(ff);

                    }, this)

                },

                update: function () {

                    // set per, and bias values for the current frame
                    ff.per = ff.i / ff.maxFrame;
                    ff.bias = 1 - Math.abs(.5 - ff.per) / .5;

                    ff.forFrame.call(_.merge(ff, ffAPI));

                    var i = 0,
                    len = ff.obj.length;
                    while (i < len) {

                        ff.obj[i].draw.call(ff.obj[i].disp, ff);

                        i += 1;

                    }

                    //tick(ff);

                }

            });

    };

}
    ());
