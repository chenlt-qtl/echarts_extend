(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["echarts"] = factory();
	else
		root["echarts"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Export echarts as CommonJS module
	 */
	module.exports = __webpack_require__(1);

	__webpack_require__(32);
	__webpack_require__(66);
	__webpack_require__(71);
	__webpack_require__(45);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;// Enable DEV mode when using source code without build. which has no __DEV__ variable
	// In build process 'typeof __DEV__' will be replace with 'boolean'
	// So this code will be removed or disabled anyway after built.
	if (false) {
	    // In browser
	    if (typeof window !== 'undefined') {
	        window.__DEV__ = true;
	    }
	    // In node
	    else if (typeof global !== 'undefined') {
	        global.__DEV__ = true;
	    }
	}

	/*!
	 * ECharts, a javascript interactive chart library.
	 *
	 * Copyright (c) 2015, Baidu Inc.
	 * All rights reserved.
	 *
	 * LICENSE
	 * https://github.com/ecomfe/echarts/blob/master/LICENSE.txt
	 */

	/**
	 * @module echarts
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var env = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/env\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    var GlobalModel = __webpack_require__(2);
	    var ExtensionAPI = __webpack_require__(19);
	    var CoordinateSystemManager = __webpack_require__(20);
	    var OptionManager = __webpack_require__(21);

	    var ComponentModel = __webpack_require__(13);
	    var SeriesModel = __webpack_require__(22);

	    var ComponentView = __webpack_require__(23);
	    var ChartView = __webpack_require__(24);
	    var graphic = __webpack_require__(25);

	    var zrender = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var colorTool = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/tool/color\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var Eventful = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/mixin/Eventful\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var timsort = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/timsort\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    var each = zrUtil.each;

	    var PRIORITY_PROCESSOR_FILTER = 1000;
	    var PRIORITY_PROCESSOR_STATISTIC = 5000;


	    var PRIORITY_VISUAL_LAYOUT = 1000;
	    var PRIORITY_VISUAL_GLOBAL = 2000;
	    var PRIORITY_VISUAL_CHART = 3000;
	    var PRIORITY_VISUAL_COMPONENT = 4000;
	    var PRIORITY_VISUAL_BRUSH = 5000;

	    // Main process have three entries: `setOption`, `dispatchAction` and `resize`,
	    // where they must not be invoked nestedly, except the only case: invoke
	    // dispatchAction with updateMethod "none" in main process.
	    // This flag is used to carry out this rule.
	    // All events will be triggered out side main process (i.e. when !this[IN_MAIN_PROCESS]).
	    var IN_MAIN_PROCESS = '__flag_in_main_process';

	    function createRegisterEventWithLowercaseName(method) {
	        return function (eventName, handler, context) {
	            // Event name is all lowercase
	            eventName = eventName && eventName.toLowerCase();
	            Eventful.prototype[method].call(this, eventName, handler, context);
	        };
	    }
	    /**
	     * @module echarts~MessageCenter
	     */
	    function MessageCenter() {
	        Eventful.call(this);
	    }
	    MessageCenter.prototype.on = createRegisterEventWithLowercaseName('on');
	    MessageCenter.prototype.off = createRegisterEventWithLowercaseName('off');
	    MessageCenter.prototype.one = createRegisterEventWithLowercaseName('one');
	    zrUtil.mixin(MessageCenter, Eventful);
	    /**
	     * @module echarts~ECharts
	     */
	    function ECharts (dom, theme, opts) {
	        opts = opts || {};

	        // Get theme by name
	        if (typeof theme === 'string') {
	            theme = themeStorage[theme];
	        }

	        /**
	         * @type {string}
	         */
	        this.id;
	        /**
	         * Group id
	         * @type {string}
	         */
	        this.group;
	        /**
	         * @type {HTMLDomElement}
	         * @private
	         */
	        this._dom = dom;
	        /**
	         * @type {module:zrender/ZRender}
	         * @private
	         */
	        this._zr = zrender.init(dom, {
	            renderer: opts.renderer || 'canvas',
	            devicePixelRatio: opts.devicePixelRatio
	        });

	        /**
	         * @type {Object}
	         * @private
	         */
	        this._theme = zrUtil.clone(theme);

	        /**
	         * @type {Array.<module:echarts/view/Chart>}
	         * @private
	         */
	        this._chartsViews = [];

	        /**
	         * @type {Object.<string, module:echarts/view/Chart>}
	         * @private
	         */
	        this._chartsMap = {};

	        /**
	         * @type {Array.<module:echarts/view/Component>}
	         * @private
	         */
	        this._componentsViews = [];

	        /**
	         * @type {Object.<string, module:echarts/view/Component>}
	         * @private
	         */
	        this._componentsMap = {};

	        /**
	         * @type {module:echarts/ExtensionAPI}
	         * @private
	         */
	        this._api = new ExtensionAPI(this);

	        /**
	         * @type {module:echarts/CoordinateSystem}
	         * @private
	         */
	        this._coordSysMgr = new CoordinateSystemManager();

	        Eventful.call(this);

	        /**
	         * @type {module:echarts~MessageCenter}
	         * @private
	         */
	        this._messageCenter = new MessageCenter();

	        // Init mouse events
	        this._initEvents();

	        // In case some people write `window.onresize = chart.resize`
	        this.resize = zrUtil.bind(this.resize, this);


	        // Sort on demand
	        function prioritySortFunc(a, b) {
	            return a.prio - b.prio;
	        }
	        timsort(visualFuncs, prioritySortFunc);
	        timsort(dataProcessorFuncs, prioritySortFunc);
	    }

	    var echartsProto = ECharts.prototype;

	    /**
	     * @return {HTMLDomElement}
	     */
	    echartsProto.getDom = function () {
	        return this._dom;
	    };

	    /**
	     * @return {module:zrender~ZRender}
	     */
	    echartsProto.getZr = function () {
	        return this._zr;
	    };

	    /**
	     * @param {Object} option
	     * @param {boolean} notMerge
	     * @param {boolean} [notRefreshImmediately=false] Useful when setOption frequently.
	     */
	    echartsProto.setOption = function (option, notMerge, notRefreshImmediately) {
	        if (true) {
	            zrUtil.assert(!this[IN_MAIN_PROCESS], '`setOption` should not be called during main process.');
	        }

	        this[IN_MAIN_PROCESS] = true;

	        if (!this._model || notMerge) {
	            this._model = new GlobalModel(
	                null, null, this._theme, new OptionManager(this._api)
	            );
	        }

	        this._model.setOption(option, optionPreprocessorFuncs);

	        updateMethods.prepareAndUpdate.call(this);

	        !notRefreshImmediately && this._zr.refreshImmediately();

	        this[IN_MAIN_PROCESS] = false;
	    };

	    /**
	     * @DEPRECATED
	     */
	    echartsProto.setTheme = function () {
	        console.log('ECharts#setTheme() is DEPRECATED in ECharts 3.0');
	    };

	    /**
	     * @return {module:echarts/model/Global}
	     */
	    echartsProto.getModel = function () {
	        return this._model;
	    };

	    /**
	     * @return {Object}
	     */
	    echartsProto.getOption = function () {
	        return this._model.getOption();
	    };

	    /**
	     * @return {number}
	     */
	    echartsProto.getWidth = function () {
	        return this._zr.getWidth();
	    };

	    /**
	     * @return {number}
	     */
	    echartsProto.getHeight = function () {
	        return this._zr.getHeight();
	    };

	    /**
	     * Get canvas which has all thing rendered
	     * @param {Object} opts
	     * @param {string} [opts.backgroundColor]
	     */
	    echartsProto.getRenderedCanvas = function (opts) {
	        if (!env.canvasSupported) {
	            return;
	        }
	        opts = opts || {};
	        opts.pixelRatio = opts.pixelRatio || 1;
	        opts.backgroundColor = opts.backgroundColor
	            || this._model.get('backgroundColor');
	        var zr = this._zr;
	        var list = zr.storage.getDisplayList();
	        // Stop animations
	        zrUtil.each(list, function (el) {
	            el.stopAnimation(true);
	        });
	        return zr.painter.getRenderedCanvas(opts);
	    };
	    /**
	     * @return {string}
	     * @param {Object} opts
	     * @param {string} [opts.type='png']
	     * @param {string} [opts.pixelRatio=1]
	     * @param {string} [opts.backgroundColor]
	     */
	    echartsProto.getDataURL = function (opts) {
	        opts = opts || {};
	        var excludeComponents = opts.excludeComponents;
	        var ecModel = this._model;
	        var excludesComponentViews = [];
	        var self = this;

	        each(excludeComponents, function (componentType) {
	            ecModel.eachComponent({
	                mainType: componentType
	            }, function (component) {
	                var view = self._componentsMap[component.__viewId];
	                if (!view.group.ignore) {
	                    excludesComponentViews.push(view);
	                    view.group.ignore = true;
	                }
	            });
	        });

	        var url = this.getRenderedCanvas(opts).toDataURL(
	            'image/' + (opts && opts.type || 'png')
	        );

	        each(excludesComponentViews, function (view) {
	            view.group.ignore = false;
	        });
	        return url;
	    };


	    /**
	     * @return {string}
	     * @param {Object} opts
	     * @param {string} [opts.type='png']
	     * @param {string} [opts.pixelRatio=1]
	     * @param {string} [opts.backgroundColor]
	     */
	    echartsProto.getConnectedDataURL = function (opts) {
	        if (!env.canvasSupported) {
	            return;
	        }
	        var groupId = this.group;
	        var mathMin = Math.min;
	        var mathMax = Math.max;
	        var MAX_NUMBER = Infinity;
	        if (connectedGroups[groupId]) {
	            var left = MAX_NUMBER;
	            var top = MAX_NUMBER;
	            var right = -MAX_NUMBER;
	            var bottom = -MAX_NUMBER;
	            var canvasList = [];
	            var dpr = (opts && opts.pixelRatio) || 1;
	            for (var id in instances) {
	                var chart = instances[id];
	                if (chart.group === groupId) {
	                    var canvas = chart.getRenderedCanvas(
	                        zrUtil.clone(opts)
	                    );
	                    var boundingRect = chart.getDom().getBoundingClientRect();
	                    left = mathMin(boundingRect.left, left);
	                    top = mathMin(boundingRect.top, top);
	                    right = mathMax(boundingRect.right, right);
	                    bottom = mathMax(boundingRect.bottom, bottom);
	                    canvasList.push({
	                        dom: canvas,
	                        left: boundingRect.left,
	                        top: boundingRect.top
	                    });
	                }
	            }

	            left *= dpr;
	            top *= dpr;
	            right *= dpr;
	            bottom *= dpr;
	            var width = right - left;
	            var height = bottom - top;
	            var targetCanvas = zrUtil.createCanvas();
	            targetCanvas.width = width;
	            targetCanvas.height = height;
	            var zr = zrender.init(targetCanvas);

	            each(canvasList, function (item) {
	                var img = new graphic.Image({
	                    style: {
	                        x: item.left * dpr - left,
	                        y: item.top * dpr - top,
	                        image: item.dom
	                    }
	                });
	                zr.add(img);
	            });
	            zr.refreshImmediately();

	            return targetCanvas.toDataURL('image/' + (opts && opts.type || 'png'));
	        }
	        else {
	            return this.getDataURL(opts);
	        }
	    };

	    var updateMethods = {

	        /**
	         * @param {Object} payload
	         * @private
	         */
	        update: function (payload) {
	            // console.time && console.time('update');

	            var ecModel = this._model;
	            var api = this._api;
	            var coordSysMgr = this._coordSysMgr;
	            // update before setOption
	            if (!ecModel) {
	                return;
	            }

	            // Fixme First time update ?
	            ecModel.restoreData();

	            // TODO
	            // Save total ecModel here for undo/redo (after restoring data and before processing data).
	            // Undo (restoration of total ecModel) can be carried out in 'action' or outside API call.

	            // Create new coordinate system each update
	            // In LineView may save the old coordinate system and use it to get the orignal point
	            coordSysMgr.create(this._model, this._api);

	            processData.call(this, ecModel, api);

	            stackSeriesData.call(this, ecModel);

	            coordSysMgr.update(ecModel, api);

	            doVisualEncoding.call(this, ecModel, payload);

	            doRender.call(this, ecModel, payload);

	            // Set background
	            var backgroundColor = ecModel.get('backgroundColor') || 'transparent';

	            var painter = this._zr.painter;
	            // TODO all use clearColor ?
	            if (painter.isSingleCanvas && painter.isSingleCanvas()) {
	                this._zr.configLayer(0, {
	                    clearColor: backgroundColor
	                });
	            }
	            else {
	                // In IE8
	                if (!env.canvasSupported) {
	                    var colorArr = colorTool.parse(backgroundColor);
	                    backgroundColor = colorTool.stringify(colorArr, 'rgb');
	                    if (colorArr[3] === 0) {
	                        backgroundColor = 'transparent';
	                    }
	                }
	                backgroundColor = backgroundColor;
	                this._dom.style.backgroundColor = backgroundColor;
	            }

	            // console.time && console.timeEnd('update');
	        },

	        // PENDING
	        /**
	         * @param {Object} payload
	         * @private
	         */
	        updateView: function (payload) {
	            var ecModel = this._model;

	            // update before setOption
	            if (!ecModel) {
	                return;
	            }

	            ecModel.eachSeries(function (seriesModel) {
	                seriesModel.getData().clearAllVisual();
	            });

	            doVisualEncoding.call(this, ecModel, payload);

	            invokeUpdateMethod.call(this, 'updateView', ecModel, payload);
	        },

	        /**
	         * @param {Object} payload
	         * @private
	         */
	        updateVisual: function (payload) {
	            var ecModel = this._model;

	            // update before setOption
	            if (!ecModel) {
	                return;
	            }

	            ecModel.eachSeries(function (seriesModel) {
	                seriesModel.getData().clearAllVisual();
	            });

	            doVisualEncoding.call(this, ecModel, payload);

	            invokeUpdateMethod.call(this, 'updateVisual', ecModel, payload);
	        },

	        /**
	         * @param {Object} payload
	         * @private
	         */
	        updateLayout: function (payload) {
	            var ecModel = this._model;

	            // update before setOption
	            if (!ecModel) {
	                return;
	            }

	            doLayout.call(this, ecModel, payload);

	            invokeUpdateMethod.call(this, 'updateLayout', ecModel, payload);
	        },

	        /**
	         * @param {Object} payload
	         * @private
	         */
	        highlight: function (payload) {
	            toggleHighlight.call(this, 'highlight', payload);
	        },

	        /**
	         * @param {Object} payload
	         * @private
	         */
	        downplay: function (payload) {
	            toggleHighlight.call(this, 'downplay', payload);
	        },

	        /**
	         * @param {Object} payload
	         * @private
	         */
	        prepareAndUpdate: function (payload) {
	            var ecModel = this._model;

	            prepareView.call(this, 'component', ecModel);

	            prepareView.call(this, 'chart', ecModel);

	            updateMethods.update.call(this, payload);
	        }
	    };

	    /**
	     * @param {Object} payload
	     * @private
	     */
	    function toggleHighlight(method, payload) {
	        var ecModel = this._model;

	        // dispatchAction before setOption
	        if (!ecModel) {
	            return;
	        }

	        ecModel.eachComponent(
	            {mainType: 'series', query: payload},
	            function (seriesModel, index) {
	                var chartView = this._chartsMap[seriesModel.__viewId];
	                if (chartView && chartView.__alive) {
	                    chartView[method](
	                        seriesModel, ecModel, this._api, payload
	                    );
	                }
	            },
	            this
	        );
	    }

	    /**
	     * Resize the chart
	     */
	    echartsProto.resize = function () {
	        if (true) {
	            zrUtil.assert(!this[IN_MAIN_PROCESS], '`resize` should not be called during main process.');
	        }

	        this[IN_MAIN_PROCESS] = true;

	        this._zr.resize();

	        var optionChanged = this._model && this._model.resetOption('media');
	        updateMethods[optionChanged ? 'prepareAndUpdate' : 'update'].call(this);

	        // Resize loading effect
	        this._loadingFX && this._loadingFX.resize();

	        this[IN_MAIN_PROCESS] = false;
	    };

	    var defaultLoadingEffect = __webpack_require__(26);
	    /**
	     * Show loading effect
	     * @param  {string} [name='default']
	     * @param  {Object} [cfg]
	     */
	    echartsProto.showLoading = function (name, cfg) {
	        if (zrUtil.isObject(name)) {
	            cfg = name;
	            name = 'default';
	        }
	        this.hideLoading();
	        var el = defaultLoadingEffect(this._api, cfg);
	        var zr = this._zr;
	        this._loadingFX = el;

	        zr.add(el);
	    };

	    /**
	     * Hide loading effect
	     */
	    echartsProto.hideLoading = function () {
	        this._loadingFX && this._zr.remove(this._loadingFX);
	        this._loadingFX = null;
	    };

	    /**
	     * @param {Object} eventObj
	     * @return {Object}
	     */
	    echartsProto.makeActionFromEvent = function (eventObj) {
	        var payload = zrUtil.extend({}, eventObj);
	        payload.type = eventActionMap[eventObj.type];
	        return payload;
	    };

	    /**
	     * @pubilc
	     * @param {Object} payload
	     * @param {string} [payload.type] Action type
	     * @param {boolean} [silent=false] Whether trigger event.
	     */
	    echartsProto.dispatchAction = function (payload, silent) {
	        var actionWrap = actions[payload.type];
	        if (!actionWrap) {
	            return;
	        }

	        var actionInfo = actionWrap.actionInfo;
	        var updateMethod = actionInfo.update || 'update';

	        if (true) {
	            zrUtil.assert(
	                !this[IN_MAIN_PROCESS],
	                '`dispatchAction` should not be called during main process.'
	                + 'unless updateMathod is "none".'
	            );
	        }

	        this[IN_MAIN_PROCESS] = true;

	        var payloads = [payload];
	        var batched = false;
	        // Batch action
	        if (payload.batch) {
	            batched = true;
	            payloads = zrUtil.map(payload.batch, function (item) {
	                item = zrUtil.defaults(zrUtil.extend({}, item), payload);
	                item.batch = null;
	                return item;
	            });
	        }

	        var eventObjBatch = [];
	        var eventObj;
	        var isHighlightOrDownplay = payload.type === 'highlight' || payload.type === 'downplay';
	        for (var i = 0; i < payloads.length; i++) {
	            var batchItem = payloads[i];
	            // Action can specify the event by return it.
	            eventObj = actionWrap.action(batchItem, this._model);
	            // Emit event outside
	            eventObj = eventObj || zrUtil.extend({}, batchItem);
	            // Convert type to eventType
	            eventObj.type = actionInfo.event || eventObj.type;
	            eventObjBatch.push(eventObj);

	            // Highlight and downplay are special.
	            isHighlightOrDownplay && updateMethods[updateMethod].call(this, batchItem);
	        }

	        (updateMethod !== 'none' && !isHighlightOrDownplay)
	            && updateMethods[updateMethod].call(this, payload);

	        // Follow the rule of action batch
	        if (batched) {
	            eventObj = {
	                type: actionInfo.event || payload.type,
	                batch: eventObjBatch
	            };
	        }
	        else {
	            eventObj = eventObjBatch[0];
	        }

	        this[IN_MAIN_PROCESS] = false;

	        !silent && this._messageCenter.trigger(eventObj.type, eventObj);
	    };

	    /**
	     * Register event
	     * @method
	     */
	    echartsProto.on = createRegisterEventWithLowercaseName('on');
	    echartsProto.off = createRegisterEventWithLowercaseName('off');
	    echartsProto.one = createRegisterEventWithLowercaseName('one');

	    /**
	     * @param {string} methodName
	     * @private
	     */
	    function invokeUpdateMethod(methodName, ecModel, payload) {
	        var api = this._api;

	        // Update all components
	        each(this._componentsViews, function (component) {
	            var componentModel = component.__model;
	            component[methodName](componentModel, ecModel, api, payload);

	            updateZ(componentModel, component);
	        }, this);

	        // Upate all charts
	        ecModel.eachSeries(function (seriesModel, idx) {
	            var chart = this._chartsMap[seriesModel.__viewId];
	            chart[methodName](seriesModel, ecModel, api, payload);

	            updateZ(seriesModel, chart);
	        }, this);

	    }

	    /**
	     * Prepare view instances of charts and components
	     * @param  {module:echarts/model/Global} ecModel
	     * @private
	     */
	    function prepareView(type, ecModel) {
	        var isComponent = type === 'component';
	        var viewList = isComponent ? this._componentsViews : this._chartsViews;
	        var viewMap = isComponent ? this._componentsMap : this._chartsMap;
	        var zr = this._zr;

	        for (var i = 0; i < viewList.length; i++) {
	            viewList[i].__alive = false;
	        }

	        ecModel[isComponent ? 'eachComponent' : 'eachSeries'](function (componentType, model) {
	            if (isComponent) {
	                if (componentType === 'series') {
	                    return;
	                }
	            }
	            else {
	                model = componentType;
	            }

	            // Consider: id same and type changed.
	            var viewId = model.id + '_' + model.type;
	            var view = viewMap[viewId];
	            if (!view) {
	                var classType = ComponentModel.parseClassType(model.type);
	                var Clazz = isComponent
	                    ? ComponentView.getClass(classType.main, classType.sub)
	                    : ChartView.getClass(classType.sub);
	                if (Clazz) {
	                    view = new Clazz();
	                    view.init(ecModel, this._api);
	                    viewMap[viewId] = view;
	                    viewList.push(view);
	                    zr.add(view.group);
	                }
	                else {
	                    // Error
	                    return;
	                }
	            }

	            model.__viewId = viewId;
	            view.__alive = true;
	            view.__id = viewId;
	            view.__model = model;
	        }, this);

	        for (var i = 0; i < viewList.length;) {
	            var view = viewList[i];
	            if (!view.__alive) {
	                zr.remove(view.group);
	                view.dispose(ecModel, this._api);
	                viewList.splice(i, 1);
	                delete viewMap[view.__id];
	            }
	            else {
	                i++;
	            }
	        }
	    }

	    /**
	     * Processor data in each series
	     *
	     * @param {module:echarts/model/Global} ecModel
	     * @private
	     */
	    function processData(ecModel, api) {
	        each(dataProcessorFuncs, function (process) {
	            process.func(ecModel, api);
	        });
	    }

	    /**
	     * @private
	     */
	    function stackSeriesData(ecModel) {
	        var stackedDataMap = {};
	        ecModel.eachSeries(function (series) {
	            var stack = series.get('stack');
	            var data = series.getData();
	            if (stack && data.type === 'list') {
	                var previousStack = stackedDataMap[stack];
	                if (previousStack) {
	                    data.stackedOn = previousStack;
	                }
	                stackedDataMap[stack] = data;
	            }
	        });
	    }

	    /**
	     * Layout before each chart render there series, special visual encoding stage
	     *
	     * @param {module:echarts/model/Global} ecModel
	     * @private
	     */
	    function doLayout(ecModel, payload) {
	        var api = this._api;
	        each(visualFuncs, function (visual) {
	            if (visual.isLayout) {
	                visual.func(ecModel, api, payload);
	            }
	        });
	    }

	    /**
	     * Encode visual infomation from data after data processing
	     *
	     * @param {module:echarts/model/Global} ecModel
	     * @private
	     */
	    function doVisualEncoding(ecModel, payload) {
	        var api = this._api;
	        ecModel.clearColorPalette();
	        ecModel.eachSeries(function (seriesModel) {
	            seriesModel.clearColorPalette();
	        });
	        each(visualFuncs, function (visual) {
	            visual.func(ecModel, api, payload);
	        });
	    }

	    /**
	     * Render each chart and component
	     * @private
	     */
	    function doRender(ecModel, payload) {
	        var api = this._api;
	        // Render all components
	        each(this._componentsViews, function (componentView) {
	            var componentModel = componentView.__model;
	            componentView.render(componentModel, ecModel, api, payload);

	            updateZ(componentModel, componentView);
	        }, this);

	        each(this._chartsViews, function (chart) {
	            chart.__alive = false;
	        }, this);

	        var elCountAll = 0;
	        // Render all charts
	        ecModel.eachSeries(function (seriesModel, idx) {
	            var chartView = this._chartsMap[seriesModel.__viewId];
	            chartView.__alive = true;
	            chartView.render(seriesModel, ecModel, api, payload);

	            chartView.group.silent = !!seriesModel.get('silent');

	            updateZ(seriesModel, chartView);

	            // Progressive configuration
	            var elCount = 0;
	            chartView.group.traverse(function (el) {
	                if (el.type !== 'group' && !el.ignore) {
	                    elCount++;
	                }
	            });
	            elCountAll += elCount;

	            var frameDrawNum = +seriesModel.get('progressive');
	            var needProgressive = elCount > seriesModel.get('progressiveThreshold') && frameDrawNum && !env.node;
	            if (needProgressive) {
	                chartView.group.traverse(function (el) {
	                    // FIXME marker and other components
	                    if (!el.isGroup) {
	                        el.progressive = needProgressive ?
	                            Math.floor(elCount++ / frameDrawNum) : -1;
	                        if (needProgressive) {
	                            el.stopAnimation(true);
	                        }
	                    }
	                });
	            }

	            // Blend configration
	            var blendMode = seriesModel.get('blendMode');
	            if (true) {
	                if (!env.canvasSupported && blendMode && blendMode !== 'source-over') {
	                    console.warn('Only canvas support blendMode');
	                }
	            }
	            if (blendMode) {
	                chartView.group.traverse(function (el) {
	                    // FIXME marker and other components
	                    if (!el.isGroup) {
	                        el.setStyle('blend', blendMode);
	                    }
	                });
	            }
	        }, this);

	        // If use hover layer
	        if (elCountAll > ecModel.get('hoverLayerThreshold') && !env.node) {
	            this._zr.storage.traverse(function (el) {
	                if (!el.isGroup) {
	                    el.useHoverLayer = true;
	                }
	            });
	        }
	        // Remove groups of unrendered charts
	        each(this._chartsViews, function (chart) {
	            if (!chart.__alive) {
	                chart.remove(ecModel, api);
	            }
	        }, this);
	    }

	    var MOUSE_EVENT_NAMES = [
	        'click', 'dblclick', 'mouseover', 'mouseout', 'mousedown', 'mouseup', 'globalout'
	    ];
	    /**
	     * @private
	     */
	    echartsProto._initEvents = function () {
	        each(MOUSE_EVENT_NAMES, function (eveName) {
	            this._zr.on(eveName, function (e) {
	                var ecModel = this.getModel();
	                var el = e.target;
	                if (el && el.dataIndex != null) {
	                    var dataModel = el.dataModel || ecModel.getSeriesByIndex(el.seriesIndex);
	                    var params = dataModel && dataModel.getDataParams(el.dataIndex, el.dataType) || {};
	                    params.event = e;
	                    params.type = eveName;
	                    this.trigger(eveName, params);
	                }
	                // If element has custom eventData of components
	                else if (el && el.eventData) {
	                    this.trigger(eveName, el.eventData);
	                }
	            }, this);
	        }, this);

	        each(eventActionMap, function (actionType, eventType) {
	            this._messageCenter.on(eventType, function (event) {
	                this.trigger(eventType, event);
	            }, this);
	        }, this);
	    };

	    /**
	     * @return {boolean}
	     */
	    echartsProto.isDisposed = function () {
	        return this._disposed;
	    };

	    /**
	     * Clear
	     */
	    echartsProto.clear = function () {
	        this.setOption({}, true);
	    };
	    /**
	     * Dispose instance
	     */
	    echartsProto.dispose = function () {
	        if (this._disposed) {
	            if (true) {
	                console.warn('Instance ' + this.id + ' has been disposed');
	            }
	            return;
	        }
	        this._disposed = true;

	        var api = this._api;
	        var ecModel = this._model;

	        each(this._componentsViews, function (component) {
	            component.dispose(ecModel, api);
	        });
	        each(this._chartsViews, function (chart) {
	            chart.dispose(ecModel, api);
	        });

	        // Dispose after all views disposed
	        this._zr.dispose();

	        delete instances[this.id];
	    };

	    zrUtil.mixin(ECharts, Eventful);

	    /**
	     * @param {module:echarts/model/Series|module:echarts/model/Component} model
	     * @param {module:echarts/view/Component|module:echarts/view/Chart} view
	     * @return {string}
	     */
	    function updateZ(model, view) {
	        var z = model.get('z');
	        var zlevel = model.get('zlevel');
	        // Set z and zlevel
	        view.group.traverse(function (el) {
	            if (el.type !== 'group') {
	                z != null && (el.z = z);
	                zlevel != null && (el.zlevel = zlevel);
	            }
	        });
	    }
	    /**
	     * @type {Array.<Function>}
	     * @inner
	     */
	    var actions = [];

	    /**
	     * Map eventType to actionType
	     * @type {Object}
	     */
	    var eventActionMap = {};

	    /**
	     * Data processor functions of each stage
	     * @type {Array.<Object.<string, Function>>}
	     * @inner
	     */
	    var dataProcessorFuncs = [];

	    /**
	     * @type {Array.<Function>}
	     * @inner
	     */
	    var optionPreprocessorFuncs = [];

	    /**
	     * Visual encoding functions of each stage
	     * @type {Array.<Object.<string, Function>>}
	     * @inner
	     */
	    var visualFuncs = [];
	    /**
	     * Theme storage
	     * @type {Object.<key, Object>}
	     */
	    var themeStorage = {};


	    var instances = {};
	    var connectedGroups = {};

	    var idBase = new Date() - 0;
	    var groupIdBase = new Date() - 0;
	    var DOM_ATTRIBUTE_KEY = '_echarts_instance_';
	    /**
	     * @alias module:echarts
	     */
	    var echarts = {
	        /**
	         * @type {number}
	         */
	        version: '3.1.10',
	        dependencies: {
	            zrender: '3.1.0'
	        }
	    };

	    function enableConnect(chart) {

	        var STATUS_PENDING = 0;
	        var STATUS_UPDATING = 1;
	        var STATUS_UPDATED = 2;
	        var STATUS_KEY = '__connectUpdateStatus';
	        function updateConnectedChartsStatus(charts, status) {
	            for (var i = 0; i < charts.length; i++) {
	                var otherChart = charts[i];
	                otherChart[STATUS_KEY] = status;
	            }
	        }
	        zrUtil.each(eventActionMap, function (actionType, eventType) {
	            chart._messageCenter.on(eventType, function (event) {
	                if (connectedGroups[chart.group] && chart[STATUS_KEY] !== STATUS_PENDING) {
	                    var action = chart.makeActionFromEvent(event);
	                    var otherCharts = [];
	                    for (var id in instances) {
	                        var otherChart = instances[id];
	                        if (otherChart !== chart && otherChart.group === chart.group) {
	                            otherCharts.push(otherChart);
	                        }
	                    }
	                    updateConnectedChartsStatus(otherCharts, STATUS_PENDING);
	                    each(otherCharts, function (otherChart) {
	                        if (otherChart[STATUS_KEY] !== STATUS_UPDATING) {
	                            otherChart.dispatchAction(action);
	                        }
	                    });
	                    updateConnectedChartsStatus(otherCharts, STATUS_UPDATED);
	                }
	            });
	        });

	    }
	    /**
	     * @param {HTMLDomElement} dom
	     * @param {Object} [theme]
	     * @param {Object} opts
	     */
	    echarts.init = function (dom, theme, opts) {
	        if (true) {
	            // Check version
	            if ((zrender.version.replace('.', '') - 0) < (echarts.dependencies.zrender.replace('.', '') - 0)) {
	                throw new Error(
	                    'ZRender ' + zrender.version
	                    + ' is too old for ECharts ' + echarts.version
	                    + '. Current version need ZRender '
	                    + echarts.dependencies.zrender + '+'
	                );
	            }
	            if (!dom) {
	                throw new Error('Initialize failed: invalid dom.');
	            }
	            if (zrUtil.isDom(dom) && dom.nodeName.toUpperCase() !== 'CANVAS' && (!dom.clientWidth || !dom.clientHeight)) {
	                console.warn('Can\'t get dom width or height');
	            }
	        }

	        var chart = new ECharts(dom, theme, opts);
	        chart.id = 'ec_' + idBase++;
	        instances[chart.id] = chart;

	        dom.setAttribute &&
	            dom.setAttribute(DOM_ATTRIBUTE_KEY, chart.id);

	        enableConnect(chart);

	        return chart;
	    };

	    /**
	     * @return {string|Array.<module:echarts~ECharts>} groupId
	     */
	    echarts.connect = function (groupId) {
	        // Is array of charts
	        if (zrUtil.isArray(groupId)) {
	            var charts = groupId;
	            groupId = null;
	            // If any chart has group
	            zrUtil.each(charts, function (chart) {
	                if (chart.group != null) {
	                    groupId = chart.group;
	                }
	            });
	            groupId = groupId || ('g_' + groupIdBase++);
	            zrUtil.each(charts, function (chart) {
	                chart.group = groupId;
	            });
	        }
	        connectedGroups[groupId] = true;
	        return groupId;
	    };

	    /**
	     * @return {string} groupId
	     */
	    echarts.disConnect = function (groupId) {
	        connectedGroups[groupId] = false;
	    };

	    /**
	     * Dispose a chart instance
	     * @param  {module:echarts~ECharts|HTMLDomElement|string} chart
	     */
	    echarts.dispose = function (chart) {
	        if (zrUtil.isDom(chart)) {
	            chart = echarts.getInstanceByDom(chart);
	        }
	        else if (typeof chart === 'string') {
	            chart = instances[chart];
	        }
	        if ((chart instanceof ECharts) && !chart.isDisposed()) {
	            chart.dispose();
	        }
	    };

	    /**
	     * @param  {HTMLDomElement} dom
	     * @return {echarts~ECharts}
	     */
	    echarts.getInstanceByDom = function (dom) {
	        var key = dom.getAttribute(DOM_ATTRIBUTE_KEY);
	        return instances[key];
	    };
	    /**
	     * @param {string} key
	     * @return {echarts~ECharts}
	     */
	    echarts.getInstanceById = function (key) {
	        return instances[key];
	    };

	    /**
	     * Register theme
	     */
	    echarts.registerTheme = function (name, theme) {
	        themeStorage[name] = theme;
	    };

	    /**
	     * Register option preprocessor
	     * @param {Function} preprocessorFunc
	     */
	    echarts.registerPreprocessor = function (preprocessorFunc) {
	        optionPreprocessorFuncs.push(preprocessorFunc);
	    };

	    /**
	     * @param {number} [priority=1000]
	     * @param {Function} processorFunc
	     */
	    echarts.registerProcessor = function (priority, processorFunc) {
	        if (typeof priority === 'function') {
	            processorFunc = priority;
	            priority = PRIORITY_PROCESSOR_FILTER;
	        }
	        if (true) {
	            if (isNaN(priority)) {
	                throw new Error('Unkown processor priority');
	            }
	        }
	        dataProcessorFuncs.push({
	            prio: priority,
	            func: processorFunc
	        });
	    };

	    /**
	     * Usage:
	     * registerAction('someAction', 'someEvent', function () { ... });
	     * registerAction('someAction', function () { ... });
	     * registerAction(
	     *     {type: 'someAction', event: 'someEvent', update: 'updateView'},
	     *     function () { ... }
	     * );
	     *
	     * @param {(string|Object)} actionInfo
	     * @param {string} actionInfo.type
	     * @param {string} [actionInfo.event]
	     * @param {string} [actionInfo.update]
	     * @param {string} [eventName]
	     * @param {Function} action
	     */
	    echarts.registerAction = function (actionInfo, eventName, action) {
	        if (typeof eventName === 'function') {
	            action = eventName;
	            eventName = '';
	        }
	        var actionType = zrUtil.isObject(actionInfo)
	            ? actionInfo.type
	            : ([actionInfo, actionInfo = {
	                event: eventName
	            }][0]);

	        // Event name is all lowercase
	        actionInfo.event = (actionInfo.event || actionType).toLowerCase();
	        eventName = actionInfo.event;

	        if (!actions[actionType]) {
	            actions[actionType] = {action: action, actionInfo: actionInfo};
	        }
	        eventActionMap[eventName] = actionType;
	    };

	    /**
	     * @param {string} type
	     * @param {*} CoordinateSystem
	     */
	    echarts.registerCoordinateSystem = function (type, CoordinateSystem) {
	        CoordinateSystemManager.register(type, CoordinateSystem);
	    };

	    /**
	     * Layout is a special stage of visual encoding
	     * Most visual encoding like color are common for different chart
	     * But each chart has it's own layout algorithm
	     *
	     * @param {string} [priority=1000]
	     * @param {Function} layoutFunc
	     */
	    echarts.registerLayout = function (priority, layoutFunc) {
	        if (typeof priority === 'function') {
	            layoutFunc = priority;
	            priority = PRIORITY_VISUAL_LAYOUT;
	        }
	        if (true) {
	            if (isNaN(priority)) {
	                throw new Error('Unkown layout priority');
	            }
	        }
	        visualFuncs.push({
	            prio: priority,
	            func: layoutFunc,
	            isLayout: true
	        });
	    };

	    /**
	     * @param {string} [priority=3000]
	     * @param {Function} visualFunc
	     */
	    echarts.registerVisual = function (priority, visualFunc) {
	        if (typeof priority === 'function') {
	            visualFunc = priority;
	            priority = PRIORITY_VISUAL_CHART;
	        }
	        if (true) {
	            if (isNaN(priority)) {
	                throw new Error('Unkown visual priority');
	            }
	        }
	        visualFuncs.push({
	            prio: priority,
	            func: visualFunc
	        });
	    };

	    /**
	     * @param {Object} opts
	     */
	    echarts.extendChartView = function (opts) {
	        return ChartView.extend(opts);
	    };

	    /**
	     * @param {Object} opts
	     */
	    echarts.extendComponentModel = function (opts) {
	        return ComponentModel.extend(opts);
	    };

	    /**
	     * @param {Object} opts
	     */
	    echarts.extendSeriesModel = function (opts) {
	        return SeriesModel.extend(opts);
	    };

	    /**
	     * @param {Object} opts
	     */
	    echarts.extendComponentView = function (opts) {
	        return ComponentView.extend(opts);
	    };

	    /**
	     * ZRender need a canvas context to do measureText.
	     * But in node environment canvas may be created by node-canvas.
	     * So we need to specify how to create a canvas instead of using document.createElement('canvas')
	     *
	     * Be careful of using it in the browser.
	     *
	     * @param {Function} creator
	     * @example
	     *     var Canvas = require('canvas');
	     *     var echarts = require('echarts');
	     *     echarts.setCanvasCreator(function () {
	     *         // Small size is enough.
	     *         return new Canvas(32, 32);
	     *     });
	     */
	    echarts.setCanvasCreator = function (creator) {
	        zrUtil.createCanvas = creator;
	    };

	    echarts.registerVisual(PRIORITY_VISUAL_GLOBAL, __webpack_require__(27));
	    echarts.registerPreprocessor(__webpack_require__(28));

	    // Default action
	    echarts.registerAction({
	        type: 'highlight',
	        event: 'highlight',
	        update: 'highlight'
	    }, zrUtil.noop);
	    echarts.registerAction({
	        type: 'downplay',
	        event: 'downplay',
	        update: 'downplay'
	    }, zrUtil.noop);


	    // --------
	    // Exports
	    // --------
	    //
	    echarts.List = __webpack_require__(30);
	    echarts.Model = __webpack_require__(6);

	    echarts.graphic = __webpack_require__(25);
	    echarts.number = __webpack_require__(5);
	    echarts.format = __webpack_require__(4);
	    echarts.matrix = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/matrix\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    echarts.vector = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/vector\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    echarts.color = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/tool/color\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    echarts.util = {};
	    each([
	            'map', 'each', 'filter', 'indexOf', 'inherits',
	            'reduce', 'filter', 'bind', 'curry', 'isArray',
	            'isString', 'isObject', 'isFunction', 'extend', 'defaults'
	        ],
	        function (name) {
	            echarts.util[name] = zrUtil[name];
	        }
	    );

	    // PRIORITY
	    echarts.PRIORITY = {
	        PROCESSOR: {
	            FILTER: PRIORITY_PROCESSOR_FILTER,
	            STATISTIC: PRIORITY_PROCESSOR_STATISTIC
	        },
	        VISUAL: {
	            LAYOUT: PRIORITY_VISUAL_LAYOUT,
	            GLOBAL: PRIORITY_VISUAL_GLOBAL,
	            CHART: PRIORITY_VISUAL_CHART,
	            COMPONENT: PRIORITY_VISUAL_COMPONENT,
	            BRUSH: PRIORITY_VISUAL_BRUSH
	        }
	    };

	    return echarts;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * ECharts global model
	 *
	 * @module {echarts/model/Global}
	 *
	 */

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var modelUtil = __webpack_require__(3);
	    var Model = __webpack_require__(6);
	    var each = zrUtil.each;
	    var filter = zrUtil.filter;
	    var map = zrUtil.map;
	    var isArray = zrUtil.isArray;
	    var indexOf = zrUtil.indexOf;
	    var isObject = zrUtil.isObject;

	    var ComponentModel = __webpack_require__(13);

	    var globalDefault = __webpack_require__(17);

	    var OPTION_INNER_KEY = '\0_ec_inner';

	    /**
	     * @alias module:echarts/model/Global
	     *
	     * @param {Object} option
	     * @param {module:echarts/model/Model} parentModel
	     * @param {Object} theme
	     */
	    var GlobalModel = Model.extend({

	        constructor: GlobalModel,

	        init: function (option, parentModel, theme, optionManager) {
	            theme = theme || {};

	            this.option = null; // Mark as not initialized.

	            /**
	             * @type {module:echarts/model/Model}
	             * @private
	             */
	            this._theme = new Model(theme);

	            /**
	             * @type {module:echarts/model/OptionManager}
	             */
	            this._optionManager = optionManager;
	        },

	        setOption: function (option, optionPreprocessorFuncs) {
	            zrUtil.assert(
	                !(OPTION_INNER_KEY in option),
	                'please use chart.getOption()'
	            );

	            this._optionManager.setOption(option, optionPreprocessorFuncs);

	            this.resetOption();
	        },

	        /**
	         * @param {string} type null/undefined: reset all.
	         *                      'recreate': force recreate all.
	         *                      'timeline': only reset timeline option
	         *                      'media': only reset media query option
	         * @return {boolean} Whether option changed.
	         */
	        resetOption: function (type) {
	            var optionChanged = false;
	            var optionManager = this._optionManager;

	            if (!type || type === 'recreate') {
	                var baseOption = optionManager.mountOption(type === 'recreate');

	                if (!this.option || type === 'recreate') {
	                    initBase.call(this, baseOption);
	                }
	                else {
	                    this.restoreData();
	                    this.mergeOption(baseOption);
	                }
	                optionChanged = true;
	            }

	            if (type === 'timeline' || type === 'media') {
	                this.restoreData();
	            }

	            if (!type || type === 'recreate' || type === 'timeline') {
	                var timelineOption = optionManager.getTimelineOption(this);
	                timelineOption && (this.mergeOption(timelineOption), optionChanged = true);
	            }

	            if (!type || type === 'recreate' || type === 'media') {
	                var mediaOptions = optionManager.getMediaOption(this, this._api);
	                if (mediaOptions.length) {
	                    each(mediaOptions, function (mediaOption) {
	                        this.mergeOption(mediaOption, optionChanged = true);
	                    }, this);
	                }
	            }

	            return optionChanged;
	        },

	        /**
	         * @protected
	         */
	        mergeOption: function (newOption) {
	            var option = this.option;
	            var componentsMap = this._componentsMap;
	            var newCptTypes = [];

	            // 如果不存在对应的 component model 则直接 merge
	            each(newOption, function (componentOption, mainType) {
	                if (componentOption == null) {
	                    return;
	                }

	                if (!ComponentModel.hasClass(mainType)) {
	                    option[mainType] = option[mainType] == null
	                        ? zrUtil.clone(componentOption)
	                        : zrUtil.merge(option[mainType], componentOption, true);
	                }
	                else {
	                    newCptTypes.push(mainType);
	                }
	            });

	            // FIXME OPTION 同步是否要改回原来的
	            ComponentModel.topologicalTravel(
	                newCptTypes, ComponentModel.getAllClassMainTypes(), visitComponent, this
	            );

	            function visitComponent(mainType, dependencies) {
	                var newCptOptionList = modelUtil.normalizeToArray(newOption[mainType]);

	                var mapResult = modelUtil.mappingToExists(
	                    componentsMap[mainType], newCptOptionList
	                );

	                makeKeyInfo(mainType, mapResult);

	                var dependentModels = getComponentsByTypes(
	                    componentsMap, dependencies
	                );

	                option[mainType] = [];
	                componentsMap[mainType] = [];

	                each(mapResult, function (resultItem, index) {
	                    var componentModel = resultItem.exist;
	                    var newCptOption = resultItem.option;

	                    zrUtil.assert(
	                        isObject(newCptOption) || componentModel,
	                        'Empty component definition'
	                    );

	                    // Consider where is no new option and should be merged using {},
	                    // see removeEdgeAndAdd in topologicalTravel and
	                    // ComponentModel.getAllClassMainTypes.
	                    if (!newCptOption) {
	                        componentModel.mergeOption({}, this);
	                        componentModel.optionUpdated({}, false);
	                    }
	                    else {
	                        var ComponentModelClass = ComponentModel.getClass(
	                            mainType, resultItem.keyInfo.subType, true
	                        );

	                        if (componentModel && componentModel instanceof ComponentModelClass) {
	                            componentModel.mergeOption(newCptOption, this);
	                            componentModel.optionUpdated(newCptOption, false);
	                        }
	                        else {
	                            // PENDING Global as parent ?
	                            componentModel = new ComponentModelClass(
	                                newCptOption, this, this,
	                                zrUtil.extend(
	                                    {
	                                        dependentModels: dependentModels,
	                                        componentIndex: index
	                                    },
	                                    resultItem.keyInfo
	                                )
	                            );
	                            // Call optionUpdated after init.
	                            // newCptOption has been used as componentModel.option
	                            // and may be merged with theme and default, so pass null
	                            // to avoid confusion.
	                            componentModel.optionUpdated(null, true);
	                        }
	                    }

	                    componentsMap[mainType][index] = componentModel;
	                    option[mainType][index] = componentModel.option;
	                }, this);

	                // Backup series for filtering.
	                if (mainType === 'series') {
	                    this._seriesIndices = createSeriesIndices(componentsMap.series);
	                }
	            }
	        },

	        /**
	         * Get option for output (cloned option and inner info removed)
	         * @public
	         * @return {Object}
	         */
	        getOption: function () {
	            var option = zrUtil.clone(this.option);

	            each(option, function (opts, mainType) {
	                if (ComponentModel.hasClass(mainType)) {
	                    var opts = modelUtil.normalizeToArray(opts);
	                    for (var i = opts.length - 1; i >= 0; i--) {
	                        // Remove options with inner id.
	                        if (modelUtil.isIdInner(opts[i])) {
	                            opts.splice(i, 1);
	                        }
	                    }
	                    option[mainType] = opts;
	                }
	            });

	            delete option[OPTION_INNER_KEY];

	            return option;
	        },

	        /**
	         * @return {module:echarts/model/Model}
	         */
	        getTheme: function () {
	            return this._theme;
	        },

	        /**
	         * @param {string} mainType
	         * @param {number} [idx=0]
	         * @return {module:echarts/model/Component}
	         */
	        getComponent: function (mainType, idx) {
	            var list = this._componentsMap[mainType];
	            if (list) {
	                return list[idx || 0];
	            }
	        },

	        /**
	         * @param {Object} condition
	         * @param {string} condition.mainType
	         * @param {string} [condition.subType] If ignore, only query by mainType
	         * @param {number} [condition.index] Either input index or id or name.
	         * @param {string} [condition.id] Either input index or id or name.
	         * @param {string} [condition.name] Either input index or id or name.
	         * @return {Array.<module:echarts/model/Component>}
	         */
	        queryComponents: function (condition) {
	            var mainType = condition.mainType;
	            if (!mainType) {
	                return [];
	            }

	            var index = condition.index;
	            var id = condition.id;
	            var name = condition.name;

	            var cpts = this._componentsMap[mainType];

	            if (!cpts || !cpts.length) {
	                return [];
	            }

	            var result;

	            if (index != null) {
	                if (!isArray(index)) {
	                    index = [index];
	                }
	                result = filter(map(index, function (idx) {
	                    return cpts[idx];
	                }), function (val) {
	                    return !!val;
	                });
	            }
	            else if (id != null) {
	                var isIdArray = isArray(id);
	                result = filter(cpts, function (cpt) {
	                    return (isIdArray && indexOf(id, cpt.id) >= 0)
	                        || (!isIdArray && cpt.id === id);
	                });
	            }
	            else if (name != null) {
	                var isNameArray = isArray(name);
	                result = filter(cpts, function (cpt) {
	                    return (isNameArray && indexOf(name, cpt.name) >= 0)
	                        || (!isNameArray && cpt.name === name);
	                });
	            }

	            return filterBySubType(result, condition);
	        },

	        /**
	         * The interface is different from queryComponents,
	         * which is convenient for inner usage.
	         *
	         * @usage
	         * var result = findComponents(
	         *     {mainType: 'dataZoom', query: {dataZoomId: 'abc'}}
	         * );
	         * var result = findComponents(
	         *     {mainType: 'series', subType: 'pie', query: {seriesName: 'uio'}}
	         * );
	         * var result = findComponents(
	         *     {mainType: 'series'},
	         *     function (model, index) {...}
	         * );
	         * // result like [component0, componnet1, ...]
	         *
	         * @param {Object} condition
	         * @param {string} condition.mainType Mandatory.
	         * @param {string} [condition.subType] Optional.
	         * @param {Object} [condition.query] like {xxxIndex, xxxId, xxxName},
	         *        where xxx is mainType.
	         *        If query attribute is null/undefined or has no index/id/name,
	         *        do not filtering by query conditions, which is convenient for
	         *        no-payload situations or when target of action is global.
	         * @param {Function} [condition.filter] parameter: component, return boolean.
	         * @return {Array.<module:echarts/model/Component>}
	         */
	        findComponents: function (condition) {
	            var query = condition.query;
	            var mainType = condition.mainType;

	            var queryCond = getQueryCond(query);
	            var result = queryCond
	                ? this.queryComponents(queryCond)
	                : this._componentsMap[mainType];

	            return doFilter(filterBySubType(result, condition));

	            function getQueryCond(q) {
	                var indexAttr = mainType + 'Index';
	                var idAttr = mainType + 'Id';
	                var nameAttr = mainType + 'Name';
	                return q && (
	                        q.hasOwnProperty(indexAttr)
	                        || q.hasOwnProperty(idAttr)
	                        || q.hasOwnProperty(nameAttr)
	                    )
	                    ? {
	                        mainType: mainType,
	                        // subType will be filtered finally.
	                        index: q[indexAttr],
	                        id: q[idAttr],
	                        name: q[nameAttr]
	                    }
	                    : null;
	            }

	            function doFilter(res) {
	                return condition.filter
	                     ? filter(res, condition.filter)
	                     : res;
	            }
	        },

	        /**
	         * @usage
	         * eachComponent('legend', function (legendModel, index) {
	         *     ...
	         * });
	         * eachComponent(function (componentType, model, index) {
	         *     // componentType does not include subType
	         *     // (componentType is 'xxx' but not 'xxx.aa')
	         * });
	         * eachComponent(
	         *     {mainType: 'dataZoom', query: {dataZoomId: 'abc'}},
	         *     function (model, index) {...}
	         * );
	         * eachComponent(
	         *     {mainType: 'series', subType: 'pie', query: {seriesName: 'uio'}},
	         *     function (model, index) {...}
	         * );
	         *
	         * @param {string|Object=} mainType When mainType is object, the definition
	         *                                  is the same as the method 'findComponents'.
	         * @param {Function} cb
	         * @param {*} context
	         */
	        eachComponent: function (mainType, cb, context) {
	            var componentsMap = this._componentsMap;

	            if (typeof mainType === 'function') {
	                context = cb;
	                cb = mainType;
	                each(componentsMap, function (components, componentType) {
	                    each(components, function (component, index) {
	                        cb.call(context, componentType, component, index);
	                    });
	                });
	            }
	            else if (zrUtil.isString(mainType)) {
	                each(componentsMap[mainType], cb, context);
	            }
	            else if (isObject(mainType)) {
	                var queryResult = this.findComponents(mainType);
	                each(queryResult, cb, context);
	            }
	        },

	        /**
	         * @param {string} name
	         * @return {Array.<module:echarts/model/Series>}
	         */
	        getSeriesByName: function (name) {
	            var series = this._componentsMap.series;
	            return filter(series, function (oneSeries) {
	                return oneSeries.name === name;
	            });
	        },

	        /**
	         * @param {number} seriesIndex
	         * @return {module:echarts/model/Series}
	         */
	        getSeriesByIndex: function (seriesIndex) {
	            return this._componentsMap.series[seriesIndex];
	        },

	        /**
	         * @param {string} subType
	         * @return {Array.<module:echarts/model/Series>}
	         */
	        getSeriesByType: function (subType) {
	            var series = this._componentsMap.series;
	            return filter(series, function (oneSeries) {
	                return oneSeries.subType === subType;
	            });
	        },

	        /**
	         * @return {Array.<module:echarts/model/Series>}
	         */
	        getSeries: function () {
	            return this._componentsMap.series.slice();
	        },

	        /**
	         * After filtering, series may be different
	         * frome raw series.
	         *
	         * @param {Function} cb
	         * @param {*} context
	         */
	        eachSeries: function (cb, context) {
	            assertSeriesInitialized(this);
	            each(this._seriesIndices, function (rawSeriesIndex) {
	                var series = this._componentsMap.series[rawSeriesIndex];
	                cb.call(context, series, rawSeriesIndex);
	            }, this);
	        },

	        /**
	         * Iterate raw series before filtered.
	         *
	         * @param {Function} cb
	         * @param {*} context
	         */
	        eachRawSeries: function (cb, context) {
	            each(this._componentsMap.series, cb, context);
	        },

	        /**
	         * After filtering, series may be different.
	         * frome raw series.
	         *
	         * @parma {string} subType
	         * @param {Function} cb
	         * @param {*} context
	         */
	        eachSeriesByType: function (subType, cb, context) {
	            assertSeriesInitialized(this);
	            each(this._seriesIndices, function (rawSeriesIndex) {
	                var series = this._componentsMap.series[rawSeriesIndex];
	                if (series.subType === subType) {
	                    cb.call(context, series, rawSeriesIndex);
	                }
	            }, this);
	        },

	        /**
	         * Iterate raw series before filtered of given type.
	         *
	         * @parma {string} subType
	         * @param {Function} cb
	         * @param {*} context
	         */
	        eachRawSeriesByType: function (subType, cb, context) {
	            return each(this.getSeriesByType(subType), cb, context);
	        },

	        /**
	         * @param {module:echarts/model/Series} seriesModel
	         */
	        isSeriesFiltered: function (seriesModel) {
	            assertSeriesInitialized(this);
	            return zrUtil.indexOf(this._seriesIndices, seriesModel.componentIndex) < 0;
	        },

	        /**
	         * @param {Function} cb
	         * @param {*} context
	         */
	        filterSeries: function (cb, context) {
	            assertSeriesInitialized(this);
	            var filteredSeries = filter(
	                this._componentsMap.series, cb, context
	            );
	            this._seriesIndices = createSeriesIndices(filteredSeries);
	        },

	        restoreData: function () {
	            var componentsMap = this._componentsMap;

	            this._seriesIndices = createSeriesIndices(componentsMap.series);

	            var componentTypes = [];
	            each(componentsMap, function (components, componentType) {
	                componentTypes.push(componentType);
	            });

	            ComponentModel.topologicalTravel(
	                componentTypes,
	                ComponentModel.getAllClassMainTypes(),
	                function (componentType, dependencies) {
	                    each(componentsMap[componentType], function (component) {
	                        component.restoreData();
	                    });
	                }
	            );
	        }

	    });

	    /**
	     * @inner
	     */
	    function mergeTheme(option, theme) {
	        for (var name in theme) {
	            // 如果有 component model 则把具体的 merge 逻辑交给该 model 处理
	            if (!ComponentModel.hasClass(name)) {
	                if (typeof theme[name] === 'object') {
	                    option[name] = !option[name]
	                        ? zrUtil.clone(theme[name])
	                        : zrUtil.merge(option[name], theme[name], false);
	                }
	                else {
	                    if (option[name] == null) {
	                        option[name] = theme[name];
	                    }
	                }
	            }
	        }
	    }

	    function initBase(baseOption) {
	        baseOption = baseOption;

	        // Using OPTION_INNER_KEY to mark that this option can not be used outside,
	        // i.e. `chart.setOption(chart.getModel().option);` is forbiden.
	        this.option = {};
	        this.option[OPTION_INNER_KEY] = 1;

	        /**
	         * @type {Object.<string, Array.<module:echarts/model/Model>>}
	         * @private
	         */
	        this._componentsMap = {};

	        /**
	         * Mapping between filtered series list and raw series list.
	         * key: filtered series indices, value: raw series indices.
	         * @type {Array.<nubmer>}
	         * @private
	         */
	        this._seriesIndices = null;

	        mergeTheme(baseOption, this._theme.option);

	        // TODO Needs clone when merging to the unexisted property
	        zrUtil.merge(baseOption, globalDefault, false);

	        this.mergeOption(baseOption);
	    }

	    /**
	     * @inner
	     * @param {Array.<string>|string} types model types
	     * @return {Object} key: {string} type, value: {Array.<Object>} models
	     */
	    function getComponentsByTypes(componentsMap, types) {
	        if (!zrUtil.isArray(types)) {
	            types = types ? [types] : [];
	        }

	        var ret = {};
	        each(types, function (type) {
	            ret[type] = (componentsMap[type] || []).slice();
	        });

	        return ret;
	    }

	    /**
	     * @inner
	     */
	    function makeKeyInfo(mainType, mapResult) {
	        // We use this id to hash component models and view instances
	        // in echarts. id can be specified by user, or auto generated.

	        // The id generation rule ensures new view instance are able
	        // to mapped to old instance when setOption are called in
	        // no-merge mode. So we generate model id by name and plus
	        // type in view id.

	        // name can be duplicated among components, which is convenient
	        // to specify multi components (like series) by one name.

	        // Ensure that each id is distinct.
	        var idMap = {};

	        each(mapResult, function (item, index) {
	            var existCpt = item.exist;
	            existCpt && (idMap[existCpt.id] = item);
	        });

	        each(mapResult, function (item, index) {
	            var opt = item.option;

	            zrUtil.assert(
	                !opt || opt.id == null || !idMap[opt.id] || idMap[opt.id] === item,
	                'id duplicates: ' + (opt && opt.id)
	            );

	            opt && opt.id != null && (idMap[opt.id] = item);

	            // Complete subType
	            if (isObject(opt)) {
	                var subType = determineSubType(mainType, opt, item.exist);
	                item.keyInfo = {mainType: mainType, subType: subType};
	            }
	        });

	        // Make name and id.
	        each(mapResult, function (item, index) {
	            var existCpt = item.exist;
	            var opt = item.option;
	            var keyInfo = item.keyInfo;

	            if (!isObject(opt)) {
	                return;
	            }

	            // name can be overwitten. Consider case: axis.name = '20km'.
	            // But id generated by name will not be changed, which affect
	            // only in that case: setOption with 'not merge mode' and view
	            // instance will be recreated, which can be accepted.
	            keyInfo.name = opt.name != null
	                ? opt.name + ''
	                : existCpt
	                ? existCpt.name
	                : '\0-';

	            if (existCpt) {
	                keyInfo.id = existCpt.id;
	            }
	            else if (opt.id != null) {
	                keyInfo.id = opt.id + '';
	            }
	            else {
	                // Consider this situatoin:
	                //  optionA: [{name: 'a'}, {name: 'a'}, {..}]
	                //  optionB [{..}, {name: 'a'}, {name: 'a'}]
	                // Series with the same name between optionA and optionB
	                // should be mapped.
	                var idNum = 0;
	                do {
	                    keyInfo.id = '\0' + keyInfo.name + '\0' + idNum++;
	                }
	                while (idMap[keyInfo.id]);
	            }

	            idMap[keyInfo.id] = item;
	        });
	    }

	    /**
	     * @inner
	     */
	    function determineSubType(mainType, newCptOption, existComponent) {
	        var subType = newCptOption.type
	            ? newCptOption.type
	            : existComponent
	            ? existComponent.subType
	            // Use determineSubType only when there is no existComponent.
	            : ComponentModel.determineSubType(mainType, newCptOption);

	        // tooltip, markline, markpoint may always has no subType
	        return subType;
	    }

	    /**
	     * @inner
	     */
	    function createSeriesIndices(seriesModels) {
	        return map(seriesModels, function (series) {
	            return series.componentIndex;
	        }) || [];
	    }

	    /**
	     * @inner
	     */
	    function filterBySubType(components, condition) {
	        // Using hasOwnProperty for restrict. Consider
	        // subType is undefined in user payload.
	        return condition.hasOwnProperty('subType')
	            ? filter(components, function (cpt) {
	                return cpt.subType === condition.subType;
	            })
	            : components;
	    }

	    /**
	     * @inner
	     */
	    function assertSeriesInitialized(ecModel) {
	        // Components that use _seriesIndices should depends on series component,
	        // which make sure that their initialization is after series.
	        if (true) {
	            if (!ecModel._seriesIndices) {
	                throw new Error('Series has not been initialized yet.');
	            }
	        }
	    }

	    zrUtil.mixin(GlobalModel, __webpack_require__(18));

	    return GlobalModel;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {

	    var formatUtil = __webpack_require__(4);
	    var nubmerUtil = __webpack_require__(5);
	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    var AXIS_DIMS = ['x', 'y', 'z', 'radius', 'angle'];

	    var modelUtil = {};

	    /**
	     * Create "each" method to iterate names.
	     *
	     * @pubilc
	     * @param  {Array.<string>} names
	     * @param  {Array.<string>=} attrs
	     * @return {Function}
	     */
	    modelUtil.createNameEach = function (names, attrs) {
	        names = names.slice();
	        var capitalNames = zrUtil.map(names, modelUtil.capitalFirst);
	        attrs = (attrs || []).slice();
	        var capitalAttrs = zrUtil.map(attrs, modelUtil.capitalFirst);

	        return function (callback, context) {
	            zrUtil.each(names, function (name, index) {
	                var nameObj = {name: name, capital: capitalNames[index]};

	                for (var j = 0; j < attrs.length; j++) {
	                    nameObj[attrs[j]] = name + capitalAttrs[j];
	                }

	                callback.call(context, nameObj);
	            });
	        };
	    };

	    /**
	     * @public
	     */
	    modelUtil.capitalFirst = function (str) {
	        return str ? str.charAt(0).toUpperCase() + str.substr(1) : str;
	    };

	    /**
	     * Iterate each dimension name.
	     *
	     * @public
	     * @param {Function} callback The parameter is like:
	     *                            {
	     *                                name: 'angle',
	     *                                capital: 'Angle',
	     *                                axis: 'angleAxis',
	     *                                axisIndex: 'angleAixs',
	     *                                index: 'angleIndex'
	     *                            }
	     * @param {Object} context
	     */
	    modelUtil.eachAxisDim = modelUtil.createNameEach(AXIS_DIMS, ['axisIndex', 'axis', 'index']);

	    /**
	     * If value is not array, then translate it to array.
	     * @param  {*} value
	     * @return {Array} [value] or value
	     */
	    modelUtil.normalizeToArray = function (value) {
	        return value instanceof Array
	            ? value
	            : value == null
	            ? []
	            : [value];
	    };

	    /**
	     * If tow dataZoomModels has the same axis controlled, we say that they are 'linked'.
	     * dataZoomModels and 'links' make up one or more graphics.
	     * This function finds the graphic where the source dataZoomModel is in.
	     *
	     * @public
	     * @param {Function} forEachNode Node iterator.
	     * @param {Function} forEachEdgeType edgeType iterator
	     * @param {Function} edgeIdGetter Giving node and edgeType, return an array of edge id.
	     * @return {Function} Input: sourceNode, Output: Like {nodes: [], dims: {}}
	     */
	    modelUtil.createLinkedNodesFinder = function (forEachNode, forEachEdgeType, edgeIdGetter) {

	        return function (sourceNode) {
	            var result = {
	                nodes: [],
	                records: {} // key: edgeType.name, value: Object (key: edge id, value: boolean).
	            };

	            forEachEdgeType(function (edgeType) {
	                result.records[edgeType.name] = {};
	            });

	            if (!sourceNode) {
	                return result;
	            }

	            absorb(sourceNode, result);

	            var existsLink;
	            do {
	                existsLink = false;
	                forEachNode(processSingleNode);
	            }
	            while (existsLink);

	            function processSingleNode(node) {
	                if (!isNodeAbsorded(node, result) && isLinked(node, result)) {
	                    absorb(node, result);
	                    existsLink = true;
	                }
	            }

	            return result;
	        };

	        function isNodeAbsorded(node, result) {
	            return zrUtil.indexOf(result.nodes, node) >= 0;
	        }

	        function isLinked(node, result) {
	            var hasLink = false;
	            forEachEdgeType(function (edgeType) {
	                zrUtil.each(edgeIdGetter(node, edgeType) || [], function (edgeId) {
	                    result.records[edgeType.name][edgeId] && (hasLink = true);
	                });
	            });
	            return hasLink;
	        }

	        function absorb(node, result) {
	            result.nodes.push(node);
	            forEachEdgeType(function (edgeType) {
	                zrUtil.each(edgeIdGetter(node, edgeType) || [], function (edgeId) {
	                    result.records[edgeType.name][edgeId] = true;
	                });
	            });
	        }
	    };

	    /**
	     * Sync default option between normal and emphasis like `position` and `show`
	     * In case some one will write code like
	     *     label: {
	     *         normal: {
	     *             show: false,
	     *             position: 'outside',
	     *             textStyle: {
	     *                 fontSize: 18
	     *             }
	     *         },
	     *         emphasis: {
	     *             show: true
	     *         }
	     *     }
	     * @param {Object} opt
	     * @param {Array.<string>} subOpts
	     */
	     modelUtil.defaultEmphasis = function (opt, subOpts) {
	        if (opt) {
	            var emphasisOpt = opt.emphasis = opt.emphasis || {};
	            var normalOpt = opt.normal = opt.normal || {};

	            // Default emphasis option from normal
	            zrUtil.each(subOpts, function (subOptName) {
	                var val = zrUtil.retrieve(emphasisOpt[subOptName], normalOpt[subOptName]);
	                if (val != null) {
	                    emphasisOpt[subOptName] = val;
	                }
	            });
	        }
	    };

	    modelUtil.LABEL_OPTIONS = ['position', 'show', 'textStyle', 'distance', 'formatter'];

	    /**
	     * data could be [12, 2323, {value: 223}, [1221, 23], {value: [2, 23]}]
	     * This helper method retieves value from data.
	     * @param {string|number|Date|Array|Object} dataItem
	     * @return {number|string|Date|Array.<number|string|Date>}
	     */
	    modelUtil.getDataItemValue = function (dataItem) {
	        // Performance sensitive.
	        return dataItem && (dataItem.value == null ? dataItem : dataItem.value);
	    };

	    /**
	     * data could be [12, 2323, {value: 223}, [1221, 23], {value: [2, 23]}]
	     * This helper method determine if dataItem has extra option besides value
	     * @param {string|number|Date|Array|Object} dataItem
	     */
	    modelUtil.isDataItemOption = function (dataItem) {
	        return zrUtil.isObject(dataItem)
	            && !(dataItem instanceof Array);
	            // // markLine data can be array
	            // && !(dataItem[0] && zrUtil.isObject(dataItem[0]) && !(dataItem[0] instanceof Array));
	    };

	    /**
	     * This helper method convert value in data.
	     * @param {string|number|Date} value
	     * @param {Object|string} [dimInfo] If string (like 'x'), dimType defaults 'number'.
	     */
	    modelUtil.converDataValue = function (value, dimInfo) {
	        // Performance sensitive.
	        var dimType = dimInfo && dimInfo.type;
	        if (dimType === 'ordinal') {
	            return value;
	        }

	        if (dimType === 'time' && !isFinite(value) && value != null && value !== '-') {
	            value = +nubmerUtil.parseDate(value);
	        }

	        // dimType defaults 'number'.
	        // If dimType is not ordinal and value is null or undefined or NaN or '-',
	        // parse to NaN.
	        return (value == null || value === '')
	            ? NaN : +value; // If string (like '-'), using '+' parse to NaN
	    };

	    // PENDING A little ugly
	    modelUtil.dataFormatMixin = {
	        /**
	         * Get params for formatter
	         * @param {number} dataIndex
	         * @param {string} [dataType]
	         * @return {Object}
	         */
	        getDataParams: function (dataIndex, dataType) {
	            var data = this.getData(dataType);

	            var seriesIndex = this.seriesIndex;
	            var seriesName = this.name;

	            var rawValue = this.getRawValue(dataIndex, dataType);
	            var rawDataIndex = data.getRawIndex(dataIndex);
	            var name = data.getName(dataIndex, true);
	            var itemOpt = data.getRawDataItem(dataIndex);

	            return {
	                componentType: this.mainType,
	                componentSubType: this.subType,
	                seriesType: this.mainType === 'series' ? this.subType : null,
	                seriesIndex: seriesIndex,
	                seriesName: seriesName,
	                name: name,
	                dataIndex: rawDataIndex,
	                data: itemOpt,
	                dataType: dataType,
	                value: rawValue,
	                color: data.getItemVisual(dataIndex, 'color'),

	                // Param name list for mapping `a`, `b`, `c`, `d`, `e`
	                $vars: ['seriesName', 'name', 'value']
	            };
	        },

	        /**
	         * Format label
	         * @param {number} dataIndex
	         * @param {string} [status='normal'] 'normal' or 'emphasis'
	         * @param {string} [dataType]
	         * @param {number} [dimIndex]
	         * @return {string}
	         */
	        getFormattedLabel: function (dataIndex, status, dataType, dimIndex) {
	            status = status || 'normal';
	            var data = this.getData(dataType);
	            var itemModel = data.getItemModel(dataIndex);

	            var params = this.getDataParams(dataIndex, dataType);
	            if (dimIndex != null && (params.value instanceof Array)) {
	                params.value = params.value[dimIndex];
	            }

	            var formatter = itemModel.get(['label', status, 'formatter']);

	            if (typeof formatter === 'function') {
	                params.status = status;
	                return formatter(params);
	            }
	            else if (typeof formatter === 'string') {
	                return formatUtil.formatTpl(formatter, params);
	            }
	        },

	        /**
	         * Get raw value in option
	         * @param {number} idx
	         * @param {string} [dataType]
	         * @return {Object}
	         */
	        getRawValue: function (idx, dataType) {
	            var data = this.getData(dataType);
	            var dataItem = data.getRawDataItem(idx);
	            if (dataItem != null) {
	                return (zrUtil.isObject(dataItem) && !(dataItem instanceof Array))
	                    ? dataItem.value : dataItem;
	            }
	        },

	        /**
	         * Should be implemented.
	         * @param {number} dataIndex
	         * @param {boolean} [multipleSeries=false]
	         * @param {number} [dataType]
	         * @return {string} tooltip string
	         */
	        formatTooltip: zrUtil.noop
	    };

	    /**
	     * Mapping to exists for merge.
	     *
	     * @public
	     * @param {Array.<Object>|Array.<module:echarts/model/Component>} exists
	     * @param {Object|Array.<Object>} newCptOptions
	     * @return {Array.<Object>} Result, like [{exist: ..., option: ...}, {}],
	     *                          which order is the same as exists.
	     */
	    modelUtil.mappingToExists = function (exists, newCptOptions) {
	        // Mapping by the order by original option (but not order of
	        // new option) in merge mode. Because we should ensure
	        // some specified index (like xAxisIndex) is consistent with
	        // original option, which is easy to understand, espatially in
	        // media query. And in most case, merge option is used to
	        // update partial option but not be expected to change order.
	        newCptOptions = (newCptOptions || []).slice();

	        var result = zrUtil.map(exists || [], function (obj, index) {
	            return {exist: obj};
	        });

	        // Mapping by id or name if specified.
	        zrUtil.each(newCptOptions, function (cptOption, index) {
	            if (!zrUtil.isObject(cptOption)) {
	                return;
	            }

	            for (var i = 0; i < result.length; i++) {
	                var exist = result[i].exist;
	                if (!result[i].option // Consider name: two map to one.
	                    && (
	                        // id has highest priority.
	                        (cptOption.id != null && exist.id === cptOption.id + '')
	                        || (cptOption.name != null
	                            && !modelUtil.isIdInner(cptOption)
	                            && !modelUtil.isIdInner(exist)
	                            && exist.name === cptOption.name + ''
	                        )
	                    )
	                ) {
	                    result[i].option = cptOption;
	                    newCptOptions[index] = null;
	                    break;
	                }
	            }
	        });

	        // Otherwise mapping by index.
	        zrUtil.each(newCptOptions, function (cptOption, index) {
	            if (!zrUtil.isObject(cptOption)) {
	                return;
	            }

	            var i = 0;
	            for (; i < result.length; i++) {
	                var exist = result[i].exist;
	                if (!result[i].option
	                    && !modelUtil.isIdInner(exist)
	                    // Caution:
	                    // Do not overwrite id. But name can be overwritten,
	                    // because axis use name as 'show label text'.
	                    // 'exist' always has id and name and we dont
	                    // need to check it.
	                    && cptOption.id == null
	                ) {
	                    result[i].option = cptOption;
	                    break;
	                }
	            }

	            if (i >= result.length) {
	                result.push({option: cptOption});
	            }
	        });

	        return result;
	    };

	    /**
	     * @public
	     * @param {Object} cptOption
	     * @return {boolean}
	     */
	    modelUtil.isIdInner = function (cptOption) {
	        return zrUtil.isObject(cptOption)
	            && cptOption.id
	            && (cptOption.id + '').indexOf('\0_ec_\0') === 0;
	    };

	    /**
	     * A helper for removing duplicate items between batchA and batchB,
	     * and in themselves, and categorize by series.
	     *
	     * @param {Array.<Object>} batchA Like: [{seriesId: 2, dataIndex: [32, 4, 5]}, ...]
	     * @param {Array.<Object>} batchB Like: [{seriesId: 2, dataIndex: [32, 4, 5]}, ...]
	     * @return {Array.<Array.<Object>, Array.<Object>>} result: [resultBatchA, resultBatchB]
	     */
	    modelUtil.compressBatches = function (batchA, batchB) {
	        var mapA = {};
	        var mapB = {};

	        makeMap(batchA || [], mapA);
	        makeMap(batchB || [], mapB, mapA);

	        return [mapToArray(mapA), mapToArray(mapB)];

	        function makeMap(sourceBatch, map, otherMap) {
	            for (var i = 0, len = sourceBatch.length; i < len; i++) {
	                var seriesId = sourceBatch[i].seriesId;
	                var dataIndices = modelUtil.normalizeToArray(sourceBatch[i].dataIndex);
	                var otherDataIndices = otherMap && otherMap[seriesId];

	                for (var j = 0, lenj = dataIndices.length; j < lenj; j++) {
	                    var dataIndex = dataIndices[j];

	                    if (otherDataIndices && otherDataIndices[dataIndex]) {
	                        otherDataIndices[dataIndex] = null;
	                    }
	                    else {
	                        (map[seriesId] || (map[seriesId] = {}))[dataIndex] = 1;
	                    }
	                }
	            }
	        }

	        function mapToArray(map, isData) {
	            var result = [];
	            for (var i in map) {
	                if (map.hasOwnProperty(i) && map[i] != null) {
	                    if (isData) {
	                        result.push(+i);
	                    }
	                    else {
	                        var dataIndices = mapToArray(map[i], true);
	                        dataIndices.length && result.push({seriesId: i, dataIndex: dataIndices});
	                    }
	                };
	            }
	            return result;
	        }
	    };

	    return modelUtil;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var numberUtil = __webpack_require__(5);

	    /**
	     * 每三位默认加,格式化
	     * @type {string|number} x
	     */
	    function addCommas(x) {
	        if (isNaN(x)) {
	            return '-';
	        }
	        x = (x + '').split('.');
	        return x[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g,'$1,')
	               + (x.length > 1 ? ('.' + x[1]) : '');
	    }

	    /**
	     * @param {string} str
	     * @return {string} str
	     */
	    function toCamelCase(str) {
	        return str.toLowerCase().replace(/-(.)/g, function(match, group1) {
	            return group1.toUpperCase();
	        });
	    }

	    /**
	     * Normalize css liked array configuration
	     * e.g.
	     *  3 => [3, 3, 3, 3]
	     *  [4, 2] => [4, 2, 4, 2]
	     *  [4, 3, 2] => [4, 3, 2, 3]
	     * @param {number|Array.<number>} val
	     */
	    function normalizeCssArray(val) {
	        var len = val.length;
	        if (typeof (val) === 'number') {
	            return [val, val, val, val];
	        }
	        else if (len === 2) {
	            // vertical | horizontal
	            return [val[0], val[1], val[0], val[1]];
	        }
	        else if (len === 3) {
	            // top | horizontal | bottom
	            return [val[0], val[1], val[2], val[1]];
	        }
	        return val;
	    }

	    function encodeHTML(source) {
	        return String(source)
	            .replace(/&/g, '&amp;')
	            .replace(/</g, '&lt;')
	            .replace(/>/g, '&gt;')
	            .replace(/"/g, '&quot;')
	            .replace(/'/g, '&#39;');
	    }

	    var TPL_VAR_ALIAS = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

	    function wrapVar(varName, seriesIdx) {
	        return '{' + varName + (seriesIdx == null ? '' : seriesIdx) + '}';
	    }
	    /**
	     * Template formatter
	     * @param  {string} tpl
	     * @param  {Array.<Object>|Object} paramsList
	     * @return {string}
	     */
	    function formatTpl(tpl, paramsList) {
	        if (!zrUtil.isArray(paramsList)) {
	            paramsList = [paramsList];
	        }
	        var seriesLen = paramsList.length;
	        if (!seriesLen) {
	            return '';
	        }

	        var $vars = paramsList[0].$vars;
	        for (var i = 0; i < $vars.length; i++) {
	            var alias = TPL_VAR_ALIAS[i];
	            tpl = tpl.replace(wrapVar(alias),  wrapVar(alias, 0));
	        }
	        for (var seriesIdx = 0; seriesIdx < seriesLen; seriesIdx++) {
	            for (var k = 0; k < $vars.length; k++) {
	                tpl = tpl.replace(
	                    wrapVar(TPL_VAR_ALIAS[k], seriesIdx),
	                    paramsList[seriesIdx][$vars[k]]
	                );
	            }
	        }

	        return tpl;
	    }

	    /**
	     * ISO Date format
	     * @param {string} tpl
	     * @param {number} value
	     * @inner
	     */
	    function formatTime(tpl, value) {
	        if (tpl === 'week'
	            || tpl === 'month'
	            || tpl === 'quarter'
	            || tpl === 'half-year'
	            || tpl === 'year'
	        ) {
	            tpl = 'MM-dd\nyyyy';
	        }

	        var date = numberUtil.parseDate(value);
	        var y = date.getFullYear();
	        var M = date.getMonth() + 1;
	        var d = date.getDate();
	        var h = date.getHours();
	        var m = date.getMinutes();
	        var s = date.getSeconds();

	        tpl = tpl.replace('MM', s2d(M))
	            .toLowerCase()
	            .replace('yyyy', y)
	            .replace('yy', y % 100)
	            .replace('dd', s2d(d))
	            .replace('d', d)
	            .replace('hh', s2d(h))
	            .replace('h', h)
	            .replace('mm', s2d(m))
	            .replace('m', m)
	            .replace('ss', s2d(s))
	            .replace('s', s);

	        return tpl;
	    }

	    /**
	     * @param {string} str
	     * @return {string}
	     * @inner
	     */
	    function s2d(str) {
	        return str < 10 ? ('0' + str) : str;
	    }

	    return {

	        normalizeCssArray: normalizeCssArray,

	        addCommas: addCommas,

	        toCamelCase: toCamelCase,

	        encodeHTML: encodeHTML,

	        formatTpl: formatTpl,

	        formatTime: formatTime
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * 数值处理模块
	 * @module echarts/util/number
	 */

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var number = {};

	    var RADIAN_EPSILON = 1e-4;

	    function _trim(str) {
	        return str.replace(/^\s+/, '').replace(/\s+$/, '');
	    }

	    /**
	     * Linear mapping a value from domain to range
	     * @memberOf module:echarts/util/number
	     * @param  {(number|Array.<number>)} val
	     * @param  {Array.<number>} domain Domain extent domain[0] can be bigger than domain[1]
	     * @param  {Array.<number>} range  Range extent range[0] can be bigger than range[1]
	     * @param  {boolean} clamp
	     * @return {(number|Array.<number>}
	     */
	    number.linearMap = function (val, domain, range, clamp) {
	        var subDomain = domain[1] - domain[0];
	        var subRange = range[1] - range[0];

	        if (subDomain === 0) {
	            return subRange === 0
	                ? range[0]
	                : (range[0] + range[1]) / 2;
	        }

	        // Avoid accuracy problem in edge, such as
	        // 146.39 - 62.83 === 83.55999999999999.
	        // See echarts/test/ut/spec/util/number.js#linearMap#accuracyError
	        // It is a little verbose for efficiency considering this method
	        // is a hotspot.
	        if (clamp) {
	            if (subDomain > 0) {
	                if (val <= domain[0]) {
	                    return range[0];
	                }
	                else if (val >= domain[1]) {
	                    return range[1];
	                }
	            }
	            else {
	                if (val >= domain[0]) {
	                    return range[0];
	                }
	                else if (val <= domain[1]) {
	                    return range[1];
	                }
	            }
	        }
	        else {
	            if (val === domain[0]) {
	                return range[0];
	            }
	            if (val === domain[1]) {
	                return range[1];
	            }
	        }

	        return (val - domain[0]) / subDomain * subRange + range[0];
	    };

	    /**
	     * Convert a percent string to absolute number.
	     * Returns NaN if percent is not a valid string or number
	     * @memberOf module:echarts/util/number
	     * @param {string|number} percent
	     * @param {number} all
	     * @return {number}
	     */
	    number.parsePercent = function(percent, all) {
	        switch (percent) {
	            case 'center':
	            case 'middle':
	                percent = '50%';
	                break;
	            case 'left':
	            case 'top':
	                percent = '0%';
	                break;
	            case 'right':
	            case 'bottom':
	                percent = '100%';
	                break;
	        }
	        if (typeof percent === 'string') {
	            if (_trim(percent).match(/%$/)) {
	                return parseFloat(percent) / 100 * all;
	            }

	            return parseFloat(percent);
	        }

	        return percent == null ? NaN : +percent;
	    };

	    /**
	     * Fix rounding error of float numbers
	     * @param {number} x
	     * @return {number}
	     */
	    number.round = function (x) {
	        // PENDING
	        return +(+x).toFixed(10);
	    };

	    number.asc = function (arr) {
	        arr.sort(function (a, b) {
	            return a - b;
	        });
	        return arr;
	    };

	    /**
	     * Get precision
	     * @param {number} val
	     */
	    number.getPrecision = function (val) {
	        if (isNaN(val)) {
	            return 0;
	        }
	        // It is much faster than methods converting number to string as follows
	        //      var tmp = val.toString();
	        //      return tmp.length - 1 - tmp.indexOf('.');
	        // especially when precision is low
	        var e = 1;
	        var count = 0;
	        while (Math.round(val * e) / e !== val) {
	            e *= 10;
	            count++;
	        }
	        return count;
	    };

	    /**
	     * @param {Array.<number>} dataExtent
	     * @param {Array.<number>} pixelExtent
	     * @return {number}  precision
	     */
	    number.getPixelPrecision = function (dataExtent, pixelExtent) {
	        var log = Math.log;
	        var LN10 = Math.LN10;
	        var dataQuantity = Math.floor(log(dataExtent[1] - dataExtent[0]) / LN10);
	        var sizeQuantity = Math.round(log(Math.abs(pixelExtent[1] - pixelExtent[0])) / LN10);
	        return Math.max(
	            -dataQuantity + sizeQuantity,
	            0
	        );
	    };

	    // Number.MAX_SAFE_INTEGER, ie do not support.
	    number.MAX_SAFE_INTEGER = 9007199254740991;

	    /**
	     * To 0 - 2 * PI, considering negative radian.
	     * @param {number} radian
	     * @return {number}
	     */
	    number.remRadian = function (radian) {
	        var pi2 = Math.PI * 2;
	        return (radian % pi2 + pi2) % pi2;
	    };

	    /**
	     * @param {type} radian
	     * @return {boolean}
	     */
	    number.isRadianAroundZero = function (val) {
	        return val > -RADIAN_EPSILON && val < RADIAN_EPSILON;
	    };

	    /**
	     * @param {string|Date|number} value
	     * @return {number} timestamp
	     */
	    number.parseDate = function (value) {
	        return value instanceof Date
	            ? value
	            : new Date(
	                typeof value === 'string'
	                    ? (new Date(value.replace(/-/g, '/')) - new Date('1970/01/01'))
	                    : Math.round(value)
	            );
	    };

	    /**
	     * Quantity of a number. e.g. 0.1, 1, 10, 100
	     * @param  {number} val
	     * @return {number}
	     */
	    number.quantity = function (val) {
	        return Math.pow(10, Math.floor(Math.log(val) / Math.LN10));
	    };

	    // "Nice Numbers for Graph Labels" of Graphic Gems
	    /**
	     * find a “nice” number approximately equal to x. Round the number if round = true, take ceiling if round = false
	     * The primary observation is that the “nicest” numbers in decimal are 1, 2, and 5, and all power-of-ten multiples of these numbers.
	     * @param  {number} val
	     * @param  {boolean} round
	     * @return {number}
	     */
	    number.nice = function (val, round) {
	        var exp10 = number.quantity(val);
	        var f = val / exp10; // between 1 and 10
	        var nf;
	        if (round) {
	            if (f < 1.5) { nf = 1; }
	            else if (f < 2.5) { nf = 2; }
	            else if (f < 4) { nf = 3; }
	            else if (f < 7) { nf = 5; }
	            else { nf = 10; }
	        }
	        else {
	            if (f < 1) { nf = 1; }
	            else if (f < 2) { nf = 2; }
	            else if (f < 3) { nf = 3; }
	            else if (f < 5) { nf = 5; }
	            else { nf = 10; }
	        }
	        return nf * exp10;
	    };

	    return number;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @module echarts/model/Model
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var clazzUtil = __webpack_require__(7);

	    /**
	     * @alias module:echarts/model/Model
	     * @constructor
	     * @param {Object} option
	     * @param {module:echarts/model/Model} [parentModel]
	     * @param {module:echarts/model/Global} [ecModel]
	     * @param {Object} extraOpt
	     */
	    function Model(option, parentModel, ecModel, extraOpt) {
	        /**
	         * @type {module:echarts/model/Model}
	         * @readOnly
	         */
	        this.parentModel = parentModel;

	        /**
	         * @type {module:echarts/model/Global}
	         * @readOnly
	         */
	        this.ecModel = ecModel;

	        /**
	         * @type {Object}
	         * @protected
	         */
	        this.option = option;

	        // Simple optimization
	        if (this.init) {
	            if (arguments.length <= 4) {
	                this.init(option, parentModel, ecModel, extraOpt);
	            }
	            else {
	                this.init.apply(this, arguments);
	            }
	        }
	    }

	    Model.prototype = {

	        constructor: Model,

	        /**
	         * Model 的初始化函数
	         * @param {Object} option
	         */
	        init: null,

	        /**
	         * 从新的 Option merge
	         */
	        mergeOption: function (option) {
	            zrUtil.merge(this.option, option, true);
	        },

	        /**
	         * @param {string} path
	         * @param {boolean} [ignoreParent=false]
	         * @return {*}
	         */
	        get: function (path, ignoreParent) {
	            if (!path) {
	                return this.option;
	            }

	            if (typeof path === 'string') {
	                path = path.split('.');
	            }

	            var obj = this.option;
	            var parentModel = this.parentModel;
	            for (var i = 0; i < path.length; i++) {
	                // Ignore empty
	                if (!path[i]) {
	                    continue;
	                }
	                // obj could be number/string/... (like 0)
	                obj = (obj && typeof obj === 'object') ? obj[path[i]] : null;
	                if (obj == null) {
	                    break;
	                }
	            }
	            if (obj == null && parentModel && !ignoreParent) {
	                obj = parentModel.get(path);
	            }
	            return obj;
	        },

	        /**
	         * @param {string} key
	         * @param {boolean} [ignoreParent=false]
	         * @return {*}
	         */
	        getShallow: function (key, ignoreParent) {
	            var option = this.option;
	            var val = option && option[key];
	            var parentModel = this.parentModel;
	            if (val == null && parentModel && !ignoreParent) {
	                val = parentModel.getShallow(key);
	            }
	            return val;
	        },

	        /**
	         * @param {string} path
	         * @param {module:echarts/model/Model} [parentModel]
	         * @return {module:echarts/model/Model}
	         */
	        getModel: function (path, parentModel) {
	            var obj = this.get(path, true);
	            var thisParentModel = this.parentModel;
	            var model = new Model(
	                obj, parentModel || (thisParentModel && thisParentModel.getModel(path)),
	                this.ecModel
	            );
	            return model;
	        },

	        /**
	         * If model has option
	         */
	        isEmpty: function () {
	            return this.option == null;
	        },

	        restoreData: function () {},

	        // Pending
	        clone: function () {
	            var Ctor = this.constructor;
	            return new Ctor(zrUtil.clone(this.option));
	        },

	        setReadOnly: function (properties) {
	            clazzUtil.setReadOnly(this, properties);
	        }
	    };

	    // Enable Model.extend.
	    clazzUtil.enableClassExtend(Model);

	    var mixin = zrUtil.mixin;
	    mixin(Model, __webpack_require__(8));
	    mixin(Model, __webpack_require__(10));
	    mixin(Model, __webpack_require__(11));
	    mixin(Model, __webpack_require__(12));

	    return Model;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    var clazz = {};

	    var TYPE_DELIMITER = '.';
	    var IS_CONTAINER = '___EC__COMPONENT__CONTAINER___';
	    /**
	     * @public
	     */
	    var parseClassType = clazz.parseClassType = function (componentType) {
	        var ret = {main: '', sub: ''};
	        if (componentType) {
	            componentType = componentType.split(TYPE_DELIMITER);
	            ret.main = componentType[0] || '';
	            ret.sub = componentType[1] || '';
	        }
	        return ret;
	    };
	    /**
	     * @public
	     */
	    clazz.enableClassExtend = function (RootClass, preConstruct) {
	        RootClass.extend = function (proto) {
	            var ExtendedClass = function () {
	                preConstruct && preConstruct.apply(this, arguments);
	                RootClass.apply(this, arguments);
	            };

	            zrUtil.extend(ExtendedClass.prototype, proto);

	            ExtendedClass.extend = this.extend;
	            ExtendedClass.superCall = superCall;
	            ExtendedClass.superApply = superApply;
	            zrUtil.inherits(ExtendedClass, this);
	            ExtendedClass.superClass = this;

	            return ExtendedClass;
	        };
	    };

	    // superCall should have class info, which can not be fetch from 'this'.
	    // Consider this case:
	    // class A has method f,
	    // class B inherits class A, overrides method f, f call superApply('f'),
	    // class C inherits class B, do not overrides method f,
	    // then when method of class C is called, dead loop occured.
	    function superCall(context, methodName) {
	        var args = zrUtil.slice(arguments, 2);
	        return this.superClass.prototype[methodName].apply(context, args);
	    }

	    function superApply(context, methodName, args) {
	        return this.superClass.prototype[methodName].apply(context, args);
	    }

	    /**
	     * @param {Object} entity
	     * @param {Object} options
	     * @param {boolean} [options.registerWhenExtend]
	     * @public
	     */
	    clazz.enableClassManagement = function (entity, options) {
	        options = options || {};

	        /**
	         * Component model classes
	         * key: componentType,
	         * value:
	         *     componentClass, when componentType is 'xxx'
	         *     or Object.<subKey, componentClass>, when componentType is 'xxx.yy'
	         * @type {Object}
	         */
	        var storage = {};

	        entity.registerClass = function (Clazz, componentType) {
	            if (componentType) {
	                componentType = parseClassType(componentType);

	                if (!componentType.sub) {
	                    if (true) {
	                        if (storage[componentType.main]) {
	                            console.warn(componentType.main + ' exists.');
	                        }
	                    }
	                    storage[componentType.main] = Clazz;
	                }
	                else if (componentType.sub !== IS_CONTAINER) {
	                    var container = makeContainer(componentType);
	                    container[componentType.sub] = Clazz;
	                }
	            }
	            return Clazz;
	        };

	        entity.getClass = function (componentTypeMain, subType, throwWhenNotFound) {
	            var Clazz = storage[componentTypeMain];

	            if (Clazz && Clazz[IS_CONTAINER]) {
	                Clazz = subType ? Clazz[subType] : null;
	            }

	            if (throwWhenNotFound && !Clazz) {
	                throw new Error(
	                    'Component ' + componentTypeMain + '.' + (subType || '') + ' not exists. Load it first.'
	                );
	            }

	            return Clazz;
	        };

	        entity.getClassesByMainType = function (componentType) {
	            componentType = parseClassType(componentType);

	            var result = [];
	            var obj = storage[componentType.main];

	            if (obj && obj[IS_CONTAINER]) {
	                zrUtil.each(obj, function (o, type) {
	                    type !== IS_CONTAINER && result.push(o);
	                });
	            }
	            else {
	                result.push(obj);
	            }

	            return result;
	        };

	        entity.hasClass = function (componentType) {
	            // Just consider componentType.main.
	            componentType = parseClassType(componentType);
	            return !!storage[componentType.main];
	        };

	        /**
	         * @return {Array.<string>} Like ['aa', 'bb'], but can not be ['aa.xx']
	         */
	        entity.getAllClassMainTypes = function () {
	            var types = [];
	            zrUtil.each(storage, function (obj, type) {
	                types.push(type);
	            });
	            return types;
	        };

	        /**
	         * If a main type is container and has sub types
	         * @param  {string}  mainType
	         * @return {boolean}
	         */
	        entity.hasSubTypes = function (componentType) {
	            componentType = parseClassType(componentType);
	            var obj = storage[componentType.main];
	            return obj && obj[IS_CONTAINER];
	        };

	        entity.parseClassType = parseClassType;

	        function makeContainer(componentType) {
	            var container = storage[componentType.main];
	            if (!container || !container[IS_CONTAINER]) {
	                container = storage[componentType.main] = {};
	                container[IS_CONTAINER] = true;
	            }
	            return container;
	        }

	        if (options.registerWhenExtend) {
	            var originalExtend = entity.extend;
	            if (originalExtend) {
	                entity.extend = function (proto) {
	                    var ExtendedClass = originalExtend.call(this, proto);
	                    return entity.registerClass(ExtendedClass, proto.type);
	                };
	            }
	        }

	        return entity;
	    };

	    /**
	     * @param {string|Array.<string>} properties
	     */
	    clazz.setReadOnly = function (obj, properties) {
	        // FIXME It seems broken in IE8 simulation of IE11
	        // if (!zrUtil.isArray(properties)) {
	        //     properties = properties != null ? [properties] : [];
	        // }
	        // zrUtil.each(properties, function (prop) {
	        //     var value = obj[prop];

	        //     Object.defineProperty
	        //         && Object.defineProperty(obj, prop, {
	        //             value: value, writable: false
	        //         });
	        //     zrUtil.isArray(obj[prop])
	        //         && Object.freeze
	        //         && Object.freeze(obj[prop]);
	        // });
	    };

	    return clazz;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    var getLineStyle = __webpack_require__(9)(
	        [
	            ['lineWidth', 'width'],
	            ['stroke', 'color'],
	            ['opacity'],
	            ['shadowBlur'],
	            ['shadowOffsetX'],
	            ['shadowOffsetY'],
	            ['shadowColor']
	        ]
	    );
	    return {
	        getLineStyle: function (excludes) {
	            var style = getLineStyle.call(this, excludes);
	            var lineDash = this.getLineDash();
	            lineDash && (style.lineDash = lineDash);
	            return style;
	        },

	        getLineDash: function () {
	            var lineType = this.get('type');
	            return (lineType === 'solid' || lineType == null) ? null
	                : (lineType === 'dashed' ? [5, 5] : [1, 1]);
	        }
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;// TODO Parse shadow style
	// TODO Only shallow path support
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    return function (properties) {
	        // Normalize
	        for (var i = 0; i < properties.length; i++) {
	            if (!properties[i][1]) {
	               properties[i][1] = properties[i][0];
	            }
	        }
	        return function (excludes) {
	            var style = {};
	            for (var i = 0; i < properties.length; i++) {
	                var propName = properties[i][1];
	                if (excludes && zrUtil.indexOf(excludes, propName) >= 0) {
	                    continue;
	                }
	                var val = this.getShallow(propName);
	                if (val != null) {
	                    style[properties[i][0]] = val;
	                }
	            }
	            return style;
	        };
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    return {
	        getAreaStyle: __webpack_require__(9)(
	            [
	                ['fill', 'color'],
	                ['shadowBlur'],
	                ['shadowOffsetX'],
	                ['shadowOffsetY'],
	                ['opacity'],
	                ['shadowColor']
	            ]
	        )
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var textContain = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/contain/text\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    function getShallow(model, path) {
	        return model && model.getShallow(path);
	    }

	    return {
	        /**
	         * Get color property or get color from option.textStyle.color
	         * @return {string}
	         */
	        getTextColor: function () {
	            var ecModel = this.ecModel;
	            return this.getShallow('color')
	                || (ecModel && ecModel.get('textStyle.color'));
	        },

	        /**
	         * Create font string from fontStyle, fontWeight, fontSize, fontFamily
	         * @return {string}
	         */
	        getFont: function () {
	            var ecModel = this.ecModel;
	            var gTextStyleModel = ecModel && ecModel.getModel('textStyle');
	            return [
	                // FIXME in node-canvas fontWeight is before fontStyle
	                this.getShallow('fontStyle') || getShallow(gTextStyleModel, 'fontStyle'),
	                this.getShallow('fontWeight') || getShallow(gTextStyleModel, 'fontWeight'),
	                (this.getShallow('fontSize') || getShallow(gTextStyleModel, 'fontSize') || 12) + 'px',
	                this.getShallow('fontFamily') || getShallow(gTextStyleModel, 'fontFamily') || 'sans-serif'
	            ].join(' ');
	        },

	        getTextRect: function (text) {
	            var textStyle = this.get('textStyle') || {};
	            return textContain.getBoundingRect(
	                text,
	                this.getFont(),
	                textStyle.align,
	                textStyle.baseline
	            );
	        },

	        ellipsis: function (text, containerWidth, options) {
	            return textContain.ellipsis(
	                text, this.getFont(), containerWidth, options
	            );
	        }
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    var getItemStyle = __webpack_require__(9)(
	        [
	            ['fill', 'color'],
	            ['stroke', 'borderColor'],
	            ['lineWidth', 'borderWidth'],
	            ['opacity'],
	            ['shadowBlur'],
	            ['shadowOffsetX'],
	            ['shadowOffsetY'],
	            ['shadowColor']
	        ]
	    );
	    return {
	        getItemStyle: function (excludes) {
	            var style = getItemStyle.call(this, excludes);
	            var lineDash = this.getBorderLineDash();
	            lineDash && (style.lineDash = lineDash);
	            return style;
	        },

	        getBorderLineDash: function () {
	            var lineType = this.get('borderType');
	            return (lineType === 'solid' || lineType == null) ? null
	                : (lineType === 'dashed' ? [5, 5] : [1, 1]);
	        }
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Component model
	 *
	 * @module echarts/model/Component
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {

	    var Model = __webpack_require__(6);
	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var arrayPush = Array.prototype.push;
	    var componentUtil = __webpack_require__(14);
	    var clazzUtil = __webpack_require__(7);
	    var layout = __webpack_require__(15);

	    /**
	     * @alias module:echarts/model/Component
	     * @constructor
	     * @param {Object} option
	     * @param {module:echarts/model/Model} parentModel
	     * @param {module:echarts/model/Model} ecModel
	     */
	    var ComponentModel = Model.extend({

	        type: 'component',

	        /**
	         * @readOnly
	         * @type {string}
	         */
	        id: '',

	        /**
	         * @readOnly
	         */
	        name: '',

	        /**
	         * @readOnly
	         * @type {string}
	         */
	        mainType: '',

	        /**
	         * @readOnly
	         * @type {string}
	         */
	        subType: '',

	        /**
	         * @readOnly
	         * @type {number}
	         */
	        componentIndex: 0,

	        /**
	         * @type {Object}
	         * @protected
	         */
	        defaultOption: null,

	        /**
	         * @type {module:echarts/model/Global}
	         * @readOnly
	         */
	        ecModel: null,

	        /**
	         * key: componentType
	         * value:  Component model list, can not be null.
	         * @type {Object.<string, Array.<module:echarts/model/Model>>}
	         * @readOnly
	         */
	        dependentModels: [],

	        /**
	         * @type {string}
	         * @readOnly
	         */
	        uid: null,

	        /**
	         * Support merge layout params.
	         * Only support 'box' now (left/right/top/bottom/width/height).
	         * @type {string|Object} Object can be {ignoreSize: true}
	         * @readOnly
	         */
	        layoutMode: null,


	        init: function (option, parentModel, ecModel, extraOpt) {
	            this.mergeDefaultAndTheme(this.option, this.ecModel);
	        },

	        mergeDefaultAndTheme: function (option, ecModel) {
	            var layoutMode = this.layoutMode;
	            var inputPositionParams = layoutMode
	                ? layout.getLayoutParams(option) : {};

	            var themeModel = ecModel.getTheme();
	            zrUtil.merge(option, themeModel.get(this.mainType));
	            zrUtil.merge(option, this.getDefaultOption());

	            if (layoutMode) {
	                layout.mergeLayoutParam(option, inputPositionParams, layoutMode);
	            }
	        },

	        mergeOption: function (option) {
	            zrUtil.merge(this.option, option, true);

	            var layoutMode = this.layoutMode;
	            if (layoutMode) {
	                layout.mergeLayoutParam(this.option, option, layoutMode);
	            }
	        },

	        // Hooker after init or mergeOption
	        optionUpdated: function (newCptOption, isInit) {},

	        getDefaultOption: function () {
	            if (!this.hasOwnProperty('__defaultOption')) {
	                var optList = [];
	                var Class = this.constructor;
	                while (Class) {
	                    var opt = Class.prototype.defaultOption;
	                    opt && optList.push(opt);
	                    Class = Class.superClass;
	                }

	                var defaultOption = {};
	                for (var i = optList.length - 1; i >= 0; i--) {
	                    defaultOption = zrUtil.merge(defaultOption, optList[i], true);
	                }
	                this.__defaultOption = defaultOption;
	            }
	            return this.__defaultOption;
	        }

	    });

	    // Reset ComponentModel.extend, add preConstruct.
	    clazzUtil.enableClassExtend(
	        ComponentModel,
	        function (option, parentModel, ecModel, extraOpt) {
	            // Set dependentModels, componentIndex, name, id, mainType, subType.
	            zrUtil.extend(this, extraOpt);

	            this.uid = componentUtil.getUID('componentModel');

	            // this.setReadOnly([
	            //     'type', 'id', 'uid', 'name', 'mainType', 'subType',
	            //     'dependentModels', 'componentIndex'
	            // ]);
	        }
	    );

	    // Add capability of registerClass, getClass, hasClass, registerSubTypeDefaulter and so on.
	    clazzUtil.enableClassManagement(
	        ComponentModel, {registerWhenExtend: true}
	    );
	    componentUtil.enableSubTypeDefaulter(ComponentModel);

	    // Add capability of ComponentModel.topologicalTravel.
	    componentUtil.enableTopologicalTravel(ComponentModel, getDependencies);

	    function getDependencies(componentType) {
	        var deps = [];
	        zrUtil.each(ComponentModel.getClassesByMainType(componentType), function (Clazz) {
	            arrayPush.apply(deps, Clazz.prototype.dependencies || []);
	        });
	        // Ensure main type
	        return zrUtil.map(deps, function (type) {
	            return clazzUtil.parseClassType(type).main;
	        });
	    }

	    zrUtil.mixin(ComponentModel, __webpack_require__(16));

	    return ComponentModel;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var clazz = __webpack_require__(7);

	    var parseClassType = clazz.parseClassType;

	    var base = 0;

	    var componentUtil = {};

	    var DELIMITER = '_';

	    /**
	     * @public
	     * @param {string} type
	     * @return {string}
	     */
	    componentUtil.getUID = function (type) {
	        // Considering the case of crossing js context,
	        // use Math.random to make id as unique as possible.
	        return [(type || ''), base++, Math.random()].join(DELIMITER);
	    };

	    /**
	     * @inner
	     */
	    componentUtil.enableSubTypeDefaulter = function (entity) {

	        var subTypeDefaulters = {};

	        entity.registerSubTypeDefaulter = function (componentType, defaulter) {
	            componentType = parseClassType(componentType);
	            subTypeDefaulters[componentType.main] = defaulter;
	        };

	        entity.determineSubType = function (componentType, option) {
	            var type = option.type;
	            if (!type) {
	                var componentTypeMain = parseClassType(componentType).main;
	                if (entity.hasSubTypes(componentType) && subTypeDefaulters[componentTypeMain]) {
	                    type = subTypeDefaulters[componentTypeMain](option);
	                }
	            }
	            return type;
	        };

	        return entity;
	    };

	    /**
	     * Topological travel on Activity Network (Activity On Vertices).
	     * Dependencies is defined in Model.prototype.dependencies, like ['xAxis', 'yAxis'].
	     *
	     * If 'xAxis' or 'yAxis' is absent in componentTypeList, just ignore it in topology.
	     *
	     * If there is circle dependencey, Error will be thrown.
	     *
	     */
	    componentUtil.enableTopologicalTravel = function (entity, dependencyGetter) {

	        /**
	         * @public
	         * @param {Array.<string>} targetNameList Target Component type list.
	         *                                           Can be ['aa', 'bb', 'aa.xx']
	         * @param {Array.<string>} fullNameList By which we can build dependency graph.
	         * @param {Function} callback Params: componentType, dependencies.
	         * @param {Object} context Scope of callback.
	         */
	        entity.topologicalTravel = function (targetNameList, fullNameList, callback, context) {
	            if (!targetNameList.length) {
	                return;
	            }

	            var result = makeDepndencyGraph(fullNameList);
	            var graph = result.graph;
	            var stack = result.noEntryList;

	            var targetNameSet = {};
	            zrUtil.each(targetNameList, function (name) {
	                targetNameSet[name] = true;
	            });

	            while (stack.length) {
	                var currComponentType = stack.pop();
	                var currVertex = graph[currComponentType];
	                var isInTargetNameSet = !!targetNameSet[currComponentType];
	                if (isInTargetNameSet) {
	                    callback.call(context, currComponentType, currVertex.originalDeps.slice());
	                    delete targetNameSet[currComponentType];
	                }
	                zrUtil.each(
	                    currVertex.successor,
	                    isInTargetNameSet ? removeEdgeAndAdd : removeEdge
	                );
	            }

	            zrUtil.each(targetNameSet, function () {
	                throw new Error('Circle dependency may exists');
	            });

	            function removeEdge(succComponentType) {
	                graph[succComponentType].entryCount--;
	                if (graph[succComponentType].entryCount === 0) {
	                    stack.push(succComponentType);
	                }
	            }

	            // Consider this case: legend depends on series, and we call
	            // chart.setOption({series: [...]}), where only series is in option.
	            // If we do not have 'removeEdgeAndAdd', legendModel.mergeOption will
	            // not be called, but only sereis.mergeOption is called. Thus legend
	            // have no chance to update its local record about series (like which
	            // name of series is available in legend).
	            function removeEdgeAndAdd(succComponentType) {
	                targetNameSet[succComponentType] = true;
	                removeEdge(succComponentType);
	            }
	        };

	        /**
	         * DepndencyGraph: {Object}
	         * key: conponentType,
	         * value: {
	         *     successor: [conponentTypes...],
	         *     originalDeps: [conponentTypes...],
	         *     entryCount: {number}
	         * }
	         */
	        function makeDepndencyGraph(fullNameList) {
	            var graph = {};
	            var noEntryList = [];

	            zrUtil.each(fullNameList, function (name) {

	                var thisItem = createDependencyGraphItem(graph, name);
	                var originalDeps = thisItem.originalDeps = dependencyGetter(name);

	                var availableDeps = getAvailableDependencies(originalDeps, fullNameList);
	                thisItem.entryCount = availableDeps.length;
	                if (thisItem.entryCount === 0) {
	                    noEntryList.push(name);
	                }

	                zrUtil.each(availableDeps, function (dependentName) {
	                    if (zrUtil.indexOf(thisItem.predecessor, dependentName) < 0) {
	                        thisItem.predecessor.push(dependentName);
	                    }
	                    var thatItem = createDependencyGraphItem(graph, dependentName);
	                    if (zrUtil.indexOf(thatItem.successor, dependentName) < 0) {
	                        thatItem.successor.push(name);
	                    }
	                });
	            });

	            return {graph: graph, noEntryList: noEntryList};
	        }

	        function createDependencyGraphItem(graph, name) {
	            if (!graph[name]) {
	                graph[name] = {predecessor: [], successor: []};
	            }
	            return graph[name];
	        }

	        function getAvailableDependencies(originalDeps, fullNameList) {
	            var availableDeps = [];
	            zrUtil.each(originalDeps, function (dep) {
	                zrUtil.indexOf(fullNameList, dep) >= 0 && availableDeps.push(dep);
	            });
	            return availableDeps;
	        }
	    };

	    return componentUtil;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;// Layout helpers for each component positioning
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
	    'use strict';

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var BoundingRect = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/BoundingRect\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var numberUtil = __webpack_require__(5);
	    var formatUtil = __webpack_require__(4);
	    var parsePercent = numberUtil.parsePercent;
	    var each = zrUtil.each;

	    var layout = {};

	    var LOCATION_PARAMS = ['left', 'right', 'top', 'bottom', 'width', 'height'];

	    function boxLayout(orient, group, gap, maxWidth, maxHeight) {
	        var x = 0;
	        var y = 0;
	        if (maxWidth == null) {
	            maxWidth = Infinity;
	        }
	        if (maxHeight == null) {
	            maxHeight = Infinity;
	        }
	        var currentLineMaxSize = 0;
	        group.eachChild(function (child, idx) {
	            var position = child.position;
	            var rect = child.getBoundingRect();
	            var nextChild = group.childAt(idx + 1);
	            var nextChildRect = nextChild && nextChild.getBoundingRect();
	            var nextX;
	            var nextY;
	            if (orient === 'horizontal') {
	                var moveX = rect.width + (nextChildRect ? (-nextChildRect.x + rect.x) : 0);
	                nextX = x + moveX;
	                // Wrap when width exceeds maxWidth or meet a `newline` group
	                if (nextX > maxWidth || child.newline) {
	                    x = 0;
	                    nextX = moveX;
	                    y += currentLineMaxSize + gap;
	                    currentLineMaxSize = rect.height;
	                }
	                else {
	                    currentLineMaxSize = Math.max(currentLineMaxSize, rect.height);
	                }
	            }
	            else {
	                var moveY = rect.height + (nextChildRect ? (-nextChildRect.y + rect.y) : 0);
	                nextY = y + moveY;
	                // Wrap when width exceeds maxHeight or meet a `newline` group
	                if (nextY > maxHeight || child.newline) {
	                    x += currentLineMaxSize + gap;
	                    y = 0;
	                    nextY = moveY;
	                    currentLineMaxSize = rect.width;
	                }
	                else {
	                    currentLineMaxSize = Math.max(currentLineMaxSize, rect.width);
	                }
	            }

	            if (child.newline) {
	                return;
	            }

	            position[0] = x;
	            position[1] = y;

	            orient === 'horizontal'
	                ? (x = nextX + gap)
	                : (y = nextY + gap);
	        });
	    }

	    /**
	     * VBox or HBox layouting
	     * @param {string} orient
	     * @param {module:zrender/container/Group} group
	     * @param {number} gap
	     * @param {number} [width=Infinity]
	     * @param {number} [height=Infinity]
	     */
	    layout.box = boxLayout;

	    /**
	     * VBox layouting
	     * @param {module:zrender/container/Group} group
	     * @param {number} gap
	     * @param {number} [width=Infinity]
	     * @param {number} [height=Infinity]
	     */
	    layout.vbox = zrUtil.curry(boxLayout, 'vertical');

	    /**
	     * HBox layouting
	     * @param {module:zrender/container/Group} group
	     * @param {number} gap
	     * @param {number} [width=Infinity]
	     * @param {number} [height=Infinity]
	     */
	    layout.hbox = zrUtil.curry(boxLayout, 'horizontal');

	    /**
	     * If x or x2 is not specified or 'center' 'left' 'right',
	     * the width would be as long as possible.
	     * If y or y2 is not specified or 'middle' 'top' 'bottom',
	     * the height would be as long as possible.
	     *
	     * @param {Object} positionInfo
	     * @param {number|string} [positionInfo.x]
	     * @param {number|string} [positionInfo.y]
	     * @param {number|string} [positionInfo.x2]
	     * @param {number|string} [positionInfo.y2]
	     * @param {Object} containerRect
	     * @param {string|number} margin
	     * @return {Object} {width, height}
	     */
	    layout.getAvailableSize = function (positionInfo, containerRect, margin) {
	        var containerWidth = containerRect.width;
	        var containerHeight = containerRect.height;

	        var x = parsePercent(positionInfo.x, containerWidth);
	        var y = parsePercent(positionInfo.y, containerHeight);
	        var x2 = parsePercent(positionInfo.x2, containerWidth);
	        var y2 = parsePercent(positionInfo.y2, containerHeight);

	        (isNaN(x) || isNaN(parseFloat(positionInfo.x))) && (x = 0);
	        (isNaN(x2) || isNaN(parseFloat(positionInfo.x2))) && (x2 = containerWidth);
	        (isNaN(y) || isNaN(parseFloat(positionInfo.y))) && (y = 0);
	        (isNaN(y2) || isNaN(parseFloat(positionInfo.y2))) && (y2 = containerHeight);

	        margin = formatUtil.normalizeCssArray(margin || 0);

	        return {
	            width: Math.max(x2 - x - margin[1] - margin[3], 0),
	            height: Math.max(y2 - y - margin[0] - margin[2], 0)
	        };
	    };

	    /**
	     * Parse position info.
	     *
	     * @param {Object} positionInfo
	     * @param {number|string} [positionInfo.left]
	     * @param {number|string} [positionInfo.top]
	     * @param {number|string} [positionInfo.right]
	     * @param {number|string} [positionInfo.bottom]
	     * @param {number|string} [positionInfo.width]
	     * @param {number|string} [positionInfo.height]
	     * @param {number|string} [positionInfo.aspect] Aspect is width / height
	     * @param {Object} containerRect
	     * @param {string|number} [margin]
	     *
	     * @return {module:zrender/core/BoundingRect}
	     */
	    layout.getLayoutRect = function (
	        positionInfo, containerRect, margin
	    ) {
	        margin = formatUtil.normalizeCssArray(margin || 0);

	        var containerWidth = containerRect.width;
	        var containerHeight = containerRect.height;

	        var left = parsePercent(positionInfo.left, containerWidth);
	        var top = parsePercent(positionInfo.top, containerHeight);
	        var right = parsePercent(positionInfo.right, containerWidth);
	        var bottom = parsePercent(positionInfo.bottom, containerHeight);
	        var width = parsePercent(positionInfo.width, containerWidth);
	        var height = parsePercent(positionInfo.height, containerHeight);

	        var verticalMargin = margin[2] + margin[0];
	        var horizontalMargin = margin[1] + margin[3];
	        var aspect = positionInfo.aspect;

	        // If width is not specified, calculate width from left and right
	        if (isNaN(width)) {
	            width = containerWidth - right - horizontalMargin - left;
	        }
	        if (isNaN(height)) {
	            height = containerHeight - bottom - verticalMargin - top;
	        }

	        // If width and height are not given
	        // 1. Graph should not exceeds the container
	        // 2. Aspect must be keeped
	        // 3. Graph should take the space as more as possible
	        if (isNaN(width) && isNaN(height)) {
	            if (aspect > containerWidth / containerHeight) {
	                width = containerWidth * 0.8;
	            }
	            else {
	                height = containerHeight * 0.8;
	            }
	        }

	        if (aspect != null) {
	            // Calculate width or height with given aspect
	            if (isNaN(width)) {
	                width = aspect * height;
	            }
	            if (isNaN(height)) {
	                height = width / aspect;
	            }
	        }

	        // If left is not specified, calculate left from right and width
	        if (isNaN(left)) {
	            left = containerWidth - right - width - horizontalMargin;
	        }
	        if (isNaN(top)) {
	            top = containerHeight - bottom - height - verticalMargin;
	        }

	        // Align left and top
	        switch (positionInfo.left || positionInfo.right) {
	            case 'center':
	                left = containerWidth / 2 - width / 2 - margin[3];
	                break;
	            case 'right':
	                left = containerWidth - width - horizontalMargin;
	                break;
	        }
	        switch (positionInfo.top || positionInfo.bottom) {
	            case 'middle':
	            case 'center':
	                top = containerHeight / 2 - height / 2 - margin[0];
	                break;
	            case 'bottom':
	                top = containerHeight - height - verticalMargin;
	                break;
	        }
	        // If something is wrong and left, top, width, height are calculated as NaN
	        left = left || 0;
	        top = top || 0;
	        if (isNaN(width)) {
	            // Width may be NaN if only one value is given except width
	            width = containerWidth - left - (right || 0);
	        }
	        if (isNaN(height)) {
	            // Height may be NaN if only one value is given except height
	            height = containerHeight - top - (bottom || 0);
	        }

	        var rect = new BoundingRect(left + margin[3], top + margin[0], width, height);
	        rect.margin = margin;
	        return rect;
	    };

	    /**
	     * Position group of component in viewport
	     *  Group position is specified by either
	     *  {left, top}, {right, bottom}
	     *  If all properties exists, right and bottom will be igonred.
	     *
	     * @param {module:zrender/container/Group} group
	     * @param {Object} positionInfo
	     * @param {number|string} [positionInfo.left]
	     * @param {number|string} [positionInfo.top]
	     * @param {number|string} [positionInfo.right]
	     * @param {number|string} [positionInfo.bottom]
	     * @param {Object} containerRect
	     * @param {string|number} margin
	     */
	    layout.positionGroup = function (
	        group, positionInfo, containerRect, margin
	    ) {
	        var groupRect = group.getBoundingRect();

	        positionInfo = zrUtil.extend(zrUtil.clone(positionInfo), {
	            width: groupRect.width,
	            height: groupRect.height
	        });

	        positionInfo = layout.getLayoutRect(
	            positionInfo, containerRect, margin
	        );

	        group.attr('position', [
	            positionInfo.x - groupRect.x,
	            positionInfo.y - groupRect.y
	        ]);
	    };

	    /**
	     * Consider Case:
	     * When defulat option has {left: 0, width: 100}, and we set {right: 0}
	     * through setOption or media query, using normal zrUtil.merge will cause
	     * {right: 0} does not take effect.
	     *
	     * @example
	     * ComponentModel.extend({
	     *     init: function () {
	     *         ...
	     *         var inputPositionParams = layout.getLayoutParams(option);
	     *         this.mergeOption(inputPositionParams);
	     *     },
	     *     mergeOption: function (newOption) {
	     *         newOption && zrUtil.merge(thisOption, newOption, true);
	     *         layout.mergeLayoutParam(thisOption, newOption);
	     *     }
	     * });
	     *
	     * @param {Object} targetOption
	     * @param {Object} newOption
	     * @param {Object|string} [opt]
	     * @param {boolean} [opt.ignoreSize=false] Some component must has width and height.
	     */
	    layout.mergeLayoutParam = function (targetOption, newOption, opt) {
	        !zrUtil.isObject(opt) && (opt = {});
	        var hNames = ['width', 'left', 'right']; // Order by priority.
	        var vNames = ['height', 'top', 'bottom']; // Order by priority.
	        var hResult = merge(hNames);
	        var vResult = merge(vNames);

	        copy(hNames, targetOption, hResult);
	        copy(vNames, targetOption, vResult);

	        function merge(names) {
	            var newParams = {};
	            var newValueCount = 0;
	            var merged = {};
	            var mergedValueCount = 0;
	            var enoughParamNumber = opt.ignoreSize ? 1 : 2;

	            each(names, function (name) {
	                merged[name] = targetOption[name];
	            });
	            each(names, function (name) {
	                // Consider case: newOption.width is null, which is
	                // set by user for removing width setting.
	                hasProp(newOption, name) && (newParams[name] = merged[name] = newOption[name]);
	                hasValue(newParams, name) && newValueCount++;
	                hasValue(merged, name) && mergedValueCount++;
	            });

	            // Case: newOption: {width: ..., right: ...},
	            // or targetOption: {right: ...} and newOption: {width: ...},
	            // There is no conflict when merged only has params count
	            // little than enoughParamNumber.
	            if (mergedValueCount === enoughParamNumber || !newValueCount) {
	                return merged;
	            }
	            // Case: newOption: {width: ..., right: ...},
	            // Than we can make sure user only want those two, and ignore
	            // all origin params in targetOption.
	            else if (newValueCount >= enoughParamNumber) {
	                return newParams;
	            }
	            else {
	                // Chose another param from targetOption by priority.
	                // When 'ignoreSize', enoughParamNumber is 1 and those will not happen.
	                for (var i = 0; i < names.length; i++) {
	                    var name = names[i];
	                    if (!hasProp(newParams, name) && hasProp(targetOption, name)) {
	                        newParams[name] = targetOption[name];
	                        break;
	                    }
	                }
	                return newParams;
	            }
	        }

	        function hasProp(obj, name) {
	            return obj.hasOwnProperty(name);
	        }

	        function hasValue(obj, name) {
	            return obj[name] != null && obj[name] !== 'auto';
	        }

	        function copy(names, target, source) {
	            each(names, function (name) {
	                target[name] = source[name];
	            });
	        }
	    };

	    /**
	     * Retrieve 'left', 'right', 'top', 'bottom', 'width', 'height' from object.
	     * @param {Object} source
	     * @return {Object} Result contains those props.
	     */
	    layout.getLayoutParams = function (source) {
	        return layout.copyLayoutParams({}, source);
	    };

	    /**
	     * Retrieve 'left', 'right', 'top', 'bottom', 'width', 'height' from object.
	     * @param {Object} source
	     * @return {Object} Result contains those props.
	     */
	    layout.copyLayoutParams = function (target, source) {
	        source && target && each(LOCATION_PARAMS, function (name) {
	            source.hasOwnProperty(name) && (target[name] = source[name]);
	        });
	        return target;
	    };

	    return layout;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    return {
	        getBoxLayoutParams: function () {
	            return {
	                left: this.get('left'),
	                top: this.get('top'),
	                right: this.get('right'),
	                bottom: this.get('bottom'),
	                width: this.get('width'),
	                height: this.get('height')
	            };
	        }
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    var platform = '';
	    // Navigator not exists in node
	    if (typeof navigator !== 'undefined') {
	        platform = navigator.platform || '';
	    }
	    return {
	        // 全图默认背景
	        // backgroundColor: 'rgba(0,0,0,0)',

	        // https://dribbble.com/shots/1065960-Infographic-Pie-chart-visualization
	        // color: ['#5793f3', '#d14a61', '#fd9c35', '#675bba', '#fec42c', '#dd4444', '#d4df5a', '#cd4870'],
	        // 浅色
	        // color: ['#bcd3bb', '#e88f70', '#edc1a5', '#9dc5c8', '#e1e8c8', '#7b7c68', '#e5b5b5', '#f0b489', '#928ea8', '#bda29a'],
	        // color: ['#cc5664', '#9bd6ec', '#ea946e', '#8acaaa', '#f1ec64', '#ee8686', '#a48dc1', '#5da6bc', '#b9dcae'],
	        // 深色
	        color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],

	        // 默认需要 Grid 配置项
	        grid: {},
	        // 主题，主题
	        textStyle: {
	            // color: '#000',
	            // decoration: 'none',
	            // PENDING
	            fontFamily: platform.match(/^Win/) ? 'Microsoft YaHei' : 'sans-serif',
	            // fontFamily: 'Arial, Verdana, sans-serif',
	            fontSize: 12,
	            fontStyle: 'normal',
	            fontWeight: 'normal'
	        },

	        // http://blogs.adobe.com/webplatform/2014/02/24/using-blend-modes-in-html-canvas/
	        // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
	        // Default is source-over
	        blendMode: null,

	        animation: true,
	        animationDuration: 1000,
	        animationDurationUpdate: 300,
	        animationEasing: 'exponentialOut',
	        animationEasingUpdate: 'cubicOut',

	        animationThreshold: 2000,
	        // Progressive configuration
	        progressiveThreshold: 3000,
	        progressive: 400,

	        // Threshold of if use single hover layer to optimize.
	        hoverLayerThreshold: 3000
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    return {
	        clearColorPalette: function () {
	            this._colorIdx = 0;
	            this._colorNameMap = {};
	        },

	        getColorFromPalette: function (name, scope) {
	            scope = scope || this;
	            var colorIdx = scope._colorIdx || 0;
	            var colorNameMap = scope._colorNameMap || (scope._colorNameMap = {});
	            if (colorNameMap[name]) {
	                return colorNameMap[name];
	            }
	            var colorPalette = this.get('color', true) || [];
	            if (!colorPalette.length) {
	                return;
	            }

	            var color = colorPalette[colorIdx];
	            if (name) {
	                colorNameMap[name] = color;
	            }
	            scope._colorIdx = (colorIdx + 1) % colorPalette.length;

	            return color;
	        }
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {

	    'use strict';

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    var echartsAPIList = [
	        'getDom', 'getZr', 'getWidth', 'getHeight', 'dispatchAction', 'isDisposed',
	        'on', 'off', 'getDataURL', 'getConnectedDataURL', 'getModel', 'getOption'
	    ];

	    function ExtensionAPI(chartInstance) {
	        zrUtil.each(echartsAPIList, function (name) {
	            this[name] = zrUtil.bind(chartInstance[name], chartInstance);
	        }, this);
	    }

	    return ExtensionAPI;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {

	    'use strict';

	    var coordinateSystemCreators = {};

	    function CoordinateSystemManager() {

	        this._coordinateSystems = [];
	    }

	    CoordinateSystemManager.prototype = {

	        constructor: CoordinateSystemManager,

	        create: function (ecModel, api) {
	            var coordinateSystems = [];
	            for (var type in coordinateSystemCreators) {
	                var list = coordinateSystemCreators[type].create(ecModel, api);
	                list && (coordinateSystems = coordinateSystems.concat(list));
	            }

	            this._coordinateSystems = coordinateSystems;
	        },

	        update: function (ecModel, api) {
	            var coordinateSystems = this._coordinateSystems;
	            for (var i = 0; i < coordinateSystems.length; i++) {
	                // FIXME MUST have
	                coordinateSystems[i].update && coordinateSystems[i].update(ecModel, api);
	            }
	        }
	    };

	    CoordinateSystemManager.register = function (type, coordinateSystemCreator) {
	        coordinateSystemCreators[type] = coordinateSystemCreator;
	    };

	    CoordinateSystemManager.get = function (type) {
	        return coordinateSystemCreators[type];
	    };

	    return CoordinateSystemManager;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * ECharts option manager
	 *
	 * @module {echarts/model/OptionManager}
	 */

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var modelUtil = __webpack_require__(3);
	    var ComponentModel = __webpack_require__(13);
	    var each = zrUtil.each;
	    var clone = zrUtil.clone;
	    var map = zrUtil.map;
	    var merge = zrUtil.merge;

	    var QUERY_REG = /^(min|max)?(.+)$/;

	    /**
	     * TERM EXPLANATIONS:
	     *
	     * [option]:
	     *
	     *     An object that contains definitions of components. For example:
	     *     var option = {
	     *         title: {...},
	     *         legend: {...},
	     *         visualMap: {...},
	     *         series: [
	     *             {data: [...]},
	     *             {data: [...]},
	     *             ...
	     *         ]
	     *     };
	     *
	     * [rawOption]:
	     *
	     *     An object input to echarts.setOption. 'rawOption' may be an
	     *     'option', or may be an object contains multi-options. For example:
	     *     var option = {
	     *         baseOption: {
	     *             title: {...},
	     *             legend: {...},
	     *             series: [
	     *                 {data: [...]},
	     *                 {data: [...]},
	     *                 ...
	     *             ]
	     *         },
	     *         timeline: {...},
	     *         options: [
	     *             {title: {...}, series: {data: [...]}},
	     *             {title: {...}, series: {data: [...]}},
	     *             ...
	     *         ],
	     *         media: [
	     *             {
	     *                 query: {maxWidth: 320},
	     *                 option: {series: {x: 20}, visualMap: {show: false}}
	     *             },
	     *             {
	     *                 query: {minWidth: 320, maxWidth: 720},
	     *                 option: {series: {x: 500}, visualMap: {show: true}}
	     *             },
	     *             {
	     *                 option: {series: {x: 1200}, visualMap: {show: true}}
	     *             }
	     *         ]
	     *     };
	     *
	     * @alias module:echarts/model/OptionManager
	     * @param {module:echarts/ExtensionAPI} api
	     */
	    function OptionManager(api) {

	        /**
	         * @private
	         * @type {module:echarts/ExtensionAPI}
	         */
	        this._api = api;

	        /**
	         * @private
	         * @type {Array.<number>}
	         */
	        this._timelineOptions = [];

	        /**
	         * @private
	         * @type {Array.<Object>}
	         */
	        this._mediaList = [];

	        /**
	         * @private
	         * @type {Object}
	         */
	        this._mediaDefault;

	        /**
	         * -1, means default.
	         * empty means no media.
	         * @private
	         * @type {Array.<number>}
	         */
	        this._currentMediaIndices = [];

	        /**
	         * @private
	         * @type {Object}
	         */
	        this._optionBackup;

	        /**
	         * @private
	         * @type {Object}
	         */
	        this._newBaseOption;
	    }

	    // timeline.notMerge is not supported in ec3. Firstly there is rearly
	    // case that notMerge is needed. Secondly supporting 'notMerge' requires
	    // rawOption cloned and backuped when timeline changed, which does no
	    // good to performance. What's more, that both timeline and setOption
	    // method supply 'notMerge' brings complex and some problems.
	    // Consider this case:
	    // (step1) chart.setOption({timeline: {notMerge: false}, ...}, false);
	    // (step2) chart.setOption({timeline: {notMerge: true}, ...}, false);

	    OptionManager.prototype = {

	        constructor: OptionManager,

	        /**
	         * @public
	         * @param {Object} rawOption Raw option.
	         * @param {module:echarts/model/Global} ecModel
	         * @param {Array.<Function>} optionPreprocessorFuncs
	         * @return {Object} Init option
	         */
	        setOption: function (rawOption, optionPreprocessorFuncs) {
	            rawOption = clone(rawOption, true);

	            // FIXME
	            // 如果 timeline options 或者 media 中设置了某个属性，而baseOption中没有设置，则进行警告。

	            var oldOptionBackup = this._optionBackup;
	            var newParsedOption = parseRawOption.call(
	                this, rawOption, optionPreprocessorFuncs
	            );
	            this._newBaseOption = newParsedOption.baseOption;

	            // For setOption at second time (using merge mode);
	            if (oldOptionBackup) {
	                // Only baseOption can be merged.
	                mergeOption(oldOptionBackup.baseOption, newParsedOption.baseOption);

	                // For simplicity, timeline options and media options do not support merge,
	                // that is, if you `setOption` twice and both has timeline options, the latter
	                // timeline opitons will not be merged to the formers, but just substitude them.
	                if (newParsedOption.timelineOptions.length) {
	                    oldOptionBackup.timelineOptions = newParsedOption.timelineOptions;
	                }
	                if (newParsedOption.mediaList.length) {
	                    oldOptionBackup.mediaList = newParsedOption.mediaList;
	                }
	                if (newParsedOption.mediaDefault) {
	                    oldOptionBackup.mediaDefault = newParsedOption.mediaDefault;
	                }
	            }
	            else {
	                this._optionBackup = newParsedOption;
	            }
	        },

	        /**
	         * @param {boolean} isRecreate
	         * @return {Object}
	         */
	        mountOption: function (isRecreate) {
	            var optionBackup = this._optionBackup;

	            // TODO
	            // 如果没有reset功能则不clone。

	            this._timelineOptions = map(optionBackup.timelineOptions, clone);
	            this._mediaList = map(optionBackup.mediaList, clone);
	            this._mediaDefault = clone(optionBackup.mediaDefault);
	            this._currentMediaIndices = [];

	            return clone(isRecreate
	                // this._optionBackup.baseOption, which is created at the first `setOption`
	                // called, and is merged into every new option by inner method `mergeOption`
	                // each time `setOption` called, can be only used in `isRecreate`, because
	                // its reliability is under suspicion. In other cases option merge is
	                // proformed by `model.mergeOption`.
	                ? optionBackup.baseOption : this._newBaseOption
	            );
	        },

	        /**
	         * @param {module:echarts/model/Global} ecModel
	         * @return {Object}
	         */
	        getTimelineOption: function (ecModel) {
	            var option;
	            var timelineOptions = this._timelineOptions;

	            if (timelineOptions.length) {
	                // getTimelineOption can only be called after ecModel inited,
	                // so we can get currentIndex from timelineModel.
	                var timelineModel = ecModel.getComponent('timeline');
	                if (timelineModel) {
	                    option = clone(
	                        timelineOptions[timelineModel.getCurrentIndex()],
	                        true
	                    );
	                }
	            }

	            return option;
	        },

	        /**
	         * @param {module:echarts/model/Global} ecModel
	         * @return {Array.<Object>}
	         */
	        getMediaOption: function (ecModel) {
	            var ecWidth = this._api.getWidth();
	            var ecHeight = this._api.getHeight();
	            var mediaList = this._mediaList;
	            var mediaDefault = this._mediaDefault;
	            var indices = [];
	            var result = [];

	            // No media defined.
	            if (!mediaList.length && !mediaDefault) {
	                return result;
	            }

	            // Multi media may be applied, the latter defined media has higher priority.
	            for (var i = 0, len = mediaList.length; i < len; i++) {
	                if (applyMediaQuery(mediaList[i].query, ecWidth, ecHeight)) {
	                    indices.push(i);
	                }
	            }

	            // FIXME
	            // 是否mediaDefault应该强制用户设置，否则可能修改不能回归。
	            if (!indices.length && mediaDefault) {
	                indices = [-1];
	            }

	            if (indices.length && !indicesEquals(indices, this._currentMediaIndices)) {
	                result = map(indices, function (index) {
	                    return clone(
	                        index === -1 ? mediaDefault.option : mediaList[index].option
	                    );
	                });
	            }
	            // Otherwise return nothing.

	            this._currentMediaIndices = indices;

	            return result;
	        }
	    };

	    function parseRawOption(rawOption, optionPreprocessorFuncs) {
	        var timelineOptions = [];
	        var mediaList = [];
	        var mediaDefault;
	        var baseOption;

	        // Compatible with ec2.
	        var timelineOpt = rawOption.timeline;

	        if (rawOption.baseOption) {
	            baseOption = rawOption.baseOption;
	        }

	        // For timeline
	        if (timelineOpt || rawOption.options) {
	            baseOption = baseOption || {};
	            timelineOptions = (rawOption.options || []).slice();
	        }

	        // For media query
	        if (rawOption.media) {
	            baseOption = baseOption || {};
	            var media = rawOption.media;
	            each(media, function (singleMedia) {
	                if (singleMedia && singleMedia.option) {
	                    if (singleMedia.query) {
	                        mediaList.push(singleMedia);
	                    }
	                    else if (!mediaDefault) {
	                        // Use the first media default.
	                        mediaDefault = singleMedia;
	                    }
	                }
	            });
	        }

	        // For normal option
	        if (!baseOption) {
	            baseOption = rawOption;
	        }

	        // Set timelineOpt to baseOption in ec3,
	        // which is convenient for merge option.
	        if (!baseOption.timeline) {
	            baseOption.timeline = timelineOpt;
	        }

	        // Preprocess.
	        each([baseOption].concat(timelineOptions)
	            .concat(zrUtil.map(mediaList, function (media) {
	                return media.option;
	            })),
	            function (option) {
	                each(optionPreprocessorFuncs, function (preProcess) {
	                    preProcess(option);
	                });
	            }
	        );

	        return {
	            baseOption: baseOption,
	            timelineOptions: timelineOptions,
	            mediaDefault: mediaDefault,
	            mediaList: mediaList
	        };
	    }

	    /**
	     * @see <http://www.w3.org/TR/css3-mediaqueries/#media1>
	     * Support: width, height, aspectRatio
	     * Can use max or min as prefix.
	     */
	    function applyMediaQuery(query, ecWidth, ecHeight) {
	        var realMap = {
	            width: ecWidth,
	            height: ecHeight,
	            aspectratio: ecWidth / ecHeight // lowser case for convenientce.
	        };

	        var applicatable = true;

	        zrUtil.each(query, function (value, attr) {
	            var matched = attr.match(QUERY_REG);

	            if (!matched || !matched[1] || !matched[2]) {
	                return;
	            }

	            var operator = matched[1];
	            var realAttr = matched[2].toLowerCase();

	            if (!compare(realMap[realAttr], value, operator)) {
	                applicatable = false;
	            }
	        });

	        return applicatable;
	    }

	    function compare(real, expect, operator) {
	        if (operator === 'min') {
	            return real >= expect;
	        }
	        else if (operator === 'max') {
	            return real <= expect;
	        }
	        else { // Equals
	            return real === expect;
	        }
	    }

	    function indicesEquals(indices1, indices2) {
	        // indices is always order by asc and has only finite number.
	        return indices1.join(',') === indices2.join(',');
	    }

	    /**
	     * Consider case:
	     * `chart.setOption(opt1);`
	     * Then user do some interaction like dataZoom, dataView changing.
	     * `chart.setOption(opt2);`
	     * Then user press 'reset button' in toolbox.
	     *
	     * After doing that all of the interaction effects should be reset, the
	     * chart should be the same as the result of invoke
	     * `chart.setOption(opt1); chart.setOption(opt2);`.
	     *
	     * Although it is not able ensure that
	     * `chart.setOption(opt1); chart.setOption(opt2);` is equivalents to
	     * `chart.setOption(merge(opt1, opt2));` exactly,
	     * this might be the only simple way to implement that feature.
	     *
	     * MEMO: We've considered some other approaches:
	     * 1. Each model handle its self restoration but not uniform treatment.
	     *     (Too complex in logic and error-prone)
	     * 2. Use a shadow ecModel. (Performace expensive)
	     */
	    function mergeOption(oldOption, newOption) {
	        newOption = newOption || {};

	        each(newOption, function (newCptOpt, mainType) {
	            if (newCptOpt == null) {
	                return;
	            }

	            var oldCptOpt = oldOption[mainType];

	            if (!ComponentModel.hasClass(mainType)) {
	                oldOption[mainType] = merge(oldCptOpt, newCptOpt, true);
	            }
	            else {
	                newCptOpt = modelUtil.normalizeToArray(newCptOpt);
	                oldCptOpt = modelUtil.normalizeToArray(oldCptOpt);

	                var mapResult = modelUtil.mappingToExists(oldCptOpt, newCptOpt);

	                oldOption[mainType] = map(mapResult, function (item) {
	                    return (item.option && item.exist)
	                        ? merge(item.exist, item.option, true)
	                        : (item.exist || item.option);
	                });
	            }
	        });
	    }

	    return OptionManager;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {

	    'use strict';

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var formatUtil = __webpack_require__(4);
	    var modelUtil = __webpack_require__(3);
	    var ComponentModel = __webpack_require__(13);
	    var colorPaletteMixin = __webpack_require__(18);
	    var env = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/env\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    var encodeHTML = formatUtil.encodeHTML;
	    var addCommas = formatUtil.addCommas;

	    var SeriesModel = ComponentModel.extend({

	        type: 'series.__base__',

	        /**
	         * @readOnly
	         */
	        seriesIndex: 0,

	        // coodinateSystem will be injected in the echarts/CoordinateSystem
	        coordinateSystem: null,

	        /**
	         * @type {Object}
	         * @protected
	         */
	        defaultOption: null,

	        /**
	         * Data provided for legend
	         * @type {Function}
	         */
	        // PENDING
	        legendDataProvider: null,

	        /**
	         * Access path of color for visual
	         */
	        visualColorAccessPath: 'itemStyle.normal.color',

	        init: function (option, parentModel, ecModel, extraOpt) {

	            /**
	             * @type {number}
	             * @readOnly
	             */
	            this.seriesIndex = this.componentIndex;

	            this.mergeDefaultAndTheme(option, ecModel);

	            /**
	             * @type {module:echarts/data/List|module:echarts/data/Tree|module:echarts/data/Graph}
	             * @private
	             */
	            this._dataBeforeProcessed = this.getInitialData(option, ecModel);

	            // If we reverse the order (make this._data firstly, and then make
	            // this._dataBeforeProcessed by cloneShallow), cloneShallow will
	            // cause this._data.graph.data !== this._data when using
	            // module:echarts/data/Graph or module:echarts/data/Tree.
	            // See module:echarts/data/helper/linkList
	            this._data = this._dataBeforeProcessed.cloneShallow();
	        },

	        /**
	         * Util for merge default and theme to option
	         * @param  {Object} option
	         * @param  {module:echarts/model/Global} ecModel
	         */
	        mergeDefaultAndTheme: function (option, ecModel) {
	            zrUtil.merge(
	                option,
	                ecModel.getTheme().get(this.subType)
	            );
	            zrUtil.merge(option, this.getDefaultOption());

	            // Default label emphasis `position` and `show`
	            // FIXME Set label in mergeOption
	            modelUtil.defaultEmphasis(option.label, modelUtil.LABEL_OPTIONS);

	            this.fillDataTextStyle(option.data);
	        },

	        mergeOption: function (newSeriesOption, ecModel) {
	            newSeriesOption = zrUtil.merge(this.option, newSeriesOption, true);
	            this.fillDataTextStyle(newSeriesOption.data);

	            var data = this.getInitialData(newSeriesOption, ecModel);
	            // TODO Merge data?
	            if (data) {
	                this._data = data;
	                this._dataBeforeProcessed = data.cloneShallow();
	            }
	        },

	        fillDataTextStyle: function (data) {
	            // Default data label emphasis `position` and `show`
	            // FIXME Tree structure data ?
	            // FIXME Performance ?
	            if (data) {
	                for (var i = 0; i < data.length; i++) {
	                    if (data[i] && data[i].label) {
	                        modelUtil.defaultEmphasis(data[i].label, modelUtil.LABEL_OPTIONS);
	                    }
	                }
	            }
	        },

	        /**
	         * Init a data structure from data related option in series
	         * Must be overwritten
	         */
	        getInitialData: function () {},

	        /**
	         * @param {string} [dataType]
	         * @return {module:echarts/data/List}
	         */
	        getData: function (dataType) {
	            return dataType == null ? this._data : this._data.getLinkedData(dataType);
	        },

	        /**
	         * @param {module:echarts/data/List} data
	         */
	        setData: function (data) {
	            this._data = data;
	        },

	        /**
	         * Get data before processed
	         * @return {module:echarts/data/List}
	         */
	        getRawData: function () {
	            return this._dataBeforeProcessed;
	        },

	        /**
	         * Coord dimension to data dimension.
	         *
	         * By default the result is the same as dimensions of series data.
	         * But in some series data dimensions are different from coord dimensions (i.e.
	         * candlestick and boxplot). Override this method to handle those cases.
	         *
	         * Coord dimension to data dimension can be one-to-many
	         *
	         * @param {string} coordDim
	         * @return {Array.<string>} dimensions on the axis.
	         */
	        coordDimToDataDim: function (coordDim) {
	            return [coordDim];
	        },

	        /**
	         * Convert data dimension to coord dimension.
	         *
	         * @param {string|number} dataDim
	         * @return {string}
	         */
	        dataDimToCoordDim: function (dataDim) {
	            return dataDim;
	        },

	        /**
	         * Get base axis if has coordinate system and has axis.
	         * By default use coordSys.getBaseAxis();
	         * Can be overrided for some chart.
	         * @return {type} description
	         */
	        getBaseAxis: function () {
	            var coordSys = this.coordinateSystem;
	            return coordSys && coordSys.getBaseAxis && coordSys.getBaseAxis();
	        },

	        // FIXME
	        /**
	         * Default tooltip formatter
	         *
	         * @param {number} dataIndex
	         * @param {boolean} [multipleSeries=false]
	         * @param {number} [dataType]
	         */
	        formatTooltip: function (dataIndex, multipleSeries, dataType) {
	            var data = this._data;
	            var value = this.getRawValue(dataIndex);
	            var formattedValue = zrUtil.isArray(value)
	                ? zrUtil.map(value, addCommas).join(', ') : addCommas(value);
	            var name = data.getName(dataIndex);
	            var color = data.getItemVisual(dataIndex, 'color');
	            var colorEl = '<span style="display:inline-block;margin-right:5px;'
	                + 'border-radius:10px;width:9px;height:9px;background-color:' + color + '"></span>';

	            var seriesName = this.name;
	            // FIXME
	            if (seriesName === '\0-') {
	                // Not show '-'
	                seriesName = '';
	            }
	            return !multipleSeries
	                ? ((seriesName && encodeHTML(seriesName) + '<br />') + colorEl
	                    + (name
	                        ? encodeHTML(name) + ' : ' + formattedValue
	                        : formattedValue)
	                  )
	                : (colorEl + encodeHTML(this.name) + ' : ' + formattedValue);
	        },

	        /**
	         * @return {boolean}
	         */
	        ifEnableAnimation: function () {
	            if (env.node) {
	                return false;
	            }

	            var animationEnabled = this.getShallow('animation');
	            if (animationEnabled) {
	                if (this.getData().count() > this.getShallow('animationThreshold')) {
	                    animationEnabled = false;
	                }
	            }
	            return animationEnabled;
	        },

	        restoreData: function () {
	            this._data = this._dataBeforeProcessed.cloneShallow();
	        },

	        getColorFromPalette: function (name, scope) {
	            var ecModel = this.ecModel;
	            // PENDING
	            var color = colorPaletteMixin.getColorFromPalette.call(this, name, scope);
	            if (!color) {
	                color = ecModel.getColorFromPalette(name, scope);
	            }
	            return color;
	        },

	        getAxisTooltipDataIndex: null
	    });

	    zrUtil.mixin(SeriesModel, modelUtil.dataFormatMixin);
	    zrUtil.mixin(SeriesModel, colorPaletteMixin);

	    return SeriesModel;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var Group = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/container/Group\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var componentUtil = __webpack_require__(14);
	    var clazzUtil = __webpack_require__(7);

	    var Component = function () {
	        /**
	         * @type {module:zrender/container/Group}
	         * @readOnly
	         */
	        this.group = new Group();

	        /**
	         * @type {string}
	         * @readOnly
	         */
	        this.uid = componentUtil.getUID('viewComponent');
	    };

	    Component.prototype = {

	        constructor: Component,

	        init: function (ecModel, api) {},

	        render: function (componentModel, ecModel, api, payload) {},

	        dispose: function () {}
	    };

	    var componentProto = Component.prototype;
	    componentProto.updateView
	        = componentProto.updateLayout
	        = componentProto.updateVisual
	        = function (seriesModel, ecModel, api, payload) {
	            // Do nothing;
	        };
	    // Enable Component.extend.
	    clazzUtil.enableClassExtend(Component);

	    // Enable capability of registerClass, getClass, hasClass, registerSubTypeDefaulter and so on.
	    clazzUtil.enableClassManagement(Component, {registerWhenExtend: true});

	    return Component;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var Group = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/container/Group\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var componentUtil = __webpack_require__(14);
	    var clazzUtil = __webpack_require__(7);

	    function Chart() {

	        /**
	         * @type {module:zrender/container/Group}
	         * @readOnly
	         */
	        this.group = new Group();

	        /**
	         * @type {string}
	         * @readOnly
	         */
	        this.uid = componentUtil.getUID('viewChart');
	    }

	    Chart.prototype = {

	        type: 'chart',

	        /**
	         * Init the chart
	         * @param  {module:echarts/model/Global} ecModel
	         * @param  {module:echarts/ExtensionAPI} api
	         */
	        init: function (ecModel, api) {},

	        /**
	         * Render the chart
	         * @param  {module:echarts/model/Series} seriesModel
	         * @param  {module:echarts/model/Global} ecModel
	         * @param  {module:echarts/ExtensionAPI} api
	         * @param  {Object} payload
	         */
	        render: function (seriesModel, ecModel, api, payload) {},

	        /**
	         * Highlight series or specified data item
	         * @param  {module:echarts/model/Series} seriesModel
	         * @param  {module:echarts/model/Global} ecModel
	         * @param  {module:echarts/ExtensionAPI} api
	         * @param  {Object} payload
	         */
	        highlight: function (seriesModel, ecModel, api, payload) {
	            toggleHighlight(seriesModel.getData(), payload, 'emphasis');
	        },

	        /**
	         * Downplay series or specified data item
	         * @param  {module:echarts/model/Series} seriesModel
	         * @param  {module:echarts/model/Global} ecModel
	         * @param  {module:echarts/ExtensionAPI} api
	         * @param  {Object} payload
	         */
	        downplay: function (seriesModel, ecModel, api, payload) {
	            toggleHighlight(seriesModel.getData(), payload, 'normal');
	        },

	        /**
	         * Remove self
	         * @param  {module:echarts/model/Global} ecModel
	         * @param  {module:echarts/ExtensionAPI} api
	         */
	        remove: function (ecModel, api) {
	            this.group.removeAll();
	        },

	        /**
	         * Dispose self
	         * @param  {module:echarts/model/Global} ecModel
	         * @param  {module:echarts/ExtensionAPI} api
	         */
	        dispose: function () {}
	    };

	    var chartProto = Chart.prototype;
	    chartProto.updateView
	        = chartProto.updateLayout
	        = chartProto.updateVisual
	        = function (seriesModel, ecModel, api, payload) {
	            this.render(seriesModel, ecModel, api, payload);
	        };

	    /**
	     * Set state of single element
	     * @param  {module:zrender/Element} el
	     * @param  {string} state
	     */
	    function elSetState(el, state) {
	        if (el) {
	            el.trigger(state);
	            if (el.type === 'group') {
	                for (var i = 0; i < el.childCount(); i++) {
	                    elSetState(el.childAt(i), state);
	                }
	            }
	        }
	    }
	    /**
	     * @param  {module:echarts/data/List} data
	     * @param  {Object} payload
	     * @param  {string} state 'normal'|'emphasis'
	     * @inner
	     */
	    function toggleHighlight(data, payload, state) {
	        var dataIndex = payload && payload.dataIndex;
	        var name = payload && payload.name;

	        if (dataIndex != null) {
	            var dataIndices = dataIndex instanceof Array ? dataIndex : [dataIndex];
	            for (var i = 0, len = dataIndices.length; i < len; i++) {
	                elSetState(data.getItemGraphicEl(dataIndices[i]), state);
	            }
	        }
	        else if (name) {
	            var names = name instanceof Array ? name : [name];
	            for (var i = 0, len = names.length; i < len; i++) {
	                var dataIndex = data.indexOfName(names[i]);
	                elSetState(data.getItemGraphicEl(dataIndex), state);
	            }
	        }
	        else {
	            data.eachItemGraphicEl(function (el) {
	                elSetState(el, state);
	            });
	        }
	    }

	    // Enable Chart.extend.
	    clazzUtil.enableClassExtend(Chart);

	    // Add capability of registerClass, getClass, hasClass, registerSubTypeDefaulter and so on.
	    clazzUtil.enableClassManagement(Chart, {registerWhenExtend: true});

	    return Chart;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {

	    'use strict';

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    var pathTool = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/tool/path\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var round = Math.round;
	    var Path = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/graphic/Path\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var colorTool = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/tool/color\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var matrix = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/matrix\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var vector = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/vector\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var Gradient = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/graphic/Gradient\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    var graphic = {};

	    graphic.Group = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/container/Group\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    graphic.Image = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/graphic/Image\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    graphic.Text = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/graphic/Text\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    graphic.Circle = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/graphic/shape/Circle\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    graphic.Sector = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/graphic/shape/Sector\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    graphic.Ring = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/graphic/shape/Ring\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    graphic.Polygon = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/graphic/shape/Polygon\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    graphic.Polyline = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/graphic/shape/Polyline\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    graphic.Rect = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/graphic/shape/Rect\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    graphic.Line = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/graphic/shape/Line\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    graphic.BezierCurve = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/graphic/shape/BezierCurve\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    graphic.Arc = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/graphic/shape/Arc\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    graphic.CompoundPath = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/graphic/CompoundPath\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    graphic.LinearGradient = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/graphic/LinearGradient\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    graphic.RadialGradient = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/graphic/RadialGradient\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    graphic.BoundingRect = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/BoundingRect\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    /**
	     * Extend shape with parameters
	     */
	    graphic.extendShape = function (opts) {
	        return Path.extend(opts);
	    };

	    /**
	     * Extend path
	     */
	    graphic.extendPath = function (pathData, opts) {
	        return pathTool.extendFromString(pathData, opts);
	    };

	    /**
	     * Create a path element from path data string
	     * @param {string} pathData
	     * @param {Object} opts
	     * @param {module:zrender/core/BoundingRect} rect
	     * @param {string} [layout=cover] 'center' or 'cover'
	     */
	    graphic.makePath = function (pathData, opts, rect, layout) {
	        var path = pathTool.createFromString(pathData, opts);
	        var boundingRect = path.getBoundingRect();
	        if (rect) {
	            var aspect = boundingRect.width / boundingRect.height;

	            if (layout === 'center') {
	                // Set rect to center, keep width / height ratio.
	                var width = rect.height * aspect;
	                var height;
	                if (width <= rect.width) {
	                    height = rect.height;
	                }
	                else {
	                    width = rect.width;
	                    height = width / aspect;
	                }
	                var cx = rect.x + rect.width / 2;
	                var cy = rect.y + rect.height / 2;

	                rect.x = cx - width / 2;
	                rect.y = cy - height / 2;
	                rect.width = width;
	                rect.height = height;
	            }

	            this.resizePath(path, rect);
	        }
	        return path;
	    };

	    graphic.mergePath = pathTool.mergePath,

	    /**
	     * Resize a path to fit the rect
	     * @param {module:zrender/graphic/Path} path
	     * @param {Object} rect
	     */
	    graphic.resizePath = function (path, rect) {
	        if (!path.applyTransform) {
	            return;
	        }

	        var pathRect = path.getBoundingRect();

	        var m = pathRect.calculateTransform(rect);

	        path.applyTransform(m);
	    };

	    /**
	     * Sub pixel optimize line for canvas
	     *
	     * @param {Object} param
	     * @param {Object} [param.shape]
	     * @param {number} [param.shape.x1]
	     * @param {number} [param.shape.y1]
	     * @param {number} [param.shape.x2]
	     * @param {number} [param.shape.y2]
	     * @param {Object} [param.style]
	     * @param {number} [param.style.lineWidth]
	     * @return {Object} Modified param
	     */
	    graphic.subPixelOptimizeLine = function (param) {
	        var subPixelOptimize = graphic.subPixelOptimize;
	        var shape = param.shape;
	        var lineWidth = param.style.lineWidth;

	        if (round(shape.x1 * 2) === round(shape.x2 * 2)) {
	            shape.x1 = shape.x2 = subPixelOptimize(shape.x1, lineWidth, true);
	        }
	        if (round(shape.y1 * 2) === round(shape.y2 * 2)) {
	            shape.y1 = shape.y2 = subPixelOptimize(shape.y1, lineWidth, true);
	        }
	        return param;
	    };

	    /**
	     * Sub pixel optimize rect for canvas
	     *
	     * @param {Object} param
	     * @param {Object} [param.shape]
	     * @param {number} [param.shape.x]
	     * @param {number} [param.shape.y]
	     * @param {number} [param.shape.width]
	     * @param {number} [param.shape.height]
	     * @param {Object} [param.style]
	     * @param {number} [param.style.lineWidth]
	     * @return {Object} Modified param
	     */
	    graphic.subPixelOptimizeRect = function (param) {
	        var subPixelOptimize = graphic.subPixelOptimize;
	        var shape = param.shape;
	        var lineWidth = param.style.lineWidth;
	        var originX = shape.x;
	        var originY = shape.y;
	        var originWidth = shape.width;
	        var originHeight = shape.height;
	        shape.x = subPixelOptimize(shape.x, lineWidth, true);
	        shape.y = subPixelOptimize(shape.y, lineWidth, true);
	        shape.width = Math.max(
	            subPixelOptimize(originX + originWidth, lineWidth, false) - shape.x,
	            originWidth === 0 ? 0 : 1
	        );
	        shape.height = Math.max(
	            subPixelOptimize(originY + originHeight, lineWidth, false) - shape.y,
	            originHeight === 0 ? 0 : 1
	        );
	        return param;
	    };

	    /**
	     * Sub pixel optimize for canvas
	     *
	     * @param {number} position Coordinate, such as x, y
	     * @param {number} lineWidth Should be nonnegative integer.
	     * @param {boolean=} positiveOrNegative Default false (negative).
	     * @return {number} Optimized position.
	     */
	    graphic.subPixelOptimize = function (position, lineWidth, positiveOrNegative) {
	        // Assure that (position + lineWidth / 2) is near integer edge,
	        // otherwise line will be fuzzy in canvas.
	        var doubledPosition = round(position * 2);
	        return (doubledPosition + round(lineWidth)) % 2 === 0
	            ? doubledPosition / 2
	            : (doubledPosition + (positiveOrNegative ? 1 : -1)) / 2;
	    };

	    function hasFillOrStroke(fillOrStroke) {
	        return fillOrStroke != null && fillOrStroke != 'none';
	    }

	    function liftColor(color) {
	        return typeof color === 'string' ? colorTool.lift(color, -0.1) : color;
	    }

	    /**
	     * @private
	     */
	    function cacheElementStl(el) {
	        if (el.__hoverStlDirty) {
	            var stroke = el.style.stroke;
	            var fill = el.style.fill;

	            // Create hoverStyle on mouseover
	            var hoverStyle = el.__hoverStl;
	            hoverStyle.fill = hoverStyle.fill
	                || (hasFillOrStroke(fill) ? liftColor(fill) : null);
	            hoverStyle.stroke = hoverStyle.stroke
	                || (hasFillOrStroke(stroke) ? liftColor(stroke) : null);

	            var normalStyle = {};
	            for (var name in hoverStyle) {
	                if (hoverStyle.hasOwnProperty(name)) {
	                    normalStyle[name] = el.style[name];
	                }
	            }

	            el.__normalStl = normalStyle;

	            el.__hoverStlDirty = false;
	        }
	    }

	    /**
	     * @private
	     */
	    function doSingleEnterHover(el) {
	        if (el.__isHover) {
	            return;
	        }

	        cacheElementStl(el);

	        if (el.useHoverLayer) {
	            el.__zr && el.__zr.addHover(el, el.__hoverStl);
	        }
	        else {
	            el.setStyle(el.__hoverStl);
	            el.z2 += 1;
	        }

	        el.__isHover = true;
	    }

	    /**
	     * @inner
	     */
	    function doSingleLeaveHover(el) {
	        if (!el.__isHover) {
	            return;
	        }

	        var normalStl = el.__normalStl;
	        if (el.useHoverLayer) {
	            el.__zr && el.__zr.removeHover(el);
	        }
	        else {
	            normalStl && el.setStyle(normalStl);
	            el.z2 -= 1;
	        }

	        el.__isHover = false;
	    }

	    /**
	     * @inner
	     */
	    function doEnterHover(el) {
	        el.type === 'group'
	            ? el.traverse(function (child) {
	                if (child.type !== 'group') {
	                    doSingleEnterHover(child);
	                }
	            })
	            : doSingleEnterHover(el);
	    }

	    function doLeaveHover(el) {
	        el.type === 'group'
	            ? el.traverse(function (child) {
	                if (child.type !== 'group') {
	                    doSingleLeaveHover(child);
	                }
	            })
	            : doSingleLeaveHover(el);
	    }

	    /**
	     * @inner
	     */
	    function setElementHoverStl(el, hoverStl) {
	        // If element has sepcified hoverStyle, then use it instead of given hoverStyle
	        // Often used when item group has a label element and it's hoverStyle is different
	        el.__hoverStl = el.hoverStyle || hoverStl || {};
	        el.__hoverStlDirty = true;

	        if (el.__isHover) {
	            cacheElementStl(el);
	        }
	    }

	    /**
	     * @inner
	     */
	    function onElementMouseOver() {
	        // Only if element is not in emphasis status
	        !this.__isEmphasis && doEnterHover(this);
	    }

	    /**
	     * @inner
	     */
	    function onElementMouseOut() {
	        // Only if element is not in emphasis status
	        !this.__isEmphasis && doLeaveHover(this);
	    }

	    /**
	     * @inner
	     */
	    function enterEmphasis() {
	        this.__isEmphasis = true;
	        doEnterHover(this);
	    }

	    /**
	     * @inner
	     */
	    function leaveEmphasis() {
	        this.__isEmphasis = false;
	        doLeaveHover(this);
	    }

	    /**
	     * Set hover style of element
	     * @param {module:zrender/Element} el
	     * @param {Object} [hoverStyle]
	     */
	    graphic.setHoverStyle = function (el, hoverStyle) {
	        el.type === 'group'
	            ? el.traverse(function (child) {
	                if (child.type !== 'group') {
	                    setElementHoverStl(child, hoverStyle);
	                }
	            })
	            : setElementHoverStl(el, hoverStyle);
	        // Remove previous bound handlers
	        el.on('mouseover', onElementMouseOver)
	          .on('mouseout', onElementMouseOut);

	        // Emphasis, normal can be triggered manually
	        el.on('emphasis', enterEmphasis)
	          .on('normal', leaveEmphasis);
	    };

	    /**
	     * Set text option in the style
	     * @param {Object} textStyle
	     * @param {module:echarts/model/Model} labelModel
	     * @param {string} color
	     */
	    graphic.setText = function (textStyle, labelModel, color) {
	        var labelPosition = labelModel.getShallow('position') || 'inside';
	        var labelColor = labelPosition.indexOf('inside') >= 0 ? 'white' : color;
	        var textStyleModel = labelModel.getModel('textStyle');
	        zrUtil.extend(textStyle, {
	            textDistance: labelModel.getShallow('distance') || 5,
	            textFont: textStyleModel.getFont(),
	            textPosition: labelPosition,
	            textFill: textStyleModel.getTextColor() || labelColor
	        });
	    };

	    function animateOrSetProps(isUpdate, el, props, animatableModel, dataIndex, cb) {
	        if (typeof dataIndex === 'function') {
	            cb = dataIndex;
	            dataIndex = null;
	        }
	        var animationEnabled = animatableModel
	            && (
	                animatableModel.ifEnableAnimation
	                ? animatableModel.ifEnableAnimation()
	                // Directly use animation property
	                : animatableModel.getShallow('animation')
	            );

	        if (animationEnabled) {
	            var postfix = isUpdate ? 'Update' : '';
	            var duration = animatableModel
	                && animatableModel.getShallow('animationDuration' + postfix);
	            var animationEasing = animatableModel
	                && animatableModel.getShallow('animationEasing' + postfix);
	            var animationDelay = animatableModel
	                && animatableModel.getShallow('animationDelay' + postfix);
	            if (typeof animationDelay === 'function') {
	                animationDelay = animationDelay(dataIndex);
	            }
	            duration > 0
	                ? el.animateTo(props, duration, animationDelay || 0, animationEasing, cb)
	                : (el.attr(props), cb && cb());
	        }
	        else {
	            el.attr(props);
	            cb && cb();
	        }
	    }
	    /**
	     * Update graphic element properties with or without animation according to the configuration in series
	     * @param {module:zrender/Element} el
	     * @param {Object} props
	     * @param {module:echarts/model/Model} [animatableModel]
	     * @param {number} [dataIndex]
	     * @param {Function} [cb]
	     * @example
	     *     graphic.updateProps(el, {
	     *         position: [100, 100]
	     *     }, seriesModel, dataIndex, function () { console.log('Animation done!'); });
	     *     // Or
	     *     graphic.updateProps(el, {
	     *         position: [100, 100]
	     *     }, seriesModel, function () { console.log('Animation done!'); });
	     */
	    graphic.updateProps = function (el, props, animatableModel, dataIndex, cb) {
	        animateOrSetProps(true, el, props, animatableModel, dataIndex, cb);
	    };

	    /**
	     * Init graphic element properties with or without animation according to the configuration in series
	     * @param {module:zrender/Element} el
	     * @param {Object} props
	     * @param {module:echarts/model/Model} [animatableModel]
	     * @param {number} [dataIndex]
	     * @param {Function} cb
	     */
	    graphic.initProps = function (el, props, animatableModel, dataIndex, cb) {
	        animateOrSetProps(false, el, props, animatableModel, dataIndex, cb);
	    };

	    /**
	     * Get transform matrix of target (param target),
	     * in coordinate of its ancestor (param ancestor)
	     *
	     * @param {module:zrender/mixin/Transformable} target
	     * @param {module:zrender/mixin/Transformable} [ancestor]
	     */
	    graphic.getTransform = function (target, ancestor) {
	        var mat = matrix.identity([]);

	        while (target && target !== ancestor) {
	            matrix.mul(mat, target.getLocalTransform(), mat);
	            target = target.parent;
	        }

	        return mat;
	    };

	    /**
	     * Apply transform to an vertex.
	     * @param {Array.<number>} vertex [x, y]
	     * @param {Array.<number>} transform Transform matrix: like [1, 0, 0, 1, 0, 0]
	     * @param {boolean=} invert Whether use invert matrix.
	     * @return {Array.<number>} [x, y]
	     */
	    graphic.applyTransform = function (vertex, transform, invert) {
	        if (invert) {
	            transform = matrix.invert([], transform);
	        }
	        return vector.applyTransform([], vertex, transform);
	    };

	    /**
	     * @param {string} direction 'left' 'right' 'top' 'bottom'
	     * @param {Array.<number>} transform Transform matrix: like [1, 0, 0, 1, 0, 0]
	     * @param {boolean=} invert Whether use invert matrix.
	     * @return {string} Transformed direction. 'left' 'right' 'top' 'bottom'
	     */
	    graphic.transformDirection = function (direction, transform, invert) {

	        // Pick a base, ensure that transform result will not be (0, 0).
	        var hBase = (transform[4] === 0 || transform[5] === 0 || transform[0] === 0)
	            ? 1 : Math.abs(2 * transform[4] / transform[0]);
	        var vBase = (transform[4] === 0 || transform[5] === 0 || transform[2] === 0)
	            ? 1 : Math.abs(2 * transform[4] / transform[2]);

	        var vertex = [
	            direction === 'left' ? -hBase : direction === 'right' ? hBase : 0,
	            direction === 'top' ? -vBase : direction === 'bottom' ? vBase : 0
	        ];

	        vertex = graphic.applyTransform(vertex, transform, invert);

	        return Math.abs(vertex[0]) > Math.abs(vertex[1])
	            ? (vertex[0] > 0 ? 'right' : 'left')
	            : (vertex[1] > 0 ? 'bottom' : 'top');
	    };

	    return graphic;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var graphic = __webpack_require__(25);
	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var PI = Math.PI;
	    /**
	     * @param {module:echarts/ExtensionAPI} api
	     * @param {Object} [opts]
	     * @param {string} [opts.text]
	     * @param {string} [opts.color]
	     * @param {string} [opts.textColor]
	     * @return {module:zrender/Element}
	     */
	    return function (api, opts) {
	        opts = opts || {};
	        zrUtil.defaults(opts, {
	            text: 'loading',
	            color: '#c23531',
	            textColor: '#000',
	            maskColor: 'rgba(255, 255, 255, 0.8)',
	            zlevel: 0
	        });
	        var mask = new graphic.Rect({
	            style: {
	                fill: opts.maskColor
	            },
	            zlevel: opts.zlevel,
	            z: 10000
	        });
	        var arc = new graphic.Arc({
	            shape: {
	                startAngle: -PI / 2,
	                endAngle: -PI / 2 + 0.1,
	                r: 10
	            },
	            style: {
	                stroke: opts.color,
	                lineCap: 'round',
	                lineWidth: 5
	            },
	            zlevel: opts.zlevel,
	            z: 10001
	        });
	        var labelRect = new graphic.Rect({
	            style: {
	                fill: 'none',
	                text: opts.text,
	                textPosition: 'right',
	                textDistance: 10,
	                textFill: opts.textColor
	            },
	            zlevel: opts.zlevel,
	            z: 10001
	        });

	        arc.animateShape(true)
	            .when(1000, {
	                endAngle: PI * 3 / 2
	            })
	            .start('circularInOut');
	        arc.animateShape(true)
	            .when(1000, {
	                startAngle: PI * 3 / 2
	            })
	            .delay(300)
	            .start('circularInOut');

	        var group = new graphic.Group();
	        group.add(arc);
	        group.add(labelRect);
	        group.add(mask);
	        // Inject resize
	        group.resize = function () {
	            var cx = api.getWidth() / 2;
	            var cy = api.getHeight() / 2;
	            arc.setShape({
	                cx: cx,
	                cy: cy
	            });
	            var r = arc.shape.r;
	            labelRect.setShape({
	                x: cx - r,
	                y: cy - r,
	                width: r * 2,
	                height: r * 2
	            });

	            mask.setShape({
	                x: 0,
	                y: 0,
	                width: api.getWidth(),
	                height: api.getHeight()
	            });
	        };
	        group.resize();
	        return group;
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    var Gradient = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/graphic/Gradient\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    return function (ecModel) {
	        function encodeColor(seriesModel) {
	            var colorAccessPath = (seriesModel.visualColorAccessPath || 'itemStyle.normal.color').split('.');
	            var data = seriesModel.getData();
	            var color = seriesModel.get(colorAccessPath) // Set in itemStyle
	                || seriesModel.getColorFromPalette(seriesModel.get('name'));  // Default color

	            // FIXME Set color function or use the platte color
	            data.setVisual('color', color);

	            // Only visible series has each data be visual encoded
	            if (!ecModel.isSeriesFiltered(seriesModel)) {
	                if (typeof color === 'function' && !(color instanceof Gradient)) {
	                    data.each(function (idx) {
	                        data.setItemVisual(
	                            idx, 'color', color(seriesModel.getDataParams(idx))
	                        );
	                    });
	                }

	                // itemStyle in each data item
	                data.each(function (idx) {
	                    var itemModel = data.getItemModel(idx);
	                    var color = itemModel.get(colorAccessPath, true);
	                    if (color != null) {
	                        data.setItemVisual(idx, 'color', color);
	                    }
	                });
	            }
	        }
	        ecModel.eachRawSeries(encodeColor);
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;// Compatitable with 2.0
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var compatStyle = __webpack_require__(29);

	    function get(opt, path) {
	        path = path.split(',');
	        var obj = opt;
	        for (var i = 0; i < path.length; i++) {
	            obj = obj && obj[path[i]];
	            if (obj == null) {
	                break;
	            }
	        }
	        return obj;
	    }

	    function set(opt, path, val, overwrite) {
	        path = path.split(',');
	        var obj = opt;
	        var key;
	        for (var i = 0; i < path.length - 1; i++) {
	            key = path[i];
	            if (obj[key] == null) {
	                obj[key] = {};
	            }
	            obj = obj[key];
	        }
	        if (overwrite || obj[path[i]] == null) {
	            obj[path[i]] = val;
	        }
	    }

	    function compatLayoutProperties(option) {
	        each(LAYOUT_PROPERTIES, function (prop) {
	            if (prop[0] in option && !(prop[1] in option)) {
	                option[prop[1]] = option[prop[0]];
	            }
	        });
	    }

	    var LAYOUT_PROPERTIES = [
	        ['x', 'left'], ['y', 'top'], ['x2', 'right'], ['y2', 'bottom']
	    ];

	    var COMPATITABLE_COMPONENTS = [
	        'grid', 'geo', 'parallel', 'legend', 'toolbox', 'title', 'visualMap', 'dataZoom', 'timeline'
	    ];

	    var COMPATITABLE_SERIES = [
	        'bar', 'boxplot', 'candlestick', 'chord', 'effectScatter',
	        'funnel', 'gauge', 'lines', 'graph', 'heatmap', 'line', 'map', 'parallel',
	        'pie', 'radar', 'sankey', 'scatter', 'treemap'
	    ];

	    var each = zrUtil.each;

	    return function (option) {
	        each(option.series, function (seriesOpt) {
	            if (!zrUtil.isObject(seriesOpt)) {
	                return;
	            }

	            var seriesType = seriesOpt.type;

	            compatStyle(seriesOpt);

	            if (seriesType === 'pie' || seriesType === 'gauge') {
	                if (seriesOpt.clockWise != null) {
	                    seriesOpt.clockwise = seriesOpt.clockWise;
	                }
	            }
	            if (seriesType === 'gauge') {
	                var pointerColor = get(seriesOpt, 'pointer.color');
	                pointerColor != null
	                    && set(seriesOpt, 'itemStyle.normal.color', pointerColor);
	            }

	            for (var i = 0; i < COMPATITABLE_SERIES.length; i++) {
	                if (COMPATITABLE_SERIES[i] === seriesOpt.type) {
	                    compatLayoutProperties(seriesOpt);
	                    break;
	                }
	            }
	        });

	        // dataRange has changed to visualMap
	        if (option.dataRange) {
	            option.visualMap = option.dataRange;
	        }

	        each(COMPATITABLE_COMPONENTS, function (componentName) {
	            var options = option[componentName];
	            if (options) {
	                if (!zrUtil.isArray(options)) {
	                    options = [options];
	                }
	                each(options, function (option) {
	                    compatLayoutProperties(option);
	                });
	            }
	        });
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    var POSSIBLE_STYLES = [
	        'areaStyle', 'lineStyle', 'nodeStyle', 'linkStyle',
	        'chordStyle', 'label', 'labelLine'
	    ];

	    function compatItemStyle(opt) {
	        var itemStyleOpt = opt && opt.itemStyle;
	        if (itemStyleOpt) {
	            zrUtil.each(POSSIBLE_STYLES, function (styleName) {
	                var normalItemStyleOpt = itemStyleOpt.normal;
	                var emphasisItemStyleOpt = itemStyleOpt.emphasis;
	                if (normalItemStyleOpt && normalItemStyleOpt[styleName]) {
	                    opt[styleName] = opt[styleName] || {};
	                    if (!opt[styleName].normal) {
	                        opt[styleName].normal = normalItemStyleOpt[styleName];
	                    }
	                    else {
	                        zrUtil.merge(opt[styleName].normal, normalItemStyleOpt[styleName]);
	                    }
	                    normalItemStyleOpt[styleName] = null;
	                }
	                if (emphasisItemStyleOpt && emphasisItemStyleOpt[styleName]) {
	                    opt[styleName] = opt[styleName] || {};
	                    if (!opt[styleName].emphasis) {
	                        opt[styleName].emphasis = emphasisItemStyleOpt[styleName];
	                    }
	                    else {
	                        zrUtil.merge(opt[styleName].emphasis, emphasisItemStyleOpt[styleName]);
	                    }
	                    emphasisItemStyleOpt[styleName] = null;
	                }
	            });
	        }
	    }

	    return function (seriesOpt) {
	        if (!seriesOpt) {
	            return;
	        }
	        compatItemStyle(seriesOpt);
	        compatItemStyle(seriesOpt.markPoint);
	        compatItemStyle(seriesOpt.markLine);
	        var data = seriesOpt.data;
	        if (data) {
	            for (var i = 0; i < data.length; i++) {
	                compatItemStyle(data[i]);
	            }
	            // mark point data
	            var markPoint = seriesOpt.markPoint;
	            if (markPoint && markPoint.data) {
	                var mpData = markPoint.data;
	                for (var i = 0; i < mpData.length; i++) {
	                    compatItemStyle(mpData[i]);
	                }
	            }
	            // mark line data
	            var markLine = seriesOpt.markLine;
	            if (markLine && markLine.data) {
	                var mlData = markLine.data;
	                for (var i = 0; i < mlData.length; i++) {
	                    if (zrUtil.isArray(mlData[i])) {
	                        compatItemStyle(mlData[i][0]);
	                        compatItemStyle(mlData[i][1]);
	                    }
	                    else {
	                        compatItemStyle(mlData[i]);
	                    }
	                }
	            }
	        }
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global) {/**
	 * List for data storage
	 * @module echarts/data/List
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var UNDEFINED = 'undefined';
	    var globalObj = typeof window === 'undefined' ? global : window;
	    var Float64Array = typeof globalObj.Float64Array === UNDEFINED
	        ? Array : globalObj.Float64Array;
	    var Int32Array = typeof globalObj.Int32Array === UNDEFINED
	        ? Array : globalObj.Int32Array;

	    var dataCtors = {
	        'float': Float64Array,
	        'int': Int32Array,
	        // Ordinal data type can be string or int
	        'ordinal': Array,
	        'number': Array,
	        'time': Array
	    };

	    var Model = __webpack_require__(6);
	    var DataDiffer = __webpack_require__(31);

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var modelUtil = __webpack_require__(3);
	    var isObject = zrUtil.isObject;

	    var TRANSFERABLE_PROPERTIES = [
	        'stackedOn', 'hasItemOption', '_nameList', '_idList', '_rawData'
	    ];

	    var transferProperties = function (a, b) {
	        zrUtil.each(TRANSFERABLE_PROPERTIES.concat(b.__wrappedMethods || []), function (propName) {
	            if (b.hasOwnProperty(propName)) {
	                a[propName] = b[propName];
	            }
	        });

	        a.__wrappedMethods = b.__wrappedMethods;
	    };

	    /**
	     * @constructor
	     * @alias module:echarts/data/List
	     *
	     * @param {Array.<string>} dimensions
	     *        Dimensions should be concrete names like x, y, z, lng, lat, angle, radius
	     * @param {module:echarts/model/Model} hostModel
	     */
	    var List = function (dimensions, hostModel) {

	        dimensions = dimensions || ['x', 'y'];

	        var dimensionInfos = {};
	        var dimensionNames = [];
	        for (var i = 0; i < dimensions.length; i++) {
	            var dimensionName;
	            var dimensionInfo = {};
	            if (typeof dimensions[i] === 'string') {
	                dimensionName = dimensions[i];
	                dimensionInfo = {
	                    name: dimensionName,
	                    stackable: false,
	                    // Type can be 'float', 'int', 'number'
	                    // Default is number, Precision of float may not enough
	                    type: 'number'
	                };
	            }
	            else {
	                dimensionInfo = dimensions[i];
	                dimensionName = dimensionInfo.name;
	                dimensionInfo.type = dimensionInfo.type || 'number';
	            }
	            dimensionNames.push(dimensionName);
	            dimensionInfos[dimensionName] = dimensionInfo;
	        }
	        /**
	         * @readOnly
	         * @type {Array.<string>}
	         */
	        this.dimensions = dimensionNames;

	        /**
	         * Infomation of each data dimension, like data type.
	         * @type {Object}
	         */
	        this._dimensionInfos = dimensionInfos;

	        /**
	         * @type {module:echarts/model/Model}
	         */
	        this.hostModel = hostModel;

	        /**
	         * @type {module:echarts/model/Model}
	         */
	        this.dataType;

	        /**
	         * Indices stores the indices of data subset after filtered.
	         * This data subset will be used in chart.
	         * @type {Array.<number>}
	         * @readOnly
	         */
	        this.indices = [];

	        /**
	         * Data storage
	         * @type {Object.<key, TypedArray|Array>}
	         * @private
	         */
	        this._storage = {};

	        /**
	         * @type {Array.<string>}
	         */
	        this._nameList = [];
	        /**
	         * @type {Array.<string>}
	         */
	        this._idList = [];
	        /**
	         * Models of data option is stored sparse for optimizing memory cost
	         * @type {Array.<module:echarts/model/Model>}
	         * @private
	         */
	        this._optionModels = [];

	        /**
	         * @param {module:echarts/data/List}
	         */
	        this.stackedOn = null;

	        /**
	         * Global visual properties after visual coding
	         * @type {Object}
	         * @private
	         */
	        this._visual = {};

	        /**
	         * Globel layout properties.
	         * @type {Object}
	         * @private
	         */
	        this._layout = {};

	        /**
	         * Item visual properties after visual coding
	         * @type {Array.<Object>}
	         * @private
	         */
	        this._itemVisuals = [];

	        /**
	         * Item layout properties after layout
	         * @type {Array.<Object>}
	         * @private
	         */
	        this._itemLayouts = [];

	        /**
	         * Graphic elemnents
	         * @type {Array.<module:zrender/Element>}
	         * @private
	         */
	        this._graphicEls = [];

	        /**
	         * @type {Array.<Array|Object>}
	         * @private
	         */
	        this._rawData;

	        /**
	         * @type {Object}
	         * @private
	         */
	        this._extent;
	    };

	    var listProto = List.prototype;

	    listProto.type = 'list';
	    /**
	     * If each data item has it's own option
	     * @type {boolean}
	     */
	    listProto.hasItemOption = true;

	    /**
	     * Get dimension name
	     * @param {string|number} dim
	     *        Dimension can be concrete names like x, y, z, lng, lat, angle, radius
	     *        Or a ordinal number. For example getDimensionInfo(0) will return 'x' or 'lng' or 'radius'
	     * @return {string} Concrete dim name.
	     */
	    listProto.getDimension = function (dim) {
	        if (!isNaN(dim)) {
	            dim = this.dimensions[dim] || dim;
	        }
	        return dim;
	    };
	    /**
	     * Get type and stackable info of particular dimension
	     * @param {string|number} dim
	     *        Dimension can be concrete names like x, y, z, lng, lat, angle, radius
	     *        Or a ordinal number. For example getDimensionInfo(0) will return 'x' or 'lng' or 'radius'
	     */
	    listProto.getDimensionInfo = function (dim) {
	        return zrUtil.clone(this._dimensionInfos[this.getDimension(dim)]);
	    };

	    /**
	     * Initialize from data
	     * @param {Array.<Object|number|Array>} data
	     * @param {Array.<string>} [nameList]
	     * @param {Function} [dimValueGetter] (dataItem, dimName, dataIndex, dimIndex) => number
	     */
	    listProto.initData = function (data, nameList, dimValueGetter) {
	        data = data || [];

	        if (true) {
	            if (!zrUtil.isArray(data)) {
	                throw new Error('Invalid data.');
	            }
	        }

	        this._rawData = data;

	        // Clear
	        var storage = this._storage = {};
	        var indices = this.indices = [];

	        var dimensions = this.dimensions;
	        var size = data.length;
	        var dimensionInfoMap = this._dimensionInfos;

	        var idList = [];
	        var nameRepeatCount = {};

	        nameList = nameList || [];

	        // Init storage
	        for (var i = 0; i < dimensions.length; i++) {
	            var dimInfo = dimensionInfoMap[dimensions[i]];
	            var DataCtor = dataCtors[dimInfo.type];
	            storage[dimensions[i]] = new DataCtor(size);
	        }

	        var self = this;
	        if (!dimValueGetter) {
	            self.hasItemOption = false;
	        }
	        // Default dim value getter
	        dimValueGetter = dimValueGetter || function (dataItem, dimName, dataIndex, dimIndex) {
	            var value = modelUtil.getDataItemValue(dataItem);
	            // If any dataItem is like { value: 10 }
	            if (modelUtil.isDataItemOption(dataItem)) {
	                self.hasItemOption = true;
	            }
	            return modelUtil.converDataValue(
	                (value instanceof Array)
	                    ? value[dimIndex]
	                    // If value is a single number or something else not array.
	                    : value,
	                dimensionInfoMap[dimName]
	            );
	        };

	        for (var idx = 0; idx < data.length; idx++) {
	            var dataItem = data[idx];
	            // Each data item is value
	            // [1, 2]
	            // 2
	            // Bar chart, line chart which uses category axis
	            // only gives the 'y' value. 'x' value is the indices of cateogry
	            // Use a tempValue to normalize the value to be a (x, y) value

	            // Store the data by dimensions
	            for (var k = 0; k < dimensions.length; k++) {
	                var dim = dimensions[k];
	                var dimStorage = storage[dim];
	                // PENDING NULL is empty or zero
	                dimStorage[idx] = dimValueGetter(dataItem, dim, idx, k);
	            }

	            indices.push(idx);
	        }

	        // Use the name in option and create id
	        for (var i = 0; i < data.length; i++) {
	            var id = '';
	            if (!nameList[i]) {
	                nameList[i] = data[i].name;
	                // Try using the id in option
	                id = data[i].id;
	            }
	            var name = nameList[i] || '';
	            if (!id && name) {
	                // Use name as id and add counter to avoid same name
	                nameRepeatCount[name] = nameRepeatCount[name] || 0;
	                id = name;
	                if (nameRepeatCount[name] > 0) {
	                    id += '__ec__' + nameRepeatCount[name];
	                }
	                nameRepeatCount[name]++;
	            }
	            id && (idList[i] = id);
	        }

	        this._nameList = nameList;
	        this._idList = idList;
	    };

	    /**
	     * @return {number}
	     */
	    listProto.count = function () {
	        return this.indices.length;
	    };

	    /**
	     * Get value. Return NaN if idx is out of range.
	     * @param {string} dim Dim must be concrete name.
	     * @param {number} idx
	     * @param {boolean} stack
	     * @return {number}
	     */
	    listProto.get = function (dim, idx, stack) {
	        var storage = this._storage;
	        var dataIndex = this.indices[idx];

	        // If value not exists
	        if (dataIndex == null) {
	            return NaN;
	        }

	        var value = storage[dim] && storage[dim][dataIndex];
	        // FIXME ordinal data type is not stackable
	        if (stack) {
	            var dimensionInfo = this._dimensionInfos[dim];
	            if (dimensionInfo && dimensionInfo.stackable) {
	                var stackedOn = this.stackedOn;
	                while (stackedOn) {
	                    // Get no stacked data of stacked on
	                    var stackedValue = stackedOn.get(dim, idx);
	                    // Considering positive stack, negative stack and empty data
	                    if ((value >= 0 && stackedValue > 0)  // Positive stack
	                        || (value <= 0 && stackedValue < 0) // Negative stack
	                    ) {
	                        value += stackedValue;
	                    }
	                    stackedOn = stackedOn.stackedOn;
	                }
	            }
	        }
	        return value;
	    };

	    /**
	     * Get value for multi dimensions.
	     * @param {Array.<string>} [dimensions] If ignored, using all dimensions.
	     * @param {number} idx
	     * @param {boolean} stack
	     * @return {number}
	     */
	    listProto.getValues = function (dimensions, idx, stack) {
	        var values = [];

	        if (!zrUtil.isArray(dimensions)) {
	            stack = idx;
	            idx = dimensions;
	            dimensions = this.dimensions;
	        }

	        for (var i = 0, len = dimensions.length; i < len; i++) {
	            values.push(this.get(dimensions[i], idx, stack));
	        }

	        return values;
	    };

	    /**
	     * If value is NaN. Inlcuding '-'
	     * @param {string} dim
	     * @param {number} idx
	     * @return {number}
	     */
	    listProto.hasValue = function (idx) {
	        var dimensions = this.dimensions;
	        var dimensionInfos = this._dimensionInfos;
	        for (var i = 0, len = dimensions.length; i < len; i++) {
	            if (
	                // Ordinal type can be string or number
	                dimensionInfos[dimensions[i]].type !== 'ordinal'
	                && isNaN(this.get(dimensions[i], idx))
	            ) {
	                return false;
	            }
	        }
	        return true;
	    };

	    /**
	     * Get extent of data in one dimension
	     * @param {string} dim
	     * @param {boolean} stack
	     */
	    listProto.getDataExtent = function (dim, stack) {
	        dim = this.getDimension(dim);
	        var dimData = this._storage[dim];
	        var dimInfo = this.getDimensionInfo(dim);
	        stack = (dimInfo && dimInfo.stackable) && stack;
	        var dimExtent = (this._extent || (this._extent = {}))[dim + (!!stack)];
	        var value;
	        if (dimExtent) {
	            return dimExtent;
	        }
	        // var dimInfo = this._dimensionInfos[dim];
	        if (dimData) {
	            var min = Infinity;
	            var max = -Infinity;
	            // var isOrdinal = dimInfo.type === 'ordinal';
	            for (var i = 0, len = this.count(); i < len; i++) {
	                value = this.get(dim, i, stack);
	                // FIXME
	                // if (isOrdinal && typeof value === 'string') {
	                //     value = zrUtil.indexOf(dimData, value);
	                // }
	                value < min && (min = value);
	                value > max && (max = value);
	            }
	            return (this._extent[dim + !!stack] = [min, max]);
	        }
	        else {
	            return [Infinity, -Infinity];
	        }
	    };

	    /**
	     * Get sum of data in one dimension
	     * @param {string} dim
	     * @param {boolean} stack
	     */
	    listProto.getSum = function (dim, stack) {
	        var dimData = this._storage[dim];
	        var sum = 0;
	        if (dimData) {
	            for (var i = 0, len = this.count(); i < len; i++) {
	                var value = this.get(dim, i, stack);
	                if (!isNaN(value)) {
	                    sum += value;
	                }
	            }
	        }
	        return sum;
	    };

	    /**
	     * Retreive the index with given value
	     * @param {number} idx
	     * @param {number} value
	     * @return {number}
	     */
	    // FIXME Precision of float value
	    listProto.indexOf = function (dim, value) {
	        var storage = this._storage;
	        var dimData = storage[dim];
	        var indices = this.indices;

	        if (dimData) {
	            for (var i = 0, len = indices.length; i < len; i++) {
	                var rawIndex = indices[i];
	                if (dimData[rawIndex] === value) {
	                    return i;
	                }
	            }
	        }
	        return -1;
	    };

	    /**
	     * Retreive the index with given name
	     * @param {number} idx
	     * @param {number} name
	     * @return {number}
	     */
	    listProto.indexOfName = function (name) {
	        var indices = this.indices;
	        var nameList = this._nameList;

	        for (var i = 0, len = indices.length; i < len; i++) {
	            var rawIndex = indices[i];
	            if (nameList[rawIndex] === name) {
	                return i;
	            }
	        }

	        return -1;
	    };

	    /**
	     * Retreive the index of nearest value
	     * @param {string} dim
	     * @param {number} value
	     * @param {boolean} stack If given value is after stacked
	     * @return {number}
	     */
	    listProto.indexOfNearest = function (dim, value, stack) {
	        var storage = this._storage;
	        var dimData = storage[dim];

	        if (dimData) {
	            var minDist = Number.MAX_VALUE;
	            var nearestIdx = -1;
	            for (var i = 0, len = this.count(); i < len; i++) {
	                var diff = value - this.get(dim, i, stack);
	                var dist = Math.abs(diff);
	                if (dist < minDist
	                    // For the case of two data are same on xAxis, which has sequence data.
	                    // Show the nearest index
	                    // https://github.com/ecomfe/echarts/issues/2869
	                    || (dist === minDist && diff > 0)
	                ) {
	                    minDist = dist;
	                    nearestIdx = i;
	                }
	            }
	            return nearestIdx;
	        }
	        return -1;
	    };

	    /**
	     * Get raw data index
	     * @param {number} idx
	     * @return {number}
	     */
	    listProto.getRawIndex = function (idx) {
	        var rawIdx = this.indices[idx];
	        return rawIdx == null ? -1 : rawIdx;
	    };

	    /**
	     * Get raw data item
	     * @param {number} idx
	     * @return {number}
	     */
	    listProto.getRawDataItem = function (idx) {
	        return this._rawData[this.getRawIndex(idx)];
	    };

	    /**
	     * @param {number} idx
	     * @param {boolean} [notDefaultIdx=false]
	     * @return {string}
	     */
	    listProto.getName = function (idx) {
	        return this._nameList[this.indices[idx]] || '';
	    };

	    /**
	     * @param {number} idx
	     * @param {boolean} [notDefaultIdx=false]
	     * @return {string}
	     */
	    listProto.getId = function (idx) {
	        return this._idList[this.indices[idx]] || (this.getRawIndex(idx) + '');
	    };


	    function normalizeDimensions(dimensions) {
	        if (!zrUtil.isArray(dimensions)) {
	            dimensions = [dimensions];
	        }
	        return dimensions;
	    }

	    /**
	     * Data iteration
	     * @param {string|Array.<string>}
	     * @param {Function} cb
	     * @param {boolean} [stack=false]
	     * @param {*} [context=this]
	     *
	     * @example
	     *  list.each('x', function (x, idx) {});
	     *  list.each(['x', 'y'], function (x, y, idx) {});
	     *  list.each(function (idx) {})
	     */
	    listProto.each = function (dims, cb, stack, context) {
	        if (typeof dims === 'function') {
	            context = stack;
	            stack = cb;
	            cb = dims;
	            dims = [];
	        }

	        dims = zrUtil.map(normalizeDimensions(dims), this.getDimension, this);

	        var value = [];
	        var dimSize = dims.length;
	        var indices = this.indices;

	        context = context || this;

	        for (var i = 0; i < indices.length; i++) {
	            // Simple optimization
	            switch (dimSize) {
	                case 0:
	                    cb.call(context, i);
	                    break;
	                case 1:
	                    cb.call(context, this.get(dims[0], i, stack), i);
	                    break;
	                case 2:
	                    cb.call(context, this.get(dims[0], i, stack), this.get(dims[1], i, stack), i);
	                    break;
	                default:
	                    for (var k = 0; k < dimSize; k++) {
	                        value[k] = this.get(dims[k], i, stack);
	                    }
	                    // Index
	                    value[k] = i;
	                    cb.apply(context, value);
	            }
	        }
	    };

	    /**
	     * Data filter
	     * @param {string|Array.<string>}
	     * @param {Function} cb
	     * @param {boolean} [stack=false]
	     * @param {*} [context=this]
	     */
	    listProto.filterSelf = function (dimensions, cb, stack, context) {
	        if (typeof dimensions === 'function') {
	            context = stack;
	            stack = cb;
	            cb = dimensions;
	            dimensions = [];
	        }

	        dimensions = zrUtil.map(
	            normalizeDimensions(dimensions), this.getDimension, this
	        );

	        var newIndices = [];
	        var value = [];
	        var dimSize = dimensions.length;
	        var indices = this.indices;

	        context = context || this;

	        for (var i = 0; i < indices.length; i++) {
	            var keep;
	            // Simple optimization
	            if (dimSize === 1) {
	                keep = cb.call(
	                    context, this.get(dimensions[0], i, stack), i
	                );
	            }
	            else {
	                for (var k = 0; k < dimSize; k++) {
	                    value[k] = this.get(dimensions[k], i, stack);
	                }
	                value[k] = i;
	                keep = cb.apply(context, value);
	            }
	            if (keep) {
	                newIndices.push(indices[i]);
	            }
	        }

	        this.indices = newIndices;

	        // Reset data extent
	        this._extent = {};

	        return this;
	    };

	    /**
	     * Data mapping to a plain array
	     * @param {string|Array.<string>} [dimensions]
	     * @param {Function} cb
	     * @param {boolean} [stack=false]
	     * @param {*} [context=this]
	     * @return {Array}
	     */
	    listProto.mapArray = function (dimensions, cb, stack, context) {
	        if (typeof dimensions === 'function') {
	            context = stack;
	            stack = cb;
	            cb = dimensions;
	            dimensions = [];
	        }

	        var result = [];
	        this.each(dimensions, function () {
	            result.push(cb && cb.apply(this, arguments));
	        }, stack, context);
	        return result;
	    };

	    function cloneListForMapAndSample(original, excludeDimensions) {
	        var allDimensions = original.dimensions;
	        var list = new List(
	            zrUtil.map(allDimensions, original.getDimensionInfo, original),
	            original.hostModel
	        );
	        // FIXME If needs stackedOn, value may already been stacked
	        transferProperties(list, original);

	        var storage = list._storage = {};
	        var originalStorage = original._storage;
	        // Init storage
	        for (var i = 0; i < allDimensions.length; i++) {
	            var dim = allDimensions[i];
	            var dimStore = originalStorage[dim];
	            if (zrUtil.indexOf(excludeDimensions, dim) >= 0) {
	                storage[dim] = new dimStore.constructor(
	                    originalStorage[dim].length
	                );
	            }
	            else {
	                // Direct reference for other dimensions
	                storage[dim] = originalStorage[dim];
	            }
	        }
	        return list;
	    }

	    /**
	     * Data mapping to a new List with given dimensions
	     * @param {string|Array.<string>} dimensions
	     * @param {Function} cb
	     * @param {boolean} [stack=false]
	     * @param {*} [context=this]
	     * @return {Array}
	     */
	    listProto.map = function (dimensions, cb, stack, context) {
	        dimensions = zrUtil.map(
	            normalizeDimensions(dimensions), this.getDimension, this
	        );

	        var list = cloneListForMapAndSample(this, dimensions);
	        // Following properties are all immutable.
	        // So we can reference to the same value
	        var indices = list.indices = this.indices;

	        var storage = list._storage;

	        var tmpRetValue = [];
	        this.each(dimensions, function () {
	            var idx = arguments[arguments.length - 1];
	            var retValue = cb && cb.apply(this, arguments);
	            if (retValue != null) {
	                // a number
	                if (typeof retValue === 'number') {
	                    tmpRetValue[0] = retValue;
	                    retValue = tmpRetValue;
	                }
	                for (var i = 0; i < retValue.length; i++) {
	                    var dim = dimensions[i];
	                    var dimStore = storage[dim];
	                    var rawIdx = indices[idx];
	                    if (dimStore) {
	                        dimStore[rawIdx] = retValue[i];
	                    }
	                }
	            }
	        }, stack, context);

	        return list;
	    };

	    /**
	     * Large data down sampling on given dimension
	     * @param {string} dimension
	     * @param {number} rate
	     * @param {Function} sampleValue
	     * @param {Function} sampleIndex Sample index for name and id
	     */
	    listProto.downSample = function (dimension, rate, sampleValue, sampleIndex) {
	        var list = cloneListForMapAndSample(this, [dimension]);
	        var storage = this._storage;
	        var targetStorage = list._storage;

	        var originalIndices = this.indices;
	        var indices = list.indices = [];

	        var frameValues = [];
	        var frameIndices = [];
	        var frameSize = Math.floor(1 / rate);

	        var dimStore = targetStorage[dimension];
	        var len = this.count();
	        // Copy data from original data
	        for (var i = 0; i < storage[dimension].length; i++) {
	            targetStorage[dimension][i] = storage[dimension][i];
	        }
	        for (var i = 0; i < len; i += frameSize) {
	            // Last frame
	            if (frameSize > len - i) {
	                frameSize = len - i;
	                frameValues.length = frameSize;
	            }
	            for (var k = 0; k < frameSize; k++) {
	                var idx = originalIndices[i + k];
	                frameValues[k] = dimStore[idx];
	                frameIndices[k] = idx;
	            }
	            var value = sampleValue(frameValues);
	            var idx = frameIndices[sampleIndex(frameValues, value) || 0];
	            // Only write value on the filtered data
	            dimStore[idx] = value;
	            indices.push(idx);
	        }

	        return list;
	    };

	    /**
	     * Get model of one data item.
	     *
	     * @param {number} idx
	     */
	    // FIXME Model proxy ?
	    listProto.getItemModel = function (idx) {
	        var hostModel = this.hostModel;
	        idx = this.indices[idx];
	        return new Model(this._rawData[idx], hostModel, hostModel && hostModel.ecModel);
	    };

	    /**
	     * Create a data differ
	     * @param {module:echarts/data/List} otherList
	     * @return {module:echarts/data/DataDiffer}
	     */
	    listProto.diff = function (otherList) {
	        var idList = this._idList;
	        var otherIdList = otherList && otherList._idList;
	        return new DataDiffer(
	            otherList ? otherList.indices : [], this.indices, function (idx) {
	                return otherIdList[idx] || (idx + '');
	            }, function (idx) {
	                return idList[idx] || (idx + '');
	            }
	        );
	    };
	    /**
	     * Get visual property.
	     * @param {string} key
	     */
	    listProto.getVisual = function (key) {
	        var visual = this._visual;
	        return visual && visual[key];
	    };

	    /**
	     * Set visual property
	     * @param {string|Object} key
	     * @param {*} [value]
	     *
	     * @example
	     *  setVisual('color', color);
	     *  setVisual({
	     *      'color': color
	     *  });
	     */
	    listProto.setVisual = function (key, val) {
	        if (isObject(key)) {
	            for (var name in key) {
	                if (key.hasOwnProperty(name)) {
	                    this.setVisual(name, key[name]);
	                }
	            }
	            return;
	        }
	        this._visual = this._visual || {};
	        this._visual[key] = val;
	    };

	    /**
	     * Set layout property.
	     * @param {string} key
	     * @param {*} [val]
	     */
	    listProto.setLayout = function (key, val) {
	        if (isObject(key)) {
	            for (var name in key) {
	                if (key.hasOwnProperty(name)) {
	                    this.setLayout(name, key[name]);
	                }
	            }
	            return;
	        }
	        this._layout[key] = val;
	    };

	    /**
	     * Get layout property.
	     * @param  {string} key.
	     * @return {*}
	     */
	    listProto.getLayout = function (key) {
	        return this._layout[key];
	    };

	    /**
	     * Get layout of single data item
	     * @param {number} idx
	     */
	    listProto.getItemLayout = function (idx) {
	        return this._itemLayouts[idx];
	    };

	    /**
	     * Set layout of single data item
	     * @param {number} idx
	     * @param {Object} layout
	     * @param {boolean=} [merge=false]
	     */
	    listProto.setItemLayout = function (idx, layout, merge) {
	        this._itemLayouts[idx] = merge
	            ? zrUtil.extend(this._itemLayouts[idx] || {}, layout)
	            : layout;
	    };

	    /**
	     * Clear all layout of single data item
	     */
	    listProto.clearItemLayouts = function () {
	        this._itemLayouts.length = 0;
	    };

	    /**
	     * Get visual property of single data item
	     * @param {number} idx
	     * @param {string} key
	     * @param {boolean} ignoreParent
	     */
	    listProto.getItemVisual = function (idx, key, ignoreParent) {
	        var itemVisual = this._itemVisuals[idx];
	        var val = itemVisual && itemVisual[key];
	        if (val == null && !ignoreParent) {
	            // Use global visual property
	            return this.getVisual(key);
	        }
	        return val;
	    };

	    /**
	     * Set visual property of single data item
	     *
	     * @param {number} idx
	     * @param {string|Object} key
	     * @param {*} [value]
	     *
	     * @example
	     *  setItemVisual(0, 'color', color);
	     *  setItemVisual(0, {
	     *      'color': color
	     *  });
	     */
	    listProto.setItemVisual = function (idx, key, value) {
	        var itemVisual = this._itemVisuals[idx] || {};
	        this._itemVisuals[idx] = itemVisual;

	        if (isObject(key)) {
	            for (var name in key) {
	                if (key.hasOwnProperty(name)) {
	                    itemVisual[name] = key[name];
	                }
	            }
	            return;
	        }
	        itemVisual[key] = value;
	    };

	    /**
	     * Clear itemVisuals and list visual.
	     */
	    listProto.clearAllVisual = function () {
	        this._visual = {};
	        this._itemVisuals = [];
	    };

	    var setItemDataAndSeriesIndex = function (child) {
	        child.seriesIndex = this.seriesIndex;
	        child.dataIndex = this.dataIndex;
	        child.dataType = this.dataType;
	    };
	    /**
	     * Set graphic element relative to data. It can be set as null
	     * @param {number} idx
	     * @param {module:zrender/Element} [el]
	     */
	    listProto.setItemGraphicEl = function (idx, el) {
	        var hostModel = this.hostModel;

	        if (el) {
	            // Add data index and series index for indexing the data by element
	            // Useful in tooltip
	            el.dataIndex = idx;
	            el.dataType = this.dataType;
	            el.seriesIndex = hostModel && hostModel.seriesIndex;
	            if (el.type === 'group') {
	                el.traverse(setItemDataAndSeriesIndex, el);
	            }
	        }

	        this._graphicEls[idx] = el;
	    };

	    /**
	     * @param {number} idx
	     * @return {module:zrender/Element}
	     */
	    listProto.getItemGraphicEl = function (idx) {
	        return this._graphicEls[idx];
	    };

	    /**
	     * @param {Function} cb
	     * @param {*} context
	     */
	    listProto.eachItemGraphicEl = function (cb, context) {
	        zrUtil.each(this._graphicEls, function (el, idx) {
	            if (el) {
	                cb && cb.call(context, el, idx);
	            }
	        });
	    };

	    /**
	     * Shallow clone a new list except visual and layout properties, and graph elements.
	     * New list only change the indices.
	     */
	    listProto.cloneShallow = function () {
	        var dimensionInfoList = zrUtil.map(this.dimensions, this.getDimensionInfo, this);
	        var list = new List(dimensionInfoList, this.hostModel);

	        // FIXME
	        list._storage = this._storage;

	        transferProperties(list, this);


	        // Clone will not change the data extent and indices
	        list.indices = this.indices.slice();

	        if (this._extent) {
	            list._extent = zrUtil.extend({}, this._extent);
	        }

	        return list;
	    };

	    /**
	     * Wrap some method to add more feature
	     * @param {string} methodName
	     * @param {Function} injectFunction
	     */
	    listProto.wrapMethod = function (methodName, injectFunction) {
	        var originalMethod = this[methodName];
	        if (typeof originalMethod !== 'function') {
	            return;
	        }
	        this.__wrappedMethods = this.__wrappedMethods || [];
	        this.__wrappedMethods.push(methodName);
	        this[methodName] = function () {
	            var res = originalMethod.apply(this, arguments);
	            return injectFunction.apply(this, [res].concat(zrUtil.slice(arguments)));
	        };
	    };

	    // Methods that create a new list based on this list should be listed here.
	    // Notice that those method should `RETURN` the new list.
	    listProto.TRANSFERABLE_METHODS = ['cloneShallow', 'downSample', 'map'];
	    // Methods that change indices of this list should be listed here.
	    listProto.CHANGABLE_METHODS = ['filterSelf'];

	    return List;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
	    'use strict';

	    function defaultKeyGetter(item) {
	        return item;
	    }

	    function DataDiffer(oldArr, newArr, oldKeyGetter, newKeyGetter) {
	        this._old = oldArr;
	        this._new = newArr;

	        this._oldKeyGetter = oldKeyGetter || defaultKeyGetter;
	        this._newKeyGetter = newKeyGetter || defaultKeyGetter;
	    }

	    DataDiffer.prototype = {

	        constructor: DataDiffer,

	        /**
	         * Callback function when add a data
	         */
	        add: function (func) {
	            this._add = func;
	            return this;
	        },

	        /**
	         * Callback function when update a data
	         */
	        update: function (func) {
	            this._update = func;
	            return this;
	        },

	        /**
	         * Callback function when remove a data
	         */
	        remove: function (func) {
	            this._remove = func;
	            return this;
	        },

	        execute: function () {
	            var oldArr = this._old;
	            var newArr = this._new;
	            var oldKeyGetter = this._oldKeyGetter;
	            var newKeyGetter = this._newKeyGetter;

	            var oldDataIndexMap = {};
	            var newDataIndexMap = {};
	            var i;

	            initIndexMap(oldArr, oldDataIndexMap, oldKeyGetter);
	            initIndexMap(newArr, newDataIndexMap, newKeyGetter);

	            // Travel by inverted order to make sure order consistency
	            // when duplicate keys exists (consider newDataIndex.pop() below).
	            // For performance consideration, these code below do not look neat.
	            for (i = 0; i < oldArr.length; i++) {
	                var key = oldKeyGetter(oldArr[i], i);
	                var idx = newDataIndexMap[key];

	                // idx can never be empty array here. see 'set null' logic below.
	                if (idx != null) {
	                    // Consider there is duplicate key (for example, use dataItem.name as key).
	                    // We should make sure every item in newArr and oldArr can be visited.
	                    var len = idx.length;
	                    if (len) {
	                        len === 1 && (newDataIndexMap[key] = null);
	                        idx = idx.unshift();
	                    }
	                    else {
	                        newDataIndexMap[key] = null;
	                    }
	                    this._update && this._update(idx, i);
	                }
	                else {
	                    this._remove && this._remove(i);
	                }
	            }

	            for (var key in newDataIndexMap) {
	                if (newDataIndexMap.hasOwnProperty(key)) {
	                    var idx = newDataIndexMap[key];
	                    if (idx == null) {
	                        continue;
	                    }
	                    // idx can never be empty array here. see 'set null' logic above.
	                    if (!idx.length) {
	                        this._add && this._add(idx);
	                    }
	                    else {
	                        for (var i = 0, len = idx.length; i < len; i++) {
	                            this._add && this._add(idx[i]);
	                        }
	                    }
	                }
	            }
	        }
	    };

	    function initIndexMap(arr, map, keyGetter) {
	        for (var i = 0; i < arr.length; i++) {
	            var key = keyGetter(arr[i], i);
	            var existence = map[key];
	            if (existence == null) {
	                map[key] = i;
	            }
	            else {
	                if (!existence.length) {
	                    map[key] = existence = [existence];
	                }
	                existence.push(i);
	            }
	        }
	    }

	    return DataDiffer;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var echarts = __webpack_require__(1);
	    var PRIORITY = echarts.PRIORITY;

	    __webpack_require__(33);
	    __webpack_require__(36);

	    echarts.registerVisual(zrUtil.curry(
	        __webpack_require__(42), 'line', 'circle', 'line'
	    ));
	    echarts.registerLayout(zrUtil.curry(
	        __webpack_require__(43), 'line'
	    ));

	    // Down sample after filter
	    echarts.registerProcessor(PRIORITY.PROCESSOR.STATISTIC, zrUtil.curry(
	        __webpack_require__(44), 'line'
	    ));

	    // In case developer forget to include grid component
	    __webpack_require__(45);
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {

	    'use strict';

	    var createListFromArray = __webpack_require__(34);
	    var SeriesModel = __webpack_require__(22);

	    return SeriesModel.extend({

	        type: 'series.line',

	        dependencies: ['grid', 'polar'],

	        getInitialData: function (option, ecModel) {
	            if (true) {
	                var coordSys = option.coordinateSystem;
	                if (coordSys !== 'polar' && coordSys !== 'cartesian2d') {
	                    throw new Error('Line not support coordinateSystem besides cartesian and polar');
	                }
	            }
	            return createListFromArray(option.data, this, ecModel);
	        },

	        defaultOption: {
	            zlevel: 0,                  // 一级层叠
	            z: 2,                       // 二级层叠
	            coordinateSystem: 'cartesian2d',
	            legendHoverLink: true,

	            hoverAnimation: true,
	            // stack: null
	            xAxisIndex: 0,
	            yAxisIndex: 0,

	            polarIndex: 0,

	            // If clip the overflow value
	            clipOverflow: true,

	            label: {
	                normal: {
	                    position: 'top'
	                }
	            },
	            // itemStyle: {
	            //     normal: {},
	            //     emphasis: {}
	            // },
	            lineStyle: {
	                normal: {
	                    width: 2,
	                    type: 'solid'
	                }
	            },
	            // areaStyle: {},
	            // false, 'start', 'end', 'middle'
	            step: false,

	            // Disabled if step is true
	            smooth: false,
	            smoothMonotone: null,
	            // 拐点图形类型
	            symbol: 'emptyCircle',
	            // 拐点图形大小
	            symbolSize: 4,
	            // 拐点图形旋转控制
	            symbolRotate: null,

	            // 是否显示 symbol, 只有在 tooltip hover 的时候显示
	            showSymbol: true,
	            // 标志图形默认只有主轴显示（随主轴标签间隔隐藏策略）
	            showAllSymbol: false,

	            // 是否连接断点
	            connectNulls: false,

	            // 数据过滤，'average', 'max', 'min', 'sum'
	            sampling: 'none',

	            animationEasing: 'linear',

	            // Disable progressive
	            progressive: 0,
	            hoverLayerThreshold: Infinity
	        }
	    });
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
	    'use strict';

	    var List = __webpack_require__(30);
	    var completeDimensions = __webpack_require__(35);
	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var modelUtil = __webpack_require__(3);
	    var CoordinateSystem = __webpack_require__(20);
	    var getDataItemValue = modelUtil.getDataItemValue;
	    var converDataValue = modelUtil.converDataValue;

	    function firstDataNotNull(data) {
	        var i = 0;
	        while (i < data.length && data[i] == null) {
	            i++;
	        }
	        return data[i];
	    }
	    function ifNeedCompleteOrdinalData(data) {
	        var sampleItem = firstDataNotNull(data);
	        return sampleItem != null
	            && !zrUtil.isArray(getDataItemValue(sampleItem));
	    }

	    /**
	     * Helper function to create a list from option data
	     */
	    function createListFromArray(data, seriesModel, ecModel) {
	        // If data is undefined
	        data = data || [];

	        if (true) {
	            if (!zrUtil.isArray(data)) {
	                throw new Error('Invalid data.');
	            }
	        }

	        var coordSysName = seriesModel.get('coordinateSystem');
	        var creator = creators[coordSysName];
	        var registeredCoordSys = CoordinateSystem.get(coordSysName);
	        // FIXME
	        var result = creator && creator(data, seriesModel, ecModel);
	        var dimensions = result && result.dimensions;
	        if (!dimensions) {
	            // Get dimensions from registered coordinate system
	            dimensions = (registeredCoordSys && registeredCoordSys.dimensions) || ['x', 'y'];
	            dimensions = completeDimensions(dimensions, data, dimensions.concat(['value']));
	        }
	        var categoryAxisModel = result && result.categoryAxisModel;
	        var categories;

	        var categoryDimIndex = dimensions[0].type === 'ordinal'
	            ? 0 : (dimensions[1].type === 'ordinal' ? 1 : -1);

	        var list = new List(dimensions, seriesModel);

	        var nameList = createNameList(result, data);

	        var dimValueGetter = (categoryAxisModel && ifNeedCompleteOrdinalData(data))
	            ? function (itemOpt, dimName, dataIndex, dimIndex) {
	                // If any dataItem is like { value: 10 }
	                if (modelUtil.isDataItemOption(itemOpt)) {
	                    list.hasItemOption = true;
	                }

	                // Use dataIndex as ordinal value in categoryAxis
	                return dimIndex === categoryDimIndex
	                    ? dataIndex
	                    : converDataValue(getDataItemValue(itemOpt), dimensions[dimIndex]);
	            }
	            : function (itemOpt, dimName, dataIndex, dimIndex) {
	                var value = getDataItemValue(itemOpt);
	                var val = converDataValue(value && value[dimIndex], dimensions[dimIndex]);
	                // If any dataItem is like { value: 10 }
	                if (modelUtil.isDataItemOption(itemOpt)) {
	                    list.hasItemOption = true;
	                }

	                if (categoryDimIndex === dimIndex) {
	                    // If given value is a category string
	                    if (typeof val === 'string') {
	                        // Lazy get categories
	                        categories = categories || categoryAxisModel.getCategories();
	                        val = zrUtil.indexOf(categories, val);
	                        if (val < 0 && !isNaN(val)) {
	                            // In case some one write '1', '2' istead of 1, 2
	                            val = +val;
	                        }
	                    }
	                }
	                return val;
	            };

	        list.hasItemOption = false;
	        list.initData(data, nameList, dimValueGetter);

	        return list;
	    }

	    function isStackable(axisType) {
	        return axisType !== 'category' && axisType !== 'time';
	    }

	    function getDimTypeByAxis(axisType) {
	        return axisType === 'category'
	            ? 'ordinal'
	            : axisType === 'time'
	            ? 'time'
	            : 'float';
	    }

	    /**
	     * Creaters for each coord system.
	     * @return {Object} {dimensions, categoryAxisModel};
	     */
	    var creators = {

	        cartesian2d: function (data, seriesModel, ecModel) {
	            var xAxisModel = ecModel.getComponent('xAxis', seriesModel.get('xAxisIndex'));
	            var yAxisModel = ecModel.getComponent('yAxis', seriesModel.get('yAxisIndex'));

	            if (true) {
	                if (!xAxisModel) {
	                    throw new Error('xAxis "' + seriesModel.get('xAxisIndex') + '" not found');
	                }
	                if (!yAxisModel) {
	                    throw new Error('yAxis "' + seriesModel.get('yAxisIndex') + '" not found');
	                }
	            }

	            var xAxisType = xAxisModel.get('type');
	            var yAxisType = yAxisModel.get('type');

	            var dimensions = [
	                {
	                    name: 'x',
	                    type: getDimTypeByAxis(xAxisType),
	                    stackable: isStackable(xAxisType)
	                },
	                {
	                    name: 'y',
	                    // If two category axes
	                    type: getDimTypeByAxis(yAxisType),
	                    stackable: isStackable(yAxisType)
	                }
	            ];

	            var isXAxisCateogry = xAxisType === 'category';

	            completeDimensions(dimensions, data, ['x', 'y', 'z']);

	            return {
	                dimensions: dimensions,
	                categoryIndex: isXAxisCateogry ? 0 : 1,
	                categoryAxisModel: isXAxisCateogry
	                    ? xAxisModel
	                    : (yAxisType === 'category' ? yAxisModel : null)
	            };
	        },

	        polar: function (data, seriesModel, ecModel) {
	            var polarIndex = seriesModel.get('polarIndex') || 0;

	            var axisFinder = function (axisModel) {
	                return axisModel.get('polarIndex') === polarIndex;
	            };

	            var angleAxisModel = ecModel.findComponents({
	                mainType: 'angleAxis', filter: axisFinder
	            })[0];
	            var radiusAxisModel = ecModel.findComponents({
	                mainType: 'radiusAxis', filter: axisFinder
	            })[0];

	            if (true) {
	                if (!angleAxisModel) {
	                    throw new Error('angleAxis option not found');
	                }
	                if (!radiusAxisModel) {
	                    throw new Error('radiusAxis option not found');
	                }
	            }

	            var radiusAxisType = radiusAxisModel.get('type');
	            var angleAxisType = angleAxisModel.get('type');

	            var dimensions = [
	                {
	                    name: 'radius',
	                    type: getDimTypeByAxis(radiusAxisType),
	                    stackable: isStackable(radiusAxisType)
	                },
	                {
	                    name: 'angle',
	                    type: getDimTypeByAxis(angleAxisType),
	                    stackable: isStackable(angleAxisType)
	                }
	            ];
	            var isAngleAxisCateogry = angleAxisType === 'category';

	            completeDimensions(dimensions, data, ['radius', 'angle', 'value']);

	            return {
	                dimensions: dimensions,
	                categoryIndex: isAngleAxisCateogry ? 1 : 0,
	                categoryAxisModel: isAngleAxisCateogry
	                    ? angleAxisModel
	                    : (radiusAxisType === 'category' ? radiusAxisModel : null)
	            };
	        },

	        geo: function (data, seriesModel, ecModel) {
	            // TODO Region
	            // 多个散点图系列在同一个地区的时候
	            return {
	                dimensions: completeDimensions([
	                    {name: 'lng'},
	                    {name: 'lat'}
	                ], data, ['lng', 'lat', 'value'])
	            };
	        }
	    };

	    function createNameList(result, data) {
	        var nameList = [];

	        if (result && result.categoryAxisModel) {
	            // FIXME Two category axis
	            var categories = result.categoryAxisModel.getCategories();
	            if (categories) {
	                var dataLen = data.length;
	                // Ordered data is given explicitly like
	                // [[3, 0.2], [1, 0.3], [2, 0.15]]
	                // or given scatter data,
	                // pick the category
	                if (zrUtil.isArray(data[0]) && data[0].length > 1) {
	                    nameList = [];
	                    for (var i = 0; i < dataLen; i++) {
	                        nameList[i] = categories[data[i][result.categoryIndex || 0]];
	                    }
	                }
	                else {
	                    nameList = categories.slice(0);
	                }
	            }
	        }

	        return nameList;
	    }

	    return createListFromArray;

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Complete dimensions by data (guess dimension).
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    /**
	     * Complete the dimensions array guessed from the data structure.
	     * @param  {Array.<string>} dimensions      Necessary dimensions, like ['x', 'y']
	     * @param  {Array} data                     Data list. [[1, 2, 3], [2, 3, 4]]
	     * @param  {Array.<string>} defaultNames    Default names to fill not necessary dimensions, like ['value']
	     * @param  {string} extraPrefix             Prefix of name when filling the left dimensions.
	     * @return {Array.<string>}
	     */
	    function completeDimensions(dimensions, data, defaultNames, extraPrefix) {
	        if (!data) {
	            return dimensions;
	        }

	        var value0 = retrieveValue(data[0]);
	        var dimSize = zrUtil.isArray(value0) && value0.length || 1;

	        defaultNames = defaultNames || [];
	        extraPrefix = extraPrefix || 'extra';
	        for (var i = 0; i < dimSize; i++) {
	            if (!dimensions[i]) {
	                var name = defaultNames[i] || (extraPrefix + (i - defaultNames.length));
	                dimensions[i] = guessOrdinal(data, i)
	                    ? {type: 'ordinal', name: name}
	                    : name;
	            }
	        }

	        return dimensions;
	    }

	    // The rule should not be complex, otherwise user might not
	    // be able to known where the data is wrong.
	    var guessOrdinal = completeDimensions.guessOrdinal = function (data, dimIndex) {
	        for (var i = 0, len = data.length; i < len; i++) {
	            var value = retrieveValue(data[i]);

	            if (!zrUtil.isArray(value)) {
	                return false;
	            }

	            var value = value[dimIndex];
	            if (value != null && isFinite(value)) {
	                return false;
	            }
	            else if (zrUtil.isString(value) && value !== '-') {
	                return true;
	            }
	        }
	        return false;
	    };

	    function retrieveValue(o) {
	        return zrUtil.isArray(o) ? o : zrUtil.isObject(o) ? o.value: o;
	    }

	    return completeDimensions;

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;// FIXME step not support polar
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {

	    'use strict';

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var SymbolDraw = __webpack_require__(37);
	    var Symbol = __webpack_require__(38);
	    var lineAnimationDiff = __webpack_require__(40);
	    var graphic = __webpack_require__(25);

	    var polyHelper = __webpack_require__(41);

	    var ChartView = __webpack_require__(24);

	    function isPointsSame(points1, points2) {
	        if (points1.length !== points2.length) {
	            return;
	        }
	        for (var i = 0; i < points1.length; i++) {
	            var p1 = points1[i];
	            var p2 = points2[i];
	            if (p1[0] !== p2[0] || p1[1] !== p2[1]) {
	                return;
	            }
	        }
	        return true;
	    }

	    function getSmooth(smooth) {
	        return typeof (smooth) === 'number' ? smooth : (smooth ? 0.3 : 0);
	    }

	    function getAxisExtentWithGap(axis) {
	        var extent = axis.getGlobalExtent();
	        if (axis.onBand) {
	            // Remove extra 1px to avoid line miter in clipped edge
	            var halfBandWidth = axis.getBandWidth() / 2 - 1;
	            var dir = extent[1] > extent[0] ? 1 : -1;
	            extent[0] += dir * halfBandWidth;
	            extent[1] -= dir * halfBandWidth;
	        }
	        return extent;
	    }

	    function sign(val) {
	        return val >= 0 ? 1 : -1;
	    }
	    /**
	     * @param {module:echarts/coord/cartesian/Cartesian2D|module:echarts/coord/polar/Polar} coordSys
	     * @param {module:echarts/data/List} data
	     * @param {Array.<Array.<number>>} points
	     * @private
	     */
	    function getStackedOnPoints(coordSys, data) {
	        var baseAxis = coordSys.getBaseAxis();
	        var valueAxis = coordSys.getOtherAxis(baseAxis);
	        var valueStart = baseAxis.onZero
	            ? 0 : valueAxis.scale.getExtent()[0];

	        var valueDim = valueAxis.dim;

	        var baseDataOffset = valueDim === 'x' || valueDim === 'radius' ? 1 : 0;

	        return data.mapArray([valueDim], function (val, idx) {
	            var stackedOnSameSign;
	            var stackedOn = data.stackedOn;
	            // Find first stacked value with same sign
	            while (stackedOn &&
	                sign(stackedOn.get(valueDim, idx)) === sign(val)
	            ) {
	                stackedOnSameSign = stackedOn;
	                break;
	            }
	            var stackedData = [];
	            stackedData[baseDataOffset] = data.get(baseAxis.dim, idx);
	            stackedData[1 - baseDataOffset] = stackedOnSameSign
	                ? stackedOnSameSign.get(valueDim, idx, true) : valueStart;

	            return coordSys.dataToPoint(stackedData);
	        }, true);
	    }

	    function queryDataIndex(data, payload) {
	        if (payload.dataIndex != null) {
	            return payload.dataIndex;
	        }
	        else if (payload.name != null) {
	            return data.indexOfName(payload.name);
	        }
	    }

	    function createGridClipShape(cartesian, hasAnimation, seriesModel) {
	        var xExtent = getAxisExtentWithGap(cartesian.getAxis('x'));
	        var yExtent = getAxisExtentWithGap(cartesian.getAxis('y'));
	        var isHorizontal = cartesian.getBaseAxis().isHorizontal();

	        var x = Math.min(xExtent[0], xExtent[1]);
	        var y = Math.min(yExtent[0], yExtent[1]);
	        var width = Math.max(xExtent[0], xExtent[1]) - x;
	        var height = Math.max(yExtent[0], yExtent[1]) - y;
	        var lineWidth = seriesModel.get('lineStyle.normal.width') || 2;
	        // Expand clip shape to avoid clipping when line value exceeds axis
	        var expandSize = seriesModel.get('clipOverflow') ? lineWidth / 2 : Math.max(width, height);
	        if (isHorizontal) {
	            y -= expandSize;
	            height += expandSize * 2;
	        }
	        else {
	            x -= expandSize;
	            width += expandSize * 2;
	        }

	        var clipPath = new graphic.Rect({
	            shape: {
	                x: x,
	                y: y,
	                width: width,
	                height: height
	            }
	        });

	        if (hasAnimation) {
	            clipPath.shape[isHorizontal ? 'width' : 'height'] = 0;
	            graphic.initProps(clipPath, {
	                shape: {
	                    width: width,
	                    height: height
	                }
	            }, seriesModel);
	        }

	        return clipPath;
	    }

	    function createPolarClipShape(polar, hasAnimation, seriesModel) {
	        var angleAxis = polar.getAngleAxis();
	        var radiusAxis = polar.getRadiusAxis();

	        var radiusExtent = radiusAxis.getExtent();
	        var angleExtent = angleAxis.getExtent();

	        var RADIAN = Math.PI / 180;

	        var clipPath = new graphic.Sector({
	            shape: {
	                cx: polar.cx,
	                cy: polar.cy,
	                r0: radiusExtent[0],
	                r: radiusExtent[1],
	                startAngle: -angleExtent[0] * RADIAN,
	                endAngle: -angleExtent[1] * RADIAN,
	                clockwise: angleAxis.inverse
	            }
	        });

	        if (hasAnimation) {
	            clipPath.shape.endAngle = -angleExtent[0] * RADIAN;
	            graphic.initProps(clipPath, {
	                shape: {
	                    endAngle: -angleExtent[1] * RADIAN
	                }
	            }, seriesModel);
	        }

	        return clipPath;
	    }

	    function createClipShape(coordSys, hasAnimation, seriesModel) {
	        return coordSys.type === 'polar'
	            ? createPolarClipShape(coordSys, hasAnimation, seriesModel)
	            : createGridClipShape(coordSys, hasAnimation, seriesModel);
	    }

	    function turnPointsIntoStep(points, coordSys, stepTurnAt) {
	        var baseAxis = coordSys.getBaseAxis();
	        var baseIndex = baseAxis.dim === 'x' || baseAxis.dim === 'radius' ? 0 : 1;

	        var stepPoints = [];
	        for (var i = 0; i < points.length - 1; i++) {
	            var nextPt = points[i + 1];
	            var pt = points[i];
	            stepPoints.push(pt);

	            var stepPt = [];
	            switch (stepTurnAt) {
	                case 'end':
	                    stepPt[baseIndex] = nextPt[baseIndex];
	                    stepPt[1 - baseIndex] = pt[1 - baseIndex];
	                    // default is start
	                    stepPoints.push(stepPt);
	                    break;
	                case 'middle':
	                    // default is start
	                    var middle = (pt[baseIndex] + nextPt[baseIndex]) / 2;
	                    var stepPt2 = [];
	                    stepPt[baseIndex] = stepPt2[baseIndex] = middle;
	                    stepPt[1 - baseIndex] = pt[1 - baseIndex];
	                    stepPt2[1 - baseIndex] = nextPt[1 - baseIndex];
	                    stepPoints.push(stepPt);
	                    stepPoints.push(stepPt2);
	                    break;
	                default:
	                    stepPt[baseIndex] = pt[baseIndex];
	                    stepPt[1 - baseIndex] = nextPt[1 - baseIndex];
	                    // default is start
	                    stepPoints.push(stepPt);
	            }
	        }
	        // Last points
	        points[i] && stepPoints.push(points[i]);
	        return stepPoints;
	    }

	    function clamp(number, extent) {
	        return Math.max(Math.min(number, extent[1]), extent[0]);
	    }

	    function getVisualGradient(data, coordSys) {
	        var visualMetaList = data.getVisual('visualMeta');
	        if (!visualMetaList) {
	            return;
	        }

	        var visualMeta;
	        for (var i = visualMetaList.length - 1; i >= 0; i--) {
	            // Can only be x or y
	            if (visualMetaList[i].dimension < 2) {
	                visualMeta = visualMetaList[i];
	                break;
	            }
	        }
	        if (!visualMeta || coordSys.type !== 'cartesian2d') {
	            if (true) {
	                console.warn('Visual map on line style only support x or y dimension.');
	            }
	            return;
	        }
	        var dimension = visualMeta.dimension;
	        var dimName = data.dimensions[dimension];
	        var dataExtent = data.getDataExtent(dimName);

	        var stops = visualMeta.stops;

	        var colorStops = [];
	        if (stops[0].interval) {
	            stops.sort(function (a, b) {
	                return a.interval[0] - b.interval[0];
	            });
	        }

	        var firstStop = stops[0];
	        var lastStop = stops[stops.length - 1];
	        // Interval can be infinity in piecewise case
	        var min = firstStop.interval ? clamp(firstStop.interval[0], dataExtent) : firstStop.value;
	        var max = lastStop.interval ? clamp(lastStop.interval[1], dataExtent) : lastStop.value;
	        var stopsSpan = max - min;
	        for (var i = 0; i < stops.length; i++) {
	            // Piecewise
	            if (stops[i].interval) {
	                if (stops[i].interval[1] === stops[i].interval[0]) {
	                    continue;
	                }
	                colorStops.push({
	                    // Make sure offset is between 0 and 1
	                    offset: (clamp(stops[i].interval[0], dataExtent) - min) / stopsSpan,
	                    color: stops[i].color
	                }, {
	                    offset: (clamp(stops[i].interval[1], dataExtent) - min) / stopsSpan,
	                    color: stops[i].color
	                });
	            }
	            // Continous
	            else {
	                // if (i > 0 && stops[i].value === stops[i - 1].value) {
	                //     continue;
	                // }
	                colorStops.push({
	                    offset: (stops[i].value - min) / stopsSpan,
	                    color: stops[i].color
	                });
	            }
	        }
	        var gradient = new graphic.LinearGradient(
	            0, 0, 0, 0, colorStops, true
	        );
	        var axis = coordSys.getAxis(dimName);

	        gradient[dimName] = axis.toGlobalCoord(axis.dataToCoord(min));
	        gradient[dimName + '2'] = axis.toGlobalCoord(axis.dataToCoord(max));

	        return gradient;
	    }

	    return ChartView.extend({

	        type: 'line',

	        init: function () {
	            var lineGroup = new graphic.Group();

	            var symbolDraw = new SymbolDraw();
	            this.group.add(symbolDraw.group);

	            this._symbolDraw = symbolDraw;
	            this._lineGroup = lineGroup;
	        },

	        render: function (seriesModel, ecModel, api) {
	            var coordSys = seriesModel.coordinateSystem;
	            var group = this.group;
	            var data = seriesModel.getData();
	            var lineStyleModel = seriesModel.getModel('lineStyle.normal');
	            var areaStyleModel = seriesModel.getModel('areaStyle.normal');

	            var points = data.mapArray(data.getItemLayout, true);

	            var isCoordSysPolar = coordSys.type === 'polar';
	            var prevCoordSys = this._coordSys;

	            var symbolDraw = this._symbolDraw;
	            var polyline = this._polyline;
	            var polygon = this._polygon;

	            var lineGroup = this._lineGroup;

	            var hasAnimation = seriesModel.get('animation');

	            var isAreaChart = !areaStyleModel.isEmpty();
	            var stackedOnPoints = getStackedOnPoints(coordSys, data);

	            var showSymbol = seriesModel.get('showSymbol');

	            var isSymbolIgnore = showSymbol && !isCoordSysPolar && !seriesModel.get('showAllSymbol')
	                && this._getSymbolIgnoreFunc(data, coordSys);

	            // Remove temporary symbols
	            var oldData = this._data;
	            oldData && oldData.eachItemGraphicEl(function (el, idx) {
	                if (el.__temp) {
	                    group.remove(el);
	                    oldData.setItemGraphicEl(idx, null);
	                }
	            });

	            // Remove previous created symbols if showSymbol changed to false
	            if (!showSymbol) {
	                symbolDraw.remove();
	            }

	            group.add(lineGroup);

	            // FIXME step not support polar
	            var step = !isCoordSysPolar && seriesModel.get('step');
	            // Initialization animation or coordinate system changed
	            if (
	                !(polyline && prevCoordSys.type === coordSys.type && step === this._step)
	            ) {
	                showSymbol && symbolDraw.updateData(data, isSymbolIgnore);

	                if (step) {
	                    // TODO If stacked series is not step
	                    points = turnPointsIntoStep(points, coordSys, step);
	                    stackedOnPoints = turnPointsIntoStep(stackedOnPoints, coordSys, step);
	                }

	                polyline = this._newPolyline(points, coordSys, hasAnimation);
	                if (isAreaChart) {
	                    polygon = this._newPolygon(
	                        points, stackedOnPoints,
	                        coordSys, hasAnimation
	                    );
	                }
	                lineGroup.setClipPath(createClipShape(coordSys, true, seriesModel));
	            }
	            else {
	                if (isAreaChart && !polygon) {
	                    // If areaStyle is added
	                    polygon = this._newPolygon(
	                        points, stackedOnPoints,
	                        coordSys, hasAnimation
	                    );
	                }
	                else if (polygon && !isAreaChart) {
	                    // If areaStyle is removed
	                    lineGroup.remove(polygon);
	                    polygon = this._polygon = null;
	                }

	                // Update clipPath
	                lineGroup.setClipPath(createClipShape(coordSys, false, seriesModel));

	                // Always update, or it is wrong in the case turning on legend
	                // because points are not changed
	                showSymbol && symbolDraw.updateData(data, isSymbolIgnore);

	                // Stop symbol animation and sync with line points
	                // FIXME performance?
	                data.eachItemGraphicEl(function (el) {
	                    el.stopAnimation(true);
	                });

	                // In the case data zoom triggerred refreshing frequently
	                // Data may not change if line has a category axis. So it should animate nothing
	                if (!isPointsSame(this._stackedOnPoints, stackedOnPoints)
	                    || !isPointsSame(this._points, points)
	                ) {
	                    if (hasAnimation) {
	                        this._updateAnimation(
	                            data, stackedOnPoints, coordSys, api, step
	                        );
	                    }
	                    else {
	                        polyline.setShape({
	                            points: points
	                        });
	                        polygon && polygon.setShape({
	                            points: points,
	                            stackedOnPoints: stackedOnPoints
	                        });
	                    }
	                }
	            }

	            var visualColor = getVisualGradient(data, coordSys) || data.getVisual('color');
	            polyline.useStyle(zrUtil.defaults(
	                // Use color in lineStyle first
	                lineStyleModel.getLineStyle(),
	                {
	                    fill: 'none',
	                    stroke: visualColor,
	                    lineJoin: 'bevel'
	                }
	            ));

	            var smooth = seriesModel.get('smooth');
	            smooth = getSmooth(seriesModel.get('smooth'));
	            polyline.setShape({
	                smooth: smooth,
	                smoothMonotone: seriesModel.get('smoothMonotone'),
	                connectNulls: seriesModel.get('connectNulls')
	            });

	            if (polygon) {
	                var stackedOn = data.stackedOn;
	                var stackedOnSmooth = 0;

	                polygon.useStyle(zrUtil.defaults(
	                    areaStyleModel.getAreaStyle(),
	                    {
	                        fill: visualColor,
	                        opacity: 0.7,
	                        lineJoin: 'bevel'
	                    }
	                ));

	                if (stackedOn) {
	                    var stackedOnSeries = stackedOn.hostModel;
	                    stackedOnSmooth = getSmooth(stackedOnSeries.get('smooth'));
	                }

	                polygon.setShape({
	                    smooth: smooth,
	                    stackedOnSmooth: stackedOnSmooth,
	                    smoothMonotone: seriesModel.get('smoothMonotone'),
	                    connectNulls: seriesModel.get('connectNulls')
	                });
	            }

	            this._data = data;
	            // Save the coordinate system for transition animation when data changed
	            this._coordSys = coordSys;
	            this._stackedOnPoints = stackedOnPoints;
	            this._points = points;
	            this._step = step;
	        },

	        highlight: function (seriesModel, ecModel, api, payload) {
	            var data = seriesModel.getData();
	            var dataIndex = queryDataIndex(data, payload);

	            if (dataIndex != null && dataIndex >= 0) {
	                var symbol = data.getItemGraphicEl(dataIndex);
	                if (!symbol) {
	                    // Create a temporary symbol if it is not exists
	                    var pt = data.getItemLayout(dataIndex);
	                    symbol = new Symbol(data, dataIndex);
	                    symbol.position = pt;
	                    symbol.setZ(
	                        seriesModel.get('zlevel'),
	                        seriesModel.get('z')
	                    );
	                    symbol.ignore = isNaN(pt[0]) || isNaN(pt[1]);
	                    symbol.__temp = true;
	                    data.setItemGraphicEl(dataIndex, symbol);

	                    // Stop scale animation
	                    symbol.stopSymbolAnimation(true);

	                    this.group.add(symbol);
	                }
	                symbol.highlight();
	            }
	            else {
	                // Highlight whole series
	                ChartView.prototype.highlight.call(
	                    this, seriesModel, ecModel, api, payload
	                );
	            }
	        },

	        downplay: function (seriesModel, ecModel, api, payload) {
	            var data = seriesModel.getData();
	            var dataIndex = queryDataIndex(data, payload);
	            if (dataIndex != null && dataIndex >= 0) {
	                var symbol = data.getItemGraphicEl(dataIndex);
	                if (symbol) {
	                    if (symbol.__temp) {
	                        data.setItemGraphicEl(dataIndex, null);
	                        this.group.remove(symbol);
	                    }
	                    else {
	                        symbol.downplay();
	                    }
	                }
	            }
	            else {
	                // Downplay whole series
	                ChartView.prototype.downplay.call(
	                    this, seriesModel, ecModel, api, payload
	                );
	            }
	        },

	        /**
	         * @param {module:zrender/container/Group} group
	         * @param {Array.<Array.<number>>} points
	         * @private
	         */
	        _newPolyline: function (points) {
	            var polyline = this._polyline;
	            // Remove previous created polyline
	            if (polyline) {
	                this._lineGroup.remove(polyline);
	            }

	            polyline = new polyHelper.Polyline({
	                shape: {
	                    points: points
	                },
	                silent: true,
	                z2: 10
	            });

	            this._lineGroup.add(polyline);

	            this._polyline = polyline;

	            return polyline;
	        },

	        /**
	         * @param {module:zrender/container/Group} group
	         * @param {Array.<Array.<number>>} stackedOnPoints
	         * @param {Array.<Array.<number>>} points
	         * @private
	         */
	        _newPolygon: function (points, stackedOnPoints) {
	            var polygon = this._polygon;
	            // Remove previous created polygon
	            if (polygon) {
	                this._lineGroup.remove(polygon);
	            }

	            polygon = new polyHelper.Polygon({
	                shape: {
	                    points: points,
	                    stackedOnPoints: stackedOnPoints
	                },
	                silent: true
	            });

	            this._lineGroup.add(polygon);

	            this._polygon = polygon;
	            return polygon;
	        },
	        /**
	         * @private
	         */
	        _getSymbolIgnoreFunc: function (data, coordSys) {
	            var categoryAxis = coordSys.getAxesByScale('ordinal')[0];
	            // `getLabelInterval` is provided by echarts/component/axis
	            if (categoryAxis && categoryAxis.isLabelIgnored) {
	                return zrUtil.bind(categoryAxis.isLabelIgnored, categoryAxis);
	            }
	        },

	        /**
	         * @private
	         */
	        // FIXME Two value axis
	        _updateAnimation: function (data, stackedOnPoints, coordSys, api, step) {
	            var polyline = this._polyline;
	            var polygon = this._polygon;
	            var seriesModel = data.hostModel;

	            var diff = lineAnimationDiff(
	                this._data, data,
	                this._stackedOnPoints, stackedOnPoints,
	                this._coordSys, coordSys
	            );

	            var current = diff.current;
	            var stackedOnCurrent = diff.stackedOnCurrent;
	            var next = diff.next;
	            var stackedOnNext = diff.stackedOnNext;
	            if (step) {
	                // TODO If stacked series is not step
	                current = turnPointsIntoStep(diff.current, coordSys, step);
	                stackedOnCurrent = turnPointsIntoStep(diff.stackedOnCurrent, coordSys, step);
	                next = turnPointsIntoStep(diff.next, coordSys, step);
	                stackedOnNext = turnPointsIntoStep(diff.stackedOnNext, coordSys, step);
	            }
	            polyline.shape.__points = diff.current;
	            polyline.shape.points = current;

	            graphic.updateProps(polyline, {
	                shape: {
	                    points: next
	                }
	            }, seriesModel);

	            if (polygon) {
	                polygon.setShape({
	                    points: current,
	                    stackedOnPoints: stackedOnCurrent
	                });
	                graphic.updateProps(polygon, {
	                    shape: {
	                        points: next,
	                        stackedOnPoints: stackedOnNext,
	                        __points: diff.next
	                    }
	                }, seriesModel);
	            }

	            var updatedDataInfo = [];
	            var diffStatus = diff.status;

	            for (var i = 0; i < diffStatus.length; i++) {
	                var cmd = diffStatus[i].cmd;
	                if (cmd === '=') {
	                    var el = data.getItemGraphicEl(diffStatus[i].idx1);
	                    if (el) {
	                        updatedDataInfo.push({
	                            el: el,
	                            ptIdx: i    // Index of points
	                        });
	                    }
	                }
	            }

	            if (polyline.animators && polyline.animators.length) {
	                polyline.animators[0].during(function () {
	                    for (var i = 0; i < updatedDataInfo.length; i++) {
	                        var el = updatedDataInfo[i].el;
	                        el.attr('position', polyline.shape.__points[updatedDataInfo[i].ptIdx]);
	                    }
	                });
	            }
	        },

	        remove: function (ecModel) {
	            var group = this.group;
	            var oldData = this._data;
	            this._lineGroup.removeAll();
	            this._symbolDraw.remove(true);
	            // Remove temporary created elements when highlighting
	            oldData && oldData.eachItemGraphicEl(function (el, idx) {
	                if (el.__temp) {
	                    group.remove(el);
	                    oldData.setItemGraphicEl(idx, null);
	                }
	            });

	            this._polyline =
	            this._polygon =
	            this._coordSys =
	            this._points =
	            this._stackedOnPoints =
	            this._data = null;
	        }
	    });
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @module echarts/chart/helper/SymbolDraw
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var graphic = __webpack_require__(25);
	    var Symbol = __webpack_require__(38);

	    /**
	     * @constructor
	     * @alias module:echarts/chart/helper/SymbolDraw
	     * @param {module:zrender/graphic/Group} [symbolCtor]
	     */
	    function SymbolDraw(symbolCtor) {
	        this.group = new graphic.Group();

	        this._symbolCtor = symbolCtor || Symbol;
	    }

	    var symbolDrawProto = SymbolDraw.prototype;

	    function symbolNeedsDraw(data, idx, isIgnore) {
	        var point = data.getItemLayout(idx);
	        return point && !isNaN(point[0]) && !isNaN(point[1]) && !(isIgnore && isIgnore(idx))
	                    && data.getItemVisual(idx, 'symbol') !== 'none';
	    }
	    /**
	     * Update symbols draw by new data
	     * @param {module:echarts/data/List} data
	     * @param {Array.<boolean>} [isIgnore]
	     */
	    symbolDrawProto.updateData = function (data, isIgnore) {
	        var group = this.group;
	        var seriesModel = data.hostModel;
	        var oldData = this._data;

	        var SymbolCtor = this._symbolCtor;

	        var seriesScope = {
	            itemStyle: seriesModel.getModel('itemStyle.normal').getItemStyle(['color']),
	            hoverItemStyle: seriesModel.getModel('itemStyle.emphasis').getItemStyle(),
	            symbolRotate: seriesModel.get('symbolRotate'),
	            symbolOffset: seriesModel.get('symbolOffset'),
	            hoverAnimation: seriesModel.get('hoverAnimation'),

	            labelModel: seriesModel.getModel('label.normal'),
	            hoverLabelModel: seriesModel.getModel('label.emphasis')
	        };

	        data.diff(oldData)
	            .add(function (newIdx) {
	                var point = data.getItemLayout(newIdx);
	                if (symbolNeedsDraw(data, newIdx, isIgnore)) {
	                    var symbolEl = new SymbolCtor(data, newIdx, seriesScope);
	                    symbolEl.attr('position', point);
	                    data.setItemGraphicEl(newIdx, symbolEl);
	                    group.add(symbolEl);
	                }
	            })
	            .update(function (newIdx, oldIdx) {
	                var symbolEl = oldData.getItemGraphicEl(oldIdx);
	                var point = data.getItemLayout(newIdx);
	                if (!symbolNeedsDraw(data, newIdx, isIgnore)) {
	                    group.remove(symbolEl);
	                    return;
	                }
	                if (!symbolEl) {
	                    symbolEl = new SymbolCtor(data, newIdx);
	                    symbolEl.attr('position', point);
	                }
	                else {
	                    symbolEl.updateData(data, newIdx, seriesScope);
	                    graphic.updateProps(symbolEl, {
	                        position: point
	                    }, seriesModel);
	                }

	                // Add back
	                group.add(symbolEl);

	                data.setItemGraphicEl(newIdx, symbolEl);
	            })
	            .remove(function (oldIdx) {
	                var el = oldData.getItemGraphicEl(oldIdx);
	                el && el.fadeOut(function () {
	                    group.remove(el);
	                });
	            })
	            .execute();

	        this._data = data;
	    };

	    symbolDrawProto.updateLayout = function () {
	        var data = this._data;
	        if (data) {
	            // Not use animation
	            data.eachItemGraphicEl(function (el, idx) {
	                var point = data.getItemLayout(idx);
	                el.attr('position', point);
	            });
	        }
	    };

	    symbolDrawProto.remove = function (enableAnimation) {
	        var group = this.group;
	        var data = this._data;
	        if (data) {
	            if (enableAnimation) {
	                data.eachItemGraphicEl(function (el) {
	                    el.fadeOut(function () {
	                        group.remove(el);
	                    });
	                });
	            }
	            else {
	                group.removeAll();
	            }
	        }
	    };

	    return SymbolDraw;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @module echarts/chart/helper/Symbol
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var symbolUtil = __webpack_require__(39);
	    var graphic = __webpack_require__(25);
	    var numberUtil = __webpack_require__(5);

	    function normalizeSymbolSize(symbolSize) {
	        if (!(symbolSize instanceof Array)) {
	            symbolSize = [+symbolSize, +symbolSize];
	        }
	        return symbolSize;
	    }

	    /**
	     * @constructor
	     * @alias {module:echarts/chart/helper/Symbol}
	     * @param {module:echarts/data/List} data
	     * @param {number} idx
	     * @extends {module:zrender/graphic/Group}
	     */
	    function Symbol(data, idx, seriesScope) {
	        graphic.Group.call(this);

	        this.updateData(data, idx, seriesScope);
	    }

	    var symbolProto = Symbol.prototype;

	    function driftSymbol(dx, dy) {
	        this.parent.drift(dx, dy);
	    }

	    symbolProto._createSymbol = function (symbolType, data, idx) {
	        // Remove paths created before
	        this.removeAll();

	        var seriesModel = data.hostModel;
	        var color = data.getItemVisual(idx, 'color');

	        var symbolPath = symbolUtil.createSymbol(
	            symbolType, -0.5, -0.5, 1, 1, color
	        );

	        symbolPath.attr({
	            z2: 100,
	            culling: true,
	            scale: [0, 0]
	        });
	        // Rewrite drift method
	        symbolPath.drift = driftSymbol;

	        var size = normalizeSymbolSize(data.getItemVisual(idx, 'symbolSize'));

	        graphic.initProps(symbolPath, {
	            scale: size
	        }, seriesModel, idx);

	        this._symbolType = symbolType;

	        this.add(symbolPath);
	    };

	    /**
	     * Stop animation
	     * @param {boolean} toLastFrame
	     */
	    symbolProto.stopSymbolAnimation = function (toLastFrame) {
	        this.childAt(0).stopAnimation(toLastFrame);
	    };

	    /**
	     * Get scale(aka, current symbol size).
	     * Including the change caused by animation
	     */
	    symbolProto.getScale = function () {
	        return this.childAt(0).scale;
	    };

	    /**
	     * Highlight symbol
	     */
	    symbolProto.highlight = function () {
	        this.childAt(0).trigger('emphasis');
	    };

	    /**
	     * Downplay symbol
	     */
	    symbolProto.downplay = function () {
	        this.childAt(0).trigger('normal');
	    };

	    /**
	     * @param {number} zlevel
	     * @param {number} z
	     */
	    symbolProto.setZ = function (zlevel, z) {
	        var symbolPath = this.childAt(0);
	        symbolPath.zlevel = zlevel;
	        symbolPath.z = z;
	    };

	    symbolProto.setDraggable = function (draggable) {
	        var symbolPath = this.childAt(0);
	        symbolPath.draggable = draggable;
	        symbolPath.cursor = draggable ? 'move' : 'pointer';
	    };

	    /**
	     * Update symbol properties
	     * @param  {module:echarts/data/List} data
	     * @param  {number} idx
	     */
	    symbolProto.updateData = function (data, idx, seriesScope) {
	        this.silent = false;

	        var symbolType = data.getItemVisual(idx, 'symbol') || 'circle';
	        var seriesModel = data.hostModel;
	        var symbolSize = normalizeSymbolSize(data.getItemVisual(idx, 'symbolSize'));
	        if (symbolType !== this._symbolType) {
	            this._createSymbol(symbolType, data, idx);
	        }
	        else {
	            var symbolPath = this.childAt(0);
	            graphic.updateProps(symbolPath, {
	                scale: symbolSize
	            }, seriesModel, idx);
	        }
	        this._updateCommon(data, idx, symbolSize, seriesScope);

	        this._seriesModel = seriesModel;
	    };

	    // Update common properties
	    var normalStyleAccessPath = ['itemStyle', 'normal'];
	    var emphasisStyleAccessPath = ['itemStyle', 'emphasis'];
	    var normalLabelAccessPath = ['label', 'normal'];
	    var emphasisLabelAccessPath = ['label', 'emphasis'];

	    symbolProto._updateCommon = function (data, idx, symbolSize, seriesScope) {
	        var symbolPath = this.childAt(0);
	        var seriesModel = data.hostModel;
	        var color = data.getItemVisual(idx, 'color');

	        // Reset style
	        if (symbolPath.type !== 'image') {
	            symbolPath.useStyle({
	                strokeNoScale: true
	            });
	        }

	        seriesScope = seriesScope || null;

	        var itemStyle = seriesScope && seriesScope.itemStyle;
	        var hoverItemStyle = seriesScope && seriesScope.hoverItemStyle;
	        var symbolRotate = seriesScope && seriesScope.symbolRotate;
	        var symbolOffset = seriesScope && seriesScope.symbolOffset;
	        var labelModel = seriesScope && seriesScope.labelModel;
	        var hoverLabelModel = seriesScope && seriesScope.hoverLabelModel;
	        var hoverAnimation = seriesScope && seriesScope.hoverAnimation;

	        if (!seriesScope || data.hasItemOption) {
	            var itemModel = data.getItemModel(idx);

	            // Color must be excluded.
	            // Because symbol provide setColor individually to set fill and stroke
	            itemStyle = itemModel.getModel(normalStyleAccessPath).getItemStyle(['color']);
	            hoverItemStyle = itemModel.getModel(emphasisStyleAccessPath).getItemStyle();

	            symbolRotate = itemModel.getShallow('symbolRotate');
	            symbolOffset = itemModel.getShallow('symbolOffset');

	            labelModel = itemModel.getModel(normalLabelAccessPath);
	            hoverLabelModel = itemModel.getModel(emphasisLabelAccessPath);
	            hoverAnimation = itemModel.getShallow('hoverAnimation');
	        }
	        else {
	            hoverItemStyle = zrUtil.extend({}, hoverItemStyle);
	        }

	        var elStyle = symbolPath.style;

	        symbolPath.rotation = (symbolRotate || 0) * Math.PI / 180 || 0;

	        if (symbolOffset) {
	            symbolPath.attr('position', [
	                numberUtil.parsePercent(symbolOffset[0], symbolSize[0]),
	                numberUtil.parsePercent(symbolOffset[1], symbolSize[1])
	            ]);
	        }

	        // PENDING setColor before setStyle
	        symbolPath.setColor(color);

	        symbolPath.setStyle(itemStyle);

	        var opacity = data.getItemVisual(idx, 'opacity');
	        if (opacity != null) {
	            elStyle.opacity = opacity;
	        }

	        // Get last value dim
	        var dimensions = data.dimensions.slice();
	        var valueDim;
	        var dataType;
	        while (dimensions.length && (
	            valueDim = dimensions.pop(),
	            dataType = data.getDimensionInfo(valueDim).type,
	            dataType === 'ordinal' || dataType === 'time'
	        )) {} // jshint ignore:line

	        if (valueDim != null && labelModel.getShallow('show')) {
	            graphic.setText(elStyle, labelModel, color);
	            elStyle.text = zrUtil.retrieve(
	                seriesModel.getFormattedLabel(idx, 'normal'),
	                data.get(valueDim, idx)
	            );
	        }
	        else {
	            elStyle.text = '';
	        }

	        if (valueDim != null && hoverLabelModel.getShallow('show')) {
	            graphic.setText(hoverItemStyle, hoverLabelModel, color);
	            hoverItemStyle.text = zrUtil.retrieve(
	                seriesModel.getFormattedLabel(idx, 'emphasis'),
	                data.get(valueDim, idx)
	            );
	        }
	        else {
	            hoverItemStyle.text = '';
	        }

	        var size = normalizeSymbolSize(data.getItemVisual(idx, 'symbolSize'));

	        symbolPath.off('mouseover')
	            .off('mouseout')
	            .off('emphasis')
	            .off('normal');

	        graphic.setHoverStyle(symbolPath, hoverItemStyle);

	        if (hoverAnimation && seriesModel.ifEnableAnimation()) {
	            var onEmphasis = function() {
	                var ratio = size[1] / size[0];
	                this.animateTo({
	                    scale: [
	                        Math.max(size[0] * 1.1, size[0] + 3),
	                        Math.max(size[1] * 1.1, size[1] + 3 * ratio)
	                    ]
	                }, 400, 'elasticOut');
	            };
	            var onNormal = function() {
	                this.animateTo({
	                    scale: size
	                }, 400, 'elasticOut');
	            };
	            symbolPath.on('mouseover', onEmphasis)
	                .on('mouseout', onNormal)
	                .on('emphasis', onEmphasis)
	                .on('normal', onNormal);
	        }
	    };

	    symbolProto.fadeOut = function (cb) {
	        var symbolPath = this.childAt(0);
	        // Avoid mistaken hover when fading out
	        this.silent = true;
	        // Not show text when animating
	        symbolPath.style.text = '';
	        graphic.updateProps(symbolPath, {
	            scale: [0, 0]
	        }, this._seriesModel, this.dataIndex, cb);
	    };

	    zrUtil.inherits(Symbol, graphic.Group);

	    return Symbol;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;// Symbol factory
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {

	    'use strict';

	    var graphic = __webpack_require__(25);
	    var BoundingRect = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/BoundingRect\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    /**
	     * Triangle shape
	     * @inner
	     */
	    var Triangle = graphic.extendShape({
	        type: 'triangle',
	        shape: {
	            cx: 0,
	            cy: 0,
	            width: 0,
	            height: 0
	        },
	        buildPath: function (path, shape) {
	            var cx = shape.cx;
	            var cy = shape.cy;
	            var width = shape.width / 2;
	            var height = shape.height / 2;
	            path.moveTo(cx, cy - height);
	            path.lineTo(cx + width, cy + height);
	            path.lineTo(cx - width, cy + height);
	            path.closePath();
	        }
	    });
	    /**
	     * Diamond shape
	     * @inner
	     */
	    var Diamond = graphic.extendShape({
	        type: 'diamond',
	        shape: {
	            cx: 0,
	            cy: 0,
	            width: 0,
	            height: 0
	        },
	        buildPath: function (path, shape) {
	            var cx = shape.cx;
	            var cy = shape.cy;
	            var width = shape.width / 2;
	            var height = shape.height / 2;
	            path.moveTo(cx, cy - height);
	            path.lineTo(cx + width, cy);
	            path.lineTo(cx, cy + height);
	            path.lineTo(cx - width, cy);
	            path.closePath();
	        }
	    });

	    /**
	     * Pin shape
	     * @inner
	     */
	    var Pin = graphic.extendShape({
	        type: 'pin',
	        shape: {
	            // x, y on the cusp
	            x: 0,
	            y: 0,
	            width: 0,
	            height: 0
	        },

	        buildPath: function (path, shape) {
	            var x = shape.x;
	            var y = shape.y;
	            var w = shape.width / 5 * 3;
	            // Height must be larger than width
	            var h = Math.max(w, shape.height);
	            var r = w / 2;

	            // Dist on y with tangent point and circle center
	            var dy = r * r / (h - r);
	            var cy = y - h + r + dy;
	            var angle = Math.asin(dy / r);
	            // Dist on x with tangent point and circle center
	            var dx = Math.cos(angle) * r;

	            var tanX = Math.sin(angle);
	            var tanY = Math.cos(angle);

	            path.arc(
	                x, cy, r,
	                Math.PI - angle,
	                Math.PI * 2 + angle
	            );

	            var cpLen = r * 0.6;
	            var cpLen2 = r * 0.7;
	            path.bezierCurveTo(
	                x + dx - tanX * cpLen, cy + dy + tanY * cpLen,
	                x, y - cpLen2,
	                x, y
	            );
	            path.bezierCurveTo(
	                x, y - cpLen2,
	                x - dx + tanX * cpLen, cy + dy + tanY * cpLen,
	                x - dx, cy + dy
	            );
	            path.closePath();
	        }
	    });

	    /**
	     * Arrow shape
	     * @inner
	     */
	    var Arrow = graphic.extendShape({

	        type: 'arrow',

	        shape: {
	            x: 0,
	            y: 0,
	            width: 0,
	            height: 0
	        },

	        buildPath: function (ctx, shape) {
	            var height = shape.height;
	            var width = shape.width;
	            var x = shape.x;
	            var y = shape.y;
	            var dx = width / 3 * 2;
	            ctx.moveTo(x, y);
	            ctx.lineTo(x + dx, y + height);
	            ctx.lineTo(x, y + height / 4 * 3);
	            ctx.lineTo(x - dx, y + height);
	            ctx.lineTo(x, y);
	            ctx.closePath();
	        }
	    });

	    /**
	     * Map of path contructors
	     * @type {Object.<string, module:zrender/graphic/Path>}
	     */
	    var symbolCtors = {
	        line: graphic.Line,

	        rect: graphic.Rect,

	        roundRect: graphic.Rect,

	        square: graphic.Rect,

	        circle: graphic.Circle,

	        diamond: Diamond,

	        pin: Pin,

	        arrow: Arrow,

	        triangle: Triangle
	    };

	    var symbolShapeMakers = {

	        line: function (x, y, w, h, shape) {
	            // FIXME
	            shape.x1 = x;
	            shape.y1 = y + h / 2;
	            shape.x2 = x + w;
	            shape.y2 = y + h / 2;
	        },

	        rect: function (x, y, w, h, shape) {
	            shape.x = x;
	            shape.y = y;
	            shape.width = w;
	            shape.height = h;
	        },

	        roundRect: function (x, y, w, h, shape) {
	            shape.x = x;
	            shape.y = y;
	            shape.width = w;
	            shape.height = h;
	            shape.r = Math.min(w, h) / 4;
	        },

	        square: function (x, y, w, h, shape) {
	            var size = Math.min(w, h);
	            shape.x = x;
	            shape.y = y;
	            shape.width = size;
	            shape.height = size;
	        },

	        circle: function (x, y, w, h, shape) {
	            // Put circle in the center of square
	            shape.cx = x + w / 2;
	            shape.cy = y + h / 2;
	            shape.r = Math.min(w, h) / 2;
	        },

	        diamond: function (x, y, w, h, shape) {
	            shape.cx = x + w / 2;
	            shape.cy = y + h / 2;
	            shape.width = w;
	            shape.height = h;
	        },

	        pin: function (x, y, w, h, shape) {
	            shape.x = x + w / 2;
	            shape.y = y + h / 2;
	            shape.width = w;
	            shape.height = h;
	        },

	        arrow: function (x, y, w, h, shape) {
	            shape.x = x + w / 2;
	            shape.y = y + h / 2;
	            shape.width = w;
	            shape.height = h;
	        },

	        triangle: function (x, y, w, h, shape) {
	            shape.cx = x + w / 2;
	            shape.cy = y + h / 2;
	            shape.width = w;
	            shape.height = h;
	        }
	    };

	    var symbolBuildProxies = {};
	    for (var name in symbolCtors) {
	        symbolBuildProxies[name] = new symbolCtors[name]();
	    }

	    var Symbol = graphic.extendShape({

	        type: 'symbol',

	        shape: {
	            symbolType: '',
	            x: 0,
	            y: 0,
	            width: 0,
	            height: 0
	        },

	        beforeBrush: function () {
	            var style = this.style;
	            var shape = this.shape;
	            // FIXME
	            if (shape.symbolType === 'pin' && style.textPosition === 'inside') {
	                style.textPosition = ['50%', '40%'];
	                style.textAlign = 'center';
	                style.textVerticalAlign = 'middle';
	            }
	        },

	        buildPath: function (ctx, shape) {
	            var symbolType = shape.symbolType;
	            var proxySymbol = symbolBuildProxies[symbolType];
	            if (shape.symbolType !== 'none') {
	                if (!proxySymbol) {
	                    // Default rect
	                    symbolType = 'rect';
	                    proxySymbol = symbolBuildProxies[symbolType];
	                }
	                symbolShapeMakers[symbolType](
	                    shape.x, shape.y, shape.width, shape.height, proxySymbol.shape
	                );
	                proxySymbol.buildPath(ctx, proxySymbol.shape);
	            }
	        }
	    });

	    // Provide setColor helper method to avoid determine if set the fill or stroke outside
	    var symbolPathSetColor = function (color) {
	        if (this.type !== 'image') {
	            var symbolStyle = this.style;
	            var symbolShape = this.shape;
	            if (symbolShape && symbolShape.symbolType === 'line') {
	                symbolStyle.stroke = color;
	            }
	            else if (this.__isEmptyBrush) {
	                symbolStyle.stroke = color;
	                symbolStyle.fill = '#fff';
	            }
	            else {
	                // FIXME 判断图形默认是填充还是描边，使用 onlyStroke ?
	                symbolStyle.fill && (symbolStyle.fill = color);
	                symbolStyle.stroke && (symbolStyle.stroke = color);
	            }
	            this.dirty(false);
	        }
	    };

	    var symbolUtil = {
	        /**
	         * Create a symbol element with given symbol configuration: shape, x, y, width, height, color
	         * @param {string} symbolType
	         * @param {number} x
	         * @param {number} y
	         * @param {number} w
	         * @param {number} h
	         * @param {string} color
	         */
	        createSymbol: function (symbolType, x, y, w, h, color) {
	            var isEmpty = symbolType.indexOf('empty') === 0;
	            if (isEmpty) {
	                symbolType = symbolType.substr(5, 1).toLowerCase() + symbolType.substr(6);
	            }
	            var symbolPath;

	            if (symbolType.indexOf('image://') === 0) {
	                symbolPath = new graphic.Image({
	                    style: {
	                        image: symbolType.slice(8),
	                        x: x,
	                        y: y,
	                        width: w,
	                        height: h
	                    }
	                });
	            }
	            else if (symbolType.indexOf('path://') === 0) {
	                symbolPath = graphic.makePath(symbolType.slice(7), {}, new BoundingRect(x, y, w, h));
	            }
	            else {
	                symbolPath = new Symbol({
	                    shape: {
	                        symbolType: symbolType,
	                        x: x,
	                        y: y,
	                        width: w,
	                        height: h
	                    }
	                });
	            }

	            symbolPath.__isEmptyBrush = isEmpty;

	            symbolPath.setColor = symbolPathSetColor;

	            symbolPath.setColor(color);

	            return symbolPath;
	        }
	    };

	    return symbolUtil;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    // var arrayDiff = require('zrender/core/arrayDiff');
	    // 'zrender/core/arrayDiff' has been used before, but it did
	    // not do well in performance when roam with fixed dataZoom window.

	    function sign(val) {
	        return val >= 0 ? 1 : -1;
	    }

	    function getStackedOnPoint(coordSys, data, idx) {
	        var baseAxis = coordSys.getBaseAxis();
	        var valueAxis = coordSys.getOtherAxis(baseAxis);
	        var valueStart = baseAxis.onZero
	            ? 0 : valueAxis.scale.getExtent()[0];

	        var valueDim = valueAxis.dim;
	        var baseDataOffset = valueDim === 'x' || valueDim === 'radius' ? 1 : 0;

	        var stackedOnSameSign;
	        var stackedOn = data.stackedOn;
	        var val = data.get(valueDim, idx);
	        // Find first stacked value with same sign
	        while (stackedOn &&
	            sign(stackedOn.get(valueDim, idx)) === sign(val)
	        ) {
	            stackedOnSameSign = stackedOn;
	            break;
	        }
	        var stackedData = [];
	        stackedData[baseDataOffset] = data.get(baseAxis.dim, idx);
	        stackedData[1 - baseDataOffset] = stackedOnSameSign
	            ? stackedOnSameSign.get(valueDim, idx, true) : valueStart;

	        return coordSys.dataToPoint(stackedData);
	    }

	    // function convertToIntId(newIdList, oldIdList) {
	    //     // Generate int id instead of string id.
	    //     // Compare string maybe slow in score function of arrDiff

	    //     // Assume id in idList are all unique
	    //     var idIndicesMap = {};
	    //     var idx = 0;
	    //     for (var i = 0; i < newIdList.length; i++) {
	    //         idIndicesMap[newIdList[i]] = idx;
	    //         newIdList[i] = idx++;
	    //     }
	    //     for (var i = 0; i < oldIdList.length; i++) {
	    //         var oldId = oldIdList[i];
	    //         // Same with newIdList
	    //         if (idIndicesMap[oldId]) {
	    //             oldIdList[i] = idIndicesMap[oldId];
	    //         }
	    //         else {
	    //             oldIdList[i] = idx++;
	    //         }
	    //     }
	    // }

	    function diffData(oldData, newData) {
	        var diffResult = [];

	        newData.diff(oldData)
	            .add(function (idx) {
	                diffResult.push({cmd: '+', idx: idx});
	            })
	            .update(function (newIdx, oldIdx) {
	                diffResult.push({cmd: '=', idx: oldIdx, idx1: newIdx});
	            })
	            .remove(function (idx) {
	                diffResult.push({cmd: '-', idx: idx});
	            })
	            .execute();

	        return diffResult;
	    }

	    return function (
	        oldData, newData,
	        oldStackedOnPoints, newStackedOnPoints,
	        oldCoordSys, newCoordSys
	    ) {
	        var diff = diffData(oldData, newData);

	        // var newIdList = newData.mapArray(newData.getId);
	        // var oldIdList = oldData.mapArray(oldData.getId);

	        // convertToIntId(newIdList, oldIdList);

	        // // FIXME One data ?
	        // diff = arrayDiff(oldIdList, newIdList);

	        var currPoints = [];
	        var nextPoints = [];
	        // Points for stacking base line
	        var currStackedPoints = [];
	        var nextStackedPoints = [];

	        var status = [];
	        var sortedIndices = [];
	        var rawIndices = [];
	        var dims = newCoordSys.dimensions;
	        for (var i = 0; i < diff.length; i++) {
	            var diffItem = diff[i];
	            var pointAdded = true;

	            // FIXME, animation is not so perfect when dataZoom window moves fast
	            // Which is in case remvoing or add more than one data in the tail or head
	            switch (diffItem.cmd) {
	                case '=':
	                    var currentPt = oldData.getItemLayout(diffItem.idx);
	                    var nextPt = newData.getItemLayout(diffItem.idx1);
	                    // If previous data is NaN, use next point directly
	                    if (isNaN(currentPt[0]) || isNaN(currentPt[1])) {
	                        currentPt = nextPt.slice();
	                    }
	                    currPoints.push(currentPt);
	                    nextPoints.push(nextPt);

	                    currStackedPoints.push(oldStackedOnPoints[diffItem.idx]);
	                    nextStackedPoints.push(newStackedOnPoints[diffItem.idx1]);

	                    rawIndices.push(newData.getRawIndex(diffItem.idx1));
	                    break;
	                case '+':
	                    var idx = diffItem.idx;
	                    currPoints.push(
	                        oldCoordSys.dataToPoint([
	                            newData.get(dims[0], idx, true), newData.get(dims[1], idx, true)
	                        ])
	                    );

	                    nextPoints.push(newData.getItemLayout(idx).slice());

	                    currStackedPoints.push(
	                        getStackedOnPoint(oldCoordSys, newData, idx)
	                    );
	                    nextStackedPoints.push(newStackedOnPoints[idx]);

	                    rawIndices.push(newData.getRawIndex(idx));
	                    break;
	                case '-':
	                    var idx = diffItem.idx;
	                    var rawIndex = oldData.getRawIndex(idx);
	                    // Data is replaced. In the case of dynamic data queue
	                    // FIXME FIXME FIXME
	                    if (rawIndex !== idx) {
	                        currPoints.push(oldData.getItemLayout(idx));
	                        nextPoints.push(newCoordSys.dataToPoint([
	                            oldData.get(dims[0], idx, true), oldData.get(dims[1], idx, true)
	                        ]));

	                        currStackedPoints.push(oldStackedOnPoints[idx]);
	                        nextStackedPoints.push(
	                            getStackedOnPoint(
	                                newCoordSys, oldData, idx
	                            )
	                        );

	                        rawIndices.push(rawIndex);
	                    }
	                    else {
	                        pointAdded = false;
	                    }
	            }

	            // Original indices
	            if (pointAdded) {
	                status.push(diffItem);
	                sortedIndices.push(sortedIndices.length);
	            }
	        }

	        // Diff result may be crossed if all items are changed
	        // Sort by data index
	        sortedIndices.sort(function (a, b) {
	            return rawIndices[a] - rawIndices[b];
	        });

	        var sortedCurrPoints = [];
	        var sortedNextPoints = [];

	        var sortedCurrStackedPoints = [];
	        var sortedNextStackedPoints = [];

	        var sortedStatus = [];
	        for (var i = 0; i < sortedIndices.length; i++) {
	            var idx = sortedIndices[i];
	            sortedCurrPoints[i] = currPoints[idx];
	            sortedNextPoints[i] = nextPoints[idx];

	            sortedCurrStackedPoints[i] = currStackedPoints[idx];
	            sortedNextStackedPoints[i] = nextStackedPoints[idx];

	            sortedStatus[i] = status[idx];
	        }

	        return {
	            current: sortedCurrPoints,
	            next: sortedNextPoints,

	            stackedOnCurrent: sortedCurrStackedPoints,
	            stackedOnNext: sortedNextStackedPoints,

	            status: sortedStatus
	        };
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;// Poly path support NaN point
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var Path = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/graphic/Path\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var vec2 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/vector\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    var vec2Min = vec2.min;
	    var vec2Max = vec2.max;

	    var scaleAndAdd = vec2.scaleAndAdd;
	    var v2Copy = vec2.copy;

	    // Temporary variable
	    var v = [];
	    var cp0 = [];
	    var cp1 = [];

	    function isPointNull(p) {
	        return isNaN(p[0]) || isNaN(p[1]);
	    }

	    function drawSegment(
	        ctx, points, start, segLen, allLen,
	        dir, smoothMin, smoothMax, smooth, smoothMonotone, connectNulls
	    ) {
	        var prevIdx = 0;
	        var idx = start;
	        for (var k = 0; k < segLen; k++) {
	            var p = points[idx];
	            if (idx >= allLen || idx < 0) {
	                break;
	            }
	            if (isPointNull(p)) {
	                if (connectNulls) {
	                    idx += dir;
	                    continue;
	                }
	                break;
	            }

	            if (idx === start) {
	                ctx[dir > 0 ? 'moveTo' : 'lineTo'](p[0], p[1]);
	                v2Copy(cp0, p);
	            }
	            else {
	                if (smooth > 0) {
	                    var nextIdx = idx + dir;
	                    var nextP = points[nextIdx];
	                    if (connectNulls) {
	                        // Find next point not null
	                        while (nextP && isPointNull(points[nextIdx])) {
	                            nextIdx += dir;
	                            nextP = points[nextIdx];
	                        }
	                    }

	                    var ratioNextSeg = 0.5;
	                    var prevP = points[prevIdx];
	                    var nextP = points[nextIdx];
	                    // Last point
	                    if (!nextP || isPointNull(nextP)) {
	                        v2Copy(cp1, p);
	                    }
	                    else {
	                        // If next data is null in not connect case
	                        if (isPointNull(nextP) && !connectNulls) {
	                            nextP = p;
	                        }

	                        vec2.sub(v, nextP, prevP);

	                        var lenPrevSeg;
	                        var lenNextSeg;
	                        if (smoothMonotone === 'x' || smoothMonotone === 'y') {
	                            var dim = smoothMonotone === 'x' ? 0 : 1;
	                            lenPrevSeg = Math.abs(p[dim] - prevP[dim]);
	                            lenNextSeg = Math.abs(p[dim] - nextP[dim]);
	                        }
	                        else {
	                            lenPrevSeg = vec2.dist(p, prevP);
	                            lenNextSeg = vec2.dist(p, nextP);
	                        }

	                        // Use ratio of seg length
	                        ratioNextSeg = lenNextSeg / (lenNextSeg + lenPrevSeg);

	                        scaleAndAdd(cp1, p, v, -smooth * (1 - ratioNextSeg));
	                    }
	                    // Smooth constraint
	                    vec2Min(cp0, cp0, smoothMax);
	                    vec2Max(cp0, cp0, smoothMin);
	                    vec2Min(cp1, cp1, smoothMax);
	                    vec2Max(cp1, cp1, smoothMin);

	                    ctx.bezierCurveTo(
	                        cp0[0], cp0[1],
	                        cp1[0], cp1[1],
	                        p[0], p[1]
	                    );
	                    // cp0 of next segment
	                    scaleAndAdd(cp0, p, v, smooth * ratioNextSeg);
	                }
	                else {
	                    ctx.lineTo(p[0], p[1]);
	                }
	            }

	            prevIdx = idx;
	            idx += dir;
	        }

	        return k;
	    }

	    function getBoundingBox(points, smoothConstraint) {
	        var ptMin = [Infinity, Infinity];
	        var ptMax = [-Infinity, -Infinity];
	        if (smoothConstraint) {
	            for (var i = 0; i < points.length; i++) {
	                var pt = points[i];
	                if (pt[0] < ptMin[0]) { ptMin[0] = pt[0]; }
	                if (pt[1] < ptMin[1]) { ptMin[1] = pt[1]; }
	                if (pt[0] > ptMax[0]) { ptMax[0] = pt[0]; }
	                if (pt[1] > ptMax[1]) { ptMax[1] = pt[1]; }
	            }
	        }
	        return {
	            min: smoothConstraint ? ptMin : ptMax,
	            max: smoothConstraint ? ptMax : ptMin
	        };
	    }

	    return {

	        Polyline: Path.extend({

	            type: 'ec-polyline',

	            shape: {
	                points: [],

	                smooth: 0,

	                smoothConstraint: true,

	                smoothMonotone: null,

	                connectNulls: false
	            },

	            style: {
	                fill: null,

	                stroke: '#000'
	            },

	            buildPath: function (ctx, shape) {
	                var points = shape.points;

	                var i = 0;
	                var len = points.length;

	                var result = getBoundingBox(points, shape.smoothConstraint);

	                if (shape.connectNulls) {
	                    // Must remove first and last null values avoid draw error in polygon
	                    for (; len > 0; len--) {
	                        if (!isPointNull(points[len - 1])) {
	                            break;
	                        }
	                    }
	                    for (; i < len; i++) {
	                        if (!isPointNull(points[i])) {
	                            break;
	                        }
	                    }
	                }
	                while (i < len) {
	                    i += drawSegment(
	                        ctx, points, i, len, len,
	                        1, result.min, result.max, shape.smooth,
	                        shape.smoothMonotone, shape.connectNulls
	                    ) + 1;
	                }
	            }
	        }),

	        Polygon: Path.extend({

	            type: 'ec-polygon',

	            shape: {
	                points: [],

	                // Offset between stacked base points and points
	                stackedOnPoints: [],

	                smooth: 0,

	                stackedOnSmooth: 0,

	                smoothConstraint: true,

	                smoothMonotone: null,

	                connectNulls: false
	            },

	            buildPath: function (ctx, shape) {
	                var points = shape.points;
	                var stackedOnPoints = shape.stackedOnPoints;

	                var i = 0;
	                var len = points.length;
	                var smoothMonotone = shape.smoothMonotone;
	                var bbox = getBoundingBox(points, shape.smoothConstraint);
	                var stackedOnBBox = getBoundingBox(stackedOnPoints, shape.smoothConstraint);

	                if (shape.connectNulls) {
	                    // Must remove first and last null values avoid draw error in polygon
	                    for (; len > 0; len--) {
	                        if (!isPointNull(points[len - 1])) {
	                            break;
	                        }
	                    }
	                    for (; i < len; i++) {
	                        if (!isPointNull(points[i])) {
	                            break;
	                        }
	                    }
	                }
	                while (i < len) {
	                    var k = drawSegment(
	                        ctx, points, i, len, len,
	                        1, bbox.min, bbox.max, shape.smooth,
	                        smoothMonotone, shape.connectNulls
	                    );
	                    drawSegment(
	                        ctx, stackedOnPoints, i + k - 1, k, len,
	                        -1, stackedOnBBox.min, stackedOnBBox.max, shape.stackedOnSmooth,
	                        smoothMonotone, shape.connectNulls
	                    );
	                    i += k + 1;

	                    ctx.closePath();
	                }
	            }
	        })
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    return function (seriesType, defaultSymbolType, legendSymbol, ecModel, api) {

	        // Encoding visual for all series include which is filtered for legend drawing
	        ecModel.eachRawSeriesByType(seriesType, function (seriesModel) {
	            var data = seriesModel.getData();

	            var symbolType = seriesModel.get('symbol') || defaultSymbolType;
	            var symbolSize = seriesModel.get('symbolSize');

	            data.setVisual({
	                legendSymbol: legendSymbol || symbolType,
	                symbol: symbolType,
	                symbolSize: symbolSize
	            });

	            // Only visible series has each data be visual encoded
	            if (!ecModel.isSeriesFiltered(seriesModel)) {
	                if (typeof symbolSize === 'function') {
	                    data.each(function (idx) {
	                        var rawValue = seriesModel.getRawValue(idx);
	                        // FIXME
	                        var params = seriesModel.getDataParams(idx);
	                        data.setItemVisual(idx, 'symbolSize', symbolSize(rawValue, params));
	                    });
	                }
	                data.each(function (idx) {
	                    var itemModel = data.getItemModel(idx);
	                    var itemSymbolType = itemModel.getShallow('symbol', true);
	                    var itemSymbolSize = itemModel.getShallow('symbolSize', true);
	                    // If has item symbol
	                    if (itemSymbolType != null) {
	                        data.setItemVisual(idx, 'symbol', itemSymbolType);
	                    }
	                    if (itemSymbolSize != null) {
	                        // PENDING Transform symbolSize ?
	                        data.setItemVisual(idx, 'symbolSize', itemSymbolSize);
	                    }
	                });
	            }
	        });
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    return function (seriesType, ecModel) {
	        ecModel.eachSeriesByType(seriesType, function (seriesModel) {
	            var data = seriesModel.getData();
	            var coordSys = seriesModel.coordinateSystem;

	            if (coordSys) {
	                var dims = coordSys.dimensions;

	                if (coordSys.type === 'singleAxis') {
	                    data.each(dims[0], function (x, idx) {
	                        // Also {Array.<number>}, not undefined to avoid if...else... statement
	                        data.setItemLayout(idx, isNaN(x) ? [NaN, NaN] : coordSys.dataToPoint(x));
	                    });
	                }
	                else {
	                    data.each(dims, function (x, y, idx) {
	                        // Also {Array.<number>}, not undefined to avoid if...else... statement
	                        data.setItemLayout(
	                            idx, (isNaN(x) || isNaN(y)) ? [NaN, NaN] : coordSys.dataToPoint([x, y])
	                        );
	                    }, true);
	                }
	            }
	        });
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    var samplers = {
	        average: function (frame) {
	            var sum = 0;
	            var count = 0;
	            for (var i = 0; i < frame.length; i++) {
	                if (!isNaN(frame[i])) {
	                    sum += frame[i];
	                    count++;
	                }
	            }
	            // Return NaN if count is 0
	            return count === 0 ? NaN : sum / count;
	        },
	        sum: function (frame) {
	            var sum = 0;
	            for (var i = 0; i < frame.length; i++) {
	                // Ignore NaN
	                sum += frame[i] || 0;
	            }
	            return sum;
	        },
	        max: function (frame) {
	            var max = -Infinity;
	            for (var i = 0; i < frame.length; i++) {
	                frame[i] > max && (max = frame[i]);
	            }
	            return max;
	        },
	        min: function (frame) {
	            var min = Infinity;
	            for (var i = 0; i < frame.length; i++) {
	                frame[i] < min && (min = frame[i]);
	            }
	            return min;
	        },
	        // TODO
	        // Median
	        nearest: function (frame) {
	            return frame[0];
	        }
	    };

	    var indexSampler = function (frame, value) {
	        return Math.round(frame.length / 2);
	    };
	    return function (seriesType, ecModel, api) {
	        ecModel.eachSeriesByType(seriesType, function (seriesModel) {
	            var data = seriesModel.getData();
	            var sampling = seriesModel.get('sampling');
	            var coordSys = seriesModel.coordinateSystem;
	            // Only cartesian2d support down sampling
	            if (coordSys.type === 'cartesian2d' && sampling) {
	                var baseAxis = coordSys.getBaseAxis();
	                var valueAxis = coordSys.getOtherAxis(baseAxis);
	                var extent = baseAxis.getExtent();
	                // Coordinste system has been resized
	                var size = extent[1] - extent[0];
	                var rate = Math.round(data.count() / size);
	                if (rate > 1) {
	                    var sampler;
	                    if (typeof sampling === 'string') {
	                        sampler = samplers[sampling];
	                    }
	                    else if (typeof sampling === 'function') {
	                        sampler = sampling;
	                    }
	                    if (sampler) {
	                        data = data.downSample(
	                            valueAxis.dim, 1 / rate, sampler, indexSampler
	                        );
	                        seriesModel.setData(data);
	                    }
	                }
	            }
	        }, this);
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
	    'use strict';

	    var graphic = __webpack_require__(25);
	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    __webpack_require__(46);

	    __webpack_require__(63);

	    // Grid view
	    __webpack_require__(1).extendComponentView({

	        type: 'grid',

	        render: function (gridModel, ecModel) {
	            this.group.removeAll();
	            if (gridModel.get('show')) {
	                this.group.add(new graphic.Rect({
	                    shape:gridModel.coordinateSystem.getRect(),
	                    style: zrUtil.defaults({
	                        fill: gridModel.get('backgroundColor')
	                    }, gridModel.getItemStyle()),
	                    silent: true
	                }));
	            }
	        }
	    });
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Grid is a region which contains at most 4 cartesian systems
	 *
	 * TODO Default cartesian
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, factory) {

	    var layout = __webpack_require__(15);
	    var axisHelper = __webpack_require__(47);

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var Cartesian2D = __webpack_require__(53);
	    var Axis2D = __webpack_require__(55);

	    var each = zrUtil.each;

	    var ifAxisCrossZero = axisHelper.ifAxisCrossZero;
	    var niceScaleExtent = axisHelper.niceScaleExtent;

	    // 依赖 GridModel, AxisModel 做预处理
	    __webpack_require__(58);

	    /**
	     * Check if the axis is used in the specified grid
	     * @inner
	     */
	    function isAxisUsedInTheGrid(axisModel, gridModel, ecModel) {
	        return ecModel.getComponent('grid', axisModel.get('gridIndex')) === gridModel;
	    }

	    function getLabelUnionRect(axis) {
	        var axisModel = axis.model;
	        var labels = axisModel.getFormattedLabels();
	        var rect;
	        var step = 1;
	        var labelCount = labels.length;
	        if (labelCount > 40) {
	            // Simple optimization for large amount of labels
	            step = Math.ceil(labelCount / 40);
	        }
	        for (var i = 0; i < labelCount; i += step) {
	            if (!axis.isLabelIgnored(i)) {
	                var singleRect = axisModel.getTextRect(labels[i]);
	                // FIXME consider label rotate
	                rect ? rect.union(singleRect) : (rect = singleRect);
	            }
	        }
	        return rect;
	    }

	    function Grid(gridModel, ecModel, api) {
	        /**
	         * @type {Object.<string, module:echarts/coord/cartesian/Cartesian2D>}
	         * @private
	         */
	        this._coordsMap = {};

	        /**
	         * @type {Array.<module:echarts/coord/cartesian/Cartesian>}
	         * @private
	         */
	        this._coordsList = [];

	        /**
	         * @type {Object.<string, module:echarts/coord/cartesian/Axis2D>}
	         * @private
	         */
	        this._axesMap = {};

	        /**
	         * @type {Array.<module:echarts/coord/cartesian/Axis2D>}
	         * @private
	         */
	        this._axesList = [];

	        this._initCartesian(gridModel, ecModel, api);

	        this._model = gridModel;
	    }

	    var gridProto = Grid.prototype;

	    gridProto.type = 'grid';

	    gridProto.getRect = function () {
	        return this._rect;
	    };

	    gridProto.update = function (ecModel, api) {

	        var axesMap = this._axesMap;

	        this._updateScale(ecModel, this._model);

	        function ifAxisCanNotOnZero(otherAxisDim) {
	            var axes = axesMap[otherAxisDim];
	            for (var idx in axes) {
	                var axis = axes[idx];
	                if (axis && (axis.type === 'category' || !ifAxisCrossZero(axis))) {
	                    return true;
	                }
	            }
	            return false;
	        }

	        each(axesMap.x, function (xAxis) {
	            niceScaleExtent(xAxis, xAxis.model);
	        });
	        each(axesMap.y, function (yAxis) {
	            niceScaleExtent(yAxis, yAxis.model);
	        });
	        // Fix configuration
	        each(axesMap.x, function (xAxis) {
	            // onZero can not be enabled in these two situations
	            // 1. When any other axis is a category axis
	            // 2. When any other axis not across 0 point
	            if (ifAxisCanNotOnZero('y')) {
	                xAxis.onZero = false;
	            }
	        });
	        each(axesMap.y, function (yAxis) {
	            if (ifAxisCanNotOnZero('x')) {
	                yAxis.onZero = false;
	            }
	        });

	        // Resize again if containLabel is enabled
	        // FIXME It may cause getting wrong grid size in data processing stage
	        this.resize(this._model, api);
	    };

	    /**
	     * Resize the grid
	     * @param {module:echarts/coord/cartesian/GridModel} gridModel
	     * @param {module:echarts/ExtensionAPI} api
	     */
	    gridProto.resize = function (gridModel, api) {

	        var gridRect = layout.getLayoutRect(
	            gridModel.getBoxLayoutParams(), {
	                width: api.getWidth(),
	                height: api.getHeight()
	            });

	        this._rect = gridRect;

	        var axesList = this._axesList;

	        adjustAxes();

	        // Minus label size
	        if (gridModel.get('containLabel')) {
	            each(axesList, function (axis) {
	                if (!axis.model.get('axisLabel.inside')) {
	                    var labelUnionRect = getLabelUnionRect(axis);
	                    if (labelUnionRect) {
	                        var dim = axis.isHorizontal() ? 'height' : 'width';
	                        var margin = axis.model.get('axisLabel.margin');
	                        gridRect[dim] -= labelUnionRect[dim] + margin;
	                        if (axis.position === 'top') {
	                            gridRect.y += labelUnionRect.height + margin;
	                        }
	                        else if (axis.position === 'left')  {
	                            gridRect.x += labelUnionRect.width + margin;
	                        }
	                    }
	                }
	            });

	            adjustAxes();
	        }

	        function adjustAxes() {
	            each(axesList, function (axis) {
	                var isHorizontal = axis.isHorizontal();
	                var extent = isHorizontal ? [0, gridRect.width] : [0, gridRect.height];
	                var idx = axis.inverse ? 1 : 0;
	                axis.setExtent(extent[idx], extent[1 - idx]);
	                updateAxisTransfrom(axis, isHorizontal ? gridRect.x : gridRect.y);
	            });
	        }
	    };

	    /**
	     * @param {string} axisType
	     * @param {ndumber} [axisIndex]
	     */
	    gridProto.getAxis = function (axisType, axisIndex) {
	        var axesMapOnDim = this._axesMap[axisType];
	        if (axesMapOnDim != null) {
	            if (axisIndex == null) {
	                // Find first axis
	                for (var name in axesMapOnDim) {
	                    return axesMapOnDim[name];
	                }
	            }
	            return axesMapOnDim[axisIndex];
	        }
	    };

	    gridProto.getCartesian = function (xAxisIndex, yAxisIndex) {
	        var key = 'x' + xAxisIndex + 'y' + yAxisIndex;
	        return this._coordsMap[key];
	    };

	    /**
	     * Initialize cartesian coordinate systems
	     * @private
	     */
	    gridProto._initCartesian = function (gridModel, ecModel, api) {
	        var axisPositionUsed = {
	            left: false,
	            right: false,
	            top: false,
	            bottom: false
	        };

	        var axesMap = {
	            x: {},
	            y: {}
	        };
	        var axesCount = {
	            x: 0,
	            y: 0
	        };

	        /// Create axis
	        ecModel.eachComponent('xAxis', createAxisCreator('x'), this);
	        ecModel.eachComponent('yAxis', createAxisCreator('y'), this);

	        if (!axesCount.x || !axesCount.y) {
	            // Roll back when there no either x or y axis
	            this._axesMap = {};
	            this._axesList = [];
	            return;
	        }

	        this._axesMap = axesMap;

	        /// Create cartesian2d
	        each(axesMap.x, function (xAxis, xAxisIndex) {
	            each(axesMap.y, function (yAxis, yAxisIndex) {
	                var key = 'x' + xAxisIndex + 'y' + yAxisIndex;
	                var cartesian = new Cartesian2D(key);

	                cartesian.grid = this;

	                this._coordsMap[key] = cartesian;
	                this._coordsList.push(cartesian);

	                cartesian.addAxis(xAxis);
	                cartesian.addAxis(yAxis);
	            }, this);
	        }, this);

	        function createAxisCreator(axisType) {
	            return function (axisModel, idx) {
	                if (!isAxisUsedInTheGrid(axisModel, gridModel, ecModel)) {
	                    return;
	                }

	                var axisPosition = axisModel.get('position');
	                if (axisType === 'x') {
	                    // Fix position
	                    if (axisPosition !== 'top' && axisPosition !== 'bottom') {
	                        // Default bottom of X
	                        axisPosition = 'bottom';
	                    }
	                    if (axisPositionUsed[axisPosition]) {
	                        axisPosition = axisPosition === 'top' ? 'bottom' : 'top';
	                    }
	                }
	                else {
	                    // Fix position
	                    if (axisPosition !== 'left' && axisPosition !== 'right') {
	                        // Default left of Y
	                        axisPosition = 'left';
	                    }
	                    if (axisPositionUsed[axisPosition]) {
	                        axisPosition = axisPosition === 'left' ? 'right' : 'left';
	                    }
	                }
	                axisPositionUsed[axisPosition] = true;

	                var axis = new Axis2D(
	                    axisType, axisHelper.createScaleByModel(axisModel),
	                    [0, 0],
	                    axisModel.get('type'),
	                    axisPosition
	                );

	                var isCategory = axis.type === 'category';
	                axis.onBand = isCategory && axisModel.get('boundaryGap');
	                axis.inverse = axisModel.get('inverse');

	                axis.onZero = axisModel.get('axisLine.onZero');

	                // Inject axis into axisModel
	                axisModel.axis = axis;

	                // Inject axisModel into axis
	                axis.model = axisModel;

	                // Index of axis, can be used as key
	                axis.index = idx;

	                this._axesList.push(axis);

	                axesMap[axisType][idx] = axis;
	                axesCount[axisType]++;
	            };
	        }
	    };

	    /**
	     * Update cartesian properties from series
	     * @param  {module:echarts/model/Option} option
	     * @private
	     */
	    gridProto._updateScale = function (ecModel, gridModel) {
	        // Reset scale
	        zrUtil.each(this._axesList, function (axis) {
	            axis.scale.setExtent(Infinity, -Infinity);
	        });
	        ecModel.eachSeries(function (seriesModel) {
	            if (seriesModel.get('coordinateSystem') === 'cartesian2d') {
	                var xAxisIndex = seriesModel.get('xAxisIndex');
	                var yAxisIndex = seriesModel.get('yAxisIndex');

	                var xAxisModel = ecModel.getComponent('xAxis', xAxisIndex);
	                var yAxisModel = ecModel.getComponent('yAxis', yAxisIndex);

	                if (!isAxisUsedInTheGrid(xAxisModel, gridModel, ecModel)
	                    || !isAxisUsedInTheGrid(yAxisModel, gridModel, ecModel)
	                 ) {
	                    return;
	                }

	                var cartesian = this.getCartesian(xAxisIndex, yAxisIndex);
	                var data = seriesModel.getData();
	                var xAxis = cartesian.getAxis('x');
	                var yAxis = cartesian.getAxis('y');

	                if (data.type === 'list') {
	                    unionExtent(data, xAxis, seriesModel);
	                    unionExtent(data, yAxis, seriesModel);
	                }
	            }
	        }, this);

	        function unionExtent(data, axis, seriesModel) {
	            each(seriesModel.coordDimToDataDim(axis.dim), function (dim) {
	                axis.scale.unionExtent(data.getDataExtent(
	                    dim, axis.scale.type !== 'ordinal'
	                ));
	            });
	        }
	    };

	    /**
	     * @inner
	     */
	    function updateAxisTransfrom(axis, coordBase) {
	        var axisExtent = axis.getExtent();
	        var axisExtentSum = axisExtent[0] + axisExtent[1];

	        // Fast transform
	        axis.toGlobalCoord = axis.dim === 'x'
	            ? function (coord) {
	                return coord + coordBase;
	            }
	            : function (coord) {
	                return axisExtentSum - coord + coordBase;
	            };
	        axis.toLocalCoord = axis.dim === 'x'
	            ? function (coord) {
	                return coord - coordBase;
	            }
	            : function (coord) {
	                return axisExtentSum - coord + coordBase;
	            };
	    }

	    Grid.create = function (ecModel, api) {
	        var grids = [];
	        ecModel.eachComponent('grid', function (gridModel, idx) {
	            var grid = new Grid(gridModel, ecModel, api);
	            grid.name = 'grid_' + idx;
	            grid.resize(gridModel, api);

	            gridModel.coordinateSystem = grid;

	            grids.push(grid);
	        });

	        // Inject the coordinateSystems into seriesModel
	        ecModel.eachSeries(function (seriesModel) {
	            if (seriesModel.get('coordinateSystem') !== 'cartesian2d') {
	                return;
	            }
	            var xAxisIndex = seriesModel.get('xAxisIndex');
	            var yAxisIndex = seriesModel.get('yAxisIndex');
	            var xAxisModel = ecModel.getComponent('xAxis', xAxisIndex);

	            if (true) {
	                var yAxisModel = ecModel.getComponent('yAxis', yAxisIndex);
	                if (xAxisModel.get('gridIndex') !== yAxisModel.get('gridIndex')) {
	                    throw new Error('xAxis and yAxis must use the same grid');
	                }
	            }
	            var grid = grids[xAxisModel.get('gridIndex')];
	            seriesModel.coordinateSystem = grid.getCartesian(xAxisIndex, yAxisIndex);
	        });

	        return grids;
	    };

	    // For deciding which dimensions to use when creating list data
	    Grid.dimensions = Cartesian2D.prototype.dimensions;

	    __webpack_require__(20).register('cartesian2d', Grid);

	    return Grid;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var OrdinalScale = __webpack_require__(48);
	    var IntervalScale = __webpack_require__(50);
	    __webpack_require__(51);
	    __webpack_require__(52);
	    var Scale = __webpack_require__(49);

	    var numberUtil = __webpack_require__(5);
	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var textContain = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/contain/text\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var axisHelper = {};

	    /**
	     * Get axis scale extent before niced.
	     */
	    axisHelper.getScaleExtent = function (axis, model) {
	        var scale = axis.scale;
	        var originalExtent = scale.getExtent();
	        var span = originalExtent[1] - originalExtent[0];
	        if (scale.type === 'ordinal') {
	            // If series has no data, scale extent may be wrong
	            if (!isFinite(span)) {
	                return [0, 0];
	            }
	            else {
	                return originalExtent;
	            }
	        }
	        var min = model.getMin ? model.getMin() : model.get('min');
	        var max = model.getMax ? model.getMax() : model.get('max');
	        var crossZero = model.getNeedCrossZero
	            ? model.getNeedCrossZero() : !model.get('scale');
	        var boundaryGap = model.get('boundaryGap');
	        if (!zrUtil.isArray(boundaryGap)) {
	            boundaryGap = [boundaryGap || 0, boundaryGap || 0];
	        }
	        boundaryGap[0] = numberUtil.parsePercent(boundaryGap[0], 1);
	        boundaryGap[1] = numberUtil.parsePercent(boundaryGap[1], 1);
	        var fixMin = true;
	        var fixMax = true;
	        // Add boundary gap
	        if (min == null) {
	            min = originalExtent[0] - boundaryGap[0] * span;
	            fixMin = false;
	        }
	        if (max == null) {
	            max = originalExtent[1] + boundaryGap[1] * span;
	            fixMax = false;
	        }
	        if (min === 'dataMin') {
	            min = originalExtent[0];
	        }
	        if (max === 'dataMax') {
	            max = originalExtent[1];
	        }
	        // Evaluate if axis needs cross zero
	        if (crossZero) {
	            // Axis is over zero and min is not set
	            if (min > 0 && max > 0 && !fixMin) {
	                min = 0;
	            }
	            // Axis is under zero and max is not set
	            if (min < 0 && max < 0 && !fixMax) {
	                max = 0;
	            }
	        }
	        return [min, max];
	    };

	    axisHelper.niceScaleExtent = function (axis, model) {
	        var scale = axis.scale;
	        var extent = axisHelper.getScaleExtent(axis, model);
	        var fixMin = (model.getMin ? model.getMin() : model.get('min')) != null;
	        var fixMax = (model.getMax ? model.getMax() : model.get('max')) != null;
	        var splitNumber = model.get('splitNumber');
	        scale.setExtent(extent[0], extent[1]);
	        scale.niceExtent(splitNumber, fixMin, fixMax);

	        // Use minInterval to constraint the calculated interval.
	        // If calculated interval is less than minInterval. increase the interval quantity until
	        // it is larger than minInterval.
	        // For example:
	        //  minInterval is 1, calculated interval is 0.2, so increase it to be 1. In this way we can get
	        //  an integer axis.
	        var minInterval = model.get('minInterval');
	        if (isFinite(minInterval) && !fixMin && !fixMax && scale.type === 'interval') {
	            var interval = scale.getInterval();
	            var intervalScale = Math.max(Math.abs(interval), minInterval) / interval;
	            // while (interval < minInterval) {
	            //     var quantity = numberUtil.quantity(interval);
	            //     interval = quantity * 10;
	            //     scaleQuantity *= 10;
	            // }
	            extent = scale.getExtent();
	            scale.setExtent(intervalScale * extent[0], extent[1] * intervalScale);
	            scale.niceExtent(splitNumber);
	        }

	        // If some one specified the min, max. And the default calculated interval
	        // is not good enough. He can specify the interval. It is often appeared
	        // in angle axis with angle 0 - 360. Interval calculated in interval scale is hard
	        // to be 60.
	        // FIXME
	        var interval = model.get('interval');
	        if (interval != null) {
	            scale.setInterval && scale.setInterval(interval);
	        }
	    };

	    /**
	     * @param {module:echarts/model/Model} model
	     * @param {string} [axisType] Default retrieve from model.type
	     * @return {module:echarts/scale/*}
	     */
	    axisHelper.createScaleByModel = function(model, axisType) {
	        axisType = axisType || model.get('type');
	        if (axisType) {
	            switch (axisType) {
	                // Buildin scale
	                case 'category':
	                    return new OrdinalScale(
	                        model.getCategories(), [Infinity, -Infinity]
	                    );
	                case 'value':
	                    return new IntervalScale();
	                // Extended scale, like time and log
	                default:
	                    return (Scale.getClass(axisType) || IntervalScale).create(model);
	            }
	        }
	    };

	    /**
	     * Check if the axis corss 0
	     */
	    axisHelper.ifAxisCrossZero = function (axis) {
	        var dataExtent = axis.scale.getExtent();
	        var min = dataExtent[0];
	        var max = dataExtent[1];
	        return !((min > 0 && max > 0) || (min < 0 && max < 0));
	    };

	    /**
	     * @param {Array.<number>} tickCoords In axis self coordinate.
	     * @param {Array.<string>} labels
	     * @param {string} font
	     * @param {boolean} isAxisHorizontal
	     * @return {number}
	     */
	    axisHelper.getAxisLabelInterval = function (tickCoords, labels, font, isAxisHorizontal) {
	        // FIXME
	        // 不同角的axis和label，不只是horizontal和vertical.

	        var textSpaceTakenRect;
	        var autoLabelInterval = 0;
	        var accumulatedLabelInterval = 0;

	        var step = 1;
	        if (labels.length > 40) {
	            // Simple optimization for large amount of labels
	            step = Math.floor(labels.length / 40);
	        }

	        for (var i = 0; i < tickCoords.length; i += step) {
	            var tickCoord = tickCoords[i];
	            var rect = textContain.getBoundingRect(
	                labels[i], font, 'center', 'top'
	            );
	            rect[isAxisHorizontal ? 'x' : 'y'] += tickCoord;
	            // FIXME Magic number 1.5
	            rect[isAxisHorizontal ? 'width' : 'height'] *= 1.3;
	            if (!textSpaceTakenRect) {
	                textSpaceTakenRect = rect.clone();
	            }
	            // There is no space for current label;
	            else if (textSpaceTakenRect.intersect(rect)) {
	                accumulatedLabelInterval++;
	                autoLabelInterval = Math.max(autoLabelInterval, accumulatedLabelInterval);
	            }
	            else {
	                textSpaceTakenRect.union(rect);
	                // Reset
	                accumulatedLabelInterval = 0;
	            }
	        }
	        if (autoLabelInterval === 0 && step > 1) {
	            return step;
	        }
	        return (autoLabelInterval + 1) * step - 1;
	    };

	    /**
	     * @param {Object} axis
	     * @param {Function} labelFormatter
	     * @return {Array.<string>}
	     */
	    axisHelper.getFormattedLabels = function (axis, labelFormatter) {
	        var scale = axis.scale;
	        var labels = scale.getTicksLabels();
	        var ticks = scale.getTicks();
	        if (typeof labelFormatter === 'string') {
	            labelFormatter = (function (tpl) {
	                return function (val) {
	                    return tpl.replace('{value}', val);
	                };
	            })(labelFormatter);
	            return zrUtil.map(labels, labelFormatter);
	        }
	        else if (typeof labelFormatter === 'function') {
	            return zrUtil.map(ticks, function (tick, idx) {
	                return labelFormatter(
	                    axis.type === 'category' ? scale.getLabel(tick) : tick,
	                    idx
	                );
	            }, this);
	        }
	        else {
	            return labels;
	        }
	    };

	    return axisHelper;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Linear continuous scale
	 * @module echarts/coord/scale/Ordinal
	 *
	 * http://en.wikipedia.org/wiki/Level_of_measurement
	 */

	// FIXME only one data
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var Scale = __webpack_require__(49);

	    var scaleProto = Scale.prototype;

	    var OrdinalScale = Scale.extend({

	        type: 'ordinal',

	        init: function (data, extent) {
	            this._data = data;
	            this._extent = extent || [0, data.length - 1];
	        },

	        parse: function (val) {
	            return typeof val === 'string'
	                ? zrUtil.indexOf(this._data, val)
	                // val might be float.
	                : Math.round(val);
	        },

	        contain: function (rank) {
	            rank = this.parse(rank);
	            return scaleProto.contain.call(this, rank)
	                && this._data[rank] != null;
	        },

	        /**
	         * Normalize given rank or name to linear [0, 1]
	         * @param {number|string} [val]
	         * @return {number}
	         */
	        normalize: function (val) {
	            return scaleProto.normalize.call(this, this.parse(val));
	        },

	        scale: function (val) {
	            return Math.round(scaleProto.scale.call(this, val));
	        },

	        /**
	         * @return {Array}
	         */
	        getTicks: function () {
	            var ticks = [];
	            var extent = this._extent;
	            var rank = extent[0];

	            while (rank <= extent[1]) {
	                ticks.push(rank);
	                rank++;
	            }

	            return ticks;
	        },

	        /**
	         * Get item on rank n
	         * @param {number} n
	         * @return {string}
	         */
	        getLabel: function (n) {
	            return this._data[n];
	        },

	        /**
	         * @return {number}
	         */
	        count: function () {
	            return this._extent[1] - this._extent[0] + 1;
	        },

	        niceTicks: zrUtil.noop,
	        niceExtent: zrUtil.noop
	    });

	    /**
	     * @return {module:echarts/scale/Time}
	     */
	    OrdinalScale.create = function () {
	        return new OrdinalScale();
	    };

	    return OrdinalScale;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * // Scale class management
	 * @module echarts/scale/Scale
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var clazzUtil = __webpack_require__(7);

	    function Scale() {
	        /**
	         * Extent
	         * @type {Array.<number>}
	         * @protected
	         */
	        this._extent = [Infinity, -Infinity];

	        /**
	         * Step is calculated in adjustExtent
	         * @type {Array.<number>}
	         * @protected
	         */
	        this._interval = 0;

	        this.init && this.init.apply(this, arguments);
	    }

	    var scaleProto = Scale.prototype;

	    /**
	     * Parse input val to valid inner number.
	     * @param {*} val
	     * @return {number}
	     */
	    scaleProto.parse = function (val) {
	        // Notice: This would be a trap here, If the implementation
	        // of this method depends on extent, and this method is used
	        // before extent set (like in dataZoom), it would be wrong.
	        // Nevertheless, parse does not depend on extent generally.
	        return val;
	    };

	    scaleProto.contain = function (val) {
	        var extent = this._extent;
	        return val >= extent[0] && val <= extent[1];
	    };

	    /**
	     * Normalize value to linear [0, 1], return 0.5 if extent span is 0
	     * @param {number} val
	     * @return {number}
	     */
	    scaleProto.normalize = function (val) {
	        var extent = this._extent;
	        if (extent[1] === extent[0]) {
	            return 0.5;
	        }
	        return (val - extent[0]) / (extent[1] - extent[0]);
	    };

	    /**
	     * Scale normalized value
	     * @param {number} val
	     * @return {number}
	     */
	    scaleProto.scale = function (val) {
	        var extent = this._extent;
	        return val * (extent[1] - extent[0]) + extent[0];
	    };

	    /**
	     * Set extent from data
	     * @param {Array.<number>} other
	     */
	    scaleProto.unionExtent = function (other) {
	        var extent = this._extent;
	        other[0] < extent[0] && (extent[0] = other[0]);
	        other[1] > extent[1] && (extent[1] = other[1]);
	        // not setExtent because in log axis it may transformed to power
	        // this.setExtent(extent[0], extent[1]);
	    };

	    /**
	     * Get extent
	     * @return {Array.<number>}
	     */
	    scaleProto.getExtent = function () {
	        return this._extent.slice();
	    };

	    /**
	     * Set extent
	     * @param {number} start
	     * @param {number} end
	     */
	    scaleProto.setExtent = function (start, end) {
	        var thisExtent = this._extent;
	        if (!isNaN(start)) {
	            thisExtent[0] = start;
	        }
	        if (!isNaN(end)) {
	            thisExtent[1] = end;
	        }
	    };

	    /**
	     * @return {Array.<string>}
	     */
	    scaleProto.getTicksLabels = function () {
	        var labels = [];
	        var ticks = this.getTicks();
	        for (var i = 0; i < ticks.length; i++) {
	            labels.push(this.getLabel(ticks[i]));
	        }
	        return labels;
	    };

	    clazzUtil.enableClassExtend(Scale);
	    clazzUtil.enableClassManagement(Scale, {
	        registerWhenExtend: true
	    });

	    return Scale;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Interval scale
	 * @module echarts/scale/Interval
	 */

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var numberUtil = __webpack_require__(5);
	    var formatUtil = __webpack_require__(4);
	    var Scale = __webpack_require__(49);

	    var mathFloor = Math.floor;
	    var mathCeil = Math.ceil;
	    /**
	     * @alias module:echarts/coord/scale/Interval
	     * @constructor
	     */
	    var IntervalScale = Scale.extend({

	        type: 'interval',

	        _interval: 0,

	        setExtent: function (start, end) {
	            var thisExtent = this._extent;
	            //start,end may be a Number like '25',so...
	            if (!isNaN(start)) {
	                thisExtent[0] = parseFloat(start);
	            }
	            if (!isNaN(end)) {
	                thisExtent[1] = parseFloat(end);
	            }
	        },

	        unionExtent: function (other) {
	            var extent = this._extent;
	            other[0] < extent[0] && (extent[0] = other[0]);
	            other[1] > extent[1] && (extent[1] = other[1]);

	            // unionExtent may called by it's sub classes
	            IntervalScale.prototype.setExtent.call(this, extent[0], extent[1]);
	        },
	        /**
	         * Get interval
	         */
	        getInterval: function () {
	            if (!this._interval) {
	                this.niceTicks();
	            }
	            return this._interval;
	        },

	        /**
	         * Set interval
	         */
	        setInterval: function (interval) {
	            this._interval = interval;
	            // Dropped auto calculated niceExtent and use user setted extent
	            // We assume user wan't to set both interval, min, max to get a better result
	            this._niceExtent = this._extent.slice();
	        },

	        /**
	         * @return {Array.<number>}
	         */
	        getTicks: function () {
	            if (!this._interval) {
	                this.niceTicks();
	            }
	            var interval = this._interval;
	            var extent = this._extent;
	            var ticks = [];

	            // Consider this case: using dataZoom toolbox, zoom and zoom.
	            var safeLimit = 10000;

	            if (interval) {
	                var niceExtent = this._niceExtent;
	                if (extent[0] < niceExtent[0]) {
	                    ticks.push(extent[0]);
	                }
	                var tick = niceExtent[0];
	                while (tick <= niceExtent[1]) {
	                    ticks.push(tick);
	                    // Avoid rounding error
	                    tick = numberUtil.round(tick + interval);
	                    if (ticks.length > safeLimit) {
	                        return [];
	                    }
	                }
	                if (extent[1] > niceExtent[1]) {
	                    ticks.push(extent[1]);
	                }
	            }

	            return ticks;
	        },

	        /**
	         * @return {Array.<string>}
	         */
	        getTicksLabels: function () {
	            var labels = [];
	            var ticks = this.getTicks();
	            for (var i = 0; i < ticks.length; i++) {
	                labels.push(this.getLabel(ticks[i]));
	            }
	            return labels;
	        },

	        /**
	         * @param {number} n
	         * @return {number}
	         */
	        getLabel: function (data) {
	            return formatUtil.addCommas(data);
	        },

	        /**
	         * Update interval and extent of intervals for nice ticks
	         *
	         * @param {number} [splitNumber = 5] Desired number of ticks
	         */
	        niceTicks: function (splitNumber) {
	            splitNumber = splitNumber || 5;
	            var extent = this._extent;
	            var span = extent[1] - extent[0];
	            if (!isFinite(span)) {
	                return;
	            }
	            // User may set axis min 0 and data are all negative
	            // FIXME If it needs to reverse ?
	            if (span < 0) {
	                span = -span;
	                extent.reverse();
	            }

	            // From "Nice Numbers for Graph Labels" of Graphic Gems
	            // var niceSpan = numberUtil.nice(span, false);
	            var step = numberUtil.nice(span / splitNumber, true);

	            // Niced extent inside original extent
	            var niceExtent = [
	                numberUtil.round(mathCeil(extent[0] / step) * step),
	                numberUtil.round(mathFloor(extent[1] / step) * step)
	            ];

	            this._interval = step;
	            this._niceExtent = niceExtent;
	        },

	        /**
	         * Nice extent.
	         * @param {number} [splitNumber = 5] Given approx tick number
	         * @param {boolean} [fixMin=false]
	         * @param {boolean} [fixMax=false]
	         */
	        niceExtent: function (splitNumber, fixMin, fixMax) {
	            var extent = this._extent;
	            // If extent start and end are same, expand them
	            if (extent[0] === extent[1]) {
	                if (extent[0] !== 0) {
	                    // Expand extent
	                    var expandSize = extent[0] / 2;
	                    extent[0] -= expandSize;
	                    extent[1] += expandSize;
	                }
	                else {
	                    extent[1] = 1;
	                }
	            }
	            var span = extent[1] - extent[0];
	            // If there are no data and extent are [Infinity, -Infinity]
	            if (!isFinite(span)) {
	                extent[0] = 0;
	                extent[1] = 1;
	            }

	            this.niceTicks(splitNumber);

	            // var extent = this._extent;
	            var interval = this._interval;

	            if (!fixMin) {
	                extent[0] = numberUtil.round(mathFloor(extent[0] / interval) * interval);
	            }
	            if (!fixMax) {
	                extent[1] = numberUtil.round(mathCeil(extent[1] / interval) * interval);
	            }
	        }
	    });

	    /**
	     * @return {module:echarts/scale/Time}
	     */
	    IntervalScale.create = function () {
	        return new IntervalScale();
	    };

	    return IntervalScale;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Interval scale
	 * @module echarts/coord/scale/Time
	 */

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var numberUtil = __webpack_require__(5);
	    var formatUtil = __webpack_require__(4);

	    var IntervalScale = __webpack_require__(50);

	    var intervalScaleProto = IntervalScale.prototype;

	    var mathCeil = Math.ceil;
	    var mathFloor = Math.floor;
	    var ONE_SECOND = 1000;
	    var ONE_MINUTE = ONE_SECOND * 60;
	    var ONE_HOUR = ONE_MINUTE * 60;
	    var ONE_DAY = ONE_HOUR * 24;

	    // FIXME 公用？
	    var bisect = function (a, x, lo, hi) {
	        while (lo < hi) {
	            var mid = lo + hi >>> 1;
	            if (a[mid][2] < x) {
	                lo = mid + 1;
	            }
	            else {
	                hi  = mid;
	            }
	        }
	        return lo;
	    };

	    /**
	     * @alias module:echarts/coord/scale/Time
	     * @constructor
	     */
	    var TimeScale = IntervalScale.extend({
	        type: 'time',

	        // Overwrite
	        getLabel: function (val) {
	            var stepLvl = this._stepLvl;

	            var date = new Date(val);

	            return formatUtil.formatTime(stepLvl[0], date);
	        },

	        // Overwrite
	        niceExtent: function (approxTickNum, fixMin, fixMax) {
	            var extent = this._extent;
	            // If extent start and end are same, expand them
	            if (extent[0] === extent[1]) {
	                // Expand extent
	                extent[0] -= ONE_DAY;
	                extent[1] += ONE_DAY;
	            }
	            // If there are no data and extent are [Infinity, -Infinity]
	            if (extent[1] === -Infinity && extent[0] === Infinity) {
	                var d = new Date();
	                extent[1] = new Date(d.getFullYear(), d.getMonth(), d.getDate());
	                extent[0] = extent[1] - ONE_DAY;
	            }

	            this.niceTicks(approxTickNum);

	            // var extent = this._extent;
	            var interval = this._interval;

	            if (!fixMin) {
	                extent[0] = numberUtil.round(mathFloor(extent[0] / interval) * interval);
	            }
	            if (!fixMax) {
	                extent[1] = numberUtil.round(mathCeil(extent[1] / interval) * interval);
	            }
	        },

	        // Overwrite
	        niceTicks: function (approxTickNum) {
	            approxTickNum = approxTickNum || 10;

	            var extent = this._extent;
	            var span = extent[1] - extent[0];
	            var approxInterval = span / approxTickNum;
	            var scaleLevelsLen = scaleLevels.length;
	            var idx = bisect(scaleLevels, approxInterval, 0, scaleLevelsLen);

	            var level = scaleLevels[Math.min(idx, scaleLevelsLen - 1)];
	            var interval = level[2];
	            // Same with interval scale if span is much larger than 1 year
	            if (level[0] === 'year') {
	                var yearSpan = span / interval;

	                // From "Nice Numbers for Graph Labels" of Graphic Gems
	                // var niceYearSpan = numberUtil.nice(yearSpan, false);
	                var yearStep = numberUtil.nice(yearSpan / approxTickNum, true);

	                interval *= yearStep;
	            }

	            var niceExtent = [
	                mathCeil(extent[0] / interval) * interval,
	                mathFloor(extent[1] / interval) * interval
	            ];

	            this._stepLvl = level;
	            // Interval will be used in getTicks
	            this._interval = interval;
	            this._niceExtent = niceExtent;
	        },

	        parse: function (val) {
	            // val might be float.
	            return +numberUtil.parseDate(val);
	        }
	    });

	    zrUtil.each(['contain', 'normalize'], function (methodName) {
	        TimeScale.prototype[methodName] = function (val) {
	            return intervalScaleProto[methodName].call(this, this.parse(val));
	        };
	    });

	    // Steps from d3
	    var scaleLevels = [
	        // Format       step    interval
	        ['hh:mm:ss',    1,      ONE_SECOND],           // 1s
	        ['hh:mm:ss',    5,      ONE_SECOND * 5],       // 5s
	        ['hh:mm:ss',    10,     ONE_SECOND * 10],      // 10s
	        ['hh:mm:ss',    15,     ONE_SECOND * 15],      // 15s
	        ['hh:mm:ss',    30,     ONE_SECOND * 30],      // 30s
	        ['hh:mm\nMM-dd',1,      ONE_MINUTE],          // 1m
	        ['hh:mm\nMM-dd',5,      ONE_MINUTE * 5],      // 5m
	        ['hh:mm\nMM-dd',10,     ONE_MINUTE * 10],     // 10m
	        ['hh:mm\nMM-dd',15,     ONE_MINUTE * 15],     // 15m
	        ['hh:mm\nMM-dd',30,     ONE_MINUTE * 30],     // 30m
	        ['hh:mm\nMM-dd',1,      ONE_HOUR],        // 1h
	        ['hh:mm\nMM-dd',2,      ONE_HOUR * 2],    // 2h
	        ['hh:mm\nMM-dd',6,      ONE_HOUR * 6],    // 6h
	        ['hh:mm\nMM-dd',12,     ONE_HOUR * 12],   // 12h
	        ['MM-dd\nyyyy', 1,      ONE_DAY],   // 1d
	        ['week',        7,      ONE_DAY * 7],        // 7d
	        ['month',       1,      ONE_DAY * 31],       // 1M
	        ['quarter',     3,      ONE_DAY * 380 / 4],  // 3M
	        ['half-year',   6,      ONE_DAY * 380 / 2],  // 6M
	        ['year',        1,      ONE_DAY * 380]       // 1Y
	    ];

	    /**
	     * @return {module:echarts/scale/Time}
	     */
	    TimeScale.create = function () {
	        return new TimeScale();
	    };

	    return TimeScale;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Log scale
	 * @module echarts/scale/Log
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var Scale = __webpack_require__(49);
	    var numberUtil = __webpack_require__(5);

	    // Use some method of IntervalScale
	    var IntervalScale = __webpack_require__(50);

	    var scaleProto = Scale.prototype;
	    var intervalScaleProto = IntervalScale.prototype;

	    var mathFloor = Math.floor;
	    var mathCeil = Math.ceil;
	    var mathPow = Math.pow;

	    var LOG_BASE = 10;
	    var mathLog = Math.log;

	    var LogScale = Scale.extend({

	        type: 'log',

	        /**
	         * @return {Array.<number>}
	         */
	        getTicks: function () {
	            return zrUtil.map(intervalScaleProto.getTicks.call(this), function (val) {
	                return numberUtil.round(mathPow(LOG_BASE, val));
	            });
	        },

	        /**
	         * @param {number} val
	         * @return {string}
	         */
	        getLabel: intervalScaleProto.getLabel,

	        /**
	         * @param  {number} val
	         * @return {number}
	         */
	        scale: function (val) {
	            val = scaleProto.scale.call(this, val);
	            return mathPow(LOG_BASE, val);
	        },

	        /**
	         * @param {number} start
	         * @param {number} end
	         */
	        setExtent: function (start, end) {
	            start = mathLog(start) / mathLog(LOG_BASE);
	            end = mathLog(end) / mathLog(LOG_BASE);
	            intervalScaleProto.setExtent.call(this, start, end);
	        },

	        /**
	         * @return {number} end
	         */
	        getExtent: function () {
	            var extent = scaleProto.getExtent.call(this);
	            extent[0] = mathPow(LOG_BASE, extent[0]);
	            extent[1] = mathPow(LOG_BASE, extent[1]);
	            return extent;
	        },

	        /**
	         * @param  {Array.<number>} extent
	         */
	        unionExtent: function (extent) {
	            extent[0] = mathLog(extent[0]) / mathLog(LOG_BASE);
	            extent[1] = mathLog(extent[1]) / mathLog(LOG_BASE);
	            scaleProto.unionExtent.call(this, extent);
	        },

	        /**
	         * Update interval and extent of intervals for nice ticks
	         * @param  {number} [approxTickNum = 10] Given approx tick number
	         */
	        niceTicks: function (approxTickNum) {
	            approxTickNum = approxTickNum || 10;
	            var extent = this._extent;
	            var span = extent[1] - extent[0];
	            if (span === Infinity || span <= 0) {
	                return;
	            }

	            var interval = mathPow(10, mathFloor(mathLog(span / approxTickNum) / Math.LN10));
	            var err = approxTickNum / span * interval;

	            // Filter ticks to get closer to the desired count.
	            if (err <= 0.5) {
	                interval *= 10;
	            }
	            var niceExtent = [
	                numberUtil.round(mathCeil(extent[0] / interval) * interval),
	                numberUtil.round(mathFloor(extent[1] / interval) * interval)
	            ];

	            this._interval = interval;
	            this._niceExtent = niceExtent;
	        },

	        /**
	         * Nice extent.
	         * @param {number} [approxTickNum = 10] Given approx tick number
	         * @param {boolean} [fixMin=false]
	         * @param {boolean} [fixMax=false]
	         */
	        niceExtent: intervalScaleProto.niceExtent
	    });

	    zrUtil.each(['contain', 'normalize'], function (methodName) {
	        LogScale.prototype[methodName] = function (val) {
	            val = mathLog(val) / mathLog(LOG_BASE);
	            return scaleProto[methodName].call(this, val);
	        };
	    });

	    LogScale.create = function () {
	        return new LogScale();
	    };

	    return LogScale;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {

	    'use strict';

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var Cartesian = __webpack_require__(54);

	    function Cartesian2D(name) {

	        Cartesian.call(this, name);
	    }

	    Cartesian2D.prototype = {

	        constructor: Cartesian2D,

	        type: 'cartesian2d',

	        /**
	         * @type {Array.<string>}
	         * @readOnly
	         */
	        dimensions: ['x', 'y'],

	        /**
	         * Base axis will be used on stacking.
	         *
	         * @return {module:echarts/coord/cartesian/Axis2D}
	         */
	        getBaseAxis: function () {
	            return this.getAxesByScale('ordinal')[0]
	                || this.getAxesByScale('time')[0]
	                || this.getAxis('x');
	        },

	        /**
	         * If contain point
	         * @param {Array.<number>} point
	         * @return {boolean}
	         */
	        containPoint: function (point) {
	            var axisX = this.getAxis('x');
	            var axisY = this.getAxis('y');
	            return axisX.contain(axisX.toLocalCoord(point[0]))
	                && axisY.contain(axisY.toLocalCoord(point[1]));
	        },

	        /**
	         * If contain data
	         * @param {Array.<number>} data
	         * @return {boolean}
	         */
	        containData: function (data) {
	            return this.getAxis('x').containData(data[0])
	                && this.getAxis('y').containData(data[1]);
	        },

	        /**
	         * Convert series data to an array of points
	         * @param {module:echarts/data/List} data
	         * @param {boolean} stack
	         * @return {Array}
	         *  Return array of points. For example:
	         *  `[[10, 10], [20, 20], [30, 30]]`
	         */
	        dataToPoints: function (data, stack) {
	            return data.mapArray(['x', 'y'], function (x, y) {
	                return this.dataToPoint([x, y]);
	            }, stack, this);
	        },

	        /**
	         * @param {Array.<number>} data
	         * @param {boolean} [clamp=false]
	         * @return {Array.<number>}
	         */
	        dataToPoint: function (data, clamp) {
	            var xAxis = this.getAxis('x');
	            var yAxis = this.getAxis('y');
	            return [
	                xAxis.toGlobalCoord(xAxis.dataToCoord(data[0], clamp)),
	                yAxis.toGlobalCoord(yAxis.dataToCoord(data[1], clamp))
	            ];
	        },

	        /**
	         * @param {Array.<number>} point
	         * @param {boolean} [clamp=false]
	         * @return {Array.<number>}
	         */
	        pointToData: function (point, clamp) {
	            var xAxis = this.getAxis('x');
	            var yAxis = this.getAxis('y');
	            return [
	                xAxis.coordToData(xAxis.toLocalCoord(point[0]), clamp),
	                yAxis.coordToData(yAxis.toLocalCoord(point[1]), clamp)
	            ];
	        },

	        /**
	         * Get other axis
	         * @param {module:echarts/coord/cartesian/Axis2D} axis
	         */
	        getOtherAxis: function (axis) {
	            return this.getAxis(axis.dim === 'x' ? 'y' : 'x');
	        }
	    };

	    zrUtil.inherits(Cartesian2D, Cartesian);

	    return Cartesian2D;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Cartesian coordinate system
	 * @module  echarts/coord/Cartesian
	 *
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    'use strict';

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    function dimAxisMapper(dim) {
	        return this._axes[dim];
	    }

	    /**
	     * @alias module:echarts/coord/Cartesian
	     * @constructor
	     */
	    var Cartesian = function (name) {
	        this._axes = {};

	        this._dimList = [];

	        /**
	         * @type {string}
	         */
	        this.name = name || '';
	    };

	    Cartesian.prototype = {

	        constructor: Cartesian,

	        type: 'cartesian',

	        /**
	         * Get axis
	         * @param  {number|string} dim
	         * @return {module:echarts/coord/Cartesian~Axis}
	         */
	        getAxis: function (dim) {
	            return this._axes[dim];
	        },

	        /**
	         * Get axes list
	         * @return {Array.<module:echarts/coord/Cartesian~Axis>}
	         */
	        getAxes: function () {
	            return zrUtil.map(this._dimList, dimAxisMapper, this);
	        },

	        /**
	         * Get axes list by given scale type
	         */
	        getAxesByScale: function (scaleType) {
	            scaleType = scaleType.toLowerCase();
	            return zrUtil.filter(
	                this.getAxes(),
	                function (axis) {
	                    return axis.scale.type === scaleType;
	                }
	            );
	        },

	        /**
	         * Add axis
	         * @param {module:echarts/coord/Cartesian.Axis}
	         */
	        addAxis: function (axis) {
	            var dim = axis.dim;

	            this._axes[dim] = axis;

	            this._dimList.push(dim);
	        },

	        /**
	         * Convert data to coord in nd space
	         * @param {Array.<number>|Object.<string, number>} val
	         * @return {Array.<number>|Object.<string, number>}
	         */
	        dataToCoord: function (val) {
	            return this._dataCoordConvert(val, 'dataToCoord');
	        },

	        /**
	         * Convert coord in nd space to data
	         * @param  {Array.<number>|Object.<string, number>} val
	         * @return {Array.<number>|Object.<string, number>}
	         */
	        coordToData: function (val) {
	            return this._dataCoordConvert(val, 'coordToData');
	        },

	        _dataCoordConvert: function (input, method) {
	            var dimList = this._dimList;

	            var output = input instanceof Array ? [] : {};

	            for (var i = 0; i < dimList.length; i++) {
	                var dim = dimList[i];
	                var axis = this._axes[dim];

	                output[dim] = axis[method](input[dim]);
	            }

	            return output;
	        }
	    };

	    return Cartesian;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var Axis = __webpack_require__(56);
	    var axisLabelInterval = __webpack_require__(57);

	    /**
	     * Extend axis 2d
	     * @constructor module:echarts/coord/cartesian/Axis2D
	     * @extends {module:echarts/coord/cartesian/Axis}
	     * @param {string} dim
	     * @param {*} scale
	     * @param {Array.<number>} coordExtent
	     * @param {string} axisType
	     * @param {string} position
	     */
	    var Axis2D = function (dim, scale, coordExtent, axisType, position) {
	        Axis.call(this, dim, scale, coordExtent);
	        /**
	         * Axis type
	         *  - 'category'
	         *  - 'value'
	         *  - 'time'
	         *  - 'log'
	         * @type {string}
	         */
	        this.type = axisType || 'value';

	        /**
	         * Axis position
	         *  - 'top'
	         *  - 'bottom'
	         *  - 'left'
	         *  - 'right'
	         */
	        this.position = position || 'bottom';
	    };

	    Axis2D.prototype = {

	        constructor: Axis2D,

	        /**
	         * Index of axis, can be used as key
	         */
	        index: 0,
	        /**
	         * If axis is on the zero position of the other axis
	         * @type {boolean}
	         */
	        onZero: false,

	        /**
	         * Axis model
	         * @param {module:echarts/coord/cartesian/AxisModel}
	         */
	        model: null,

	        isHorizontal: function () {
	            var position = this.position;
	            return position === 'top' || position === 'bottom';
	        },

	        getGlobalExtent: function () {
	            var ret = this.getExtent();
	            ret[0] = this.toGlobalCoord(ret[0]);
	            ret[1] = this.toGlobalCoord(ret[1]);
	            return ret;
	        },

	        /**
	         * @return {number}
	         */
	        getLabelInterval: function () {
	            var labelInterval = this._labelInterval;
	            if (!labelInterval) {
	                labelInterval = this._labelInterval = axisLabelInterval(this);
	            }
	            return labelInterval;
	        },

	        /**
	         * If label is ignored.
	         * Automatically used when axis is category and label can not be all shown
	         * @param  {number}  idx
	         * @return {boolean}
	         */
	        isLabelIgnored: function (idx) {
	            if (this.type === 'category') {
	                var labelInterval = this.getLabelInterval();
	                return ((typeof labelInterval === 'function')
	                    && !labelInterval(idx, this.scale.getLabel(idx)))
	                    || idx % (labelInterval + 1);
	            }
	        },

	        /**
	         * Transform global coord to local coord,
	         * i.e. var localCoord = axis.toLocalCoord(80);
	         * designate by module:echarts/coord/cartesian/Grid.
	         * @type {Function}
	         */
	        toLocalCoord: null,

	        /**
	         * Transform global coord to local coord,
	         * i.e. var globalCoord = axis.toLocalCoord(40);
	         * designate by module:echarts/coord/cartesian/Grid.
	         * @type {Function}
	         */
	        toGlobalCoord: null

	    };
	    zrUtil.inherits(Axis2D, Axis);

	    return Axis2D;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var numberUtil = __webpack_require__(5);
	    var linearMap = numberUtil.linearMap;
	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    function fixExtentWithBands(extent, nTick) {
	        var size = extent[1] - extent[0];
	        var len = nTick;
	        var margin = size / len / 2;
	        extent[0] += margin;
	        extent[1] -= margin;
	    }

	    var normalizedExtent = [0, 1];
	    /**
	     * @name module:echarts/coord/CartesianAxis
	     * @constructor
	     */
	    var Axis = function (dim, scale, extent) {

	        /**
	         * Axis dimension. Such as 'x', 'y', 'z', 'angle', 'radius'
	         * @type {string}
	         */
	        this.dim = dim;

	        /**
	         * Axis scale
	         * @type {module:echarts/coord/scale/*}
	         */
	        this.scale = scale;

	        /**
	         * @type {Array.<number>}
	         * @private
	         */
	        this._extent = extent || [0, 0];

	        /**
	         * @type {boolean}
	         */
	        this.inverse = false;

	        /**
	         * Usually true when axis has a ordinal scale
	         * @type {boolean}
	         */
	        this.onBand = false;
	    };

	    Axis.prototype = {

	        constructor: Axis,

	        /**
	         * If axis extent contain given coord
	         * @param {number} coord
	         * @return {boolean}
	         */
	        contain: function (coord) {
	            var extent = this._extent;
	            var min = Math.min(extent[0], extent[1]);
	            var max = Math.max(extent[0], extent[1]);
	            return coord >= min && coord <= max;
	        },

	        /**
	         * If axis extent contain given data
	         * @param {number} data
	         * @return {boolean}
	         */
	        containData: function (data) {
	            return this.contain(this.dataToCoord(data));
	        },

	        /**
	         * Get coord extent.
	         * @return {Array.<number>}
	         */
	        getExtent: function () {
	            var ret = this._extent.slice();
	            return ret;
	        },

	        /**
	         * Get precision used for formatting
	         * @param {Array.<number>} [dataExtent]
	         * @return {number}
	         */
	        getPixelPrecision: function (dataExtent) {
	            return numberUtil.getPixelPrecision(
	                dataExtent || this.scale.getExtent(),
	                this._extent
	            );
	        },

	        /**
	         * Set coord extent
	         * @param {number} start
	         * @param {number} end
	         */
	        setExtent: function (start, end) {
	            var extent = this._extent;
	            extent[0] = start;
	            extent[1] = end;
	        },

	        /**
	         * Convert data to coord. Data is the rank if it has a ordinal scale
	         * @param {number} data
	         * @param  {boolean} clamp
	         * @return {number}
	         */
	        dataToCoord: function (data, clamp) {
	            var extent = this._extent;
	            var scale = this.scale;
	            data = scale.normalize(data);

	            if (this.onBand && scale.type === 'ordinal') {
	                extent = extent.slice();
	                fixExtentWithBands(extent, scale.count());
	            }

	            return linearMap(data, normalizedExtent, extent, clamp);
	        },

	        /**
	         * Convert coord to data. Data is the rank if it has a ordinal scale
	         * @param {number} coord
	         * @param  {boolean} clamp
	         * @return {number}
	         */
	        coordToData: function (coord, clamp) {
	            var extent = this._extent;
	            var scale = this.scale;

	            if (this.onBand && scale.type === 'ordinal') {
	                extent = extent.slice();
	                fixExtentWithBands(extent, scale.count());
	            }

	            var t = linearMap(coord, extent, normalizedExtent, clamp);

	            return this.scale.scale(t);
	        },
	        /**
	         * @return {Array.<number>}
	         */
	        getTicksCoords: function () {
	            if (this.onBand) {
	                var bands = this.getBands();
	                var coords = [];
	                for (var i = 0; i < bands.length; i++) {
	                    coords.push(bands[i][0]);
	                }
	                if (bands[i - 1]) {
	                    coords.push(bands[i - 1][1]);
	                }
	                return coords;
	            }
	            else {
	                return zrUtil.map(this.scale.getTicks(), this.dataToCoord, this);
	            }
	        },

	        /**
	         * Coords of labels are on the ticks or on the middle of bands
	         * @return {Array.<number>}
	         */
	        getLabelsCoords: function () {
	            if (this.onBand) {
	                var bands = this.getBands();
	                var coords = [];
	                var band;
	                for (var i = 0; i < bands.length; i++) {
	                    band = bands[i];
	                    coords.push((band[0] + band[1]) / 2);
	                }
	                return coords;
	            }
	            else {
	                return zrUtil.map(this.scale.getTicks(), this.dataToCoord, this);
	            }
	        },

	        /**
	         * Get bands.
	         *
	         * If axis has labels [1, 2, 3, 4]. Bands on the axis are
	         * |---1---|---2---|---3---|---4---|.
	         *
	         * @return {Array}
	         */
	         // FIXME Situation when labels is on ticks
	        getBands: function () {
	            var extent = this.getExtent();
	            var bands = [];
	            var len = this.scale.count();
	            var start = extent[0];
	            var end = extent[1];
	            var span = end - start;

	            for (var i = 0; i < len; i++) {
	                bands.push([
	                    span * i / len + start,
	                    span * (i + 1) / len + start
	                ]);
	            }
	            return bands;
	        },

	        /**
	         * Get width of band
	         * @return {number}
	         */
	        getBandWidth: function () {
	            var axisExtent = this._extent;
	            var dataExtent = this.scale.getExtent();

	            var len = dataExtent[1] - dataExtent[0] + (this.onBand ? 1 : 0);
	            // Fix #2728, avoid NaN when only one data.
	            len === 0 && (len = 1);

	            var size = Math.abs(axisExtent[1] - axisExtent[0]);

	            return Math.abs(size) / len;
	        }
	    };

	    return Axis;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Helper function for axisLabelInterval calculation
	 */

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
	    'use strict';

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var axisHelper = __webpack_require__(47);

	    return function (axis) {
	        var axisModel = axis.model;
	        var labelModel = axisModel.getModel('axisLabel');
	        var labelInterval = labelModel.get('interval');
	        if (!(axis.type === 'category' && labelInterval === 'auto')) {
	            return labelInterval === 'auto' ? 0 : labelInterval;
	        }

	        return axisHelper.getAxisLabelInterval(
	            zrUtil.map(axis.scale.getTicks(), axis.dataToCoord, axis),
	            axisModel.getFormattedLabels(),
	            labelModel.getModel('textStyle').getFont(),
	            axis.isHorizontal()
	        );
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;// Grid 是在有直角坐标系的时候必须要存在的
	// 所以这里也要被 Cartesian2D 依赖
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {

	    'use strict';

	    __webpack_require__(59);
	    var ComponentModel = __webpack_require__(13);

	    return ComponentModel.extend({

	        type: 'grid',

	        dependencies: ['xAxis', 'yAxis'],

	        layoutMode: 'box',

	        /**
	         * @type {module:echarts/coord/cartesian/Grid}
	         */
	        coordinateSystem: null,

	        defaultOption: {
	            show: false,
	            zlevel: 0,
	            z: 0,
	            left: '10%',
	            top: 60,
	            right: '10%',
	            bottom: 60,
	            // If grid size contain label
	            containLabel: false,
	            // width: {totalWidth} - left - right,
	            // height: {totalHeight} - top - bottom,
	            backgroundColor: 'rgba(0,0,0,0)',
	            borderWidth: 1,
	            borderColor: '#ccc'
	        }
	    });
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {

	    'use strict';

	    var ComponentModel = __webpack_require__(13);
	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var axisModelCreator = __webpack_require__(60);

	    var AxisModel = ComponentModel.extend({

	        type: 'cartesian2dAxis',

	        /**
	         * @type {module:echarts/coord/cartesian/Axis2D}
	         */
	        axis: null,

	        /**
	         * @override
	         */
	        init: function () {
	            AxisModel.superApply(this, 'init', arguments);
	            this._resetRange();
	        },

	        /**
	         * @override
	         */
	        mergeOption: function () {
	            AxisModel.superApply(this, 'mergeOption', arguments);
	            this._resetRange();
	        },

	        /**
	         * @override
	         */
	        restoreData: function () {
	            AxisModel.superApply(this, 'restoreData', arguments);
	            this._resetRange();
	        },

	        /**
	         * @public
	         * @param {number} rangeStart
	         * @param {number} rangeEnd
	         */
	        setRange: function (rangeStart, rangeEnd) {
	            this.option.rangeStart = rangeStart;
	            this.option.rangeEnd = rangeEnd;
	        },

	        /**
	         * @public
	         * @return {Array.<number|string|Date>}
	         */
	        getMin: function () {
	            var option = this.option;
	            return option.rangeStart != null ? option.rangeStart : option.min;
	        },

	        /**
	         * @public
	         * @return {Array.<number|string|Date>}
	         */
	        getMax: function () {
	            var option = this.option;
	            return option.rangeEnd != null ? option.rangeEnd : option.max;
	        },

	        /**
	         * @public
	         * @return {boolean}
	         */
	        getNeedCrossZero: function () {
	            var option = this.option;
	            return (option.rangeStart != null || option.rangeEnd != null)
	                ? false : !option.scale;
	        },

	        /**
	         * @private
	         */
	        _resetRange: function () {
	            // rangeStart and rangeEnd is readonly.
	            this.option.rangeStart = this.option.rangeEnd = null;
	        }

	    });

	    function getAxisType(axisDim, option) {
	        // Default axis with data is category axis
	        return option.type || (option.data ? 'category' : 'value');
	    }

	    zrUtil.merge(AxisModel.prototype, __webpack_require__(62));

	    var extraOption = {
	        gridIndex: 0
	    };

	    axisModelCreator('x', AxisModel, getAxisType, extraOption);
	    axisModelCreator('y', AxisModel, getAxisType, extraOption);

	    return AxisModel;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var axisDefault = __webpack_require__(61);
	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var ComponentModel = __webpack_require__(13);
	    var layout = __webpack_require__(15);

	    // FIXME axisType is fixed ?
	    var AXIS_TYPES = ['value', 'category', 'time', 'log'];

	    /**
	     * Generate sub axis model class
	     * @param {string} axisName 'x' 'y' 'radius' 'angle' 'parallel'
	     * @param {module:echarts/model/Component} BaseAxisModelClass
	     * @param {Function} axisTypeDefaulter
	     * @param {Object} [extraDefaultOption]
	     */
	    return function (axisName, BaseAxisModelClass, axisTypeDefaulter, extraDefaultOption) {

	        zrUtil.each(AXIS_TYPES, function (axisType) {

	            BaseAxisModelClass.extend({

	                type: axisName + 'Axis.' + axisType,

	                mergeDefaultAndTheme: function (option, ecModel) {
	                    var layoutMode = this.layoutMode;
	                    var inputPositionParams = layoutMode
	                        ? layout.getLayoutParams(option) : {};

	                    var themeModel = ecModel.getTheme();
	                    zrUtil.merge(option, themeModel.get(axisType + 'Axis'));
	                    zrUtil.merge(option, this.getDefaultOption());

	                    option.type = axisTypeDefaulter(axisName, option);

	                    if (layoutMode) {
	                        layout.mergeLayoutParam(option, inputPositionParams, layoutMode);
	                    }
	                },

	                defaultOption: zrUtil.mergeAll(
	                    [
	                        {},
	                        axisDefault[axisType + 'Axis'],
	                        extraDefaultOption
	                    ],
	                    true
	                )
	            });
	        });

	        ComponentModel.registerSubTypeDefaulter(
	            axisName + 'Axis',
	            zrUtil.curry(axisTypeDefaulter, axisName)
	        );
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    var defaultOption = {
	        show: true,
	        zlevel: 0,                  // 一级层叠
	        z: 0,                       // 二级层叠
	        // 反向坐标轴
	        inverse: false,
	        // 坐标轴名字，默认为空
	        name: '',
	        // 坐标轴名字位置，支持'start' | 'middle' | 'end'
	        nameLocation: 'end',
	        // 坐标轴文字样式，默认取全局样式
	        nameTextStyle: {},
	        // 文字与轴线距离
	        nameGap: 15,
	        // 是否能触发鼠标事件
	        silent: true,
	        // 坐标轴线
	        axisLine: {
	            // 默认显示，属性show控制显示与否
	            show: true,
	            onZero: true,
	            // 属性lineStyle控制线条样式
	            lineStyle: {
	                color: '#333',
	                width: 1,
	                type: 'solid'
	            }
	        },
	        // 坐标轴小标记
	        axisTick: {
	            // 属性show控制显示与否，默认显示
	            show: true,
	            // 控制小标记是否在grid里
	            inside: false,
	            // 属性length控制线长
	            length: 5,
	            // 属性lineStyle控制线条样式
	            lineStyle: {
	                color: '#333',
	                width: 1
	            }
	        },
	        // 坐标轴文本标签，详见axis.axisLabel
	        axisLabel: {
	            show: true,
	            // 控制文本标签是否在grid里
	            inside: false,
	            rotate: 0,
	            margin: 8,
	            // formatter: null,
	            // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	            textStyle: {
	                color: '#333',
	                fontSize: 12
	            }
	        },
	        // 分隔线
	        splitLine: {
	            // 默认显示，属性show控制显示与否
	            show: true,
	            // 属性lineStyle（详见lineStyle）控制线条样式
	            lineStyle: {
	                color: ['#ccc'],
	                width: 1,
	                type: 'solid'
	            }
	        },
	        // 分隔区域
	        splitArea: {
	            // 默认不显示，属性show控制显示与否
	            show: false,
	            // 属性areaStyle（详见areaStyle）控制区域样式
	            areaStyle: {
	                color: ['rgba(250,250,250,0.3)','rgba(200,200,200,0.3)']
	            }
	        }
	    };

	    var categoryAxis = zrUtil.merge({
	        // 类目起始和结束两端空白策略
	        boundaryGap: true,
	        // PENDING
	        splitLine: {
	            show: false
	        },
	        // 坐标轴小标记
	        axisTick: {
	            interval: 'auto'
	        },
	        // 坐标轴文本标签，详见axis.axisLabel
	        axisLabel: {
	            interval: 'auto'
	        }
	    }, defaultOption);

	    var valueAxis = zrUtil.merge({
	        // 数值起始和结束两端空白策略
	        boundaryGap: [0, 0],
	        // 最小值, 设置成 'dataMin' 则从数据中计算最小值
	        // min: null,
	        // 最大值，设置成 'dataMax' 则从数据中计算最大值
	        // max: null,
	        // Readonly prop, specifies start value of the range when using data zoom.
	        // rangeStart: null
	        // Readonly prop, specifies end value of the range when using data zoom.
	        // rangeEnd: null
	        // 脱离0值比例，放大聚焦到最终_min，_max区间
	        // scale: false,
	        // 分割段数，默认为5
	        splitNumber: 5
	        // Minimum interval
	        // minInterval: null
	    }, defaultOption);

	    // FIXME
	    var timeAxis = zrUtil.defaults({
	        scale: true,
	        min: 'dataMin',
	        max: 'dataMax'
	    }, valueAxis);
	    var logAxis = zrUtil.defaults({}, valueAxis);
	    logAxis.scale = true;

	    return {
	        categoryAxis: categoryAxis,
	        valueAxis: valueAxis,
	        timeAxis: timeAxis,
	        logAxis: logAxis
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var axisHelper = __webpack_require__(47);

	    function getName(obj) {
	        if (zrUtil.isObject(obj) && obj.value != null) {
	            return obj.value;
	        }
	        else {
	            return obj;
	        }
	    }
	    /**
	     * Get categories
	     */
	    function getCategories() {
	        return this.get('type') === 'category'
	            && zrUtil.map(this.get('data'), getName);
	    }

	    /**
	     * Format labels
	     * @return {Array.<string>}
	     */
	    function getFormattedLabels() {
	        return axisHelper.getFormattedLabels(
	            this.axis,
	            this.get('axisLabel.formatter')
	        );
	    }

	    return {

	        getFormattedLabels: getFormattedLabels,

	        getCategories: getCategories
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;// TODO boundaryGap
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
	    'use strict';

	    __webpack_require__(59);

	    __webpack_require__(64);
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var graphic = __webpack_require__(25);
	    var AxisBuilder = __webpack_require__(65);
	    var ifIgnoreOnTick = AxisBuilder.ifIgnoreOnTick;
	    var getInterval = AxisBuilder.getInterval;

	    var axisBuilderAttrs = [
	        'axisLine', 'axisLabel', 'axisTick', 'axisName'
	    ];
	    var selfBuilderAttrs = [
	        'splitArea', 'splitLine'
	    ];

	    var AxisView = __webpack_require__(1).extendComponentView({

	        type: 'axis',

	        render: function (axisModel, ecModel) {

	            this.group.removeAll();

	            if (!axisModel.get('show')) {
	                return;
	            }

	            var gridModel = ecModel.getComponent('grid', axisModel.get('gridIndex'));

	            var layout = layoutAxis(gridModel, axisModel);

	            var axisBuilder = new AxisBuilder(axisModel, layout);

	            zrUtil.each(axisBuilderAttrs, axisBuilder.add, axisBuilder);

	            this.group.add(axisBuilder.getGroup());

	            zrUtil.each(selfBuilderAttrs, function (name) {
	                if (axisModel.get(name +'.show')) {
	                    this['_' + name](axisModel, gridModel, layout.labelInterval);
	                }
	            }, this);
	        },

	        /**
	         * @param {module:echarts/coord/cartesian/AxisModel} axisModel
	         * @param {module:echarts/coord/cartesian/GridModel} gridModel
	         * @param {number|Function} labelInterval
	         * @private
	         */
	        _splitLine: function (axisModel, gridModel, labelInterval) {
	            var axis = axisModel.axis;

	            var splitLineModel = axisModel.getModel('splitLine');
	            var lineStyleModel = splitLineModel.getModel('lineStyle');
	            var lineWidth = lineStyleModel.get('width');
	            var lineColors = lineStyleModel.get('color');

	            var lineInterval = getInterval(splitLineModel, labelInterval);

	            lineColors = zrUtil.isArray(lineColors) ? lineColors : [lineColors];

	            var gridRect = gridModel.coordinateSystem.getRect();
	            var isHorizontal = axis.isHorizontal();

	            var splitLines = [];
	            var lineCount = 0;

	            var ticksCoords = axis.getTicksCoords();

	            var p1 = [];
	            var p2 = [];
	            for (var i = 0; i < ticksCoords.length; i++) {
	                if (ifIgnoreOnTick(axis, i, lineInterval)) {
	                    continue;
	                }

	                var tickCoord = axis.toGlobalCoord(ticksCoords[i]);

	                if (isHorizontal) {
	                    p1[0] = tickCoord;
	                    p1[1] = gridRect.y;
	                    p2[0] = tickCoord;
	                    p2[1] = gridRect.y + gridRect.height;
	                }
	                else {
	                    p1[0] = gridRect.x;
	                    p1[1] = tickCoord;
	                    p2[0] = gridRect.x + gridRect.width;
	                    p2[1] = tickCoord;
	                }

	                var colorIndex = (lineCount++) % lineColors.length;
	                splitLines[colorIndex] = splitLines[colorIndex] || [];
	                splitLines[colorIndex].push(new graphic.Line(graphic.subPixelOptimizeLine({
	                    shape: {
	                        x1: p1[0],
	                        y1: p1[1],
	                        x2: p2[0],
	                        y2: p2[1]
	                    },
	                    style: {
	                        lineWidth: lineWidth
	                    },
	                    silent: true
	                })));
	            }

	            // Simple optimization
	            // Batching the lines if color are the same
	            var lineStyle = lineStyleModel.getLineStyle();
	            for (var i = 0; i < splitLines.length; i++) {
	                this.group.add(graphic.mergePath(splitLines[i], {
	                    style: zrUtil.defaults({
	                        stroke: lineColors[i % lineColors.length]
	                    }, lineStyle),
	                    silent: true
	                }));
	            }
	        },

	        /**
	         * @param {module:echarts/coord/cartesian/AxisModel} axisModel
	         * @param {module:echarts/coord/cartesian/GridModel} gridModel
	         * @param {number|Function} labelInterval
	         * @private
	         */
	        _splitArea: function (axisModel, gridModel, labelInterval) {
	            var axis = axisModel.axis;

	            var splitAreaModel = axisModel.getModel('splitArea');
	            var areaStyleModel = splitAreaModel.getModel('areaStyle');
	            var areaColors = areaStyleModel.get('color');

	            var gridRect = gridModel.coordinateSystem.getRect();
	            var ticksCoords = axis.getTicksCoords();

	            var prevX = axis.toGlobalCoord(ticksCoords[0]);
	            var prevY = axis.toGlobalCoord(ticksCoords[0]);

	            var splitAreaRects = [];
	            var count = 0;

	            var areaInterval = getInterval(splitAreaModel, labelInterval);

	            areaColors = zrUtil.isArray(areaColors) ? areaColors : [areaColors];

	            for (var i = 1; i < ticksCoords.length; i++) {
	                if (ifIgnoreOnTick(axis, i, areaInterval)) {
	                    continue;
	                }

	                var tickCoord = axis.toGlobalCoord(ticksCoords[i]);

	                var x;
	                var y;
	                var width;
	                var height;
	                if (axis.isHorizontal()) {
	                    x = prevX;
	                    y = gridRect.y;
	                    width = tickCoord - x;
	                    height = gridRect.height;
	                }
	                else {
	                    x = gridRect.x;
	                    y = prevY;
	                    width = gridRect.width;
	                    height = tickCoord - y;
	                }

	                var colorIndex = (count++) % areaColors.length;
	                splitAreaRects[colorIndex] = splitAreaRects[colorIndex] || [];
	                splitAreaRects[colorIndex].push(new graphic.Rect({
	                    shape: {
	                        x: x,
	                        y: y,
	                        width: width,
	                        height: height
	                    },
	                    silent: true
	                }));

	                prevX = x + width;
	                prevY = y + height;
	            }

	            // Simple optimization
	            // Batching the rects if color are the same
	            var areaStyle = areaStyleModel.getAreaStyle();
	            for (var i = 0; i < splitAreaRects.length; i++) {
	                this.group.add(graphic.mergePath(splitAreaRects[i], {
	                    style: zrUtil.defaults({
	                        fill: areaColors[i % areaColors.length]
	                    }, areaStyle),
	                    silent: true
	                }));
	            }
	        }
	    });

	    AxisView.extend({
	        type: 'xAxis'
	    });
	    AxisView.extend({
	        type: 'yAxis'
	    });

	    /**
	     * @inner
	     */
	    function layoutAxis(gridModel, axisModel) {
	        var grid = gridModel.coordinateSystem;
	        var axis = axisModel.axis;
	        var layout = {};

	        var rawAxisPosition = axis.position;
	        var axisPosition = axis.onZero ? 'onZero' : rawAxisPosition;
	        var axisDim = axis.dim;

	        // [left, right, top, bottom]
	        var rect = grid.getRect();
	        var rectBound = [rect.x, rect.x + rect.width, rect.y, rect.y + rect.height];

	        var posMap = {
	            x: {top: rectBound[2], bottom: rectBound[3]},
	            y: {left: rectBound[0], right: rectBound[1]}
	        };
	        posMap.x.onZero = Math.max(Math.min(getZero('y'), posMap.x.bottom), posMap.x.top);
	        posMap.y.onZero = Math.max(Math.min(getZero('x'), posMap.y.right), posMap.y.left);

	        function getZero(dim, val) {
	            var theAxis = grid.getAxis(dim);
	            return theAxis.toGlobalCoord(theAxis.dataToCoord(0));
	        }

	        // Axis position
	        layout.position = [
	            axisDim === 'y' ? posMap.y[axisPosition] : rectBound[0],
	            axisDim === 'x' ? posMap.x[axisPosition] : rectBound[3]
	        ];

	        // Axis rotation
	        var r = {x: 0, y: 1};
	        layout.rotation = Math.PI / 2 * r[axisDim];

	        // Tick and label direction, x y is axisDim
	        var dirMap = {top: -1, bottom: 1, left: -1, right: 1};

	        layout.labelDirection = layout.tickDirection = layout.nameDirection = dirMap[rawAxisPosition];
	        if (axis.onZero) {
	            layout.labelOffset = posMap[axisDim][rawAxisPosition] - posMap[axisDim].onZero;
	        }

	        if (axisModel.getModel('axisTick').get('inside')) {
	            layout.tickDirection = -layout.tickDirection;
	        }
	        if (axisModel.getModel('axisLabel').get('inside')) {
	            layout.labelDirection = -layout.labelDirection;
	        }

	        // Special label rotation
	        var labelRotation = axisModel.getModel('axisLabel').get('rotate');
	        layout.labelRotation = axisPosition === 'top' ? -labelRotation : labelRotation;

	        // label interval when auto mode.
	        layout.labelInterval = axis.getLabelInterval();

	        // Over splitLine and splitArea
	        layout.z2 = 1;

	        return layout;
	    }
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var graphic = __webpack_require__(25);
	    var Model = __webpack_require__(6);
	    var numberUtil = __webpack_require__(5);
	    var remRadian = numberUtil.remRadian;
	    var isRadianAroundZero = numberUtil.isRadianAroundZero;

	    var PI = Math.PI;

	    function makeAxisEventDataBase(axisModel) {
	        var eventData = {
	            componentType: axisModel.mainType
	        };
	        eventData[axisModel.mainType + 'Index'] = axisModel.componentIndex;
	        return eventData;
	    }

	    /**
	     * A final axis is translated and rotated from a "standard axis".
	     * So opt.position and opt.rotation is required.
	     *
	     * A standard axis is and axis from [0, 0] to [0, axisExtent[1]],
	     * for example: (0, 0) ------------> (0, 50)
	     *
	     * nameDirection or tickDirection or labelDirection is 1 means tick
	     * or label is below the standard axis, whereas is -1 means above
	     * the standard axis. labelOffset means offset between label and axis,
	     * which is useful when 'onZero', where axisLabel is in the grid and
	     * label in outside grid.
	     *
	     * Tips: like always,
	     * positive rotation represents anticlockwise, and negative rotation
	     * represents clockwise.
	     * The direction of position coordinate is the same as the direction
	     * of screen coordinate.
	     *
	     * Do not need to consider axis 'inverse', which is auto processed by
	     * axis extent.
	     *
	     * @param {module:zrender/container/Group} group
	     * @param {Object} axisModel
	     * @param {Object} opt Standard axis parameters.
	     * @param {Array.<number>} opt.position [x, y]
	     * @param {number} opt.rotation by radian
	     * @param {number} [opt.nameDirection=1] 1 or -1 Used when nameLocation is 'middle'.
	     * @param {number} [opt.tickDirection=1] 1 or -1
	     * @param {number} [opt.labelDirection=1] 1 or -1
	     * @param {number} [opt.labelOffset=0] Usefull when onZero.
	     * @param {string} [opt.axisName] default get from axisModel.
	     * @param {number} [opt.labelRotation] by degree, default get from axisModel.
	     * @param {number} [opt.labelInterval] Default label interval when label
	     *                                     interval from model is null or 'auto'.
	     * @param {number} [opt.strokeContainThreshold] Default label interval when label
	     * @param {number} [opt.axisLineSilent=true] If axis line is silent
	     */
	    var AxisBuilder = function (axisModel, opt) {

	        /**
	         * @readOnly
	         */
	        this.opt = opt;

	        /**
	         * @readOnly
	         */
	        this.axisModel = axisModel;

	        // Default value
	        zrUtil.defaults(
	            opt,
	            {
	                labelOffset: 0,
	                nameDirection: 1,
	                tickDirection: 1,
	                labelDirection: 1,
	                silent: true
	            }
	        );

	        /**
	         * @readOnly
	         */
	        this.group = new graphic.Group({
	            position: opt.position.slice(),
	            rotation: opt.rotation
	        });
	    };

	    AxisBuilder.prototype = {

	        constructor: AxisBuilder,

	        hasBuilder: function (name) {
	            return !!builders[name];
	        },

	        add: function (name) {
	            builders[name].call(this);
	        },

	        getGroup: function () {
	            return this.group;
	        }

	    };

	    var builders = {

	        /**
	         * @private
	         */
	        axisLine: function () {
	            var opt = this.opt;
	            var axisModel = this.axisModel;

	            if (!axisModel.get('axisLine.show')) {
	                return;
	            }

	            var extent = this.axisModel.axis.getExtent();

	            this.group.add(new graphic.Line({
	                shape: {
	                    x1: extent[0],
	                    y1: 0,
	                    x2: extent[1],
	                    y2: 0
	                },
	                style: zrUtil.extend(
	                    {lineCap: 'round'},
	                    axisModel.getModel('axisLine.lineStyle').getLineStyle()
	                ),
	                strokeContainThreshold: opt.strokeContainThreshold,
	                silent: !!opt.axisLineSilent,
	                z2: 1
	            }));
	        },

	        /**
	         * @private
	         */
	        axisTick: function () {
	            var axisModel = this.axisModel;

	            if (!axisModel.get('axisTick.show')) {
	                return;
	            }

	            var axis = axisModel.axis;
	            var tickModel = axisModel.getModel('axisTick');
	            var opt = this.opt;

	            var lineStyleModel = tickModel.getModel('lineStyle');
	            var tickLen = tickModel.get('length');
	            var tickInterval = getInterval(tickModel, opt.labelInterval);
	            var ticksCoords = axis.getTicksCoords();
	            var tickLines = [];

	            for (var i = 0; i < ticksCoords.length; i++) {
	                // Only ordinal scale support tick interval
	                if (ifIgnoreOnTick(axis, i, tickInterval)) {
	                     continue;
	                }

	                var tickCoord = ticksCoords[i];

	                // Tick line
	                tickLines.push(new graphic.Line(graphic.subPixelOptimizeLine({
	                    shape: {
	                        x1: tickCoord,
	                        y1: 0,
	                        x2: tickCoord,
	                        y2: opt.tickDirection * tickLen
	                    },
	                    style: {
	                        lineWidth: lineStyleModel.get('width')
	                    },
	                    silent: true
	                })));
	            }

	            this.group.add(graphic.mergePath(tickLines, {
	                style: lineStyleModel.getLineStyle(),
	                z2: 2,
	                silent: true
	            }));
	        },

	        /**
	         * @param {module:echarts/coord/cartesian/AxisModel} axisModel
	         * @param {module:echarts/coord/cartesian/GridModel} gridModel
	         * @private
	         */
	        axisLabel: function () {
	            var axisModel = this.axisModel;

	            if (!axisModel.get('axisLabel.show')) {
	                return;
	            }

	            var opt = this.opt;
	            var axis = axisModel.axis;
	            var labelModel = axisModel.getModel('axisLabel');
	            var textStyleModel = labelModel.getModel('textStyle');
	            var labelMargin = labelModel.get('margin');
	            var ticks = axis.scale.getTicks();
	            var labels = axisModel.getFormattedLabels();

	            // Special label rotate.
	            var labelRotation = opt.labelRotation;
	            if (labelRotation == null) {
	                labelRotation = labelModel.get('rotate') || 0;
	            }
	            // To radian.
	            labelRotation = labelRotation * PI / 180;

	            var labelLayout = innerTextLayout(opt, labelRotation, opt.labelDirection);
	            var categoryData = axisModel.get('data');

	            var textEls = [];
	            var isSilent = axisModel.get('silent');
	            for (var i = 0; i < ticks.length; i++) {
	                if (ifIgnoreOnTick(axis, i, opt.labelInterval)) {
	                     continue;
	                }

	                var itemTextStyleModel = textStyleModel;
	                if (categoryData && categoryData[i] && categoryData[i].textStyle) {
	                    itemTextStyleModel = new Model(
	                        categoryData[i].textStyle, textStyleModel, axisModel.ecModel
	                    );
	                }
	                var textColor = itemTextStyleModel.getTextColor();

	                var tickCoord = axis.dataToCoord(ticks[i]);
	                var pos = [
	                    tickCoord,
	                    opt.labelOffset + opt.labelDirection * labelMargin
	                ];
	                var labelBeforeFormat = axis.scale.getLabel(ticks[i]);

	                var textEl = new graphic.Text({
	                    style: {
	                        text: labels[i],
	                        textAlign: itemTextStyleModel.get('align', true) || labelLayout.textAlign,
	                        textVerticalAlign: itemTextStyleModel.get('baseline', true) || labelLayout.verticalAlign,
	                        textFont: itemTextStyleModel.getFont(),
	                        fill: typeof textColor === 'function' ? textColor(labelBeforeFormat) : textColor
	                    },
	                    position: pos,
	                    rotation: labelLayout.rotation,
	                    silent: isSilent,
	                    z2: 10
	                });
	                // Pack data for mouse event
	                textEl.eventData = makeAxisEventDataBase(axisModel);
	                textEl.eventData.targetType = 'axisLabel';
	                textEl.eventData.value = labelBeforeFormat;

	                textEls.push(textEl);
	                this.group.add(textEl);
	            }

	            function isTwoLabelOverlapped(current, next) {
	                var firstRect = current && current.getBoundingRect().clone();
	                var nextRect = next && next.getBoundingRect().clone();
	                if (firstRect && nextRect) {
	                    firstRect.applyTransform(current.getLocalTransform());
	                    nextRect.applyTransform(next.getLocalTransform());
	                    return firstRect.intersect(nextRect);
	                }
	            }
	            if (axis.type !== 'category') {
	                // If min or max are user set, we need to check
	                // If the tick on min(max) are overlap on their neighbour tick
	                // If they are overlapped, we need to hide the min(max) tick label
	                if (axisModel.getMin ? axisModel.getMin() : axisModel.get('min')) {
	                    var firstLabel = textEls[0];
	                    var nextLabel = textEls[1];
	                    if (isTwoLabelOverlapped(firstLabel, nextLabel)) {
	                        firstLabel.ignore = true;
	                    }
	                }
	                if (axisModel.getMax ? axisModel.getMax() : axisModel.get('max')) {
	                    var lastLabel = textEls[textEls.length - 1];
	                    var prevLabel = textEls[textEls.length - 2];
	                    if (isTwoLabelOverlapped(prevLabel, lastLabel)) {
	                        lastLabel.ignore = true;
	                    }
	                }
	            }
	        },

	        /**
	         * @private
	         */
	        axisName: function () {
	            var opt = this.opt;
	            var axisModel = this.axisModel;

	            var name = this.opt.axisName;
	            // If name is '', do not get name from axisMode.
	            if (name == null) {
	                name = axisModel.get('name');
	            }

	            if (!name) {
	                return;
	            }

	            var nameLocation = axisModel.get('nameLocation');
	            var nameDirection = opt.nameDirection;
	            var textStyleModel = axisModel.getModel('nameTextStyle');
	            var gap = axisModel.get('nameGap') || 0;

	            var extent = this.axisModel.axis.getExtent();
	            var gapSignal = extent[0] > extent[1] ? -1 : 1;
	            var pos = [
	                nameLocation === 'start'
	                    ? extent[0] - gapSignal * gap
	                    : nameLocation === 'end'
	                    ? extent[1] + gapSignal * gap
	                    : (extent[0] + extent[1]) / 2, // 'middle'
	                // Reuse labelOffset.
	                nameLocation === 'middle' ? opt.labelOffset + nameDirection * gap : 0
	            ];

	            var labelLayout;

	            if (nameLocation === 'middle') {
	                labelLayout = innerTextLayout(opt, opt.rotation, nameDirection);
	            }
	            else {
	                labelLayout = endTextLayout(opt, nameLocation, extent);
	            }

	            var textEl = new graphic.Text({
	                style: {
	                    text: name,
	                    textFont: textStyleModel.getFont(),
	                    fill: textStyleModel.getTextColor()
	                        || axisModel.get('axisLine.lineStyle.color'),
	                    textAlign: labelLayout.textAlign,
	                    textVerticalAlign: labelLayout.verticalAlign
	                },
	                position: pos,
	                rotation: labelLayout.rotation,
	                silent: axisModel.get('silent'),
	                z2: 1
	            });

	            textEl.eventData = makeAxisEventDataBase(axisModel);
	            textEl.eventData.targetType = 'axisName';
	            textEl.eventData.name = name;

	            this.group.add(textEl);
	        }

	    };

	    /**
	     * @inner
	     */
	    function innerTextLayout(opt, textRotation, direction) {
	        var rotationDiff = remRadian(textRotation - opt.rotation);
	        var textAlign;
	        var verticalAlign;

	        if (isRadianAroundZero(rotationDiff)) { // Label is parallel with axis line.
	            verticalAlign = direction > 0 ? 'top' : 'bottom';
	            textAlign = 'center';
	        }
	        else if (isRadianAroundZero(rotationDiff - PI)) { // Label is inverse parallel with axis line.
	            verticalAlign = direction > 0 ? 'bottom' : 'top';
	            textAlign = 'center';
	        }
	        else {
	            verticalAlign = 'middle';

	            if (rotationDiff > 0 && rotationDiff < PI) {
	                textAlign = direction > 0 ? 'right' : 'left';
	            }
	            else {
	                textAlign = direction > 0 ? 'left' : 'right';
	            }
	        }

	        return {
	            rotation: rotationDiff,
	            textAlign: textAlign,
	            verticalAlign: verticalAlign
	        };
	    }

	    /**
	     * @inner
	     */
	    function endTextLayout(opt, textPosition, extent) {
	        var rotationDiff = remRadian(-opt.rotation);
	        var textAlign;
	        var verticalAlign;
	        var inverse = extent[0] > extent[1];
	        var onLeft = (textPosition === 'start' && !inverse)
	            || (textPosition !== 'start' && inverse);

	        if (isRadianAroundZero(rotationDiff - PI / 2)) {
	            verticalAlign = onLeft ? 'bottom' : 'top';
	            textAlign = 'center';
	        }
	        else if (isRadianAroundZero(rotationDiff - PI * 1.5)) {
	            verticalAlign = onLeft ? 'top' : 'bottom';
	            textAlign = 'center';
	        }
	        else {
	            verticalAlign = 'middle';
	            if (rotationDiff < PI * 1.5 && rotationDiff > PI / 2) {
	                textAlign = onLeft ? 'left' : 'right';
	            }
	            else {
	                textAlign = onLeft ? 'right' : 'left';
	            }
	        }

	        return {
	            rotation: rotationDiff,
	            textAlign: textAlign,
	            verticalAlign: verticalAlign
	        };
	    }

	    /**
	     * @static
	     */
	    var ifIgnoreOnTick = AxisBuilder.ifIgnoreOnTick = function (axis, i, interval) {
	        var rawTick;
	        var scale = axis.scale;
	        return scale.type === 'ordinal'
	            && (
	                typeof interval === 'function'
	                    ? (
	                        rawTick = scale.getTicks()[i],
	                        !interval(rawTick, scale.getLabel(rawTick))
	                    )
	                    : i % (interval + 1)
	            );
	    };

	    /**
	     * @static
	     */
	    var getInterval = AxisBuilder.getInterval = function (model, labelInterval) {
	        var interval = model.get('interval');
	        if (interval == null || interval == 'auto') {
	            interval = labelInterval;
	        }
	        return interval;
	    };

	    return AxisBuilder;

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    __webpack_require__(46);

	    __webpack_require__(67);
	    __webpack_require__(68);

	    var barLayoutGrid = __webpack_require__(70);
	    var echarts = __webpack_require__(1);

	    echarts.registerLayout(zrUtil.curry(barLayoutGrid, 'bar'));
	    // Visual coding for legend
	    echarts.registerVisual(function (ecModel) {
	        ecModel.eachSeriesByType('bar', function (seriesModel) {
	            var data = seriesModel.getData();
	            data.setVisual('legendSymbol', 'roundRect');
	        });
	    });

	    // In case developer forget to include grid component
	    __webpack_require__(45);
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {

	    'use strict';

	    var SeriesModel = __webpack_require__(22);
	    var createListFromArray = __webpack_require__(34);

	    return SeriesModel.extend({

	        type: 'series.bar',

	        dependencies: ['grid', 'polar'],

	        getInitialData: function (option, ecModel) {
	            if (true) {
	                var coordSys = option.coordinateSystem;
	                if (coordSys !== 'cartesian2d') {
	                    throw new Error('Bar only support cartesian2d coordinateSystem');
	                }
	            }
	            return createListFromArray(option.data, this, ecModel);
	        },

	        getMarkerPosition: function (value) {
	            var coordSys = this.coordinateSystem;
	            if (coordSys) {
	                // PENDING if clamp ?
	                var pt = coordSys.dataToPoint(value, true);
	                var data = this.getData();
	                var offset = data.getLayout('offset');
	                var size = data.getLayout('size');
	                var offsetIndex = coordSys.getBaseAxis().isHorizontal() ? 0 : 1;
	                pt[offsetIndex] += offset + size / 2;
	                return pt;
	            }
	            return [NaN, NaN];
	        },

	        brushSelector: 'rect',

	        defaultOption: {
	            zlevel: 0,                  // 一级层叠
	            z: 2,                       // 二级层叠
	            coordinateSystem: 'cartesian2d',
	            legendHoverLink: true,
	            // stack: null

	            // Cartesian coordinate system
	            xAxisIndex: 0,
	            yAxisIndex: 0,

	            // 最小高度改为0
	            barMinHeight: 0,

	            // barMaxWidth: null,
	            // 默认自适应
	            // barWidth: null,
	            // 柱间距离，默认为柱形宽度的30%，可设固定值
	            // barGap: '30%',
	            // 类目间柱形距离，默认为类目间距的20%，可设固定值
	            // barCategoryGap: '20%',
	            // label: {
	            //     normal: {
	            //         show: false
	            //     }
	            // },
	            itemStyle: {
	                normal: {
	                    // color: '各异',
	                    // 柱条边线
	                    borderColor: '#fff',
	                    // 柱条边线线宽，单位px，默认为1
	                    borderWidth: 0
	                },
	                emphasis: {}
	            }
	        }
	    });
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    'use strict';

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var graphic = __webpack_require__(25);

	    zrUtil.extend(__webpack_require__(6).prototype, __webpack_require__(69));

	    function fixLayoutWithLineWidth(layout, lineWidth) {
	        var signX = layout.width > 0 ? 1 : -1;
	        var signY = layout.height > 0 ? 1 : -1;
	        // In case width or height are too small.
	        lineWidth = Math.min(lineWidth, Math.abs(layout.width), Math.abs(layout.height));
	        layout.x += signX * lineWidth / 2;
	        layout.y += signY * lineWidth / 2;
	        layout.width -= signX * lineWidth;
	        layout.height -= signY * lineWidth;
	    }

	    return __webpack_require__(1).extendChartView({

	        type: 'bar',

	        render: function (seriesModel, ecModel, api) {
	            var coordinateSystemType = seriesModel.get('coordinateSystem');

	            if (coordinateSystemType === 'cartesian2d') {
	                this._renderOnCartesian(seriesModel, ecModel, api);
	            }

	            return this.group;
	        },

	        _renderOnCartesian: function (seriesModel, ecModel, api) {
	            var group = this.group;
	            var data = seriesModel.getData();
	            var oldData = this._data;

	            var cartesian = seriesModel.coordinateSystem;
	            var baseAxis = cartesian.getBaseAxis();
	            var isHorizontal = baseAxis.isHorizontal();

	            var enableAnimation = seriesModel.get('animation');

	            var barBorderWidthQuery = ['itemStyle', 'normal', 'barBorderWidth'];

	            function createRect(dataIndex, isUpdate) {
	                var layout = data.getItemLayout(dataIndex);
	                var lineWidth = data.getItemModel(dataIndex).get(barBorderWidthQuery) || 0;
	                fixLayoutWithLineWidth(layout, lineWidth);

	                var rect = new graphic.Rect({
	                    shape: zrUtil.extend({}, layout)
	                });
	                // Animation
	                if (enableAnimation) {
	                    var rectShape = rect.shape;
	                    var animateProperty = isHorizontal ? 'height' : 'width';
	                    var animateTarget = {};
	                    rectShape[animateProperty] = 0;
	                    animateTarget[animateProperty] = layout[animateProperty];
	                    graphic[isUpdate? 'updateProps' : 'initProps'](rect, {
	                        shape: animateTarget
	                    }, seriesModel, dataIndex);
	                }
	                return rect;
	            }
	            data.diff(oldData)
	                .add(function (dataIndex) {
	                    // 空数据
	                    if (!data.hasValue(dataIndex)) {
	                        return;
	                    }

	                    var rect = createRect(dataIndex);

	                    data.setItemGraphicEl(dataIndex, rect);

	                    group.add(rect);

	                })
	                .update(function (newIndex, oldIndex) {
	                    var rect = oldData.getItemGraphicEl(oldIndex);
	                    // 空数据
	                    if (!data.hasValue(newIndex)) {
	                        group.remove(rect);
	                        return;
	                    }
	                    if (!rect) {
	                        rect = createRect(newIndex, true);
	                    }

	                    var layout = data.getItemLayout(newIndex);
	                    var lineWidth = data.getItemModel(newIndex).get(barBorderWidthQuery) || 0;
	                    fixLayoutWithLineWidth(layout, lineWidth);

	                    graphic.updateProps(rect, {
	                        shape: layout
	                    }, seriesModel, newIndex);

	                    data.setItemGraphicEl(newIndex, rect);

	                    // Add back
	                    group.add(rect);
	                })
	                .remove(function (idx) {
	                    var rect = oldData.getItemGraphicEl(idx);
	                    if (rect) {
	                        // Not show text when animating
	                        rect.style.text = '';
	                        graphic.updateProps(rect, {
	                            shape: {
	                                width: 0
	                            }
	                        }, seriesModel, idx, function () {
	                            group.remove(rect);
	                        });
	                    }
	                })
	                .execute();

	            this._updateStyle(seriesModel, data, isHorizontal);

	            this._data = data;
	        },

	        _updateStyle: function (seriesModel, data, isHorizontal) {
	            function setLabel(style, model, color, labelText, labelPositionOutside) {
	                graphic.setText(style, model, color);
	                style.text = labelText;
	                if (style.textPosition === 'outside') {
	                    style.textPosition = labelPositionOutside;
	                }
	            }

	            data.eachItemGraphicEl(function (rect, idx) {
	                var itemModel = data.getItemModel(idx);
	                var color = data.getItemVisual(idx, 'color');
	                var opacity = data.getItemVisual(idx, 'opacity');
	                var layout = data.getItemLayout(idx);
	                var itemStyleModel = itemModel.getModel('itemStyle.normal');

	                var hoverStyle = itemModel.getModel('itemStyle.emphasis').getBarItemStyle();

	                rect.setShape('r', itemStyleModel.get('barBorderRadius') || 0);

	                rect.useStyle(zrUtil.defaults(
	                    {
	                        fill: color,
	                        opacity: opacity
	                    },
	                    itemStyleModel.getBarItemStyle()
	                ));

	                var labelPositionOutside = isHorizontal
	                    ? (layout.height > 0 ? 'bottom' : 'top')
	                    : (layout.width > 0 ? 'left' : 'right');

	                var labelModel = itemModel.getModel('label.normal');
	                var hoverLabelModel = itemModel.getModel('label.emphasis');
	                var rectStyle = rect.style;
	                if (labelModel.get('show')) {
	                    setLabel(
	                        rectStyle, labelModel, color,
	                        zrUtil.retrieve(
	                            seriesModel.getFormattedLabel(idx, 'normal'),
	                            seriesModel.getRawValue(idx)
	                        ),
	                        labelPositionOutside
	                    );
	                }
	                else {
	                    rectStyle.text = '';
	                }
	                if (hoverLabelModel.get('show')) {
	                    setLabel(
	                        hoverStyle, hoverLabelModel, color,
	                        zrUtil.retrieve(
	                            seriesModel.getFormattedLabel(idx, 'emphasis'),
	                            seriesModel.getRawValue(idx)
	                        ),
	                        labelPositionOutside
	                    );
	                }
	                else {
	                    hoverStyle.text = '';
	                }
	                graphic.setHoverStyle(rect, hoverStyle);
	            });
	        },

	        remove: function (ecModel, api) {
	            var group = this.group;
	            if (ecModel.get('animation')) {
	                if (this._data) {
	                    this._data.eachItemGraphicEl(function (el) {
	                        // Not show text when animating
	                        el.style.text = '';
	                        graphic.updateProps(el, {
	                            shape: {
	                                width: 0
	                            }
	                        }, ecModel, el.dataIndex, function () {
	                            group.remove(el);
	                        });
	                    });
	                }
	            }
	            else {
	                group.removeAll();
	            }
	        }
	    });
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {


	    var getBarItemStyle = __webpack_require__(9)(
	        [
	            ['fill', 'color'],
	            ['stroke', 'borderColor'],
	            ['lineWidth', 'borderWidth'],
	            // Compatitable with 2
	            ['stroke', 'barBorderColor'],
	            ['lineWidth', 'barBorderWidth'],
	            ['opacity'],
	            ['shadowBlur'],
	            ['shadowOffsetX'],
	            ['shadowOffsetY'],
	            ['shadowColor']
	        ]
	    );
	    return {
	        getBarItemStyle: function (excludes) {
	            var style = getBarItemStyle.call(this, excludes);
	            if (this.getBorderLineDash) {
	                var lineDash = this.getBorderLineDash();
	                lineDash && (style.lineDash = lineDash);
	            }
	            return style;
	        }
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {

	    'use strict';

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var numberUtil = __webpack_require__(5);
	    var parsePercent = numberUtil.parsePercent;

	    function getSeriesStackId(seriesModel) {
	        return seriesModel.get('stack') || '__ec_stack_' + seriesModel.seriesIndex;
	    }

	    function calBarWidthAndOffset(barSeries, api) {
	        // Columns info on each category axis. Key is cartesian name
	        var columnsMap = {};

	        zrUtil.each(barSeries, function (seriesModel, idx) {
	            var cartesian = seriesModel.coordinateSystem;

	            var baseAxis = cartesian.getBaseAxis();

	            var columnsOnAxis = columnsMap[baseAxis.index] || {
	                remainedWidth: baseAxis.getBandWidth(),
	                autoWidthCount: 0,
	                categoryGap: '20%',
	                gap: '30%',
	                axis: baseAxis,
	                stacks: {}
	            };
	            var stacks = columnsOnAxis.stacks;
	            columnsMap[baseAxis.index] = columnsOnAxis;

	            var stackId = getSeriesStackId(seriesModel);

	            if (!stacks[stackId]) {
	                columnsOnAxis.autoWidthCount++;
	            }
	            stacks[stackId] = stacks[stackId] || {
	                width: 0,
	                maxWidth: 0
	            };

	            var barWidth = seriesModel.get('barWidth');
	            var barMaxWidth = seriesModel.get('barMaxWidth');
	            var barGap = seriesModel.get('barGap');
	            var barCategoryGap = seriesModel.get('barCategoryGap');
	            // TODO
	            if (barWidth && ! stacks[stackId].width) {
	                barWidth = Math.min(columnsOnAxis.remainedWidth, barWidth);
	                stacks[stackId].width = barWidth;
	                columnsOnAxis.remainedWidth -= barWidth;
	            }

	            barMaxWidth && (stacks[stackId].maxWidth = barMaxWidth);
	            (barGap != null) && (columnsOnAxis.gap = barGap);
	            (barCategoryGap != null) && (columnsOnAxis.categoryGap = barCategoryGap);
	        });

	        var result = {};

	        zrUtil.each(columnsMap, function (columnsOnAxis, coordSysName) {

	            result[coordSysName] = {};

	            var stacks = columnsOnAxis.stacks;
	            var baseAxis = columnsOnAxis.axis;
	            var bandWidth = baseAxis.getBandWidth();
	            var categoryGap = parsePercent(columnsOnAxis.categoryGap, bandWidth);
	            var barGapPercent = parsePercent(columnsOnAxis.gap, 1);

	            var remainedWidth = columnsOnAxis.remainedWidth;
	            var autoWidthCount = columnsOnAxis.autoWidthCount;
	            var autoWidth = (remainedWidth - categoryGap)
	                / (autoWidthCount + (autoWidthCount - 1) * barGapPercent);
	            autoWidth = Math.max(autoWidth, 0);

	            // Find if any auto calculated bar exceeded maxBarWidth
	            zrUtil.each(stacks, function (column, stack) {
	                var maxWidth = column.maxWidth;
	                if (!column.width && maxWidth && maxWidth < autoWidth) {
	                    maxWidth = Math.min(maxWidth, remainedWidth);
	                    remainedWidth -= maxWidth;
	                    column.width = maxWidth;
	                    autoWidthCount--;
	                }
	            });

	            // Recalculate width again
	            autoWidth = (remainedWidth - categoryGap)
	                / (autoWidthCount + (autoWidthCount - 1) * barGapPercent);
	            autoWidth = Math.max(autoWidth, 0);

	            var widthSum = 0;
	            var lastColumn;
	            zrUtil.each(stacks, function (column, idx) {
	                if (!column.width) {
	                    column.width = autoWidth;
	                }
	                lastColumn = column;
	                widthSum += column.width * (1 + barGapPercent);
	            });
	            if (lastColumn) {
	                widthSum -= lastColumn.width * barGapPercent;
	            }

	            var offset = -widthSum / 2;
	            zrUtil.each(stacks, function (column, stackId) {
	                result[coordSysName][stackId] = result[coordSysName][stackId] || {
	                    offset: offset,
	                    width: column.width
	                };

	                offset += column.width * (1 + barGapPercent);
	            });
	        });

	        return result;
	    }

	    /**
	     * @param {string} seriesType
	     * @param {module:echarts/model/Global} ecModel
	     * @param {module:echarts/ExtensionAPI} api
	     */
	    function barLayoutGrid(seriesType, ecModel, api) {

	        var barWidthAndOffset = calBarWidthAndOffset(
	            zrUtil.filter(
	                ecModel.getSeriesByType(seriesType),
	                function (seriesModel) {
	                    return !ecModel.isSeriesFiltered(seriesModel)
	                        && seriesModel.coordinateSystem
	                        && seriesModel.coordinateSystem.type === 'cartesian2d';
	                }
	            )
	        );

	        var lastStackCoords = {};

	        ecModel.eachSeriesByType(seriesType, function (seriesModel) {

	            var data = seriesModel.getData();
	            var cartesian = seriesModel.coordinateSystem;
	            var baseAxis = cartesian.getBaseAxis();

	            var stackId = getSeriesStackId(seriesModel);
	            var columnLayoutInfo = barWidthAndOffset[baseAxis.index][stackId];
	            var columnOffset = columnLayoutInfo.offset;
	            var columnWidth = columnLayoutInfo.width;
	            var valueAxis = cartesian.getOtherAxis(baseAxis);

	            var barMinHeight = seriesModel.get('barMinHeight') || 0;

	            var valueAxisStart = baseAxis.onZero
	                ? valueAxis.toGlobalCoord(valueAxis.dataToCoord(0))
	                : valueAxis.getGlobalExtent()[0];

	            var coords = cartesian.dataToPoints(data, true);
	            lastStackCoords[stackId] = lastStackCoords[stackId] || [];

	            data.setLayout({
	                offset: columnOffset,
	                size: columnWidth
	            });
	            data.each(valueAxis.dim, function (value, idx) {
	                // 空数据
	                if (isNaN(value)) {
	                    return;
	                }
	                if (!lastStackCoords[stackId][idx]) {
	                    lastStackCoords[stackId][idx] = {
	                        // Positive stack
	                        p: valueAxisStart,
	                        // Negative stack
	                        n: valueAxisStart
	                    };
	                }
	                var sign = value >= 0 ? 'p' : 'n';
	                var coord = coords[idx];
	                var lastCoord = lastStackCoords[stackId][idx][sign];
	                var x, y, width, height;
	                if (valueAxis.isHorizontal()) {
	                    x = lastCoord;
	                    y = coord[1] + columnOffset;
	                    width = coord[0] - lastCoord;
	                    height = columnWidth;

	                    if (Math.abs(width) < barMinHeight) {
	                        width = (width < 0 ? -1 : 1) * barMinHeight;
	                    }
	                    lastStackCoords[stackId][idx][sign] += width;
	                }
	                else {
	                    x = coord[0] + columnOffset;
	                    y = lastCoord;
	                    width = columnWidth;
	                    height = coord[1] - lastCoord;
	                    if (Math.abs(height) < barMinHeight) {
	                        // Include zero to has a positive bar
	                        height = (height <= 0 ? -1 : 1) * barMinHeight;
	                    }
	                    lastStackCoords[stackId][idx][sign] += height;
	                }

	                data.setItemLayout(idx, {
	                    x: x,
	                    y: y,
	                    width: width,
	                    height: height
	                });
	            }, true);

	        }, this);
	    }

	    return barLayoutGrid;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var echarts = __webpack_require__(1);

	    __webpack_require__(72);
	    __webpack_require__(74);

	    __webpack_require__(75)('pie', [{
	        type: 'pieToggleSelect',
	        event: 'pieselectchanged',
	        method: 'toggleSelected'
	    }, {
	        type: 'pieSelect',
	        event: 'pieselected',
	        method: 'select'
	    }, {
	        type: 'pieUnSelect',
	        event: 'pieunselected',
	        method: 'unSelect'
	    }]);

	    echarts.registerVisual(zrUtil.curry(__webpack_require__(76), 'pie'));

	    echarts.registerLayout(zrUtil.curry(
	        __webpack_require__(77), 'pie'
	    ));

	    echarts.registerProcessor(zrUtil.curry(__webpack_require__(79), 'pie'));
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {

	    'use strict';

	    var List = __webpack_require__(30);
	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var modelUtil = __webpack_require__(3);
	    var completeDimensions = __webpack_require__(35);

	    var dataSelectableMixin = __webpack_require__(73);

	    var PieSeries = __webpack_require__(1).extendSeriesModel({

	        type: 'series.pie',

	        // Overwrite
	        init: function (option) {
	            PieSeries.superApply(this, 'init', arguments);

	            // Enable legend selection for each data item
	            // Use a function instead of direct access because data reference may changed
	            this.legendDataProvider = function () {
	                return this._dataBeforeProcessed;
	            };

	            this.updateSelectedMap(option.data);

	            this._defaultLabelLine(option);
	        },

	        // Overwrite
	        mergeOption: function (newOption) {
	            PieSeries.superCall(this, 'mergeOption', newOption);
	            this.updateSelectedMap(this.option.data);
	        },

	        getInitialData: function (option, ecModel) {
	            var dimensions = completeDimensions(['value'], option.data);
	            var list = new List(dimensions, this);
	            list.initData(option.data);
	            return list;
	        },

	        // Overwrite
	        getDataParams: function (dataIndex) {
	            var data = this._data;
	            var params = PieSeries.superCall(this, 'getDataParams', dataIndex);
	            var sum = data.getSum('value');
	            // FIXME toFixed?
	            //
	            // Percent is 0 if sum is 0
	            params.percent = !sum ? 0 : +(data.get('value', dataIndex) / sum * 100).toFixed(2);

	            params.$vars.push('percent');
	            return params;
	        },

	        _defaultLabelLine: function (option) {
	            // Extend labelLine emphasis
	            modelUtil.defaultEmphasis(option.labelLine, ['show']);

	            var labelLineNormalOpt = option.labelLine.normal;
	            var labelLineEmphasisOpt = option.labelLine.emphasis;
	            // Not show label line if `label.normal.show = false`
	            labelLineNormalOpt.show = labelLineNormalOpt.show
	                && option.label.normal.show;
	            labelLineEmphasisOpt.show = labelLineEmphasisOpt.show
	                && option.label.emphasis.show;
	        },

	        defaultOption: {
	            zlevel: 0,
	            z: 2,
	            legendHoverLink: true,

	            hoverAnimation: true,
	            // 默认全局居中
	            center: ['50%', '50%'],
	            radius: [0, '75%'],
	            // 默认顺时针
	            clockwise: true,
	            startAngle: 90,
	            // 最小角度改为0
	            minAngle: 0,
	            // 选中是扇区偏移量
	            selectedOffset: 10,

	            // If use strategy to avoid label overlapping
	            avoidLabelOverlap: true,
	            // 选择模式，默认关闭，可选single，multiple
	            // selectedMode: false,
	            // 南丁格尔玫瑰图模式，'radius'（半径） | 'area'（面积）
	            // roseType: null,

	            label: {
	                normal: {
	                    // If rotate around circle
	                    rotate: false,
	                    show: true,
	                    // 'outer', 'inside', 'center'
	                    position: 'outer'
	                    // formatter: 标签文本格式器，同Tooltip.formatter，不支持异步回调
	                    // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
	                    // distance: 当position为inner时有效，为label位置到圆心的距离与圆半径(环状图为内外半径和)的比例系数
	                },
	                emphasis: {}
	            },
	            // Enabled when label.normal.position is 'outer'
	            labelLine: {
	                normal: {
	                    show: true,
	                    // 引导线两段中的第一段长度
	                    length: 15,
	                    // 引导线两段中的第二段长度
	                    length2: 15,
	                    smooth: false,
	                    lineStyle: {
	                        // color: 各异,
	                        width: 1,
	                        type: 'solid'
	                    }
	                }
	            },
	            itemStyle: {
	                normal: {
	                    borderWidth: 1
	                },
	                emphasis: {}
	            },

	            animationEasing: 'cubicOut',

	            data: []
	        }
	    });

	    zrUtil.mixin(PieSeries, dataSelectableMixin);

	    return PieSeries;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Data selectable mixin for chart series.
	 * To eanble data select, option of series must have `selectedMode`.
	 * And each data item will use `selected` to toggle itself selected status
	 *
	 * @module echarts/chart/helper/DataSelectable
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    return {

	        updateSelectedMap: function (targetList) {
	            this._selectTargetMap = zrUtil.reduce(targetList || [], function (targetMap, target) {
	                targetMap[target.name] = target;
	                return targetMap;
	            }, {});
	        },
	        /**
	         * @param {string} name
	         */
	        // PENGING If selectedMode is null ?
	        select: function (name) {
	            var targetMap = this._selectTargetMap;
	            var target = targetMap[name];
	            var selectedMode = this.get('selectedMode');
	            if (selectedMode === 'single') {
	                zrUtil.each(targetMap, function (target) {
	                    target.selected = false;
	                });
	            }
	            target && (target.selected = true);
	        },

	        /**
	         * @param {string} name
	         */
	        unSelect: function (name) {
	            var target = this._selectTargetMap[name];
	            // var selectedMode = this.get('selectedMode');
	            // selectedMode !== 'single' && target && (target.selected = false);
	            target && (target.selected = false);
	        },

	        /**
	         * @param {string} name
	         */
	        toggleSelected: function (name) {
	            var target = this._selectTargetMap[name];
	            if (target != null) {
	                this[target.selected ? 'unSelect' : 'select'](name);
	                return target.selected;
	            }
	        },

	        /**
	         * @param {string} name
	         */
	        isSelected: function (name) {
	            var target = this._selectTargetMap[name];
	            return target && target.selected;
	        }
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var graphic = __webpack_require__(25);
	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    /**
	     * @param {module:echarts/model/Series} seriesModel
	     * @param {boolean} hasAnimation
	     * @inner
	     */
	    function updateDataSelected(uid, seriesModel, hasAnimation, api) {
	        var data = seriesModel.getData();
	        var dataIndex = this.dataIndex;
	        var name = data.getName(dataIndex);
	        var selectedOffset = seriesModel.get('selectedOffset');

	        api.dispatchAction({
	            type: 'pieToggleSelect',
	            from: uid,
	            name: name,
	            seriesId: seriesModel.id
	        });

	        data.each(function (idx) {
	            toggleItemSelected(
	                data.getItemGraphicEl(idx),
	                data.getItemLayout(idx),
	                seriesModel.isSelected(data.getName(idx)),
	                selectedOffset,
	                hasAnimation
	            );
	        });
	    }

	    /**
	     * @param {module:zrender/graphic/Sector} el
	     * @param {Object} layout
	     * @param {boolean} isSelected
	     * @param {number} selectedOffset
	     * @param {boolean} hasAnimation
	     * @inner
	     */
	    function toggleItemSelected(el, layout, isSelected, selectedOffset, hasAnimation) {
	        var midAngle = (layout.startAngle + layout.endAngle) / 2;

	        var dx = Math.cos(midAngle);
	        var dy = Math.sin(midAngle);

	        var offset = isSelected ? selectedOffset : 0;
	        var position = [dx * offset, dy * offset];

	        hasAnimation
	            // animateTo will stop revious animation like update transition
	            ? el.animate()
	                .when(200, {
	                    position: position
	                })
	                .start('bounceOut')
	            : el.attr('position', position);
	    }

	    /**
	     * Piece of pie including Sector, Label, LabelLine
	     * @constructor
	     * @extends {module:zrender/graphic/Group}
	     */
	    function PiePiece(data, idx) {

	        graphic.Group.call(this);

	        var sector = new graphic.Sector({
	            z2: 2
	        });
	        var polyline = new graphic.Polyline();
	        var text = new graphic.Text();
	        this.add(sector);
	        this.add(polyline);
	        this.add(text);

	        this.updateData(data, idx, true);

	        // Hover to change label and labelLine
	        function onEmphasis() {
	            polyline.ignore = polyline.hoverIgnore;
	            text.ignore = text.hoverIgnore;
	        }
	        function onNormal() {
	            polyline.ignore = polyline.normalIgnore;
	            text.ignore = text.normalIgnore;
	        }
	        this.on('emphasis', onEmphasis)
	            .on('normal', onNormal)
	            .on('mouseover', onEmphasis)
	            .on('mouseout', onNormal);
	    }

	    var piePieceProto = PiePiece.prototype;

	    function getLabelStyle(data, idx, state, labelModel, labelPosition) {
	        var textStyleModel = labelModel.getModel('textStyle');
	        var isLabelInside = labelPosition === 'inside' || labelPosition === 'inner';
	        return {
	            fill: textStyleModel.getTextColor()
	                || (isLabelInside ? '#fff' : data.getItemVisual(idx, 'color')),
	            opacity: data.getItemVisual(idx, 'opacity'),
	            textFont: textStyleModel.getFont(),
	            text: zrUtil.retrieve(
	                data.hostModel.getFormattedLabel(idx, state), data.getName(idx)
	            )
	        };
	    }

	    piePieceProto.updateData = function (data, idx, firstCreate) {

	        var sector = this.childAt(0);

	        var seriesModel = data.hostModel;
	        var itemModel = data.getItemModel(idx);
	        var layout = data.getItemLayout(idx);
	        var sectorShape = zrUtil.extend({}, layout);
	        sectorShape.label = null;
	        if (firstCreate) {
	            sector.setShape(sectorShape);
	            sector.shape.endAngle = layout.startAngle;
	            graphic.updateProps(sector, {
	                shape: {
	                    endAngle: layout.endAngle
	                }
	            }, seriesModel, idx);
	        }
	        else {
	            graphic.updateProps(sector, {
	                shape: sectorShape
	            }, seriesModel, idx);
	        }

	        // Update common style
	        var itemStyleModel = itemModel.getModel('itemStyle');
	        var visualColor = data.getItemVisual(idx, 'color');

	        sector.useStyle(
	            zrUtil.defaults(
	                {
	                    lineJoin: 'bevel',
	                    fill: visualColor
	                },
	                itemStyleModel.getModel('normal').getItemStyle()
	            )
	        );
	        sector.hoverStyle = itemStyleModel.getModel('emphasis').getItemStyle();

	        // Toggle selected
	        toggleItemSelected(
	            this,
	            data.getItemLayout(idx),
	            itemModel.get('selected'),
	            seriesModel.get('selectedOffset'),
	            seriesModel.get('animation')
	        );

	        function onEmphasis() {
	            // Sector may has animation of updating data. Force to move to the last frame
	            // Or it may stopped on the wrong shape
	            sector.stopAnimation(true);
	            sector.animateTo({
	                shape: {
	                    r: layout.r + 10
	                }
	            }, 300, 'elasticOut');
	        }
	        function onNormal() {
	            sector.stopAnimation(true);
	            sector.animateTo({
	                shape: {
	                    r: layout.r
	                }
	            }, 300, 'elasticOut');
	        }
	        sector.off('mouseover').off('mouseout').off('emphasis').off('normal');
	        if (itemModel.get('hoverAnimation') && seriesModel.ifEnableAnimation()) {
	            sector
	                .on('mouseover', onEmphasis)
	                .on('mouseout', onNormal)
	                .on('emphasis', onEmphasis)
	                .on('normal', onNormal);
	        }

	        this._updateLabel(data, idx);

	        graphic.setHoverStyle(this);
	    };

	    piePieceProto._updateLabel = function (data, idx) {

	        var labelLine = this.childAt(1);
	        var labelText = this.childAt(2);

	        var seriesModel = data.hostModel;
	        var itemModel = data.getItemModel(idx);
	        var layout = data.getItemLayout(idx);
	        var labelLayout = layout.label;
	        var visualColor = data.getItemVisual(idx, 'color');

	        graphic.updateProps(labelLine, {
	            shape: {
	                points: labelLayout.linePoints || [
	                    [labelLayout.x, labelLayout.y], [labelLayout.x, labelLayout.y], [labelLayout.x, labelLayout.y]
	                ]
	            }
	        }, seriesModel, idx);

	        graphic.updateProps(labelText, {
	            style: {
	                x: labelLayout.x,
	                y: labelLayout.y
	            }
	        }, seriesModel, idx);
	        labelText.attr({
	            style: {
	                textVerticalAlign: labelLayout.verticalAlign,
	                textAlign: labelLayout.textAlign,
	                textFont: labelLayout.font
	            },
	            rotation: labelLayout.rotation,
	            origin: [labelLayout.x, labelLayout.y],
	            z2: 10
	        });

	        var labelModel = itemModel.getModel('label.normal');
	        var labelHoverModel = itemModel.getModel('label.emphasis');
	        var labelLineModel = itemModel.getModel('labelLine.normal');
	        var labelLineHoverModel = itemModel.getModel('labelLine.emphasis');
	        var labelPosition = labelModel.get('position') || labelHoverModel.get('position');

	        labelText.setStyle(getLabelStyle(data, idx, 'normal', labelModel, labelPosition));

	        labelText.ignore = labelText.normalIgnore = !labelModel.get('show');
	        labelText.hoverIgnore = !labelHoverModel.get('show');

	        labelLine.ignore = labelLine.normalIgnore = !labelLineModel.get('show');
	        labelLine.hoverIgnore = !labelLineHoverModel.get('show');

	        // Default use item visual color
	        labelLine.setStyle({
	            stroke: visualColor,
	            opacity: data.getItemVisual(idx, 'opacity')
	        });
	        labelLine.setStyle(labelLineModel.getModel('lineStyle').getLineStyle());

	        labelText.hoverStyle = getLabelStyle(data, idx, 'emphasis', labelHoverModel, labelPosition);
	        labelLine.hoverStyle = labelLineHoverModel.getModel('lineStyle').getLineStyle();

	        var smooth = labelLineModel.get('smooth');
	        if (smooth && smooth === true) {
	            smooth = 0.4;
	        }
	        labelLine.setShape({
	            smooth: smooth
	        });
	    };

	    zrUtil.inherits(PiePiece, graphic.Group);


	    // Pie view
	    var Pie = __webpack_require__(24).extend({

	        type: 'pie',

	        init: function () {
	            var sectorGroup = new graphic.Group();
	            this._sectorGroup = sectorGroup;
	        },

	        render: function (seriesModel, ecModel, api, payload) {
	            if (payload && (payload.from === this.uid)) {
	                return;
	            }

	            var data = seriesModel.getData();
	            var oldData = this._data;
	            var group = this.group;

	            var hasAnimation = ecModel.get('animation');
	            var isFirstRender = !oldData;

	            var onSectorClick = zrUtil.curry(
	                updateDataSelected, this.uid, seriesModel, hasAnimation, api
	            );

	            var selectedMode = seriesModel.get('selectedMode');

	            data.diff(oldData)
	                .add(function (idx) {
	                    var piePiece = new PiePiece(data, idx);
	                    if (isFirstRender) {
	                        piePiece.eachChild(function (child) {
	                            child.stopAnimation(true);
	                        });
	                    }

	                    selectedMode && piePiece.on('click', onSectorClick);

	                    data.setItemGraphicEl(idx, piePiece);

	                    group.add(piePiece);
	                })
	                .update(function (newIdx, oldIdx) {
	                    var piePiece = oldData.getItemGraphicEl(oldIdx);

	                    piePiece.updateData(data, newIdx);

	                    piePiece.off('click');
	                    selectedMode && piePiece.on('click', onSectorClick);
	                    group.add(piePiece);
	                    data.setItemGraphicEl(newIdx, piePiece);
	                })
	                .remove(function (idx) {
	                    var piePiece = oldData.getItemGraphicEl(idx);
	                    group.remove(piePiece);
	                })
	                .execute();

	            if (hasAnimation && isFirstRender && data.count() > 0) {
	                var shape = data.getItemLayout(0);
	                var r = Math.max(api.getWidth(), api.getHeight()) / 2;

	                var removeClipPath = zrUtil.bind(group.removeClipPath, group);
	                group.setClipPath(this._createClipPath(
	                    shape.cx, shape.cy, r, shape.startAngle, shape.clockwise, removeClipPath, seriesModel
	                ));
	            }

	            this._data = data;
	        },

	        _createClipPath: function (
	            cx, cy, r, startAngle, clockwise, cb, seriesModel
	        ) {
	            var clipPath = new graphic.Sector({
	                shape: {
	                    cx: cx,
	                    cy: cy,
	                    r0: 0,
	                    r: r,
	                    startAngle: startAngle,
	                    endAngle: startAngle,
	                    clockwise: clockwise
	                }
	            });

	            graphic.initProps(clipPath, {
	                shape: {
	                    endAngle: startAngle + (clockwise ? 1 : -1) * Math.PI * 2
	                }
	            }, seriesModel, cb);

	            return clipPath;
	        }
	    });

	    return Pie;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    var echarts = __webpack_require__(1);
	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    return function (seriesType, actionInfos) {
	        zrUtil.each(actionInfos, function (actionInfo) {
	            actionInfo.update = 'updateView';
	            /**
	             * @payload
	             * @property {string} seriesName
	             * @property {string} name
	             */
	            echarts.registerAction(actionInfo, function (payload, ecModel) {
	                var selected = {};
	                ecModel.eachComponent(
	                    {mainType: 'series', subType: seriesType, query: payload},
	                    function (seriesModel) {
	                        if (seriesModel[actionInfo.method]) {
	                            seriesModel[actionInfo.method](payload.name);
	                        }
	                        var data = seriesModel.getData();
	                        // Create selected map
	                        data.each(function (idx) {
	                            var name = data.getName(idx);
	                            selected[name] = seriesModel.isSelected(name) || false;
	                        });
	                    }
	                );
	                return {
	                    name: payload.name,
	                    selected: selected
	                };
	            });
	        });
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;// Pick color from palette for each data item
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    return function (seriesType, ecModel) {
	        // Pie and funnel may use diferrent scope
	        var paletteScope = {};
	        ecModel.eachRawSeriesByType(seriesType, function (seriesModel) {
	            var dataAll = seriesModel.getRawData();
	            var idxMap = {};
	            if (!ecModel.isSeriesFiltered(seriesModel)) {
	                var data = seriesModel.getData();
	                data.each(function (idx) {
	                    var rawIdx = data.getRawIndex(idx);
	                    idxMap[rawIdx] = idx;
	                });
	                dataAll.each(function (rawIdx) {
	                    // FIXME Performance
	                    var itemModel = dataAll.getItemModel(rawIdx);
	                    var filteredIdx = idxMap[rawIdx];
	                    // If series.itemStyle.normal.color is a function. itemVisual may be encoded
	                    var singleDataColor = data.getItemVisual(filteredIdx, 'color', true);

	                    if (!singleDataColor) {
	                        var color = itemModel.get('itemStyle.normal.color')
	                            || seriesModel.getColorFromPalette(dataAll.getName(rawIdx), paletteScope);
	                        // Legend may use the visual info in data before processed
	                        dataAll.setItemVisual(rawIdx, 'color', color);
	                        data.setItemVisual(filteredIdx, 'color', color);
	                    }
	                    else {
	                        // Set data all color for legend
	                        dataAll.setItemVisual(rawIdx, 'color', singleDataColor);
	                    }
	                });
	            }
	        });
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;// TODO minAngle

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var numberUtil = __webpack_require__(5);
	    var parsePercent = numberUtil.parsePercent;
	    var labelLayout = __webpack_require__(78);
	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    var PI2 = Math.PI * 2;
	    var RADIAN = Math.PI / 180;

	    return function (seriesType, ecModel, api, payload) {
	        ecModel.eachSeriesByType(seriesType, function (seriesModel) {
	            var center = seriesModel.get('center');
	            var radius = seriesModel.get('radius');

	            if (!zrUtil.isArray(radius)) {
	                radius = [0, radius];
	            }
	            if (!zrUtil.isArray(center)) {
	                center = [center, center];
	            }

	            var width = api.getWidth();
	            var height = api.getHeight();
	            var size = Math.min(width, height);
	            var cx = parsePercent(center[0], width);
	            var cy = parsePercent(center[1], height);
	            var r0 = parsePercent(radius[0], size / 2);
	            var r = parsePercent(radius[1], size / 2);

	            var data = seriesModel.getData();

	            var startAngle = -seriesModel.get('startAngle') * RADIAN;

	            var minAngle = seriesModel.get('minAngle') * RADIAN;

	            var sum = data.getSum('value');
	            // Sum may be 0
	            var unitRadian = Math.PI / (sum || data.count()) * 2;

	            var clockwise = seriesModel.get('clockwise');

	            var roseType = seriesModel.get('roseType');

	            // [0...max]
	            var extent = data.getDataExtent('value');
	            extent[0] = 0;

	            // In the case some sector angle is smaller than minAngle
	            var restAngle = PI2;
	            var valueSumLargerThanMinAngle = 0;

	            var currentAngle = startAngle;

	            var dir = clockwise ? 1 : -1;
	            data.each('value', function (value, idx) {
	                var angle;
	                // FIXME 兼容 2.0 但是 roseType 是 area 的时候才是这样？
	                if (roseType !== 'area') {
	                    angle = sum === 0 ? unitRadian : (value * unitRadian);
	                }
	                else {
	                    angle = PI2 / (data.count() || 1);
	                }

	                if (angle < minAngle) {
	                    angle = minAngle;
	                    restAngle -= minAngle;
	                }
	                else {
	                    valueSumLargerThanMinAngle += value;
	                }

	                var endAngle = currentAngle + dir * angle;
	                data.setItemLayout(idx, {
	                    angle: angle,
	                    startAngle: currentAngle,
	                    endAngle: endAngle,
	                    clockwise: clockwise,
	                    cx: cx,
	                    cy: cy,
	                    r0: r0,
	                    r: roseType
	                        ? numberUtil.linearMap(value, extent, [r0, r])
	                        : r
	                });

	                currentAngle = endAngle;
	            }, true);

	            // Some sector is constrained by minAngle
	            // Rest sectors needs recalculate angle
	            if (restAngle < PI2) {
	                // Average the angle if rest angle is not enough after all angles is
	                // Constrained by minAngle
	                if (restAngle <= 1e-3) {
	                    var angle = PI2 / data.count();
	                    data.each(function (idx) {
	                        var layout = data.getItemLayout(idx);
	                        layout.startAngle = startAngle + dir * idx * angle;
	                        layout.endAngle = startAngle + dir * (idx + 1) * angle;
	                    });
	                }
	                else {
	                    unitRadian = restAngle / valueSumLargerThanMinAngle;
	                    currentAngle = startAngle;
	                    data.each('value', function (value, idx) {
	                        var layout = data.getItemLayout(idx);
	                        var angle = layout.angle === minAngle
	                            ? minAngle : value * unitRadian;
	                        layout.startAngle = currentAngle;
	                        layout.endAngle = currentAngle + dir * angle;
	                        currentAngle += angle;
	                    });
	                }
	            }

	            labelLayout(seriesModel, r, width, height);
	        });
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;// FIXME emphasis label position is not same with normal label position
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    'use strict';

	    var textContain = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/contain/text\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    function adjustSingleSide(list, cx, cy, r, dir, viewWidth, viewHeight) {
	        list.sort(function (a, b) {
	            return a.y - b.y;
	        });

	        // 压
	        function shiftDown(start, end, delta, dir) {
	            for (var j = start; j < end; j++) {
	                list[j].y += delta;
	                if (j > start
	                    && j + 1 < end
	                    && list[j + 1].y > list[j].y + list[j].height
	                ) {
	                    shiftUp(j, delta / 2);
	                    return;
	                }
	            }

	            shiftUp(end - 1, delta / 2);
	        }

	        // 弹
	        function shiftUp(end, delta) {
	            for (var j = end; j >= 0; j--) {
	                list[j].y -= delta;
	                if (j > 0
	                    && list[j].y > list[j - 1].y + list[j - 1].height
	                ) {
	                    break;
	                }
	            }
	        }

	        function changeX(list, isDownList, cx, cy, r, dir) {
	            var lastDeltaX = dir > 0
	                ? isDownList                // 右侧
	                    ? Number.MAX_VALUE      // 下
	                    : 0                     // 上
	                : isDownList                // 左侧
	                    ? Number.MAX_VALUE      // 下
	                    : 0;                    // 上

	            for (var i = 0, l = list.length; i < l; i++) {
	                // Not change x for center label
	                if (list[i].position === 'center') {
	                    continue;
	                }
	                var deltaY = Math.abs(list[i].y - cy);
	                var length = list[i].len;
	                var length2 = list[i].len2;
	                var deltaX = (deltaY < r + length)
	                    ? Math.sqrt(
	                          (r + length + length2) * (r + length + length2)
	                          - deltaY * deltaY
	                      )
	                    : Math.abs(list[i].x - cx);
	                if (isDownList && deltaX >= lastDeltaX) {
	                    // 右下，左下
	                    deltaX = lastDeltaX - 10;
	                }
	                if (!isDownList && deltaX <= lastDeltaX) {
	                    // 右上，左上
	                    deltaX = lastDeltaX + 10;
	                }

	                list[i].x = cx + deltaX * dir;
	                lastDeltaX = deltaX;
	            }
	        }

	        var lastY = 0;
	        var delta;
	        var len = list.length;
	        var upList = [];
	        var downList = [];
	        for (var i = 0; i < len; i++) {
	            delta = list[i].y - lastY;
	            if (delta < 0) {
	                shiftDown(i, len, -delta, dir);
	            }
	            lastY = list[i].y + list[i].height;
	        }
	        if (viewHeight - lastY < 0) {
	            shiftUp(len - 1, lastY - viewHeight);
	        }
	        for (var i = 0; i < len; i++) {
	            if (list[i].y >= cy) {
	                downList.push(list[i]);
	            }
	            else {
	                upList.push(list[i]);
	            }
	        }
	        changeX(upList, false, cx, cy, r, dir);
	        changeX(downList, true, cx, cy, r, dir);
	    }

	    function avoidOverlap(labelLayoutList, cx, cy, r, viewWidth, viewHeight) {
	        var leftList = [];
	        var rightList = [];
	        for (var i = 0; i < labelLayoutList.length; i++) {
	            if (labelLayoutList[i].x < cx) {
	                leftList.push(labelLayoutList[i]);
	            }
	            else {
	                rightList.push(labelLayoutList[i]);
	            }
	        }

	        adjustSingleSide(rightList, cx, cy, r, 1, viewWidth, viewHeight);
	        adjustSingleSide(leftList, cx, cy, r, -1, viewWidth, viewHeight);

	        for (var i = 0; i < labelLayoutList.length; i++) {
	            var linePoints = labelLayoutList[i].linePoints;
	            if (linePoints) {
	                var dist = linePoints[1][0] - linePoints[2][0];
	                if (labelLayoutList[i].x < cx) {
	                    linePoints[2][0] = labelLayoutList[i].x + 3;
	                }
	                else {
	                    linePoints[2][0] = labelLayoutList[i].x - 3;
	                }
	                linePoints[1][1] = linePoints[2][1] = labelLayoutList[i].y;
	                linePoints[1][0] = linePoints[2][0] + dist;
	            }
	        }
	    }

	    return function (seriesModel, r, viewWidth, viewHeight) {
	        var data = seriesModel.getData();
	        var labelLayoutList = [];
	        var cx;
	        var cy;
	        var hasLabelRotate = false;

	        data.each(function (idx) {
	            var layout = data.getItemLayout(idx);

	            var itemModel = data.getItemModel(idx);
	            var labelModel = itemModel.getModel('label.normal');
	            // Use position in normal or emphasis
	            var labelPosition = labelModel.get('position') || itemModel.get('label.emphasis.position');

	            var labelLineModel = itemModel.getModel('labelLine.normal');
	            var labelLineLen = labelLineModel.get('length');
	            var labelLineLen2 = labelLineModel.get('length2');

	            var midAngle = (layout.startAngle + layout.endAngle) / 2;
	            var dx = Math.cos(midAngle);
	            var dy = Math.sin(midAngle);

	            var textX;
	            var textY;
	            var linePoints;
	            var textAlign;

	            cx = layout.cx;
	            cy = layout.cy;

	            var isLabelInside = labelPosition === 'inside' || labelPosition === 'inner';
	            if (labelPosition === 'center') {
	                textX = layout.cx;
	                textY = layout.cy;
	                textAlign = 'center';
	            }
	            else {
	                var x1 = (isLabelInside ? (layout.r + layout.r0) / 2 * dx : layout.r * dx) + cx;
	                var y1 = (isLabelInside ? (layout.r + layout.r0) / 2 * dy : layout.r * dy) + cy;

	                textX = x1 + dx * 3;
	                textY = y1 + dy * 3;

	                if (!isLabelInside) {
	                    // For roseType
	                    var x2 = x1 + dx * (labelLineLen + r - layout.r);
	                    var y2 = y1 + dy * (labelLineLen + r - layout.r);
	                    var x3 = x2 + ((dx < 0 ? -1 : 1) * labelLineLen2);
	                    var y3 = y2;

	                    textX = x3 + (dx < 0 ? -5 : 5);
	                    textY = y3;
	                    linePoints = [[x1, y1], [x2, y2], [x3, y3]];
	                }

	                textAlign = isLabelInside ? 'center' : (dx > 0 ? 'left' : 'right');
	            }
	            var font = labelModel.getModel('textStyle').getFont();

	            var labelRotate = labelModel.get('rotate')
	                ? (dx < 0 ? -midAngle + Math.PI : -midAngle) : 0;
	            var text = seriesModel.getFormattedLabel(idx, 'normal')
	                        || data.getName(idx);
	            var textRect = textContain.getBoundingRect(
	                text, font, textAlign, 'top'
	            );
	            hasLabelRotate = !!labelRotate;
	            layout.label = {
	                x: textX,
	                y: textY,
	                position: labelPosition,
	                height: textRect.height,
	                len: labelLineLen,
	                len2: labelLineLen2,
	                linePoints: linePoints,
	                textAlign: textAlign,
	                verticalAlign: 'middle',
	                font: font,
	                rotation: labelRotate
	            };

	            // Not layout the inside label
	            if (!isLabelInside) {
	                labelLayoutList.push(layout.label);
	            }
	        });
	        if (!hasLabelRotate && seriesModel.get('avoidLabelOverlap')) {
	            avoidOverlap(labelLayoutList, cx, cy, r, viewWidth, viewHeight);
	        }
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    return function (seriesType, ecModel) {
	        var legendModels = ecModel.findComponents({
	            mainType: 'legend'
	        });
	        if (!legendModels || !legendModels.length) {
	            return;
	        }
	        ecModel.eachSeriesByType(seriesType, function (series) {
	            var data = series.getData();
	            data.filterSelf(function (idx) {
	                var name = data.getName(idx);
	                // If in any legend component the status is not selected.
	                for (var i = 0; i < legendModels.length; i++) {
	                    if (!legendModels[i].isSelected(name)) {
	                        return false;
	                    }
	                }
	                return true;
	            }, this);
	        }, this);
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }
/******/ ])
});
;