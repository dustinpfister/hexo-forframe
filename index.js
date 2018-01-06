
let fs = require('hexo-fs'),
path = require('path'),
_ = require('lodash');

// Helper Methods :


// copy the source from /source/_forframe to /public/forframe/projects
let copySource = function () {

    return new Promise(function (resolve, reject) {

        let source = path.join(hexo.source_dir, '_forframe'),
        target = path.join(hexo.public_dir, 'forframe', 'project');

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

// get the index.js file for the project of the given name
let getProject = function (name) {

    return new Promise(function (resolve, reject) {

        // the uri of the project should be here
        let uri = path.join(hexo.source_dir, '_forframe', name, 'index.js');

        fs.readFile(uri, function (e, data) {

            if (e) {

                reject(e);

            }

            resolve(data);

        });

    });

};

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

hexo.extend.generator.register('forframe_pages', function (locals) {

    return copySource().then(function () {

        return readSource();

    }).then(function (files) {

        // create paths for each project
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

    return readSource()

    //.then(function (files) {

    //    return getProject(files[0]);

    //})

    .then(function (files) {

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

        return '<script src="/forframe/project/' + projectName + '/index.js"></script>';

    }

    return '';

});

// link to the client system
hexo.extend.helper.register('ff_get_client', function () {

    return '<script src="/forframe/js/forframe.js"></script>';

});

hexo.extend.helper.register('ff_list_projects', function (data) {

    if (data) {

        let html = '<ul>';

        data.files.forEach(function (projectName) {

            let href = '/forframe/projects/' + projectName + '/index.html';

            html += '<li><a href=\"' + href + '\">' + projectName + '<\/a><\/li>'

            //return '<script src="/forframe/js/forframe.js"></script>';

        });

        return html + '<\/ul>';

    }

    return '';

});
