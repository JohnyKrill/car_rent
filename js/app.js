/*! For license information please see app.min.js.LICENSE.txt */
(() => {
  "use strict";
  function e(e) {
    this.type = e;
  }
  (e.prototype.init = function () {
    const e = this;
    (this.оbjects = []),
      (this.daClassname = "_dynamic_adapt_"),
      (this.nodes = document.querySelectorAll("[data-da]"));
    for (let e = 0; e < this.nodes.length; e++) {
      const t = this.nodes[e],
        i = t.dataset.da.trim().split(","),
        n = {};
      (n.element = t),
        (n.parent = t.parentNode),
        (n.destination = document.querySelector(i[0].trim())),
        (n.breakpoint = i[1] ? i[1].trim() : "767"),
        (n.place = i[2] ? i[2].trim() : "last"),
        (n.index = this.indexInParent(n.parent, n.element)),
        this.оbjects.push(n);
    }
    this.arraySort(this.оbjects),
      (this.mediaQueries = Array.prototype.map.call(
        this.оbjects,
        function (e) {
          return (
            "(" + this.type + "-width: " + e.breakpoint + "px)," + e.breakpoint
          );
        },
        this
      )),
      (this.mediaQueries = Array.prototype.filter.call(
        this.mediaQueries,
        function (e, t, i) {
          return Array.prototype.indexOf.call(i, e) === t;
        }
      ));
    for (let t = 0; t < this.mediaQueries.length; t++) {
      const i = this.mediaQueries[t],
        n = String.prototype.split.call(i, ","),
        r = window.matchMedia(n[0]),
        s = n[1],
        a = Array.prototype.filter.call(this.оbjects, function (e) {
          return e.breakpoint === s;
        });
      r.addListener(function () {
        e.mediaHandler(r, a);
      }),
        this.mediaHandler(r, a);
    }
  }),
    (e.prototype.mediaHandler = function (e, t) {
      if (e.matches)
        for (let e = 0; e < t.length; e++) {
          const i = t[e];
          (i.index = this.indexInParent(i.parent, i.element)),
            this.moveTo(i.place, i.element, i.destination);
        }
      else
        for (let e = t.length - 1; e >= 0; e--) {
          const i = t[e];
          i.element.classList.contains(this.daClassname) &&
            this.moveBack(i.parent, i.element, i.index);
        }
    }),
    (e.prototype.moveTo = function (e, t, i) {
      t.classList.add(this.daClassname),
        "last" === e || e >= i.children.length
          ? i.insertAdjacentElement("beforeend", t)
          : "first" !== e
          ? i.children[e].insertAdjacentElement("beforebegin", t)
          : i.insertAdjacentElement("afterbegin", t);
    }),
    (e.prototype.moveBack = function (e, t, i) {
      t.classList.remove(this.daClassname),
        void 0 !== e.children[i]
          ? e.children[i].insertAdjacentElement("beforebegin", t)
          : e.insertAdjacentElement("beforeend", t);
    }),
    (e.prototype.indexInParent = function (e, t) {
      const i = Array.prototype.slice.call(e.children);
      return Array.prototype.indexOf.call(i, t);
    }),
    (e.prototype.arraySort = function (e) {
      "min" === this.type
        ? Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                ? -1
                : "last" === e.place || "first" === t.place
                ? 1
                : e.place - t.place
              : e.breakpoint - t.breakpoint;
          })
        : Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                ? 1
                : "last" === e.place || "first" === t.place
                ? -1
                : t.place - e.place
              : t.breakpoint - e.breakpoint;
          });
    });
  new e("max").init();
  let t = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        t.Android() || t.BlackBerry() || t.iOS() || t.Opera() || t.Windows()
      );
    },
  };
  let i = !0,
    n = (e = 500) => {
      let t = document.querySelector("body");
      if (i) {
        let n = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let e = 0; e < n.length; e++) {
            n[e].style.paddingRight = "0px";
          }
          (t.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, e),
          (i = !1),
          setTimeout(function () {
            i = !0;
          }, e);
      }
    },
    r = (e = 500) => {
      let t = document.querySelector("body");
      if (i) {
        let n = document.querySelectorAll("[data-lp]");
        for (let e = 0; e < n.length; e++) {
          n[e].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (t.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (i = !1),
          setTimeout(function () {
            i = !0;
          }, e);
      }
    };
  function s(e) {
    return (
      null !== e &&
      "object" == typeof e &&
      "constructor" in e &&
      e.constructor === Object
    );
  }
  function a(e = {}, t = {}) {
    Object.keys(t).forEach((i) => {
      void 0 === e[i]
        ? (e[i] = t[i])
        : s(t[i]) && s(e[i]) && Object.keys(t[i]).length > 0 && a(e[i], t[i]);
    });
  }
  const o = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: { blur() {}, nodeName: "" },
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    createEvent: () => ({ initEvent() {} }),
    createElement: () => ({
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName: () => [],
    }),
    createElementNS: () => ({}),
    importNode: () => null,
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
  };
  function l() {
    const e = "undefined" != typeof document ? document : {};
    return a(e, o), e;
  }
  const d = {
    document: o,
    navigator: { userAgent: "" },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
    history: { replaceState() {}, pushState() {}, go() {}, back() {} },
    CustomEvent: function () {
      return this;
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle: () => ({ getPropertyValue: () => "" }),
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia: () => ({}),
    requestAnimationFrame: (e) =>
      "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
    cancelAnimationFrame(e) {
      "undefined" != typeof setTimeout && clearTimeout(e);
    },
  };
  function c() {
    const e = "undefined" != typeof window ? window : {};
    return a(e, d), e;
  }
  class u extends Array {
    constructor(e) {
      "number" == typeof e
        ? super(e)
        : (super(...(e || [])),
          (function (e) {
            const t = e.__proto__;
            Object.defineProperty(e, "__proto__", {
              get: () => t,
              set(e) {
                t.__proto__ = e;
              },
            });
          })(this));
    }
  }
  function p(e = []) {
    const t = [];
    return (
      e.forEach((e) => {
        Array.isArray(e) ? t.push(...p(e)) : t.push(e);
      }),
      t
    );
  }
  function h(e, t) {
    return Array.prototype.filter.call(e, t);
  }
  function f(e, t) {
    const i = c(),
      n = l();
    let r = [];
    if (!t && e instanceof u) return e;
    if (!e) return new u(r);
    if ("string" == typeof e) {
      const i = e.trim();
      if (i.indexOf("<") >= 0 && i.indexOf(">") >= 0) {
        let e = "div";
        0 === i.indexOf("<li") && (e = "ul"),
          0 === i.indexOf("<tr") && (e = "tbody"),
          (0 !== i.indexOf("<td") && 0 !== i.indexOf("<th")) || (e = "tr"),
          0 === i.indexOf("<tbody") && (e = "table"),
          0 === i.indexOf("<option") && (e = "select");
        const t = n.createElement(e);
        t.innerHTML = i;
        for (let e = 0; e < t.childNodes.length; e += 1)
          r.push(t.childNodes[e]);
      } else
        r = (function (e, t) {
          if ("string" != typeof e) return [e];
          const i = [],
            n = t.querySelectorAll(e);
          for (let e = 0; e < n.length; e += 1) i.push(n[e]);
          return i;
        })(e.trim(), t || n);
    } else if (e.nodeType || e === i || e === n) r.push(e);
    else if (Array.isArray(e)) {
      if (e instanceof u) return e;
      r = e;
    }
    return new u(
      (function (e) {
        const t = [];
        for (let i = 0; i < e.length; i += 1)
          -1 === t.indexOf(e[i]) && t.push(e[i]);
        return t;
      })(r)
    );
  }
  f.fn = u.prototype;
  const m = "resize scroll".split(" ");
  function g(e) {
    return function (...t) {
      if (void 0 === t[0]) {
        for (let t = 0; t < this.length; t += 1)
          m.indexOf(e) < 0 &&
            (e in this[t] ? this[t][e]() : f(this[t]).trigger(e));
        return this;
      }
      return this.on(e, ...t);
    };
  }
  g("click"),
    g("blur"),
    g("focus"),
    g("focusin"),
    g("focusout"),
    g("keyup"),
    g("keydown"),
    g("keypress"),
    g("submit"),
    g("change"),
    g("mousedown"),
    g("mousemove"),
    g("mouseup"),
    g("mouseenter"),
    g("mouseleave"),
    g("mouseout"),
    g("mouseover"),
    g("touchstart"),
    g("touchend"),
    g("touchmove"),
    g("resize"),
    g("scroll");
  const v = {
    addClass: function (...e) {
      const t = p(e.map((e) => e.split(" ")));
      return (
        this.forEach((e) => {
          e.classList.add(...t);
        }),
        this
      );
    },
    removeClass: function (...e) {
      const t = p(e.map((e) => e.split(" ")));
      return (
        this.forEach((e) => {
          e.classList.remove(...t);
        }),
        this
      );
    },
    hasClass: function (...e) {
      const t = p(e.map((e) => e.split(" ")));
      return (
        h(this, (e) => t.filter((t) => e.classList.contains(t)).length > 0)
          .length > 0
      );
    },
    toggleClass: function (...e) {
      const t = p(e.map((e) => e.split(" ")));
      this.forEach((e) => {
        t.forEach((t) => {
          e.classList.toggle(t);
        });
      });
    },
    attr: function (e, t) {
      if (1 === arguments.length && "string" == typeof e)
        return this[0] ? this[0].getAttribute(e) : void 0;
      for (let i = 0; i < this.length; i += 1)
        if (2 === arguments.length) this[i].setAttribute(e, t);
        else
          for (const t in e) (this[i][t] = e[t]), this[i].setAttribute(t, e[t]);
      return this;
    },
    removeAttr: function (e) {
      for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
      return this;
    },
    transform: function (e) {
      for (let t = 0; t < this.length; t += 1) this[t].style.transform = e;
      return this;
    },
    transition: function (e) {
      for (let t = 0; t < this.length; t += 1)
        this[t].style.transitionDuration = "string" != typeof e ? `${e}ms` : e;
      return this;
    },
    on: function (...e) {
      let [t, i, n, r] = e;
      function s(e) {
        const t = e.target;
        if (!t) return;
        const r = e.target.dom7EventData || [];
        if ((r.indexOf(e) < 0 && r.unshift(e), f(t).is(i))) n.apply(t, r);
        else {
          const e = f(t).parents();
          for (let t = 0; t < e.length; t += 1)
            f(e[t]).is(i) && n.apply(e[t], r);
        }
      }
      function a(e) {
        const t = (e && e.target && e.target.dom7EventData) || [];
        t.indexOf(e) < 0 && t.unshift(e), n.apply(this, t);
      }
      "function" == typeof e[1] && (([t, n, r] = e), (i = void 0)),
        r || (r = !1);
      const o = t.split(" ");
      let l;
      for (let e = 0; e < this.length; e += 1) {
        const t = this[e];
        if (i)
          for (l = 0; l < o.length; l += 1) {
            const e = o[l];
            t.dom7LiveListeners || (t.dom7LiveListeners = {}),
              t.dom7LiveListeners[e] || (t.dom7LiveListeners[e] = []),
              t.dom7LiveListeners[e].push({ listener: n, proxyListener: s }),
              t.addEventListener(e, s, r);
          }
        else
          for (l = 0; l < o.length; l += 1) {
            const e = o[l];
            t.dom7Listeners || (t.dom7Listeners = {}),
              t.dom7Listeners[e] || (t.dom7Listeners[e] = []),
              t.dom7Listeners[e].push({ listener: n, proxyListener: a }),
              t.addEventListener(e, a, r);
          }
      }
      return this;
    },
    off: function (...e) {
      let [t, i, n, r] = e;
      "function" == typeof e[1] && (([t, n, r] = e), (i = void 0)),
        r || (r = !1);
      const s = t.split(" ");
      for (let e = 0; e < s.length; e += 1) {
        const t = s[e];
        for (let e = 0; e < this.length; e += 1) {
          const s = this[e];
          let a;
          if (
            (!i && s.dom7Listeners
              ? (a = s.dom7Listeners[t])
              : i && s.dom7LiveListeners && (a = s.dom7LiveListeners[t]),
            a && a.length)
          )
            for (let e = a.length - 1; e >= 0; e -= 1) {
              const i = a[e];
              (n && i.listener === n) ||
              (n &&
                i.listener &&
                i.listener.dom7proxy &&
                i.listener.dom7proxy === n)
                ? (s.removeEventListener(t, i.proxyListener, r), a.splice(e, 1))
                : n ||
                  (s.removeEventListener(t, i.proxyListener, r),
                  a.splice(e, 1));
            }
        }
      }
      return this;
    },
    trigger: function (...e) {
      const t = c(),
        i = e[0].split(" "),
        n = e[1];
      for (let r = 0; r < i.length; r += 1) {
        const s = i[r];
        for (let i = 0; i < this.length; i += 1) {
          const r = this[i];
          if (t.CustomEvent) {
            const i = new t.CustomEvent(s, {
              detail: n,
              bubbles: !0,
              cancelable: !0,
            });
            (r.dom7EventData = e.filter((e, t) => t > 0)),
              r.dispatchEvent(i),
              (r.dom7EventData = []),
              delete r.dom7EventData;
          }
        }
      }
      return this;
    },
    transitionEnd: function (e) {
      const t = this;
      return (
        e &&
          t.on("transitionend", function i(n) {
            n.target === this && (e.call(this, n), t.off("transitionend", i));
          }),
        this
      );
    },
    outerWidth: function (e) {
      if (this.length > 0) {
        if (e) {
          const e = this.styles();
          return (
            this[0].offsetWidth +
            parseFloat(e.getPropertyValue("margin-right")) +
            parseFloat(e.getPropertyValue("margin-left"))
          );
        }
        return this[0].offsetWidth;
      }
      return null;
    },
    outerHeight: function (e) {
      if (this.length > 0) {
        if (e) {
          const e = this.styles();
          return (
            this[0].offsetHeight +
            parseFloat(e.getPropertyValue("margin-top")) +
            parseFloat(e.getPropertyValue("margin-bottom"))
          );
        }
        return this[0].offsetHeight;
      }
      return null;
    },
    styles: function () {
      const e = c();
      return this[0] ? e.getComputedStyle(this[0], null) : {};
    },
    offset: function () {
      if (this.length > 0) {
        const e = c(),
          t = l(),
          i = this[0],
          n = i.getBoundingClientRect(),
          r = t.body,
          s = i.clientTop || r.clientTop || 0,
          a = i.clientLeft || r.clientLeft || 0,
          o = i === e ? e.scrollY : i.scrollTop,
          d = i === e ? e.scrollX : i.scrollLeft;
        return { top: n.top + o - s, left: n.left + d - a };
      }
      return null;
    },
    css: function (e, t) {
      const i = c();
      let n;
      if (1 === arguments.length) {
        if ("string" != typeof e) {
          for (n = 0; n < this.length; n += 1)
            for (const t in e) this[n].style[t] = e[t];
          return this;
        }
        if (this[0])
          return i.getComputedStyle(this[0], null).getPropertyValue(e);
      }
      if (2 === arguments.length && "string" == typeof e) {
        for (n = 0; n < this.length; n += 1) this[n].style[e] = t;
        return this;
      }
      return this;
    },
    each: function (e) {
      return e
        ? (this.forEach((t, i) => {
            e.apply(t, [t, i]);
          }),
          this)
        : this;
    },
    html: function (e) {
      if (void 0 === e) return this[0] ? this[0].innerHTML : null;
      for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e;
      return this;
    },
    text: function (e) {
      if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
      for (let t = 0; t < this.length; t += 1) this[t].textContent = e;
      return this;
    },
    is: function (e) {
      const t = c(),
        i = l(),
        n = this[0];
      let r, s;
      if (!n || void 0 === e) return !1;
      if ("string" == typeof e) {
        if (n.matches) return n.matches(e);
        if (n.webkitMatchesSelector) return n.webkitMatchesSelector(e);
        if (n.msMatchesSelector) return n.msMatchesSelector(e);
        for (r = f(e), s = 0; s < r.length; s += 1) if (r[s] === n) return !0;
        return !1;
      }
      if (e === i) return n === i;
      if (e === t) return n === t;
      if (e.nodeType || e instanceof u) {
        for (r = e.nodeType ? [e] : e, s = 0; s < r.length; s += 1)
          if (r[s] === n) return !0;
        return !1;
      }
      return !1;
    },
    index: function () {
      let e,
        t = this[0];
      if (t) {
        for (e = 0; null !== (t = t.previousSibling); )
          1 === t.nodeType && (e += 1);
        return e;
      }
    },
    eq: function (e) {
      if (void 0 === e) return this;
      const t = this.length;
      if (e > t - 1) return f([]);
      if (e < 0) {
        const i = t + e;
        return f(i < 0 ? [] : [this[i]]);
      }
      return f([this[e]]);
    },
    append: function (...e) {
      let t;
      const i = l();
      for (let n = 0; n < e.length; n += 1) {
        t = e[n];
        for (let e = 0; e < this.length; e += 1)
          if ("string" == typeof t) {
            const n = i.createElement("div");
            for (n.innerHTML = t; n.firstChild; )
              this[e].appendChild(n.firstChild);
          } else if (t instanceof u)
            for (let i = 0; i < t.length; i += 1) this[e].appendChild(t[i]);
          else this[e].appendChild(t);
      }
      return this;
    },
    prepend: function (e) {
      const t = l();
      let i, n;
      for (i = 0; i < this.length; i += 1)
        if ("string" == typeof e) {
          const r = t.createElement("div");
          for (r.innerHTML = e, n = r.childNodes.length - 1; n >= 0; n -= 1)
            this[i].insertBefore(r.childNodes[n], this[i].childNodes[0]);
        } else if (e instanceof u)
          for (n = 0; n < e.length; n += 1)
            this[i].insertBefore(e[n], this[i].childNodes[0]);
        else this[i].insertBefore(e, this[i].childNodes[0]);
      return this;
    },
    next: function (e) {
      return this.length > 0
        ? e
          ? this[0].nextElementSibling && f(this[0].nextElementSibling).is(e)
            ? f([this[0].nextElementSibling])
            : f([])
          : this[0].nextElementSibling
          ? f([this[0].nextElementSibling])
          : f([])
        : f([]);
    },
    nextAll: function (e) {
      const t = [];
      let i = this[0];
      if (!i) return f([]);
      for (; i.nextElementSibling; ) {
        const n = i.nextElementSibling;
        e ? f(n).is(e) && t.push(n) : t.push(n), (i = n);
      }
      return f(t);
    },
    prev: function (e) {
      if (this.length > 0) {
        const t = this[0];
        return e
          ? t.previousElementSibling && f(t.previousElementSibling).is(e)
            ? f([t.previousElementSibling])
            : f([])
          : t.previousElementSibling
          ? f([t.previousElementSibling])
          : f([]);
      }
      return f([]);
    },
    prevAll: function (e) {
      const t = [];
      let i = this[0];
      if (!i) return f([]);
      for (; i.previousElementSibling; ) {
        const n = i.previousElementSibling;
        e ? f(n).is(e) && t.push(n) : t.push(n), (i = n);
      }
      return f(t);
    },
    parent: function (e) {
      const t = [];
      for (let i = 0; i < this.length; i += 1)
        null !== this[i].parentNode &&
          (e
            ? f(this[i].parentNode).is(e) && t.push(this[i].parentNode)
            : t.push(this[i].parentNode));
      return f(t);
    },
    parents: function (e) {
      const t = [];
      for (let i = 0; i < this.length; i += 1) {
        let n = this[i].parentNode;
        for (; n; ) e ? f(n).is(e) && t.push(n) : t.push(n), (n = n.parentNode);
      }
      return f(t);
    },
    closest: function (e) {
      let t = this;
      return void 0 === e ? f([]) : (t.is(e) || (t = t.parents(e).eq(0)), t);
    },
    find: function (e) {
      const t = [];
      for (let i = 0; i < this.length; i += 1) {
        const n = this[i].querySelectorAll(e);
        for (let e = 0; e < n.length; e += 1) t.push(n[e]);
      }
      return f(t);
    },
    children: function (e) {
      const t = [];
      for (let i = 0; i < this.length; i += 1) {
        const n = this[i].children;
        for (let i = 0; i < n.length; i += 1)
          (e && !f(n[i]).is(e)) || t.push(n[i]);
      }
      return f(t);
    },
    filter: function (e) {
      return f(h(this, e));
    },
    remove: function () {
      for (let e = 0; e < this.length; e += 1)
        this[e].parentNode && this[e].parentNode.removeChild(this[e]);
      return this;
    },
  };
  Object.keys(v).forEach((e) => {
    Object.defineProperty(f.fn, e, { value: v[e], writable: !0 });
  });
  const _ = f;
  function b(e, t = 0) {
    return setTimeout(e, t);
  }
  function y() {
    return Date.now();
  }
  function w(e, t = "x") {
    const i = c();
    let n, r, s;
    const a = (function (e) {
      const t = c();
      let i;
      return (
        t.getComputedStyle && (i = t.getComputedStyle(e, null)),
        !i && e.currentStyle && (i = e.currentStyle),
        i || (i = e.style),
        i
      );
    })(e);
    return (
      i.WebKitCSSMatrix
        ? ((r = a.transform || a.webkitTransform),
          r.split(",").length > 6 &&
            (r = r
              .split(", ")
              .map((e) => e.replace(",", "."))
              .join(", ")),
          (s = new i.WebKitCSSMatrix("none" === r ? "" : r)))
        : ((s =
            a.MozTransform ||
            a.OTransform ||
            a.MsTransform ||
            a.msTransform ||
            a.transform ||
            a
              .getPropertyValue("transform")
              .replace("translate(", "matrix(1, 0, 0, 1,")),
          (n = s.toString().split(","))),
      "x" === t &&
        (r = i.WebKitCSSMatrix
          ? s.m41
          : 16 === n.length
          ? parseFloat(n[12])
          : parseFloat(n[4])),
      "y" === t &&
        (r = i.WebKitCSSMatrix
          ? s.m42
          : 16 === n.length
          ? parseFloat(n[13])
          : parseFloat(n[5])),
      r || 0
    );
  }
  function T(e) {
    return (
      "object" == typeof e &&
      null !== e &&
      e.constructor &&
      "Object" === Object.prototype.toString.call(e).slice(8, -1)
    );
  }
  function x(...e) {
    const t = Object(e[0]),
      i = ["__proto__", "constructor", "prototype"];
    for (let r = 1; r < e.length; r += 1) {
      const s = e[r];
      if (
        null != s &&
        ((n = s),
        !("undefined" != typeof window && void 0 !== window.HTMLElement
          ? n instanceof HTMLElement
          : n && (1 === n.nodeType || 11 === n.nodeType)))
      ) {
        const e = Object.keys(Object(s)).filter((e) => i.indexOf(e) < 0);
        for (let i = 0, n = e.length; i < n; i += 1) {
          const n = e[i],
            r = Object.getOwnPropertyDescriptor(s, n);
          void 0 !== r &&
            r.enumerable &&
            (T(t[n]) && T(s[n])
              ? s[n].__swiper__
                ? (t[n] = s[n])
                : x(t[n], s[n])
              : !T(t[n]) && T(s[n])
              ? ((t[n] = {}), s[n].__swiper__ ? (t[n] = s[n]) : x(t[n], s[n]))
              : (t[n] = s[n]));
        }
      }
    }
    var n;
    return t;
  }
  function C(e, t, i) {
    e.style.setProperty(t, i);
  }
  function S({ swiper: e, targetPosition: t, side: i }) {
    const n = c(),
      r = -e.translate;
    let s,
      a = null;
    const o = e.params.speed;
    (e.wrapperEl.style.scrollSnapType = "none"),
      n.cancelAnimationFrame(e.cssModeFrameID);
    const l = t > r ? "next" : "prev",
      d = (e, t) => ("next" === l && e >= t) || ("prev" === l && e <= t),
      u = () => {
        (s = new Date().getTime()), null === a && (a = s);
        const l = Math.max(Math.min((s - a) / o, 1), 0),
          c = 0.5 - Math.cos(l * Math.PI) / 2;
        let p = r + c * (t - r);
        if ((d(p, t) && (p = t), e.wrapperEl.scrollTo({ [i]: p }), d(p, t)))
          return (
            (e.wrapperEl.style.overflow = "hidden"),
            (e.wrapperEl.style.scrollSnapType = ""),
            setTimeout(() => {
              (e.wrapperEl.style.overflow = ""),
                e.wrapperEl.scrollTo({ [i]: p });
            }),
            void n.cancelAnimationFrame(e.cssModeFrameID)
          );
        e.cssModeFrameID = n.requestAnimationFrame(u);
      };
    u();
  }
  let E, M, k;
  function O() {
    return (
      E ||
        (E = (function () {
          const e = c(),
            t = l();
          return {
            smoothScroll:
              t.documentElement && "scrollBehavior" in t.documentElement.style,
            touch: !!(
              "ontouchstart" in e ||
              (e.DocumentTouch && t instanceof e.DocumentTouch)
            ),
            passiveListener: (function () {
              let t = !1;
              try {
                const i = Object.defineProperty({}, "passive", {
                  get() {
                    t = !0;
                  },
                });
                e.addEventListener("testPassiveListener", null, i);
              } catch (e) {}
              return t;
            })(),
            gestures: "ongesturestart" in e,
          };
        })()),
      E
    );
  }
  function A(e = {}) {
    return (
      M ||
        (M = (function ({ userAgent: e } = {}) {
          const t = O(),
            i = c(),
            n = i.navigator.platform,
            r = e || i.navigator.userAgent,
            s = { ios: !1, android: !1 },
            a = i.screen.width,
            o = i.screen.height,
            l = r.match(/(Android);?[\s\/]+([\d.]+)?/);
          let d = r.match(/(iPad).*OS\s([\d_]+)/);
          const u = r.match(/(iPod)(.*OS\s([\d_]+))?/),
            p = !d && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
            h = "Win32" === n;
          let f = "MacIntel" === n;
          return (
            !d &&
              f &&
              t.touch &&
              [
                "1024x1366",
                "1366x1024",
                "834x1194",
                "1194x834",
                "834x1112",
                "1112x834",
                "768x1024",
                "1024x768",
                "820x1180",
                "1180x820",
                "810x1080",
                "1080x810",
              ].indexOf(`${a}x${o}`) >= 0 &&
              ((d = r.match(/(Version)\/([\d.]+)/)),
              d || (d = [0, 1, "13_0_0"]),
              (f = !1)),
            l && !h && ((s.os = "android"), (s.android = !0)),
            (d || p || u) && ((s.os = "ios"), (s.ios = !0)),
            s
          );
        })(e)),
      M
    );
  }
  function P() {
    return (
      k ||
        (k = (function () {
          const e = c();
          return {
            isSafari: (function () {
              const t = e.navigator.userAgent.toLowerCase();
              return (
                t.indexOf("safari") >= 0 &&
                t.indexOf("chrome") < 0 &&
                t.indexOf("android") < 0
              );
            })(),
            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
              e.navigator.userAgent
            ),
          };
        })()),
      k
    );
  }
  const $ = {
    on(e, t, i) {
      const n = this;
      if (!n.eventsListeners || n.destroyed) return n;
      if ("function" != typeof t) return n;
      const r = i ? "unshift" : "push";
      return (
        e.split(" ").forEach((e) => {
          n.eventsListeners[e] || (n.eventsListeners[e] = []),
            n.eventsListeners[e][r](t);
        }),
        n
      );
    },
    once(e, t, i) {
      const n = this;
      if (!n.eventsListeners || n.destroyed) return n;
      if ("function" != typeof t) return n;
      function r(...i) {
        n.off(e, r), r.__emitterProxy && delete r.__emitterProxy, t.apply(n, i);
      }
      return (r.__emitterProxy = t), n.on(e, r, i);
    },
    onAny(e, t) {
      const i = this;
      if (!i.eventsListeners || i.destroyed) return i;
      if ("function" != typeof e) return i;
      const n = t ? "unshift" : "push";
      return (
        i.eventsAnyListeners.indexOf(e) < 0 && i.eventsAnyListeners[n](e), i
      );
    },
    offAny(e) {
      const t = this;
      if (!t.eventsListeners || t.destroyed) return t;
      if (!t.eventsAnyListeners) return t;
      const i = t.eventsAnyListeners.indexOf(e);
      return i >= 0 && t.eventsAnyListeners.splice(i, 1), t;
    },
    off(e, t) {
      const i = this;
      return !i.eventsListeners || i.destroyed
        ? i
        : i.eventsListeners
        ? (e.split(" ").forEach((e) => {
            void 0 === t
              ? (i.eventsListeners[e] = [])
              : i.eventsListeners[e] &&
                i.eventsListeners[e].forEach((n, r) => {
                  (n === t || (n.__emitterProxy && n.__emitterProxy === t)) &&
                    i.eventsListeners[e].splice(r, 1);
                });
          }),
          i)
        : i;
    },
    emit(...e) {
      const t = this;
      if (!t.eventsListeners || t.destroyed) return t;
      if (!t.eventsListeners) return t;
      let i, n, r;
      "string" == typeof e[0] || Array.isArray(e[0])
        ? ((i = e[0]), (n = e.slice(1, e.length)), (r = t))
        : ((i = e[0].events), (n = e[0].data), (r = e[0].context || t)),
        n.unshift(r);
      return (
        (Array.isArray(i) ? i : i.split(" ")).forEach((e) => {
          t.eventsAnyListeners &&
            t.eventsAnyListeners.length &&
            t.eventsAnyListeners.forEach((t) => {
              t.apply(r, [e, ...n]);
            }),
            t.eventsListeners &&
              t.eventsListeners[e] &&
              t.eventsListeners[e].forEach((e) => {
                e.apply(r, n);
              });
        }),
        t
      );
    },
  };
  const L = {
    updateSize: function () {
      const e = this;
      let t, i;
      const n = e.$el;
      (t =
        void 0 !== e.params.width && null !== e.params.width
          ? e.params.width
          : n[0].clientWidth),
        (i =
          void 0 !== e.params.height && null !== e.params.height
            ? e.params.height
            : n[0].clientHeight),
        (0 === t && e.isHorizontal()) ||
          (0 === i && e.isVertical()) ||
          ((t =
            t -
            parseInt(n.css("padding-left") || 0, 10) -
            parseInt(n.css("padding-right") || 0, 10)),
          (i =
            i -
            parseInt(n.css("padding-top") || 0, 10) -
            parseInt(n.css("padding-bottom") || 0, 10)),
          Number.isNaN(t) && (t = 0),
          Number.isNaN(i) && (i = 0),
          Object.assign(e, {
            width: t,
            height: i,
            size: e.isHorizontal() ? t : i,
          }));
    },
    updateSlides: function () {
      const e = this;
      function t(t) {
        return e.isHorizontal()
          ? t
          : {
              width: "height",
              "margin-top": "margin-left",
              "margin-bottom ": "margin-right",
              "margin-left": "margin-top",
              "margin-right": "margin-bottom",
              "padding-left": "padding-top",
              "padding-right": "padding-bottom",
              marginRight: "marginBottom",
            }[t];
      }
      function i(e, i) {
        return parseFloat(e.getPropertyValue(t(i)) || 0);
      }
      const n = e.params,
        { $wrapperEl: r, size: s, rtlTranslate: a, wrongRTL: o } = e,
        l = e.virtual && n.virtual.enabled,
        d = l ? e.virtual.slides.length : e.slides.length,
        c = r.children(`.${e.params.slideClass}`),
        u = l ? e.virtual.slides.length : c.length;
      let p = [];
      const h = [],
        f = [];
      let m = n.slidesOffsetBefore;
      "function" == typeof m && (m = n.slidesOffsetBefore.call(e));
      let g = n.slidesOffsetAfter;
      "function" == typeof g && (g = n.slidesOffsetAfter.call(e));
      const v = e.snapGrid.length,
        _ = e.slidesGrid.length;
      let b = n.spaceBetween,
        y = -m,
        w = 0,
        T = 0;
      if (void 0 === s) return;
      "string" == typeof b &&
        b.indexOf("%") >= 0 &&
        (b = (parseFloat(b.replace("%", "")) / 100) * s),
        (e.virtualSize = -b),
        a
          ? c.css({ marginLeft: "", marginBottom: "", marginTop: "" })
          : c.css({ marginRight: "", marginBottom: "", marginTop: "" }),
        n.centeredSlides &&
          n.cssMode &&
          (C(e.wrapperEl, "--swiper-centered-offset-before", ""),
          C(e.wrapperEl, "--swiper-centered-offset-after", ""));
      const x = n.grid && n.grid.rows > 1 && e.grid;
      let S;
      x && e.grid.initSlides(u);
      const E =
        "auto" === n.slidesPerView &&
        n.breakpoints &&
        Object.keys(n.breakpoints).filter(
          (e) => void 0 !== n.breakpoints[e].slidesPerView
        ).length > 0;
      for (let r = 0; r < u; r += 1) {
        S = 0;
        const a = c.eq(r);
        if (
          (x && e.grid.updateSlide(r, a, u, t), "none" !== a.css("display"))
        ) {
          if ("auto" === n.slidesPerView) {
            E && (c[r].style[t("width")] = "");
            const s = getComputedStyle(a[0]),
              o = a[0].style.transform,
              l = a[0].style.webkitTransform;
            if (
              (o && (a[0].style.transform = "none"),
              l && (a[0].style.webkitTransform = "none"),
              n.roundLengths)
            )
              S = e.isHorizontal() ? a.outerWidth(!0) : a.outerHeight(!0);
            else {
              const e = i(s, "width"),
                t = i(s, "padding-left"),
                n = i(s, "padding-right"),
                r = i(s, "margin-left"),
                o = i(s, "margin-right"),
                l = s.getPropertyValue("box-sizing");
              if (l && "border-box" === l) S = e + r + o;
              else {
                const { clientWidth: i, offsetWidth: s } = a[0];
                S = e + t + n + r + o + (s - i);
              }
            }
            o && (a[0].style.transform = o),
              l && (a[0].style.webkitTransform = l),
              n.roundLengths && (S = Math.floor(S));
          } else
            (S = (s - (n.slidesPerView - 1) * b) / n.slidesPerView),
              n.roundLengths && (S = Math.floor(S)),
              c[r] && (c[r].style[t("width")] = `${S}px`);
          c[r] && (c[r].swiperSlideSize = S),
            f.push(S),
            n.centeredSlides
              ? ((y = y + S / 2 + w / 2 + b),
                0 === w && 0 !== r && (y = y - s / 2 - b),
                0 === r && (y = y - s / 2 - b),
                Math.abs(y) < 0.001 && (y = 0),
                n.roundLengths && (y = Math.floor(y)),
                T % n.slidesPerGroup == 0 && p.push(y),
                h.push(y))
              : (n.roundLengths && (y = Math.floor(y)),
                (T - Math.min(e.params.slidesPerGroupSkip, T)) %
                  e.params.slidesPerGroup ==
                  0 && p.push(y),
                h.push(y),
                (y = y + S + b)),
            (e.virtualSize += S + b),
            (w = S),
            (T += 1);
        }
      }
      if (
        ((e.virtualSize = Math.max(e.virtualSize, s) + g),
        a &&
          o &&
          ("slide" === n.effect || "coverflow" === n.effect) &&
          r.css({ width: `${e.virtualSize + n.spaceBetween}px` }),
        n.setWrapperSize &&
          r.css({ [t("width")]: `${e.virtualSize + n.spaceBetween}px` }),
        x && e.grid.updateWrapperSize(S, p, t),
        !n.centeredSlides)
      ) {
        const t = [];
        for (let i = 0; i < p.length; i += 1) {
          let r = p[i];
          n.roundLengths && (r = Math.floor(r)),
            p[i] <= e.virtualSize - s && t.push(r);
        }
        (p = t),
          Math.floor(e.virtualSize - s) - Math.floor(p[p.length - 1]) > 1 &&
            p.push(e.virtualSize - s);
      }
      if ((0 === p.length && (p = [0]), 0 !== n.spaceBetween)) {
        const i = e.isHorizontal() && a ? "marginLeft" : t("marginRight");
        c.filter((e, t) => !n.cssMode || t !== c.length - 1).css({
          [i]: `${b}px`,
        });
      }
      if (n.centeredSlides && n.centeredSlidesBounds) {
        let e = 0;
        f.forEach((t) => {
          e += t + (n.spaceBetween ? n.spaceBetween : 0);
        }),
          (e -= n.spaceBetween);
        const t = e - s;
        p = p.map((e) => (e < 0 ? -m : e > t ? t + g : e));
      }
      if (n.centerInsufficientSlides) {
        let e = 0;
        if (
          (f.forEach((t) => {
            e += t + (n.spaceBetween ? n.spaceBetween : 0);
          }),
          (e -= n.spaceBetween),
          e < s)
        ) {
          const t = (s - e) / 2;
          p.forEach((e, i) => {
            p[i] = e - t;
          }),
            h.forEach((e, i) => {
              h[i] = e + t;
            });
        }
      }
      if (
        (Object.assign(e, {
          slides: c,
          snapGrid: p,
          slidesGrid: h,
          slidesSizesGrid: f,
        }),
        n.centeredSlides && n.cssMode && !n.centeredSlidesBounds)
      ) {
        C(e.wrapperEl, "--swiper-centered-offset-before", -p[0] + "px"),
          C(
            e.wrapperEl,
            "--swiper-centered-offset-after",
            e.size / 2 - f[f.length - 1] / 2 + "px"
          );
        const t = -e.snapGrid[0],
          i = -e.slidesGrid[0];
        (e.snapGrid = e.snapGrid.map((e) => e + t)),
          (e.slidesGrid = e.slidesGrid.map((e) => e + i));
      }
      if (
        (u !== d && e.emit("slidesLengthChange"),
        p.length !== v &&
          (e.params.watchOverflow && e.checkOverflow(),
          e.emit("snapGridLengthChange")),
        h.length !== _ && e.emit("slidesGridLengthChange"),
        n.watchSlidesProgress && e.updateSlidesOffset(),
        !(l || n.cssMode || ("slide" !== n.effect && "fade" !== n.effect)))
      ) {
        const t = `${n.containerModifierClass}backface-hidden`,
          i = e.$el.hasClass(t);
        u <= n.maxBackfaceHiddenSlides
          ? i || e.$el.addClass(t)
          : i && e.$el.removeClass(t);
      }
    },
    updateAutoHeight: function (e) {
      const t = this,
        i = [],
        n = t.virtual && t.params.virtual.enabled;
      let r,
        s = 0;
      "number" == typeof e
        ? t.setTransition(e)
        : !0 === e && t.setTransition(t.params.speed);
      const a = (e) =>
        n
          ? t.slides.filter(
              (t) =>
                parseInt(t.getAttribute("data-swiper-slide-index"), 10) === e
            )[0]
          : t.slides.eq(e)[0];
      if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
        if (t.params.centeredSlides)
          (t.visibleSlides || _([])).each((e) => {
            i.push(e);
          });
        else
          for (r = 0; r < Math.ceil(t.params.slidesPerView); r += 1) {
            const e = t.activeIndex + r;
            if (e > t.slides.length && !n) break;
            i.push(a(e));
          }
      else i.push(a(t.activeIndex));
      for (r = 0; r < i.length; r += 1)
        if (void 0 !== i[r]) {
          const e = i[r].offsetHeight;
          s = e > s ? e : s;
        }
      (s || 0 === s) && t.$wrapperEl.css("height", `${s}px`);
    },
    updateSlidesOffset: function () {
      const e = this,
        t = e.slides;
      for (let i = 0; i < t.length; i += 1)
        t[i].swiperSlideOffset = e.isHorizontal()
          ? t[i].offsetLeft
          : t[i].offsetTop;
    },
    updateSlidesProgress: function (e = (this && this.translate) || 0) {
      const t = this,
        i = t.params,
        { slides: n, rtlTranslate: r, snapGrid: s } = t;
      if (0 === n.length) return;
      void 0 === n[0].swiperSlideOffset && t.updateSlidesOffset();
      let a = -e;
      r && (a = e),
        n.removeClass(i.slideVisibleClass),
        (t.visibleSlidesIndexes = []),
        (t.visibleSlides = []);
      for (let e = 0; e < n.length; e += 1) {
        const o = n[e];
        let l = o.swiperSlideOffset;
        i.cssMode && i.centeredSlides && (l -= n[0].swiperSlideOffset);
        const d =
            (a + (i.centeredSlides ? t.minTranslate() : 0) - l) /
            (o.swiperSlideSize + i.spaceBetween),
          c =
            (a - s[0] + (i.centeredSlides ? t.minTranslate() : 0) - l) /
            (o.swiperSlideSize + i.spaceBetween),
          u = -(a - l),
          p = u + t.slidesSizesGrid[e];
        ((u >= 0 && u < t.size - 1) ||
          (p > 1 && p <= t.size) ||
          (u <= 0 && p >= t.size)) &&
          (t.visibleSlides.push(o),
          t.visibleSlidesIndexes.push(e),
          n.eq(e).addClass(i.slideVisibleClass)),
          (o.progress = r ? -d : d),
          (o.originalProgress = r ? -c : c);
      }
      t.visibleSlides = _(t.visibleSlides);
    },
    updateProgress: function (e) {
      const t = this;
      if (void 0 === e) {
        const i = t.rtlTranslate ? -1 : 1;
        e = (t && t.translate && t.translate * i) || 0;
      }
      const i = t.params,
        n = t.maxTranslate() - t.minTranslate();
      let { progress: r, isBeginning: s, isEnd: a } = t;
      const o = s,
        l = a;
      0 === n
        ? ((r = 0), (s = !0), (a = !0))
        : ((r = (e - t.minTranslate()) / n), (s = r <= 0), (a = r >= 1)),
        Object.assign(t, { progress: r, isBeginning: s, isEnd: a }),
        (i.watchSlidesProgress || (i.centeredSlides && i.autoHeight)) &&
          t.updateSlidesProgress(e),
        s && !o && t.emit("reachBeginning toEdge"),
        a && !l && t.emit("reachEnd toEdge"),
        ((o && !s) || (l && !a)) && t.emit("fromEdge"),
        t.emit("progress", r);
    },
    updateSlidesClasses: function () {
      const e = this,
        {
          slides: t,
          params: i,
          $wrapperEl: n,
          activeIndex: r,
          realIndex: s,
        } = e,
        a = e.virtual && i.virtual.enabled;
      let o;
      t.removeClass(
        `${i.slideActiveClass} ${i.slideNextClass} ${i.slidePrevClass} ${i.slideDuplicateActiveClass} ${i.slideDuplicateNextClass} ${i.slideDuplicatePrevClass}`
      ),
        (o = a
          ? e.$wrapperEl.find(
              `.${i.slideClass}[data-swiper-slide-index="${r}"]`
            )
          : t.eq(r)),
        o.addClass(i.slideActiveClass),
        i.loop &&
          (o.hasClass(i.slideDuplicateClass)
            ? n
                .children(
                  `.${i.slideClass}:not(.${i.slideDuplicateClass})[data-swiper-slide-index="${s}"]`
                )
                .addClass(i.slideDuplicateActiveClass)
            : n
                .children(
                  `.${i.slideClass}.${i.slideDuplicateClass}[data-swiper-slide-index="${s}"]`
                )
                .addClass(i.slideDuplicateActiveClass));
      let l = o.nextAll(`.${i.slideClass}`).eq(0).addClass(i.slideNextClass);
      i.loop && 0 === l.length && ((l = t.eq(0)), l.addClass(i.slideNextClass));
      let d = o.prevAll(`.${i.slideClass}`).eq(0).addClass(i.slidePrevClass);
      i.loop &&
        0 === d.length &&
        ((d = t.eq(-1)), d.addClass(i.slidePrevClass)),
        i.loop &&
          (l.hasClass(i.slideDuplicateClass)
            ? n
                .children(
                  `.${i.slideClass}:not(.${
                    i.slideDuplicateClass
                  })[data-swiper-slide-index="${l.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(i.slideDuplicateNextClass)
            : n
                .children(
                  `.${i.slideClass}.${
                    i.slideDuplicateClass
                  }[data-swiper-slide-index="${l.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(i.slideDuplicateNextClass),
          d.hasClass(i.slideDuplicateClass)
            ? n
                .children(
                  `.${i.slideClass}:not(.${
                    i.slideDuplicateClass
                  })[data-swiper-slide-index="${d.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(i.slideDuplicatePrevClass)
            : n
                .children(
                  `.${i.slideClass}.${
                    i.slideDuplicateClass
                  }[data-swiper-slide-index="${d.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(i.slideDuplicatePrevClass)),
        e.emitSlidesClasses();
    },
    updateActiveIndex: function (e) {
      const t = this,
        i = t.rtlTranslate ? t.translate : -t.translate,
        {
          slidesGrid: n,
          snapGrid: r,
          params: s,
          activeIndex: a,
          realIndex: o,
          snapIndex: l,
        } = t;
      let d,
        c = e;
      if (void 0 === c) {
        for (let e = 0; e < n.length; e += 1)
          void 0 !== n[e + 1]
            ? i >= n[e] && i < n[e + 1] - (n[e + 1] - n[e]) / 2
              ? (c = e)
              : i >= n[e] && i < n[e + 1] && (c = e + 1)
            : i >= n[e] && (c = e);
        s.normalizeSlideIndex && (c < 0 || void 0 === c) && (c = 0);
      }
      if (r.indexOf(i) >= 0) d = r.indexOf(i);
      else {
        const e = Math.min(s.slidesPerGroupSkip, c);
        d = e + Math.floor((c - e) / s.slidesPerGroup);
      }
      if ((d >= r.length && (d = r.length - 1), c === a))
        return void (d !== l && ((t.snapIndex = d), t.emit("snapIndexChange")));
      const u = parseInt(
        t.slides.eq(c).attr("data-swiper-slide-index") || c,
        10
      );
      Object.assign(t, {
        snapIndex: d,
        realIndex: u,
        previousIndex: a,
        activeIndex: c,
      }),
        t.emit("activeIndexChange"),
        t.emit("snapIndexChange"),
        o !== u && t.emit("realIndexChange"),
        (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange");
    },
    updateClickedSlide: function (e) {
      const t = this,
        i = t.params,
        n = _(e).closest(`.${i.slideClass}`)[0];
      let r,
        s = !1;
      if (n)
        for (let e = 0; e < t.slides.length; e += 1)
          if (t.slides[e] === n) {
            (s = !0), (r = e);
            break;
          }
      if (!n || !s)
        return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
      (t.clickedSlide = n),
        t.virtual && t.params.virtual.enabled
          ? (t.clickedIndex = parseInt(
              _(n).attr("data-swiper-slide-index"),
              10
            ))
          : (t.clickedIndex = r),
        i.slideToClickedSlide &&
          void 0 !== t.clickedIndex &&
          t.clickedIndex !== t.activeIndex &&
          t.slideToClickedSlide();
    },
  };
  const D = {
    getTranslate: function (e = this.isHorizontal() ? "x" : "y") {
      const { params: t, rtlTranslate: i, translate: n, $wrapperEl: r } = this;
      if (t.virtualTranslate) return i ? -n : n;
      if (t.cssMode) return n;
      let s = w(r[0], e);
      return i && (s = -s), s || 0;
    },
    setTranslate: function (e, t) {
      const i = this,
        {
          rtlTranslate: n,
          params: r,
          $wrapperEl: s,
          wrapperEl: a,
          progress: o,
        } = i;
      let l,
        d = 0,
        c = 0;
      i.isHorizontal() ? (d = n ? -e : e) : (c = e),
        r.roundLengths && ((d = Math.floor(d)), (c = Math.floor(c))),
        r.cssMode
          ? (a[i.isHorizontal() ? "scrollLeft" : "scrollTop"] = i.isHorizontal()
              ? -d
              : -c)
          : r.virtualTranslate ||
            s.transform(`translate3d(${d}px, ${c}px, 0px)`),
        (i.previousTranslate = i.translate),
        (i.translate = i.isHorizontal() ? d : c);
      const u = i.maxTranslate() - i.minTranslate();
      (l = 0 === u ? 0 : (e - i.minTranslate()) / u),
        l !== o && i.updateProgress(e),
        i.emit("setTranslate", i.translate, t);
    },
    minTranslate: function () {
      return -this.snapGrid[0];
    },
    maxTranslate: function () {
      return -this.snapGrid[this.snapGrid.length - 1];
    },
    translateTo: function (e = 0, t = this.params.speed, i = !0, n = !0, r) {
      const s = this,
        { params: a, wrapperEl: o } = s;
      if (s.animating && a.preventInteractionOnTransition) return !1;
      const l = s.minTranslate(),
        d = s.maxTranslate();
      let c;
      if (
        ((c = n && e > l ? l : n && e < d ? d : e),
        s.updateProgress(c),
        a.cssMode)
      ) {
        const e = s.isHorizontal();
        if (0 === t) o[e ? "scrollLeft" : "scrollTop"] = -c;
        else {
          if (!s.support.smoothScroll)
            return (
              S({ swiper: s, targetPosition: -c, side: e ? "left" : "top" }), !0
            );
          o.scrollTo({ [e ? "left" : "top"]: -c, behavior: "smooth" });
        }
        return !0;
      }
      return (
        0 === t
          ? (s.setTransition(0),
            s.setTranslate(c),
            i &&
              (s.emit("beforeTransitionStart", t, r), s.emit("transitionEnd")))
          : (s.setTransition(t),
            s.setTranslate(c),
            i &&
              (s.emit("beforeTransitionStart", t, r),
              s.emit("transitionStart")),
            s.animating ||
              ((s.animating = !0),
              s.onTranslateToWrapperTransitionEnd ||
                (s.onTranslateToWrapperTransitionEnd = function (e) {
                  s &&
                    !s.destroyed &&
                    e.target === this &&
                    (s.$wrapperEl[0].removeEventListener(
                      "transitionend",
                      s.onTranslateToWrapperTransitionEnd
                    ),
                    s.$wrapperEl[0].removeEventListener(
                      "webkitTransitionEnd",
                      s.onTranslateToWrapperTransitionEnd
                    ),
                    (s.onTranslateToWrapperTransitionEnd = null),
                    delete s.onTranslateToWrapperTransitionEnd,
                    i && s.emit("transitionEnd"));
                }),
              s.$wrapperEl[0].addEventListener(
                "transitionend",
                s.onTranslateToWrapperTransitionEnd
              ),
              s.$wrapperEl[0].addEventListener(
                "webkitTransitionEnd",
                s.onTranslateToWrapperTransitionEnd
              ))),
        !0
      );
    },
  };
  function z({ swiper: e, runCallbacks: t, direction: i, step: n }) {
    const { activeIndex: r, previousIndex: s } = e;
    let a = i;
    if (
      (a || (a = r > s ? "next" : r < s ? "prev" : "reset"),
      e.emit(`transition${n}`),
      t && r !== s)
    ) {
      if ("reset" === a) return void e.emit(`slideResetTransition${n}`);
      e.emit(`slideChangeTransition${n}`),
        "next" === a
          ? e.emit(`slideNextTransition${n}`)
          : e.emit(`slidePrevTransition${n}`);
    }
  }
  const I = {
    slideTo: function (e = 0, t = this.params.speed, i = !0, n, r) {
      if ("number" != typeof e && "string" != typeof e)
        throw new Error(
          `The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`
        );
      if ("string" == typeof e) {
        const t = parseInt(e, 10);
        if (!isFinite(t))
          throw new Error(
            `The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`
          );
        e = t;
      }
      const s = this;
      let a = e;
      a < 0 && (a = 0);
      const {
        params: o,
        snapGrid: l,
        slidesGrid: d,
        previousIndex: c,
        activeIndex: u,
        rtlTranslate: p,
        wrapperEl: h,
        enabled: f,
      } = s;
      if ((s.animating && o.preventInteractionOnTransition) || (!f && !n && !r))
        return !1;
      const m = Math.min(s.params.slidesPerGroupSkip, a);
      let g = m + Math.floor((a - m) / s.params.slidesPerGroup);
      g >= l.length && (g = l.length - 1);
      const v = -l[g];
      if (o.normalizeSlideIndex)
        for (let e = 0; e < d.length; e += 1) {
          const t = -Math.floor(100 * v),
            i = Math.floor(100 * d[e]),
            n = Math.floor(100 * d[e + 1]);
          void 0 !== d[e + 1]
            ? t >= i && t < n - (n - i) / 2
              ? (a = e)
              : t >= i && t < n && (a = e + 1)
            : t >= i && (a = e);
        }
      if (s.initialized && a !== u) {
        if (!s.allowSlideNext && v < s.translate && v < s.minTranslate())
          return !1;
        if (
          !s.allowSlidePrev &&
          v > s.translate &&
          v > s.maxTranslate() &&
          (u || 0) !== a
        )
          return !1;
      }
      let _;
      if (
        (a !== (c || 0) && i && s.emit("beforeSlideChangeStart"),
        s.updateProgress(v),
        (_ = a > u ? "next" : a < u ? "prev" : "reset"),
        (p && -v === s.translate) || (!p && v === s.translate))
      )
        return (
          s.updateActiveIndex(a),
          o.autoHeight && s.updateAutoHeight(),
          s.updateSlidesClasses(),
          "slide" !== o.effect && s.setTranslate(v),
          "reset" !== _ && (s.transitionStart(i, _), s.transitionEnd(i, _)),
          !1
        );
      if (o.cssMode) {
        const e = s.isHorizontal(),
          i = p ? v : -v;
        if (0 === t) {
          const t = s.virtual && s.params.virtual.enabled;
          t &&
            ((s.wrapperEl.style.scrollSnapType = "none"),
            (s._immediateVirtual = !0)),
            (h[e ? "scrollLeft" : "scrollTop"] = i),
            t &&
              requestAnimationFrame(() => {
                (s.wrapperEl.style.scrollSnapType = ""),
                  (s._swiperImmediateVirtual = !1);
              });
        } else {
          if (!s.support.smoothScroll)
            return (
              S({ swiper: s, targetPosition: i, side: e ? "left" : "top" }), !0
            );
          h.scrollTo({ [e ? "left" : "top"]: i, behavior: "smooth" });
        }
        return !0;
      }
      return (
        s.setTransition(t),
        s.setTranslate(v),
        s.updateActiveIndex(a),
        s.updateSlidesClasses(),
        s.emit("beforeTransitionStart", t, n),
        s.transitionStart(i, _),
        0 === t
          ? s.transitionEnd(i, _)
          : s.animating ||
            ((s.animating = !0),
            s.onSlideToWrapperTransitionEnd ||
              (s.onSlideToWrapperTransitionEnd = function (e) {
                s &&
                  !s.destroyed &&
                  e.target === this &&
                  (s.$wrapperEl[0].removeEventListener(
                    "transitionend",
                    s.onSlideToWrapperTransitionEnd
                  ),
                  s.$wrapperEl[0].removeEventListener(
                    "webkitTransitionEnd",
                    s.onSlideToWrapperTransitionEnd
                  ),
                  (s.onSlideToWrapperTransitionEnd = null),
                  delete s.onSlideToWrapperTransitionEnd,
                  s.transitionEnd(i, _));
              }),
            s.$wrapperEl[0].addEventListener(
              "transitionend",
              s.onSlideToWrapperTransitionEnd
            ),
            s.$wrapperEl[0].addEventListener(
              "webkitTransitionEnd",
              s.onSlideToWrapperTransitionEnd
            )),
        !0
      );
    },
    slideToLoop: function (e = 0, t = this.params.speed, i = !0, n) {
      if ("string" == typeof e) {
        const t = parseInt(e, 10);
        if (!isFinite(t))
          throw new Error(
            `The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`
          );
        e = t;
      }
      const r = this;
      let s = e;
      return r.params.loop && (s += r.loopedSlides), r.slideTo(s, t, i, n);
    },
    slideNext: function (e = this.params.speed, t = !0, i) {
      const n = this,
        { animating: r, enabled: s, params: a } = n;
      if (!s) return n;
      let o = a.slidesPerGroup;
      "auto" === a.slidesPerView &&
        1 === a.slidesPerGroup &&
        a.slidesPerGroupAuto &&
        (o = Math.max(n.slidesPerViewDynamic("current", !0), 1));
      const l = n.activeIndex < a.slidesPerGroupSkip ? 1 : o;
      if (a.loop) {
        if (r && a.loopPreventsSlide) return !1;
        n.loopFix(), (n._clientLeft = n.$wrapperEl[0].clientLeft);
      }
      return a.rewind && n.isEnd
        ? n.slideTo(0, e, t, i)
        : n.slideTo(n.activeIndex + l, e, t, i);
    },
    slidePrev: function (e = this.params.speed, t = !0, i) {
      const n = this,
        {
          params: r,
          animating: s,
          snapGrid: a,
          slidesGrid: o,
          rtlTranslate: l,
          enabled: d,
        } = n;
      if (!d) return n;
      if (r.loop) {
        if (s && r.loopPreventsSlide) return !1;
        n.loopFix(), (n._clientLeft = n.$wrapperEl[0].clientLeft);
      }
      function c(e) {
        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
      }
      const u = c(l ? n.translate : -n.translate),
        p = a.map((e) => c(e));
      let h = a[p.indexOf(u) - 1];
      if (void 0 === h && r.cssMode) {
        let e;
        a.forEach((t, i) => {
          u >= t && (e = i);
        }),
          void 0 !== e && (h = a[e > 0 ? e - 1 : e]);
      }
      let f = 0;
      if (
        (void 0 !== h &&
          ((f = o.indexOf(h)),
          f < 0 && (f = n.activeIndex - 1),
          "auto" === r.slidesPerView &&
            1 === r.slidesPerGroup &&
            r.slidesPerGroupAuto &&
            ((f = f - n.slidesPerViewDynamic("previous", !0) + 1),
            (f = Math.max(f, 0)))),
        r.rewind && n.isBeginning)
      ) {
        const r =
          n.params.virtual && n.params.virtual.enabled && n.virtual
            ? n.virtual.slides.length - 1
            : n.slides.length - 1;
        return n.slideTo(r, e, t, i);
      }
      return n.slideTo(f, e, t, i);
    },
    slideReset: function (e = this.params.speed, t = !0, i) {
      return this.slideTo(this.activeIndex, e, t, i);
    },
    slideToClosest: function (e = this.params.speed, t = !0, i, n = 0.5) {
      const r = this;
      let s = r.activeIndex;
      const a = Math.min(r.params.slidesPerGroupSkip, s),
        o = a + Math.floor((s - a) / r.params.slidesPerGroup),
        l = r.rtlTranslate ? r.translate : -r.translate;
      if (l >= r.snapGrid[o]) {
        const e = r.snapGrid[o];
        l - e > (r.snapGrid[o + 1] - e) * n && (s += r.params.slidesPerGroup);
      } else {
        const e = r.snapGrid[o - 1];
        l - e <= (r.snapGrid[o] - e) * n && (s -= r.params.slidesPerGroup);
      }
      return (
        (s = Math.max(s, 0)),
        (s = Math.min(s, r.slidesGrid.length - 1)),
        r.slideTo(s, e, t, i)
      );
    },
    slideToClickedSlide: function () {
      const e = this,
        { params: t, $wrapperEl: i } = e,
        n =
          "auto" === t.slidesPerView
            ? e.slidesPerViewDynamic()
            : t.slidesPerView;
      let r,
        s = e.clickedIndex;
      if (t.loop) {
        if (e.animating) return;
        (r = parseInt(_(e.clickedSlide).attr("data-swiper-slide-index"), 10)),
          t.centeredSlides
            ? s < e.loopedSlides - n / 2 ||
              s > e.slides.length - e.loopedSlides + n / 2
              ? (e.loopFix(),
                (s = i
                  .children(
                    `.${t.slideClass}[data-swiper-slide-index="${r}"]:not(.${t.slideDuplicateClass})`
                  )
                  .eq(0)
                  .index()),
                b(() => {
                  e.slideTo(s);
                }))
              : e.slideTo(s)
            : s > e.slides.length - n
            ? (e.loopFix(),
              (s = i
                .children(
                  `.${t.slideClass}[data-swiper-slide-index="${r}"]:not(.${t.slideDuplicateClass})`
                )
                .eq(0)
                .index()),
              b(() => {
                e.slideTo(s);
              }))
            : e.slideTo(s);
      } else e.slideTo(s);
    },
  };
  const B = {
    loopCreate: function () {
      const e = this,
        t = l(),
        { params: i, $wrapperEl: n } = e,
        r = n.children().length > 0 ? _(n.children()[0].parentNode) : n;
      r.children(`.${i.slideClass}.${i.slideDuplicateClass}`).remove();
      let s = r.children(`.${i.slideClass}`);
      if (i.loopFillGroupWithBlank) {
        const e = i.slidesPerGroup - (s.length % i.slidesPerGroup);
        if (e !== i.slidesPerGroup) {
          for (let n = 0; n < e; n += 1) {
            const e = _(t.createElement("div")).addClass(
              `${i.slideClass} ${i.slideBlankClass}`
            );
            r.append(e);
          }
          s = r.children(`.${i.slideClass}`);
        }
      }
      "auto" !== i.slidesPerView ||
        i.loopedSlides ||
        (i.loopedSlides = s.length),
        (e.loopedSlides = Math.ceil(
          parseFloat(i.loopedSlides || i.slidesPerView, 10)
        )),
        (e.loopedSlides += i.loopAdditionalSlides),
        e.loopedSlides > s.length &&
          e.params.loopedSlidesLimit &&
          (e.loopedSlides = s.length);
      const a = [],
        o = [];
      s.each((e, t) => {
        _(e).attr("data-swiper-slide-index", t);
      });
      for (let t = 0; t < e.loopedSlides; t += 1) {
        const e = t - Math.floor(t / s.length) * s.length;
        o.push(s.eq(e)[0]), a.unshift(s.eq(s.length - e - 1)[0]);
      }
      for (let e = 0; e < o.length; e += 1)
        r.append(_(o[e].cloneNode(!0)).addClass(i.slideDuplicateClass));
      for (let e = a.length - 1; e >= 0; e -= 1)
        r.prepend(_(a[e].cloneNode(!0)).addClass(i.slideDuplicateClass));
    },
    loopFix: function () {
      const e = this;
      e.emit("beforeLoopFix");
      const {
        activeIndex: t,
        slides: i,
        loopedSlides: n,
        allowSlidePrev: r,
        allowSlideNext: s,
        snapGrid: a,
        rtlTranslate: o,
      } = e;
      let l;
      (e.allowSlidePrev = !0), (e.allowSlideNext = !0);
      const d = -a[t] - e.getTranslate();
      if (t < n) {
        (l = i.length - 3 * n + t), (l += n);
        e.slideTo(l, 0, !1, !0) &&
          0 !== d &&
          e.setTranslate((o ? -e.translate : e.translate) - d);
      } else if (t >= i.length - n) {
        (l = -i.length + t + n), (l += n);
        e.slideTo(l, 0, !1, !0) &&
          0 !== d &&
          e.setTranslate((o ? -e.translate : e.translate) - d);
      }
      (e.allowSlidePrev = r), (e.allowSlideNext = s), e.emit("loopFix");
    },
    loopDestroy: function () {
      const { $wrapperEl: e, params: t, slides: i } = this;
      e
        .children(
          `.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`
        )
        .remove(),
        i.removeAttr("data-swiper-slide-index");
    },
  };
  function F(e) {
    const t = this,
      i = l(),
      n = c(),
      r = t.touchEventsData,
      { params: s, touches: a, enabled: o } = t;
    if (!o) return;
    if (t.animating && s.preventInteractionOnTransition) return;
    !t.animating && s.cssMode && s.loop && t.loopFix();
    let d = e;
    d.originalEvent && (d = d.originalEvent);
    let u = _(d.target);
    if ("wrapper" === s.touchEventsTarget && !u.closest(t.wrapperEl).length)
      return;
    if (
      ((r.isTouchEvent = "touchstart" === d.type),
      !r.isTouchEvent && "which" in d && 3 === d.which)
    )
      return;
    if (!r.isTouchEvent && "button" in d && d.button > 0) return;
    if (r.isTouched && r.isMoved) return;
    const p = !!s.noSwipingClass && "" !== s.noSwipingClass,
      h = e.composedPath ? e.composedPath() : e.path;
    p && d.target && d.target.shadowRoot && h && (u = _(h[0]));
    const f = s.noSwipingSelector
        ? s.noSwipingSelector
        : `.${s.noSwipingClass}`,
      m = !(!d.target || !d.target.shadowRoot);
    if (
      s.noSwiping &&
      (m
        ? (function (e, t = this) {
            return (function t(i) {
              if (!i || i === l() || i === c()) return null;
              i.assignedSlot && (i = i.assignedSlot);
              const n = i.closest(e);
              return n || i.getRootNode ? n || t(i.getRootNode().host) : null;
            })(t);
          })(f, u[0])
        : u.closest(f)[0])
    )
      return void (t.allowClick = !0);
    if (s.swipeHandler && !u.closest(s.swipeHandler)[0]) return;
    (a.currentX = "touchstart" === d.type ? d.targetTouches[0].pageX : d.pageX),
      (a.currentY =
        "touchstart" === d.type ? d.targetTouches[0].pageY : d.pageY);
    const g = a.currentX,
      v = a.currentY,
      b = s.edgeSwipeDetection || s.iOSEdgeSwipeDetection,
      w = s.edgeSwipeThreshold || s.iOSEdgeSwipeThreshold;
    if (b && (g <= w || g >= n.innerWidth - w)) {
      if ("prevent" !== b) return;
      e.preventDefault();
    }
    if (
      (Object.assign(r, {
        isTouched: !0,
        isMoved: !1,
        allowTouchCallbacks: !0,
        isScrolling: void 0,
        startMoving: void 0,
      }),
      (a.startX = g),
      (a.startY = v),
      (r.touchStartTime = y()),
      (t.allowClick = !0),
      t.updateSize(),
      (t.swipeDirection = void 0),
      s.threshold > 0 && (r.allowThresholdMove = !1),
      "touchstart" !== d.type)
    ) {
      let e = !0;
      u.is(r.focusableElements) &&
        ((e = !1), "SELECT" === u[0].nodeName && (r.isTouched = !1)),
        i.activeElement &&
          _(i.activeElement).is(r.focusableElements) &&
          i.activeElement !== u[0] &&
          i.activeElement.blur();
      const n = e && t.allowTouchMove && s.touchStartPreventDefault;
      (!s.touchStartForcePreventDefault && !n) ||
        u[0].isContentEditable ||
        d.preventDefault();
    }
    t.params.freeMode &&
      t.params.freeMode.enabled &&
      t.freeMode &&
      t.animating &&
      !s.cssMode &&
      t.freeMode.onTouchStart(),
      t.emit("touchStart", d);
  }
  function R(e) {
    const t = l(),
      i = this,
      n = i.touchEventsData,
      { params: r, touches: s, rtlTranslate: a, enabled: o } = i;
    if (!o) return;
    let d = e;
    if ((d.originalEvent && (d = d.originalEvent), !n.isTouched))
      return void (
        n.startMoving &&
        n.isScrolling &&
        i.emit("touchMoveOpposite", d)
      );
    if (n.isTouchEvent && "touchmove" !== d.type) return;
    const c =
        "touchmove" === d.type &&
        d.targetTouches &&
        (d.targetTouches[0] || d.changedTouches[0]),
      u = "touchmove" === d.type ? c.pageX : d.pageX,
      p = "touchmove" === d.type ? c.pageY : d.pageY;
    if (d.preventedByNestedSwiper) return (s.startX = u), void (s.startY = p);
    if (!i.allowTouchMove)
      return (
        _(d.target).is(n.focusableElements) || (i.allowClick = !1),
        void (
          n.isTouched &&
          (Object.assign(s, { startX: u, startY: p, currentX: u, currentY: p }),
          (n.touchStartTime = y()))
        )
      );
    if (n.isTouchEvent && r.touchReleaseOnEdges && !r.loop)
      if (i.isVertical()) {
        if (
          (p < s.startY && i.translate <= i.maxTranslate()) ||
          (p > s.startY && i.translate >= i.minTranslate())
        )
          return (n.isTouched = !1), void (n.isMoved = !1);
      } else if (
        (u < s.startX && i.translate <= i.maxTranslate()) ||
        (u > s.startX && i.translate >= i.minTranslate())
      )
        return;
    if (
      n.isTouchEvent &&
      t.activeElement &&
      d.target === t.activeElement &&
      _(d.target).is(n.focusableElements)
    )
      return (n.isMoved = !0), void (i.allowClick = !1);
    if (
      (n.allowTouchCallbacks && i.emit("touchMove", d),
      d.targetTouches && d.targetTouches.length > 1)
    )
      return;
    (s.currentX = u), (s.currentY = p);
    const h = s.currentX - s.startX,
      f = s.currentY - s.startY;
    if (i.params.threshold && Math.sqrt(h ** 2 + f ** 2) < i.params.threshold)
      return;
    if (void 0 === n.isScrolling) {
      let e;
      (i.isHorizontal() && s.currentY === s.startY) ||
      (i.isVertical() && s.currentX === s.startX)
        ? (n.isScrolling = !1)
        : h * h + f * f >= 25 &&
          ((e = (180 * Math.atan2(Math.abs(f), Math.abs(h))) / Math.PI),
          (n.isScrolling = i.isHorizontal()
            ? e > r.touchAngle
            : 90 - e > r.touchAngle));
    }
    if (
      (n.isScrolling && i.emit("touchMoveOpposite", d),
      void 0 === n.startMoving &&
        ((s.currentX === s.startX && s.currentY === s.startY) ||
          (n.startMoving = !0)),
      n.isScrolling)
    )
      return void (n.isTouched = !1);
    if (!n.startMoving) return;
    (i.allowClick = !1),
      !r.cssMode && d.cancelable && d.preventDefault(),
      r.touchMoveStopPropagation && !r.nested && d.stopPropagation(),
      n.isMoved ||
        (r.loop && !r.cssMode && i.loopFix(),
        (n.startTranslate = i.getTranslate()),
        i.setTransition(0),
        i.animating &&
          i.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
        (n.allowMomentumBounce = !1),
        !r.grabCursor ||
          (!0 !== i.allowSlideNext && !0 !== i.allowSlidePrev) ||
          i.setGrabCursor(!0),
        i.emit("sliderFirstMove", d)),
      i.emit("sliderMove", d),
      (n.isMoved = !0);
    let m = i.isHorizontal() ? h : f;
    (s.diff = m),
      (m *= r.touchRatio),
      a && (m = -m),
      (i.swipeDirection = m > 0 ? "prev" : "next"),
      (n.currentTranslate = m + n.startTranslate);
    let g = !0,
      v = r.resistanceRatio;
    if (
      (r.touchReleaseOnEdges && (v = 0),
      m > 0 && n.currentTranslate > i.minTranslate()
        ? ((g = !1),
          r.resistance &&
            (n.currentTranslate =
              i.minTranslate() -
              1 +
              (-i.minTranslate() + n.startTranslate + m) ** v))
        : m < 0 &&
          n.currentTranslate < i.maxTranslate() &&
          ((g = !1),
          r.resistance &&
            (n.currentTranslate =
              i.maxTranslate() +
              1 -
              (i.maxTranslate() - n.startTranslate - m) ** v)),
      g && (d.preventedByNestedSwiper = !0),
      !i.allowSlideNext &&
        "next" === i.swipeDirection &&
        n.currentTranslate < n.startTranslate &&
        (n.currentTranslate = n.startTranslate),
      !i.allowSlidePrev &&
        "prev" === i.swipeDirection &&
        n.currentTranslate > n.startTranslate &&
        (n.currentTranslate = n.startTranslate),
      i.allowSlidePrev ||
        i.allowSlideNext ||
        (n.currentTranslate = n.startTranslate),
      r.threshold > 0)
    ) {
      if (!(Math.abs(m) > r.threshold || n.allowThresholdMove))
        return void (n.currentTranslate = n.startTranslate);
      if (!n.allowThresholdMove)
        return (
          (n.allowThresholdMove = !0),
          (s.startX = s.currentX),
          (s.startY = s.currentY),
          (n.currentTranslate = n.startTranslate),
          void (s.diff = i.isHorizontal()
            ? s.currentX - s.startX
            : s.currentY - s.startY)
        );
    }
    r.followFinger &&
      !r.cssMode &&
      (((r.freeMode && r.freeMode.enabled && i.freeMode) ||
        r.watchSlidesProgress) &&
        (i.updateActiveIndex(), i.updateSlidesClasses()),
      i.params.freeMode &&
        r.freeMode.enabled &&
        i.freeMode &&
        i.freeMode.onTouchMove(),
      i.updateProgress(n.currentTranslate),
      i.setTranslate(n.currentTranslate));
  }
  function N(e) {
    const t = this,
      i = t.touchEventsData,
      { params: n, touches: r, rtlTranslate: s, slidesGrid: a, enabled: o } = t;
    if (!o) return;
    let l = e;
    if (
      (l.originalEvent && (l = l.originalEvent),
      i.allowTouchCallbacks && t.emit("touchEnd", l),
      (i.allowTouchCallbacks = !1),
      !i.isTouched)
    )
      return (
        i.isMoved && n.grabCursor && t.setGrabCursor(!1),
        (i.isMoved = !1),
        void (i.startMoving = !1)
      );
    n.grabCursor &&
      i.isMoved &&
      i.isTouched &&
      (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
      t.setGrabCursor(!1);
    const d = y(),
      c = d - i.touchStartTime;
    if (t.allowClick) {
      const e = l.path || (l.composedPath && l.composedPath());
      t.updateClickedSlide((e && e[0]) || l.target),
        t.emit("tap click", l),
        c < 300 &&
          d - i.lastClickTime < 300 &&
          t.emit("doubleTap doubleClick", l);
    }
    if (
      ((i.lastClickTime = y()),
      b(() => {
        t.destroyed || (t.allowClick = !0);
      }),
      !i.isTouched ||
        !i.isMoved ||
        !t.swipeDirection ||
        0 === r.diff ||
        i.currentTranslate === i.startTranslate)
    )
      return (i.isTouched = !1), (i.isMoved = !1), void (i.startMoving = !1);
    let u;
    if (
      ((i.isTouched = !1),
      (i.isMoved = !1),
      (i.startMoving = !1),
      (u = n.followFinger
        ? s
          ? t.translate
          : -t.translate
        : -i.currentTranslate),
      n.cssMode)
    )
      return;
    if (t.params.freeMode && n.freeMode.enabled)
      return void t.freeMode.onTouchEnd({ currentPos: u });
    let p = 0,
      h = t.slidesSizesGrid[0];
    for (
      let e = 0;
      e < a.length;
      e += e < n.slidesPerGroupSkip ? 1 : n.slidesPerGroup
    ) {
      const t = e < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
      void 0 !== a[e + t]
        ? u >= a[e] && u < a[e + t] && ((p = e), (h = a[e + t] - a[e]))
        : u >= a[e] && ((p = e), (h = a[a.length - 1] - a[a.length - 2]));
    }
    let f = null,
      m = null;
    n.rewind &&
      (t.isBeginning
        ? (m =
            t.params.virtual && t.params.virtual.enabled && t.virtual
              ? t.virtual.slides.length - 1
              : t.slides.length - 1)
        : t.isEnd && (f = 0));
    const g = (u - a[p]) / h,
      v = p < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
    if (c > n.longSwipesMs) {
      if (!n.longSwipes) return void t.slideTo(t.activeIndex);
      "next" === t.swipeDirection &&
        (g >= n.longSwipesRatio
          ? t.slideTo(n.rewind && t.isEnd ? f : p + v)
          : t.slideTo(p)),
        "prev" === t.swipeDirection &&
          (g > 1 - n.longSwipesRatio
            ? t.slideTo(p + v)
            : null !== m && g < 0 && Math.abs(g) > n.longSwipesRatio
            ? t.slideTo(m)
            : t.slideTo(p));
    } else {
      if (!n.shortSwipes) return void t.slideTo(t.activeIndex);
      t.navigation &&
      (l.target === t.navigation.nextEl || l.target === t.navigation.prevEl)
        ? l.target === t.navigation.nextEl
          ? t.slideTo(p + v)
          : t.slideTo(p)
        : ("next" === t.swipeDirection && t.slideTo(null !== f ? f : p + v),
          "prev" === t.swipeDirection && t.slideTo(null !== m ? m : p));
    }
  }
  function G() {
    const e = this,
      { params: t, el: i } = e;
    if (i && 0 === i.offsetWidth) return;
    t.breakpoints && e.setBreakpoint();
    const { allowSlideNext: n, allowSlidePrev: r, snapGrid: s } = e;
    (e.allowSlideNext = !0),
      (e.allowSlidePrev = !0),
      e.updateSize(),
      e.updateSlides(),
      e.updateSlidesClasses(),
      ("auto" === t.slidesPerView || t.slidesPerView > 1) &&
      e.isEnd &&
      !e.isBeginning &&
      !e.params.centeredSlides
        ? e.slideTo(e.slides.length - 1, 0, !1, !0)
        : e.slideTo(e.activeIndex, 0, !1, !0),
      e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.run(),
      (e.allowSlidePrev = r),
      (e.allowSlideNext = n),
      e.params.watchOverflow && s !== e.snapGrid && e.checkOverflow();
  }
  function j(e) {
    const t = this;
    t.enabled &&
      (t.allowClick ||
        (t.params.preventClicks && e.preventDefault(),
        t.params.preventClicksPropagation &&
          t.animating &&
          (e.stopPropagation(), e.stopImmediatePropagation())));
  }
  function H() {
    const e = this,
      { wrapperEl: t, rtlTranslate: i, enabled: n } = e;
    if (!n) return;
    let r;
    (e.previousTranslate = e.translate),
      e.isHorizontal()
        ? (e.translate = -t.scrollLeft)
        : (e.translate = -t.scrollTop),
      0 === e.translate && (e.translate = 0),
      e.updateActiveIndex(),
      e.updateSlidesClasses();
    const s = e.maxTranslate() - e.minTranslate();
    (r = 0 === s ? 0 : (e.translate - e.minTranslate()) / s),
      r !== e.progress && e.updateProgress(i ? -e.translate : e.translate),
      e.emit("setTranslate", e.translate, !1);
  }
  let q = !1;
  function V() {}
  const X = (e, t) => {
    const i = l(),
      {
        params: n,
        touchEvents: r,
        el: s,
        wrapperEl: a,
        device: o,
        support: d,
      } = e,
      c = !!n.nested,
      u = "on" === t ? "addEventListener" : "removeEventListener",
      p = t;
    if (d.touch) {
      const t = !(
        "touchstart" !== r.start ||
        !d.passiveListener ||
        !n.passiveListeners
      ) && { passive: !0, capture: !1 };
      s[u](r.start, e.onTouchStart, t),
        s[u](
          r.move,
          e.onTouchMove,
          d.passiveListener ? { passive: !1, capture: c } : c
        ),
        s[u](r.end, e.onTouchEnd, t),
        r.cancel && s[u](r.cancel, e.onTouchEnd, t);
    } else
      s[u](r.start, e.onTouchStart, !1),
        i[u](r.move, e.onTouchMove, c),
        i[u](r.end, e.onTouchEnd, !1);
    (n.preventClicks || n.preventClicksPropagation) &&
      s[u]("click", e.onClick, !0),
      n.cssMode && a[u]("scroll", e.onScroll),
      n.updateOnWindowResize
        ? e[p](
            o.ios || o.android
              ? "resize orientationchange observerUpdate"
              : "resize observerUpdate",
            G,
            !0
          )
        : e[p]("observerUpdate", G, !0);
  };
  const Y = {
      attachEvents: function () {
        const e = this,
          t = l(),
          { params: i, support: n } = e;
        (e.onTouchStart = F.bind(e)),
          (e.onTouchMove = R.bind(e)),
          (e.onTouchEnd = N.bind(e)),
          i.cssMode && (e.onScroll = H.bind(e)),
          (e.onClick = j.bind(e)),
          n.touch && !q && (t.addEventListener("touchstart", V), (q = !0)),
          X(e, "on");
      },
      detachEvents: function () {
        X(this, "off");
      },
    },
    W = (e, t) => e.grid && t.grid && t.grid.rows > 1;
  const U = {
    setBreakpoint: function () {
      const e = this,
        {
          activeIndex: t,
          initialized: i,
          loopedSlides: n = 0,
          params: r,
          $el: s,
        } = e,
        a = r.breakpoints;
      if (!a || (a && 0 === Object.keys(a).length)) return;
      const o = e.getBreakpoint(a, e.params.breakpointsBase, e.el);
      if (!o || e.currentBreakpoint === o) return;
      const l = (o in a ? a[o] : void 0) || e.originalParams,
        d = W(e, r),
        c = W(e, l),
        u = r.enabled;
      d && !c
        ? (s.removeClass(
            `${r.containerModifierClass}grid ${r.containerModifierClass}grid-column`
          ),
          e.emitContainerClasses())
        : !d &&
          c &&
          (s.addClass(`${r.containerModifierClass}grid`),
          ((l.grid.fill && "column" === l.grid.fill) ||
            (!l.grid.fill && "column" === r.grid.fill)) &&
            s.addClass(`${r.containerModifierClass}grid-column`),
          e.emitContainerClasses()),
        ["navigation", "pagination", "scrollbar"].forEach((t) => {
          const i = r[t] && r[t].enabled,
            n = l[t] && l[t].enabled;
          i && !n && e[t].disable(), !i && n && e[t].enable();
        });
      const p = l.direction && l.direction !== r.direction,
        h = r.loop && (l.slidesPerView !== r.slidesPerView || p);
      p && i && e.changeDirection(), x(e.params, l);
      const f = e.params.enabled;
      Object.assign(e, {
        allowTouchMove: e.params.allowTouchMove,
        allowSlideNext: e.params.allowSlideNext,
        allowSlidePrev: e.params.allowSlidePrev,
      }),
        u && !f ? e.disable() : !u && f && e.enable(),
        (e.currentBreakpoint = o),
        e.emit("_beforeBreakpoint", l),
        h &&
          i &&
          (e.loopDestroy(),
          e.loopCreate(),
          e.updateSlides(),
          e.slideTo(t - n + e.loopedSlides, 0, !1)),
        e.emit("breakpoint", l);
    },
    getBreakpoint: function (e, t = "window", i) {
      if (!e || ("container" === t && !i)) return;
      let n = !1;
      const r = c(),
        s = "window" === t ? r.innerHeight : i.clientHeight,
        a = Object.keys(e).map((e) => {
          if ("string" == typeof e && 0 === e.indexOf("@")) {
            const t = parseFloat(e.substr(1));
            return { value: s * t, point: e };
          }
          return { value: e, point: e };
        });
      a.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
      for (let e = 0; e < a.length; e += 1) {
        const { point: s, value: o } = a[e];
        "window" === t
          ? r.matchMedia(`(min-width: ${o}px)`).matches && (n = s)
          : o <= i.clientWidth && (n = s);
      }
      return n || "max";
    },
  };
  const K = {
    addClasses: function () {
      const e = this,
        { classNames: t, params: i, rtl: n, $el: r, device: s, support: a } = e,
        o = (function (e, t) {
          const i = [];
          return (
            e.forEach((e) => {
              "object" == typeof e
                ? Object.keys(e).forEach((n) => {
                    e[n] && i.push(t + n);
                  })
                : "string" == typeof e && i.push(t + e);
            }),
            i
          );
        })(
          [
            "initialized",
            i.direction,
            { "pointer-events": !a.touch },
            { "free-mode": e.params.freeMode && i.freeMode.enabled },
            { autoheight: i.autoHeight },
            { rtl: n },
            { grid: i.grid && i.grid.rows > 1 },
            {
              "grid-column":
                i.grid && i.grid.rows > 1 && "column" === i.grid.fill,
            },
            { android: s.android },
            { ios: s.ios },
            { "css-mode": i.cssMode },
            { centered: i.cssMode && i.centeredSlides },
            { "watch-progress": i.watchSlidesProgress },
          ],
          i.containerModifierClass
        );
      t.push(...o), r.addClass([...t].join(" ")), e.emitContainerClasses();
    },
    removeClasses: function () {
      const { $el: e, classNames: t } = this;
      e.removeClass(t.join(" ")), this.emitContainerClasses();
    },
  };
  const Q = {
    loadImage: function (e, t, i, n, r, s) {
      const a = c();
      let o;
      function l() {
        s && s();
      }
      _(e).parent("picture")[0] || (e.complete && r)
        ? l()
        : t
        ? ((o = new a.Image()),
          (o.onload = l),
          (o.onerror = l),
          n && (o.sizes = n),
          i && (o.srcset = i),
          t && (o.src = t))
        : l();
    },
    preloadImages: function () {
      const e = this;
      function t() {
        null != e &&
          e &&
          !e.destroyed &&
          (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
          e.imagesLoaded === e.imagesToLoad.length &&
            (e.params.updateOnImagesReady && e.update(),
            e.emit("imagesReady")));
      }
      e.imagesToLoad = e.$el.find("img");
      for (let i = 0; i < e.imagesToLoad.length; i += 1) {
        const n = e.imagesToLoad[i];
        e.loadImage(
          n,
          n.currentSrc || n.getAttribute("src"),
          n.srcset || n.getAttribute("srcset"),
          n.sizes || n.getAttribute("sizes"),
          !0,
          t
        );
      }
    },
  };
  const Z = {
    init: !0,
    direction: "horizontal",
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 0,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    preloadImages: !0,
    updateOnImagesReady: !0,
    loop: !1,
    loopAdditionalSlides: 0,
    loopedSlides: null,
    loopedSlidesLimit: !0,
    loopFillGroupWithBlank: !1,
    loopPreventsSlide: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-invisible-blank",
    slideActiveClass: "swiper-slide-active",
    slideDuplicateActiveClass: "swiper-slide-duplicate-active",
    slideVisibleClass: "swiper-slide-visible",
    slideDuplicateClass: "swiper-slide-duplicate",
    slideNextClass: "swiper-slide-next",
    slideDuplicateNextClass: "swiper-slide-duplicate-next",
    slidePrevClass: "swiper-slide-prev",
    slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
    wrapperClass: "swiper-wrapper",
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
  function J(e, t) {
    return function (i = {}) {
      const n = Object.keys(i)[0],
        r = i[n];
      "object" == typeof r && null !== r
        ? (["navigation", "pagination", "scrollbar"].indexOf(n) >= 0 &&
            !0 === e[n] &&
            (e[n] = { auto: !0 }),
          n in e && "enabled" in r
            ? (!0 === e[n] && (e[n] = { enabled: !0 }),
              "object" != typeof e[n] ||
                "enabled" in e[n] ||
                (e[n].enabled = !0),
              e[n] || (e[n] = { enabled: !1 }),
              x(t, i))
            : x(t, i))
        : x(t, i);
    };
  }
  const ee = {
      eventsEmitter: $,
      update: L,
      translate: D,
      transition: {
        setTransition: function (e, t) {
          const i = this;
          i.params.cssMode || i.$wrapperEl.transition(e),
            i.emit("setTransition", e, t);
        },
        transitionStart: function (e = !0, t) {
          const i = this,
            { params: n } = i;
          n.cssMode ||
            (n.autoHeight && i.updateAutoHeight(),
            z({ swiper: i, runCallbacks: e, direction: t, step: "Start" }));
        },
        transitionEnd: function (e = !0, t) {
          const i = this,
            { params: n } = i;
          (i.animating = !1),
            n.cssMode ||
              (i.setTransition(0),
              z({ swiper: i, runCallbacks: e, direction: t, step: "End" }));
        },
      },
      slide: I,
      loop: B,
      grabCursor: {
        setGrabCursor: function (e) {
          const t = this;
          if (
            t.support.touch ||
            !t.params.simulateTouch ||
            (t.params.watchOverflow && t.isLocked) ||
            t.params.cssMode
          )
            return;
          const i =
            "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
          (i.style.cursor = "move"), (i.style.cursor = e ? "grabbing" : "grab");
        },
        unsetGrabCursor: function () {
          const e = this;
          e.support.touch ||
            (e.params.watchOverflow && e.isLocked) ||
            e.params.cssMode ||
            (e[
              "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
            ].style.cursor = "");
        },
      },
      events: Y,
      breakpoints: U,
      checkOverflow: {
        checkOverflow: function () {
          const e = this,
            { isLocked: t, params: i } = e,
            { slidesOffsetBefore: n } = i;
          if (n) {
            const t = e.slides.length - 1,
              i = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * n;
            e.isLocked = e.size > i;
          } else e.isLocked = 1 === e.snapGrid.length;
          !0 === i.allowSlideNext && (e.allowSlideNext = !e.isLocked),
            !0 === i.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
            t && t !== e.isLocked && (e.isEnd = !1),
            t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
        },
      },
      classes: K,
      images: Q,
    },
    te = {};
  class ie {
    constructor(...e) {
      let t, i;
      if (
        (1 === e.length &&
        e[0].constructor &&
        "Object" === Object.prototype.toString.call(e[0]).slice(8, -1)
          ? (i = e[0])
          : ([t, i] = e),
        i || (i = {}),
        (i = x({}, i)),
        t && !i.el && (i.el = t),
        i.el && _(i.el).length > 1)
      ) {
        const e = [];
        return (
          _(i.el).each((t) => {
            const n = x({}, i, { el: t });
            e.push(new ie(n));
          }),
          e
        );
      }
      const n = this;
      (n.__swiper__ = !0),
        (n.support = O()),
        (n.device = A({ userAgent: i.userAgent })),
        (n.browser = P()),
        (n.eventsListeners = {}),
        (n.eventsAnyListeners = []),
        (n.modules = [...n.__modules__]),
        i.modules && Array.isArray(i.modules) && n.modules.push(...i.modules);
      const r = {};
      n.modules.forEach((e) => {
        e({
          swiper: n,
          extendParams: J(i, r),
          on: n.on.bind(n),
          once: n.once.bind(n),
          off: n.off.bind(n),
          emit: n.emit.bind(n),
        });
      });
      const s = x({}, Z, r);
      return (
        (n.params = x({}, s, te, i)),
        (n.originalParams = x({}, n.params)),
        (n.passedParams = x({}, i)),
        n.params &&
          n.params.on &&
          Object.keys(n.params.on).forEach((e) => {
            n.on(e, n.params.on[e]);
          }),
        n.params && n.params.onAny && n.onAny(n.params.onAny),
        (n.$ = _),
        Object.assign(n, {
          enabled: n.params.enabled,
          el: t,
          classNames: [],
          slides: _(),
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],
          isHorizontal: () => "horizontal" === n.params.direction,
          isVertical: () => "vertical" === n.params.direction,
          activeIndex: 0,
          realIndex: 0,
          isBeginning: !0,
          isEnd: !1,
          translate: 0,
          previousTranslate: 0,
          progress: 0,
          velocity: 0,
          animating: !1,
          allowSlideNext: n.params.allowSlideNext,
          allowSlidePrev: n.params.allowSlidePrev,
          touchEvents: (function () {
            const e = ["touchstart", "touchmove", "touchend", "touchcancel"],
              t = ["pointerdown", "pointermove", "pointerup"];
            return (
              (n.touchEventsTouch = {
                start: e[0],
                move: e[1],
                end: e[2],
                cancel: e[3],
              }),
              (n.touchEventsDesktop = { start: t[0], move: t[1], end: t[2] }),
              n.support.touch || !n.params.simulateTouch
                ? n.touchEventsTouch
                : n.touchEventsDesktop
            );
          })(),
          touchEventsData: {
            isTouched: void 0,
            isMoved: void 0,
            allowTouchCallbacks: void 0,
            touchStartTime: void 0,
            isScrolling: void 0,
            currentTranslate: void 0,
            startTranslate: void 0,
            allowThresholdMove: void 0,
            focusableElements: n.params.focusableElements,
            lastClickTime: y(),
            clickTimeout: void 0,
            velocities: [],
            allowMomentumBounce: void 0,
            isTouchEvent: void 0,
            startMoving: void 0,
          },
          allowClick: !0,
          allowTouchMove: n.params.allowTouchMove,
          touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
          imagesToLoad: [],
          imagesLoaded: 0,
        }),
        n.emit("_swiper"),
        n.params.init && n.init(),
        n
      );
    }
    enable() {
      const e = this;
      e.enabled ||
        ((e.enabled = !0),
        e.params.grabCursor && e.setGrabCursor(),
        e.emit("enable"));
    }
    disable() {
      const e = this;
      e.enabled &&
        ((e.enabled = !1),
        e.params.grabCursor && e.unsetGrabCursor(),
        e.emit("disable"));
    }
    setProgress(e, t) {
      const i = this;
      e = Math.min(Math.max(e, 0), 1);
      const n = i.minTranslate(),
        r = (i.maxTranslate() - n) * e + n;
      i.translateTo(r, void 0 === t ? 0 : t),
        i.updateActiveIndex(),
        i.updateSlidesClasses();
    }
    emitContainerClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = e.el.className
        .split(" ")
        .filter(
          (t) =>
            0 === t.indexOf("swiper") ||
            0 === t.indexOf(e.params.containerModifierClass)
        );
      e.emit("_containerClasses", t.join(" "));
    }
    getSlideClasses(e) {
      const t = this;
      return t.destroyed
        ? ""
        : e.className
            .split(" ")
            .filter(
              (e) =>
                0 === e.indexOf("swiper-slide") ||
                0 === e.indexOf(t.params.slideClass)
            )
            .join(" ");
    }
    emitSlidesClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = [];
      e.slides.each((i) => {
        const n = e.getSlideClasses(i);
        t.push({ slideEl: i, classNames: n }), e.emit("_slideClass", i, n);
      }),
        e.emit("_slideClasses", t);
    }
    slidesPerViewDynamic(e = "current", t = !1) {
      const {
        params: i,
        slides: n,
        slidesGrid: r,
        slidesSizesGrid: s,
        size: a,
        activeIndex: o,
      } = this;
      let l = 1;
      if (i.centeredSlides) {
        let e,
          t = n[o].swiperSlideSize;
        for (let i = o + 1; i < n.length; i += 1)
          n[i] &&
            !e &&
            ((t += n[i].swiperSlideSize), (l += 1), t > a && (e = !0));
        for (let i = o - 1; i >= 0; i -= 1)
          n[i] &&
            !e &&
            ((t += n[i].swiperSlideSize), (l += 1), t > a && (e = !0));
      } else if ("current" === e)
        for (let e = o + 1; e < n.length; e += 1) {
          (t ? r[e] + s[e] - r[o] < a : r[e] - r[o] < a) && (l += 1);
        }
      else
        for (let e = o - 1; e >= 0; e -= 1) {
          r[o] - r[e] < a && (l += 1);
        }
      return l;
    }
    update() {
      const e = this;
      if (!e || e.destroyed) return;
      const { snapGrid: t, params: i } = e;
      function n() {
        const t = e.rtlTranslate ? -1 * e.translate : e.translate,
          i = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
        e.setTranslate(i), e.updateActiveIndex(), e.updateSlidesClasses();
      }
      let r;
      i.breakpoints && e.setBreakpoint(),
        e.updateSize(),
        e.updateSlides(),
        e.updateProgress(),
        e.updateSlidesClasses(),
        e.params.freeMode && e.params.freeMode.enabled
          ? (n(), e.params.autoHeight && e.updateAutoHeight())
          : ((r =
              ("auto" === e.params.slidesPerView ||
                e.params.slidesPerView > 1) &&
              e.isEnd &&
              !e.params.centeredSlides
                ? e.slideTo(e.slides.length - 1, 0, !1, !0)
                : e.slideTo(e.activeIndex, 0, !1, !0)),
            r || n()),
        i.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
        e.emit("update");
    }
    changeDirection(e, t = !0) {
      const i = this,
        n = i.params.direction;
      return (
        e || (e = "horizontal" === n ? "vertical" : "horizontal"),
        e === n ||
          ("horizontal" !== e && "vertical" !== e) ||
          (i.$el
            .removeClass(`${i.params.containerModifierClass}${n}`)
            .addClass(`${i.params.containerModifierClass}${e}`),
          i.emitContainerClasses(),
          (i.params.direction = e),
          i.slides.each((t) => {
            "vertical" === e ? (t.style.width = "") : (t.style.height = "");
          }),
          i.emit("changeDirection"),
          t && i.update()),
        i
      );
    }
    changeLanguageDirection(e) {
      const t = this;
      (t.rtl && "rtl" === e) ||
        (!t.rtl && "ltr" === e) ||
        ((t.rtl = "rtl" === e),
        (t.rtlTranslate = "horizontal" === t.params.direction && t.rtl),
        t.rtl
          ? (t.$el.addClass(`${t.params.containerModifierClass}rtl`),
            (t.el.dir = "rtl"))
          : (t.$el.removeClass(`${t.params.containerModifierClass}rtl`),
            (t.el.dir = "ltr")),
        t.update());
    }
    mount(e) {
      const t = this;
      if (t.mounted) return !0;
      const i = _(e || t.params.el);
      if (!(e = i[0])) return !1;
      e.swiper = t;
      const n = () =>
        `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
      let r = (() => {
        if (e && e.shadowRoot && e.shadowRoot.querySelector) {
          const t = _(e.shadowRoot.querySelector(n()));
          return (t.children = (e) => i.children(e)), t;
        }
        return i.children ? i.children(n()) : _(i).children(n());
      })();
      if (0 === r.length && t.params.createElements) {
        const e = l().createElement("div");
        (r = _(e)),
          (e.className = t.params.wrapperClass),
          i.append(e),
          i.children(`.${t.params.slideClass}`).each((e) => {
            r.append(e);
          });
      }
      return (
        Object.assign(t, {
          $el: i,
          el: e,
          $wrapperEl: r,
          wrapperEl: r[0],
          mounted: !0,
          rtl: "rtl" === e.dir.toLowerCase() || "rtl" === i.css("direction"),
          rtlTranslate:
            "horizontal" === t.params.direction &&
            ("rtl" === e.dir.toLowerCase() || "rtl" === i.css("direction")),
          wrongRTL: "-webkit-box" === r.css("display"),
        }),
        !0
      );
    }
    init(e) {
      const t = this;
      if (t.initialized) return t;
      return (
        !1 === t.mount(e) ||
          (t.emit("beforeInit"),
          t.params.breakpoints && t.setBreakpoint(),
          t.addClasses(),
          t.params.loop && t.loopCreate(),
          t.updateSize(),
          t.updateSlides(),
          t.params.watchOverflow && t.checkOverflow(),
          t.params.grabCursor && t.enabled && t.setGrabCursor(),
          t.params.preloadImages && t.preloadImages(),
          t.params.loop
            ? t.slideTo(
                t.params.initialSlide + t.loopedSlides,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0
              )
            : t.slideTo(
                t.params.initialSlide,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0
              ),
          t.attachEvents(),
          (t.initialized = !0),
          t.emit("init"),
          t.emit("afterInit")),
        t
      );
    }
    destroy(e = !0, t = !0) {
      const i = this,
        { params: n, $el: r, $wrapperEl: s, slides: a } = i;
      return (
        void 0 === i.params ||
          i.destroyed ||
          (i.emit("beforeDestroy"),
          (i.initialized = !1),
          i.detachEvents(),
          n.loop && i.loopDestroy(),
          t &&
            (i.removeClasses(),
            r.removeAttr("style"),
            s.removeAttr("style"),
            a &&
              a.length &&
              a
                .removeClass(
                  [
                    n.slideVisibleClass,
                    n.slideActiveClass,
                    n.slideNextClass,
                    n.slidePrevClass,
                  ].join(" ")
                )
                .removeAttr("style")
                .removeAttr("data-swiper-slide-index")),
          i.emit("destroy"),
          Object.keys(i.eventsListeners).forEach((e) => {
            i.off(e);
          }),
          !1 !== e &&
            ((i.$el[0].swiper = null),
            (function (e) {
              const t = e;
              Object.keys(t).forEach((e) => {
                try {
                  t[e] = null;
                } catch (e) {}
                try {
                  delete t[e];
                } catch (e) {}
              });
            })(i)),
          (i.destroyed = !0)),
        null
      );
    }
    static extendDefaults(e) {
      x(te, e);
    }
    static get extendedDefaults() {
      return te;
    }
    static get defaults() {
      return Z;
    }
    static installModule(e) {
      ie.prototype.__modules__ || (ie.prototype.__modules__ = []);
      const t = ie.prototype.__modules__;
      "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
    }
    static use(e) {
      return Array.isArray(e)
        ? (e.forEach((e) => ie.installModule(e)), ie)
        : (ie.installModule(e), ie);
    }
  }
  Object.keys(ee).forEach((e) => {
    Object.keys(ee[e]).forEach((t) => {
      ie.prototype[t] = ee[e][t];
    });
  }),
    ie.use([
      function ({ swiper: e, on: t, emit: i }) {
        const n = c();
        let r = null,
          s = null;
        const a = () => {
            e &&
              !e.destroyed &&
              e.initialized &&
              (i("beforeResize"), i("resize"));
          },
          o = () => {
            e && !e.destroyed && e.initialized && i("orientationchange");
          };
        t("init", () => {
          e.params.resizeObserver && void 0 !== n.ResizeObserver
            ? e &&
              !e.destroyed &&
              e.initialized &&
              ((r = new ResizeObserver((t) => {
                s = n.requestAnimationFrame(() => {
                  const { width: i, height: n } = e;
                  let r = i,
                    s = n;
                  t.forEach(
                    ({ contentBoxSize: t, contentRect: i, target: n }) => {
                      (n && n !== e.el) ||
                        ((r = i ? i.width : (t[0] || t).inlineSize),
                        (s = i ? i.height : (t[0] || t).blockSize));
                    }
                  ),
                    (r === i && s === n) || a();
                });
              })),
              r.observe(e.el))
            : (n.addEventListener("resize", a),
              n.addEventListener("orientationchange", o));
        }),
          t("destroy", () => {
            s && n.cancelAnimationFrame(s),
              r && r.unobserve && e.el && (r.unobserve(e.el), (r = null)),
              n.removeEventListener("resize", a),
              n.removeEventListener("orientationchange", o);
          });
      },
      function ({ swiper: e, extendParams: t, on: i, emit: n }) {
        const r = [],
          s = c(),
          a = (e, t = {}) => {
            const i = new (s.MutationObserver || s.WebkitMutationObserver)(
              (e) => {
                if (1 === e.length) return void n("observerUpdate", e[0]);
                const t = function () {
                  n("observerUpdate", e[0]);
                };
                s.requestAnimationFrame
                  ? s.requestAnimationFrame(t)
                  : s.setTimeout(t, 0);
              }
            );
            i.observe(e, {
              attributes: void 0 === t.attributes || t.attributes,
              childList: void 0 === t.childList || t.childList,
              characterData: void 0 === t.characterData || t.characterData,
            }),
              r.push(i);
          };
        t({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
          i("init", () => {
            if (e.params.observer) {
              if (e.params.observeParents) {
                const t = e.$el.parents();
                for (let e = 0; e < t.length; e += 1) a(t[e]);
              }
              a(e.$el[0], { childList: e.params.observeSlideChildren }),
                a(e.$wrapperEl[0], { attributes: !1 });
            }
          }),
          i("destroy", () => {
            r.forEach((e) => {
              e.disconnect();
            }),
              r.splice(0, r.length);
          });
      },
    ]);
  const ne = ie;
  function re({ swiper: e, extendParams: t, on: i, emit: n }) {
    const r = c();
    let s;
    t({
      mousewheel: {
        enabled: !1,
        releaseOnEdges: !1,
        invert: !1,
        forceToAxis: !1,
        sensitivity: 1,
        eventsTarget: "container",
        thresholdDelta: null,
        thresholdTime: null,
      },
    }),
      (e.mousewheel = { enabled: !1 });
    let a,
      o = y();
    const l = [];
    function d() {
      e.enabled && (e.mouseEntered = !0);
    }
    function u() {
      e.enabled && (e.mouseEntered = !1);
    }
    function p(t) {
      return (
        !(
          e.params.mousewheel.thresholdDelta &&
          t.delta < e.params.mousewheel.thresholdDelta
        ) &&
        !(
          e.params.mousewheel.thresholdTime &&
          y() - o < e.params.mousewheel.thresholdTime
        ) &&
        ((t.delta >= 6 && y() - o < 60) ||
          (t.direction < 0
            ? (e.isEnd && !e.params.loop) ||
              e.animating ||
              (e.slideNext(), n("scroll", t.raw))
            : (e.isBeginning && !e.params.loop) ||
              e.animating ||
              (e.slidePrev(), n("scroll", t.raw)),
          (o = new r.Date().getTime()),
          !1))
      );
    }
    function h(t) {
      let i = t,
        r = !0;
      if (!e.enabled) return;
      const o = e.params.mousewheel;
      e.params.cssMode && i.preventDefault();
      let d = e.$el;
      if (
        ("container" !== e.params.mousewheel.eventsTarget &&
          (d = _(e.params.mousewheel.eventsTarget)),
        !e.mouseEntered && !d[0].contains(i.target) && !o.releaseOnEdges)
      )
        return !0;
      i.originalEvent && (i = i.originalEvent);
      let c = 0;
      const u = e.rtlTranslate ? -1 : 1,
        h = (function (e) {
          let t = 0,
            i = 0,
            n = 0,
            r = 0;
          return (
            "detail" in e && (i = e.detail),
            "wheelDelta" in e && (i = -e.wheelDelta / 120),
            "wheelDeltaY" in e && (i = -e.wheelDeltaY / 120),
            "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120),
            "axis" in e && e.axis === e.HORIZONTAL_AXIS && ((t = i), (i = 0)),
            (n = 10 * t),
            (r = 10 * i),
            "deltaY" in e && (r = e.deltaY),
            "deltaX" in e && (n = e.deltaX),
            e.shiftKey && !n && ((n = r), (r = 0)),
            (n || r) &&
              e.deltaMode &&
              (1 === e.deltaMode
                ? ((n *= 40), (r *= 40))
                : ((n *= 800), (r *= 800))),
            n && !t && (t = n < 1 ? -1 : 1),
            r && !i && (i = r < 1 ? -1 : 1),
            { spinX: t, spinY: i, pixelX: n, pixelY: r }
          );
        })(i);
      if (o.forceToAxis)
        if (e.isHorizontal()) {
          if (!(Math.abs(h.pixelX) > Math.abs(h.pixelY))) return !0;
          c = -h.pixelX * u;
        } else {
          if (!(Math.abs(h.pixelY) > Math.abs(h.pixelX))) return !0;
          c = -h.pixelY;
        }
      else
        c = Math.abs(h.pixelX) > Math.abs(h.pixelY) ? -h.pixelX * u : -h.pixelY;
      if (0 === c) return !0;
      o.invert && (c = -c);
      let f = e.getTranslate() + c * o.sensitivity;
      if (
        (f >= e.minTranslate() && (f = e.minTranslate()),
        f <= e.maxTranslate() && (f = e.maxTranslate()),
        (r =
          !!e.params.loop ||
          !(f === e.minTranslate() || f === e.maxTranslate())),
        r && e.params.nested && i.stopPropagation(),
        e.params.freeMode && e.params.freeMode.enabled)
      ) {
        const t = { time: y(), delta: Math.abs(c), direction: Math.sign(c) },
          r =
            a &&
            t.time < a.time + 500 &&
            t.delta <= a.delta &&
            t.direction === a.direction;
        if (!r) {
          (a = void 0), e.params.loop && e.loopFix();
          let d = e.getTranslate() + c * o.sensitivity;
          const u = e.isBeginning,
            p = e.isEnd;
          if (
            (d >= e.minTranslate() && (d = e.minTranslate()),
            d <= e.maxTranslate() && (d = e.maxTranslate()),
            e.setTransition(0),
            e.setTranslate(d),
            e.updateProgress(),
            e.updateActiveIndex(),
            e.updateSlidesClasses(),
            ((!u && e.isBeginning) || (!p && e.isEnd)) &&
              e.updateSlidesClasses(),
            e.params.freeMode.sticky)
          ) {
            clearTimeout(s), (s = void 0), l.length >= 15 && l.shift();
            const i = l.length ? l[l.length - 1] : void 0,
              n = l[0];
            if (
              (l.push(t),
              i && (t.delta > i.delta || t.direction !== i.direction))
            )
              l.splice(0);
            else if (
              l.length >= 15 &&
              t.time - n.time < 500 &&
              n.delta - t.delta >= 1 &&
              t.delta <= 6
            ) {
              const i = c > 0 ? 0.8 : 0.2;
              (a = t),
                l.splice(0),
                (s = b(() => {
                  e.slideToClosest(e.params.speed, !0, void 0, i);
                }, 0));
            }
            s ||
              (s = b(() => {
                (a = t),
                  l.splice(0),
                  e.slideToClosest(e.params.speed, !0, void 0, 0.5);
              }, 500));
          }
          if (
            (r || n("scroll", i),
            e.params.autoplay &&
              e.params.autoplayDisableOnInteraction &&
              e.autoplay.stop(),
            d === e.minTranslate() || d === e.maxTranslate())
          )
            return !0;
        }
      } else {
        const i = {
          time: y(),
          delta: Math.abs(c),
          direction: Math.sign(c),
          raw: t,
        };
        l.length >= 2 && l.shift();
        const n = l.length ? l[l.length - 1] : void 0;
        if (
          (l.push(i),
          n
            ? (i.direction !== n.direction ||
                i.delta > n.delta ||
                i.time > n.time + 150) &&
              p(i)
            : p(i),
          (function (t) {
            const i = e.params.mousewheel;
            if (t.direction < 0) {
              if (e.isEnd && !e.params.loop && i.releaseOnEdges) return !0;
            } else if (e.isBeginning && !e.params.loop && i.releaseOnEdges)
              return !0;
            return !1;
          })(i))
        )
          return !0;
      }
      return i.preventDefault ? i.preventDefault() : (i.returnValue = !1), !1;
    }
    function f(t) {
      let i = e.$el;
      "container" !== e.params.mousewheel.eventsTarget &&
        (i = _(e.params.mousewheel.eventsTarget)),
        i[t]("mouseenter", d),
        i[t]("mouseleave", u),
        i[t]("wheel", h);
    }
    function m() {
      return e.params.cssMode
        ? (e.wrapperEl.removeEventListener("wheel", h), !0)
        : !e.mousewheel.enabled && (f("on"), (e.mousewheel.enabled = !0), !0);
    }
    function g() {
      return e.params.cssMode
        ? (e.wrapperEl.addEventListener(event, h), !0)
        : !!e.mousewheel.enabled && (f("off"), (e.mousewheel.enabled = !1), !0);
    }
    i("init", () => {
      !e.params.mousewheel.enabled && e.params.cssMode && g(),
        e.params.mousewheel.enabled && m();
    }),
      i("destroy", () => {
        e.params.cssMode && m(), e.mousewheel.enabled && g();
      }),
      Object.assign(e.mousewheel, { enable: m, disable: g });
  }
  function se(e, t, i, n) {
    const r = l();
    return (
      e.params.createElements &&
        Object.keys(n).forEach((s) => {
          if (!i[s] && !0 === i.auto) {
            let a = e.$el.children(`.${n[s]}`)[0];
            a ||
              ((a = r.createElement("div")),
              (a.className = n[s]),
              e.$el.append(a)),
              (i[s] = a),
              (t[s] = a);
          }
        }),
      i
    );
  }
  function ae({ swiper: e, extendParams: t, on: i, emit: n }) {
    function r(t) {
      let i;
      return (
        t &&
          ((i = _(t)),
          e.params.uniqueNavElements &&
            "string" == typeof t &&
            i.length > 1 &&
            1 === e.$el.find(t).length &&
            (i = e.$el.find(t))),
        i
      );
    }
    function s(t, i) {
      const n = e.params.navigation;
      t &&
        t.length > 0 &&
        (t[i ? "addClass" : "removeClass"](n.disabledClass),
        t[0] && "BUTTON" === t[0].tagName && (t[0].disabled = i),
        e.params.watchOverflow &&
          e.enabled &&
          t[e.isLocked ? "addClass" : "removeClass"](n.lockClass));
    }
    function a() {
      if (e.params.loop) return;
      const { $nextEl: t, $prevEl: i } = e.navigation;
      s(i, e.isBeginning && !e.params.rewind),
        s(t, e.isEnd && !e.params.rewind);
    }
    function o(t) {
      t.preventDefault(),
        (!e.isBeginning || e.params.loop || e.params.rewind) &&
          (e.slidePrev(), n("navigationPrev"));
    }
    function l(t) {
      t.preventDefault(),
        (!e.isEnd || e.params.loop || e.params.rewind) &&
          (e.slideNext(), n("navigationNext"));
    }
    function d() {
      const t = e.params.navigation;
      if (
        ((e.params.navigation = se(
          e,
          e.originalParams.navigation,
          e.params.navigation,
          { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" }
        )),
        !t.nextEl && !t.prevEl)
      )
        return;
      const i = r(t.nextEl),
        n = r(t.prevEl);
      i && i.length > 0 && i.on("click", l),
        n && n.length > 0 && n.on("click", o),
        Object.assign(e.navigation, {
          $nextEl: i,
          nextEl: i && i[0],
          $prevEl: n,
          prevEl: n && n[0],
        }),
        e.enabled ||
          (i && i.addClass(t.lockClass), n && n.addClass(t.lockClass));
    }
    function c() {
      const { $nextEl: t, $prevEl: i } = e.navigation;
      t &&
        t.length &&
        (t.off("click", l), t.removeClass(e.params.navigation.disabledClass)),
        i &&
          i.length &&
          (i.off("click", o), i.removeClass(e.params.navigation.disabledClass));
    }
    t({
      navigation: {
        nextEl: null,
        prevEl: null,
        hideOnClick: !1,
        disabledClass: "swiper-button-disabled",
        hiddenClass: "swiper-button-hidden",
        lockClass: "swiper-button-lock",
        navigationDisabledClass: "swiper-navigation-disabled",
      },
    }),
      (e.navigation = {
        nextEl: null,
        $nextEl: null,
        prevEl: null,
        $prevEl: null,
      }),
      i("init", () => {
        !1 === e.params.navigation.enabled ? u() : (d(), a());
      }),
      i("toEdge fromEdge lock unlock", () => {
        a();
      }),
      i("destroy", () => {
        c();
      }),
      i("enable disable", () => {
        const { $nextEl: t, $prevEl: i } = e.navigation;
        t &&
          t[e.enabled ? "removeClass" : "addClass"](
            e.params.navigation.lockClass
          ),
          i &&
            i[e.enabled ? "removeClass" : "addClass"](
              e.params.navigation.lockClass
            );
      }),
      i("click", (t, i) => {
        const { $nextEl: r, $prevEl: s } = e.navigation,
          a = i.target;
        if (e.params.navigation.hideOnClick && !_(a).is(s) && !_(a).is(r)) {
          if (
            e.pagination &&
            e.params.pagination &&
            e.params.pagination.clickable &&
            (e.pagination.el === a || e.pagination.el.contains(a))
          )
            return;
          let t;
          r
            ? (t = r.hasClass(e.params.navigation.hiddenClass))
            : s && (t = s.hasClass(e.params.navigation.hiddenClass)),
            n(!0 === t ? "navigationShow" : "navigationHide"),
            r && r.toggleClass(e.params.navigation.hiddenClass),
            s && s.toggleClass(e.params.navigation.hiddenClass);
        }
      });
    const u = () => {
      e.$el.addClass(e.params.navigation.navigationDisabledClass), c();
    };
    Object.assign(e.navigation, {
      enable: () => {
        e.$el.removeClass(e.params.navigation.navigationDisabledClass),
          d(),
          a();
      },
      disable: u,
      update: a,
      init: d,
      destroy: c,
    });
  }
  function oe(e = "") {
    return `.${e
      .trim()
      .replace(/([\.:!\/])/g, "\\$1")
      .replace(/ /g, ".")}`;
  }
  function le({ swiper: e, extendParams: t, on: i, emit: n }) {
    const r = "swiper-pagination";
    let s;
    t({
      pagination: {
        el: null,
        bulletElement: "span",
        clickable: !1,
        hideOnClick: !1,
        renderBullet: null,
        renderProgressbar: null,
        renderFraction: null,
        renderCustom: null,
        progressbarOpposite: !1,
        type: "bullets",
        dynamicBullets: !1,
        dynamicMainBullets: 1,
        formatFractionCurrent: (e) => e,
        formatFractionTotal: (e) => e,
        bulletClass: `${r}-bullet`,
        bulletActiveClass: `${r}-bullet-active`,
        modifierClass: `${r}-`,
        currentClass: `${r}-current`,
        totalClass: `${r}-total`,
        hiddenClass: `${r}-hidden`,
        progressbarFillClass: `${r}-progressbar-fill`,
        progressbarOppositeClass: `${r}-progressbar-opposite`,
        clickableClass: `${r}-clickable`,
        lockClass: `${r}-lock`,
        horizontalClass: `${r}-horizontal`,
        verticalClass: `${r}-vertical`,
        paginationDisabledClass: `${r}-disabled`,
      },
    }),
      (e.pagination = { el: null, $el: null, bullets: [] });
    let a = 0;
    function o() {
      return (
        !e.params.pagination.el ||
        !e.pagination.el ||
        !e.pagination.$el ||
        0 === e.pagination.$el.length
      );
    }
    function l(t, i) {
      const { bulletActiveClass: n } = e.params.pagination;
      t[i]().addClass(`${n}-${i}`)[i]().addClass(`${n}-${i}-${i}`);
    }
    function d() {
      const t = e.rtl,
        i = e.params.pagination;
      if (o()) return;
      const r =
          e.virtual && e.params.virtual.enabled
            ? e.virtual.slides.length
            : e.slides.length,
        d = e.pagination.$el;
      let c;
      const u = e.params.loop
        ? Math.ceil((r - 2 * e.loopedSlides) / e.params.slidesPerGroup)
        : e.snapGrid.length;
      if (
        (e.params.loop
          ? ((c = Math.ceil(
              (e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup
            )),
            c > r - 1 - 2 * e.loopedSlides && (c -= r - 2 * e.loopedSlides),
            c > u - 1 && (c -= u),
            c < 0 && "bullets" !== e.params.paginationType && (c = u + c))
          : (c = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0),
        "bullets" === i.type &&
          e.pagination.bullets &&
          e.pagination.bullets.length > 0)
      ) {
        const n = e.pagination.bullets;
        let r, o, u;
        if (
          (i.dynamicBullets &&
            ((s = n.eq(0)[e.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
            d.css(
              e.isHorizontal() ? "width" : "height",
              s * (i.dynamicMainBullets + 4) + "px"
            ),
            i.dynamicMainBullets > 1 &&
              void 0 !== e.previousIndex &&
              ((a += c - (e.previousIndex - e.loopedSlides || 0)),
              a > i.dynamicMainBullets - 1
                ? (a = i.dynamicMainBullets - 1)
                : a < 0 && (a = 0)),
            (r = Math.max(c - a, 0)),
            (o = r + (Math.min(n.length, i.dynamicMainBullets) - 1)),
            (u = (o + r) / 2)),
          n.removeClass(
            ["", "-next", "-next-next", "-prev", "-prev-prev", "-main"]
              .map((e) => `${i.bulletActiveClass}${e}`)
              .join(" ")
          ),
          d.length > 1)
        )
          n.each((e) => {
            const t = _(e),
              n = t.index();
            n === c && t.addClass(i.bulletActiveClass),
              i.dynamicBullets &&
                (n >= r && n <= o && t.addClass(`${i.bulletActiveClass}-main`),
                n === r && l(t, "prev"),
                n === o && l(t, "next"));
          });
        else {
          const t = n.eq(c),
            s = t.index();
          if ((t.addClass(i.bulletActiveClass), i.dynamicBullets)) {
            const t = n.eq(r),
              a = n.eq(o);
            for (let e = r; e <= o; e += 1)
              n.eq(e).addClass(`${i.bulletActiveClass}-main`);
            if (e.params.loop)
              if (s >= n.length) {
                for (let e = i.dynamicMainBullets; e >= 0; e -= 1)
                  n.eq(n.length - e).addClass(`${i.bulletActiveClass}-main`);
                n.eq(n.length - i.dynamicMainBullets - 1).addClass(
                  `${i.bulletActiveClass}-prev`
                );
              } else l(t, "prev"), l(a, "next");
            else l(t, "prev"), l(a, "next");
          }
        }
        if (i.dynamicBullets) {
          const r = Math.min(n.length, i.dynamicMainBullets + 4),
            a = (s * r - s) / 2 - u * s,
            o = t ? "right" : "left";
          n.css(e.isHorizontal() ? o : "top", `${a}px`);
        }
      }
      if (
        ("fraction" === i.type &&
          (d.find(oe(i.currentClass)).text(i.formatFractionCurrent(c + 1)),
          d.find(oe(i.totalClass)).text(i.formatFractionTotal(u))),
        "progressbar" === i.type)
      ) {
        let t;
        t = i.progressbarOpposite
          ? e.isHorizontal()
            ? "vertical"
            : "horizontal"
          : e.isHorizontal()
          ? "horizontal"
          : "vertical";
        const n = (c + 1) / u;
        let r = 1,
          s = 1;
        "horizontal" === t ? (r = n) : (s = n),
          d
            .find(oe(i.progressbarFillClass))
            .transform(`translate3d(0,0,0) scaleX(${r}) scaleY(${s})`)
            .transition(e.params.speed);
      }
      "custom" === i.type && i.renderCustom
        ? (d.html(i.renderCustom(e, c + 1, u)), n("paginationRender", d[0]))
        : n("paginationUpdate", d[0]),
        e.params.watchOverflow &&
          e.enabled &&
          d[e.isLocked ? "addClass" : "removeClass"](i.lockClass);
    }
    function c() {
      const t = e.params.pagination;
      if (o()) return;
      const i =
          e.virtual && e.params.virtual.enabled
            ? e.virtual.slides.length
            : e.slides.length,
        r = e.pagination.$el;
      let s = "";
      if ("bullets" === t.type) {
        let n = e.params.loop
          ? Math.ceil((i - 2 * e.loopedSlides) / e.params.slidesPerGroup)
          : e.snapGrid.length;
        e.params.freeMode &&
          e.params.freeMode.enabled &&
          !e.params.loop &&
          n > i &&
          (n = i);
        for (let i = 0; i < n; i += 1)
          t.renderBullet
            ? (s += t.renderBullet.call(e, i, t.bulletClass))
            : (s += `<${t.bulletElement} class="${t.bulletClass}"></${t.bulletElement}>`);
        r.html(s), (e.pagination.bullets = r.find(oe(t.bulletClass)));
      }
      "fraction" === t.type &&
        ((s = t.renderFraction
          ? t.renderFraction.call(e, t.currentClass, t.totalClass)
          : `<span class="${t.currentClass}"></span> / <span class="${t.totalClass}"></span>`),
        r.html(s)),
        "progressbar" === t.type &&
          ((s = t.renderProgressbar
            ? t.renderProgressbar.call(e, t.progressbarFillClass)
            : `<span class="${t.progressbarFillClass}"></span>`),
          r.html(s)),
        "custom" !== t.type && n("paginationRender", e.pagination.$el[0]);
    }
    function u() {
      e.params.pagination = se(
        e,
        e.originalParams.pagination,
        e.params.pagination,
        { el: "swiper-pagination" }
      );
      const t = e.params.pagination;
      if (!t.el) return;
      let i = _(t.el);
      0 !== i.length &&
        (e.params.uniqueNavElements &&
          "string" == typeof t.el &&
          i.length > 1 &&
          ((i = e.$el.find(t.el)),
          i.length > 1 &&
            (i = i.filter((t) => _(t).parents(".swiper")[0] === e.el))),
        "bullets" === t.type && t.clickable && i.addClass(t.clickableClass),
        i.addClass(t.modifierClass + t.type),
        i.addClass(e.isHorizontal() ? t.horizontalClass : t.verticalClass),
        "bullets" === t.type &&
          t.dynamicBullets &&
          (i.addClass(`${t.modifierClass}${t.type}-dynamic`),
          (a = 0),
          t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)),
        "progressbar" === t.type &&
          t.progressbarOpposite &&
          i.addClass(t.progressbarOppositeClass),
        t.clickable &&
          i.on("click", oe(t.bulletClass), function (t) {
            t.preventDefault();
            let i = _(this).index() * e.params.slidesPerGroup;
            e.params.loop && (i += e.loopedSlides), e.slideTo(i);
          }),
        Object.assign(e.pagination, { $el: i, el: i[0] }),
        e.enabled || i.addClass(t.lockClass));
    }
    function p() {
      const t = e.params.pagination;
      if (o()) return;
      const i = e.pagination.$el;
      i.removeClass(t.hiddenClass),
        i.removeClass(t.modifierClass + t.type),
        i.removeClass(e.isHorizontal() ? t.horizontalClass : t.verticalClass),
        e.pagination.bullets &&
          e.pagination.bullets.removeClass &&
          e.pagination.bullets.removeClass(t.bulletActiveClass),
        t.clickable && i.off("click", oe(t.bulletClass));
    }
    i("init", () => {
      !1 === e.params.pagination.enabled ? h() : (u(), c(), d());
    }),
      i("activeIndexChange", () => {
        (e.params.loop || void 0 === e.snapIndex) && d();
      }),
      i("snapIndexChange", () => {
        e.params.loop || d();
      }),
      i("slidesLengthChange", () => {
        e.params.loop && (c(), d());
      }),
      i("snapGridLengthChange", () => {
        e.params.loop || (c(), d());
      }),
      i("destroy", () => {
        p();
      }),
      i("enable disable", () => {
        const { $el: t } = e.pagination;
        t &&
          t[e.enabled ? "removeClass" : "addClass"](
            e.params.pagination.lockClass
          );
      }),
      i("lock unlock", () => {
        d();
      }),
      i("click", (t, i) => {
        const r = i.target,
          { $el: s } = e.pagination;
        if (
          e.params.pagination.el &&
          e.params.pagination.hideOnClick &&
          s &&
          s.length > 0 &&
          !_(r).hasClass(e.params.pagination.bulletClass)
        ) {
          if (
            e.navigation &&
            ((e.navigation.nextEl && r === e.navigation.nextEl) ||
              (e.navigation.prevEl && r === e.navigation.prevEl))
          )
            return;
          const t = s.hasClass(e.params.pagination.hiddenClass);
          n(!0 === t ? "paginationShow" : "paginationHide"),
            s.toggleClass(e.params.pagination.hiddenClass);
        }
      });
    const h = () => {
      e.$el.addClass(e.params.pagination.paginationDisabledClass),
        e.pagination.$el &&
          e.pagination.$el.addClass(
            e.params.pagination.paginationDisabledClass
          ),
        p();
    };
    Object.assign(e.pagination, {
      enable: () => {
        e.$el.removeClass(e.params.pagination.paginationDisabledClass),
          e.pagination.$el &&
            e.pagination.$el.removeClass(
              e.params.pagination.paginationDisabledClass
            ),
          u(),
          c(),
          d();
      },
      disable: h,
      render: c,
      update: d,
      init: u,
      destroy: p,
    });
  }
  function de({ swiper: e, extendParams: t, on: i, emit: n }) {
    const r = l();
    let s,
      a,
      o,
      d,
      c = !1,
      u = null,
      p = null;
    function h() {
      if (!e.params.scrollbar.el || !e.scrollbar.el) return;
      const { scrollbar: t, rtlTranslate: i, progress: n } = e,
        { $dragEl: r, $el: s } = t,
        l = e.params.scrollbar;
      let d = a,
        c = (o - a) * n;
      i
        ? ((c = -c), c > 0 ? ((d = a - c), (c = 0)) : -c + a > o && (d = o + c))
        : c < 0
        ? ((d = a + c), (c = 0))
        : c + a > o && (d = o - c),
        e.isHorizontal()
          ? (r.transform(`translate3d(${c}px, 0, 0)`),
            (r[0].style.width = `${d}px`))
          : (r.transform(`translate3d(0px, ${c}px, 0)`),
            (r[0].style.height = `${d}px`)),
        l.hide &&
          (clearTimeout(u),
          (s[0].style.opacity = 1),
          (u = setTimeout(() => {
            (s[0].style.opacity = 0), s.transition(400);
          }, 1e3)));
    }
    function f() {
      if (!e.params.scrollbar.el || !e.scrollbar.el) return;
      const { scrollbar: t } = e,
        { $dragEl: i, $el: n } = t;
      (i[0].style.width = ""),
        (i[0].style.height = ""),
        (o = e.isHorizontal() ? n[0].offsetWidth : n[0].offsetHeight),
        (d =
          e.size /
          (e.virtualSize +
            e.params.slidesOffsetBefore -
            (e.params.centeredSlides ? e.snapGrid[0] : 0))),
        (a =
          "auto" === e.params.scrollbar.dragSize
            ? o * d
            : parseInt(e.params.scrollbar.dragSize, 10)),
        e.isHorizontal()
          ? (i[0].style.width = `${a}px`)
          : (i[0].style.height = `${a}px`),
        (n[0].style.display = d >= 1 ? "none" : ""),
        e.params.scrollbar.hide && (n[0].style.opacity = 0),
        e.params.watchOverflow &&
          e.enabled &&
          t.$el[e.isLocked ? "addClass" : "removeClass"](
            e.params.scrollbar.lockClass
          );
    }
    function m(t) {
      return e.isHorizontal()
        ? "touchstart" === t.type || "touchmove" === t.type
          ? t.targetTouches[0].clientX
          : t.clientX
        : "touchstart" === t.type || "touchmove" === t.type
        ? t.targetTouches[0].clientY
        : t.clientY;
    }
    function g(t) {
      const { scrollbar: i, rtlTranslate: n } = e,
        { $el: r } = i;
      let l;
      (l =
        (m(t) -
          r.offset()[e.isHorizontal() ? "left" : "top"] -
          (null !== s ? s : a / 2)) /
        (o - a)),
        (l = Math.max(Math.min(l, 1), 0)),
        n && (l = 1 - l);
      const d = e.minTranslate() + (e.maxTranslate() - e.minTranslate()) * l;
      e.updateProgress(d),
        e.setTranslate(d),
        e.updateActiveIndex(),
        e.updateSlidesClasses();
    }
    function v(t) {
      const i = e.params.scrollbar,
        { scrollbar: r, $wrapperEl: a } = e,
        { $el: o, $dragEl: l } = r;
      (c = !0),
        (s =
          t.target === l[0] || t.target === l
            ? m(t) -
              t.target.getBoundingClientRect()[
                e.isHorizontal() ? "left" : "top"
              ]
            : null),
        t.preventDefault(),
        t.stopPropagation(),
        a.transition(100),
        l.transition(100),
        g(t),
        clearTimeout(p),
        o.transition(0),
        i.hide && o.css("opacity", 1),
        e.params.cssMode && e.$wrapperEl.css("scroll-snap-type", "none"),
        n("scrollbarDragStart", t);
    }
    function y(t) {
      const { scrollbar: i, $wrapperEl: r } = e,
        { $el: s, $dragEl: a } = i;
      c &&
        (t.preventDefault ? t.preventDefault() : (t.returnValue = !1),
        g(t),
        r.transition(0),
        s.transition(0),
        a.transition(0),
        n("scrollbarDragMove", t));
    }
    function w(t) {
      const i = e.params.scrollbar,
        { scrollbar: r, $wrapperEl: s } = e,
        { $el: a } = r;
      c &&
        ((c = !1),
        e.params.cssMode &&
          (e.$wrapperEl.css("scroll-snap-type", ""), s.transition("")),
        i.hide &&
          (clearTimeout(p),
          (p = b(() => {
            a.css("opacity", 0), a.transition(400);
          }, 1e3))),
        n("scrollbarDragEnd", t),
        i.snapOnRelease && e.slideToClosest());
    }
    function T(t) {
      const {
          scrollbar: i,
          touchEventsTouch: n,
          touchEventsDesktop: s,
          params: a,
          support: o,
        } = e,
        l = i.$el;
      if (!l) return;
      const d = l[0],
        c = !(!o.passiveListener || !a.passiveListeners) && {
          passive: !1,
          capture: !1,
        },
        u = !(!o.passiveListener || !a.passiveListeners) && {
          passive: !0,
          capture: !1,
        };
      if (!d) return;
      const p = "on" === t ? "addEventListener" : "removeEventListener";
      o.touch
        ? (d[p](n.start, v, c), d[p](n.move, y, c), d[p](n.end, w, u))
        : (d[p](s.start, v, c), r[p](s.move, y, c), r[p](s.end, w, u));
    }
    function x() {
      const { scrollbar: t, $el: i } = e;
      e.params.scrollbar = se(
        e,
        e.originalParams.scrollbar,
        e.params.scrollbar,
        { el: "swiper-scrollbar" }
      );
      const n = e.params.scrollbar;
      if (!n.el) return;
      let r = _(n.el);
      e.params.uniqueNavElements &&
        "string" == typeof n.el &&
        r.length > 1 &&
        1 === i.find(n.el).length &&
        (r = i.find(n.el)),
        r.addClass(e.isHorizontal() ? n.horizontalClass : n.verticalClass);
      let s = r.find(`.${e.params.scrollbar.dragClass}`);
      0 === s.length &&
        ((s = _(`<div class="${e.params.scrollbar.dragClass}"></div>`)),
        r.append(s)),
        Object.assign(t, { $el: r, el: r[0], $dragEl: s, dragEl: s[0] }),
        n.draggable && e.params.scrollbar.el && e.scrollbar.el && T("on"),
        r &&
          r[e.enabled ? "removeClass" : "addClass"](
            e.params.scrollbar.lockClass
          );
    }
    function C() {
      const t = e.params.scrollbar,
        i = e.scrollbar.$el;
      i &&
        i.removeClass(e.isHorizontal() ? t.horizontalClass : t.verticalClass),
        e.params.scrollbar.el && e.scrollbar.el && T("off");
    }
    t({
      scrollbar: {
        el: null,
        dragSize: "auto",
        hide: !1,
        draggable: !1,
        snapOnRelease: !0,
        lockClass: "swiper-scrollbar-lock",
        dragClass: "swiper-scrollbar-drag",
        scrollbarDisabledClass: "swiper-scrollbar-disabled",
        horizontalClass: "swiper-scrollbar-horizontal",
        verticalClass: "swiper-scrollbar-vertical",
      },
    }),
      (e.scrollbar = { el: null, dragEl: null, $el: null, $dragEl: null }),
      i("init", () => {
        !1 === e.params.scrollbar.enabled ? S() : (x(), f(), h());
      }),
      i("update resize observerUpdate lock unlock", () => {
        f();
      }),
      i("setTranslate", () => {
        h();
      }),
      i("setTransition", (t, i) => {
        !(function (t) {
          e.params.scrollbar.el &&
            e.scrollbar.el &&
            e.scrollbar.$dragEl.transition(t);
        })(i);
      }),
      i("enable disable", () => {
        const { $el: t } = e.scrollbar;
        t &&
          t[e.enabled ? "removeClass" : "addClass"](
            e.params.scrollbar.lockClass
          );
      }),
      i("destroy", () => {
        C();
      });
    const S = () => {
      e.$el.addClass(e.params.scrollbar.scrollbarDisabledClass),
        e.scrollbar.$el &&
          e.scrollbar.$el.addClass(e.params.scrollbar.scrollbarDisabledClass),
        C();
    };
    Object.assign(e.scrollbar, {
      enable: () => {
        e.$el.removeClass(e.params.scrollbar.scrollbarDisabledClass),
          e.scrollbar.$el &&
            e.scrollbar.$el.removeClass(
              e.params.scrollbar.scrollbarDisabledClass
            ),
          x(),
          f(),
          h();
      },
      disable: S,
      updateSize: f,
      setTranslate: h,
      init: x,
      destroy: C,
    });
  }
  function ce({ swiper: e, extendParams: t, on: i }) {
    t({ parallax: { enabled: !1 } });
    const n = (t, i) => {
        const { rtl: n } = e,
          r = _(t),
          s = n ? -1 : 1,
          a = r.attr("data-swiper-parallax") || "0";
        let o = r.attr("data-swiper-parallax-x"),
          l = r.attr("data-swiper-parallax-y");
        const d = r.attr("data-swiper-parallax-scale"),
          c = r.attr("data-swiper-parallax-opacity");
        if (
          (o || l
            ? ((o = o || "0"), (l = l || "0"))
            : e.isHorizontal()
            ? ((o = a), (l = "0"))
            : ((l = a), (o = "0")),
          (o =
            o.indexOf("%") >= 0
              ? parseInt(o, 10) * i * s + "%"
              : o * i * s + "px"),
          (l = l.indexOf("%") >= 0 ? parseInt(l, 10) * i + "%" : l * i + "px"),
          null != c)
        ) {
          const e = c - (c - 1) * (1 - Math.abs(i));
          r[0].style.opacity = e;
        }
        if (null == d) r.transform(`translate3d(${o}, ${l}, 0px)`);
        else {
          const e = d - (d - 1) * (1 - Math.abs(i));
          r.transform(`translate3d(${o}, ${l}, 0px) scale(${e})`);
        }
      },
      r = () => {
        const { $el: t, slides: i, progress: r, snapGrid: s } = e;
        t
          .children(
            "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
          )
          .each((e) => {
            n(e, r);
          }),
          i.each((t, i) => {
            let a = t.progress;
            e.params.slidesPerGroup > 1 &&
              "auto" !== e.params.slidesPerView &&
              (a += Math.ceil(i / 2) - r * (s.length - 1)),
              (a = Math.min(Math.max(a, -1), 1)),
              _(t)
                .find(
                  "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
                )
                .each((e) => {
                  n(e, a);
                });
          });
      };
    i("beforeInit", () => {
      e.params.parallax.enabled &&
        ((e.params.watchSlidesProgress = !0),
        (e.originalParams.watchSlidesProgress = !0));
    }),
      i("init", () => {
        e.params.parallax.enabled && r();
      }),
      i("setTranslate", () => {
        e.params.parallax.enabled && r();
      }),
      i("setTransition", (t, i) => {
        e.params.parallax.enabled &&
          ((t = e.params.speed) => {
            const { $el: i } = e;
            i.find(
              "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
            ).each((e) => {
              const i = _(e);
              let n =
                parseInt(i.attr("data-swiper-parallax-duration"), 10) || t;
              0 === t && (n = 0), i.transition(n);
            });
          })(i);
      });
  }
  function ue({ swiper: e, extendParams: t, on: i }) {
    function n(e, t) {
      const i = (function () {
        let e, t, i;
        return (n, r) => {
          for (t = -1, e = n.length; e - t > 1; )
            (i = (e + t) >> 1), n[i] <= r ? (t = i) : (e = i);
          return e;
        };
      })();
      let n, r;
      return (
        (this.x = e),
        (this.y = t),
        (this.lastIndex = e.length - 1),
        (this.interpolate = function (e) {
          return e
            ? ((r = i(this.x, e)),
              (n = r - 1),
              ((e - this.x[n]) * (this.y[r] - this.y[n])) /
                (this.x[r] - this.x[n]) +
                this.y[n])
            : 0;
        }),
        this
      );
    }
    function r() {
      e.controller.control &&
        e.controller.spline &&
        ((e.controller.spline = void 0), delete e.controller.spline);
    }
    t({ controller: { control: void 0, inverse: !1, by: "slide" } }),
      (e.controller = { control: void 0 }),
      i("beforeInit", () => {
        e.controller.control = e.params.controller.control;
      }),
      i("update", () => {
        r();
      }),
      i("resize", () => {
        r();
      }),
      i("observerUpdate", () => {
        r();
      }),
      i("setTranslate", (t, i, n) => {
        e.controller.control && e.controller.setTranslate(i, n);
      }),
      i("setTransition", (t, i, n) => {
        e.controller.control && e.controller.setTransition(i, n);
      }),
      Object.assign(e.controller, {
        setTranslate: function (t, i) {
          const r = e.controller.control;
          let s, a;
          const o = e.constructor;
          function l(t) {
            const i = e.rtlTranslate ? -e.translate : e.translate;
            "slide" === e.params.controller.by &&
              (!(function (t) {
                e.controller.spline ||
                  (e.controller.spline = e.params.loop
                    ? new n(e.slidesGrid, t.slidesGrid)
                    : new n(e.snapGrid, t.snapGrid));
              })(t),
              (a = -e.controller.spline.interpolate(-i))),
              (a && "container" !== e.params.controller.by) ||
                ((s =
                  (t.maxTranslate() - t.minTranslate()) /
                  (e.maxTranslate() - e.minTranslate())),
                (a = (i - e.minTranslate()) * s + t.minTranslate())),
              e.params.controller.inverse && (a = t.maxTranslate() - a),
              t.updateProgress(a),
              t.setTranslate(a, e),
              t.updateActiveIndex(),
              t.updateSlidesClasses();
          }
          if (Array.isArray(r))
            for (let e = 0; e < r.length; e += 1)
              r[e] !== i && r[e] instanceof o && l(r[e]);
          else r instanceof o && i !== r && l(r);
        },
        setTransition: function (t, i) {
          const n = e.constructor,
            r = e.controller.control;
          let s;
          function a(i) {
            i.setTransition(t, e),
              0 !== t &&
                (i.transitionStart(),
                i.params.autoHeight &&
                  b(() => {
                    i.updateAutoHeight();
                  }),
                i.$wrapperEl.transitionEnd(() => {
                  r &&
                    (i.params.loop &&
                      "slide" === e.params.controller.by &&
                      i.loopFix(),
                    i.transitionEnd());
                }));
          }
          if (Array.isArray(r))
            for (s = 0; s < r.length; s += 1)
              r[s] !== i && r[s] instanceof n && a(r[s]);
          else r instanceof n && i !== r && a(r);
        },
      });
  }
  function pe(e) {
    if (void 0 === e)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    return e;
  }
  function he(e, t) {
    (e.prototype = Object.create(t.prototype)),
      (e.prototype.constructor = e),
      (e.__proto__ = t);
  }
  var fe,
    me,
    ge,
    ve,
    _e,
    be,
    ye,
    we,
    Te,
    xe,
    Ce,
    Se = {
      autoSleep: 120,
      force3D: "auto",
      nullTargetWarn: 1,
      units: { lineHeight: "" },
    },
    Ee = { duration: 0.5, overwrite: !1, delay: 0 },
    Me = 1e8,
    ke = 1e-8,
    Oe = 2 * Math.PI,
    Ae = Oe / 4,
    Pe = 0,
    $e = Math.sqrt,
    Le = Math.cos,
    De = Math.sin,
    ze = function (e) {
      return "string" == typeof e;
    },
    Ie = function (e) {
      return "function" == typeof e;
    },
    Be = function (e) {
      return "number" == typeof e;
    },
    Fe = function (e) {
      return void 0 === e;
    },
    Re = function (e) {
      return "object" == typeof e;
    },
    Ne = function (e) {
      return !1 !== e;
    },
    Ge = function () {
      return "undefined" != typeof window;
    },
    je = function (e) {
      return Ie(e) || ze(e);
    },
    He =
      ("function" == typeof ArrayBuffer && ArrayBuffer.isView) ||
      function () {},
    qe = Array.isArray,
    Ve = /(?:-?\.?\d|\.)+/gi,
    Xe = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
    Ye = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
    We = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
    Ue = /[+-]=-?[.\d]+/,
    Ke = /[^,'"\[\]\s]+/gi,
    Qe = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
    Ze = {},
    Je = {},
    et = function (e) {
      return (Je = Ot(e, Ze)) && An;
    },
    tt = function (e, t) {
      return console.warn(
        "Invalid property",
        e,
        "set to",
        t,
        "Missing plugin? gsap.registerPlugin()"
      );
    },
    it = function (e, t) {
      return !t && console.warn(e);
    },
    nt = function (e, t) {
      return (e && (Ze[e] = t) && Je && (Je[e] = t)) || Ze;
    },
    rt = function () {
      return 0;
    },
    st = { suppressEvents: !0, isStart: !0, kill: !1 },
    at = { suppressEvents: !0, kill: !1 },
    ot = { suppressEvents: !0 },
    lt = {},
    dt = [],
    ct = {},
    ut = {},
    pt = {},
    ht = 30,
    ft = [],
    mt = "",
    gt = function (e) {
      var t,
        i,
        n = e[0];
      if ((Re(n) || Ie(n) || (e = [e]), !(t = (n._gsap || {}).harness))) {
        for (i = ft.length; i-- && !ft[i].targetTest(n); );
        t = ft[i];
      }
      for (i = e.length; i--; )
        (e[i] && (e[i]._gsap || (e[i]._gsap = new qi(e[i], t)))) ||
          e.splice(i, 1);
      return e;
    },
    vt = function (e) {
      return e._gsap || gt(li(e))[0]._gsap;
    },
    _t = function (e, t, i) {
      return (i = e[t]) && Ie(i)
        ? e[t]()
        : (Fe(i) && e.getAttribute && e.getAttribute(t)) || i;
    },
    bt = function (e, t) {
      return (e = e.split(",")).forEach(t) || e;
    },
    yt = function (e) {
      return Math.round(1e5 * e) / 1e5 || 0;
    },
    wt = function (e) {
      return Math.round(1e7 * e) / 1e7 || 0;
    },
    Tt = function (e, t) {
      var i = t.charAt(0),
        n = parseFloat(t.substr(2));
      return (
        (e = parseFloat(e)),
        "+" === i ? e + n : "-" === i ? e - n : "*" === i ? e * n : e / n
      );
    },
    xt = function (e, t) {
      for (var i = t.length, n = 0; e.indexOf(t[n]) < 0 && ++n < i; );
      return n < i;
    },
    Ct = function () {
      var e,
        t,
        i = dt.length,
        n = dt.slice(0);
      for (ct = {}, dt.length = 0, e = 0; e < i; e++)
        (t = n[e]) &&
          t._lazy &&
          (t.render(t._lazy[0], t._lazy[1], !0)._lazy = 0);
    },
    St = function (e, t, i, n) {
      dt.length && Ct(),
        e.render(t, i, n || (me && t < 0 && (e._initted || e._startAt))),
        dt.length && Ct();
    },
    Et = function (e) {
      var t = parseFloat(e);
      return (t || 0 === t) && (e + "").match(Ke).length < 2
        ? t
        : ze(e)
        ? e.trim()
        : e;
    },
    Mt = function (e) {
      return e;
    },
    kt = function (e, t) {
      for (var i in t) i in e || (e[i] = t[i]);
      return e;
    },
    Ot = function (e, t) {
      for (var i in t) e[i] = t[i];
      return e;
    },
    At = function e(t, i) {
      for (var n in i)
        "__proto__" !== n &&
          "constructor" !== n &&
          "prototype" !== n &&
          (t[n] = Re(i[n]) ? e(t[n] || (t[n] = {}), i[n]) : i[n]);
      return t;
    },
    Pt = function (e, t) {
      var i,
        n = {};
      for (i in e) i in t || (n[i] = e[i]);
      return n;
    },
    $t = function (e) {
      var t,
        i = e.parent || ve,
        n = e.keyframes
          ? ((t = qe(e.keyframes)),
            function (e, i) {
              for (var n in i)
                n in e ||
                  ("duration" === n && t) ||
                  "ease" === n ||
                  (e[n] = i[n]);
            })
          : kt;
      if (Ne(e.inherit))
        for (; i; ) n(e, i.vars.defaults), (i = i.parent || i._dp);
      return e;
    },
    Lt = function (e, t, i, n, r) {
      void 0 === i && (i = "_first"), void 0 === n && (n = "_last");
      var s,
        a = e[n];
      if (r) for (s = t[r]; a && a[r] > s; ) a = a._prev;
      return (
        a
          ? ((t._next = a._next), (a._next = t))
          : ((t._next = e[i]), (e[i] = t)),
        t._next ? (t._next._prev = t) : (e[n] = t),
        (t._prev = a),
        (t.parent = t._dp = e),
        t
      );
    },
    Dt = function (e, t, i, n) {
      void 0 === i && (i = "_first"), void 0 === n && (n = "_last");
      var r = t._prev,
        s = t._next;
      r ? (r._next = s) : e[i] === t && (e[i] = s),
        s ? (s._prev = r) : e[n] === t && (e[n] = r),
        (t._next = t._prev = t.parent = null);
    },
    zt = function (e, t) {
      e.parent && (!t || e.parent.autoRemoveChildren) && e.parent.remove(e),
        (e._act = 0);
    },
    It = function (e, t) {
      if (e && (!t || t._end > e._dur || t._start < 0))
        for (var i = e; i; ) (i._dirty = 1), (i = i.parent);
      return e;
    },
    Bt = function (e) {
      for (var t = e.parent; t && t.parent; )
        (t._dirty = 1), t.totalDuration(), (t = t.parent);
      return e;
    },
    Ft = function (e, t, i, n) {
      return (
        e._startAt &&
        (me
          ? e._startAt.revert(at)
          : (e.vars.immediateRender && !e.vars.autoRevert) ||
            e._startAt.render(t, !0, n))
      );
    },
    Rt = function e(t) {
      return !t || (t._ts && e(t.parent));
    },
    Nt = function (e) {
      return e._repeat ? Gt(e._tTime, (e = e.duration() + e._rDelay)) * e : 0;
    },
    Gt = function (e, t) {
      var i = Math.floor((e /= t));
      return e && i === e ? i - 1 : i;
    },
    jt = function (e, t) {
      return (
        (e - t._start) * t._ts +
        (t._ts >= 0 ? 0 : t._dirty ? t.totalDuration() : t._tDur)
      );
    },
    Ht = function (e) {
      return (e._end = wt(
        e._start + (e._tDur / Math.abs(e._ts || e._rts || ke) || 0)
      ));
    },
    qt = function (e, t) {
      var i = e._dp;
      return (
        i &&
          i.smoothChildTiming &&
          e._ts &&
          ((e._start = wt(
            i._time -
              (e._ts > 0
                ? t / e._ts
                : ((e._dirty ? e.totalDuration() : e._tDur) - t) / -e._ts)
          )),
          Ht(e),
          i._dirty || It(i, e)),
        e
      );
    },
    Vt = function (e, t) {
      var i;
      if (
        ((t._time || (t._initted && !t._dur)) &&
          ((i = jt(e.rawTime(), t)),
          (!t._dur || ni(0, t.totalDuration(), i) - t._tTime > ke) &&
            t.render(i, !0)),
        It(e, t)._dp && e._initted && e._time >= e._dur && e._ts)
      ) {
        if (e._dur < e.duration())
          for (i = e; i._dp; )
            i.rawTime() >= 0 && i.totalTime(i._tTime), (i = i._dp);
        e._zTime = -1e-8;
      }
    },
    Xt = function (e, t, i, n) {
      return (
        t.parent && zt(t),
        (t._start = wt(
          (Be(i) ? i : i || e !== ve ? ei(e, i, t) : e._time) + t._delay
        )),
        (t._end = wt(
          t._start + (t.totalDuration() / Math.abs(t.timeScale()) || 0)
        )),
        Lt(e, t, "_first", "_last", e._sort ? "_start" : 0),
        Kt(t) || (e._recent = t),
        n || Vt(e, t),
        e._ts < 0 && qt(e, e._tTime),
        e
      );
    },
    Yt = function (e, t) {
      return (
        (Ze.ScrollTrigger || tt("scrollTrigger", t)) &&
        Ze.ScrollTrigger.create(t, e)
      );
    },
    Wt = function (e, t, i, n, r) {
      return (
        Zi(e, t, r),
        e._initted
          ? !i &&
            e._pt &&
            !me &&
            ((e._dur && !1 !== e.vars.lazy) || (!e._dur && e.vars.lazy)) &&
            Te !== Pi.frame
            ? (dt.push(e), (e._lazy = [r, n]), 1)
            : void 0
          : 1
      );
    },
    Ut = function e(t) {
      var i = t.parent;
      return i && i._ts && i._initted && !i._lock && (i.rawTime() < 0 || e(i));
    },
    Kt = function (e) {
      var t = e.data;
      return "isFromStart" === t || "isStart" === t;
    },
    Qt = function (e, t, i, n) {
      var r = e._repeat,
        s = wt(t) || 0,
        a = e._tTime / e._tDur;
      return (
        a && !n && (e._time *= s / e._dur),
        (e._dur = s),
        (e._tDur = r ? (r < 0 ? 1e10 : wt(s * (r + 1) + e._rDelay * r)) : s),
        a > 0 && !n && qt(e, (e._tTime = e._tDur * a)),
        e.parent && Ht(e),
        i || It(e.parent, e),
        e
      );
    },
    Zt = function (e) {
      return e instanceof Xi ? It(e) : Qt(e, e._dur);
    },
    Jt = { _start: 0, endTime: rt, totalDuration: rt },
    ei = function e(t, i, n) {
      var r,
        s,
        a,
        o = t.labels,
        l = t._recent || Jt,
        d = t.duration() >= Me ? l.endTime(!1) : t._dur;
      return ze(i) && (isNaN(i) || i in o)
        ? ((s = i.charAt(0)),
          (a = "%" === i.substr(-1)),
          (r = i.indexOf("=")),
          "<" === s || ">" === s
            ? (r >= 0 && (i = i.replace(/=/, "")),
              ("<" === s ? l._start : l.endTime(l._repeat >= 0)) +
                (parseFloat(i.substr(1)) || 0) *
                  (a ? (r < 0 ? l : n).totalDuration() / 100 : 1))
            : r < 0
            ? (i in o || (o[i] = d), o[i])
            : ((s = parseFloat(i.charAt(r - 1) + i.substr(r + 1))),
              a && n && (s = (s / 100) * (qe(n) ? n[0] : n).totalDuration()),
              r > 1 ? e(t, i.substr(0, r - 1), n) + s : d + s))
        : null == i
        ? d
        : +i;
    },
    ti = function (e, t, i) {
      var n,
        r,
        s = Be(t[1]),
        a = (s ? 2 : 1) + (e < 2 ? 0 : 1),
        o = t[a];
      if ((s && (o.duration = t[1]), (o.parent = i), e)) {
        for (n = o, r = i; r && !("immediateRender" in n); )
          (n = r.vars.defaults || {}), (r = Ne(r.vars.inherit) && r.parent);
        (o.immediateRender = Ne(n.immediateRender)),
          e < 2 ? (o.runBackwards = 1) : (o.startAt = t[a - 1]);
      }
      return new rn(t[0], o, t[a + 1]);
    },
    ii = function (e, t) {
      return e || 0 === e ? t(e) : t;
    },
    ni = function (e, t, i) {
      return i < e ? e : i > t ? t : i;
    },
    ri = function (e, t) {
      return ze(e) && (t = Qe.exec(e)) ? t[1] : "";
    },
    si = [].slice,
    ai = function (e, t) {
      return (
        e &&
        Re(e) &&
        "length" in e &&
        ((!t && !e.length) || (e.length - 1 in e && Re(e[0]))) &&
        !e.nodeType &&
        e !== _e
      );
    },
    oi = function (e, t, i) {
      return (
        void 0 === i && (i = []),
        e.forEach(function (e) {
          var n;
          return (ze(e) && !t) || ai(e, 1)
            ? (n = i).push.apply(n, li(e))
            : i.push(e);
        }) || i
      );
    },
    li = function (e, t, i) {
      return ge && !t && ge.selector
        ? ge.selector(e)
        : !ze(e) || i || (!be && $i())
        ? qe(e)
          ? oi(e, i)
          : ai(e)
          ? si.call(e, 0)
          : e
          ? [e]
          : []
        : si.call((t || ye).querySelectorAll(e), 0);
    },
    di = function (e) {
      return (
        (e = li(e)[0] || it("Invalid scope") || {}),
        function (t) {
          var i = e.current || e.nativeElement || e;
          return li(
            t,
            i.querySelectorAll
              ? i
              : i === e
              ? it("Invalid scope") || ye.createElement("div")
              : e
          );
        }
      );
    },
    ci = function (e) {
      return e.sort(function () {
        return 0.5 - Math.random();
      });
    },
    ui = function (e) {
      if (Ie(e)) return e;
      var t = Re(e) ? e : { each: e },
        i = Ri(t.ease),
        n = t.from || 0,
        r = parseFloat(t.base) || 0,
        s = {},
        a = n > 0 && n < 1,
        o = isNaN(n) || a,
        l = t.axis,
        d = n,
        c = n;
      return (
        ze(n)
          ? (d = c = { center: 0.5, edges: 0.5, end: 1 }[n] || 0)
          : !a && o && ((d = n[0]), (c = n[1])),
        function (e, a, u) {
          var p,
            h,
            f,
            m,
            g,
            v,
            _,
            b,
            y,
            w = (u || t).length,
            T = s[w];
          if (!T) {
            if (!(y = "auto" === t.grid ? 0 : (t.grid || [1, Me])[1])) {
              for (
                _ = -Me;
                _ < (_ = u[y++].getBoundingClientRect().left) && y < w;

              );
              y--;
            }
            for (
              T = s[w] = [],
                p = o ? Math.min(y, w) * d - 0.5 : n % y,
                h = y === Me ? 0 : o ? (w * c) / y - 0.5 : (n / y) | 0,
                _ = 0,
                b = Me,
                v = 0;
              v < w;
              v++
            )
              (f = (v % y) - p),
                (m = h - ((v / y) | 0)),
                (T[v] = g =
                  l ? Math.abs("y" === l ? m : f) : $e(f * f + m * m)),
                g > _ && (_ = g),
                g < b && (b = g);
            "random" === n && ci(T),
              (T.max = _ - b),
              (T.min = b),
              (T.v = w =
                (parseFloat(t.amount) ||
                  parseFloat(t.each) *
                    (y > w
                      ? w - 1
                      : l
                      ? "y" === l
                        ? w / y
                        : y
                      : Math.max(y, w / y)) ||
                  0) * ("edges" === n ? -1 : 1)),
              (T.b = w < 0 ? r - w : r),
              (T.u = ri(t.amount || t.each) || 0),
              (i = i && w < 0 ? Bi(i) : i);
          }
          return (
            (w = (T[e] - T.min) / T.max || 0),
            wt(T.b + (i ? i(w) : w) * T.v) + T.u
          );
        }
      );
    },
    pi = function (e) {
      var t = Math.pow(10, ((e + "").split(".")[1] || "").length);
      return function (i) {
        var n = wt(Math.round(parseFloat(i) / e) * e * t);
        return (n - (n % 1)) / t + (Be(i) ? 0 : ri(i));
      };
    },
    hi = function (e, t) {
      var i,
        n,
        r = qe(e);
      return (
        !r &&
          Re(e) &&
          ((i = r = e.radius || Me),
          e.values
            ? ((e = li(e.values)), (n = !Be(e[0])) && (i *= i))
            : (e = pi(e.increment))),
        ii(
          t,
          r
            ? Ie(e)
              ? function (t) {
                  return (n = e(t)), Math.abs(n - t) <= i ? n : t;
                }
              : function (t) {
                  for (
                    var r,
                      s,
                      a = parseFloat(n ? t.x : t),
                      o = parseFloat(n ? t.y : 0),
                      l = Me,
                      d = 0,
                      c = e.length;
                    c--;

                  )
                    (r = n
                      ? (r = e[c].x - a) * r + (s = e[c].y - o) * s
                      : Math.abs(e[c] - a)) < l && ((l = r), (d = c));
                  return (
                    (d = !i || l <= i ? e[d] : t),
                    n || d === t || Be(t) ? d : d + ri(t)
                  );
                }
            : pi(e)
        )
      );
    },
    fi = function (e, t, i, n) {
      return ii(qe(e) ? !t : !0 === i ? !!(i = 0) : !n, function () {
        return qe(e)
          ? e[~~(Math.random() * e.length)]
          : (i = i || 1e-5) &&
              (n = i < 1 ? Math.pow(10, (i + "").length - 2) : 1) &&
              Math.floor(
                Math.round(
                  (e - i / 2 + Math.random() * (t - e + 0.99 * i)) / i
                ) *
                  i *
                  n
              ) / n;
      });
    },
    mi = function (e, t, i) {
      return ii(i, function (i) {
        return e[~~t(i)];
      });
    },
    gi = function (e) {
      for (var t, i, n, r, s = 0, a = ""; ~(t = e.indexOf("random(", s)); )
        (n = e.indexOf(")", t)),
          (r = "[" === e.charAt(t + 7)),
          (i = e.substr(t + 7, n - t - 7).match(r ? Ke : Ve)),
          (a +=
            e.substr(s, t - s) +
            fi(r ? i : +i[0], r ? 0 : +i[1], +i[2] || 1e-5)),
          (s = n + 1);
      return a + e.substr(s, e.length - s);
    },
    vi = function (e, t, i, n, r) {
      var s = t - e,
        a = n - i;
      return ii(r, function (t) {
        return i + (((t - e) / s) * a || 0);
      });
    },
    _i = function (e, t, i) {
      var n,
        r,
        s,
        a = e.labels,
        o = Me;
      for (n in a)
        (r = a[n] - t) < 0 == !!i &&
          r &&
          o > (r = Math.abs(r)) &&
          ((s = n), (o = r));
      return s;
    },
    bi = function (e, t, i) {
      var n,
        r,
        s,
        a = e.vars,
        o = a[t],
        l = ge,
        d = e._ctx;
      if (o)
        return (
          (n = a[t + "Params"]),
          (r = a.callbackScope || e),
          i && dt.length && Ct(),
          d && (ge = d),
          (s = n ? o.apply(r, n) : o.call(r)),
          (ge = l),
          s
        );
    },
    yi = function (e) {
      return (
        zt(e),
        e.scrollTrigger && e.scrollTrigger.kill(!!me),
        e.progress() < 1 && bi(e, "onInterrupt"),
        e
      );
    },
    wi = function (e) {
      var t = (e = (!e.name && e.default) || e).name,
        i = Ie(e),
        n =
          t && !i && e.init
            ? function () {
                this._props = [];
              }
            : e,
        r = {
          init: rt,
          render: hn,
          add: Ki,
          kill: mn,
          modifier: fn,
          rawVars: 0,
        },
        s = { targetTest: 0, get: 0, getSetter: dn, aliases: {}, register: 0 };
      if (($i(), e !== n)) {
        if (ut[t]) return;
        kt(n, kt(Pt(e, r), s)),
          Ot(n.prototype, Ot(r, Pt(e, s))),
          (ut[(n.prop = t)] = n),
          e.targetTest && (ft.push(n), (lt[t] = 1)),
          (t =
            ("css" === t ? "CSS" : t.charAt(0).toUpperCase() + t.substr(1)) +
            "Plugin");
      }
      nt(t, n), e.register && e.register(An, n, _n);
    },
    Ti = 255,
    xi = {
      aqua: [0, Ti, Ti],
      lime: [0, Ti, 0],
      silver: [192, 192, 192],
      black: [0, 0, 0],
      maroon: [128, 0, 0],
      teal: [0, 128, 128],
      blue: [0, 0, Ti],
      navy: [0, 0, 128],
      white: [Ti, Ti, Ti],
      olive: [128, 128, 0],
      yellow: [Ti, Ti, 0],
      orange: [Ti, 165, 0],
      gray: [128, 128, 128],
      purple: [128, 0, 128],
      green: [0, 128, 0],
      red: [Ti, 0, 0],
      pink: [Ti, 192, 203],
      cyan: [0, Ti, Ti],
      transparent: [Ti, Ti, Ti, 0],
    },
    Ci = function (e, t, i) {
      return (
        ((6 * (e += e < 0 ? 1 : e > 1 ? -1 : 0) < 1
          ? t + (i - t) * e * 6
          : e < 0.5
          ? i
          : 3 * e < 2
          ? t + (i - t) * (2 / 3 - e) * 6
          : t) *
          Ti +
          0.5) |
        0
      );
    },
    Si = function (e, t, i) {
      var n,
        r,
        s,
        a,
        o,
        l,
        d,
        c,
        u,
        p,
        h = e ? (Be(e) ? [e >> 16, (e >> 8) & Ti, e & Ti] : 0) : xi.black;
      if (!h) {
        if (("," === e.substr(-1) && (e = e.substr(0, e.length - 1)), xi[e]))
          h = xi[e];
        else if ("#" === e.charAt(0)) {
          if (
            (e.length < 6 &&
              ((n = e.charAt(1)),
              (r = e.charAt(2)),
              (s = e.charAt(3)),
              (e =
                "#" +
                n +
                n +
                r +
                r +
                s +
                s +
                (5 === e.length ? e.charAt(4) + e.charAt(4) : ""))),
            9 === e.length)
          )
            return [
              (h = parseInt(e.substr(1, 6), 16)) >> 16,
              (h >> 8) & Ti,
              h & Ti,
              parseInt(e.substr(7), 16) / 255,
            ];
          h = [(e = parseInt(e.substr(1), 16)) >> 16, (e >> 8) & Ti, e & Ti];
        } else if ("hsl" === e.substr(0, 3))
          if (((h = p = e.match(Ve)), t)) {
            if (~e.indexOf("="))
              return (h = e.match(Xe)), i && h.length < 4 && (h[3] = 1), h;
          } else
            (a = (+h[0] % 360) / 360),
              (o = +h[1] / 100),
              (n =
                2 * (l = +h[2] / 100) -
                (r = l <= 0.5 ? l * (o + 1) : l + o - l * o)),
              h.length > 3 && (h[3] *= 1),
              (h[0] = Ci(a + 1 / 3, n, r)),
              (h[1] = Ci(a, n, r)),
              (h[2] = Ci(a - 1 / 3, n, r));
        else h = e.match(Ve) || xi.transparent;
        h = h.map(Number);
      }
      return (
        t &&
          !p &&
          ((n = h[0] / Ti),
          (r = h[1] / Ti),
          (s = h[2] / Ti),
          (l = ((d = Math.max(n, r, s)) + (c = Math.min(n, r, s))) / 2),
          d === c
            ? (a = o = 0)
            : ((u = d - c),
              (o = l > 0.5 ? u / (2 - d - c) : u / (d + c)),
              (a =
                d === n
                  ? (r - s) / u + (r < s ? 6 : 0)
                  : d === r
                  ? (s - n) / u + 2
                  : (n - r) / u + 4),
              (a *= 60)),
          (h[0] = ~~(a + 0.5)),
          (h[1] = ~~(100 * o + 0.5)),
          (h[2] = ~~(100 * l + 0.5))),
        i && h.length < 4 && (h[3] = 1),
        h
      );
    },
    Ei = function (e) {
      var t = [],
        i = [],
        n = -1;
      return (
        e.split(ki).forEach(function (e) {
          var r = e.match(Ye) || [];
          t.push.apply(t, r), i.push((n += r.length + 1));
        }),
        (t.c = i),
        t
      );
    },
    Mi = function (e, t, i) {
      var n,
        r,
        s,
        a,
        o = "",
        l = (e + o).match(ki),
        d = t ? "hsla(" : "rgba(",
        c = 0;
      if (!l) return e;
      if (
        ((l = l.map(function (e) {
          return (
            (e = Si(e, t, 1)) &&
            d +
              (t
                ? e[0] + "," + e[1] + "%," + e[2] + "%," + e[3]
                : e.join(",")) +
              ")"
          );
        })),
        i && ((s = Ei(e)), (n = i.c).join(o) !== s.c.join(o)))
      )
        for (a = (r = e.replace(ki, "1").split(Ye)).length - 1; c < a; c++)
          o +=
            r[c] +
            (~n.indexOf(c)
              ? l.shift() || d + "0,0,0,0)"
              : (s.length ? s : l.length ? l : i).shift());
      if (!r)
        for (a = (r = e.split(ki)).length - 1; c < a; c++) o += r[c] + l[c];
      return o + r[a];
    },
    ki = (function () {
      var e,
        t =
          "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
      for (e in xi) t += "|" + e + "\\b";
      return new RegExp(t + ")", "gi");
    })(),
    Oi = /hsl[a]?\(/,
    Ai = function (e) {
      var t,
        i = e.join(" ");
      if (((ki.lastIndex = 0), ki.test(i)))
        return (
          (t = Oi.test(i)),
          (e[1] = Mi(e[1], t)),
          (e[0] = Mi(e[0], t, Ei(e[1]))),
          !0
        );
    },
    Pi = (function () {
      var e,
        t,
        i,
        n,
        r,
        s,
        a = Date.now,
        o = 500,
        l = 33,
        d = a(),
        c = d,
        u = 1e3 / 240,
        p = u,
        h = [],
        f = function i(f) {
          var m,
            g,
            v,
            _,
            b = a() - c,
            y = !0 === f;
          if (
            (b > o && (d += b - l),
            ((m = (v = (c += b) - d) - p) > 0 || y) &&
              ((_ = ++n.frame),
              (r = v - 1e3 * n.time),
              (n.time = v /= 1e3),
              (p += m + (m >= u ? 4 : u - m)),
              (g = 1)),
            y || (e = t(i)),
            g)
          )
            for (s = 0; s < h.length; s++) h[s](v, r, _, f);
        };
      return (
        (n = {
          time: 0,
          frame: 0,
          tick: function () {
            f(!0);
          },
          deltaRatio: function (e) {
            return r / (1e3 / (e || 60));
          },
          wake: function () {
            we &&
              (!be &&
                Ge() &&
                ((_e = be = window),
                (ye = _e.document || {}),
                (Ze.gsap = An),
                (_e.gsapVersions || (_e.gsapVersions = [])).push(An.version),
                et(Je || _e.GreenSockGlobals || (!_e.gsap && _e) || {}),
                (i = _e.requestAnimationFrame)),
              e && n.sleep(),
              (t =
                i ||
                function (e) {
                  return setTimeout(e, (p - 1e3 * n.time + 1) | 0);
                }),
              (Ce = 1),
              f(2));
          },
          sleep: function () {
            (i ? _e.cancelAnimationFrame : clearTimeout)(e), (Ce = 0), (t = rt);
          },
          lagSmoothing: function (e, t) {
            (o = e || 1e8), (l = Math.min(t, o, 0));
          },
          fps: function (e) {
            (u = 1e3 / (e || 240)), (p = 1e3 * n.time + u);
          },
          add: function (e, t, i) {
            var r = t
              ? function (t, i, s, a) {
                  e(t, i, s, a), n.remove(r);
                }
              : e;
            return n.remove(e), h[i ? "unshift" : "push"](r), $i(), r;
          },
          remove: function (e, t) {
            ~(t = h.indexOf(e)) && h.splice(t, 1) && s >= t && s--;
          },
          _listeners: h,
        }),
        n
      );
    })(),
    $i = function () {
      return !Ce && Pi.wake();
    },
    Li = {},
    Di = /^[\d.\-M][\d.\-,\s]/,
    zi = /["']/g,
    Ii = function (e) {
      for (
        var t,
          i,
          n,
          r = {},
          s = e.substr(1, e.length - 3).split(":"),
          a = s[0],
          o = 1,
          l = s.length;
        o < l;
        o++
      )
        (i = s[o]),
          (t = o !== l - 1 ? i.lastIndexOf(",") : i.length),
          (n = i.substr(0, t)),
          (r[a] = isNaN(n) ? n.replace(zi, "").trim() : +n),
          (a = i.substr(t + 1).trim());
      return r;
    },
    Bi = function (e) {
      return function (t) {
        return 1 - e(1 - t);
      };
    },
    Fi = function e(t, i) {
      for (var n, r = t._first; r; )
        r instanceof Xi
          ? e(r, i)
          : !r.vars.yoyoEase ||
            (r._yoyo && r._repeat) ||
            r._yoyo === i ||
            (r.timeline
              ? e(r.timeline, i)
              : ((n = r._ease),
                (r._ease = r._yEase),
                (r._yEase = n),
                (r._yoyo = i))),
          (r = r._next);
    },
    Ri = function (e, t) {
      return (
        (e &&
          (Ie(e)
            ? e
            : Li[e] ||
              (function (e) {
                var t = (e + "").split("("),
                  i = Li[t[0]];
                return i && t.length > 1 && i.config
                  ? i.config.apply(
                      null,
                      ~e.indexOf("{")
                        ? [Ii(t[1])]
                        : (function (e) {
                            var t = e.indexOf("(") + 1,
                              i = e.indexOf(")"),
                              n = e.indexOf("(", t);
                            return e.substring(
                              t,
                              ~n && n < i ? e.indexOf(")", i + 1) : i
                            );
                          })(e)
                            .split(",")
                            .map(Et)
                    )
                  : Li._CE && Di.test(e)
                  ? Li._CE("", e)
                  : i;
              })(e))) ||
        t
      );
    },
    Ni = function (e, t, i, n) {
      void 0 === i &&
        (i = function (e) {
          return 1 - t(1 - e);
        }),
        void 0 === n &&
          (n = function (e) {
            return e < 0.5 ? t(2 * e) / 2 : 1 - t(2 * (1 - e)) / 2;
          });
      var r,
        s = { easeIn: t, easeOut: i, easeInOut: n };
      return (
        bt(e, function (e) {
          for (var t in ((Li[e] = Ze[e] = s),
          (Li[(r = e.toLowerCase())] = i),
          s))
            Li[
              r + ("easeIn" === t ? ".in" : "easeOut" === t ? ".out" : ".inOut")
            ] = Li[e + "." + t] = s[t];
        }),
        s
      );
    },
    Gi = function (e) {
      return function (t) {
        return t < 0.5 ? (1 - e(1 - 2 * t)) / 2 : 0.5 + e(2 * (t - 0.5)) / 2;
      };
    },
    ji = function e(t, i, n) {
      var r = i >= 1 ? i : 1,
        s = (n || (t ? 0.3 : 0.45)) / (i < 1 ? i : 1),
        a = (s / Oe) * (Math.asin(1 / r) || 0),
        o = function (e) {
          return 1 === e ? 1 : r * Math.pow(2, -10 * e) * De((e - a) * s) + 1;
        },
        l =
          "out" === t
            ? o
            : "in" === t
            ? function (e) {
                return 1 - o(1 - e);
              }
            : Gi(o);
      return (
        (s = Oe / s),
        (l.config = function (i, n) {
          return e(t, i, n);
        }),
        l
      );
    },
    Hi = function e(t, i) {
      void 0 === i && (i = 1.70158);
      var n = function (e) {
          return e ? --e * e * ((i + 1) * e + i) + 1 : 0;
        },
        r =
          "out" === t
            ? n
            : "in" === t
            ? function (e) {
                return 1 - n(1 - e);
              }
            : Gi(n);
      return (
        (r.config = function (i) {
          return e(t, i);
        }),
        r
      );
    };
  bt("Linear,Quad,Cubic,Quart,Quint,Strong", function (e, t) {
    var i = t < 5 ? t + 1 : t;
    Ni(
      e + ",Power" + (i - 1),
      t
        ? function (e) {
            return Math.pow(e, i);
          }
        : function (e) {
            return e;
          },
      function (e) {
        return 1 - Math.pow(1 - e, i);
      },
      function (e) {
        return e < 0.5
          ? Math.pow(2 * e, i) / 2
          : 1 - Math.pow(2 * (1 - e), i) / 2;
      }
    );
  }),
    (Li.Linear.easeNone = Li.none = Li.Linear.easeIn),
    Ni("Elastic", ji("in"), ji("out"), ji()),
    (function (e, t) {
      var i = 1 / t,
        n = function (n) {
          return n < i
            ? e * n * n
            : n < 0.7272727272727273
            ? e * Math.pow(n - 1.5 / t, 2) + 0.75
            : n < 0.9090909090909092
            ? e * (n -= 2.25 / t) * n + 0.9375
            : e * Math.pow(n - 2.625 / t, 2) + 0.984375;
        };
      Ni(
        "Bounce",
        function (e) {
          return 1 - n(1 - e);
        },
        n
      );
    })(7.5625, 2.75),
    Ni("Expo", function (e) {
      return e ? Math.pow(2, 10 * (e - 1)) : 0;
    }),
    Ni("Circ", function (e) {
      return -($e(1 - e * e) - 1);
    }),
    Ni("Sine", function (e) {
      return 1 === e ? 1 : 1 - Le(e * Ae);
    }),
    Ni("Back", Hi("in"), Hi("out"), Hi()),
    (Li.SteppedEase =
      Li.steps =
      Ze.SteppedEase =
        {
          config: function (e, t) {
            void 0 === e && (e = 1);
            var i = 1 / e,
              n = e + (t ? 0 : 1),
              r = t ? 1 : 0;
            return function (e) {
              return (((n * ni(0, 0.99999999, e)) | 0) + r) * i;
            };
          },
        }),
    (Ee.ease = Li["quad.out"]),
    bt(
      "onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",
      function (e) {
        return (mt += e + "," + e + "Params,");
      }
    );
  var qi = function (e, t) {
      (this.id = Pe++),
        (e._gsap = this),
        (this.target = e),
        (this.harness = t),
        (this.get = t ? t.get : _t),
        (this.set = t ? t.getSetter : dn);
    },
    Vi = (function () {
      function e(e) {
        (this.vars = e),
          (this._delay = +e.delay || 0),
          (this._repeat = e.repeat === 1 / 0 ? -2 : e.repeat || 0) &&
            ((this._rDelay = e.repeatDelay || 0),
            (this._yoyo = !!e.yoyo || !!e.yoyoEase)),
          (this._ts = 1),
          Qt(this, +e.duration, 1, 1),
          (this.data = e.data),
          ge && ((this._ctx = ge), ge.data.push(this)),
          Ce || Pi.wake();
      }
      var t = e.prototype;
      return (
        (t.delay = function (e) {
          return e || 0 === e
            ? (this.parent &&
                this.parent.smoothChildTiming &&
                this.startTime(this._start + e - this._delay),
              (this._delay = e),
              this)
            : this._delay;
        }),
        (t.duration = function (e) {
          return arguments.length
            ? this.totalDuration(
                this._repeat > 0 ? e + (e + this._rDelay) * this._repeat : e
              )
            : this.totalDuration() && this._dur;
        }),
        (t.totalDuration = function (e) {
          return arguments.length
            ? ((this._dirty = 0),
              Qt(
                this,
                this._repeat < 0
                  ? e
                  : (e - this._repeat * this._rDelay) / (this._repeat + 1)
              ))
            : this._tDur;
        }),
        (t.totalTime = function (e, t) {
          if (($i(), !arguments.length)) return this._tTime;
          var i = this._dp;
          if (i && i.smoothChildTiming && this._ts) {
            for (
              qt(this, e), !i._dp || i.parent || Vt(i, this);
              i && i.parent;

            )
              i.parent._time !==
                i._start +
                  (i._ts >= 0
                    ? i._tTime / i._ts
                    : (i.totalDuration() - i._tTime) / -i._ts) &&
                i.totalTime(i._tTime, !0),
                (i = i.parent);
            !this.parent &&
              this._dp.autoRemoveChildren &&
              ((this._ts > 0 && e < this._tDur) ||
                (this._ts < 0 && e > 0) ||
                (!this._tDur && !e)) &&
              Xt(this._dp, this, this._start - this._delay);
          }
          return (
            (this._tTime !== e ||
              (!this._dur && !t) ||
              (this._initted && Math.abs(this._zTime) === ke) ||
              (!e && !this._initted && (this.add || this._ptLookup))) &&
              (this._ts || (this._pTime = e), St(this, e, t)),
            this
          );
        }),
        (t.time = function (e, t) {
          return arguments.length
            ? this.totalTime(
                Math.min(this.totalDuration(), e + Nt(this)) %
                  (this._dur + this._rDelay) || (e ? this._dur : 0),
                t
              )
            : this._time;
        }),
        (t.totalProgress = function (e, t) {
          return arguments.length
            ? this.totalTime(this.totalDuration() * e, t)
            : this.totalDuration()
            ? Math.min(1, this._tTime / this._tDur)
            : this.ratio;
        }),
        (t.progress = function (e, t) {
          return arguments.length
            ? this.totalTime(
                this.duration() *
                  (!this._yoyo || 1 & this.iteration() ? e : 1 - e) +
                  Nt(this),
                t
              )
            : this.duration()
            ? Math.min(1, this._time / this._dur)
            : this.ratio;
        }),
        (t.iteration = function (e, t) {
          var i = this.duration() + this._rDelay;
          return arguments.length
            ? this.totalTime(this._time + (e - 1) * i, t)
            : this._repeat
            ? Gt(this._tTime, i) + 1
            : 1;
        }),
        (t.timeScale = function (e) {
          if (!arguments.length) return -1e-8 === this._rts ? 0 : this._rts;
          if (this._rts === e) return this;
          var t =
            this.parent && this._ts ? jt(this.parent._time, this) : this._tTime;
          return (
            (this._rts = +e || 0),
            (this._ts = this._ps || -1e-8 === e ? 0 : this._rts),
            this.totalTime(ni(-this._delay, this._tDur, t), !0),
            Ht(this),
            Bt(this)
          );
        }),
        (t.paused = function (e) {
          return arguments.length
            ? (this._ps !== e &&
                ((this._ps = e),
                e
                  ? ((this._pTime =
                      this._tTime || Math.max(-this._delay, this.rawTime())),
                    (this._ts = this._act = 0))
                  : ($i(),
                    (this._ts = this._rts),
                    this.totalTime(
                      this.parent && !this.parent.smoothChildTiming
                        ? this.rawTime()
                        : this._tTime || this._pTime,
                      1 === this.progress() &&
                        Math.abs(this._zTime) !== ke &&
                        (this._tTime -= ke)
                    ))),
              this)
            : this._ps;
        }),
        (t.startTime = function (e) {
          if (arguments.length) {
            this._start = e;
            var t = this.parent || this._dp;
            return (
              t && (t._sort || !this.parent) && Xt(t, this, e - this._delay),
              this
            );
          }
          return this._start;
        }),
        (t.endTime = function (e) {
          return (
            this._start +
            (Ne(e) ? this.totalDuration() : this.duration()) /
              Math.abs(this._ts || 1)
          );
        }),
        (t.rawTime = function (e) {
          var t = this.parent || this._dp;
          return t
            ? e &&
              (!this._ts ||
                (this._repeat && this._time && this.totalProgress() < 1))
              ? this._tTime % (this._dur + this._rDelay)
              : this._ts
              ? jt(t.rawTime(e), this)
              : this._tTime
            : this._tTime;
        }),
        (t.revert = function (e) {
          void 0 === e && (e = ot);
          var t = me;
          return (
            (me = e),
            (this._initted || this._startAt) &&
              (this.timeline && this.timeline.revert(e),
              this.totalTime(-0.01, e.suppressEvents)),
            "nested" !== this.data && !1 !== e.kill && this.kill(),
            (me = t),
            this
          );
        }),
        (t.globalTime = function (e) {
          for (var t = this, i = arguments.length ? e : t.rawTime(); t; )
            (i = t._start + i / (t._ts || 1)), (t = t._dp);
          return !this.parent && this.vars.immediateRender ? -1 : i;
        }),
        (t.repeat = function (e) {
          return arguments.length
            ? ((this._repeat = e === 1 / 0 ? -2 : e), Zt(this))
            : -2 === this._repeat
            ? 1 / 0
            : this._repeat;
        }),
        (t.repeatDelay = function (e) {
          if (arguments.length) {
            var t = this._time;
            return (this._rDelay = e), Zt(this), t ? this.time(t) : this;
          }
          return this._rDelay;
        }),
        (t.yoyo = function (e) {
          return arguments.length ? ((this._yoyo = e), this) : this._yoyo;
        }),
        (t.seek = function (e, t) {
          return this.totalTime(ei(this, e), Ne(t));
        }),
        (t.restart = function (e, t) {
          return this.play().totalTime(e ? -this._delay : 0, Ne(t));
        }),
        (t.play = function (e, t) {
          return null != e && this.seek(e, t), this.reversed(!1).paused(!1);
        }),
        (t.reverse = function (e, t) {
          return (
            null != e && this.seek(e || this.totalDuration(), t),
            this.reversed(!0).paused(!1)
          );
        }),
        (t.pause = function (e, t) {
          return null != e && this.seek(e, t), this.paused(!0);
        }),
        (t.resume = function () {
          return this.paused(!1);
        }),
        (t.reversed = function (e) {
          return arguments.length
            ? (!!e !== this.reversed() &&
                this.timeScale(-this._rts || (e ? -1e-8 : 0)),
              this)
            : this._rts < 0;
        }),
        (t.invalidate = function () {
          return (this._initted = this._act = 0), (this._zTime = -1e-8), this;
        }),
        (t.isActive = function () {
          var e,
            t = this.parent || this._dp,
            i = this._start;
          return !(
            t &&
            !(
              this._ts &&
              this._initted &&
              t.isActive() &&
              (e = t.rawTime(!0)) >= i &&
              e < this.endTime(!0) - ke
            )
          );
        }),
        (t.eventCallback = function (e, t, i) {
          var n = this.vars;
          return arguments.length > 1
            ? (t
                ? ((n[e] = t),
                  i && (n[e + "Params"] = i),
                  "onUpdate" === e && (this._onUpdate = t))
                : delete n[e],
              this)
            : n[e];
        }),
        (t.then = function (e) {
          var t = this;
          return new Promise(function (i) {
            var n = Ie(e) ? e : Mt,
              r = function () {
                var e = t.then;
                (t.then = null),
                  Ie(n) && (n = n(t)) && (n.then || n === t) && (t.then = e),
                  i(n),
                  (t.then = e);
              };
            (t._initted && 1 === t.totalProgress() && t._ts >= 0) ||
            (!t._tTime && t._ts < 0)
              ? r()
              : (t._prom = r);
          });
        }),
        (t.kill = function () {
          yi(this);
        }),
        e
      );
    })();
  kt(Vi.prototype, {
    _time: 0,
    _start: 0,
    _end: 0,
    _tTime: 0,
    _tDur: 0,
    _dirty: 0,
    _repeat: 0,
    _yoyo: !1,
    parent: null,
    _initted: !1,
    _rDelay: 0,
    _ts: 1,
    _dp: 0,
    ratio: 0,
    _zTime: -1e-8,
    _prom: 0,
    _ps: !1,
    _rts: 1,
  });
  var Xi = (function (e) {
    function t(t, i) {
      var n;
      return (
        void 0 === t && (t = {}),
        ((n = e.call(this, t) || this).labels = {}),
        (n.smoothChildTiming = !!t.smoothChildTiming),
        (n.autoRemoveChildren = !!t.autoRemoveChildren),
        (n._sort = Ne(t.sortChildren)),
        ve && Xt(t.parent || ve, pe(n), i),
        t.reversed && n.reverse(),
        t.paused && n.paused(!0),
        t.scrollTrigger && Yt(pe(n), t.scrollTrigger),
        n
      );
    }
    he(t, e);
    var i = t.prototype;
    return (
      (i.to = function (e, t, i) {
        return ti(0, arguments, this), this;
      }),
      (i.from = function (e, t, i) {
        return ti(1, arguments, this), this;
      }),
      (i.fromTo = function (e, t, i, n) {
        return ti(2, arguments, this), this;
      }),
      (i.set = function (e, t, i) {
        return (
          (t.duration = 0),
          (t.parent = this),
          $t(t).repeatDelay || (t.repeat = 0),
          (t.immediateRender = !!t.immediateRender),
          new rn(e, t, ei(this, i), 1),
          this
        );
      }),
      (i.call = function (e, t, i) {
        return Xt(this, rn.delayedCall(0, e, t), i);
      }),
      (i.staggerTo = function (e, t, i, n, r, s, a) {
        return (
          (i.duration = t),
          (i.stagger = i.stagger || n),
          (i.onComplete = s),
          (i.onCompleteParams = a),
          (i.parent = this),
          new rn(e, i, ei(this, r)),
          this
        );
      }),
      (i.staggerFrom = function (e, t, i, n, r, s, a) {
        return (
          (i.runBackwards = 1),
          ($t(i).immediateRender = Ne(i.immediateRender)),
          this.staggerTo(e, t, i, n, r, s, a)
        );
      }),
      (i.staggerFromTo = function (e, t, i, n, r, s, a, o) {
        return (
          (n.startAt = i),
          ($t(n).immediateRender = Ne(n.immediateRender)),
          this.staggerTo(e, t, n, r, s, a, o)
        );
      }),
      (i.render = function (e, t, i) {
        var n,
          r,
          s,
          a,
          o,
          l,
          d,
          c,
          u,
          p,
          h,
          f,
          m = this._time,
          g = this._dirty ? this.totalDuration() : this._tDur,
          v = this._dur,
          _ = e <= 0 ? 0 : wt(e),
          b = this._zTime < 0 != e < 0 && (this._initted || !v);
        if (
          (this !== ve && _ > g && e >= 0 && (_ = g),
          _ !== this._tTime || i || b)
        ) {
          if (
            (m !== this._time &&
              v &&
              ((_ += this._time - m), (e += this._time - m)),
            (n = _),
            (u = this._start),
            (l = !(c = this._ts)),
            b && (v || (m = this._zTime), (e || !t) && (this._zTime = e)),
            this._repeat)
          ) {
            if (
              ((h = this._yoyo),
              (o = v + this._rDelay),
              this._repeat < -1 && e < 0)
            )
              return this.totalTime(100 * o + e, t, i);
            if (
              ((n = wt(_ % o)),
              _ === g
                ? ((a = this._repeat), (n = v))
                : ((a = ~~(_ / o)) && a === _ / o && ((n = v), a--),
                  n > v && (n = v)),
              (p = Gt(this._tTime, o)),
              !m && this._tTime && p !== a && (p = a),
              h && 1 & a && ((n = v - n), (f = 1)),
              a !== p && !this._lock)
            ) {
              var y = h && 1 & p,
                w = y === (h && 1 & a);
              if (
                (a < p && (y = !y),
                (m = y ? 0 : v),
                (this._lock = 1),
                (this.render(m || (f ? 0 : wt(a * o)), t, !v)._lock = 0),
                (this._tTime = _),
                !t && this.parent && bi(this, "onRepeat"),
                this.vars.repeatRefresh && !f && (this.invalidate()._lock = 1),
                (m && m !== this._time) ||
                  l !== !this._ts ||
                  (this.vars.onRepeat && !this.parent && !this._act))
              )
                return this;
              if (
                ((v = this._dur),
                (g = this._tDur),
                w &&
                  ((this._lock = 2),
                  (m = y ? v : -1e-4),
                  this.render(m, !0),
                  this.vars.repeatRefresh && !f && this.invalidate()),
                (this._lock = 0),
                !this._ts && !l)
              )
                return this;
              Fi(this, f);
            }
          }
          if (
            (this._hasPause &&
              !this._forcing &&
              this._lock < 2 &&
              ((d = (function (e, t, i) {
                var n;
                if (i > t)
                  for (n = e._first; n && n._start <= i; ) {
                    if ("isPause" === n.data && n._start > t) return n;
                    n = n._next;
                  }
                else
                  for (n = e._last; n && n._start >= i; ) {
                    if ("isPause" === n.data && n._start < t) return n;
                    n = n._prev;
                  }
              })(this, wt(m), wt(n))),
              d && (_ -= n - (n = d._start))),
            (this._tTime = _),
            (this._time = n),
            (this._act = !c),
            this._initted ||
              ((this._onUpdate = this.vars.onUpdate),
              (this._initted = 1),
              (this._zTime = e),
              (m = 0)),
            !m && n && !t && (bi(this, "onStart"), this._tTime !== _))
          )
            return this;
          if (n >= m && e >= 0)
            for (r = this._first; r; ) {
              if (
                ((s = r._next), (r._act || n >= r._start) && r._ts && d !== r)
              ) {
                if (r.parent !== this) return this.render(e, t, i);
                if (
                  (r.render(
                    r._ts > 0
                      ? (n - r._start) * r._ts
                      : (r._dirty ? r.totalDuration() : r._tDur) +
                          (n - r._start) * r._ts,
                    t,
                    i
                  ),
                  n !== this._time || (!this._ts && !l))
                ) {
                  (d = 0), s && (_ += this._zTime = -1e-8);
                  break;
                }
              }
              r = s;
            }
          else {
            r = this._last;
            for (var T = e < 0 ? e : n; r; ) {
              if (
                ((s = r._prev), (r._act || T <= r._end) && r._ts && d !== r)
              ) {
                if (r.parent !== this) return this.render(e, t, i);
                if (
                  (r.render(
                    r._ts > 0
                      ? (T - r._start) * r._ts
                      : (r._dirty ? r.totalDuration() : r._tDur) +
                          (T - r._start) * r._ts,
                    t,
                    i || (me && (r._initted || r._startAt))
                  ),
                  n !== this._time || (!this._ts && !l))
                ) {
                  (d = 0), s && (_ += this._zTime = T ? -1e-8 : ke);
                  break;
                }
              }
              r = s;
            }
          }
          if (
            d &&
            !t &&
            (this.pause(),
            (d.render(n >= m ? 0 : -1e-8)._zTime = n >= m ? 1 : -1),
            this._ts)
          )
            return (this._start = u), Ht(this), this.render(e, t, i);
          this._onUpdate && !t && bi(this, "onUpdate", !0),
            ((_ === g && this._tTime >= this.totalDuration()) || (!_ && m)) &&
              ((u !== this._start && Math.abs(c) === Math.abs(this._ts)) ||
                this._lock ||
                ((e || !v) &&
                  ((_ === g && this._ts > 0) || (!_ && this._ts < 0)) &&
                  zt(this, 1),
                t ||
                  (e < 0 && !m) ||
                  (!_ && !m && g) ||
                  (bi(
                    this,
                    _ === g && e >= 0 ? "onComplete" : "onReverseComplete",
                    !0
                  ),
                  this._prom &&
                    !(_ < g && this.timeScale() > 0) &&
                    this._prom())));
        }
        return this;
      }),
      (i.add = function (e, t) {
        var i = this;
        if ((Be(t) || (t = ei(this, t, e)), !(e instanceof Vi))) {
          if (qe(e))
            return (
              e.forEach(function (e) {
                return i.add(e, t);
              }),
              this
            );
          if (ze(e)) return this.addLabel(e, t);
          if (!Ie(e)) return this;
          e = rn.delayedCall(0, e);
        }
        return this !== e ? Xt(this, e, t) : this;
      }),
      (i.getChildren = function (e, t, i, n) {
        void 0 === e && (e = !0),
          void 0 === t && (t = !0),
          void 0 === i && (i = !0),
          void 0 === n && (n = -Me);
        for (var r = [], s = this._first; s; )
          s._start >= n &&
            (s instanceof rn
              ? t && r.push(s)
              : (i && r.push(s),
                e && r.push.apply(r, s.getChildren(!0, t, i)))),
            (s = s._next);
        return r;
      }),
      (i.getById = function (e) {
        for (var t = this.getChildren(1, 1, 1), i = t.length; i--; )
          if (t[i].vars.id === e) return t[i];
      }),
      (i.remove = function (e) {
        return ze(e)
          ? this.removeLabel(e)
          : Ie(e)
          ? this.killTweensOf(e)
          : (Dt(this, e),
            e === this._recent && (this._recent = this._last),
            It(this));
      }),
      (i.totalTime = function (t, i) {
        return arguments.length
          ? ((this._forcing = 1),
            !this._dp &&
              this._ts &&
              (this._start = wt(
                Pi.time -
                  (this._ts > 0
                    ? t / this._ts
                    : (this.totalDuration() - t) / -this._ts)
              )),
            e.prototype.totalTime.call(this, t, i),
            (this._forcing = 0),
            this)
          : this._tTime;
      }),
      (i.addLabel = function (e, t) {
        return (this.labels[e] = ei(this, t)), this;
      }),
      (i.removeLabel = function (e) {
        return delete this.labels[e], this;
      }),
      (i.addPause = function (e, t, i) {
        var n = rn.delayedCall(0, t || rt, i);
        return (
          (n.data = "isPause"), (this._hasPause = 1), Xt(this, n, ei(this, e))
        );
      }),
      (i.removePause = function (e) {
        var t = this._first;
        for (e = ei(this, e); t; )
          t._start === e && "isPause" === t.data && zt(t), (t = t._next);
      }),
      (i.killTweensOf = function (e, t, i) {
        for (var n = this.getTweensOf(e, i), r = n.length; r--; )
          Yi !== n[r] && n[r].kill(e, t);
        return this;
      }),
      (i.getTweensOf = function (e, t) {
        for (var i, n = [], r = li(e), s = this._first, a = Be(t); s; )
          s instanceof rn
            ? xt(s._targets, r) &&
              (a
                ? (!Yi || (s._initted && s._ts)) &&
                  s.globalTime(0) <= t &&
                  s.globalTime(s.totalDuration()) > t
                : !t || s.isActive()) &&
              n.push(s)
            : (i = s.getTweensOf(r, t)).length && n.push.apply(n, i),
            (s = s._next);
        return n;
      }),
      (i.tweenTo = function (e, t) {
        t = t || {};
        var i,
          n = this,
          r = ei(n, e),
          s = t,
          a = s.startAt,
          o = s.onStart,
          l = s.onStartParams,
          d = s.immediateRender,
          c = rn.to(
            n,
            kt(
              {
                ease: t.ease || "none",
                lazy: !1,
                immediateRender: !1,
                time: r,
                overwrite: "auto",
                duration:
                  t.duration ||
                  Math.abs(
                    (r - (a && "time" in a ? a.time : n._time)) / n.timeScale()
                  ) ||
                  ke,
                onStart: function () {
                  if ((n.pause(), !i)) {
                    var e =
                      t.duration ||
                      Math.abs(
                        (r - (a && "time" in a ? a.time : n._time)) /
                          n.timeScale()
                      );
                    c._dur !== e && Qt(c, e, 0, 1).render(c._time, !0, !0),
                      (i = 1);
                  }
                  o && o.apply(c, l || []);
                },
              },
              t
            )
          );
        return d ? c.render(0) : c;
      }),
      (i.tweenFromTo = function (e, t, i) {
        return this.tweenTo(t, kt({ startAt: { time: ei(this, e) } }, i));
      }),
      (i.recent = function () {
        return this._recent;
      }),
      (i.nextLabel = function (e) {
        return void 0 === e && (e = this._time), _i(this, ei(this, e));
      }),
      (i.previousLabel = function (e) {
        return void 0 === e && (e = this._time), _i(this, ei(this, e), 1);
      }),
      (i.currentLabel = function (e) {
        return arguments.length
          ? this.seek(e, !0)
          : this.previousLabel(this._time + ke);
      }),
      (i.shiftChildren = function (e, t, i) {
        void 0 === i && (i = 0);
        for (var n, r = this._first, s = this.labels; r; )
          r._start >= i && ((r._start += e), (r._end += e)), (r = r._next);
        if (t) for (n in s) s[n] >= i && (s[n] += e);
        return It(this);
      }),
      (i.invalidate = function (t) {
        var i = this._first;
        for (this._lock = 0; i; ) i.invalidate(t), (i = i._next);
        return e.prototype.invalidate.call(this, t);
      }),
      (i.clear = function (e) {
        void 0 === e && (e = !0);
        for (var t, i = this._first; i; )
          (t = i._next), this.remove(i), (i = t);
        return (
          this._dp && (this._time = this._tTime = this._pTime = 0),
          e && (this.labels = {}),
          It(this)
        );
      }),
      (i.totalDuration = function (e) {
        var t,
          i,
          n,
          r = 0,
          s = this,
          a = s._last,
          o = Me;
        if (arguments.length)
          return s.timeScale(
            (s._repeat < 0 ? s.duration() : s.totalDuration()) /
              (s.reversed() ? -e : e)
          );
        if (s._dirty) {
          for (n = s.parent; a; )
            (t = a._prev),
              a._dirty && a.totalDuration(),
              (i = a._start) > o && s._sort && a._ts && !s._lock
                ? ((s._lock = 1), (Xt(s, a, i - a._delay, 1)._lock = 0))
                : (o = i),
              i < 0 &&
                a._ts &&
                ((r -= i),
                ((!n && !s._dp) || (n && n.smoothChildTiming)) &&
                  ((s._start += i / s._ts), (s._time -= i), (s._tTime -= i)),
                s.shiftChildren(-i, !1, -Infinity),
                (o = 0)),
              a._end > r && a._ts && (r = a._end),
              (a = t);
          Qt(s, s === ve && s._time > r ? s._time : r, 1, 1), (s._dirty = 0);
        }
        return s._tDur;
      }),
      (t.updateRoot = function (e) {
        if ((ve._ts && (St(ve, jt(e, ve)), (Te = Pi.frame)), Pi.frame >= ht)) {
          ht += Se.autoSleep || 120;
          var t = ve._first;
          if ((!t || !t._ts) && Se.autoSleep && Pi._listeners.length < 2) {
            for (; t && !t._ts; ) t = t._next;
            t || Pi.sleep();
          }
        }
      }),
      t
    );
  })(Vi);
  kt(Xi.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 });
  var Yi,
    Wi,
    Ui = function (e, t, i, n, r, s, a) {
      var o,
        l,
        d,
        c,
        u,
        p,
        h,
        f,
        m = new _n(this._pt, e, t, 0, 1, pn, null, r),
        g = 0,
        v = 0;
      for (
        m.b = i,
          m.e = n,
          i += "",
          (h = ~(n += "").indexOf("random(")) && (n = gi(n)),
          s && (s((f = [i, n]), e, t), (i = f[0]), (n = f[1])),
          l = i.match(We) || [];
        (o = We.exec(n));

      )
        (c = o[0]),
          (u = n.substring(g, o.index)),
          d ? (d = (d + 1) % 5) : "rgba(" === u.substr(-5) && (d = 1),
          c !== l[v++] &&
            ((p = parseFloat(l[v - 1]) || 0),
            (m._pt = {
              _next: m._pt,
              p: u || 1 === v ? u : ",",
              s: p,
              c: "=" === c.charAt(1) ? Tt(p, c) - p : parseFloat(c) - p,
              m: d && d < 4 ? Math.round : 0,
            }),
            (g = We.lastIndex));
      return (
        (m.c = g < n.length ? n.substring(g, n.length) : ""),
        (m.fp = a),
        (Ue.test(n) || h) && (m.e = 0),
        (this._pt = m),
        m
      );
    },
    Ki = function (e, t, i, n, r, s, a, o, l, d) {
      Ie(n) && (n = n(r || 0, e, s));
      var c,
        u = e[t],
        p =
          "get" !== i
            ? i
            : Ie(u)
            ? l
              ? e[
                  t.indexOf("set") || !Ie(e["get" + t.substr(3)])
                    ? t
                    : "get" + t.substr(3)
                ](l)
              : e[t]()
            : u,
        h = Ie(u) ? (l ? on : an) : sn;
      if (
        (ze(n) &&
          (~n.indexOf("random(") && (n = gi(n)),
          "=" === n.charAt(1) &&
            ((c = Tt(p, n) + (ri(p) || 0)) || 0 === c) &&
            (n = c)),
        !d || p !== n || Wi)
      )
        return isNaN(p * n) || "" === n
          ? (!u && !(t in e) && tt(t, n),
            Ui.call(this, e, t, p, n, h, o || Se.stringFilter, l))
          : ((c = new _n(
              this._pt,
              e,
              t,
              +p || 0,
              n - (p || 0),
              "boolean" == typeof u ? un : cn,
              0,
              h
            )),
            l && (c.fp = l),
            a && c.modifier(a, this, e),
            (this._pt = c));
    },
    Qi = function (e, t, i, n, r, s) {
      var a, o, l, d;
      if (
        ut[e] &&
        !1 !==
          (a = new ut[e]()).init(
            r,
            a.rawVars
              ? t[e]
              : (function (e, t, i, n, r) {
                  if (
                    (Ie(e) && (e = en(e, r, t, i, n)),
                    !Re(e) || (e.style && e.nodeType) || qe(e) || He(e))
                  )
                    return ze(e) ? en(e, r, t, i, n) : e;
                  var s,
                    a = {};
                  for (s in e) a[s] = en(e[s], r, t, i, n);
                  return a;
                })(t[e], n, r, s, i),
            i,
            n,
            s
          ) &&
        ((i._pt = o = new _n(i._pt, r, e, 0, 1, a.render, a, 0, a.priority)),
        i !== xe)
      )
        for (l = i._ptLookup[i._targets.indexOf(r)], d = a._props.length; d--; )
          l[a._props[d]] = o;
      return a;
    },
    Zi = function e(t, i, n) {
      var r,
        s,
        a,
        o,
        l,
        d,
        c,
        u,
        p,
        h,
        f,
        m,
        g,
        v = t.vars,
        _ = v.ease,
        b = v.startAt,
        y = v.immediateRender,
        w = v.lazy,
        T = v.onUpdate,
        x = v.onUpdateParams,
        C = v.callbackScope,
        S = v.runBackwards,
        E = v.yoyoEase,
        M = v.keyframes,
        k = v.autoRevert,
        O = t._dur,
        A = t._startAt,
        P = t._targets,
        $ = t.parent,
        L = $ && "nested" === $.data ? $.vars.targets : P,
        D = "auto" === t._overwrite && !fe,
        z = t.timeline;
      if (
        (z && (!M || !_) && (_ = "none"),
        (t._ease = Ri(_, Ee.ease)),
        (t._yEase = E ? Bi(Ri(!0 === E ? _ : E, Ee.ease)) : 0),
        E &&
          t._yoyo &&
          !t._repeat &&
          ((E = t._yEase), (t._yEase = t._ease), (t._ease = E)),
        (t._from = !z && !!v.runBackwards),
        !z || (M && !v.stagger))
      ) {
        if (
          ((m = (u = P[0] ? vt(P[0]).harness : 0) && v[u.prop]),
          (r = Pt(v, lt)),
          A &&
            (A._zTime < 0 && A.progress(1),
            i < 0 && S && y && !k
              ? A.render(-1, !0)
              : A.revert(S && O ? at : st),
            (A._lazy = 0)),
          b)
        ) {
          if (
            (zt(
              (t._startAt = rn.set(
                P,
                kt(
                  {
                    data: "isStart",
                    overwrite: !1,
                    parent: $,
                    immediateRender: !0,
                    lazy: Ne(w),
                    startAt: null,
                    delay: 0,
                    onUpdate: T,
                    onUpdateParams: x,
                    callbackScope: C,
                    stagger: 0,
                  },
                  b
                )
              ))
            ),
            (t._startAt._dp = 0),
            i < 0 && (me || (!y && !k)) && t._startAt.revert(at),
            y && O && i <= 0 && n <= 0)
          )
            return void (i && (t._zTime = i));
        } else if (S && O && !A)
          if (
            (i && (y = !1),
            (a = kt(
              {
                overwrite: !1,
                data: "isFromStart",
                lazy: y && Ne(w),
                immediateRender: y,
                stagger: 0,
                parent: $,
              },
              r
            )),
            m && (a[u.prop] = m),
            zt((t._startAt = rn.set(P, a))),
            (t._startAt._dp = 0),
            i < 0 && (me ? t._startAt.revert(at) : t._startAt.render(-1, !0)),
            (t._zTime = i),
            y)
          ) {
            if (!i) return;
          } else e(t._startAt, ke, ke);
        for (
          t._pt = t._ptCache = 0, w = (O && Ne(w)) || (w && !O), s = 0;
          s < P.length;
          s++
        ) {
          if (
            ((c = (l = P[s])._gsap || gt(P)[s]._gsap),
            (t._ptLookup[s] = h = {}),
            ct[c.id] && dt.length && Ct(),
            (f = L === P ? s : L.indexOf(l)),
            u &&
              !1 !== (p = new u()).init(l, m || r, t, f, L) &&
              ((t._pt = o =
                new _n(t._pt, l, p.name, 0, 1, p.render, p, 0, p.priority)),
              p._props.forEach(function (e) {
                h[e] = o;
              }),
              p.priority && (d = 1)),
            !u || m)
          )
            for (a in r)
              ut[a] && (p = Qi(a, r, t, f, l, L))
                ? p.priority && (d = 1)
                : (h[a] = o =
                    Ki.call(t, l, a, "get", r[a], f, L, 0, v.stringFilter));
          t._op && t._op[s] && t.kill(l, t._op[s]),
            D &&
              t._pt &&
              ((Yi = t),
              ve.killTweensOf(l, h, t.globalTime(i)),
              (g = !t.parent),
              (Yi = 0)),
            t._pt && w && (ct[c.id] = 1);
        }
        d && vn(t), t._onInit && t._onInit(t);
      }
      (t._onUpdate = T),
        (t._initted = (!t._op || t._pt) && !g),
        M && i <= 0 && z.render(Me, !0, !0);
    },
    Ji = function (e, t, i, n) {
      var r,
        s,
        a = t.ease || n || "power1.inOut";
      if (qe(t))
        (s = i[e] || (i[e] = [])),
          t.forEach(function (e, i) {
            return s.push({ t: (i / (t.length - 1)) * 100, v: e, e: a });
          });
      else
        for (r in t)
          (s = i[r] || (i[r] = [])),
            "ease" === r || s.push({ t: parseFloat(e), v: t[r], e: a });
    },
    en = function (e, t, i, n, r) {
      return Ie(e)
        ? e.call(t, i, n, r)
        : ze(e) && ~e.indexOf("random(")
        ? gi(e)
        : e;
    },
    tn = mt + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",
    nn = {};
  bt(tn + ",id,stagger,delay,duration,paused,scrollTrigger", function (e) {
    return (nn[e] = 1);
  });
  var rn = (function (e) {
    function t(t, i, n, r) {
      var s;
      "number" == typeof i && ((n.duration = i), (i = n), (n = null));
      var a,
        o,
        l,
        d,
        c,
        u,
        p,
        h,
        f = (s = e.call(this, r ? i : $t(i)) || this).vars,
        m = f.duration,
        g = f.delay,
        v = f.immediateRender,
        _ = f.stagger,
        b = f.overwrite,
        y = f.keyframes,
        w = f.defaults,
        T = f.scrollTrigger,
        x = f.yoyoEase,
        C = i.parent || ve,
        S = (qe(t) || He(t) ? Be(t[0]) : "length" in i) ? [t] : li(t);
      if (
        ((s._targets = S.length
          ? gt(S)
          : it(
              "GSAP target " + t + " not found. https://greensock.com",
              !Se.nullTargetWarn
            ) || []),
        (s._ptLookup = []),
        (s._overwrite = b),
        y || _ || je(m) || je(g))
      ) {
        if (
          ((i = s.vars),
          (a = s.timeline =
            new Xi({
              data: "nested",
              defaults: w || {},
              targets: C && "nested" === C.data ? C.vars.targets : S,
            })).kill(),
          (a.parent = a._dp = pe(s)),
          (a._start = 0),
          _ || je(m) || je(g))
        ) {
          if (((d = S.length), (p = _ && ui(_)), Re(_)))
            for (c in _) ~tn.indexOf(c) && (h || (h = {}), (h[c] = _[c]));
          for (o = 0; o < d; o++)
            ((l = Pt(i, nn)).stagger = 0),
              x && (l.yoyoEase = x),
              h && Ot(l, h),
              (u = S[o]),
              (l.duration = +en(m, pe(s), o, u, S)),
              (l.delay = (+en(g, pe(s), o, u, S) || 0) - s._delay),
              !_ &&
                1 === d &&
                l.delay &&
                ((s._delay = g = l.delay), (s._start += g), (l.delay = 0)),
              a.to(u, l, p ? p(o, u, S) : 0),
              (a._ease = Li.none);
          a.duration() ? (m = g = 0) : (s.timeline = 0);
        } else if (y) {
          $t(kt(a.vars.defaults, { ease: "none" })),
            (a._ease = Ri(y.ease || i.ease || "none"));
          var E,
            M,
            k,
            O = 0;
          if (qe(y))
            y.forEach(function (e) {
              return a.to(S, e, ">");
            }),
              a.duration();
          else {
            for (c in ((l = {}), y))
              "ease" === c || "easeEach" === c || Ji(c, y[c], l, y.easeEach);
            for (c in l)
              for (
                E = l[c].sort(function (e, t) {
                  return e.t - t.t;
                }),
                  O = 0,
                  o = 0;
                o < E.length;
                o++
              )
                ((k = {
                  ease: (M = E[o]).e,
                  duration: ((M.t - (o ? E[o - 1].t : 0)) / 100) * m,
                })[c] = M.v),
                  a.to(S, k, O),
                  (O += k.duration);
            a.duration() < m && a.to({}, { duration: m - a.duration() });
          }
        }
        m || s.duration((m = a.duration()));
      } else s.timeline = 0;
      return (
        !0 !== b || fe || ((Yi = pe(s)), ve.killTweensOf(S), (Yi = 0)),
        Xt(C, pe(s), n),
        i.reversed && s.reverse(),
        i.paused && s.paused(!0),
        (v ||
          (!m &&
            !y &&
            s._start === wt(C._time) &&
            Ne(v) &&
            Rt(pe(s)) &&
            "nested" !== C.data)) &&
          ((s._tTime = -1e-8), s.render(Math.max(0, -g) || 0)),
        T && Yt(pe(s), T),
        s
      );
    }
    he(t, e);
    var i = t.prototype;
    return (
      (i.render = function (e, t, i) {
        var n,
          r,
          s,
          a,
          o,
          l,
          d,
          c,
          u,
          p = this._time,
          h = this._tDur,
          f = this._dur,
          m = e < 0,
          g = e > h - ke && !m ? h : e < ke ? 0 : e;
        if (f) {
          if (
            g !== this._tTime ||
            !e ||
            i ||
            (!this._initted && this._tTime) ||
            (this._startAt && this._zTime < 0 !== m)
          ) {
            if (((n = g), (c = this.timeline), this._repeat)) {
              if (((a = f + this._rDelay), this._repeat < -1 && m))
                return this.totalTime(100 * a + e, t, i);
              if (
                ((n = wt(g % a)),
                g === h
                  ? ((s = this._repeat), (n = f))
                  : ((s = ~~(g / a)) && s === g / a && ((n = f), s--),
                    n > f && (n = f)),
                (l = this._yoyo && 1 & s) && ((u = this._yEase), (n = f - n)),
                (o = Gt(this._tTime, a)),
                n === p && !i && this._initted)
              )
                return (this._tTime = g), this;
              s !== o &&
                (c && this._yEase && Fi(c, l),
                !this.vars.repeatRefresh ||
                  l ||
                  this._lock ||
                  ((this._lock = i = 1),
                  (this.render(wt(a * s), !0).invalidate()._lock = 0)));
            }
            if (!this._initted) {
              if (Wt(this, m ? e : n, i, t, g)) return (this._tTime = 0), this;
              if (p !== this._time) return this;
              if (f !== this._dur) return this.render(e, t, i);
            }
            if (
              ((this._tTime = g),
              (this._time = n),
              !this._act && this._ts && ((this._act = 1), (this._lazy = 0)),
              (this.ratio = d = (u || this._ease)(n / f)),
              this._from && (this.ratio = d = 1 - d),
              n && !p && !t && (bi(this, "onStart"), this._tTime !== g))
            )
              return this;
            for (r = this._pt; r; ) r.r(d, r.d), (r = r._next);
            (c &&
              c.render(
                e < 0 ? e : !n && l ? -1e-8 : c._dur * c._ease(n / this._dur),
                t,
                i
              )) ||
              (this._startAt && (this._zTime = e)),
              this._onUpdate &&
                !t &&
                (m && Ft(this, e, 0, i), bi(this, "onUpdate")),
              this._repeat &&
                s !== o &&
                this.vars.onRepeat &&
                !t &&
                this.parent &&
                bi(this, "onRepeat"),
              (g !== this._tDur && g) ||
                this._tTime !== g ||
                (m && !this._onUpdate && Ft(this, e, 0, !0),
                (e || !f) &&
                  ((g === this._tDur && this._ts > 0) ||
                    (!g && this._ts < 0)) &&
                  zt(this, 1),
                t ||
                  (m && !p) ||
                  !(g || p || l) ||
                  (bi(this, g === h ? "onComplete" : "onReverseComplete", !0),
                  this._prom &&
                    !(g < h && this.timeScale() > 0) &&
                    this._prom()));
          }
        } else
          !(function (e, t, i, n) {
            var r,
              s,
              a,
              o = e.ratio,
              l =
                t < 0 ||
                (!t &&
                  ((!e._start && Ut(e) && (e._initted || !Kt(e))) ||
                    ((e._ts < 0 || e._dp._ts < 0) && !Kt(e))))
                  ? 0
                  : 1,
              d = e._rDelay,
              c = 0;
            if (
              (d &&
                e._repeat &&
                ((c = ni(0, e._tDur, t)),
                (s = Gt(c, d)),
                e._yoyo && 1 & s && (l = 1 - l),
                s !== Gt(e._tTime, d) &&
                  ((o = 1 - l),
                  e.vars.repeatRefresh && e._initted && e.invalidate())),
              l !== o || me || n || e._zTime === ke || (!t && e._zTime))
            ) {
              if (!e._initted && Wt(e, t, n, i, c)) return;
              for (
                a = e._zTime,
                  e._zTime = t || (i ? ke : 0),
                  i || (i = t && !a),
                  e.ratio = l,
                  e._from && (l = 1 - l),
                  e._time = 0,
                  e._tTime = c,
                  r = e._pt;
                r;

              )
                r.r(l, r.d), (r = r._next);
              t < 0 && Ft(e, t, 0, !0),
                e._onUpdate && !i && bi(e, "onUpdate"),
                c && e._repeat && !i && e.parent && bi(e, "onRepeat"),
                (t >= e._tDur || t < 0) &&
                  e.ratio === l &&
                  (l && zt(e, 1),
                  i ||
                    me ||
                    (bi(e, l ? "onComplete" : "onReverseComplete", !0),
                    e._prom && e._prom()));
            } else e._zTime || (e._zTime = t);
          })(this, e, t, i);
        return this;
      }),
      (i.targets = function () {
        return this._targets;
      }),
      (i.invalidate = function (t) {
        return (
          (!t || !this.vars.runBackwards) && (this._startAt = 0),
          (this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0),
          (this._ptLookup = []),
          this.timeline && this.timeline.invalidate(t),
          e.prototype.invalidate.call(this, t)
        );
      }),
      (i.resetTo = function (e, t, i, n) {
        Ce || Pi.wake(), this._ts || this.play();
        var r = Math.min(this._dur, (this._dp._time - this._start) * this._ts);
        return (
          this._initted || Zi(this, r),
          (function (e, t, i, n, r, s, a) {
            var o,
              l,
              d,
              c,
              u = ((e._pt && e._ptCache) || (e._ptCache = {}))[t];
            if (!u)
              for (
                u = e._ptCache[t] = [], d = e._ptLookup, c = e._targets.length;
                c--;

              ) {
                if ((o = d[c][t]) && o.d && o.d._pt)
                  for (o = o.d._pt; o && o.p !== t && o.fp !== t; ) o = o._next;
                if (!o)
                  return (Wi = 1), (e.vars[t] = "+=0"), Zi(e, a), (Wi = 0), 1;
                u.push(o);
              }
            for (c = u.length; c--; )
              ((o = (l = u[c])._pt || l).s =
                (!n && 0 !== n) || r ? o.s + (n || 0) + s * o.c : n),
                (o.c = i - o.s),
                l.e && (l.e = yt(i) + ri(l.e)),
                l.b && (l.b = o.s + ri(l.b));
          })(this, e, t, i, n, this._ease(r / this._dur), r)
            ? this.resetTo(e, t, i, n)
            : (qt(this, 0),
              this.parent ||
                Lt(
                  this._dp,
                  this,
                  "_first",
                  "_last",
                  this._dp._sort ? "_start" : 0
                ),
              this.render(0))
        );
      }),
      (i.kill = function (e, t) {
        if ((void 0 === t && (t = "all"), !(e || (t && "all" !== t))))
          return (this._lazy = this._pt = 0), this.parent ? yi(this) : this;
        if (this.timeline) {
          var i = this.timeline.totalDuration();
          return (
            this.timeline.killTweensOf(e, t, Yi && !0 !== Yi.vars.overwrite)
              ._first || yi(this),
            this.parent &&
              i !== this.timeline.totalDuration() &&
              Qt(this, (this._dur * this.timeline._tDur) / i, 0, 1),
            this
          );
        }
        var n,
          r,
          s,
          a,
          o,
          l,
          d,
          c = this._targets,
          u = e ? li(e) : c,
          p = this._ptLookup,
          h = this._pt;
        if (
          (!t || "all" === t) &&
          (function (e, t) {
            for (
              var i = e.length, n = i === t.length;
              n && i-- && e[i] === t[i];

            );
            return i < 0;
          })(c, u)
        )
          return "all" === t && (this._pt = 0), yi(this);
        for (
          n = this._op = this._op || [],
            "all" !== t &&
              (ze(t) &&
                ((o = {}),
                bt(t, function (e) {
                  return (o[e] = 1);
                }),
                (t = o)),
              (t = (function (e, t) {
                var i,
                  n,
                  r,
                  s,
                  a = e[0] ? vt(e[0]).harness : 0,
                  o = a && a.aliases;
                if (!o) return t;
                for (n in ((i = Ot({}, t)), o))
                  if ((n in i))
                    for (r = (s = o[n].split(",")).length; r--; )
                      i[s[r]] = i[n];
                return i;
              })(c, t))),
            d = c.length;
          d--;

        )
          if (~u.indexOf(c[d]))
            for (o in ((r = p[d]),
            "all" === t
              ? ((n[d] = t), (a = r), (s = {}))
              : ((s = n[d] = n[d] || {}), (a = t)),
            a))
              (l = r && r[o]) &&
                (("kill" in l.d && !0 !== l.d.kill(o)) || Dt(this, l, "_pt"),
                delete r[o]),
                "all" !== s && (s[o] = 1);
        return this._initted && !this._pt && h && yi(this), this;
      }),
      (t.to = function (e, i) {
        return new t(e, i, arguments[2]);
      }),
      (t.from = function (e, t) {
        return ti(1, arguments);
      }),
      (t.delayedCall = function (e, i, n, r) {
        return new t(i, 0, {
          immediateRender: !1,
          lazy: !1,
          overwrite: !1,
          delay: e,
          onComplete: i,
          onReverseComplete: i,
          onCompleteParams: n,
          onReverseCompleteParams: n,
          callbackScope: r,
        });
      }),
      (t.fromTo = function (e, t, i) {
        return ti(2, arguments);
      }),
      (t.set = function (e, i) {
        return (i.duration = 0), i.repeatDelay || (i.repeat = 0), new t(e, i);
      }),
      (t.killTweensOf = function (e, t, i) {
        return ve.killTweensOf(e, t, i);
      }),
      t
    );
  })(Vi);
  kt(rn.prototype, { _targets: [], _lazy: 0, _startAt: 0, _op: 0, _onInit: 0 }),
    bt("staggerTo,staggerFrom,staggerFromTo", function (e) {
      rn[e] = function () {
        var t = new Xi(),
          i = si.call(arguments, 0);
        return i.splice("staggerFromTo" === e ? 5 : 4, 0, 0), t[e].apply(t, i);
      };
    });
  var sn = function (e, t, i) {
      return (e[t] = i);
    },
    an = function (e, t, i) {
      return e[t](i);
    },
    on = function (e, t, i, n) {
      return e[t](n.fp, i);
    },
    ln = function (e, t, i) {
      return e.setAttribute(t, i);
    },
    dn = function (e, t) {
      return Ie(e[t]) ? an : Fe(e[t]) && e.setAttribute ? ln : sn;
    },
    cn = function (e, t) {
      return t.set(t.t, t.p, Math.round(1e6 * (t.s + t.c * e)) / 1e6, t);
    },
    un = function (e, t) {
      return t.set(t.t, t.p, !!(t.s + t.c * e), t);
    },
    pn = function (e, t) {
      var i = t._pt,
        n = "";
      if (!e && t.b) n = t.b;
      else if (1 === e && t.e) n = t.e;
      else {
        for (; i; )
          (n =
            i.p +
            (i.m
              ? i.m(i.s + i.c * e)
              : Math.round(1e4 * (i.s + i.c * e)) / 1e4) +
            n),
            (i = i._next);
        n += t.c;
      }
      t.set(t.t, t.p, n, t);
    },
    hn = function (e, t) {
      for (var i = t._pt; i; ) i.r(e, i.d), (i = i._next);
    },
    fn = function (e, t, i, n) {
      for (var r, s = this._pt; s; )
        (r = s._next), s.p === n && s.modifier(e, t, i), (s = r);
    },
    mn = function (e) {
      for (var t, i, n = this._pt; n; )
        (i = n._next),
          (n.p === e && !n.op) || n.op === e
            ? Dt(this, n, "_pt")
            : n.dep || (t = 1),
          (n = i);
      return !t;
    },
    gn = function (e, t, i, n) {
      n.mSet(e, t, n.m.call(n.tween, i, n.mt), n);
    },
    vn = function (e) {
      for (var t, i, n, r, s = e._pt; s; ) {
        for (t = s._next, i = n; i && i.pr > s.pr; ) i = i._next;
        (s._prev = i ? i._prev : r) ? (s._prev._next = s) : (n = s),
          (s._next = i) ? (i._prev = s) : (r = s),
          (s = t);
      }
      e._pt = n;
    },
    _n = (function () {
      function e(e, t, i, n, r, s, a, o, l) {
        (this.t = t),
          (this.s = n),
          (this.c = r),
          (this.p = i),
          (this.r = s || cn),
          (this.d = a || this),
          (this.set = o || sn),
          (this.pr = l || 0),
          (this._next = e),
          e && (e._prev = this);
      }
      return (
        (e.prototype.modifier = function (e, t, i) {
          (this.mSet = this.mSet || this.set),
            (this.set = gn),
            (this.m = e),
            (this.mt = i),
            (this.tween = t);
        }),
        e
      );
    })();
  bt(
    mt +
      "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",
    function (e) {
      return (lt[e] = 1);
    }
  ),
    (Ze.TweenMax = Ze.TweenLite = rn),
    (Ze.TimelineLite = Ze.TimelineMax = Xi),
    (ve = new Xi({
      sortChildren: !1,
      defaults: Ee,
      autoRemoveChildren: !0,
      id: "root",
      smoothChildTiming: !0,
    })),
    (Se.stringFilter = Ai);
  var bn = [],
    yn = {},
    wn = [],
    Tn = 0,
    xn = function (e) {
      return (yn[e] || wn).map(function (e) {
        return e();
      });
    },
    Cn = function () {
      var e = Date.now(),
        t = [];
      e - Tn > 2 &&
        (xn("matchMediaInit"),
        bn.forEach(function (e) {
          var i,
            n,
            r,
            s,
            a = e.queries,
            o = e.conditions;
          for (n in a)
            (i = _e.matchMedia(a[n]).matches) && (r = 1),
              i !== o[n] && ((o[n] = i), (s = 1));
          s && (e.revert(), r && t.push(e));
        }),
        xn("matchMediaRevert"),
        t.forEach(function (e) {
          return e.onMatch(e);
        }),
        (Tn = e),
        xn("matchMedia"));
    },
    Sn = (function () {
      function e(e, t) {
        (this.selector = t && di(t)),
          (this.data = []),
          (this._r = []),
          (this.isReverted = !1),
          e && this.add(e);
      }
      var t = e.prototype;
      return (
        (t.add = function (e, t, i) {
          Ie(e) && ((i = t), (t = e), (e = Ie));
          var n = this,
            r = function () {
              var e,
                r = ge,
                s = n.selector;
              return (
                r && r !== n && r.data.push(n),
                i && (n.selector = di(i)),
                (ge = n),
                (e = t.apply(n, arguments)),
                Ie(e) && n._r.push(e),
                (ge = r),
                (n.selector = s),
                (n.isReverted = !1),
                e
              );
            };
          return (n.last = r), e === Ie ? r(n) : e ? (n[e] = r) : r;
        }),
        (t.ignore = function (e) {
          var t = ge;
          (ge = null), e(this), (ge = t);
        }),
        (t.getTweens = function () {
          var t = [];
          return (
            this.data.forEach(function (i) {
              return i instanceof e
                ? t.push.apply(t, i.getTweens())
                : i instanceof rn &&
                    !(i.parent && "nested" === i.parent.data) &&
                    t.push(i);
            }),
            t
          );
        }),
        (t.clear = function () {
          this._r.length = this.data.length = 0;
        }),
        (t.kill = function (e, t) {
          var i = this;
          if (e) {
            var n = this.getTweens();
            this.data.forEach(function (e) {
              "isFlip" === e.data &&
                (e.revert(),
                e.getChildren(!0, !0, !1).forEach(function (e) {
                  return n.splice(n.indexOf(e), 1);
                }));
            }),
              n
                .map(function (e) {
                  return { g: e.globalTime(0), t: e };
                })
                .sort(function (e, t) {
                  return t.g - e.g || -1;
                })
                .forEach(function (t) {
                  return t.t.revert(e);
                }),
              this.data.forEach(function (t) {
                return !(t instanceof Vi) && t.revert && t.revert(e);
              }),
              this._r.forEach(function (t) {
                return t(e, i);
              }),
              (this.isReverted = !0);
          } else
            this.data.forEach(function (e) {
              return e.kill && e.kill();
            });
          if ((this.clear(), t)) {
            var r = bn.indexOf(this);
            ~r && bn.splice(r, 1);
          }
        }),
        (t.revert = function (e) {
          this.kill(e || {});
        }),
        e
      );
    })(),
    En = (function () {
      function e(e) {
        (this.contexts = []), (this.scope = e);
      }
      var t = e.prototype;
      return (
        (t.add = function (e, t, i) {
          Re(e) || (e = { matches: e });
          var n,
            r,
            s,
            a = new Sn(0, i || this.scope),
            o = (a.conditions = {});
          for (r in (this.contexts.push(a),
          (t = a.add("onMatch", t)),
          (a.queries = e),
          e))
            "all" === r
              ? (s = 1)
              : (n = _e.matchMedia(e[r])) &&
                (bn.indexOf(a) < 0 && bn.push(a),
                (o[r] = n.matches) && (s = 1),
                n.addListener
                  ? n.addListener(Cn)
                  : n.addEventListener("change", Cn));
          return s && t(a), this;
        }),
        (t.revert = function (e) {
          this.kill(e || {});
        }),
        (t.kill = function (e) {
          this.contexts.forEach(function (t) {
            return t.kill(e, !0);
          });
        }),
        e
      );
    })(),
    Mn = {
      registerPlugin: function () {
        for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
          t[i] = arguments[i];
        t.forEach(function (e) {
          return wi(e);
        });
      },
      timeline: function (e) {
        return new Xi(e);
      },
      getTweensOf: function (e, t) {
        return ve.getTweensOf(e, t);
      },
      getProperty: function (e, t, i, n) {
        ze(e) && (e = li(e)[0]);
        var r = vt(e || {}).get,
          s = i ? Mt : Et;
        return (
          "native" === i && (i = ""),
          e
            ? t
              ? s(((ut[t] && ut[t].get) || r)(e, t, i, n))
              : function (t, i, n) {
                  return s(((ut[t] && ut[t].get) || r)(e, t, i, n));
                }
            : e
        );
      },
      quickSetter: function (e, t, i) {
        if ((e = li(e)).length > 1) {
          var n = e.map(function (e) {
              return An.quickSetter(e, t, i);
            }),
            r = n.length;
          return function (e) {
            for (var t = r; t--; ) n[t](e);
          };
        }
        e = e[0] || {};
        var s = ut[t],
          a = vt(e),
          o = (a.harness && (a.harness.aliases || {})[t]) || t,
          l = s
            ? function (t) {
                var n = new s();
                (xe._pt = 0),
                  n.init(e, i ? t + i : t, xe, 0, [e]),
                  n.render(1, n),
                  xe._pt && hn(1, xe);
              }
            : a.set(e, o);
        return s
          ? l
          : function (t) {
              return l(e, o, i ? t + i : t, a, 1);
            };
      },
      quickTo: function (e, t, i) {
        var n,
          r = An.to(
            e,
            Ot((((n = {})[t] = "+=0.1"), (n.paused = !0), n), i || {})
          ),
          s = function (e, i, n) {
            return r.resetTo(t, e, i, n);
          };
        return (s.tween = r), s;
      },
      isTweening: function (e) {
        return ve.getTweensOf(e, !0).length > 0;
      },
      defaults: function (e) {
        return e && e.ease && (e.ease = Ri(e.ease, Ee.ease)), At(Ee, e || {});
      },
      config: function (e) {
        return At(Se, e || {});
      },
      registerEffect: function (e) {
        var t = e.name,
          i = e.effect,
          n = e.plugins,
          r = e.defaults,
          s = e.extendTimeline;
        (n || "").split(",").forEach(function (e) {
          return (
            e &&
            !ut[e] &&
            !Ze[e] &&
            it(t + " effect requires " + e + " plugin.")
          );
        }),
          (pt[t] = function (e, t, n) {
            return i(li(e), kt(t || {}, r), n);
          }),
          s &&
            (Xi.prototype[t] = function (e, i, n) {
              return this.add(pt[t](e, Re(i) ? i : (n = i) && {}, this), n);
            });
      },
      registerEase: function (e, t) {
        Li[e] = Ri(t);
      },
      parseEase: function (e, t) {
        return arguments.length ? Ri(e, t) : Li;
      },
      getById: function (e) {
        return ve.getById(e);
      },
      exportRoot: function (e, t) {
        void 0 === e && (e = {});
        var i,
          n,
          r = new Xi(e);
        for (
          r.smoothChildTiming = Ne(e.smoothChildTiming),
            ve.remove(r),
            r._dp = 0,
            r._time = r._tTime = ve._time,
            i = ve._first;
          i;

        )
          (n = i._next),
            (!t &&
              !i._dur &&
              i instanceof rn &&
              i.vars.onComplete === i._targets[0]) ||
              Xt(r, i, i._start - i._delay),
            (i = n);
        return Xt(ve, r, 0), r;
      },
      context: function (e, t) {
        return e ? new Sn(e, t) : ge;
      },
      matchMedia: function (e) {
        return new En(e);
      },
      matchMediaRefresh: function () {
        return (
          bn.forEach(function (e) {
            var t,
              i,
              n = e.conditions;
            for (i in n) n[i] && ((n[i] = !1), (t = 1));
            t && e.revert();
          }) || Cn()
        );
      },
      addEventListener: function (e, t) {
        var i = yn[e] || (yn[e] = []);
        ~i.indexOf(t) || i.push(t);
      },
      removeEventListener: function (e, t) {
        var i = yn[e],
          n = i && i.indexOf(t);
        n >= 0 && i.splice(n, 1);
      },
      utils: {
        wrap: function e(t, i, n) {
          var r = i - t;
          return qe(t)
            ? mi(t, e(0, t.length), i)
            : ii(n, function (e) {
                return ((r + ((e - t) % r)) % r) + t;
              });
        },
        wrapYoyo: function e(t, i, n) {
          var r = i - t,
            s = 2 * r;
          return qe(t)
            ? mi(t, e(0, t.length - 1), i)
            : ii(n, function (e) {
                return t + ((e = (s + ((e - t) % s)) % s || 0) > r ? s - e : e);
              });
        },
        distribute: ui,
        random: fi,
        snap: hi,
        normalize: function (e, t, i) {
          return vi(e, t, 0, 1, i);
        },
        getUnit: ri,
        clamp: function (e, t, i) {
          return ii(i, function (i) {
            return ni(e, t, i);
          });
        },
        splitColor: Si,
        toArray: li,
        selector: di,
        mapRange: vi,
        pipe: function () {
          for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
            t[i] = arguments[i];
          return function (e) {
            return t.reduce(function (e, t) {
              return t(e);
            }, e);
          };
        },
        unitize: function (e, t) {
          return function (i) {
            return e(parseFloat(i)) + (t || ri(i));
          };
        },
        interpolate: function e(t, i, n, r) {
          var s = isNaN(t + i)
            ? 0
            : function (e) {
                return (1 - e) * t + e * i;
              };
          if (!s) {
            var a,
              o,
              l,
              d,
              c,
              u = ze(t),
              p = {};
            if ((!0 === n && (r = 1) && (n = null), u))
              (t = { p: t }), (i = { p: i });
            else if (qe(t) && !qe(i)) {
              for (l = [], d = t.length, c = d - 2, o = 1; o < d; o++)
                l.push(e(t[o - 1], t[o]));
              d--,
                (s = function (e) {
                  e *= d;
                  var t = Math.min(c, ~~e);
                  return l[t](e - t);
                }),
                (n = i);
            } else r || (t = Ot(qe(t) ? [] : {}, t));
            if (!l) {
              for (a in i) Ki.call(p, t, a, "get", i[a]);
              s = function (e) {
                return hn(e, p) || (u ? t.p : t);
              };
            }
          }
          return ii(n, s);
        },
        shuffle: ci,
      },
      install: et,
      effects: pt,
      ticker: Pi,
      updateRoot: Xi.updateRoot,
      plugins: ut,
      globalTimeline: ve,
      core: {
        PropTween: _n,
        globals: nt,
        Tween: rn,
        Timeline: Xi,
        Animation: Vi,
        getCache: vt,
        _removeLinkedListItem: Dt,
        reverting: function () {
          return me;
        },
        context: function (e) {
          return e && ge && (ge.data.push(e), (e._ctx = ge)), ge;
        },
        suppressOverwrites: function (e) {
          return (fe = e);
        },
      },
    };
  bt("to,from,fromTo,delayedCall,set,killTweensOf", function (e) {
    return (Mn[e] = rn[e]);
  }),
    Pi.add(Xi.updateRoot),
    (xe = Mn.to({}, { duration: 0 }));
  var kn = function (e, t) {
      for (var i = e._pt; i && i.p !== t && i.op !== t && i.fp !== t; )
        i = i._next;
      return i;
    },
    On = function (e, t) {
      return {
        name: e,
        rawVars: 1,
        init: function (e, i, n) {
          n._onInit = function (e) {
            var n, r;
            if (
              (ze(i) &&
                ((n = {}),
                bt(i, function (e) {
                  return (n[e] = 1);
                }),
                (i = n)),
              t)
            ) {
              for (r in ((n = {}), i)) n[r] = t(i[r]);
              i = n;
            }
            !(function (e, t) {
              var i,
                n,
                r,
                s = e._targets;
              for (i in t)
                for (n = s.length; n--; )
                  (r = e._ptLookup[n][i]) &&
                    (r = r.d) &&
                    (r._pt && (r = kn(r, i)),
                    r && r.modifier && r.modifier(t[i], e, s[n], i));
            })(e, i);
          };
        },
      };
    },
    An =
      Mn.registerPlugin(
        {
          name: "attr",
          init: function (e, t, i, n, r) {
            var s, a, o;
            for (s in ((this.tween = i), t))
              (o = e.getAttribute(s) || ""),
                ((a = this.add(
                  e,
                  "setAttribute",
                  (o || 0) + "",
                  t[s],
                  n,
                  r,
                  0,
                  0,
                  s
                )).op = s),
                (a.b = o),
                this._props.push(s);
          },
          render: function (e, t) {
            for (var i = t._pt; i; )
              me ? i.set(i.t, i.p, i.b, i) : i.r(e, i.d), (i = i._next);
          },
        },
        {
          name: "endArray",
          init: function (e, t) {
            for (var i = t.length; i--; )
              this.add(e, i, e[i] || 0, t[i], 0, 0, 0, 0, 0, 1);
          },
        },
        On("roundProps", pi),
        On("modifiers"),
        On("snap", hi)
      ) || Mn;
  (rn.version = Xi.version = An.version = "3.11.3"), (we = 1), Ge() && $i();
  Li.Power0, Li.Power1;
  var Pn,
    $n,
    Ln,
    Dn,
    zn,
    In,
    Bn,
    Fn,
    Rn = Li.Power2,
    Nn =
      (Li.Power3,
      Li.Power4,
      Li.Linear,
      Li.Quad,
      Li.Cubic,
      Li.Quart,
      Li.Quint,
      Li.Strong,
      Li.Elastic,
      Li.Back,
      Li.SteppedEase,
      Li.Bounce,
      Li.Sine,
      Li.Expo,
      Li.Circ,
      {}),
    Gn = 180 / Math.PI,
    jn = Math.PI / 180,
    Hn = Math.atan2,
    qn = /([A-Z])/g,
    Vn = /(left|right|width|margin|padding|x)/i,
    Xn = /[\s,\(]\S/,
    Yn = {
      autoAlpha: "opacity,visibility",
      scale: "scaleX,scaleY",
      alpha: "opacity",
    },
    Wn = function (e, t) {
      return t.set(t.t, t.p, Math.round(1e4 * (t.s + t.c * e)) / 1e4 + t.u, t);
    },
    Un = function (e, t) {
      return t.set(
        t.t,
        t.p,
        1 === e ? t.e : Math.round(1e4 * (t.s + t.c * e)) / 1e4 + t.u,
        t
      );
    },
    Kn = function (e, t) {
      return t.set(
        t.t,
        t.p,
        e ? Math.round(1e4 * (t.s + t.c * e)) / 1e4 + t.u : t.b,
        t
      );
    },
    Qn = function (e, t) {
      var i = t.s + t.c * e;
      t.set(t.t, t.p, ~~(i + (i < 0 ? -0.5 : 0.5)) + t.u, t);
    },
    Zn = function (e, t) {
      return t.set(t.t, t.p, e ? t.e : t.b, t);
    },
    Jn = function (e, t) {
      return t.set(t.t, t.p, 1 !== e ? t.b : t.e, t);
    },
    er = function (e, t, i) {
      return (e.style[t] = i);
    },
    tr = function (e, t, i) {
      return e.style.setProperty(t, i);
    },
    ir = function (e, t, i) {
      return (e._gsap[t] = i);
    },
    nr = function (e, t, i) {
      return (e._gsap.scaleX = e._gsap.scaleY = i);
    },
    rr = function (e, t, i, n, r) {
      var s = e._gsap;
      (s.scaleX = s.scaleY = i), s.renderTransform(r, s);
    },
    sr = function (e, t, i, n, r) {
      var s = e._gsap;
      (s[t] = i), s.renderTransform(r, s);
    },
    ar = "transform",
    or = ar + "Origin",
    lr = function (e, t) {
      var i = this,
        n = this.target,
        r = n.style;
      if (e in Nn) {
        if (
          ((this.tfm = this.tfm || {}),
          "transform" !== e &&
            (~(e = Yn[e] || e).indexOf(",")
              ? e.split(",").forEach(function (e) {
                  return (i.tfm[e] = Er(n, e));
                })
              : (this.tfm[e] = n._gsap.x ? n._gsap[e] : Er(n, e))),
          this.props.indexOf(ar) >= 0)
        )
          return;
        n._gsap.svg &&
          ((this.svgo = n.getAttribute("data-svg-origin")),
          this.props.push(or, t, "")),
          (e = ar);
      }
      (r || t) && this.props.push(e, t, r[e]);
    },
    dr = function (e) {
      e.translate &&
        (e.removeProperty("translate"),
        e.removeProperty("scale"),
        e.removeProperty("rotate"));
    },
    cr = function () {
      var e,
        t,
        i = this.props,
        n = this.target,
        r = n.style,
        s = n._gsap;
      for (e = 0; e < i.length; e += 3)
        i[e + 1]
          ? (n[i[e]] = i[e + 2])
          : i[e + 2]
          ? (r[i[e]] = i[e + 2])
          : r.removeProperty(i[e].replace(qn, "-$1").toLowerCase());
      if (this.tfm) {
        for (t in this.tfm) s[t] = this.tfm[t];
        s.svg &&
          (s.renderTransform(),
          n.setAttribute("data-svg-origin", this.svgo || "")),
          !(e = Bn()) || e.isStart || r[ar] || (dr(r), (s.uncache = 1));
      }
    },
    ur = function (e, t) {
      var i = { target: e, props: [], revert: cr, save: lr };
      return (
        t &&
          t.split(",").forEach(function (e) {
            return i.save(e);
          }),
        i
      );
    },
    pr = function (e, t) {
      var i = $n.createElementNS
        ? $n.createElementNS(
            (t || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"),
            e
          )
        : $n.createElement(e);
      return i.style ? i : $n.createElement(e);
    },
    hr = function e(t, i, n) {
      var r = getComputedStyle(t);
      return (
        r[i] ||
        r.getPropertyValue(i.replace(qn, "-$1").toLowerCase()) ||
        r.getPropertyValue(i) ||
        (!n && e(t, mr(i) || i, 1)) ||
        ""
      );
    },
    fr = "O,Moz,ms,Ms,Webkit".split(","),
    mr = function (e, t, i) {
      var n = (t || zn).style,
        r = 5;
      if (e in n && !i) return e;
      for (
        e = e.charAt(0).toUpperCase() + e.substr(1);
        r-- && !(fr[r] + e in n);

      );
      return r < 0 ? null : (3 === r ? "ms" : r >= 0 ? fr[r] : "") + e;
    },
    gr = function () {
      "undefined" != typeof window &&
        window.document &&
        ((Pn = window),
        ($n = Pn.document),
        (Ln = $n.documentElement),
        (zn = pr("div") || { style: {} }),
        pr("div"),
        (ar = mr(ar)),
        (or = ar + "Origin"),
        (zn.style.cssText =
          "border-width:0;line-height:0;position:absolute;padding:0"),
        (Fn = !!mr("perspective")),
        (Bn = An.core.reverting),
        (Dn = 1));
    },
    vr = function e(t) {
      var i,
        n = pr(
          "svg",
          (this.ownerSVGElement &&
            this.ownerSVGElement.getAttribute("xmlns")) ||
            "http://www.w3.org/2000/svg"
        ),
        r = this.parentNode,
        s = this.nextSibling,
        a = this.style.cssText;
      if (
        (Ln.appendChild(n),
        n.appendChild(this),
        (this.style.display = "block"),
        t)
      )
        try {
          (i = this.getBBox()),
            (this._gsapBBox = this.getBBox),
            (this.getBBox = e);
        } catch (e) {}
      else this._gsapBBox && (i = this._gsapBBox());
      return (
        r && (s ? r.insertBefore(this, s) : r.appendChild(this)),
        Ln.removeChild(n),
        (this.style.cssText = a),
        i
      );
    },
    _r = function (e, t) {
      for (var i = t.length; i--; )
        if (e.hasAttribute(t[i])) return e.getAttribute(t[i]);
    },
    br = function (e) {
      var t;
      try {
        t = e.getBBox();
      } catch (i) {
        t = vr.call(e, !0);
      }
      return (
        (t && (t.width || t.height)) ||
          e.getBBox === vr ||
          (t = vr.call(e, !0)),
        !t || t.width || t.x || t.y
          ? t
          : {
              x: +_r(e, ["x", "cx", "x1"]) || 0,
              y: +_r(e, ["y", "cy", "y1"]) || 0,
              width: 0,
              height: 0,
            }
      );
    },
    yr = function (e) {
      return !(!e.getCTM || (e.parentNode && !e.ownerSVGElement) || !br(e));
    },
    wr = function (e, t) {
      if (t) {
        var i = e.style;
        t in Nn && t !== or && (t = ar),
          i.removeProperty
            ? (("ms" !== t.substr(0, 2) && "webkit" !== t.substr(0, 6)) ||
                (t = "-" + t),
              i.removeProperty(t.replace(qn, "-$1").toLowerCase()))
            : i.removeAttribute(t);
      }
    },
    Tr = function (e, t, i, n, r, s) {
      var a = new _n(e._pt, t, i, 0, 1, s ? Jn : Zn);
      return (e._pt = a), (a.b = n), (a.e = r), e._props.push(i), a;
    },
    xr = { deg: 1, rad: 1, turn: 1 },
    Cr = { grid: 1, flex: 1 },
    Sr = function e(t, i, n, r) {
      var s,
        a,
        o,
        l,
        d = parseFloat(n) || 0,
        c = (n + "").trim().substr((d + "").length) || "px",
        u = zn.style,
        p = Vn.test(i),
        h = "svg" === t.tagName.toLowerCase(),
        f = (h ? "client" : "offset") + (p ? "Width" : "Height"),
        m = 100,
        g = "px" === r,
        v = "%" === r;
      return r === c || !d || xr[r] || xr[c]
        ? d
        : ("px" !== c && !g && (d = e(t, i, n, "px")),
          (l = t.getCTM && yr(t)),
          (!v && "%" !== c) || (!Nn[i] && !~i.indexOf("adius"))
            ? ((u[p ? "width" : "height"] = m + (g ? c : r)),
              (a =
                ~i.indexOf("adius") || ("em" === r && t.appendChild && !h)
                  ? t
                  : t.parentNode),
              l && (a = (t.ownerSVGElement || {}).parentNode),
              (a && a !== $n && a.appendChild) || (a = $n.body),
              (o = a._gsap) &&
              v &&
              o.width &&
              p &&
              o.time === Pi.time &&
              !o.uncache
                ? yt((d / o.width) * m)
                : ((v || "%" === c) &&
                    !Cr[hr(a, "display")] &&
                    (u.position = hr(t, "position")),
                  a === t && (u.position = "static"),
                  a.appendChild(zn),
                  (s = zn[f]),
                  a.removeChild(zn),
                  (u.position = "absolute"),
                  p && v && (((o = vt(a)).time = Pi.time), (o.width = a[f])),
                  yt(g ? (s * d) / m : s && d ? (m / s) * d : 0)))
            : ((s = l ? t.getBBox()[p ? "width" : "height"] : t[f]),
              yt(v ? (d / s) * m : (d / 100) * s)));
    },
    Er = function (e, t, i, n) {
      var r;
      return (
        Dn || gr(),
        t in Yn &&
          "transform" !== t &&
          ~(t = Yn[t]).indexOf(",") &&
          (t = t.split(",")[0]),
        Nn[t] && "transform" !== t
          ? ((r = Fr(e, n)),
            (r =
              "transformOrigin" !== t
                ? r[t]
                : r.svg
                ? r.origin
                : Rr(hr(e, or)) + " " + r.zOrigin + "px"))
          : (!(r = e.style[t]) ||
              "auto" === r ||
              n ||
              ~(r + "").indexOf("calc(")) &&
            (r =
              (Pr[t] && Pr[t](e, t, i)) ||
              hr(e, t) ||
              _t(e, t) ||
              ("opacity" === t ? 1 : 0)),
        i && !~(r + "").trim().indexOf(" ") ? Sr(e, t, r, i) + i : r
      );
    },
    Mr = function (e, t, i, n) {
      if (!i || "none" === i) {
        var r = mr(t, e, 1),
          s = r && hr(e, r, 1);
        s && s !== i
          ? ((t = r), (i = s))
          : "borderColor" === t && (i = hr(e, "borderTopColor"));
      }
      var a,
        o,
        l,
        d,
        c,
        u,
        p,
        h,
        f,
        m,
        g,
        v = new _n(this._pt, e.style, t, 0, 1, pn),
        _ = 0,
        b = 0;
      if (
        ((v.b = i),
        (v.e = n),
        (i += ""),
        "auto" === (n += "") &&
          ((e.style[t] = n), (n = hr(e, t) || n), (e.style[t] = i)),
        Ai((a = [i, n])),
        (n = a[1]),
        (l = (i = a[0]).match(Ye) || []),
        (n.match(Ye) || []).length)
      ) {
        for (; (o = Ye.exec(n)); )
          (p = o[0]),
            (f = n.substring(_, o.index)),
            c
              ? (c = (c + 1) % 5)
              : ("rgba(" !== f.substr(-5) && "hsla(" !== f.substr(-5)) ||
                (c = 1),
            p !== (u = l[b++] || "") &&
              ((d = parseFloat(u) || 0),
              (g = u.substr((d + "").length)),
              "=" === p.charAt(1) && (p = Tt(d, p) + g),
              (h = parseFloat(p)),
              (m = p.substr((h + "").length)),
              (_ = Ye.lastIndex - m.length),
              m ||
                ((m = m || Se.units[t] || g),
                _ === n.length && ((n += m), (v.e += m))),
              g !== m && (d = Sr(e, t, u, m) || 0),
              (v._pt = {
                _next: v._pt,
                p: f || 1 === b ? f : ",",
                s: d,
                c: h - d,
                m: (c && c < 4) || "zIndex" === t ? Math.round : 0,
              }));
        v.c = _ < n.length ? n.substring(_, n.length) : "";
      } else v.r = "display" === t && "none" === n ? Jn : Zn;
      return Ue.test(n) && (v.e = 0), (this._pt = v), v;
    },
    kr = {
      top: "0%",
      bottom: "100%",
      left: "0%",
      right: "100%",
      center: "50%",
    },
    Or = function (e) {
      var t = e.split(" "),
        i = t[0],
        n = t[1] || "50%";
      return (
        ("top" !== i && "bottom" !== i && "left" !== n && "right" !== n) ||
          ((e = i), (i = n), (n = e)),
        (t[0] = kr[i] || i),
        (t[1] = kr[n] || n),
        t.join(" ")
      );
    },
    Ar = function (e, t) {
      if (t.tween && t.tween._time === t.tween._dur) {
        var i,
          n,
          r,
          s = t.t,
          a = s.style,
          o = t.u,
          l = s._gsap;
        if ("all" === o || !0 === o) (a.cssText = ""), (n = 1);
        else
          for (r = (o = o.split(",")).length; --r > -1; )
            (i = o[r]),
              Nn[i] && ((n = 1), (i = "transformOrigin" === i ? or : ar)),
              wr(s, i);
        n &&
          (wr(s, ar),
          l &&
            (l.svg && s.removeAttribute("transform"),
            Fr(s, 1),
            (l.uncache = 1),
            dr(a)));
      }
    },
    Pr = {
      clearProps: function (e, t, i, n, r) {
        if ("isFromStart" !== r.data) {
          var s = (e._pt = new _n(e._pt, t, i, 0, 0, Ar));
          return (s.u = n), (s.pr = -10), (s.tween = r), e._props.push(i), 1;
        }
      },
    },
    $r = [1, 0, 0, 1, 0, 0],
    Lr = {},
    Dr = function (e) {
      return "matrix(1, 0, 0, 1, 0, 0)" === e || "none" === e || !e;
    },
    zr = function (e) {
      var t = hr(e, ar);
      return Dr(t) ? $r : t.substr(7).match(Xe).map(yt);
    },
    Ir = function (e, t) {
      var i,
        n,
        r,
        s,
        a = e._gsap || vt(e),
        o = e.style,
        l = zr(e);
      return a.svg && e.getAttribute("transform")
        ? "1,0,0,1,0,0" ===
          (l = [
            (r = e.transform.baseVal.consolidate().matrix).a,
            r.b,
            r.c,
            r.d,
            r.e,
            r.f,
          ]).join(",")
          ? $r
          : l
        : (l !== $r ||
            e.offsetParent ||
            e === Ln ||
            a.svg ||
            ((r = o.display),
            (o.display = "block"),
            ((i = e.parentNode) && e.offsetParent) ||
              ((s = 1), (n = e.nextElementSibling), Ln.appendChild(e)),
            (l = zr(e)),
            r ? (o.display = r) : wr(e, "display"),
            s &&
              (n
                ? i.insertBefore(e, n)
                : i
                ? i.appendChild(e)
                : Ln.removeChild(e))),
          t && l.length > 6 ? [l[0], l[1], l[4], l[5], l[12], l[13]] : l);
    },
    Br = function (e, t, i, n, r, s) {
      var a,
        o,
        l,
        d = e._gsap,
        c = r || Ir(e, !0),
        u = d.xOrigin || 0,
        p = d.yOrigin || 0,
        h = d.xOffset || 0,
        f = d.yOffset || 0,
        m = c[0],
        g = c[1],
        v = c[2],
        _ = c[3],
        b = c[4],
        y = c[5],
        w = t.split(" "),
        T = parseFloat(w[0]) || 0,
        x = parseFloat(w[1]) || 0;
      i
        ? c !== $r &&
          (o = m * _ - g * v) &&
          ((l = T * (-g / o) + x * (m / o) - (m * y - g * b) / o),
          (T = T * (_ / o) + x * (-v / o) + (v * y - _ * b) / o),
          (x = l))
        : ((T = (a = br(e)).x + (~w[0].indexOf("%") ? (T / 100) * a.width : T)),
          (x =
            a.y + (~(w[1] || w[0]).indexOf("%") ? (x / 100) * a.height : x))),
        n || (!1 !== n && d.smooth)
          ? ((b = T - u),
            (y = x - p),
            (d.xOffset = h + (b * m + y * v) - b),
            (d.yOffset = f + (b * g + y * _) - y))
          : (d.xOffset = d.yOffset = 0),
        (d.xOrigin = T),
        (d.yOrigin = x),
        (d.smooth = !!n),
        (d.origin = t),
        (d.originIsAbsolute = !!i),
        (e.style[or] = "0px 0px"),
        s &&
          (Tr(s, d, "xOrigin", u, T),
          Tr(s, d, "yOrigin", p, x),
          Tr(s, d, "xOffset", h, d.xOffset),
          Tr(s, d, "yOffset", f, d.yOffset)),
        e.setAttribute("data-svg-origin", T + " " + x);
    },
    Fr = function (e, t) {
      var i = e._gsap || new qi(e);
      if ("x" in i && !t && !i.uncache) return i;
      var n,
        r,
        s,
        a,
        o,
        l,
        d,
        c,
        u,
        p,
        h,
        f,
        m,
        g,
        v,
        _,
        b,
        y,
        w,
        T,
        x,
        C,
        S,
        E,
        M,
        k,
        O,
        A,
        P,
        $,
        L,
        D,
        z = e.style,
        I = i.scaleX < 0,
        B = "px",
        F = "deg",
        R = getComputedStyle(e),
        N = hr(e, or) || "0";
      return (
        (n = r = s = l = d = c = u = p = h = 0),
        (a = o = 1),
        (i.svg = !(!e.getCTM || !yr(e))),
        R.translate &&
          (("none" === R.translate &&
            "none" === R.scale &&
            "none" === R.rotate) ||
            (z[ar] =
              ("none" !== R.translate
                ? "translate3d(" +
                  (R.translate + " 0 0").split(" ").slice(0, 3).join(", ") +
                  ") "
                : "") +
              ("none" !== R.rotate ? "rotate(" + R.rotate + ") " : "") +
              ("none" !== R.scale
                ? "scale(" + R.scale.split(" ").join(",") + ") "
                : "") +
              ("none" !== R[ar] ? R[ar] : "")),
          (z.scale = z.rotate = z.translate = "none")),
        (g = Ir(e, i.svg)),
        i.svg &&
          (i.uncache
            ? ((M = e.getBBox()),
              (N = i.xOrigin - M.x + "px " + (i.yOrigin - M.y) + "px"),
              (E = ""))
            : (E = !t && e.getAttribute("data-svg-origin")),
          Br(e, E || N, !!E || i.originIsAbsolute, !1 !== i.smooth, g)),
        (f = i.xOrigin || 0),
        (m = i.yOrigin || 0),
        g !== $r &&
          ((y = g[0]),
          (w = g[1]),
          (T = g[2]),
          (x = g[3]),
          (n = C = g[4]),
          (r = S = g[5]),
          6 === g.length
            ? ((a = Math.sqrt(y * y + w * w)),
              (o = Math.sqrt(x * x + T * T)),
              (l = y || w ? Hn(w, y) * Gn : 0),
              (u = T || x ? Hn(T, x) * Gn + l : 0) &&
                (o *= Math.abs(Math.cos(u * jn))),
              i.svg && ((n -= f - (f * y + m * T)), (r -= m - (f * w + m * x))))
            : ((D = g[6]),
              ($ = g[7]),
              (O = g[8]),
              (A = g[9]),
              (P = g[10]),
              (L = g[11]),
              (n = g[12]),
              (r = g[13]),
              (s = g[14]),
              (d = (v = Hn(D, P)) * Gn),
              v &&
                ((E = C * (_ = Math.cos(-v)) + O * (b = Math.sin(-v))),
                (M = S * _ + A * b),
                (k = D * _ + P * b),
                (O = C * -b + O * _),
                (A = S * -b + A * _),
                (P = D * -b + P * _),
                (L = $ * -b + L * _),
                (C = E),
                (S = M),
                (D = k)),
              (c = (v = Hn(-T, P)) * Gn),
              v &&
                ((_ = Math.cos(-v)),
                (L = x * (b = Math.sin(-v)) + L * _),
                (y = E = y * _ - O * b),
                (w = M = w * _ - A * b),
                (T = k = T * _ - P * b)),
              (l = (v = Hn(w, y)) * Gn),
              v &&
                ((E = y * (_ = Math.cos(v)) + w * (b = Math.sin(v))),
                (M = C * _ + S * b),
                (w = w * _ - y * b),
                (S = S * _ - C * b),
                (y = E),
                (C = M)),
              d &&
                Math.abs(d) + Math.abs(l) > 359.9 &&
                ((d = l = 0), (c = 180 - c)),
              (a = yt(Math.sqrt(y * y + w * w + T * T))),
              (o = yt(Math.sqrt(S * S + D * D))),
              (v = Hn(C, S)),
              (u = Math.abs(v) > 2e-4 ? v * Gn : 0),
              (h = L ? 1 / (L < 0 ? -L : L) : 0)),
          i.svg &&
            ((E = e.getAttribute("transform")),
            (i.forceCSS = e.setAttribute("transform", "") || !Dr(hr(e, ar))),
            E && e.setAttribute("transform", E))),
        Math.abs(u) > 90 &&
          Math.abs(u) < 270 &&
          (I
            ? ((a *= -1),
              (u += l <= 0 ? 180 : -180),
              (l += l <= 0 ? 180 : -180))
            : ((o *= -1), (u += u <= 0 ? 180 : -180))),
        (t = t || i.uncache),
        (i.x =
          n -
          ((i.xPercent =
            n &&
            ((!t && i.xPercent) ||
              (Math.round(e.offsetWidth / 2) === Math.round(-n) ? -50 : 0)))
            ? (e.offsetWidth * i.xPercent) / 100
            : 0) +
          B),
        (i.y =
          r -
          ((i.yPercent =
            r &&
            ((!t && i.yPercent) ||
              (Math.round(e.offsetHeight / 2) === Math.round(-r) ? -50 : 0)))
            ? (e.offsetHeight * i.yPercent) / 100
            : 0) +
          B),
        (i.z = s + B),
        (i.scaleX = yt(a)),
        (i.scaleY = yt(o)),
        (i.rotation = yt(l) + F),
        (i.rotationX = yt(d) + F),
        (i.rotationY = yt(c) + F),
        (i.skewX = u + F),
        (i.skewY = p + F),
        (i.transformPerspective = h + B),
        (i.zOrigin = parseFloat(N.split(" ")[2]) || 0) && (z[or] = Rr(N)),
        (i.xOffset = i.yOffset = 0),
        (i.force3D = Se.force3D),
        (i.renderTransform = i.svg ? Xr : Fn ? Vr : Gr),
        (i.uncache = 0),
        i
      );
    },
    Rr = function (e) {
      return (e = e.split(" "))[0] + " " + e[1];
    },
    Nr = function (e, t, i) {
      var n = ri(t);
      return yt(parseFloat(t) + parseFloat(Sr(e, "x", i + "px", n))) + n;
    },
    Gr = function (e, t) {
      (t.z = "0px"),
        (t.rotationY = t.rotationX = "0deg"),
        (t.force3D = 0),
        Vr(e, t);
    },
    jr = "0deg",
    Hr = "0px",
    qr = ") ",
    Vr = function (e, t) {
      var i = t || this,
        n = i.xPercent,
        r = i.yPercent,
        s = i.x,
        a = i.y,
        o = i.z,
        l = i.rotation,
        d = i.rotationY,
        c = i.rotationX,
        u = i.skewX,
        p = i.skewY,
        h = i.scaleX,
        f = i.scaleY,
        m = i.transformPerspective,
        g = i.force3D,
        v = i.target,
        _ = i.zOrigin,
        b = "",
        y = ("auto" === g && e && 1 !== e) || !0 === g;
      if (_ && (c !== jr || d !== jr)) {
        var w,
          T = parseFloat(d) * jn,
          x = Math.sin(T),
          C = Math.cos(T);
        (T = parseFloat(c) * jn),
          (w = Math.cos(T)),
          (s = Nr(v, s, x * w * -_)),
          (a = Nr(v, a, -Math.sin(T) * -_)),
          (o = Nr(v, o, C * w * -_ + _));
      }
      m !== Hr && (b += "perspective(" + m + qr),
        (n || r) && (b += "translate(" + n + "%, " + r + "%) "),
        (y || s !== Hr || a !== Hr || o !== Hr) &&
          (b +=
            o !== Hr || y
              ? "translate3d(" + s + ", " + a + ", " + o + ") "
              : "translate(" + s + ", " + a + qr),
        l !== jr && (b += "rotate(" + l + qr),
        d !== jr && (b += "rotateY(" + d + qr),
        c !== jr && (b += "rotateX(" + c + qr),
        (u === jr && p === jr) || (b += "skew(" + u + ", " + p + qr),
        (1 === h && 1 === f) || (b += "scale(" + h + ", " + f + qr),
        (v.style[ar] = b || "translate(0, 0)");
    },
    Xr = function (e, t) {
      var i,
        n,
        r,
        s,
        a,
        o = t || this,
        l = o.xPercent,
        d = o.yPercent,
        c = o.x,
        u = o.y,
        p = o.rotation,
        h = o.skewX,
        f = o.skewY,
        m = o.scaleX,
        g = o.scaleY,
        v = o.target,
        _ = o.xOrigin,
        b = o.yOrigin,
        y = o.xOffset,
        w = o.yOffset,
        T = o.forceCSS,
        x = parseFloat(c),
        C = parseFloat(u);
      (p = parseFloat(p)),
        (h = parseFloat(h)),
        (f = parseFloat(f)) && ((h += f = parseFloat(f)), (p += f)),
        p || h
          ? ((p *= jn),
            (h *= jn),
            (i = Math.cos(p) * m),
            (n = Math.sin(p) * m),
            (r = Math.sin(p - h) * -g),
            (s = Math.cos(p - h) * g),
            h &&
              ((f *= jn),
              (a = Math.tan(h - f)),
              (r *= a = Math.sqrt(1 + a * a)),
              (s *= a),
              f &&
                ((a = Math.tan(f)), (i *= a = Math.sqrt(1 + a * a)), (n *= a))),
            (i = yt(i)),
            (n = yt(n)),
            (r = yt(r)),
            (s = yt(s)))
          : ((i = m), (s = g), (n = r = 0)),
        ((x && !~(c + "").indexOf("px")) || (C && !~(u + "").indexOf("px"))) &&
          ((x = Sr(v, "x", c, "px")), (C = Sr(v, "y", u, "px"))),
        (_ || b || y || w) &&
          ((x = yt(x + _ - (_ * i + b * r) + y)),
          (C = yt(C + b - (_ * n + b * s) + w))),
        (l || d) &&
          ((a = v.getBBox()),
          (x = yt(x + (l / 100) * a.width)),
          (C = yt(C + (d / 100) * a.height))),
        (a =
          "matrix(" +
          i +
          "," +
          n +
          "," +
          r +
          "," +
          s +
          "," +
          x +
          "," +
          C +
          ")"),
        v.setAttribute("transform", a),
        T && (v.style[ar] = a);
    },
    Yr = function (e, t, i, n, r) {
      var s,
        a,
        o = 360,
        l = ze(r),
        d = parseFloat(r) * (l && ~r.indexOf("rad") ? Gn : 1) - n,
        c = n + d + "deg";
      return (
        l &&
          ("short" === (s = r.split("_")[1]) &&
            (d %= o) !== d % 180 &&
            (d += d < 0 ? o : -360),
          "cw" === s && d < 0
            ? (d = ((d + 36e9) % o) - ~~(d / o) * o)
            : "ccw" === s && d > 0 && (d = ((d - 36e9) % o) - ~~(d / o) * o)),
        (e._pt = a = new _n(e._pt, t, i, n, d, Un)),
        (a.e = c),
        (a.u = "deg"),
        e._props.push(i),
        a
      );
    },
    Wr = function (e, t) {
      for (var i in t) e[i] = t[i];
      return e;
    },
    Ur = function (e, t, i) {
      var n,
        r,
        s,
        a,
        o,
        l,
        d,
        c = Wr({}, i._gsap),
        u = i.style;
      for (r in (c.svg
        ? ((s = i.getAttribute("transform")),
          i.setAttribute("transform", ""),
          (u[ar] = t),
          (n = Fr(i, 1)),
          wr(i, ar),
          i.setAttribute("transform", s))
        : ((s = getComputedStyle(i)[ar]),
          (u[ar] = t),
          (n = Fr(i, 1)),
          (u[ar] = s)),
      Nn))
        (s = c[r]) !== (a = n[r]) &&
          "perspective,force3D,transformOrigin,svgOrigin".indexOf(r) < 0 &&
          ((o = ri(s) !== (d = ri(a)) ? Sr(i, r, s, d) : parseFloat(s)),
          (l = parseFloat(a)),
          (e._pt = new _n(e._pt, n, r, o, l - o, Wn)),
          (e._pt.u = d || 0),
          e._props.push(r));
      Wr(n, c);
    };
  bt("padding,margin,Width,Radius", function (e, t) {
    var i = "Top",
      n = "Right",
      r = "Bottom",
      s = "Left",
      a = (t < 3 ? [i, n, r, s] : [i + s, i + n, r + n, r + s]).map(function (
        i
      ) {
        return t < 2 ? e + i : "border" + i + e;
      });
    Pr[t > 1 ? "border" + e : e] = function (e, t, i, n, r) {
      var s, o;
      if (arguments.length < 4)
        return (
          (s = a.map(function (t) {
            return Er(e, t, i);
          })),
          5 === (o = s.join(" ")).split(s[0]).length ? s[0] : o
        );
      (s = (n + "").split(" ")),
        (o = {}),
        a.forEach(function (e, t) {
          return (o[e] = s[t] = s[t] || s[((t - 1) / 2) | 0]);
        }),
        e.init(t, o, r);
    };
  });
  var Kr,
    Qr,
    Zr,
    Jr = {
      name: "css",
      register: gr,
      targetTest: function (e) {
        return e.style && e.nodeType;
      },
      init: function (e, t, i, n, r) {
        var s,
          a,
          o,
          l,
          d,
          c,
          u,
          p,
          h,
          f,
          m,
          g,
          v,
          _,
          b,
          y,
          w = this._props,
          T = e.style,
          x = i.vars.startAt;
        for (u in (Dn || gr(),
        (this.styles = this.styles || ur(e)),
        (y = this.styles.props),
        (this.tween = i),
        t))
          if (
            "autoRound" !== u &&
            ((a = t[u]), !ut[u] || !Qi(u, t, i, n, e, r))
          )
            if (
              ((d = typeof a),
              (c = Pr[u]),
              "function" === d && (d = typeof (a = a.call(i, n, e, r))),
              "string" === d && ~a.indexOf("random(") && (a = gi(a)),
              c)
            )
              c(this, e, u, a, i) && (b = 1);
            else if ("--" === u.substr(0, 2))
              (s = (getComputedStyle(e).getPropertyValue(u) + "").trim()),
                (a += ""),
                (ki.lastIndex = 0),
                ki.test(s) || ((p = ri(s)), (h = ri(a))),
                h ? p !== h && (s = Sr(e, u, s, h) + h) : p && (a += p),
                this.add(T, "setProperty", s, a, n, r, 0, 0, u),
                w.push(u),
                y.push(u, 0, T[u]);
            else if ("undefined" !== d) {
              if (
                (x && u in x
                  ? ((s =
                      "function" == typeof x[u] ? x[u].call(i, n, e, r) : x[u]),
                    ze(s) && ~s.indexOf("random(") && (s = gi(s)),
                    ri(s + "") || (s += Se.units[u] || ri(Er(e, u)) || ""),
                    "=" === (s + "").charAt(1) && (s = Er(e, u)))
                  : (s = Er(e, u)),
                (l = parseFloat(s)),
                (f = "string" === d && "=" === a.charAt(1) && a.substr(0, 2)) &&
                  (a = a.substr(2)),
                (o = parseFloat(a)),
                u in Yn &&
                  ("autoAlpha" === u &&
                    (1 === l &&
                      "hidden" === Er(e, "visibility") &&
                      o &&
                      (l = 0),
                    y.push("visibility", 0, T.visibility),
                    Tr(
                      this,
                      T,
                      "visibility",
                      l ? "inherit" : "hidden",
                      o ? "inherit" : "hidden",
                      !o
                    )),
                  "scale" !== u &&
                    "transform" !== u &&
                    ~(u = Yn[u]).indexOf(",") &&
                    (u = u.split(",")[0])),
                (m = u in Nn))
              )
                if (
                  (this.styles.save(u),
                  g ||
                    (((v = e._gsap).renderTransform && !t.parseTransform) ||
                      Fr(e, t.parseTransform),
                    (_ = !1 !== t.smoothOrigin && v.smooth),
                    ((g = this._pt =
                      new _n(
                        this._pt,
                        T,
                        ar,
                        0,
                        1,
                        v.renderTransform,
                        v,
                        0,
                        -1
                      )).dep = 1)),
                  "scale" === u)
                )
                  (this._pt = new _n(
                    this._pt,
                    v,
                    "scaleY",
                    l,
                    (f ? Tt(l, f + o) : o) - l || 0,
                    Wn
                  )),
                    (this._pt.u = 0),
                    w.push("scaleY", u),
                    (u += "X");
                else {
                  if ("transformOrigin" === u) {
                    y.push(or, 0, T[or]),
                      (a = Or(a)),
                      v.svg
                        ? Br(e, a, 0, _, 0, this)
                        : ((h = parseFloat(a.split(" ")[2]) || 0) !==
                            v.zOrigin && Tr(this, v, "zOrigin", v.zOrigin, h),
                          Tr(this, T, u, Rr(s), Rr(a)));
                    continue;
                  }
                  if ("svgOrigin" === u) {
                    Br(e, a, 1, _, 0, this);
                    continue;
                  }
                  if (u in Lr) {
                    Yr(this, v, u, l, f ? Tt(l, f + a) : a);
                    continue;
                  }
                  if ("smoothOrigin" === u) {
                    Tr(this, v, "smooth", v.smooth, a);
                    continue;
                  }
                  if ("force3D" === u) {
                    v[u] = a;
                    continue;
                  }
                  if ("transform" === u) {
                    Ur(this, a, e);
                    continue;
                  }
                }
              else u in T || (u = mr(u) || u);
              if (
                m ||
                ((o || 0 === o) && (l || 0 === l) && !Xn.test(a) && u in T)
              )
                o || (o = 0),
                  (p = (s + "").substr((l + "").length)) !==
                    (h = ri(a) || (u in Se.units ? Se.units[u] : p)) &&
                    (l = Sr(e, u, s, h)),
                  (this._pt = new _n(
                    this._pt,
                    m ? v : T,
                    u,
                    l,
                    (f ? Tt(l, f + o) : o) - l,
                    m || ("px" !== h && "zIndex" !== u) || !1 === t.autoRound
                      ? Wn
                      : Qn
                  )),
                  (this._pt.u = h || 0),
                  p !== h && "%" !== h && ((this._pt.b = s), (this._pt.r = Kn));
              else if (u in T) Mr.call(this, e, u, s, f ? f + a : a);
              else {
                if (!(u in e)) {
                  tt(u, a);
                  continue;
                }
                this.add(e, u, s || e[u], f ? f + a : a, n, r);
              }
              m || (u in T ? y.push(u, 0, T[u]) : y.push(u, 1, s || e[u])),
                w.push(u);
            }
        b && vn(this);
      },
      render: function (e, t) {
        if (t.tween._time || !Bn())
          for (var i = t._pt; i; ) i.r(e, i.d), (i = i._next);
        else t.styles.revert();
      },
      get: Er,
      aliases: Yn,
      getSetter: function (e, t, i) {
        var n = Yn[t];
        return (
          n && n.indexOf(",") < 0 && (t = n),
          t in Nn && t !== or && (e._gsap.x || Er(e, "x"))
            ? i && In === i
              ? "scale" === t
                ? nr
                : ir
              : (In = i || {}) && ("scale" === t ? rr : sr)
            : e.style && !Fe(e.style[t])
            ? er
            : ~t.indexOf("-")
            ? tr
            : dn(e, t)
        );
      },
      core: { _removeProperty: wr, _getMatrix: Ir },
    };
  (An.utils.checkPrefix = mr),
    (An.core.getStyleSaver = ur),
    (Zr = bt(
      (Kr = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent") +
        "," +
        (Qr = "rotation,rotationX,rotationY,skewX,skewY") +
        ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",
      function (e) {
        Nn[e] = 1;
      }
    )),
    bt(Qr, function (e) {
      (Se.units[e] = "deg"), (Lr[e] = 1);
    }),
    (Yn[Zr[13]] = Kr + "," + Qr),
    bt(
      "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY",
      function (e) {
        var t = e.split(":");
        Yn[t[1]] = Zr[t[0]];
      }
    ),
    bt(
      "x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",
      function (e) {
        Se.units[e] = "px";
      }
    ),
    An.registerPlugin(Jr);
  var es = An.registerPlugin(Jr) || An;
  es.core.Tween;
  function ts() {
    let e = document.querySelectorAll(
      '[class*="__swiper"]:not(.swiper-wrapper)'
    );
    e &&
      e.forEach((e) => {
        e.parentElement.classList.add("swiper"),
          e.classList.add("swiper-wrapper");
        for (const t of e.children) t.classList.add("swiper-slide");
      });
  }
  window.addEventListener("load", function (e) {
    !(function () {
      ts();
      const e = new ne(".mainpage__slider", {
          modules: [ce, re, le],
          pagination: {
            el: ".conunt-pagination__total",
            type: "custom",
            renderCustom: function (e, t, i) {
              return i < 10 ? `0${i}` : `${i}`;
            },
          },
          mousewheel: { invert: !1 },
          updateOnWindowResize: !0,
          observer: !0,
          observeParents: !0,
          slidesPerView: 1,
          spaceBetween: 0,
          autoHeight: !0,
          speed: 2400,
          parallax: !0,
          loop: !1,
          on: {},
        }),
        t = new ne(".mainpage-text__slider", {
          modules: [ce, re, ue, le, de, ae],
          scrollbar: { el: ".box-nav__scroll-bar", draggable: !0 },
          updateOnWindowResize: !0,
          pagination: {
            el: ".box-nav__pagging",
            type: "bullets",
            clickable: !0,
          },
          controller: { control: e },
          mousewheel: { invert: !1 },
          navigation: {
            prevEl: ".box-nav__arrow-prev",
            nextEl: ".box-nav__arrow-next",
          },
          observer: !0,
          observeParents: !0,
          slidesPerView: 1,
          spaceBetween: 0,
          autoHeight: !0,
          speed: 2400,
          parallax: !0,
          loop: !1,
          on: {
            slideNextTransitionStart: function () {
              es.to(i, 2.8, { rotation: "+=40", ease: Rn.easeOut });
            },
            slidePrevTransitionStart: function () {
              es.to(i, 2.8, { rotation: "-=40", ease: Rn.easeOut });
            },
          },
        }),
        i = document.querySelector(".mainpage__gear");
      let n = document.querySelector(".conunt-pagination__current"),
        r = document.querySelector(".current-num__digit");
      t.on("slideChange", function () {
        let e = t.realIndex + 1,
          i = e >= 10 ? e : `0${e}`;
        es.to(n, 0.2, {
          force3D: !0,
          y: -10,
          opacity: 0,
          ease: Rn.easeOut,
          onComplete: function () {
            es.to(n, 0.4, { force3D: !0, y: 10 }), (n.innerHTML = i);
          },
        }),
          es.to(n, 0.4, {
            force3D: !0,
            y: 0,
            opacity: 1,
            ease: Rn.easeOut,
            delay: 0.6,
          }),
          es.to(r, 0.4, {
            force3D: !0,
            y: -10,
            opacity: 0,
            ease: Rn.easeOut,
            onComplete: function () {
              es.to(r, 0.4, { force3D: !0, y: 10 }), (r.innerHTML = i);
            },
          }),
          es.to(r, 0.4, {
            force3D: !0,
            y: 0,
            opacity: 1,
            ease: Rn.easeOut,
            delay: 0.6,
          });
      });
    })();
  });
  let is = !1;
  function ns(e, t) {
    for (var i = 0; i < t.length; i++) {
      var n = t[i];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        "value" in n && (n.writable = !0),
        Object.defineProperty(e, n.key, n);
    }
  }
  function rs(e) {
    return (
      (function (e) {
        if (Array.isArray(e)) return ss(e);
      })(e) ||
      (function (e) {
        if ("undefined" != typeof Symbol && Symbol.iterator in Object(e))
          return Array.from(e);
      })(e) ||
      (function (e, t) {
        if (e) {
          if ("string" == typeof e) return ss(e, t);
          var i = Object.prototype.toString.call(e).slice(8, -1);
          return (
            "Object" === i && e.constructor && (i = e.constructor.name),
            "Map" === i || "Set" === i
              ? Array.from(e)
              : "Arguments" === i ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)
              ? ss(e, t)
              : void 0
          );
        }
      })(e) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      })()
    );
  }
  function ss(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var i = 0, n = new Array(t); i < t; i++) n[i] = e[i];
    return n;
  }
  setTimeout(() => {
    if (is) {
      let e = new Event("windowScroll");
      window.addEventListener("scroll", function (t) {
        document.dispatchEvent(e);
      });
    }
  }, 0);
  var as,
    os,
    ls,
    ds,
    cs,
    us =
      ((as = [
        "a[href]",
        "area[href]",
        'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
        "select:not([disabled]):not([aria-hidden])",
        "textarea:not([disabled]):not([aria-hidden])",
        "button:not([disabled]):not([aria-hidden])",
        "iframe",
        "object",
        "embed",
        "[contenteditable]",
        '[tabindex]:not([tabindex^="-"])',
      ]),
      (os = (function () {
        function e(t) {
          var i = t.targetModal,
            n = t.triggers,
            r = void 0 === n ? [] : n,
            s = t.onShow,
            a = void 0 === s ? function () {} : s,
            o = t.onClose,
            l = void 0 === o ? function () {} : o,
            d = t.openTrigger,
            c = void 0 === d ? "data-micromodal-trigger" : d,
            u = t.closeTrigger,
            p = void 0 === u ? "data-micromodal-close" : u,
            h = t.openClass,
            f = void 0 === h ? "is-open" : h,
            m = t.disableScroll,
            g = void 0 !== m && m,
            v = t.disableFocus,
            _ = void 0 !== v && v,
            b = t.awaitCloseAnimation,
            y = void 0 !== b && b,
            w = t.awaitOpenAnimation,
            T = void 0 !== w && w,
            x = t.debugMode,
            C = void 0 !== x && x;
          !(function (e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          })(this, e),
            (this.modal = document.getElementById(i)),
            (this.config = {
              debugMode: C,
              disableScroll: g,
              openTrigger: c,
              closeTrigger: p,
              openClass: f,
              onShow: a,
              onClose: l,
              awaitCloseAnimation: y,
              awaitOpenAnimation: T,
              disableFocus: _,
            }),
            r.length > 0 && this.registerTriggers.apply(this, rs(r)),
            (this.onClick = this.onClick.bind(this)),
            (this.onKeydown = this.onKeydown.bind(this));
        }
        var t, i;
        return (
          (t = e),
          (i = [
            {
              key: "registerTriggers",
              value: function () {
                for (
                  var e = this, t = arguments.length, i = new Array(t), n = 0;
                  n < t;
                  n++
                )
                  i[n] = arguments[n];
                i.filter(Boolean).forEach(function (t) {
                  t.addEventListener("click", function (t) {
                    return e.showModal(t);
                  });
                });
              },
            },
            {
              key: "showModal",
              value: function () {
                var e = this,
                  t =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : null;
                if (
                  ((this.activeElement = document.activeElement),
                  this.modal.setAttribute("aria-hidden", "false"),
                  this.modal.classList.add(this.config.openClass),
                  this.scrollBehaviour("disable"),
                  this.addEventListeners(),
                  this.config.awaitOpenAnimation)
                ) {
                  var i = function t() {
                    e.modal.removeEventListener("animationend", t, !1),
                      e.setFocusToFirstNode();
                  };
                  this.modal.addEventListener("animationend", i, !1);
                } else this.setFocusToFirstNode();
                this.config.onShow(this.modal, this.activeElement, t);
              },
            },
            {
              key: "closeModal",
              value: function () {
                var e =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : null,
                  t = this.modal;
                if (
                  (this.modal.setAttribute("aria-hidden", "true"),
                  this.removeEventListeners(),
                  this.scrollBehaviour("enable"),
                  this.activeElement &&
                    this.activeElement.focus &&
                    this.activeElement.focus(),
                  this.config.onClose(this.modal, this.activeElement, e),
                  this.config.awaitCloseAnimation)
                ) {
                  var i = this.config.openClass;
                  this.modal.addEventListener(
                    "animationend",
                    function e() {
                      t.classList.remove(i),
                        t.removeEventListener("animationend", e, !1);
                    },
                    !1
                  );
                } else t.classList.remove(this.config.openClass);
              },
            },
            {
              key: "closeModalById",
              value: function (e) {
                (this.modal = document.getElementById(e)),
                  this.modal && this.closeModal();
              },
            },
            {
              key: "scrollBehaviour",
              value: function (e) {
                if (this.config.disableScroll) {
                  var t = document.querySelector("body");
                  switch (e) {
                    case "enable":
                      Object.assign(t.style, { overflow: "" });
                      break;
                    case "disable":
                      Object.assign(t.style, { overflow: "hidden" });
                  }
                }
              },
            },
            {
              key: "addEventListeners",
              value: function () {
                this.modal.addEventListener("touchstart", this.onClick),
                  this.modal.addEventListener("click", this.onClick),
                  document.addEventListener("keydown", this.onKeydown);
              },
            },
            {
              key: "removeEventListeners",
              value: function () {
                this.modal.removeEventListener("touchstart", this.onClick),
                  this.modal.removeEventListener("click", this.onClick),
                  document.removeEventListener("keydown", this.onKeydown);
              },
            },
            {
              key: "onClick",
              value: function (e) {
                (e.target.hasAttribute(this.config.closeTrigger) ||
                  e.target.parentNode.hasAttribute(this.config.closeTrigger)) &&
                  (e.preventDefault(), e.stopPropagation(), this.closeModal(e));
              },
            },
            {
              key: "onKeydown",
              value: function (e) {
                27 === e.keyCode && this.closeModal(e),
                  9 === e.keyCode && this.retainFocus(e);
              },
            },
            {
              key: "getFocusableNodes",
              value: function () {
                var e = this.modal.querySelectorAll(as);
                return Array.apply(void 0, rs(e));
              },
            },
            {
              key: "setFocusToFirstNode",
              value: function () {
                var e = this;
                if (!this.config.disableFocus) {
                  var t = this.getFocusableNodes();
                  if (0 !== t.length) {
                    var i = t.filter(function (t) {
                      return !t.hasAttribute(e.config.closeTrigger);
                    });
                    i.length > 0 && i[0].focus(),
                      0 === i.length && t[0].focus();
                  }
                }
              },
            },
            {
              key: "retainFocus",
              value: function (e) {
                var t = this.getFocusableNodes();
                if (0 !== t.length)
                  if (
                    ((t = t.filter(function (e) {
                      return null !== e.offsetParent;
                    })),
                    this.modal.contains(document.activeElement))
                  ) {
                    var i = t.indexOf(document.activeElement);
                    e.shiftKey &&
                      0 === i &&
                      (t[t.length - 1].focus(), e.preventDefault()),
                      !e.shiftKey &&
                        t.length > 0 &&
                        i === t.length - 1 &&
                        (t[0].focus(), e.preventDefault());
                  } else t[0].focus();
              },
            },
          ]) && ns(t.prototype, i),
          e
        );
      })()),
      (ls = null),
      (ds = function (e) {
        if (!document.getElementById(e))
          return (
            console.warn(
              "MicroModal: ❗Seems like you have missed %c'".concat(e, "'"),
              "background-color: #f8f9fa;color: #50596c;font-weight: bold;",
              "ID somewhere in your code. Refer example below to resolve it."
            ),
            console.warn(
              "%cExample:",
              "background-color: #f8f9fa;color: #50596c;font-weight: bold;",
              '<div class="modal" id="'.concat(e, '"></div>')
            ),
            !1
          );
      }),
      (cs = function (e, t) {
        if (
          ((function (e) {
            e.length <= 0 &&
              (console.warn(
                "MicroModal: ❗Please specify at least one %c'micromodal-trigger'",
                "background-color: #f8f9fa;color: #50596c;font-weight: bold;",
                "data attribute."
              ),
              console.warn(
                "%cExample:",
                "background-color: #f8f9fa;color: #50596c;font-weight: bold;",
                '<a href="#" data-micromodal-trigger="my-modal"></a>'
              ));
          })(e),
          !t)
        )
          return !0;
        for (var i in t) ds(i);
        return !0;
      }),
      {
        init: function (e) {
          var t = Object.assign(
              {},
              { openTrigger: "data-micromodal-trigger" },
              e
            ),
            i = rs(document.querySelectorAll("[".concat(t.openTrigger, "]"))),
            n = (function (e, t) {
              var i = [];
              return (
                e.forEach(function (e) {
                  var n = e.attributes[t].value;
                  void 0 === i[n] && (i[n] = []), i[n].push(e);
                }),
                i
              );
            })(i, t.openTrigger);
          if (!0 !== t.debugMode || !1 !== cs(i, n))
            for (var r in n) {
              var s = n[r];
              (t.targetModal = r), (t.triggers = rs(s)), (ls = new os(t));
            }
        },
        show: function (e, t) {
          var i = t || {};
          (i.targetModal = e),
            (!0 === i.debugMode && !1 === ds(e)) ||
              (ls && ls.removeEventListeners(), (ls = new os(i)).showModal());
        },
        close: function (e) {
          e ? ls.closeModalById(e) : ls.closeModal();
        },
      });
  "undefined" != typeof window && (window.MicroModal = us);
  const ps = us;
  window.addEventListener("DOMContentLoaded", () => {
    ps.init({
      openTrigger: "data-micromodal-open",
      closeTrigger: "data-micromodal-close",
      disableFocus: !0,
      disableScroll: !0,
      awaitOpenAnimation: !0,
      awaitCloseAnimation: !0,
    });
  }),
    (window.FLS = !0),
    (function (e) {
      let t = new Image();
      (t.onload = t.onerror =
        function () {
          e(2 == t.height);
        }),
        (t.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (e) {
      let t = !0 === e ? "webp" : "no-webp";
      document.documentElement.classList.add(t);
    }),
    t.any() && document.documentElement.classList.add("touch"),
    (function () {
      let e = document.querySelector(".icon-menu");
      e &&
        e.addEventListener("click", function (e) {
          i &&
            (((e = 500) => {
              document.documentElement.classList.contains("lock") ? n(e) : r(e);
            })(),
            document.documentElement.classList.toggle("menu-open"));
        });
    })(),
    (function () {
      if (document.querySelectorAll("[data-fullscreen]").length && t.any()) {
        function e() {
          let e = 0.01 * window.innerHeight;
          document.documentElement.style.setProperty("--vh", `${e}px`);
        }
        window.addEventListener("resize", e), e();
      }
    })();
})();
