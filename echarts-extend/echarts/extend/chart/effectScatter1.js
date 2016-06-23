

    var zrUtil = require('../../echarts-master/node_modules/zrender/lib/core/util');
    var echarts = require('../../echarts-master/lib/echarts');

    require('./effectScatter1/EffectScatter1Series');
    require('./effectScatter1/EffectScatter1View');

    echarts.registerVisualCoding('chart', zrUtil.curry(
        require('../../echarts-master/lib/visual/symbol'), 'effectScatter1', 'circle', null
    ));
    echarts.registerLayout(zrUtil.curry(
        require('../../echarts-master/lib/layout/points'), 'effectScatter1'
    ));
