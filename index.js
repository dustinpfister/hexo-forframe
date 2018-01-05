
// generate the index.html file at /forframe/index
hexo.extend.generator.register('forframe_index', function (locals) {

    return {

        path: 'forframe/index.html',
        data: locals,
        layout: 'forframe_index'

    };

});
