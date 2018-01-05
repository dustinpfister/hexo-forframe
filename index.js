
let fs = require('fs'),
path = require('path'),
_ = require('lodash');

// generate the index.html file at /forframe/index
hexo.extend.generator.register('forframe_index', function (locals) {

    console.log(hexo);

    return new Promise(function (resolve, reject) {

        fs.readdir(path.join(hexo.source_dir,'_forframe'), function (e, files) {

            if (e) {

                reject(e);

            }

            resolve(files);

        });

    }).then(function (files) {

        return {

            path: 'forframe/index.html',
            data: _.merge(locals, {
                data: {

                    files: files,
                    message: 'looks good'

                }
            }),
            layout: 'forframe_index'

        };

    }).catch (function (e) {

        return {

            path: 'forframe/index.html',
            data: _.merge(locals, {
                data: {

                    message: e.message

                }
            }),
            layout: 'forframe_index'

        };

    });

});

// make a list of currently loaded animations
hexo.extend.helper.register('ff_list', function () {

    return 'yeah I am just a helper.'

});
