(() => {
    "use strict";
    function t() {
        return (t = Object.assign ? Object.assign.bind() : function (t) {
            return t
        })
            .apply(this, arguments)
    }
    class e {
    }
    class i extends e {
    }
    var s, n, o, r = {
    },
        l = Array.isArray, h = {
        },
        a = function () {
        },
        c = function (t, e) {
            return (t = t.split(",")).forEach(e) || t
        },
        u = function () {
            var t, e, i, s, r, l, h = Date.now, a = h(), c = a, u = 1e3 / 240, p = u, v = [], m = function i(n) {
                var o, d, m, f, g = h() - c, w = !0 === n;
                if ((g > 500 || g < 0) && (a += g - 33), ((o = (m = (c += g) - a) - p) > 0 || w) && (f = ++s.frame, s.time = m /= 1e3, p += o + (o >= u ? 4 : u - o), d = 1), w || (t = e(i)), d) for (l = 0;
                    l < v.length;
                    l++)v[l](m, r, f, n)
            };
            return s = {
                time: 0, frame: 0, tick: function () {
                    m(!0)
                },
                deltaRatio: function (t) {
                    return r / (1e3 / (t || 60))
                },
                wake: function () {
                    n && (i = "undefined" != typeof requestAnimationFrame && requestAnimationFrame, t && s.sleep(), e = i || function (t) {
                    },
                        o = 1, m(2))
                },
                add: function (t, e, i) {
                    var n = e ? function () {
                    }
                        : t;
                    return s.remove(t), v[i ? "unshift" : "push"](n), d(), n
                },
                remove: function () {
                }
            },
                s
        }
            (), d = function () {
                return !o && u.wake()
            },
        p = {
        };
    c("Linear,Quad,Cubic,Quart,Quint,Strong", (function (t, e) {
        !function (t, e, i, s) {
            void 0 === i && (i = function (t) {
            });
            var n = {
            };
            c(t, (function (t) {
                for (var e in p[t] = h[t] = n, n) p[void 0 + ("easeIn" === e ? ".in" : "easeOut" === e ? ".out" : ".inOut")] = p[t + "." + e] = n[e]
            }))
        }
            (t + ",Power" + ((e < 5 ? e + 1 : e) - 1), e)
    })),
        p.Linear.easeNone = p.none = p.Linear.easeIn, r.ease = p["quad.out"];
    var v = t;
    v.prototype;
    var m = (i.to = function () {
    },
        i.from = function () {
        },
        i.fromTo = function () {
        },
        i.set = function () {
        },
        i.call = function () {
        },
        i.render = function () {
        },
        i.add = function () {
        },
        i.getById = function () {
        },
        i.remove = function () {
        },
        i.recent = function () {
        },
        i.clear = function () {
        },
        e);
    m.prototype;
    c("", (function () {
    }));
    var f = function () {
        function e(e, i) {
            "number" == typeof e && (i.duration = e, e = i, i = null)
        }
        var i = e.prototype;
        return i.targets = function () {
        },
            i.kill = function () {
            },
            e.to = function () {
            },
            e.from = function () {
            },
            e.fromTo = function () {
            },
            e.set = function () {
            },
            e
    }
        ();
    f.prototype;
    c("", (function () {
    })),
        h.TweenMax = h.TweenLite = f, h.TimelineLite = h.TimelineMax = m, s = new m({
        });
    var g = {
        registerPlugin: function () {
        },
        timeline: function (t) {
        },
        getProperty: function () {
        },
        removeEventListener: function () {
        },
        utils: {
            wrap: function t(e, i, s) {
            },
            shuffle: function () {
            }
        },
        install: a, effects: {
        },
        ticker: u, plugins: {
        },
        globalTimeline: s, core: {
            PropTween: undefined, globals: function () {
            },
            Tween: f, Timeline: m, Animation: v, _removeLinkedListItem: function () {
            },
            reverting: function () {
            },
            suppressOverwrites: function (t) {
            }
        }
    };
    c("to,from,fromTo,set", (function (t) {
        return g[t] = f[t]
    })),
        g.to({
        },
            {
                duration: 0
            });
    var w = g.registerPlugin({
        name: "attr", init: function (t, e, i, s, n) {
            var o, r, l;
            for (o in this.tween = i, e) l = t.getAttribute(o) || "", (r = this.add(t, "setAttribute", (l || 0) + "", e[o], s, n, 0, 0, o)).op = o, r.b = l, this._props.push(o)
        },
        render: function (t, e) {
            for (var i = e._pt;
                i;
            )i.r(t, i.d), i = i._next
        }
    },
        {
            name: "endArray"
        },
        void 0, void 0, void 0) || g;
    f.version = m.version = w.version = "3.12.5", n = 1, p.Circ;
    var y = {
    };
    w.utils.checkPrefix = function () {
    },
        w.registerPlugin(y);
    var S = w.registerPlugin(y) || w;
    S.core.Tween;
    var T = function () {
    };
    T.version = "3.12.5";
    var _, E, x = function () {
    },
        z = function () {
        },
        L = {
            version: "3.12.5", name: "scrollTo", rawVars: 1, register: function (t) {
                _ = t
            },
            init: function (t, e, i, s, n) {
                var o = this, r = _.getProperty(t, "scrollSnapType");
                o.isWin = undefined === t, e = void 0, o.vars = e, o.autoKill = !!e.autoKill, o.getX = void 0, o.getY = void 0, o.x = o.xPrev = o.getX(), o.y = o.yPrev = o.getY(), E || (E = _.core.globals().ScrollTrigger), "smooth" === _.getProperty(t, "scrollBehavior") && _.set(t, {
                    scrollBehavior: "auto"
                }),
                    r && "none" !== r && (o.snap = 1, o.snapInline = t.style.scrollSnapType, t.style.scrollSnapType = "none"), null != e.x ? (o.add(o, "x", o.x, (e.x, o.x, void e.offsetX), s, n), o._props.push("scrollTo_x")) : o.skipX = 1, null != e.y ? (o.add(o, "y", o.y, (e.y, o.y, void e.offsetY), s, n), o._props.push("scrollTo_y")) : o.skipY = 1
            },
            kill: function (t) {
                var e = "scrollTo" === t, i = this._props.indexOf(t);
                return (e || "scrollTo_x" === t) && (this.skipX = 1), (e || "scrollTo_y" === t) && (this.skipY = 1), i > -1 && this._props.splice(i, 1), !this._props.length
            }
        };
    function R(t, e, i) {
        return Math.max(t, Math.min(e, i))
    }
    L.max = function () {
    },
        L.getOffset = function () {
        },
        L.buildGetter = z;
    class b {
        constructor() {
            this.isRunning = !1, this.value = 0, this.from = 0, this.to = 0, this.currentTime = 0
        }
        advance(t) {
            var e;
            if (!this.isRunning) return;
            let i = !1;
            if (this.duration && this.easing) {
                this.currentTime += t;
                const e = R(0, this.currentTime / this.duration, 1);
                i = e >= 1;
                const s = i ? 1 : this.easing(e);
                this.value = this.from + (this.to - this.from) * s
            }
            else this.lerp ? (this.value = function (t, e, i, s) {
                return function (t, e, i) {
                    return (1 - i) * t + i * e
                }
                    (t, e, 1 - Math.exp(-i * s))
            }
                (this.value, this.to, 60 * this.lerp, t), Math.round(this.value) === this.to && (this.value = this.to, i = !0)) : (this.value = this.to, i = !0);
            i && this.stop(), null === (e = this.onUpdate) || void 0 === e || e.call(this, this.value, i)
        }
        stop() {
            this.isRunning = !1
        }
        fromTo(t, e, {
            lerp: i, duration: s, easing: n, onStart: o, onUpdate: r
        }) {
            this.from = this.value = t, this.to = e, this.lerp = i, this.duration = s, this.easing = n, this.currentTime = 0, this.isRunning = !0, null == o || o(), this.onUpdate = r
        }
    }
    class M {
        constructor(t, e, {
            autoResize: i = !0, debounce: s = 250
        }
            = {
            }) {
            this.wrapper = t, this.content = e, this.width = 0, this.height = 0, this.scrollHeight = 0, this.scrollWidth = 0, this.resize = () => {
                this.onWrapperResize(), this.onContentResize()
            },
                this.onWrapperResize = () => {
                    this.wrapper instanceof Window ? (this.width = window.innerWidth, this.height = window.innerHeight) : (this.width = this.wrapper.clientWidth, this.height = this.wrapper.clientHeight)
                },
                this.onContentResize = () => {
                    this.wrapper instanceof Window ? (this.scrollHeight = this.content.scrollHeight, this.scrollWidth = this.content.scrollWidth) : (this.scrollHeight = this.wrapper.scrollHeight, this.scrollWidth = this.wrapper.scrollWidth)
                },
                i && (this.debouncedResize = (this.resize, function () {
                }),
                    this.wrapper instanceof Window ? window.addEventListener("resize", this.debouncedResize, !1) : (this.wrapperResizeObserver = new ResizeObserver(this.debouncedResize), this.wrapperResizeObserver.observe(this.wrapper)), this.contentResizeObserver = new ResizeObserver(this.debouncedResize), this.contentResizeObserver.observe(this.content)), this.resize()
        }
        destroy() {
            var t, e;
            null === (t = this.wrapperResizeObserver) || void 0 === t || t.disconnect(), null === (e = this.contentResizeObserver) || void 0 === e || e.disconnect(), this.wrapper === window && this.debouncedResize && window.removeEventListener("resize", this.debouncedResize, !1)
        }
        get limit() {
            return {
                x: this.scrollWidth - this.width, y: this.scrollHeight - this.height
            }
        }
    }
    class W {
        constructor() {
            this.events = {
            }
        }
        emit(t, ...e) {
            var i;
            let s = this.events[t] || [];
            for (let t = 0, n = s.length;
                t < n;
                t++)null === (i = s[t]) || void 0 === i || i.call(s, ...e)
        }
        on(t, e) {
            var i;
            return (null === (i = this.events[t]) || void 0 === i ? void 0 : i.push(e)) || (this.events[t] = [e]), () => {
                var i;
                this.events[t] = null === (i = this.events[t]) || void 0 === i ? void 0 : i.filter((t => e !== t))
            }
        }
        off(t, e) {
            var i;
            this.events[t] = null === (i = this.events[t]) || void 0 === i ? void 0 : i.filter((t => e !== t))
        }
        destroy() {
            this.events = {
            }
        }
    }
    const k = 100 / 6, A = {
        passive: !1
    };
    class P {
        constructor(t, e = {
            wheelMultiplier: 1, touchMultiplier: 1
        }) {
            this.element = t, this.options = e, this.touchStart = {
                x: 0, y: 0
            },
                this.lastDelta = {
                    x: 0, y: 0
                },
                this.window = {
                    width: 0, height: 0
                },
                this.emitter = new W, this.onTouchStart = t => {
                    const {
                        clientX: e, clientY: i
                    }
                        = t.targetTouches ? t.targetTouches[0] : t;
                    this.touchStart.x = e, this.touchStart.y = i, this.lastDelta = {
                        x: 0, y: 0
                    },
                        this.emitter.emit("scroll", {
                            deltaX: 0, deltaY: 0, event: t
                        })
                },
                this.onTouchMove = t => {
                    const {
                        clientX: e, clientY: i
                    }
                        = t.targetTouches ? t.targetTouches[0] : t, s = -(e - this.touchStart.x) * this.options.touchMultiplier, n = -(i - this.touchStart.y) * this.options.touchMultiplier;
                    this.touchStart.x = e, this.touchStart.y = i, this.lastDelta = {
                        x: s, y: n
                    },
                        this.emitter.emit("scroll", {
                            deltaX: s, deltaY: n, event: t
                        })
                },
                this.onTouchEnd = t => {
                    this.emitter.emit("scroll", {
                        deltaX: this.lastDelta.x, deltaY: this.lastDelta.y, event: t
                    })
                },
                this.onWheel = t => {
                    let {
                        deltaX: e, deltaY: i, deltaMode: s
                    }
                        = t;
                    e *= 1 === s ? k : 2 === s ? this.window.width : 1, i *= 1 === s ? k : 2 === s ? this.window.height : 1, e *= this.options.wheelMultiplier, i *= this.options.wheelMultiplier, this.emitter.emit("scroll", {
                        deltaX: e, deltaY: i, event: t
                    })
                },
                this.onWindowResize = () => {
                    this.window = {
                        width: window.innerWidth, height: window.innerHeight
                    }
                },
                window.addEventListener("resize", this.onWindowResize, !1), this.onWindowResize(), this.element.addEventListener("wheel", this.onWheel, A), this.element.addEventListener("touchstart", this.onTouchStart, A), this.element.addEventListener("touchmove", this.onTouchMove, A), this.element.addEventListener("touchend", this.onTouchEnd, A)
        }
        on(t, e) {
            return this.emitter.on(t, e)
        }
        destroy() {
            this.emitter.destroy(), window.removeEventListener("resize", this.onWindowResize, !1), this.element.removeEventListener("wheel", this.onWheel, A), this.element.removeEventListener("touchstart", this.onTouchStart, A), this.element.removeEventListener("touchmove", this.onTouchMove, A), this.element.removeEventListener("touchend", this.onTouchEnd, A)
        }
    }
    class O {
        constructor({
            wrapper: t = window, content: e = document.documentElement, eventsTarget: i = t, smoothWheel: s = !0, syncTouch: n = !1, syncTouchLerp: o = .075, touchInertiaMultiplier: r = 35, duration: l, easing: h = (t => Math.min(1, 1.001 - Math.pow(2, -10 * t))), lerp: a = .1, infinite: c = !1, orientation: u = "vertical", gestureOrientation: d = "vertical", touchMultiplier: p = 1, wheelMultiplier: v = 1, autoResize: m = !0, prevent: f, virtualScroll: g, __experimental__naiveDimensions: w = !1
        }
            = {
            }) {
            this._isScrolling = !1, this._isStopped = !1, this._isLocked = !1, this._preventNextNativeScrollEvent = !1, this._resetVelocityTimeout = null, this.time = 0, this.userData = {
            },
                this.lastVelocity = 0, this.velocity = 0, this.direction = 0, this.animate = new b, this.emitter = new W, this.onPointerDown = t => {
                },
                this.onVirtualScroll = t => {
                    if ("function" == typeof this.options.virtualScroll) return;
                    const {
                        deltaX: e, deltaY: i, event: s
                    }
                        = t;
                    if (this.emitter.emit("virtual-scroll", {
                        deltaX: e, deltaY: i, event: s
                    }),
                        s.ctrlKey) return;
                    const n = s.type.includes("touch"), o = s.type.includes("wheel");
                    if (!(this.options.syncTouch && n || this.options.smoothWheel && o)) return this.isScrolling = "native", void this.animate.stop();
                    s.preventDefault();
                    let r = i;
                    const l = n && this.options.syncTouch, h = n && "touchend" === s.type && Math.abs(r) > 5;
                    h && (r = this.velocity * this.options.touchInertiaMultiplier), this.scrollTo(this.targetScroll + r, Object.assign({
                        programmatic: !1
                    },
                        l ? {
                        }
                            : {
                            }))
                },
                this.onNativeScroll = () => {
                },
                window.lenisVersion = "1.1.13", t && t !== document.documentElement && t !== document.body || (t = window), this.options = {
                    wrapper: t, content: e, eventsTarget: i, smoothWheel: s, syncTouch: n, syncTouchLerp: o, touchInertiaMultiplier: r, duration: l, easing: h, lerp: a, infinite: c, gestureOrientation: d, orientation: u, touchMultiplier: p, wheelMultiplier: v, autoResize: m, prevent: f, virtualScroll: g, __experimental__naiveDimensions: w
                },
                this.dimensions = new M(t, e, {
                    autoResize: m
                }),
                this.targetScroll = this.animatedScroll = this.actualScroll, this.virtualScroll = new P(i, {
                    touchMultiplier: p, wheelMultiplier: v
                }),
                this.virtualScroll.on("scroll", this.onVirtualScroll)
        }
        destroy() {
        }
        on() {
        }
        off(t, e) {
            return this.emitter.off(t, e)
        }
        setScroll(t) {
            this.isHorizontal ? this.rootElement.scrollLeft = t : this.rootElement.scrollTop = t
        }
        resize() {
            this.dimensions.resize(), this.animatedScroll = this.targetScroll = this.actualScroll, this.emit()
        }
        emit() {
            this.emitter.emit("scroll", this)
        }
        reset() {
            this.isLocked = !1, this.isScrolling = !1, this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity = 0, this.animate.stop()
        }
        start() {
            this.isStopped && (this.isStopped = !1, this.reset())
        }
        stop() {
            this.isStopped || (this.isStopped = !0, this.animate.stop(), this.reset())
        }
        raf(t) {
            const e = t - (this.time || t);
            this.time = t, this.animate.advance(.001 * e)
        }
        scrollTo(t, {
            offset: e = 0, immediate: i = !1, lock: s = !1, duration: n = this.options.duration, easing: o = this.options.easing, lerp: r = this.options.lerp, onStart: l, onComplete: h, force: a = !1, programmatic: c = !0, userData: u
        }
            = {
            }) {
            if (!this.isStopped && !this.isLocked || a) {
                if ("string" == typeof t && ["top", "left", "start"].includes(t)) t = 0;
                else {
                    let e;
                    "string" == typeof t ? e = document.querySelector(t) : t instanceof HTMLElement && (null == t ? void 0 : t.nodeType) && (e = t), e && (t = (this.isHorizontal ? s.left : s.top) + this.animatedScroll)
                }
                if ("number" == typeof t) {
                    if (t += e, t = Math.round(t), this.options.infinite ? c && (this.targetScroll = this.animatedScroll = this.scroll) : t = R(0, t, this.limit), t === this.targetScroll) return null == l || l(this), void (null == h || h(this));
                    if (this.userData = null != u ? u : {
                    },
                        i) return this.animatedScroll = this.targetScroll = t, this.setScroll(this.scroll), this.reset(), this.preventNextNativeScrollEvent(), this.emit(), null == h || h(this), void (this.userData = {
                        });
                    c || (this.targetScroll = t), this.animate.fromTo(this.animatedScroll, t, {
                        duration: n, easing: o, lerp: r, onStart: () => {
                            s && (this.isLocked = !0), this.isScrolling = "smooth", null == l || l(this)
                        },
                        onUpdate: (t, e) => {
                            this.isScrolling = "smooth", this.lastVelocity = this.velocity, this.velocity = t - this.animatedScroll, this.direction = Math.sign(this.velocity), this.animatedScroll = t, this.setScroll(this.scroll), c && (this.targetScroll = t), e || this.emit(), e && (this.reset(), this.emit(), null == h || h(this), this.userData = {
                            },
                                this.preventNextNativeScrollEvent())
                        }
                    })
                }
            }
        }
        preventNextNativeScrollEvent() {
            this._preventNextNativeScrollEvent = !0, requestAnimationFrame((() => {
                this._preventNextNativeScrollEvent = !1
            }))
        }
        get rootElement() {
            return this.options.wrapper === window ? document.documentElement : this.options.wrapper
        }
        get limit() {
            return this.options.__experimental__naiveDimensions ? this.isHorizontal ? this.rootElement.scrollWidth - this.rootElement.clientWidth : this.rootElement.scrollHeight - this.rootElement.clientHeight : this.dimensions.limit[this.isHorizontal ? "x" : "y"]
        }
        get isHorizontal() {
            return "horizontal" === this.options.orientation
        }
        get actualScroll() {
            return this.isHorizontal ? this.rootElement.scrollLeft : this.rootElement.scrollTop
        }
        get scroll() {
            return this.options.infinite ? (this.animatedScroll, void this.limit) : this.animatedScroll
        }
        get progress() {
            return 0 === this.limit ? 1 : this.scroll / this.limit
        }
        get isScrolling() {
            return this._isScrolling
        }
        set isScrolling(t) {
            this._isScrolling !== t && (this._isScrolling = t, this.updateClassName())
        }
        get isStopped() {
            return this._isStopped
        }
        set isStopped(t) {
            this._isStopped !== t && (this._isStopped = t, this.updateClassName())
        }
        get isLocked() {
            return this._isLocked
        }
        set isLocked(t) {
        }
        get isSmooth() {
            return "smooth" === this.isScrolling
        }
        get className() {
        }
    }
    history.scrollRestoration = "manual", S.registerPlugin(x, L);
    var H = function () {
        function t(t) {
        }
        return t.registerGSAP = function (t) {
        },
            t
    }
        ();
    H.registerGSAP(S);
    var D = function (t) {
        function e() {
        }
        return e.registerGSAP = function (t) {
            e.gsap = t
        },
            e.use = function () {
                [].slice.call(arguments).forEach((function (t) {
                }))
            },
            e
    }
        ();
    D.plugins = {
    };
    var N = function () {
    };
    N.pluginName = "scroller", N.defaultOptions = {
        speed: 1, multiplier: .5, threshold: 1, ease: "expo.out", overwrite: !0, bothDirection: !0, reversed: !1, stopOnEnd: !1, scrollProxy: null
    },
        D.registerGSAP(S), D.use(N);
    class X {
    } (class extends X {
    }).DEFAULT_IMAGE = null;
    (class extends X {
    }).DEFAULT_UP;
    class V {
    }
    V.Composite = class {
    },
        V.prototype.SetterByBindingTypeAndVersioning = [[V.prototype._setValue_array]], new Float32Array(1), "undefined" != typeof window && (window.__THREE__ ? console.warn("") : window.__THREE__ = "167"), new class extends e {
            constructor(e) {
                super(), this.options = t({
                    init: !0, define: null
                },
                    e), this.registry = new Map, this.options.define && (this.defineAll(this.options.define), this.options.init && this.init())
            }
            init() {
                try {
                    const t = this;
                    (function () {
                        if ("interactive" === document.readyState) Promise.resolve(t.start()).then((function () {
                        }))
                    })
                        ()
                }
                catch (t) {
                }
            }
            start() {
                try {
                    const t = this;
                    t.registry.forEach(((e, i) => {
                        e.assign ? t.queryAll(e.assign).forEach((e => {
                        }))
                            : t.attach(i, null, null, !1)
                    }))
                }
                catch (t) {
                    return Promise.reject(t)
                }
            }
            attach(t, e, i, s) {
                void 0 === s && (s = !0);
                try {
                    const s = this, n = i || s.registry.get(t).options, o = new (0, s.registry.get(t).component)(s, e, n);
                    return s.store.has(t) || s.store.set(t, []), s.store.get(t).push(o), o._namespace = t, Promise.resolve()
                }
                catch (t) {
                }
            }
            define(t, e, i, s) {
                this.registry.set(t, {
                    assign: i, component: e, options: s
                })
            }
            defineAll(t) {
                t.forEach((t => {
                    this.define(t.namespace, t.component, t.assign, t.options)
                }))
            }
        }
            ({
                define: [{
                    namespace: "layout", component: class extends i {
                        constructor() {
                            super(...arguments), this.initLenis()
                        }
                        initLenis() {
                            x.isTouch || (this.lenis = new O, this.lenis.on("scroll", x.update), S.ticker.add((t => this.lenis.raf(1e3 * t))), S.ticker.lagSmoothing(0))
                        }
                        scrollTop() {
                        }
                        scrollLeft() {
                        }
                        scrollHeight() {
                        }
                        scrollWidth() {
                        }
                    }
                }
                ]
            }),
        window.addEventListener("pagehide", (() => window.scrollTo(0, 0)))
})
    ();