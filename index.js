
let fs = require('hexo-fs'),
path = require('path'),
_ = require('lodash');

// Helper Methods :

let copyClient = function () {

    return new Promise(function (resolve, reject) {

        let source = path.join(hexo.base_dir, 'node_modules/hexo-forframe/client'),
        target = path.join(hexo.public_dir, 'js');

        fs.copyDir(source, target, function (e, data) {

            if (e) {

                reject(e);

            }

            resolve(data);

        });

    })

};

// copy the source from /source/_forframe to /public/forframe/projects
let copySource = function () {

    return new Promise(function (resolve, reject) {

        let source = path.join(hexo.source_dir, '_forframe'),
        target = path.join(hexo.public_dir, 'forframe', 'projects');

        fs.copyDir(source, target, function (e, data) {

            if (e) {

                reject(e);

            }

            resolve(data);

        });

    })

};

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

hexo.extend.generator.register('forframe_pages', function (locals) {

    // copy over the client system, and all libs used to /js if not there all ready
    return copyClient().then(function () {

        // copy of the source for all projects
        return copySource();

    }).then(function () {

        return readSource();

    }).then(function (files) {

        // create the index.html files for all projects
        files = files.map(function (projectName) {

                return {

                    path: path.join('forframe/projects/', projectName, 'index.html'),
                    data: _.merge({}, locals, {
                        data: {
                            message: 'success',
                            projectName: projectName
                        }
                    }),
                    layout: 'forframe_project'

                };

            });

        return _.concat(files, {

            path: 'forframe/projects/index.html',
            data: _.merge(locals, {
                data: {

                    message: 'success'

                }
            }),
            layout: 'forframe_project'

        });

    }).catch (function (e) {

        return {

            path: 'forframe/projects/index.html',
            data: _.merge(locals, {
                data: {

                    message: e.message

                }
            }),
            layout: 'forframe_project'

        };

    });

});

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
hexo.extend.helper.register('ff_get_project', function (projectName) {

    if (projectName) {

        return '<script src="/forframe/projects/' + projectName + '/index.js"></script>';

    }

    return '';

});

// link to the client system
hexo.extend.helper.register('ff_get_client', function () {

    return '<script src="/js/lodash/4.17.4/lodash.js"></script>\n' +
    '<script src="/js/phaser/2.8.8/phaser.min.js"></script>\n' +
    '<script src="/js/forframe.js"></script>';

});

hexo.extend.helper.register('ff_list_projects', function (data) {

    if (data) {

        let html = '<ul>';

        data.files.forEach(function (projectName) {

            let href = '/forframe/projects/' + projectName + '/index.html';

            html += '<li><a href=\"' + href + '\">' + projectName + '<\/a><\/li>'

        });

        return html + '<\/ul>';

    }

    return '';

});
