var zoom = function() {
  function t(t, n, e) {
    var r = t.translate(),
      i = Math.atan2(n[1] - r[1], n[0] - r[0]) - Math.atan2(e[1] - r[1], e[0] - r[0]);
    return [Math.cos(i / 2), 0, 0, Math.sin(i / 2)]
  }

  function n(t, n) {
    var e = t.invert(n);
    return e && isFinite(e[0]) && isFinite(e[1]) && c(e)
  }

  function e(t) {
    var n = .5 * t[0] * l,
      e = .5 * t[1] * l,
      r = .5 * t[2] * l,
      i = Math.sin(n),
      a = Math.cos(n),
      o = Math.sin(e),
      c = Math.cos(e),
      u = Math.sin(r),
      s = Math.cos(r);
    return [a * c * s + i * o * u, i * c * s - a * o * u, a * o * s + i * c * u, a * c * u - i * o * s]
  }

  function r(t, n) {
    var e = t[0],
      r = t[1],
      i = t[2],
      a = t[3],
      o = n[0],
      c = n[1],
      u = n[2],
      s = n[3];
    return [e * o - r * c - i * u - a * s, e * c + r * o + i * s - a * u, e * u - r * s + i * o + a * c, e * s + r * u - i * c + a * o]
  }

  function i(t, n) {
    if (t && n) {
      var e = s(t, n),
        r = Math.sqrt(u(e, e)),
        i = .5 * Math.acos(Math.max(-1, Math.min(1, u(t, n)))),
        a = Math.sin(i) / r;
      return r && [Math.cos(i), e[2] * a, -e[1] * a, e[0] * a]
    }
  }

  function a(t, n) {
    var e = Math.max(-1, Math.min(1, u(t, n))),
      r = 0 > e ? -1 : 1,
      i = Math.acos(r * e),
      a = Math.sin(i);
    return a ? function(e) {
      var o = r * Math.sin((1 - e) * i) / a,
        c = Math.sin(e * i) / a;
      return [t[0] * o + n[0] * c, t[1] * o + n[1] * c, t[2] * o + n[2] * c, t[3] * o + n[3] * c]
    } : function() {
      return t
    }
  }

  function o(t) {
    return [Math.atan2(2 * (t[0] * t[1] + t[2] * t[3]), 1 - 2 * (t[1] * t[1] + t[2] * t[2])) * f, Math.asin(Math.max(-1, Math.min(1, 2 * (t[0] * t[2] - t[3] * t[1])))) * f, Math.atan2(2 * (t[0] * t[3] + t[1] * t[2]), 1 - 2 * (t[2] * t[2] + t[3] * t[3])) * f]
  }

  function c(t) {
    var n = t[0] * l,
      e = t[1] * l,
      r = Math.cos(e);
    return [r * Math.cos(n), r * Math.sin(n), Math.sin(e)]
  }

  function u(t, n) {
    for (var e = 0, r = t.length, i = 0; r > e; ++e) i += t[e] * n[e];
    return i
  }

  function s(t, n) {
    return [t[1] * n[2] - t[2] * n[1], t[2] * n[0] - t[0] * n[2], t[0] * n[1] - t[1] * n[0]]
  }

  function h(t) {
    for (var n = 0, e = arguments.length, r = []; ++n < e;) r.push(arguments[n]);
    var i = d3.dispatch.apply(null, r);
    return i.of = function(n, e) {
      return function(r) {
        try {
          var a = r.sourceEvent = d3.event;
          r.target = t, d3.event = r, i[r.type].apply(n, e)
        } finally {
          d3.event = a
        }
      }
    }, i
  }
  var l = Math.PI / 180,
    f = 180 / Math.PI;

  d3.geo.zoom = function() {
    function u(t) {
      p++ || t({
        type: "zoomstart"
      })
    }

    function s(t) {
      t({
        type: "zoom"
      })
    }

    function l(t) {
      --p || t({
        type: "zoomend"
      })
    }

    var f, v, g, p = 0,
      d = h(m, "zoomstart", "zoom", "zoomend"),
      m = d3.behavior.zoom().on("zoomstart", function() {
        var a = d3.mouse(this),
          c = e(f.rotate()),
          h = n(f, a);
        h && (g = h), M.call(m, "zoom", function() {
          f.scale(b.k = d3.event.scale);
          var e = d3.mouse(this),
            u = i(g, n(f, e));
          f.rotate(b.r = o(c = u ? r(c, u) : r(t(f, a, e), c))), a = e, s(d.of(this, arguments))
        }), u(d.of(this, arguments))
      }).on("zoomend", function() {
        M.call(m, "zoom", null), l(d.of(this, arguments))
      }),
      M = m.on,
      b = {
        r: [0, 0, 0],
        k: 1
      };
    return m.rotateTo = function(t) {
      var n = i(c(t), c([-b.r[0], -b.r[1]]));
      return o(r(e(b.r), n))
    }, m.projection = function(t) {
      return arguments.length ? (f = t, b = {
        r: f.rotate(),
        k: f.scale()
      }, m.scale(b.k)) : f
    }, m.duration = function(t) {
      return arguments.length ? (v = t, m) : v
    }, m.event = function(t) {
      t.each(function() {
        var t = d3.select(this),
          n = d.of(this, arguments),
          r = b,
          i = d3.transition(t);
        if (i !== t) {
          i.each("start.zoom", function() {
            this.__chart__ && (b = this.__chart__), f.rotate(b.r).scale(b.k), u(n)
          }).tween("zoom:zoom", function() {
            var t = m.size()[0],
              c = a(e(b.r), e(r.r)),
              u = d3.geo.distance(b.r, r.r),
              h = d3.interpolateZoom([0, 0, t / b.k], [u, 0, t / r.k]);
            return v && i.duration(v(.001 * h.duration)),
              function(e) {
                var r = h(e);
                this.__chart__ = b = {
                  r: o(c(r[0] / u)),
                  k: t / r[2]
                }, f.rotate(b.r).scale(b.k), m.scale(b.k), s(n)
              }
          }).each("end.zoom", function() {
            l(n)
          });
          try {
            i.each("interrupt.zoom", function() {
              l(n)
            })
          } catch (c) {}
        } else this.__chart__ = b, u(n), s(n), l(n)
      })
    }, d3.rebind(m, d, "on")
  }
};

