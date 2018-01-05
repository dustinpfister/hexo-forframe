
let fs = require('fs'),
path = require('path'),
_ = require('lodash');

// generate the client system *.js file at /forframe/js/forframe.js
hexo.extend.generator.register('forframe_client', function () {

    return new Promise(function (resolve, reject) {

        // the client should be here
        let uri = path.join(hexo.base_dir, 'node_modules/hexo-forframe/client', 'forframe.js');

        // get the client
        fs.readFile(uri, function (e, data) {

            if (e) {

                reject(e);

            }

            resolve(data);

        });

    }).then(function (data) {

        // if all goes well create the client */js file
        // to be used
        return {

            path: 'forframe/js/forframe.js',
            data: data

        };

    }).catch (function () {

        return {

            path: 'forframe/js/forframe.js',
            data: 'var forFrame={};'

        };

    });

});

// read the /source/_forframe folder
let readSource = function () {

    return new Promise(function (resolve, reject) {

        fs.readdir(path.join(hexo.source_dir, '_forframe'), function (e, files) {

            if (e) {

                reject(e);

            }

            resolve(files);

        });

    });

};

// generate the index.html file at /forframe/index
hexo.extend.generator.register('forframe_index', function (locals) {

    return readSource().then(function (files) {

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

// link to the client system
hexo.extend.helper.register('ff_get_client', function () {

    return '<script src="/forframe/js/forframe.js"></script>'

});
