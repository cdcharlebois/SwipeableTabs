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


        // Internal variables.
        _handles: null,
        _contextObj: null,

        constructor: function() {
            this._handles = [];
        },

        postCreate: function() {
            logger.debug(this.id + ".postCreate");
        },

        update: function(obj, callback) {
            logger.debug(this.id + ".update");
            if (obj) this._contextObj = obj;
            var container = this.domNode.parentElement.querySelector('div.mx-tabcontainer'),
                wrapper = container.querySelector('div.tab-content'),
                pagination = container.querySelector('ul.nav-tabs'),
                slides = wrapper.children,
                titles = Array.from(pagination.querySelectorAll('li>a')).map(function(el) { return el.innerHTML });

            // add classes
            dojoClass.add(container, 'swiper-container');
            dojoClass.add(pagination, 'swiper-pagination');
            dojoClass.add(wrapper, 'swiper-wrapper');
            // wrapper.style.marginTop = pagination.getBoundingClientRect().height + 'px';
            wrapper.style.marginTop = '45px';

            Array.from(slides).forEach(function(el) {
                dojoClass.add(el, 'swiper-slide');
                el.style.display = 'block';
                dijit.registry.byId('mxui_widget_TabContainer_0').showTab(dijit.registry.byId(el.id))
            })


            this._updateRendering(callback, titles);
        },

        resize: function(box) {
            logger.debug(this.id + ".resize");
        },

        uninitialize: function() {
            logger.debug(this.id + ".uninitialize");
        },

        _updateRendering: function(callback, titles) {
            logger.debug(this.id + "._updateRendering");
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                slidesPerView: 1,
                paginationClickable: true,
                loop: true,
                paginationBulletRender: function(index, className) {
                    if (index === (titles.length - 1)) {
                        return '<span class="widget-tabnav ' + className + '">' + titles[index] + '</span>' +
                            '<div class="active-mark "></div>';
                    }
                    return '<span class="widget-tabnav ' + className + '">' + titles[index] + '</span>';
                }
            });

            // if (this._contextObj !== null) {
            //     dojoStyle.set(this.domNode, "display", "block");
            // } else {
            //     dojoStyle.set(this.domNode, "display", "none");
            // }

            this._executeCallback(callback);
        },

        _executeCallback: function(cb) {
            if (cb && typeof cb === "function") {
                cb();
            }
        }
    });
});

require(["Swiper/widget/Swiper"]);