var voronoy_drawer =   function() {
    function t(t, n) {
      var e = d3.geo.interpolate(t, n)(.5),
        r = o(o(v(t), v(n)), v(e)),
        a = 1 / i(r);
      r[0] *= a, r[1] *= a, r[2] *= a;
      var c = _.origin(f(r))().coordinates[0];
      return [{
        type: "Polygon",
        coordinates: [c]
      }, {
        type: "Polygon",
        coordinates: [c.slice().reverse()]
      }]
    }

    function n(t, n) {
      var e = t.pop();
      n < t.length && ((t[n] = e).index = n)
    }

    function e(t) {
      var n = t.a.p,
        e = t.b.p,
        h = t.c.p,
        l = o(u(t.c.p, t.a.p), u(t.b.p, t.a.p)),
        f = 1 / r(l),
        v = Math.sqrt(f),
        g = c(.5 * v * i(u(n, e)) * i(u(e, h)) * i(u(h, n))),
        p = .5 * f * r(u(e, h)) * a(u(n, e), u(n, h)),
        d = .5 * f * r(u(n, h)) * a(u(e, n), u(e, h)),
        m = .5 * f * r(u(n, e)) * a(u(h, n), u(h, e)),
        M = [p * n[0] + d * e[0] + m * h[0], p * n[1] + d * e[1] + m * h[1], p * n[2] + d * e[2] + m * h[2]],
        b = r(M);
      return b > F ? (M[0] *= b = 1 / Math.sqrt(b), M[1] *= b, M[2] *= b) : M = t.n, s(t, M) || (M[0] *= -1, M[1] *= -1, M[2] *= -1, g = k - g, M.negative = !0), M.radius = g, M
    }

    function r(t) {
      return a(t, t)
    }

    function i(t) {
      return Math.sqrt(r(t))
    }

    function a(t, n) {
      return t[0] * n[0] + t[1] * n[1] + t[2] * n[2]
    }

    function o(t, n) {
      return [t[1] * n[2] - t[2] * n[1], t[2] * n[0] - t[0] * n[2], t[0] * n[1] - t[1] * n[0]]
    }

    function c(t) {
      return Math.asin(Math.max(-1, Math.min(1, t)))
    }

    function u(t, n) {
      return [t[0] - n[0], t[1] - n[1], t[2] - n[2]]
    }

    function s(t, n) {
      return a(t.n, n) - a(t.n, t.a.p) > F
    }

    function h(t, n) {
      return Math.abs(a(t.n, n) - a(t.n, t.a.p)) <= F
    }

    function l(t) {
      var n = 1 / i(t);
      return t[0] *= n, t[1] *= n, t[2] *= n, t
    }

    function f(t) {
      return [Math.atan2(t[1], t[0]) * z, c(t[2]) * z]
    }

    function v(t) {
      var n = t[0] * w,
        e = t[1] * w,
        r = Math.cos(e);
      return [r * Math.cos(n), r * Math.sin(n), Math.sin(e)]
    }

    function g(t, n, e) {
      var r;
      this.t = t, this.v = n, this.i = e, this.prevF = null, (r = this.nextF = n.visible) && (r.prevF = this), n.visible = this
    }

    function p(t, n, e) {
      s(t, n) && t.visible.push(new g(t, n, e))
    }

    function d(t, n, e) {
      for (var r = n.visible, i = e.visible, a = r.length, o = i.length, c = 0, u = 0; a > c || o > u;)
        if (a > c) {
          var s = r[c];
          if (o > u) {
            var h = i[u];
            if (s.i > h.i) {
              p(t, h.v, h.i), ++u;
              continue
            }
            s.i === h.i && ++u
          }
          p(t, s.v, s.i), ++c
        } else {
          var h = i[u];
          p(t, h.v, h.i), ++u
        }
    }

    function m(t, n, e, r) {
      this.visible = [], this.marked = !1, this.n = l(o(u(e, t), u(n, t))), (((this.a = new M(this, t)).next = this.b = new M(this, n)).next = this.c = new M(this, e)).next = this.a, this.index = r
    }

    function M(t, n) {
      this.triangle = t, this.p = n, this.neighbor = this.next = null
    }

    function b(t) {
      return !t.triangle.marked && t.neighbor.triangle.marked
    }

    function y(t) {
      if (!(t = t.neighbor).triangle.marked)
        for (var n = [t], e = t;;)
          if (b(t = t.next)) {
            if (t === e) return n;
            n.push(t)
          } else t = t.neighbor
    }

    function x(t, n) {
      (t.neighbor = n).neighbor = t
    }

    var k = Math.PI,
      z = 180 / k,
      w = k / 180,
      F = 1e-15,
      _ = d3.geo.circle().angle(90);
    d3.geo.voronoi = function(n, e) {
      arguments.length < 2 && (e = d3.geo.delaunay(n)), e || (e = []);
      var r = n.length,
        i = [];
      return e.forEach(function(t) {
        i[t.a.p.i] = t.a, i[t.b.p.i] = t.b
      }), {
        type: "GeometryCollection",
        geometries: 1 === r ? [{
          type: "Sphere"
        }] : 2 === r ? t(n[0], n[1]) : n.map(function(t, e) {
          var r = [],
            c = [],
            u = {
              type: "Polygon",
              coordinates: [r],
              neighbors: c
            },
            s = i[e],
            h = s,
            g = h;
          if (!g) return null;
          for (var p = g.triangle.centre;;) {
            var d = g.triangle.centre;
            if (a(d, p) < F - 1) {
              var m = v(n[g.neighbor.p.i]),
                M = v(n[g.p.i]),
                b = l([m[0] + M[0], m[1] + M[1], m[2] + M[2]]);
              a(d, o(m, M)) > 0 && (b[0] = -b[0], b[1] = -b[1], b[2] = -b[2]), r.push(f(b))
            }
            if (r.push(f(d)), c.push(g.neighbor.p.i), p = d, g === s && h !== s) break;
            g = (h = g).next.next.neighbor
          }
          return u
        })
      }
    }, d3.geo.voronoi.topology = function(t, n) {
      arguments.length < 2 && (n = d3.geo.delaunay(t)), n || (n = []);
      var e = t.length,
        r = new Array(e),
        i = [],
        a = -1,
        o = {},
        c = [];
      return n.forEach(function(t) {
        c[t.a.p.i] = t.a, c[t.b.p.i] = t.b
      }), t.forEach(function(t, n) {
        var e = [],
          u = [],
          s = c[n],
          h = s,
          l = h;
        if (!l) return null;
        for (;;) {
          if (l !== h) {
            var v = h.triangle.index,
              g = l.triangle.index,
              p = g > v ? v + "," + g : g + "," + v,
              d = o[p];
            null == d && (i[d = o[p] = ++a] = g > v ? [f(h.triangle.centre), f(l.triangle.centre)] : [f(l.triangle.centre), f(h.triangle.centre)]), e.push(g > v ? d : ~d), u.push(l.neighbor.p.i)
          }
          if (l === s && h !== s) break;
          l = (h = l).neighbor.next
        }
        r[n] = {
          type: "Polygon",
          neighbors: u,
          arcs: [e]
        }
      }), {
        objects: {
          voronoi: {
            type: "GeometryCollection",
            geometries: r
          }
        },
        arcs: i
      }
    }, d3.geo.delaunay = function(t) {
      var n = t.map(v),
        r = (t.length, d3.convexhull3d(n));
      return r.length ? (r.forEach(function(n) {
        n.coordinates = [t[n.a.p.i], t[n.b.p.i], t[n.c.p.i]], n.centre = e(n)
      }), r) : void 0
    }, d3.convexhull3d = function(t) {
      var e = t.length;
      if (4 > e) return [];
      for (var r = 0; e > r; ++r) t[r].i = r;
      d3.shuffle(t);
      for (var i = t[0], a = t[1], o = t[2], c = new m(i, a, o), r = 3; e > r && h(c, t[r]); ++r);
      if (r === e) return [];
      var u = t[r];
      if (t[r] = t[3], t[3] = u, s(c, u)) {
        var l = a;
        a = o, o = l
      }
      var f = new m(i, a, o, 0),
        v = new m(u, a, i, 1),
        g = new m(o, u, i, 2),
        M = new m(a, u, o, 3),
        b = [f, v, g, M];
      x(f.a, v.b), x(f.b, M.c), x(f.c, g.c), x(v.a, M.a), x(M.b, g.a), x(g.b, v.c);
      for (var r = 4; e > r; ++r) {
        var k = t[r];
        p(f, k, r), p(v, k, r), p(g, k, r), p(M, k, r)
      }
      for (var r = 4; e > r; ++r) {
        var k = t[r],
          z = k.visible;
        if (z) {
          var w = null,
            i = z;
          do i.t.marked = !0; while (i = i.nextF);
          i = z;
          do {
            var c = i.t;
            if (w = y(c.a) || y(c.b) || y(c.c)) break
          } while (i = i.nextF);
          if (w) {
            for (var F = 0, _ = w.length, P = null, j = null; _ > F; ++F) {
              var q = w[F],
                A = q.triangle,
                E = q.neighbor.triangle,
                c = new m(k, q.neighbor.p, q.p, b.length);
              x(c.b, q), P ? x(P.a, c.c) : j = c, d(c, A, E), b.push(P = c)
            }
            x(P.a, j.c), i = z;
            do {
              for (var c = i.t, F = 0, _ = c.visible.length; _ > F; ++F) c.visible[F].remove();
              c.visible.length = 0, n(b, c.index)
            } while (i = i.nextF)
          }
        }
      }
      return b
    }, g.prototype.remove = function() {
      this.prevF ? this.prevF.nextF = this.nextF : this.v.visible = this.nextF, this.nextF && (this.nextF.prevF = this.prevF)
    }
  };

