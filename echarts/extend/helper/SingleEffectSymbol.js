/**
 * Symbol with ripple effect 炫光部分
 * @module echarts/chart/helper/EffectSymbol
 */

    var EffectSymbol = require('../../echarts-master/lib/chart/helper/EffectSymbol');
    var symbolUtil = require('../../echarts-master/lib/util/symbol');
    var graphic = require('../../echarts-master/lib/util/graphic');
    var Symbol = require('../../echarts-master/lib/chart/helper/Symbol');
    var Group = graphic.Group;
    var zrUtil = require('../../echarts-master/node_modules/zrender/lib/core/util');
    
    function SingleEffectSymbol(data, idx) {
        Group.call(this);

        var symbol = new Symbol(data, idx);
            
        var rippleGroup = new Group();
        this.add(symbol);
        this.add(rippleGroup);

        rippleGroup.beforeUpdate = function () {
            this.attr(symbol.getScale());
        };
        this.updateData(data, idx);
    }
    
    SingleEffectSymbol.prototype.startEffectAnimation = function (effectCfg) {
			        var symbolType = effectCfg.symbolType;
			        var color = effectCfg.color;
			        var rippleGroup = this.childAt(1);

                    var ripplePath = symbolUtil.createSymbol(
                        symbolType, -0.5, -0.5, 1, 1, color
                    );
   
                    ripplePath.attr({
                        style: {
                            stroke: effectCfg.brushType === 'stroke' ? color : null,
                            fill: effectCfg.brushType === 'fill' ? color : null,
                            strokeNoScale: true
                        },
                        z2: 99,
                        silent: true,
                        scale: [1, 1],
                        z: effectCfg.z,
                        zlevel: effectCfg.zlevel
                    });

                    var delay = 0;
                    // TODO Configurable period
                    ripplePath.animate('', true)
                        .when(effectCfg.period, {
                            scale: [effectCfg.rippleScale, effectCfg.rippleScale]
                        })
                        .delay(delay)
                        .start();
                    ripplePath.animateStyle(true)
                        .when(effectCfg.period, {
                            opacity: 0
                        })
                        .delay(delay)
                        .start();

                    rippleGroup.add(ripplePath);

            }
	
    	zrUtil.inherits(SingleEffectSymbol, EffectSymbol);
        module.exports = SingleEffectSymbol;

