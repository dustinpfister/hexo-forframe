
let fs = require('fs');

// generate the index.html file at /forframe/index
hexo.extend.generator.register('forframe_index', function (locals) {

    return {

        path: 'forframe/index.html',
        data: locals,
        layout: 'forframe_index'

    };

});

// make a list of currently loaded animations
hexo.extend.helper.register('ff_list', function () {

    return '<p>I am helping.</p>'

});
