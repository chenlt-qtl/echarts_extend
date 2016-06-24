

    var SymbolDraw = require('../../../echarts-master/lib/chart/helper/SymbolDraw');
    var SingleEffectSymbol = require('../../helper/SingleEffectSymbol');

    require('../../../echarts-master/lib/echarts').extendChartView({

        type: 'singleEffectScatter',

        init: function () {
            this._symbolDraw = new SymbolDraw(SingleEffectSymbol);
        },

        render: function (seriesModel, ecModel, api) {

            var z = seriesModel.getShallow('z') || 0;
            var zr = api.getZr();
            zr.configLayer(z, {
                motionBlur: true,
                lastFrameAlpha: 0.9
            });

            var data = seriesModel.getData();
            var effectSymbolDraw = this._symbolDraw;
            effectSymbolDraw.updateData(data);
            this.group.add(effectSymbolDraw.group);
        },

        updateLayout: function () {
            this._symbolDraw.updateLayout();
        },

        remove: function (ecModel, api) {
            this._symbolDraw && this._symbolDraw.remove(api);
        }
    });
