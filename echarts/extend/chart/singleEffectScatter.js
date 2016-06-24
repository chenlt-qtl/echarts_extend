

    var zrUtil = require('../../echarts-master/node_modules/zrender/lib/core/util');
    var echarts = require('../../echarts-master/lib/echarts');

    require('./singleEffectScatter/SingleEffectScatterSeries');
    require('./singleEffectScatter/SingleEffectScatterView');

    echarts.registerVisualCoding('chart', zrUtil.curry(
        require('../../echarts-master/lib/visual/symbol'), 'singleEffectScatter', 'circle', null
    ));
    echarts.registerLayout(zrUtil.curry(
        require('../../echarts-master/lib/layout/points'), 'singleEffectScatter'
    ));
