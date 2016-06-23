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
	__webpack_require__(80);
	__webpack_require__(210);
	__webpack_require__(204);

	__webpack_require__(45);
	__webpack_require__(228);

	__webpack_require__(259);
	__webpack_require__(265);
	__webpack_require__(268);
	__webpack_require__(229);
	__webpack_require__(280);

	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/lib/vml/vml\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

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

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var echarts = __webpack_require__(1);

	    __webpack_require__(81);
	    __webpack_require__(82);

	    echarts.registerVisual(zrUtil.curry(
	        __webpack_require__(42), 'scatter', 'circle', null
	    ));
	    echarts.registerLayout(zrUtil.curry(
	        __webpack_require__(43), 'scatter'
	    ));

	    // In case developer forget to include grid component
	    __webpack_require__(45);
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    'use strict';

	    var createListFromArray = __webpack_require__(34);
	    var SeriesModel = __webpack_require__(22);

	    return SeriesModel.extend({

	        type: 'series.scatter',

	        dependencies: ['grid', 'polar'],

	        getInitialData: function (option, ecModel) {
	            var list = createListFromArray(option.data, this, ecModel);
	            return list;
	        },

	        brushSelector: 'point',

	        defaultOption: {
	            coordinateSystem: 'cartesian2d',
	            zlevel: 0,
	            z: 2,
	            legendHoverLink: true,

	            hoverAnimation: true,
	            // Cartesian coordinate system
	            xAxisIndex: 0,
	            yAxisIndex: 0,

	            // Polar coordinate system
	            polarIndex: 0,

	            // Geo coordinate system
	            geoIndex: 0,

	            // symbol: null,        // 图形类型
	            symbolSize: 10,          // 图形大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
	            // symbolRotate: null,  // 图形旋转控制

	            large: false,
	            // Available when large is true
	            largeThreshold: 2000,

	            // label: {
	                // normal: {
	                    // show: false
	                    // distance: 5,
	                    // formatter: 标签文本格式器，同Tooltip.formatter，不支持异步回调
	                    // position: 默认自适应，水平布局为'top'，垂直布局为'right'，可选为
	                    //           'inside'|'left'|'right'|'top'|'bottom'
	                    // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
	            //     }
	            // },
	            itemStyle: {
	                normal: {
	                    opacity: 0.8
	                    // color: 各异
	                }
	            }
	        }

	    });
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var SymbolDraw = __webpack_require__(37);
	    var LargeSymbolDraw = __webpack_require__(83);

	    __webpack_require__(1).extendChartView({

	        type: 'scatter',

	        init: function () {
	            this._normalSymbolDraw = new SymbolDraw();
	            this._largeSymbolDraw = new LargeSymbolDraw();
	        },

	        render: function (seriesModel, ecModel, api) {
	            var data = seriesModel.getData();
	            var largeSymbolDraw = this._largeSymbolDraw;
	            var normalSymbolDraw = this._normalSymbolDraw;
	            var group = this.group;

	            var symbolDraw = seriesModel.get('large') && data.count() > seriesModel.get('largeThreshold')
	                ? largeSymbolDraw : normalSymbolDraw;

	            this._symbolDraw = symbolDraw;
	            symbolDraw.updateData(data);
	            group.add(symbolDraw.group);

	            group.remove(
	                symbolDraw === largeSymbolDraw
	                ? normalSymbolDraw.group : largeSymbolDraw.group
	            );
	        },

	        updateLayout: function (seriesModel) {
	            this._symbolDraw.updateLayout(seriesModel);
	        },

	        remove: function (ecModel, api) {
	            this._symbolDraw && this._symbolDraw.remove(api, true);
	        }
	    });
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;// TODO Batch by color

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var graphic = __webpack_require__(25);
	    var symbolUtil = __webpack_require__(39);

	    var LargeSymbolPath = graphic.extendShape({
	        shape: {
	            points: null,
	            sizes: null
	        },

	        symbolProxy: null,

	        buildPath: function (path, shape) {
	            var points = shape.points;
	            var sizes = shape.sizes;

	            var symbolProxy = this.symbolProxy;
	            var symbolProxyShape = symbolProxy.shape;
	            for (var i = 0; i < points.length; i++) {
	                var pt = points[i];
	                var size = sizes[i];
	                if (size[0] < 4) {
	                    // Optimize for small symbol
	                    path.rect(
	                        pt[0] - size[0] / 2, pt[1] - size[1] / 2,
	                        size[0], size[1]
	                    );
	                }
	                else {
	                    symbolProxyShape.x = pt[0] - size[0] / 2;
	                    symbolProxyShape.y = pt[1] - size[1] / 2;
	                    symbolProxyShape.width = size[0];
	                    symbolProxyShape.height = size[1];

	                    symbolProxy.buildPath(path, symbolProxyShape, true);
	                }
	            }
	        },

	        findDataIndex: function (x, y) {
	            var shape = this.shape;
	            var points = shape.points;
	            var sizes = shape.sizes;

	            // Not consider transform
	            // Treat each element as a rect
	            // top down traverse
	            for (var i = points.length - 1; i >= 0; i--) {
	                var pt = points[i];
	                var size = sizes[i];
	                var x0 = pt[0] - size[0] / 2;
	                var y0 = pt[1] - size[1] / 2;
	                if (x >= x0 && y >= y0 && x <= x0 + size[0] && y <= y0 + size[1]) {
	                    // i is dataIndex
	                    return i;
	                }
	            }

	            return -1;
	        }
	    });

	    function LargeSymbolDraw() {
	        this.group = new graphic.Group();

	        this._symbolEl = new LargeSymbolPath({
	            // rectHover: true,
	            // cursor: 'default'
	        });
	    }

	    var largeSymbolProto = LargeSymbolDraw.prototype;

	    /**
	     * Update symbols draw by new data
	     * @param {module:echarts/data/List} data
	     */
	    largeSymbolProto.updateData = function (data) {
	        this.group.removeAll();

	        var symbolEl = this._symbolEl;

	        var seriesModel = data.hostModel;

	        symbolEl.setShape({
	            points: data.mapArray(data.getItemLayout),
	            sizes: data.mapArray(
	                function (idx) {
	                    var size = data.getItemVisual(idx, 'symbolSize');
	                    if (!(size instanceof Array)) {
	                        size = [size, size];
	                    }
	                    return size;
	                }
	            )
	        });

	        // Create symbolProxy to build path for each data
	        symbolEl.symbolProxy = symbolUtil.createSymbol(
	            data.getVisual('symbol'), 0, 0, 0, 0
	        );
	        // Use symbolProxy setColor method
	        symbolEl.setColor = symbolEl.symbolProxy.setColor;

	        symbolEl.useStyle(
	            seriesModel.getModel('itemStyle.normal').getItemStyle(['color'])
	        );

	        var visualColor = data.getVisual('color');
	        if (visualColor) {
	            symbolEl.setColor(visualColor);
	        }

	        // Enable tooltip
	        // PENDING May have performance issue when path is extremely large
	        symbolEl.seriesIndex = seriesModel.seriesIndex;
	        symbolEl.on('mousemove', function (e) {
	            symbolEl.dataIndex = null;
	            var dataIndex = symbolEl.findDataIndex(e.offsetX, e.offsetY);
	            if (dataIndex > 0) {
	                // Provide dataIndex for tooltip
	                symbolEl.dataIndex = dataIndex;
	            }
	        });

	        // Add back
	        this.group.add(symbolEl);
	    };

	    largeSymbolProto.updateLayout = function (seriesModel) {
	        var data = seriesModel.getData();
	        this._symbolEl.setShape({
	            points: data.mapArray(data.getItemLayout)
	        });
	    };

	    largeSymbolProto.remove = function () {
	        this.group.removeAll();
	    };

	    return LargeSymbolDraw;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @module echarts/component/helper/RoamController
	 */

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var Eventful = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/mixin/Eventful\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var eventTool = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/event\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var interactionMutex = __webpack_require__(107);

	    function mousedown(e) {
	        if (e.target && e.target.draggable) {
	            return;
	        }

	        var x = e.offsetX;
	        var y = e.offsetY;
	        var rect = this.rectProvider && this.rectProvider();
	        if (rect && rect.contain(x, y)) {
	            this._x = x;
	            this._y = y;
	            this._dragging = true;
	        }
	    }

	    function mousemove(e) {
	        if (!this._dragging) {
	            return;
	        }

	        eventTool.stop(e.event);

	        if (e.gestureEvent !== 'pinch') {

	            if (interactionMutex.isTaken(this._zr, 'globalPan')) {
	                return;
	            }

	            var x = e.offsetX;
	            var y = e.offsetY;

	            var dx = x - this._x;
	            var dy = y - this._y;

	            this._x = x;
	            this._y = y;

	            var target = this.target;

	            if (target) {
	                var pos = target.position;
	                pos[0] += dx;
	                pos[1] += dy;
	                target.dirty();
	            }

	            eventTool.stop(e.event);
	            this.trigger('pan', dx, dy);
	        }
	    }

	    function mouseup(e) {
	        this._dragging = false;
	    }

	    function mousewheel(e) {
	        // Convenience:
	        // Mac and VM Windows on Mac: scroll up: zoom out.
	        // Windows: scroll up: zoom in.
	        var zoomDelta = e.wheelDelta > 0 ? 1.1 : 1 / 1.1;
	        zoom.call(this, e, zoomDelta, e.offsetX, e.offsetY);
	    }

	    function pinch(e) {
	        if (interactionMutex.isTaken(this._zr, 'globalPan')) {
	            return;
	        }
	        var zoomDelta = e.pinchScale > 1 ? 1.1 : 1 / 1.1;
	        zoom.call(this, e, zoomDelta, e.pinchX, e.pinchY);
	    }

	    function zoom(e, zoomDelta, zoomX, zoomY) {
	        var rect = this.rectProvider && this.rectProvider();

	        if (rect && rect.contain(zoomX, zoomY)) {
	            // When mouse is out of roamController rect,
	            // default befavoius should be be disabled, otherwise
	            // page sliding is disabled, contrary to expectation.
	            eventTool.stop(e.event);

	            var target = this.target;
	            var zoomLimit = this.zoomLimit;

	            if (target) {
	                var pos = target.position;
	                var scale = target.scale;

	                var newZoom = this.zoom = this.zoom || 1;
	                newZoom *= zoomDelta;
	                if (zoomLimit) {
	                    var zoomMin = zoomLimit.min || 0;
	                    var zoomMax = zoomLimit.max || Infinity;
	                    newZoom = Math.max(
	                        Math.min(zoomMax, newZoom),
	                        zoomMin
	                    );
	                }
	                var zoomScale = newZoom / this.zoom;
	                this.zoom = newZoom;
	                // Keep the mouse center when scaling
	                pos[0] -= (zoomX - pos[0]) * (zoomScale - 1);
	                pos[1] -= (zoomY - pos[1]) * (zoomScale - 1);
	                scale[0] *= zoomScale;
	                scale[1] *= zoomScale;

	                target.dirty();
	            }

	            this.trigger('zoom', zoomDelta, zoomX, zoomY);
	        }
	    }

	    /**
	     * @alias module:echarts/component/helper/RoamController
	     * @constructor
	     * @mixin {module:zrender/mixin/Eventful}
	     *
	     * @param {module:zrender/zrender~ZRender} zr
	     * @param {module:zrender/Element} target
	     * @param {Function} [rectProvider]
	     */
	    function RoamController(zr, target, rectProvider) {

	        /**
	         * @type {module:zrender/Element}
	         */
	        this.target = target;

	        /**
	         * @type {Function}
	         */
	        this.rectProvider = rectProvider;

	        /**
	         * { min: 1, max: 2 }
	         * @type {Object}
	         */
	        this.zoomLimit;

	        /**
	         * @type {number}
	         */
	        this.zoom;
	        /**
	         * @type {module:zrender}
	         */
	        this._zr = zr;

	        // Avoid two roamController bind the same handler
	        var bind = zrUtil.bind;
	        var mousedownHandler = bind(mousedown, this);
	        var mousemoveHandler = bind(mousemove, this);
	        var mouseupHandler = bind(mouseup, this);
	        var mousewheelHandler = bind(mousewheel, this);
	        var pinchHandler = bind(pinch, this);

	        Eventful.call(this);

	        /**
	         * Notice: only enable needed types. For example, if 'zoom'
	         * is not needed, 'zoom' should not be enabled, otherwise
	         * default mousewheel behaviour (scroll page) will be disabled.
	         *
	         * @param  {boolean|string} [controlType=true] Specify the control type,
	         *                          which can be null/undefined or true/false
	         *                          or 'pan/move' or 'zoom'/'scale'
	         */
	        this.enable = function (controlType) {
	            // Disable previous first
	            this.disable();

	            if (controlType == null) {
	                controlType = true;
	            }

	            if (controlType === true || (controlType === 'move' || controlType === 'pan')) {
	                zr.on('mousedown', mousedownHandler);
	                zr.on('mousemove', mousemoveHandler);
	                zr.on('mouseup', mouseupHandler);
	            }
	            if (controlType === true || (controlType === 'scale' || controlType === 'zoom')) {
	                zr.on('mousewheel', mousewheelHandler);
	                zr.on('pinch', pinchHandler);
	            }
	        };

	        this.disable = function () {
	            zr.off('mousedown', mousedownHandler);
	            zr.off('mousemove', mousemoveHandler);
	            zr.off('mouseup', mouseupHandler);
	            zr.off('mousewheel', mousewheelHandler);
	            zr.off('pinch', pinchHandler);
	        };

	        this.dispose = this.disable;

	        this.isDragging = function () {
	            return this._dragging;
	        };

	        this.isPinching = function () {
	            return this._pinching;
	        };
	    }

	    zrUtil.mixin(RoamController, Eventful);

	    return RoamController;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var ATTR = '\0_ec_interaction_mutex';

	    var interactionMutex = {

	        take: function (zr, resourceKey, userKey, onTakeAway) {
	            var store = getStore(zr);
	            var record = store[resourceKey];

	            record && record.onTakeAway && record.onTakeAway();

	            store[resourceKey] = {
	                userKey: userKey,
	                onTakeAway: onTakeAway
	            };
	        },

	        release: function (zr, resourceKey, userKey) {
	            var store = getStore(zr);
	            var record = store[resourceKey];

	            if (record && record.userKey === userKey) {
	                store[resourceKey] = null;
	            }
	        },

	        isTaken: function (zr, resourceKey) {
	            return !!getStore(zr)[resourceKey];
	        }
	    };

	    function getStore(zr) {
	        return zr[ATTR] || (zr[ATTR] = {});
	    }

	    return interactionMutex;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @module echarts/chart/helper/LineDraw
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var graphic = __webpack_require__(25);
	    var LineGroup = __webpack_require__(132);


	    function isPointNaN(pt) {
	        return isNaN(pt[0]) || isNaN(pt[1]);
	    }
	    function lineNeedsDraw(pts) {
	        return !isPointNaN(pts[0]) && !isPointNaN(pts[1]);
	    }
	    /**
	     * @alias module:echarts/component/marker/LineDraw
	     * @constructor
	     */
	    function LineDraw(ctor) {
	        this._ctor = ctor || LineGroup;
	        this.group = new graphic.Group();
	    }

	    var lineDrawProto = LineDraw.prototype;

	    /**
	     * @param {module:echarts/data/List} lineData
	     */
	    lineDrawProto.updateData = function (lineData) {

	        var oldLineData = this._lineData;
	        var group = this.group;
	        var LineCtor = this._ctor;

	        var hostModel = lineData.hostModel;

	        var seriesScope = {
	            lineStyle: hostModel.getModel('lineStyle.normal').getLineStyle(),
	            hoverLineStyle: hostModel.getModel('lineStyle.emphasis').getLineStyle(),
	            labelModel: hostModel.getModel('label.normal'),
	            hoverLabelModel: hostModel.getModel('label.emphasis')
	        };

	        lineData.diff(oldLineData)
	            .add(function (idx) {
	                if (!lineNeedsDraw(lineData.getItemLayout(idx))) {
	                    return;
	                }
	                var lineGroup = new LineCtor(lineData, idx, seriesScope);

	                lineData.setItemGraphicEl(idx, lineGroup);

	                group.add(lineGroup);
	            })
	            .update(function (newIdx, oldIdx) {
	                var lineGroup = oldLineData.getItemGraphicEl(oldIdx);
	                if (!lineNeedsDraw(lineData.getItemLayout(newIdx))) {
	                    group.remove(lineGroup);
	                    return;
	                }

	                if (!lineGroup) {
	                    lineGroup = new LineCtor(lineData, newIdx, seriesScope);
	                }
	                else {
	                    lineGroup.updateData(lineData, newIdx, seriesScope);
	                }

	                lineData.setItemGraphicEl(newIdx, lineGroup);

	                group.add(lineGroup);
	            })
	            .remove(function (idx) {
	                group.remove(oldLineData.getItemGraphicEl(idx));
	            })
	            .execute();

	        this._lineData = lineData;
	    };

	    lineDrawProto.updateLayout = function () {
	        var lineData = this._lineData;
	        lineData.eachItemGraphicEl(function (el, idx) {
	            el.updateLayout(lineData, idx);
	        }, this);
	    };

	    lineDrawProto.remove = function () {
	        this.group.removeAll();
	    };

	    return LineDraw;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @module echarts/chart/helper/Line
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var symbolUtil = __webpack_require__(39);
	    var vector = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/vector\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    // var matrix = require('zrender/core/matrix');
	    var LinePath = __webpack_require__(133);
	    var graphic = __webpack_require__(25);
	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var numberUtil = __webpack_require__(5);

	    var SYMBOL_CATEGORIES = ['fromSymbol', 'toSymbol'];
	    function makeSymbolTypeKey(symbolCategory) {
	        return '_' + symbolCategory + 'Type';
	    }
	    /**
	     * @inner
	     */
	    function createSymbol(name, lineData, idx) {
	        var color = lineData.getItemVisual(idx, 'color');
	        var symbolType = lineData.getItemVisual(idx, name);
	        var symbolSize = lineData.getItemVisual(idx, name + 'Size');

	        if (!symbolType || symbolType === 'none') {
	            return;
	        }

	        if (!zrUtil.isArray(symbolSize)) {
	            symbolSize = [symbolSize, symbolSize];
	        }
	        var symbolPath = symbolUtil.createSymbol(
	            symbolType, -symbolSize[0] / 2, -symbolSize[1] / 2,
	            symbolSize[0], symbolSize[1], color
	        );
	        symbolPath.name = name;

	        return symbolPath;
	    }

	    function createLine(points) {
	        var line = new LinePath({
	            name: 'line'
	        });
	        setLinePoints(line.shape, points);
	        return line;
	    }

	    function setLinePoints(targetShape, points) {
	        var p1 = points[0];
	        var p2 = points[1];
	        var cp1 = points[2];
	        targetShape.x1 = p1[0];
	        targetShape.y1 = p1[1];
	        targetShape.x2 = p2[0];
	        targetShape.y2 = p2[1];
	        targetShape.percent = 1;

	        if (cp1) {
	            targetShape.cpx1 = cp1[0];
	            targetShape.cpy1 = cp1[1];
	        }
	    }

	    function updateSymbolAndLabelBeforeLineUpdate () {
	        var lineGroup = this;
	        var symbolFrom = lineGroup.childOfName('fromSymbol');
	        var symbolTo = lineGroup.childOfName('toSymbol');
	        var label = lineGroup.childOfName('label');
	        // Quick reject
	        if (!symbolFrom && !symbolTo && label.ignore) {
	            return;
	        }

	        var invScale = 1;
	        var parentNode = this.parent;
	        while (parentNode) {
	            if (parentNode.scale) {
	                invScale /= parentNode.scale[0];
	            }
	            parentNode = parentNode.parent;
	        }

	        var line = lineGroup.childOfName('line');
	        // If line not changed
	        // FIXME Parent scale changed
	        if (!this.__dirty && !line.__dirty) {
	            return;
	        }

	        var percent = line.shape.percent;
	        var fromPos = line.pointAt(0);
	        var toPos = line.pointAt(percent);

	        var d = vector.sub([], toPos, fromPos);
	        vector.normalize(d, d);

	        if (symbolFrom) {
	            symbolFrom.attr('position', fromPos);
	            var tangent = line.tangentAt(0);
	            symbolFrom.attr('rotation', Math.PI / 2 - Math.atan2(
	                tangent[1], tangent[0]
	            ));
	            symbolFrom.attr('scale', [invScale * percent, invScale * percent]);
	        }
	        if (symbolTo) {
	            symbolTo.attr('position', toPos);
	            var tangent = line.tangentAt(1);
	            symbolTo.attr('rotation', -Math.PI / 2 - Math.atan2(
	                tangent[1], tangent[0]
	            ));
	            symbolTo.attr('scale', [invScale * percent, invScale * percent]);
	        }

	        if (!label.ignore) {
	            label.attr('position', toPos);

	            var textPosition;
	            var textAlign;
	            var textVerticalAlign;

	            var distance = 5 * invScale;
	            // End
	            if (label.__position === 'end') {
	                textPosition = [d[0] * distance + toPos[0], d[1] * distance + toPos[1]];
	                textAlign = d[0] > 0.8 ? 'left' : (d[0] < -0.8 ? 'right' : 'center');
	                textVerticalAlign = d[1] > 0.8 ? 'top' : (d[1] < -0.8 ? 'bottom' : 'middle');
	            }
	            // Middle
	            else if (label.__position === 'middle') {
	                var halfPercent = percent / 2;
	                var tangent = line.tangentAt(halfPercent);
	                var n = [tangent[1], -tangent[0]];
	                var cp = line.pointAt(halfPercent);
	                if (n[1] > 0) {
	                    n[0] = -n[0];
	                    n[1] = -n[1];
	                }
	                textPosition = [cp[0] + n[0] * distance, cp[1] + n[1] * distance];
	                textAlign = 'center';
	                textVerticalAlign = 'bottom';
	                var rotation = -Math.atan2(tangent[1], tangent[0]);
	                if (toPos[0] < fromPos[0]) {
	                    rotation = Math.PI + rotation;
	                }
	                label.attr('rotation', rotation);
	            }
	            // Start
	            else {
	                textPosition = [-d[0] * distance + fromPos[0], -d[1] * distance + fromPos[1]];
	                textAlign = d[0] > 0.8 ? 'right' : (d[0] < -0.8 ? 'left' : 'center');
	                textVerticalAlign = d[1] > 0.8 ? 'bottom' : (d[1] < -0.8 ? 'top' : 'middle');
	            }
	            label.attr({
	                style: {
	                    // Use the user specified text align and baseline first
	                    textVerticalAlign: label.__verticalAlign || textVerticalAlign,
	                    textAlign: label.__textAlign || textAlign
	                },
	                position: textPosition,
	                scale: [invScale, invScale]
	            });
	        }
	    }

	    /**
	     * @constructor
	     * @extends {module:zrender/graphic/Group}
	     * @alias {module:echarts/chart/helper/Line}
	     */
	    function Line(lineData, idx, seriesScope) {
	        graphic.Group.call(this);

	        this._createLine(lineData, idx, seriesScope);
	    }

	    var lineProto = Line.prototype;

	    // Update symbol position and rotation
	    lineProto.beforeUpdate = updateSymbolAndLabelBeforeLineUpdate;

	    lineProto._createLine = function (lineData, idx, seriesScope) {
	        var seriesModel = lineData.hostModel;
	        var linePoints = lineData.getItemLayout(idx);

	        var line = createLine(linePoints);
	        line.shape.percent = 0;
	        graphic.initProps(line, {
	            shape: {
	                percent: 1
	            }
	        }, seriesModel, idx);

	        this.add(line);

	        var label = new graphic.Text({
	            name: 'label'
	        });
	        this.add(label);

	        zrUtil.each(SYMBOL_CATEGORIES, function (symbolCategory) {
	            var symbol = createSymbol(symbolCategory, lineData, idx);
	            // symbols must added after line to make sure
	            // it will be updated after line#update.
	            // Or symbol position and rotation update in line#beforeUpdate will be one frame slow
	            this.add(symbol);
	            this[makeSymbolTypeKey(symbolCategory)] = lineData.getItemVisual(idx, symbolCategory);
	        }, this);

	        this._updateCommonStl(lineData, idx, seriesScope);
	    };

	    lineProto.updateData = function (lineData, idx, seriesScope) {
	        var seriesModel = lineData.hostModel;

	        var line = this.childOfName('line');
	        var linePoints = lineData.getItemLayout(idx);
	        var target = {
	            shape: {}
	        };
	        setLinePoints(target.shape, linePoints);
	        graphic.updateProps(line, target, seriesModel, idx);

	        zrUtil.each(SYMBOL_CATEGORIES, function (symbolCategory) {
	            var symbolType = lineData.getItemVisual(idx, symbolCategory);
	            var key = makeSymbolTypeKey(symbolCategory);
	            // Symbol changed
	            if (this[key] !== symbolType) {
	                this.remove(this.childOfName(symbolCategory));
	                var symbol = createSymbol(symbolCategory, lineData, idx);
	                this.add(symbol);
	            }
	            this[key] = symbolType;
	        }, this);

	        this._updateCommonStl(lineData, idx, seriesScope);
	    };

	    lineProto._updateCommonStl = function (lineData, idx, seriesScope) {
	        var seriesModel = lineData.hostModel;

	        var line = this.childOfName('line');

	        var lineStyle = seriesScope && seriesScope.lineStyle;
	        var hoverLineStyle = seriesScope && seriesScope.hoverLineStyle;
	        var labelModel = seriesScope && seriesScope.labelModel;
	        var hoverLabelModel = seriesScope && seriesScope.hoverLabelModel;

	        // Optimization for large dataset
	        if (!seriesScope || lineData.hasItemOption) {
	            var itemModel = lineData.getItemModel(idx);

	            lineStyle = itemModel.getModel('lineStyle.normal').getLineStyle();
	            hoverLineStyle = itemModel.getModel('lineStyle.emphasis').getLineStyle();

	            labelModel = itemModel.getModel('label.normal');
	            hoverLabelModel = itemModel.getModel('label.emphasis');
	        }

	        var visualColor = lineData.getItemVisual(idx, 'color');
	        if (isNaN(defaultText)) {
	            // Use name
	            defaultText = lineData.getName(idx);
	        }
	        line.useStyle(zrUtil.defaults(
	            {
	                strokeNoScale: true,
	                fill: 'none',
	                stroke: visualColor
	            },
	            lineStyle
	        ));
	        line.hoverStyle = hoverLineStyle;

	        var showLabel = labelModel.getShallow('show');
	        var hoverShowLabel = hoverLabelModel.getShallow('show');
	        var defaultText;
	        var label = this.childOfName('label');
	        var defaultLabelColor;
	        if (showLabel || hoverShowLabel) {
	            defaultText = numberUtil.round(seriesModel.getRawValue(idx));
	            defaultLabelColor = visualColor || '#000';
	        }
	        // label.afterUpdate = lineAfterUpdate;
	        if (showLabel) {
	            var textStyleModel = labelModel.getModel('textStyle');
	            label.setStyle({
	                text: zrUtil.retrieve(
	                        seriesModel.getFormattedLabel(idx, 'normal', lineData.dataType),
	                        defaultText
	                    ),
	                textFont: textStyleModel.getFont(),
	                fill: textStyleModel.getTextColor() || defaultLabelColor
	            });

	            label.__textAlign = textStyleModel.get('align');
	            label.__verticalAlign = textStyleModel.get('baseline');
	            label.__position = labelModel.get('position');
	        }
	        else {
	            label.setStyle('text', '');
	        }
	        if (hoverShowLabel) {
	            var textStyleHoverModel = hoverLabelModel.getModel('textStyle');

	            label.hoverStyle = {
	                text: zrUtil.retrieve(
	                        seriesModel.getFormattedLabel(idx, 'emphasis', lineData.dataType),
	                        defaultText
	                    ),
	                textFont: textStyleHoverModel.getFont(),
	                fill: textStyleHoverModel.getTextColor() || defaultLabelColor
	            };
	        }
	        else {
	            label.hoverStyle = {
	                text: ''
	            };
	        }

	        label.ignore = !showLabel && !hoverShowLabel;

	        graphic.setHoverStyle(this);
	    };

	    lineProto.updateLayout = function (lineData, idx) {
	        this.setLinePoints(lineData.getItemLayout(idx));
	    };

	    lineProto.setLinePoints = function (points) {
	        var linePath = this.childOfName('line');
	        setLinePoints(linePath.shape, points);
	        linePath.dirty();
	    };

	    zrUtil.inherits(Line, graphic.Group);

	    return Line;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Line path for bezier and straight line draw
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    var graphic = __webpack_require__(25);
	    var vec2 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/vector\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    var straightLineProto = graphic.Line.prototype;
	    var bezierCurveProto = graphic.BezierCurve.prototype;

	    function isLine(shape) {
	        return shape.cpx1 == null || shape.cpy1 == null;
	    }

	    return graphic.extendShape({

	        type: 'ec-line',

	        style: {
	            stroke: '#000',
	            fill: null
	        },

	        shape: {
	            x1: 0,
	            y1: 0,
	            x2: 0,
	            y2: 0,
	            percent: 1,
	            cpx1: null,
	            cpy1: null
	        },

	        buildPath: function (ctx, shape) {
	            (isLine(shape) ? straightLineProto : bezierCurveProto).buildPath(ctx, shape);
	        },

	        pointAt: function (t) {
	            return isLine(this.shape)
	                ? straightLineProto.pointAt.call(this, t)
	                : bezierCurveProto.pointAt.call(this, t);
	        },

	        tangentAt: function (t) {
	            var shape = this.shape;
	            var p = isLine(shape)
	                ? [shape.x2 - shape.x1, shape.y2 - shape.y1]
	                : bezierCurveProto.tangentAt.call(this, t);
	            return vec2.normalize(p, p);
	        }
	    });
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Box selection tool.
	 *
	 * @module echarts/component/helper/BrushController
	 */

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var Eventful = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/mixin/Eventful\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var graphic = __webpack_require__(25);
	    var interactionMutex = __webpack_require__(107);
	    var DataDiffer = __webpack_require__(31);

	    var curry = zrUtil.curry;
	    var each = zrUtil.each;
	    var map = zrUtil.map;
	    var mathMin = Math.min;
	    var mathMax = Math.max;
	    var mathPow = Math.pow;

	    var COVER_Z = 10000;
	    var UNSELECT_THRESHOLD = 6;
	    var MIN_RESIZE_LINE_WIDTH = 6;
	    var MUTEX_RESOURCE_KEY = 'globalPan';

	    var DIRECTION_MAP = {
	        w: [0, 0],
	        e: [0, 1],
	        n: [1, 0],
	        s: [1, 1]
	    };
	    var CURSOR_MAP = {
	        w: 'ew',
	        e: 'ew',
	        n: 'ns',
	        s: 'ns',
	        ne: 'nesw',
	        sw: 'nesw',
	        nw: 'nwse',
	        se: 'nwse'
	    };
	    var DEFAULT_BRUSH_OPT = {
	        brushStyle: {
	            lineWidth: 2,
	            stroke: 'rgba(0,0,0,0.3)',
	            fill: 'rgba(0,0,0,0.15)'
	        },
	        transformable: true,
	        brushMode: 'single',
	        removeOnClick: false
	    };

	    var baseUID = 0;

	    /**
	     * @alias module:echarts/component/helper/BrushController
	     * @constructor
	     * @mixin {module:zrender/mixin/Eventful}
	     * @event module:echarts/component/helper/BrushController#brush
	     *        params:
	     *            brushRanges: Array.<Array>, coord relates to container group,
	     *                                    If no container specified, to global.
	     *            opt {
	     *                isEnd: boolean,
	     *                removeOnClick: boolean
	     *            }
	     *
	     * @param {module:zrender/zrender~ZRender} zr
	     */
	    function BrushController(zr) {

	        if (true) {
	            zrUtil.assert(zr);
	        }

	        Eventful.call(this);

	        /**
	         * @type {module:zrender/zrender~ZRender}
	         * @private
	         */
	        this._zr = zr;

	        /**
	         * @type {module:zrender/container/Group}
	         * @readOnly
	         */
	        this.group = new graphic.Group();

	        /**
	         * Only for drawing (after enabledBrush).
	         * @private
	         * @type {string}
	         */
	        this._brushType;

	        /**
	         * Only for drawing (after enabledBrush).
	         * @private
	         * @type {Object}
	         */
	        this._brushOption;

	        /**
	         * @private
	         * @type {Object}
	         */
	        this._panels;

	        /**
	         * @private
	         * @type {module:zrender/mixin/Transformable}
	         */
	        this._container;

	        /**
	         * @private
	         * @type {Array.<nubmer>}
	         */
	        this._track = [];

	        /**
	         * @private
	         * @type {boolean}
	         */
	        this._dragging;

	        /**
	         * @private
	         * @type {Array}
	         */
	        this._covers = [];

	        /**
	         * @private
	         * @type {moudule:zrender/container/Group}
	         */
	        this._creatingCover;

	        // FIXME
	        this._useGlobalCursor;

	        /**
	         * @private
	         * @type {boolean}
	         */
	        if (true) {
	            this._mounted;
	        }

	        /**
	         * @private
	         * @type {string}
	         */
	        this._uid = 'brushController_' + baseUID++;

	        /**
	         * @private
	         * @type {Object}
	         */
	        this._handlers = {};
	        each(mouseHandlers, function (handler, eventName) {
	            this._handlers[eventName] = zrUtil.bind(handler, this);
	        }, this);
	    }

	    BrushController.prototype = {

	        constructor: BrushController,

	        /**
	         * If set to null/undefined/false, select disabled.
	         * @param {Object} brushOption
	         * @param {string|boolean} brushOption.brushType 'line', 'rect', 'polygon' or false
	         *                          If pass false/null/undefined, disable brush.
	         * @param {number} [brushOption.brushMode='single'] 'single' or 'multiple'
	         * @param {boolean} [brushOption.transformable=true]
	         * @param {boolean} [brushOption.removeOnClick=false]
	         * @param {boolean} [brushOption.onRelease]
	         * @param {Object} [brushOption.brushStyle]
	         * @param {number} [brushOption.brushStyle.width]
	         * @param {number} [brushOption.brushStyle.lineWidth]
	         * @param {string} [brushOption.brushStyle.stroke]
	         * @param {string} [brushOption.brushStyle.fill]
	         */
	        enableBrush: function (brushOption) {
	            if (true) {
	                zrUtil.assert(this._mounted);
	            }

	            this._brushType && doDisableBrush(this);
	            brushOption.brushType && doEnableBrush(this, brushOption);

	            return this;
	        },

	        /**
	         * @param {Array.<Object>} panelOpts If not pass, it is global brush.
	         *        Each items: {panelId, points}
	         */
	        setPanels: function (panelOpts) {
	            var oldPanels = this._panels || {};
	            var newPanels = this._panels = panelOpts && panelOpts.length && {};
	            var thisGroup = this.group;

	            newPanels && each(panelOpts, function (panelOpt) {
	                var panelId = panelOpt.panelId;
	                var panel = oldPanels[panelId];
	                if (!panel) {
	                    panel = new graphic.Polygon({
	                        // FIXME
	                        // 这样靠谱么？
	                        silent: true,
	                        invisible: true,
	                        style: {
	                            // fill: 'rgba(0,0,0,0)'
	                        },
	                        cursor: 'crosshair'
	                    });
	                    // FIXME
	                    // cursor
	                    // boundingRect will change when dragging, so we have
	                    // to keep initial boundingRect.
	                    thisGroup.add(panel);
	                }
	                // FIXME
	                // only support rect panel now.
	                panel.attr('shape', {points: panelOpt.points});
	                panel.__brushPanelId = panelId;
	                newPanels[panelId] = panel;
	                oldPanels[panelId] = null;
	            });

	            each(oldPanels, function (panel) {
	                panel && thisGroup.remove(panel);
	            });

	            return this;
	        },

	        /**
	         * @param {Object} opt
	         * @param {module:zrender/mixin/Transformable} [opt.container]
	         * @param {boolean} [opt.localCoord=false] Whether input and output with global coord,
	         *                                          ohterwise coord is according to panel.
	         */
	        mount: function (opt) {
	            opt = opt || {};

	            if (true) {
	                this._mounted = true; // should be at first.
	            }

	            var container = opt.container;

	            // FIXME
	            this._useGlobalCursor = !container;

	            // Reset container.
	            if (!this._container || container !== this._container) {
	                unmountContainer(this);

	                if (!container) {
	                    container = new graphic.Group();
	                    this._zr.add(container);
	                    container.__createdByBrush = true;
	                }
	                this._container = container;

	                // Add to new container.
	                container.add(this.group);
	            }

	            return this;
	        },

	        /**
	         * @param
	         */
	        eachCover: function (cb, context) {
	            each(this._covers, cb, context);
	        },

	        /**
	         * Update covers.
	         * @param {Array.<Object>} brushOptionList Like:
	         *        [
	         *            {id: 'xx', brushType: 'line', range: [23, 44], brushStyle, transformable},
	         *            {id: 'yy', brushType: 'rect', range: [[23, 44], [23, 54]]},
	         *            ...
	         *        ]
	         *        `brushType` is required in each cover info.
	         *        `id` is not mandatory.
	         *        `brushStyle`, `transformable` is not mandatory, use DEFAULT_BRUSH_OPT by default.
	         *        If brushOptionList is null/undefined, all covers removed.
	         */
	        updateCovers: function (brushOptionList) {
	            if (true) {
	                zrUtil.assert(this._mounted);
	            }

	            brushOptionList = zrUtil.map(brushOptionList, function (brushOption) {
	                return zrUtil.merge(zrUtil.clone(DEFAULT_BRUSH_OPT), brushOption, true);
	            });

	            var tmpIdPrefix = '\0-brush-index-';
	            var oldCovers = this._covers;
	            var newCovers = this._covers = [];
	            var controller = this;

	            (new DataDiffer(oldCovers, brushOptionList, oldGetKey, getKey))
	                .add(addOrUpdate)
	                .update(addOrUpdate)
	                .remove(remove)
	                .execute();

	            return this;

	            function getKey(brushOption, index) {
	                return (brushOption.id != null ? brushOption.id : tmpIdPrefix + index)
	                    + '-' + brushOption.brushType;
	            }

	            function oldGetKey(cover, index) {
	                return getKey(cover.__brushOption, index);
	            }

	            function addOrUpdate(newIndex, oldIndex) {
	                var newBrushOption = brushOptionList[newIndex];
	                var cover = newCovers[newIndex] = oldIndex != null
	                    ? (oldCovers[oldIndex].__brushOption = newBrushOption, oldCovers[oldIndex])
	                    : endCreating(controller, createCover(controller, newBrushOption));
	                updateCoverAfterCreation(controller, cover);
	            }

	            function remove(oldIndex) {
	                controller.group.remove(oldCovers[oldIndex]);
	            }
	        },

	        unmount: function () {
	            this.enableBrush(false);

	            unmountContainer(this);

	            if (true) {
	                this._mounted = false; // should be at last.
	            }

	            return this;
	        },

	        dispose: function () {
	            this.unmount();
	            this.off();
	        }
	    };

	    zrUtil.mixin(BrushController, Eventful);


	    function doEnableBrush(controller, brushOption) {
	        var zr = controller._zr;

	        var onRelease = zrUtil.bind(function (userOnRelease) {
	            controller.enableBrush(false);
	            userOnRelease && userOnRelease();
	        }, controller, brushOption.onRelease);

	        if (controller._useGlobalCursor) {
	            // Consider roam, which takes globalPan too.
	            interactionMutex.take(zr, MUTEX_RESOURCE_KEY, controller._uid, onRelease);
	            zr.setDefaultCursorStyle('crosshair');
	        }

	        each(controller._handlers, function (handler, eventName) {
	            zr.on(eventName, handler);
	        });

	        controller._brushType = brushOption.brushType;
	        controller._brushOption = zrUtil.merge(zrUtil.clone(DEFAULT_BRUSH_OPT), brushOption, true);
	    }

	    function doDisableBrush(controller) {
	        var zr = controller._zr;

	        if (controller._useGlobalCursor) {
	            interactionMutex.release(zr, MUTEX_RESOURCE_KEY, controller._uid);
	            zr.setDefaultCursorStyle('default');
	        }

	        each(controller._handlers, function (handler, eventName) {
	            zr.off(eventName, handler);
	        });

	        controller._brushType = controller._brushOption = null;
	    }

	    function createCover(controller, brushOption) {
	        var cover = coverRenderers[brushOption.brushType].createCover(controller, brushOption);
	        updateZ(cover);
	        cover.__brushOption = brushOption;
	        controller.group.add(cover);
	        return cover;
	    }

	    function endCreating(controller, creatingCover) {
	        var coverRenderer = getCoverRenderer(creatingCover);
	        if (coverRenderer.endCreating) {
	            coverRenderer.endCreating(controller, creatingCover);
	            updateZ(creatingCover);
	        }
	        return creatingCover;
	    }

	    function updateCoverShape(controller, cover) {
	        var brushOption = cover.__brushOption;
	        getCoverRenderer(cover).updateCoverShape(
	            controller, cover, brushOption.range, brushOption
	        );
	    }

	    function updateZ(group) {
	        group.traverse(function (el) {
	            el.z = COVER_Z;
	            el.z2 = COVER_Z; // Consider in given container.
	        });
	    }

	    function updateCoverAfterCreation(controller, cover) {
	        getCoverRenderer(cover).updateCommon(controller, cover);
	        updateCoverShape(controller, cover);
	    }

	    function getCoverRenderer(cover) {
	        return coverRenderers[cover.__brushOption.brushType];
	    }

	    function getPanelByPoint(controller, x, y) {
	        if (isGlobalBrush(controller)) {
	            return {};
	        }
	        var panel;
	        each(controller._panels, function (pn) {
	            pn.contain(x, y) && (panel = pn);
	        });
	        return panel;
	    }

	    function clearCovers(controller) {
	        each(controller._covers, function (cover) {
	            controller.group.remove(cover);
	        }, controller);
	        controller._covers.length = 0;
	    }

	    function trigger(controller, opt) {
	        var brushRanges = map(controller._covers, function (cover) {
	            var brushOption = cover.__brushOption;
	            var range = zrUtil.clone(brushOption.range);

	            return {
	                brushType: brushOption.brushType,
	                panelId: brushOption.panelId,
	                range: range
	            };
	        });

	        controller.trigger('brush', brushRanges, {
	            isEnd: !!opt.isEnd,
	            removeOnClick: !!opt.removeOnClick
	        });
	    }

	    function shouldShowCover(controller) {
	        var track = controller._track;

	        if (!track.length) {
	            return false;
	        }

	        var p2 = track[track.length - 1];
	        var p1 = track[0];
	        var dx = p2[0] - p1[0];
	        var dy = p2[1] - p1[1];
	        var dist = mathPow(dx * dx + dy * dy, 0.5);

	        return dist > UNSELECT_THRESHOLD;
	    }

	    function unmountContainer(controller) {
	        // container may 'removeAll' outside.
	        clearCovers(controller);

	        var group = controller.group;
	        var container = controller._container;

	        if (container) {
	            group && container.remove(group);
	            if (container.__createdByBrush) {
	                controller._zr.remove(controller._container);
	            }
	            controller._container = null;
	        }
	    }

	    function isGlobalBrush(controller) {
	        return !controller._panels;
	    }

	    function getTrackEnds(track) {
	        var tail = track.length - 1;
	        tail < 0 && (tail = 0);
	        return [track[0], track[tail]];
	    }

	    function createBaseRectCover(doDrift, controller, brushOption, edgeNames) {
	        var cover = new graphic.Group();

	        cover.add(new graphic.Rect({
	            name: 'rect',
	            style: makeStyle(brushOption),
	            silent: true,
	            draggable: true,
	            cursor: 'move',
	            drift: curry(doDrift, controller, cover, 'nswe'),
	            ondragend: curry(trigger, controller, {isEnd: true})
	        }));

	        each(
	            edgeNames,
	            function (name) {
	                cover.add(new graphic.Rect({
	                    name: name,
	                    style: {opacity: 0},
	                    draggable: true,
	                    silent: true,
	                    invisible: true,
	                    drift: curry(doDrift, controller, cover, name),
	                    ondragend: curry(trigger, controller, {isEnd: true})
	                }));
	            }
	        );

	        return cover;
	    }

	    function updateBaseRect(cover, localRange, brushOption) {
	        var lineWidth = brushOption.brushStyle.lineWidth || 0;
	        var handleSize = mathMax(lineWidth, MIN_RESIZE_LINE_WIDTH);
	        var x = localRange[0][0];
	        var y = localRange[1][0];
	        var xa = x - lineWidth / 2;
	        var ya = y - lineWidth / 2;
	        var x2 = localRange[0][1];
	        var y2 = localRange[1][1];
	        var x2a = x2 - handleSize + lineWidth / 2;
	        var y2a = y2 - handleSize + lineWidth / 2;
	        var width = x2 - x;
	        var height = y2 - y;
	        var widtha = width + lineWidth;
	        var heighta = height + lineWidth;

	        updateRectShape(cover, 'rect', x, y, width, height);

	        if (brushOption.transformable) {
	            updateRectShape(cover, 'w', xa, ya, handleSize, heighta);
	            updateRectShape(cover, 'e', x2a, ya, handleSize, heighta);
	            updateRectShape(cover, 'n', xa, ya, widtha, handleSize);
	            updateRectShape(cover, 's', xa, y2a, widtha, handleSize);

	            updateRectShape(cover, 'nw', xa, ya, handleSize, handleSize);
	            updateRectShape(cover, 'ne', x2a, ya, handleSize, handleSize);
	            updateRectShape(cover, 'sw', xa, y2a, handleSize, handleSize);
	            updateRectShape(cover, 'se', x2a, y2a, handleSize, handleSize);
	        }
	    }

	    function updateCommon(controller, cover) {
	        var brushOption = cover.__brushOption;
	        var transformable = brushOption.transformable;

	        var mainEl = cover.childAt(0);
	        mainEl.useStyle(makeStyle(brushOption));
	        mainEl.attr({
	            silent: !transformable,
	            cursor: transformable ? 'move' : 'default'
	        });

	        each(
	            ['w', 'e', 'n', 's', 'se', 'sw', 'ne', 'nw'],
	            function (name) {
	                var el = cover.childOfName(name);
	                var globalDir = getGlobalDirection(controller, name);

	                el && el.attr({
	                    silent: !transformable,
	                    invisible: !transformable,
	                    cursor: transformable ? CURSOR_MAP[globalDir] + '-resize' : null
	                });
	            }
	        );
	    }

	    function updateRectShape(cover, name, x, y, w, h) {
	        var el = cover.childOfName(name);
	        el && el.setShape({x: x, y: y, width: w, height: h});
	    }

	    function makeStyle(brushOption) {
	        return zrUtil.defaults({strokeNoScale: true}, brushOption.brushStyle);
	    }

	    function formatRectRange(x, y, x2, y2) {
	        var min = [mathMin(x, x2), mathMin(y, y2)];
	        var max = [mathMax(x, x2), mathMax(y, y2)];

	        return [
	            [min[0], max[0]], // x range
	            [min[1], max[1]] // y range
	        ];
	    }

	    function getTransform(controller) {
	        return graphic.getTransform(controller.group);
	    }

	    function getGlobalDirection(controller, localDirection) {
	        if (localDirection.length > 1) {
	            localDirection = localDirection.split('');
	            var globalDir = [
	                getGlobalDirection(controller, localDirection[0]),
	                getGlobalDirection(controller, localDirection[1])
	            ];
	            (globalDir[0] === 'e' || globalDir[0] === 'w') && globalDir.reverse();
	            return globalDir.join('');
	        }
	        else {
	            var map = {w: 'left', e: 'right', n: 'top', s: 'bottom'};
	            var inverseMap = {left: 'w', right: 'e', top: 'n', bottom: 's'};
	            var globalDir = graphic.transformDirection(
	                map[localDirection], getTransform(controller)
	            );
	            return inverseMap[globalDir];
	        }
	    }

	    function driftRect(toRectRange, fromRectRange, controller, cover, name, dx, dy) {
	        var brushOption = cover.__brushOption;
	        var rectRange = toRectRange(brushOption.range);
	        var localDelta = toLocalDelta(controller, dx, dy);

	        each(name.split(''), function (namePart) {
	            var ind = DIRECTION_MAP[namePart];
	            rectRange[ind[0]][ind[1]] += localDelta[ind[0]];
	        });

	        brushOption.range = fromRectRange(formatRectRange(
	            rectRange[0][0], rectRange[1][0], rectRange[0][1], rectRange[1][1]
	        ));

	        updateCoverAfterCreation(controller, cover);
	        trigger(controller, {isEnd: false});
	    }

	    function driftPolygon(controller, cover, dx, dy) {
	        var range = cover.__brushOption.range;
	        var localDelta = toLocalDelta(controller, dx, dy);

	        each(range, function (point) {
	            point[0] += localDelta[0];
	            point[1] += localDelta[1];
	        });

	        updateCoverAfterCreation(controller, cover);
	        trigger(controller, {isEnd: false});
	    }

	    function toLocalDelta(controller, dx, dy) {
	        var thisGroup = controller.group;
	        var localD = thisGroup.transformCoordToLocal(dx, dy);
	        var localZero = thisGroup.transformCoordToLocal(0, 0);

	        return [localD[0] - localZero[0], localD[1] - localZero[1]];
	    }

	    function preventDefault(e) {
	        var rawE = e.event;
	        rawE.preventDefault && rawE.preventDefault();
	    }

	    function updateCoverByMouse(controller, e, isEnd) {
	        var x = e.offsetX;
	        var y = e.offsetY;
	        var creatingCover = controller._creatingCover;
	        var thisBrushOption = controller._brushOption;
	        var panel = getPanelByPoint(controller, x, y);

	        if (panel || isEnd) { // Outside panel but isEnd, cover creating ends.

	            panel && controller._track.push(controller.group.transformCoordToLocal(x, y));

	            if (shouldShowCover(controller)) {

	                if (!creatingCover && panel) {
	                    thisBrushOption.brushMode === 'single' && clearCovers(controller);
	                    var brushOption = zrUtil.clone(thisBrushOption);
	                    brushOption.panelId = panel.__brushPanelId;
	                    creatingCover = controller._creatingCover = createCover(controller, brushOption);
	                    controller._covers.push(creatingCover);
	                }

	                if (creatingCover) {
	                    var coverRenderer = coverRenderers[controller._brushType];
	                    var coverBrushOption = creatingCover.__brushOption;

	                    coverBrushOption.range = coverRenderer.getCreatingRange(
	                        zrUtil.clone(controller._track)
	                    );

	                    if (isEnd) {
	                        endCreating(controller, creatingCover);
	                        coverRenderer.updateCommon(controller, creatingCover);
	                    }

	                    updateCoverShape(controller, creatingCover);
	                }

	                trigger(controller, {isEnd: isEnd});
	            }
	            else if (
	                isEnd
	                && !creatingCover
	                && thisBrushOption.brushMode === 'single'
	                && thisBrushOption.removeOnClick
	            ) {
	                // Help user to remove covers easily, only by a tiny drag, in 'single' mode.
	                // But a single click do not clear covers, because user may have casual
	                // clicks (for example, click on other component and do not expect covers
	                // disappear).
	                clearCovers(controller);
	                trigger(controller, {isEnd: isEnd, removeOnClick: true});
	            }

	        }
	    }

	    var mouseHandlers = {

	        mousedown: function (e) {
	            if (!e.target || !e.target.draggable) {

	                preventDefault(e);

	                var x = e.offsetX;
	                var y = e.offsetY;

	                this._creatingCover = null;

	                if (getPanelByPoint(this, x, y)) {
	                    this._dragging = true;
	                    this._track = [this.group.transformCoordToLocal(x, y)];
	                }
	            }
	        },

	        mousemove: function (e) {
	            if (this._dragging) {

	                preventDefault(e);

	                updateCoverByMouse(this, e, false);
	            }
	        },

	        mouseup: function (e) {
	            if (this._dragging) {

	                preventDefault(e);

	                updateCoverByMouse(this, e, true);

	                this._dragging = false;
	                this._track = [];
	            }
	        }
	    };

	    /**
	     * key: brushType
	     * @type {Object}
	     */
	    var coverRenderers = {

	        lineX: getLineRenderer(0),

	        lineY: getLineRenderer(1),

	        rect: {
	            createCover: function (controller, brushOption) {
	                return createBaseRectCover(
	                    curry(
	                        driftRect,
	                        function (range) {
	                            return range;
	                        },
	                        function (range) {
	                            return range;
	                        }
	                    ),
	                    controller,
	                    brushOption,
	                    ['w', 'e', 'n', 's', 'se', 'sw', 'ne', 'nw']
	                );
	            },
	            getCreatingRange: function (localTrack) {
	                var ends = getTrackEnds(localTrack);
	                return formatRectRange(ends[1][0], ends[1][1], ends[0][0], ends[0][1]);
	            },
	            updateCoverShape: function (controller, cover, localRange, brushOption) {
	                updateBaseRect(cover, localRange, brushOption);
	            },
	            updateCommon: updateCommon
	        },

	        polygon: {
	            createCover: function (controller, brushOption) {
	                var cover = new graphic.Group();

	                // Do not use graphic.Polygon because graphic.Polyline do not close the
	                // border of the shape when drawing, which is a better experience for user.
	                cover.add(new graphic.Polyline({
	                    style: makeStyle(brushOption),
	                    silent: true
	                }));

	                return cover;
	            },
	            getCreatingRange: function (localTrack) {
	                return localTrack;
	            },
	            endCreating: function (controller, cover) {
	                cover.remove(cover.childAt(0));
	                // Use graphic.Polygon close the shape.
	                cover.add(new graphic.Polygon({
	                    draggable: true,
	                    drift: curry(driftPolygon, controller, cover),
	                    ondragend: curry(trigger, controller, {isEnd: true})
	                }));
	            },
	            updateCoverShape: function (controller, cover, localRange, brushOption) {
	                cover.childAt(0).setShape({points: localRange});
	            },
	            updateCommon: updateCommon
	        }
	    };

	    function getLineRenderer(xyIndex) {
	        return {
	            createCover: function (controller, brushOption) {
	                return createBaseRectCover(
	                    curry(
	                        driftRect,
	                        function (range) {
	                            var rectRange = [range, [0, 100]];
	                            xyIndex && rectRange.reverse();
	                            return rectRange;
	                        },
	                        function (rectRange) {
	                            return rectRange[xyIndex];
	                        }
	                    ),
	                    controller,
	                    brushOption,
	                    [['w', 'e'], ['n', 's']][xyIndex]
	                );
	            },
	            getCreatingRange: function (localTrack) {
	                var ends = getTrackEnds(localTrack);
	                var min = mathMin(ends[0][0], ends[1 - xyIndex][xyIndex]);
	                var max = mathMax(ends[0][0], ends[1 - xyIndex][xyIndex]);

	                return [min, max];
	            },
	            updateCoverShape: function (controller, cover, localRange, brushOption) {
	                var t = brushOption.brushStyle.width;
	                var rectRange = [localRange, [-t / 2, t / 2]];
	                xyIndex && rectRange.reverse();

	                updateBaseRect(cover, rectRange, brushOption);
	            },
	            updateCommon: updateCommon
	        };
	    }

	    return BrushController;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Legend component entry file8
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    __webpack_require__(205);
	    __webpack_require__(206);
	    __webpack_require__(207);

	    var echarts = __webpack_require__(1);
	    // Series Filter
	    echarts.registerProcessor(__webpack_require__(209));
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {

	    'use strict';

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var Model = __webpack_require__(6);

	    var LegendModel = __webpack_require__(1).extendComponentModel({

	        type: 'legend',

	        dependencies: ['series'],

	        layoutMode: {
	            type: 'box',
	            ignoreSize: true
	        },

	        init: function (option, parentModel, ecModel) {
	            this.mergeDefaultAndTheme(option, ecModel);

	            option.selected = option.selected || {};
	        },

	        mergeOption: function (option) {
	            LegendModel.superCall(this, 'mergeOption', option);
	        },

	        optionUpdated: function () {
	            this._updateData(this.ecModel);

	            var legendData = this._data;

	            // If selectedMode is single, try to select one
	            if (legendData[0] && this.get('selectedMode') === 'single') {
	                var hasSelected = false;
	                // If has any selected in option.selected
	                for (var i = 0; i < legendData.length; i++) {
	                    var name = legendData[i].get('name');
	                    if (this.isSelected(name)) {
	                        // Force to unselect others
	                        this.select(name);
	                        hasSelected = true;
	                        break;
	                    }
	                }
	                // Try select the first if selectedMode is single
	                !hasSelected && this.select(legendData[0].get('name'));
	            }
	        },

	        _updateData: function (ecModel) {
	            var legendData = zrUtil.map(this.get('data') || [], function (dataItem) {
	                // Can be string or number
	                if (typeof dataItem === 'string' || typeof dataItem === 'number') {
	                    dataItem = {
	                        name: dataItem
	                    };
	                }
	                return new Model(dataItem, this, this.ecModel);
	            }, this);
	            this._data = legendData;

	            var availableNames = zrUtil.map(ecModel.getSeries(), function (series) {
	                return series.name;
	            });
	            ecModel.eachSeries(function (seriesModel) {
	                if (seriesModel.legendDataProvider) {
	                    var data = seriesModel.legendDataProvider();
	                    availableNames = availableNames.concat(data.mapArray(data.getName));
	                }
	            });
	            /**
	             * @type {Array.<string>}
	             * @private
	             */
	            this._availableNames = availableNames;
	        },

	        /**
	         * @return {Array.<module:echarts/model/Model>}
	         */
	        getData: function () {
	            return this._data;
	        },

	        /**
	         * @param {string} name
	         */
	        select: function (name) {
	            var selected = this.option.selected;
	            var selectedMode = this.get('selectedMode');
	            if (selectedMode === 'single') {
	                var data = this._data;
	                zrUtil.each(data, function (dataItem) {
	                    selected[dataItem.get('name')] = false;
	                });
	            }
	            selected[name] = true;
	        },

	        /**
	         * @param {string} name
	         */
	        unSelect: function (name) {
	            if (this.get('selectedMode') !== 'single') {
	                this.option.selected[name] = false;
	            }
	        },

	        /**
	         * @param {string} name
	         */
	        toggleSelected: function (name) {
	            var selected = this.option.selected;
	            // Default is true
	            if (!(name in selected)) {
	                selected[name] = true;
	            }
	            this[selected[name] ? 'unSelect' : 'select'](name);
	        },

	        /**
	         * @param {string} name
	         */
	        isSelected: function (name) {
	            var selected = this.option.selected;
	            return !((name in selected) && !selected[name])
	                && zrUtil.indexOf(this._availableNames, name) >= 0;
	        },

	        defaultOption: {
	            // 一级层叠
	            zlevel: 0,
	            // 二级层叠
	            z: 4,
	            show: true,

	            // 布局方式，默认为水平布局，可选为：
	            // 'horizontal' | 'vertical'
	            orient: 'horizontal',

	            left: 'center',
	            // right: 'center',

	            top: 'top',
	            // bottom: 'top',

	            // 水平对齐
	            // 'auto' | 'left' | 'right'
	            // 默认为 'auto', 根据 x 的位置判断是左对齐还是右对齐
	            align: 'auto',

	            backgroundColor: 'rgba(0,0,0,0)',
	            // 图例边框颜色
	            borderColor: '#ccc',
	            // 图例边框线宽，单位px，默认为0（无边框）
	            borderWidth: 0,
	            // 图例内边距，单位px，默认各方向内边距为5，
	            // 接受数组分别设定上右下左边距，同css
	            padding: 5,
	            // 各个item之间的间隔，单位px，默认为10，
	            // 横向布局时为水平间隔，纵向布局时为纵向间隔
	            itemGap: 10,
	            // 图例图形宽度
	            itemWidth: 25,
	            // 图例图形高度
	            itemHeight: 14,

	            // 图例关闭时候的颜色
	            inactiveColor: '#ccc',

	            textStyle: {
	                // 图例文字颜色
	                color: '#333'
	            },
	            // formatter: '',
	            // 选择模式，默认开启图例开关
	            selectedMode: true
	            // 配置默认选中状态，可配合LEGEND.SELECTED事件做动态数据载入
	            // selected: null,
	            // 图例内容（详见legend.data，数组中每一项代表一个item
	            // data: [],
	        }
	    });

	    return LegendModel;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @file Legend action
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {

	    var echarts = __webpack_require__(1);
	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    function legendSelectActionHandler(methodName, payload, ecModel) {
	        var selectedMap = {};
	        var isToggleSelect = methodName === 'toggleSelected';
	        var isSelected;
	        // Update all legend components
	        ecModel.eachComponent('legend', function (legendModel) {
	            if (isToggleSelect && isSelected != null) {
	                // Force other legend has same selected status
	                // Or the first is toggled to true and other are toggled to false
	                // In the case one legend has some item unSelected in option. And if other legend
	                // doesn't has the item, they will assume it is selected.
	                legendModel[isSelected ? 'select' : 'unSelect'](payload.name);
	            }
	            else {
	                legendModel[methodName](payload.name);
	                isSelected = legendModel.isSelected(payload.name);
	            }
	            var legendData = legendModel.getData();
	            zrUtil.each(legendData, function (model) {
	                var name = model.get('name');
	                // Wrap element
	                if (name === '\n' || name === '') {
	                    return;
	                }
	                var isItemSelected = legendModel.isSelected(name);
	                if (name in selectedMap) {
	                    // Unselected if any legend is unselected
	                    selectedMap[name] = selectedMap[name] && isItemSelected;
	                }
	                else {
	                    selectedMap[name] = isItemSelected;
	                }
	            });
	        });
	        // Return the event explicitly
	        return {
	            name: payload.name,
	            selected: selectedMap
	        };
	    }
	    /**
	     * @event legendToggleSelect
	     * @type {Object}
	     * @property {string} type 'legendToggleSelect'
	     * @property {string} [from]
	     * @property {string} name Series name or data item name
	     */
	    echarts.registerAction(
	        'legendToggleSelect', 'legendselectchanged',
	        zrUtil.curry(legendSelectActionHandler, 'toggleSelected')
	    );

	    /**
	     * @event legendSelect
	     * @type {Object}
	     * @property {string} type 'legendSelect'
	     * @property {string} name Series name or data item name
	     */
	    echarts.registerAction(
	        'legendSelect', 'legendselected',
	        zrUtil.curry(legendSelectActionHandler, 'select')
	    );

	    /**
	     * @event legendUnSelect
	     * @type {Object}
	     * @property {string} type 'legendUnSelect'
	     * @property {string} name Series name or data item name
	     */
	    echarts.registerAction(
	        'legendUnSelect', 'legendunselected',
	        zrUtil.curry(legendSelectActionHandler, 'unSelect')
	    );
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var symbolCreator = __webpack_require__(39);
	    var graphic = __webpack_require__(25);
	    var listComponentHelper = __webpack_require__(208);

	    var curry = zrUtil.curry;

	    function dispatchSelectAction(name, api) {
	        api.dispatchAction({
	            type: 'legendToggleSelect',
	            name: name
	        });
	    }

	    function dispatchHighlightAction(seriesModel, dataName, api) {
	        // If element hover will move to a hoverLayer.
	        var el = api.getZr().storage.getDisplayList()[0];
	        if (!(el && el.useHoverLayer)) {
	            seriesModel.get('legendHoverLink') && api.dispatchAction({
	                type: 'highlight',
	                seriesName: seriesModel.name,
	                name: dataName
	            });
	        }
	    }

	    function dispatchDownplayAction(seriesModel, dataName, api) {
	        // If element hover will move to a hoverLayer.
	        var el = api.getZr().storage.getDisplayList()[0];
	        if (!(el && el.useHoverLayer)) {
	            seriesModel.get('legendHoverLink') && api.dispatchAction({
	                type: 'downplay',
	                seriesName: seriesModel.name,
	                name: dataName
	            });
	        }
	    }

	    return __webpack_require__(1).extendComponentView({

	        type: 'legend',

	        init: function () {
	            this._symbolTypeStore = {};
	        },

	        render: function (legendModel, ecModel, api) {
	            var group = this.group;
	            group.removeAll();

	            if (!legendModel.get('show')) {
	                return;
	            }

	            var selectMode = legendModel.get('selectedMode');
	            var itemAlign = legendModel.get('align');

	            if (itemAlign === 'auto') {
	                itemAlign = (legendModel.get('left') === 'right'
	                    && legendModel.get('orient') === 'vertical')
	                    ? 'right' : 'left';
	            }

	            var legendDrawedMap = {};

	            zrUtil.each(legendModel.getData(), function (itemModel) {
	                var name = itemModel.get('name');

	                // Use empty string or \n as a newline string
	                if (name === '' || name === '\n') {
	                    group.add(new graphic.Group({
	                        newline: true
	                    }));
	                    return;
	                }

	                var seriesModel = ecModel.getSeriesByName(name)[0];

	                if (legendDrawedMap[name]) {
	                    // Have been drawed
	                    return;
	                }

	                // Series legend
	                if (seriesModel) {
	                    var data = seriesModel.getData();
	                    var color = data.getVisual('color');

	                    // If color is a callback function
	                    if (typeof color === 'function') {
	                        // Use the first data
	                        color = color(seriesModel.getDataParams(0));
	                    }

	                    // Using rect symbol defaultly
	                    var legendSymbolType = data.getVisual('legendSymbol') || 'roundRect';
	                    var symbolType = data.getVisual('symbol');

	                    var itemGroup = this._createItem(
	                        name, itemModel, legendModel,
	                        legendSymbolType, symbolType,
	                        itemAlign, color,
	                        selectMode
	                    );

	                    itemGroup.on('click', curry(dispatchSelectAction, name, api))
	                        .on('mouseover', curry(dispatchHighlightAction, seriesModel, '', api))
	                        .on('mouseout', curry(dispatchDownplayAction, seriesModel, '', api));

	                    legendDrawedMap[name] = true;
	                }
	                else {
	                    // Data legend of pie, funnel
	                    ecModel.eachRawSeries(function (seriesModel) {
	                        // In case multiple series has same data name
	                        if (legendDrawedMap[name]) {
	                            return;
	                        }
	                        if (seriesModel.legendDataProvider) {
	                            var data = seriesModel.legendDataProvider();
	                            var idx = data.indexOfName(name);
	                            if (idx < 0) {
	                                return;
	                            }

	                            var color = data.getItemVisual(idx, 'color');

	                            var legendSymbolType = 'roundRect';

	                            var itemGroup = this._createItem(
	                                name, itemModel, legendModel,
	                                legendSymbolType, null,
	                                itemAlign, color,
	                                selectMode
	                            );

	                            itemGroup.on('click', curry(dispatchSelectAction, name, api))
	                                // FIXME Should not specify the series name
	                                .on('mouseover', curry(dispatchHighlightAction, seriesModel, name, api))
	                                .on('mouseout', curry(dispatchDownplayAction, seriesModel, name, api));

	                            legendDrawedMap[name] = true;
	                        }
	                    }, this);
	                }

	                if (true) {
	                    if (!legendDrawedMap[name]) {
	                        console.warn(name + ' series not exists. Legend data should be same with series name or data name.');
	                    }
	                }
	            }, this);

	            listComponentHelper.layout(group, legendModel, api);
	            // Render background after group is layout
	            // FIXME
	            listComponentHelper.addBackground(group, legendModel);
	        },

	        _createItem: function (
	            name, itemModel, legendModel,
	            legendSymbolType, symbolType,
	            itemAlign, color, selectMode
	        ) {
	            var itemWidth = legendModel.get('itemWidth');
	            var itemHeight = legendModel.get('itemHeight');
	            var inactiveColor = legendModel.get('inactiveColor');

	            var isSelected = legendModel.isSelected(name);
	            var itemGroup = new graphic.Group();

	            var textStyleModel = itemModel.getModel('textStyle');

	            var itemIcon = itemModel.get('icon');

	            // Use user given icon first
	            legendSymbolType = itemIcon || legendSymbolType;
	            itemGroup.add(symbolCreator.createSymbol(
	                legendSymbolType, 0, 0, itemWidth, itemHeight, isSelected ? color : inactiveColor
	            ));

	            // Compose symbols
	            // PENDING
	            if (!itemIcon && symbolType
	                // At least show one symbol, can't be all none
	                && ((symbolType !== legendSymbolType) || symbolType == 'none')
	            ) {
	                var size = itemHeight * 0.8;
	                if (symbolType === 'none') {
	                    symbolType = 'circle';
	                }
	                // Put symbol in the center
	                itemGroup.add(symbolCreator.createSymbol(
	                    symbolType, (itemWidth - size) / 2, (itemHeight - size) / 2, size, size,
	                    isSelected ? color : inactiveColor
	                ));
	            }

	            // Text
	            var textX = itemAlign === 'left' ? itemWidth + 5 : -5;
	            var textAlign = itemAlign;

	            var formatter = legendModel.get('formatter');
	            if (typeof formatter === 'string' && formatter) {
	                name = formatter.replace('{name}', name);
	            }
	            else if (typeof formatter === 'function') {
	                name = formatter(name);
	            }

	            var text = new graphic.Text({
	                style: {
	                    text: name,
	                    x: textX,
	                    y: itemHeight / 2,
	                    fill: isSelected ? textStyleModel.getTextColor() : inactiveColor,
	                    textFont: textStyleModel.getFont(),
	                    textAlign: textAlign,
	                    textVerticalAlign: 'middle'
	                }
	            });
	            itemGroup.add(text);

	            // Add a invisible rect to increase the area of mouse hover
	            itemGroup.add(new graphic.Rect({
	                shape: itemGroup.getBoundingRect(),
	                invisible: true
	            }));

	            itemGroup.eachChild(function (child) {
	                child.silent = !selectMode;
	            });

	            this.group.add(itemGroup);

	            graphic.setHoverStyle(itemGroup);

	            return itemGroup;
	        }
	    });
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    // List layout
	    var layout = __webpack_require__(15);
	    var formatUtil = __webpack_require__(4);
	    var graphic = __webpack_require__(25);

	    function positionGroup(group, model, api) {
	        layout.positionGroup(
	            group, model.getBoxLayoutParams(),
	            {
	                width: api.getWidth(),
	                height: api.getHeight()
	            },
	            model.get('padding')
	        );
	    }

	    return {
	        /**
	         * Layout list like component.
	         * It will box layout each items in group of component and then position the whole group in the viewport
	         * @param {module:zrender/group/Group} group
	         * @param {module:echarts/model/Component} componentModel
	         * @param {module:echarts/ExtensionAPI}
	         */
	        layout: function (group, componentModel, api) {
	            var rect = layout.getLayoutRect(componentModel.getBoxLayoutParams(), {
	                width: api.getWidth(),
	                height: api.getHeight()
	            }, componentModel.get('padding'));
	            layout.box(
	                componentModel.get('orient'),
	                group,
	                componentModel.get('itemGap'),
	                rect.width,
	                rect.height
	            );

	            positionGroup(group, componentModel, api);
	        },

	        addBackground: function (group, componentModel) {
	            var padding = formatUtil.normalizeCssArray(
	                componentModel.get('padding')
	            );
	            var boundingRect = group.getBoundingRect();
	            var style = componentModel.getItemStyle(['color', 'opacity']);
	            style.fill = componentModel.get('backgroundColor');
	            var rect = new graphic.Rect({
	                shape: {
	                    x: boundingRect.x - padding[3],
	                    y: boundingRect.y - padding[0],
	                    width: boundingRect.width + padding[1] + padding[3],
	                    height: boundingRect.height + padding[0] + padding[2]
	                },
	                style: style,
	                silent: true,
	                z2: -1
	            });
	            graphic.subPixelOptimizeRect(rect);

	            group.add(rect);
	        }
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	   return function (ecModel) {
	        var legendModels = ecModel.findComponents({
	            mainType: 'legend'
	        });
	        if (legendModels && legendModels.length) {
	            ecModel.filterSeries(function (series) {
	                // If in any legend component the status is not selected.
	                // Because in legend series is assumed selected when it is not in the legend data.
	                for (var i = 0; i < legendModels.length; i++) {
	                    if (!legendModels[i].isSelected(series.name)) {
	                        return false;
	                    }
	                }
	                return true;
	            });
	        }
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;// FIXME Better way to pack data in graphic element
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    __webpack_require__(211);

	    __webpack_require__(212);

	    // Show tip action
	    /**
	     * @action
	     * @property {string} type
	     * @property {number} seriesIndex
	     * @property {number} dataIndex
	     * @property {number} [x]
	     * @property {number} [y]
	     */
	    __webpack_require__(1).registerAction(
	        {
	            type: 'showTip',
	            event: 'showTip',
	            update: 'none'
	        },
	        // noop
	        function () {}
	    );
	    // Hide tip action
	    __webpack_require__(1).registerAction(
	        {
	            type: 'hideTip',
	            event: 'hideTip',
	            update: 'none'
	        },
	        // noop
	        function () {}
	    );
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    __webpack_require__(1).extendComponentModel({

	        type: 'tooltip',

	        defaultOption: {
	            zlevel: 0,

	            z: 8,

	            show: true,

	            // tooltip主体内容
	            showContent: true,

	            // 触发类型，默认数据触发，见下图，可选为：'item' ¦ 'axis'
	            trigger: 'item',

	            // 触发条件，支持 'click' | 'mousemove'
	            triggerOn: 'mousemove',

	            // 是否永远显示 content
	            alwaysShowContent: false,

	            // 位置 {Array} | {Function}
	            // position: null

	            // 内容格式器：{string}（Template） ¦ {Function}
	            // formatter: null

	            showDelay: 0,

	            // 隐藏延迟，单位ms
	            hideDelay: 100,

	            // 动画变换时间，单位s
	            transitionDuration: 0.4,

	            enterable: false,

	            // 提示背景颜色，默认为透明度为0.7的黑色
	            backgroundColor: 'rgba(50,50,50,0.7)',

	            // 提示边框颜色
	            borderColor: '#333',

	            // 提示边框圆角，单位px，默认为4
	            borderRadius: 4,

	            // 提示边框线宽，单位px，默认为0（无边框）
	            borderWidth: 0,

	            // 提示内边距，单位px，默认各方向内边距为5，
	            // 接受数组分别设定上右下左边距，同css
	            padding: 5,

	            // Extra css text
	            extraCssText: '',

	            // 坐标轴指示器，坐标轴触发有效
	            axisPointer: {
	                // 默认为直线
	                // 可选为：'line' | 'shadow' | 'cross'
	                type: 'line',

	                // type 为 line 的时候有效，指定 tooltip line 所在的轴，可选
	                // 可选 'x' | 'y' | 'angle' | 'radius' | 'auto'
	                // 默认 'auto'，会选择类型为 cateogry 的轴，对于双数值轴，笛卡尔坐标系会默认选择 x 轴
	                // 极坐标系会默认选择 angle 轴
	                axis: 'auto',

	                animation: true,
	                animationDurationUpdate: 200,
	                animationEasingUpdate: 'exponentialOut',

	                // 直线指示器样式设置
	                lineStyle: {
	                    color: '#555',
	                    width: 1,
	                    type: 'solid'
	                },

	                crossStyle: {
	                    color: '#555',
	                    width: 1,
	                    type: 'dashed',

	                    // TODO formatter
	                    textStyle: {}
	                },

	                // 阴影指示器样式设置
	                shadowStyle: {
	                    color: 'rgba(150,150,150,0.3)'
	                }
	            },
	            textStyle: {
	                color: '#fff',
	                fontSize: 14
	            }
	        }
	    });
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var TooltipContent = __webpack_require__(213);
	    var graphic = __webpack_require__(25);
	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var formatUtil = __webpack_require__(4);
	    var numberUtil = __webpack_require__(5);
	    var parsePercent = numberUtil.parsePercent;
	    var env = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/env\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    function dataEqual(a, b) {
	        if (!a || !b) {
	            return false;
	        }
	        var round = numberUtil.round;
	        return round(a[0]) === round(b[0])
	            && round(a[1]) === round(b[1]);
	    }
	    /**
	     * @inner
	     */
	    function makeLineShape(x1, y1, x2, y2) {
	        return {
	            x1: x1,
	            y1: y1,
	            x2: x2,
	            y2: y2
	        };
	    }

	    /**
	     * @inner
	     */
	    function makeRectShape(x, y, width, height) {
	        return {
	            x: x,
	            y: y,
	            width: width,
	            height: height
	        };
	    }

	    /**
	     * @inner
	     */
	    function makeSectorShape(cx, cy, r0, r, startAngle, endAngle) {
	        return {
	            cx: cx,
	            cy: cy,
	            r0: r0,
	            r: r,
	            startAngle: startAngle,
	            endAngle: endAngle,
	            clockwise: true
	        };
	    }

	    function refixTooltipPosition(x, y, el, viewWidth, viewHeight) {
	        var width = el.clientWidth;
	        var height = el.clientHeight;
	        var gap = 20;

	        if (x + width + gap > viewWidth) {
	            x -= width + gap;
	        }
	        else {
	            x += gap;
	        }
	        if (y + height + gap > viewHeight) {
	            y -= height + gap;
	        }
	        else {
	            y += gap;
	        }
	        return [x, y];
	    }

	    function calcTooltipPosition(position, rect, dom) {
	        var domWidth = dom.clientWidth;
	        var domHeight = dom.clientHeight;
	        var gap = 5;
	        var x = 0;
	        var y = 0;
	        var rectWidth = rect.width;
	        var rectHeight = rect.height;
	        switch (position) {
	            case 'inside':
	                x = rect.x + rectWidth / 2 - domWidth / 2;
	                y = rect.y + rectHeight / 2 - domHeight / 2;
	                break;
	            case 'top':
	                x = rect.x + rectWidth / 2 - domWidth / 2;
	                y = rect.y - domHeight - gap;
	                break;
	            case 'bottom':
	                x = rect.x + rectWidth / 2 - domWidth / 2;
	                y = rect.y + rectHeight + gap;
	                break;
	            case 'left':
	                x = rect.x - domWidth - gap;
	                y = rect.y + rectHeight / 2 - domHeight / 2;
	                break;
	            case 'right':
	                x = rect.x + rectWidth + gap;
	                y = rect.y + rectHeight / 2 - domHeight / 2;
	        }
	        return [x, y];
	    }

	    /**
	     * @param  {string|Function|Array.<number>} positionExpr
	     * @param  {number} x Mouse x
	     * @param  {number} y Mouse y
	     * @param  {module:echarts/component/tooltip/TooltipContent} content
	     * @param  {Object|<Array.<Object>} params
	     * @param  {module:zrender/Element} el target element
	     * @param  {module:echarts/ExtensionAPI} api
	     * @return {Array.<number>}
	     */
	    function updatePosition(positionExpr, x, y, content, params, el, api) {
	        var viewWidth = api.getWidth();
	        var viewHeight = api.getHeight();

	        var rect = el && el.getBoundingRect().clone();
	        el && rect.applyTransform(el.transform);
	        if (typeof positionExpr === 'function') {
	            // Callback of position can be an array or a string specify the position
	            positionExpr = positionExpr([x, y], params, content.el, rect);
	        }

	        if (zrUtil.isArray(positionExpr)) {
	            x = parsePercent(positionExpr[0], viewWidth);
	            y = parsePercent(positionExpr[1], viewHeight);
	        }
	        // Specify tooltip position by string 'top' 'bottom' 'left' 'right' around graphic element
	        else if (typeof positionExpr === 'string' && el) {
	            var pos = calcTooltipPosition(
	                positionExpr, rect, content.el
	            );
	            x = pos[0];
	            y = pos[1];
	        }
	        else {
	            var pos = refixTooltipPosition(
	                x, y, content.el, viewWidth, viewHeight
	            );
	            x = pos[0];
	            y = pos[1];
	        }

	        content.moveTo(x, y);
	    }

	    function ifSeriesSupportAxisTrigger(seriesModel) {
	        var coordSys = seriesModel.coordinateSystem;
	        var trigger = seriesModel.get('tooltip.trigger', true);
	        // Ignore series use item tooltip trigger and series coordinate system is not cartesian or
	        return !(!coordSys
	            || (coordSys.type !== 'cartesian2d' && coordSys.type !== 'polar' && coordSys.type !== 'singleAxis')
	            || trigger === 'item');
	    }

	    __webpack_require__(1).extendComponentView({

	        type: 'tooltip',

	        _axisPointers: {},

	        init: function (ecModel, api) {
	            if (env.node) {
	                return;
	            }
	            var tooltipContent = new TooltipContent(api.getDom(), api);
	            this._tooltipContent = tooltipContent;

	            api.on('showTip', this._manuallyShowTip, this);
	            api.on('hideTip', this._manuallyHideTip, this);
	        },

	        render: function (tooltipModel, ecModel, api) {
	            if (env.node) {
	                return;
	            }

	            // Reset
	            this.group.removeAll();

	            /**
	             * @type {Object}
	             * @private
	             */
	            this._axisPointers = {};

	            /**
	             * @private
	             * @type {module:echarts/component/tooltip/TooltipModel}
	             */
	            this._tooltipModel = tooltipModel;

	            /**
	             * @private
	             * @type {module:echarts/model/Global}
	             */
	            this._ecModel = ecModel;

	            /**
	             * @private
	             * @type {module:echarts/ExtensionAPI}
	             */
	            this._api = api;

	            /**
	             * @type {Object}
	             * @private
	             */
	            this._lastHover = {
	                // data
	                // payloadBatch
	            };

	            var tooltipContent = this._tooltipContent;
	            tooltipContent.update();
	            tooltipContent.enterable = tooltipModel.get('enterable');
	            this._alwaysShowContent = tooltipModel.get('alwaysShowContent');

	            /**
	             * @type {Object.<string, Array>}
	             */
	            this._seriesGroupByAxis = this._prepareAxisTriggerData(
	                tooltipModel, ecModel
	            );

	            var crossText = this._crossText;
	            if (crossText) {
	                this.group.add(crossText);
	            }

	            // Try to keep the tooltip show when refreshing
	            if (this._lastX != null && this._lastY != null) {
	                var self = this;
	                clearTimeout(this._refreshUpdateTimeout);
	                this._refreshUpdateTimeout = setTimeout(function () {
	                    // Show tip next tick after other charts are rendered
	                    // In case highlight action has wrong result
	                    // FIXME
	                    self._manuallyShowTip({
	                        x: self._lastX,
	                        y: self._lastY
	                    });
	                });
	            }

	            var zr = this._api.getZr();
	            zr.off('click', this._tryShow);
	            zr.off('mousemove', this._mousemove);
	            zr.off('mouseout', this._hide);
	            zr.off('globalout', this._hide);
	            if (tooltipModel.get('triggerOn') === 'click') {
	                zr.on('click', this._tryShow, this);
	            }
	            else {
	                zr.on('mousemove', this._mousemove, this);
	                zr.on('mouseout', this._hide, this);
	                zr.on('globalout', this._hide, this);
	            }
	        },

	        _mousemove: function (e) {
	            var showDelay = this._tooltipModel.get('showDelay');
	            var self = this;
	            clearTimeout(this._showTimeout);
	            if (showDelay > 0) {
	                this._showTimeout = setTimeout(function () {
	                    self._tryShow(e);
	                }, showDelay);
	            }
	            else {
	                this._tryShow(e);
	            }
	        },

	        /**
	         * Show tip manually by
	         *  dispatchAction({
	         *      type: 'showTip',
	         *      x: 10,
	         *      y: 10
	         *  });
	         * Or
	         *  dispatchAction({
	         *      type: 'showTip',
	         *      seriesIndex: 0,
	         *      dataIndex: 1
	         *  });
	         *
	         *  TODO Batch
	         */
	        _manuallyShowTip: function (event) {
	            // From self
	            if (event.from === this.uid) {
	                return;
	            }

	            var ecModel = this._ecModel;
	            var seriesIndex = event.seriesIndex;
	            var dataIndex = event.dataIndex;
	            var seriesModel = ecModel.getSeriesByIndex(seriesIndex);
	            var api = this._api;

	            if (event.x == null || event.y == null) {
	                if (!seriesModel) {
	                    // Find the first series can use axis trigger
	                    ecModel.eachSeries(function (_series) {
	                        if (ifSeriesSupportAxisTrigger(_series) && !seriesModel) {
	                            seriesModel = _series;
	                        }
	                    });
	                }
	                if (seriesModel) {
	                    var data = seriesModel.getData();
	                    if (dataIndex == null) {
	                        dataIndex = data.indexOfName(event.name);
	                    }
	                    var el = data.getItemGraphicEl(dataIndex);
	                    var cx, cy;
	                    // Try to get the point in coordinate system
	                    var coordSys = seriesModel.coordinateSystem;
	                    if (coordSys && coordSys.dataToPoint) {
	                        var point = coordSys.dataToPoint(
	                            data.getValues(
	                                zrUtil.map(coordSys.dimensions, function (dim) {
	                                    return seriesModel.coordDimToDataDim(dim)[0];
	                                }), dataIndex, true
	                            )
	                        );
	                        cx = point && point[0];
	                        cy = point && point[1];
	                    }
	                    else if (el) {
	                        // Use graphic bounding rect
	                        var rect = el.getBoundingRect().clone();
	                        rect.applyTransform(el.transform);
	                        cx = rect.x + rect.width / 2;
	                        cy = rect.y + rect.height / 2;
	                    }
	                    if (cx != null && cy != null) {
	                        this._tryShow({
	                            offsetX: cx,
	                            offsetY: cy,
	                            target: el,
	                            event: {}
	                        });
	                    }
	                }
	            }
	            else {
	                var el = api.getZr().handler.findHover(event.x, event.y);
	                this._tryShow({
	                    offsetX: event.x,
	                    offsetY: event.y,
	                    target: el,
	                    event: {}
	                });
	            }
	        },

	        _manuallyHideTip: function (e) {
	            if (e.from === this.uid) {
	                return;
	            }

	            this._hide();
	        },

	        _prepareAxisTriggerData: function (tooltipModel, ecModel) {
	            // Prepare data for axis trigger
	            var seriesGroupByAxis = {};
	            ecModel.eachSeries(function (seriesModel) {
	                if (ifSeriesSupportAxisTrigger(seriesModel)) {
	                    var coordSys = seriesModel.coordinateSystem;
	                    var baseAxis;
	                    var key;

	                    // Only cartesian2d, polar and single support axis trigger
	                    if (coordSys.type === 'cartesian2d') {
	                        // FIXME `axisPointer.axis` is not baseAxis
	                        baseAxis = coordSys.getBaseAxis();
	                        key = baseAxis.dim + baseAxis.index;
	                    }
	                    else if (coordSys.type === 'singleAxis') {
	                        baseAxis = coordSys.getAxis();
	                        key = baseAxis.dim + baseAxis.type;
	                    }
	                    else {
	                        baseAxis = coordSys.getBaseAxis();
	                        key = baseAxis.dim + coordSys.name;
	                    }

	                    seriesGroupByAxis[key] = seriesGroupByAxis[key] || {
	                        coordSys: [],
	                        series: []
	                    };
	                    seriesGroupByAxis[key].coordSys.push(coordSys);
	                    seriesGroupByAxis[key].series.push(seriesModel);
	                }
	            }, this);

	            return seriesGroupByAxis;
	        },

	        /**
	         * mousemove handler
	         * @param {Object} e
	         * @private
	         */
	        _tryShow: function (e) {
	            var el = e.target;
	            var tooltipModel = this._tooltipModel;
	            var globalTrigger = tooltipModel.get('trigger');
	            var ecModel = this._ecModel;
	            var api = this._api;

	            if (!tooltipModel) {
	                return;
	            }

	            // Save mouse x, mouse y. So we can try to keep showing the tip if chart is refreshed
	            this._lastX = e.offsetX;
	            this._lastY = e.offsetY;

	            // Always show item tooltip if mouse is on the element with dataIndex
	            if (el && el.dataIndex != null) {
	                // Use dataModel in element if possible
	                // Used when mouseover on a element like markPoint or edge
	                // In which case, the data is not main data in series.
	                var dataModel = el.dataModel || ecModel.getSeriesByIndex(el.seriesIndex);
	                var dataIndex = el.dataIndex;
	                var itemModel = dataModel.getData().getItemModel(dataIndex);
	                // Series or single data may use item trigger when global is axis trigger
	                if ((itemModel.get('tooltip.trigger') || globalTrigger) === 'axis') {
	                    this._showAxisTooltip(tooltipModel, ecModel, e);
	                }
	                else {
	                    // Reset ticket
	                    this._ticket = '';
	                    // If either single data or series use item trigger
	                    this._hideAxisPointer();
	                    // Reset last hover and dispatch downplay action
	                    this._resetLastHover();

	                    this._showItemTooltipContent(dataModel, dataIndex, el.dataType, e);
	                }

	                api.dispatchAction({
	                    type: 'showTip',
	                    from: this.uid,
	                    dataIndex: el.dataIndex,
	                    seriesIndex: el.seriesIndex
	                });
	            }
	            else {
	                if (globalTrigger === 'item') {
	                    this._hide();
	                }
	                else {
	                    // Try show axis tooltip
	                    this._showAxisTooltip(tooltipModel, ecModel, e);
	                }

	                // Action of cross pointer
	                // other pointer types will trigger action in _dispatchAndShowSeriesTooltipContent method
	                if (tooltipModel.get('axisPointer.type') === 'cross') {
	                    api.dispatchAction({
	                        type: 'showTip',
	                        from: this.uid,
	                        x: e.offsetX,
	                        y: e.offsetY
	                    });
	                }
	            }
	        },

	        /**
	         * Show tooltip on axis
	         * @param {module:echarts/component/tooltip/TooltipModel} tooltipModel
	         * @param {module:echarts/model/Global} ecModel
	         * @param {Object} e
	         * @private
	         */
	        _showAxisTooltip: function (tooltipModel, ecModel, e) {
	            var axisPointerModel = tooltipModel.getModel('axisPointer');
	            var axisPointerType = axisPointerModel.get('type');

	            if (axisPointerType === 'cross') {
	                var el = e.target;
	                if (el && el.dataIndex != null) {
	                    var seriesModel = ecModel.getSeriesByIndex(el.seriesIndex);
	                    var dataIndex = el.dataIndex;
	                    this._showItemTooltipContent(seriesModel, dataIndex, el.dataType, e);
	                }
	            }

	            this._showAxisPointer();
	            var allNotShow = true;
	            zrUtil.each(this._seriesGroupByAxis, function (seriesCoordSysSameAxis) {
	                // Try show the axis pointer
	                var allCoordSys = seriesCoordSysSameAxis.coordSys;
	                var coordSys = allCoordSys[0];

	                // If mouse position is not in the grid or polar
	                var point = [e.offsetX, e.offsetY];

	                if (!coordSys.containPoint(point)) {
	                    // Hide axis pointer
	                    this._hideAxisPointer(coordSys.name);
	                    return;
	                }

	                allNotShow = false;
	                // Make sure point is discrete on cateogry axis
	                var dimensions = coordSys.dimensions;
	                var value = coordSys.pointToData(point, true);
	                point = coordSys.dataToPoint(value);
	                var baseAxis = coordSys.getBaseAxis();
	                var axisType = axisPointerModel.get('axis');
	                if (axisType === 'auto') {
	                    axisType = baseAxis.dim;
	                }

	                var contentNotChange = false;
	                var lastHover = this._lastHover;
	                if (axisPointerType === 'cross') {
	                    // If hover data not changed
	                    // Possible when two axes are all category
	                    if (dataEqual(lastHover.data, value)) {
	                        contentNotChange = true;
	                    }
	                    lastHover.data = value;
	                }
	                else {
	                    var valIndex = zrUtil.indexOf(dimensions, axisType);

	                    // If hover data not changed on the axis dimension
	                    if (lastHover.data === value[valIndex]) {
	                        contentNotChange = true;
	                    }
	                    lastHover.data = value[valIndex];
	                }

	                if (coordSys.type === 'cartesian2d' && !contentNotChange) {
	                    this._showCartesianPointer(
	                        axisPointerModel, coordSys, axisType, point
	                    );
	                }
	                else if (coordSys.type === 'polar' && !contentNotChange) {
	                    this._showPolarPointer(
	                        axisPointerModel, coordSys, axisType, point
	                    );
	                }
	                else if (coordSys.type === 'singleAxis' && !contentNotChange) {
	                    this._showSinglePointer(
	                        axisPointerModel, coordSys, axisType, point
	                    );
	                }

	                if (axisPointerType !== 'cross') {
	                    this._dispatchAndShowSeriesTooltipContent(
	                        coordSys, seriesCoordSysSameAxis.series, point, value, contentNotChange
	                    );
	                }
	            }, this);

	            if (!this._tooltipModel.get('show')) {
	                this._hideAxisPointer();
	            }

	            if (allNotShow) {
	                this._hide();
	            }
	        },

	        /**
	         * Show tooltip on axis of cartesian coordinate
	         * @param {module:echarts/model/Model} axisPointerModel
	         * @param {module:echarts/coord/cartesian/Cartesian2D} cartesians
	         * @param {string} axisType
	         * @param {Array.<number>} point
	         * @private
	         */
	        _showCartesianPointer: function (axisPointerModel, cartesian, axisType, point) {
	            var self = this;

	            var axisPointerType = axisPointerModel.get('type');
	            var moveAnimation = axisPointerType !== 'cross' && cartesian.getBaseAxis().type === 'category';

	            if (axisPointerType === 'cross') {
	                moveGridLine('x', point, cartesian.getAxis('y').getGlobalExtent());
	                moveGridLine('y', point, cartesian.getAxis('x').getGlobalExtent());

	                this._updateCrossText(cartesian, point, axisPointerModel);
	            }
	            else {
	                var otherAxis = cartesian.getAxis(axisType === 'x' ? 'y' : 'x');
	                var otherExtent = otherAxis.getGlobalExtent();

	                if (cartesian.type === 'cartesian2d') {
	                    (axisPointerType === 'line' ? moveGridLine : moveGridShadow)(
	                        axisType, point, otherExtent
	                    );
	                }
	            }

	            /**
	             * @inner
	             */
	            function moveGridLine(axisType, point, otherExtent) {
	                var targetShape = axisType === 'x'
	                    ? makeLineShape(point[0], otherExtent[0], point[0], otherExtent[1])
	                    : makeLineShape(otherExtent[0], point[1], otherExtent[1], point[1]);

	                var pointerEl = self._getPointerElement(
	                    cartesian, axisPointerModel, axisType, targetShape
	                );
	                moveAnimation
	                    ? graphic.updateProps(pointerEl, {
	                        shape: targetShape
	                    }, axisPointerModel)
	                    :  pointerEl.attr({
	                        shape: targetShape
	                    });
	            }

	            /**
	             * @inner
	             */
	            function moveGridShadow(axisType, point, otherExtent) {
	                var axis = cartesian.getAxis(axisType);
	                var bandWidth = axis.getBandWidth();
	                var span = otherExtent[1] - otherExtent[0];
	                var targetShape = axisType === 'x'
	                    ? makeRectShape(point[0] - bandWidth / 2, otherExtent[0], bandWidth, span)
	                    : makeRectShape(otherExtent[0], point[1] - bandWidth / 2, span, bandWidth);

	                var pointerEl = self._getPointerElement(
	                    cartesian, axisPointerModel, axisType, targetShape
	                );
	                moveAnimation
	                    ? graphic.updateProps(pointerEl, {
	                        shape: targetShape
	                    }, axisPointerModel)
	                    :  pointerEl.attr({
	                        shape: targetShape
	                    });
	            }
	        },

	        _showSinglePointer: function (axisPointerModel, single, axisType, point) {
	            var self = this;
	            var axisPointerType = axisPointerModel.get('type');
	            var moveAnimation = axisPointerType !== 'cross' && single.getBaseAxis().type === 'category';
	            var rect = single.getRect();
	            var otherExtent = [rect.y, rect.y + rect.height];

	            moveSingleLine(axisType, point, otherExtent);

	            /**
	             * @inner
	             */
	            function moveSingleLine(axisType, point, otherExtent) {
	                var axis = single.getAxis();
	                var orient = axis.orient;

	                var targetShape = orient === 'horizontal'
	                    ? makeLineShape(point[0], otherExtent[0], point[0], otherExtent[1])
	                    : makeLineShape(otherExtent[0], point[1], otherExtent[1], point[1]);

	                var pointerEl = self._getPointerElement(
	                    single, axisPointerModel, axisType, targetShape
	                );
	                moveAnimation
	                    ? graphic.updateProps(pointerEl, {
	                        shape: targetShape
	                    }, axisPointerModel)
	                    :  pointerEl.attr({
	                        shape: targetShape
	                    });
	            }

	        },

	        /**
	         * Show tooltip on axis of polar coordinate
	         * @param {module:echarts/model/Model} axisPointerModel
	         * @param {Array.<module:echarts/coord/polar/Polar>} polar
	         * @param {string} axisType
	         * @param {Array.<number>} point
	         */
	        _showPolarPointer: function (axisPointerModel, polar, axisType, point) {
	            var self = this;

	            var axisPointerType = axisPointerModel.get('type');

	            var angleAxis = polar.getAngleAxis();
	            var radiusAxis = polar.getRadiusAxis();

	            var moveAnimation = axisPointerType !== 'cross' && polar.getBaseAxis().type === 'category';

	            if (axisPointerType === 'cross') {
	                movePolarLine('angle', point, radiusAxis.getExtent());
	                movePolarLine('radius', point, angleAxis.getExtent());

	                this._updateCrossText(polar, point, axisPointerModel);
	            }
	            else {
	                var otherAxis = polar.getAxis(axisType === 'radius' ? 'angle' : 'radius');
	                var otherExtent = otherAxis.getExtent();

	                (axisPointerType === 'line' ? movePolarLine : movePolarShadow)(
	                    axisType, point, otherExtent
	                );
	            }
	            /**
	             * @inner
	             */
	            function movePolarLine(axisType, point, otherExtent) {
	                var mouseCoord = polar.pointToCoord(point);

	                var targetShape;

	                if (axisType === 'angle') {
	                    var p1 = polar.coordToPoint([otherExtent[0], mouseCoord[1]]);
	                    var p2 = polar.coordToPoint([otherExtent[1], mouseCoord[1]]);
	                    targetShape = makeLineShape(p1[0], p1[1], p2[0], p2[1]);
	                }
	                else {
	                    targetShape = {
	                        cx: polar.cx,
	                        cy: polar.cy,
	                        r: mouseCoord[0]
	                    };
	                }

	                var pointerEl = self._getPointerElement(
	                    polar, axisPointerModel, axisType, targetShape
	                );

	                moveAnimation
	                    ? graphic.updateProps(pointerEl, {
	                        shape: targetShape
	                    }, axisPointerModel)
	                    :  pointerEl.attr({
	                        shape: targetShape
	                    });
	            }

	            /**
	             * @inner
	             */
	            function movePolarShadow(axisType, point, otherExtent) {
	                var axis = polar.getAxis(axisType);
	                var bandWidth = axis.getBandWidth();

	                var mouseCoord = polar.pointToCoord(point);

	                var targetShape;

	                var radian = Math.PI / 180;

	                if (axisType === 'angle') {
	                    targetShape = makeSectorShape(
	                        polar.cx, polar.cy,
	                        otherExtent[0], otherExtent[1],
	                        // In ECharts y is negative if angle is positive
	                        (-mouseCoord[1] - bandWidth / 2) * radian,
	                        (-mouseCoord[1] + bandWidth / 2) * radian
	                    );
	                }
	                else {
	                    targetShape = makeSectorShape(
	                        polar.cx, polar.cy,
	                        mouseCoord[0] - bandWidth / 2,
	                        mouseCoord[0] + bandWidth / 2,
	                        0, Math.PI * 2
	                    );
	                }

	                var pointerEl = self._getPointerElement(
	                    polar, axisPointerModel, axisType, targetShape
	                );
	                moveAnimation
	                    ? graphic.updateProps(pointerEl, {
	                        shape: targetShape
	                    }, axisPointerModel)
	                    :  pointerEl.attr({
	                        shape: targetShape
	                    });
	            }
	        },

	        _updateCrossText: function (coordSys, point, axisPointerModel) {
	            var crossStyleModel = axisPointerModel.getModel('crossStyle');
	            var textStyleModel = crossStyleModel.getModel('textStyle');

	            var tooltipModel = this._tooltipModel;

	            var text = this._crossText;
	            if (!text) {
	                text = this._crossText = new graphic.Text({
	                    style: {
	                        textAlign: 'left',
	                        textVerticalAlign: 'bottom'
	                    }
	                });
	                this.group.add(text);
	            }

	            var value = coordSys.pointToData(point);

	            var dims = coordSys.dimensions;
	            value = zrUtil.map(value, function (val, idx) {
	                var axis = coordSys.getAxis(dims[idx]);
	                if (axis.type === 'category' || axis.type === 'time') {
	                    val = axis.scale.getLabel(val);
	                }
	                else {
	                    val = formatUtil.addCommas(
	                        val.toFixed(axis.getPixelPrecision())
	                    );
	                }
	                return val;
	            });

	            text.setStyle({
	                fill: textStyleModel.getTextColor() || crossStyleModel.get('color'),
	                textFont: textStyleModel.getFont(),
	                text: value.join(', '),
	                x: point[0] + 5,
	                y: point[1] - 5
	            });
	            text.z = tooltipModel.get('z');
	            text.zlevel = tooltipModel.get('zlevel');
	        },

	        _getPointerElement: function (coordSys, pointerModel, axisType, initShape) {
	            var tooltipModel = this._tooltipModel;
	            var z = tooltipModel.get('z');
	            var zlevel = tooltipModel.get('zlevel');
	            var axisPointers = this._axisPointers;
	            var coordSysName = coordSys.name;
	            axisPointers[coordSysName] = axisPointers[coordSysName] || {};
	            if (axisPointers[coordSysName][axisType]) {
	                return axisPointers[coordSysName][axisType];
	            }

	            // Create if not exists
	            var pointerType = pointerModel.get('type');
	            var styleModel = pointerModel.getModel(pointerType + 'Style');
	            var isShadow = pointerType === 'shadow';
	            var style = styleModel[isShadow ? 'getAreaStyle' : 'getLineStyle']();

	            var elementType = coordSys.type === 'polar'
	                ? (isShadow ? 'Sector' : (axisType === 'radius' ? 'Circle' : 'Line'))
	                : (isShadow ? 'Rect' : 'Line');

	            isShadow ? (style.stroke = null) : (style.fill = null);

	            var el = axisPointers[coordSysName][axisType] = new graphic[elementType]({
	                style: style,
	                z: z,
	                zlevel: zlevel,
	                silent: true,
	                shape: initShape
	            });

	            this.group.add(el);
	            return el;
	        },

	        /**
	         * Dispatch actions and show tooltip on series
	         * @param {Array.<module:echarts/model/Series>} seriesList
	         * @param {Array.<number>} point
	         * @param {Array.<number>} value
	         * @param {boolean} contentNotChange
	         * @param {Object} e
	         */
	        _dispatchAndShowSeriesTooltipContent: function (
	            coordSys, seriesList, point, value, contentNotChange
	        ) {

	            var rootTooltipModel = this._tooltipModel;
	            var tooltipContent = this._tooltipContent;

	            var baseAxis = coordSys.getBaseAxis();

	            var payloadBatch = zrUtil.map(seriesList, function (series) {
	                return {
	                    seriesIndex: series.seriesIndex,
	                    dataIndex: series.getAxisTooltipDataIndex
	                        ? series.getAxisTooltipDataIndex(series.coordDimToDataDim(baseAxis.dim), value, baseAxis)
	                        : series.getData().indexOfNearest(
	                            series.coordDimToDataDim(baseAxis.dim)[0],
	                            value[baseAxis.dim === 'x' || baseAxis.dim === 'radius' ? 0 : 1]
	                        )
	                };
	            });

	            var lastHover = this._lastHover;
	            var api = this._api;
	            // Dispatch downplay action
	            if (lastHover.payloadBatch && !contentNotChange) {
	                api.dispatchAction({
	                    type: 'downplay',
	                    batch: lastHover.payloadBatch
	                });
	            }
	            // Dispatch highlight action
	            if (!contentNotChange) {
	                api.dispatchAction({
	                    type: 'highlight',
	                    batch: payloadBatch
	                });
	                lastHover.payloadBatch = payloadBatch;
	            }
	            // Dispatch showTip action
	            api.dispatchAction({
	                type: 'showTip',
	                dataIndex: payloadBatch[0].dataIndex,
	                seriesIndex: payloadBatch[0].seriesIndex,
	                from: this.uid
	            });

	            if (baseAxis && rootTooltipModel.get('showContent') && rootTooltipModel.get('show')) {

	                var formatter = rootTooltipModel.get('formatter');
	                var positionExpr = rootTooltipModel.get('position');
	                var html;

	                var paramsList = zrUtil.map(seriesList, function (series, index) {
	                    return series.getDataParams(payloadBatch[index].dataIndex);
	                });
	                // If only one series
	                // FIXME
	                // if (paramsList.length === 1) {
	                //     paramsList = paramsList[0];
	                // }

	                tooltipContent.show(rootTooltipModel);

	                // Update html content
	                var firstDataIndex = payloadBatch[0].dataIndex;
	                if (!contentNotChange) {
	                    // Reset ticket
	                    this._ticket = '';
	                    if (!formatter) {
	                        // Default tooltip content
	                        // FIXME
	                        // (1) shold be the first data which has name?
	                        // (2) themeRiver, firstDataIndex is array, and first line is unnecessary.
	                        var firstLine = seriesList[0].getData().getName(firstDataIndex);
	                        html = (firstLine ? firstLine + '<br />' : '')
	                            + zrUtil.map(seriesList, function (series, index) {
	                                return series.formatTooltip(payloadBatch[index].dataIndex, true);
	                            }).join('<br />');
	                    }
	                    else {
	                        if (typeof formatter === 'string') {
	                            html = formatUtil.formatTpl(formatter, paramsList);
	                        }
	                        else if (typeof formatter === 'function') {
	                            var self = this;
	                            var ticket = 'axis_' + coordSys.name + '_' + firstDataIndex;
	                            var callback = function (cbTicket, html) {
	                                if (cbTicket === self._ticket) {
	                                    tooltipContent.setContent(html);

	                                    updatePosition(
	                                        positionExpr, point[0], point[1],
	                                        tooltipContent, paramsList, null, api
	                                    );
	                                }
	                            };
	                            self._ticket = ticket;
	                            html = formatter(paramsList, ticket, callback);
	                        }
	                    }

	                    tooltipContent.setContent(html);
	                }

	                updatePosition(
	                    positionExpr, point[0], point[1],
	                    tooltipContent, paramsList, null, api
	                );
	            }
	        },

	        /**
	         * Show tooltip on item
	         * @param {module:echarts/model/Series} seriesModel
	         * @param {number} dataIndex
	         * @param {string} dataType
	         * @param {Object} e
	         */
	        _showItemTooltipContent: function (seriesModel, dataIndex, dataType, e) {
	            // FIXME Graph data
	            var api = this._api;
	            var data = seriesModel.getData(dataType);
	            var itemModel = data.getItemModel(dataIndex);

	            var rootTooltipModel = this._tooltipModel;

	            var tooltipContent = this._tooltipContent;

	            var tooltipModel = itemModel.getModel('tooltip');

	            // If series model
	            if (tooltipModel.parentModel) {
	                tooltipModel.parentModel.parentModel = rootTooltipModel;
	            }
	            else {
	                tooltipModel.parentModel = this._tooltipModel;
	            }

	            if (tooltipModel.get('showContent') && tooltipModel.get('show')) {
	                var formatter = tooltipModel.get('formatter');
	                var positionExpr = tooltipModel.get('position');
	                var params = seriesModel.getDataParams(dataIndex, dataType);
	                var html;
	                if (!formatter) {
	                    html = seriesModel.formatTooltip(dataIndex, false, dataType);
	                }
	                else {
	                    if (typeof formatter === 'string') {
	                        html = formatUtil.formatTpl(formatter, params);
	                    }
	                    else if (typeof formatter === 'function') {
	                        var self = this;
	                        var ticket = 'item_' + seriesModel.name + '_' + dataIndex;
	                        var callback = function (cbTicket, html) {
	                            if (cbTicket === self._ticket) {
	                                tooltipContent.setContent(html);

	                                updatePosition(
	                                    positionExpr, e.offsetX, e.offsetY,
	                                    tooltipContent, params, e.target, api
	                                );
	                            }
	                        };
	                        self._ticket = ticket;
	                        html = formatter(params, ticket, callback);
	                    }
	                }

	                tooltipContent.show(tooltipModel);
	                tooltipContent.setContent(html);

	                updatePosition(
	                    positionExpr, e.offsetX, e.offsetY,
	                    tooltipContent, params, e.target, api
	                );
	            }
	        },

	        /**
	         * Show axis pointer
	         * @param {string} [coordSysName]
	         */
	        _showAxisPointer: function (coordSysName) {
	            if (coordSysName) {
	                var axisPointers = this._axisPointers[coordSysName];
	                axisPointers && zrUtil.each(axisPointers, function (el) {
	                    el.show();
	                });
	            }
	            else {
	                this.group.eachChild(function (child) {
	                    child.show();
	                });
	                this.group.show();
	            }
	        },

	        _resetLastHover: function () {
	            var lastHover = this._lastHover;
	            if (lastHover.payloadBatch) {
	                this._api.dispatchAction({
	                    type: 'downplay',
	                    batch: lastHover.payloadBatch
	                });
	            }
	            // Reset lastHover
	            this._lastHover = {};
	        },
	        /**
	         * Hide axis pointer
	         * @param {string} [coordSysName]
	         */
	        _hideAxisPointer: function (coordSysName) {
	            if (coordSysName) {
	                var axisPointers = this._axisPointers[coordSysName];
	                axisPointers && zrUtil.each(axisPointers, function (el) {
	                    el.hide();
	                });
	            }
	            else {
	                if (this.group.children().length) {
	                    this.group.hide();
	                }
	            }
	        },

	        _hide: function () {
	            clearTimeout(this._showTimeout);

	            this._hideAxisPointer();
	            this._resetLastHover();
	            if (!this._alwaysShowContent) {
	                this._tooltipContent.hideLater(this._tooltipModel.get('hideDelay'));
	            }

	            this._api.dispatchAction({
	                type: 'hideTip',
	                from: this.uid
	            });

	            this._lastX = this._lastY = null;
	        },

	        dispose: function (ecModel, api) {
	            if (env.node) {
	                return;
	            }
	            var zr = api.getZr();
	            this._tooltipContent.hide();

	            zr.off('click', this._tryShow);
	            zr.off('mousemove', this._mousemove);
	            zr.off('mouseout', this._hide);
	            zr.off('globalout', this._hide);

	            api.off('showTip', this._manuallyShowTip);
	            api.off('hideTip', this._manuallyHideTip);
	        }
	    });
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @module echarts/component/tooltip/TooltipContent
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var zrColor = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/tool/color\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var eventUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/event\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var formatUtil = __webpack_require__(4);
	    var each = zrUtil.each;
	    var toCamelCase = formatUtil.toCamelCase;
	    var env = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/env\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    var vendors = ['', '-webkit-', '-moz-', '-o-'];

	    var gCssText = 'position:absolute;display:block;border-style:solid;white-space:nowrap;z-index:9999999;';

	    /**
	     * @param {number} duration
	     * @return {string}
	     * @inner
	     */
	    function assembleTransition(duration) {
	        var transitionCurve = 'cubic-bezier(0.23, 1, 0.32, 1)';
	        var transitionText = 'left ' + duration + 's ' + transitionCurve + ','
	                            + 'top ' + duration + 's ' + transitionCurve;
	        return zrUtil.map(vendors, function (vendorPrefix) {
	            return vendorPrefix + 'transition:' + transitionText;
	        }).join(';');
	    }

	    /**
	     * @param {Object} textStyle
	     * @return {string}
	     * @inner
	     */
	    function assembleFont(textStyleModel) {
	        var cssText = [];

	        var fontSize = textStyleModel.get('fontSize');
	        var color = textStyleModel.getTextColor();

	        color && cssText.push('color:' + color);

	        cssText.push('font:' + textStyleModel.getFont());

	        fontSize &&
	            cssText.push('line-height:' + Math.round(fontSize * 3 / 2) + 'px');

	        each(['decoration', 'align'], function (name) {
	            var val = textStyleModel.get(name);
	            val && cssText.push('text-' + name + ':' + val);
	        });

	        return cssText.join(';');
	    }

	    /**
	     * @param {Object} tooltipModel
	     * @return {string}
	     * @inner
	     */
	    function assembleCssText(tooltipModel) {

	        tooltipModel = tooltipModel;

	        var cssText = [];

	        var transitionDuration = tooltipModel.get('transitionDuration');
	        var backgroundColor = tooltipModel.get('backgroundColor');
	        var textStyleModel = tooltipModel.getModel('textStyle');
	        var padding = tooltipModel.get('padding');

	        // Animation transition
	        transitionDuration &&
	            cssText.push(assembleTransition(transitionDuration));

	        if (backgroundColor) {
	            if (env.canvasSupported) {
	                cssText.push('background-Color:' + backgroundColor);
	            }
	            else {
	                // for ie
	                cssText.push(
	                    'background-Color:#' + zrColor.toHex(backgroundColor)
	                );
	                cssText.push('filter:alpha(opacity=70)');
	            }
	        }

	        // Border style
	        each(['width', 'color', 'radius'], function (name) {
	            var borderName = 'border-' + name;
	            var camelCase = toCamelCase(borderName);
	            var val = tooltipModel.get(camelCase);
	            val != null &&
	                cssText.push(borderName + ':' + val + (name === 'color' ? '' : 'px'));
	        });

	        // Text style
	        cssText.push(assembleFont(textStyleModel));

	        // Padding
	        if (padding != null) {
	            cssText.push('padding:' + formatUtil.normalizeCssArray(padding).join('px ') + 'px');
	        }

	        return cssText.join(';') + ';';
	    }

	    /**
	     * @alias module:echarts/component/tooltip/TooltipContent
	     * @constructor
	     */
	    function TooltipContent(container, api) {
	        var el = document.createElement('div');
	        var zr = api.getZr();

	        this.el = el;

	        this._x = api.getWidth() / 2;
	        this._y = api.getHeight() / 2;

	        container.appendChild(el);

	        this._container = container;

	        this._show = false;

	        /**
	         * @private
	         */
	        this._hideTimeout;

	        var self = this;
	        el.onmouseenter = function () {
	            // clear the timeout in hideLater and keep showing tooltip
	            if (self.enterable) {
	                clearTimeout(self._hideTimeout);
	                self._show = true;
	            }
	            self._inContent = true;
	        };
	        el.onmousemove = function (e) {
	            if (!self.enterable) {
	                // Try trigger zrender event to avoid mouse
	                // in and out shape too frequently
	                var handler = zr.handler;
	                eventUtil.normalizeEvent(container, e);
	                handler.dispatch('mousemove', e);
	            }
	        };
	        el.onmouseleave = function () {
	            if (self.enterable) {
	                if (self._show) {
	                    self.hideLater(self._hideDelay);
	                }
	            }
	            self._inContent = false;
	        };

	        compromiseMobile(el, container);
	    }

	    function compromiseMobile(tooltipContentEl, container) {
	        // Prevent default behavior on mobile. For example,
	        // default pinch gesture will cause browser zoom.
	        // We do not preventing event on tooltip contnet el,
	        // because user may need customization in tooltip el.
	        eventUtil.addEventListener(container, 'touchstart', preventDefault);
	        eventUtil.addEventListener(container, 'touchmove', preventDefault);
	        eventUtil.addEventListener(container, 'touchend', preventDefault);

	        function preventDefault(e) {
	            if (contains(e.target)) {
	                e.preventDefault();
	            }
	        }

	        function contains(targetEl) {
	            while (targetEl && targetEl !== container) {
	                if (targetEl === tooltipContentEl) {
	                    return true;
	                }
	                targetEl = targetEl.parentNode;
	            }
	        }
	    }

	    TooltipContent.prototype = {

	        constructor: TooltipContent,

	        enterable: true,

	        /**
	         * Update when tooltip is rendered
	         */
	        update: function () {
	            var container = this._container;
	            var stl = container.currentStyle
	                || document.defaultView.getComputedStyle(container);
	            var domStyle = container.style;
	            if (domStyle.position !== 'absolute' && stl.position !== 'absolute') {
	                domStyle.position = 'relative';
	            }
	            // Hide the tooltip
	            // PENDING
	            // this.hide();
	        },

	        show: function (tooltipModel) {
	            clearTimeout(this._hideTimeout);
	            var el = this.el;

	            el.style.cssText = gCssText + assembleCssText(tooltipModel)
	                // http://stackoverflow.com/questions/21125587/css3-transition-not-working-in-chrome-anymore
	                + ';left:' + this._x + 'px;top:' + this._y + 'px;'
	                + (tooltipModel.get('extraCssText') || '');

	            el.style.display = el.innerHTML ?  'block' : 'none';

	            this._show = true;
	        },

	        setContent: function (content) {
	            var el = this.el;
	            el.innerHTML = content;
	            el.style.display = content ? 'block' : 'none';
	        },

	        moveTo: function (x, y) {
	            var style = this.el.style;
	            style.left = x + 'px';
	            style.top = y + 'px';

	            this._x = x;
	            this._y = y;
	        },

	        hide: function () {
	            this.el.style.display = 'none';
	            this._show = false;
	        },

	        // showLater: function ()

	        hideLater: function (time) {
	            if (this._show && !(this._inContent && this.enterable)) {
	                if (time) {
	                    this._hideDelay = time;
	                    // Set show false to avoid invoke hideLater mutiple times
	                    this._show = false;
	                    this._hideTimeout = setTimeout(zrUtil.bind(this.hide, this), time);
	                }
	                else {
	                    this.hide();
	                }
	            }
	        },

	        isShow: function () {
	            return this._show;
	        }
	    };

	    return TooltipContent;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {

	    'use strict';

	    var echarts = __webpack_require__(1);
	    var graphic = __webpack_require__(25);
	    var layout = __webpack_require__(15);

	    // Model
	    echarts.extendComponentModel({

	        type: 'title',

	        layoutMode: {type: 'box', ignoreSize: true},

	        defaultOption: {
	            // 一级层叠
	            zlevel: 0,
	            // 二级层叠
	            z: 6,
	            show: true,

	            text: '',
	            // 超链接跳转
	            // link: null,
	            // 仅支持self | blank
	            target: 'blank',
	            subtext: '',

	            // 超链接跳转
	            // sublink: null,
	            // 仅支持self | blank
	            subtarget: 'blank',

	            // 'center' ¦ 'left' ¦ 'right'
	            // ¦ {number}（x坐标，单位px）
	            left: 0,
	            // 'top' ¦ 'bottom' ¦ 'center'
	            // ¦ {number}（y坐标，单位px）
	            top: 0,

	            // 水平对齐
	            // 'auto' | 'left' | 'right'
	            // 默认根据 x 的位置判断是左对齐还是右对齐
	            //textAlign: null

	            backgroundColor: 'rgba(0,0,0,0)',

	            // 标题边框颜色
	            borderColor: '#ccc',

	            // 标题边框线宽，单位px，默认为0（无边框）
	            borderWidth: 0,

	            // 标题内边距，单位px，默认各方向内边距为5，
	            // 接受数组分别设定上右下左边距，同css
	            padding: 5,

	            // 主副标题纵向间隔，单位px，默认为10，
	            itemGap: 10,
	            textStyle: {
	                fontSize: 18,
	                fontWeight: 'bolder',
	                // 主标题文字颜色
	                color: '#333'
	            },
	            subtextStyle: {
	                // 副标题文字颜色
	                color: '#aaa'
	            }
	        }
	    });

	    // View
	    echarts.extendComponentView({

	        type: 'title',

	        render: function (titleModel, ecModel, api) {
	            this.group.removeAll();

	            if (!titleModel.get('show')) {
	                return;
	            }

	            var group = this.group;

	            var textStyleModel = titleModel.getModel('textStyle');
	            var subtextStyleModel = titleModel.getModel('subtextStyle');

	            var textAlign = titleModel.get('textAlign');

	            var textEl = new graphic.Text({
	                style: {
	                    text: titleModel.get('text'),
	                    textFont: textStyleModel.getFont(),
	                    fill: textStyleModel.getTextColor(),
	                    textBaseline: 'top'
	                },
	                z2: 10
	            });

	            var textRect = textEl.getBoundingRect();

	            var subText = titleModel.get('subtext');
	            var subTextEl = new graphic.Text({
	                style: {
	                    text: subText,
	                    textFont: subtextStyleModel.getFont(),
	                    fill: subtextStyleModel.getTextColor(),
	                    y: textRect.height + titleModel.get('itemGap'),
	                    textBaseline: 'top'
	                },
	                z2: 10
	            });

	            var link = titleModel.get('link');
	            var sublink = titleModel.get('sublink');

	            textEl.silent = !link;
	            subTextEl.silent = !sublink;

	            if (link) {
	                textEl.on('click', function () {
	                    window.open(link, '_' + titleModel.get('target'));
	                });
	            }
	            if (sublink) {
	                subTextEl.on('click', function () {
	                    window.open(sublink, '_' + titleModel.get('subtarget'));
	                });
	            }

	            group.add(textEl);
	            subText && group.add(subTextEl);
	            // If no subText, but add subTextEl, there will be an empty line.

	            var groupRect = group.getBoundingRect();
	            var layoutOption = titleModel.getBoxLayoutParams();
	            layoutOption.width = groupRect.width;
	            layoutOption.height = groupRect.height;
	            var layoutRect = layout.getLayoutRect(
	                layoutOption, {
	                    width: api.getWidth(),
	                    height: api.getHeight()
	                }, titleModel.get('padding')
	            );
	            // Adjust text align based on position
	            if (!textAlign) {
	                // Align left if title is on the left. center and right is same
	                textAlign = titleModel.get('left') || titleModel.get('right');
	                if (textAlign === 'middle') {
	                    textAlign = 'center';
	                }
	                // If textAlign is illegal, canvas render text with textAlign 'left' and 'right'
	                // alternatively (after optimized that ctx.save/restore are not called if no change).
	                if (textAlign !== 'left' && textAlign !== 'right' && textAlign !== 'center') {
	                    textAlign = 'left';
	                }
	                // Adjust layout by text align
	                if (textAlign === 'right') {
	                    layoutRect.x += layoutRect.width;
	                }
	                else if (textAlign === 'center') {
	                    layoutRect.x += layoutRect.width / 2;
	                }
	            }

	            group.attr('position', [layoutRect.x, layoutRect.y]);
	            textEl.setStyle('textAlign', textAlign);
	            subTextEl.setStyle('textAlign', textAlign);

	            // Render background
	            // Get groupRect again because textAlign has been changed
	            groupRect = group.getBoundingRect();
	            var padding = layoutRect.margin;
	            var style = titleModel.getItemStyle(['color', 'opacity']);
	            style.fill = titleModel.get('backgroundColor');
	            var rect = new graphic.Rect({
	                shape: {
	                    x: groupRect.x - padding[3],
	                    y: groupRect.y - padding[0],
	                    width: groupRect.width + padding[1] + padding[3],
	                    height: groupRect.height + padding[0] + padding[2]
	                },
	                style: style,
	                silent: true
	            });
	            graphic.subPixelOptimizeRect(rect);

	            group.add(rect);
	        }
	    });
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * DataZoom component entry
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    __webpack_require__(230);

	    __webpack_require__(231);
	    __webpack_require__(233);

	    __webpack_require__(234);
	    __webpack_require__(235);

	    __webpack_require__(238);
	    __webpack_require__(239);

	    __webpack_require__(241);
	    __webpack_require__(242);

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    __webpack_require__(13).registerSubTypeDefaulter('dataZoom', function (option) {
	        // Default 'slider' when no type specified.
	        return 'slider';
	    });

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @file Data zoom model
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var env = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/env\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var echarts = __webpack_require__(1);
	    var modelUtil = __webpack_require__(3);
	    var AxisProxy = __webpack_require__(232);
	    var each = zrUtil.each;
	    var eachAxisDim = modelUtil.eachAxisDim;

	    var DataZoomModel = echarts.extendComponentModel({

	        type: 'dataZoom',

	        dependencies: [
	            'xAxis', 'yAxis', 'zAxis', 'radiusAxis', 'angleAxis', 'series'
	        ],

	        /**
	         * @protected
	         */
	        defaultOption: {
	            zlevel: 0,
	            z: 4,                   // Higher than normal component (z: 2).
	            orient: null,           // Default auto by axisIndex. Possible value: 'horizontal', 'vertical'.
	            xAxisIndex: null,       // Default all horizontal category axis.
	            yAxisIndex: null,       // Default all vertical category axis.
	            angleAxisIndex: null,
	            radiusAxisIndex: null,
	            filterMode: 'filter',   // Possible values: 'filter' or 'empty'.
	                                    // 'filter': data items which are out of window will be removed.
	                                    //           This option is applicable when filtering outliers.
	                                    // 'empty': data items which are out of window will be set to empty.
	                                    //          This option is applicable when user should not neglect
	                                    //          that there are some data items out of window.
	                                    // Taking line chart as an example, line will be broken in
	                                    // the filtered points when filterModel is set to 'empty', but
	                                    // be connected when set to 'filter'.

	            throttle: null,         // Dispatch action by the fixed rate, avoid frequency.
	                                    // default 100. Do not throttle when use null/undefined.
	                                    // If animation === true and animationDurationUpdate > 0,
	                                    // default value is 100, otherwise 20.
	            start: 0,               // Start percent. 0 ~ 100
	            end: 100,               // End percent. 0 ~ 100
	            startValue: null,       // Start value. If startValue specified, start is ignored.
	            endValue: null          // End value. If endValue specified, end is ignored.
	        },

	        /**
	         * @override
	         */
	        init: function (option, parentModel, ecModel) {

	            /**
	             * key like x_0, y_1
	             * @private
	             * @type {Object}
	             */
	            this._dataIntervalByAxis = {};

	            /**
	             * @private
	             */
	            this._dataInfo = {};

	            /**
	             * key like x_0, y_1
	             * @private
	             */
	            this._axisProxies = {};

	            /**
	             * @readOnly
	             */
	            this.textStyleModel;

	            /**
	             * @private
	             */
	            this._autoThrottle = true;

	            var rawOption = retrieveRaw(option);

	            this.mergeDefaultAndTheme(option, ecModel);

	            this.doInit(rawOption);
	        },

	        /**
	         * @override
	         */
	        mergeOption: function (newOption) {
	            var rawOption = retrieveRaw(newOption);

	            //FIX #2591
	            zrUtil.merge(this.option, newOption, true);

	            this.doInit(rawOption);
	        },

	        /**
	         * @protected
	         */
	        doInit: function (rawOption) {
	            var thisOption = this.option;

	            // Disable realtime view update if canvas is not supported.
	            if (!env.canvasSupported) {
	                thisOption.realtime = false;
	            }

	            this._setDefaultThrottle(rawOption);

	            processRangeProp('start', 'startValue', rawOption, thisOption);
	            processRangeProp('end', 'endValue', rawOption, thisOption);

	            this.textStyleModel = this.getModel('textStyle');

	            this._resetTarget();

	            this._giveAxisProxies();
	        },

	        /**
	         * @private
	         */
	        _giveAxisProxies: function () {
	            var axisProxies = this._axisProxies;

	            this.eachTargetAxis(function (dimNames, axisIndex, dataZoomModel, ecModel) {
	                var axisModel = this.dependentModels[dimNames.axis][axisIndex];

	                // If exists, share axisProxy with other dataZoomModels.
	                var axisProxy = axisModel.__dzAxisProxy || (
	                    // Use the first dataZoomModel as the main model of axisProxy.
	                    axisModel.__dzAxisProxy = new AxisProxy(
	                        dimNames.name, axisIndex, this, ecModel
	                    )
	                );
	                // FIXME
	                // dispose __dzAxisProxy

	                axisProxies[dimNames.name + '_' + axisIndex] = axisProxy;
	            }, this);
	        },

	        /**
	         * @private
	         */
	        _resetTarget: function () {
	            var thisOption = this.option;

	            var autoMode = this._judgeAutoMode();

	            eachAxisDim(function (dimNames) {
	                var axisIndexName = dimNames.axisIndex;
	                thisOption[axisIndexName] = modelUtil.normalizeToArray(
	                    thisOption[axisIndexName]
	                );
	            }, this);

	            if (autoMode === 'axisIndex') {
	                this._autoSetAxisIndex();
	            }
	            else if (autoMode === 'orient') {
	                this._autoSetOrient();
	            }
	        },

	        /**
	         * @private
	         */
	        _judgeAutoMode: function () {
	            // Auto set only works for setOption at the first time.
	            // The following is user's reponsibility. So using merged
	            // option is OK.
	            var thisOption = this.option;

	            var hasIndexSpecified = false;
	            eachAxisDim(function (dimNames) {
	                // When user set axisIndex as a empty array, we think that user specify axisIndex
	                // but do not want use auto mode. Because empty array may be encountered when
	                // some error occured.
	                if (thisOption[dimNames.axisIndex] != null) {
	                    hasIndexSpecified = true;
	                }
	            }, this);

	            var orient = thisOption.orient;

	            if (orient == null && hasIndexSpecified) {
	                return 'orient';
	            }
	            else if (!hasIndexSpecified) {
	                if (orient == null) {
	                    thisOption.orient = 'horizontal';
	                }
	                return 'axisIndex';
	            }
	        },

	        /**
	         * @private
	         */
	        _autoSetAxisIndex: function () {
	            var autoAxisIndex = true;
	            var orient = this.get('orient', true);
	            var thisOption = this.option;

	            if (autoAxisIndex) {
	                // Find axis that parallel to dataZoom as default.
	                var dimNames = orient === 'vertical'
	                    ? {dim: 'y', axisIndex: 'yAxisIndex', axis: 'yAxis'}
	                    : {dim: 'x', axisIndex: 'xAxisIndex', axis: 'xAxis'};

	                if (this.dependentModels[dimNames.axis].length) {
	                    thisOption[dimNames.axisIndex] = [0];
	                    autoAxisIndex = false;
	                }
	            }

	            if (autoAxisIndex) {
	                // Find the first category axis as default. (consider polar)
	                eachAxisDim(function (dimNames) {
	                    if (!autoAxisIndex) {
	                        return;
	                    }
	                    var axisIndices = [];
	                    var axisModels = this.dependentModels[dimNames.axis];
	                    if (axisModels.length && !axisIndices.length) {
	                        for (var i = 0, len = axisModels.length; i < len; i++) {
	                            if (axisModels[i].get('type') === 'category') {
	                                axisIndices.push(i);
	                            }
	                        }
	                    }
	                    thisOption[dimNames.axisIndex] = axisIndices;
	                    if (axisIndices.length) {
	                        autoAxisIndex = false;
	                    }
	                }, this);
	            }

	            if (autoAxisIndex) {
	                // FIXME
	                // 这里是兼容ec2的写法（没指定xAxisIndex和yAxisIndex时把scatter和双数值轴折柱纳入dataZoom控制），
	                // 但是实际是否需要Grid.js#getScaleByOption来判断（考虑time，log等axis type）？

	                // If both dataZoom.xAxisIndex and dataZoom.yAxisIndex is not specified,
	                // dataZoom component auto adopts series that reference to
	                // both xAxis and yAxis which type is 'value'.
	                this.ecModel.eachSeries(function (seriesModel) {
	                    if (this._isSeriesHasAllAxesTypeOf(seriesModel, 'value')) {
	                        eachAxisDim(function (dimNames) {
	                            var axisIndices = thisOption[dimNames.axisIndex];
	                            var axisIndex = seriesModel.get(dimNames.axisIndex);
	                            if (zrUtil.indexOf(axisIndices, axisIndex) < 0) {
	                                axisIndices.push(axisIndex);
	                            }
	                        });
	                    }
	                }, this);
	            }
	        },

	        /**
	         * @private
	         */
	        _autoSetOrient: function () {
	            var dim;

	            // Find the first axis
	            this.eachTargetAxis(function (dimNames) {
	                !dim && (dim = dimNames.name);
	            }, this);

	            this.option.orient = dim === 'y' ? 'vertical' : 'horizontal';
	        },

	        /**
	         * @private
	         */
	        _isSeriesHasAllAxesTypeOf: function (seriesModel, axisType) {
	            // FIXME
	            // 需要series的xAxisIndex和yAxisIndex都首先自动设置上。
	            // 例如series.type === scatter时。

	            var is = true;
	            eachAxisDim(function (dimNames) {
	                var seriesAxisIndex = seriesModel.get(dimNames.axisIndex);
	                var axisModel = this.dependentModels[dimNames.axis][seriesAxisIndex];

	                if (!axisModel || axisModel.get('type') !== axisType) {
	                    is = false;
	                }
	            }, this);
	            return is;
	        },

	        /**
	         * @private
	         */
	        _setDefaultThrottle: function (rawOption) {
	            // When first time user set throttle, auto throttle ends.
	            if (rawOption.hasOwnProperty('throttle')) {
	                this._autoThrottle = false;
	            }
	            if (this._autoThrottle) {
	                var globalOption = this.ecModel.option;
	                this.option.throttle =
	                    (globalOption.animation && globalOption.animationDurationUpdate > 0)
	                    ? 100 : 20;
	            }
	        },

	        /**
	         * @public
	         */
	        getFirstTargetAxisModel: function () {
	            var firstAxisModel;
	            eachAxisDim(function (dimNames) {
	                if (firstAxisModel == null) {
	                    var indices = this.get(dimNames.axisIndex);
	                    if (indices.length) {
	                        firstAxisModel = this.dependentModels[dimNames.axis][indices[0]];
	                    }
	                }
	            }, this);

	            return firstAxisModel;
	        },

	        /**
	         * @public
	         * @param {Function} callback param: axisModel, dimNames, axisIndex, dataZoomModel, ecModel
	         */
	        eachTargetAxis: function (callback, context) {
	            var ecModel = this.ecModel;
	            eachAxisDim(function (dimNames) {
	                each(
	                    this.get(dimNames.axisIndex),
	                    function (axisIndex) {
	                        callback.call(context, dimNames, axisIndex, this, ecModel);
	                    },
	                    this
	                );
	            }, this);
	        },

	        getAxisProxy: function (dimName, axisIndex) {
	            return this._axisProxies[dimName + '_' + axisIndex];
	        },

	        /**
	         * If not specified, set to undefined.
	         *
	         * @public
	         * @param {Object} opt
	         * @param {number} [opt.start]
	         * @param {number} [opt.end]
	         * @param {number} [opt.startValue]
	         * @param {number} [opt.endValue]
	         */
	        setRawRange: function (opt) {
	            each(['start', 'end', 'startValue', 'endValue'], function (name) {
	                // If any of those prop is null/undefined, we should alos set
	                // them, because only one pair between start/end and
	                // startValue/endValue can work.
	                this.option[name] = opt[name];
	            }, this);
	        },

	        /**
	         * @public
	         * @return {Array.<number>} [startPercent, endPercent]
	         */
	        getPercentRange: function () {
	            var axisProxy = this.findRepresentativeAxisProxy();
	            if (axisProxy) {
	                return axisProxy.getDataPercentWindow();
	            }
	        },

	        /**
	         * @public
	         * For example, chart.getModel().getComponent('dataZoom').getValueRange('y', 0);
	         *
	         * @param {string} [axisDimName]
	         * @param {number} [axisIndex]
	         * @return {Array.<number>} [startValue, endValue]
	         */
	        getValueRange: function (axisDimName, axisIndex) {
	            if (axisDimName == null && axisIndex == null) {
	                var axisProxy = this.findRepresentativeAxisProxy();
	                if (axisProxy) {
	                    return axisProxy.getDataValueWindow();
	                }
	            }
	            else {
	                return this.getAxisProxy(axisDimName, axisIndex).getDataValueWindow();
	            }
	        },

	        /**
	         * @public
	         * @return {module:echarts/component/dataZoom/AxisProxy}
	         */
	        findRepresentativeAxisProxy: function () {
	            // Find the first hosted axisProxy
	            var axisProxies = this._axisProxies;
	            for (var key in axisProxies) {
	                if (axisProxies.hasOwnProperty(key) && axisProxies[key].hostedBy(this)) {
	                    return axisProxies[key];
	                }
	            }

	            // If no hosted axis find not hosted axisProxy.
	            // Consider this case: dataZoomModel1 and dataZoomModel2 control the same axis,
	            // and the option.start or option.end settings are different. The percentRange
	            // should follow axisProxy.
	            // (We encounter this problem in toolbox data zoom.)
	            for (var key in axisProxies) {
	                if (axisProxies.hasOwnProperty(key) && !axisProxies[key].hostedBy(this)) {
	                    return axisProxies[key];
	                }
	            }
	        }

	    });

	    function retrieveRaw(option) {
	        var ret = {};
	        each(
	            ['start', 'end', 'startValue', 'endValue', 'throttle'],
	            function (name) {
	                option.hasOwnProperty(name) && (ret[name] = option[name]);
	            }
	        );
	        return ret;
	    }

	    function processRangeProp(percentProp, valueProp, rawOption, thisOption) {
	        // start/end has higher priority over startValue/endValue,
	        // but we should make chart.setOption({endValue: 1000}) effective,
	        // rather than chart.setOption({endValue: 1000, end: null}).
	        if (rawOption[valueProp] != null && rawOption[percentProp] == null) {
	            thisOption[percentProp] = null;
	        }
	        // Otherwise do nothing and use the merge result.
	    }

	    return DataZoomModel;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @file Axis operator
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var numberUtil = __webpack_require__(5);
	    var each = zrUtil.each;
	    var asc = numberUtil.asc;

	    /**
	     * Operate single axis.
	     * One axis can only operated by one axis operator.
	     * Different dataZoomModels may be defined to operate the same axis.
	     * (i.e. 'inside' data zoom and 'slider' data zoom components)
	     * So dataZoomModels share one axisProxy in that case.
	     *
	     * @class
	     */
	    var AxisProxy = function (dimName, axisIndex, dataZoomModel, ecModel) {

	        /**
	         * @private
	         * @type {string}
	         */
	        this._dimName = dimName;

	        /**
	         * @private
	         */
	        this._axisIndex = axisIndex;

	        /**
	         * @private
	         * @type {Array.<number>}
	         */
	        this._valueWindow;

	        /**
	         * @private
	         * @type {Array.<number>}
	         */
	        this._percentWindow;

	        /**
	         * @private
	         * @type {Array.<number>}
	         */
	        this._dataExtent;

	        /**
	         * @readOnly
	         * @type {module: echarts/model/Global}
	         */
	        this.ecModel = ecModel;

	        /**
	         * @private
	         * @type {module: echarts/component/dataZoom/DataZoomModel}
	         */
	        this._dataZoomModel = dataZoomModel;
	    };

	    AxisProxy.prototype = {

	        constructor: AxisProxy,

	        /**
	         * Whether the axisProxy is hosted by dataZoomModel.
	         *
	         * @public
	         * @param {module: echarts/component/dataZoom/DataZoomModel} dataZoomModel
	         * @return {boolean}
	         */
	        hostedBy: function (dataZoomModel) {
	            return this._dataZoomModel === dataZoomModel;
	        },

	        /**
	         * @return {Array.<number>}
	         */
	        getDataExtent: function () {
	            return this._dataExtent.slice();
	        },

	        /**
	         * @return {Array.<number>}
	         */
	        getDataValueWindow: function () {
	            return this._valueWindow.slice();
	        },

	        /**
	         * @return {Array.<number>}
	         */
	        getDataPercentWindow: function () {
	            return this._percentWindow.slice();
	        },

	        /**
	         * @public
	         * @param {number} axisIndex
	         * @return {Array} seriesModels
	         */
	        getTargetSeriesModels: function () {
	            var seriesModels = [];

	            this.ecModel.eachSeries(function (seriesModel) {
	                if (this._axisIndex === seriesModel.get(this._dimName + 'AxisIndex')) {
	                    seriesModels.push(seriesModel);
	                }
	            }, this);

	            return seriesModels;
	        },

	        getAxisModel: function () {
	            return this.ecModel.getComponent(this._dimName + 'Axis', this._axisIndex);
	        },

	        getOtherAxisModel: function () {
	            var axisDim = this._dimName;
	            var ecModel = this.ecModel;
	            var axisModel = this.getAxisModel();
	            var isCartesian = axisDim === 'x' || axisDim === 'y';
	            var otherAxisDim;
	            var coordSysIndexName;
	            if (isCartesian) {
	                coordSysIndexName = 'gridIndex';
	                otherAxisDim = axisDim === 'x' ? 'y' : 'x';
	            }
	            else {
	                coordSysIndexName = 'polarIndex';
	                otherAxisDim = axisDim === 'angle' ? 'radius' : 'angle';
	            }
	            var foundOtherAxisModel;
	            ecModel.eachComponent(otherAxisDim + 'Axis', function (otherAxisModel) {
	                if ((otherAxisModel.get(coordSysIndexName) || 0)
	                    === (axisModel.get(coordSysIndexName) || 0)
	                ) {
	                    foundOtherAxisModel = otherAxisModel;
	                }
	            });
	            return foundOtherAxisModel;
	        },

	        /**
	         * Notice: reset should not be called before series.restoreData() called,
	         * so it is recommanded to be called in "process stage" but not "model init
	         * stage".
	         *
	         * @param {module: echarts/component/dataZoom/DataZoomModel} dataZoomModel
	         */
	        reset: function (dataZoomModel) {
	            if (dataZoomModel !== this._dataZoomModel) {
	                return;
	            }

	            // Culculate data window and data extent, and record them.
	            var dataExtent = this._dataExtent = calculateDataExtent(
	                this._dimName, this.getTargetSeriesModels()
	            );
	            var dataWindow = calculateDataWindow(
	                dataZoomModel.option, dataExtent, this
	            );
	            this._valueWindow = dataWindow.valueWindow;
	            this._percentWindow = dataWindow.percentWindow;

	            // Update axis setting then.
	            setAxisModel(this);
	        },

	        /**
	         * @param {module: echarts/component/dataZoom/DataZoomModel} dataZoomModel
	         */
	        restore: function (dataZoomModel) {
	            if (dataZoomModel !== this._dataZoomModel) {
	                return;
	            }

	            this._valueWindow = this._percentWindow = null;
	            setAxisModel(this, true);
	        },

	        /**
	         * @param {module: echarts/component/dataZoom/DataZoomModel} dataZoomModel
	         */
	        filterData: function (dataZoomModel) {
	            if (dataZoomModel !== this._dataZoomModel) {
	                return;
	            }

	            var axisDim = this._dimName;
	            var seriesModels = this.getTargetSeriesModels();
	            var filterMode = dataZoomModel.get('filterMode');
	            var valueWindow = this._valueWindow;

	            // FIXME
	            // Toolbox may has dataZoom injected. And if there are stacked bar chart
	            // with NaN data, NaN will be filtered and stack will be wrong.
	            // So we need to force the mode to be set empty.
	            // In fect, it is not a big deal that do not support filterMode-'filter'
	            // when using toolbox#dataZoom, utill tooltip#dataZoom support "single axis
	            // selection" some day, which might need "adapt to data extent on the
	            // otherAxis", which is disabled by filterMode-'empty'.
	            var otherAxisModel = this.getOtherAxisModel();
	            if (dataZoomModel.get('$fromToolbox')
	                && otherAxisModel
	                && otherAxisModel.get('type') === 'category'
	            ) {
	                filterMode = 'empty';
	            }

	            // Process series data
	            each(seriesModels, function (seriesModel) {
	                var seriesData = seriesModel.getData();

	                seriesData && each(seriesModel.coordDimToDataDim(axisDim), function (dim) {
	                    if (filterMode === 'empty') {
	                        seriesModel.setData(
	                            seriesData.map(dim, function (value) {
	                                return !isInWindow(value) ? NaN : value;
	                            })
	                        );
	                    }
	                    else {
	                        seriesData.filterSelf(dim, isInWindow);
	                    }
	                });
	            });

	            function isInWindow(value) {
	                return value >= valueWindow[0] && value <= valueWindow[1];
	            }
	        }
	    };

	    function calculateDataExtent(axisDim, seriesModels) {
	        var dataExtent = [Infinity, -Infinity];

	        each(seriesModels, function (seriesModel) {
	            var seriesData = seriesModel.getData();
	            if (seriesData) {
	                each(seriesModel.coordDimToDataDim(axisDim), function (dim) {
	                    var seriesExtent = seriesData.getDataExtent(dim);
	                    seriesExtent[0] < dataExtent[0] && (dataExtent[0] = seriesExtent[0]);
	                    seriesExtent[1] > dataExtent[1] && (dataExtent[1] = seriesExtent[1]);
	                });
	            }
	        }, this);

	        return dataExtent;
	    }

	    function calculateDataWindow(opt, dataExtent, axisProxy) {
	        var axisModel = axisProxy.getAxisModel();
	        var scale = axisModel.axis.scale;
	        var percentExtent = [0, 100];
	        var percentWindow = [
	            opt.start,
	            opt.end
	        ];
	        var valueWindow = [];

	        // In percent range is used and axis min/max/scale is set,
	        // window should be based on min/max/0, but should not be
	        // based on the extent of filtered data.
	        dataExtent = dataExtent.slice();
	        fixExtendByAxis(dataExtent, axisModel, scale);

	        each(['startValue', 'endValue'], function (prop) {
	            valueWindow.push(
	                opt[prop] != null
	                    ? scale.parse(opt[prop])
	                    : null
	            );
	        });

	        // Normalize bound.
	        each([0, 1], function (idx) {
	            var boundValue = valueWindow[idx];
	            var boundPercent = percentWindow[idx];

	            // start/end has higher priority over startValue/endValue,
	            // because start/end can be consistent among different type
	            // of axis but startValue/endValue not.

	            if (boundPercent != null || boundValue == null) {
	                if (boundPercent == null) {
	                    boundPercent = percentExtent[idx];
	                }
	                // Use scale.parse to math round for category or time axis.
	                boundValue = scale.parse(numberUtil.linearMap(
	                    boundPercent, percentExtent, dataExtent, true
	                ));
	            }
	            else { // boundPercent == null && boundValue != null
	                boundPercent = numberUtil.linearMap(
	                    boundValue, dataExtent, percentExtent, true
	                );
	            }
	            // valueWindow[idx] = round(boundValue);
	            // percentWindow[idx] = round(boundPercent);
	            valueWindow[idx] = boundValue;
	            percentWindow[idx] = boundPercent;
	        });

	        return {
	            valueWindow: asc(valueWindow),
	            percentWindow: asc(percentWindow)
	        };
	    }

	    function fixExtendByAxis(dataExtent, axisModel, scale) {
	        each(['min', 'max'], function (minMax, index) {
	            var axisMax = axisModel.get(minMax, true);
	            // Consider 'dataMin', 'dataMax'
	            if (axisMax != null && (axisMax + '').toLowerCase() !== 'data' + minMax) {
	                dataExtent[index] = scale.parse(axisMax);
	            }
	        });

	        if (!axisModel.get('scale', true)) {
	            dataExtent[0] > 0 && (dataExtent[0] = 0);
	            dataExtent[1] < 0 && (dataExtent[1] = 0);
	        }

	        return dataExtent;
	    }

	    function setAxisModel(axisProxy, isRestore) {
	        var axisModel = axisProxy.getAxisModel();

	        var percentWindow = axisProxy._percentWindow;
	        var valueWindow = axisProxy._valueWindow;

	        if (!percentWindow) {
	            return;
	        }

	        var isFull = isRestore || (percentWindow[0] === 0 && percentWindow[1] === 100);
	        // [0, 500]: arbitrary value, guess axis extent.
	        var precision = !isRestore && numberUtil.getPixelPrecision(valueWindow, [0, 500]);
	        // toFixed() digits argument must be between 0 and 20
	        var invalidPrecision = !isRestore && !(precision < 20 && precision >= 0);

	        var useOrigin = isRestore || isFull || invalidPrecision;

	        axisModel.setRange && axisModel.setRange(
	            useOrigin ? null : +valueWindow[0].toFixed(precision),
	            useOrigin ? null : +valueWindow[1].toFixed(precision)
	        );
	    }

	    return AxisProxy;

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var ComponentView = __webpack_require__(23);

	    return ComponentView.extend({

	        type: 'dataZoom',

	        render: function (dataZoomModel, ecModel, api, payload) {
	            this.dataZoomModel = dataZoomModel;
	            this.ecModel = ecModel;
	            this.api = api;
	        },

	        /**
	         * Find the first target coordinate system.
	         *
	         * @protected
	         * @return {Object} {
	         *                   cartesians: [
	         *                       {model: coord0, axisModels: [axis1, axis3], coordIndex: 1},
	         *                       {model: coord1, axisModels: [axis0, axis2], coordIndex: 0},
	         *                       ...
	         *                   ],  // cartesians must not be null/undefined.
	         *                   polars: [
	         *                       {model: coord0, axisModels: [axis4], coordIndex: 0},
	         *                       ...
	         *                   ],  // polars must not be null/undefined.
	         *                   axisModels: [axis0, axis1, axis2, axis3, axis4]
	         *                       // axisModels must not be null/undefined.
	         *                  }
	         */
	        getTargetInfo: function () {
	            var dataZoomModel = this.dataZoomModel;
	            var ecModel = this.ecModel;
	            var cartesians = [];
	            var polars = [];
	            var axisModels = [];

	            dataZoomModel.eachTargetAxis(function (dimNames, axisIndex) {
	                var axisModel = ecModel.getComponent(dimNames.axis, axisIndex);
	                if (axisModel) {
	                    axisModels.push(axisModel);

	                    var gridIndex = axisModel.get('gridIndex');
	                    var polarIndex = axisModel.get('polarIndex');

	                    if (gridIndex != null) {
	                        var coordModel = ecModel.getComponent('grid', gridIndex);
	                        save(coordModel, axisModel, cartesians, gridIndex);
	                    }
	                    else if (polarIndex != null) {
	                        var coordModel = ecModel.getComponent('polar', polarIndex);
	                        save(coordModel, axisModel, polars, polarIndex);
	                    }
	                }
	            }, this);

	            function save(coordModel, axisModel, store, coordIndex) {
	                var item;
	                for (var i = 0; i < store.length; i++) {
	                    if (store[i].model === coordModel) {
	                        item = store[i];
	                        break;
	                    }
	                }
	                if (!item) {
	                    store.push(item = {
	                        model: coordModel, axisModels: [], coordIndex: coordIndex
	                    });
	                }
	                item.axisModels.push(axisModel);
	            }

	            return {
	                cartesians: cartesians,
	                polars: polars,
	                axisModels: axisModels
	            };
	        }

	    });

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @file Data zoom model
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {

	    var DataZoomModel = __webpack_require__(231);

	    var SliderZoomModel = DataZoomModel.extend({

	        type: 'dataZoom.slider',

	        layoutMode: 'box',

	        /**
	         * @protected
	         */
	        defaultOption: {
	            show: true,

	            // ph => placeholder. Using placehoder here because
	            // deault value can only be drived in view stage.
	            right: 'ph',  // Default align to grid rect.
	            top: 'ph',    // Default align to grid rect.
	            width: 'ph',  // Default align to grid rect.
	            height: 'ph', // Default align to grid rect.
	            left: null,   // Default align to grid rect.
	            bottom: null, // Default align to grid rect.

	            backgroundColor: 'rgba(47,69,84,0)',    // Background of slider zoom component.
	            // dataBackgroundColor: '#ddd',         // Background coor of data shadow and border of box,
	                                                    // highest priority, remain for compatibility of
	                                                    // previous version, but not recommended any more.
	            dataBackground: {
	                lineStyle: {
	                    color: '#2f4554',
	                    width: 0.5,
	                    opacity: 0.3
	                },
	                areaStyle: {
	                    color: 'rgba(47,69,84,0.3)',
	                    opacity: 0.3
	                }
	            },
	            borderColor: '#ddd',                    // border color of the box. For compatibility,
	                                                    // if dataBackgroundColor is set, borderColor
	                                                    // is ignored.

	            fillerColor: 'rgba(167,183,204,0.4)',     // Color of selected area.
	            // handleColor: 'rgba(89,170,216,0.95)',     // Color of handle.
	            // handleIcon: 'path://M4.9,17.8c0-1.4,4.5-10.5,5.5-12.4c0-0.1,0.6-1.1,0.9-1.1c0.4,0,0.9,1,0.9,1.1c1.1,2.2,5.4,11,5.4,12.4v17.8c0,1.5-0.6,2.1-1.3,2.1H6.1c-0.7,0-1.3-0.6-1.3-2.1V17.8z',
	            handleIcon: 'M8.2,13.6V3.9H6.3v9.7H3.1v14.9h3.3v9.7h1.8v-9.7h3.3V13.6H8.2z M9.7,24.4H4.8v-1.4h4.9V24.4z M9.7,19.1H4.8v-1.4h4.9V19.1z',
	            // Percent of the slider height
	            handleSize: '100%',

	            handleStyle: {
	                color: '#a7b7cc'
	            },

	            labelPrecision: null,
	            labelFormatter: null,
	            showDetail: true,
	            showDataShadow: 'auto',                 // Default auto decision.
	            realtime: true,
	            zoomLock: false,                        // Whether disable zoom.
	            textStyle: {
	                color: '#333'
	            }
	        }

	    });

	    return SliderZoomModel;

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var graphic = __webpack_require__(25);
	    var throttle = __webpack_require__(236);
	    var DataZoomView = __webpack_require__(233);
	    var Rect = graphic.Rect;
	    var numberUtil = __webpack_require__(5);
	    var linearMap = numberUtil.linearMap;
	    var layout = __webpack_require__(15);
	    var sliderMove = __webpack_require__(237);
	    var asc = numberUtil.asc;
	    var bind = zrUtil.bind;
	    // var mathMax = Math.max;
	    var each = zrUtil.each;

	    // Constants
	    var DEFAULT_LOCATION_EDGE_GAP = 7;
	    var DEFAULT_FRAME_BORDER_WIDTH = 1;
	    var DEFAULT_FILLER_SIZE = 30;
	    var HORIZONTAL = 'horizontal';
	    var VERTICAL = 'vertical';
	    var LABEL_GAP = 5;
	    var SHOW_DATA_SHADOW_SERIES_TYPE = ['line', 'bar', 'candlestick', 'scatter'];

	    var SliderZoomView = DataZoomView.extend({

	        type: 'dataZoom.slider',

	        init: function (ecModel, api) {

	            /**
	             * @private
	             * @type {Object}
	             */
	            this._displayables = {};

	            /**
	             * @private
	             * @type {string}
	             */
	            this._orient;

	            /**
	             * [0, 100]
	             * @private
	             */
	            this._range;

	            /**
	             * [coord of the first handle, coord of the second handle]
	             * @private
	             */
	            this._handleEnds;

	            /**
	             * [length, thick]
	             * @private
	             * @type {Array.<number>}
	             */
	            this._size;

	            /**
	             * @private
	             * @type {number}
	             */
	            this._handleWidth;

	            /**
	             * @private
	             * @type {number}
	             */
	            this._handleHeight;

	            /**
	             * @private
	             */
	            this._location;

	            /**
	             * @private
	             */
	            this._dragging;

	            /**
	             * @private
	             */
	            this._dataShadowInfo;

	            this.api = api;
	        },

	        /**
	         * @override
	         */
	        render: function (dataZoomModel, ecModel, api, payload) {
	            SliderZoomView.superApply(this, 'render', arguments);

	            throttle.createOrUpdate(
	                this,
	                '_dispatchZoomAction',
	                this.dataZoomModel.get('throttle'),
	                'fixRate'
	            );

	            this._orient = dataZoomModel.get('orient');

	            if (this.dataZoomModel.get('show') === false) {
	                this.group.removeAll();
	                return;
	            }

	            // Notice: this._resetInterval() should not be executed when payload.type
	            // is 'dataZoom', origin this._range should be maintained, otherwise 'pan'
	            // or 'zoom' info will be missed because of 'throttle' of this.dispatchAction,
	            if (!payload || payload.type !== 'dataZoom' || payload.from !== this.uid) {
	                this._buildView();
	            }

	            this._updateView();
	        },

	        /**
	         * @override
	         */
	        remove: function () {
	            SliderZoomView.superApply(this, 'remove', arguments);
	            throttle.clear(this, '_dispatchZoomAction');
	        },

	        /**
	         * @override
	         */
	        dispose: function () {
	            SliderZoomView.superApply(this, 'dispose', arguments);
	            throttle.clear(this, '_dispatchZoomAction');
	        },

	        _buildView: function () {
	            var thisGroup = this.group;

	            thisGroup.removeAll();

	            this._resetLocation();
	            this._resetInterval();

	            var barGroup = this._displayables.barGroup = new graphic.Group();

	            this._renderBackground();

	            this._renderHandle();

	            this._renderDataShadow();

	            thisGroup.add(barGroup);

	            this._positionGroup();
	        },

	        /**
	         * @private
	         */
	        _resetLocation: function () {
	            var dataZoomModel = this.dataZoomModel;
	            var api = this.api;

	            // If some of x/y/width/height are not specified,
	            // auto-adapt according to target grid.
	            var coordRect = this._findCoordRect();
	            var ecSize = {width: api.getWidth(), height: api.getHeight()};
	            // Default align by coordinate system rect.
	            var positionInfo = this._orient === HORIZONTAL
	                ? {
	                    // Why using 'right', because right should be used in vertical,
	                    // and it is better to be consistent for dealing with position param merge.
	                    right: ecSize.width - coordRect.x - coordRect.width,
	                    top: (ecSize.height - DEFAULT_FILLER_SIZE - DEFAULT_LOCATION_EDGE_GAP),
	                    width: coordRect.width,
	                    height: DEFAULT_FILLER_SIZE
	                }
	                : { // vertical
	                    right: DEFAULT_LOCATION_EDGE_GAP,
	                    top: coordRect.y,
	                    width: DEFAULT_FILLER_SIZE,
	                    height: coordRect.height
	                };

	            // Do not write back to option and replace value 'ph', because
	            // the 'ph' value should be recalculated when resize.
	            var layoutParams = layout.getLayoutParams(dataZoomModel.option);

	            // Replace the placeholder value.
	            zrUtil.each(['right', 'top', 'width', 'height'], function (name) {
	                if (layoutParams[name] === 'ph') {
	                    layoutParams[name] = positionInfo[name];
	                }
	            });

	            var layoutRect = layout.getLayoutRect(
	                layoutParams,
	                ecSize,
	                dataZoomModel.padding
	            );

	            this._location = {x: layoutRect.x, y: layoutRect.y};
	            this._size = [layoutRect.width, layoutRect.height];
	            this._orient === VERTICAL && this._size.reverse();
	        },

	        /**
	         * @private
	         */
	        _positionGroup: function () {
	            var thisGroup = this.group;
	            var location = this._location;
	            var orient = this._orient;

	            // Just use the first axis to determine mapping.
	            var targetAxisModel = this.dataZoomModel.getFirstTargetAxisModel();
	            var inverse = targetAxisModel && targetAxisModel.get('inverse');

	            var barGroup = this._displayables.barGroup;
	            var otherAxisInverse = (this._dataShadowInfo || {}).otherAxisInverse;

	            // Transform barGroup.
	            barGroup.attr(
	                (orient === HORIZONTAL && !inverse)
	                ? {scale: otherAxisInverse ? [1, 1] : [1, -1]}
	                : (orient === HORIZONTAL && inverse)
	                ? {scale: otherAxisInverse ? [-1, 1] : [-1, -1]}
	                : (orient === VERTICAL && !inverse)
	                ? {scale: otherAxisInverse ? [1, -1] : [1, 1], rotation: Math.PI / 2}
	                // Dont use Math.PI, considering shadow direction.
	                : {scale: otherAxisInverse ? [-1, -1] : [-1, 1], rotation: Math.PI / 2}
	            );

	            // Position barGroup
	            var rect = thisGroup.getBoundingRect([barGroup]);
	            thisGroup.attr('position', [location.x - rect.x, location.y - rect.y]);
	        },

	        /**
	         * @private
	         */
	        _getViewExtent: function () {
	            return [0, this._size[0]];
	        },

	        _renderBackground : function () {
	            var dataZoomModel = this.dataZoomModel;
	            var size = this._size;

	            this._displayables.barGroup.add(new Rect({
	                silent: true,
	                shape: {
	                    x: 0, y: 0, width: size[0], height: size[1]
	                },
	                style: {
	                    fill: dataZoomModel.get('backgroundColor')
	                },
	                z2: -40
	            }));
	        },

	        _renderDataShadow: function () {
	            var info = this._dataShadowInfo = this._prepareDataShadowInfo();

	            if (!info) {
	                return;
	            }

	            var size = this._size;
	            var seriesModel = info.series;
	            var data = seriesModel.getRawData();
	            var otherDim = seriesModel.getShadowDim
	                ? seriesModel.getShadowDim() // @see candlestick
	                : info.otherDim;

	            var otherDataExtent = data.getDataExtent(otherDim);
	            // Nice extent.
	            var otherOffset = (otherDataExtent[1] - otherDataExtent[0]) * 0.3;
	            otherDataExtent = [
	                otherDataExtent[0] - otherOffset,
	                otherDataExtent[1] + otherOffset
	            ];
	            var otherShadowExtent = [0, size[1]];

	            var thisShadowExtent = [0, size[0]];

	            var areaPoints = [[size[0], 0], [0, 0]];
	            var linePoints = [];
	            var step = thisShadowExtent[1] / (data.count() - 1);
	            var thisCoord = 0;

	            // Optimize for large data shadow
	            var stride = Math.round(data.count() / size[0]);
	            data.each([otherDim], function (value, index) {
	                if (stride > 0 && (index % stride)) {
	                    thisCoord += step;
	                    return;
	                }
	                // FIXME
	                // 应该使用统计的空判断？还是在list里进行空判断？
	                var otherCoord = (value == null || isNaN(value) || value === '')
	                    ? null
	                    : linearMap(value, otherDataExtent, otherShadowExtent, true);
	                if (otherCoord != null) {
	                    areaPoints.push([thisCoord, otherCoord]);
	                    linePoints.push([thisCoord, otherCoord]);
	                }

	                thisCoord += step;
	            });

	            var dataZoomModel = this.dataZoomModel;
	            // var dataBackgroundModel = dataZoomModel.getModel('dataBackground');
	            this._displayables.barGroup.add(new graphic.Polygon({
	                shape: {points: areaPoints},
	                style: zrUtil.defaults(
	                    {fill: dataZoomModel.get('dataBackgroundColor')},
	                    dataZoomModel.getModel('dataBackground.areaStyle').getAreaStyle()
	                ),
	                silent: true,
	                z2: -20
	            }));
	            this._displayables.barGroup.add(new graphic.Polyline({
	                shape: {points: linePoints},
	                style: dataZoomModel.getModel('dataBackground.lineStyle').getLineStyle(),
	                silent: true,
	                z2: -19
	            }));
	        },

	        _prepareDataShadowInfo: function () {
	            var dataZoomModel = this.dataZoomModel;
	            var showDataShadow = dataZoomModel.get('showDataShadow');

	            if (showDataShadow === false) {
	                return;
	            }

	            // Find a representative series.
	            var result;
	            var ecModel = this.ecModel;

	            dataZoomModel.eachTargetAxis(function (dimNames, axisIndex) {
	                var seriesModels = dataZoomModel
	                    .getAxisProxy(dimNames.name, axisIndex)
	                    .getTargetSeriesModels();

	                zrUtil.each(seriesModels, function (seriesModel) {
	                    if (result) {
	                        return;
	                    }

	                    if (showDataShadow !== true && zrUtil.indexOf(
	                            SHOW_DATA_SHADOW_SERIES_TYPE, seriesModel.get('type')
	                        ) < 0
	                    ) {
	                        return;
	                    }

	                    var otherDim = getOtherDim(dimNames.name);

	                    var thisAxis = ecModel.getComponent(dimNames.axis, axisIndex).axis;

	                    result = {
	                        thisAxis: thisAxis,
	                        series: seriesModel,
	                        thisDim: dimNames.name,
	                        otherDim: otherDim,
	                        otherAxisInverse: seriesModel
	                            .coordinateSystem.getOtherAxis(thisAxis).inverse
	                    };

	                }, this);

	            }, this);

	            return result;
	        },

	        _renderHandle: function () {
	            var displaybles = this._displayables;
	            var handles = displaybles.handles = [];
	            var handleLabels = displaybles.handleLabels = [];
	            var barGroup = this._displayables.barGroup;
	            var size = this._size;
	            var dataZoomModel = this.dataZoomModel;

	            barGroup.add(displaybles.filler = new Rect({
	                draggable: true,
	                cursor: 'move',
	                drift: bind(this._onDragMove, this, 'all'),
	                ondragstart: bind(this._showDataInfo, this, true),
	                ondragend: bind(this._onDragEnd, this),
	                onmouseover: bind(this._showDataInfo, this, true),
	                onmouseout: bind(this._showDataInfo, this, false),
	                style: {
	                    fill: dataZoomModel.get('fillerColor'),
	                    textPosition : 'inside'
	                }
	            }));

	            // Frame border.
	            barGroup.add(new Rect(graphic.subPixelOptimizeRect({
	                silent: true,
	                shape: {
	                    x: 0,
	                    y: 0,
	                    width: size[0],
	                    height: size[1]
	                },
	                style: {
	                    stroke: dataZoomModel.get('dataBackgroundColor')
	                        || dataZoomModel.get('borderColor'),
	                    lineWidth: DEFAULT_FRAME_BORDER_WIDTH,
	                    fill: 'rgba(0,0,0,0)'
	                }
	            })));

	            var iconStr = dataZoomModel.get('handleIcon');
	            each([0, 1], function (handleIndex) {
	                var path = graphic.makePath(iconStr, {
	                    style: {
	                        strokeNoScale: true
	                    },
	                    rectHover: true,
	                    cursor: this._orient === 'vertical' ? 'ns-resize' : 'ew-resize',
	                    draggable: true,
	                    drift: bind(this._onDragMove, this, handleIndex),
	                    ondragend: bind(this._onDragEnd, this),
	                    onmouseover: bind(this._showDataInfo, this, true),
	                    onmouseout: bind(this._showDataInfo, this, false)
	                }, {
	                    x: -0.5,
	                    y: 0,
	                    width: 1,
	                    height: 1
	                }, 'center');

	                var bRect = path.getBoundingRect();
	                this._handleHeight = numberUtil.parsePercent(dataZoomModel.get('handleSize'), this._size[1]);
	                this._handleWidth = bRect.width / bRect.height * this._handleHeight;

	                path.setStyle(dataZoomModel.getModel('handleStyle').getItemStyle());
	                var handleColor = dataZoomModel.get('handleColor');
	                // Compatitable with previous version
	                if (handleColor != null) {
	                    path.style.fill = handleColor;
	                }

	                barGroup.add(handles[handleIndex] = path);

	                var textStyleModel = dataZoomModel.textStyleModel;

	                this.group.add(
	                    handleLabels[handleIndex] = new graphic.Text({
	                    silent: true,
	                    invisible: true,
	                    style: {
	                        x: 0, y: 0, text: '',
	                        textVerticalAlign: 'middle',
	                        textAlign: 'center',
	                        fill: textStyleModel.getTextColor(),
	                        textFont: textStyleModel.getFont()
	                    },
	                    z2: 10
	                }));

	            }, this);
	        },

	        /**
	         * @private
	         */
	        _resetInterval: function () {
	            var range = this._range = this.dataZoomModel.getPercentRange();
	            var viewExtent = this._getViewExtent();

	            this._handleEnds = [
	                linearMap(range[0], [0, 100], viewExtent, true),
	                linearMap(range[1], [0, 100], viewExtent, true)
	            ];
	        },

	        /**
	         * @private
	         * @param {(number|string)} handleIndex 0 or 1 or 'all'
	         * @param {number} dx
	         * @param {number} dy
	         */
	        _updateInterval: function (handleIndex, delta) {
	            var handleEnds = this._handleEnds;
	            var viewExtend = this._getViewExtent();

	            sliderMove(
	                delta,
	                handleEnds,
	                viewExtend,
	                (handleIndex === 'all' || this.dataZoomModel.get('zoomLock'))
	                    ? 'rigid' : 'cross',
	                handleIndex
	            );

	            this._range = asc([
	                linearMap(handleEnds[0], viewExtend, [0, 100], true),
	                linearMap(handleEnds[1], viewExtend, [0, 100], true)
	            ]);
	        },

	        /**
	         * @private
	         */
	        _updateView: function () {
	            var displaybles = this._displayables;
	            var handleEnds = this._handleEnds;
	            var handleInterval = asc(handleEnds.slice());
	            var size = this._size;

	            each([0, 1], function (handleIndex) {
	                // Handles
	                var handle = displaybles.handles[handleIndex];
	                var handleHeight = this._handleHeight;
	                handle.attr({
	                    scale: [handleHeight, handleHeight],
	                    position: [handleEnds[handleIndex], size[1] / 2 - handleHeight / 2]
	                });
	            }, this);

	            // Filler
	            displaybles.filler.setShape({
	                x: handleInterval[0],
	                y: 0,
	                width: handleInterval[1] - handleInterval[0],
	                height: size[1]
	            });

	            this._updateDataInfo();
	        },

	        /**
	         * @private
	         */
	        _updateDataInfo: function () {
	            var dataZoomModel = this.dataZoomModel;
	            var displaybles = this._displayables;
	            var handleLabels = displaybles.handleLabels;
	            var orient = this._orient;
	            var labelTexts = ['', ''];

	            // FIXME
	            // date型，支持formatter，autoformatter（ec2 date.getAutoFormatter）
	            if (dataZoomModel.get('showDetail')) {
	                var dataInterval;
	                var axis;
	                dataZoomModel.eachTargetAxis(function (dimNames, axisIndex) {
	                    // Using dataInterval of the first axis.
	                    if (!dataInterval) {
	                        dataInterval = dataZoomModel
	                            .getAxisProxy(dimNames.name, axisIndex)
	                            .getDataValueWindow();
	                        axis = this.ecModel.getComponent(dimNames.axis, axisIndex).axis;
	                    }
	                }, this);

	                if (dataInterval) {
	                    labelTexts = [
	                        this._formatLabel(dataInterval[0], axis),
	                        this._formatLabel(dataInterval[1], axis)
	                    ];
	                }
	            }

	            var orderedHandleEnds = asc(this._handleEnds.slice());

	            setLabel.call(this, 0);
	            setLabel.call(this, 1);

	            function setLabel(handleIndex) {
	                // Label
	                // Text should not transform by barGroup.
	                // Ignore handlers transform
	                var barTransform = graphic.getTransform(
	                    displaybles.handles[handleIndex].parent, this.group
	                );
	                var direction = graphic.transformDirection(
	                    handleIndex === 0 ? 'right' : 'left', barTransform
	                );
	                var offset = this._handleWidth / 2 + LABEL_GAP;
	                var textPoint = graphic.applyTransform(
	                    [
	                        orderedHandleEnds[handleIndex] + (handleIndex === 0 ? -offset : offset),
	                        this._size[1] / 2
	                    ],
	                    barTransform
	                );
	                handleLabels[handleIndex].setStyle({
	                    x: textPoint[0],
	                    y: textPoint[1],
	                    textVerticalAlign: orient === HORIZONTAL ? 'middle' : direction,
	                    textAlign: orient === HORIZONTAL ? direction : 'center',
	                    text: labelTexts[handleIndex]
	                });
	            }
	        },

	        /**
	         * @private
	         */
	        _formatLabel: function (value, axis) {
	            var dataZoomModel = this.dataZoomModel;
	            var labelFormatter = dataZoomModel.get('labelFormatter');
	            if (zrUtil.isFunction(labelFormatter)) {
	                return labelFormatter(value);
	            }

	            var labelPrecision = dataZoomModel.get('labelPrecision');
	            if (labelPrecision == null || labelPrecision === 'auto') {
	                labelPrecision = axis.getPixelPrecision();
	            }

	            value = (value == null && isNaN(value))
	                ? ''
	                // FIXME Glue code
	                : (axis.type === 'category' || axis.type === 'time')
	                    ? axis.scale.getLabel(Math.round(value))
	                    // param of toFixed should less then 20.
	                    : value.toFixed(Math.min(labelPrecision, 20));

	            if (zrUtil.isString(labelFormatter)) {
	                value = labelFormatter.replace('{value}', value);
	            }

	            return value;
	        },

	        /**
	         * @private
	         * @param {boolean} showOrHide true: show, false: hide
	         */
	        _showDataInfo: function (showOrHide) {
	            // Always show when drgging.
	            showOrHide = this._dragging || showOrHide;

	            var handleLabels = this._displayables.handleLabels;
	            handleLabels[0].attr('invisible', !showOrHide);
	            handleLabels[1].attr('invisible', !showOrHide);
	        },

	        _onDragMove: function (handleIndex, dx, dy) {
	            this._dragging = true;

	            // Transform dx, dy to bar coordination.
	            var vertex = this._applyBarTransform([dx, dy], true);

	            this._updateInterval(handleIndex, vertex[0]);
	            this._updateView();

	            if (this.dataZoomModel.get('realtime')) {
	                this._dispatchZoomAction();
	            }
	        },

	        _onDragEnd: function () {
	            this._dragging = false;
	            this._showDataInfo(false);
	            this._dispatchZoomAction();
	        },

	        /**
	         * This action will be throttled.
	         * @private
	         */
	        _dispatchZoomAction: function () {
	            var range = this._range;

	            this.api.dispatchAction({
	                type: 'dataZoom',
	                from: this.uid,
	                dataZoomId: this.dataZoomModel.id,
	                start: range[0],
	                end: range[1]
	            });
	        },

	        /**
	         * @private
	         */
	        _applyBarTransform: function (vertex, inverse) {
	            var barTransform = this._displayables.barGroup.getLocalTransform();
	            return graphic.applyTransform(vertex, barTransform, inverse);
	        },

	        /**
	         * @private
	         */
	        _findCoordRect: function () {
	            // Find the grid coresponding to the first axis referred by dataZoom.
	            var targetInfo = this.getTargetInfo();

	            // FIXME
	            // 判断是catesian还是polar
	            var rect;
	            if (targetInfo.cartesians.length) {
	                rect = targetInfo.cartesians[0].model.coordinateSystem.getRect();
	            }
	            else { // Polar
	                // FIXME
	                // 暂时随便写的
	                var width = this.api.getWidth();
	                var height = this.api.getHeight();
	                rect = {
	                    x: width * 0.2,
	                    y: height * 0.2,
	                    width: width * 0.6,
	                    height: height * 0.6
	                };
	            }

	            return rect;
	        }

	    });

	    function getOtherDim(thisDim) {
	        // FIXME
	        // 这个逻辑和getOtherAxis里一致，但是写在这里是否不好
	        return thisDim === 'x' ? 'y' : 'x';
	    }

	    return SliderZoomView;

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	    var lib = {};

	    var ORIGIN_METHOD = '\0__throttleOriginMethod';
	    var RATE = '\0__throttleRate';
	    var THROTTLE_TYPE = '\0__throttleType';

	    /**
	     * @public
	     * @param {(Function)} fn
	     * @param {number} [delay=0] Unit: ms.
	     * @param {boolean} [debounce=false]
	     *        true: If call interval less than `delay`, only the last call works.
	     *        false: If call interval less than `delay, call works on fixed rate.
	     * @return {(Function)} throttled fn.
	     */
	    lib.throttle = function (fn, delay, debounce) {

	        var currCall;
	        var lastCall = 0;
	        var lastExec = 0;
	        var timer = null;
	        var diff;
	        var scope;
	        var args;

	        delay = delay || 0;

	        function exec() {
	            lastExec = (new Date()).getTime();
	            timer = null;
	            fn.apply(scope, args || []);
	        }

	        var cb = function () {
	            currCall = (new Date()).getTime();
	            scope = this;
	            args = arguments;
	            diff = currCall - (debounce ? lastCall : lastExec) - delay;

	            clearTimeout(timer);

	            if (debounce) {
	                timer = setTimeout(exec, delay);
	            }
	            else {
	                if (diff >= 0) {
	                    exec();
	                }
	                else {
	                    timer = setTimeout(exec, -diff);
	                }
	            }

	            lastCall = currCall;
	        };

	        /**
	         * Clear throttle.
	         * @public
	         */
	        cb.clear = function () {
	            if (timer) {
	                clearTimeout(timer);
	                timer = null;
	            }
	        };

	        return cb;
	    };

	    /**
	     * Create throttle method or update throttle rate.
	     *
	     * @example
	     * ComponentView.prototype.render = function () {
	     *     ...
	     *     throttle.createOrUpdate(
	     *         this,
	     *         '_dispatchAction',
	     *         this.model.get('throttle'),
	     *         'fixRate'
	     *     );
	     * };
	     * ComponentView.prototype.remove = function () {
	     *     throttle.clear(this, '_dispatchAction');
	     * };
	     * ComponentView.prototype.dispose = function () {
	     *     throttle.clear(this, '_dispatchAction');
	     * };
	     *
	     * @public
	     * @param {Object} obj
	     * @param {string} fnAttr
	     * @param {number} [rate]
	     * @param {string} [throttleType='fixRate'] 'fixRate' or 'debounce'
	     * @return {Function} throttled function.
	     */
	    lib.createOrUpdate = function (obj, fnAttr, rate, throttleType) {
	        var fn = obj[fnAttr];

	        if (!fn) {
	            return;
	        }

	        var originFn = fn[ORIGIN_METHOD] || fn;
	        var lastThrottleType = fn[THROTTLE_TYPE];
	        var lastRate = fn[RATE];

	        if (lastRate !== rate || lastThrottleType !== throttleType) {
	            if (rate == null || !throttleType) {
	                return (obj[fnAttr] = originFn);
	            }

	            fn = obj[fnAttr] = lib.throttle(
	                originFn, rate, throttleType === 'debounce'
	            );
	            fn[ORIGIN_METHOD] = originFn;
	            fn[THROTTLE_TYPE] = throttleType;
	            fn[RATE] = rate;
	        }

	        return fn;
	    };

	    /**
	     * Clear throttle. Example see throttle.createOrUpdate.
	     *
	     * @public
	     * @param {Object} obj
	     * @param {string} fnAttr
	     */
	    lib.clear = function (obj, fnAttr) {
	        var fn = obj[fnAttr];
	        if (fn && fn[ORIGIN_METHOD]) {
	            obj[fnAttr] = fn[ORIGIN_METHOD];
	        }
	    };

	    return lib;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    /**
	     * Calculate slider move result.
	     *
	     * @param {number} delta Move length.
	     * @param {Array.<number>} handleEnds handleEnds[0] and be bigger then handleEnds[1].
	     *                                    handleEnds will be modified in this method.
	     * @param {Array.<number>} extent handleEnds is restricted by extent.
	     *                                extent[0] should less or equals than extent[1].
	     * @param {string} mode 'rigid': Math.abs(handleEnds[0] - handleEnds[1]) remain unchanged,
	     *                      'cross' handleEnds[0] can be bigger then handleEnds[1],
	     *                      'push' handleEnds[0] can not be bigger then handleEnds[1],
	     *                              when they touch, one push other.
	     * @param {number} handleIndex If mode is 'rigid', handleIndex is not required.
	     * @param {Array.<number>} The input handleEnds.
	     */
	    return function (delta, handleEnds, extent, mode, handleIndex) {
	        if (!delta) {
	            return handleEnds;
	        }

	        if (mode === 'rigid') {
	            delta = getRealDelta(delta, handleEnds, extent);
	            handleEnds[0] += delta;
	            handleEnds[1] += delta;
	        }
	        else {
	            delta = getRealDelta(delta, handleEnds[handleIndex], extent);
	            handleEnds[handleIndex] += delta;

	            if (mode === 'push' && handleEnds[0] > handleEnds[1]) {
	                handleEnds[1 - handleIndex] = handleEnds[handleIndex];
	            }
	        }

	        return handleEnds;

	        function getRealDelta(delta, handleEnds, extent) {
	            var handleMinMax = !handleEnds.length
	                ? [handleEnds, handleEnds]
	                : handleEnds.slice();
	            handleEnds[0] > handleEnds[1] && handleMinMax.reverse();

	            if (delta < 0 && handleMinMax[0] + delta < extent[0]) {
	                delta = extent[0] - handleMinMax[0];
	            }
	            if (delta > 0 && handleMinMax[1] + delta > extent[1]) {
	                delta = extent[1] - handleMinMax[1];
	            }
	            return delta;
	        }
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @file Data zoom model
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {

	    return __webpack_require__(231).extend({

	        type: 'dataZoom.inside',

	        /**
	         * @protected
	         */
	        defaultOption: {
	            zoomLock: false // Whether disable zoom but only pan.
	        }
	    });
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var DataZoomView = __webpack_require__(233);
	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var sliderMove = __webpack_require__(237);
	    var roams = __webpack_require__(240);
	    var bind = zrUtil.bind;

	    var InsideZoomView = DataZoomView.extend({

	        type: 'dataZoom.inside',

	        /**
	         * @override
	         */
	        init: function (ecModel, api) {
	            /**
	             * 'throttle' is used in this.dispatchAction, so we save range
	             * to avoid missing some 'pan' info.
	             * @private
	             * @type {Array.<number>}
	             */
	            this._range;
	        },

	        /**
	         * @override
	         */
	        render: function (dataZoomModel, ecModel, api, payload) {
	            InsideZoomView.superApply(this, 'render', arguments);

	            // Notice: origin this._range should be maintained, and should not be re-fetched
	            // from dataZoomModel when payload.type is 'dataZoom', otherwise 'pan' or 'zoom'
	            // info will be missed because of 'throttle' of this.dispatchAction.
	            if (roams.shouldRecordRange(payload, dataZoomModel.id)) {
	                this._range = dataZoomModel.getPercentRange();
	            }

	            // Reset controllers.
	            var coordInfoList = this.getTargetInfo().cartesians;
	            var allCoordIds = zrUtil.map(coordInfoList, function (coordInfo) {
	                return roams.generateCoordId(coordInfo.model);
	            });

	            zrUtil.each(coordInfoList, function (coordInfo) {
	                var coordModel = coordInfo.model;
	                roams.register(
	                    api,
	                    {
	                        coordId: roams.generateCoordId(coordModel),
	                        allCoordIds: allCoordIds,
	                        coordinateSystem: coordModel.coordinateSystem,
	                        dataZoomId: dataZoomModel.id,
	                        throttleRate: dataZoomModel.get('throttle', true),
	                        panGetRange: bind(this._onPan, this, coordInfo),
	                        zoomGetRange: bind(this._onZoom, this, coordInfo)
	                    }
	                );
	            }, this);

	            // TODO
	            // polar支持
	        },

	        /**
	         * @override
	         */
	        remove: function () {
	            roams.unregister(this.api, this.dataZoomModel.id);
	            InsideZoomView.superApply(this, 'remove', arguments);
	            this._range = null;
	        },

	        /**
	         * @override
	         */
	        dispose: function () {
	            roams.unregister(this.api, this.dataZoomModel.id);
	            InsideZoomView.superApply(this, 'dispose', arguments);
	            this._range = null;
	        },

	        /**
	         * @private
	         */
	        _onPan: function (coordInfo, controller, dx, dy) {
	            return (
	                this._range = panCartesian(
	                    [dx, dy], this._range, controller, coordInfo
	                )
	            );
	        },

	        /**
	         * @private
	         */
	        _onZoom: function (coordInfo, controller, scale, mouseX, mouseY) {
	            var dataZoomModel = this.dataZoomModel;

	            if (dataZoomModel.option.zoomLock) {
	                return this._range;
	            }

	            return (
	                this._range = scaleCartesian(
	                    1 / scale, [mouseX, mouseY], this._range,
	                    controller, coordInfo, dataZoomModel
	                )
	            );
	        }

	    });

	    function panCartesian(pixelDeltas, range, controller, coordInfo) {
	        range = range.slice();

	        // Calculate transform by the first axis.
	        var axisModel = coordInfo.axisModels[0];
	        if (!axisModel) {
	            return;
	        }

	        var directionInfo = getDirectionInfo(pixelDeltas, axisModel, controller);

	        var percentDelta = directionInfo.signal
	            * (range[1] - range[0])
	            * directionInfo.pixel / directionInfo.pixelLength;

	        sliderMove(
	            percentDelta,
	            range,
	            [0, 100],
	            'rigid'
	        );

	        return range;
	    }

	    function scaleCartesian(scale, mousePoint, range, controller, coordInfo, dataZoomModel) {
	        range = range.slice();

	        // Calculate transform by the first axis.
	        var axisModel = coordInfo.axisModels[0];
	        if (!axisModel) {
	            return;
	        }

	        var directionInfo = getDirectionInfo(mousePoint, axisModel, controller);

	        var mouse = directionInfo.pixel - directionInfo.pixelStart;
	        var percentPoint = mouse / directionInfo.pixelLength * (range[1] - range[0]) + range[0];

	        scale = Math.max(scale, 0);
	        range[0] = (range[0] - percentPoint) * scale + percentPoint;
	        range[1] = (range[1] - percentPoint) * scale + percentPoint;

	        return fixRange(range);
	    }

	    function getDirectionInfo(xy, axisModel, controller) {
	        var axis = axisModel.axis;
	        var rect = controller.rectProvider();
	        var ret = {};

	        if (axis.dim === 'x') {
	            ret.pixel = xy[0];
	            ret.pixelLength = rect.width;
	            ret.pixelStart = rect.x;
	            ret.signal = axis.inverse ? 1 : -1;
	        }
	        else { // axis.dim === 'y'
	            ret.pixel = xy[1];
	            ret.pixelLength = rect.height;
	            ret.pixelStart = rect.y;
	            ret.signal = axis.inverse ? -1 : 1;
	        }

	        return ret;
	    }

	    function fixRange(range) {
	        // Clamp, using !(<= or >=) to handle NaN.
	        // jshint ignore:start
	        var bound = [0, 100];
	        !(range[0] <= bound[1]) && (range[0] = bound[1]);
	        !(range[1] <= bound[1]) && (range[1] = bound[1]);
	        !(range[0] >= bound[0]) && (range[0] = bound[0]);
	        !(range[1] >= bound[0]) && (range[1] = bound[0]);
	        // jshint ignore:end

	        return range;
	    }

	    return InsideZoomView;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @file Roam controller manager.
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {

	    // Only create one roam controller for each coordinate system.
	    // one roam controller might be refered by two inside data zoom
	    // components (for example, one for x and one for y). When user
	    // pan or zoom, only dispatch one action for those data zoom
	    // components.

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var RoamController = __webpack_require__(106);
	    var throttle = __webpack_require__(236);
	    var curry = zrUtil.curry;

	    var ATTR = '\0_ec_dataZoom_roams';

	    var roams = {

	        /**
	         * @public
	         * @param {module:echarts/ExtensionAPI} api
	         * @param {Object} dataZoomInfo
	         * @param {string} dataZoomInfo.coordId
	         * @param {Object} dataZoomInfo.coordinateSystem
	         * @param {Array.<string>} dataZoomInfo.allCoordIds
	         * @param {string} dataZoomInfo.dataZoomId
	         * @param {number} dataZoomInfo.throttleRate
	         * @param {Function} dataZoomInfo.panGetRange
	         * @param {Function} dataZoomInfo.zoomGetRange
	         */
	        register: function (api, dataZoomInfo) {
	            var store = giveStore(api);
	            var theDataZoomId = dataZoomInfo.dataZoomId;
	            var theCoordId = dataZoomInfo.coordId;

	            // Do clean when a dataZoom changes its target coordnate system.
	            zrUtil.each(store, function (record, coordId) {
	                var dataZoomInfos = record.dataZoomInfos;
	                if (dataZoomInfos[theDataZoomId]
	                    && zrUtil.indexOf(dataZoomInfo.allCoordIds, theCoordId) < 0
	                ) {
	                    delete dataZoomInfos[theDataZoomId];
	                    record.count--;
	                }
	            });

	            cleanStore(store);

	            var record = store[theCoordId];

	            // Create if needed.
	            if (!record) {
	                record = store[theCoordId] = {
	                    coordId: theCoordId,
	                    dataZoomInfos: {},
	                    count: 0
	                };
	                record.controller = createController(api, dataZoomInfo, record);
	                record.dispatchAction = zrUtil.curry(dispatchAction, api);
	            }

	            // Consider resize, area should be always updated.
	            var rect = dataZoomInfo.coordinateSystem.getRect().clone();
	            record.controller.rectProvider = function () {
	                return rect;
	            };

	            // Update throttle.
	            throttle.createOrUpdate(
	                record,
	                'dispatchAction',
	                dataZoomInfo.throttleRate,
	                'fixRate'
	            );

	            // Update reference of dataZoom.
	            !(record.dataZoomInfos[theDataZoomId]) && record.count++;
	            record.dataZoomInfos[theDataZoomId] = dataZoomInfo;
	        },

	        /**
	         * @public
	         * @param {module:echarts/ExtensionAPI} api
	         * @param {string} dataZoomId
	         */
	        unregister: function (api, dataZoomId) {
	            var store = giveStore(api);

	            zrUtil.each(store, function (record) {
	                var dataZoomInfos = record.dataZoomInfos;
	                if (dataZoomInfos[dataZoomId]) {
	                    delete dataZoomInfos[dataZoomId];
	                    record.count--;
	                }
	            });

	            cleanStore(store);
	        },

	        /**
	         * @public
	         */
	        shouldRecordRange: function (payload, dataZoomId) {
	            if (payload && payload.type === 'dataZoom' && payload.batch) {
	                for (var i = 0, len = payload.batch.length; i < len; i++) {
	                    if (payload.batch[i].dataZoomId === dataZoomId) {
	                        return false;
	                    }
	                }
	            }
	            return true;
	        },

	        /**
	         * @public
	         */
	        generateCoordId: function (coordModel) {
	            return coordModel.type + '\0_' + coordModel.id;
	        }
	    };

	    /**
	     * Key: coordId, value: {dataZoomInfos: [], count, controller}
	     * @type {Array.<Object>}
	     */
	    function giveStore(api) {
	        // Mount store on zrender instance, so that we do not
	        // need to worry about dispose.
	        var zr = api.getZr();
	        return zr[ATTR] || (zr[ATTR] = {});
	    }

	    function createController(api, dataZoomInfo, newRecord) {
	        var controller = new RoamController(api.getZr());
	        controller.enable();
	        controller.on('pan', curry(onPan, newRecord));
	        controller.on('zoom', curry(onZoom, newRecord));

	        return controller;
	    }

	    function cleanStore(store) {
	        zrUtil.each(store, function (record, coordId) {
	            if (!record.count) {
	                record.controller.off('pan').off('zoom');
	                delete store[coordId];
	            }
	        });
	    }

	    function onPan(record, dx, dy) {
	        wrapAndDispatch(record, function (info) {
	            return info.panGetRange(record.controller, dx, dy);
	        });
	    }

	    function onZoom(record, scale, mouseX, mouseY) {
	        wrapAndDispatch(record, function (info) {
	            return info.zoomGetRange(record.controller, scale, mouseX, mouseY);
	        });
	    }

	    function wrapAndDispatch(record, getRange) {
	        var batch = [];

	        zrUtil.each(record.dataZoomInfos, function (info) {
	            var range = getRange(info);
	            range && batch.push({
	                dataZoomId: info.dataZoomId,
	                start: range[0],
	                end: range[1]
	            });
	        });

	        record.dispatchAction(batch);
	    }

	    /**
	     * This action will be throttled.
	     */
	    function dispatchAction(api, batch) {
	        api.dispatchAction({
	            type: 'dataZoom',
	            batch: batch
	        });
	    }

	    return roams;

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @file Data zoom processor
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var echarts = __webpack_require__(1);

	    echarts.registerProcessor(function (ecModel, api) {

	        ecModel.eachComponent('dataZoom', function (dataZoomModel) {
	            // We calculate window and reset axis here but not in model
	            // init stage and not after action dispatch handler, because
	            // reset should be called after seriesData.restoreData.
	            dataZoomModel.eachTargetAxis(resetSingleAxis);

	            // Caution: data zoom filtering is order sensitive when using
	            // percent range and no min/max/scale set on axis.
	            // For example, we have dataZoom definition:
	            // [
	            //      {xAxisIndex: 0, start: 30, end: 70},
	            //      {yAxisIndex: 0, start: 20, end: 80}
	            // ]
	            // In this case, [20, 80] of y-dataZoom should be based on data
	            // that have filtered by x-dataZoom using range of [30, 70],
	            // but should not be based on full raw data. Thus sliding
	            // x-dataZoom will change both ranges of xAxis and yAxis,
	            // while sliding y-dataZoom will only change the range of yAxis.
	            // So we should filter x-axis after reset x-axis immediately,
	            // and then reset y-axis and filter y-axis.
	            dataZoomModel.eachTargetAxis(filterSingleAxis);
	        });

	        ecModel.eachComponent('dataZoom', function (dataZoomModel) {
	            // Fullfill all of the range props so that user
	            // is able to get them from chart.getOption().
	            var axisProxy = dataZoomModel.findRepresentativeAxisProxy();
	            var percentRange = axisProxy.getDataPercentWindow();
	            var valueRange = axisProxy.getDataValueWindow();

	            dataZoomModel.setRawRange({
	                start: percentRange[0],
	                end: percentRange[1],
	                startValue: valueRange[0],
	                endValue: valueRange[1]
	            });
	        });
	    });

	    function resetSingleAxis(dimNames, axisIndex, dataZoomModel) {
	        dataZoomModel.getAxisProxy(dimNames.name, axisIndex).reset(dataZoomModel);
	    }

	    function filterSingleAxis(dimNames, axisIndex, dataZoomModel) {
	        dataZoomModel.getAxisProxy(dimNames.name, axisIndex).filterData(dataZoomModel);
	    }

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @file Data zoom action
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var modelUtil = __webpack_require__(3);
	    var echarts = __webpack_require__(1);


	    echarts.registerAction('dataZoom', function (payload, ecModel) {

	        var linkedNodesFinder = modelUtil.createLinkedNodesFinder(
	            zrUtil.bind(ecModel.eachComponent, ecModel, 'dataZoom'),
	            modelUtil.eachAxisDim,
	            function (model, dimNames) {
	                return model.get(dimNames.axisIndex);
	            }
	        );

	        var effectedModels = [];

	        ecModel.eachComponent(
	            {mainType: 'dataZoom', query: payload},
	            function (model, index) {
	                effectedModels.push.apply(
	                    effectedModels, linkedNodesFinder(model).nodes
	                );
	            }
	        );

	        zrUtil.each(effectedModels, function (dataZoomModel, index) {
	            dataZoomModel.setRawRange({
	                start: payload.start,
	                end: payload.end,
	                startValue: payload.startValue,
	                endValue: payload.endValue
	            });
	        });

	    });

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;// HINT Markpoint can't be used too much
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    __webpack_require__(260);
	    __webpack_require__(262);

	    __webpack_require__(1).registerPreprocessor(function (opt) {
	        // Make sure markPoint component is enabled
	        opt.markPoint = opt.markPoint || {};
	    });
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 260 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    return __webpack_require__(261).extend({

	        type: 'markPoint',

	        defaultOption: {
	            zlevel: 0,
	            z: 5,
	            symbol: 'pin',
	            symbolSize: 50,
	            //symbolRotate: 0,
	            //symbolOffset: [0, 0]
	            tooltip: {
	                trigger: 'item'
	            },
	            label: {
	                normal: {
	                    show: true,
	                    position: 'inside'
	                },
	                emphasis: {
	                    show: true
	                }
	            },
	            itemStyle: {
	                normal: {
	                    borderWidth: 2
	                }
	            }
	        }
	    });
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 261 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var modelUtil = __webpack_require__(3);
	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var env = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/env\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    var formatUtil = __webpack_require__(4);
	    var addCommas = formatUtil.addCommas;
	    var encodeHTML = formatUtil.encodeHTML;

	    function fillLabel(opt) {
	        modelUtil.defaultEmphasis(
	            opt.label,
	            modelUtil.LABEL_OPTIONS
	        );
	    }
	    var MarkerModel = __webpack_require__(1).extendComponentModel({

	        type: 'marker',

	        dependencies: ['series', 'grid', 'polar', 'geo'],
	        /**
	         * @overrite
	         */
	        init: function (option, parentModel, ecModel, extraOpt) {

	            if (true) {
	                if (this.type === 'marker') {
	                    throw new Error('Marker component is abstract component. Use markLine, markPoint, markArea instead.');
	                }
	            }
	            this.mergeDefaultAndTheme(option, ecModel);
	            this.mergeOption(option, ecModel, extraOpt.createdBySelf, true);
	        },

	        /**
	         * @return {boolean}
	         */
	        ifEnableAnimation: function () {
	            if (env.node) {
	                return false;
	            }

	            var hostSeries = this.__hostSeries;
	            return this.getShallow('animation') && hostSeries && hostSeries.ifEnableAnimation();
	        },

	        mergeOption: function (newOpt, ecModel, createdBySelf, isInit) {
	            var MarkerModel = this.constructor;
	            var modelPropName = this.mainType + 'Model';
	            if (!createdBySelf) {
	                ecModel.eachSeries(function (seriesModel) {

	                    var markerOpt = seriesModel.get(this.mainType);

	                    var markerModel = seriesModel[modelPropName];
	                    if (!markerOpt || !markerOpt.data) {
	                        seriesModel[modelPropName] = null;
	                        return;
	                    }
	                    if (!markerModel) {
	                        if (isInit) {
	                            // Default label emphasis `position` and `show`
	                            fillLabel(markerOpt);
	                        }
	                        zrUtil.each(markerOpt.data, function (item) {
	                            // FIXME Overwrite fillLabel method ?
	                            if (item instanceof Array) {
	                                fillLabel(item[0]);
	                                fillLabel(item[1]);
	                            }
	                            else {
	                                fillLabel(item);
	                            }
	                        });
	                        var opt = {
	                            mainType: this.mainType,
	                            // Use the same series index and name
	                            seriesIndex: seriesModel.seriesIndex,
	                            name: seriesModel.name,
	                            createdBySelf: true
	                        };
	                        markerModel = new MarkerModel(
	                            markerOpt, this, ecModel, opt
	                        );
	                        markerModel.__hostSeries = seriesModel;
	                    }
	                    else {
	                        markerModel.mergeOption(markerOpt, ecModel, true);
	                    }
	                    seriesModel[modelPropName] = markerModel;
	                }, this);
	            }
	        },

	        formatTooltip: function (dataIndex) {
	            var data = this.getData();
	            var value = this.getRawValue(dataIndex);
	            var formattedValue = zrUtil.isArray(value)
	                ? zrUtil.map(value, addCommas).join(', ') : addCommas(value);
	            var name = data.getName(dataIndex);
	            var html = this.name;
	            if (value != null || name) {
	                html += '<br />';
	            }
	            if (name) {
	                html += encodeHTML(name);
	                if (value != null) {
	                    html += ' : ';
	                }
	            }
	            if (value != null) {
	                html += formattedValue;
	            }
	            return html;
	        },

	        getData: function () {
	            return this._data;
	        },

	        setData: function (data) {
	            this._data = data;
	        }
	    });

	    zrUtil.mixin(MarkerModel, modelUtil.dataFormatMixin);

	    return MarkerModel;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 262 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var SymbolDraw = __webpack_require__(37);
	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var numberUtil = __webpack_require__(5);

	    var List = __webpack_require__(30);

	    var markerHelper = __webpack_require__(263);

	    function updateMarkerLayout(mpData, seriesModel, api) {
	        var coordSys = seriesModel.coordinateSystem;
	        mpData.each(function (idx) {
	            var itemModel = mpData.getItemModel(idx);
	            var point;
	            var xPx = numberUtil.parsePercent(itemModel.get('x'), api.getWidth());
	            var yPx = numberUtil.parsePercent(itemModel.get('y'), api.getHeight());
	            if (!isNaN(xPx) && !isNaN(yPx)) {
	                point = [xPx, yPx];
	            }
	            // Chart like bar may have there own marker positioning logic
	            else if (seriesModel.getMarkerPosition) {
	                // Use the getMarkerPoisition
	                point = seriesModel.getMarkerPosition(
	                    mpData.getValues(mpData.dimensions, idx)
	                );
	            }
	            else if (coordSys) {
	                var x = mpData.get(coordSys.dimensions[0], idx);
	                var y = mpData.get(coordSys.dimensions[1], idx);
	                point = coordSys.dataToPoint([x, y]);

	            }

	            // Use x, y if has any
	            if (!isNaN(xPx)) {
	                point[0] = xPx;
	            }
	            if (!isNaN(yPx)) {
	                point[1] = yPx;
	            }

	            mpData.setItemLayout(idx, point);
	        });
	    }

	    __webpack_require__(264).extend({

	        type: 'markPoint',

	        updateLayout: function (markPointModel, ecModel, api) {
	            ecModel.eachSeries(function (seriesModel) {
	                var mpModel = seriesModel.markPointModel;
	                if (mpModel) {
	                    updateMarkerLayout(mpModel.getData(), seriesModel, api);
	                    this.markerGroupMap[seriesModel.name].updateLayout(mpModel);
	                }
	            }, this);
	        },

	        renderSeries: function (seriesModel, mpModel, ecModel, api) {
	            var coordSys = seriesModel.coordinateSystem;
	            var seriesName = seriesModel.name;
	            var seriesData = seriesModel.getData();

	            var symbolDrawMap = this.markerGroupMap;
	            var symbolDraw = symbolDrawMap[seriesName];
	            if (!symbolDraw) {
	                symbolDraw = symbolDrawMap[seriesName] = new SymbolDraw();
	            }

	            var mpData = createList(coordSys, seriesModel, mpModel);

	            // FIXME
	            mpModel.setData(mpData);

	            updateMarkerLayout(mpModel.getData(), seriesModel, api);

	            mpData.each(function (idx) {
	                var itemModel = mpData.getItemModel(idx);
	                var symbolSize = itemModel.getShallow('symbolSize');
	                if (typeof symbolSize === 'function') {
	                    // FIXME 这里不兼容 ECharts 2.x，2.x 貌似参数是整个数据？
	                    symbolSize = symbolSize(
	                        mpModel.getRawValue(idx), mpModel.getDataParams(idx)
	                    );
	                }
	                mpData.setItemVisual(idx, {
	                    symbolSize: symbolSize,
	                    color: itemModel.get('itemStyle.normal.color')
	                        || seriesData.getVisual('color'),
	                    symbol: itemModel.getShallow('symbol')
	                });
	            });

	            // TODO Text are wrong
	            symbolDraw.updateData(mpData);
	            this.group.add(symbolDraw.group);

	            // Set host model for tooltip
	            // FIXME
	            mpData.eachItemGraphicEl(function (el) {
	                el.traverse(function (child) {
	                    child.dataModel = mpModel;
	                });
	            });

	            symbolDraw.__keep = true;

	            symbolDraw.group.silent = mpModel.get('silent') || seriesModel.get('silent');
	        }
	    });

	    /**
	     * @inner
	     * @param {module:echarts/coord/*} [coordSys]
	     * @param {module:echarts/model/Series} seriesModel
	     * @param {module:echarts/model/Model} mpModel
	     */
	    function createList(coordSys, seriesModel, mpModel) {
	        var coordDimsInfos;
	        if (coordSys) {
	            coordDimsInfos = zrUtil.map(coordSys && coordSys.dimensions, function (coordDim) {
	                var info = seriesModel.getData().getDimensionInfo(
	                    seriesModel.coordDimToDataDim(coordDim)[0]
	                ) || {}; // In map series data don't have lng and lat dimension. Fallback to same with coordSys
	                info.name = coordDim;
	                return info;
	            });
	        }
	        else {
	            coordDimsInfos =[{
	                name: 'value',
	                type: 'float'
	            }];
	        }

	        var mpData = new List(coordDimsInfos, mpModel);
	        var dataOpt = zrUtil.map(mpModel.get('data'), zrUtil.curry(
	                markerHelper.dataTransform, seriesModel
	            ));
	        if (coordSys) {
	            dataOpt = zrUtil.filter(
	                dataOpt, zrUtil.curry(markerHelper.dataFilter, coordSys)
	            );
	        }

	        mpData.initData(dataOpt, null,
	            coordSys ? markerHelper.dimValueGetter : function (item) {
	                return item.value;
	            }
	        );
	        return mpData;
	    }

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 263 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var numberUtil = __webpack_require__(5);
	    var indexOf = zrUtil.indexOf;

	    function hasXOrY(item) {
	        return !(isNaN(parseFloat(item.x)) && isNaN(parseFloat(item.y)));
	    }

	    function hasXAndY(item) {
	        return !isNaN(parseFloat(item.x)) && !isNaN(parseFloat(item.y));
	    }

	    function getPrecision(data, valueAxisDim, dataIndex) {
	        var precision = -1;
	        do {
	            precision = Math.max(
	                numberUtil.getPrecision(data.get(
	                    valueAxisDim, dataIndex
	                )),
	                precision
	            );
	            data = data.stackedOn;
	        } while (data);

	        return precision;
	    }

	    function markerTypeCalculatorWithExtent(
	        mlType, data, otherDataDim, targetDataDim, otherCoordIndex, targetCoordIndex
	    ) {
	        var coordArr = [];
	        var value = numCalculate(data, targetDataDim, mlType);

	        var dataIndex = data.indexOfNearest(targetDataDim, value, true);
	        coordArr[otherCoordIndex] = data.get(otherDataDim, dataIndex, true);
	        coordArr[targetCoordIndex] = data.get(targetDataDim, dataIndex, true);

	        var precision = getPrecision(data, targetDataDim, dataIndex);
	        if (precision >= 0) {
	            coordArr[targetCoordIndex] = +coordArr[targetCoordIndex].toFixed(precision);
	        }

	        return coordArr;
	    }

	    var curry = zrUtil.curry;
	    // TODO Specified percent
	    var markerTypeCalculator = {
	        /**
	         * @method
	         * @param {module:echarts/data/List} data
	         * @param {string} baseAxisDim
	         * @param {string} valueAxisDim
	         */
	        min: curry(markerTypeCalculatorWithExtent, 'min'),
	        /**
	         * @method
	         * @param {module:echarts/data/List} data
	         * @param {string} baseAxisDim
	         * @param {string} valueAxisDim
	         */
	        max: curry(markerTypeCalculatorWithExtent, 'max'),

	        /**
	         * @method
	         * @param {module:echarts/data/List} data
	         * @param {string} baseAxisDim
	         * @param {string} valueAxisDim
	         */
	        average: curry(markerTypeCalculatorWithExtent, 'average')
	    };

	    /**
	     * Transform markPoint data item to format used in List by do the following
	     * 1. Calculate statistic like `max`, `min`, `average`
	     * 2. Convert `item.xAxis`, `item.yAxis` to `item.coord` array
	     * @param  {module:echarts/model/Series} seriesModel
	     * @param  {module:echarts/coord/*} [coordSys]
	     * @param  {Object} item
	     * @return {Object}
	     */
	    var dataTransform = function (seriesModel, item) {
	        var data = seriesModel.getData();
	        var coordSys = seriesModel.coordinateSystem;

	        // 1. If not specify the position with pixel directly
	        // 2. If `coord` is not a data array. Which uses `xAxis`,
	        // `yAxis` to specify the coord on each dimension

	        // parseFloat first because item.x and item.y can be percent string like '20%'
	        if (item && !hasXAndY(item) && !zrUtil.isArray(item.coord) && coordSys) {
	            var dims = coordSys.dimensions;
	            var axisInfo = getAxisInfo(item, data, coordSys, seriesModel);

	            // Clone the option
	            // Transform the properties xAxis, yAxis, radiusAxis, angleAxis, geoCoord to value
	            item = zrUtil.clone(item);

	            if (item.type
	                && markerTypeCalculator[item.type]
	                && axisInfo.baseAxis && axisInfo.valueAxis
	            ) {
	                var otherCoordIndex = indexOf(dims, axisInfo.baseAxis.dim);
	                var targetCoordIndex = indexOf(dims, axisInfo.valueAxis.dim);

	                item.coord = markerTypeCalculator[item.type](
	                    data, axisInfo.baseDataDim, axisInfo.valueDataDim,
	                    otherCoordIndex, targetCoordIndex
	                );
	                // Force to use the value of calculated value.
	                item.value = item.coord[targetCoordIndex];
	            }
	            else {
	                // FIXME Only has one of xAxis and yAxis.
	                var coord = [
	                    item.xAxis != null ? item.xAxis : item.radiusAxis,
	                    item.yAxis != null ? item.yAxis : item.angleAxis
	                ];
	                // Each coord support max, min, average
	                for (var i = 0; i < 2; i++) {
	                    if (markerTypeCalculator[coord[i]]) {
	                        var dataDim = seriesModel.coordDimToDataDim(dims[i])[0];
	                        coord[i] = numCalculate(data, dataDim, coord[i]);
	                    }
	                }
	                item.coord = coord;
	            }
	        }
	        return item;
	    };

	    var getAxisInfo = function (item, data, coordSys, seriesModel) {
	        var ret = {};

	        if (item.valueIndex != null || item.valueDim != null) {
	            ret.valueDataDim = item.valueIndex != null
	                ? data.getDimension(item.valueIndex) : item.valueDim;
	            ret.valueAxis = coordSys.getAxis(seriesModel.dataDimToCoordDim(ret.valueDataDim));
	            ret.baseAxis = coordSys.getOtherAxis(ret.valueAxis);
	            ret.baseDataDim = seriesModel.coordDimToDataDim(ret.baseAxis.dim)[0];
	        }
	        else {
	            ret.baseAxis = seriesModel.getBaseAxis();
	            ret.valueAxis = coordSys.getOtherAxis(ret.baseAxis);
	            ret.baseDataDim = seriesModel.coordDimToDataDim(ret.baseAxis.dim)[0];
	            ret.valueDataDim = seriesModel.coordDimToDataDim(ret.valueAxis.dim)[0];
	        }

	        return ret;
	    };

	    /**
	     * Filter data which is out of coordinateSystem range
	     * [dataFilter description]
	     * @param  {module:echarts/coord/*} [coordSys]
	     * @param  {Object} item
	     * @return {boolean}
	     */
	    var dataFilter = function (coordSys, item) {
	        // Alwalys return true if there is no coordSys
	        return (coordSys && coordSys.containData && item.coord && !hasXOrY(item))
	            ? coordSys.containData(item.coord) : true;
	    };

	    var dimValueGetter = function (item, dimName, dataIndex, dimIndex) {
	        // x, y, radius, angle
	        if (dimIndex < 2) {
	            return item.coord && item.coord[dimIndex];
	        }
	        return item.value;
	    };

	    var numCalculate = function (data, valueDataDim, type) {
	        if (type === 'average') {
	            var sum = 0;
	            var count = 0;
	            data.each(valueDataDim, function (val, idx) {
	                if (!isNaN(val)) {
	                    sum += val;
	                    count++;
	                }
	            }, true);
	            return sum / count;
	        }
	        else {
	            return data.getDataExtent(valueDataDim, true)[type === 'max' ? 1 : 0];
	        }
	    };

	    return {
	        dataTransform: dataTransform,
	        dataFilter: dataFilter,
	        dimValueGetter: dimValueGetter,
	        getAxisInfo: getAxisInfo,
	        numCalculate: numCalculate
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 264 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    return __webpack_require__(1).extendComponentView({

	        type: 'marker',

	        init: function () {
	            /**
	             * Markline grouped by series
	             * @private
	             * @type {Object}
	             */
	            this.markerGroupMap = {};
	        },

	        render: function (markerModel, ecModel, api) {
	            var markerGroupMap = this.markerGroupMap;
	            for (var name in markerGroupMap) {
	                markerGroupMap[name].__keep = false;
	            }

	            var markerModelKey = this.type + 'Model';
	            ecModel.eachSeries(function (seriesModel) {
	                var markerModel = seriesModel[markerModelKey];
	                markerModel && this.renderSeries(seriesModel, markerModel, ecModel, api);
	            }, this);

	            for (var name in markerGroupMap) {
	                if (!markerGroupMap[name].__keep) {
	                    this.group.remove(markerGroupMap[name].group);
	                }
	            }
	        },

	        renderSeries: function () {}
	    });
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 265 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    __webpack_require__(266);
	    __webpack_require__(267);

	    __webpack_require__(1).registerPreprocessor(function (opt) {
	        // Make sure markLine component is enabled
	        opt.markLine = opt.markLine || {};
	    });
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 266 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    return __webpack_require__(261).extend({

	        type: 'markLine',

	        defaultOption: {
	            zlevel: 0,
	            z: 5,

	            symbol: ['circle', 'arrow'],
	            symbolSize: [8, 16],

	            //symbolRotate: 0,

	            precision: 2,
	            tooltip: {
	                trigger: 'item'
	            },
	            label: {
	                normal: {
	                    show: true,
	                    position: 'end'
	                },
	                emphasis: {
	                    show: true
	                }
	            },
	            lineStyle: {
	                normal: {
	                    type: 'dashed'
	                },
	                emphasis: {
	                    width: 3
	                }
	            },
	            animationEasing: 'linear'
	        }
	    });
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 267 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var List = __webpack_require__(30);
	    var numberUtil = __webpack_require__(5);

	    var markerHelper = __webpack_require__(263);

	    var LineDraw = __webpack_require__(131);

	    var markLineTransform = function (seriesModel, coordSys, mlModel, item) {
	        var data = seriesModel.getData();
	        // Special type markLine like 'min', 'max', 'average'
	        var mlType = item.type;

	        if (!zrUtil.isArray(item)
	            && (
	                mlType === 'min' || mlType === 'max' || mlType === 'average'
	                // In case
	                // data: [{
	                //   yAxis: 10
	                // }]
	                || (item.xAxis != null || item.yAxis != null)
	            )
	        ) {
	            var valueAxis;
	            var valueDataDim;
	            var value;

	            if (item.yAxis != null || item.xAxis != null) {
	                valueDataDim = item.yAxis != null ? 'y' : 'x';
	                valueAxis = coordSys.getAxis(valueDataDim);

	                value = zrUtil.retrieve(item.yAxis, item.xAxis);
	            }
	            else {
	                var axisInfo = markerHelper.getAxisInfo(item, data, coordSys, seriesModel);
	                valueDataDim = axisInfo.valueDataDim;
	                valueAxis = axisInfo.valueAxis;
	                value = markerHelper.numCalculate(data, valueDataDim, mlType);
	            }
	            var valueIndex = valueDataDim === 'x' ? 0 : 1;
	            var baseIndex = 1 - valueIndex;

	            var mlFrom = zrUtil.clone(item);
	            var mlTo = {};

	            mlFrom.type = null;

	            mlFrom.coord = [];
	            mlTo.coord = [];
	            mlFrom.coord[baseIndex] = -Infinity;
	            mlTo.coord[baseIndex] = Infinity;

	            var precision = mlModel.get('precision');
	            if (precision >= 0) {
	                value = +value.toFixed(precision);
	            }

	            mlFrom.coord[valueIndex] = mlTo.coord[valueIndex] = value;

	            item = [mlFrom, mlTo, { // Extra option for tooltip and label
	                type: mlType,
	                valueIndex: item.valueIndex,
	                // Force to use the value of calculated value.
	                value: value
	            }];
	        }

	        item = [
	            markerHelper.dataTransform(seriesModel, item[0]),
	            markerHelper.dataTransform(seriesModel, item[1]),
	            zrUtil.extend({}, item[2])
	        ];

	        // Avoid line data type is extended by from(to) data type
	        item[2].type = item[2].type || '';

	        // Merge from option and to option into line option
	        zrUtil.merge(item[2], item[0]);
	        zrUtil.merge(item[2], item[1]);

	        return item;
	    };

	    function isInifinity(val) {
	        return !isNaN(val) && !isFinite(val);
	    }

	    // If a markLine has one dim
	    function ifMarkLineHasOnlyDim(dimIndex, fromCoord, toCoord, coordSys) {
	        var otherDimIndex = 1 - dimIndex;
	        var dimName = coordSys.dimensions[dimIndex];
	        return isInifinity(fromCoord[otherDimIndex]) && isInifinity(toCoord[otherDimIndex])
	            && fromCoord[dimIndex] === toCoord[dimIndex] && coordSys.getAxis(dimName).containData(fromCoord[dimIndex]);
	    }

	    function markLineFilter(coordSys, item) {
	        if (coordSys.type === 'cartesian2d') {
	            var fromCoord = item[0].coord;
	            var toCoord = item[1].coord;
	            // In case
	            // {
	            //  markLine: {
	            //    data: [{ yAxis: 2 }]
	            //  }
	            // }
	            if (
	                fromCoord && toCoord &&
	                (ifMarkLineHasOnlyDim(1, fromCoord, toCoord, coordSys)
	                || ifMarkLineHasOnlyDim(0, fromCoord, toCoord, coordSys))
	            ) {
	                return true;
	            }
	        }
	        return markerHelper.dataFilter(coordSys, item[0])
	            && markerHelper.dataFilter(coordSys, item[1]);
	    }

	    function updateSingleMarkerEndLayout(
	        data, idx, isFrom, seriesModel, api
	    ) {
	        var coordSys = seriesModel.coordinateSystem;
	        var itemModel = data.getItemModel(idx);

	        var point;
	        var xPx = numberUtil.parsePercent(itemModel.get('x'), api.getWidth());
	        var yPx = numberUtil.parsePercent(itemModel.get('y'), api.getHeight());
	        if (!isNaN(xPx) && !isNaN(yPx)) {
	            point = [xPx, yPx];
	        }
	        else {
	            // Chart like bar may have there own marker positioning logic
	            if (seriesModel.getMarkerPosition) {
	                // Use the getMarkerPoisition
	                point = seriesModel.getMarkerPosition(
	                    data.getValues(data.dimensions, idx)
	                );
	            }
	            else {
	                var dims = coordSys.dimensions;
	                var x = data.get(dims[0], idx);
	                var y = data.get(dims[1], idx);
	                point = coordSys.dataToPoint([x, y]);
	            }
	            // Expand line to the edge of grid if value on one axis is Inifnity
	            // In case
	            //  markLine: {
	            //    data: [{
	            //      yAxis: 2
	            //      // or
	            //      type: 'average'
	            //    }]
	            //  }
	            if (coordSys.type === 'cartesian2d') {
	                var xAxis = coordSys.getAxis('x');
	                var yAxis = coordSys.getAxis('y');
	                var dims = coordSys.dimensions;
	                if (isInifinity(data.get(dims[0], idx))) {
	                    point[0] = xAxis.toGlobalCoord(xAxis.getExtent()[isFrom ? 0 : 1]);
	                }
	                else if (isInifinity(data.get(dims[1], idx))) {
	                    point[1] = yAxis.toGlobalCoord(yAxis.getExtent()[isFrom ? 0 : 1]);
	                }
	            }

	            // Use x, y if has any
	            if (!isNaN(xPx)) {
	                point[0] = xPx;
	            }
	            if (!isNaN(yPx)) {
	                point[1] = yPx;
	            }
	        }

	        data.setItemLayout(idx, point);
	    }

	    __webpack_require__(264).extend({

	        type: 'markLine',

	        updateLayout: function (markLineModel, ecModel, api) {
	            ecModel.eachSeries(function (seriesModel) {
	                var mlModel = seriesModel.markLineModel;
	                if (mlModel) {
	                    var mlData = mlModel.getData();
	                    var fromData = mlModel.__from;
	                    var toData = mlModel.__to;
	                    // Update visual and layout of from symbol and to symbol
	                    fromData.each(function (idx) {
	                        updateSingleMarkerEndLayout(fromData, idx, true, seriesModel, api);
	                        updateSingleMarkerEndLayout(toData, idx, false, seriesModel, api);
	                    });
	                    // Update layout of line
	                    mlData.each(function (idx) {
	                        mlData.setItemLayout(idx, [
	                            fromData.getItemLayout(idx),
	                            toData.getItemLayout(idx)
	                        ]);
	                    });

	                    this.markerGroupMap[seriesModel.name].updateLayout();

	                }
	            }, this);
	        },

	        renderSeries: function (seriesModel, mlModel, ecModel, api) {
	            var coordSys = seriesModel.coordinateSystem;
	            var seriesName = seriesModel.name;
	            var seriesData = seriesModel.getData();

	            var lineDrawMap = this.markerGroupMap;
	            var lineDraw = lineDrawMap[seriesName];
	            if (!lineDraw) {
	                lineDraw = lineDrawMap[seriesName] = new LineDraw();
	            }
	            this.group.add(lineDraw.group);

	            var mlData = createList(coordSys, seriesModel, mlModel);

	            var fromData = mlData.from;
	            var toData = mlData.to;
	            var lineData = mlData.line;

	            mlModel.__from = fromData;
	            mlModel.__to = toData;
	            // Line data for tooltip and formatter
	            mlModel.setData(lineData);

	            var symbolType = mlModel.get('symbol');
	            var symbolSize = mlModel.get('symbolSize');
	            if (!zrUtil.isArray(symbolType)) {
	                symbolType = [symbolType, symbolType];
	            }
	            if (typeof symbolSize === 'number') {
	                symbolSize = [symbolSize, symbolSize];
	            }

	            // Update visual and layout of from symbol and to symbol
	            mlData.from.each(function (idx) {
	                updateDataVisualAndLayout(fromData, idx, true);
	                updateDataVisualAndLayout(toData, idx, false);
	            });

	            // Update visual and layout of line
	            lineData.each(function (idx) {
	                var lineColor = lineData.getItemModel(idx).get('lineStyle.normal.color');
	                lineData.setItemVisual(idx, {
	                    color: lineColor || fromData.getItemVisual(idx, 'color')
	                });
	                lineData.setItemLayout(idx, [
	                    fromData.getItemLayout(idx),
	                    toData.getItemLayout(idx)
	                ]);

	                lineData.setItemVisual(idx, {
	                    'fromSymbolSize': fromData.getItemVisual(idx, 'symbolSize'),
	                    'fromSymbol': fromData.getItemVisual(idx, 'symbol'),
	                    'toSymbolSize': toData.getItemVisual(idx, 'symbolSize'),
	                    'toSymbol': toData.getItemVisual(idx, 'symbol')
	                });
	            });

	            lineDraw.updateData(lineData);

	            // Set host model for tooltip
	            // FIXME
	            mlData.line.eachItemGraphicEl(function (el, idx) {
	                el.traverse(function (child) {
	                    child.dataModel = mlModel;
	                });
	            });

	            function updateDataVisualAndLayout(data, idx, isFrom) {
	                var itemModel = data.getItemModel(idx);

	                updateSingleMarkerEndLayout(
	                    data, idx, isFrom, seriesModel, api
	                );

	                data.setItemVisual(idx, {
	                    symbolSize: itemModel.get('symbolSize') || symbolSize[isFrom ? 0 : 1],
	                    symbol: itemModel.get('symbol', true) || symbolType[isFrom ? 0 : 1],
	                    color: itemModel.get('itemStyle.normal.color') || seriesData.getVisual('color')
	                });
	            }

	            lineDraw.__keep = true;

	            lineDraw.group.silent = mlModel.get('silent') || seriesModel.get('silent');
	        }
	    });

	    /**
	     * @inner
	     * @param {module:echarts/coord/*} coordSys
	     * @param {module:echarts/model/Series} seriesModel
	     * @param {module:echarts/model/Model} mpModel
	     */
	    function createList(coordSys, seriesModel, mlModel) {

	        var coordDimsInfos;
	        if (coordSys) {
	            coordDimsInfos = zrUtil.map(coordSys && coordSys.dimensions, function (coordDim) {
	                var info = seriesModel.getData().getDimensionInfo(
	                    seriesModel.coordDimToDataDim(coordDim)[0]
	                ) || {}; // In map series data don't have lng and lat dimension. Fallback to same with coordSys
	                info.name = coordDim;
	                return info;
	            });
	        }
	        else {
	            coordDimsInfos =[{
	                name: 'value',
	                type: 'float'
	            }];
	        }

	        var fromData = new List(coordDimsInfos, mlModel);
	        var toData = new List(coordDimsInfos, mlModel);
	        // No dimensions
	        var lineData = new List([], mlModel);

	        var optData = zrUtil.map(mlModel.get('data'), zrUtil.curry(
	            markLineTransform, seriesModel, coordSys, mlModel
	        ));
	        if (coordSys) {
	            optData = zrUtil.filter(
	                optData, zrUtil.curry(markLineFilter, coordSys)
	            );
	        }
	        var dimValueGetter = coordSys ? markerHelper.dimValueGetter : function (item) {
	            return item.value;
	        };
	        fromData.initData(
	            zrUtil.map(optData, function (item) { return item[0]; }),
	            null, dimValueGetter
	        );
	        toData.initData(
	            zrUtil.map(optData, function (item) { return item[1]; }),
	            null, dimValueGetter
	        );
	        lineData.initData(
	            zrUtil.map(optData, function (item) { return item[2]; })
	        );
	        lineData.hasItemOption = true;
	        return {
	            from: fromData,
	            to: toData,
	            line: lineData
	        };
	    }
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 268 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    __webpack_require__(269);
	    __webpack_require__(270);

	    __webpack_require__(1).registerPreprocessor(function (opt) {
	        // Make sure markArea component is enabled
	        opt.markArea = opt.markArea || {};
	    });
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 269 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    return __webpack_require__(261).extend({

	        type: 'markArea',

	        defaultOption: {
	            zlevel: 0,
	            // PENDING
	            z: 1,
	            tooltip: {
	                trigger: 'item'
	            },
	            // markArea should fixed on the coordinate system
	            animation: false,
	            label: {
	                normal: {
	                    show: true,
	                    position: 'top'
	                },
	                emphasis: {
	                    show: true,
	                    position: 'top'
	                }
	            },
	            itemStyle: {
	                normal: {
	                    // color and borderColor default to use color from series
	                    // color: 'auto'
	                    // borderColor: 'auto'
	                    borderWidth: 0
	                }
	            }
	        }
	    });
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 270 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;// TODO Better on polar
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var List = __webpack_require__(30);
	    var numberUtil = __webpack_require__(5);
	    var graphic = __webpack_require__(25);
	    var colorUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/tool/color\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    var markerHelper = __webpack_require__(263);

	    var markAreaTransform = function (seriesModel, coordSys, maModel, item) {
	        var lt = markerHelper.dataTransform(seriesModel, item[0]);
	        var rb = markerHelper.dataTransform(seriesModel, item[1]);
	        var retrieve = zrUtil.retrieve;

	        // FIXME make sure lt is less than rb
	        var ltCoord = lt.coord;
	        var rbCoord = rb.coord;
	        ltCoord[0] = retrieve(ltCoord[0], -Infinity);
	        ltCoord[1] = retrieve(ltCoord[1], -Infinity);

	        rbCoord[0] = retrieve(rbCoord[0], Infinity);
	        rbCoord[1] = retrieve(rbCoord[1], Infinity);

	        // Merge option into one
	        var result = zrUtil.mergeAll([{}, lt, rb]);

	        result.coord = [
	            lt.coord, rb.coord
	        ];
	        result.x0 = lt.x;
	        result.y0 = lt.y;
	        result.x1 = rb.x;
	        result.y1 = rb.y;
	        return result;
	    };

	    function isInifinity(val) {
	        return !isNaN(val) && !isFinite(val);
	    }

	    // If a markArea has one dim
	    function ifMarkLineHasOnlyDim(dimIndex, fromCoord, toCoord, coordSys) {
	        var otherDimIndex = 1 - dimIndex;
	        return isInifinity(fromCoord[otherDimIndex]) && isInifinity(toCoord[otherDimIndex]);
	    }

	    function markAreaFilter(coordSys, item) {
	        var fromCoord = item.coord[0];
	        var toCoord = item.coord[1];
	        if (coordSys.type === 'cartesian2d') {
	            // In case
	            // {
	            //  markArea: {
	            //    data: [{ yAxis: 2 }]
	            //  }
	            // }
	            if (
	                fromCoord && toCoord &&
	                (ifMarkLineHasOnlyDim(1, fromCoord, toCoord, coordSys)
	                || ifMarkLineHasOnlyDim(0, fromCoord, toCoord, coordSys))
	            ) {
	                return true;
	            }
	        }
	        return markerHelper.dataFilter(coordSys, {
	                coord: fromCoord,
	                x: item.x0,
	                y: item.y0
	            })
	            || markerHelper.dataFilter(coordSys, {
	                coord: toCoord,
	                x: item.x1,
	                y: item.y1
	            });
	    }

	    // dims can be ['x0', 'y0'], ['x1', 'y1'], ['x0', 'y1'], ['x1', 'y0']
	    function getSingleMarkerEndPoint(data, idx, dims, seriesModel, api) {
	        var coordSys = seriesModel.coordinateSystem;
	        var itemModel = data.getItemModel(idx);

	        var point;
	        var xPx = numberUtil.parsePercent(itemModel.get(dims[0]), api.getWidth());
	        var yPx = numberUtil.parsePercent(itemModel.get(dims[1]), api.getHeight());
	        if (!isNaN(xPx) && !isNaN(yPx)) {
	            point = [xPx, yPx];
	        }
	        else {
	            // Chart like bar may have there own marker positioning logic
	            if (seriesModel.getMarkerPosition) {
	                // Use the getMarkerPoisition
	                point = seriesModel.getMarkerPosition(
	                    data.getValues(dims, idx)
	                );
	            }
	            else {
	                var x = data.get(dims[0], idx);
	                var y = data.get(dims[1], idx);
	                point = coordSys.dataToPoint([x, y], true);
	            }
	            if (coordSys.type === 'cartesian2d') {
	                var xAxis = coordSys.getAxis('x');
	                var yAxis = coordSys.getAxis('y');
	                var x = data.get(dims[0], idx);
	                var y = data.get(dims[1], idx);
	                if (isInifinity(x)) {
	                    point[0] = xAxis.toGlobalCoord(xAxis.getExtent()[dims[0] === 'x0' ? 0 : 1]);
	                }
	                else if (isInifinity(y)) {
	                    point[1] = yAxis.toGlobalCoord(yAxis.getExtent()[dims[1] === 'y0' ? 0 : 1]);
	                }
	            }

	            // Use x, y if has any
	            if (!isNaN(xPx)) {
	                point[0] = xPx;
	            }
	            if (!isNaN(yPx)) {
	                point[1] = yPx;
	            }
	        }

	        return point;
	    }

	    var dimPermutations = [['x0', 'y0'], ['x1', 'y0'], ['x1', 'y1'], ['x0', 'y1']];

	    __webpack_require__(264).extend({

	        type: 'markArea',

	        updateLayout: function (markAreaModel, ecModel, api) {
	            ecModel.eachSeries(function (seriesModel) {
	                var maModel = seriesModel.markAreaModel;
	                if (maModel) {
	                    var areaData = maModel.getData();
	                    areaData.each(function (idx) {
	                        var points = zrUtil.map(dimPermutations, function (dim) {
	                            return getSingleMarkerEndPoint(areaData, idx, dim, seriesModel, api);
	                        });
	                        // Layout
	                        areaData.setItemLayout(idx, points);
	                        var el = areaData.getItemGraphicEl(idx);
	                        el.setShape('points', points);
	                    });
	                }
	            }, this);
	        },

	        renderSeries: function (seriesModel, maModel, ecModel, api) {
	            var coordSys = seriesModel.coordinateSystem;
	            var seriesName = seriesModel.name;
	            var seriesData = seriesModel.getData();

	            var areaGroupMap = this.markerGroupMap;
	            var polygonGroup = areaGroupMap[seriesName];
	            if (!polygonGroup) {
	                polygonGroup = areaGroupMap[seriesName] = {
	                    group: new graphic.Group()
	                };
	            }
	            this.group.add(polygonGroup.group);
	            polygonGroup.__keep = true;

	            var areaData = createList(coordSys, seriesModel, maModel);

	            // Line data for tooltip and formatter
	            maModel.setData(areaData);

	            // Update visual and layout of line
	            areaData.each(function (idx) {
	                // Layout
	                areaData.setItemLayout(idx, zrUtil.map(dimPermutations, function (dim) {
	                    return getSingleMarkerEndPoint(areaData, idx, dim, seriesModel, api);
	                }));

	                // Visual
	                areaData.setItemVisual(idx, {
	                    color: seriesData.getVisual('color')
	                });
	            });


	            areaData.diff(polygonGroup.__data)
	                .add(function (idx) {
	                    var polygon = new graphic.Polygon({
	                        shape: {
	                            points: areaData.getItemLayout(idx)
	                        }
	                    });
	                    areaData.setItemGraphicEl(idx, polygon);
	                    polygonGroup.group.add(polygon);
	                })
	                .update(function (newIdx, oldIdx) {
	                    var polygon = polygonGroup.__data.getItemGraphicEl(oldIdx);
	                    graphic.updateProps(polygon, {
	                        shape: {
	                            points: areaData.getItemLayout(newIdx)
	                        }
	                    }, maModel, newIdx);
	                    polygonGroup.group.add(polygon);
	                    areaData.setItemGraphicEl(newIdx, polygon);
	                })
	                .remove(function (idx) {
	                    var polygon = polygonGroup.__data.getItemGraphicEl(idx);
	                    polygonGroup.group.remove(polygon);
	                })
	                .execute();

	            areaData.eachItemGraphicEl(function (polygon, idx) {
	                var itemModel = areaData.getItemModel(idx);
	                var labelModel = itemModel.getModel('label.normal');
	                var labelHoverModel = itemModel.getModel('label.emphasis');
	                var color = areaData.getItemVisual(idx, 'color');
	                polygon.useStyle(
	                    zrUtil.defaults(
	                        itemModel.getModel('itemStyle.normal').getItemStyle(),
	                        {
	                            fill: colorUtil.modifyAlpha(color, 0.4),
	                            stroke: color
	                        }
	                    )
	                );

	                polygon.hoverStyle = itemModel.getModel('itemStyle.normal').getItemStyle();

	                var defaultValue = areaData.getName(idx) || '';
	                var textColor = color || polygon.style.fill;
	                graphic.setText(polygon.style, labelModel, textColor);
	                polygon.style.text = zrUtil.retrieve(
	                    maModel.getFormattedLabel(idx, 'normal'),
	                    defaultValue
	                );

	                graphic.setText(polygon.hoverStyle, labelHoverModel, textColor);
	                polygon.hoverStyle.text = zrUtil.retrieve(
	                    maModel.getFormattedLabel(idx, 'emphasis'),
	                    defaultValue
	                );

	                graphic.setHoverStyle(polygon, {});

	                polygon.dataModel = maModel;
	            });

	            polygonGroup.__data = areaData;

	            polygonGroup.group.silent = maModel.get('silent') || seriesModel.get('silent');
	        }
	    });

	    /**
	     * @inner
	     * @param {module:echarts/coord/*} coordSys
	     * @param {module:echarts/model/Series} seriesModel
	     * @param {module:echarts/model/Model} mpModel
	     */
	    function createList(coordSys, seriesModel, maModel) {

	        var coordDimsInfos;
	        var areaData;
	        var dims = ['x0', 'y0', 'x1', 'y1'];
	        if (coordSys) {
	            coordDimsInfos = zrUtil.map(coordSys && coordSys.dimensions, function (coordDim) {
	                var info = seriesModel.getData().getDimensionInfo(
	                    seriesModel.coordDimToDataDim(coordDim)[0]
	                ) || {}; // In map series data don't have lng and lat dimension. Fallback to same with coordSys
	                info.name = coordDim;
	                return info;
	            });
	            areaData = new List(zrUtil.map(dims, function (dim, idx) {
	                return {
	                    name: dim,
	                    type: coordDimsInfos[idx % 2].type
	                };
	            }), maModel);
	        }
	        else {
	            coordDimsInfos =[{
	                name: 'value',
	                type: 'float'
	            }];
	            areaData = new List(coordDimsInfos, maModel);
	        }

	        var optData = zrUtil.map(maModel.get('data'), zrUtil.curry(
	            markAreaTransform, seriesModel, coordSys, maModel
	        ));
	        if (coordSys) {
	            optData = zrUtil.filter(
	                optData, zrUtil.curry(markAreaFilter, coordSys)
	            );
	        }

	        var dimValueGetter = coordSys ? function (item, dimName, dataIndex, dimIndex) {
	            return item.coord[Math.floor(dimIndex / 2)][dimIndex % 2];
	        } : function (item) {
	            return item.value;
	        };
	        areaData.initData(optData, null, dimValueGetter);
	        areaData.hasItemOption = true;
	        return areaData;
	    }
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    __webpack_require__(281);
	    __webpack_require__(283);

	    __webpack_require__(285);
	    __webpack_require__(286);
	    __webpack_require__(287);
	    __webpack_require__(288);
	    __webpack_require__(293);
	    __webpack_require__(294);
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 281 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var featureManager = __webpack_require__(282);
	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    var ToolboxModel = __webpack_require__(1).extendComponentModel({

	        type: 'toolbox',

	        layoutMode: {
	            type: 'box',
	            ignoreSize: true
	        },

	        mergeDefaultAndTheme: function (option) {
	            ToolboxModel.superApply(this, 'mergeDefaultAndTheme', arguments);

	            zrUtil.each(this.option.feature, function (featureOpt, featureName) {
	                var Feature = featureManager.get(featureName);
	                Feature && zrUtil.merge(featureOpt, Feature.defaultOption);
	            });
	        },

	        defaultOption: {

	            show: true,

	            z: 6,

	            zlevel: 0,

	            orient: 'horizontal',

	            left: 'right',

	            top: 'top',

	            // right
	            // bottom

	            backgroundColor: 'transparent',

	            borderColor: '#ccc',

	            borderWidth: 0,

	            padding: 5,

	            itemSize: 15,

	            itemGap: 8,

	            showTitle: true,

	            iconStyle: {
	                normal: {
	                    borderColor: '#666',
	                    color: 'none'
	                },
	                emphasis: {
	                    borderColor: '#3E98C5'
	                }
	            }
	            // textStyle: {},

	            // feature
	        }
	    });

	    return ToolboxModel;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 282 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
	    'use strict';

	    var features = {};

	    return {
	        register: function (name, ctor) {
	            features[name] = ctor;
	        },

	        get: function (name) {
	            return features[name];
	        }
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 283 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process) {!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var featureManager = __webpack_require__(282);
	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var graphic = __webpack_require__(25);
	    var Model = __webpack_require__(6);
	    var DataDiffer = __webpack_require__(31);
	    var listComponentHelper = __webpack_require__(208);
	    var textContain = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/contain/text\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    return __webpack_require__(1).extendComponentView({

	        type: 'toolbox',

	        render: function (toolboxModel, ecModel, api) {
	            var group = this.group;
	            group.removeAll();

	            if (!toolboxModel.get('show')) {
	                return;
	            }

	            var itemSize = +toolboxModel.get('itemSize');
	            var featureOpts = toolboxModel.get('feature') || {};
	            var features = this._features || (this._features = {});

	            var featureNames = [];
	            zrUtil.each(featureOpts, function (opt, name) {
	                featureNames.push(name);
	            });

	            (new DataDiffer(this._featureNames || [], featureNames))
	                .add(process)
	                .update(process)
	                .remove(zrUtil.curry(process, null))
	                .execute();

	            // Keep for diff.
	            this._featureNames = featureNames;

	            function process(newIndex, oldIndex) {
	                var featureName = featureNames[newIndex];
	                var oldName = featureNames[oldIndex];
	                var featureOpt = featureOpts[featureName];
	                var featureModel = new Model(featureOpt, toolboxModel, toolboxModel.ecModel);
	                var feature;

	                if (featureName && !oldName) { // Create
	                    if (isUserFeatureName(featureName)) {
	                        feature = {
	                            model: featureModel,
	                            onclick: featureModel.option.onclick,
	                            featureName: featureName
	                        };
	                    }
	                    else {
	                        var Feature = featureManager.get(featureName);
	                        if (!Feature) {
	                            return;
	                        }
	                        feature = new Feature(featureModel, ecModel, api);
	                    }
	                    features[featureName] = feature;
	                }
	                else {
	                    feature = features[oldName];
	                    // If feature does not exsit.
	                    if (!feature) {
	                        return;
	                    }
	                    feature.model = featureModel;
	                    feature.ecModel = ecModel;
	                    feature.api = api;
	                }

	                if (!featureName && oldName) {
	                    feature.dispose && feature.dispose(ecModel, api);
	                    return;
	                }

	                if (!featureModel.get('show') || feature.unusable) {
	                    feature.remove && feature.remove(ecModel, api);
	                    return;
	                }

	                createIconPaths(featureModel, feature, featureName);

	                featureModel.setIconStatus = function (iconName, status) {
	                    var option = this.option;
	                    var iconPaths = this.iconPaths;
	                    option.iconStatus = option.iconStatus || {};
	                    option.iconStatus[iconName] = status;
	                    // FIXME
	                    iconPaths[iconName] && iconPaths[iconName].trigger(status);
	                };

	                if (feature.render) {
	                    feature.render(featureModel, ecModel, api);
	                }
	            }

	            function createIconPaths(featureModel, feature, featureName) {
	                var iconStyleModel = featureModel.getModel('iconStyle');

	                // If one feature has mutiple icon. they are orginaized as
	                // {
	                //     icon: {
	                //         foo: '',
	                //         bar: ''
	                //     },
	                //     title: {
	                //         foo: '',
	                //         bar: ''
	                //     }
	                // }
	                var icons = feature.getIcons ? feature.getIcons() : featureModel.get('icon');
	                var titles = featureModel.get('title') || {};
	                if (typeof icons === 'string') {
	                    var icon = icons;
	                    var title = titles;
	                    icons = {};
	                    titles = {};
	                    icons[featureName] = icon;
	                    titles[featureName] = title;
	                }
	                var iconPaths = featureModel.iconPaths = {};
	                zrUtil.each(icons, function (icon, iconName) {
	                    var normalStyle = iconStyleModel.getModel('normal').getItemStyle();
	                    var hoverStyle = iconStyleModel.getModel('emphasis').getItemStyle();

	                    var style = {
	                        x: -itemSize / 2,
	                        y: -itemSize / 2,
	                        width: itemSize,
	                        height: itemSize
	                    };
	                    var path = icon.indexOf('image://') === 0
	                        ? (
	                            style.image = icon.slice(8),
	                            new graphic.Image({style: style})
	                        )
	                        : graphic.makePath(
	                            icon.replace('path://', ''),
	                            {
	                                style: normalStyle,
	                                hoverStyle: hoverStyle,
	                                rectHover: true
	                            },
	                            style,
	                            'center'
	                        );

	                    graphic.setHoverStyle(path);

	                    if (toolboxModel.get('showTitle')) {
	                        path.__title = titles[iconName];
	                        path.on('mouseover', function () {
	                                path.setStyle({
	                                    text: titles[iconName],
	                                    textPosition: hoverStyle.textPosition || 'bottom',
	                                    textFill: hoverStyle.fill || hoverStyle.stroke || '#000',
	                                    textAlign: hoverStyle.textAlign || 'center'
	                                });
	                            })
	                            .on('mouseout', function () {
	                                path.setStyle({
	                                    textFill: null
	                                });
	                            });
	                    }
	                    path.trigger(featureModel.get('iconStatus.' + iconName) || 'normal');

	                    group.add(path);
	                    path.on('click', zrUtil.bind(
	                        feature.onclick, feature, ecModel, api, iconName
	                    ));

	                    iconPaths[iconName] = path;
	                });
	            }

	            listComponentHelper.layout(group, toolboxModel, api);
	            // Render background after group is layout
	            // FIXME
	            listComponentHelper.addBackground(group, toolboxModel);

	            // Adjust icon title positions to avoid them out of screen
	            group.eachChild(function (icon) {
	                var titleText = icon.__title;
	                var hoverStyle = icon.hoverStyle;
	                // May be background element
	                if (hoverStyle && titleText) {
	                    var rect = textContain.getBoundingRect(
	                        titleText, hoverStyle.font
	                    );
	                    var offsetX = icon.position[0] + group.position[0];
	                    var offsetY = icon.position[1] + group.position[1] + itemSize;

	                    var needPutOnTop = false;
	                    if (offsetY + rect.height > api.getHeight()) {
	                        hoverStyle.textPosition = 'top';
	                        needPutOnTop = true;
	                    }
	                    var topOffset = needPutOnTop ? (-5 - rect.height) : (itemSize + 8);
	                    if (offsetX + rect.width /  2 > api.getWidth()) {
	                        hoverStyle.textPosition = ['100%', topOffset];
	                        hoverStyle.textAlign = 'right';
	                    }
	                    else if (offsetX - rect.width / 2 < 0) {
	                        hoverStyle.textPosition = [0, topOffset];
	                        hoverStyle.textAlign = 'left';
	                    }
	                }
	            });
	        },

	        remove: function (ecModel, api) {
	            zrUtil.each(this._features, function (feature) {
	                feature.remove && feature.remove(ecModel, api);
	            });
	            this.group.removeAll();
	        },

	        dispose: function (ecModel, api) {
	            zrUtil.each(this._features, function (feature) {
	                feature.dispose && feature.dispose(ecModel, api);
	            });
	        }
	    });

	    function isUserFeatureName(featureName) {
	        return featureName.indexOf('my') === 0;
	    }

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(284)))

/***/ },
/* 284 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	(function () {
	  try {
	    cachedSetTimeout = setTimeout;
	  } catch (e) {
	    cachedSetTimeout = function () {
	      throw new Error('setTimeout is not defined');
	    }
	  }
	  try {
	    cachedClearTimeout = clearTimeout;
	  } catch (e) {
	    cachedClearTimeout = function () {
	      throw new Error('clearTimeout is not defined');
	    }
	  }
	} ())
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = cachedSetTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    cachedClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        cachedSetTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 285 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var env = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/env\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    function SaveAsImage (model) {
	        this.model = model;
	    }

	    SaveAsImage.defaultOption = {
	        show: true,
	        icon: 'M4.7,22.9L29.3,45.5L54.7,23.4M4.6,43.6L4.6,58L53.8,58L53.8,43.6M29.2,45.1L29.2,0',
	        title: '保存为图片',
	        type: 'png',
	        // Default use option.backgroundColor
	        // backgroundColor: '#fff',
	        name: '',
	        excludeComponents: ['toolbox'],
	        pixelRatio: 1,
	        lang: ['右键另存为图片']
	    };

	    SaveAsImage.prototype.unusable = !env.canvasSupported;

	    var proto = SaveAsImage.prototype;

	    proto.onclick = function (ecModel, api) {
	        var model = this.model;
	        var title = model.get('name') || ecModel.get('title.0.text') || 'echarts';
	        var $a = document.createElement('a');
	        var type = model.get('type', true) || 'png';
	        $a.download = title + '.' + type;
	        $a.target = '_blank';
	        var url = api.getConnectedDataURL({
	            type: type,
	            backgroundColor: model.get('backgroundColor', true)
	                || ecModel.get('backgroundColor') || '#fff',
	            excludeComponents: model.get('excludeComponents'),
	            pixelRatio: model.get('pixelRatio')
	        });
	        $a.href = url;
	        // Chrome and Firefox
	        if (typeof MouseEvent === 'function') {
	            var evt = new MouseEvent('click', {
	                view: window,
	                bubbles: true,
	                cancelable: false
	            });
	            $a.dispatchEvent(evt);
	        }
	        // IE
	        else {
	            var lang = model.get('lang');
	            var html = ''
	                + '<body style="margin:0;">'
	                + '<img src="' + url + '" style="max-width:100%;" title="' + ((lang && lang[0]) || '') + '" />'
	                + '</body>';
	            var tab = window.open();
	            tab.document.write(html);
	        }
	    };

	    __webpack_require__(282).register(
	        'saveAsImage', SaveAsImage
	    );

	    return SaveAsImage;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 286 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
	    'use strict';

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    function MagicType(model) {
	        this.model = model;
	    }

	    MagicType.defaultOption = {
	        show: true,
	        type: [],
	        // Icon group
	        icon: {
	            line: 'M4.1,28.9h7.1l9.3-22l7.4,38l9.7-19.7l3,12.8h14.9M4.1,58h51.4',
	            bar: 'M6.7,22.9h10V48h-10V22.9zM24.9,13h10v35h-10V13zM43.2,2h10v46h-10V2zM3.1,58h53.7',
	            stack: 'M8.2,38.4l-8.4,4.1l30.6,15.3L60,42.5l-8.1-4.1l-21.5,11L8.2,38.4z M51.9,30l-8.1,4.2l-13.4,6.9l-13.9-6.9L8.2,30l-8.4,4.2l8.4,4.2l22.2,11l21.5-11l8.1-4.2L51.9,30z M51.9,21.7l-8.1,4.2L35.7,30l-5.3,2.8L24.9,30l-8.4-4.1l-8.3-4.2l-8.4,4.2L8.2,30l8.3,4.2l13.9,6.9l13.4-6.9l8.1-4.2l8.1-4.1L51.9,21.7zM30.4,2.2L-0.2,17.5l8.4,4.1l8.3,4.2l8.4,4.2l5.5,2.7l5.3-2.7l8.1-4.2l8.1-4.2l8.1-4.1L30.4,2.2z', // jshint ignore:line
	            tiled: 'M2.3,2.2h22.8V25H2.3V2.2z M35,2.2h22.8V25H35V2.2zM2.3,35h22.8v22.8H2.3V35z M35,35h22.8v22.8H35V35z'
	        },
	        title: {
	            line: '切换为折线图',
	            bar: '切换为柱状图',
	            stack: '切换为堆叠',
	            tiled: '切换为平铺'
	        },
	        option: {},
	        seriesIndex: {}
	    };

	    var proto = MagicType.prototype;

	    proto.getIcons = function () {
	        var model = this.model;
	        var availableIcons = model.get('icon');
	        var icons = {};
	        zrUtil.each(model.get('type'), function (type) {
	            if (availableIcons[type]) {
	                icons[type] = availableIcons[type];
	            }
	        });
	        return icons;
	    };

	    var seriesOptGenreator = {
	        'line': function (seriesType, seriesId, seriesModel, model) {
	            if (seriesType === 'bar') {
	                return zrUtil.merge({
	                    id: seriesId,
	                    type: 'line',
	                    // Preserve data related option
	                    data: seriesModel.get('data'),
	                    stack: seriesModel.get('stack'),
	                    markPoint: seriesModel.get('markPoint'),
	                    markLine: seriesModel.get('markLine')
	                }, model.get('option.line') || {}, true);
	            }
	        },
	        'bar': function (seriesType, seriesId, seriesModel, model) {
	            if (seriesType === 'line') {
	                return zrUtil.merge({
	                    id: seriesId,
	                    type: 'bar',
	                    // Preserve data related option
	                    data: seriesModel.get('data'),
	                    stack: seriesModel.get('stack'),
	                    markPoint: seriesModel.get('markPoint'),
	                    markLine: seriesModel.get('markLine')
	                }, model.get('option.bar') || {}, true);
	            }
	        },
	        'stack': function (seriesType, seriesId, seriesModel, model) {
	            if (seriesType === 'line' || seriesType === 'bar') {
	                return zrUtil.merge({
	                    id: seriesId,
	                    stack: '__ec_magicType_stack__'
	                }, model.get('option.stack') || {}, true);
	            }
	        },
	        'tiled': function (seriesType, seriesId, seriesModel, model) {
	            if (seriesType === 'line' || seriesType === 'bar') {
	                return zrUtil.merge({
	                    id: seriesId,
	                    stack: ''
	                }, model.get('option.tiled') || {}, true);
	            }
	        }
	    };

	    var radioTypes = [
	        ['line', 'bar'],
	        ['stack', 'tiled']
	    ];

	    proto.onclick = function (ecModel, api, type) {
	        var model = this.model;
	        var seriesIndex = model.get('seriesIndex.' + type);
	        // Not supported magicType
	        if (!seriesOptGenreator[type]) {
	            return;
	        }
	        var newOption = {
	            series: []
	        };
	        var generateNewSeriesTypes = function (seriesModel) {
	            var seriesType = seriesModel.subType;
	            var seriesId = seriesModel.id;
	            var newSeriesOpt = seriesOptGenreator[type](
	                seriesType, seriesId, seriesModel, model
	            );
	            if (newSeriesOpt) {
	                // PENDING If merge original option?
	                zrUtil.defaults(newSeriesOpt, seriesModel.option);
	                newOption.series.push(newSeriesOpt);
	            }
	            // Modify boundaryGap
	            var coordSys = seriesModel.coordinateSystem;
	            if (coordSys && coordSys.type === 'cartesian2d' && (type === 'line' || type === 'bar')) {
	                var categoryAxis = coordSys.getAxesByScale('ordinal')[0];
	                if (categoryAxis) {
	                    var axisDim = categoryAxis.dim;
	                    var axisIndex = seriesModel.get(axisDim + 'AxisIndex');
	                    var axisKey = axisDim + 'Axis';
	                    newOption[axisKey] = newOption[axisKey] || [];
	                    for (var i = 0; i <= axisIndex; i++) {
	                        newOption[axisKey][axisIndex] = newOption[axisKey][axisIndex] || {};
	                    }
	                    newOption[axisKey][axisIndex].boundaryGap = type === 'bar' ? true : false;
	                }
	            }
	        };

	        zrUtil.each(radioTypes, function (radio) {
	            if (zrUtil.indexOf(radio, type) >= 0) {
	                zrUtil.each(radio, function (item) {
	                    model.setIconStatus(item, 'normal');
	                });
	            }
	        });

	        model.setIconStatus(type, 'emphasis');

	        ecModel.eachComponent(
	            {
	                mainType: 'series',
	                query: seriesIndex == null ? null : {
	                    seriesIndex: seriesIndex
	                }
	            }, generateNewSeriesTypes
	        );
	        api.dispatchAction({
	            type: 'changeMagicType',
	            currentType: type,
	            newOption: newOption
	        });
	    };

	    var echarts = __webpack_require__(1);
	    echarts.registerAction({
	        type: 'changeMagicType',
	        event: 'magicTypeChanged',
	        update: 'prepareAndUpdate'
	    }, function (payload, ecModel) {
	        ecModel.mergeOption(payload.newOption);
	    });

	    __webpack_require__(282).register('magicType', MagicType);

	    return MagicType;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 287 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @module echarts/component/toolbox/feature/DataView
	 */

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var eventTool = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/event\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));


	    var BLOCK_SPLITER = new Array(60).join('-');
	    var ITEM_SPLITER = '\t';
	    /**
	     * Group series into two types
	     *  1. on category axis, like line, bar
	     *  2. others, like scatter, pie
	     * @param {module:echarts/model/Global} ecModel
	     * @return {Object}
	     * @inner
	     */
	    function groupSeries(ecModel) {
	        var seriesGroupByCategoryAxis = {};
	        var otherSeries = [];
	        var meta = [];
	        ecModel.eachRawSeries(function (seriesModel) {
	            var coordSys = seriesModel.coordinateSystem;

	            if (coordSys && (coordSys.type === 'cartesian2d' || coordSys.type === 'polar')) {
	                var baseAxis = coordSys.getBaseAxis();
	                if (baseAxis.type === 'category') {
	                    var key = baseAxis.dim + '_' + baseAxis.index;
	                    if (!seriesGroupByCategoryAxis[key]) {
	                        seriesGroupByCategoryAxis[key] = {
	                            categoryAxis: baseAxis,
	                            valueAxis: coordSys.getOtherAxis(baseAxis),
	                            series: []
	                        };
	                        meta.push({
	                            axisDim: baseAxis.dim,
	                            axisIndex: baseAxis.index
	                        });
	                    }
	                    seriesGroupByCategoryAxis[key].series.push(seriesModel);
	                }
	                else {
	                    otherSeries.push(seriesModel);
	                }
	            }
	            else {
	                otherSeries.push(seriesModel);
	            }
	        });

	        return {
	            seriesGroupByCategoryAxis: seriesGroupByCategoryAxis,
	            other: otherSeries,
	            meta: meta
	        };
	    }

	    /**
	     * Assemble content of series on cateogory axis
	     * @param {Array.<module:echarts/model/Series>} series
	     * @return {string}
	     * @inner
	     */
	    function assembleSeriesWithCategoryAxis(series) {
	        var tables = [];
	        zrUtil.each(series, function (group, key) {
	            var categoryAxis = group.categoryAxis;
	            var valueAxis = group.valueAxis;
	            var valueAxisDim = valueAxis.dim;

	            var headers = [' '].concat(zrUtil.map(group.series, function (series) {
	                return series.name;
	            }));
	            var columns = [categoryAxis.model.getCategories()];
	            zrUtil.each(group.series, function (series) {
	                columns.push(series.getRawData().mapArray(valueAxisDim, function (val) {
	                    return val;
	                }));
	            });
	            // Assemble table content
	            var lines = [headers.join(ITEM_SPLITER)];
	            for (var i = 0; i < columns[0].length; i++) {
	                var items = [];
	                for (var j = 0; j < columns.length; j++) {
	                    items.push(columns[j][i]);
	                }
	                lines.push(items.join(ITEM_SPLITER));
	            }
	            tables.push(lines.join('\n'));
	        });
	        return tables.join('\n\n' +  BLOCK_SPLITER + '\n\n');
	    }

	    /**
	     * Assemble content of other series
	     * @param {Array.<module:echarts/model/Series>} series
	     * @return {string}
	     * @inner
	     */
	    function assembleOtherSeries(series) {
	        return zrUtil.map(series, function (series) {
	            var data = series.getRawData();
	            var lines = [series.name];
	            var vals = [];
	            data.each(data.dimensions, function () {
	                var argLen = arguments.length;
	                var dataIndex = arguments[argLen - 1];
	                var name = data.getName(dataIndex);
	                for (var i = 0; i < argLen - 1; i++) {
	                    vals[i] = arguments[i];
	                }
	                lines.push((name ? (name + ITEM_SPLITER) : '') + vals.join(ITEM_SPLITER));
	            });
	            return lines.join('\n');
	        }).join('\n\n' + BLOCK_SPLITER + '\n\n');
	    }

	    /**
	     * @param {module:echarts/model/Global}
	     * @return {string}
	     * @inner
	     */
	    function getContentFromModel(ecModel) {

	        var result = groupSeries(ecModel);

	        return {
	            value: zrUtil.filter([
	                    assembleSeriesWithCategoryAxis(result.seriesGroupByCategoryAxis),
	                    assembleOtherSeries(result.other)
	                ], function (str) {
	                    return str.replace(/[\n\t\s]/g, '');
	                }).join('\n\n' + BLOCK_SPLITER + '\n\n'),

	            meta: result.meta
	        };
	    }


	    function trim(str) {
	        return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	    }
	    /**
	     * If a block is tsv format
	     */
	    function isTSVFormat(block) {
	        // Simple method to find out if a block is tsv format
	        var firstLine = block.slice(0, block.indexOf('\n'));
	        if (firstLine.indexOf(ITEM_SPLITER) >= 0) {
	            return true;
	        }
	    }

	    var itemSplitRegex = new RegExp('[' + ITEM_SPLITER + ']+', 'g');
	    /**
	     * @param {string} tsv
	     * @return {Array.<Object>}
	     */
	    function parseTSVContents(tsv) {
	        var tsvLines = tsv.split(/\n+/g);
	        var headers = trim(tsvLines.shift()).split(itemSplitRegex);

	        var categories = [];
	        var series = zrUtil.map(headers, function (header) {
	            return {
	                name: header,
	                data: []
	            };
	        });
	        for (var i = 0; i < tsvLines.length; i++) {
	            var items = trim(tsvLines[i]).split(itemSplitRegex);
	            categories.push(items.shift());
	            for (var j = 0; j < items.length; j++) {
	                series[j] && (series[j].data[i] = items[j]);
	            }
	        }
	        return {
	            series: series,
	            categories: categories
	        };
	    }

	    /**
	     * @param {string} str
	     * @return {Array.<Object>}
	     * @inner
	     */
	    function parseListContents(str) {
	        var lines = str.split(/\n+/g);
	        var seriesName = trim(lines.shift());

	        var data = [];
	        for (var i = 0; i < lines.length; i++) {
	            var items = trim(lines[i]).split(itemSplitRegex);
	            var name = '';
	            var value;
	            var hasName = false;
	            if (isNaN(items[0])) { // First item is name
	                hasName = true;
	                name = items[0];
	                items = items.slice(1);
	                data[i] = {
	                    name: name,
	                    value: []
	                };
	                value = data[i].value;
	            }
	            else {
	                value = data[i] = [];
	            }
	            for (var j = 0; j < items.length; j++) {
	                value.push(+items[j]);
	            }
	            if (value.length === 1) {
	                hasName ? (data[i].value = value[0]) : (data[i] = value[0]);
	            }
	        }

	        return {
	            name: seriesName,
	            data: data
	        };
	    }

	    /**
	     * @param {string} str
	     * @param {Array.<Object>} blockMetaList
	     * @return {Object}
	     * @inner
	     */
	    function parseContents(str, blockMetaList) {
	        var blocks = str.split(new RegExp('\n*' + BLOCK_SPLITER + '\n*', 'g'));
	        var newOption = {
	            series: []
	        };
	        zrUtil.each(blocks, function (block, idx) {
	            if (isTSVFormat(block)) {
	                var result = parseTSVContents(block);
	                var blockMeta = blockMetaList[idx];
	                var axisKey = blockMeta.axisDim + 'Axis';

	                if (blockMeta) {
	                    newOption[axisKey] = newOption[axisKey] || [];
	                    newOption[axisKey][blockMeta.axisIndex] = {
	                        data: result.categories
	                    };
	                    newOption.series = newOption.series.concat(result.series);
	                }
	            }
	            else {
	                var result = parseListContents(block);
	                newOption.series.push(result);
	            }
	        });
	        return newOption;
	    }

	    /**
	     * @alias {module:echarts/component/toolbox/feature/DataView}
	     * @constructor
	     * @param {module:echarts/model/Model} model
	     */
	    function DataView(model) {

	        this._dom = null;

	        this.model = model;
	    }

	    DataView.defaultOption = {
	        show: true,
	        readOnly: false,
	        optionToContent: null,
	        contentToOption: null,

	        icon: 'M17.5,17.3H33 M17.5,17.3H33 M45.4,29.5h-28 M11.5,2v56H51V14.8L38.4,2H11.5z M38.4,2.2v12.7H51 M45.4,41.7h-28',
	        title: '数据视图',
	        lang: ['数据视图', '关闭', '刷新'],
	        backgroundColor: '#fff',
	        textColor: '#000',
	        textareaColor: '#fff',
	        textareaBorderColor: '#333',
	        buttonColor: '#c23531',
	        buttonTextColor: '#fff'
	    };

	    DataView.prototype.onclick = function (ecModel, api) {
	        var container = api.getDom();
	        var model = this.model;
	        if (this._dom) {
	            container.removeChild(this._dom);
	        }
	        var root = document.createElement('div');
	        root.style.cssText = 'position:absolute;left:5px;top:5px;bottom:5px;right:5px;';
	        root.style.backgroundColor = model.get('backgroundColor') || '#fff';

	        // Create elements
	        var header = document.createElement('h4');
	        var lang = model.get('lang') || [];
	        header.innerHTML = lang[0] || model.get('title');
	        header.style.cssText = 'margin: 10px 20px;';
	        header.style.color = model.get('textColor');

	        var viewMain = document.createElement('div');
	        var textarea = document.createElement('textarea');
	        viewMain.style.cssText = 'display:block;width:100%;overflow:hidden;';

	        var optionToContent = model.get('optionToContent');
	        var contentToOption = model.get('contentToOption');
	        var result = getContentFromModel(ecModel);
	        if (typeof optionToContent === 'function') {
	            var htmlOrDom = optionToContent(api.getOption());
	            if (typeof htmlOrDom === 'string') {
	                viewMain.innerHTML = htmlOrDom;
	            }
	            else if (zrUtil.isDom(htmlOrDom)) {
	                viewMain.appendChild(htmlOrDom);
	            }
	        }
	        else {
	            // Use default textarea
	            viewMain.appendChild(textarea);
	            textarea.readOnly = model.get('readOnly');
	            textarea.style.cssText = 'width:100%;height:100%;font-family:monospace;font-size:14px;line-height:1.6rem;';
	            textarea.style.color = model.get('textColor');
	            textarea.style.borderColor = model.get('textareaBorderColor');
	            textarea.style.backgroundColor = model.get('textareaColor');
	            textarea.value = result.value;
	        }

	        var blockMetaList = result.meta;

	        var buttonContainer = document.createElement('div');
	        buttonContainer.style.cssText = 'position:absolute;bottom:0;left:0;right:0;';

	        var buttonStyle = 'float:right;margin-right:20px;border:none;'
	            + 'cursor:pointer;padding:2px 5px;font-size:12px;border-radius:3px';
	        var closeButton = document.createElement('div');
	        var refreshButton = document.createElement('div');

	        buttonStyle += ';background-color:' + model.get('buttonColor');
	        buttonStyle += ';color:' + model.get('buttonTextColor');

	        var self = this;

	        function close() {
	            container.removeChild(root);
	            self._dom = null;
	        }
	        eventTool.addEventListener(closeButton, 'click', close);

	        eventTool.addEventListener(refreshButton, 'click', function () {
	            var newOption;
	            try {
	                if (typeof contentToOption === 'function') {
	                    newOption = contentToOption(viewMain, api.getOption());
	                }
	                else {
	                    newOption = parseContents(textarea.value, blockMetaList);
	                }
	            }
	            catch (e) {
	                close();
	                throw new Error('Data view format error ' + e);
	            }
	            if (newOption) {
	                api.dispatchAction({
	                    type: 'changeDataView',
	                    newOption: newOption
	                });
	            }

	            close();
	        });

	        closeButton.innerHTML = lang[1];
	        refreshButton.innerHTML = lang[2];
	        refreshButton.style.cssText = buttonStyle;
	        closeButton.style.cssText = buttonStyle;

	        !model.get('readOnly') && buttonContainer.appendChild(refreshButton);
	        buttonContainer.appendChild(closeButton);

	        // http://stackoverflow.com/questions/6637341/use-tab-to-indent-in-textarea
	        eventTool.addEventListener(textarea, 'keydown', function (e) {
	            if ((e.keyCode || e.which) === 9) {
	                // get caret position/selection
	                var val = this.value;
	                var start = this.selectionStart;
	                var end = this.selectionEnd;

	                // set textarea value to: text before caret + tab + text after caret
	                this.value = val.substring(0, start) + ITEM_SPLITER + val.substring(end);

	                // put caret at right position again
	                this.selectionStart = this.selectionEnd = start + 1;

	                // prevent the focus lose
	                eventTool.stop(e);
	            }
	        });

	        root.appendChild(header);
	        root.appendChild(viewMain);
	        root.appendChild(buttonContainer);

	        viewMain.style.height = (container.clientHeight - 80) + 'px';

	        container.appendChild(root);
	        this._dom = root;
	    };

	    DataView.prototype.remove = function (ecModel, api) {
	        this._dom && api.getDom().removeChild(this._dom);
	    };

	    DataView.prototype.dispose = function (ecModel, api) {
	        this.remove(ecModel, api);
	    };

	    /**
	     * @inner
	     */
	    function tryMergeDataOption(newData, originalData) {
	        return zrUtil.map(newData, function (newVal, idx) {
	            var original = originalData && originalData[idx];
	            if (zrUtil.isObject(original) && !zrUtil.isArray(original)) {
	                if (zrUtil.isObject(newVal) && !zrUtil.isArray(newVal)) {
	                    newVal = newVal.value;
	                }
	                // Original data has option
	                return zrUtil.defaults({
	                    value: newVal
	                }, original);
	            }
	            else {
	                return newVal;
	            }
	        });
	    }

	    __webpack_require__(282).register('dataView', DataView);

	    __webpack_require__(1).registerAction({
	        type: 'changeDataView',
	        event: 'dataViewChanged',
	        update: 'prepareAndUpdate'
	    }, function (payload, ecModel) {
	        var newSeriesOptList = [];
	        zrUtil.each(payload.newOption.series, function (seriesOpt) {
	            var seriesModel = ecModel.getSeriesByName(seriesOpt.name)[0];
	            if (!seriesModel) {
	                // New created series
	                // Geuss the series type
	                newSeriesOptList.push(zrUtil.extend({
	                    // Default is scatter
	                    type: 'scatter'
	                }, seriesOpt));
	            }
	            else {
	                var originalData = seriesModel.get('data');
	                newSeriesOptList.push({
	                    name: seriesOpt.name,
	                    data: tryMergeDataOption(seriesOpt.data, originalData)
	                });
	            }
	        });

	        ecModel.mergeOption(zrUtil.defaults({
	            series: newSeriesOptList
	        }, payload.newOption));
	    });

	    return DataView;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 288 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
	    'use strict';

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var numberUtil = __webpack_require__(5);
	    var BrushController = __webpack_require__(165);
	    var BoundingRect = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/BoundingRect\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var history = __webpack_require__(289);

	    var each = zrUtil.each;
	    var asc = numberUtil.asc;

	    // Use dataZoomSelect
	    __webpack_require__(290);

	    // Spectial component id start with \0ec\0, see echarts/model/Global.js~hasInnerId
	    var DATA_ZOOM_ID_BASE = '\0_ec_\0toolbox-dataZoom_';

	    function DataZoom(model, ecModel, api) {

	        this.model = model;
	        this.ecModel = ecModel;
	        this.api = api;

	        /**
	         * @private
	         * @type {module:echarts/component/helper/BrushController}
	         */
	        (this._brushController = new BrushController(api.getZr()))
	            .on('brush', zrUtil.bind(this._onBrush, this))
	            .mount();

	        /**
	         * Is zoom active.
	         * @private
	         * @type {Object}
	         */
	        this._isZoomActive;
	    }

	    DataZoom.defaultOption = {
	        show: true,
	        // Icon group
	        icon: {
	            zoom: 'M0,13.5h26.9 M13.5,26.9V0 M32.1,13.5H58V58H13.5 V32.1',
	            back: 'M22,1.4L9.9,13.5l12.3,12.3 M10.3,13.5H54.9v44.6 H10.3v-26'
	        },
	        title: {
	            zoom: '区域缩放',
	            back: '区域缩放还原'
	        }
	    };

	    var proto = DataZoom.prototype;

	    proto.render = function (featureModel, ecModel, api) {
	        updateBackBtnStatus(featureModel, ecModel);
	    };

	    proto.onclick = function (ecModel, api, type) {
	        handlers[type].call(this);
	    };

	    proto.remove = function (ecModel, api) {
	        this._brushController.unmount();
	    };

	    proto.dispose = function (ecModel, api) {
	        this._brushController.dispose();
	    };

	    /**
	     * @private
	     */
	    var handlers = {

	        zoom: function () {
	            var nextActive = !this._isZoomActive;
	            var controller = this._brushController;

	            if (nextActive) {
	                this._isZoomActive = nextActive;
	                this.model.setIconStatus('zoom', 'emphasis');

	                controller.enableBrush({
	                    brushType: 'rect',
	                    brushStyle: {
	                        // FIXME
	                        // user customized?
	                        lineWidth: 3,
	                        stroke: '#333',
	                        fill: 'rgba(0,0,0,0.2)'
	                    },
	                    // FIXME
	                    // 是否应通过触发 action 的方式来互斥而非 onRelease？
	                    onRelease: zrUtil.bind(onRelease, this)
	                });
	            }
	            else {
	                controller.enableBrush(false);
	            }

	            function onRelease() {
	                this.model.setIconStatus('zoom', 'normal');
	                this._isZoomActive = false;
	            }
	        },

	        back: function () {
	            this._dispatchAction(history.pop(this.ecModel));
	        }
	    };

	    function prepareCoordInfo(grid, ecModel) {
	        // Default use the first axis.
	        // FIXME
	        var coordInfo = [
	            {axisModel: grid.getAxis('x').model, axisIndex: 0}, // x
	            {axisModel: grid.getAxis('y').model, axisIndex: 0}  // y
	        ];
	        coordInfo.grid = grid;

	        ecModel.eachComponent(
	            {mainType: 'dataZoom', subType: 'select'},
	            function (dzModel, dataZoomIndex) {
	                if (isTheAxis('xAxis', coordInfo[0].axisModel, dzModel, ecModel)) {
	                    coordInfo[0].dataZoomModel = dzModel;
	                }
	                if (isTheAxis('yAxis', coordInfo[1].axisModel, dzModel, ecModel)) {
	                    coordInfo[1].dataZoomModel = dzModel;
	                }
	            }
	        );

	        return coordInfo;
	    }

	    function isTheAxis(axisName, axisModel, dataZoomModel, ecModel) {
	        var axisIndex = dataZoomModel.get(axisName + 'Index');
	        return axisIndex != null
	            && ecModel.getComponent(axisName, axisIndex) === axisModel;
	    }

	    /**
	     * @private
	     */
	    proto._onBrush = function (brushRanges, opt) {
	        if (!opt.isEnd || !brushRanges.length) {
	            return;
	        }
	        var brushRange = brushRanges[0];

	        this._brushController.updateCovers([]); // remove cover

	        var snapshot = {};
	        var ecModel = this.ecModel;

	        // FIXME
	        // polar

	        ecModel.eachComponent('grid', function (gridModel, gridIndex) {
	            var grid = gridModel.coordinateSystem;
	            var coordInfo = prepareCoordInfo(grid, ecModel);
	            var selDataRange = pointToDataInCartesian(brushRange, coordInfo);

	            if (selDataRange) {
	                var xBatchItem = scaleCartesianAxis(selDataRange, coordInfo, 0, 'x');
	                var yBatchItem = scaleCartesianAxis(selDataRange, coordInfo, 1, 'y');

	                xBatchItem && (snapshot[xBatchItem.dataZoomId] = xBatchItem);
	                yBatchItem && (snapshot[yBatchItem.dataZoomId] = yBatchItem);
	            }
	        }, this);

	        history.push(ecModel, snapshot);

	        this._dispatchAction(snapshot);
	    };

	    function pointToDataInCartesian(brushRange, coordInfo) {
	        var grid = coordInfo.grid;
	        var range = brushRange.range;

	        var selRect = new BoundingRect(
	            range[0][0],
	            range[1][0],
	            range[0][1] - range[0][0],
	            range[1][1] - range[1][0]
	        );
	        if (!selRect.intersect(grid.getRect())) {
	            return;
	        }
	        var cartesian = grid.getCartesian(coordInfo[0].axisIndex, coordInfo[1].axisIndex);
	        var dataLeftTop = cartesian.pointToData([range[0][0], range[1][0]], true);
	        var dataRightBottom = cartesian.pointToData([range[0][1], range[1][1]], true);

	        return [
	            asc([dataLeftTop[0], dataRightBottom[0]]), // x, using asc to handle inverse
	            asc([dataLeftTop[1], dataRightBottom[1]]) // y, using asc to handle inverse
	        ];
	    }

	    function scaleCartesianAxis(selDataRange, coordInfo, dimIdx, dimName) {
	        var dimCoordInfo = coordInfo[dimIdx];
	        var dataZoomModel = dimCoordInfo.dataZoomModel;

	        if (dataZoomModel) {
	            return {
	                dataZoomId: dataZoomModel.id,
	                startValue: selDataRange[dimIdx][0],
	                endValue: selDataRange[dimIdx][1]
	            };
	        }
	    }

	    /**
	     * @private
	     */
	    proto._dispatchAction = function (snapshot) {
	        var batch = [];

	        each(snapshot, function (batchItem) {
	            batch.push(batchItem);
	        });

	        batch.length && this.api.dispatchAction({
	            type: 'dataZoom',
	            from: this.uid,
	            batch: zrUtil.clone(batch, true)
	        });
	    };

	    function updateBackBtnStatus(featureModel, ecModel) {
	        featureModel.setIconStatus(
	            'back',
	            history.count(ecModel) > 1 ? 'emphasis' : 'normal'
	        );
	    }


	    __webpack_require__(282).register('dataZoom', DataZoom);


	    // Create special dataZoom option for select
	    __webpack_require__(1).registerPreprocessor(function (option) {
	        if (!option) {
	            return;
	        }

	        var dataZoomOpts = option.dataZoom || (option.dataZoom = []);
	        if (!zrUtil.isArray(dataZoomOpts)) {
	            option.dataZoom = dataZoomOpts = [dataZoomOpts];
	        }

	        var toolboxOpt = option.toolbox;
	        if (toolboxOpt) {
	            // Assume there is only one toolbox
	            if (zrUtil.isArray(toolboxOpt)) {
	                toolboxOpt = toolboxOpt[0];
	            }

	            if (toolboxOpt && toolboxOpt.feature) {
	                var dataZoomOpt = toolboxOpt.feature.dataZoom;
	                addForAxis('xAxis', dataZoomOpt);
	                addForAxis('yAxis', dataZoomOpt);
	            }
	        }

	        function addForAxis(axisName, dataZoomOpt) {
	            if (!dataZoomOpt) {
	                return;
	            }

	            var axisIndicesName = axisName + 'Index';
	            var givenAxisIndices = dataZoomOpt[axisIndicesName];
	            if (givenAxisIndices != null && !zrUtil.isArray(givenAxisIndices)) {
	                givenAxisIndices = givenAxisIndices === false ? [] : [givenAxisIndices];
	            }

	            forEachComponent(axisName, function (axisOpt, axisIndex) {
	                if (givenAxisIndices != null
	                    && zrUtil.indexOf(givenAxisIndices, axisIndex) === -1
	                ) {
	                    return;
	                }
	                var newOpt = {
	                    type: 'select',
	                    $fromToolbox: true,
	                    // Id for merge mapping.
	                    id: DATA_ZOOM_ID_BASE + axisName + axisIndex
	                };
	                // FIXME
	                // Only support one axis now.
	                newOpt[axisIndicesName] = axisIndex;
	                dataZoomOpts.push(newOpt);
	            });
	        }

	        function forEachComponent(mainType, cb) {
	            var opts = option[mainType];
	            if (!zrUtil.isArray(opts)) {
	                opts = opts ? [opts] : [];
	            }
	            each(opts, cb);
	        }
	    });

	    return DataZoom;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 289 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @file History manager.
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {

	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	    var each = zrUtil.each;

	    var ATTR = '\0_ec_hist_store';

	    var history = {

	        /**
	         * @public
	         * @param {module:echarts/model/Global} ecModel
	         * @param {Object} newSnapshot {dataZoomId, batch: [payloadInfo, ...]}
	         */
	        push: function (ecModel, newSnapshot) {
	            var store = giveStore(ecModel);

	            // If previous dataZoom can not be found,
	            // complete an range with current range.
	            each(newSnapshot, function (batchItem, dataZoomId) {
	                var i = store.length - 1;
	                for (; i >= 0; i--) {
	                    var snapshot = store[i];
	                    if (snapshot[dataZoomId]) {
	                        break;
	                    }
	                }
	                if (i < 0) {
	                    // No origin range set, create one by current range.
	                    var dataZoomModel = ecModel.queryComponents(
	                        {mainType: 'dataZoom', subType: 'select', id: dataZoomId}
	                    )[0];
	                    if (dataZoomModel) {
	                        var percentRange = dataZoomModel.getPercentRange();
	                        store[0][dataZoomId] = {
	                            dataZoomId: dataZoomId,
	                            start: percentRange[0],
	                            end: percentRange[1]
	                        };
	                    }
	                }
	            });

	            store.push(newSnapshot);
	        },

	        /**
	         * @public
	         * @param {module:echarts/model/Global} ecModel
	         * @return {Object} snapshot
	         */
	        pop: function (ecModel) {
	            var store = giveStore(ecModel);
	            var head = store[store.length - 1];
	            store.length > 1 && store.pop();

	            // Find top for all dataZoom.
	            var snapshot = {};
	            each(head, function (batchItem, dataZoomId) {
	                for (var i = store.length - 1; i >= 0; i--) {
	                    var batchItem = store[i][dataZoomId];
	                    if (batchItem) {
	                        snapshot[dataZoomId] = batchItem;
	                        break;
	                    }
	                }
	            });

	            return snapshot;
	        },

	        /**
	         * @public
	         */
	        clear: function (ecModel) {
	            ecModel[ATTR] = null;
	        },

	        /**
	         * @public
	         * @param {module:echarts/model/Global} ecModel
	         * @return {number} records. always >= 1.
	         */
	        count: function (ecModel) {
	            return giveStore(ecModel).length;
	        }

	    };

	    /**
	     * [{key: dataZoomId, value: {dataZoomId, range}}, ...]
	     * History length of each dataZoom may be different.
	     * this._history[0] is used to store origin range.
	     * @type {Array.<Object>}
	     */
	    function giveStore(ecModel) {
	        var store = ecModel[ATTR];
	        if (!store) {
	            store = ecModel[ATTR] = [{}];
	        }
	        return store;
	    }

	    return history;

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 290 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * DataZoom component entry
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    __webpack_require__(230);

	    __webpack_require__(231);
	    __webpack_require__(233);

	    __webpack_require__(291);
	    __webpack_require__(292);

	    __webpack_require__(241);
	    __webpack_require__(242);

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 291 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @file Data zoom model
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {

	    var DataZoomModel = __webpack_require__(231);

	    return DataZoomModel.extend({

	        type: 'dataZoom.select'

	    });

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 292 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    return __webpack_require__(233).extend({

	        type: 'dataZoom.select'

	    });

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 293 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
	    'use strict';

	    var history = __webpack_require__(289);

	    function Restore(model) {
	        this.model = model;
	    }

	    Restore.defaultOption = {
	        show: true,
	        icon: 'M3.8,33.4 M47,18.9h9.8V8.7 M56.3,20.1 C52.1,9,40.5,0.6,26.8,2.1C12.6,3.7,1.6,16.2,2.1,30.6 M13,41.1H3.1v10.2 M3.7,39.9c4.2,11.1,15.8,19.5,29.5,18 c14.2-1.6,25.2-14.1,24.7-28.5',
	        title: '还原'
	    };

	    var proto = Restore.prototype;

	    proto.onclick = function (ecModel, api, type) {
	        history.clear(ecModel);

	        api.dispatchAction({
	            type: 'restore',
	            from: this.uid
	        });
	    };


	    __webpack_require__(282).register('restore', Restore);


	    __webpack_require__(1).registerAction(
	        {type: 'restore', event: 'restore', update: 'prepareAndUpdate'},
	        function (payload, ecModel) {
	            ecModel.resetOption('recreate');
	        }
	    );

	    return Restore;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 294 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
	    'use strict';

	    var featureManager = __webpack_require__(282);
	    var zrUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"zrender/core/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	    function Brush(model, ecModel, api) {
	        this.model = model;
	        this.ecModel = ecModel;
	        this.api = api;

	        /**
	         * @private
	         * @type {string}
	         */
	        this._brushType;

	        /**
	         * @private
	         * @type {string}
	         */
	        this._brushMode;
	    }

	    Brush.defaultOption = {
	        show: true,
	        type: ['rect', 'polygon', 'keep', 'clear'],
	        icon: {
	            rect: 'M7.3,34.7 M0.4,10V-0.2h9.8 M89.6,10V-0.2h-9.8 M0.4,60v10.2h9.8 M89.6,60v10.2h-9.8 M12.3,22.4V10.5h13.1 M33.6,10.5h7.8 M49.1,10.5h7.8 M77.5,22.4V10.5h-13 M12.3,31.1v8.2 M77.7,31.1v8.2 M12.3,47.6v11.9h13.1 M33.6,59.5h7.6 M49.1,59.5 h7.7 M77.5,47.6v11.9h-13',
	            polygon: 'M55.2,34.9c1.7,0,3.1,1.4,3.1,3.1s-1.4,3.1-3.1,3.1 s-3.1-1.4-3.1-3.1S53.5,34.9,55.2,34.9z M50.4,51c1.7,0,3.1,1.4,3.1,3.1c0,1.7-1.4,3.1-3.1,3.1c-1.7,0-3.1-1.4-3.1-3.1 C47.3,52.4,48.7,51,50.4,51z M55.6,37.1l1.5-7.8 M60.1,13.5l1.6-8.7l-7.8,4 M59,19l-1,5.3 M24,16.1l6.4,4.9l6.4-3.3 M48.5,11.6 l-5.9,3.1 M19.1,12.8L9.7,5.1l1.1,7.7 M13.4,29.8l1,7.3l6.6,1.6 M11.6,18.4l1,6.1 M32.8,41.9 M26.6,40.4 M27.3,40.2l6.1,1.6 M49.9,52.1l-5.6-7.6l-4.9-1.2',
	            keep: 'M4,10.5V1h10.3 M20.7,1h6.1 M33,1h6.1 M55.4,10.5V1H45.2 M4,17.3v6.6 M55.6,17.3v6.6 M4,30.5V40h10.3 M20.7,40 h6.1 M33,40h6.1 M55.4,30.5V40H45.2 M21,18.9h62.9v48.6H21V18.9z',
	            clear: 'M22,14.7l30.9,31 M52.9,14.7L22,45.7 M4.7,16.8V4.2h13.1 M26,4.2h7.8 M41.6,4.2h7.8 M70.3,16.8V4.2H57.2 M4.7,25.9v8.6 M70.3,25.9v8.6 M4.7,43.2v12.6h13.1 M26,55.8h7.8 M41.6,55.8h7.8 M70.3,43.2v12.6H57.2'
	        },
	        title: {
	            rect: '矩形选择',
	            polygon: '圈选',
	            keep: '保持选择',
	            clear: '清除选择'
	        }
	    };

	    var proto = Brush.prototype;

	    proto.render = function (featureModel, ecModel, api) {
	        var brushType;
	        var brushMode;

	        ecModel.eachComponent({mainType: 'brush'}, function (brushModel) {
	            brushType = brushModel.brushType;
	            brushMode = brushModel.brushOption.brushMode || 'single';
	        });

	        this._brushType = brushType;
	        this._brushMode = brushMode;

	        zrUtil.each(featureModel.get('type', true), function (type) {
	            if (type !== 'clear' && type !== 'keep') {
	                featureModel.setIconStatus(type, type === brushType ? 'emphasis' : 'normal');
	            }
	            if (type === 'keep') {
	                featureModel.setIconStatus(type, brushMode === 'multiple' ? 'emphasis' : 'normal');
	            }
	        });
	    };

	    proto.getIcons = function () {
	        var model = this.model;
	        var availableIcons = model.get('icon', true);
	        var icons = {};
	        zrUtil.each(model.get('type', true), function (type) {
	            if (availableIcons[type]) {
	                icons[type] = availableIcons[type];
	            }
	        });
	        return icons;
	    };

	    proto.onclick = function (ecModel, api, type) {
	        var api = this.api;
	        var brushType = this._brushType;
	        var brushMode = this._brushMode;

	        if (type === 'clear') {
	            api.dispatchAction({
	                type: 'brush',
	                // Clear all brushRanges of all brush components.
	                brushRanges: []
	            });
	        }
	        else {
	            api.dispatchAction({
	                type: 'enableBrush',
	                brushOption: {
	                    brushType: type === 'keep'
	                        ? brushType
	                        : (brushType === type ? false : type),
	                    brushMode: type === 'keep'
	                        ? (brushMode === 'multiple' ? 'single' : 'multiple')
	                        : brushMode
	                }
	            });
	        }
	    };

	    featureManager.register('brush', Brush);

	    return Brush;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }
/******/ ])
});
;