var generate =  function() {
    function draw() {

      var t = d3.geo.delaunay(d);

      canvas.select(".delaunay").datum(f ? {
        type: "GeometryCollection",
        geometries: t.map(function(t) {
          return t.centre.negative ? null : (t = t.coordinates.slice(), t.push(t[0]), {
            type: "LineString",
            coordinates: t
          })
        })
      } : null).attr("d", u);

      canvas.select(".hull").datum(null).attr("d", u);

      var n = canvas.selectAll(".voronoi").data(d3.geo.voronoi(d, t).geometries);

      n.enter().insert("path", ".graticule").attr("class", "voronoi"), n.exit().remove(), n.style("fill", function(t, n) {
        return h(n)
      }).attr("d", u);

      var r = canvas.selectAll(".circle").data(l ? t.map(function(t) {
        return s.origin(e(t.centre)).angle(t.centre.radius * a)()
      }) : []);

      r.enter().insert("path", ".point").attr("class", "circle");

      r.exit().remove();

      r.attr("d", u);

      canvas.select(".point").datum({
        type: "MultiPoint",
        coordinates: d
      }).attr("d", u)
    }

    function generate_points(point_number) {
      var points = [], step = 1 / point_number;
      for (var ser = 0; ser < point_number; ser++) {
        var lambda = (Math.random() - 0.5) * 360;
        var phi = Math.acos(2 * step * ser - 1) * (180 / Math.PI) - 90;
        points.push([lambda, phi]);
      }
      return points;
    }

    var map_selector = '#map';

    var i,

      map_width = $(map_selector).innerWidth(),

      map_height = 700,

      u = d3.geo.path().projection(d3.geo.orthographic().translate([map_width / 2, map_height / 2]).scale(map_height / 2 - 1).rotate([1, 1]).clipAngle(90).precision(.1)),

      s = d3.geo.circle(),

      h = d3.scale.category20b(),

      l = !1,

      f = !1,

      v = !0;

    var canvas = d3.select(map_selector).append('svg').attr('width', map_width).attr('height', map_height)

      /*.on("mousemove", function() {
        var n = u.projection().invert(d3.mouse(this));
        n && !isNaN(n[0]) && (i ? (i[0] = n[0], i[1] = n[1]) : d.push(i = n), t(), v = !0)
      })*/

      .on("click", function() { v && (i = null) })
      .call(d3.geo.zoom().projection(u.projection()).on("zoom.redraw", function() {
        canvas.selectAll("path").attr("d", u);
        v = !1
      }));

    d = generate_points(300); //8000;

    //canvas.append("path").datum(d3.geo.graticule()).attr("class", "graticule").attr("d", u);

    canvas.append("path").attr("class", "delaunay");

    canvas.append("path");//.attr("class", "point"),

/*
    d3.select("#circumcircle")
      .on("change", function() {
        l = this.checked, t()
    });
*/

    d3.select("#delaunay").on("change", function() {
      f = this.checked, draw()
    });

    draw()

  };

$(document).ready(function() {
  zoom();
  voronoy_drawer();
  generate();
});

