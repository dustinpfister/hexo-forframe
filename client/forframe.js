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

    // forFrame method api
    ffAPI = {

        get: function (id) {

            return _.find(this.obj, {
                id: id
            });

        }

    },

    // play / pause
    play = function (ff) {

        ff.play = !ff.play;

    },

    // tick the animation
    tick = function (ff) {

        // step fram index
        ff.frame += 1;
        if (ff.frame >= ff.maxFrame) {

            ff.frame = 0;

        }

    };

    // return the method that will be called when making the animation
    return function (ff) {

        // set starting values
        ff.frame = 0;
        ff.maxFrame = ff.maxFrame || 50;
        ff.per = 0;
        ff.bias = 0;
        ff.obj = [];
        ff.play = true;
        ff.width = ff.width || 320;
        ff.height = ff.height || 240;
        ff.name = ff.name || 'untitled';

        // these should be given, but default to noop anyway
        ff.init = ff.init || function () {};
        ff.forFrame = ff.forFrame || function () {};

        // using phaser
        ff.game = new Phaser.Game(ff.width, ff.height + 50, Phaser.AUTO, container, {

                // phaser create state method
                create: function () {

                    // call the animations ini method here
                    ff.init.call(_.merge(ff, initAPI));

                    // be sure to do this so phaser does not
                    // scroll to the top on mobile
                    ff.game.scale.compatibility.scrollTo = false;

                    // play button
                    var button_play = this.game.add.graphics(0, ff.height);
                    button_play.beginFill(0x00ff00);
                    button_play.drawRect(0, 0, 50, 50);
                    button_play.endFill();
                    button_play.inputEnabled = true;
                    button_play.events.onInputDown.add(function () {

                        play(ff);

                    });

                    // tick button
                    var button_tick = this.game.add.graphics(0, ff.height);
                    button_tick.beginFill(0x0000ff);
                    button_tick.drawRect(50, 0, 50, 50);
                    button_tick.endFill();
                    button_tick.inputEnabled = true;
                    button_tick.events.onInputDown.add(function () {

                        tick(ff);

                    });

                    //ff.game.input.onDown.add(function () {

                        //tick(ff);

                    //}, this)

                },

                // phaser update method
                update: function () {

                    // set per, and bias values for the current frame
                    ff.per = ff.frame / ff.maxFrame;
                    ff.bias = 1 - Math.abs(.5 - ff.per) / .5;

                    ff.forFrame.call(_.merge(ff, ffAPI));

                    var i = 0,
                    len = ff.obj.length;
                    while (i < len) {

                        ff.obj[i].draw.call(ff.obj[i].disp, ff);

                        i += 1;

                    }

                    if (ff.play) {

                        tick(ff);

                    }

                }

            }, true);

    };

}
    ());
