define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "dijit/_TemplatedMixin",
    "mxui/dom",
    "dojo/dom",
    "dojo/dom-prop",
    "dojo/dom-geometry",
    "dojo/dom-class",
    "dojo/dom-style",
    "dojo/dom-construct",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/text",
    "dojo/html",
    "dojo/_base/event",
    "Swiper/lib/Swiper-3.4.2",
    "dojo/text!Swiper/widget/template/Swiper.html"


], function(declare, _WidgetBase, _TemplatedMixin, dom, dojoDom, dojoProp, dojoGeometry, dojoClass, dojoStyle, dojoConstruct, dojoArray, lang, dojoText, dojoHtml, dojoEvent, Swiper, template) {
    "use strict";

    return declare("Swiper.widget.Swiper", [_WidgetBase, _TemplatedMixin], {

        templateString: template,
        ActiveMarkerBacakgroundColor: null,
        ShowPagination: null,
        TabsBackgroundColor: null,
        ClassToAddToTabs: null,

        // Internal variables.
        _handles: null,
        _contextObj: null,
        _titles: null,

        constructor: function() {
            this._handles = [];
        },

        postCreate: function() {
            logger.debug(this.id + ".postCreate");
        },

        update: function(obj, callback) {
            logger.debug(this.id + ".update");
            if (obj) this._contextObj = obj;

            this._setupDOM();

            this._updateRendering(callback);
        },

        resize: function(box) {
            logger.debug(this.id + ".resize");
        },

        uninitialize: function() {
            logger.debug(this.id + ".uninitialize");
        },

        _updateRendering: function(callback) {
            logger.debug(this.id + "._updateRendering");
            var self = this;

            this._initializeSwiper();

            this._executeCallback(callback);
        },

        /**
         * Initialize the Swiper
         * 1. set the render function to render the headers
         * 2. set a listener to update the Active Mark when the user clicks to show a new tab
         */
        _initializeSwiper: function() {
            var swiper = new Swiper('.swiper-container.' + this.id, {
                pagination: '.swiper-pagination.' + this.id,
                slidesPerView: 1,
                paginationClickable: true,
                paginationBulletRender: lang.hitch(this, function(index, className) {
                    if (index === (this.titles.length - 1)) {
                        return '<span data-index="' + index + '" class="widget-tabnav ' + className + '">' +
                            this.titles[index] + '</span>' +
                            '<div class="active-mark "></div>';
                    }
                    return '<span data-index="' + index + '" class="widget-tabnav ' + className + '">' + this.titles[index] + '</span>';
                }),
                onSlideChangeStart: lang.hitch(this, function(swiper) {
                    lang.hitch(this, this._fixActiveMark())
                })
            });
            this._fixActiveMark();
            if (!this.ShowPagination) {
                this._hidePagination();
            }
            if (this.TabsBackgroundColor) {
                this.paginationEl.style.backgroundColor = this.TabsBackgroundColor;
            }

        },

        /**
         * Setup the DOM for the Swiper to be initialized.
         * 1. Add the classes
         * 2. Render all the Tab Pages 
         */
        _setupDOM: function() {
            var container = this.domNode.parentElement.querySelector('div.mx-tabcontainer'),
                wrapper = container.querySelector('div.tab-content'),
                pagination = container.querySelector('ul.nav-tabs'),
                // limit to only displayed tabs
                titles = Array.from(pagination.querySelectorAll('li>a'))
                .filter(function(el) { // only titles for tabs that can be seen
                    return el.parentElement.style.display != 'none'
                })
                .map(function(el) { return el.innerHTML }),
                slides = Array.from(wrapper.children)
                .filter(function(el) { return el.style.display != 'none' }); // only slides that can be seenƒ

            // store these variables for retrieval later
            this.containerEl = container;
            this.wrapperEl = wrapper;
            this.paginationEl = pagination;
            this.slidesEls = slides;
            this.titles = titles;

            // add classes
            dojoClass.add(container, 'swiper-container ' + this.id);
            dojoClass.add(pagination, 'swiper-pagination ' + this.id);
            dojoClass.add(wrapper, 'swiper-wrapper');
            // wrapper.style.marginTop = pagination.getBoundingClientRect().height + 'px';
            wrapper.style.marginTop = '45px';

            // add all the slide classes and render them all
            Array.from(slides).forEach(function(el) {
                dojoClass.add(el, 'swiper-slide');
                el.style.display = 'block';
                dijit.registry.byId('mxui_widget_TabContainer_0').showTab(dijit.registry.byId(el.id))
            })

            // 
            if (this.ClassToAddToTabs) {
                dojoClass.add(this.paginationEl, this.ClassToAddToTabs)
            }

        },


        /**
         * Hide the pagination
         */
        _hidePagination: function() {
            this.paginationEl.style.display = 'none';
        },

        /**
         * Update the position, width, and color of the active mark
         */
        _fixActiveMark: function() {
            var totalWidth = this.paginationEl.getBoundingClientRect().width,
                activeMarkWidth = totalWidth / this.titles.length,
                selected = document.querySelector('.' + this.id + ' .widget-tabnav.swiper-pagination-bullet-active').dataset.index,
                activeMarker = this.paginationEl.querySelector('.active-mark');

            // update the position, width, and color of the Active Mark
            activeMarker.style.width = activeMarkWidth + 'px';
            activeMarker.style.left = (selected * 1) * activeMarkWidth + 'px';
            if (this.ActiveMarkerBackgroundColor) {
                activeMarker.style.backgroundColor = this.ActiveMarkerBackgroundColor;
            }



        },

        _executeCallback: function(cb) {
            if (cb && typeof cb === "function") {
                cb();
            }
        }
    });
});

require(["Swiper/widget/Swiper"]);