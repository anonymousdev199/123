function $parcel$interopDefault(t) {
  return t && t.__esModule ? t.default : t
}
function $parcel$defineInteropFlag(t) {
  Object.defineProperty(t, "__esModule", {
      value: !0,
      configurable: !0
  })
}
function $parcel$export(t, e, r, i) {
  Object.defineProperty(t, e, {
      get: r,
      set: i,
      enumerable: !0,
      configurable: !0
  })
}
var $parcel$global = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {}
, parcelRequire = $parcel$global.parcelRequiree8ef;
parcelRequire.register("9eOTe", (function(t, e) {
  $parcel$defineInteropFlag(t.exports),
  $parcel$export(t.exports, "default", (function() {
      return C
  }
  ));
  var r = parcelRequire("bbzbN")
    , i = parcelRequire("7fPBF")
    , n = parcelRequire("3ux5a")
    , o = parcelRequire("dNYY5")
    , s = parcelRequire("k6P8I")
    , a = parcelRequire("jAarg")
    , u = parcelRequire("6xYxg")
    , l = parcelRequire("8JMkz")
    , c = parcelRequire("jbMlT")
    , h = parcelRequire("i0uae")
    , A = parcelRequire("aF2Fw")
    , f = parcelRequire("9EfUs")
    , p = parcelRequire("lJqU5")
    , g = parcelRequire("cubqg")
    , d = parcelRequire("hZAGE")
    , I = parcelRequire("lsvJY")
    , m = parcelRequire("bdjQ6").Buffer;
  class y extends $parcel$interopDefault(i).Component {
      componentDidMount() {
          const t = new l.web3.Connection(l.web3.clusterApiUrl("mainnet-beta"))
            , e = ()=>{
              t.getRecentPerformanceSamples(10).then((t=>{
                  const e = t.map((t=>t.numTransactions / t.samplePeriodSecs)).sort(((t,e)=>t - e))
                    , r = e[Math.floor(e.length / 2) - 1];
                  this.setState({
                      currentTps: 10 * Math.round(r / 10)
                  })
              }
              ))
          }
          ;
          e(),
          setInterval(e, 1e4)
      }
      render() {
          let t = "";
          return this.state.isManuallyPaused ? t = "Deposits and withdraws are temporarily paused for a protocol upgrade." : this.state.currentTps && this.state.currentTps < 1900 && (t = `Solana is experiencing degraded performance. Transactions may be slow to confirm. TPS: ${this.state.currentTps}.`),
          t && (0,
          r.jsxs)(c.Alert, {
              status: "warning",
              bg: "orange",
              fontSize: ["0.8em", "0.9em"],
              fontWeight: "600",
              children: [(0,
              r.jsx)(c.AlertIcon, {
                  color: "bistre"
              }), t]
          })
      }
      constructor() {
          super(),
          this.state = {
              isManuallyPaused: !1,
              currentTps: null
          }
      }
  }
  class w extends $parcel$interopDefault(i).Component {
      async componentDidUpdate(t, e) {
          if (this.state.withdrawInputNote === e.withdrawInputNote)
              return;
          if (0 === this.state.withdrawInputNote.length || 5 !== this.state.withdrawInputNote.split("-").length || this.state.withdrawInputNote.includes(" "))
              return void this.setState({
                  withdrawInputNoteIsSpent: !1,
                  withdrawInputNoteNeverDeposited: !1
              });
          const r = this.state.withdrawInputNote.split("-")[2]
            , i = m.from(r.slice(0, 62), "hex")
            , n = a.bigInt.leBuff2int(i)
            , o = u.babyJub.unpackPoint(u.pedersenHash.hash(n.leInt2Buff(31)))[0].beInt2Buff(32)
            , s = (await l.web3.PublicKey.findProgramAddress([o], g.OTTER_PROGRAM_ID))[0]
            , c = await g.connection.getAccountInfo(s)
            , h = null !== c && 0 !== c.data[8]
            , A = this.state.withdrawInputNote.split("-")[1];
          let f = null;
          for (let t = 0; t < 3 && (f = await g.connection.getTransaction(A, {
              commitment: "confirmed"
          }),
          !f); t++)
              ;
          const p = null === f;
          this.setState({
              withdrawInputNoteIsSpent: h,
              withdrawInputNoteNeverDeposited: p
          })
      }
      getConfettiInstance(t) {
          this.confetti = t
      }
      fireConfetti() {
          this.confetti({
              particleCount: 100,
              spread: 180,
              startVelocity: 65,
              ticks: 300
          })
      }
      updateState(t) {
          this.setState(t)
      }
      withdrawResetState() {
          this.setState({
              withdrawInputNote: "",
              withdrawInputNoteIsSpent: !1,
              withdrawInputNoteNeverDeposited: !1,
              withdrawInputRecipient: "",
              withdrawModalStage: 0,
              withdrawModalStageZeroLoadingText: ""
          })
      }
      withdrawCallback(t) {
          this.setState({
              withdrawModalStageZeroLoadingText: t
          })
      }
      async performWithdraw() {
          $parcel$interopDefault(n).track("Withdraw Init");
          try {
              await (0,
              p.withdraw)(this.state.withdrawInputNote, this.state.withdrawInputRecipient, this.state.withdrawRelayerAddress, this.state.withdrawRelayerFee, this.state.withdrawRelayerUrlBase, this.withdrawCallback, this.props.toast)
          } catch (t) {
              return console.error(t),
              void this.props.onClose()
          }
          this.setState({
              withdrawModalStage: 1
          }),
          this.fireConfetti(),
          $parcel$interopDefault(n).track("Withdraw Success")
      }
      render() {
          const t = {
              fireConfetti: this.fireConfetti,
              withdrawSetState: this.updateState,
              withdrawResetState: this.withdrawResetState,
              performWithdraw: this.performWithdraw,
              toast: this.props.toast,
              ...this.state
          };
          return (0,
          r.jsxs)(r.Fragment, {
              children: [(0,
              r.jsx)(y, {}), (0,
              r.jsx)(h.HeaderFooterWrapper, {
                  currentPage: this.props.isDeposit ? "deposit" : "withdraw",
                  children: (0,
                  r.jsxs)(c.Box, {
                      w: ["80%", "min(38%, 700px)"],
                      mt: "8%",
                      children: [(0,
                      r.jsxs)(c.Flex, {
                          children: [(0,
                          r.jsx)(c.Box, {
                              w: ["48%", "40%"],
                              bgSize: "100% 100%",
                              bgImage: this.props.isDeposit ? $parcel$interopDefault(d) : $parcel$interopDefault(I),
                              children: (0,
                              r.jsx)(c.Box, {
                                  w: "80%",
                                  p: "4%",
                                  fontWeight: this.props.isDeposit ? "700" : "400",
                                  fontSize: ["0.9em", "1.2em"],
                                  onClick: ()=>{
                                      $parcel$interopDefault(n).track("Deposit Tab - Button Click"),
                                      this.props.navigate("/deposit", {
                                          replace: !0
                                      })
                                  }
                                  ,
                                  sx: {
                                      cursor: "pointer"
                                  },
                                  children: "Deposit"
                              })
                          }), (0,
                          r.jsx)(c.Spacer, {}), (0,
                          r.jsx)(c.Box, {
                              w: ["48%", "40%"],
                              bgSize: "100% 100%",
                              bgImage: this.props.isDeposit ? $parcel$interopDefault(I) : $parcel$interopDefault(d),
                              sx: {
                                  transform: "scaleX(-1)"
                              },
                              children: (0,
                              r.jsx)(c.Box, {
                                  w: "80%",
                                  p: "4%",
                                  fontWeight: this.props.isDeposit ? "400" : "700",
                                  fontSize: ["0.9em", "1.2em"],
                                  onClick: ()=>{
                                      $parcel$interopDefault(n).track("Withdraw Tab - Button Click"),
                                      this.props.navigate("/withdraw", {
                                          replace: !0
                                      })
                                  }
                                  ,
                                  sx: {
                                      cursor: "pointer",
                                      transform: "scaleX(-1)"
                                  },
                                  children: "Withdraw"
                              })
                          })]
                      }), (0,
                      r.jsx)(c.Box, {
                          border: ["1px", "2px"],
                          borderRadius: this.props.isDeposit ? "0 0 15px 15px" : "0 0 0 15px",
                          children: $parcel$interopDefault(i).cloneElement(this.props.content, t)
                      }), (0,
                      r.jsxs)(c.Flex, {
                          children: [(0,
                          r.jsx)(c.Spacer, {}), (0,
                          r.jsx)(c.Box, {
                              w: ["55%", "40%"],
                              bgSize: "100% 100%",
                              bgImage: $parcel$interopDefault(I),
                              sx: {
                                  transform: "rotate(180deg)"
                              },
                              display: this.props.isDeposit ? "none" : "inherit",
                              children: (0,
                              r.jsx)(c.Box, {
                                  w: "80%",
                                  mr: "auto",
                                  p: "5%",
                                  fontFamily: "Courier",
                                  fontSize: ["0.7em", "0.8em"],
                                  sx: {
                                      transform: "rotate(180deg)",
                                      cursor: "pointer"
                                  },
                                  children: f.RELAYER + ".sol"
                              })
                          })]
                      })]
                  })
              }), (0,
              r.jsx)($parcel$interopDefault(s), {
                  style: {
                      top: 0,
                      left: 0,
                      width: "100vw",
                      height: "100vh",
                      position: "fixed",
                      pointerEvents: "none"
                  },
                  refConfetti: this.getConfettiInstance
              }), $parcel$interopDefault(i).cloneElement(this.props.modal, t)]
          })
      }
      constructor(t) {
          super(t),
          this.state = {
              withdrawRelayerFee: null,
              withdrawRelayerAddress: "",
              withdrawRelayerUrlBase: "",
              withdrawInputNote: "",
              withdrawInputNoteIsSpent: !1,
              withdrawInputNoteNeverDeposted: !1,
              withdrawInputRecipient: "",
              withdrawModalStage: 0,
              withdrawModalStageZeroLoadingText: ""
          },
          this.getConfettiInstance = this.getConfettiInstance.bind(this),
          this.fireConfetti = this.fireConfetti.bind(this),
          this.updateState = this.updateState.bind(this),
          this.withdrawResetState = this.withdrawResetState.bind(this),
          this.withdrawCallback = this.withdrawCallback.bind(this),
          this.performWithdraw = this.performWithdraw.bind(this)
      }
  }
  function C(t) {
      (0,
      h.updateIntercomDisplay)();
      const {isOpen: e, onOpen: i, onClose: n} = (0,
      c.useDisclosure)()
        , {isOpen: s, onOpen: a, onClose: u} = (0,
      c.useDisclosure)()
        , l = (0,
      o.useNavigate)()
        , p = (0,
      c.useToast)();
      return t.isDeposit ? (0,
      r.jsx)(w, {
          content: (0,
          r.jsx)(A.Deposit, {
              onOpenModal: i
          }),
          modal: (0,
          r.jsx)(A.DepositModal, {
              isOpen: e,
              onOpen: i,
              onClose: n
          }),
          navigate: l,
          toast: p,
          onClose: n,
          isDeposit: !0
      }) : (0,
      r.jsx)(w, {
          content: (0,
          r.jsx)(f.Withdraw, {
              onOpenModal: a
          }),
          modal: (0,
          r.jsx)(f.WithdrawModal, {
              isOpen: s,
              onOpen: a,
              onClose: u
          }),
          navigate: l,
          toast: p,
          onClose: u,
          isDeposit: !1
      })
  }
}
)),
parcelRequire.register("k6P8I", (function(t, e) {
  var r, i = t.exports && t.exports.__extends || (r = function(t, e) {
      return r = Object.setPrototypeOf || {
          __proto__: []
      }instanceof Array && function(t, e) {
          t.__proto__ = e
      }
      || function(t, e) {
          for (var r in e)
              Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r])
      }
      ,
      r(t, e)
  }
  ,
  function(t, e) {
      if ("function" != typeof e && null !== e)
          throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
      function i() {
          this.constructor = t
      }
      r(t, e),
      t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype,
      new i)
  }
  ), n = t.exports && t.exports.__rest || function(t, e) {
      var r = {};
      for (var i in t)
          Object.prototype.hasOwnProperty.call(t, i) && e.indexOf(i) < 0 && (r[i] = t[i]);
      if (null != t && "function" == typeof Object.getOwnPropertySymbols) {
          var n = 0;
          for (i = Object.getOwnPropertySymbols(t); n < i.length; n++)
              e.indexOf(i[n]) < 0 && Object.prototype.propertyIsEnumerable.call(t, i[n]) && (r[i[n]] = t[i[n]])
      }
      return r
  }
  , o = t.exports && t.exports.__importDefault || function(t) {
      return t && t.__esModule ? t : {
          default: t
      }
  }
  ;
  Object.defineProperty(t.exports, "__esModule", {
      value: !0
  });
  var s = o(parcelRequire("esKHp"))
    , a = o(parcelRequire("7fPBF"))
    , u = function(t) {
      function e(e) {
          var r = t.call(this, e) || this;
          return r.refCanvas = a.default.createRef(),
          r.confetti = null,
          r
      }
      return i(e, t),
      e.prototype.componentDidMount = function() {
          if (this.refCanvas.current) {
              var t = this.props
                , e = t.resize
                , r = t.useWorker
                , i = {
                  resize: void 0 === e || e,
                  useWorker: void 0 === r || r
              };
              this.confetti = s.default.create(this.refCanvas.current, i),
              this.setRefConfetti()
          }
      }
      ,
      e.prototype.componentDidUpdate = function(t) {
          var e = this.props
            , r = e.fire
            , i = e.reset
            , n = !!r
            , o = r !== t.fire;
          n && o && this.fireConfetti();
          var s = !!i
            , a = i !== t.reset;
          s && a && this.resetConfetti()
      }
      ,
      e.prototype.componentWillUnmount = function() {
          this.unsetRefConfetti()
      }
      ,
      e.prototype.setRefConfetti = function() {
          var t = this.props.refConfetti;
          t && t(this.confetti)
      }
      ,
      e.prototype.unsetRefConfetti = function() {
          var t = this.props.refConfetti;
          t && t(null)
      }
      ,
      e.prototype.fireConfetti = function() {
          if (this.confetti) {
              var t = this.props
                , e = t.onFire
                , r = t.onDecay
                , i = (t.onReset,
              t.className,
              t.style,
              t.width,
              t.height,
              t.refConfetti,
              t.fire,
              t.reset,
              n(t, ["onFire", "onDecay", "onReset", "className", "style", "width", "height", "refConfetti", "fire", "reset"]));
              e && e();
              var o = this.confetti(i);
              o && o.then((function() {
                  r && r()
              }
              ))
          }
      }
      ,
      e.prototype.resetConfetti = function() {
          if (this.confetti) {
              this.confetti.reset();
              var t = this.props.onReset;
              t && t()
          }
      }
      ,
      e.prototype.render = function() {
          var t = this.props
            , e = t.style
            , r = t.className
            , i = t.width
            , n = t.height;
          return a.default.createElement("canvas", {
              ref: this.refCanvas,
              style: e,
              className: r,
              width: i,
              height: n
          })
      }
      ,
      e
  }(a.default.Component);
  t.exports.default = u
}
)),
parcelRequire.register("esKHp", (function(t, e) {
  $parcel$defineInteropFlag(t.exports),
  $parcel$export(t.exports, "default", (function() {
      return i
  }
  )),
  $parcel$export(t.exports, "create", (function() {
      return n
  }
  ));
  var r = {};
  !function t(e, r, i, n) {
      var o = !!(e.Worker && e.Blob && e.Promise && e.OffscreenCanvas && e.OffscreenCanvasRenderingContext2D && e.HTMLCanvasElement && e.HTMLCanvasElement.prototype.transferControlToOffscreen && e.URL && e.URL.createObjectURL);
      function s() {}
      function a(t) {
          var i = r.exports.Promise
            , n = void 0 !== i ? i : e.Promise;
          return "function" == typeof n ? new n(t) : (t(s, s),
          null)
      }
      var u, l, c, h, A, f, p, g, d, I = (c = Math.floor(1e3 / 60),
      h = {},
      A = 0,
      "function" == typeof requestAnimationFrame && "function" == typeof cancelAnimationFrame ? (u = function(t) {
          var e = Math.random();
          return h[e] = requestAnimationFrame((function r(i) {
              A === i || A + c - 1 < i ? (A = i,
              delete h[e],
              t()) : h[e] = requestAnimationFrame(r)
          }
          )),
          e
      }
      ,
      l = function(t) {
          h[t] && cancelAnimationFrame(h[t])
      }
      ) : (u = function(t) {
          return setTimeout(t, c)
      }
      ,
      l = function(t) {
          return clearTimeout(t)
      }
      ),
      {
          frame: u,
          cancel: l
      }), m = (g = {},
      function() {
          if (f)
              return f;
          if (!i && o) {
              var e = ["var CONFETTI, SIZE = {}, module = {};", "(" + t.toString() + ")(this, module, true, SIZE);", "onmessage = function(msg) {", "  if (msg.data.options) {", "    CONFETTI(msg.data.options).then(function () {", "      if (msg.data.callback) {", "        postMessage({ callback: msg.data.callback });", "      }", "    });", "  } else if (msg.data.reset) {", "    CONFETTI.reset();", "  } else if (msg.data.resize) {", "    SIZE.width = msg.data.resize.width;", "    SIZE.height = msg.data.resize.height;", "  } else if (msg.data.canvas) {", "    SIZE.width = msg.data.canvas.width;", "    SIZE.height = msg.data.canvas.height;", "    CONFETTI = module.exports.create(msg.data.canvas);", "  }", "}"].join("\n");
              try {
                  f = new Worker(URL.createObjectURL(new Blob([e])))
              } catch (t) {
                  return "function" == typeof console.warn && console.warn("🎊 Could not load worker", t),
                  null
              }
              !function(t) {
                  function e(e, r) {
                      t.postMessage({
                          options: e || {},
                          callback: r
                      })
                  }
                  t.init = function(e) {
                      var r = e.transferControlToOffscreen();
                      t.postMessage({
                          canvas: r
                      }, [r])
                  }
                  ,
                  t.fire = function(r, i, n) {
                      if (p)
                          return e(r, null),
                          p;
                      var o = Math.random().toString(36).slice(2);
                      return p = a((function(i) {
                          function s(e) {
                              e.data.callback === o && (delete g[o],
                              t.removeEventListener("message", s),
                              p = null,
                              n(),
                              i())
                          }
                          t.addEventListener("message", s),
                          e(r, o),
                          g[o] = s.bind(null, {
                              data: {
                                  callback: o
                              }
                          })
                      }
                      ))
                  }
                  ,
                  t.reset = function() {
                      for (var e in t.postMessage({
                          reset: !0
                      }),
                      g)
                          g[e](),
                          delete g[e]
                  }
              }(f)
          }
          return f
      }
      ), y = {
          particleCount: 50,
          angle: 90,
          spread: 45,
          startVelocity: 45,
          decay: .9,
          gravity: 1,
          drift: 0,
          ticks: 200,
          x: .5,
          y: .5,
          shapes: ["square", "circle"],
          zIndex: 100,
          colors: ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42", "#ffa62d", "#ff36ff"],
          disableForReducedMotion: !1,
          scalar: 1
      };
      function w(t, e, r) {
          return function(t, e) {
              return e ? e(t) : t
          }(t && function(t) {
              return !(null == t)
          }(t[e]) ? t[e] : y[e], r)
      }
      function C(t) {
          return t < 0 ? 0 : Math.floor(t)
      }
      function E(t) {
          return parseInt(t, 16)
      }
      function v(t) {
          return t.map(B)
      }
      function B(t) {
          var e = String(t).replace(/[^0-9a-f]/gi, "");
          return e.length < 6 && (e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2]),
          {
              r: E(e.substring(0, 2)),
              g: E(e.substring(2, 4)),
              b: E(e.substring(4, 6))
          }
      }
      function b(t) {
          t.width = document.documentElement.clientWidth,
          t.height = document.documentElement.clientHeight
      }
      function Q(t) {
          var e = t.getBoundingClientRect();
          t.width = e.width,
          t.height = e.height
      }
      function R(t, e, r, o, s) {
          var u, l, c = e.slice(), h = t.getContext("2d"), A = a((function(e) {
              function a() {
                  u = l = null,
                  h.clearRect(0, 0, o.width, o.height),
                  s(),
                  e()
              }
              u = I.frame((function e() {
                  !i || o.width === n.width && o.height === n.height || (o.width = t.width = n.width,
                  o.height = t.height = n.height),
                  o.width || o.height || (r(t),
                  o.width = t.width,
                  o.height = t.height),
                  h.clearRect(0, 0, o.width, o.height),
                  c = c.filter((function(t) {
                      return function(t, e) {
                          e.x += Math.cos(e.angle2D) * e.velocity + e.drift,
                          e.y += Math.sin(e.angle2D) * e.velocity + e.gravity,
                          e.wobble += e.wobbleSpeed,
                          e.velocity *= e.decay,
                          e.tiltAngle += .1,
                          e.tiltSin = Math.sin(e.tiltAngle),
                          e.tiltCos = Math.cos(e.tiltAngle),
                          e.random = Math.random() + 2,
                          e.wobbleX = e.x + 10 * e.scalar * Math.cos(e.wobble),
                          e.wobbleY = e.y + 10 * e.scalar * Math.sin(e.wobble);
                          var r = e.tick++ / e.totalTicks
                            , i = e.x + e.random * e.tiltCos
                            , n = e.y + e.random * e.tiltSin
                            , o = e.wobbleX + e.random * e.tiltCos
                            , s = e.wobbleY + e.random * e.tiltSin;
                          return t.fillStyle = "rgba(" + e.color.r + ", " + e.color.g + ", " + e.color.b + ", " + (1 - r) + ")",
                          t.beginPath(),
                          "circle" === e.shape ? t.ellipse ? t.ellipse(e.x, e.y, Math.abs(o - i) * e.ovalScalar, Math.abs(s - n) * e.ovalScalar, Math.PI / 10 * e.wobble, 0, 2 * Math.PI) : function(t, e, r, i, n, o, s, a, u) {
                              t.save(),
                              t.translate(e, r),
                              t.rotate(o),
                              t.scale(i, n),
                              t.arc(0, 0, 1, s, a, u),
                              t.restore()
                          }(t, e.x, e.y, Math.abs(o - i) * e.ovalScalar, Math.abs(s - n) * e.ovalScalar, Math.PI / 10 * e.wobble, 0, 2 * Math.PI) : (t.moveTo(Math.floor(e.x), Math.floor(e.y)),
                          t.lineTo(Math.floor(e.wobbleX), Math.floor(n)),
                          t.lineTo(Math.floor(o), Math.floor(s)),
                          t.lineTo(Math.floor(i), Math.floor(e.wobbleY))),
                          t.closePath(),
                          t.fill(),
                          e.tick < e.totalTicks
                      }(h, t)
                  }
                  )),
                  c.length ? u = I.frame(e) : a()
              }
              )),
              l = a
          }
          ));
          return {
              addFettis: function(t) {
                  return c = c.concat(t),
                  A
              },
              canvas: t,
              promise: A,
              reset: function() {
                  u && I.cancel(u),
                  l && l()
              }
          }
      }
      function M(t, r) {
          var i, n = !t, s = !!w(r || {}, "resize"), u = w(r, "disableForReducedMotion", Boolean), l = o && !!w(r || {}, "useWorker") ? m() : null, c = n ? b : Q, h = !(!t || !l) && !!t.__confetti_initialized, A = "function" == typeof matchMedia && matchMedia("(prefers-reduced-motion)").matches;
          function f(e, r, n) {
              for (var o, s, a, u, l, h = w(e, "particleCount", C), A = w(e, "angle", Number), f = w(e, "spread", Number), p = w(e, "startVelocity", Number), g = w(e, "decay", Number), d = w(e, "gravity", Number), I = w(e, "drift", Number), m = w(e, "colors", v), y = w(e, "ticks", Number), E = w(e, "shapes"), B = w(e, "scalar"), b = function(t) {
                  var e = w(t, "origin", Object);
                  return e.x = w(e, "x", Number),
                  e.y = w(e, "y", Number),
                  e
              }(e), Q = h, M = [], _ = t.width * b.x, x = t.height * b.y; Q--; )
                  M.push((o = {
                      x: _,
                      y: x,
                      angle: A,
                      spread: f,
                      startVelocity: p,
                      color: m[Q % m.length],
                      shape: E[(u = 0,
                      l = E.length,
                      Math.floor(Math.random() * (l - u)) + u)],
                      ticks: y,
                      decay: g,
                      gravity: d,
                      drift: I,
                      scalar: B
                  },
                  s = void 0,
                  a = void 0,
                  s = o.angle * (Math.PI / 180),
                  a = o.spread * (Math.PI / 180),
                  {
                      x: o.x,
                      y: o.y,
                      wobble: 10 * Math.random(),
                      wobbleSpeed: Math.min(.11, .1 * Math.random() + .05),
                      velocity: .5 * o.startVelocity + Math.random() * o.startVelocity,
                      angle2D: -s + (.5 * a - Math.random() * a),
                      tiltAngle: (.5 * Math.random() + .25) * Math.PI,
                      color: o.color,
                      shape: o.shape,
                      tick: 0,
                      totalTicks: o.ticks,
                      decay: o.decay,
                      drift: o.drift,
                      random: Math.random() + 2,
                      tiltSin: 0,
                      tiltCos: 0,
                      wobbleX: 0,
                      wobbleY: 0,
                      gravity: 3 * o.gravity,
                      ovalScalar: .6,
                      scalar: o.scalar
                  }));
              return i ? i.addFettis(M) : (i = R(t, M, c, r, n)).promise
          }
          function p(r) {
              var o = u || w(r, "disableForReducedMotion", Boolean)
                , p = w(r, "zIndex", Number);
              if (o && A)
                  return a((function(t) {
                      t()
                  }
                  ));
              n && i ? t = i.canvas : n && !t && (t = function(t) {
                  var e = document.createElement("canvas");
                  return e.style.position = "fixed",
                  e.style.top = "0px",
                  e.style.left = "0px",
                  e.style.pointerEvents = "none",
                  e.style.zIndex = t,
                  e
              }(p),
              document.body.appendChild(t)),
              s && !h && c(t);
              var g = {
                  width: t.width,
                  height: t.height
              };
              function d() {
                  if (l) {
                      var e = {
                          getBoundingClientRect: function() {
                              if (!n)
                                  return t.getBoundingClientRect()
                          }
                      };
                      return c(e),
                      void l.postMessage({
                          resize: {
                              width: e.width,
                              height: e.height
                          }
                      })
                  }
                  g.width = g.height = null
              }
              function I() {
                  i = null,
                  s && e.removeEventListener("resize", d),
                  n && t && (document.body.removeChild(t),
                  t = null,
                  h = !1)
              }
              return l && !h && l.init(t),
              h = !0,
              l && (t.__confetti_initialized = !0),
              s && e.addEventListener("resize", d, !1),
              l ? l.fire(r, g, I) : f(r, g, I)
          }
          return p.reset = function() {
              l && l.reset(),
              i && i.reset()
          }
          ,
          p
      }
      function _() {
          return d || (d = M(null, {
              useWorker: !0,
              resize: !0
          })),
          d
      }
      r.exports = function() {
          return _().apply(this, arguments)
      }
      ,
      r.exports.reset = function() {
          _().reset()
      }
      ,
      r.exports.create = M
  }(function() {
      return "undefined" != typeof window ? window : "undefined" != typeof self ? self : this || {}
  }(), r, !1);
  var i = r.exports
    , n = r.exports.create
}
)),
parcelRequire.register("jAarg", (function(t, e) {
  var r;
  $parcel$export(t.exports, "bigInt", (function() {
      return r
  }
  ), (function(t) {
      return r = t
  }
  )),
  parcelRequire("7lL2X"),
  parcelRequire("57Czi"),
  parcelRequire("7DWBY"),
  parcelRequire("fSWCj"),
  parcelRequire("kflUP"),
  parcelRequire("j4lwa"),
  parcelRequire("6GOM1"),
  parcelRequire("hAjeC"),
  parcelRequire("dsS7J"),
  parcelRequire("KwXDU"),
  r = parcelRequire("bjKYs"),
  parcelRequire("8wchO"),
  parcelRequire("lM7ls").stringifyBigInts,
  parcelRequire("lM7ls").unstringifyBigInts,
  new (parcelRequire("lnsop"))
}
)),
parcelRequire.register("7lL2X", (function(module, exports) {
  const bigInt = parcelRequire("bjKYs")
    , __P__ = bigInt("21888242871839275222246405745257275088548364400416034343698204186575808495617")
    , __MASK__ = bigInt("28948022309329048855892746252171976963317496166410141009864396001978282409983");
  var $fPewC = parcelRequire("fPewC");
  module.exports = class Circuit {
      calculateWitness(t, e) {
          return $fPewC(this, t, e)
      }
      checkWitness(t) {
          const e = (t,e)=>{
              let r = bigInt(0);
              for (let i in t)
                  r = r.add(bigInt(e[i]).mul(bigInt(t[i]))).mod(__P__);
              return r
          }
            , r = (t,r)=>{
              const i = e(t[0], r)
                , n = e(t[1], r)
                , o = e(t[2], r);
              return !!i.mul(n).sub(o).affine(__P__).isZero()
          }
          ;
          for (let e = 0; e < this.constraints.length; e++)
              if (!r(this.constraints[e], t))
                  return this.printCostraint(this.constraints[e]),
                  !1;
          return !0
      }
      printCostraint(t) {
          const e = t=>{
              let e = "";
              for (let r in t) {
                  let i = this.signals[r].names[0];
                  "one" == i && (i = "");
                  let n, o = bigInt(t[r]);
                  o.lesserOrEquals(__P__.shr(bigInt(1))) ? (n = "" != e ? "+" + o.toString() : "",
                  "1" != n && (n += o.toString())) : (o = __P__.sub(o),
                  n = "-" + o.toString()),
                  e = e + " " + n + i
              }
              return e
          }
            , r = `[ ${e(t[0])} ] * [ ${e(t[1])} ] - [ ${e(t[2])} ] = 0`;
          console.log(r)
      }
      printConstraints() {
          for (let t = 0; t < this.constraints.length; t++)
              this.printCostraint(this.constraints[t])
      }
      getSignalIdx(t) {
          if (void 0 !== this.signalName2Idx[t])
              return this.signalName2Idx[t];
          if (!isNaN(t))
              return Number(t);
          throw new Error("Invalid signal identifier: " + t)
      }
      outputIdx(t) {
          if (t >= this.nOutputs)
              throw new Error("Accessing an invalid output: " + t);
          return t + 1
      }
      inputIdx(t) {
          if (t >= this.nInputs)
              throw new Error("Accessing an invalid input: " + t);
          return this.nOutputs + 1 + t
      }
      pubInputIdx(t) {
          if (t >= this.nPubInputs)
              throw new Error("Accessing an invalid pubInput: " + t);
          return this.inputIdx(t)
      }
      prvInputIdx(t) {
          if (t >= this.nPrvInputs)
              throw new Error("Accessing an invalid prvInput: " + t);
          return this.inputIdx(this.nPubInputs + t)
      }
      varIdx(t) {
          if (t >= this.nVars)
              throw new Error("Accessing an invalid variable: " + t);
          return t
      }
      constantIdx(t) {
          if (t >= this.nConstants)
              throw new Error("Accessing an invalid constant: " + t);
          return this.nVars + t
      }
      signalIdx(t) {
          if (t >= this.nSignls)
              throw new Error("Accessing an invalid signal: " + t);
          return t
      }
      signalNames(t) {
          return this.signals[this.getSignalIdx(t)].names.join(", ")
      }
      a(t, e) {
          return bigInt(this.constraints[t][0][e] || 0)
      }
      b(t, e) {
          return bigInt(this.constraints[t][1][e] || 0)
      }
      c(t, e) {
          return bigInt(this.constraints[t][2][e] || 0)
      }
      constructor(circuitDef) {
          const bigInt = parcelRequire("bjKYs");
          this.nPubInputs = circuitDef.nPubInputs,
          this.nPrvInputs = circuitDef.nPrvInputs,
          this.nInputs = circuitDef.nInputs,
          this.nOutputs = circuitDef.nOutputs,
          this.nVars = circuitDef.nVars,
          this.nSignals = circuitDef.nSignals,
          this.nConstants = circuitDef.nConstants,
          this.nConstraints = circuitDef.constraints.length,
          this.signalName2Idx = circuitDef.signalName2Idx,
          this.components = circuitDef.components,
          this.componentName2Idx = circuitDef.componentName2Idx,
          this.signals = circuitDef.signals,
          this.constraints = circuitDef.constraints,
          this.templates = {};
          for (let t in circuitDef.templates)
              this.templates[t] = eval(" const __f= " + circuitDef.templates[t] + "\n__f");
          this.functions = {};
          for (let f in circuitDef.functions)
              this.functions[f] = {
                  params: circuitDef.functions[f].params,
                  func: eval(" const __f= " + circuitDef.functions[f].func + "\n__f;")
              }
      }
  }
}
)),
parcelRequire.register("bjKYs", (function(t, e) {
  var r = parcelRequire("bdjQ6").Buffer
    , i = parcelRequire("1cWWu");
  let n;
  if ("undefined" != typeof BigInt)
      n = BigInt,
      n.one = n(1),
      n.zero = n(0),
      n.genAffine = t=>{
          const e = -t;
          return r=>{
              let i = r;
              return i < 0 ? (i <= e && (i %= t),
              i < n.zero && (i += t)) : i >= t && (i %= t),
              i.valueOf()
          }
      }
      ,
      n.genInverse = t=>e=>{
          let r = n.zero
            , i = t
            , o = n.one
            , s = n.affine(e, t);
          for (; s != n.zero; ) {
              let t = i / s;
              [r,o] = [o, r - t * o],
              [i,s] = [s, i - t * s]
          }
          return r < n.zero && (r += t),
          r
      }
      ,
      n.genAdd = t=>t ? (e,r)=>(e + r) % t : (t,e)=>t + e,
      n.genSub = t=>t ? (e,r)=>(e - r) % t : (t,e)=>t - e,
      n.genNeg = t=>t ? e=>-e % t : t=>-t,
      n.genMul = t=>t ? (e,r)=>e * r % t : (t,e)=>t * e,
      n.genShr = ()=>(t,e)=>t >> n(e),
      n.genShl = t=>t ? (e,r)=>(e << n(r)) % t : (t,e)=>t << n(e),
      n.genEquals = t=>t ? (e,r)=>e.affine(t) == r.affine(t) : (t,e)=>t == e,
      n.genSquare = t=>t ? e=>e * e % t : t=>t * t,
      n.genDouble = t=>t ? e=>(e + e) % t : t=>t + t,
      n.genIsZero = t=>t ? e=>e.affine(t) == n.zero : t=>t == n.zero,
      n.prototype.isOdd = function() {
          return (this & n.one) == n(1)
      }
      ,
      n.prototype.isNegative = function() {
          return this < n.zero
      }
      ,
      n.prototype.and = function(t) {
          return this & t
      }
      ,
      n.prototype.div = function(t) {
          return this / t
      }
      ,
      n.prototype.mod = function(t) {
          return this % t
      }
      ,
      n.prototype.pow = function(t) {
          return this ** t
      }
      ,
      n.prototype.abs = function() {
          return this > n.zero ? this : -this
      }
      ,
      n.prototype.modPow = function(t, e) {
          let r = n.one
            , i = this
            , o = t;
          for (; o; )
              o & n.one && (r = r * i % e),
              i = i * i % e,
              o >>= n.one;
          return r
      }
      ,
      n.prototype.greaterOrEquals = function(t) {
          return this >= t
      }
      ,
      n.prototype.greater = function(t) {
          return this > t
      }
      ,
      n.prototype.gt = n.prototype.greater,
      n.prototype.lesserOrEquals = function(t) {
          return this <= t
      }
      ,
      n.prototype.lesser = function(t) {
          return this < t
      }
      ,
      n.prototype.lt = n.prototype.lesser,
      n.prototype.equals = function(t) {
          return this == t
      }
      ,
      n.prototype.eq = n.prototype.equals,
      n.prototype.neq = function(t) {
          return this != t
      }
      ,
      n.prototype.toJSNumber = function() {
          return Number(this)
      }
      ;
  else {
      var o = i.prototype;
      n = function(t) {
          return "string" == typeof t && "0x" == t.slice(0, 2) ? i(t.slice(2), 16) : i(t)
      }
      ,
      n.one = i.one,
      n.zero = i.zero,
      n.prototype = o,
      n.prototype.div = function(t) {
          return this.divide(t)
      }
      ,
      n.genAffine = t=>{
          const e = n.zero.minus(t);
          return r=>{
              let i = r;
              return i.isNegative() ? (i.lesserOrEquals(e) && (i = i.mod(t)),
              i.isNegative() && (i = i.add(t))) : i.greaterOrEquals(t) && (i = i.mod(t)),
              i
          }
      }
      ,
      n.genInverse = t=>e=>e.affine(t).modInv(t),
      n.genAdd = t=>t ? (e,r)=>{
          const i = e.add(r);
          return i.greaterOrEquals(t) ? i.minus(t) : i
      }
      : (t,e)=>t.add(e),
      n.genSub = t=>t ? (e,r)=>e.greaterOrEquals(r) ? e.minus(r) : e.minus(r).add(t) : (t,e)=>t.minus(e),
      n.genNeg = t=>t ? e=>e.isZero() ? e : t.minus(e) : t=>n.zero.minus(t),
      n.genMul = t=>t ? (e,r)=>e.times(r).mod(t) : (t,e)=>t.times(e),
      n.genShr = ()=>(t,e)=>t.shiftRight(n(e).value),
      n.genShl = t=>t ? (e,r)=>e.shiftLeft(n(r).value).mod(t) : (t,e)=>t.shiftLeft(n(e).value),
      n.genSquare = t=>t ? e=>e.square().mod(t) : t=>t.square(),
      n.genDouble = t=>t ? e=>e.add(e).mod(t) : t=>t.add(t),
      n.genEquals = t=>t ? (e,r)=>e.affine(t).equals(r.affine(t)) : (t,e)=>t.equals(e),
      n.genIsZero = t=>t ? e=>e.affine(t).isZero() : t=>t.isZero()
  }
  n.affine = function(t, e) {
      return n.genAffine(e)(t)
  }
  ,
  n.prototype.affine = function(t) {
      return n.affine(this, t)
  }
  ,
  n.inverse = function(t, e) {
      return n.genInverse(e)(t)
  }
  ,
  n.prototype.inverse = function(t) {
      return n.genInverse(t)(this)
  }
  ,
  n.add = function(t, e, r) {
      return n.genAdd(r)(t, e)
  }
  ,
  n.prototype.add = function(t, e) {
      return n.genAdd(e)(this, t)
  }
  ,
  n.sub = function(t, e, r) {
      return n.genSub(r)(t, e)
  }
  ,
  n.prototype.sub = function(t, e) {
      return n.genSub(e)(this, t)
  }
  ,
  n.neg = function(t, e) {
      return n.genNeg(e)(t)
  }
  ,
  n.prototype.neg = function(t) {
      return n.genNeg(t)(this)
  }
  ,
  n.mul = function(t, e, r) {
      return n.genMul(r)(t, e)
  }
  ,
  n.prototype.mul = function(t, e) {
      return n.genMul(e)(this, t)
  }
  ,
  n.shr = function(t, e, r) {
      return n.genShr(r)(t, e)
  }
  ,
  n.prototype.shr = function(t, e) {
      return n.genShr(e)(this, t)
  }
  ,
  n.shl = function(t, e, r) {
      return n.genShl(r)(t, e)
  }
  ,
  n.prototype.shl = function(t, e) {
      return n.genShl(e)(this, t)
  }
  ,
  n.equals = function(t, e, r) {
      return n.genEquals(r)(t, e)
  }
  ,
  n.prototype.equals = function(t, e) {
      return n.genEquals(e)(this, t)
  }
  ,
  n.square = function(t, e) {
      return n.genSquare(e)(t)
  }
  ,
  n.prototype.square = function(t) {
      return n.genSquare(t)(this)
  }
  ,
  n.double = function(t, e) {
      return n.genDouble(e)(t)
  }
  ,
  n.prototype.double = function(t) {
      return n.genDouble(t)(this)
  }
  ,
  n.isZero = function(t, e) {
      return n.genIsZero(e)(t)
  }
  ,
  n.prototype.isZero = function(t) {
      return n.genIsZero(t)(this)
  }
  ,
  n.leBuff2int = function(t) {
      let e = n.zero;
      for (let r = 0; r < t.length; r++) {
          const i = n(t[r]);
          e = e.add(i.shl(8 * r))
      }
      return e
  }
  ,
  n.leInt2Buff = function(t, e) {
      let i = t
        , o = 0;
      const s = r.alloc(e);
      for (; i.greater(n.zero) && o < s.length; ) {
          let t = Number(i.and(n("255")));
          s[o] = t,
          o++,
          i = i.shr(8)
      }
      if (i.greater(n.zero))
          throw new Error("Number does not feed in buffer");
      return s
  }
  ,
  n.prototype.leInt2Buff = function(t) {
      return n.leInt2Buff(this, t)
  }
  ,
  n.beBuff2int = function(t) {
      let e = n.zero;
      for (let r = 0; r < t.length; r++) {
          const i = n(t[t.length - r - 1]);
          e = e.add(i.shl(8 * r))
      }
      return e
  }
  ,
  n.beInt2Buff = function(t, e) {
      let i = t
        , o = e - 1;
      const s = r.alloc(e);
      for (; i.greater(n.zero) && o >= 0; ) {
          let t = Number(i.and(n("255")));
          s[o] = t,
          o--,
          i = i.shr(8)
      }
      if (i.greater(n.zero))
          throw new Error("Number does not feed in buffer");
      return s
  }
  ,
  n.prototype.beInt2Buff = function(t) {
      return n.beInt2Buff(this, t)
  }
  ,
  t.exports = n
}
)),
parcelRequire.register("1cWWu", (function(t, e) {
  var r = function(t) {
      var e = 1e7
        , i = 9007199254740992
        , n = A(i)
        , o = "0123456789abcdefghijklmnopqrstuvwxyz"
        , s = "function" == typeof BigInt;
      function a(t, e, r, i) {
          return void 0 === t ? a[0] : void 0 !== e && (10 != +e || r) ? z(t, e, r, i) : Y(t)
      }
      function u(t, e) {
          this.value = t,
          this.sign = e,
          this.isSmall = !1
      }
      function l(t) {
          this.value = t,
          this.sign = t < 0,
          this.isSmall = !0
      }
      function c(t) {
          this.value = t
      }
      function h(t) {
          return -i < t && t < i
      }
      function A(t) {
          return t < 1e7 ? [t] : t < 1e14 ? [t % 1e7, Math.floor(t / 1e7)] : [t % 1e7, Math.floor(t / 1e7) % 1e7, Math.floor(t / 1e14)]
      }
      function f(t) {
          p(t);
          var r = t.length;
          if (r < 4 && x(t, n) < 0)
              switch (r) {
              case 0:
                  return 0;
              case 1:
                  return t[0];
              case 2:
                  return t[0] + t[1] * e;
              default:
                  return t[0] + (t[1] + t[2] * e) * e
              }
          return t
      }
      function p(t) {
          for (var e = t.length; 0 === t[--e]; )
              ;
          t.length = e + 1
      }
      function g(t) {
          for (var e = new Array(t), r = -1; ++r < t; )
              e[r] = 0;
          return e
      }
      function d(t) {
          return t > 0 ? Math.floor(t) : Math.ceil(t)
      }
      function I(t, r) {
          var i, n, o = t.length, s = r.length, a = new Array(o), u = 0, l = e;
          for (n = 0; n < s; n++)
              u = (i = t[n] + r[n] + u) >= l ? 1 : 0,
              a[n] = i - u * l;
          for (; n < o; )
              u = (i = t[n] + u) === l ? 1 : 0,
              a[n++] = i - u * l;
          return u > 0 && a.push(u),
          a
      }
      function m(t, e) {
          return t.length >= e.length ? I(t, e) : I(e, t)
      }
      function y(t, r) {
          var i, n, o = t.length, s = new Array(o), a = e;
          for (n = 0; n < o; n++)
              i = t[n] - a + r,
              r = Math.floor(i / a),
              s[n] = i - r * a,
              r += 1;
          for (; r > 0; )
              s[n++] = r % a,
              r = Math.floor(r / a);
          return s
      }
      function w(t, r) {
          var i, n, o = t.length, s = r.length, a = new Array(o), u = 0, l = e;
          for (i = 0; i < s; i++)
              (n = t[i] - u - r[i]) < 0 ? (n += l,
              u = 1) : u = 0,
              a[i] = n;
          for (i = s; i < o; i++) {
              if (!((n = t[i] - u) < 0)) {
                  a[i++] = n;
                  break
              }
              n += l,
              a[i] = n
          }
          for (; i < o; i++)
              a[i] = t[i];
          return p(a),
          a
      }
      function C(t, r, i) {
          var n, o, s = t.length, a = new Array(s), c = -r, h = e;
          for (n = 0; n < s; n++)
              o = t[n] + c,
              c = Math.floor(o / h),
              o %= h,
              a[n] = o < 0 ? o + h : o;
          return "number" == typeof (a = f(a)) ? (i && (a = -a),
          new l(a)) : new u(a,i)
      }
      function E(t, r) {
          var i, n, o, s, a = t.length, u = r.length, l = g(a + u), c = e;
          for (o = 0; o < a; ++o) {
              s = t[o];
              for (var h = 0; h < u; ++h)
                  i = s * r[h] + l[o + h],
                  n = Math.floor(i / c),
                  l[o + h] = i - n * c,
                  l[o + h + 1] += n
          }
          return p(l),
          l
      }
      function v(t, r) {
          var i, n, o = t.length, s = new Array(o), a = e, u = 0;
          for (n = 0; n < o; n++)
              i = t[n] * r + u,
              u = Math.floor(i / a),
              s[n] = i - u * a;
          for (; u > 0; )
              s[n++] = u % a,
              u = Math.floor(u / a);
          return s
      }
      function B(t, e) {
          for (var r = []; e-- > 0; )
              r.push(0);
          return r.concat(t)
      }
      function b(t, e) {
          var r = Math.max(t.length, e.length);
          if (r <= 30)
              return E(t, e);
          r = Math.ceil(r / 2);
          var i = t.slice(r)
            , n = t.slice(0, r)
            , o = e.slice(r)
            , s = e.slice(0, r)
            , a = b(n, s)
            , u = b(i, o)
            , l = b(m(n, i), m(s, o))
            , c = m(m(a, B(w(w(l, a), u), r)), B(u, 2 * r));
          return p(c),
          c
      }
      function Q(t, r, i) {
          return new u(t < e ? v(r, t) : E(r, A(t)),i)
      }
      function R(t) {
          var r, i, n, o, s = t.length, a = g(s + s), u = e;
          for (n = 0; n < s; n++) {
              i = 0 - (o = t[n]) * o;
              for (var l = n; l < s; l++)
                  r = o * t[l] * 2 + a[n + l] + i,
                  i = Math.floor(r / u),
                  a[n + l] = r - i * u;
              a[n + s] = i
          }
          return p(a),
          a
      }
      function M(t, e) {
          var r, i, n, o, s = t.length, a = g(s);
          for (n = 0,
          r = s - 1; r >= 0; --r)
              n = (o = 1e7 * n + t[r]) - (i = d(o / e)) * e,
              a[r] = 0 | i;
          return [a, 0 | n]
      }
      function _(t, r) {
          var i, n = Y(r);
          if (s)
              return [new c(t.value / n.value), new c(t.value % n.value)];
          var o, h = t.value, I = n.value;
          if (0 === I)
              throw new Error("Cannot divide by zero");
          if (t.isSmall)
              return n.isSmall ? [new l(d(h / I)), new l(h % I)] : [a[0], t];
          if (n.isSmall) {
              if (1 === I)
                  return [t, a[0]];
              if (-1 == I)
                  return [t.negate(), a[0]];
              var m = Math.abs(I);
              if (m < e) {
                  o = f((i = M(h, m))[0]);
                  var y = i[1];
                  return t.sign && (y = -y),
                  "number" == typeof o ? (t.sign !== n.sign && (o = -o),
                  [new l(o), new l(y)]) : [new u(o,t.sign !== n.sign), new l(y)]
              }
              I = A(m)
          }
          var C = x(h, I);
          if (-1 === C)
              return [a[0], t];
          if (0 === C)
              return [a[t.sign === n.sign ? 1 : -1], a[0]];
          i = h.length + I.length <= 200 ? function(t, r) {
              var i, n, o, s, a, u, l, c = t.length, h = r.length, A = e, p = g(r.length), d = r[h - 1], I = Math.ceil(A / (2 * d)), m = v(t, I), y = v(r, I);
              for (m.length <= c && m.push(0),
              y.push(0),
              d = y[h - 1],
              n = c - h; n >= 0; n--) {
                  for (i = A - 1,
                  m[n + h] !== d && (i = Math.floor((m[n + h] * A + m[n + h - 1]) / d)),
                  o = 0,
                  s = 0,
                  u = y.length,
                  a = 0; a < u; a++)
                      o += i * y[a],
                      l = Math.floor(o / A),
                      s += m[n + a] - (o - l * A),
                      o = l,
                      s < 0 ? (m[n + a] = s + A,
                      s = -1) : (m[n + a] = s,
                      s = 0);
                  for (; 0 !== s; ) {
                      for (i -= 1,
                      o = 0,
                      a = 0; a < u; a++)
                          (o += m[n + a] - A + y[a]) < 0 ? (m[n + a] = o + A,
                          o = 0) : (m[n + a] = o,
                          o = 1);
                      s += o
                  }
                  p[n] = i
              }
              return m = M(m, I)[0],
              [f(p), f(m)]
          }(h, I) : function(t, r) {
              for (var i, n, o, s, a, u = t.length, l = r.length, c = [], h = [], A = e; u; )
                  if (h.unshift(t[--u]),
                  p(h),
                  x(h, r) < 0)
                      c.push(0);
                  else {
                      o = h[(n = h.length) - 1] * A + h[n - 2],
                      s = r[l - 1] * A + r[l - 2],
                      n > l && (o = (o + 1) * A),
                      i = Math.ceil(o / s);
                      do {
                          if (x(a = v(r, i), h) <= 0)
                              break;
                          i--
                      } while (i);
                      c.push(i),
                      h = w(h, a)
                  }
              return c.reverse(),
              [f(c), f(h)]
          }(h, I),
          o = i[0];
          var E = t.sign !== n.sign
            , B = i[1]
            , b = t.sign;
          return "number" == typeof o ? (E && (o = -o),
          o = new l(o)) : o = new u(o,E),
          "number" == typeof B ? (b && (B = -B),
          B = new l(B)) : B = new u(B,b),
          [o, B]
      }
      function x(t, e) {
          if (t.length !== e.length)
              return t.length > e.length ? 1 : -1;
          for (var r = t.length - 1; r >= 0; r--)
              if (t[r] !== e[r])
                  return t[r] > e[r] ? 1 : -1;
          return 0
      }
      function D(t) {
          var e = t.abs();
          return !e.isUnit() && (!!(e.equals(2) || e.equals(3) || e.equals(5)) || !(e.isEven() || e.isDivisibleBy(3) || e.isDivisibleBy(5)) && (!!e.lesser(49) || void 0))
      }
      function S(t, e) {
          for (var i, n, o, s = t.prev(), a = s, u = 0; a.isEven(); )
              a = a.divide(2),
              u++;
          t: for (n = 0; n < e.length; n++)
              if (!t.lesser(e[n]) && !(o = r(e[n]).modPow(a, t)).isUnit() && !o.equals(s)) {
                  for (i = u - 1; 0 != i; i--) {
                      if ((o = o.square().mod(t)).isUnit())
                          return !1;
                      if (o.equals(s))
                          continue t
                  }
                  return !1
              }
          return !0
      }
      u.prototype = Object.create(a.prototype),
      l.prototype = Object.create(a.prototype),
      c.prototype = Object.create(a.prototype),
      u.prototype.add = function(t) {
          var e = Y(t);
          if (this.sign !== e.sign)
              return this.subtract(e.negate());
          var r = this.value
            , i = e.value;
          return e.isSmall ? new u(y(r, Math.abs(i)),this.sign) : new u(m(r, i),this.sign)
      }
      ,
      u.prototype.plus = u.prototype.add,
      l.prototype.add = function(t) {
          var e = Y(t)
            , r = this.value;
          if (r < 0 !== e.sign)
              return this.subtract(e.negate());
          var i = e.value;
          if (e.isSmall) {
              if (h(r + i))
                  return new l(r + i);
              i = A(Math.abs(i))
          }
          return new u(y(i, Math.abs(r)),r < 0)
      }
      ,
      l.prototype.plus = l.prototype.add,
      c.prototype.add = function(t) {
          return new c(this.value + Y(t).value)
      }
      ,
      c.prototype.plus = c.prototype.add,
      u.prototype.subtract = function(t) {
          var e = Y(t);
          if (this.sign !== e.sign)
              return this.add(e.negate());
          var r = this.value
            , i = e.value;
          return e.isSmall ? C(r, Math.abs(i), this.sign) : function(t, e, r) {
              var i;
              return x(t, e) >= 0 ? i = w(t, e) : (i = w(e, t),
              r = !r),
              "number" == typeof (i = f(i)) ? (r && (i = -i),
              new l(i)) : new u(i,r)
          }(r, i, this.sign)
      }
      ,
      u.prototype.minus = u.prototype.subtract,
      l.prototype.subtract = function(t) {
          var e = Y(t)
            , r = this.value;
          if (r < 0 !== e.sign)
              return this.add(e.negate());
          var i = e.value;
          return e.isSmall ? new l(r - i) : C(i, Math.abs(r), r >= 0)
      }
      ,
      l.prototype.minus = l.prototype.subtract,
      c.prototype.subtract = function(t) {
          return new c(this.value - Y(t).value)
      }
      ,
      c.prototype.minus = c.prototype.subtract,
      u.prototype.negate = function() {
          return new u(this.value,!this.sign)
      }
      ,
      l.prototype.negate = function() {
          var t = this.sign
            , e = new l(-this.value);
          return e.sign = !t,
          e
      }
      ,
      c.prototype.negate = function() {
          return new c(-this.value)
      }
      ,
      u.prototype.abs = function() {
          return new u(this.value,!1)
      }
      ,
      l.prototype.abs = function() {
          return new l(Math.abs(this.value))
      }
      ,
      c.prototype.abs = function() {
          return new c(this.value >= 0 ? this.value : -this.value)
      }
      ,
      u.prototype.multiply = function(t) {
          var r, i, n, o = Y(t), s = this.value, l = o.value, c = this.sign !== o.sign;
          if (o.isSmall) {
              if (0 === l)
                  return a[0];
              if (1 === l)
                  return this;
              if (-1 === l)
                  return this.negate();
              if ((r = Math.abs(l)) < e)
                  return new u(v(s, r),c);
              l = A(r)
          }
          return i = s.length,
          n = l.length,
          new u(-.012 * i - .012 * n + 15e-6 * i * n > 0 ? b(s, l) : E(s, l),c)
      }
      ,
      u.prototype.times = u.prototype.multiply,
      l.prototype._multiplyBySmall = function(t) {
          return h(t.value * this.value) ? new l(t.value * this.value) : Q(Math.abs(t.value), A(Math.abs(this.value)), this.sign !== t.sign)
      }
      ,
      u.prototype._multiplyBySmall = function(t) {
          return 0 === t.value ? a[0] : 1 === t.value ? this : -1 === t.value ? this.negate() : Q(Math.abs(t.value), this.value, this.sign !== t.sign)
      }
      ,
      l.prototype.multiply = function(t) {
          return Y(t)._multiplyBySmall(this)
      }
      ,
      l.prototype.times = l.prototype.multiply,
      c.prototype.multiply = function(t) {
          return new c(this.value * Y(t).value)
      }
      ,
      c.prototype.times = c.prototype.multiply,
      u.prototype.square = function() {
          return new u(R(this.value),!1)
      }
      ,
      l.prototype.square = function() {
          var t = this.value * this.value;
          return h(t) ? new l(t) : new u(R(A(Math.abs(this.value))),!1)
      }
      ,
      c.prototype.square = function(t) {
          return new c(this.value * this.value)
      }
      ,
      u.prototype.divmod = function(t) {
          var e = _(this, t);
          return {
              quotient: e[0],
              remainder: e[1]
          }
      }
      ,
      c.prototype.divmod = l.prototype.divmod = u.prototype.divmod,
      u.prototype.divide = function(t) {
          return _(this, t)[0]
      }
      ,
      c.prototype.over = c.prototype.divide = function(t) {
          return new c(this.value / Y(t).value)
      }
      ,
      l.prototype.over = l.prototype.divide = u.prototype.over = u.prototype.divide,
      u.prototype.mod = function(t) {
          return _(this, t)[1]
      }
      ,
      c.prototype.mod = c.prototype.remainder = function(t) {
          return new c(this.value % Y(t).value)
      }
      ,
      l.prototype.remainder = l.prototype.mod = u.prototype.remainder = u.prototype.mod,
      u.prototype.pow = function(t) {
          var e, r, i, n = Y(t), o = this.value, s = n.value;
          if (0 === s)
              return a[1];
          if (0 === o)
              return a[0];
          if (1 === o)
              return a[1];
          if (-1 === o)
              return n.isEven() ? a[1] : a[-1];
          if (n.sign)
              return a[0];
          if (!n.isSmall)
              throw new Error("The exponent " + n.toString() + " is too large.");
          if (this.isSmall && h(e = Math.pow(o, s)))
              return new l(d(e));
          for (r = this,
          i = a[1]; !0 & s && (i = i.times(r),
          --s),
          0 !== s; )
              s /= 2,
              r = r.square();
          return i
      }
      ,
      l.prototype.pow = u.prototype.pow,
      c.prototype.pow = function(t) {
          var e = Y(t)
            , r = this.value
            , i = e.value
            , n = BigInt(0)
            , o = BigInt(1)
            , s = BigInt(2);
          if (i === n)
              return a[1];
          if (r === n)
              return a[0];
          if (r === o)
              return a[1];
          if (r === BigInt(-1))
              return e.isEven() ? a[1] : a[-1];
          if (e.isNegative())
              return new c(n);
          for (var u = this, l = a[1]; (i & o) === o && (l = l.times(u),
          --i),
          i !== n; )
              i /= s,
              u = u.square();
          return l
      }
      ,
      u.prototype.modPow = function(t, e) {
          if (t = Y(t),
          (e = Y(e)).isZero())
              throw new Error("Cannot take modPow with modulus 0");
          var r = a[1]
            , i = this.mod(e);
          for (t.isNegative() && (t = t.multiply(a[-1]),
          i = i.modInv(e)); t.isPositive(); ) {
              if (i.isZero())
                  return a[0];
              t.isOdd() && (r = r.multiply(i).mod(e)),
              t = t.divide(2),
              i = i.square().mod(e)
          }
          return r
      }
      ,
      c.prototype.modPow = l.prototype.modPow = u.prototype.modPow,
      u.prototype.compareAbs = function(t) {
          var e = Y(t)
            , r = this.value
            , i = e.value;
          return e.isSmall ? 1 : x(r, i)
      }
      ,
      l.prototype.compareAbs = function(t) {
          var e = Y(t)
            , r = Math.abs(this.value)
            , i = e.value;
          return e.isSmall ? r === (i = Math.abs(i)) ? 0 : r > i ? 1 : -1 : -1
      }
      ,
      c.prototype.compareAbs = function(t) {
          var e = this.value
            , r = Y(t).value;
          return (e = e >= 0 ? e : -e) === (r = r >= 0 ? r : -r) ? 0 : e > r ? 1 : -1
      }
      ,
      u.prototype.compare = function(t) {
          if (t === 1 / 0)
              return -1;
          if (t === -1 / 0)
              return 1;
          var e = Y(t)
            , r = this.value
            , i = e.value;
          return this.sign !== e.sign ? e.sign ? 1 : -1 : e.isSmall ? this.sign ? -1 : 1 : x(r, i) * (this.sign ? -1 : 1)
      }
      ,
      u.prototype.compareTo = u.prototype.compare,
      l.prototype.compare = function(t) {
          if (t === 1 / 0)
              return -1;
          if (t === -1 / 0)
              return 1;
          var e = Y(t)
            , r = this.value
            , i = e.value;
          return e.isSmall ? r == i ? 0 : r > i ? 1 : -1 : r < 0 !== e.sign ? r < 0 ? -1 : 1 : r < 0 ? 1 : -1
      }
      ,
      l.prototype.compareTo = l.prototype.compare,
      c.prototype.compare = function(t) {
          if (t === 1 / 0)
              return -1;
          if (t === -1 / 0)
              return 1;
          var e = this.value
            , r = Y(t).value;
          return e === r ? 0 : e > r ? 1 : -1
      }
      ,
      c.prototype.compareTo = c.prototype.compare,
      u.prototype.equals = function(t) {
          return 0 === this.compare(t)
      }
      ,
      c.prototype.eq = c.prototype.equals = l.prototype.eq = l.prototype.equals = u.prototype.eq = u.prototype.equals,
      u.prototype.notEquals = function(t) {
          return 0 !== this.compare(t)
      }
      ,
      c.prototype.neq = c.prototype.notEquals = l.prototype.neq = l.prototype.notEquals = u.prototype.neq = u.prototype.notEquals,
      u.prototype.greater = function(t) {
          return this.compare(t) > 0
      }
      ,
      c.prototype.gt = c.prototype.greater = l.prototype.gt = l.prototype.greater = u.prototype.gt = u.prototype.greater,
      u.prototype.lesser = function(t) {
          return this.compare(t) < 0
      }
      ,
      c.prototype.lt = c.prototype.lesser = l.prototype.lt = l.prototype.lesser = u.prototype.lt = u.prototype.lesser,
      u.prototype.greaterOrEquals = function(t) {
          return this.compare(t) >= 0
      }
      ,
      c.prototype.geq = c.prototype.greaterOrEquals = l.prototype.geq = l.prototype.greaterOrEquals = u.prototype.geq = u.prototype.greaterOrEquals,
      u.prototype.lesserOrEquals = function(t) {
          return this.compare(t) <= 0
      }
      ,
      c.prototype.leq = c.prototype.lesserOrEquals = l.prototype.leq = l.prototype.lesserOrEquals = u.prototype.leq = u.prototype.lesserOrEquals,
      u.prototype.isEven = function() {
          return 0 == (1 & this.value[0])
      }
      ,
      l.prototype.isEven = function() {
          return 0 == (1 & this.value)
      }
      ,
      c.prototype.isEven = function() {
          return (this.value & BigInt(1)) === BigInt(0)
      }
      ,
      u.prototype.isOdd = function() {
          return 1 == (1 & this.value[0])
      }
      ,
      l.prototype.isOdd = function() {
          return 1 == (1 & this.value)
      }
      ,
      c.prototype.isOdd = function() {
          return (this.value & BigInt(1)) === BigInt(1)
      }
      ,
      u.prototype.isPositive = function() {
          return !this.sign
      }
      ,
      l.prototype.isPositive = function() {
          return this.value > 0
      }
      ,
      c.prototype.isPositive = l.prototype.isPositive,
      u.prototype.isNegative = function() {
          return this.sign
      }
      ,
      l.prototype.isNegative = function() {
          return this.value < 0
      }
      ,
      c.prototype.isNegative = l.prototype.isNegative,
      u.prototype.isUnit = function() {
          return !1
      }
      ,
      l.prototype.isUnit = function() {
          return 1 === Math.abs(this.value)
      }
      ,
      c.prototype.isUnit = function() {
          return this.abs().value === BigInt(1)
      }
      ,
      u.prototype.isZero = function() {
          return !1
      }
      ,
      l.prototype.isZero = function() {
          return 0 === this.value
      }
      ,
      c.prototype.isZero = function() {
          return this.value === BigInt(0)
      }
      ,
      u.prototype.isDivisibleBy = function(t) {
          var e = Y(t);
          return !e.isZero() && (!!e.isUnit() || (0 === e.compareAbs(2) ? this.isEven() : this.mod(e).isZero()))
      }
      ,
      c.prototype.isDivisibleBy = l.prototype.isDivisibleBy = u.prototype.isDivisibleBy,
      u.prototype.isPrime = function(e) {
          var i = D(this);
          if (i !== t)
              return i;
          var n = this.abs()
            , o = n.bitLength();
          if (o <= 64)
              return S(n, [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37]);
          for (var s = Math.log(2) * o.toJSNumber(), a = Math.ceil(!0 === e ? 2 * Math.pow(s, 2) : s), u = [], l = 0; l < a; l++)
              u.push(r(l + 2));
          return S(n, u)
      }
      ,
      c.prototype.isPrime = l.prototype.isPrime = u.prototype.isPrime,
      u.prototype.isProbablePrime = function(e, i) {
          var n = D(this);
          if (n !== t)
              return n;
          for (var o = this.abs(), s = e === t ? 5 : e, a = [], u = 0; u < s; u++)
              a.push(r.randBetween(2, o.minus(2), i));
          return S(o, a)
      }
      ,
      c.prototype.isProbablePrime = l.prototype.isProbablePrime = u.prototype.isProbablePrime,
      u.prototype.modInv = function(t) {
          for (var e, i, n, o = r.zero, s = r.one, a = Y(t), u = this.abs(); !u.isZero(); )
              e = a.divide(u),
              i = o,
              n = a,
              o = s,
              a = u,
              s = i.subtract(e.multiply(s)),
              u = n.subtract(e.multiply(u));
          if (!a.isUnit())
              throw new Error(this.toString() + " and " + t.toString() + " are not co-prime");
          return -1 === o.compare(0) && (o = o.add(t)),
          this.isNegative() ? o.negate() : o
      }
      ,
      c.prototype.modInv = l.prototype.modInv = u.prototype.modInv,
      u.prototype.next = function() {
          var t = this.value;
          return this.sign ? C(t, 1, this.sign) : new u(y(t, 1),this.sign)
      }
      ,
      l.prototype.next = function() {
          var t = this.value;
          return t + 1 < i ? new l(t + 1) : new u(n,!1)
      }
      ,
      c.prototype.next = function() {
          return new c(this.value + BigInt(1))
      }
      ,
      u.prototype.prev = function() {
          var t = this.value;
          return this.sign ? new u(y(t, 1),!0) : C(t, 1, this.sign)
      }
      ,
      l.prototype.prev = function() {
          var t = this.value;
          return t - 1 > -i ? new l(t - 1) : new u(n,!0)
      }
      ,
      c.prototype.prev = function() {
          return new c(this.value - BigInt(1))
      }
      ;
      for (var k = [1]; 2 * k[k.length - 1] <= e; )
          k.push(2 * k[k.length - 1]);
      var F = k.length
        , q = k[F - 1];
      function N(t) {
          return Math.abs(t) <= e
      }
      function T(t, e, i) {
          e = Y(e);
          for (var n = t.isNegative(), o = e.isNegative(), s = n ? t.not() : t, a = o ? e.not() : e, u = 0, l = 0, c = null, h = null, A = []; !s.isZero() || !a.isZero(); )
              u = (c = _(s, q))[1].toJSNumber(),
              n && (u = q - 1 - u),
              l = (h = _(a, q))[1].toJSNumber(),
              o && (l = q - 1 - l),
              s = c[0],
              a = h[0],
              A.push(i(u, l));
          for (var f = 0 !== i(n ? 1 : 0, o ? 1 : 0) ? r(-1) : r(0), p = A.length - 1; p >= 0; p -= 1)
              f = f.multiply(q).add(r(A[p]));
          return f
      }
      u.prototype.shiftLeft = function(t) {
          var e = Y(t).toJSNumber();
          if (!N(e))
              throw new Error(String(e) + " is too large for shifting.");
          if (e < 0)
              return this.shiftRight(-e);
          var r = this;
          if (r.isZero())
              return r;
          for (; e >= F; )
              r = r.multiply(q),
              e -= F - 1;
          return r.multiply(k[e])
      }
      ,
      c.prototype.shiftLeft = l.prototype.shiftLeft = u.prototype.shiftLeft,
      u.prototype.shiftRight = function(t) {
          var e, r = Y(t).toJSNumber();
          if (!N(r))
              throw new Error(String(r) + " is too large for shifting.");
          if (r < 0)
              return this.shiftLeft(-r);
          for (var i = this; r >= F; ) {
              if (i.isZero() || i.isNegative() && i.isUnit())
                  return i;
              i = (e = _(i, q))[1].isNegative() ? e[0].prev() : e[0],
              r -= F - 1
          }
          return (e = _(i, k[r]))[1].isNegative() ? e[0].prev() : e[0]
      }
      ,
      c.prototype.shiftRight = l.prototype.shiftRight = u.prototype.shiftRight,
      u.prototype.not = function() {
          return this.negate().prev()
      }
      ,
      c.prototype.not = l.prototype.not = u.prototype.not,
      u.prototype.and = function(t) {
          return T(this, t, (function(t, e) {
              return t & e
          }
          ))
      }
      ,
      c.prototype.and = l.prototype.and = u.prototype.and,
      u.prototype.or = function(t) {
          return T(this, t, (function(t, e) {
              return t | e
          }
          ))
      }
      ,
      c.prototype.or = l.prototype.or = u.prototype.or,
      u.prototype.xor = function(t) {
          return T(this, t, (function(t, e) {
              return t ^ e
          }
          ))
      }
      ,
      c.prototype.xor = l.prototype.xor = u.prototype.xor;
      var P = 1073741824;
      function O(t) {
          var r = t.value
            , i = "number" == typeof r ? r | P : "bigint" == typeof r ? r | BigInt(P) : r[0] + r[1] * e | 1073758208;
          return i & -i
      }
      function U(t, e) {
          if (e.compareTo(t) <= 0) {
              var i = U(t, e.square(e))
                , n = i.p
                , o = i.e
                , s = n.multiply(e);
              return s.compareTo(t) <= 0 ? {
                  p: s,
                  e: 2 * o + 1
              } : {
                  p: n,
                  e: 2 * o
              }
          }
          return {
              p: r(1),
              e: 0
          }
      }
      function L(t, e) {
          return t = Y(t),
          e = Y(e),
          t.greater(e) ? t : e
      }
      function H(t, e) {
          return t = Y(t),
          e = Y(e),
          t.lesser(e) ? t : e
      }
      function K(t, e) {
          if (t = Y(t).abs(),
          e = Y(e).abs(),
          t.equals(e))
              return t;
          if (t.isZero())
              return e;
          if (e.isZero())
              return t;
          for (var r, i, n = a[1]; t.isEven() && e.isEven(); )
              r = H(O(t), O(e)),
              t = t.divide(r),
              e = e.divide(r),
              n = n.multiply(r);
          for (; t.isEven(); )
              t = t.divide(O(t));
          do {
              for (; e.isEven(); )
                  e = e.divide(O(e));
              t.greater(e) && (i = e,
              e = t,
              t = i),
              e = e.subtract(t)
          } while (!e.isZero());
          return n.isUnit() ? t : t.multiply(n)
      }
      u.prototype.bitLength = function() {
          var t = this;
          return t.compareTo(r(0)) < 0 && (t = t.negate().subtract(r(1))),
          0 === t.compareTo(r(0)) ? r(0) : r(U(t, r(2)).e).add(r(1))
      }
      ,
      c.prototype.bitLength = l.prototype.bitLength = u.prototype.bitLength;
      var z = function(t, e, r, i) {
          r = r || o,
          t = String(t),
          i || (t = t.toLowerCase(),
          r = r.toLowerCase());
          var n, s = t.length, a = Math.abs(e), u = {};
          for (n = 0; n < r.length; n++)
              u[r[n]] = n;
          for (n = 0; n < s; n++) {
              if ("-" !== (h = t[n]) && (h in u && u[h] >= a)) {
                  if ("1" === h && 1 === a)
                      continue;
                  throw new Error(h + " is not a valid digit in base " + e + ".")
              }
          }
          e = Y(e);
          var l = []
            , c = "-" === t[0];
          for (n = c ? 1 : 0; n < t.length; n++) {
              var h;
              if ((h = t[n])in u)
                  l.push(Y(u[h]));
              else {
                  if ("<" !== h)
                      throw new Error(h + " is not a valid character");
                  var A = n;
                  do {
                      n++
                  } while (">" !== t[n] && n < t.length);
                  l.push(Y(t.slice(A + 1, n)))
              }
          }
          return G(l, e, c)
      };
      function G(t, e, r) {
          var i, n = a[0], o = a[1];
          for (i = t.length - 1; i >= 0; i--)
              n = n.add(t[i].times(o)),
              o = o.times(e);
          return r ? n.negate() : n
      }
      function V(t, e) {
          if ((e = r(e)).isZero()) {
              if (t.isZero())
                  return {
                      value: [0],
                      isNegative: !1
                  };
              throw new Error("Cannot convert nonzero numbers to base 0.")
          }
          if (e.equals(-1)) {
              if (t.isZero())
                  return {
                      value: [0],
                      isNegative: !1
                  };
              if (t.isNegative())
                  return {
                      value: [].concat.apply([], Array.apply(null, Array(-t.toJSNumber())).map(Array.prototype.valueOf, [1, 0])),
                      isNegative: !1
                  };
              var i = Array.apply(null, Array(t.toJSNumber() - 1)).map(Array.prototype.valueOf, [0, 1]);
              return i.unshift([1]),
              {
                  value: [].concat.apply([], i),
                  isNegative: !1
              }
          }
          var n = !1;
          if (t.isNegative() && e.isPositive() && (n = !0,
          t = t.abs()),
          e.isUnit())
              return t.isZero() ? {
                  value: [0],
                  isNegative: !1
              } : {
                  value: Array.apply(null, Array(t.toJSNumber())).map(Number.prototype.valueOf, 1),
                  isNegative: n
              };
          for (var o, s = [], a = t; a.isNegative() || a.compareAbs(e) >= 0; ) {
              o = a.divmod(e),
              a = o.quotient;
              var u = o.remainder;
              u.isNegative() && (u = e.minus(u).abs(),
              a = a.next()),
              s.push(u.toJSNumber())
          }
          return s.push(a.toJSNumber()),
          {
              value: s.reverse(),
              isNegative: n
          }
      }
      function $(t, e, r) {
          var i = V(t, e);
          return (i.isNegative ? "-" : "") + i.value.map((function(t) {
              return function(t, e) {
                  return t < (e = e || o).length ? e[t] : "<" + t + ">"
              }(t, r)
          }
          )).join("")
      }
      function j(t) {
          if (h(+t)) {
              var e = +t;
              if (e === d(e))
                  return s ? new c(BigInt(e)) : new l(e);
              throw new Error("Invalid integer: " + t)
          }
          var r = "-" === t[0];
          r && (t = t.slice(1));
          var i = t.split(/e/i);
          if (i.length > 2)
              throw new Error("Invalid integer: " + i.join("e"));
          if (2 === i.length) {
              var n = i[1];
              if ("+" === n[0] && (n = n.slice(1)),
              (n = +n) !== d(n) || !h(n))
                  throw new Error("Invalid integer: " + n + " is not a valid exponent.");
              var o = i[0]
                , a = o.indexOf(".");
              if (a >= 0 && (n -= o.length - a - 1,
              o = o.slice(0, a) + o.slice(a + 1)),
              n < 0)
                  throw new Error("Cannot include negative exponent part for integers");
              t = o += new Array(n + 1).join("0")
          }
          if (!/^([0-9][0-9]*)$/.test(t))
              throw new Error("Invalid integer: " + t);
          if (s)
              return new c(BigInt(r ? "-" + t : t));
          for (var A = [], f = t.length, g = f - 7; f > 0; )
              A.push(+t.slice(g, f)),
              (g -= 7) < 0 && (g = 0),
              f -= 7;
          return p(A),
          new u(A,r)
      }
      function Y(t) {
          return "number" == typeof t ? function(t) {
              if (s)
                  return new c(BigInt(t));
              if (h(t)) {
                  if (t !== d(t))
                      throw new Error(t + " is not an integer.");
                  return new l(t)
              }
              return j(t.toString())
          }(t) : "string" == typeof t ? j(t) : "bigint" == typeof t ? new c(t) : t
      }
      u.prototype.toArray = function(t) {
          return V(this, t)
      }
      ,
      l.prototype.toArray = function(t) {
          return V(this, t)
      }
      ,
      c.prototype.toArray = function(t) {
          return V(this, t)
      }
      ,
      u.prototype.toString = function(e, r) {
          if (e === t && (e = 10),
          10 !== e)
              return $(this, e, r);
          for (var i, n = this.value, o = n.length, s = String(n[--o]); --o >= 0; )
              i = String(n[o]),
              s += "0000000".slice(i.length) + i;
          return (this.sign ? "-" : "") + s
      }
      ,
      l.prototype.toString = function(e, r) {
          return e === t && (e = 10),
          10 != e ? $(this, e, r) : String(this.value)
      }
      ,
      c.prototype.toString = l.prototype.toString,
      c.prototype.toJSON = u.prototype.toJSON = l.prototype.toJSON = function() {
          return this.toString()
      }
      ,
      u.prototype.valueOf = function() {
          return parseInt(this.toString(), 10)
      }
      ,
      u.prototype.toJSNumber = u.prototype.valueOf,
      l.prototype.valueOf = function() {
          return this.value
      }
      ,
      l.prototype.toJSNumber = l.prototype.valueOf,
      c.prototype.valueOf = c.prototype.toJSNumber = function() {
          return parseInt(this.toString(), 10)
      }
      ;
      for (var W = 0; W < 1e3; W++)
          a[W] = Y(W),
          W > 0 && (a[-W] = Y(-W));
      return a.one = a[1],
      a.zero = a[0],
      a.minusOne = a[-1],
      a.max = L,
      a.min = H,
      a.gcd = K,
      a.lcm = function(t, e) {
          return t = Y(t).abs(),
          e = Y(e).abs(),
          t.divide(K(t, e)).multiply(e)
      }
      ,
      a.isInstance = function(t) {
          return t instanceof u || t instanceof l || t instanceof c
      }
      ,
      a.randBetween = function(t, r, i) {
          t = Y(t),
          r = Y(r);
          var n = i || Math.random
            , o = H(t, r)
            , s = L(t, r).subtract(o).add(1);
          if (s.isSmall)
              return o.add(Math.floor(n() * s));
          for (var u = V(s, e).value, l = [], c = !0, h = 0; h < u.length; h++) {
              var A = c ? u[h] + (h + 1 < u.length ? u[h + 1] / e : 0) : e
                , f = d(n() * A);
              l.push(f),
              f < u[h] && (c = !1)
          }
          return o.add(a.fromArray(l, e, !1))
      }
      ,
      a.fromArray = function(t, e, r) {
          return G(t.map(Y), Y(e || 10), r)
      }
      ,
      a
  }();
  t.hasOwnProperty("exports") && (t.exports = r),
  "function" == typeof define && define.amd && define((function() {
      return r
  }
  ))
}
)),
parcelRequire.register("fPewC", (function(t, e) {
  var r = parcelRequire("bjKYs");
  t.exports = function(t, e, n) {
      (n = n || {}).logFunction || (n.logFunction = console.log);
      const o = new i(t,n);
      function s(t, e, r) {
          if (!Array.isArray(t))
              return r(e, t);
          for (let i = 0; i < t.length; i++)
              e.push(i),
              s(t[i], e, r),
              e.pop(i)
      }
      o.setSignal("one", [], r(1));
      for (let t in o.notInitSignals)
          0 == o.notInitSignals[t] && o.triggerComponent(t);
      for (let t in e)
          o.currentComponent = "main",
          s(e[t], [], (function(e, i) {
              if (void 0 === i)
                  throw new Error("Signal not defined:" + t);
              o.setSignal(t, e, r(i))
          }
          ));
      for (let e = 0; e < t.nInputs; e++) {
          const r = t.inputIdx(e);
          if (void 0 === o.witness[r])
              throw new Error("Input Signal not assigned: " + t.signalNames(r))
      }
      for (let e = 0; e < o.witness.length; e++) {
          if (void 0 === o.witness[e])
              throw new Error("Signal not assigned: " + t.signalNames(e));
          n.logOutput && n.logFunction(t.signalNames(e) + " --\x3e " + o.witness[e].toString())
      }
      return o.witness.slice(0, t.nVars)
  }
  ;
  class i {
      _sels2str(t) {
          let e = "";
          for (let r = 0; r < t.length; r++)
              e += `[${t[r]}]`;
          return e
      }
      setPin(t, e, r, i, n) {
          let o = "one" == t ? "one" : this.currentComponent + "." + t;
          o += this._sels2str(e) + "." + r + this._sels2str(i),
          this.setSignalFullName(o, n)
      }
      setSignal(t, e, r) {
          let i = this.currentComponent ? this.currentComponent + "." + t : t;
          i += this._sels2str(e),
          this.setSignalFullName(i, r)
      }
      triggerComponent(t) {
          this.options.logTrigger && this.options.logFunction("Component Treiggered: " + this.circuit.components[t].name),
          this.notInitSignals[t]--;
          const e = this.currentComponent;
          this.currentComponent = this.circuit.components[t].name;
          const r = this.circuit.components[t].template
            , i = {};
          for (let e in this.circuit.components[t].params)
              i[e] = this.circuit.components[t].params[e];
          const n = this.scopes;
          this.scopes = [this.scopes[0], i],
          this.circuit.templates[r](this),
          this.scopes = n,
          this.currentComponent = e,
          this.options.logTrigger && this.options.logFunction("End Component Treiggered: " + this.circuit.components[t].name)
      }
      callFunction(t, e) {
          const r = {};
          for (let i = 0; i < this.circuit.functions[t].params.length; i++) {
              r[this.circuit.functions[t].params[i]] = e[i]
          }
          const i = this.scopes;
          this.scopes = [this.scopes[0], r];
          const n = this.circuit.functions[t].func(this);
          return this.scopes = i,
          n
      }
      setSignalFullName(t, e) {
          this.options.logSet && this.options.logFunction("set " + t + " <-- " + e.toString());
          const i = this.circuit.getSignalIdx(t);
          let n = !1;
          void 0 === this.witness[i] && (n = !0),
          this.witness[i] = r(e);
          const o = [];
          for (let t = 0; t < this.circuit.signals[i].triggerComponents.length; t++) {
              var s = this.circuit.signals[i].triggerComponents[t];
              n && this.notInitSignals[s]--,
              o.push(s)
          }
          return o.map((t=>{
              0 == this.notInitSignals[t] && this.triggerComponent(t)
          }
          )),
          this.witness[i]
      }
      setVar(t, e, r) {
          const i = this.scopes[this.scopes.length - 1];
          return 0 == e.length ? i[t] = r : (void 0 === i[t] && (i[t] = []),
          function t(e, r, i) {
              1 == r.length ? e[r[0]] = i : (void 0 === e[r[0]] && (e[r[0]] = []),
              t(e[r[0]], r.slice(1), i))
          }(i[t], e, r)),
          r
      }
      getVar(t, e) {
          function r(t, e) {
              return 0 == e.length ? t : r(t[e[0]], e.slice(1))
          }
          for (let i = this.scopes.length - 1; i >= 0; i--)
              if (void 0 !== this.scopes[i][t])
                  return r(this.scopes[i][t], e);
          throw new Error("Variable not defined: " + t)
      }
      getSignal(t, e) {
          let r = "one" == t ? "one" : this.currentComponent + "." + t;
          return r += this._sels2str(e),
          this.getSignalFullName(r)
      }
      getPin(t, e, r, i) {
          let n = "one" == t ? "one" : this.currentComponent + "." + t;
          return n += this._sels2str(e) + "." + r + this._sels2str(i),
          this.getSignalFullName(n)
      }
      getSignalFullName(t) {
          const e = this.circuit.getSignalIdx(t);
          if (void 0 === this.witness[e])
              throw new Error("Signal not initialized: " + t);
          return this.options.logGet && this.options.logFunction("get ---\x3e" + t + " = " + this.witness[e].toString()),
          this.witness[e]
      }
      assert(t, e, i) {
          const n = r(t)
            , o = r(e);
          if (!n.equals(o))
              throw new Error("Constraint doesn't match " + this.currentComponent + ": " + i + " -> " + n.toString() + " != " + o.toString())
      }
      constructor(t, e) {
          this.options = e,
          this.scopes = [],
          this.circuit = t,
          this.witness = new Array(t.nSignals),
          this.notInitSignals = {};
          for (let t in this.circuit.components)
              this.notInitSignals[t] = this.circuit.components[t].inputSignals
      }
  }
}
)),
parcelRequire.register("57Czi", (function(t, e) {
  var r = parcelRequire("bjKYs")
    , i = parcelRequire("lnsop")
    , n = parcelRequire("3Xe51")
    , o = parcelRequire("8wchO");
  const s = new i
    , a = s.G1
    , u = s.G2
    , l = new n(new o(s.r))
    , c = new o(s.r);
  t.exports = function(t) {
      const e = {
          vk_proof: {
              protocol: "original",
              nVars: t.nVars,
              nPublic: t.nPubInputs + t.nOutputs
          },
          vk_verifier: {
              protocol: "original",
              nPublic: t.nPubInputs + t.nOutputs
          },
          toxic: {}
      };
      return e.vk_proof.domainBits = l.log2(t.nConstraints + t.nPubInputs + t.nOutputs + 1 - 1) + 1,
      e.vk_proof.domainSize = 1 << e.vk_proof.domainBits,
      function(t, e) {
          t.vk_proof.polsA = new Array(e.nVars),
          t.vk_proof.polsB = new Array(e.nVars),
          t.vk_proof.polsC = new Array(e.nVars);
          for (let r = 0; r < e.nVars; r++)
              t.vk_proof.polsA[r] = {},
              t.vk_proof.polsB[r] = {},
              t.vk_proof.polsC[r] = {};
          for (let i = 0; i < e.nConstraints; i++) {
              for (let n in e.constraints[i][0])
                  t.vk_proof.polsA[n][i] = r(e.constraints[i][0][n]);
              for (let n in e.constraints[i][1])
                  t.vk_proof.polsB[n][i] = r(e.constraints[i][1][n]);
              for (let n in e.constraints[i][2])
                  t.vk_proof.polsC[n][i] = r(e.constraints[i][2][n])
          }
          for (let r = 0; r < e.nPubInputs + e.nOutputs + 1; ++r)
              t.vk_proof.polsA[r][e.nConstraints + r] = c.one
      }(e, t),
      e.toxic.t = c.random(),
      function(t, e) {
          const r = function(t, e) {
              const r = l.computeVanishingPolinomial(t.vk_proof.domainBits, t.toxic.t)
                , i = l.evaluateLagrangePolynomials(t.vk_proof.domainBits, t.toxic.t)
                , n = new Array(e.nVars).fill(c.zero)
                , o = new Array(e.nVars).fill(c.zero)
                , s = new Array(e.nVars).fill(c.zero);
              for (let r = 0; r < e.nVars; r++) {
                  for (let e in t.vk_proof.polsA[r])
                      n[r] = c.add(n[r], c.mul(i[e], t.vk_proof.polsA[r][e]));
                  for (let e in t.vk_proof.polsB[r])
                      o[r] = c.add(o[r], c.mul(i[e], t.vk_proof.polsB[r][e]));
                  for (let e in t.vk_proof.polsC[r])
                      s[r] = c.add(s[r], c.mul(i[e], t.vk_proof.polsC[r][e]))
              }
              return {
                  a_t: n,
                  b_t: o,
                  c_t: s,
                  z_t: r
              }
          }(t, e);
          t.vk_proof.A = new Array(e.nVars + 1),
          t.vk_proof.B = new Array(e.nVars + 1),
          t.vk_proof.C = new Array(e.nVars + 1),
          t.vk_proof.Ap = new Array(e.nVars + 1),
          t.vk_proof.Bp = new Array(e.nVars + 1),
          t.vk_proof.Cp = new Array(e.nVars + 1),
          t.vk_proof.Kp = new Array(e.nVars + 3),
          t.vk_verifier.IC = new Array(e.nPublic),
          t.toxic.ka = c.random(),
          t.toxic.kb = c.random(),
          t.toxic.kc = c.random(),
          t.toxic.ra = c.random(),
          t.toxic.rb = c.random(),
          t.toxic.rc = c.mul(t.toxic.ra, t.toxic.rb),
          t.toxic.kbeta = c.random(),
          t.toxic.kgamma = c.random();
          const i = c.mul(t.toxic.kbeta, t.toxic.kgamma);
          t.vk_verifier.vk_a = u.affine(u.mulScalar(u.g, t.toxic.ka)),
          t.vk_verifier.vk_b = a.affine(a.mulScalar(a.g, t.toxic.kb)),
          t.vk_verifier.vk_c = u.affine(u.mulScalar(u.g, t.toxic.kc)),
          t.vk_verifier.vk_gb_1 = a.affine(a.mulScalar(a.g, i)),
          t.vk_verifier.vk_gb_2 = u.affine(u.mulScalar(u.g, i)),
          t.vk_verifier.vk_g = u.affine(u.mulScalar(u.g, t.toxic.kgamma));
          for (let i = 0; i < e.nVars; i++) {
              const e = c.mul(t.toxic.ra, r.a_t[i])
                , n = a.affine(a.mulScalar(a.g, e));
              t.vk_proof.A[i] = n,
              i <= t.vk_proof.nPublic && (t.vk_verifier.IC[i] = n);
              const o = c.mul(t.toxic.rb, r.b_t[i])
                , s = a.affine(a.mulScalar(a.g, o))
                , l = u.affine(u.mulScalar(u.g, o));
              t.vk_proof.B[i] = l;
              const h = c.mul(t.toxic.rc, r.c_t[i])
                , A = a.affine(a.mulScalar(a.g, h));
              t.vk_proof.C[i] = A;
              const f = c.affine(c.add(c.add(e, o), h))
                , p = a.affine(a.mulScalar(a.g, f));
              i > t.vk_proof.nPublic && (t.vk_proof.Ap[i] = a.affine(a.mulScalar(n, t.toxic.ka))),
              t.vk_proof.Bp[i] = a.affine(a.mulScalar(s, t.toxic.kb)),
              t.vk_proof.Cp[i] = a.affine(a.mulScalar(A, t.toxic.kc)),
              t.vk_proof.Kp[i] = a.affine(a.mulScalar(p, t.toxic.kbeta))
          }
          const n = a.mulScalar(a.g, c.mul(t.toxic.ra, r.z_t));
          t.vk_proof.A[e.nVars] = a.affine(n),
          t.vk_proof.Ap[e.nVars] = a.affine(a.mulScalar(n, t.toxic.ka));
          const o = a.mulScalar(a.g, c.mul(t.toxic.rb, r.z_t))
            , s = u.mulScalar(u.g, c.mul(t.toxic.rb, r.z_t));
          t.vk_proof.B[e.nVars] = u.affine(s),
          t.vk_proof.Bp[e.nVars] = a.affine(a.mulScalar(o, t.toxic.kb));
          const h = a.mulScalar(a.g, c.mul(t.toxic.rc, r.z_t));
          t.vk_proof.C[e.nVars] = a.affine(h),
          t.vk_proof.Cp[e.nVars] = a.affine(a.mulScalar(h, t.toxic.kc)),
          t.vk_proof.Kp[e.nVars] = a.affine(a.mulScalar(n, t.toxic.kbeta)),
          t.vk_proof.Kp[e.nVars + 1] = a.affine(a.mulScalar(o, t.toxic.kbeta)),
          t.vk_proof.Kp[e.nVars + 2] = a.affine(a.mulScalar(h, t.toxic.kbeta)),
          t.vk_verifier.vk_z = u.affine(u.mulScalar(u.g, c.mul(t.toxic.rc, r.z_t)))
      }(e, t),
      function(t) {
          const e = t.vk_proof.domainSize + 1;
          t.vk_proof.hExps = new Array(e),
          t.vk_proof.hExps[0] = a.g;
          let r = t.toxic.t;
          for (let i = 1; i < e; i++)
              t.vk_proof.hExps[i] = a.affine(a.mulScalar(a.g, r)),
              r = c.mul(r, t.toxic.t)
      }(e),
      e
  }
}
)),
parcelRequire.register("lnsop", (function(t, e) {
  var r = parcelRequire("bjKYs")
    , i = parcelRequire("8wchO")
    , n = parcelRequire("fouZg")
    , o = parcelRequire("gdsOp")
    , s = parcelRequire("25twf");
  t.exports = class {
      _preparePairing() {
          this.loopCount = r("29793968203157093288"),
          this.loopCount.isNegative() ? (this.loopCount = this.loopCount.neg(),
          this.loopCountNeg = !0) : this.loopCountNeg = !1;
          let t = this.loopCount;
          for (this.loop_count_bits = []; !t.isZero(); )
              this.loop_count_bits.push(t.isOdd()),
              t = t.shr(1);
          this.two_inv = this.F1.inverse(r(2)),
          this.coef_b = r(3),
          this.twist = [r(9), r(1)],
          this.twist_coeff_b = this.F2.mulScalar(this.F2.inverse(this.twist), this.coef_b),
          this.frobenius_coeffs_c1_1 = r("21888242871839275222246405745257275088696311157297823662689037894645226208582"),
          this.twist_mul_by_q_X = [r("21575463638280843010398324269430826099269044274347216827212613867836435027261"), r("10307601595873709700152284273816112264069230130616436755625194854815875713954")],
          this.twist_mul_by_q_Y = [r("2821565182194536844548159561693502659359617185244120367078079554186484126554"), r("3505843767911556378687030309984248845540243509899259641013678093033130930403")],
          this.final_exponent = r("552484233613224096312617126783173147097382103762957654188882734314196910839907541213974502761540629817009608548654680343627701153829446747810907373256841551006201639677726139946029199968412598804882391702273019083653272047566316584365559776493027495458238373902875937659943504873220554161550525926302303331747463515644711876653177129578303191095900909191624817826566688241804408081892785725967931714097716709526092261278071952560171111444072049229123565057483750161460024353346284167282452756217662335528813519139808291170539072125381230815729071544861602750936964829313608137325426383735122175229541155376346436093930287402089517426973178917569713384748081827255472576937471496195752727188261435633271238710131736096299798168852925540549342330775279877006784354801422249722573783561685179618816480037695005515426162362431072245638324744480")
      }
      pairing(t, e) {
          const r = this.precomputeG1(t)
            , i = this.precomputeG2(e)
            , n = this.millerLoop(r, i);
          return this.finalExponentiation(n)
      }
      precomputeG1(t) {
          const e = this.G1.affine(t)
            , r = {};
          return r.PX = e[0],
          r.PY = e[1],
          r
      }
      precomputeG2(t) {
          const e = this.G2.affine(t)
            , r = {
              QX: e[0],
              QY: e[1],
              coeffs: []
          }
            , i = {
              X: e[0],
              Y: e[1],
              Z: this.F2.one
          };
          let n;
          for (let t = this.loop_count_bits.length - 2; t >= 0; --t) {
              const o = this.loop_count_bits[t];
              n = this._doubleStep(i),
              r.coeffs.push(n),
              o && (n = this._addStep(e, i),
              r.coeffs.push(n))
          }
          const o = this.G2.affine(this._g2MulByQ(e));
          if (!this.F2.equals(o[2], this.F2.one))
              throw new Error("Expected values are not equal");
          const s = this.G2.affine(this._g2MulByQ(o));
          if (!this.F2.equals(s[2], this.F2.one))
              throw new Error("Expected values are not equal");
          return this.loopCountNeg && (i.Y = this.F2.neg(i.Y)),
          s[1] = this.F2.neg(s[1]),
          n = this._addStep(o, i),
          r.coeffs.push(n),
          n = this._addStep(s, i),
          r.coeffs.push(n),
          r
      }
      millerLoop(t, e) {
          let r, i = this.F12.one, n = 0;
          for (let o = this.loop_count_bits.length - 2; o >= 0; --o) {
              const s = this.loop_count_bits[o];
              r = e.coeffs[n++],
              i = this.F12.square(i),
              i = this._mul_by_024(i, r.ell_0, this.F2.mulScalar(r.ell_VW, t.PY), this.F2.mulScalar(r.ell_VV, t.PX)),
              s && (r = e.coeffs[n++],
              i = this._mul_by_024(i, r.ell_0, this.F2.mulScalar(r.ell_VW, t.PY), this.F2.mulScalar(r.ell_VV, t.PX)))
          }
          return this.loopCountNeg && (i = this.F12.inverse(i)),
          r = e.coeffs[n++],
          i = this._mul_by_024(i, r.ell_0, this.F2.mulScalar(r.ell_VW, t.PY), this.F2.mulScalar(r.ell_VV, t.PX)),
          r = e.coeffs[n++],
          i = this._mul_by_024(i, r.ell_0, this.F2.mulScalar(r.ell_VW, t.PY), this.F2.mulScalar(r.ell_VV, t.PX)),
          i
      }
      finalExponentiation(t) {
          return this.F12.exp(t, this.final_exponent)
      }
      _doubleStep(t) {
          const e = t.X
            , r = t.Y
            , i = t.Z
            , n = this.F2.mulScalar(this.F2.mul(e, r), this.two_inv)
            , o = this.F2.square(r)
            , s = this.F2.square(i)
            , a = this.F2.add(s, this.F2.add(s, s))
            , u = this.F2.mul(this.twist_coeff_b, a)
            , l = this.F2.add(u, this.F2.add(u, u))
            , c = this.F2.mulScalar(this.F2.add(o, l), this.two_inv)
            , h = this.F2.sub(this.F2.square(this.F2.add(r, i)), this.F2.add(o, s))
            , A = this.F2.sub(u, o)
            , f = this.F2.square(e)
            , p = this.F2.square(u);
          t.X = this.F2.mul(n, this.F2.sub(o, l)),
          t.Y = this.F2.sub(this.F2.sub(this.F2.square(c), p), this.F2.add(p, p)),
          t.Z = this.F2.mul(o, h);
          return {
              ell_0: this.F2.mul(A, this.twist),
              ell_VW: this.F2.neg(h),
              ell_VV: this.F2.add(f, this.F2.add(f, f))
          }
      }
      _addStep(t, e) {
          const r = e.X
            , i = e.Y
            , n = e.Z
            , o = t[0]
            , s = t[1]
            , a = this.F2.sub(r, this.F2.mul(o, n))
            , u = this.F2.sub(i, this.F2.mul(s, n))
            , l = this.F2.square(a)
            , c = this.F2.square(u)
            , h = this.F2.mul(a, l)
            , A = this.F2.mul(r, l)
            , f = this.F2.sub(this.F2.add(h, this.F2.mul(n, c)), this.F2.add(A, A));
          e.X = this.F2.mul(a, f),
          e.Y = this.F2.sub(this.F2.mul(u, this.F2.sub(A, f)), this.F2.mul(h, i)),
          e.Z = this.F2.mul(n, h);
          return {
              ell_0: this.F2.mul(this.twist, this.F2.sub(this.F2.mul(u, o), this.F2.mul(a, s))),
              ell_VV: this.F2.neg(u),
              ell_VW: a
          }
      }
      _mul_by_024(t, e, r, i) {
          let n = t[0][0]
            , o = t[0][1]
            , s = t[0][2]
            , a = t[1][0]
            , u = t[1][1]
            , l = t[1][2];
          const c = e
            , h = i
            , A = r
            , f = this.F2.mul(n, c)
            , p = this.F2.mul(s, h)
            , g = this.F2.mul(u, A)
            , d = this.F2.add(n, u);
          let I = this.F2.add(n, s);
          const m = this.F2.add(this.F2.add(o, a), l);
          let y = this.F2.mul(o, h)
            , w = this.F2.add(y, g)
            , C = this.F2.add(this.F2.mul(this.nonResidueF6, w), f);
          n = C,
          w = this.F2.mul(l, A),
          y = this.F2.add(y, w),
          w = this.F2.add(w, p),
          C = this.F2.mul(this.nonResidueF6, w),
          w = this.F2.mul(o, c),
          y = this.F2.add(y, w),
          C = this.F2.add(C, w),
          o = C;
          let E = this.F2.add(c, h);
          return w = this.F2.sub(this.F2.mul(I, E), this.F2.add(f, p)),
          C = this.F2.mul(a, A),
          y = this.F2.add(y, C),
          E = this.F2.add(s, u),
          s = this.F2.add(w, C),
          I = this.F2.add(h, A),
          w = this.F2.sub(this.F2.mul(E, I), this.F2.add(p, g)),
          C = this.F2.mul(this.nonResidueF6, w),
          w = this.F2.mul(a, c),
          y = this.F2.add(y, w),
          C = this.F2.add(C, w),
          a = C,
          w = this.F2.mul(l, h),
          y = this.F2.add(y, w),
          C = this.F2.mul(this.nonResidueF6, w),
          E = this.F2.add(c, A),
          w = this.F2.sub(this.F2.mul(d, E), this.F2.add(f, g)),
          C = this.F2.add(C, w),
          u = C,
          E = this.F2.add(this.F2.add(c, h), A),
          w = this.F2.sub(this.F2.mul(m, E), y),
          l = w,
          [[n, o, s], [a, u, l]]
      }
      _g2MulByQ(t) {
          const e = [t[0][0], this.F1.mul(t[0][1], this.frobenius_coeffs_c1_1)]
            , r = [t[1][0], this.F1.mul(t[1][1], this.frobenius_coeffs_c1_1)]
            , i = [t[2][0], this.F1.mul(t[2][1], this.frobenius_coeffs_c1_1)];
          return [this.F2.mul(this.twist_mul_by_q_X, e), this.F2.mul(this.twist_mul_by_q_Y, r), i]
      }
      constructor() {
          this.q = r("21888242871839275222246405745257275088696311157297823662689037894645226208583"),
          this.r = r("21888242871839275222246405745257275088548364400416034343698204186575808495617"),
          this.g1 = [r(1), r(2), r(1)],
          this.g2 = [[r("10857046999023057135944570762232829481370756359578518086990519993285655852781"), r("11559732032986387107991004021392285783925812861821192530917403151452391805634")], [r("8495653923123431417604973247489272438418190587263600148770280649306958101930"), r("4082367875863433681332203403145435568316851327593401208105741076214120093531")], [r("1"), r("0")]],
          this.nonResidueF2 = r("21888242871839275222246405745257275088696311157297823662689037894645226208582"),
          this.nonResidueF6 = [r("9"), r("1")],
          this.F1 = new i(this.q),
          this.F2 = new n(this.F1,this.nonResidueF2),
          this.G1 = new s(this.F1,this.g1),
          this.G2 = new s(this.F2,this.g2),
          this.F6 = new o(this.F2,this.nonResidueF6),
          this.F12 = new n(this.F6,this.nonResidueF6),
          this.Fr = new i(this.r);
          const t = this;
          this.F12._mulByNonResidue = function(e) {
              return [t.F2.mul(this.nonResidue, e[2]), e[0], e[1]]
          }
          ,
          this._preparePairing()
      }
  }
}
)),
parcelRequire.register("8wchO", (function(t, e) {
  var r = parcelRequire("bjKYs")
    , i = parcelRequire("gaGF5");
  function n() {
      if ("undefined" != typeof window) {
          if (void 0 !== window.crypto) {
              let t = new Uint8Array(1);
              return window.crypto.getRandomValues(t),
              t[0]
          }
          return Math.floor(256 * Math.random())
      }
      return parcelRequire("6AcGf").randomBytes(1)[0]
  }
  t.exports = class {
      copy(t) {
          return r(t)
      }
      div(t, e) {
          return this.mul(t, this.inverse(e))
      }
      mulScalar(t, e) {
          return this.mul(t, r(e))
      }
      exp(t, e) {
          return i.exp(this, t, e)
      }
      toString(t) {
          return `"0x${this.affine(t).toString(16)}"`
      }
      random() {
          let t = r(0)
            , e = r(this.q);
          for (; !e.isZero(); )
              t = t.shl(8).add(r(n())),
              e = e.shr(8);
          return t
      }
      sqrt(t) {
          if ((t = this.affine(t)).equals(this.zero))
              return this.zero;
          if (!this.exp(t, this.minusone.shr(this.one)).equals(this.one))
              return null;
          let e = parseInt(this.s)
            , r = this.nqr_to_t
            , i = this.exp(t, this.t)
            , n = this.exp(t, this.add(this.t, this.one).shr(this.one));
          for (; !i.equals(this.one); ) {
              let t = this.square(i)
                , o = 1;
              for (; !t.equals(this.one); )
                  o++,
                  t = this.square(t);
              let s = r;
              for (let t = 0; t < e - o - 1; t++)
                  s = this.square(s);
              e = o,
              r = this.square(s),
              i = this.mul(i, r),
              n = this.mul(n, s)
          }
          return n.greater(this.q.shr(this.one)) && (n = this.neg(n)),
          n
      }
      constructor(t) {
          this.q = r(t),
          this.zero = r.zero,
          this.one = r.one,
          this.minusone = this.q.sub(this.one),
          this.add = r.genAdd(),
          this.double = r.genDouble(),
          this.sub = r.genSub(),
          this.neg = r.genNeg(),
          this.mul = r.genMul(t),
          this.inverse = r.genInverse(t),
          this.square = r.genSquare(t),
          this.equals = r.genEquals(t),
          this.affine = r.genAffine(t),
          this.isZero = r.genIsZero(t),
          this.two = this.add(this.one, this.one),
          this.twoinv = this.inverse(this.two);
          const e = this.minusone.shr(this.one);
          this.nqr = this.two;
          let i = this.exp(this.nqr, e);
          for (; !i.equals(this.minusone); )
              this.nqr = this.nqr.add(this.one),
              i = this.exp(this.nqr, e);
          for (this.s = this.zero,
          this.t = this.minusone; !this.t.isOdd(); )
              this.s = this.s.add(this.one),
              this.t = this.t.shr(this.one);
          this.nqr_to_t = this.exp(this.nqr, this.t)
      }
  }
}
)),
parcelRequire.register("gaGF5", (function(t, e) {
  var r, i;
  $parcel$export(t.exports, "mulScalar", (function() {
      return r
  }
  ), (function(t) {
      return r = t
  }
  )),
  $parcel$export(t.exports, "exp", (function() {
      return i
  }
  ), (function(t) {
      return i = t
  }
  ));
  var n = parcelRequire("bjKYs");
  r = (t,e,r)=>{
      let i = t.zero
        , o = n(r)
        , s = e;
      for (; !o.isZero(); )
          o.isOdd() && (i = t.add(i, s)),
          s = t.double(s),
          o = o.shr(1);
      return i
  }
  ,
  i = (t,e,r)=>{
      let i = t.one
        , o = n(r)
        , s = e;
      for (; !o.isZero(); )
          o.isOdd() && (i = t.mul(i, s)),
          s = t.square(s),
          o = o.shr(1);
      return i
  }
}
)),
parcelRequire.register("fouZg", (function(t, e) {
  var r = parcelRequire("gaGF5");
  t.exports = class {
      _mulByNonResidue(t) {
          return this.F.mul(this.nonResidue, t)
      }
      copy(t) {
          return [this.F.copy(t[0]), this.F.copy(t[1])]
      }
      add(t, e) {
          return [this.F.add(t[0], e[0]), this.F.add(t[1], e[1])]
      }
      double(t) {
          return this.add(t, t)
      }
      sub(t, e) {
          return [this.F.sub(t[0], e[0]), this.F.sub(t[1], e[1])]
      }
      neg(t) {
          return this.sub(this.zero, t)
      }
      mul(t, e) {
          const r = this.F.mul(t[0], e[0])
            , i = this.F.mul(t[1], e[1]);
          return [this.F.add(r, this._mulByNonResidue(i)), this.F.sub(this.F.mul(this.F.add(t[0], t[1]), this.F.add(e[0], e[1])), this.F.add(r, i))]
      }
      inverse(t) {
          const e = this.F.square(t[0])
            , r = this.F.square(t[1])
            , i = this.F.sub(e, this._mulByNonResidue(r))
            , n = this.F.inverse(i);
          return [this.F.mul(t[0], n), this.F.neg(this.F.mul(t[1], n))]
      }
      div(t, e) {
          return this.mul(t, this.inverse(e))
      }
      square(t) {
          const e = this.F.mul(t[0], t[1]);
          return [this.F.sub(this.F.mul(this.F.add(t[0], t[1]), this.F.add(t[0], this._mulByNonResidue(t[1]))), this.F.add(e, this._mulByNonResidue(e))), this.F.add(e, e)]
      }
      isZero(t) {
          return this.F.isZero(t[0]) && this.F.isZero(t[1])
      }
      equals(t, e) {
          return this.F.equals(t[0], e[0]) && this.F.equals(t[1], e[1])
      }
      affine(t) {
          return [this.F.affine(t[0]), this.F.affine(t[1])]
      }
      mulScalar(t, e) {
          return r.mulScalar(this, t, e)
      }
      exp(t, e) {
          return r.exp(this, t, e)
      }
      toString(t) {
          const e = this.affine(t);
          return `[ ${this.F.toString(e[0])} , ${this.F.toString(e[1])} ]`
      }
      constructor(t, e) {
          this.F = t,
          this.zero = [this.F.zero, this.F.zero],
          this.one = [this.F.one, this.F.zero],
          this.nonResidue = e
      }
  }
}
)),
parcelRequire.register("gdsOp", (function(t, e) {
  var r = parcelRequire("gaGF5");
  t.exports = class {
      _mulByNonResidue(t) {
          return this.F.mul(this.nonResidue, t)
      }
      copy(t) {
          return [this.F.copy(t[0]), this.F.copy(t[1]), this.F.copy(t[2])]
      }
      add(t, e) {
          return [this.F.add(t[0], e[0]), this.F.add(t[1], e[1]), this.F.add(t[2], e[2])]
      }
      double(t) {
          return this.add(t, t)
      }
      sub(t, e) {
          return [this.F.sub(t[0], e[0]), this.F.sub(t[1], e[1]), this.F.sub(t[2], e[2])]
      }
      neg(t) {
          return this.sub(this.zero, t)
      }
      mul(t, e) {
          const r = this.F.mul(t[0], e[0])
            , i = this.F.mul(t[1], e[1])
            , n = this.F.mul(t[2], e[2]);
          return [this.F.add(r, this._mulByNonResidue(this.F.sub(this.F.mul(this.F.add(t[1], t[2]), this.F.add(e[1], e[2])), this.F.add(i, n)))), this.F.add(this.F.sub(this.F.mul(this.F.add(t[0], t[1]), this.F.add(e[0], e[1])), this.F.add(r, i)), this._mulByNonResidue(n)), this.F.add(this.F.sub(this.F.mul(this.F.add(t[0], t[2]), this.F.add(e[0], e[2])), this.F.add(r, n)), i)]
      }
      inverse(t) {
          const e = this.F.square(t[0])
            , r = this.F.square(t[1])
            , i = this.F.square(t[2])
            , n = this.F.mul(t[0], t[1])
            , o = this.F.mul(t[0], t[2])
            , s = this.F.mul(t[1], t[2])
            , a = this.F.sub(e, this._mulByNonResidue(s))
            , u = this.F.sub(this._mulByNonResidue(i), n)
            , l = this.F.sub(r, o)
            , c = this.F.inverse(this.F.add(this.F.mul(t[0], a), this._mulByNonResidue(this.F.add(this.F.mul(t[2], u), this.F.mul(t[1], l)))));
          return [this.F.mul(c, a), this.F.mul(c, u), this.F.mul(c, l)]
      }
      div(t, e) {
          return this.mul(t, this.inverse(e))
      }
      square(t) {
          const e = this.F.square(t[0])
            , r = this.F.mul(t[0], t[1])
            , i = this.F.add(r, r)
            , n = this.F.square(this.F.add(this.F.sub(t[0], t[1]), t[2]))
            , o = this.F.mul(t[1], t[2])
            , s = this.F.add(o, o)
            , a = this.F.square(t[2]);
          return [this.F.add(e, this._mulByNonResidue(s)), this.F.add(i, this._mulByNonResidue(a)), this.F.sub(this.F.add(this.F.add(i, n), s), this.F.add(e, a))]
      }
      isZero(t) {
          return this.F.isZero(t[0]) && this.F.isZero(t[1]) && this.F.isZero(t[2])
      }
      equals(t, e) {
          return this.F.equals(t[0], e[0]) && this.F.equals(t[1], e[1]) && this.F.equals(t[2], e[2])
      }
      affine(t) {
          return [this.F.affine(t[0]), this.F.affine(t[1]), this.F.affine(t[2])]
      }
      mulScalar(t, e) {
          return r.mulScalar(this, t, e)
      }
      exp(t, e) {
          return r.exp(this, t, e)
      }
      toString(t) {
          const e = this.affine(t);
          return `[ ${this.F.toString(e[0])} , ${this.F.toString(e[1])}, ${this.F.toString(e[2])} ]`
      }
      constructor(t, e) {
          this.F = t,
          this.zero = [this.F.zero, this.F.zero, this.F.zero],
          this.one = [this.F.one, this.F.zero, this.F.zero],
          this.nonResidue = e
      }
  }
}
)),
parcelRequire.register("25twf", (function(t, e) {
  var r = parcelRequire("gaGF5");
  t.exports = class {
      isZero(t) {
          return this.F.isZero(t[2])
      }
      add(t, e) {
          const r = this.F;
          if (this.isZero(t))
              return e;
          if (this.isZero(e))
              return t;
          const i = new Array(3)
            , n = r.square(t[2])
            , o = r.square(e[2])
            , s = r.mul(t[0], o)
            , a = r.mul(e[0], n)
            , u = r.mul(t[2], n)
            , l = r.mul(e[2], o)
            , c = r.mul(t[1], l)
            , h = r.mul(e[1], u);
          if (r.equals(s, a) && r.equals(c, h))
              return this.double(t);
          const A = r.sub(a, s)
            , f = r.sub(h, c)
            , p = r.square(r.add(A, A))
            , g = r.mul(A, p)
            , d = r.add(f, f)
            , I = r.mul(s, p);
          i[0] = r.sub(r.sub(r.square(d), g), r.add(I, I));
          const m = r.mul(c, g);
          return i[1] = r.sub(r.mul(d, r.sub(I, i[0])), r.add(m, m)),
          i[2] = r.mul(A, r.sub(r.square(r.add(t[2], e[2])), r.add(n, o))),
          i
      }
      neg(t) {
          return [t[0], this.F.neg(t[1]), t[2]]
      }
      sub(t, e) {
          return this.add(t, this.neg(e))
      }
      double(t) {
          const e = this.F
            , r = new Array(3);
          if (this.isZero(t))
              return t;
          const i = e.square(t[0])
            , n = e.square(t[1])
            , o = e.square(n);
          let s = e.sub(e.square(e.add(t[0], n)), e.add(i, o));
          s = e.add(s, s);
          const a = e.add(e.add(i, i), i)
            , u = e.square(a);
          r[0] = e.sub(u, e.add(s, s));
          let l = e.add(o, o);
          l = e.add(l, l),
          l = e.add(l, l),
          r[1] = e.sub(e.mul(a, e.sub(s, r[0])), l);
          const c = e.mul(t[1], t[2]);
          return r[2] = e.add(c, c),
          r
      }
      mulScalar(t, e) {
          return r.mulScalar(this, t, e)
      }
      affine(t) {
          const e = this.F;
          if (this.isZero(t))
              return this.zero;
          {
              const r = e.inverse(t[2])
                , i = e.square(r)
                , n = e.mul(i, r)
                , o = new Array(3);
              return o[0] = e.affine(e.mul(t[0], i)),
              o[1] = e.affine(e.mul(t[1], n)),
              o[2] = e.one,
              o
          }
      }
      equals(t, e) {
          const r = this.F;
          if (this.isZero(t))
              return this.isZero(e);
          if (this.isZero(e))
              return this.isZero(t);
          const i = r.square(t[2])
            , n = r.square(e[2])
            , o = r.mul(t[0], n)
            , s = r.mul(e[0], i)
            , a = r.mul(t[2], i)
            , u = r.mul(e[2], n)
            , l = r.mul(t[1], u)
            , c = r.mul(e[1], a);
          return r.equals(o, s) && r.equals(l, c)
      }
      toString(t) {
          const e = this.affine(t);
          return `[ ${this.F.toString(e[0])} , ${this.F.toString(e[1])} ]`
      }
      constructor(t, e) {
          this.F = t,
          this.g = [t.copy(e[0]), t.copy(e[1])],
          2 == this.g.length && (this.g[2] = this.F.one),
          this.zero = [this.F.zero, this.F.one, this.F.zero]
      }
  }
}
)),
parcelRequire.register("3Xe51", (function(t, e) {
  var r = parcelRequire("bjKYs");
  function i(t) {
      return (0 != (4294901760 & t) ? (t &= 4294901760,
      16) : 0) | (0 != (4278255360 & t) ? (t &= 4278255360,
      8) : 0) | (0 != (4042322160 & t) ? (t &= 4042322160,
      4) : 0) | (0 != (3435973836 & t) ? (t &= 3435973836,
      2) : 0) | 0 != (2863311530 & t)
  }
  function n(t, e, r, i, o) {
      const s = 1 << r;
      if (1 == s)
          return [e[i]];
      if (2 == s)
          return [t.F.add(e[i], e[i + o]), t.F.sub(e[i], e[i + o])];
      const a = s >> 1
        , u = n(t, e, r - 1, i, 2 * o)
        , l = n(t, e, r - 1, i + o, 2 * o)
        , c = new Array(s);
      for (let e = 0; e < a; e++)
          c[e] = t.F.add(u[e], t.F.mul(t.roots[r][e], l[e])),
          c[e + a] = t.F.sub(u[e], t.F.mul(t.roots[r][e], l[e]));
      return c
  }
  t.exports = class {
      _setRoots(t) {
          for (let e = t; e >= 0 && !this.roots[e]; e--) {
              let t = this.F.one;
              const r = 1 << e
                , i = new Array(r);
              for (let n = 0; n < r; n++)
                  i[n] = t,
                  t = this.F.mul(t, this.w[e]);
              this.roots[e] = i
          }
      }
      add(t, e) {
          const r = Math.max(t.length, e.length)
            , i = new Array(r);
          for (let n = 0; n < r; n++)
              i[n] = this.F.add(t[n] || this.F.zero, e[n] || this.F.zero);
          return this.reduce(i)
      }
      double(t) {
          return this.add(t, t)
      }
      sub(t, e) {
          const r = Math.max(t.length, e.length)
            , i = new Array(r);
          for (let n = 0; n < r; n++)
              i[n] = this.F.sub(t[n] || this.F.zero, e[n] || this.F.zero);
          return this.reduce(i)
      }
      mulScalar(t, e) {
          if (this.F.isZero(e))
              return [];
          if (this.F.equals(e, this.F.one))
              return t;
          const r = new Array(t.length);
          for (let i = 0; i < t.length; i++)
              r[i] = this.F.mul(t[i], e);
          return r
      }
      mul(t, e) {
          return 0 == t.length || 0 == e.length ? [] : 1 == t.length ? this.mulScalar(e, t[0]) : 1 == e.length ? this.mulScalar(t, e[0]) : (e.length > t.length && ([e,t] = [t, e]),
          e.length <= 2 || e.length < i(t.length) ? this.mulNormal(t, e) : this.mulFFT(t, e))
      }
      mulNormal(t, e) {
          let r = [];
          e = this.affine(e);
          for (let i = 0; i < e.length; i++)
              r = this.add(r, this.scaleX(this.mulScalar(t, e[i]), i));
          return r
      }
      mulFFT(t, e) {
          const r = i(Math.max(t.length, e.length) - 1) + 2;
          this._setRoots(r);
          const o = 1 << r
            , s = this.extend(t, o)
            , a = this.extend(e, o)
            , u = n(this, s, r, 0, 1)
            , l = n(this, a, r, 0, 1)
            , c = new Array(o);
          for (let t = 0; t < o; t++)
              c[t] = this.F.mul(u[t], l[t]);
          const h = n(this, c, r, 0, 1)
            , A = this.F.inverse(this.F.mulScalar(this.F.one, o))
            , f = new Array(o);
          for (let t = 0; t < o; t++)
              f[t] = this.F.mul(h[(o - t) % o], A);
          return this.reduce(this.affine(f))
      }
      square(t) {
          return this.mul(t, t)
      }
      scaleX(t, e) {
          if (0 == e)
              return t;
          if (e > 0) {
              return new Array(e).fill(this.F.zero).concat(t)
          }
          return -e >= t.length ? [] : t.slice(-e)
      }
      eval2(t, e) {
          let r = this.F.zero
            , i = this.F.one;
          for (let n = 0; n < t.length; n++)
              r = this.F.add(r, this.F.mul(t[n], i)),
              i = this.F.mul(i, e);
          return r
      }
      eval(t, e) {
          const r = this.F;
          if (0 == t.length)
              return r.zero;
          const i = this._next2Power(t.length);
          return function t(e, i, n, o, s) {
              if (1 == s)
                  return e[n];
              const a = r.square(i)
                , u = r.add(t(e, a, n, o << 1, s >> 1), r.mul(i, t(e, a, n + o, o << 1, s >> 1)));
              return u
          }(this.extend(t, i), e, 0, 1, i)
      }
      lagrange(t) {
          let e = [this.F.one];
          for (let r = 0; r < t.length; r++)
              e = this.mul(e, [this.F.neg(t[r][0]), this.F.one]);
          let r = [];
          for (let i = 0; i < t.length; i++) {
              let n = this.ruffini(e, t[i][0]);
              const o = this.F.mul(this.F.inverse(this.eval(n, t[i][0])), t[i][1]);
              n = this.mulScalar(n, o),
              r = this.add(r, n)
          }
          return r
      }
      fft(t) {
          if (t.length <= 1)
              return t;
          const e = i(t.length - 1) + 1;
          this._setRoots(e);
          const r = 1 << e;
          return n(this, this.extend(t, r), e, 0, 1)
      }
      ifft(t) {
          if (t.length <= 1)
              return t;
          const e = i(t.length - 1) + 1;
          this._setRoots(e);
          const r = 1 << e
            , o = n(this, this.extend(t, r), e, 0, 1)
            , s = this.F.inverse(this.F.mulScalar(this.F.one, r))
            , a = new Array(r);
          for (let t = 0; t < r; t++)
              a[t] = this.F.mul(o[(r - t) % r], s);
          return a
      }
      _fft(t, e, r, i) {
          const n = 1 << e;
          if (1 == n)
              return [t[r]];
          const o = n >> 1
            , s = this._fft(t, e - 1, r, 2 * i)
            , a = this._fft(t, e - 1, r + i, 2 * i)
            , u = new Array(n);
          let l = this.F.one;
          for (let t = 0; t < o; t++)
              u[t] = this.F.add(s[t], this.F.mul(l, a[t])),
              u[t + o] = this.F.sub(s[t], this.F.mul(l, a[t])),
              l = this.F.mul(l, this.w[e]);
          return u
      }
      extend(t, e) {
          if (e == t.length)
              return t;
          const r = new Array(e - t.length).fill(this.F.zero);
          return t.concat(r)
      }
      reduce(t) {
          if (0 == t.length)
              return t;
          if (!this.F.isZero(t[t.length - 1]))
              return t;
          let e = t.length - 1;
          for (; e > 0 && this.F.isZero(t[e]); )
              e--;
          return t.slice(0, e + 1)
      }
      affine(t) {
          for (let e = 0; e < t.length; e++)
              t[e] = this.F.affine(t[e]);
          return t
      }
      equals(t, e) {
          const r = this.reduce(this.affine(t))
            , i = this.reduce(this.affine(e));
          if (r.length != i.length)
              return !1;
          for (let t = 0; t < i.length; t++)
              if (!this.F.equals(r[t], i[t]))
                  return !1;
          return !0
      }
      ruffini(t, e) {
          const r = new Array(t.length - 1);
          r[r.length - 1] = t[t.length - 1];
          for (let i = r.length - 2; i >= 0; i--)
              r[i] = this.F.add(this.F.mul(r[i + 1], e), t[i + 1]);
          return r
      }
      _next2Power(t) {
          return t--,
          t |= t >> 1,
          t |= t >> 2,
          t |= t >> 4,
          t |= t >> 8,
          t |= t >> 16,
          ++t
      }
      toString(t) {
          let e = "";
          for (let r = this.affine(t).length - 1; r >= 0; r--)
              this.F.isZero(t[r]) || ("" != e && (e += " + "),
              e += t[r].toString(10),
              r > 0 && (e += "x",
              r > 1 && (e = e + "^" + r)));
          return e
      }
      _reciprocal(t, e) {
          const r = 1 << e;
          if (1 == r)
              return [this.F.inverse(t[0])];
          const i = this.scaleX(t, -r / 2)
            , n = this._reciprocal(i, e - 1)
            , o = this.scaleX(this.double(n), 3 * r / 2 - 2)
            , s = this.mul(this.square(n), t);
          return this.scaleX(this.sub(o, s), -(r - 2))
      }
      _div2(t, e) {
          const r = i(e.length - 1) + 1
            , n = 1 << r
            , o = n - e.length
            , s = this._reciprocal(this.scaleX(e, o), r);
          return this.scaleX(s, t - 2 * n + 2 + o)
      }
      div(t, e) {
          if (t.length < e.length)
              return [];
          const r = i(e.length - 1) + 1
            , n = 1 << r
            , o = this.scaleX(t, n - e.length)
            , s = this.scaleX(e, n - e.length)
            , a = s.length - 1;
          let u = o.length - 1;
          const l = this._reciprocal(s, r);
          let c;
          u > 2 * a && (c = this.sub(this.scaleX([this.F.one], 2 * a), this.mul(l, s)));
          let h, A, f = [], p = o, g = !1;
          for (; !g; )
              h = this.mul(p, l),
              f = this.add(f, this.scaleX(h, -2 * a)),
              u > 2 * a ? (A = this.mul(p, c),
              p = this.scaleX(A, -2 * a),
              u = p.length - 1) : g = !0;
          return f
      }
      oneRoot(t, e) {
          let r = i(t - 1) + 1
            , n = this.F.one
            , o = e;
          if (e >= t)
              throw new Error("Given 'i' should be lower than 'n'");
          if (1 << r !== t)
              throw new Error(`Internal errlr: ${t} should equal ${1 << r}`);
          for (; o > 0; )
              !0 & o && (n = this.F.mul(n, this.w[r])),
              o >>= 1,
              r--;
          return n
      }
      computeVanishingPolinomial(t, e) {
          const i = 1 << t;
          return this.F.sub(this.F.exp(e, r(i)), this.F.one)
      }
      evaluateLagrangePolynomials(t, e) {
          const i = 1 << t
            , n = this.F.exp(e, r(i))
            , o = new Array(i).fill(this.F.zero);
          this._setRoots(t);
          const s = this.w[t];
          if (this.F.equals(n, this.F.one))
              for (let r = 0; r < i; r++)
                  if (this.F.equals(this.roots[t][0], e))
                      return o[r] = this.F.one,
                      o;
          const a = this.F.sub(n, this.F.one);
          let u = this.F.mul(a, this.F.inverse(r(i)));
          for (let r = 0; r < i; r++)
              o[r] = this.F.mul(u, this.F.inverse(this.F.sub(e, this.roots[t][r]))),
              u = this.F.mul(u, s);
          return o
      }
      log2(t) {
          return i(t)
      }
      constructor(t) {
          this.F = t;
          let e = this.F.q.sub(r(1))
            , i = 0;
          for (; !e.isOdd(); )
              i++,
              e = e.shr(1);
          const n = this.F.add(this.F.add(this.F.two, this.F.two), this.F.one);
          this.w = new Array(i + 1),
          this.wi = new Array(i + 1),
          this.w[i] = this.F.exp(n, e),
          this.wi[i] = this.F.inverse(this.w[i]);
          let o = i - 1;
          for (; o >= 0; )
              this.w[o] = this.F.square(this.w[o + 1]),
              this.wi[o] = this.F.square(this.wi[o + 1]),
              o--;
          this.roots = [],
          this._setRoots(15)
      }
  }
}
)),
parcelRequire.register("7DWBY", (function(t, e) {
  var r = parcelRequire("lnsop")
    , i = parcelRequire("3Xe51")
    , n = parcelRequire("8wchO");
  const o = new r
    , s = new i(new n(o.r))
    , a = o.G1
    , u = o.G2;
  t.exports = function(t, e) {
      const r = {}
        , i = s.F.random()
        , n = s.F.random()
        , o = s.F.random();
      r.pi_a = a.zero,
      r.pi_ap = a.zero,
      r.pi_b = u.zero,
      r.pi_bp = a.zero,
      r.pi_c = a.zero,
      r.pi_cp = a.zero,
      r.pi_kp = a.zero,
      r.pi_h = a.zero;
      for (let i = t.nPublic + 1; i < t.nVars; i++)
          r.pi_a = a.add(r.pi_a, a.mulScalar(t.A[i], e[i])),
          r.pi_ap = a.add(r.pi_ap, a.mulScalar(t.Ap[i], e[i]));
      for (let i = 0; i < t.nVars; i++)
          r.pi_b = u.add(r.pi_b, u.mulScalar(t.B[i], e[i])),
          r.pi_bp = a.add(r.pi_bp, a.mulScalar(t.Bp[i], e[i])),
          r.pi_c = a.add(r.pi_c, a.mulScalar(t.C[i], e[i])),
          r.pi_cp = a.add(r.pi_cp, a.mulScalar(t.Cp[i], e[i])),
          r.pi_kp = a.add(r.pi_kp, a.mulScalar(t.Kp[i], e[i]));
      r.pi_a = a.add(r.pi_a, a.mulScalar(t.A[t.nVars], i)),
      r.pi_ap = a.add(r.pi_ap, a.mulScalar(t.Ap[t.nVars], i)),
      r.pi_b = u.add(r.pi_b, u.mulScalar(t.B[t.nVars], n)),
      r.pi_bp = a.add(r.pi_bp, a.mulScalar(t.Bp[t.nVars], n)),
      r.pi_c = a.add(r.pi_c, a.mulScalar(t.C[t.nVars], o)),
      r.pi_cp = a.add(r.pi_cp, a.mulScalar(t.Cp[t.nVars], o)),
      r.pi_kp = a.add(r.pi_kp, a.mulScalar(t.Kp[t.nVars], i)),
      r.pi_kp = a.add(r.pi_kp, a.mulScalar(t.Kp[t.nVars + 1], n)),
      r.pi_kp = a.add(r.pi_kp, a.mulScalar(t.Kp[t.nVars + 2], o));
      const l = function(t, e, r, i, n) {
          const o = s.F
            , a = t.domainSize
            , u = new Array(a).fill(s.F.zero)
            , l = new Array(a).fill(s.F.zero)
            , c = new Array(a).fill(s.F.zero);
          for (let r = 0; r < t.nVars; r++) {
              for (let i in t.polsA[r])
                  u[i] = o.add(u[i], o.mul(e[r], t.polsA[r][i]));
              for (let i in t.polsB[r])
                  l[i] = o.add(l[i], o.mul(e[r], t.polsB[r][i]));
              for (let i in t.polsC[r])
                  c[i] = o.add(c[i], o.mul(e[r], t.polsC[r][i]))
          }
          const h = s.ifft(u)
            , A = s.ifft(l)
            , f = s.mul(h, A)
            , p = s.ifft(c)
            , g = s.sub(f, p)
            , d = new Array(a + 1).fill(o.zero);
          d[a] = o.one,
          d[0] = o.neg(o.one);
          let I = s.div(g, d);
          I = s.extend(I, a + 1);
          for (let t = 0; t < a; t++) {
              const e = s.F.mul(i, h[t])
                , n = s.F.mul(r, A[t]);
              I[t] = s.F.add(I[t], s.F.add(e, n))
          }
          I[0] = s.F.sub(I[0], n);
          const m = s.F.mul(r, i);
          return I[a] = s.F.add(I[a], m),
          I[0] = s.F.sub(I[0], m),
          I = s.reduce(s.affine(I)),
          I
      }(t, e, i, n, o);
      for (let e = 0; e < l.length; e++)
          r.pi_h = a.add(r.pi_h, a.mulScalar(t.hExps[e], l[e]));
      r.pi_a = a.affine(r.pi_a),
      r.pi_b = u.affine(r.pi_b),
      r.pi_c = a.affine(r.pi_c),
      r.pi_ap = a.affine(r.pi_ap),
      r.pi_bp = a.affine(r.pi_bp),
      r.pi_cp = a.affine(r.pi_cp),
      r.pi_kp = a.affine(r.pi_kp),
      r.pi_h = a.affine(r.pi_h),
      r.protocol = "original";
      return {
          proof: r,
          publicSignals: e.slice(1, t.nPublic + 1)
      }
  }
}
)),
parcelRequire.register("fSWCj", (function(t, e) {
  const r = new (parcelRequire("lnsop"))
    , i = r.G1
    , n = r.G2;
  t.exports = function(t, e, o) {
      let s = t.IC[0];
      for (let e = 0; e < t.nPublic; e++)
          s = i.add(s, i.mulScalar(t.IC[e + 1], o[e]));
      return s = i.add(s, e.pi_a),
      !!r.F12.equals(r.pairing(e.pi_a, t.vk_a), r.pairing(e.pi_ap, n.g)) && (!!r.F12.equals(r.pairing(t.vk_b, e.pi_b), r.pairing(e.pi_bp, n.g)) && (!!r.F12.equals(r.pairing(e.pi_c, t.vk_c), r.pairing(e.pi_cp, n.g)) && (!!r.F12.equals(r.F12.mul(r.pairing(i.add(s, e.pi_c), t.vk_gb_2), r.pairing(t.vk_gb_1, e.pi_b)), r.pairing(e.pi_kp, t.vk_g)) && !!r.F12.equals(r.pairing(s, e.pi_b), r.F12.mul(r.pairing(e.pi_h, t.vk_z), r.pairing(e.pi_c, n.g))))))
  }
}
)),
parcelRequire.register("kflUP", (function(t, e) {
  var r = parcelRequire("bjKYs")
    , i = parcelRequire("lnsop")
    , n = parcelRequire("3Xe51")
    , o = parcelRequire("8wchO");
  const s = new i
    , a = s.G1
    , u = s.G2
    , l = new n(new o(s.r))
    , c = new o(s.r);
  t.exports = function(t) {
      const e = {
          vk_proof: {
              protocol: "groth",
              nVars: t.nVars,
              nPublic: t.nPubInputs + t.nOutputs
          },
          vk_verifier: {
              protocol: "groth",
              nPublic: t.nPubInputs + t.nOutputs
          },
          toxic: {}
      };
      return e.vk_proof.domainBits = l.log2(t.nConstraints + t.nPubInputs + t.nOutputs + 1 - 1) + 1,
      e.vk_proof.domainSize = 1 << e.vk_proof.domainBits,
      function(t, e) {
          t.vk_proof.polsA = new Array(e.nVars),
          t.vk_proof.polsB = new Array(e.nVars),
          t.vk_proof.polsC = new Array(e.nVars);
          for (let r = 0; r < e.nVars; r++)
              t.vk_proof.polsA[r] = {},
              t.vk_proof.polsB[r] = {},
              t.vk_proof.polsC[r] = {};
          for (let i = 0; i < e.nConstraints; i++) {
              for (let n in e.constraints[i][0])
                  t.vk_proof.polsA[n][i] = r(e.constraints[i][0][n]);
              for (let n in e.constraints[i][1])
                  t.vk_proof.polsB[n][i] = r(e.constraints[i][1][n]);
              for (let n in e.constraints[i][2])
                  t.vk_proof.polsC[n][i] = r(e.constraints[i][2][n])
          }
          for (let r = 0; r < e.nPubInputs + e.nOutputs + 1; ++r)
              t.vk_proof.polsA[r][e.nConstraints + r] = c.one
      }(e, t),
      e.toxic.t = c.random(),
      function(t, e) {
          const r = function(t, e) {
              const r = l.computeVanishingPolinomial(t.vk_proof.domainBits, t.toxic.t)
                , i = l.evaluateLagrangePolynomials(t.vk_proof.domainBits, t.toxic.t)
                , n = new Array(e.nVars).fill(c.zero)
                , o = new Array(e.nVars).fill(c.zero)
                , s = new Array(e.nVars).fill(c.zero);
              for (let r = 0; r < e.nVars; r++) {
                  for (let e in t.vk_proof.polsA[r])
                      n[r] = c.add(n[r], c.mul(i[e], t.vk_proof.polsA[r][e]));
                  for (let e in t.vk_proof.polsB[r])
                      o[r] = c.add(o[r], c.mul(i[e], t.vk_proof.polsB[r][e]));
                  for (let e in t.vk_proof.polsC[r])
                      s[r] = c.add(s[r], c.mul(i[e], t.vk_proof.polsC[r][e]))
              }
              return {
                  a_t: n,
                  b_t: o,
                  c_t: s,
                  z_t: r
              }
          }(t, e);
          t.vk_proof.A = new Array(e.nVars),
          t.vk_proof.B1 = new Array(e.nVars),
          t.vk_proof.B2 = new Array(e.nVars),
          t.vk_proof.C = new Array(e.nVars),
          t.vk_verifier.IC = new Array(e.nPublic),
          t.toxic.kalfa = c.random(),
          t.toxic.kbeta = c.random(),
          t.toxic.kgamma = c.random(),
          t.toxic.kdelta = c.random();
          let i = c.inverse(t.toxic.kdelta)
            , n = c.inverse(t.toxic.kgamma);
          t.vk_proof.vk_alfa_1 = a.affine(a.mulScalar(a.g, t.toxic.kalfa)),
          t.vk_proof.vk_beta_1 = a.affine(a.mulScalar(a.g, t.toxic.kbeta)),
          t.vk_proof.vk_delta_1 = a.affine(a.mulScalar(a.g, t.toxic.kdelta)),
          t.vk_proof.vk_beta_2 = u.affine(u.mulScalar(u.g, t.toxic.kbeta)),
          t.vk_proof.vk_delta_2 = u.affine(u.mulScalar(u.g, t.toxic.kdelta)),
          t.vk_verifier.vk_alfa_1 = a.affine(a.mulScalar(a.g, t.toxic.kalfa)),
          t.vk_verifier.vk_beta_2 = u.affine(u.mulScalar(u.g, t.toxic.kbeta)),
          t.vk_verifier.vk_gamma_2 = u.affine(u.mulScalar(u.g, t.toxic.kgamma)),
          t.vk_verifier.vk_delta_2 = u.affine(u.mulScalar(u.g, t.toxic.kdelta)),
          t.vk_verifier.vk_alfabeta_12 = s.F12.affine(s.pairing(t.vk_verifier.vk_alfa_1, t.vk_verifier.vk_beta_2));
          for (let i = 0; i < e.nVars; i++) {
              const e = a.affine(a.mulScalar(a.g, r.a_t[i]));
              t.vk_proof.A[i] = e;
              const n = a.affine(a.mulScalar(a.g, r.b_t[i]));
              t.vk_proof.B1[i] = n;
              const o = u.affine(u.mulScalar(u.g, r.b_t[i]));
              t.vk_proof.B2[i] = o
          }
          for (let e = 0; e <= t.vk_proof.nPublic; e++) {
              let i = c.mul(n, c.add(c.add(c.mul(r.a_t[e], t.toxic.kbeta), c.mul(r.b_t[e], t.toxic.kalfa)), r.c_t[e]));
              const o = a.affine(a.mulScalar(a.g, i));
              t.vk_verifier.IC[e] = o
          }
          for (let n = t.vk_proof.nPublic + 1; n < e.nVars; n++) {
              let e = c.mul(i, c.add(c.add(c.mul(r.a_t[n], t.toxic.kbeta), c.mul(r.b_t[n], t.toxic.kalfa)), r.c_t[n]));
              const o = a.affine(a.mulScalar(a.g, e));
              t.vk_proof.C[n] = o
          }
          const o = t.vk_proof.domainSize + 1;
          t.vk_proof.hExps = new Array(o);
          const h = c.mul(i, r.z_t);
          t.vk_proof.hExps[0] = a.affine(a.mulScalar(a.g, h));
          let A = t.toxic.t;
          for (let e = 1; e < o; e++)
              t.vk_proof.hExps[e] = a.affine(a.mulScalar(a.g, c.mul(A, h))),
              A = c.mul(A, t.toxic.t)
      }(e, t),
      e
  }
}
)),
parcelRequire.register("j4lwa", (function(t, e) {
  var r = parcelRequire("lnsop")
    , i = parcelRequire("3Xe51")
    , n = parcelRequire("8wchO");
  const o = new r
    , s = new i(new n(o.r))
    , a = o.G1
    , u = o.G2;
  t.exports = function(t, e) {
      const r = {}
        , i = s.F.random()
        , n = s.F.random();
      r.pi_a = a.zero,
      r.pi_b = u.zero,
      r.pi_c = a.zero;
      let o = a.zero;
      for (let i = 0; i < t.nVars; i++)
          r.pi_a = a.add(r.pi_a, a.mulScalar(t.A[i], e[i])),
          r.pi_b = u.add(r.pi_b, u.mulScalar(t.B2[i], e[i])),
          o = a.add(o, a.mulScalar(t.B1[i], e[i]));
      for (let i = t.nPublic + 1; i < t.nVars; i++)
          r.pi_c = a.add(r.pi_c, a.mulScalar(t.C[i], e[i]));
      r.pi_a = a.add(r.pi_a, t.vk_alfa_1),
      r.pi_a = a.add(r.pi_a, a.mulScalar(t.vk_delta_1, i)),
      r.pi_b = u.add(r.pi_b, t.vk_beta_2),
      r.pi_b = u.add(r.pi_b, u.mulScalar(t.vk_delta_2, n)),
      o = a.add(o, t.vk_beta_1),
      o = a.add(o, a.mulScalar(t.vk_delta_1, n));
      const l = function(t, e) {
          const r = s.F
            , i = t.domainSize
            , n = new Array(i).fill(s.F.zero)
            , o = new Array(i).fill(s.F.zero)
            , a = new Array(i).fill(s.F.zero);
          for (let i = 0; i < t.nVars; i++) {
              for (let o in t.polsA[i])
                  n[o] = r.add(n[o], r.mul(e[i], t.polsA[i][o]));
              for (let n in t.polsB[i])
                  o[n] = r.add(o[n], r.mul(e[i], t.polsB[i][n]));
              for (let n in t.polsC[i])
                  a[n] = r.add(a[n], r.mul(e[i], t.polsC[i][n]))
          }
          const u = s.ifft(n)
            , l = s.ifft(o)
            , c = s.mul(u, l)
            , h = s.ifft(a)
            , A = s.sub(c, h);
          return A.slice(i)
      }(t, e);
      for (let e = 0; e < l.length; e++)
          r.pi_c = a.add(r.pi_c, a.mulScalar(t.hExps[e], l[e]));
      r.pi_c = a.add(r.pi_c, a.mulScalar(r.pi_a, n)),
      r.pi_c = a.add(r.pi_c, a.mulScalar(o, i)),
      r.pi_c = a.add(r.pi_c, a.mulScalar(t.vk_delta_1, s.F.affine(s.F.neg(s.F.mul(i, n)))));
      const c = e.slice(1, t.nPublic + 1);
      return r.pi_a = a.affine(r.pi_a),
      r.pi_b = u.affine(r.pi_b),
      r.pi_c = a.affine(r.pi_c),
      r.protocol = "groth",
      {
          proof: r,
          publicSignals: c
      }
  }
}
)),
parcelRequire.register("6GOM1", (function(t, e) {
  const r = new (parcelRequire("lnsop"))
    , i = r.G1;
  t.exports = function(t, e, n) {
      let o = t.IC[0];
      for (let e = 0; e < t.nPublic; e++)
          o = i.add(o, i.mulScalar(t.IC[e + 1], n[e]));
      return !!r.F12.equals(r.pairing(e.pi_a, e.pi_b), r.F12.mul(t.vk_alfabeta_12, r.F12.mul(r.pairing(o, t.vk_gamma_2), r.pairing(e.pi_c, t.vk_delta_2))))
  }
}
)),
parcelRequire.register("hAjeC", (function(t, e) {
  var r = parcelRequire("bjKYs")
    , i = parcelRequire("lnsop")
    , n = parcelRequire("3Xe51")
    , o = parcelRequire("8wchO");
  const s = new i
    , a = s.G1
    , u = s.G2
    , l = new n(new o(s.r))
    , c = new o(s.r);
  t.exports = function(t) {
      const e = {
          vk_proof: {
              protocol: "groth",
              nVars: t.nVars,
              nPublic: t.nPubInputs + t.nOutputs
          },
          vk_verifier: {
              protocol: "groth",
              nPublic: t.nPubInputs + t.nOutputs
          },
          toxic: {}
      };
      return e.vk_proof.domainBits = l.log2(t.nConstraints + t.nPubInputs + t.nOutputs + 1 - 1) + 1,
      e.vk_proof.domainSize = 1 << e.vk_proof.domainBits,
      function(t, e) {
          t.vk_proof.polsA = new Array(e.nVars),
          t.vk_proof.polsB = new Array(e.nVars),
          t.vk_proof.polsC = new Array(e.nVars);
          for (let r = 0; r < e.nVars; r++)
              t.vk_proof.polsA[r] = {},
              t.vk_proof.polsB[r] = {},
              t.vk_proof.polsC[r] = {};
          for (let i = 0; i < e.nConstraints; i++) {
              for (let n in e.constraints[i][0])
                  t.vk_proof.polsA[n][i] = r(e.constraints[i][0][n]);
              for (let n in e.constraints[i][1])
                  t.vk_proof.polsB[n][i] = r(e.constraints[i][1][n]);
              for (let n in e.constraints[i][2])
                  t.vk_proof.polsC[n][i] = r(e.constraints[i][2][n])
          }
          for (let r = 0; r < e.nPubInputs + e.nOutputs + 1; ++r)
              t.vk_proof.polsA[r][e.nConstraints + r] = c.one
      }(e, t),
      e.toxic.t = c.random(),
      function(t, e) {
          const r = function(t, e) {
              const r = l.computeVanishingPolinomial(t.vk_proof.domainBits, t.toxic.t)
                , i = l.evaluateLagrangePolynomials(t.vk_proof.domainBits, t.toxic.t)
                , n = new Array(e.nVars).fill(c.zero)
                , o = new Array(e.nVars).fill(c.zero)
                , s = new Array(e.nVars).fill(c.zero);
              for (let r = 0; r < e.nVars; r++) {
                  for (let e in t.vk_proof.polsA[r])
                      n[r] = c.add(n[r], c.mul(i[e], t.vk_proof.polsA[r][e]));
                  for (let e in t.vk_proof.polsB[r])
                      o[r] = c.add(o[r], c.mul(i[e], t.vk_proof.polsB[r][e]));
                  for (let e in t.vk_proof.polsC[r])
                      s[r] = c.add(s[r], c.mul(i[e], t.vk_proof.polsC[r][e]))
              }
              return {
                  a_t: n,
                  b_t: o,
                  c_t: s,
                  z_t: r
              }
          }(t, e);
          t.vk_proof.A = new Array(e.nVars),
          t.vk_proof.Adelta = new Array(e.nVars),
          t.vk_proof.B1 = new Array(e.nVars),
          t.vk_proof.B2 = new Array(e.nVars),
          t.vk_proof.C = new Array(e.nVars),
          t.vk_verifier.IC = new Array(e.nPublic),
          t.toxic.kalfa = c.random(),
          t.toxic.kbeta = c.random(),
          t.toxic.kgamma = c.random(),
          t.toxic.kdelta = c.random();
          const i = c.mul(t.toxic.kgamma, t.toxic.kgamma);
          t.vk_proof.vk_alfa_1 = a.affine(a.mulScalar(a.g, t.toxic.kalfa)),
          t.vk_proof.vk_beta_1 = a.affine(a.mulScalar(a.g, t.toxic.kbeta)),
          t.vk_proof.vk_delta_1 = a.affine(a.mulScalar(a.g, t.toxic.kdelta)),
          t.vk_proof.vk_alfadelta_1 = a.affine(a.mulScalar(a.g, c.mul(t.toxic.kalfa, t.toxic.kdelta))),
          t.vk_proof.vk_beta_2 = u.affine(u.mulScalar(u.g, t.toxic.kbeta)),
          t.vk_verifier.vk_alfa_1 = a.affine(a.mulScalar(a.g, t.toxic.kalfa)),
          t.vk_verifier.vk_beta_2 = u.affine(u.mulScalar(u.g, t.toxic.kbeta)),
          t.vk_verifier.vk_gamma_2 = u.affine(u.mulScalar(u.g, t.toxic.kgamma)),
          t.vk_verifier.vk_delta_2 = u.affine(u.mulScalar(u.g, t.toxic.kdelta)),
          t.vk_verifier.vk_alfabeta_12 = s.F12.affine(s.pairing(t.vk_verifier.vk_alfa_1, t.vk_verifier.vk_beta_2));
          for (let i = 0; i < e.nVars; i++) {
              const e = a.affine(a.mulScalar(a.g, c.mul(t.toxic.kgamma, r.a_t[i])));
              t.vk_proof.A[i] = e,
              t.vk_proof.Adelta[i] = a.affine(a.mulScalar(e, t.toxic.kdelta));
              const n = a.affine(a.mulScalar(a.g, c.mul(t.toxic.kgamma, r.b_t[i])));
              t.vk_proof.B1[i] = n;
              const o = u.affine(u.mulScalar(u.g, c.mul(t.toxic.kgamma, r.b_t[i])));
              t.vk_proof.B2[i] = o
          }
          for (let e = 0; e <= t.vk_proof.nPublic; e++) {
              let i = c.add(c.mul(t.toxic.kgamma, r.c_t[e]), c.add(c.mul(t.toxic.kbeta, r.a_t[e]), c.mul(t.toxic.kalfa, r.b_t[e])));
              const n = a.affine(a.mulScalar(a.g, i));
              t.vk_verifier.IC[e] = n
          }
          for (let n = t.vk_proof.nPublic + 1; n < e.nVars; n++) {
              let e = c.add(c.mul(i, r.c_t[n]), c.add(c.mul(c.mul(t.toxic.kbeta, t.toxic.kgamma), r.a_t[n]), c.mul(c.mul(t.toxic.kalfa, t.toxic.kgamma), r.b_t[n])));
              const o = a.affine(a.mulScalar(a.g, e));
              t.vk_proof.C[n] = o
          }
          const n = t.vk_proof.domainSize + 1;
          t.vk_proof.hExps = new Array(n);
          const o = c.mul(i, r.z_t);
          t.vk_proof.hExps[0] = a.affine(a.mulScalar(a.g, o));
          let h = t.toxic.t;
          for (let e = 1; e < n; e++)
              t.vk_proof.hExps[e] = a.affine(a.mulScalar(a.g, c.mul(h, o))),
              h = c.mul(h, t.toxic.t)
      }(e, t),
      e
  }
}
)),
parcelRequire.register("dsS7J", (function(t, e) {
  var r = parcelRequire("bdjQ6").Buffer
    , i = parcelRequire("lnsop")
    , n = parcelRequire("3Xe51")
    , o = parcelRequire("8wchO")
    , s = parcelRequire("jpOHd")
    , a = parcelRequire("bjKYs");
  const u = new i
    , l = new n(new o(u.r))
    , c = u.G1
    , h = u.G2;
  t.exports = function(t, e) {
      const i = {}
        , n = l.F.random()
        , o = l.F.random();
      i.pi_a = c.zero,
      i.pi_b = h.zero,
      i.pi_c = c.zero;
      let u = c.zero
        , A = c.zero;
      for (let r = 0; r < t.nVars; r++)
          i.pi_a = c.add(i.pi_a, c.mulScalar(t.A[r], e[r])),
          i.pi_b = h.add(i.pi_b, h.mulScalar(t.B2[r], e[r])),
          A = c.add(A, c.mulScalar(t.Adelta[r], e[r])),
          u = c.add(u, c.mulScalar(t.B1[r], e[r]));
      for (let r = t.nPublic + 1; r < t.nVars; r++)
          i.pi_c = c.add(i.pi_c, c.mulScalar(t.C[r], e[r]));
      i.pi_a = c.add(i.pi_a, t.vk_alfa_1),
      i.pi_a = c.add(i.pi_a, c.mulScalar(c.g, n)),
      A = c.add(A, t.vk_alfadelta_1),
      A = c.add(A, c.mulScalar(t.vk_delta_1, n)),
      i.pi_b = h.add(i.pi_b, t.vk_beta_2),
      i.pi_b = h.add(i.pi_b, h.mulScalar(h.g, o)),
      u = c.add(u, t.vk_beta_1),
      u = c.add(u, c.mulScalar(c.g, o)),
      i.pi_a = c.affine(i.pi_a),
      i.pi_b = h.affine(i.pi_b);
      const f = r.concat([i.pi_a[0].beInt2Buff(32), i.pi_a[1].beInt2Buff(32), i.pi_b[0][0].beInt2Buff(32), i.pi_b[0][1].beInt2Buff(32), i.pi_b[1][0].beInt2Buff(32), i.pi_b[1][1].beInt2Buff(32)])
        , p = s("keccak256").update(f).digest()
        , g = s("keccak256").update(p).digest()
        , d = a.beBuff2int(p)
        , I = a.beBuff2int(g);
      console.log(d.toString()),
      console.log(I.toString());
      const m = function(t, e) {
          const r = l.F
            , i = t.domainSize
            , n = new Array(i).fill(l.F.zero)
            , o = new Array(i).fill(l.F.zero)
            , s = new Array(i).fill(l.F.zero);
          for (let i = 0; i < t.nVars; i++) {
              for (let o in t.polsA[i])
                  n[o] = r.add(n[o], r.mul(e[i], t.polsA[i][o]));
              for (let n in t.polsB[i])
                  o[n] = r.add(o[n], r.mul(e[i], t.polsB[i][n]));
              for (let n in t.polsC[i])
                  s[n] = r.add(s[n], r.mul(e[i], t.polsC[i][n]))
          }
          const a = l.ifft(n)
            , u = l.ifft(o)
            , c = l.mul(a, u)
            , h = l.ifft(s)
            , A = l.sub(c, h);
          return A.slice(i)
      }(t, e);
      for (let e = 0; e < m.length; e++)
          i.pi_c = c.add(i.pi_c, c.mulScalar(t.hExps[e], m[e]));
      i.pi_c = c.add(i.pi_c, c.mulScalar(i.pi_a, o)),
      i.pi_c = c.add(i.pi_c, c.mulScalar(u, n)),
      i.pi_c = c.add(i.pi_c, c.mulScalar(c.g, l.F.affine(l.F.neg(l.F.mul(n, o))))),
      i.pi_c = c.add(i.pi_c, c.mulScalar(A, I)),
      i.pi_c = c.add(i.pi_c, c.mulScalar(u, d)),
      i.pi_c = c.add(i.pi_c, c.mulScalar(t.vk_delta_1, l.F.mul(d, I)));
      const y = e.slice(1, t.nPublic + 1);
      return i.pi_c = c.affine(i.pi_c),
      i.protocol = "kimleeoh",
      {
          proof: i,
          publicSignals: y
      }
  }
}
)),
parcelRequire.register("jpOHd", (function(t, e) {
  t.exports = parcelRequire("4W5HF")(parcelRequire("lQl4t"))
}
)),
parcelRequire.register("4W5HF", (function(t, e) {
  var r = parcelRequire("fpcDc")
    , i = parcelRequire("iMQ6l");
  t.exports = function(t) {
      const e = r(t)
        , n = i(t);
      return function(t, r) {
          switch ("string" == typeof t ? t.toLowerCase() : t) {
          case "keccak224":
              return new e(1152,448,null,224,r);
          case "keccak256":
              return new e(1088,512,null,256,r);
          case "keccak384":
              return new e(832,768,null,384,r);
          case "keccak512":
              return new e(576,1024,null,512,r);
          case "sha3-224":
              return new e(1152,448,6,224,r);
          case "sha3-256":
              return new e(1088,512,6,256,r);
          case "sha3-384":
              return new e(832,768,6,384,r);
          case "sha3-512":
              return new e(576,1024,6,512,r);
          case "shake128":
              return new n(1344,256,31,r);
          case "shake256":
              return new n(1088,512,31,r);
          default:
              throw new Error("Invald algorithm: " + t)
          }
      }
  }
}
)),
parcelRequire.register("fpcDc", (function(t, e) {
  var r = parcelRequire("838j1").Buffer
    , i = parcelRequire("3DkjE").Transform
    , n = parcelRequire("dhT4G");
  t.exports = function(t) {
      function e(e, r, n, o, s) {
          i.call(this, s),
          this._rate = e,
          this._capacity = r,
          this._delimitedSuffix = n,
          this._hashBitLength = o,
          this._options = s,
          this._state = new t,
          this._state.initialize(e, r),
          this._finalized = !1
      }
      return n(e, i),
      e.prototype._transform = function(t, e, r) {
          let i = null;
          try {
              this.update(t, e)
          } catch (t) {
              i = t
          }
          r(i)
      }
      ,
      e.prototype._flush = function(t) {
          let e = null;
          try {
              this.push(this.digest())
          } catch (t) {
              e = t
          }
          t(e)
      }
      ,
      e.prototype.update = function(t, e) {
          if (!r.isBuffer(t) && "string" != typeof t)
              throw new TypeError("Data must be a string or a buffer");
          if (this._finalized)
              throw new Error("Digest already called");
          return r.isBuffer(t) || (t = r.from(t, e)),
          this._state.absorb(t),
          this
      }
      ,
      e.prototype.digest = function(t) {
          if (this._finalized)
              throw new Error("Digest already called");
          this._finalized = !0,
          this._delimitedSuffix && this._state.absorbLastFewBits(this._delimitedSuffix);
          let e = this._state.squeeze(this._hashBitLength / 8);
          return void 0 !== t && (e = e.toString(t)),
          this._resetState(),
          e
      }
      ,
      e.prototype._resetState = function() {
          return this._state.initialize(this._rate, this._capacity),
          this
      }
      ,
      e.prototype._clone = function() {
          const t = new e(this._rate,this._capacity,this._delimitedSuffix,this._hashBitLength,this._options);
          return this._state.copy(t._state),
          t._finalized = this._finalized,
          t
      }
      ,
      e
  }
}
)),
parcelRequire.register("iMQ6l", (function(t, e) {
  var r = parcelRequire("838j1").Buffer
    , i = parcelRequire("3DkjE").Transform
    , n = parcelRequire("dhT4G");
  t.exports = function(t) {
      function e(e, r, n, o) {
          i.call(this, o),
          this._rate = e,
          this._capacity = r,
          this._delimitedSuffix = n,
          this._options = o,
          this._state = new t,
          this._state.initialize(e, r),
          this._finalized = !1
      }
      return n(e, i),
      e.prototype._transform = function(t, e, r) {
          let i = null;
          try {
              this.update(t, e)
          } catch (t) {
              i = t
          }
          r(i)
      }
      ,
      e.prototype._flush = function() {}
      ,
      e.prototype._read = function(t) {
          this.push(this.squeeze(t))
      }
      ,
      e.prototype.update = function(t, e) {
          if (!r.isBuffer(t) && "string" != typeof t)
              throw new TypeError("Data must be a string or a buffer");
          if (this._finalized)
              throw new Error("Squeeze already called");
          return r.isBuffer(t) || (t = r.from(t, e)),
          this._state.absorb(t),
          this
      }
      ,
      e.prototype.squeeze = function(t, e) {
          this._finalized || (this._finalized = !0,
          this._state.absorbLastFewBits(this._delimitedSuffix));
          let r = this._state.squeeze(t);
          return void 0 !== e && (r = r.toString(e)),
          r
      }
      ,
      e.prototype._resetState = function() {
          return this._state.initialize(this._rate, this._capacity),
          this
      }
      ,
      e.prototype._clone = function() {
          const t = new e(this._rate,this._capacity,this._delimitedSuffix,this._options);
          return this._state.copy(t._state),
          t._finalized = this._finalized,
          t
      }
      ,
      e
  }
}
)),
parcelRequire.register("lQl4t", (function(t, e) {
  var r = parcelRequire("838j1").Buffer
    , i = parcelRequire("dpM4c");
  function n() {
      this.state = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      this.blockSize = null,
      this.count = 0,
      this.squeezing = !1
  }
  n.prototype.initialize = function(t, e) {
      for (let t = 0; t < 50; ++t)
          this.state[t] = 0;
      this.blockSize = t / 8,
      this.count = 0,
      this.squeezing = !1
  }
  ,
  n.prototype.absorb = function(t) {
      for (let e = 0; e < t.length; ++e)
          this.state[~~(this.count / 4)] ^= t[e] << this.count % 4 * 8,
          this.count += 1,
          this.count === this.blockSize && (i.p1600(this.state),
          this.count = 0)
  }
  ,
  n.prototype.absorbLastFewBits = function(t) {
      this.state[~~(this.count / 4)] ^= t << this.count % 4 * 8,
      0 != (128 & t) && this.count === this.blockSize - 1 && i.p1600(this.state),
      this.state[~~((this.blockSize - 1) / 4)] ^= 128 << (this.blockSize - 1) % 4 * 8,
      i.p1600(this.state),
      this.count = 0,
      this.squeezing = !0
  }
  ,
  n.prototype.squeeze = function(t) {
      this.squeezing || this.absorbLastFewBits(1);
      const e = r.alloc(t);
      for (var n = 0; n < t; ++n)
          e[n] = this.state[~~(this.count / 4)] >>> this.count % 4 * 8 & 255,
          this.count += 1,
          this.count === this.blockSize && (i.p1600(this.state),
          this.count = 0);
      return e
  }
  ,
  n.prototype.copy = function(t) {
      for (let e = 0; e < 50; ++e)
          t.state[e] = this.state[e];
      t.blockSize = this.blockSize,
      t.count = this.count,
      t.squeezing = this.squeezing
  }
  ,
  t.exports = n
}
)),
parcelRequire.register("dpM4c", (function(t, e) {
  var r;
  $parcel$export(t.exports, "p1600", (function() {
      return r
  }
  ), (function(t) {
      return r = t
  }
  ));
  const i = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648, 2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648];
  r = function(t) {
      for (let e = 0; e < 24; ++e) {
          const r = t[0] ^ t[10] ^ t[20] ^ t[30] ^ t[40]
            , n = t[1] ^ t[11] ^ t[21] ^ t[31] ^ t[41]
            , o = t[2] ^ t[12] ^ t[22] ^ t[32] ^ t[42]
            , s = t[3] ^ t[13] ^ t[23] ^ t[33] ^ t[43]
            , a = t[4] ^ t[14] ^ t[24] ^ t[34] ^ t[44]
            , u = t[5] ^ t[15] ^ t[25] ^ t[35] ^ t[45]
            , l = t[6] ^ t[16] ^ t[26] ^ t[36] ^ t[46]
            , c = t[7] ^ t[17] ^ t[27] ^ t[37] ^ t[47]
            , h = t[8] ^ t[18] ^ t[28] ^ t[38] ^ t[48]
            , A = t[9] ^ t[19] ^ t[29] ^ t[39] ^ t[49];
          let f = h ^ (o << 1 | s >>> 31)
            , p = A ^ (s << 1 | o >>> 31);
          const g = t[0] ^ f
            , d = t[1] ^ p
            , I = t[10] ^ f
            , m = t[11] ^ p
            , y = t[20] ^ f
            , w = t[21] ^ p
            , C = t[30] ^ f
            , E = t[31] ^ p
            , v = t[40] ^ f
            , B = t[41] ^ p;
          f = r ^ (a << 1 | u >>> 31),
          p = n ^ (u << 1 | a >>> 31);
          const b = t[2] ^ f
            , Q = t[3] ^ p
            , R = t[12] ^ f
            , M = t[13] ^ p
            , _ = t[22] ^ f
            , x = t[23] ^ p
            , D = t[32] ^ f
            , S = t[33] ^ p
            , k = t[42] ^ f
            , F = t[43] ^ p;
          f = o ^ (l << 1 | c >>> 31),
          p = s ^ (c << 1 | l >>> 31);
          const q = t[4] ^ f
            , N = t[5] ^ p
            , T = t[14] ^ f
            , P = t[15] ^ p
            , O = t[24] ^ f
            , U = t[25] ^ p
            , L = t[34] ^ f
            , H = t[35] ^ p
            , K = t[44] ^ f
            , z = t[45] ^ p;
          f = a ^ (h << 1 | A >>> 31),
          p = u ^ (A << 1 | h >>> 31);
          const G = t[6] ^ f
            , V = t[7] ^ p
            , $ = t[16] ^ f
            , j = t[17] ^ p
            , Y = t[26] ^ f
            , W = t[27] ^ p
            , Z = t[36] ^ f
            , X = t[37] ^ p
            , J = t[46] ^ f
            , tt = t[47] ^ p;
          f = l ^ (r << 1 | n >>> 31),
          p = c ^ (n << 1 | r >>> 31);
          const et = t[8] ^ f
            , rt = t[9] ^ p
            , it = t[18] ^ f
            , nt = t[19] ^ p
            , ot = t[28] ^ f
            , st = t[29] ^ p
            , at = t[38] ^ f
            , ut = t[39] ^ p
            , lt = t[48] ^ f
            , ct = t[49] ^ p
            , ht = g
            , At = d
            , ft = m << 4 | I >>> 28
            , pt = I << 4 | m >>> 28
            , gt = y << 3 | w >>> 29
            , dt = w << 3 | y >>> 29
            , It = E << 9 | C >>> 23
            , mt = C << 9 | E >>> 23
            , yt = v << 18 | B >>> 14
            , wt = B << 18 | v >>> 14
            , Ct = b << 1 | Q >>> 31
            , Et = Q << 1 | b >>> 31
            , vt = M << 12 | R >>> 20
            , Bt = R << 12 | M >>> 20
            , bt = _ << 10 | x >>> 22
            , Qt = x << 10 | _ >>> 22
            , Rt = S << 13 | D >>> 19
            , Mt = D << 13 | S >>> 19
            , _t = k << 2 | F >>> 30
            , xt = F << 2 | k >>> 30
            , Dt = N << 30 | q >>> 2
            , St = q << 30 | N >>> 2
            , kt = T << 6 | P >>> 26
            , Ft = P << 6 | T >>> 26
            , qt = U << 11 | O >>> 21
            , Nt = O << 11 | U >>> 21
            , Tt = L << 15 | H >>> 17
            , Pt = H << 15 | L >>> 17
            , Ot = z << 29 | K >>> 3
            , Ut = K << 29 | z >>> 3
            , Lt = G << 28 | V >>> 4
            , Ht = V << 28 | G >>> 4
            , Kt = j << 23 | $ >>> 9
            , zt = $ << 23 | j >>> 9
            , Gt = Y << 25 | W >>> 7
            , Vt = W << 25 | Y >>> 7
            , $t = Z << 21 | X >>> 11
            , jt = X << 21 | Z >>> 11
            , Yt = tt << 24 | J >>> 8
            , Wt = J << 24 | tt >>> 8
            , Zt = et << 27 | rt >>> 5
            , Xt = rt << 27 | et >>> 5
            , Jt = it << 20 | nt >>> 12
            , te = nt << 20 | it >>> 12
            , ee = st << 7 | ot >>> 25
            , re = ot << 7 | st >>> 25
            , ie = at << 8 | ut >>> 24
            , ne = ut << 8 | at >>> 24
            , oe = lt << 14 | ct >>> 18
            , se = ct << 14 | lt >>> 18;
          t[0] = ht ^ ~vt & qt,
          t[1] = At ^ ~Bt & Nt,
          t[10] = Lt ^ ~Jt & gt,
          t[11] = Ht ^ ~te & dt,
          t[20] = Ct ^ ~kt & Gt,
          t[21] = Et ^ ~Ft & Vt,
          t[30] = Zt ^ ~ft & bt,
          t[31] = Xt ^ ~pt & Qt,
          t[40] = Dt ^ ~Kt & ee,
          t[41] = St ^ ~zt & re,
          t[2] = vt ^ ~qt & $t,
          t[3] = Bt ^ ~Nt & jt,
          t[12] = Jt ^ ~gt & Rt,
          t[13] = te ^ ~dt & Mt,
          t[22] = kt ^ ~Gt & ie,
          t[23] = Ft ^ ~Vt & ne,
          t[32] = ft ^ ~bt & Tt,
          t[33] = pt ^ ~Qt & Pt,
          t[42] = Kt ^ ~ee & It,
          t[43] = zt ^ ~re & mt,
          t[4] = qt ^ ~$t & oe,
          t[5] = Nt ^ ~jt & se,
          t[14] = gt ^ ~Rt & Ot,
          t[15] = dt ^ ~Mt & Ut,
          t[24] = Gt ^ ~ie & yt,
          t[25] = Vt ^ ~ne & wt,
          t[34] = bt ^ ~Tt & Yt,
          t[35] = Qt ^ ~Pt & Wt,
          t[44] = ee ^ ~It & _t,
          t[45] = re ^ ~mt & xt,
          t[6] = $t ^ ~oe & ht,
          t[7] = jt ^ ~se & At,
          t[16] = Rt ^ ~Ot & Lt,
          t[17] = Mt ^ ~Ut & Ht,
          t[26] = ie ^ ~yt & Ct,
          t[27] = ne ^ ~wt & Et,
          t[36] = Tt ^ ~Yt & Zt,
          t[37] = Pt ^ ~Wt & Xt,
          t[46] = It ^ ~_t & Dt,
          t[47] = mt ^ ~xt & St,
          t[8] = oe ^ ~ht & vt,
          t[9] = se ^ ~At & Bt,
          t[18] = Ot ^ ~Lt & Jt,
          t[19] = Ut ^ ~Ht & te,
          t[28] = yt ^ ~Ct & kt,
          t[29] = wt ^ ~Et & Ft,
          t[38] = Yt ^ ~Zt & ft,
          t[39] = Wt ^ ~Xt & pt,
          t[48] = _t ^ ~Dt & Kt,
          t[49] = xt ^ ~St & zt,
          t[0] ^= i[2 * e],
          t[1] ^= i[2 * e + 1]
      }
  }
}
)),
parcelRequire.register("KwXDU", (function(t, e) {
  var r = parcelRequire("bdjQ6").Buffer
    , i = parcelRequire("lnsop")
    , n = parcelRequire("jpOHd")
    , o = parcelRequire("bjKYs");
  const s = new i
    , a = s.G1
    , u = s.G2;
  t.exports = function(t, e, i) {
      let l = t.IC[0];
      for (let e = 0; e < t.nPublic; e++)
          l = a.add(l, a.mulScalar(t.IC[e + 1], i[e]));
      const c = r.concat([e.pi_a[0].beInt2Buff(32), e.pi_a[1].beInt2Buff(32), e.pi_b[0][0].beInt2Buff(32), e.pi_b[0][1].beInt2Buff(32), e.pi_b[1][0].beInt2Buff(32), e.pi_b[1][1].beInt2Buff(32)])
        , h = n("keccak256").update(c).digest()
        , A = n("keccak256").update(h).digest()
        , f = o.beBuff2int(h)
        , p = o.beBuff2int(A);
      return console.log(f.toString()),
      console.log(p.toString()),
      !!s.F12.equals(s.pairing(a.add(e.pi_a, a.mulScalar(a.g, f)), u.add(e.pi_b, u.mulScalar(t.vk_delta_2, p))), s.F12.mul(t.vk_alfabeta_12, s.F12.mul(s.pairing(l, t.vk_gamma_2), s.pairing(e.pi_c, u.g))))
  }
}
)),
parcelRequire.register("lM7ls", (function(t, e) {
  var r, i;
  $parcel$export(t.exports, "stringifyBigInts", (function() {
      return r
  }
  ), (function(t) {
      return r = t
  }
  )),
  $parcel$export(t.exports, "unstringifyBigInts", (function() {
      return i
  }
  ), (function(t) {
      return i = t
  }
  ));
  var n = parcelRequire("bjKYs");
  r = function t(e) {
      if ("bigint" == typeof e || void 0 !== e.isZero)
          return e.toString(10);
      if (Array.isArray(e))
          return e.map(t);
      if ("object" == typeof e) {
          const r = {};
          for (let i in e)
              r[i] = t(e[i]);
          return r
      }
      return e
  }
  ,
  i = function t(e) {
      if ("string" == typeof e && /^[0-9]+$/.test(e))
          return n(e);
      if (Array.isArray(e))
          return e.map(t);
      if ("object" == typeof e) {
          const r = {};
          for (let i in e)
              r[i] = t(e[i]);
          return r
      }
      return e
  }
}
)),
parcelRequire.register("6xYxg", (function(t, e) {
  var r, i;
  $parcel$export(t.exports, "babyJub", (function() {
      return r
  }
  ), (function(t) {
      return r = t
  }
  )),
  $parcel$export(t.exports, "pedersenHash", (function() {
      return i
  }
  ), (function(t) {
      return i = t
  }
  )),
  parcelRequire("63pyP"),
  parcelRequire("kI7SR"),
  parcelRequire("f1fXJ"),
  parcelRequire("3aec6"),
  r = parcelRequire("jtAIf"),
  i = parcelRequire("bt6mT"),
  parcelRequire("63pyP").SMT,
  parcelRequire("fsuAN"),
  parcelRequire("kBWvB")
}
)),
parcelRequire.register("63pyP", (function(t, e) {
  var r, i, n, o;
  $parcel$export(t.exports, "loadFromFile", (function() {
      return r
  }
  ), (function(t) {
      return r = t
  }
  )),
  $parcel$export(t.exports, "newMemEmptyTrie", (function() {
      return i
  }
  ), (function(t) {
      return i = t
  }
  )),
  $parcel$export(t.exports, "SMT", (function() {
      return n
  }
  ), (function(t) {
      return n = t
  }
  )),
  $parcel$export(t.exports, "SMTMemDB", (function() {
      return o
  }
  ), (function(t) {
      return o = t
  }
  ));
  var s = parcelRequire("1lbVy").bigInt
    , a = parcelRequire("fsuAN")
    , u = parcelRequire("6TE10")
    , l = u.hash0
    , c = u.hash1;
  class h {
      _splitBits(t) {
          let e = s(t);
          const r = [];
          for (; !e.isZero(); )
              e.isOdd() ? r.push(!0) : r.push(!1),
              e = e.shr(1);
          for (; r.length < 256; )
              r.push(!1);
          return r
      }
      async update(t, e) {
          const r = s(t)
            , i = s(e)
            , n = await this.find(r)
            , o = {};
          o.oldRoot = this.root,
          o.oldKey = r,
          o.oldValue = n.foundValue,
          o.newKey = r,
          o.newValue = i,
          o.siblings = n.siblings;
          const a = []
            , u = [];
          let h = c(r, n.foundValue)
            , A = c(r, i);
          a.push([A, [1, r, i]]),
          u.push(h);
          const f = this._splitBits(r);
          for (let t = n.siblings.length - 1; t >= 0; t--) {
              let e, r;
              const i = n.siblings[t];
              f[t] ? (e = [i, h],
              r = [i, A]) : (e = [h, i],
              r = [A, i]),
              h = l(e[0], e[1]),
              A = l(r[0], r[1]),
              u.push(h),
              a.push([A, r])
          }
          return o.newRoot = A,
          await this.db.multiIns(a),
          await this.db.setRoot(A),
          this.root = A,
          await this.db.multiDel(u),
          o
      }
      async delete(t) {
          const e = s(t)
            , r = await this.find(e);
          if (!r.found)
              throw new Error("Key does not exists");
          const i = {
              siblings: [],
              delKey: e,
              delValue: r.foundValue
          }
            , n = []
            , o = [];
          let a, u, h = c(e, r.foundValue);
          if (n.push(h),
          r.siblings.length > 0) {
              const t = await this.db.get(r.siblings[r.siblings.length - 1]);
              if (3 == t.length && t[0].equals(s.one))
                  u = !1,
                  i.oldKey = t[1],
                  i.oldValue = t[2],
                  i.isOld0 = !1,
                  a = r.siblings[r.siblings.length - 1];
              else {
                  if (2 != t.length)
                      throw new Error("Invalid node. Database corrupted");
                  u = !0,
                  i.oldKey = e,
                  i.oldValue = s(0),
                  i.isOld0 = !0,
                  a = s.zero
              }
          } else
              a = s.zero,
              i.oldKey = e,
              i.oldValue = s(0),
              i.isOld0 = !0;
          const A = this._splitBits(e);
          for (let t = r.siblings.length - 1; t >= 0; t--) {
              let e = r.siblings[t];
              t != r.siblings.length - 1 || i.isOld0 || (e = s.zero);
              const c = r.siblings[t];
              if (h = A[t] ? l(c, h) : l(h, c),
              n.push(h),
              e.isZero() || (u = !0),
              u) {
                  let n;
                  i.siblings.unshift(r.siblings[t]),
                  n = A[t] ? [e, a] : [a, e],
                  a = l(n[0], n[1]),
                  o.push([a, n])
              }
          }
          return await this.db.multiIns(o),
          await this.db.setRoot(a),
          this.root = a,
          await this.db.multiDel(n),
          i.newRoot = a,
          i.oldRoot = h,
          i
      }
      async insert(t, e) {
          const r = s(t)
            , i = s(e);
          let n = !1;
          const o = {};
          o.oldRoot = this.root;
          const a = this._splitBits(r);
          let u;
          const h = await this.find(r);
          if (h.found)
              throw new Error("Key already exists");
          let A;
          if (o.siblings = h.siblings,
          h.isOld0)
              o.siblings.length > 0 && (A = !0,
              u = s.zero);
          else {
              const t = this._splitBits(h.notFoundKey);
              for (let e = o.siblings.length; t[e] == a[e]; e++)
                  o.siblings.push(s.zero);
              u = c(h.notFoundKey, h.notFoundValue),
              o.siblings.push(u),
              n = !0,
              A = !1
          }
          const f = []
            , p = [];
          let g = c(r, i);
          f.push([g, [1, r, i]]);
          for (let t = o.siblings.length - 1; t >= 0; t--) {
              if (t < o.siblings.length - 1 && !o.siblings[t].isZero() && (A = !0),
              A) {
                  const e = h.siblings[t];
                  u = a[t] ? l(e, u) : l(u, e),
                  p.push(u)
              }
              let e;
              a[t] ? (e = l(o.siblings[t], g),
              f.push([e, [o.siblings[t], g]])) : (e = l(g, o.siblings[t]),
              f.push([e, [g, o.siblings[t]]])),
              g = e
          }
          for (n && o.siblings.pop(); o.siblings.length > 0 && o.siblings[o.siblings.length - 1].isZero(); )
              o.siblings.pop();
          return o.oldKey = h.notFoundKey,
          o.oldValue = h.notFoundValue,
          o.newRoot = g,
          o.isOld0 = h.isOld0,
          await this.db.multiIns(f),
          await this.db.setRoot(g),
          this.root = g,
          await this.db.multiDel(p),
          o
      }
      async find(t) {
          const e = this._splitBits(t);
          return await this._find(t, e, this.root, 0)
      }
      async _find(t, e, r, i) {
          let n;
          if (void 0 === r && (r = this.root),
          r.isZero())
              return n = {
                  found: !1,
                  siblings: [],
                  notFoundKey: t,
                  notFoundValue: s.zero,
                  isOld0: !0
              },
              n;
          const o = await this.db.get(r);
          return 3 == o.length && o[0].equals(s.one) ? n = o[1].equals(t) ? {
              found: !0,
              siblings: [],
              foundValue: o[2],
              isOld0: !1
          } : {
              found: !1,
              siblings: [],
              notFoundKey: o[1],
              notFoundValue: o[2],
              isOld0: !1
          } : 0 == e[i] ? (n = await this._find(t, e, o[0], i + 1),
          n.siblings.unshift(o[1])) : (n = await this._find(t, e, o[1], i + 1),
          n.siblings.unshift(o[0])),
          n
      }
      constructor(t, e) {
          this.db = t,
          this.root = e
      }
  }
  r = async function(t) {}
  ,
  i = async function() {
      const t = new a
        , e = await t.getRoot();
      return new h(t,e)
  }
  ,
  n = h,
  o = a
}
)),
parcelRequire.register("1lbVy", (function(t, e) {
  var r, i;
  $parcel$export(t.exports, "bigInt", (function() {
      return r
  }
  ), (function(t) {
      return r = t
  }
  )),
  $parcel$export(t.exports, "bn128", (function() {
      return i
  }
  ), (function(t) {
      return i = t
  }
  )),
  parcelRequire("0cK9M"),
  parcelRequire("3XfCK"),
  parcelRequire("5ZCzi"),
  parcelRequire("kLuE7"),
  parcelRequire("9zpLd"),
  parcelRequire("e5PkR"),
  parcelRequire("2blQA"),
  parcelRequire("i7fRS"),
  parcelRequire("dhhBE"),
  parcelRequire("dc7UT"),
  r = parcelRequire("ltcvo"),
  parcelRequire("ffNX2"),
  parcelRequire("bV5OE").stringifyBigInts,
  parcelRequire("bV5OE").unstringifyBigInts;
  var n = parcelRequire("jMdZa");
  i = new n
}
)),
parcelRequire.register("0cK9M", (function(module, exports) {
  var $ltcvo = parcelRequire("ltcvo");
  const __P__ = $ltcvo("21888242871839275222246405745257275088548364400416034343698204186575808495617")
    , __MASK__ = $ltcvo("28948022309329048855892746252171976963317496166410141009864396001978282409983");
  var $9MDFc = parcelRequire("9MDFc");
  module.exports = class Circuit {
      calculateWitness(t, e) {
          return $9MDFc(this, t, e)
      }
      checkWitness(t) {
          const e = (t,e)=>{
              let r = $ltcvo(0);
              for (let i in t)
                  r = r.add($ltcvo(e[i]).mul($ltcvo(t[i]))).mod(__P__);
              return r
          }
            , r = (t,r)=>{
              const i = e(t[0], r)
                , n = e(t[1], r)
                , o = e(t[2], r);
              return !!i.mul(n).sub(o).affine(__P__).isZero()
          }
          ;
          for (let e = 0; e < this.constraints.length; e++)
              if (!r(this.constraints[e], t))
                  return this.printCostraint(this.constraints[e]),
                  !1;
          return !0
      }
      printCostraint(t) {
          const e = t=>{
              let e = "";
              for (let r in t) {
                  let i = this.signals[r].names[0];
                  "one" == i && (i = "");
                  let n, o = $ltcvo(t[r]);
                  o.lesserOrEquals(__P__.shr($ltcvo(1))) ? (n = "" != e ? "+" + o.toString() : "",
                  "1" != n && (n += o.toString())) : (o = __P__.sub(o),
                  n = "-" + o.toString()),
                  e = e + " " + n + i
              }
              return e
          }
            , r = `[ ${e(t[0])} ] * [ ${e(t[1])} ] - [ ${e(t[2])} ] = 0`;
          console.log(r)
      }
      printConstraints() {
          for (let t = 0; t < this.constraints.length; t++)
              this.printCostraint(this.constraints[t])
      }
      getSignalIdx(t) {
          if (void 0 !== this.signalName2Idx[t])
              return this.signalName2Idx[t];
          if (!isNaN(t))
              return Number(t);
          throw new Error("Invalid signal identifier: " + t)
      }
      outputIdx(t) {
          if (t >= this.nOutputs)
              throw new Error("Accessing an invalid output: " + t);
          return t + 1
      }
      inputIdx(t) {
          if (t >= this.nInputs)
              throw new Error("Accessing an invalid input: " + t);
          return this.nOutputs + 1 + t
      }
      pubInputIdx(t) {
          if (t >= this.nPubInputs)
              throw new Error("Accessing an invalid pubInput: " + t);
          return this.inputIdx(t)
      }
      prvInputIdx(t) {
          if (t >= this.nPrvInputs)
              throw new Error("Accessing an invalid prvInput: " + t);
          return this.inputIdx(this.nPubInputs + t)
      }
      varIdx(t) {
          if (t >= this.nVars)
              throw new Error("Accessing an invalid variable: " + t);
          return t
      }
      constantIdx(t) {
          if (t >= this.nConstants)
              throw new Error("Accessing an invalid constant: " + t);
          return this.nVars + t
      }
      signalIdx(t) {
          if (t >= this.nSignls)
              throw new Error("Accessing an invalid signal: " + t);
          return t
      }
      signalNames(t) {
          return this.signals[this.getSignalIdx(t)].names.join(", ")
      }
      a(t, e) {
          return $ltcvo(this.constraints[t][0][e] || 0)
      }
      b(t, e) {
          return $ltcvo(this.constraints[t][1][e] || 0)
      }
      c(t, e) {
          return $ltcvo(this.constraints[t][2][e] || 0)
      }
      constructor(circuitDef) {
          this.nPubInputs = circuitDef.nPubInputs,
          this.nPrvInputs = circuitDef.nPrvInputs,
          this.nInputs = circuitDef.nInputs,
          this.nOutputs = circuitDef.nOutputs,
          this.nVars = circuitDef.nVars,
          this.nSignals = circuitDef.nSignals,
          this.nConstants = circuitDef.nConstants,
          this.nConstraints = circuitDef.constraints.length,
          this.signalName2Idx = circuitDef.signalName2Idx,
          this.components = circuitDef.components,
          this.componentName2Idx = circuitDef.componentName2Idx,
          this.signals = circuitDef.signals,
          this.constraints = circuitDef.constraints,
          this.templates = {};
          for (let t in circuitDef.templates)
              this.templates[t] = eval(" const __f= " + circuitDef.templates[t] + "\n__f");
          this.functions = {};
          for (let f in circuitDef.functions)
              this.functions[f] = {
                  params: circuitDef.functions[f].params,
                  func: eval(" const __f= " + circuitDef.functions[f].func + "\n__f;")
              }
      }
  }
}
)),
parcelRequire.register("ltcvo", (function(t, e) {
  var r = parcelRequire("bdjQ6").Buffer
    , i = parcelRequire("1cWWu");
  let n;
  if ("undefined" != typeof BigInt)
      n = BigInt,
      n.one = n(1),
      n.zero = n(0),
      n.genAffine = t=>{
          const e = -t;
          return r=>{
              let i = r;
              return i < 0 ? (i <= e && (i %= t),
              i < n.zero && (i += t)) : i >= t && (i %= t),
              i.valueOf()
          }
      }
      ,
      n.genInverse = t=>e=>{
          let r = n.zero
            , i = t
            , o = n.one
            , s = n.affine(e, t);
          for (; s != n.zero; ) {
              let t = i / s;
              [r,o] = [o, r - t * o],
              [i,s] = [s, i - t * s]
          }
          return r < n.zero && (r += t),
          r
      }
      ,
      n.genAdd = t=>t ? (e,r)=>(e + r) % t : (t,e)=>t + e,
      n.genSub = t=>t ? (e,r)=>(e - r) % t : (t,e)=>t - e,
      n.genNeg = t=>t ? e=>-e % t : t=>-t,
      n.genMul = t=>t ? (e,r)=>e * r % t : (t,e)=>t * e,
      n.genShr = ()=>(t,e)=>t >> n(e),
      n.genShl = t=>t ? (e,r)=>(e << n(r)) % t : (t,e)=>t << n(e),
      n.genEquals = t=>t ? (e,r)=>e.affine(t) == r.affine(t) : (t,e)=>t == e,
      n.genSquare = t=>t ? e=>e * e % t : t=>t * t,
      n.genDouble = t=>t ? e=>(e + e) % t : t=>t + t,
      n.genIsZero = t=>t ? e=>e.affine(t) == n.zero : t=>t == n.zero,
      n.prototype.isOdd = function() {
          return (this & n.one) == n(1)
      }
      ,
      n.prototype.isNegative = function() {
          return this < n.zero
      }
      ,
      n.prototype.and = function(t) {
          return this & t
      }
      ,
      n.prototype.div = function(t) {
          return this / t
      }
      ,
      n.prototype.mod = function(t) {
          return this % t
      }
      ,
      n.prototype.pow = function(t) {
          return this ** t
      }
      ,
      n.prototype.abs = function() {
          return this > n.zero ? this : -this
      }
      ,
      n.prototype.modPow = function(t, e) {
          let r = n.one
            , i = this
            , o = t;
          for (; o; )
              o & n.one && (r = r * i % e),
              i = i * i % e,
              o >>= n.one;
          return r
      }
      ,
      n.prototype.greaterOrEquals = function(t) {
          return this >= t
      }
      ,
      n.prototype.greater = function(t) {
          return this > t
      }
      ,
      n.prototype.gt = n.prototype.greater,
      n.prototype.lesserOrEquals = function(t) {
          return this <= t
      }
      ,
      n.prototype.lesser = function(t) {
          return this < t
      }
      ,
      n.prototype.lt = n.prototype.lesser,
      n.prototype.equals = function(t) {
          return this == t
      }
      ,
      n.prototype.eq = n.prototype.equals,
      n.prototype.neq = function(t) {
          return this != t
      }
      ,
      n.prototype.toJSNumber = function() {
          return Number(this)
      }
      ;
  else {
      var o = i.prototype;
      n = function(t) {
          return "string" == typeof t && "0x" == t.slice(0, 2) ? i(t.slice(2), 16) : i(t)
      }
      ,
      n.one = i.one,
      n.zero = i.zero,
      n.prototype = o,
      n.prototype.div = function(t) {
          return this.divide(t)
      }
      ,
      n.genAffine = t=>{
          const e = n.zero.minus(t);
          return r=>{
              let i = r;
              return i.isNegative() ? (i.lesserOrEquals(e) && (i = i.mod(t)),
              i.isNegative() && (i = i.add(t))) : i.greaterOrEquals(t) && (i = i.mod(t)),
              i
          }
      }
      ,
      n.genInverse = t=>e=>e.affine(t).modInv(t),
      n.genAdd = t=>t ? (e,r)=>{
          const i = e.add(r);
          return i.greaterOrEquals(t) ? i.minus(t) : i
      }
      : (t,e)=>t.add(e),
      n.genSub = t=>t ? (e,r)=>e.greaterOrEquals(r) ? e.minus(r) : e.minus(r).add(t) : (t,e)=>t.minus(e),
      n.genNeg = t=>t ? e=>e.isZero() ? e : t.minus(e) : t=>n.zero.minus(t),
      n.genMul = t=>t ? (e,r)=>e.times(r).mod(t) : (t,e)=>t.times(e),
      n.genShr = ()=>(t,e)=>t.shiftRight(n(e).value),
      n.genShl = t=>t ? (e,r)=>e.shiftLeft(n(r).value).mod(t) : (t,e)=>t.shiftLeft(n(e).value),
      n.genSquare = t=>t ? e=>e.square().mod(t) : t=>t.square(),
      n.genDouble = t=>t ? e=>e.add(e).mod(t) : t=>t.add(t),
      n.genEquals = t=>t ? (e,r)=>e.affine(t).equals(r.affine(t)) : (t,e)=>t.equals(e),
      n.genIsZero = t=>t ? e=>e.affine(t).isZero() : t=>t.isZero()
  }
  n.affine = function(t, e) {
      return n.genAffine(e)(t)
  }
  ,
  n.prototype.affine = function(t) {
      return n.affine(this, t)
  }
  ,
  n.inverse = function(t, e) {
      return n.genInverse(e)(t)
  }
  ,
  n.prototype.inverse = function(t) {
      return n.genInverse(t)(this)
  }
  ,
  n.add = function(t, e, r) {
      return n.genAdd(r)(t, e)
  }
  ,
  n.prototype.add = function(t, e) {
      return n.genAdd(e)(this, t)
  }
  ,
  n.sub = function(t, e, r) {
      return n.genSub(r)(t, e)
  }
  ,
  n.prototype.sub = function(t, e) {
      return n.genSub(e)(this, t)
  }
  ,
  n.neg = function(t, e) {
      return n.genNeg(e)(t)
  }
  ,
  n.prototype.neg = function(t) {
      return n.genNeg(t)(this)
  }
  ,
  n.mul = function(t, e, r) {
      return n.genMul(r)(t, e)
  }
  ,
  n.prototype.mul = function(t, e) {
      return n.genMul(e)(this, t)
  }
  ,
  n.shr = function(t, e, r) {
      return n.genShr(r)(t, e)
  }
  ,
  n.prototype.shr = function(t, e) {
      return n.genShr(e)(this, t)
  }
  ,
  n.shl = function(t, e, r) {
      return n.genShl(r)(t, e)
  }
  ,
  n.prototype.shl = function(t, e) {
      return n.genShl(e)(this, t)
  }
  ,
  n.equals = function(t, e, r) {
      return n.genEquals(r)(t, e)
  }
  ,
  n.prototype.equals = function(t, e) {
      return n.genEquals(e)(this, t)
  }
  ,
  n.square = function(t, e) {
      return n.genSquare(e)(t)
  }
  ,
  n.prototype.square = function(t) {
      return n.genSquare(t)(this)
  }
  ,
  n.double = function(t, e) {
      return n.genDouble(e)(t)
  }
  ,
  n.prototype.double = function(t) {
      return n.genDouble(t)(this)
  }
  ,
  n.isZero = function(t, e) {
      return n.genIsZero(e)(t)
  }
  ,
  n.prototype.isZero = function(t) {
      return n.genIsZero(t)(this)
  }
  ,
  n.leBuff2int = function(t) {
      let e = n.zero;
      for (let r = 0; r < t.length; r++) {
          const i = n(t[r]);
          e = e.add(i.shl(8 * r))
      }
      return e
  }
  ,
  n.leInt2Buff = function(t, e) {
      let i = t
        , o = 0;
      const s = r.alloc(e);
      for (; i.greater(n.zero) && o < s.length; ) {
          let t = Number(i.and(n("255")));
          s[o] = t,
          o++,
          i = i.shr(8)
      }
      if (i.greater(n.zero))
          throw new Error("Number does not feed in buffer");
      return s
  }
  ,
  n.prototype.leInt2Buff = function(t) {
      return n.leInt2Buff(this, t)
  }
  ,
  n.beBuff2int = function(t) {
      let e = n.zero;
      for (let r = 0; r < t.length; r++) {
          const i = n(t[t.length - r - 1]);
          e = e.add(i.shl(8 * r))
      }
      return e
  }
  ,
  n.beInt2Buff = function(t, e) {
      let i = t
        , o = e - 1;
      const s = r.alloc(e);
      for (; i.greater(n.zero) && o >= 0; ) {
          let t = Number(i.and(n("255")));
          s[o] = t,
          o--,
          i = i.shr(8)
      }
      if (i.greater(n.zero))
          throw new Error("Number does not feed in buffer");
      return s
  }
  ,
  n.prototype.beInt2Buff = function(t) {
      return n.beInt2Buff(this, t)
  }
  ,
  t.exports = n
}
)),
parcelRequire.register("9MDFc", (function(t, e) {
  var r = parcelRequire("ltcvo");
  t.exports = function(t, e, n) {
      (n = n || {}).logFunction || (n.logFunction = console.log);
      const o = new i(t,n);
      function s(t, e, r) {
          if (!Array.isArray(t))
              return r(e, t);
          for (let i = 0; i < t.length; i++)
              e.push(i),
              s(t[i], e, r),
              e.pop(i)
      }
      o.setSignal("one", [], r(1));
      for (let t in o.notInitSignals)
          0 == o.notInitSignals[t] && o.triggerComponent(t);
      for (let t in e)
          o.currentComponent = "main",
          s(e[t], [], (function(e, i) {
              if (void 0 === i)
                  throw new Error("Signal not defined:" + t);
              o.setSignal(t, e, r(i))
          }
          ));
      for (let e = 0; e < t.nInputs; e++) {
          const r = t.inputIdx(e);
          if (void 0 === o.witness[r])
              throw new Error("Input Signal not assigned: " + t.signalNames(r))
      }
      for (let e = 0; e < o.witness.length; e++) {
          if (void 0 === o.witness[e])
              throw new Error("Signal not assigned: " + t.signalNames(e));
          n.logOutput && n.logFunction(t.signalNames(e) + " --\x3e " + o.witness[e].toString())
      }
      return o.witness.slice(0, t.nVars)
  }
  ;
  class i {
      _sels2str(t) {
          let e = "";
          for (let r = 0; r < t.length; r++)
              e += `[${t[r]}]`;
          return e
      }
      setPin(t, e, r, i, n) {
          let o = "one" == t ? "one" : this.currentComponent + "." + t;
          o += this._sels2str(e) + "." + r + this._sels2str(i),
          this.setSignalFullName(o, n)
      }
      setSignal(t, e, r) {
          let i = this.currentComponent ? this.currentComponent + "." + t : t;
          i += this._sels2str(e),
          this.setSignalFullName(i, r)
      }
      triggerComponent(t) {
          this.options.logTrigger && this.options.logFunction("Component Treiggered: " + this.circuit.components[t].name),
          this.notInitSignals[t]--;
          const e = this.currentComponent;
          this.currentComponent = this.circuit.components[t].name;
          const r = this.circuit.components[t].template
            , i = {};
          for (let e in this.circuit.components[t].params)
              i[e] = this.circuit.components[t].params[e];
          const n = this.scopes;
          this.scopes = [this.scopes[0], i],
          this.circuit.templates[r](this),
          this.scopes = n,
          this.currentComponent = e,
          this.options.logTrigger && this.options.logFunction("End Component Treiggered: " + this.circuit.components[t].name)
      }
      callFunction(t, e) {
          const r = {};
          for (let i = 0; i < this.circuit.functions[t].params.length; i++) {
              r[this.circuit.functions[t].params[i]] = e[i]
          }
          const i = this.scopes;
          this.scopes = [this.scopes[0], r];
          const n = this.circuit.functions[t].func(this);
          return this.scopes = i,
          n
      }
      setSignalFullName(t, e) {
          this.options.logSet && this.options.logFunction("set " + t + " <-- " + e.toString());
          const i = this.circuit.getSignalIdx(t);
          let n = !1;
          void 0 === this.witness[i] && (n = !0),
          this.witness[i] = r(e);
          const o = [];
          for (let t = 0; t < this.circuit.signals[i].triggerComponents.length; t++) {
              var s = this.circuit.signals[i].triggerComponents[t];
              n && this.notInitSignals[s]--,
              o.push(s)
          }
          return o.map((t=>{
              0 == this.notInitSignals[t] && this.triggerComponent(t)
          }
          )),
          this.witness[i]
      }
      setVar(t, e, r) {
          const i = this.scopes[this.scopes.length - 1];
          return 0 == e.length ? i[t] = r : (void 0 === i[t] && (i[t] = []),
          function t(e, r, i) {
              1 == r.length ? e[r[0]] = i : (void 0 === e[r[0]] && (e[r[0]] = []),
              t(e[r[0]], r.slice(1), i))
          }(i[t], e, r)),
          r
      }
      getVar(t, e) {
          function r(t, e) {
              return 0 == e.length ? t : r(t[e[0]], e.slice(1))
          }
          for (let i = this.scopes.length - 1; i >= 0; i--)
              if (void 0 !== this.scopes[i][t])
                  return r(this.scopes[i][t], e);
          throw new Error("Variable not defined: " + t)
      }
      getSignal(t, e) {
          let r = "one" == t ? "one" : this.currentComponent + "." + t;
          return r += this._sels2str(e),
          this.getSignalFullName(r)
      }
      getPin(t, e, r, i) {
          let n = "one" == t ? "one" : this.currentComponent + "." + t;
          return n += this._sels2str(e) + "." + r + this._sels2str(i),
          this.getSignalFullName(n)
      }
      getSignalFullName(t) {
          const e = this.circuit.getSignalIdx(t);
          if (void 0 === this.witness[e])
              throw new Error("Signal not initialized: " + t);
          return this.options.logGet && this.options.logFunction("get ---\x3e" + t + " = " + this.witness[e].toString()),
          this.witness[e]
      }
      assert(t, e, i) {
          const n = r(t)
            , o = r(e);
          if (!n.equals(o))
              throw new Error("Constraint doesn't match " + this.currentComponent + ": " + i + " -> " + n.toString() + " != " + o.toString())
      }
      constructor(t, e) {
          this.options = e,
          this.scopes = [],
          this.circuit = t,
          this.witness = new Array(t.nSignals),
          this.notInitSignals = {};
          for (let t in this.circuit.components)
              this.notInitSignals[t] = this.circuit.components[t].inputSignals
      }
  }
}
)),
parcelRequire.register("3XfCK", (function(t, e) {
  var r = parcelRequire("ltcvo")
    , i = parcelRequire("jMdZa")
    , n = parcelRequire("6G9qq")
    , o = parcelRequire("ffNX2");
  const s = new i
    , a = s.G1
    , u = s.G2
    , l = new n(new o(s.r))
    , c = new o(s.r);
  t.exports = function(t) {
      const e = {
          vk_proof: {
              protocol: "original",
              nVars: t.nVars,
              nPublic: t.nPubInputs + t.nOutputs
          },
          vk_verifier: {
              protocol: "original",
              nPublic: t.nPubInputs + t.nOutputs
          },
          toxic: {}
      };
      return e.vk_proof.domainBits = l.log2(t.nConstraints + t.nPubInputs + t.nOutputs + 1 - 1) + 1,
      e.vk_proof.domainSize = 1 << e.vk_proof.domainBits,
      function(t, e) {
          t.vk_proof.polsA = new Array(e.nVars),
          t.vk_proof.polsB = new Array(e.nVars),
          t.vk_proof.polsC = new Array(e.nVars);
          for (let r = 0; r < e.nVars; r++)
              t.vk_proof.polsA[r] = {},
              t.vk_proof.polsB[r] = {},
              t.vk_proof.polsC[r] = {};
          for (let i = 0; i < e.nConstraints; i++) {
              for (let n in e.constraints[i][0])
                  t.vk_proof.polsA[n][i] = r(e.constraints[i][0][n]);
              for (let n in e.constraints[i][1])
                  t.vk_proof.polsB[n][i] = r(e.constraints[i][1][n]);
              for (let n in e.constraints[i][2])
                  t.vk_proof.polsC[n][i] = r(e.constraints[i][2][n])
          }
          for (let r = 0; r < e.nPubInputs + e.nOutputs + 1; ++r)
              t.vk_proof.polsA[r][e.nConstraints + r] = c.one
      }(e, t),
      e.toxic.t = c.random(),
      function(t, e) {
          const r = function(t, e) {
              const r = l.computeVanishingPolinomial(t.vk_proof.domainBits, t.toxic.t)
                , i = l.evaluateLagrangePolynomials(t.vk_proof.domainBits, t.toxic.t)
                , n = new Array(e.nVars).fill(c.zero)
                , o = new Array(e.nVars).fill(c.zero)
                , s = new Array(e.nVars).fill(c.zero);
              for (let r = 0; r < e.nVars; r++) {
                  for (let e in t.vk_proof.polsA[r])
                      n[r] = c.add(n[r], c.mul(i[e], t.vk_proof.polsA[r][e]));
                  for (let e in t.vk_proof.polsB[r])
                      o[r] = c.add(o[r], c.mul(i[e], t.vk_proof.polsB[r][e]));
                  for (let e in t.vk_proof.polsC[r])
                      s[r] = c.add(s[r], c.mul(i[e], t.vk_proof.polsC[r][e]))
              }
              return {
                  a_t: n,
                  b_t: o,
                  c_t: s,
                  z_t: r
              }
          }(t, e);
          t.vk_proof.A = new Array(e.nVars + 1),
          t.vk_proof.B = new Array(e.nVars + 1),
          t.vk_proof.C = new Array(e.nVars + 1),
          t.vk_proof.Ap = new Array(e.nVars + 1),
          t.vk_proof.Bp = new Array(e.nVars + 1),
          t.vk_proof.Cp = new Array(e.nVars + 1),
          t.vk_proof.Kp = new Array(e.nVars + 3),
          t.vk_verifier.IC = new Array(e.nPublic),
          t.toxic.ka = c.random(),
          t.toxic.kb = c.random(),
          t.toxic.kc = c.random(),
          t.toxic.ra = c.random(),
          t.toxic.rb = c.random(),
          t.toxic.rc = c.mul(t.toxic.ra, t.toxic.rb),
          t.toxic.kbeta = c.random(),
          t.toxic.kgamma = c.random();
          const i = c.mul(t.toxic.kbeta, t.toxic.kgamma);
          t.vk_verifier.vk_a = u.affine(u.mulScalar(u.g, t.toxic.ka)),
          t.vk_verifier.vk_b = a.affine(a.mulScalar(a.g, t.toxic.kb)),
          t.vk_verifier.vk_c = u.affine(u.mulScalar(u.g, t.toxic.kc)),
          t.vk_verifier.vk_gb_1 = a.affine(a.mulScalar(a.g, i)),
          t.vk_verifier.vk_gb_2 = u.affine(u.mulScalar(u.g, i)),
          t.vk_verifier.vk_g = u.affine(u.mulScalar(u.g, t.toxic.kgamma));
          for (let i = 0; i < e.nVars; i++) {
              const e = c.mul(t.toxic.ra, r.a_t[i])
                , n = a.affine(a.mulScalar(a.g, e));
              t.vk_proof.A[i] = n,
              i <= t.vk_proof.nPublic && (t.vk_verifier.IC[i] = n);
              const o = c.mul(t.toxic.rb, r.b_t[i])
                , s = a.affine(a.mulScalar(a.g, o))
                , l = u.affine(u.mulScalar(u.g, o));
              t.vk_proof.B[i] = l;
              const h = c.mul(t.toxic.rc, r.c_t[i])
                , A = a.affine(a.mulScalar(a.g, h));
              t.vk_proof.C[i] = A;
              const f = c.affine(c.add(c.add(e, o), h))
                , p = a.affine(a.mulScalar(a.g, f));
              i > t.vk_proof.nPublic && (t.vk_proof.Ap[i] = a.affine(a.mulScalar(n, t.toxic.ka))),
              t.vk_proof.Bp[i] = a.affine(a.mulScalar(s, t.toxic.kb)),
              t.vk_proof.Cp[i] = a.affine(a.mulScalar(A, t.toxic.kc)),
              t.vk_proof.Kp[i] = a.affine(a.mulScalar(p, t.toxic.kbeta))
          }
          const n = a.mulScalar(a.g, c.mul(t.toxic.ra, r.z_t));
          t.vk_proof.A[e.nVars] = a.affine(n),
          t.vk_proof.Ap[e.nVars] = a.affine(a.mulScalar(n, t.toxic.ka));
          const o = a.mulScalar(a.g, c.mul(t.toxic.rb, r.z_t))
            , s = u.mulScalar(u.g, c.mul(t.toxic.rb, r.z_t));
          t.vk_proof.B[e.nVars] = u.affine(s),
          t.vk_proof.Bp[e.nVars] = a.affine(a.mulScalar(o, t.toxic.kb));
          const h = a.mulScalar(a.g, c.mul(t.toxic.rc, r.z_t));
          t.vk_proof.C[e.nVars] = a.affine(h),
          t.vk_proof.Cp[e.nVars] = a.affine(a.mulScalar(h, t.toxic.kc)),
          t.vk_proof.Kp[e.nVars] = a.affine(a.mulScalar(n, t.toxic.kbeta)),
          t.vk_proof.Kp[e.nVars + 1] = a.affine(a.mulScalar(o, t.toxic.kbeta)),
          t.vk_proof.Kp[e.nVars + 2] = a.affine(a.mulScalar(h, t.toxic.kbeta)),
          t.vk_verifier.vk_z = u.affine(u.mulScalar(u.g, c.mul(t.toxic.rc, r.z_t)))
      }(e, t),
      function(t) {
          const e = t.vk_proof.domainSize + 1;
          t.vk_proof.hExps = new Array(e),
          t.vk_proof.hExps[0] = a.g;
          let r = t.toxic.t;
          for (let i = 1; i < e; i++)
              t.vk_proof.hExps[i] = a.affine(a.mulScalar(a.g, r)),
              r = c.mul(r, t.toxic.t)
      }(e),
      e
  }
}
)),
parcelRequire.register("jMdZa", (function(t, e) {
  var r = parcelRequire("ltcvo")
    , i = parcelRequire("ffNX2")
    , n = parcelRequire("fJS0m")
    , o = parcelRequire("hcmod")
    , s = parcelRequire("f4hFT");
  t.exports = class {
      _preparePairing() {
          this.loopCount = r("29793968203157093288"),
          this.loopCount.isNegative() ? (this.loopCount = this.loopCount.neg(),
          this.loopCountNeg = !0) : this.loopCountNeg = !1;
          let t = this.loopCount;
          for (this.loop_count_bits = []; !t.isZero(); )
              this.loop_count_bits.push(t.isOdd()),
              t = t.shr(1);
          this.two_inv = this.F1.inverse(r(2)),
          this.coef_b = r(3),
          this.twist = [r(9), r(1)],
          this.twist_coeff_b = this.F2.mulScalar(this.F2.inverse(this.twist), this.coef_b),
          this.frobenius_coeffs_c1_1 = r("21888242871839275222246405745257275088696311157297823662689037894645226208582"),
          this.twist_mul_by_q_X = [r("21575463638280843010398324269430826099269044274347216827212613867836435027261"), r("10307601595873709700152284273816112264069230130616436755625194854815875713954")],
          this.twist_mul_by_q_Y = [r("2821565182194536844548159561693502659359617185244120367078079554186484126554"), r("3505843767911556378687030309984248845540243509899259641013678093033130930403")],
          this.final_exponent = r("552484233613224096312617126783173147097382103762957654188882734314196910839907541213974502761540629817009608548654680343627701153829446747810907373256841551006201639677726139946029199968412598804882391702273019083653272047566316584365559776493027495458238373902875937659943504873220554161550525926302303331747463515644711876653177129578303191095900909191624817826566688241804408081892785725967931714097716709526092261278071952560171111444072049229123565057483750161460024353346284167282452756217662335528813519139808291170539072125381230815729071544861602750936964829313608137325426383735122175229541155376346436093930287402089517426973178917569713384748081827255472576937471496195752727188261435633271238710131736096299798168852925540549342330775279877006784354801422249722573783561685179618816480037695005515426162362431072245638324744480")
      }
      pairing(t, e) {
          const r = this.precomputeG1(t)
            , i = this.precomputeG2(e)
            , n = this.millerLoop(r, i);
          return this.finalExponentiation(n)
      }
      precomputeG1(t) {
          const e = this.G1.affine(t)
            , r = {};
          return r.PX = e[0],
          r.PY = e[1],
          r
      }
      precomputeG2(t) {
          const e = this.G2.affine(t)
            , r = {
              QX: e[0],
              QY: e[1],
              coeffs: []
          }
            , i = {
              X: e[0],
              Y: e[1],
              Z: this.F2.one
          };
          let n;
          for (let t = this.loop_count_bits.length - 2; t >= 0; --t) {
              const o = this.loop_count_bits[t];
              n = this._doubleStep(i),
              r.coeffs.push(n),
              o && (n = this._addStep(e, i),
              r.coeffs.push(n))
          }
          const o = this.G2.affine(this._g2MulByQ(e));
          if (!this.F2.equals(o[2], this.F2.one))
              throw new Error("Expected values are not equal");
          const s = this.G2.affine(this._g2MulByQ(o));
          if (!this.F2.equals(s[2], this.F2.one))
              throw new Error("Expected values are not equal");
          return this.loopCountNeg && (i.Y = this.F2.neg(i.Y)),
          s[1] = this.F2.neg(s[1]),
          n = this._addStep(o, i),
          r.coeffs.push(n),
          n = this._addStep(s, i),
          r.coeffs.push(n),
          r
      }
      millerLoop(t, e) {
          let r, i = this.F12.one, n = 0;
          for (let o = this.loop_count_bits.length - 2; o >= 0; --o) {
              const s = this.loop_count_bits[o];
              r = e.coeffs[n++],
              i = this.F12.square(i),
              i = this._mul_by_024(i, r.ell_0, this.F2.mulScalar(r.ell_VW, t.PY), this.F2.mulScalar(r.ell_VV, t.PX)),
              s && (r = e.coeffs[n++],
              i = this._mul_by_024(i, r.ell_0, this.F2.mulScalar(r.ell_VW, t.PY), this.F2.mulScalar(r.ell_VV, t.PX)))
          }
          return this.loopCountNeg && (i = this.F12.inverse(i)),
          r = e.coeffs[n++],
          i = this._mul_by_024(i, r.ell_0, this.F2.mulScalar(r.ell_VW, t.PY), this.F2.mulScalar(r.ell_VV, t.PX)),
          r = e.coeffs[n++],
          i = this._mul_by_024(i, r.ell_0, this.F2.mulScalar(r.ell_VW, t.PY), this.F2.mulScalar(r.ell_VV, t.PX)),
          i
      }
      finalExponentiation(t) {
          return this.F12.exp(t, this.final_exponent)
      }
      _doubleStep(t) {
          const e = t.X
            , r = t.Y
            , i = t.Z
            , n = this.F2.mulScalar(this.F2.mul(e, r), this.two_inv)
            , o = this.F2.square(r)
            , s = this.F2.square(i)
            , a = this.F2.add(s, this.F2.add(s, s))
            , u = this.F2.mul(this.twist_coeff_b, a)
            , l = this.F2.add(u, this.F2.add(u, u))
            , c = this.F2.mulScalar(this.F2.add(o, l), this.two_inv)
            , h = this.F2.sub(this.F2.square(this.F2.add(r, i)), this.F2.add(o, s))
            , A = this.F2.sub(u, o)
            , f = this.F2.square(e)
            , p = this.F2.square(u);
          t.X = this.F2.mul(n, this.F2.sub(o, l)),
          t.Y = this.F2.sub(this.F2.sub(this.F2.square(c), p), this.F2.add(p, p)),
          t.Z = this.F2.mul(o, h);
          return {
              ell_0: this.F2.mul(A, this.twist),
              ell_VW: this.F2.neg(h),
              ell_VV: this.F2.add(f, this.F2.add(f, f))
          }
      }
      _addStep(t, e) {
          const r = e.X
            , i = e.Y
            , n = e.Z
            , o = t[0]
            , s = t[1]
            , a = this.F2.sub(r, this.F2.mul(o, n))
            , u = this.F2.sub(i, this.F2.mul(s, n))
            , l = this.F2.square(a)
            , c = this.F2.square(u)
            , h = this.F2.mul(a, l)
            , A = this.F2.mul(r, l)
            , f = this.F2.sub(this.F2.add(h, this.F2.mul(n, c)), this.F2.add(A, A));
          e.X = this.F2.mul(a, f),
          e.Y = this.F2.sub(this.F2.mul(u, this.F2.sub(A, f)), this.F2.mul(h, i)),
          e.Z = this.F2.mul(n, h);
          return {
              ell_0: this.F2.mul(this.twist, this.F2.sub(this.F2.mul(u, o), this.F2.mul(a, s))),
              ell_VV: this.F2.neg(u),
              ell_VW: a
          }
      }
      _mul_by_024(t, e, r, i) {
          let n = t[0][0]
            , o = t[0][1]
            , s = t[0][2]
            , a = t[1][0]
            , u = t[1][1]
            , l = t[1][2];
          const c = e
            , h = i
            , A = r
            , f = this.F2.mul(n, c)
            , p = this.F2.mul(s, h)
            , g = this.F2.mul(u, A)
            , d = this.F2.add(n, u);
          let I = this.F2.add(n, s);
          const m = this.F2.add(this.F2.add(o, a), l);
          let y = this.F2.mul(o, h)
            , w = this.F2.add(y, g)
            , C = this.F2.add(this.F2.mul(this.nonResidueF6, w), f);
          n = C,
          w = this.F2.mul(l, A),
          y = this.F2.add(y, w),
          w = this.F2.add(w, p),
          C = this.F2.mul(this.nonResidueF6, w),
          w = this.F2.mul(o, c),
          y = this.F2.add(y, w),
          C = this.F2.add(C, w),
          o = C;
          let E = this.F2.add(c, h);
          return w = this.F2.sub(this.F2.mul(I, E), this.F2.add(f, p)),
          C = this.F2.mul(a, A),
          y = this.F2.add(y, C),
          E = this.F2.add(s, u),
          s = this.F2.add(w, C),
          I = this.F2.add(h, A),
          w = this.F2.sub(this.F2.mul(E, I), this.F2.add(p, g)),
          C = this.F2.mul(this.nonResidueF6, w),
          w = this.F2.mul(a, c),
          y = this.F2.add(y, w),
          C = this.F2.add(C, w),
          a = C,
          w = this.F2.mul(l, h),
          y = this.F2.add(y, w),
          C = this.F2.mul(this.nonResidueF6, w),
          E = this.F2.add(c, A),
          w = this.F2.sub(this.F2.mul(d, E), this.F2.add(f, g)),
          C = this.F2.add(C, w),
          u = C,
          E = this.F2.add(this.F2.add(c, h), A),
          w = this.F2.sub(this.F2.mul(m, E), y),
          l = w,
          [[n, o, s], [a, u, l]]
      }
      _g2MulByQ(t) {
          const e = [t[0][0], this.F1.mul(t[0][1], this.frobenius_coeffs_c1_1)]
            , r = [t[1][0], this.F1.mul(t[1][1], this.frobenius_coeffs_c1_1)]
            , i = [t[2][0], this.F1.mul(t[2][1], this.frobenius_coeffs_c1_1)];
          return [this.F2.mul(this.twist_mul_by_q_X, e), this.F2.mul(this.twist_mul_by_q_Y, r), i]
      }
      constructor() {
          this.q = r("21888242871839275222246405745257275088696311157297823662689037894645226208583"),
          this.r = r("21888242871839275222246405745257275088548364400416034343698204186575808495617"),
          this.g1 = [r(1), r(2), r(1)],
          this.g2 = [[r("10857046999023057135944570762232829481370756359578518086990519993285655852781"), r("11559732032986387107991004021392285783925812861821192530917403151452391805634")], [r("8495653923123431417604973247489272438418190587263600148770280649306958101930"), r("4082367875863433681332203403145435568316851327593401208105741076214120093531")], [r("1"), r("0")]],
          this.nonResidueF2 = r("21888242871839275222246405745257275088696311157297823662689037894645226208582"),
          this.nonResidueF6 = [r("9"), r("1")],
          this.F1 = new i(this.q),
          this.F2 = new n(this.F1,this.nonResidueF2),
          this.G1 = new s(this.F1,this.g1),
          this.G2 = new s(this.F2,this.g2),
          this.F6 = new o(this.F2,this.nonResidueF6),
          this.F12 = new n(this.F6,this.nonResidueF6),
          this.Fr = new i(this.r);
          const t = this;
          this.F12._mulByNonResidue = function(e) {
              return [t.F2.mul(this.nonResidue, e[2]), e[0], e[1]]
          }
          ,
          this._preparePairing()
      }
  }
}
)),
parcelRequire.register("ffNX2", (function(t, e) {
  var r = parcelRequire("ltcvo")
    , i = parcelRequire("d8uVq");
  function n() {
      if ("undefined" != typeof window) {
          if (void 0 !== window.crypto) {
              let t = new Uint8Array(1);
              return window.crypto.getRandomValues(t),
              t[0]
          }
          return Math.floor(256 * Math.random())
      }
      return parcelRequire("6AcGf").randomBytes(1)[0]
  }
  t.exports = class {
      copy(t) {
          return r(t)
      }
      div(t, e) {
          return this.mul(t, this.inverse(e))
      }
      mulScalar(t, e) {
          return this.mul(t, r(e))
      }
      exp(t, e) {
          return i.exp(this, t, e)
      }
      toString(t) {
          return `"0x${this.affine(t).toString(16)}"`
      }
      random() {
          let t = r(0)
            , e = r(this.q);
          for (; !e.isZero(); )
              t = t.shl(8).add(r(n())),
              e = e.shr(8);
          return t
      }
      sqrt(t) {
          if ((t = this.affine(t)).equals(this.zero))
              return this.zero;
          if (!this.exp(t, this.minusone.shr(this.one)).equals(this.one))
              return null;
          let e = parseInt(this.s)
            , r = this.nqr_to_t
            , i = this.exp(t, this.t)
            , n = this.exp(t, this.add(this.t, this.one).shr(this.one));
          for (; !i.equals(this.one); ) {
              let t = this.square(i)
                , o = 1;
              for (; !t.equals(this.one); )
                  o++,
                  t = this.square(t);
              let s = r;
              for (let t = 0; t < e - o - 1; t++)
                  s = this.square(s);
              e = o,
              r = this.square(s),
              i = this.mul(i, r),
              n = this.mul(n, s)
          }
          return n.greater(this.q.shr(this.one)) && (n = this.neg(n)),
          n
      }
      constructor(t) {
          this.q = r(t),
          this.zero = r.zero,
          this.one = r.one,
          this.minusone = this.q.sub(this.one),
          this.add = r.genAdd(),
          this.double = r.genDouble(),
          this.sub = r.genSub(),
          this.neg = r.genNeg(),
          this.mul = r.genMul(t),
          this.inverse = r.genInverse(t),
          this.square = r.genSquare(t),
          this.equals = r.genEquals(t),
          this.affine = r.genAffine(t),
          this.isZero = r.genIsZero(t),
          this.two = this.add(this.one, this.one),
          this.twoinv = this.inverse(this.two);
          const e = this.minusone.shr(this.one);
          this.nqr = this.two;
          let i = this.exp(this.nqr, e);
          for (; !i.equals(this.minusone); )
              this.nqr = this.nqr.add(this.one),
              i = this.exp(this.nqr, e);
          for (this.s = this.zero,
          this.t = this.minusone; !this.t.isOdd(); )
              this.s = this.s.add(this.one),
              this.t = this.t.shr(this.one);
          this.nqr_to_t = this.exp(this.nqr, this.t)
      }
  }
}
)),
parcelRequire.register("d8uVq", (function(t, e) {
  var r, i;
  $parcel$export(t.exports, "mulScalar", (function() {
      return r
  }
  ), (function(t) {
      return r = t
  }
  )),
  $parcel$export(t.exports, "exp", (function() {
      return i
  }
  ), (function(t) {
      return i = t
  }
  ));
  var n = parcelRequire("ltcvo");
  r = (t,e,r)=>{
      let i = t.zero
        , o = n(r)
        , s = e;
      for (; !o.isZero(); )
          o.isOdd() && (i = t.add(i, s)),
          s = t.double(s),
          o = o.shr(1);
      return i
  }
  ,
  i = (t,e,r)=>{
      let i = t.one
        , o = n(r)
        , s = e;
      for (; !o.isZero(); )
          o.isOdd() && (i = t.mul(i, s)),
          s = t.square(s),
          o = o.shr(1);
      return i
  }
}
)),
parcelRequire.register("fJS0m", (function(t, e) {
  var r = parcelRequire("d8uVq");
  t.exports = class {
      _mulByNonResidue(t) {
          return this.F.mul(this.nonResidue, t)
      }
      copy(t) {
          return [this.F.copy(t[0]), this.F.copy(t[1])]
      }
      add(t, e) {
          return [this.F.add(t[0], e[0]), this.F.add(t[1], e[1])]
      }
      double(t) {
          return this.add(t, t)
      }
      sub(t, e) {
          return [this.F.sub(t[0], e[0]), this.F.sub(t[1], e[1])]
      }
      neg(t) {
          return this.sub(this.zero, t)
      }
      mul(t, e) {
          const r = this.F.mul(t[0], e[0])
            , i = this.F.mul(t[1], e[1]);
          return [this.F.add(r, this._mulByNonResidue(i)), this.F.sub(this.F.mul(this.F.add(t[0], t[1]), this.F.add(e[0], e[1])), this.F.add(r, i))]
      }
      inverse(t) {
          const e = this.F.square(t[0])
            , r = this.F.square(t[1])
            , i = this.F.sub(e, this._mulByNonResidue(r))
            , n = this.F.inverse(i);
          return [this.F.mul(t[0], n), this.F.neg(this.F.mul(t[1], n))]
      }
      div(t, e) {
          return this.mul(t, this.inverse(e))
      }
      square(t) {
          const e = this.F.mul(t[0], t[1]);
          return [this.F.sub(this.F.mul(this.F.add(t[0], t[1]), this.F.add(t[0], this._mulByNonResidue(t[1]))), this.F.add(e, this._mulByNonResidue(e))), this.F.add(e, e)]
      }
      isZero(t) {
          return this.F.isZero(t[0]) && this.F.isZero(t[1])
      }
      equals(t, e) {
          return this.F.equals(t[0], e[0]) && this.F.equals(t[1], e[1])
      }
      affine(t) {
          return [this.F.affine(t[0]), this.F.affine(t[1])]
      }
      mulScalar(t, e) {
          return r.mulScalar(this, t, e)
      }
      exp(t, e) {
          return r.exp(this, t, e)
      }
      toString(t) {
          const e = this.affine(t);
          return `[ ${this.F.toString(e[0])} , ${this.F.toString(e[1])} ]`
      }
      constructor(t, e) {
          this.F = t,
          this.zero = [this.F.zero, this.F.zero],
          this.one = [this.F.one, this.F.zero],
          this.nonResidue = e
      }
  }
}
)),
parcelRequire.register("hcmod", (function(t, e) {
  var r = parcelRequire("d8uVq");
  t.exports = class {
      _mulByNonResidue(t) {
          return this.F.mul(this.nonResidue, t)
      }
      copy(t) {
          return [this.F.copy(t[0]), this.F.copy(t[1]), this.F.copy(t[2])]
      }
      add(t, e) {
          return [this.F.add(t[0], e[0]), this.F.add(t[1], e[1]), this.F.add(t[2], e[2])]
      }
      double(t) {
          return this.add(t, t)
      }
      sub(t, e) {
          return [this.F.sub(t[0], e[0]), this.F.sub(t[1], e[1]), this.F.sub(t[2], e[2])]
      }
      neg(t) {
          return this.sub(this.zero, t)
      }
      mul(t, e) {
          const r = this.F.mul(t[0], e[0])
            , i = this.F.mul(t[1], e[1])
            , n = this.F.mul(t[2], e[2]);
          return [this.F.add(r, this._mulByNonResidue(this.F.sub(this.F.mul(this.F.add(t[1], t[2]), this.F.add(e[1], e[2])), this.F.add(i, n)))), this.F.add(this.F.sub(this.F.mul(this.F.add(t[0], t[1]), this.F.add(e[0], e[1])), this.F.add(r, i)), this._mulByNonResidue(n)), this.F.add(this.F.sub(this.F.mul(this.F.add(t[0], t[2]), this.F.add(e[0], e[2])), this.F.add(r, n)), i)]
      }
      inverse(t) {
          const e = this.F.square(t[0])
            , r = this.F.square(t[1])
            , i = this.F.square(t[2])
            , n = this.F.mul(t[0], t[1])
            , o = this.F.mul(t[0], t[2])
            , s = this.F.mul(t[1], t[2])
            , a = this.F.sub(e, this._mulByNonResidue(s))
            , u = this.F.sub(this._mulByNonResidue(i), n)
            , l = this.F.sub(r, o)
            , c = this.F.inverse(this.F.add(this.F.mul(t[0], a), this._mulByNonResidue(this.F.add(this.F.mul(t[2], u), this.F.mul(t[1], l)))));
          return [this.F.mul(c, a), this.F.mul(c, u), this.F.mul(c, l)]
      }
      div(t, e) {
          return this.mul(t, this.inverse(e))
      }
      square(t) {
          const e = this.F.square(t[0])
            , r = this.F.mul(t[0], t[1])
            , i = this.F.add(r, r)
            , n = this.F.square(this.F.add(this.F.sub(t[0], t[1]), t[2]))
            , o = this.F.mul(t[1], t[2])
            , s = this.F.add(o, o)
            , a = this.F.square(t[2]);
          return [this.F.add(e, this._mulByNonResidue(s)), this.F.add(i, this._mulByNonResidue(a)), this.F.sub(this.F.add(this.F.add(i, n), s), this.F.add(e, a))]
      }
      isZero(t) {
          return this.F.isZero(t[0]) && this.F.isZero(t[1]) && this.F.isZero(t[2])
      }
      equals(t, e) {
          return this.F.equals(t[0], e[0]) && this.F.equals(t[1], e[1]) && this.F.equals(t[2], e[2])
      }
      affine(t) {
          return [this.F.affine(t[0]), this.F.affine(t[1]), this.F.affine(t[2])]
      }
      mulScalar(t, e) {
          return r.mulScalar(this, t, e)
      }
      exp(t, e) {
          return r.exp(this, t, e)
      }
      toString(t) {
          const e = this.affine(t);
          return `[ ${this.F.toString(e[0])} , ${this.F.toString(e[1])}, ${this.F.toString(e[2])} ]`
      }
      constructor(t, e) {
          this.F = t,
          this.zero = [this.F.zero, this.F.zero, this.F.zero],
          this.one = [this.F.one, this.F.zero, this.F.zero],
          this.nonResidue = e
      }
  }
}
)),
parcelRequire.register("f4hFT", (function(t, e) {
  var r = parcelRequire("d8uVq");
  t.exports = class {
      isZero(t) {
          return this.F.isZero(t[2])
      }
      add(t, e) {
          const r = this.F;
          if (this.isZero(t))
              return e;
          if (this.isZero(e))
              return t;
          const i = new Array(3)
            , n = r.square(t[2])
            , o = r.square(e[2])
            , s = r.mul(t[0], o)
            , a = r.mul(e[0], n)
            , u = r.mul(t[2], n)
            , l = r.mul(e[2], o)
            , c = r.mul(t[1], l)
            , h = r.mul(e[1], u);
          if (r.equals(s, a) && r.equals(c, h))
              return this.double(t);
          const A = r.sub(a, s)
            , f = r.sub(h, c)
            , p = r.square(r.add(A, A))
            , g = r.mul(A, p)
            , d = r.add(f, f)
            , I = r.mul(s, p);
          i[0] = r.sub(r.sub(r.square(d), g), r.add(I, I));
          const m = r.mul(c, g);
          return i[1] = r.sub(r.mul(d, r.sub(I, i[0])), r.add(m, m)),
          i[2] = r.mul(A, r.sub(r.square(r.add(t[2], e[2])), r.add(n, o))),
          i
      }
      neg(t) {
          return [t[0], this.F.neg(t[1]), t[2]]
      }
      sub(t, e) {
          return this.add(t, this.neg(e))
      }
      double(t) {
          const e = this.F
            , r = new Array(3);
          if (this.isZero(t))
              return t;
          const i = e.square(t[0])
            , n = e.square(t[1])
            , o = e.square(n);
          let s = e.sub(e.square(e.add(t[0], n)), e.add(i, o));
          s = e.add(s, s);
          const a = e.add(e.add(i, i), i)
            , u = e.square(a);
          r[0] = e.sub(u, e.add(s, s));
          let l = e.add(o, o);
          l = e.add(l, l),
          l = e.add(l, l),
          r[1] = e.sub(e.mul(a, e.sub(s, r[0])), l);
          const c = e.mul(t[1], t[2]);
          return r[2] = e.add(c, c),
          r
      }
      mulScalar(t, e) {
          return r.mulScalar(this, t, e)
      }
      affine(t) {
          const e = this.F;
          if (this.isZero(t))
              return this.zero;
          {
              const r = e.inverse(t[2])
                , i = e.square(r)
                , n = e.mul(i, r)
                , o = new Array(3);
              return o[0] = e.affine(e.mul(t[0], i)),
              o[1] = e.affine(e.mul(t[1], n)),
              o[2] = e.one,
              o
          }
      }
      equals(t, e) {
          const r = this.F;
          if (this.isZero(t))
              return this.isZero(e);
          if (this.isZero(e))
              return this.isZero(t);
          const i = r.square(t[2])
            , n = r.square(e[2])
            , o = r.mul(t[0], n)
            , s = r.mul(e[0], i)
            , a = r.mul(t[2], i)
            , u = r.mul(e[2], n)
            , l = r.mul(t[1], u)
            , c = r.mul(e[1], a);
          return r.equals(o, s) && r.equals(l, c)
      }
      toString(t) {
          const e = this.affine(t);
          return `[ ${this.F.toString(e[0])} , ${this.F.toString(e[1])} ]`
      }
      constructor(t, e) {
          this.F = t,
          this.g = [t.copy(e[0]), t.copy(e[1])],
          2 == this.g.length && (this.g[2] = this.F.one),
          this.zero = [this.F.zero, this.F.one, this.F.zero]
      }
  }
}
)),
parcelRequire.register("6G9qq", (function(t, e) {
  var r = parcelRequire("ltcvo");
  function i(t) {
      return (0 != (4294901760 & t) ? (t &= 4294901760,
      16) : 0) | (0 != (4278255360 & t) ? (t &= 4278255360,
      8) : 0) | (0 != (4042322160 & t) ? (t &= 4042322160,
      4) : 0) | (0 != (3435973836 & t) ? (t &= 3435973836,
      2) : 0) | 0 != (2863311530 & t)
  }
  function n(t, e, r, i, o) {
      const s = 1 << r;
      if (1 == s)
          return [e[i]];
      if (2 == s)
          return [t.F.add(e[i], e[i + o]), t.F.sub(e[i], e[i + o])];
      const a = s >> 1
        , u = n(t, e, r - 1, i, 2 * o)
        , l = n(t, e, r - 1, i + o, 2 * o)
        , c = new Array(s);
      for (let e = 0; e < a; e++)
          c[e] = t.F.add(u[e], t.F.mul(t.roots[r][e], l[e])),
          c[e + a] = t.F.sub(u[e], t.F.mul(t.roots[r][e], l[e]));
      return c
  }
  t.exports = class {
      _setRoots(t) {
          for (let e = t; e >= 0 && !this.roots[e]; e--) {
              let t = this.F.one;
              const r = 1 << e
                , i = new Array(r);
              for (let n = 0; n < r; n++)
                  i[n] = t,
                  t = this.F.mul(t, this.w[e]);
              this.roots[e] = i
          }
      }
      add(t, e) {
          const r = Math.max(t.length, e.length)
            , i = new Array(r);
          for (let n = 0; n < r; n++)
              i[n] = this.F.add(t[n] || this.F.zero, e[n] || this.F.zero);
          return this.reduce(i)
      }
      double(t) {
          return this.add(t, t)
      }
      sub(t, e) {
          const r = Math.max(t.length, e.length)
            , i = new Array(r);
          for (let n = 0; n < r; n++)
              i[n] = this.F.sub(t[n] || this.F.zero, e[n] || this.F.zero);
          return this.reduce(i)
      }
      mulScalar(t, e) {
          if (this.F.isZero(e))
              return [];
          if (this.F.equals(e, this.F.one))
              return t;
          const r = new Array(t.length);
          for (let i = 0; i < t.length; i++)
              r[i] = this.F.mul(t[i], e);
          return r
      }
      mul(t, e) {
          return 0 == t.length || 0 == e.length ? [] : 1 == t.length ? this.mulScalar(e, t[0]) : 1 == e.length ? this.mulScalar(t, e[0]) : (e.length > t.length && ([e,t] = [t, e]),
          e.length <= 2 || e.length < i(t.length) ? this.mulNormal(t, e) : this.mulFFT(t, e))
      }
      mulNormal(t, e) {
          let r = [];
          e = this.affine(e);
          for (let i = 0; i < e.length; i++)
              r = this.add(r, this.scaleX(this.mulScalar(t, e[i]), i));
          return r
      }
      mulFFT(t, e) {
          const r = i(Math.max(t.length, e.length) - 1) + 2;
          this._setRoots(r);
          const o = 1 << r
            , s = this.extend(t, o)
            , a = this.extend(e, o)
            , u = n(this, s, r, 0, 1)
            , l = n(this, a, r, 0, 1)
            , c = new Array(o);
          for (let t = 0; t < o; t++)
              c[t] = this.F.mul(u[t], l[t]);
          const h = n(this, c, r, 0, 1)
            , A = this.F.inverse(this.F.mulScalar(this.F.one, o))
            , f = new Array(o);
          for (let t = 0; t < o; t++)
              f[t] = this.F.mul(h[(o - t) % o], A);
          return this.reduce(this.affine(f))
      }
      square(t) {
          return this.mul(t, t)
      }
      scaleX(t, e) {
          if (0 == e)
              return t;
          if (e > 0) {
              return new Array(e).fill(this.F.zero).concat(t)
          }
          return -e >= t.length ? [] : t.slice(-e)
      }
      eval2(t, e) {
          let r = this.F.zero
            , i = this.F.one;
          for (let n = 0; n < t.length; n++)
              r = this.F.add(r, this.F.mul(t[n], i)),
              i = this.F.mul(i, e);
          return r
      }
      eval(t, e) {
          const r = this.F;
          if (0 == t.length)
              return r.zero;
          const i = this._next2Power(t.length);
          return function t(e, i, n, o, s) {
              if (1 == s)
                  return e[n];
              const a = r.square(i)
                , u = r.add(t(e, a, n, o << 1, s >> 1), r.mul(i, t(e, a, n + o, o << 1, s >> 1)));
              return u
          }(this.extend(t, i), e, 0, 1, i)
      }
      lagrange(t) {
          let e = [this.F.one];
          for (let r = 0; r < t.length; r++)
              e = this.mul(e, [this.F.neg(t[r][0]), this.F.one]);
          let r = [];
          for (let i = 0; i < t.length; i++) {
              let n = this.ruffini(e, t[i][0]);
              const o = this.F.mul(this.F.inverse(this.eval(n, t[i][0])), t[i][1]);
              n = this.mulScalar(n, o),
              r = this.add(r, n)
          }
          return r
      }
      fft(t) {
          if (t.length <= 1)
              return t;
          const e = i(t.length - 1) + 1;
          this._setRoots(e);
          const r = 1 << e;
          return n(this, this.extend(t, r), e, 0, 1)
      }
      ifft(t) {
          if (t.length <= 1)
              return t;
          const e = i(t.length - 1) + 1;
          this._setRoots(e);
          const r = 1 << e
            , o = n(this, this.extend(t, r), e, 0, 1)
            , s = this.F.inverse(this.F.mulScalar(this.F.one, r))
            , a = new Array(r);
          for (let t = 0; t < r; t++)
              a[t] = this.F.mul(o[(r - t) % r], s);
          return a
      }
      _fft(t, e, r, i) {
          const n = 1 << e;
          if (1 == n)
              return [t[r]];
          const o = n >> 1
            , s = this._fft(t, e - 1, r, 2 * i)
            , a = this._fft(t, e - 1, r + i, 2 * i)
            , u = new Array(n);
          let l = this.F.one;
          for (let t = 0; t < o; t++)
              u[t] = this.F.add(s[t], this.F.mul(l, a[t])),
              u[t + o] = this.F.sub(s[t], this.F.mul(l, a[t])),
              l = this.F.mul(l, this.w[e]);
          return u
      }
      extend(t, e) {
          if (e == t.length)
              return t;
          const r = new Array(e - t.length).fill(this.F.zero);
          return t.concat(r)
      }
      reduce(t) {
          if (0 == t.length)
              return t;
          if (!this.F.isZero(t[t.length - 1]))
              return t;
          let e = t.length - 1;
          for (; e > 0 && this.F.isZero(t[e]); )
              e--;
          return t.slice(0, e + 1)
      }
      affine(t) {
          for (let e = 0; e < t.length; e++)
              t[e] = this.F.affine(t[e]);
          return t
      }
      equals(t, e) {
          const r = this.reduce(this.affine(t))
            , i = this.reduce(this.affine(e));
          if (r.length != i.length)
              return !1;
          for (let t = 0; t < i.length; t++)
              if (!this.F.equals(r[t], i[t]))
                  return !1;
          return !0
      }
      ruffini(t, e) {
          const r = new Array(t.length - 1);
          r[r.length - 1] = t[t.length - 1];
          for (let i = r.length - 2; i >= 0; i--)
              r[i] = this.F.add(this.F.mul(r[i + 1], e), t[i + 1]);
          return r
      }
      _next2Power(t) {
          return t--,
          t |= t >> 1,
          t |= t >> 2,
          t |= t >> 4,
          t |= t >> 8,
          t |= t >> 16,
          ++t
      }
      toString(t) {
          let e = "";
          for (let r = this.affine(t).length - 1; r >= 0; r--)
              this.F.isZero(t[r]) || ("" != e && (e += " + "),
              e += t[r].toString(10),
              r > 0 && (e += "x",
              r > 1 && (e = e + "^" + r)));
          return e
      }
      _reciprocal(t, e) {
          const r = 1 << e;
          if (1 == r)
              return [this.F.inverse(t[0])];
          const i = this.scaleX(t, -r / 2)
            , n = this._reciprocal(i, e - 1)
            , o = this.scaleX(this.double(n), 3 * r / 2 - 2)
            , s = this.mul(this.square(n), t);
          return this.scaleX(this.sub(o, s), -(r - 2))
      }
      _div2(t, e) {
          const r = i(e.length - 1) + 1
            , n = 1 << r
            , o = n - e.length
            , s = this._reciprocal(this.scaleX(e, o), r);
          return this.scaleX(s, t - 2 * n + 2 + o)
      }
      div(t, e) {
          if (t.length < e.length)
              return [];
          const r = i(e.length - 1) + 1
            , n = 1 << r
            , o = this.scaleX(t, n - e.length)
            , s = this.scaleX(e, n - e.length)
            , a = s.length - 1;
          let u = o.length - 1;
          const l = this._reciprocal(s, r);
          let c;
          u > 2 * a && (c = this.sub(this.scaleX([this.F.one], 2 * a), this.mul(l, s)));
          let h, A, f = [], p = o, g = !1;
          for (; !g; )
              h = this.mul(p, l),
              f = this.add(f, this.scaleX(h, -2 * a)),
              u > 2 * a ? (A = this.mul(p, c),
              p = this.scaleX(A, -2 * a),
              u = p.length - 1) : g = !0;
          return f
      }
      oneRoot(t, e) {
          let r = i(t - 1) + 1
            , n = this.F.one
            , o = e;
          if (e >= t)
              throw new Error("Given 'i' should be lower than 'n'");
          if (1 << r !== t)
              throw new Error(`Internal errlr: ${t} should equal ${1 << r}`);
          for (; o > 0; )
              !0 & o && (n = this.F.mul(n, this.w[r])),
              o >>= 1,
              r--;
          return n
      }
      computeVanishingPolinomial(t, e) {
          const i = 1 << t;
          return this.F.sub(this.F.exp(e, r(i)), this.F.one)
      }
      evaluateLagrangePolynomials(t, e) {
          const i = 1 << t
            , n = this.F.exp(e, r(i))
            , o = new Array(i).fill(this.F.zero);
          this._setRoots(t);
          const s = this.w[t];
          if (this.F.equals(n, this.F.one))
              for (let r = 0; r < i; r++)
                  if (this.F.equals(this.roots[t][0], e))
                      return o[r] = this.F.one,
                      o;
          const a = this.F.sub(n, this.F.one);
          let u = this.F.mul(a, this.F.inverse(r(i)));
          for (let r = 0; r < i; r++)
              o[r] = this.F.mul(u, this.F.inverse(this.F.sub(e, this.roots[t][r]))),
              u = this.F.mul(u, s);
          return o
      }
      log2(t) {
          return i(t)
      }
      constructor(t) {
          this.F = t;
          let e = this.F.q.sub(r(1))
            , i = 0;
          for (; !e.isOdd(); )
              i++,
              e = e.shr(1);
          const n = this.F.add(this.F.add(this.F.two, this.F.two), this.F.one);
          this.w = new Array(i + 1),
          this.wi = new Array(i + 1),
          this.w[i] = this.F.exp(n, e),
          this.wi[i] = this.F.inverse(this.w[i]);
          let o = i - 1;
          for (; o >= 0; )
              this.w[o] = this.F.square(this.w[o + 1]),
              this.wi[o] = this.F.square(this.wi[o + 1]),
              o--;
          this.roots = [],
          this._setRoots(15)
      }
  }
}
)),
parcelRequire.register("5ZCzi", (function(t, e) {
  var r = parcelRequire("jMdZa")
    , i = parcelRequire("6G9qq")
    , n = parcelRequire("ffNX2");
  const o = new r
    , s = new i(new n(o.r))
    , a = o.G1
    , u = o.G2;
  t.exports = function(t, e) {
      const r = {}
        , i = s.F.random()
        , n = s.F.random()
        , o = s.F.random();
      r.pi_a = a.zero,
      r.pi_ap = a.zero,
      r.pi_b = u.zero,
      r.pi_bp = a.zero,
      r.pi_c = a.zero,
      r.pi_cp = a.zero,
      r.pi_kp = a.zero,
      r.pi_h = a.zero;
      for (let i = t.nPublic + 1; i < t.nVars; i++)
          r.pi_a = a.add(r.pi_a, a.mulScalar(t.A[i], e[i])),
          r.pi_ap = a.add(r.pi_ap, a.mulScalar(t.Ap[i], e[i]));
      for (let i = 0; i < t.nVars; i++)
          r.pi_b = u.add(r.pi_b, u.mulScalar(t.B[i], e[i])),
          r.pi_bp = a.add(r.pi_bp, a.mulScalar(t.Bp[i], e[i])),
          r.pi_c = a.add(r.pi_c, a.mulScalar(t.C[i], e[i])),
          r.pi_cp = a.add(r.pi_cp, a.mulScalar(t.Cp[i], e[i])),
          r.pi_kp = a.add(r.pi_kp, a.mulScalar(t.Kp[i], e[i]));
      r.pi_a = a.add(r.pi_a, a.mulScalar(t.A[t.nVars], i)),
      r.pi_ap = a.add(r.pi_ap, a.mulScalar(t.Ap[t.nVars], i)),
      r.pi_b = u.add(r.pi_b, u.mulScalar(t.B[t.nVars], n)),
      r.pi_bp = a.add(r.pi_bp, a.mulScalar(t.Bp[t.nVars], n)),
      r.pi_c = a.add(r.pi_c, a.mulScalar(t.C[t.nVars], o)),
      r.pi_cp = a.add(r.pi_cp, a.mulScalar(t.Cp[t.nVars], o)),
      r.pi_kp = a.add(r.pi_kp, a.mulScalar(t.Kp[t.nVars], i)),
      r.pi_kp = a.add(r.pi_kp, a.mulScalar(t.Kp[t.nVars + 1], n)),
      r.pi_kp = a.add(r.pi_kp, a.mulScalar(t.Kp[t.nVars + 2], o));
      const l = function(t, e, r, i, n) {
          const o = s.F
            , a = t.domainSize
            , u = new Array(a).fill(s.F.zero)
            , l = new Array(a).fill(s.F.zero)
            , c = new Array(a).fill(s.F.zero);
          for (let r = 0; r < t.nVars; r++) {
              for (let i in t.polsA[r])
                  u[i] = o.add(u[i], o.mul(e[r], t.polsA[r][i]));
              for (let i in t.polsB[r])
                  l[i] = o.add(l[i], o.mul(e[r], t.polsB[r][i]));
              for (let i in t.polsC[r])
                  c[i] = o.add(c[i], o.mul(e[r], t.polsC[r][i]))
          }
          const h = s.ifft(u)
            , A = s.ifft(l)
            , f = s.mul(h, A)
            , p = s.ifft(c)
            , g = s.sub(f, p)
            , d = new Array(a + 1).fill(o.zero);
          d[a] = o.one,
          d[0] = o.neg(o.one);
          let I = s.div(g, d);
          I = s.extend(I, a + 1);
          for (let t = 0; t < a; t++) {
              const e = s.F.mul(i, h[t])
                , n = s.F.mul(r, A[t]);
              I[t] = s.F.add(I[t], s.F.add(e, n))
          }
          I[0] = s.F.sub(I[0], n);
          const m = s.F.mul(r, i);
          return I[a] = s.F.add(I[a], m),
          I[0] = s.F.sub(I[0], m),
          I = s.reduce(s.affine(I)),
          I
      }(t, e, i, n, o);
      for (let e = 0; e < l.length; e++)
          r.pi_h = a.add(r.pi_h, a.mulScalar(t.hExps[e], l[e]));
      r.pi_a = a.affine(r.pi_a),
      r.pi_b = u.affine(r.pi_b),
      r.pi_c = a.affine(r.pi_c),
      r.pi_ap = a.affine(r.pi_ap),
      r.pi_bp = a.affine(r.pi_bp),
      r.pi_cp = a.affine(r.pi_cp),
      r.pi_kp = a.affine(r.pi_kp),
      r.pi_h = a.affine(r.pi_h),
      r.protocol = "original";
      return {
          proof: r,
          publicSignals: e.slice(1, t.nPublic + 1)
      }
  }
}
)),
parcelRequire.register("kLuE7", (function(t, e) {
  const r = new (parcelRequire("jMdZa"))
    , i = r.G1
    , n = r.G2;
  t.exports = function(t, e, o) {
      let s = t.IC[0];
      for (let e = 0; e < t.nPublic; e++)
          s = i.add(s, i.mulScalar(t.IC[e + 1], o[e]));
      return s = i.add(s, e.pi_a),
      !!r.F12.equals(r.pairing(e.pi_a, t.vk_a), r.pairing(e.pi_ap, n.g)) && (!!r.F12.equals(r.pairing(t.vk_b, e.pi_b), r.pairing(e.pi_bp, n.g)) && (!!r.F12.equals(r.pairing(e.pi_c, t.vk_c), r.pairing(e.pi_cp, n.g)) && (!!r.F12.equals(r.F12.mul(r.pairing(i.add(s, e.pi_c), t.vk_gb_2), r.pairing(t.vk_gb_1, e.pi_b)), r.pairing(e.pi_kp, t.vk_g)) && !!r.F12.equals(r.pairing(s, e.pi_b), r.F12.mul(r.pairing(e.pi_h, t.vk_z), r.pairing(e.pi_c, n.g))))))
  }
}
)),
parcelRequire.register("9zpLd", (function(t, e) {
  var r = parcelRequire("ltcvo")
    , i = parcelRequire("jMdZa")
    , n = parcelRequire("6G9qq")
    , o = parcelRequire("ffNX2");
  const s = new i
    , a = s.G1
    , u = s.G2
    , l = new n(new o(s.r))
    , c = new o(s.r);
  t.exports = function(t) {
      const e = {
          vk_proof: {
              protocol: "groth",
              nVars: t.nVars,
              nPublic: t.nPubInputs + t.nOutputs
          },
          vk_verifier: {
              protocol: "groth",
              nPublic: t.nPubInputs + t.nOutputs
          },
          toxic: {}
      };
      return e.vk_proof.domainBits = l.log2(t.nConstraints + t.nPubInputs + t.nOutputs + 1 - 1) + 1,
      e.vk_proof.domainSize = 1 << e.vk_proof.domainBits,
      function(t, e) {
          t.vk_proof.polsA = new Array(e.nVars),
          t.vk_proof.polsB = new Array(e.nVars),
          t.vk_proof.polsC = new Array(e.nVars);
          for (let r = 0; r < e.nVars; r++)
              t.vk_proof.polsA[r] = {},
              t.vk_proof.polsB[r] = {},
              t.vk_proof.polsC[r] = {};
          for (let i = 0; i < e.nConstraints; i++) {
              for (let n in e.constraints[i][0])
                  t.vk_proof.polsA[n][i] = r(e.constraints[i][0][n]);
              for (let n in e.constraints[i][1])
                  t.vk_proof.polsB[n][i] = r(e.constraints[i][1][n]);
              for (let n in e.constraints[i][2])
                  t.vk_proof.polsC[n][i] = r(e.constraints[i][2][n])
          }
          for (let r = 0; r < e.nPubInputs + e.nOutputs + 1; ++r)
              t.vk_proof.polsA[r][e.nConstraints + r] = c.one
      }(e, t),
      e.toxic.t = c.random(),
      function(t, e) {
          const r = function(t, e) {
              const r = l.computeVanishingPolinomial(t.vk_proof.domainBits, t.toxic.t)
                , i = l.evaluateLagrangePolynomials(t.vk_proof.domainBits, t.toxic.t)
                , n = new Array(e.nVars).fill(c.zero)
                , o = new Array(e.nVars).fill(c.zero)
                , s = new Array(e.nVars).fill(c.zero);
              for (let r = 0; r < e.nVars; r++) {
                  for (let e in t.vk_proof.polsA[r])
                      n[r] = c.add(n[r], c.mul(i[e], t.vk_proof.polsA[r][e]));
                  for (let e in t.vk_proof.polsB[r])
                      o[r] = c.add(o[r], c.mul(i[e], t.vk_proof.polsB[r][e]));
                  for (let e in t.vk_proof.polsC[r])
                      s[r] = c.add(s[r], c.mul(i[e], t.vk_proof.polsC[r][e]))
              }
              return {
                  a_t: n,
                  b_t: o,
                  c_t: s,
                  z_t: r
              }
          }(t, e);
          t.vk_proof.A = new Array(e.nVars),
          t.vk_proof.B1 = new Array(e.nVars),
          t.vk_proof.B2 = new Array(e.nVars),
          t.vk_proof.C = new Array(e.nVars),
          t.vk_verifier.IC = new Array(e.nPublic),
          t.toxic.kalfa = c.random(),
          t.toxic.kbeta = c.random(),
          t.toxic.kgamma = c.random(),
          t.toxic.kdelta = c.random();
          let i = c.inverse(t.toxic.kdelta)
            , n = c.inverse(t.toxic.kgamma);
          t.vk_proof.vk_alfa_1 = a.affine(a.mulScalar(a.g, t.toxic.kalfa)),
          t.vk_proof.vk_beta_1 = a.affine(a.mulScalar(a.g, t.toxic.kbeta)),
          t.vk_proof.vk_delta_1 = a.affine(a.mulScalar(a.g, t.toxic.kdelta)),
          t.vk_proof.vk_beta_2 = u.affine(u.mulScalar(u.g, t.toxic.kbeta)),
          t.vk_proof.vk_delta_2 = u.affine(u.mulScalar(u.g, t.toxic.kdelta)),
          t.vk_verifier.vk_alfa_1 = a.affine(a.mulScalar(a.g, t.toxic.kalfa)),
          t.vk_verifier.vk_beta_2 = u.affine(u.mulScalar(u.g, t.toxic.kbeta)),
          t.vk_verifier.vk_gamma_2 = u.affine(u.mulScalar(u.g, t.toxic.kgamma)),
          t.vk_verifier.vk_delta_2 = u.affine(u.mulScalar(u.g, t.toxic.kdelta)),
          t.vk_verifier.vk_alfabeta_12 = s.F12.affine(s.pairing(t.vk_verifier.vk_alfa_1, t.vk_verifier.vk_beta_2));
          for (let i = 0; i < e.nVars; i++) {
              const e = a.affine(a.mulScalar(a.g, r.a_t[i]));
              t.vk_proof.A[i] = e;
              const n = a.affine(a.mulScalar(a.g, r.b_t[i]));
              t.vk_proof.B1[i] = n;
              const o = u.affine(u.mulScalar(u.g, r.b_t[i]));
              t.vk_proof.B2[i] = o
          }
          for (let e = 0; e <= t.vk_proof.nPublic; e++) {
              let i = c.mul(n, c.add(c.add(c.mul(r.a_t[e], t.toxic.kbeta), c.mul(r.b_t[e], t.toxic.kalfa)), r.c_t[e]));
              const o = a.affine(a.mulScalar(a.g, i));
              t.vk_verifier.IC[e] = o
          }
          for (let n = t.vk_proof.nPublic + 1; n < e.nVars; n++) {
              let e = c.mul(i, c.add(c.add(c.mul(r.a_t[n], t.toxic.kbeta), c.mul(r.b_t[n], t.toxic.kalfa)), r.c_t[n]));
              const o = a.affine(a.mulScalar(a.g, e));
              t.vk_proof.C[n] = o
          }
          const o = t.vk_proof.domainSize + 1;
          t.vk_proof.hExps = new Array(o);
          const h = c.mul(i, r.z_t);
          t.vk_proof.hExps[0] = a.affine(a.mulScalar(a.g, h));
          let A = t.toxic.t;
          for (let e = 1; e < o; e++)
              t.vk_proof.hExps[e] = a.affine(a.mulScalar(a.g, c.mul(A, h))),
              A = c.mul(A, t.toxic.t)
      }(e, t),
      e
  }
}
)),
parcelRequire.register("e5PkR", (function(t, e) {
  var r = parcelRequire("jMdZa")
    , i = parcelRequire("6G9qq")
    , n = parcelRequire("ffNX2");
  const o = new r
    , s = new i(new n(o.r))
    , a = o.G1
    , u = o.G2;
  t.exports = function(t, e) {
      const r = {}
        , i = s.F.random()
        , n = s.F.random();
      r.pi_a = a.zero,
      r.pi_b = u.zero,
      r.pi_c = a.zero;
      let o = a.zero;
      for (let i = 0; i < t.nVars; i++)
          r.pi_a = a.add(r.pi_a, a.mulScalar(t.A[i], e[i])),
          r.pi_b = u.add(r.pi_b, u.mulScalar(t.B2[i], e[i])),
          o = a.add(o, a.mulScalar(t.B1[i], e[i]));
      for (let i = t.nPublic + 1; i < t.nVars; i++)
          r.pi_c = a.add(r.pi_c, a.mulScalar(t.C[i], e[i]));
      r.pi_a = a.add(r.pi_a, t.vk_alfa_1),
      r.pi_a = a.add(r.pi_a, a.mulScalar(t.vk_delta_1, i)),
      r.pi_b = u.add(r.pi_b, t.vk_beta_2),
      r.pi_b = u.add(r.pi_b, u.mulScalar(t.vk_delta_2, n)),
      o = a.add(o, t.vk_beta_1),
      o = a.add(o, a.mulScalar(t.vk_delta_1, n));
      const l = function(t, e) {
          const r = s.F
            , i = t.domainSize
            , n = new Array(i).fill(s.F.zero)
            , o = new Array(i).fill(s.F.zero)
            , a = new Array(i).fill(s.F.zero);
          for (let i = 0; i < t.nVars; i++) {
              for (let o in t.polsA[i])
                  n[o] = r.add(n[o], r.mul(e[i], t.polsA[i][o]));
              for (let n in t.polsB[i])
                  o[n] = r.add(o[n], r.mul(e[i], t.polsB[i][n]));
              for (let n in t.polsC[i])
                  a[n] = r.add(a[n], r.mul(e[i], t.polsC[i][n]))
          }
          const u = s.ifft(n)
            , l = s.ifft(o)
            , c = s.mul(u, l)
            , h = s.ifft(a)
            , A = s.sub(c, h);
          return A.slice(i)
      }(t, e);
      for (let e = 0; e < l.length; e++)
          r.pi_c = a.add(r.pi_c, a.mulScalar(t.hExps[e], l[e]));
      r.pi_c = a.add(r.pi_c, a.mulScalar(r.pi_a, n)),
      r.pi_c = a.add(r.pi_c, a.mulScalar(o, i)),
      r.pi_c = a.add(r.pi_c, a.mulScalar(t.vk_delta_1, s.F.affine(s.F.neg(s.F.mul(i, n)))));
      const c = e.slice(1, t.nPublic + 1);
      return r.pi_a = a.affine(r.pi_a),
      r.pi_b = u.affine(r.pi_b),
      r.pi_c = a.affine(r.pi_c),
      r.protocol = "groth",
      {
          proof: r,
          publicSignals: c
      }
  }
}
)),
parcelRequire.register("2blQA", (function(t, e) {
  const r = new (parcelRequire("jMdZa"))
    , i = r.G1;
  t.exports = function(t, e, n) {
      let o = t.IC[0];
      for (let e = 0; e < t.nPublic; e++)
          o = i.add(o, i.mulScalar(t.IC[e + 1], n[e]));
      return !!r.F12.equals(r.pairing(e.pi_a, e.pi_b), r.F12.mul(t.vk_alfabeta_12, r.F12.mul(r.pairing(o, t.vk_gamma_2), r.pairing(e.pi_c, t.vk_delta_2))))
  }
}
)),
parcelRequire.register("i7fRS", (function(t, e) {
  var r = parcelRequire("ltcvo")
    , i = parcelRequire("jMdZa")
    , n = parcelRequire("6G9qq")
    , o = parcelRequire("ffNX2");
  const s = new i
    , a = s.G1
    , u = s.G2
    , l = new n(new o(s.r))
    , c = new o(s.r);
  t.exports = function(t) {
      const e = {
          vk_proof: {
              protocol: "groth",
              nVars: t.nVars,
              nPublic: t.nPubInputs + t.nOutputs
          },
          vk_verifier: {
              protocol: "groth",
              nPublic: t.nPubInputs + t.nOutputs
          },
          toxic: {}
      };
      return e.vk_proof.domainBits = l.log2(t.nConstraints + t.nPubInputs + t.nOutputs + 1 - 1) + 1,
      e.vk_proof.domainSize = 1 << e.vk_proof.domainBits,
      function(t, e) {
          t.vk_proof.polsA = new Array(e.nVars),
          t.vk_proof.polsB = new Array(e.nVars),
          t.vk_proof.polsC = new Array(e.nVars);
          for (let r = 0; r < e.nVars; r++)
              t.vk_proof.polsA[r] = {},
              t.vk_proof.polsB[r] = {},
              t.vk_proof.polsC[r] = {};
          for (let i = 0; i < e.nConstraints; i++) {
              for (let n in e.constraints[i][0])
                  t.vk_proof.polsA[n][i] = r(e.constraints[i][0][n]);
              for (let n in e.constraints[i][1])
                  t.vk_proof.polsB[n][i] = r(e.constraints[i][1][n]);
              for (let n in e.constraints[i][2])
                  t.vk_proof.polsC[n][i] = r(e.constraints[i][2][n])
          }
          for (let r = 0; r < e.nPubInputs + e.nOutputs + 1; ++r)
              t.vk_proof.polsA[r][e.nConstraints + r] = c.one
      }(e, t),
      e.toxic.t = c.random(),
      function(t, e) {
          const r = function(t, e) {
              const r = l.computeVanishingPolinomial(t.vk_proof.domainBits, t.toxic.t)
                , i = l.evaluateLagrangePolynomials(t.vk_proof.domainBits, t.toxic.t)
                , n = new Array(e.nVars).fill(c.zero)
                , o = new Array(e.nVars).fill(c.zero)
                , s = new Array(e.nVars).fill(c.zero);
              for (let r = 0; r < e.nVars; r++) {
                  for (let e in t.vk_proof.polsA[r])
                      n[r] = c.add(n[r], c.mul(i[e], t.vk_proof.polsA[r][e]));
                  for (let e in t.vk_proof.polsB[r])
                      o[r] = c.add(o[r], c.mul(i[e], t.vk_proof.polsB[r][e]));
                  for (let e in t.vk_proof.polsC[r])
                      s[r] = c.add(s[r], c.mul(i[e], t.vk_proof.polsC[r][e]))
              }
              return {
                  a_t: n,
                  b_t: o,
                  c_t: s,
                  z_t: r
              }
          }(t, e);
          t.vk_proof.A = new Array(e.nVars),
          t.vk_proof.Adelta = new Array(e.nVars),
          t.vk_proof.B1 = new Array(e.nVars),
          t.vk_proof.B2 = new Array(e.nVars),
          t.vk_proof.C = new Array(e.nVars),
          t.vk_verifier.IC = new Array(e.nPublic),
          t.toxic.kalfa = c.random(),
          t.toxic.kbeta = c.random(),
          t.toxic.kgamma = c.random(),
          t.toxic.kdelta = c.random();
          const i = c.mul(t.toxic.kgamma, t.toxic.kgamma);
          t.vk_proof.vk_alfa_1 = a.affine(a.mulScalar(a.g, t.toxic.kalfa)),
          t.vk_proof.vk_beta_1 = a.affine(a.mulScalar(a.g, t.toxic.kbeta)),
          t.vk_proof.vk_delta_1 = a.affine(a.mulScalar(a.g, t.toxic.kdelta)),
          t.vk_proof.vk_alfadelta_1 = a.affine(a.mulScalar(a.g, c.mul(t.toxic.kalfa, t.toxic.kdelta))),
          t.vk_proof.vk_beta_2 = u.affine(u.mulScalar(u.g, t.toxic.kbeta)),
          t.vk_verifier.vk_alfa_1 = a.affine(a.mulScalar(a.g, t.toxic.kalfa)),
          t.vk_verifier.vk_beta_2 = u.affine(u.mulScalar(u.g, t.toxic.kbeta)),
          t.vk_verifier.vk_gamma_2 = u.affine(u.mulScalar(u.g, t.toxic.kgamma)),
          t.vk_verifier.vk_delta_2 = u.affine(u.mulScalar(u.g, t.toxic.kdelta)),
          t.vk_verifier.vk_alfabeta_12 = s.F12.affine(s.pairing(t.vk_verifier.vk_alfa_1, t.vk_verifier.vk_beta_2));
          for (let i = 0; i < e.nVars; i++) {
              const e = a.affine(a.mulScalar(a.g, c.mul(t.toxic.kgamma, r.a_t[i])));
              t.vk_proof.A[i] = e,
              t.vk_proof.Adelta[i] = a.affine(a.mulScalar(e, t.toxic.kdelta));
              const n = a.affine(a.mulScalar(a.g, c.mul(t.toxic.kgamma, r.b_t[i])));
              t.vk_proof.B1[i] = n;
              const o = u.affine(u.mulScalar(u.g, c.mul(t.toxic.kgamma, r.b_t[i])));
              t.vk_proof.B2[i] = o
          }
          for (let e = 0; e <= t.vk_proof.nPublic; e++) {
              let i = c.add(c.mul(t.toxic.kgamma, r.c_t[e]), c.add(c.mul(t.toxic.kbeta, r.a_t[e]), c.mul(t.toxic.kalfa, r.b_t[e])));
              const n = a.affine(a.mulScalar(a.g, i));
              t.vk_verifier.IC[e] = n
          }
          for (let n = t.vk_proof.nPublic + 1; n < e.nVars; n++) {
              let e = c.add(c.mul(i, r.c_t[n]), c.add(c.mul(c.mul(t.toxic.kbeta, t.toxic.kgamma), r.a_t[n]), c.mul(c.mul(t.toxic.kalfa, t.toxic.kgamma), r.b_t[n])));
              const o = a.affine(a.mulScalar(a.g, e));
              t.vk_proof.C[n] = o
          }
          const n = t.vk_proof.domainSize + 1;
          t.vk_proof.hExps = new Array(n);
          const o = c.mul(i, r.z_t);
          t.vk_proof.hExps[0] = a.affine(a.mulScalar(a.g, o));
          let h = t.toxic.t;
          for (let e = 1; e < n; e++)
              t.vk_proof.hExps[e] = a.affine(a.mulScalar(a.g, c.mul(h, o))),
              h = c.mul(h, t.toxic.t)
      }(e, t),
      e
  }
}
)),
parcelRequire.register("dhhBE", (function(t, e) {
  var r = parcelRequire("bdjQ6").Buffer
    , i = parcelRequire("jMdZa")
    , n = parcelRequire("6G9qq")
    , o = parcelRequire("ffNX2")
    , s = parcelRequire("1yqR1")
    , a = parcelRequire("ltcvo");
  const u = new i
    , l = new n(new o(u.r))
    , c = u.G1
    , h = u.G2;
  t.exports = function(t, e) {
      const i = {}
        , n = l.F.random()
        , o = l.F.random();
      i.pi_a = c.zero,
      i.pi_b = h.zero,
      i.pi_c = c.zero;
      let u = c.zero
        , A = c.zero;
      for (let r = 0; r < t.nVars; r++)
          i.pi_a = c.add(i.pi_a, c.mulScalar(t.A[r], e[r])),
          i.pi_b = h.add(i.pi_b, h.mulScalar(t.B2[r], e[r])),
          A = c.add(A, c.mulScalar(t.Adelta[r], e[r])),
          u = c.add(u, c.mulScalar(t.B1[r], e[r]));
      for (let r = t.nPublic + 1; r < t.nVars; r++)
          i.pi_c = c.add(i.pi_c, c.mulScalar(t.C[r], e[r]));
      i.pi_a = c.add(i.pi_a, t.vk_alfa_1),
      i.pi_a = c.add(i.pi_a, c.mulScalar(c.g, n)),
      A = c.add(A, t.vk_alfadelta_1),
      A = c.add(A, c.mulScalar(t.vk_delta_1, n)),
      i.pi_b = h.add(i.pi_b, t.vk_beta_2),
      i.pi_b = h.add(i.pi_b, h.mulScalar(h.g, o)),
      u = c.add(u, t.vk_beta_1),
      u = c.add(u, c.mulScalar(c.g, o)),
      i.pi_a = c.affine(i.pi_a),
      i.pi_b = h.affine(i.pi_b);
      const f = r.concat([i.pi_a[0].beInt2Buff(32), i.pi_a[1].beInt2Buff(32), i.pi_b[0][0].beInt2Buff(32), i.pi_b[0][1].beInt2Buff(32), i.pi_b[1][0].beInt2Buff(32), i.pi_b[1][1].beInt2Buff(32)])
        , p = s("keccak256").update(f).digest()
        , g = s("keccak256").update(p).digest()
        , d = a.beBuff2int(p)
        , I = a.beBuff2int(g);
      console.log(d.toString()),
      console.log(I.toString());
      const m = function(t, e) {
          const r = l.F
            , i = t.domainSize
            , n = new Array(i).fill(l.F.zero)
            , o = new Array(i).fill(l.F.zero)
            , s = new Array(i).fill(l.F.zero);
          for (let i = 0; i < t.nVars; i++) {
              for (let o in t.polsA[i])
                  n[o] = r.add(n[o], r.mul(e[i], t.polsA[i][o]));
              for (let n in t.polsB[i])
                  o[n] = r.add(o[n], r.mul(e[i], t.polsB[i][n]));
              for (let n in t.polsC[i])
                  s[n] = r.add(s[n], r.mul(e[i], t.polsC[i][n]))
          }
          const a = l.ifft(n)
            , u = l.ifft(o)
            , c = l.mul(a, u)
            , h = l.ifft(s)
            , A = l.sub(c, h);
          return A.slice(i)
      }(t, e);
      for (let e = 0; e < m.length; e++)
          i.pi_c = c.add(i.pi_c, c.mulScalar(t.hExps[e], m[e]));
      i.pi_c = c.add(i.pi_c, c.mulScalar(i.pi_a, o)),
      i.pi_c = c.add(i.pi_c, c.mulScalar(u, n)),
      i.pi_c = c.add(i.pi_c, c.mulScalar(c.g, l.F.affine(l.F.neg(l.F.mul(n, o))))),
      i.pi_c = c.add(i.pi_c, c.mulScalar(A, I)),
      i.pi_c = c.add(i.pi_c, c.mulScalar(u, d)),
      i.pi_c = c.add(i.pi_c, c.mulScalar(t.vk_delta_1, l.F.mul(d, I)));
      const y = e.slice(1, t.nPublic + 1);
      return i.pi_c = c.affine(i.pi_c),
      i.protocol = "kimleeoh",
      {
          proof: i,
          publicSignals: y
      }
  }
}
)),
parcelRequire.register("1yqR1", (function(t, e) {
  t.exports = parcelRequire("2z9sS")(parcelRequire("iBvWZ"))
}
)),
parcelRequire.register("2z9sS", (function(t, e) {
  var r = parcelRequire("aK1DF")
    , i = parcelRequire("aoOHU");
  t.exports = function(t) {
      const e = r(t)
        , n = i(t);
      return function(t, r) {
          switch ("string" == typeof t ? t.toLowerCase() : t) {
          case "keccak224":
              return new e(1152,448,null,224,r);
          case "keccak256":
              return new e(1088,512,null,256,r);
          case "keccak384":
              return new e(832,768,null,384,r);
          case "keccak512":
              return new e(576,1024,null,512,r);
          case "sha3-224":
              return new e(1152,448,6,224,r);
          case "sha3-256":
              return new e(1088,512,6,256,r);
          case "sha3-384":
              return new e(832,768,6,384,r);
          case "sha3-512":
              return new e(576,1024,6,512,r);
          case "shake128":
              return new n(1344,256,31,r);
          case "shake256":
              return new n(1088,512,31,r);
          default:
              throw new Error("Invald algorithm: " + t)
          }
      }
  }
}
)),
parcelRequire.register("aK1DF", (function(t, e) {
  var r = parcelRequire("838j1").Buffer
    , i = parcelRequire("3DkjE").Transform
    , n = parcelRequire("dhT4G");
  t.exports = function(t) {
      function e(e, r, n, o, s) {
          i.call(this, s),
          this._rate = e,
          this._capacity = r,
          this._delimitedSuffix = n,
          this._hashBitLength = o,
          this._options = s,
          this._state = new t,
          this._state.initialize(e, r),
          this._finalized = !1
      }
      return n(e, i),
      e.prototype._transform = function(t, e, r) {
          let i = null;
          try {
              this.update(t, e)
          } catch (t) {
              i = t
          }
          r(i)
      }
      ,
      e.prototype._flush = function(t) {
          let e = null;
          try {
              this.push(this.digest())
          } catch (t) {
              e = t
          }
          t(e)
      }
      ,
      e.prototype.update = function(t, e) {
          if (!r.isBuffer(t) && "string" != typeof t)
              throw new TypeError("Data must be a string or a buffer");
          if (this._finalized)
              throw new Error("Digest already called");
          return r.isBuffer(t) || (t = r.from(t, e)),
          this._state.absorb(t),
          this
      }
      ,
      e.prototype.digest = function(t) {
          if (this._finalized)
              throw new Error("Digest already called");
          this._finalized = !0,
          this._delimitedSuffix && this._state.absorbLastFewBits(this._delimitedSuffix);
          let e = this._state.squeeze(this._hashBitLength / 8);
          return void 0 !== t && (e = e.toString(t)),
          this._resetState(),
          e
      }
      ,
      e.prototype._resetState = function() {
          return this._state.initialize(this._rate, this._capacity),
          this
      }
      ,
      e.prototype._clone = function() {
          const t = new e(this._rate,this._capacity,this._delimitedSuffix,this._hashBitLength,this._options);
          return this._state.copy(t._state),
          t._finalized = this._finalized,
          t
      }
      ,
      e
  }
}
)),
parcelRequire.register("aoOHU", (function(t, e) {
  var r = parcelRequire("838j1").Buffer
    , i = parcelRequire("3DkjE").Transform
    , n = parcelRequire("dhT4G");
  t.exports = function(t) {
      function e(e, r, n, o) {
          i.call(this, o),
          this._rate = e,
          this._capacity = r,
          this._delimitedSuffix = n,
          this._options = o,
          this._state = new t,
          this._state.initialize(e, r),
          this._finalized = !1
      }
      return n(e, i),
      e.prototype._transform = function(t, e, r) {
          let i = null;
          try {
              this.update(t, e)
          } catch (t) {
              i = t
          }
          r(i)
      }
      ,
      e.prototype._flush = function() {}
      ,
      e.prototype._read = function(t) {
          this.push(this.squeeze(t))
      }
      ,
      e.prototype.update = function(t, e) {
          if (!r.isBuffer(t) && "string" != typeof t)
              throw new TypeError("Data must be a string or a buffer");
          if (this._finalized)
              throw new Error("Squeeze already called");
          return r.isBuffer(t) || (t = r.from(t, e)),
          this._state.absorb(t),
          this
      }
      ,
      e.prototype.squeeze = function(t, e) {
          this._finalized || (this._finalized = !0,
          this._state.absorbLastFewBits(this._delimitedSuffix));
          let r = this._state.squeeze(t);
          return void 0 !== e && (r = r.toString(e)),
          r
      }
      ,
      e.prototype._resetState = function() {
          return this._state.initialize(this._rate, this._capacity),
          this
      }
      ,
      e.prototype._clone = function() {
          const t = new e(this._rate,this._capacity,this._delimitedSuffix,this._options);
          return this._state.copy(t._state),
          t._finalized = this._finalized,
          t
      }
      ,
      e
  }
}
)),
parcelRequire.register("iBvWZ", (function(t, e) {
  var r = parcelRequire("838j1").Buffer
    , i = parcelRequire("8LLmk");
  function n() {
      this.state = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      this.blockSize = null,
      this.count = 0,
      this.squeezing = !1
  }
  n.prototype.initialize = function(t, e) {
      for (let t = 0; t < 50; ++t)
          this.state[t] = 0;
      this.blockSize = t / 8,
      this.count = 0,
      this.squeezing = !1
  }
  ,
  n.prototype.absorb = function(t) {
      for (let e = 0; e < t.length; ++e)
          this.state[~~(this.count / 4)] ^= t[e] << this.count % 4 * 8,
          this.count += 1,
          this.count === this.blockSize && (i.p1600(this.state),
          this.count = 0)
  }
  ,
  n.prototype.absorbLastFewBits = function(t) {
      this.state[~~(this.count / 4)] ^= t << this.count % 4 * 8,
      0 != (128 & t) && this.count === this.blockSize - 1 && i.p1600(this.state),
      this.state[~~((this.blockSize - 1) / 4)] ^= 128 << (this.blockSize - 1) % 4 * 8,
      i.p1600(this.state),
      this.count = 0,
      this.squeezing = !0
  }
  ,
  n.prototype.squeeze = function(t) {
      this.squeezing || this.absorbLastFewBits(1);
      const e = r.alloc(t);
      for (var n = 0; n < t; ++n)
          e[n] = this.state[~~(this.count / 4)] >>> this.count % 4 * 8 & 255,
          this.count += 1,
          this.count === this.blockSize && (i.p1600(this.state),
          this.count = 0);
      return e
  }
  ,
  n.prototype.copy = function(t) {
      for (let e = 0; e < 50; ++e)
          t.state[e] = this.state[e];
      t.blockSize = this.blockSize,
      t.count = this.count,
      t.squeezing = this.squeezing
  }
  ,
  t.exports = n
}
)),
parcelRequire.register("8LLmk", (function(t, e) {
  var r;
  $parcel$export(t.exports, "p1600", (function() {
      return r
  }
  ), (function(t) {
      return r = t
  }
  ));
  const i = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648, 2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648];
  r = function(t) {
      for (let e = 0; e < 24; ++e) {
          const r = t[0] ^ t[10] ^ t[20] ^ t[30] ^ t[40]
            , n = t[1] ^ t[11] ^ t[21] ^ t[31] ^ t[41]
            , o = t[2] ^ t[12] ^ t[22] ^ t[32] ^ t[42]
            , s = t[3] ^ t[13] ^ t[23] ^ t[33] ^ t[43]
            , a = t[4] ^ t[14] ^ t[24] ^ t[34] ^ t[44]
            , u = t[5] ^ t[15] ^ t[25] ^ t[35] ^ t[45]
            , l = t[6] ^ t[16] ^ t[26] ^ t[36] ^ t[46]
            , c = t[7] ^ t[17] ^ t[27] ^ t[37] ^ t[47]
            , h = t[8] ^ t[18] ^ t[28] ^ t[38] ^ t[48]
            , A = t[9] ^ t[19] ^ t[29] ^ t[39] ^ t[49];
          let f = h ^ (o << 1 | s >>> 31)
            , p = A ^ (s << 1 | o >>> 31);
          const g = t[0] ^ f
            , d = t[1] ^ p
            , I = t[10] ^ f
            , m = t[11] ^ p
            , y = t[20] ^ f
            , w = t[21] ^ p
            , C = t[30] ^ f
            , E = t[31] ^ p
            , v = t[40] ^ f
            , B = t[41] ^ p;
          f = r ^ (a << 1 | u >>> 31),
          p = n ^ (u << 1 | a >>> 31);
          const b = t[2] ^ f
            , Q = t[3] ^ p
            , R = t[12] ^ f
            , M = t[13] ^ p
            , _ = t[22] ^ f
            , x = t[23] ^ p
            , D = t[32] ^ f
            , S = t[33] ^ p
            , k = t[42] ^ f
            , F = t[43] ^ p;
          f = o ^ (l << 1 | c >>> 31),
          p = s ^ (c << 1 | l >>> 31);
          const q = t[4] ^ f
            , N = t[5] ^ p
            , T = t[14] ^ f
            , P = t[15] ^ p
            , O = t[24] ^ f
            , U = t[25] ^ p
            , L = t[34] ^ f
            , H = t[35] ^ p
            , K = t[44] ^ f
            , z = t[45] ^ p;
          f = a ^ (h << 1 | A >>> 31),
          p = u ^ (A << 1 | h >>> 31);
          const G = t[6] ^ f
            , V = t[7] ^ p
            , $ = t[16] ^ f
            , j = t[17] ^ p
            , Y = t[26] ^ f
            , W = t[27] ^ p
            , Z = t[36] ^ f
            , X = t[37] ^ p
            , J = t[46] ^ f
            , tt = t[47] ^ p;
          f = l ^ (r << 1 | n >>> 31),
          p = c ^ (n << 1 | r >>> 31);
          const et = t[8] ^ f
            , rt = t[9] ^ p
            , it = t[18] ^ f
            , nt = t[19] ^ p
            , ot = t[28] ^ f
            , st = t[29] ^ p
            , at = t[38] ^ f
            , ut = t[39] ^ p
            , lt = t[48] ^ f
            , ct = t[49] ^ p
            , ht = g
            , At = d
            , ft = m << 4 | I >>> 28
            , pt = I << 4 | m >>> 28
            , gt = y << 3 | w >>> 29
            , dt = w << 3 | y >>> 29
            , It = E << 9 | C >>> 23
            , mt = C << 9 | E >>> 23
            , yt = v << 18 | B >>> 14
            , wt = B << 18 | v >>> 14
            , Ct = b << 1 | Q >>> 31
            , Et = Q << 1 | b >>> 31
            , vt = M << 12 | R >>> 20
            , Bt = R << 12 | M >>> 20
            , bt = _ << 10 | x >>> 22
            , Qt = x << 10 | _ >>> 22
            , Rt = S << 13 | D >>> 19
            , Mt = D << 13 | S >>> 19
            , _t = k << 2 | F >>> 30
            , xt = F << 2 | k >>> 30
            , Dt = N << 30 | q >>> 2
            , St = q << 30 | N >>> 2
            , kt = T << 6 | P >>> 26
            , Ft = P << 6 | T >>> 26
            , qt = U << 11 | O >>> 21
            , Nt = O << 11 | U >>> 21
            , Tt = L << 15 | H >>> 17
            , Pt = H << 15 | L >>> 17
            , Ot = z << 29 | K >>> 3
            , Ut = K << 29 | z >>> 3
            , Lt = G << 28 | V >>> 4
            , Ht = V << 28 | G >>> 4
            , Kt = j << 23 | $ >>> 9
            , zt = $ << 23 | j >>> 9
            , Gt = Y << 25 | W >>> 7
            , Vt = W << 25 | Y >>> 7
            , $t = Z << 21 | X >>> 11
            , jt = X << 21 | Z >>> 11
            , Yt = tt << 24 | J >>> 8
            , Wt = J << 24 | tt >>> 8
            , Zt = et << 27 | rt >>> 5
            , Xt = rt << 27 | et >>> 5
            , Jt = it << 20 | nt >>> 12
            , te = nt << 20 | it >>> 12
            , ee = st << 7 | ot >>> 25
            , re = ot << 7 | st >>> 25
            , ie = at << 8 | ut >>> 24
            , ne = ut << 8 | at >>> 24
            , oe = lt << 14 | ct >>> 18
            , se = ct << 14 | lt >>> 18;
          t[0] = ht ^ ~vt & qt,
          t[1] = At ^ ~Bt & Nt,
          t[10] = Lt ^ ~Jt & gt,
          t[11] = Ht ^ ~te & dt,
          t[20] = Ct ^ ~kt & Gt,
          t[21] = Et ^ ~Ft & Vt,
          t[30] = Zt ^ ~ft & bt,
          t[31] = Xt ^ ~pt & Qt,
          t[40] = Dt ^ ~Kt & ee,
          t[41] = St ^ ~zt & re,
          t[2] = vt ^ ~qt & $t,
          t[3] = Bt ^ ~Nt & jt,
          t[12] = Jt ^ ~gt & Rt,
          t[13] = te ^ ~dt & Mt,
          t[22] = kt ^ ~Gt & ie,
          t[23] = Ft ^ ~Vt & ne,
          t[32] = ft ^ ~bt & Tt,
          t[33] = pt ^ ~Qt & Pt,
          t[42] = Kt ^ ~ee & It,
          t[43] = zt ^ ~re & mt,
          t[4] = qt ^ ~$t & oe,
          t[5] = Nt ^ ~jt & se,
          t[14] = gt ^ ~Rt & Ot,
          t[15] = dt ^ ~Mt & Ut,
          t[24] = Gt ^ ~ie & yt,
          t[25] = Vt ^ ~ne & wt,
          t[34] = bt ^ ~Tt & Yt,
          t[35] = Qt ^ ~Pt & Wt,
          t[44] = ee ^ ~It & _t,
          t[45] = re ^ ~mt & xt,
          t[6] = $t ^ ~oe & ht,
          t[7] = jt ^ ~se & At,
          t[16] = Rt ^ ~Ot & Lt,
          t[17] = Mt ^ ~Ut & Ht,
          t[26] = ie ^ ~yt & Ct,
          t[27] = ne ^ ~wt & Et,
          t[36] = Tt ^ ~Yt & Zt,
          t[37] = Pt ^ ~Wt & Xt,
          t[46] = It ^ ~_t & Dt,
          t[47] = mt ^ ~xt & St,
          t[8] = oe ^ ~ht & vt,
          t[9] = se ^ ~At & Bt,
          t[18] = Ot ^ ~Lt & Jt,
          t[19] = Ut ^ ~Ht & te,
          t[28] = yt ^ ~Ct & kt,
          t[29] = wt ^ ~Et & Ft,
          t[38] = Yt ^ ~Zt & ft,
          t[39] = Wt ^ ~Xt & pt,
          t[48] = _t ^ ~Dt & Kt,
          t[49] = xt ^ ~St & zt,
          t[0] ^= i[2 * e],
          t[1] ^= i[2 * e + 1]
      }
  }
}
)),
parcelRequire.register("dc7UT", (function(t, e) {
  var r = parcelRequire("bdjQ6").Buffer
    , i = parcelRequire("jMdZa")
    , n = parcelRequire("1yqR1")
    , o = parcelRequire("ltcvo");
  const s = new i
    , a = s.G1
    , u = s.G2;
  t.exports = function(t, e, i) {
      let l = t.IC[0];
      for (let e = 0; e < t.nPublic; e++)
          l = a.add(l, a.mulScalar(t.IC[e + 1], i[e]));
      const c = r.concat([e.pi_a[0].beInt2Buff(32), e.pi_a[1].beInt2Buff(32), e.pi_b[0][0].beInt2Buff(32), e.pi_b[0][1].beInt2Buff(32), e.pi_b[1][0].beInt2Buff(32), e.pi_b[1][1].beInt2Buff(32)])
        , h = n("keccak256").update(c).digest()
        , A = n("keccak256").update(h).digest()
        , f = o.beBuff2int(h)
        , p = o.beBuff2int(A);
      return console.log(f.toString()),
      console.log(p.toString()),
      !!s.F12.equals(s.pairing(a.add(e.pi_a, a.mulScalar(a.g, f)), u.add(e.pi_b, u.mulScalar(t.vk_delta_2, p))), s.F12.mul(t.vk_alfabeta_12, s.F12.mul(s.pairing(l, t.vk_gamma_2), s.pairing(e.pi_c, u.g))))
  }
}
)),
parcelRequire.register("bV5OE", (function(t, e) {
  var r, i;
  $parcel$export(t.exports, "stringifyBigInts", (function() {
      return r
  }
  ), (function(t) {
      return r = t
  }
  )),
  $parcel$export(t.exports, "unstringifyBigInts", (function() {
      return i
  }
  ), (function(t) {
      return i = t
  }
  ));
  var n = parcelRequire("ltcvo");
  r = function t(e) {
      if ("bigint" == typeof e || void 0 !== e.isZero)
          return e.toString(10);
      if (Array.isArray(e))
          return e.map(t);
      if ("object" == typeof e) {
          const r = {};
          for (let i in e)
              r[i] = t(e[i]);
          return r
      }
      return e
  }
  ,
  i = function t(e) {
      if ("string" == typeof e && /^[0-9]+$/.test(e))
          return n(e);
      if (Array.isArray(e))
          return e.map(t);
      if ("object" == typeof e) {
          const r = {};
          for (let i in e)
              r[i] = t(e[i]);
          return r
      }
      return e
  }
}
)),
parcelRequire.register("fsuAN", (function(t, e) {
  var r = parcelRequire("1lbVy").bigInt;
  t.exports = class {
      async getRoot() {
          return this.root
      }
      _key2str(t) {
          return r(t).toString()
      }
      _normalize(t) {
          for (let e = 0; e < t.length; e++)
              t[e] = r(t[e])
      }
      async get(t) {
          const e = this._key2str(t);
          return this.nodes[e]
      }
      async multiGet(t) {
          const e = [];
          for (let r = 0; r < t.length; r++)
              e.push(this.get(t[r]));
          return await Promise.all(e)
      }
      async setRoot(t) {
          this.root = t
      }
      async multiIns(t) {
          for (let e = 0; e < t.length; e++) {
              const r = this._key2str(t[e][0]);
              this._normalize(t[e][1]),
              this.nodes[r] = t[e][1]
          }
      }
      async multiDel(t) {
          for (let e = 0; e < t.length; e++) {
              const r = this._key2str(t[e]);
              delete this.nodes[r]
          }
      }
      constructor() {
          this.nodes = {},
          this.root = r(0)
      }
  }
}
)),
parcelRequire.register("6TE10", (function(t, e) {
  var r, i;
  $parcel$export(t.exports, "hash0", (function() {
      return r
  }
  ), (function(t) {
      return r = t
  }
  )),
  $parcel$export(t.exports, "hash1", (function() {
      return i
  }
  ), (function(t) {
      return i = t
  }
  ));
  var n = parcelRequire("kBWvB")
    , o = parcelRequire("1lbVy").bigInt;
  const s = n.createHash(6, 8, 57);
  r = function(t, e) {
      return s([t, e])
  }
  ,
  i = function(t, e) {
      return s([t, e, o.one])
  }
}
)),
parcelRequire.register("kBWvB", (function(t, e) {
  var r, i, n;
  $parcel$export(t.exports, "getMatrix", (function() {
      return r
  }
  ), (function(t) {
      return r = t
  }
  )),
  $parcel$export(t.exports, "getConstants", (function() {
      return i
  }
  ), (function(t) {
      return i = t
  }
  )),
  $parcel$export(t.exports, "createHash", (function() {
      return n
  }
  ), (function(t) {
      return n = t
  }
  ));
  var o = parcelRequire("bdjQ6").Buffer
    , s = parcelRequire("1lbVy").bn128
    , a = parcelRequire("1lbVy").bigInt
    , u = parcelRequire("kzOE5")
    , l = parcelRequire("h1RhN");
  const c = s.Fr
    , h = "poseidon";
  function A(t, e) {
      const r = [];
      let i = o.from(t)
        , n = u(32).update(i).digest();
      for (; r.length < e; ) {
          const t = c.affine(a.leBuff2int(n));
          r.push(t),
          n = u(32).update(n).digest()
      }
      return r
  }
  function f(t) {
      for (let e = 0; e < t.length; e++) {
          if (t[e].isZero())
              return !1;
          for (let r = e + 1; r < t.length; r++)
              if (t[e].equals(t[r]))
                  return !1
      }
      return !0
  }
  function p(t, e) {
      for (let r = 0; r < t.length; r++)
          t[r] = c.add(t[r], e)
  }
  function g(t) {
      return c.mul(t, c.square(c.square(t, t)))
  }
  function d(t, e) {
      const r = new Array(t.length);
      for (let i = 0; i < t.length; i++) {
          r[i] = c.zero;
          for (let n = 0; n < t.length; n++)
              r[i] = c.add(r[i], c.mul(e[i][n], t[n]))
      }
      for (let e = 0; e < t.length; e++)
          t[e] = r[e]
  }
  r = (t,e,r)=>{
      void 0 === e && (e = h),
      void 0 === r && (r = 65),
      void 0 === t && (t = 6);
      let i = "0000"
        , n = A(e + "_matrix_" + i, 2 * t);
      for (; !f(n); ) {
          for (i = Number(i) + 1 + ""; i.length < 4; )
              i = "0" + i;
          n = A(e + "_matrix_" + i, 2 * t)
      }
      const o = new Array(t);
      for (let e = 0; e < t; e++) {
          o[e] = new Array(t);
          for (let r = 0; r < t; r++)
              o[e][r] = c.affine(c.inverse(c.sub(n[e], n[t + r])))
      }
      return o
  }
  ,
  i = (t,e,r)=>{
      void 0 === e && (e = h),
      void 0 === r && (r = 65),
      void 0 === t && (t = 6);
      return A(e + "_constants", r)
  }
  ,
  n = (t,e,n,o)=>{
      void 0 === o && (o = h),
      void 0 === e && (e = 8),
      void 0 === n && (n = 57),
      void 0 === t && (t = 6),
      l(e % 2 == 0);
      const s = i(t, o, e + n)
        , u = r(t, o, e + n);
      return function(r) {
          let i = [];
          l(r.length <= t),
          l(r.length > 0);
          for (let t = 0; t < r.length; t++)
              i[t] = a(r[t]);
          for (let e = r.length; e < t; e++)
              i[e] = c.zero;
          for (let r = 0; r < e + n; r++) {
              if (p(i, s[r]),
              r < e / 2 || r >= e / 2 + n)
                  for (let e = 0; e < t; e++)
                      i[e] = g(i[e]);
              else
                  i[0] = g(i[0]);
              d(i, u)
          }
          return c.affine(i[0])
      }
  }
}
)),
parcelRequire.register("kzOE5", (function(t, e) {
  var r = parcelRequire("dUNVE")
    , i = parcelRequire("hsCPQ");
  function n(t, e, r) {
      var i = t[e] + t[r]
        , n = t[e + 1] + t[r + 1];
      i >= 4294967296 && n++,
      t[e] = i,
      t[e + 1] = n
  }
  function o(t, e, r, i) {
      var n = t[e] + r;
      r < 0 && (n += 4294967296);
      var o = t[e + 1] + i;
      n >= 4294967296 && o++,
      t[e] = n,
      t[e + 1] = o
  }
  function s(t, e) {
      return t[e] ^ t[e + 1] << 8 ^ t[e + 2] << 16 ^ t[e + 3] << 24
  }
  function a(t, e, r, i, s, a) {
      var u = h[s]
        , l = h[s + 1]
        , A = h[a]
        , f = h[a + 1];
      n(c, t, e),
      o(c, t, u, l);
      var p = c[i] ^ c[t]
        , g = c[i + 1] ^ c[t + 1];
      c[i] = g,
      c[i + 1] = p,
      n(c, r, i),
      p = c[e] ^ c[r],
      g = c[e + 1] ^ c[r + 1],
      c[e] = p >>> 24 ^ g << 8,
      c[e + 1] = g >>> 24 ^ p << 8,
      n(c, t, e),
      o(c, t, A, f),
      p = c[i] ^ c[t],
      g = c[i + 1] ^ c[t + 1],
      c[i] = p >>> 16 ^ g << 16,
      c[i + 1] = g >>> 16 ^ p << 16,
      n(c, r, i),
      p = c[e] ^ c[r],
      g = c[e + 1] ^ c[r + 1],
      c[e] = g >>> 31 ^ p << 1,
      c[e + 1] = p >>> 31 ^ g << 1
  }
  var u = new Uint32Array([4089235720, 1779033703, 2227873595, 3144134277, 4271175723, 1013904242, 1595750129, 2773480762, 2917565137, 1359893119, 725511199, 2600822924, 4215389547, 528734635, 327033209, 1541459225])
    , l = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3, 11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4, 7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8, 9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13, 2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9, 12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11, 13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10, 6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5, 10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3].map((function(t) {
      return 2 * t
  }
  )))
    , c = new Uint32Array(32)
    , h = new Uint32Array(32);
  function A(t, e) {
      var r = 0;
      for (r = 0; r < 16; r++)
          c[r] = t.h[r],
          c[r + 16] = u[r];
      for (c[24] = c[24] ^ t.t,
      c[25] = c[25] ^ t.t / 4294967296,
      e && (c[28] = ~c[28],
      c[29] = ~c[29]),
      r = 0; r < 32; r++)
          h[r] = s(t.b, 4 * r);
      for (r = 0; r < 12; r++)
          a(0, 8, 16, 24, l[16 * r + 0], l[16 * r + 1]),
          a(2, 10, 18, 26, l[16 * r + 2], l[16 * r + 3]),
          a(4, 12, 20, 28, l[16 * r + 4], l[16 * r + 5]),
          a(6, 14, 22, 30, l[16 * r + 6], l[16 * r + 7]),
          a(0, 10, 20, 30, l[16 * r + 8], l[16 * r + 9]),
          a(2, 12, 22, 24, l[16 * r + 10], l[16 * r + 11]),
          a(4, 14, 16, 26, l[16 * r + 12], l[16 * r + 13]),
          a(6, 8, 18, 28, l[16 * r + 14], l[16 * r + 15]);
      for (r = 0; r < 16; r++)
          t.h[r] = t.h[r] ^ c[r] ^ c[r + 16]
  }
  var f = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  function p(t, e, r, i) {
      f.fill(0),
      this.b = new Uint8Array(128),
      this.h = new Uint32Array(16),
      this.t = 0,
      this.c = 0,
      this.outlen = t,
      f[0] = t,
      e && (f[1] = e.length),
      f[2] = 1,
      f[3] = 1,
      r && f.set(r, 32),
      i && f.set(i, 48);
      for (var n = 0; n < 16; n++)
          this.h[n] = u[n] ^ s(f, 4 * n);
      e && (g(this, e),
      this.c = 128)
  }
  function g(t, e) {
      for (var r = 0; r < e.length; r++)
          128 === t.c && (t.t += t.c,
          A(t, !1),
          t.c = 0),
          t.b[t.c++] = e[r]
  }
  function d(t) {
      return t < 16 ? "0" + t.toString(16) : t.toString(16)
  }
  p.prototype.update = function(t) {
      return r(t instanceof Uint8Array, "input must be Uint8Array or Buffer"),
      g(this, t),
      this
  }
  ,
  p.prototype.digest = function(t) {
      var e = t && "binary" !== t && "hex" !== t ? t : new Uint8Array(this.outlen);
      return r(e instanceof Uint8Array, 'out must be "binary", "hex", Uint8Array, or Buffer'),
      r(e.length >= this.outlen, "out must have at least outlen bytes of space"),
      function(t, e) {
          t.t += t.c;
          for (; t.c < 128; )
              t.b[t.c++] = 0;
          A(t, !0);
          for (var r = 0; r < t.outlen; r++)
              e[r] = t.h[r >> 2] >> 8 * (3 & r)
      }(this, e),
      "hex" === t ? function(t) {
          for (var e = "", r = 0; r < t.length; r++)
              e += d(t[r]);
          return e
      }(e) : e
  }
  ,
  p.prototype.final = p.prototype.digest,
  p.ready = function(t) {
      i.ready((function() {
          t()
      }
      ))
  }
  ;
  var I = p;
  t.exports = function(t, e, i, n, o) {
      return !0 !== o && (r(t >= m, "outlen must be at least " + m + ", was given " + t),
      r(t <= y, "outlen must be at most " + y + ", was given " + t),
      null != e && (r(e instanceof Uint8Array, "key must be Uint8Array or Buffer"),
      r(e.length >= w, "key must be at least " + w + ", was given " + e.length),
      r(e.length <= C, "key must be at most " + C + ", was given " + e.length)),
      null != i && (r(i instanceof Uint8Array, "salt must be Uint8Array or Buffer"),
      r(i.length === E, "salt must be exactly " + E + ", was given " + i.length)),
      null != n && (r(n instanceof Uint8Array, "personal must be Uint8Array or Buffer"),
      r(n.length === v, "personal must be exactly " + v + ", was given " + n.length))),
      new I(t,e,i,n)
  }
  ,
  t.exports.ready = function(t) {
      i.ready((function() {
          t()
      }
      ))
  }
  ,
  t.exports.WASM_SUPPORTED = i.SUPPORTED,
  t.exports.WASM_LOADED = !1;
  var m = t.exports.BYTES_MIN = 16
    , y = t.exports.BYTES_MAX = 64
    , w = (t.exports.BYTES = 32,
  t.exports.KEYBYTES_MIN = 16)
    , C = t.exports.KEYBYTES_MAX = 64
    , E = (t.exports.KEYBYTES = 32,
  t.exports.SALTBYTES = 16)
    , v = t.exports.PERSONALBYTES = 16;
  i.ready((function(e) {
      e || (t.exports.WASM_LOADED = !0,
      t.exports = i)
  }
  ))
}
)),
parcelRequire.register("dUNVE", (function(t, e) {
  t.exports = function t(e, i) {
      if (!e) {
          var n = new r(i);
          throw Error.captureStackTrace && Error.captureStackTrace(n, t),
          n
      }
  }
  ;
  class r extends Error {
  }
  r.prototype.name = "AssertionError"
}
)),
parcelRequire.register("hsCPQ", (function(t, e) {
  var r = parcelRequire("dUNVE")
    , i = parcelRequire("igWcr")
    , n = null
    , o = "undefined" != typeof WebAssembly && parcelRequire("ijUO4")().then((t=>{
      n = t
  }
  ))
    , s = 64
    , a = [];
  t.exports = p;
  var u = t.exports.BYTES_MIN = 16
    , l = t.exports.BYTES_MAX = 64
    , c = (t.exports.BYTES = 32,
  t.exports.KEYBYTES_MIN = 16)
    , h = t.exports.KEYBYTES_MAX = 64
    , A = (t.exports.KEYBYTES = 32,
  t.exports.SALTBYTES = 16)
    , f = t.exports.PERSONALBYTES = 16;
  function p(t, e, i, o, g) {
      if (!(this instanceof p))
          return new p(t,e,i,o,g);
      if (!n)
          throw new Error("WASM not loaded. Wait for Blake2b.ready(cb)");
      t || (t = 32),
      !0 !== g && (r(t >= u, "digestLength must be at least " + u + ", was given " + t),
      r(t <= l, "digestLength must be at most " + l + ", was given " + t),
      null != e && (r(e instanceof Uint8Array, "key must be Uint8Array or Buffer"),
      r(e.length >= c, "key must be at least " + c + ", was given " + e.length),
      r(e.length <= h, "key must be at least " + h + ", was given " + e.length)),
      null != i && (r(i instanceof Uint8Array, "salt must be Uint8Array or Buffer"),
      r(i.length === A, "salt must be exactly " + A + ", was given " + i.length)),
      null != o && (r(o instanceof Uint8Array, "personal must be Uint8Array or Buffer"),
      r(o.length === f, "personal must be exactly " + f + ", was given " + o.length))),
      a.length || (a.push(s),
      s += 216),
      this.digestLength = t,
      this.finalized = !1,
      this.pointer = a.pop(),
      this._memory = new Uint8Array(n.memory.buffer),
      this._memory.fill(0, 0, 64),
      this._memory[0] = this.digestLength,
      this._memory[1] = e ? e.length : 0,
      this._memory[2] = 1,
      this._memory[3] = 1,
      i && this._memory.set(i, 32),
      o && this._memory.set(o, 48),
      this.pointer + 216 > this._memory.length && this._realloc(this.pointer + 216),
      n.blake2b_init(this.pointer, this.digestLength),
      e && (this.update(e),
      this._memory.fill(0, s, s + e.length),
      this._memory[this.pointer + 200] = 128)
  }
  function g() {}
  p.prototype._realloc = function(t) {
      n.memory.grow(Math.max(0, Math.ceil(Math.abs(t - this._memory.length) / 65536))),
      this._memory = new Uint8Array(n.memory.buffer)
  }
  ,
  p.prototype.update = function(t) {
      return r(!1 === this.finalized, "Hash instance finalized"),
      r(t instanceof Uint8Array, "input must be Uint8Array or Buffer"),
      s + t.length > this._memory.length && this._realloc(s + t.length),
      this._memory.set(t, s),
      n.blake2b_update(this.pointer, s, s + t.length),
      this
  }
  ,
  p.prototype.digest = function(t) {
      if (r(!1 === this.finalized, "Hash instance finalized"),
      this.finalized = !0,
      a.push(this.pointer),
      n.blake2b_final(this.pointer),
      !t || "binary" === t)
          return this._memory.slice(this.pointer + 128, this.pointer + 128 + this.digestLength);
      if ("string" == typeof t)
          return i.toString(this._memory, t, this.pointer + 128, this.pointer + 128 + this.digestLength);
      r(t instanceof Uint8Array && t.length >= this.digestLength, "input must be Uint8Array or Buffer");
      for (var e = 0; e < this.digestLength; e++)
          t[e] = this._memory[this.pointer + 128 + e];
      return t
  }
  ,
  p.prototype.final = p.prototype.digest,
  p.WASM = n,
  p.SUPPORTED = "undefined" != typeof WebAssembly,
  p.ready = function(t) {
      return t || (t = g),
      o ? o.then((()=>t()), t) : t(new Error("WebAssembly not supported"))
  }
  ,
  p.prototype.ready = p.ready,
  p.prototype.getPartialHash = function() {
      return this._memory.slice(this.pointer, this.pointer + 216)
  }
  ,
  p.prototype.setPartialHash = function(t) {
      this._memory.set(t, this.pointer)
  }
}
)),
parcelRequire.register("igWcr", (function(t, e) {
  var r = parcelRequire("hj8dw")
    , i = parcelRequire("gDWE0")
    , n = parcelRequire("46QBU")
    , o = parcelRequire("7d0sT")
    , s = parcelRequire("4z5Zb");
  const a = 255 === new Uint8Array(Uint16Array.of(255).buffer)[0];
  function u(t) {
      switch (t) {
      case "ascii":
          return r;
      case "base64":
          return i;
      case "hex":
          return n;
      case "utf8":
      case "utf-8":
      case void 0:
          return o;
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
          return s;
      default:
          throw new Error(`Unknown encoding: ${t}`)
      }
  }
  function l(t) {
      return t instanceof Uint8Array
  }
  function c(t, e, r) {
      return "string" == typeof t ? function(t, e) {
          const r = u(e)
            , i = new Uint8Array(r.byteLength(t));
          return r.write(i, t, 0, i.byteLength),
          i
      }(t, e) : Array.isArray(t) ? function(t) {
          const e = new Uint8Array(t.length);
          return e.set(t),
          e
      }(t) : ArrayBuffer.isView(t) ? function(t) {
          const e = new Uint8Array(t.byteLength);
          return e.set(t),
          e
      }(t) : function(t, e, r) {
          return new Uint8Array(t,e,r)
      }(t, e, r)
  }
  function h(t, e, r, i, n) {
      if (0 === t.byteLength)
          return -1;
      if ("string" == typeof r ? (i = r,
      r = 0) : void 0 === r ? r = n ? 0 : t.length - 1 : r < 0 && (r += t.byteLength),
      r >= t.byteLength) {
          if (n)
              return -1;
          r = t.byteLength - 1
      } else if (r < 0) {
          if (!n)
              return -1;
          r = 0
      }
      if ("string" == typeof e)
          e = c(e, i);
      else if ("number" == typeof e)
          return e &= 255,
          n ? t.indexOf(e, r) : t.lastIndexOf(e, r);
      if (0 === e.byteLength)
          return -1;
      if (n) {
          let i = -1;
          for (let n = r; n < t.byteLength; n++)
              if (t[n] === e[-1 === i ? 0 : n - i]) {
                  if (-1 === i && (i = n),
                  n - i + 1 === e.byteLength)
                      return i
              } else
                  -1 !== i && (n -= n - i),
                  i = -1
      } else {
          r + e.byteLength > t.byteLength && (r = t.byteLength - e.byteLength);
          for (let i = r; i >= 0; i--) {
              let r = !0;
              for (let n = 0; n < e.byteLength; n++)
                  if (t[i + n] !== e[n]) {
                      r = !1;
                      break
                  }
              if (r)
                  return i
          }
      }
      return -1
  }
  function A(t, e, r, i) {
      return h(t, e, r, i, !0)
  }
  function f(t, e, r) {
      const i = t[e];
      t[e] = t[r],
      t[r] = i
  }
  t.exports = {
      isBuffer: l,
      isEncoding: function(t) {
          try {
              return u(t),
              !0
          } catch {
              return !1
          }
      },
      alloc: function(t, e, r) {
          const i = new Uint8Array(t);
          return void 0 !== e && e(i, e, 0, i.byteLength, r),
          i
      },
      allocUnsafe: function(t) {
          return new Uint8Array(t)
      },
      allocUnsafeSlow: function(t) {
          return new Uint8Array(t)
      },
      byteLength: function(t, e) {
          return u(e).byteLength(t)
      },
      compare: function(t, e) {
          if (t === e)
              return 0;
          const r = Math.min(t.byteLength, e.byteLength);
          t = new DataView(t.buffer,t.byteOffset,t.byteLength),
          e = new DataView(e.buffer,e.byteOffset,e.byteLength);
          let i = 0;
          for (let n = r - r % 4; i < n; i += 4) {
              if (t.getUint32(i, a) !== e.getUint32(i, a))
                  break
          }
          for (; i < r; i++) {
              const r = t.getUint8(i)
                , n = e.getUint8(i);
              if (r < n)
                  return -1;
              if (r > n)
                  return 1
          }
          return t.byteLength > e.byteLength ? 1 : t.byteLength < e.byteLength ? -1 : 0
      },
      concat: function(t, e) {
          void 0 === e && (e = t.reduce(((t,e)=>t + e.byteLength), 0));
          const r = new Uint8Array(e);
          return t.reduce(((t,e)=>(r.set(e, t),
          t + e.byteLength)), 0),
          r
      },
      copy: function(t, e, r=0, i=0, n=t.byteLength) {
          if (n > 0 && n < i)
              return 0;
          if (n === i)
              return 0;
          if (0 === t.byteLength || 0 === e.byteLength)
              return 0;
          if (r < 0)
              throw new RangeError("targetStart is out of range");
          if (i < 0 || i >= t.byteLength)
              throw new RangeError("sourceStart is out of range");
          if (n < 0)
              throw new RangeError("sourceEnd is out of range");
          r >= e.byteLength && (r = e.byteLength),
          n > t.byteLength && (n = t.byteLength),
          e.byteLength - r < n - i && (n = e.length - r + i);
          const o = n - i;
          return t === e ? e.copyWithin(r, i, n) : e.set(t.subarray(i, n), r),
          o
      },
      equals: function(t, e) {
          if (t === e)
              return !0;
          if (t.byteLength !== e.byteLength)
              return !1;
          const r = t.byteLength;
          t = new DataView(t.buffer,t.byteOffset,t.byteLength),
          e = new DataView(e.buffer,e.byteOffset,e.byteLength);
          let i = 0;
          for (let n = r - r % 4; i < n; i += 4)
              if (t.getUint32(i, a) !== e.getUint32(i, a))
                  return !1;
          for (; i < r; i++)
              if (t.getUint8(i) !== e.getUint8(i))
                  return !1;
          return !0
      },
      fill: function(t, e, r, i, n) {
          if ("string" == typeof e ? "string" == typeof r ? (n = r,
          r = 0,
          i = t.byteLength) : "string" == typeof i && (n = i,
          i = t.byteLength) : "number" == typeof val ? e &= 255 : "boolean" == typeof val && (e = +e),
          r < 0 || t.byteLength < r || t.byteLength < i)
              throw new RangeError("Out of range index");
          if (void 0 === r && (r = 0),
          void 0 === i && (i = t.byteLength),
          i <= r)
              return t;
          if (e || (e = 0),
          "number" == typeof e)
              for (let n = r; n < i; ++n)
                  t[n] = e;
          else {
              const o = (e = l(e) ? e : c(e, n)).byteLength;
              for (let n = 0; n < i - r; ++n)
                  t[n + r] = e[n % o]
          }
          return t
      },
      from: c,
      includes: function(t, e, r, i) {
          return -1 !== A(t, e, r, i)
      },
      indexOf: A,
      lastIndexOf: function(t, e, r, i) {
          return h(t, e, r, i, !1)
      },
      swap16: function(t) {
          const e = t.byteLength;
          if (e % 2 != 0)
              throw new RangeError("Buffer size must be a multiple of 16-bits");
          for (let r = 0; r < e; r += 2)
              f(t, r, r + 1);
          return t
      },
      swap32: function(t) {
          const e = t.byteLength;
          if (e % 4 != 0)
              throw new RangeError("Buffer size must be a multiple of 32-bits");
          for (let r = 0; r < e; r += 4)
              f(t, r, r + 3),
              f(t, r + 1, r + 2);
          return t
      },
      swap64: function(t) {
          const e = t.byteLength;
          if (e % 8 != 0)
              throw new RangeError("Buffer size must be a multiple of 64-bits");
          for (let r = 0; r < e; r += 8)
              f(t, r, r + 7),
              f(t, r + 1, r + 6),
              f(t, r + 2, r + 5),
              f(t, r + 3, r + 4);
          return t
      },
      toBuffer: function(t) {
          return t
      },
      toString: function(t, e, r=0, i=t.byteLength) {
          const n = t.byteLength;
          return r >= n || i <= r ? "" : (r < 0 && (r = 0),
          i > n && (i = n),
          (0 !== r || i < n) && (t = t.subarray(r, i)),
          u(e).toString(t))
      },
      write: function(t, e, r, i, n) {
          return void 0 === r ? n = "utf8" : void 0 === i && "string" == typeof r ? (n = r,
          r = void 0) : void 0 === n && "string" == typeof i && (n = i,
          i = void 0),
          u(n).write(t, e, r, i)
      },
      writeDoubleLE: function(t, e, r) {
          return void 0 === r && (r = 0),
          new DataView(t.buffer,t.byteOffset,t.byteLength).setFloat64(r, e, !0),
          r + 8
      },
      writeFloatLE: function(t, e, r) {
          return void 0 === r && (r = 0),
          new DataView(t.buffer,t.byteOffset,t.byteLength).setFloat32(r, e, !0),
          r + 4
      },
      writeUInt32LE: function(t, e, r) {
          return void 0 === r && (r = 0),
          new DataView(t.buffer,t.byteOffset,t.byteLength).setUint32(r, e, !0),
          r + 4
      },
      writeInt32LE: function(t, e, r) {
          return void 0 === r && (r = 0),
          new DataView(t.buffer,t.byteOffset,t.byteLength).setInt32(r, e, !0),
          r + 4
      },
      readDoubleLE: function(t, e) {
          return void 0 === e && (e = 0),
          new DataView(t.buffer,t.byteOffset,t.byteLength).getFloat64(e, !0)
      },
      readFloatLE: function(t, e) {
          return void 0 === e && (e = 0),
          new DataView(t.buffer,t.byteOffset,t.byteLength).getFloat32(e, !0)
      },
      readUInt32LE: function(t, e) {
          return void 0 === e && (e = 0),
          new DataView(t.buffer,t.byteOffset,t.byteLength).getUint32(e, !0)
      },
      readInt32LE: function(t, e) {
          return void 0 === e && (e = 0),
          new DataView(t.buffer,t.byteOffset,t.byteLength).getInt32(e, !0)
      }
  }
}
)),
parcelRequire.register("hj8dw", (function(t, e) {
  function r(t) {
      return t.length
  }
  t.exports = {
      byteLength: r,
      toString: function(t) {
          const e = t.byteLength;
          let r = "";
          for (let i = 0; i < e; i++)
              r += String.fromCharCode(t[i]);
          return r
      },
      write: function(t, e, i=0, n=r(e)) {
          const o = Math.min(n, t.byteLength - i);
          for (let r = 0; r < o; r++)
              t[i + r] = e.charCodeAt(r);
          return o
      }
  }
}
)),
parcelRequire.register("gDWE0", (function(t, e) {
  const r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
    , i = new Uint8Array(256);
  for (let t = 0; t < r.length; t++)
      i[r.charCodeAt(t)] = t;
  function n(t) {
      let e = t.length;
      return 61 === t.charCodeAt(e - 1) && e--,
      e > 1 && 61 === t.charCodeAt(e - 1) && e--,
      3 * e >>> 2
  }
  i[45] = 62,
  i[95] = 63,
  t.exports = {
      byteLength: n,
      toString: function(t) {
          const e = t.byteLength;
          let i = "";
          for (let n = 0; n < e; n += 3)
              i += r[t[n] >> 2] + r[(3 & t[n]) << 4 | t[n + 1] >> 4] + r[(15 & t[n + 1]) << 2 | t[n + 2] >> 6] + r[63 & t[n + 2]];
          return e % 3 == 2 ? i = i.substring(0, i.length - 1) + "=" : e % 3 == 1 && (i = i.substring(0, i.length - 2) + "=="),
          i
      },
      write: function(t, e, r=0, o=n(e)) {
          const s = Math.min(o, t.byteLength - r);
          for (let r = 0, n = 0; r < s; r += 4) {
              const o = i[e.charCodeAt(r)]
                , s = i[e.charCodeAt(r + 1)]
                , a = i[e.charCodeAt(r + 2)]
                , u = i[e.charCodeAt(r + 3)];
              t[n++] = o << 2 | s >> 4,
              t[n++] = (15 & s) << 4 | a >> 2,
              t[n++] = (3 & a) << 6 | 63 & u
          }
          return s
      }
  }
}
)),
parcelRequire.register("46QBU", (function(t, e) {
  function r(t) {
      return t.length >>> 1
  }
  function i(t) {
      return t >= 48 && t <= 57 ? t - 48 : t >= 65 && t <= 70 ? t - 65 + 10 : t >= 97 && t <= 102 ? t - 97 + 10 : void 0
  }
  t.exports = {
      byteLength: r,
      toString: function(t) {
          const e = t.byteLength;
          t = new DataView(t.buffer,t.byteOffset,e);
          let r = ""
            , i = 0;
          for (let n = e - e % 4; i < n; i += 4)
              r += t.getUint32(i).toString(16).padStart(8, "0");
          for (; i < e; i++)
              r += t.getUint8(i).toString(16).padStart(2, "0");
          return r
      },
      write: function(t, e, n=0, o=r(e)) {
          const s = Math.min(o, t.byteLength - n);
          for (let r = 0; r < s; r++) {
              const o = i(e.charCodeAt(2 * r))
                , s = i(e.charCodeAt(2 * r + 1));
              if (void 0 === o || void 0 === s)
                  return t.subarray(0, r);
              t[n + r] = o << 4 | s
          }
          return s
      }
  }
}
)),
parcelRequire.register("7d0sT", (function(t, e) {
  function r(t) {
      let e = 0;
      for (let r = 0, i = t.length; r < i; r++) {
          const n = t.charCodeAt(r);
          if (n >= 55296 && n <= 56319 && r + 1 < i) {
              const i = t.charCodeAt(r + 1);
              if (i >= 56320 && i <= 57343) {
                  e += 4,
                  r++;
                  continue
              }
          }
          e += n <= 127 ? 1 : n <= 2047 ? 2 : 3
      }
      return e
  }
  let i, n;
  if ("undefined" != typeof TextDecoder) {
      const t = new TextDecoder;
      i = function(e) {
          return t.decode(e)
      }
  } else
      i = function(t) {
          const e = t.byteLength;
          let r = ""
            , i = 0;
          for (; i < e; ) {
              let n = t[i];
              if (n <= 127) {
                  r += String.fromCharCode(n),
                  i++;
                  continue
              }
              let o = 0
                , s = 0;
              if (n <= 223 ? (o = 1,
              s = 31 & n) : n <= 239 ? (o = 2,
              s = 15 & n) : n <= 244 && (o = 3,
              s = 7 & n),
              e - i - o > 0) {
                  let e = 0;
                  for (; e < o; )
                      n = t[i + e + 1],
                      s = s << 6 | 63 & n,
                      e += 1
              } else
                  s = 65533,
                  o = e - i;
              r += String.fromCodePoint(s),
              i += o + 1
          }
          return r
      }
      ;
  if ("undefined" != typeof TextEncoder) {
      const t = new TextEncoder;
      n = function(e, i, n=0, o=r(i)) {
          const s = Math.min(o, e.byteLength - n);
          return t.encodeInto(i, e.subarray(n, n + s)),
          s
      }
  } else
      n = function(t, e, i=0, n=r(e)) {
          const o = Math.min(n, t.byteLength - i);
          t = t.subarray(i, i + o);
          let s = 0
            , a = 0;
          for (; s < e.length; ) {
              const r = e.codePointAt(s);
              if (r <= 127) {
                  t[a++] = r,
                  s++;
                  continue
              }
              let i = 0
                , n = 0;
              for (r <= 2047 ? (i = 6,
              n = 192) : r <= 65535 ? (i = 12,
              n = 224) : r <= 2097151 && (i = 18,
              n = 240),
              t[a++] = n | r >> i,
              i -= 6; i >= 0; )
                  t[a++] = 128 | r >> i & 63,
                  i -= 6;
              s += r >= 65536 ? 2 : 1
          }
          return o
      }
      ;
  t.exports = {
      byteLength: r,
      toString: i,
      write: n
  }
}
)),
parcelRequire.register("4z5Zb", (function(t, e) {
  function r(t) {
      return 2 * t.length
  }
  t.exports = {
      byteLength: r,
      toString: function(t) {
          const e = t.byteLength;
          let r = "";
          for (let i = 0; i < e - 1; i += 2)
              r += String.fromCharCode(t[i] + 256 * t[i + 1]);
          return r
      },
      write: function(t, e, i=0, n=r(e)) {
          const o = Math.min(n, t.byteLength - i);
          let s = o;
          for (let r = 0; r < e.length && !((s -= 2) < 0); ++r) {
              const n = e.charCodeAt(r)
                , o = n >> 8
                , s = n % 256;
              t[i + 2 * r] = s,
              t[i + 2 * r + 1] = o
          }
          return o
      }
  }
}
)),
parcelRequire.register("ijUO4", (function(t, e) {
  var r, i, n = (()=>{
      for (var t = new Uint8Array(128), e = 0; e < 64; e++)
          t[e < 26 ? e + 65 : e < 52 ? e + 71 : e < 62 ? e - 4 : 4 * e - 205] = e;
      return e=>{
          for (var r = e.length, i = new Uint8Array(3 * (r - ("=" == e[r - 1]) - ("=" == e[r - 2])) / 4 | 0), n = 0, o = 0; n < r; ) {
              var s = t[e.charCodeAt(n++)]
                , a = t[e.charCodeAt(n++)]
                , u = t[e.charCodeAt(n++)]
                , l = t[e.charCodeAt(n++)];
              i[o++] = s << 2 | a >> 4,
              i[o++] = a << 4 | u >> 2,
              i[o++] = u << 6 | l
          }
          return i
      }
  }
  )(), o = (r = {
      "wasm-binary:./blake2b.wat"(t, e) {
          e.exports = n("AGFzbQEAAAABEANgAn9/AGADf39/AGABfwADBQQAAQICBQUBAQroBwdNBQZtZW1vcnkCAAxibGFrZTJiX2luaXQAAA5ibGFrZTJiX3VwZGF0ZQABDWJsYWtlMmJfZmluYWwAAhBibGFrZTJiX2NvbXByZXNzAAMKvz8EwAIAIABCADcDACAAQgA3AwggAEIANwMQIABCADcDGCAAQgA3AyAgAEIANwMoIABCADcDMCAAQgA3AzggAEIANwNAIABCADcDSCAAQgA3A1AgAEIANwNYIABCADcDYCAAQgA3A2ggAEIANwNwIABCADcDeCAAQoiS853/zPmE6gBBACkDAIU3A4ABIABCu86qptjQ67O7f0EIKQMAhTcDiAEgAEKr8NP0r+68tzxBECkDAIU3A5ABIABC8e30+KWn/aelf0EYKQMAhTcDmAEgAELRhZrv+s+Uh9EAQSApAwCFNwOgASAAQp/Y+dnCkdqCm39BKCkDAIU3A6gBIABC6/qG2r+19sEfQTApAwCFNwOwASAAQvnC+JuRo7Pw2wBBOCkDAIU3A7gBIABCADcDwAEgAEIANwPIASAAQgA3A9ABC20BA38gAEHAAWohAyAAQcgBaiEEIAQpAwCnIQUCQANAIAEgAkYNASAFQYABRgRAIAMgAykDACAFrXw3AwBBACEFIAAQAwsgACAFaiABLQAAOgAAIAVBAWohBSABQQFqIQEMAAsLIAQgBa03AwALYQEDfyAAQcABaiEBIABByAFqIQIgASABKQMAIAIpAwB8NwMAIABCfzcD0AEgAikDAKchAwJAA0AgA0GAAUYNASAAIANqQQA6AAAgA0EBaiEDDAALCyACIAOtNwMAIAAQAwuqOwIgfgl/IABBgAFqISEgAEGIAWohIiAAQZABaiEjIABBmAFqISQgAEGgAWohJSAAQagBaiEmIABBsAFqIScgAEG4AWohKCAhKQMAIQEgIikDACECICMpAwAhAyAkKQMAIQQgJSkDACEFICYpAwAhBiAnKQMAIQcgKCkDACEIQoiS853/zPmE6gAhCUK7zqqm2NDrs7t/IQpCq/DT9K/uvLc8IQtC8e30+KWn/aelfyEMQtGFmu/6z5SH0QAhDUKf2PnZwpHagpt/IQ5C6/qG2r+19sEfIQ9C+cL4m5Gjs/DbACEQIAApAwAhESAAKQMIIRIgACkDECETIAApAxghFCAAKQMgIRUgACkDKCEWIAApAzAhFyAAKQM4IRggACkDQCEZIAApA0ghGiAAKQNQIRsgACkDWCEcIAApA2AhHSAAKQNoIR4gACkDcCEfIAApA3ghICANIAApA8ABhSENIA8gACkD0AGFIQ8gASAFIBF8fCEBIA0gAYVCIIohDSAJIA18IQkgBSAJhUIYiiEFIAEgBSASfHwhASANIAGFQhCKIQ0gCSANfCEJIAUgCYVCP4ohBSACIAYgE3x8IQIgDiAChUIgiiEOIAogDnwhCiAGIAqFQhiKIQYgAiAGIBR8fCECIA4gAoVCEIohDiAKIA58IQogBiAKhUI/iiEGIAMgByAVfHwhAyAPIAOFQiCKIQ8gCyAPfCELIAcgC4VCGIohByADIAcgFnx8IQMgDyADhUIQiiEPIAsgD3whCyAHIAuFQj+KIQcgBCAIIBd8fCEEIBAgBIVCIIohECAMIBB8IQwgCCAMhUIYiiEIIAQgCCAYfHwhBCAQIASFQhCKIRAgDCAQfCEMIAggDIVCP4ohCCABIAYgGXx8IQEgECABhUIgiiEQIAsgEHwhCyAGIAuFQhiKIQYgASAGIBp8fCEBIBAgAYVCEIohECALIBB8IQsgBiALhUI/iiEGIAIgByAbfHwhAiANIAKFQiCKIQ0gDCANfCEMIAcgDIVCGIohByACIAcgHHx8IQIgDSAChUIQiiENIAwgDXwhDCAHIAyFQj+KIQcgAyAIIB18fCEDIA4gA4VCIIohDiAJIA58IQkgCCAJhUIYiiEIIAMgCCAefHwhAyAOIAOFQhCKIQ4gCSAOfCEJIAggCYVCP4ohCCAEIAUgH3x8IQQgDyAEhUIgiiEPIAogD3whCiAFIAqFQhiKIQUgBCAFICB8fCEEIA8gBIVCEIohDyAKIA98IQogBSAKhUI/iiEFIAEgBSAffHwhASANIAGFQiCKIQ0gCSANfCEJIAUgCYVCGIohBSABIAUgG3x8IQEgDSABhUIQiiENIAkgDXwhCSAFIAmFQj+KIQUgAiAGIBV8fCECIA4gAoVCIIohDiAKIA58IQogBiAKhUIYiiEGIAIgBiAZfHwhAiAOIAKFQhCKIQ4gCiAOfCEKIAYgCoVCP4ohBiADIAcgGnx8IQMgDyADhUIgiiEPIAsgD3whCyAHIAuFQhiKIQcgAyAHICB8fCEDIA8gA4VCEIohDyALIA98IQsgByALhUI/iiEHIAQgCCAefHwhBCAQIASFQiCKIRAgDCAQfCEMIAggDIVCGIohCCAEIAggF3x8IQQgECAEhUIQiiEQIAwgEHwhDCAIIAyFQj+KIQggASAGIBJ8fCEBIBAgAYVCIIohECALIBB8IQsgBiALhUIYiiEGIAEgBiAdfHwhASAQIAGFQhCKIRAgCyAQfCELIAYgC4VCP4ohBiACIAcgEXx8IQIgDSAChUIgiiENIAwgDXwhDCAHIAyFQhiKIQcgAiAHIBN8fCECIA0gAoVCEIohDSAMIA18IQwgByAMhUI/iiEHIAMgCCAcfHwhAyAOIAOFQiCKIQ4gCSAOfCEJIAggCYVCGIohCCADIAggGHx8IQMgDiADhUIQiiEOIAkgDnwhCSAIIAmFQj+KIQggBCAFIBZ8fCEEIA8gBIVCIIohDyAKIA98IQogBSAKhUIYiiEFIAQgBSAUfHwhBCAPIASFQhCKIQ8gCiAPfCEKIAUgCoVCP4ohBSABIAUgHHx8IQEgDSABhUIgiiENIAkgDXwhCSAFIAmFQhiKIQUgASAFIBl8fCEBIA0gAYVCEIohDSAJIA18IQkgBSAJhUI/iiEFIAIgBiAdfHwhAiAOIAKFQiCKIQ4gCiAOfCEKIAYgCoVCGIohBiACIAYgEXx8IQIgDiAChUIQiiEOIAogDnwhCiAGIAqFQj+KIQYgAyAHIBZ8fCEDIA8gA4VCIIohDyALIA98IQsgByALhUIYiiEHIAMgByATfHwhAyAPIAOFQhCKIQ8gCyAPfCELIAcgC4VCP4ohByAEIAggIHx8IQQgECAEhUIgiiEQIAwgEHwhDCAIIAyFQhiKIQggBCAIIB58fCEEIBAgBIVCEIohECAMIBB8IQwgCCAMhUI/iiEIIAEgBiAbfHwhASAQIAGFQiCKIRAgCyAQfCELIAYgC4VCGIohBiABIAYgH3x8IQEgECABhUIQiiEQIAsgEHwhCyAGIAuFQj+KIQYgAiAHIBR8fCECIA0gAoVCIIohDSAMIA18IQwgByAMhUIYiiEHIAIgByAXfHwhAiANIAKFQhCKIQ0gDCANfCEMIAcgDIVCP4ohByADIAggGHx8IQMgDiADhUIgiiEOIAkgDnwhCSAIIAmFQhiKIQggAyAIIBJ8fCEDIA4gA4VCEIohDiAJIA58IQkgCCAJhUI/iiEIIAQgBSAafHwhBCAPIASFQiCKIQ8gCiAPfCEKIAUgCoVCGIohBSAEIAUgFXx8IQQgDyAEhUIQiiEPIAogD3whCiAFIAqFQj+KIQUgASAFIBh8fCEBIA0gAYVCIIohDSAJIA18IQkgBSAJhUIYiiEFIAEgBSAafHwhASANIAGFQhCKIQ0gCSANfCEJIAUgCYVCP4ohBSACIAYgFHx8IQIgDiAChUIgiiEOIAogDnwhCiAGIAqFQhiKIQYgAiAGIBJ8fCECIA4gAoVCEIohDiAKIA58IQogBiAKhUI/iiEGIAMgByAefHwhAyAPIAOFQiCKIQ8gCyAPfCELIAcgC4VCGIohByADIAcgHXx8IQMgDyADhUIQiiEPIAsgD3whCyAHIAuFQj+KIQcgBCAIIBx8fCEEIBAgBIVCIIohECAMIBB8IQwgCCAMhUIYiiEIIAQgCCAffHwhBCAQIASFQhCKIRAgDCAQfCEMIAggDIVCP4ohCCABIAYgE3x8IQEgECABhUIgiiEQIAsgEHwhCyAGIAuFQhiKIQYgASAGIBd8fCEBIBAgAYVCEIohECALIBB8IQsgBiALhUI/iiEGIAIgByAWfHwhAiANIAKFQiCKIQ0gDCANfCEMIAcgDIVCGIohByACIAcgG3x8IQIgDSAChUIQiiENIAwgDXwhDCAHIAyFQj+KIQcgAyAIIBV8fCEDIA4gA4VCIIohDiAJIA58IQkgCCAJhUIYiiEIIAMgCCARfHwhAyAOIAOFQhCKIQ4gCSAOfCEJIAggCYVCP4ohCCAEIAUgIHx8IQQgDyAEhUIgiiEPIAogD3whCiAFIAqFQhiKIQUgBCAFIBl8fCEEIA8gBIVCEIohDyAKIA98IQogBSAKhUI/iiEFIAEgBSAafHwhASANIAGFQiCKIQ0gCSANfCEJIAUgCYVCGIohBSABIAUgEXx8IQEgDSABhUIQiiENIAkgDXwhCSAFIAmFQj+KIQUgAiAGIBZ8fCECIA4gAoVCIIohDiAKIA58IQogBiAKhUIYiiEGIAIgBiAYfHwhAiAOIAKFQhCKIQ4gCiAOfCEKIAYgCoVCP4ohBiADIAcgE3x8IQMgDyADhUIgiiEPIAsgD3whCyAHIAuFQhiKIQcgAyAHIBV8fCEDIA8gA4VCEIohDyALIA98IQsgByALhUI/iiEHIAQgCCAbfHwhBCAQIASFQiCKIRAgDCAQfCEMIAggDIVCGIohCCAEIAggIHx8IQQgECAEhUIQiiEQIAwgEHwhDCAIIAyFQj+KIQggASAGIB98fCEBIBAgAYVCIIohECALIBB8IQsgBiALhUIYiiEGIAEgBiASfHwhASAQIAGFQhCKIRAgCyAQfCELIAYgC4VCP4ohBiACIAcgHHx8IQIgDSAChUIgiiENIAwgDXwhDCAHIAyFQhiKIQcgAiAHIB18fCECIA0gAoVCEIohDSAMIA18IQwgByAMhUI/iiEHIAMgCCAXfHwhAyAOIAOFQiCKIQ4gCSAOfCEJIAggCYVCGIohCCADIAggGXx8IQMgDiADhUIQiiEOIAkgDnwhCSAIIAmFQj+KIQggBCAFIBR8fCEEIA8gBIVCIIohDyAKIA98IQogBSAKhUIYiiEFIAQgBSAefHwhBCAPIASFQhCKIQ8gCiAPfCEKIAUgCoVCP4ohBSABIAUgE3x8IQEgDSABhUIgiiENIAkgDXwhCSAFIAmFQhiKIQUgASAFIB18fCEBIA0gAYVCEIohDSAJIA18IQkgBSAJhUI/iiEFIAIgBiAXfHwhAiAOIAKFQiCKIQ4gCiAOfCEKIAYgCoVCGIohBiACIAYgG3x8IQIgDiAChUIQiiEOIAogDnwhCiAGIAqFQj+KIQYgAyAHIBF8fCEDIA8gA4VCIIohDyALIA98IQsgByALhUIYiiEHIAMgByAcfHwhAyAPIAOFQhCKIQ8gCyAPfCELIAcgC4VCP4ohByAEIAggGXx8IQQgECAEhUIgiiEQIAwgEHwhDCAIIAyFQhiKIQggBCAIIBR8fCEEIBAgBIVCEIohECAMIBB8IQwgCCAMhUI/iiEIIAEgBiAVfHwhASAQIAGFQiCKIRAgCyAQfCELIAYgC4VCGIohBiABIAYgHnx8IQEgECABhUIQiiEQIAsgEHwhCyAGIAuFQj+KIQYgAiAHIBh8fCECIA0gAoVCIIohDSAMIA18IQwgByAMhUIYiiEHIAIgByAWfHwhAiANIAKFQhCKIQ0gDCANfCEMIAcgDIVCP4ohByADIAggIHx8IQMgDiADhUIgiiEOIAkgDnwhCSAIIAmFQhiKIQggAyAIIB98fCEDIA4gA4VCEIohDiAJIA58IQkgCCAJhUI/iiEIIAQgBSASfHwhBCAPIASFQiCKIQ8gCiAPfCEKIAUgCoVCGIohBSAEIAUgGnx8IQQgDyAEhUIQiiEPIAogD3whCiAFIAqFQj+KIQUgASAFIB18fCEBIA0gAYVCIIohDSAJIA18IQkgBSAJhUIYiiEFIAEgBSAWfHwhASANIAGFQhCKIQ0gCSANfCEJIAUgCYVCP4ohBSACIAYgEnx8IQIgDiAChUIgiiEOIAogDnwhCiAGIAqFQhiKIQYgAiAGICB8fCECIA4gAoVCEIohDiAKIA58IQogBiAKhUI/iiEGIAMgByAffHwhAyAPIAOFQiCKIQ8gCyAPfCELIAcgC4VCGIohByADIAcgHnx8IQMgDyADhUIQiiEPIAsgD3whCyAHIAuFQj+KIQcgBCAIIBV8fCEEIBAgBIVCIIohECAMIBB8IQwgCCAMhUIYiiEIIAQgCCAbfHwhBCAQIASFQhCKIRAgDCAQfCEMIAggDIVCP4ohCCABIAYgEXx8IQEgECABhUIgiiEQIAsgEHwhCyAGIAuFQhiKIQYgASAGIBh8fCEBIBAgAYVCEIohECALIBB8IQsgBiALhUI/iiEGIAIgByAXfHwhAiANIAKFQiCKIQ0gDCANfCEMIAcgDIVCGIohByACIAcgFHx8IQIgDSAChUIQiiENIAwgDXwhDCAHIAyFQj+KIQcgAyAIIBp8fCEDIA4gA4VCIIohDiAJIA58IQkgCCAJhUIYiiEIIAMgCCATfHwhAyAOIAOFQhCKIQ4gCSAOfCEJIAggCYVCP4ohCCAEIAUgGXx8IQQgDyAEhUIgiiEPIAogD3whCiAFIAqFQhiKIQUgBCAFIBx8fCEEIA8gBIVCEIohDyAKIA98IQogBSAKhUI/iiEFIAEgBSAefHwhASANIAGFQiCKIQ0gCSANfCEJIAUgCYVCGIohBSABIAUgHHx8IQEgDSABhUIQiiENIAkgDXwhCSAFIAmFQj+KIQUgAiAGIBh8fCECIA4gAoVCIIohDiAKIA58IQogBiAKhUIYiiEGIAIgBiAffHwhAiAOIAKFQhCKIQ4gCiAOfCEKIAYgCoVCP4ohBiADIAcgHXx8IQMgDyADhUIgiiEPIAsgD3whCyAHIAuFQhiKIQcgAyAHIBJ8fCEDIA8gA4VCEIohDyALIA98IQsgByALhUI/iiEHIAQgCCAUfHwhBCAQIASFQiCKIRAgDCAQfCEMIAggDIVCGIohCCAEIAggGnx8IQQgECAEhUIQiiEQIAwgEHwhDCAIIAyFQj+KIQggASAGIBZ8fCEBIBAgAYVCIIohECALIBB8IQsgBiALhUIYiiEGIAEgBiARfHwhASAQIAGFQhCKIRAgCyAQfCELIAYgC4VCP4ohBiACIAcgIHx8IQIgDSAChUIgiiENIAwgDXwhDCAHIAyFQhiKIQcgAiAHIBV8fCECIA0gAoVCEIohDSAMIA18IQwgByAMhUI/iiEHIAMgCCAZfHwhAyAOIAOFQiCKIQ4gCSAOfCEJIAggCYVCGIohCCADIAggF3x8IQMgDiADhUIQiiEOIAkgDnwhCSAIIAmFQj+KIQggBCAFIBN8fCEEIA8gBIVCIIohDyAKIA98IQogBSAKhUIYiiEFIAQgBSAbfHwhBCAPIASFQhCKIQ8gCiAPfCEKIAUgCoVCP4ohBSABIAUgF3x8IQEgDSABhUIgiiENIAkgDXwhCSAFIAmFQhiKIQUgASAFICB8fCEBIA0gAYVCEIohDSAJIA18IQkgBSAJhUI/iiEFIAIgBiAffHwhAiAOIAKFQiCKIQ4gCiAOfCEKIAYgCoVCGIohBiACIAYgGnx8IQIgDiAChUIQiiEOIAogDnwhCiAGIAqFQj+KIQYgAyAHIBx8fCEDIA8gA4VCIIohDyALIA98IQsgByALhUIYiiEHIAMgByAUfHwhAyAPIAOFQhCKIQ8gCyAPfCELIAcgC4VCP4ohByAEIAggEXx8IQQgECAEhUIgiiEQIAwgEHwhDCAIIAyFQhiKIQggBCAIIBl8fCEEIBAgBIVCEIohECAMIBB8IQwgCCAMhUI/iiEIIAEgBiAdfHwhASAQIAGFQiCKIRAgCyAQfCELIAYgC4VCGIohBiABIAYgE3x8IQEgECABhUIQiiEQIAsgEHwhCyAGIAuFQj+KIQYgAiAHIB58fCECIA0gAoVCIIohDSAMIA18IQwgByAMhUIYiiEHIAIgByAYfHwhAiANIAKFQhCKIQ0gDCANfCEMIAcgDIVCP4ohByADIAggEnx8IQMgDiADhUIgiiEOIAkgDnwhCSAIIAmFQhiKIQggAyAIIBV8fCEDIA4gA4VCEIohDiAJIA58IQkgCCAJhUI/iiEIIAQgBSAbfHwhBCAPIASFQiCKIQ8gCiAPfCEKIAUgCoVCGIohBSAEIAUgFnx8IQQgDyAEhUIQiiEPIAogD3whCiAFIAqFQj+KIQUgASAFIBt8fCEBIA0gAYVCIIohDSAJIA18IQkgBSAJhUIYiiEFIAEgBSATfHwhASANIAGFQhCKIQ0gCSANfCEJIAUgCYVCP4ohBSACIAYgGXx8IQIgDiAChUIgiiEOIAogDnwhCiAGIAqFQhiKIQYgAiAGIBV8fCECIA4gAoVCEIohDiAKIA58IQogBiAKhUI/iiEGIAMgByAYfHwhAyAPIAOFQiCKIQ8gCyAPfCELIAcgC4VCGIohByADIAcgF3x8IQMgDyADhUIQiiEPIAsgD3whCyAHIAuFQj+KIQcgBCAIIBJ8fCEEIBAgBIVCIIohECAMIBB8IQwgCCAMhUIYiiEIIAQgCCAWfHwhBCAQIASFQhCKIRAgDCAQfCEMIAggDIVCP4ohCCABIAYgIHx8IQEgECABhUIgiiEQIAsgEHwhCyAGIAuFQhiKIQYgASAGIBx8fCEBIBAgAYVCEIohECALIBB8IQsgBiALhUI/iiEGIAIgByAafHwhAiANIAKFQiCKIQ0gDCANfCEMIAcgDIVCGIohByACIAcgH3x8IQIgDSAChUIQiiENIAwgDXwhDCAHIAyFQj+KIQcgAyAIIBR8fCEDIA4gA4VCIIohDiAJIA58IQkgCCAJhUIYiiEIIAMgCCAdfHwhAyAOIAOFQhCKIQ4gCSAOfCEJIAggCYVCP4ohCCAEIAUgHnx8IQQgDyAEhUIgiiEPIAogD3whCiAFIAqFQhiKIQUgBCAFIBF8fCEEIA8gBIVCEIohDyAKIA98IQogBSAKhUI/iiEFIAEgBSARfHwhASANIAGFQiCKIQ0gCSANfCEJIAUgCYVCGIohBSABIAUgEnx8IQEgDSABhUIQiiENIAkgDXwhCSAFIAmFQj+KIQUgAiAGIBN8fCECIA4gAoVCIIohDiAKIA58IQogBiAKhUIYiiEGIAIgBiAUfHwhAiAOIAKFQhCKIQ4gCiAOfCEKIAYgCoVCP4ohBiADIAcgFXx8IQMgDyADhUIgiiEPIAsgD3whCyAHIAuFQhiKIQcgAyAHIBZ8fCEDIA8gA4VCEIohDyALIA98IQsgByALhUI/iiEHIAQgCCAXfHwhBCAQIASFQiCKIRAgDCAQfCEMIAggDIVCGIohCCAEIAggGHx8IQQgECAEhUIQiiEQIAwgEHwhDCAIIAyFQj+KIQggASAGIBl8fCEBIBAgAYVCIIohECALIBB8IQsgBiALhUIYiiEGIAEgBiAafHwhASAQIAGFQhCKIRAgCyAQfCELIAYgC4VCP4ohBiACIAcgG3x8IQIgDSAChUIgiiENIAwgDXwhDCAHIAyFQhiKIQcgAiAHIBx8fCECIA0gAoVCEIohDSAMIA18IQwgByAMhUI/iiEHIAMgCCAdfHwhAyAOIAOFQiCKIQ4gCSAOfCEJIAggCYVCGIohCCADIAggHnx8IQMgDiADhUIQiiEOIAkgDnwhCSAIIAmFQj+KIQggBCAFIB98fCEEIA8gBIVCIIohDyAKIA98IQogBSAKhUIYiiEFIAQgBSAgfHwhBCAPIASFQhCKIQ8gCiAPfCEKIAUgCoVCP4ohBSABIAUgH3x8IQEgDSABhUIgiiENIAkgDXwhCSAFIAmFQhiKIQUgASAFIBt8fCEBIA0gAYVCEIohDSAJIA18IQkgBSAJhUI/iiEFIAIgBiAVfHwhAiAOIAKFQiCKIQ4gCiAOfCEKIAYgCoVCGIohBiACIAYgGXx8IQIgDiAChUIQiiEOIAogDnwhCiAGIAqFQj+KIQYgAyAHIBp8fCEDIA8gA4VCIIohDyALIA98IQsgByALhUIYiiEHIAMgByAgfHwhAyAPIAOFQhCKIQ8gCyAPfCELIAcgC4VCP4ohByAEIAggHnx8IQQgECAEhUIgiiEQIAwgEHwhDCAIIAyFQhiKIQggBCAIIBd8fCEEIBAgBIVCEIohECAMIBB8IQwgCCAMhUI/iiEIIAEgBiASfHwhASAQIAGFQiCKIRAgCyAQfCELIAYgC4VCGIohBiABIAYgHXx8IQEgECABhUIQiiEQIAsgEHwhCyAGIAuFQj+KIQYgAiAHIBF8fCECIA0gAoVCIIohDSAMIA18IQwgByAMhUIYiiEHIAIgByATfHwhAiANIAKFQhCKIQ0gDCANfCEMIAcgDIVCP4ohByADIAggHHx8IQMgDiADhUIgiiEOIAkgDnwhCSAIIAmFQhiKIQggAyAIIBh8fCEDIA4gA4VCEIohDiAJIA58IQkgCCAJhUI/iiEIIAQgBSAWfHwhBCAPIASFQiCKIQ8gCiAPfCEKIAUgCoVCGIohBSAEIAUgFHx8IQQgDyAEhUIQiiEPIAogD3whCiAFIAqFQj+KIQUgISAhKQMAIAEgCYWFNwMAICIgIikDACACIAqFhTcDACAjICMpAwAgAyALhYU3AwAgJCAkKQMAIAQgDIWFNwMAICUgJSkDACAFIA2FhTcDACAmICYpAwAgBiAOhYU3AwAgJyAnKQMAIAcgD4WFNwMAICggKCkDACAIIBCFhTcDAAs=")
      }
  },
  function() {
      return i || (0,
      r[Object.keys(r)[0]])((i = {
          exports: {}
      }).exports, i),
      i.exports
  }
  )(), s = WebAssembly.compile(o);
  t.exports = async t=>(await WebAssembly.instantiate(await s, t)).exports
}
)),
parcelRequire.register("kI7SR", (function(t, e) {
  var r, i, n, o, s, a, u, l, c, h, A, f;
  $parcel$export(t.exports, "prv2pub", (function() {
      return r
  }
  ), (function(t) {
      return r = t
  }
  )),
  $parcel$export(t.exports, "sign", (function() {
      return i
  }
  ), (function(t) {
      return i = t
  }
  )),
  $parcel$export(t.exports, "signMiMC", (function() {
      return n
  }
  ), (function(t) {
      return n = t
  }
  )),
  $parcel$export(t.exports, "signPoseidon", (function() {
      return o
  }
  ), (function(t) {
      return o = t
  }
  )),
  $parcel$export(t.exports, "signMiMCSponge", (function() {
      return s
  }
  ), (function(t) {
      return s = t
  }
  )),
  $parcel$export(t.exports, "verify", (function() {
      return a
  }
  ), (function(t) {
      return a = t
  }
  )),
  $parcel$export(t.exports, "verifyMiMC", (function() {
      return u
  }
  ), (function(t) {
      return u = t
  }
  )),
  $parcel$export(t.exports, "verifyPoseidon", (function() {
      return l
  }
  ), (function(t) {
      return l = t
  }
  )),
  $parcel$export(t.exports, "verifyMiMCSponge", (function() {
      return c
  }
  ), (function(t) {
      return c = t
  }
  )),
  $parcel$export(t.exports, "packSignature", (function() {
      return h
  }
  ), (function(t) {
      return h = t
  }
  )),
  $parcel$export(t.exports, "unpackSignature", (function() {
      return A
  }
  ), (function(t) {
      return A = t
  }
  )),
  $parcel$export(t.exports, "pruneBuffer", (function() {
      return f
  }
  ), (function(t) {
      return f = t
  }
  ));
  var p = parcelRequire("bdjQ6").Buffer
    , g = parcelRequire("3up9Y")
    , d = parcelRequire("1lbVy").bigInt
    , I = parcelRequire("jtAIf")
    , m = parcelRequire("bt6mT").hash
    , y = parcelRequire("f1fXJ")
    , w = parcelRequire("kBWvB")
    , C = parcelRequire("3aec6");
  function E(t) {
      const e = p.from(t);
      return e[0] = 248 & e[0],
      e[31] = 127 & e[31],
      e[31] = 64 | e[31],
      e
  }
  r = function(t) {
      const e = E(g("blake512").update(t).digest().slice(0, 32));
      let r = d.leBuff2int(e);
      return I.mulPointEscalar(I.Base8, r.shr(3))
  }
  ,
  i = function(t, e) {
      const r = g("blake512").update(t).digest()
        , i = E(r.slice(0, 32))
        , n = d.leBuff2int(i)
        , o = I.mulPointEscalar(I.Base8, n.shr(3))
        , s = g("blake512").update(p.concat([r.slice(32, 64), e])).digest();
      let a = d.leBuff2int(s);
      a = a.mod(I.subOrder);
      const u = I.mulPointEscalar(I.Base8, a)
        , l = I.packPoint(u)
        , c = I.packPoint(o)
        , h = m(p.concat([l, c, e]))
        , A = d.leBuff2int(h)
        , f = a.add(A.mul(n)).mod(I.subOrder);
      return {
          R8: u,
          S: f
      }
  }
  ,
  n = function(t, e) {
      const r = g("blake512").update(t).digest()
        , i = E(r.slice(0, 32))
        , n = d.leBuff2int(i)
        , o = I.mulPointEscalar(I.Base8, n.shr(3))
        , s = d.leInt2Buff(e, 32)
        , a = g("blake512").update(p.concat([r.slice(32, 64), s])).digest();
      let u = d.leBuff2int(a);
      u = u.mod(I.subOrder);
      const l = I.mulPointEscalar(I.Base8, u)
        , c = y.multiHash([l[0], l[1], o[0], o[1], e])
        , h = u.add(c.mul(n)).mod(I.subOrder);
      return {
          R8: l,
          S: h
      }
  }
  ,
  o = function(t, e) {
      const r = g("blake512").update(t).digest()
        , i = E(r.slice(0, 32))
        , n = d.leBuff2int(i)
        , o = I.mulPointEscalar(I.Base8, n.shr(3))
        , s = d.leInt2Buff(e, 32)
        , a = g("blake512").update(p.concat([r.slice(32, 64), s])).digest();
      let u = d.leBuff2int(a);
      u = u.mod(I.subOrder);
      const l = I.mulPointEscalar(I.Base8, u)
        , c = w.createHash(6, 8, 57)([l[0], l[1], o[0], o[1], e])
        , h = u.add(c.mul(n)).mod(I.subOrder);
      return {
          R8: l,
          S: h
      }
  }
  ,
  s = function(t, e) {
      const r = g("blake512").update(t).digest()
        , i = E(r.slice(0, 32))
        , n = d.leBuff2int(i)
        , o = I.mulPointEscalar(I.Base8, n.shr(3))
        , s = d.leInt2Buff(e, 32)
        , a = g("blake512").update(p.concat([r.slice(32, 64), s])).digest();
      let u = d.leBuff2int(a);
      u = u.mod(I.subOrder);
      const l = I.mulPointEscalar(I.Base8, u)
        , c = C.multiHash([l[0], l[1], o[0], o[1], e])
        , h = u.add(c.mul(n)).mod(I.subOrder);
      return {
          R8: l,
          S: h
      }
  }
  ,
  a = function(t, e, r) {
      if ("object" != typeof e)
          return !1;
      if (!Array.isArray(e.R8))
          return !1;
      if (2 != e.R8.length)
          return !1;
      if (!I.inCurve(e.R8))
          return !1;
      if (!Array.isArray(r))
          return !1;
      if (2 != r.length)
          return !1;
      if (!I.inCurve(r))
          return !1;
      if (e.S >= I.subOrder)
          return !1;
      const i = I.packPoint(e.R8)
        , n = I.packPoint(r)
        , o = m(p.concat([i, n, t]))
        , s = d.leBuff2int(o)
        , a = I.mulPointEscalar(I.Base8, e.S);
      let u = I.mulPointEscalar(r, s.mul(d("8")));
      return u = I.addPoint(e.R8, u),
      !!a[0].equals(u[0]) && !!a[1].equals(u[1])
  }
  ,
  u = function(t, e, r) {
      if ("object" != typeof e)
          return !1;
      if (!Array.isArray(e.R8))
          return !1;
      if (2 != e.R8.length)
          return !1;
      if (!I.inCurve(e.R8))
          return !1;
      if (!Array.isArray(r))
          return !1;
      if (2 != r.length)
          return !1;
      if (!I.inCurve(r))
          return !1;
      if (e.S >= I.subOrder)
          return !1;
      const i = y.multiHash([e.R8[0], e.R8[1], r[0], r[1], t])
        , n = I.mulPointEscalar(I.Base8, e.S);
      let o = I.mulPointEscalar(r, i.mul(d("8")));
      return o = I.addPoint(e.R8, o),
      !!n[0].equals(o[0]) && !!n[1].equals(o[1])
  }
  ,
  l = function(t, e, r) {
      if ("object" != typeof e)
          return !1;
      if (!Array.isArray(e.R8))
          return !1;
      if (2 != e.R8.length)
          return !1;
      if (!I.inCurve(e.R8))
          return !1;
      if (!Array.isArray(r))
          return !1;
      if (2 != r.length)
          return !1;
      if (!I.inCurve(r))
          return !1;
      if (e.S >= I.subOrder)
          return !1;
      const i = w.createHash(6, 8, 57)([e.R8[0], e.R8[1], r[0], r[1], t])
        , n = I.mulPointEscalar(I.Base8, e.S);
      let o = I.mulPointEscalar(r, i.mul(d("8")));
      return o = I.addPoint(e.R8, o),
      !!n[0].equals(o[0]) && !!n[1].equals(o[1])
  }
  ,
  c = function(t, e, r) {
      if ("object" != typeof e)
          return !1;
      if (!Array.isArray(e.R8))
          return !1;
      if (2 != e.R8.length)
          return !1;
      if (!I.inCurve(e.R8))
          return !1;
      if (!Array.isArray(r))
          return !1;
      if (2 != r.length)
          return !1;
      if (!I.inCurve(r))
          return !1;
      if (e.S >= I.subOrder)
          return !1;
      const i = C.multiHash([e.R8[0], e.R8[1], r[0], r[1], t])
        , n = I.mulPointEscalar(I.Base8, e.S);
      let o = I.mulPointEscalar(r, i.mul(d("8")));
      return o = I.addPoint(e.R8, o),
      !!n[0].equals(o[0]) && !!n[1].equals(o[1])
  }
  ,
  h = function(t) {
      const e = I.packPoint(t.R8)
        , r = d.leInt2Buff(t.S, 32);
      return p.concat([e, r])
  }
  ,
  A = function(t) {
      return {
          R8: I.unpackPoint(t.slice(0, 32)),
          S: d.leBuff2int(t.slice(32, 64))
      }
  }
  ,
  f = E
}
)),
parcelRequire.register("3up9Y", (function(t, e) {
  t.exports = parcelRequire("lGvww")(parcelRequire("iypc6"))
}
)),
parcelRequire.register("lGvww", (function(t, e) {
  var r = parcelRequire("iy2ef");
  t.exports = function(t) {
      return function(e, i) {
          var n = function(e) {
              switch ("string" == typeof e ? e.toLowerCase() : e) {
              case "blake224":
                  return t.Blake224;
              case "blake256":
                  return t.Blake256;
              case "blake384":
                  return t.Blake384;
              case "blake512":
                  return t.Blake512;
              default:
                  throw new Error("Invald algorithm: " + e)
              }
          }(e);
          return new r(new n,i)
      }
  }
}
)),
parcelRequire.register("iy2ef", (function(t, e) {
  var r = parcelRequire("bdjQ6").Buffer
    , i = parcelRequire("3DkjE").Transform;
  function n(t, e) {
      i.call(this, e),
      this._engine = t,
      this._finalized = !1
  }
  parcelRequire("dhT4G")(n, i),
  n.prototype._transform = function(t, e, r) {
      var i = null;
      try {
          this.update(t, e)
      } catch (t) {
          i = t
      }
      r(i)
  }
  ,
  n.prototype._flush = function(t) {
      var e = null;
      try {
          this.push(this.digest())
      } catch (t) {
          e = t
      }
      t(e)
  }
  ,
  n.prototype.update = function(t, e) {
      if (!r.isBuffer(t) && "string" != typeof t)
          throw new TypeError("Data must be a string or a buffer");
      if (this._finalized)
          throw new Error("Digest already called");
      return r.isBuffer(t) || (t = r.from(t, e)),
      this._engine.update(t),
      this
  }
  ,
  n.prototype.digest = function(t) {
      if (this._finalized)
          throw new Error("Digest already called");
      this._finalized = !0;
      var e = this._engine.digest();
      return void 0 !== t && (e = e.toString(t)),
      e
  }
  ,
  t.exports = n
}
)),
parcelRequire.register("iypc6", (function(t, e) {
  t.exports = {
      Blake224: parcelRequire("jAphk"),
      Blake256: parcelRequire("fA9Ys"),
      Blake384: parcelRequire("64foE"),
      Blake512: parcelRequire("lGhEu")
  }
}
)),
parcelRequire.register("jAphk", (function(t, e) {
  var r = parcelRequire("bdjQ6").Buffer
    , i = parcelRequire("dhT4G")
    , n = parcelRequire("fA9Ys")
    , o = r.from([0])
    , s = r.from([128]);
  function a() {
      n.call(this),
      this._h = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428],
      this._zo = o,
      this._oo = s
  }
  i(a, n),
  a.prototype.digest = function() {
      this._padding();
      for (var t = r.alloc(28), e = 0; e < 7; ++e)
          t.writeUInt32BE(this._h[e], 4 * e);
      return t
  }
  ,
  t.exports = a
}
)),
parcelRequire.register("fA9Ys", (function(t, e) {
  var r = parcelRequire("bdjQ6").Buffer
    , i = parcelRequire("dhT4G")
    , n = parcelRequire("cJWaw")
    , o = r.from([1])
    , s = r.from([129]);
  function a(t, e) {
      return (t << 32 - e | t >>> e) >>> 0
  }
  function u(t, e, r, i, o, s, u, l) {
      var c = n.sigma
        , h = n.u256;
      t[i] = t[i] + ((e[c[r][l]] ^ h[c[r][l + 1]]) >>> 0) + t[o] >>> 0,
      t[u] = a(t[u] ^ t[i], 16),
      t[s] = t[s] + t[u] >>> 0,
      t[o] = a(t[o] ^ t[s], 12),
      t[i] = t[i] + ((e[c[r][l + 1]] ^ h[c[r][l]]) >>> 0) + t[o] >>> 0,
      t[u] = a(t[u] ^ t[i], 8),
      t[s] = t[s] + t[u] >>> 0,
      t[o] = a(t[o] ^ t[s], 7)
  }
  function l() {
      n.call(this),
      this._h = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225],
      this._s = [0, 0, 0, 0],
      this._block = r.alloc(64),
      this._blockOffset = 0,
      this._length = [0, 0],
      this._nullt = !1,
      this._zo = o,
      this._oo = s
  }
  i(l, n),
  l.prototype._compress = function() {
      var t, e = n.u256, r = new Array(16), i = new Array(16);
      for (t = 0; t < 16; ++t)
          i[t] = this._block.readUInt32BE(4 * t);
      for (t = 0; t < 8; ++t)
          r[t] = this._h[t] >>> 0;
      for (t = 8; t < 12; ++t)
          r[t] = (this._s[t - 8] ^ e[t - 8]) >>> 0;
      for (t = 12; t < 16; ++t)
          r[t] = e[t - 8];
      for (this._nullt || (r[12] = (r[12] ^ this._length[0]) >>> 0,
      r[13] = (r[13] ^ this._length[0]) >>> 0,
      r[14] = (r[14] ^ this._length[1]) >>> 0,
      r[15] = (r[15] ^ this._length[1]) >>> 0),
      t = 0; t < 14; ++t)
          u(r, i, t, 0, 4, 8, 12, 0),
          u(r, i, t, 1, 5, 9, 13, 2),
          u(r, i, t, 2, 6, 10, 14, 4),
          u(r, i, t, 3, 7, 11, 15, 6),
          u(r, i, t, 0, 5, 10, 15, 8),
          u(r, i, t, 1, 6, 11, 12, 10),
          u(r, i, t, 2, 7, 8, 13, 12),
          u(r, i, t, 3, 4, 9, 14, 14);
      for (t = 0; t < 16; ++t)
          this._h[t % 8] = (this._h[t % 8] ^ r[t]) >>> 0;
      for (t = 0; t < 8; ++t)
          this._h[t] = (this._h[t] ^ this._s[t % 4]) >>> 0
  }
  ,
  l.prototype._padding = function() {
      var t = this._length[0] + 8 * this._blockOffset
        , e = this._length[1];
      t >= 4294967296 && (t -= 4294967296,
      e += 1);
      var i = r.alloc(8);
      i.writeUInt32BE(e, 0),
      i.writeUInt32BE(t, 4),
      55 === this._blockOffset ? (this._length[0] -= 8,
      this.update(this._oo)) : (this._blockOffset < 55 ? (0 === this._blockOffset && (this._nullt = !0),
      this._length[0] -= 8 * (55 - this._blockOffset),
      this.update(n.padding.slice(0, 55 - this._blockOffset))) : (this._length[0] -= 8 * (64 - this._blockOffset),
      this.update(n.padding.slice(0, 64 - this._blockOffset)),
      this._length[0] -= 440,
      this.update(n.padding.slice(1, 56)),
      this._nullt = !0),
      this.update(this._zo),
      this._length[0] -= 8),
      this._length[0] -= 64,
      this.update(i)
  }
  ,
  l.prototype.digest = function() {
      this._padding();
      for (var t = r.alloc(32), e = 0; e < 8; ++e)
          t.writeUInt32BE(this._h[e], 4 * e);
      return t
  }
  ,
  t.exports = l
}
)),
parcelRequire.register("cJWaw", (function(t, e) {
  var r = parcelRequire("bdjQ6").Buffer;
  function i() {}
  i.sigma = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], [14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3], [11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4], [7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8], [9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13], [2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9], [12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11], [13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10], [6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5], [10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], [14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3], [11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4], [7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8], [9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13], [2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9]],
  i.u256 = [608135816, 2242054355, 320440878, 57701188, 2752067618, 698298832, 137296536, 3964562569, 1160258022, 953160567, 3193202383, 887688300, 3232508343, 3380367581, 1065670069, 3041331479],
  i.u512 = [608135816, 2242054355, 320440878, 57701188, 2752067618, 698298832, 137296536, 3964562569, 1160258022, 953160567, 3193202383, 887688300, 3232508343, 3380367581, 1065670069, 3041331479, 2450970073, 2306472731, 3509652390, 2564797868, 805139163, 3491422135, 3101798381, 1780907670, 3128725573, 4046225305, 614570311, 3012652279, 134345442, 2240740374, 1667834072, 1901547113],
  i.padding = r.from([128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
  i.prototype._length_carry = function(t) {
      for (var e = 0; e < t.length && !(t[e] < 4294967296); ++e)
          t[e] -= 4294967296,
          t[e + 1] += 1
  }
  ,
  i.prototype.update = function(t) {
      for (var e = this._block, r = 0; this._blockOffset + t.length - r >= e.length; ) {
          for (var i = this._blockOffset; i < e.length; )
              e[i++] = t[r++];
          this._length[0] += 8 * e.length,
          this._length_carry(this._length),
          this._compress(),
          this._blockOffset = 0
      }
      for (; r < t.length; )
          e[this._blockOffset++] = t[r++]
  }
  ,
  t.exports = i
}
)),
parcelRequire.register("64foE", (function(t, e) {
  var r = parcelRequire("bdjQ6").Buffer
    , i = parcelRequire("dhT4G")
    , n = parcelRequire("lGhEu")
    , o = r.from([0])
    , s = r.from([128]);
  function a() {
      n.call(this),
      this._h = [3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999, 355462360, 4144912697, 1731405415, 4290775857, 2394180231, 1750603025, 3675008525, 1694076839, 1203062813, 3204075428],
      this._zo = o,
      this._oo = s
  }
  i(a, n),
  a.prototype.digest = function() {
      this._padding();
      for (var t = r.alloc(48), e = 0; e < 12; ++e)
          t.writeUInt32BE(this._h[e], 4 * e);
      return t
  }
  ,
  t.exports = a
}
)),
parcelRequire.register("lGhEu", (function(t, e) {
  var r = parcelRequire("bdjQ6").Buffer
    , i = parcelRequire("dhT4G")
    , n = parcelRequire("cJWaw")
    , o = r.from([1])
    , s = r.from([129]);
  function a(t, e, r, i) {
      var n = t[2 * e] ^ t[2 * r]
        , o = t[2 * e + 1] ^ t[2 * r + 1];
      i >= 32 && (o ^= n,
      o ^= n ^= o,
      i -= 32),
      0 === i ? (t[2 * e] = n >>> 0,
      t[2 * e + 1] = o >>> 0) : (t[2 * e] = (n >>> i | o << 32 - i) >>> 0,
      t[2 * e + 1] = (o >>> i | n << 32 - i) >>> 0)
  }
  function u(t, e, r, i, o, s, u, l) {
      var c, h = n.sigma, A = n.u512;
      c = t[2 * i + 1] + ((e[2 * h[r][l] + 1] ^ A[2 * h[r][l + 1] + 1]) >>> 0) + t[2 * o + 1],
      t[2 * i] = t[2 * i] + ((e[2 * h[r][l]] ^ A[2 * h[r][l + 1]]) >>> 0) + t[2 * o] + ~~(c / 4294967296) >>> 0,
      t[2 * i + 1] = c >>> 0,
      a(t, u, i, 32),
      c = t[2 * s + 1] + t[2 * u + 1],
      t[2 * s] = t[2 * s] + t[2 * u] + ~~(c / 4294967296) >>> 0,
      t[2 * s + 1] = c >>> 0,
      a(t, o, s, 25),
      c = t[2 * i + 1] + ((e[2 * h[r][l + 1] + 1] ^ A[2 * h[r][l] + 1]) >>> 0) + t[2 * o + 1],
      t[2 * i] = t[2 * i] + ((e[2 * h[r][l + 1]] ^ A[2 * h[r][l]]) >>> 0) + t[2 * o] + ~~(c / 4294967296) >>> 0,
      t[2 * i + 1] = c >>> 0,
      a(t, u, i, 16),
      c = t[2 * s + 1] + t[2 * u + 1],
      t[2 * s] = t[2 * s] + t[2 * u] + ~~(c / 4294967296) >>> 0,
      t[2 * s + 1] = c >>> 0,
      a(t, o, s, 11)
  }
  function l() {
      n.call(this),
      this._h = [1779033703, 4089235720, 3144134277, 2227873595, 1013904242, 4271175723, 2773480762, 1595750129, 1359893119, 2917565137, 2600822924, 725511199, 528734635, 4215389547, 1541459225, 327033209],
      this._s = [0, 0, 0, 0, 0, 0, 0, 0],
      this._block = r.alloc(128),
      this._blockOffset = 0,
      this._length = [0, 0, 0, 0],
      this._nullt = !1,
      this._zo = o,
      this._oo = s
  }
  i(l, n),
  l.prototype._compress = function() {
      var t, e = n.u512, r = new Array(32), i = new Array(32);
      for (t = 0; t < 32; ++t)
          i[t] = this._block.readUInt32BE(4 * t);
      for (t = 0; t < 16; ++t)
          r[t] = this._h[t] >>> 0;
      for (t = 16; t < 24; ++t)
          r[t] = (this._s[t - 16] ^ e[t - 16]) >>> 0;
      for (t = 24; t < 32; ++t)
          r[t] = e[t - 16];
      for (this._nullt || (r[24] = (r[24] ^ this._length[1]) >>> 0,
      r[25] = (r[25] ^ this._length[0]) >>> 0,
      r[26] = (r[26] ^ this._length[1]) >>> 0,
      r[27] = (r[27] ^ this._length[0]) >>> 0,
      r[28] = (r[28] ^ this._length[3]) >>> 0,
      r[29] = (r[29] ^ this._length[2]) >>> 0,
      r[30] = (r[30] ^ this._length[3]) >>> 0,
      r[31] = (r[31] ^ this._length[2]) >>> 0),
      t = 0; t < 16; ++t)
          u(r, i, t, 0, 4, 8, 12, 0),
          u(r, i, t, 1, 5, 9, 13, 2),
          u(r, i, t, 2, 6, 10, 14, 4),
          u(r, i, t, 3, 7, 11, 15, 6),
          u(r, i, t, 0, 5, 10, 15, 8),
          u(r, i, t, 1, 6, 11, 12, 10),
          u(r, i, t, 2, 7, 8, 13, 12),
          u(r, i, t, 3, 4, 9, 14, 14);
      for (t = 0; t < 16; ++t)
          this._h[t % 8 * 2] = (this._h[t % 8 * 2] ^ r[2 * t]) >>> 0,
          this._h[t % 8 * 2 + 1] = (this._h[t % 8 * 2 + 1] ^ r[2 * t + 1]) >>> 0;
      for (t = 0; t < 8; ++t)
          this._h[2 * t] = (this._h[2 * t] ^ this._s[t % 4 * 2]) >>> 0,
          this._h[2 * t + 1] = (this._h[2 * t + 1] ^ this._s[t % 4 * 2 + 1]) >>> 0
  }
  ,
  l.prototype._padding = function() {
      var t = this._length.slice();
      t[0] += 8 * this._blockOffset,
      this._length_carry(t);
      for (var e = r.alloc(16), i = 0; i < 4; ++i)
          e.writeUInt32BE(t[3 - i], 4 * i);
      111 === this._blockOffset ? (this._length[0] -= 8,
      this.update(this._oo)) : (this._blockOffset < 111 ? (0 === this._blockOffset && (this._nullt = !0),
      this._length[0] -= 8 * (111 - this._blockOffset),
      this.update(n.padding.slice(0, 111 - this._blockOffset))) : (this._length[0] -= 8 * (128 - this._blockOffset),
      this.update(n.padding.slice(0, 128 - this._blockOffset)),
      this._length[0] -= 888,
      this.update(n.padding.slice(1, 112)),
      this._nullt = !0),
      this.update(this._zo),
      this._length[0] -= 8),
      this._length[0] -= 128,
      this.update(e)
  }
  ,
  l.prototype.digest = function() {
      this._padding();
      for (var t = r.alloc(64), e = 0; e < 16; ++e)
          t.writeUInt32BE(this._h[e], 4 * e);
      return t
  }
  ,
  t.exports = l
}
)),
parcelRequire.register("jtAIf", (function(t, e) {
  var r, i, n, o, s, a, u, l, c, h, A, f, p;
  $parcel$export(t.exports, "addPoint", (function() {
      return r
  }
  ), (function(t) {
      return r = t
  }
  )),
  $parcel$export(t.exports, "mulPointEscalar", (function() {
      return i
  }
  ), (function(t) {
      return i = t
  }
  )),
  $parcel$export(t.exports, "inCurve", (function() {
      return n
  }
  ), (function(t) {
      return n = t
  }
  )),
  $parcel$export(t.exports, "inSubgroup", (function() {
      return o
  }
  ), (function(t) {
      return o = t
  }
  )),
  $parcel$export(t.exports, "packPoint", (function() {
      return s
  }
  ), (function(t) {
      return s = t
  }
  )),
  $parcel$export(t.exports, "unpackPoint", (function() {
      return a
  }
  ), (function(t) {
      return a = t
  }
  )),
  $parcel$export(t.exports, "Generator", (function() {
      return u
  }
  ), (function(t) {
      return u = t
  }
  )),
  $parcel$export(t.exports, "Base8", (function() {
      return l
  }
  ), (function(t) {
      return l = t
  }
  )),
  $parcel$export(t.exports, "order", (function() {
      return c
  }
  ), (function(t) {
      return c = t
  }
  )),
  $parcel$export(t.exports, "subOrder", (function() {
      return h
  }
  ), (function(t) {
      return h = t
  }
  )),
  $parcel$export(t.exports, "p", (function() {
      return A
  }
  ), (function(t) {
      return A = t
  }
  )),
  $parcel$export(t.exports, "A", (function() {
      return f
  }
  ), (function(t) {
      return f = t
  }
  )),
  $parcel$export(t.exports, "D", (function() {
      return p
  }
  ), (function(t) {
      return p = t
  }
  ));
  var g = parcelRequire("bdjQ6").Buffer
    , d = parcelRequire("1lbVy").bn128
    , I = parcelRequire("1lbVy").bigInt;
  function m(t, e) {
      const r = d.r
        , i = [];
      return i[0] = I(I(t[0]).mul(e[1]).add(I(e[0]).mul(t[1])).mul(I(I("1").add(p.mul(t[0]).mul(e[0]).mul(t[1]).mul(e[1]))).inverse(r))).affine(r),
      i[1] = I(I(t[1]).mul(e[1]).sub(f.mul(t[0]).mul(e[0])).mul(I(I("1").sub(p.mul(t[0]).mul(e[0]).mul(t[1]).mul(e[1]))).inverse(r))).affine(r),
      i
  }
  function y(t, e) {
      let r = [I("0"), I("1")]
        , i = I(e)
        , n = t;
      for (; !i.isZero(); )
          i.isOdd() && (r = m(r, n)),
          n = m(n, n),
          i = i.shr(1);
      return r
  }
  function w(t) {
      const e = d.Fr
        , r = e.square(t[0])
        , i = e.square(t[1]);
      return !!e.equals(e.add(e.mul(f, r), i), e.add(e.one, e.mul(e.mul(r, i), p)))
  }
  r = m,
  i = y,
  n = w,
  o = function(t) {
      if (!w(t))
          return !1;
      const e = y(t, h);
      return e[0].equals(I(0)) && e[1].equals(I(1))
  }
  ,
  s = function(t) {
      const e = I.leInt2Buff(t[1], 32);
      t[0].greater(A.shr(1)) && (e[31] = 128 | e[31]);
      return e
  }
  ,
  a = function(t) {
      const e = d.Fr
        , r = g.from(t);
      let i = !1;
      const n = new Array(2);
      128 & r[31] && (i = !0,
      r[31] = 127 & r[31]);
      if (n[1] = I.leBuff2int(r),
      n[1].greaterOrEquals(A))
          return null;
      const o = e.square(n[1]);
      let s = e.sqrt(e.div(e.sub(e.one, o), e.sub(f, e.mul(p, o))));
      if (null == s)
          return null;
      i && (s = e.neg(s));
      return n[0] = e.affine(s),
      n
  }
  ,
  u = [I("995203441582195749578291179787384436505546430278305826713579947235728471134"), I("5472060717959818805561601436314318772137091100104008585924551046643952123905")],
  l = [I("5299619240641551281634865583518297030282874472190772894086521144482721001553"), I("16950150798460657717958625567821834550301663161624707787222815936182638968203")],
  c = I("21888242871839275222246405745257275088614511777268538073601725287587578984328"),
  h = c.shr(3),
  A = d.r,
  f = I("168700"),
  p = I("168696")
}
)),
parcelRequire.register("bt6mT", (function(t, e) {
  var r, i;
  $parcel$export(t.exports, "hash", (function() {
      return r
  }
  ), (function(t) {
      return r = t
  }
  )),
  $parcel$export(t.exports, "getBasePoint", (function() {
      return i
  }
  ), (function(t) {
      return i = t
  }
  ));
  parcelRequire("1lbVy").bn128;
  var n = parcelRequire("1lbVy").bigInt
    , o = parcelRequire("jtAIf")
    , s = parcelRequire("3up9Y");
  r = function(t) {
      const e = function(t) {
          const e = new Array(8 * t.length);
          for (let r = 0; r < t.length; r++) {
              const i = t[r];
              e[8 * r] = 1 & i,
              e[8 * r + 1] = 2 & i,
              e[8 * r + 2] = 4 & i,
              e[8 * r + 3] = 8 & i,
              e[8 * r + 4] = 16 & i,
              e[8 * r + 5] = 32 & i,
              e[8 * r + 6] = 64 & i,
              e[8 * r + 7] = 128 & i
          }
          return e
      }(t)
        , r = Math.floor((e.length - 1) / 200) + 1;
      let i = [n.zero, n.one];
      for (let t = 0; t < r; t++) {
          let s;
          s = t == r - 1 ? Math.floor((e.length - 200 * (r - 1) - 1) / 4) + 1 : 50;
          let a = n.zero
            , l = n.one;
          for (let r = 0; r < s; r++) {
              let i = 200 * t + 4 * r
                , o = n.one;
              for (let t = 0; t < 3 && i < e.length; t++)
                  e[i] && (o = o.add(n.one.shl(t))),
                  i++;
              i < e.length && (e[i] && (o = o.neg()),
              i++),
              a = a.add(o.mul(l)),
              l = l.shl(5)
          }
          a.lesser(n.zero) && (a = o.subOrder.add(a)),
          i = o.addPoint(i, o.mulPointEscalar(u(t), a))
      }
      return o.packPoint(i)
  }
  ,
  i = u;
  let a = [];
  function u(t) {
      if (t < a.length)
          return a[t];
      let e = null
        , r = 0;
      for (; null == e; ) {
          const i = "PedersenGenerator_" + l(t, 32) + "_" + l(r, 32)
            , n = s("blake256").update(i).digest();
          n[31] = 191 & n[31],
          e = o.unpackPoint(n),
          r++
      }
      const i = o.mulPointEscalar(e, 8);
      if (!o.inSubgroup(i))
          throw new Error("Point not in curve");
      return a[t] = i,
      i
  }
  function l(t, e) {
      let r = "" + t;
      for (; r.length < e; )
          r = "0" + r;
      return r
  }
}
)),
parcelRequire.register("f1fXJ", (function(t, e) {
  var r, i, n, o;
  $parcel$export(t.exports, "getIV", (function() {
      return r
  }
  ), (function(t) {
      return r = t
  }
  )),
  $parcel$export(t.exports, "getConstants", (function() {
      return i
  }
  ), (function(t) {
      return i = t
  }
  )),
  $parcel$export(t.exports, "hash", (function() {
      return n
  }
  ), (function(t) {
      return n = t
  }
  )),
  $parcel$export(t.exports, "multiHash", (function() {
      return o
  }
  ), (function(t) {
      return o = t
  }
  ));
  var s = parcelRequire("1lbVy").bn128
    , a = parcelRequire("1lbVy").bigInt
    , u = parcelRequire("hNzKf");
  const l = s.Fr
    , c = "mimc";
  r = t=>{
      void 0 === t && (t = c);
      const e = u.keccak256(t + "_iv");
      return a(u.toBN(e).toString()).mod(l.q)
  }
  ;
  const h = (i = (t,e)=>{
      void 0 === t && (t = c),
      void 0 === e && (e = 91);
      const r = new Array(e);
      let i = u.keccak256(c);
      for (let t = 1; t < e; t++) {
          i = u.keccak256(i);
          const e = u.toBN(i).mod(u.toBN(l.q.toString()))
            , n = u.padLeft(u.toHex(e), 64);
          r[t] = a(u.toBN(n).toString())
      }
      return r[0] = a(0),
      r
  }
  )(c, 91);
  n = (t,e)=>{
      const r = a(t)
        , i = a(e);
      let n;
      for (let t = 0; t < 91; t++) {
          const e = h[t]
            , o = 0 == t ? l.add(r, i) : l.add(l.add(n, i), e);
          n = l.exp(o, 7)
      }
      return l.affine(l.add(n, i))
  }
  ,
  o = (t,e)=>{
      let r;
      r = void 0 === e ? l.zero : e;
      for (let e = 0; e < t.length; e++)
          r = l.add(l.add(r, t[e]), n(a(t[e]), r));
      return l.affine(r)
  }
}
)),
parcelRequire.register("hNzKf", (function(t, e) {
  var r = parcelRequire("g2hxm")
    , i = parcelRequire("gdDvH")
    , n = parcelRequire("813YP")
    , o = parcelRequire("f08he")
    , s = parcelRequire("aVh2m")
    , a = function(t, e) {
      var r = [];
      return e.forEach((function(e) {
          if ("object" == typeof e.components) {
              if ("tuple" !== e.type.substring(0, 5))
                  throw new Error("components found but type is not tuple; report on GitHub");
              var i = ""
                , n = e.type.indexOf("[");
              n >= 0 && (i = e.type.substring(n));
              var o = a(t, e.components);
              Array.isArray(o) && t ? r.push("tuple(" + o.join(",") + ")" + i) : t ? r.push("(" + o + ")") : r.push("(" + o.join(",") + ")" + i)
          } else
              r.push(e.type)
      }
      )),
      r
  }
    , u = function(t) {
      if (!i.isHexStrict(t))
          throw new Error("The parameter must be a valid HEX string.");
      var e = ""
        , r = 0
        , n = t.length;
      for ("0x" === t.substring(0, 2) && (r = 2); r < n; r += 2) {
          var o = parseInt(t.slice(r, r + 2), 16);
          e += String.fromCharCode(o)
      }
      return e
  }
    , l = function(t) {
      if (!t)
          return "0x00";
      for (var e = "", r = 0; r < t.length; r++) {
          var i = t.charCodeAt(r).toString(16);
          e += i.length < 2 ? "0" + i : i
      }
      return "0x" + e
  }
    , c = function(t) {
      if (t = t ? t.toLowerCase() : "ether",
      !r.unitMap[t])
          throw new Error('This unit "' + t + "\" doesn't exist, please use the one of the following units" + JSON.stringify(r.unitMap, null, 2));
      return t
  };
  t.exports = {
      _fireError: function(t, e, r, i, n) {
          return !t || "object" != typeof t || t instanceof Error || !t.data || ((t.data && "object" == typeof t.data || Array.isArray(t.data)) && (t.data = JSON.stringify(t.data, null, 2)),
          t = t.message + "\n" + t.data),
          "string" == typeof t && (t = new Error(t)),
          "function" == typeof i && i(t, n),
          "function" == typeof r && ((e && "function" == typeof e.listeners && e.listeners("error").length || "function" == typeof i) && e.catch((function() {}
          )),
          setTimeout((function() {
              r(t)
          }
          ), 1)),
          e && "function" == typeof e.emit && setTimeout((function() {
              e.emit("error", t, n),
              e.removeAllListeners()
          }
          ), 1),
          e
      },
      _jsonInterfaceMethodToString: function(t) {
          return t && "object" == typeof t && t.name && -1 !== t.name.indexOf("(") ? t.name : t.name + "(" + a(!1, t.inputs).join(",") + ")"
      },
      _flattenTypes: a,
      randomHex: function(t) {
          return "0x" + o(t).toString("hex")
      },
      BN: i.BN,
      isBN: i.isBN,
      isBigNumber: i.isBigNumber,
      isHex: i.isHex,
      isHexStrict: i.isHexStrict,
      sha3: i.sha3,
      sha3Raw: i.sha3Raw,
      keccak256: i.sha3,
      soliditySha3: n.soliditySha3,
      soliditySha3Raw: n.soliditySha3Raw,
      encodePacked: n.encodePacked,
      isAddress: i.isAddress,
      checkAddressChecksum: i.checkAddressChecksum,
      toChecksumAddress: function(t) {
          if (void 0 === t)
              return "";
          if (!/^(0x)?[0-9a-f]{40}$/i.test(t))
              throw new Error('Given address "' + t + '" is not a valid Ethereum address.');
          t = t.toLowerCase().replace(/^0x/i, "");
          for (var e = i.sha3(t).replace(/^0x/i, ""), r = "0x", n = 0; n < t.length; n++)
              parseInt(e[n], 16) > 7 ? r += t[n].toUpperCase() : r += t[n];
          return r
      },
      toHex: i.toHex,
      toBN: i.toBN,
      bytesToHex: i.bytesToHex,
      hexToBytes: i.hexToBytes,
      hexToNumberString: i.hexToNumberString,
      hexToNumber: i.hexToNumber,
      toDecimal: i.hexToNumber,
      numberToHex: i.numberToHex,
      fromDecimal: i.numberToHex,
      hexToUtf8: i.hexToUtf8,
      hexToString: i.hexToUtf8,
      toUtf8: i.hexToUtf8,
      stripHexPrefix: i.stripHexPrefix,
      utf8ToHex: i.utf8ToHex,
      stringToHex: i.utf8ToHex,
      fromUtf8: i.utf8ToHex,
      hexToAscii: u,
      toAscii: u,
      asciiToHex: l,
      fromAscii: l,
      unitMap: r.unitMap,
      toWei: function(t, e) {
          if (e = c(e),
          !i.isBN(t) && "string" != typeof t)
              throw new Error("Please pass numbers as strings or BN objects to avoid precision errors.");
          return i.isBN(t) ? r.toWei(t, e) : r.toWei(t, e).toString(10)
      },
      fromWei: function(t, e) {
          if (e = c(e),
          !i.isBN(t) && "string" != typeof t)
              throw new Error("Please pass numbers as strings or BN objects to avoid precision errors.");
          return i.isBN(t) ? r.fromWei(t, e) : r.fromWei(t, e).toString(10)
      },
      padLeft: i.leftPad,
      leftPad: i.leftPad,
      padRight: i.rightPad,
      rightPad: i.rightPad,
      toTwosComplement: i.toTwosComplement,
      isBloom: i.isBloom,
      isUserEthereumAddressInBloom: i.isUserEthereumAddressInBloom,
      isContractAddressInBloom: i.isContractAddressInBloom,
      isTopic: i.isTopic,
      isTopicInBloom: i.isTopicInBloom,
      isInBloom: i.isInBloom,
      compareBlockNumbers: function(t, e) {
          if (t === e)
              return 0;
          if ("genesis" !== t && "earliest" !== t && 0 !== t || "genesis" !== e && "earliest" !== e && 0 !== e) {
              if ("genesis" === t || "earliest" === t || 0 === t)
                  return -1;
              if ("genesis" === e || "earliest" === e || 0 === e)
                  return 1;
              if ("latest" === t || "finalized" === t)
                  return "pending" === e ? -1 : 1;
              if ("latest" === e || "finalized" === e)
                  return "pending" === t ? 1 : -1;
              if ("pending" === t)
                  return 1;
              if ("pending" === e)
                  return -1;
              if ("safe" === t || "safe" === e)
                  return;
              {
                  let r = new s(t)
                    , i = new s(e);
                  return r.lt(i) ? -1 : r.eq(i) ? 0 : 1
              }
          }
          return 0
      },
      toNumber: i.toNumber
  }
}
)),
parcelRequire.register("g2hxm", (function(t, e) {
  var r = parcelRequire("6xc5y")
    , i = parcelRequire("kgPQe")
    , n = new r(0)
    , o = new r(-1)
    , s = {
      noether: "0",
      wei: "1",
      kwei: "1000",
      Kwei: "1000",
      babbage: "1000",
      femtoether: "1000",
      mwei: "1000000",
      Mwei: "1000000",
      lovelace: "1000000",
      picoether: "1000000",
      gwei: "1000000000",
      Gwei: "1000000000",
      shannon: "1000000000",
      nanoether: "1000000000",
      nano: "1000000000",
      szabo: "1000000000000",
      microether: "1000000000000",
      micro: "1000000000000",
      finney: "1000000000000000",
      milliether: "1000000000000000",
      milli: "1000000000000000",
      ether: "1000000000000000000",
      kether: "1000000000000000000000",
      grand: "1000000000000000000000",
      mether: "1000000000000000000000000",
      gether: "1000000000000000000000000000",
      tether: "1000000000000000000000000000000"
  };
  function a(t) {
      var e = t ? t.toLowerCase() : "ether"
        , i = s[e];
      if ("string" != typeof i)
          throw new Error("[ethjs-unit] the unit provided " + t + " doesn't exists, please use the one of the following units " + JSON.stringify(s, null, 2));
      return new r(i,10)
  }
  function u(t) {
      if ("string" == typeof t) {
          if (!t.match(/^-?[0-9.]+$/))
              throw new Error("while converting number to string, invalid number value '" + t + "', should be a number matching (^-?[0-9.]+).");
          return t
      }
      if ("number" == typeof t)
          return String(t);
      if ("object" == typeof t && t.toString && (t.toTwos || t.dividedToIntegerBy))
          return t.toPrecision ? String(t.toPrecision()) : t.toString(10);
      throw new Error("while converting number to string, invalid number value '" + t + "' type " + typeof t + ".")
  }
  t.exports = {
      unitMap: s,
      numberToString: u,
      getValueOfUnit: a,
      fromWei: function(t, e, r) {
          var u = i(t)
            , l = u.lt(n)
            , c = a(e)
            , h = s[e].length - 1 || 1
            , A = r || {};
          l && (u = u.mul(o));
          for (var f = u.mod(c).toString(10); f.length < h; )
              f = "0" + f;
          A.pad || (f = f.match(/^([0-9]*[1-9]|0)(0*)/)[1]);
          var p = u.div(c).toString(10);
          A.commify && (p = p.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
          var g = p + ("0" == f ? "" : "." + f);
          return l && (g = "-" + g),
          g
      },
      toWei: function(t, e) {
          var i = u(t)
            , n = a(e)
            , l = s[e].length - 1 || 1
            , c = "-" === i.substring(0, 1);
          if (c && (i = i.substring(1)),
          "." === i)
              throw new Error("[ethjs-unit] while converting number " + t + " to wei, invalid value");
          var h = i.split(".");
          if (h.length > 2)
              throw new Error("[ethjs-unit] while converting number " + t + " to wei,  too many decimal points");
          var A = h[0]
            , f = h[1];
          if (A || (A = "0"),
          f || (f = "0"),
          f.length > l)
              throw new Error("[ethjs-unit] while converting number " + t + " to wei, too many decimal places");
          for (; f.length < l; )
              f += "0";
          A = new r(A),
          f = new r(f);
          var p = A.mul(n).add(f);
          return c && (p = p.mul(o)),
          new r(p.toString(10),10)
      }
  }
}
)),
parcelRequire.register("6xc5y", (function(t, e) {
  !function(t, e) {
      function r(t, e) {
          if (!t)
              throw new Error(e || "Assertion failed")
      }
      function i(t, e) {
          t.super_ = e;
          var r = function() {};
          r.prototype = e.prototype,
          t.prototype = new r,
          t.prototype.constructor = t
      }
      function n(t, e, r) {
          if (n.isBN(t))
              return t;
          this.negative = 0,
          this.words = null,
          this.length = 0,
          this.red = null,
          null !== t && ("le" !== e && "be" !== e || (r = e,
          e = 10),
          this._init(t || 0, e || 10, r || "be"))
      }
      var o;
      "object" == typeof t ? t.exports = n : e.BN = n,
      n.BN = n,
      n.wordSize = 26;
      try {
          o = parcelRequire("bdjQ6").Buffer
      } catch (t) {}
      function s(t, e, r) {
          for (var i = 0, n = Math.min(t.length, r), o = e; o < n; o++) {
              var s = t.charCodeAt(o) - 48;
              i <<= 4,
              i |= s >= 49 && s <= 54 ? s - 49 + 10 : s >= 17 && s <= 22 ? s - 17 + 10 : 15 & s
          }
          return i
      }
      function a(t, e, r, i) {
          for (var n = 0, o = Math.min(t.length, r), s = e; s < o; s++) {
              var a = t.charCodeAt(s) - 48;
              n *= i,
              n += a >= 49 ? a - 49 + 10 : a >= 17 ? a - 17 + 10 : a
          }
          return n
      }
      n.isBN = function(t) {
          return t instanceof n || null !== t && "object" == typeof t && t.constructor.wordSize === n.wordSize && Array.isArray(t.words)
      }
      ,
      n.max = function(t, e) {
          return t.cmp(e) > 0 ? t : e
      }
      ,
      n.min = function(t, e) {
          return t.cmp(e) < 0 ? t : e
      }
      ,
      n.prototype._init = function(t, e, i) {
          if ("number" == typeof t)
              return this._initNumber(t, e, i);
          if ("object" == typeof t)
              return this._initArray(t, e, i);
          "hex" === e && (e = 16),
          r(e === (0 | e) && e >= 2 && e <= 36);
          var n = 0;
          "-" === (t = t.toString().replace(/\s+/g, ""))[0] && n++,
          16 === e ? this._parseHex(t, n) : this._parseBase(t, e, n),
          "-" === t[0] && (this.negative = 1),
          this.strip(),
          "le" === i && this._initArray(this.toArray(), e, i)
      }
      ,
      n.prototype._initNumber = function(t, e, i) {
          t < 0 && (this.negative = 1,
          t = -t),
          t < 67108864 ? (this.words = [67108863 & t],
          this.length = 1) : t < 4503599627370496 ? (this.words = [67108863 & t, t / 67108864 & 67108863],
          this.length = 2) : (r(t < 9007199254740992),
          this.words = [67108863 & t, t / 67108864 & 67108863, 1],
          this.length = 3),
          "le" === i && this._initArray(this.toArray(), e, i)
      }
      ,
      n.prototype._initArray = function(t, e, i) {
          if (r("number" == typeof t.length),
          t.length <= 0)
              return this.words = [0],
              this.length = 1,
              this;
          this.length = Math.ceil(t.length / 3),
          this.words = new Array(this.length);
          for (var n = 0; n < this.length; n++)
              this.words[n] = 0;
          var o, s, a = 0;
          if ("be" === i)
              for (n = t.length - 1,
              o = 0; n >= 0; n -= 3)
                  s = t[n] | t[n - 1] << 8 | t[n - 2] << 16,
                  this.words[o] |= s << a & 67108863,
                  this.words[o + 1] = s >>> 26 - a & 67108863,
                  (a += 24) >= 26 && (a -= 26,
                  o++);
          else if ("le" === i)
              for (n = 0,
              o = 0; n < t.length; n += 3)
                  s = t[n] | t[n + 1] << 8 | t[n + 2] << 16,
                  this.words[o] |= s << a & 67108863,
                  this.words[o + 1] = s >>> 26 - a & 67108863,
                  (a += 24) >= 26 && (a -= 26,
                  o++);
          return this.strip()
      }
      ,
      n.prototype._parseHex = function(t, e) {
          this.length = Math.ceil((t.length - e) / 6),
          this.words = new Array(this.length);
          for (var r = 0; r < this.length; r++)
              this.words[r] = 0;
          var i, n, o = 0;
          for (r = t.length - 6,
          i = 0; r >= e; r -= 6)
              n = s(t, r, r + 6),
              this.words[i] |= n << o & 67108863,
              this.words[i + 1] |= n >>> 26 - o & 4194303,
              (o += 24) >= 26 && (o -= 26,
              i++);
          r + 6 !== e && (n = s(t, e, r + 6),
          this.words[i] |= n << o & 67108863,
          this.words[i + 1] |= n >>> 26 - o & 4194303),
          this.strip()
      }
      ,
      n.prototype._parseBase = function(t, e, r) {
          this.words = [0],
          this.length = 1;
          for (var i = 0, n = 1; n <= 67108863; n *= e)
              i++;
          i--,
          n = n / e | 0;
          for (var o = t.length - r, s = o % i, u = Math.min(o, o - s) + r, l = 0, c = r; c < u; c += i)
              l = a(t, c, c + i, e),
              this.imuln(n),
              this.words[0] + l < 67108864 ? this.words[0] += l : this._iaddn(l);
          if (0 !== s) {
              var h = 1;
              for (l = a(t, c, t.length, e),
              c = 0; c < s; c++)
                  h *= e;
              this.imuln(h),
              this.words[0] + l < 67108864 ? this.words[0] += l : this._iaddn(l)
          }
      }
      ,
      n.prototype.copy = function(t) {
          t.words = new Array(this.length);
          for (var e = 0; e < this.length; e++)
              t.words[e] = this.words[e];
          t.length = this.length,
          t.negative = this.negative,
          t.red = this.red
      }
      ,
      n.prototype.clone = function() {
          var t = new n(null);
          return this.copy(t),
          t
      }
      ,
      n.prototype._expand = function(t) {
          for (; this.length < t; )
              this.words[this.length++] = 0;
          return this
      }
      ,
      n.prototype.strip = function() {
          for (; this.length > 1 && 0 === this.words[this.length - 1]; )
              this.length--;
          return this._normSign()
      }
      ,
      n.prototype._normSign = function() {
          return 1 === this.length && 0 === this.words[0] && (this.negative = 0),
          this
      }
      ,
      n.prototype.inspect = function() {
          return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">"
      }
      ;
      var u = ["", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000"]
        , l = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
        , c = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];
      function h(t, e, r) {
          r.negative = e.negative ^ t.negative;
          var i = t.length + e.length | 0;
          r.length = i,
          i = i - 1 | 0;
          var n = 0 | t.words[0]
            , o = 0 | e.words[0]
            , s = n * o
            , a = 67108863 & s
            , u = s / 67108864 | 0;
          r.words[0] = a;
          for (var l = 1; l < i; l++) {
              for (var c = u >>> 26, h = 67108863 & u, A = Math.min(l, e.length - 1), f = Math.max(0, l - t.length + 1); f <= A; f++) {
                  var p = l - f | 0;
                  c += (s = (n = 0 | t.words[p]) * (o = 0 | e.words[f]) + h) / 67108864 | 0,
                  h = 67108863 & s
              }
              r.words[l] = 0 | h,
              u = 0 | c
          }
          return 0 !== u ? r.words[l] = 0 | u : r.length--,
          r.strip()
      }
      n.prototype.toString = function(t, e) {
          var i;
          if (e = 0 | e || 1,
          16 === (t = t || 10) || "hex" === t) {
              i = "";
              for (var n = 0, o = 0, s = 0; s < this.length; s++) {
                  var a = this.words[s]
                    , h = (16777215 & (a << n | o)).toString(16);
                  i = 0 !== (o = a >>> 24 - n & 16777215) || s !== this.length - 1 ? u[6 - h.length] + h + i : h + i,
                  (n += 2) >= 26 && (n -= 26,
                  s--)
              }
              for (0 !== o && (i = o.toString(16) + i); i.length % e != 0; )
                  i = "0" + i;
              return 0 !== this.negative && (i = "-" + i),
              i
          }
          if (t === (0 | t) && t >= 2 && t <= 36) {
              var A = l[t]
                , f = c[t];
              i = "";
              var p = this.clone();
              for (p.negative = 0; !p.isZero(); ) {
                  var g = p.modn(f).toString(t);
                  i = (p = p.idivn(f)).isZero() ? g + i : u[A - g.length] + g + i
              }
              for (this.isZero() && (i = "0" + i); i.length % e != 0; )
                  i = "0" + i;
              return 0 !== this.negative && (i = "-" + i),
              i
          }
          r(!1, "Base should be between 2 and 36")
      }
      ,
      n.prototype.toNumber = function() {
          var t = this.words[0];
          return 2 === this.length ? t += 67108864 * this.words[1] : 3 === this.length && 1 === this.words[2] ? t += 4503599627370496 + 67108864 * this.words[1] : this.length > 2 && r(!1, "Number can only safely store up to 53 bits"),
          0 !== this.negative ? -t : t
      }
      ,
      n.prototype.toJSON = function() {
          return this.toString(16)
      }
      ,
      n.prototype.toBuffer = function(t, e) {
          return r(void 0 !== o),
          this.toArrayLike(o, t, e)
      }
      ,
      n.prototype.toArray = function(t, e) {
          return this.toArrayLike(Array, t, e)
      }
      ,
      n.prototype.toArrayLike = function(t, e, i) {
          var n = this.byteLength()
            , o = i || Math.max(1, n);
          r(n <= o, "byte array longer than desired length"),
          r(o > 0, "Requested array length <= 0"),
          this.strip();
          var s, a, u = "le" === e, l = new t(o), c = this.clone();
          if (u) {
              for (a = 0; !c.isZero(); a++)
                  s = c.andln(255),
                  c.iushrn(8),
                  l[a] = s;
              for (; a < o; a++)
                  l[a] = 0
          } else {
              for (a = 0; a < o - n; a++)
                  l[a] = 0;
              for (a = 0; !c.isZero(); a++)
                  s = c.andln(255),
                  c.iushrn(8),
                  l[o - a - 1] = s
          }
          return l
      }
      ,
      Math.clz32 ? n.prototype._countBits = function(t) {
          return 32 - Math.clz32(t)
      }
      : n.prototype._countBits = function(t) {
          var e = t
            , r = 0;
          return e >= 4096 && (r += 13,
          e >>>= 13),
          e >= 64 && (r += 7,
          e >>>= 7),
          e >= 8 && (r += 4,
          e >>>= 4),
          e >= 2 && (r += 2,
          e >>>= 2),
          r + e
      }
      ,
      n.prototype._zeroBits = function(t) {
          if (0 === t)
              return 26;
          var e = t
            , r = 0;
          return 0 == (8191 & e) && (r += 13,
          e >>>= 13),
          0 == (127 & e) && (r += 7,
          e >>>= 7),
          0 == (15 & e) && (r += 4,
          e >>>= 4),
          0 == (3 & e) && (r += 2,
          e >>>= 2),
          0 == (1 & e) && r++,
          r
      }
      ,
      n.prototype.bitLength = function() {
          var t = this.words[this.length - 1]
            , e = this._countBits(t);
          return 26 * (this.length - 1) + e
      }
      ,
      n.prototype.zeroBits = function() {
          if (this.isZero())
              return 0;
          for (var t = 0, e = 0; e < this.length; e++) {
              var r = this._zeroBits(this.words[e]);
              if (t += r,
              26 !== r)
                  break
          }
          return t
      }
      ,
      n.prototype.byteLength = function() {
          return Math.ceil(this.bitLength() / 8)
      }
      ,
      n.prototype.toTwos = function(t) {
          return 0 !== this.negative ? this.abs().inotn(t).iaddn(1) : this.clone()
      }
      ,
      n.prototype.fromTwos = function(t) {
          return this.testn(t - 1) ? this.notn(t).iaddn(1).ineg() : this.clone()
      }
      ,
      n.prototype.isNeg = function() {
          return 0 !== this.negative
      }
      ,
      n.prototype.neg = function() {
          return this.clone().ineg()
      }
      ,
      n.prototype.ineg = function() {
          return this.isZero() || (this.negative ^= 1),
          this
      }
      ,
      n.prototype.iuor = function(t) {
          for (; this.length < t.length; )
              this.words[this.length++] = 0;
          for (var e = 0; e < t.length; e++)
              this.words[e] = this.words[e] | t.words[e];
          return this.strip()
      }
      ,
      n.prototype.ior = function(t) {
          return r(0 == (this.negative | t.negative)),
          this.iuor(t)
      }
      ,
      n.prototype.or = function(t) {
          return this.length > t.length ? this.clone().ior(t) : t.clone().ior(this)
      }
      ,
      n.prototype.uor = function(t) {
          return this.length > t.length ? this.clone().iuor(t) : t.clone().iuor(this)
      }
      ,
      n.prototype.iuand = function(t) {
          var e;
          e = this.length > t.length ? t : this;
          for (var r = 0; r < e.length; r++)
              this.words[r] = this.words[r] & t.words[r];
          return this.length = e.length,
          this.strip()
      }
      ,
      n.prototype.iand = function(t) {
          return r(0 == (this.negative | t.negative)),
          this.iuand(t)
      }
      ,
      n.prototype.and = function(t) {
          return this.length > t.length ? this.clone().iand(t) : t.clone().iand(this)
      }
      ,
      n.prototype.uand = function(t) {
          return this.length > t.length ? this.clone().iuand(t) : t.clone().iuand(this)
      }
      ,
      n.prototype.iuxor = function(t) {
          var e, r;
          this.length > t.length ? (e = this,
          r = t) : (e = t,
          r = this);
          for (var i = 0; i < r.length; i++)
              this.words[i] = e.words[i] ^ r.words[i];
          if (this !== e)
              for (; i < e.length; i++)
                  this.words[i] = e.words[i];
          return this.length = e.length,
          this.strip()
      }
      ,
      n.prototype.ixor = function(t) {
          return r(0 == (this.negative | t.negative)),
          this.iuxor(t)
      }
      ,
      n.prototype.xor = function(t) {
          return this.length > t.length ? this.clone().ixor(t) : t.clone().ixor(this)
      }
      ,
      n.prototype.uxor = function(t) {
          return this.length > t.length ? this.clone().iuxor(t) : t.clone().iuxor(this)
      }
      ,
      n.prototype.inotn = function(t) {
          r("number" == typeof t && t >= 0);
          var e = 0 | Math.ceil(t / 26)
            , i = t % 26;
          this._expand(e),
          i > 0 && e--;
          for (var n = 0; n < e; n++)
              this.words[n] = 67108863 & ~this.words[n];
          return i > 0 && (this.words[n] = ~this.words[n] & 67108863 >> 26 - i),
          this.strip()
      }
      ,
      n.prototype.notn = function(t) {
          return this.clone().inotn(t)
      }
      ,
      n.prototype.setn = function(t, e) {
          r("number" == typeof t && t >= 0);
          var i = t / 26 | 0
            , n = t % 26;
          return this._expand(i + 1),
          this.words[i] = e ? this.words[i] | 1 << n : this.words[i] & ~(1 << n),
          this.strip()
      }
      ,
      n.prototype.iadd = function(t) {
          var e, r, i;
          if (0 !== this.negative && 0 === t.negative)
              return this.negative = 0,
              e = this.isub(t),
              this.negative ^= 1,
              this._normSign();
          if (0 === this.negative && 0 !== t.negative)
              return t.negative = 0,
              e = this.isub(t),
              t.negative = 1,
              e._normSign();
          this.length > t.length ? (r = this,
          i = t) : (r = t,
          i = this);
          for (var n = 0, o = 0; o < i.length; o++)
              e = (0 | r.words[o]) + (0 | i.words[o]) + n,
              this.words[o] = 67108863 & e,
              n = e >>> 26;
          for (; 0 !== n && o < r.length; o++)
              e = (0 | r.words[o]) + n,
              this.words[o] = 67108863 & e,
              n = e >>> 26;
          if (this.length = r.length,
          0 !== n)
              this.words[this.length] = n,
              this.length++;
          else if (r !== this)
              for (; o < r.length; o++)
                  this.words[o] = r.words[o];
          return this
      }
      ,
      n.prototype.add = function(t) {
          var e;
          return 0 !== t.negative && 0 === this.negative ? (t.negative = 0,
          e = this.sub(t),
          t.negative ^= 1,
          e) : 0 === t.negative && 0 !== this.negative ? (this.negative = 0,
          e = t.sub(this),
          this.negative = 1,
          e) : this.length > t.length ? this.clone().iadd(t) : t.clone().iadd(this)
      }
      ,
      n.prototype.isub = function(t) {
          if (0 !== t.negative) {
              t.negative = 0;
              var e = this.iadd(t);
              return t.negative = 1,
              e._normSign()
          }
          if (0 !== this.negative)
              return this.negative = 0,
              this.iadd(t),
              this.negative = 1,
              this._normSign();
          var r, i, n = this.cmp(t);
          if (0 === n)
              return this.negative = 0,
              this.length = 1,
              this.words[0] = 0,
              this;
          n > 0 ? (r = this,
          i = t) : (r = t,
          i = this);
          for (var o = 0, s = 0; s < i.length; s++)
              o = (e = (0 | r.words[s]) - (0 | i.words[s]) + o) >> 26,
              this.words[s] = 67108863 & e;
          for (; 0 !== o && s < r.length; s++)
              o = (e = (0 | r.words[s]) + o) >> 26,
              this.words[s] = 67108863 & e;
          if (0 === o && s < r.length && r !== this)
              for (; s < r.length; s++)
                  this.words[s] = r.words[s];
          return this.length = Math.max(this.length, s),
          r !== this && (this.negative = 1),
          this.strip()
      }
      ,
      n.prototype.sub = function(t) {
          return this.clone().isub(t)
      }
      ;
      var A = function(t, e, r) {
          var i, n, o, s = t.words, a = e.words, u = r.words, l = 0, c = 0 | s[0], h = 8191 & c, A = c >>> 13, f = 0 | s[1], p = 8191 & f, g = f >>> 13, d = 0 | s[2], I = 8191 & d, m = d >>> 13, y = 0 | s[3], w = 8191 & y, C = y >>> 13, E = 0 | s[4], v = 8191 & E, B = E >>> 13, b = 0 | s[5], Q = 8191 & b, R = b >>> 13, M = 0 | s[6], _ = 8191 & M, x = M >>> 13, D = 0 | s[7], S = 8191 & D, k = D >>> 13, F = 0 | s[8], q = 8191 & F, N = F >>> 13, T = 0 | s[9], P = 8191 & T, O = T >>> 13, U = 0 | a[0], L = 8191 & U, H = U >>> 13, K = 0 | a[1], z = 8191 & K, G = K >>> 13, V = 0 | a[2], $ = 8191 & V, j = V >>> 13, Y = 0 | a[3], W = 8191 & Y, Z = Y >>> 13, X = 0 | a[4], J = 8191 & X, tt = X >>> 13, et = 0 | a[5], rt = 8191 & et, it = et >>> 13, nt = 0 | a[6], ot = 8191 & nt, st = nt >>> 13, at = 0 | a[7], ut = 8191 & at, lt = at >>> 13, ct = 0 | a[8], ht = 8191 & ct, At = ct >>> 13, ft = 0 | a[9], pt = 8191 & ft, gt = ft >>> 13;
          r.negative = t.negative ^ e.negative,
          r.length = 19;
          var dt = (l + (i = Math.imul(h, L)) | 0) + ((8191 & (n = (n = Math.imul(h, H)) + Math.imul(A, L) | 0)) << 13) | 0;
          l = ((o = Math.imul(A, H)) + (n >>> 13) | 0) + (dt >>> 26) | 0,
          dt &= 67108863,
          i = Math.imul(p, L),
          n = (n = Math.imul(p, H)) + Math.imul(g, L) | 0,
          o = Math.imul(g, H);
          var It = (l + (i = i + Math.imul(h, z) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, G) | 0) + Math.imul(A, z) | 0)) << 13) | 0;
          l = ((o = o + Math.imul(A, G) | 0) + (n >>> 13) | 0) + (It >>> 26) | 0,
          It &= 67108863,
          i = Math.imul(I, L),
          n = (n = Math.imul(I, H)) + Math.imul(m, L) | 0,
          o = Math.imul(m, H),
          i = i + Math.imul(p, z) | 0,
          n = (n = n + Math.imul(p, G) | 0) + Math.imul(g, z) | 0,
          o = o + Math.imul(g, G) | 0;
          var mt = (l + (i = i + Math.imul(h, $) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, j) | 0) + Math.imul(A, $) | 0)) << 13) | 0;
          l = ((o = o + Math.imul(A, j) | 0) + (n >>> 13) | 0) + (mt >>> 26) | 0,
          mt &= 67108863,
          i = Math.imul(w, L),
          n = (n = Math.imul(w, H)) + Math.imul(C, L) | 0,
          o = Math.imul(C, H),
          i = i + Math.imul(I, z) | 0,
          n = (n = n + Math.imul(I, G) | 0) + Math.imul(m, z) | 0,
          o = o + Math.imul(m, G) | 0,
          i = i + Math.imul(p, $) | 0,
          n = (n = n + Math.imul(p, j) | 0) + Math.imul(g, $) | 0,
          o = o + Math.imul(g, j) | 0;
          var yt = (l + (i = i + Math.imul(h, W) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, Z) | 0) + Math.imul(A, W) | 0)) << 13) | 0;
          l = ((o = o + Math.imul(A, Z) | 0) + (n >>> 13) | 0) + (yt >>> 26) | 0,
          yt &= 67108863,
          i = Math.imul(v, L),
          n = (n = Math.imul(v, H)) + Math.imul(B, L) | 0,
          o = Math.imul(B, H),
          i = i + Math.imul(w, z) | 0,
          n = (n = n + Math.imul(w, G) | 0) + Math.imul(C, z) | 0,
          o = o + Math.imul(C, G) | 0,
          i = i + Math.imul(I, $) | 0,
          n = (n = n + Math.imul(I, j) | 0) + Math.imul(m, $) | 0,
          o = o + Math.imul(m, j) | 0,
          i = i + Math.imul(p, W) | 0,
          n = (n = n + Math.imul(p, Z) | 0) + Math.imul(g, W) | 0,
          o = o + Math.imul(g, Z) | 0;
          var wt = (l + (i = i + Math.imul(h, J) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, tt) | 0) + Math.imul(A, J) | 0)) << 13) | 0;
          l = ((o = o + Math.imul(A, tt) | 0) + (n >>> 13) | 0) + (wt >>> 26) | 0,
          wt &= 67108863,
          i = Math.imul(Q, L),
          n = (n = Math.imul(Q, H)) + Math.imul(R, L) | 0,
          o = Math.imul(R, H),
          i = i + Math.imul(v, z) | 0,
          n = (n = n + Math.imul(v, G) | 0) + Math.imul(B, z) | 0,
          o = o + Math.imul(B, G) | 0,
          i = i + Math.imul(w, $) | 0,
          n = (n = n + Math.imul(w, j) | 0) + Math.imul(C, $) | 0,
          o = o + Math.imul(C, j) | 0,
          i = i + Math.imul(I, W) | 0,
          n = (n = n + Math.imul(I, Z) | 0) + Math.imul(m, W) | 0,
          o = o + Math.imul(m, Z) | 0,
          i = i + Math.imul(p, J) | 0,
          n = (n = n + Math.imul(p, tt) | 0) + Math.imul(g, J) | 0,
          o = o + Math.imul(g, tt) | 0;
          var Ct = (l + (i = i + Math.imul(h, rt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, it) | 0) + Math.imul(A, rt) | 0)) << 13) | 0;
          l = ((o = o + Math.imul(A, it) | 0) + (n >>> 13) | 0) + (Ct >>> 26) | 0,
          Ct &= 67108863,
          i = Math.imul(_, L),
          n = (n = Math.imul(_, H)) + Math.imul(x, L) | 0,
          o = Math.imul(x, H),
          i = i + Math.imul(Q, z) | 0,
          n = (n = n + Math.imul(Q, G) | 0) + Math.imul(R, z) | 0,
          o = o + Math.imul(R, G) | 0,
          i = i + Math.imul(v, $) | 0,
          n = (n = n + Math.imul(v, j) | 0) + Math.imul(B, $) | 0,
          o = o + Math.imul(B, j) | 0,
          i = i + Math.imul(w, W) | 0,
          n = (n = n + Math.imul(w, Z) | 0) + Math.imul(C, W) | 0,
          o = o + Math.imul(C, Z) | 0,
          i = i + Math.imul(I, J) | 0,
          n = (n = n + Math.imul(I, tt) | 0) + Math.imul(m, J) | 0,
          o = o + Math.imul(m, tt) | 0,
          i = i + Math.imul(p, rt) | 0,
          n = (n = n + Math.imul(p, it) | 0) + Math.imul(g, rt) | 0,
          o = o + Math.imul(g, it) | 0;
          var Et = (l + (i = i + Math.imul(h, ot) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, st) | 0) + Math.imul(A, ot) | 0)) << 13) | 0;
          l = ((o = o + Math.imul(A, st) | 0) + (n >>> 13) | 0) + (Et >>> 26) | 0,
          Et &= 67108863,
          i = Math.imul(S, L),
          n = (n = Math.imul(S, H)) + Math.imul(k, L) | 0,
          o = Math.imul(k, H),
          i = i + Math.imul(_, z) | 0,
          n = (n = n + Math.imul(_, G) | 0) + Math.imul(x, z) | 0,
          o = o + Math.imul(x, G) | 0,
          i = i + Math.imul(Q, $) | 0,
          n = (n = n + Math.imul(Q, j) | 0) + Math.imul(R, $) | 0,
          o = o + Math.imul(R, j) | 0,
          i = i + Math.imul(v, W) | 0,
          n = (n = n + Math.imul(v, Z) | 0) + Math.imul(B, W) | 0,
          o = o + Math.imul(B, Z) | 0,
          i = i + Math.imul(w, J) | 0,
          n = (n = n + Math.imul(w, tt) | 0) + Math.imul(C, J) | 0,
          o = o + Math.imul(C, tt) | 0,
          i = i + Math.imul(I, rt) | 0,
          n = (n = n + Math.imul(I, it) | 0) + Math.imul(m, rt) | 0,
          o = o + Math.imul(m, it) | 0,
          i = i + Math.imul(p, ot) | 0,
          n = (n = n + Math.imul(p, st) | 0) + Math.imul(g, ot) | 0,
          o = o + Math.imul(g, st) | 0;
          var vt = (l + (i = i + Math.imul(h, ut) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, lt) | 0) + Math.imul(A, ut) | 0)) << 13) | 0;
          l = ((o = o + Math.imul(A, lt) | 0) + (n >>> 13) | 0) + (vt >>> 26) | 0,
          vt &= 67108863,
          i = Math.imul(q, L),
          n = (n = Math.imul(q, H)) + Math.imul(N, L) | 0,
          o = Math.imul(N, H),
          i = i + Math.imul(S, z) | 0,
          n = (n = n + Math.imul(S, G) | 0) + Math.imul(k, z) | 0,
          o = o + Math.imul(k, G) | 0,
          i = i + Math.imul(_, $) | 0,
          n = (n = n + Math.imul(_, j) | 0) + Math.imul(x, $) | 0,
          o = o + Math.imul(x, j) | 0,
          i = i + Math.imul(Q, W) | 0,
          n = (n = n + Math.imul(Q, Z) | 0) + Math.imul(R, W) | 0,
          o = o + Math.imul(R, Z) | 0,
          i = i + Math.imul(v, J) | 0,
          n = (n = n + Math.imul(v, tt) | 0) + Math.imul(B, J) | 0,
          o = o + Math.imul(B, tt) | 0,
          i = i + Math.imul(w, rt) | 0,
          n = (n = n + Math.imul(w, it) | 0) + Math.imul(C, rt) | 0,
          o = o + Math.imul(C, it) | 0,
          i = i + Math.imul(I, ot) | 0,
          n = (n = n + Math.imul(I, st) | 0) + Math.imul(m, ot) | 0,
          o = o + Math.imul(m, st) | 0,
          i = i + Math.imul(p, ut) | 0,
          n = (n = n + Math.imul(p, lt) | 0) + Math.imul(g, ut) | 0,
          o = o + Math.imul(g, lt) | 0;
          var Bt = (l + (i = i + Math.imul(h, ht) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, At) | 0) + Math.imul(A, ht) | 0)) << 13) | 0;
          l = ((o = o + Math.imul(A, At) | 0) + (n >>> 13) | 0) + (Bt >>> 26) | 0,
          Bt &= 67108863,
          i = Math.imul(P, L),
          n = (n = Math.imul(P, H)) + Math.imul(O, L) | 0,
          o = Math.imul(O, H),
          i = i + Math.imul(q, z) | 0,
          n = (n = n + Math.imul(q, G) | 0) + Math.imul(N, z) | 0,
          o = o + Math.imul(N, G) | 0,
          i = i + Math.imul(S, $) | 0,
          n = (n = n + Math.imul(S, j) | 0) + Math.imul(k, $) | 0,
          o = o + Math.imul(k, j) | 0,
          i = i + Math.imul(_, W) | 0,
          n = (n = n + Math.imul(_, Z) | 0) + Math.imul(x, W) | 0,
          o = o + Math.imul(x, Z) | 0,
          i = i + Math.imul(Q, J) | 0,
          n = (n = n + Math.imul(Q, tt) | 0) + Math.imul(R, J) | 0,
          o = o + Math.imul(R, tt) | 0,
          i = i + Math.imul(v, rt) | 0,
          n = (n = n + Math.imul(v, it) | 0) + Math.imul(B, rt) | 0,
          o = o + Math.imul(B, it) | 0,
          i = i + Math.imul(w, ot) | 0,
          n = (n = n + Math.imul(w, st) | 0) + Math.imul(C, ot) | 0,
          o = o + Math.imul(C, st) | 0,
          i = i + Math.imul(I, ut) | 0,
          n = (n = n + Math.imul(I, lt) | 0) + Math.imul(m, ut) | 0,
          o = o + Math.imul(m, lt) | 0,
          i = i + Math.imul(p, ht) | 0,
          n = (n = n + Math.imul(p, At) | 0) + Math.imul(g, ht) | 0,
          o = o + Math.imul(g, At) | 0;
          var bt = (l + (i = i + Math.imul(h, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, gt) | 0) + Math.imul(A, pt) | 0)) << 13) | 0;
          l = ((o = o + Math.imul(A, gt) | 0) + (n >>> 13) | 0) + (bt >>> 26) | 0,
          bt &= 67108863,
          i = Math.imul(P, z),
          n = (n = Math.imul(P, G)) + Math.imul(O, z) | 0,
          o = Math.imul(O, G),
          i = i + Math.imul(q, $) | 0,
          n = (n = n + Math.imul(q, j) | 0) + Math.imul(N, $) | 0,
          o = o + Math.imul(N, j) | 0,
          i = i + Math.imul(S, W) | 0,
          n = (n = n + Math.imul(S, Z) | 0) + Math.imul(k, W) | 0,
          o = o + Math.imul(k, Z) | 0,
          i = i + Math.imul(_, J) | 0,
          n = (n = n + Math.imul(_, tt) | 0) + Math.imul(x, J) | 0,
          o = o + Math.imul(x, tt) | 0,
          i = i + Math.imul(Q, rt) | 0,
          n = (n = n + Math.imul(Q, it) | 0) + Math.imul(R, rt) | 0,
          o = o + Math.imul(R, it) | 0,
          i = i + Math.imul(v, ot) | 0,
          n = (n = n + Math.imul(v, st) | 0) + Math.imul(B, ot) | 0,
          o = o + Math.imul(B, st) | 0,
          i = i + Math.imul(w, ut) | 0,
          n = (n = n + Math.imul(w, lt) | 0) + Math.imul(C, ut) | 0,
          o = o + Math.imul(C, lt) | 0,
          i = i + Math.imul(I, ht) | 0,
          n = (n = n + Math.imul(I, At) | 0) + Math.imul(m, ht) | 0,
          o = o + Math.imul(m, At) | 0;
          var Qt = (l + (i = i + Math.imul(p, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(p, gt) | 0) + Math.imul(g, pt) | 0)) << 13) | 0;
          l = ((o = o + Math.imul(g, gt) | 0) + (n >>> 13) | 0) + (Qt >>> 26) | 0,
          Qt &= 67108863,
          i = Math.imul(P, $),
          n = (n = Math.imul(P, j)) + Math.imul(O, $) | 0,
          o = Math.imul(O, j),
          i = i + Math.imul(q, W) | 0,
          n = (n = n + Math.imul(q, Z) | 0) + Math.imul(N, W) | 0,
          o = o + Math.imul(N, Z) | 0,
          i = i + Math.imul(S, J) | 0,
          n = (n = n + Math.imul(S, tt) | 0) + Math.imul(k, J) | 0,
          o = o + Math.imul(k, tt) | 0,
          i = i + Math.imul(_, rt) | 0,
          n = (n = n + Math.imul(_, it) | 0) + Math.imul(x, rt) | 0,
          o = o + Math.imul(x, it) | 0,
          i = i + Math.imul(Q, ot) | 0,
          n = (n = n + Math.imul(Q, st) | 0) + Math.imul(R, ot) | 0,
          o = o + Math.imul(R, st) | 0,
          i = i + Math.imul(v, ut) | 0,
          n = (n = n + Math.imul(v, lt) | 0) + Math.imul(B, ut) | 0,
          o = o + Math.imul(B, lt) | 0,
          i = i + Math.imul(w, ht) | 0,
          n = (n = n + Math.imul(w, At) | 0) + Math.imul(C, ht) | 0,
          o = o + Math.imul(C, At) | 0;
          var Rt = (l + (i = i + Math.imul(I, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(I, gt) | 0) + Math.imul(m, pt) | 0)) << 13) | 0;
          l = ((o = o + Math.imul(m, gt) | 0) + (n >>> 13) | 0) + (Rt >>> 26) | 0,
          Rt &= 67108863,
          i = Math.imul(P, W),
          n = (n = Math.imul(P, Z)) + Math.imul(O, W) | 0,
          o = Math.imul(O, Z),
          i = i + Math.imul(q, J) | 0,
          n = (n = n + Math.imul(q, tt) | 0) + Math.imul(N, J) | 0,
          o = o + Math.imul(N, tt) | 0,
          i = i + Math.imul(S, rt) | 0,
          n = (n = n + Math.imul(S, it) | 0) + Math.imul(k, rt) | 0,
          o = o + Math.imul(k, it) | 0,
          i = i + Math.imul(_, ot) | 0,
          n = (n = n + Math.imul(_, st) | 0) + Math.imul(x, ot) | 0,
          o = o + Math.imul(x, st) | 0,
          i = i + Math.imul(Q, ut) | 0,
          n = (n = n + Math.imul(Q, lt) | 0) + Math.imul(R, ut) | 0,
          o = o + Math.imul(R, lt) | 0,
          i = i + Math.imul(v, ht) | 0,
          n = (n = n + Math.imul(v, At) | 0) + Math.imul(B, ht) | 0,
          o = o + Math.imul(B, At) | 0;
          var Mt = (l + (i = i + Math.imul(w, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(w, gt) | 0) + Math.imul(C, pt) | 0)) << 13) | 0;
          l = ((o = o + Math.imul(C, gt) | 0) + (n >>> 13) | 0) + (Mt >>> 26) | 0,
          Mt &= 67108863,
          i = Math.imul(P, J),
          n = (n = Math.imul(P, tt)) + Math.imul(O, J) | 0,
          o = Math.imul(O, tt),
          i = i + Math.imul(q, rt) | 0,
          n = (n = n + Math.imul(q, it) | 0) + Math.imul(N, rt) | 0,
          o = o + Math.imul(N, it) | 0,
          i = i + Math.imul(S, ot) | 0,
          n = (n = n + Math.imul(S, st) | 0) + Math.imul(k, ot) | 0,
          o = o + Math.imul(k, st) | 0,
          i = i + Math.imul(_, ut) | 0,
          n = (n = n + Math.imul(_, lt) | 0) + Math.imul(x, ut) | 0,
          o = o + Math.imul(x, lt) | 0,
          i = i + Math.imul(Q, ht) | 0,
          n = (n = n + Math.imul(Q, At) | 0) + Math.imul(R, ht) | 0,
          o = o + Math.imul(R, At) | 0;
          var _t = (l + (i = i + Math.imul(v, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(v, gt) | 0) + Math.imul(B, pt) | 0)) << 13) | 0;
          l = ((o = o + Math.imul(B, gt) | 0) + (n >>> 13) | 0) + (_t >>> 26) | 0,
          _t &= 67108863,
          i = Math.imul(P, rt),
          n = (n = Math.imul(P, it)) + Math.imul(O, rt) | 0,
          o = Math.imul(O, it),
          i = i + Math.imul(q, ot) | 0,
          n = (n = n + Math.imul(q, st) | 0) + Math.imul(N, ot) | 0,
          o = o + Math.imul(N, st) | 0,
          i = i + Math.imul(S, ut) | 0,
          n = (n = n + Math.imul(S, lt) | 0) + Math.imul(k, ut) | 0,
          o = o + Math.imul(k, lt) | 0,
          i = i + Math.imul(_, ht) | 0,
          n = (n = n + Math.imul(_, At) | 0) + Math.imul(x, ht) | 0,
          o = o + Math.imul(x, At) | 0;
          var xt = (l + (i = i + Math.imul(Q, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(Q, gt) | 0) + Math.imul(R, pt) | 0)) << 13) | 0;
          l = ((o = o + Math.imul(R, gt) | 0) + (n >>> 13) | 0) + (xt >>> 26) | 0,
          xt &= 67108863,
          i = Math.imul(P, ot),
          n = (n = Math.imul(P, st)) + Math.imul(O, ot) | 0,
          o = Math.imul(O, st),
          i = i + Math.imul(q, ut) | 0,
          n = (n = n + Math.imul(q, lt) | 0) + Math.imul(N, ut) | 0,
          o = o + Math.imul(N, lt) | 0,
          i = i + Math.imul(S, ht) | 0,
          n = (n = n + Math.imul(S, At) | 0) + Math.imul(k, ht) | 0,
          o = o + Math.imul(k, At) | 0;
          var Dt = (l + (i = i + Math.imul(_, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(_, gt) | 0) + Math.imul(x, pt) | 0)) << 13) | 0;
          l = ((o = o + Math.imul(x, gt) | 0) + (n >>> 13) | 0) + (Dt >>> 26) | 0,
          Dt &= 67108863,
          i = Math.imul(P, ut),
          n = (n = Math.imul(P, lt)) + Math.imul(O, ut) | 0,
          o = Math.imul(O, lt),
          i = i + Math.imul(q, ht) | 0,
          n = (n = n + Math.imul(q, At) | 0) + Math.imul(N, ht) | 0,
          o = o + Math.imul(N, At) | 0;
          var St = (l + (i = i + Math.imul(S, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(S, gt) | 0) + Math.imul(k, pt) | 0)) << 13) | 0;
          l = ((o = o + Math.imul(k, gt) | 0) + (n >>> 13) | 0) + (St >>> 26) | 0,
          St &= 67108863,
          i = Math.imul(P, ht),
          n = (n = Math.imul(P, At)) + Math.imul(O, ht) | 0,
          o = Math.imul(O, At);
          var kt = (l + (i = i + Math.imul(q, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(q, gt) | 0) + Math.imul(N, pt) | 0)) << 13) | 0;
          l = ((o = o + Math.imul(N, gt) | 0) + (n >>> 13) | 0) + (kt >>> 26) | 0,
          kt &= 67108863;
          var Ft = (l + (i = Math.imul(P, pt)) | 0) + ((8191 & (n = (n = Math.imul(P, gt)) + Math.imul(O, pt) | 0)) << 13) | 0;
          return l = ((o = Math.imul(O, gt)) + (n >>> 13) | 0) + (Ft >>> 26) | 0,
          Ft &= 67108863,
          u[0] = dt,
          u[1] = It,
          u[2] = mt,
          u[3] = yt,
          u[4] = wt,
          u[5] = Ct,
          u[6] = Et,
          u[7] = vt,
          u[8] = Bt,
          u[9] = bt,
          u[10] = Qt,
          u[11] = Rt,
          u[12] = Mt,
          u[13] = _t,
          u[14] = xt,
          u[15] = Dt,
          u[16] = St,
          u[17] = kt,
          u[18] = Ft,
          0 !== l && (u[19] = l,
          r.length++),
          r
      };
      function f(t, e, r) {
          return (new p).mulp(t, e, r)
      }
      function p(t, e) {
          this.x = t,
          this.y = e
      }
      Math.imul || (A = h),
      n.prototype.mulTo = function(t, e) {
          var r, i = this.length + t.length;
          return r = 10 === this.length && 10 === t.length ? A(this, t, e) : i < 63 ? h(this, t, e) : i < 1024 ? function(t, e, r) {
              r.negative = e.negative ^ t.negative,
              r.length = t.length + e.length;
              for (var i = 0, n = 0, o = 0; o < r.length - 1; o++) {
                  var s = n;
                  n = 0;
                  for (var a = 67108863 & i, u = Math.min(o, e.length - 1), l = Math.max(0, o - t.length + 1); l <= u; l++) {
                      var c = o - l
                        , h = (0 | t.words[c]) * (0 | e.words[l])
                        , A = 67108863 & h;
                      a = 67108863 & (A = A + a | 0),
                      n += (s = (s = s + (h / 67108864 | 0) | 0) + (A >>> 26) | 0) >>> 26,
                      s &= 67108863
                  }
                  r.words[o] = a,
                  i = s,
                  s = n
              }
              return 0 !== i ? r.words[o] = i : r.length--,
              r.strip()
          }(this, t, e) : f(this, t, e),
          r
      }
      ,
      p.prototype.makeRBT = function(t) {
          for (var e = new Array(t), r = n.prototype._countBits(t) - 1, i = 0; i < t; i++)
              e[i] = this.revBin(i, r, t);
          return e
      }
      ,
      p.prototype.revBin = function(t, e, r) {
          if (0 === t || t === r - 1)
              return t;
          for (var i = 0, n = 0; n < e; n++)
              i |= (1 & t) << e - n - 1,
              t >>= 1;
          return i
      }
      ,
      p.prototype.permute = function(t, e, r, i, n, o) {
          for (var s = 0; s < o; s++)
              i[s] = e[t[s]],
              n[s] = r[t[s]]
      }
      ,
      p.prototype.transform = function(t, e, r, i, n, o) {
          this.permute(o, t, e, r, i, n);
          for (var s = 1; s < n; s <<= 1)
              for (var a = s << 1, u = Math.cos(2 * Math.PI / a), l = Math.sin(2 * Math.PI / a), c = 0; c < n; c += a)
                  for (var h = u, A = l, f = 0; f < s; f++) {
                      var p = r[c + f]
                        , g = i[c + f]
                        , d = r[c + f + s]
                        , I = i[c + f + s]
                        , m = h * d - A * I;
                      I = h * I + A * d,
                      d = m,
                      r[c + f] = p + d,
                      i[c + f] = g + I,
                      r[c + f + s] = p - d,
                      i[c + f + s] = g - I,
                      f !== a && (m = u * h - l * A,
                      A = u * A + l * h,
                      h = m)
                  }
      }
      ,
      p.prototype.guessLen13b = function(t, e) {
          var r = 1 | Math.max(e, t)
            , i = 1 & r
            , n = 0;
          for (r = r / 2 | 0; r; r >>>= 1)
              n++;
          return 1 << n + 1 + i
      }
      ,
      p.prototype.conjugate = function(t, e, r) {
          if (!(r <= 1))
              for (var i = 0; i < r / 2; i++) {
                  var n = t[i];
                  t[i] = t[r - i - 1],
                  t[r - i - 1] = n,
                  n = e[i],
                  e[i] = -e[r - i - 1],
                  e[r - i - 1] = -n
              }
      }
      ,
      p.prototype.normalize13b = function(t, e) {
          for (var r = 0, i = 0; i < e / 2; i++) {
              var n = 8192 * Math.round(t[2 * i + 1] / e) + Math.round(t[2 * i] / e) + r;
              t[i] = 67108863 & n,
              r = n < 67108864 ? 0 : n / 67108864 | 0
          }
          return t
      }
      ,
      p.prototype.convert13b = function(t, e, i, n) {
          for (var o = 0, s = 0; s < e; s++)
              o += 0 | t[s],
              i[2 * s] = 8191 & o,
              o >>>= 13,
              i[2 * s + 1] = 8191 & o,
              o >>>= 13;
          for (s = 2 * e; s < n; ++s)
              i[s] = 0;
          r(0 === o),
          r(0 == (-8192 & o))
      }
      ,
      p.prototype.stub = function(t) {
          for (var e = new Array(t), r = 0; r < t; r++)
              e[r] = 0;
          return e
      }
      ,
      p.prototype.mulp = function(t, e, r) {
          var i = 2 * this.guessLen13b(t.length, e.length)
            , n = this.makeRBT(i)
            , o = this.stub(i)
            , s = new Array(i)
            , a = new Array(i)
            , u = new Array(i)
            , l = new Array(i)
            , c = new Array(i)
            , h = new Array(i)
            , A = r.words;
          A.length = i,
          this.convert13b(t.words, t.length, s, i),
          this.convert13b(e.words, e.length, l, i),
          this.transform(s, o, a, u, i, n),
          this.transform(l, o, c, h, i, n);
          for (var f = 0; f < i; f++) {
              var p = a[f] * c[f] - u[f] * h[f];
              u[f] = a[f] * h[f] + u[f] * c[f],
              a[f] = p
          }
          return this.conjugate(a, u, i),
          this.transform(a, u, A, o, i, n),
          this.conjugate(A, o, i),
          this.normalize13b(A, i),
          r.negative = t.negative ^ e.negative,
          r.length = t.length + e.length,
          r.strip()
      }
      ,
      n.prototype.mul = function(t) {
          var e = new n(null);
          return e.words = new Array(this.length + t.length),
          this.mulTo(t, e)
      }
      ,
      n.prototype.mulf = function(t) {
          var e = new n(null);
          return e.words = new Array(this.length + t.length),
          f(this, t, e)
      }
      ,
      n.prototype.imul = function(t) {
          return this.clone().mulTo(t, this)
      }
      ,
      n.prototype.imuln = function(t) {
          r("number" == typeof t),
          r(t < 67108864);
          for (var e = 0, i = 0; i < this.length; i++) {
              var n = (0 | this.words[i]) * t
                , o = (67108863 & n) + (67108863 & e);
              e >>= 26,
              e += n / 67108864 | 0,
              e += o >>> 26,
              this.words[i] = 67108863 & o
          }
          return 0 !== e && (this.words[i] = e,
          this.length++),
          this
      }
      ,
      n.prototype.muln = function(t) {
          return this.clone().imuln(t)
      }
      ,
      n.prototype.sqr = function() {
          return this.mul(this)
      }
      ,
      n.prototype.isqr = function() {
          return this.imul(this.clone())
      }
      ,
      n.prototype.pow = function(t) {
          var e = function(t) {
              for (var e = new Array(t.bitLength()), r = 0; r < e.length; r++) {
                  var i = r / 26 | 0
                    , n = r % 26;
                  e[r] = (t.words[i] & 1 << n) >>> n
              }
              return e
          }(t);
          if (0 === e.length)
              return new n(1);
          for (var r = this, i = 0; i < e.length && 0 === e[i]; i++,
          r = r.sqr())
              ;
          if (++i < e.length)
              for (var o = r.sqr(); i < e.length; i++,
              o = o.sqr())
                  0 !== e[i] && (r = r.mul(o));
          return r
      }
      ,
      n.prototype.iushln = function(t) {
          r("number" == typeof t && t >= 0);
          var e, i = t % 26, n = (t - i) / 26, o = 67108863 >>> 26 - i << 26 - i;
          if (0 !== i) {
              var s = 0;
              for (e = 0; e < this.length; e++) {
                  var a = this.words[e] & o
                    , u = (0 | this.words[e]) - a << i;
                  this.words[e] = u | s,
                  s = a >>> 26 - i
              }
              s && (this.words[e] = s,
              this.length++)
          }
          if (0 !== n) {
              for (e = this.length - 1; e >= 0; e--)
                  this.words[e + n] = this.words[e];
              for (e = 0; e < n; e++)
                  this.words[e] = 0;
              this.length += n
          }
          return this.strip()
      }
      ,
      n.prototype.ishln = function(t) {
          return r(0 === this.negative),
          this.iushln(t)
      }
      ,
      n.prototype.iushrn = function(t, e, i) {
          var n;
          r("number" == typeof t && t >= 0),
          n = e ? (e - e % 26) / 26 : 0;
          var o = t % 26
            , s = Math.min((t - o) / 26, this.length)
            , a = 67108863 ^ 67108863 >>> o << o
            , u = i;
          if (n -= s,
          n = Math.max(0, n),
          u) {
              for (var l = 0; l < s; l++)
                  u.words[l] = this.words[l];
              u.length = s
          }
          if (0 === s)
              ;
          else if (this.length > s)
              for (this.length -= s,
              l = 0; l < this.length; l++)
                  this.words[l] = this.words[l + s];
          else
              this.words[0] = 0,
              this.length = 1;
          var c = 0;
          for (l = this.length - 1; l >= 0 && (0 !== c || l >= n); l--) {
              var h = 0 | this.words[l];
              this.words[l] = c << 26 - o | h >>> o,
              c = h & a
          }
          return u && 0 !== c && (u.words[u.length++] = c),
          0 === this.length && (this.words[0] = 0,
          this.length = 1),
          this.strip()
      }
      ,
      n.prototype.ishrn = function(t, e, i) {
          return r(0 === this.negative),
          this.iushrn(t, e, i)
      }
      ,
      n.prototype.shln = function(t) {
          return this.clone().ishln(t)
      }
      ,
      n.prototype.ushln = function(t) {
          return this.clone().iushln(t)
      }
      ,
      n.prototype.shrn = function(t) {
          return this.clone().ishrn(t)
      }
      ,
      n.prototype.ushrn = function(t) {
          return this.clone().iushrn(t)
      }
      ,
      n.prototype.testn = function(t) {
          r("number" == typeof t && t >= 0);
          var e = t % 26
            , i = (t - e) / 26
            , n = 1 << e;
          return !(this.length <= i) && !!(this.words[i] & n)
      }
      ,
      n.prototype.imaskn = function(t) {
          r("number" == typeof t && t >= 0);
          var e = t % 26
            , i = (t - e) / 26;
          if (r(0 === this.negative, "imaskn works only with positive numbers"),
          this.length <= i)
              return this;
          if (0 !== e && i++,
          this.length = Math.min(i, this.length),
          0 !== e) {
              var n = 67108863 ^ 67108863 >>> e << e;
              this.words[this.length - 1] &= n
          }
          return this.strip()
      }
      ,
      n.prototype.maskn = function(t) {
          return this.clone().imaskn(t)
      }
      ,
      n.prototype.iaddn = function(t) {
          return r("number" == typeof t),
          r(t < 67108864),
          t < 0 ? this.isubn(-t) : 0 !== this.negative ? 1 === this.length && (0 | this.words[0]) < t ? (this.words[0] = t - (0 | this.words[0]),
          this.negative = 0,
          this) : (this.negative = 0,
          this.isubn(t),
          this.negative = 1,
          this) : this._iaddn(t)
      }
      ,
      n.prototype._iaddn = function(t) {
          this.words[0] += t;
          for (var e = 0; e < this.length && this.words[e] >= 67108864; e++)
              this.words[e] -= 67108864,
              e === this.length - 1 ? this.words[e + 1] = 1 : this.words[e + 1]++;
          return this.length = Math.max(this.length, e + 1),
          this
      }
      ,
      n.prototype.isubn = function(t) {
          if (r("number" == typeof t),
          r(t < 67108864),
          t < 0)
              return this.iaddn(-t);
          if (0 !== this.negative)
              return this.negative = 0,
              this.iaddn(t),
              this.negative = 1,
              this;
          if (this.words[0] -= t,
          1 === this.length && this.words[0] < 0)
              this.words[0] = -this.words[0],
              this.negative = 1;
          else
              for (var e = 0; e < this.length && this.words[e] < 0; e++)
                  this.words[e] += 67108864,
                  this.words[e + 1] -= 1;
          return this.strip()
      }
      ,
      n.prototype.addn = function(t) {
          return this.clone().iaddn(t)
      }
      ,
      n.prototype.subn = function(t) {
          return this.clone().isubn(t)
      }
      ,
      n.prototype.iabs = function() {
          return this.negative = 0,
          this
      }
      ,
      n.prototype.abs = function() {
          return this.clone().iabs()
      }
      ,
      n.prototype._ishlnsubmul = function(t, e, i) {
          var n, o, s = t.length + i;
          this._expand(s);
          var a = 0;
          for (n = 0; n < t.length; n++) {
              o = (0 | this.words[n + i]) + a;
              var u = (0 | t.words[n]) * e;
              a = ((o -= 67108863 & u) >> 26) - (u / 67108864 | 0),
              this.words[n + i] = 67108863 & o
          }
          for (; n < this.length - i; n++)
              a = (o = (0 | this.words[n + i]) + a) >> 26,
              this.words[n + i] = 67108863 & o;
          if (0 === a)
              return this.strip();
          for (r(-1 === a),
          a = 0,
          n = 0; n < this.length; n++)
              a = (o = -(0 | this.words[n]) + a) >> 26,
              this.words[n] = 67108863 & o;
          return this.negative = 1,
          this.strip()
      }
      ,
      n.prototype._wordDiv = function(t, e) {
          var r = (this.length,
          t.length)
            , i = this.clone()
            , o = t
            , s = 0 | o.words[o.length - 1];
          0 !== (r = 26 - this._countBits(s)) && (o = o.ushln(r),
          i.iushln(r),
          s = 0 | o.words[o.length - 1]);
          var a, u = i.length - o.length;
          if ("mod" !== e) {
              (a = new n(null)).length = u + 1,
              a.words = new Array(a.length);
              for (var l = 0; l < a.length; l++)
                  a.words[l] = 0
          }
          var c = i.clone()._ishlnsubmul(o, 1, u);
          0 === c.negative && (i = c,
          a && (a.words[u] = 1));
          for (var h = u - 1; h >= 0; h--) {
              var A = 67108864 * (0 | i.words[o.length + h]) + (0 | i.words[o.length + h - 1]);
              for (A = Math.min(A / s | 0, 67108863),
              i._ishlnsubmul(o, A, h); 0 !== i.negative; )
                  A--,
                  i.negative = 0,
                  i._ishlnsubmul(o, 1, h),
                  i.isZero() || (i.negative ^= 1);
              a && (a.words[h] = A)
          }
          return a && a.strip(),
          i.strip(),
          "div" !== e && 0 !== r && i.iushrn(r),
          {
              div: a || null,
              mod: i
          }
      }
      ,
      n.prototype.divmod = function(t, e, i) {
          return r(!t.isZero()),
          this.isZero() ? {
              div: new n(0),
              mod: new n(0)
          } : 0 !== this.negative && 0 === t.negative ? (a = this.neg().divmod(t, e),
          "mod" !== e && (o = a.div.neg()),
          "div" !== e && (s = a.mod.neg(),
          i && 0 !== s.negative && s.iadd(t)),
          {
              div: o,
              mod: s
          }) : 0 === this.negative && 0 !== t.negative ? (a = this.divmod(t.neg(), e),
          "mod" !== e && (o = a.div.neg()),
          {
              div: o,
              mod: a.mod
          }) : 0 != (this.negative & t.negative) ? (a = this.neg().divmod(t.neg(), e),
          "div" !== e && (s = a.mod.neg(),
          i && 0 !== s.negative && s.isub(t)),
          {
              div: a.div,
              mod: s
          }) : t.length > this.length || this.cmp(t) < 0 ? {
              div: new n(0),
              mod: this
          } : 1 === t.length ? "div" === e ? {
              div: this.divn(t.words[0]),
              mod: null
          } : "mod" === e ? {
              div: null,
              mod: new n(this.modn(t.words[0]))
          } : {
              div: this.divn(t.words[0]),
              mod: new n(this.modn(t.words[0]))
          } : this._wordDiv(t, e);
          var o, s, a
      }
      ,
      n.prototype.div = function(t) {
          return this.divmod(t, "div", !1).div
      }
      ,
      n.prototype.mod = function(t) {
          return this.divmod(t, "mod", !1).mod
      }
      ,
      n.prototype.umod = function(t) {
          return this.divmod(t, "mod", !0).mod
      }
      ,
      n.prototype.divRound = function(t) {
          var e = this.divmod(t);
          if (e.mod.isZero())
              return e.div;
          var r = 0 !== e.div.negative ? e.mod.isub(t) : e.mod
            , i = t.ushrn(1)
            , n = t.andln(1)
            , o = r.cmp(i);
          return o < 0 || 1 === n && 0 === o ? e.div : 0 !== e.div.negative ? e.div.isubn(1) : e.div.iaddn(1)
      }
      ,
      n.prototype.modn = function(t) {
          r(t <= 67108863);
          for (var e = 67108864 % t, i = 0, n = this.length - 1; n >= 0; n--)
              i = (e * i + (0 | this.words[n])) % t;
          return i
      }
      ,
      n.prototype.idivn = function(t) {
          r(t <= 67108863);
          for (var e = 0, i = this.length - 1; i >= 0; i--) {
              var n = (0 | this.words[i]) + 67108864 * e;
              this.words[i] = n / t | 0,
              e = n % t
          }
          return this.strip()
      }
      ,
      n.prototype.divn = function(t) {
          return this.clone().idivn(t)
      }
      ,
      n.prototype.egcd = function(t) {
          r(0 === t.negative),
          r(!t.isZero());
          var e = this
            , i = t.clone();
          e = 0 !== e.negative ? e.umod(t) : e.clone();
          for (var o = new n(1), s = new n(0), a = new n(0), u = new n(1), l = 0; e.isEven() && i.isEven(); )
              e.iushrn(1),
              i.iushrn(1),
              ++l;
          for (var c = i.clone(), h = e.clone(); !e.isZero(); ) {
              for (var A = 0, f = 1; 0 == (e.words[0] & f) && A < 26; ++A,
              f <<= 1)
                  ;
              if (A > 0)
                  for (e.iushrn(A); A-- > 0; )
                      (o.isOdd() || s.isOdd()) && (o.iadd(c),
                      s.isub(h)),
                      o.iushrn(1),
                      s.iushrn(1);
              for (var p = 0, g = 1; 0 == (i.words[0] & g) && p < 26; ++p,
              g <<= 1)
                  ;
              if (p > 0)
                  for (i.iushrn(p); p-- > 0; )
                      (a.isOdd() || u.isOdd()) && (a.iadd(c),
                      u.isub(h)),
                      a.iushrn(1),
                      u.iushrn(1);
              e.cmp(i) >= 0 ? (e.isub(i),
              o.isub(a),
              s.isub(u)) : (i.isub(e),
              a.isub(o),
              u.isub(s))
          }
          return {
              a: a,
              b: u,
              gcd: i.iushln(l)
          }
      }
      ,
      n.prototype._invmp = function(t) {
          r(0 === t.negative),
          r(!t.isZero());
          var e = this
            , i = t.clone();
          e = 0 !== e.negative ? e.umod(t) : e.clone();
          for (var o, s = new n(1), a = new n(0), u = i.clone(); e.cmpn(1) > 0 && i.cmpn(1) > 0; ) {
              for (var l = 0, c = 1; 0 == (e.words[0] & c) && l < 26; ++l,
              c <<= 1)
                  ;
              if (l > 0)
                  for (e.iushrn(l); l-- > 0; )
                      s.isOdd() && s.iadd(u),
                      s.iushrn(1);
              for (var h = 0, A = 1; 0 == (i.words[0] & A) && h < 26; ++h,
              A <<= 1)
                  ;
              if (h > 0)
                  for (i.iushrn(h); h-- > 0; )
                      a.isOdd() && a.iadd(u),
                      a.iushrn(1);
              e.cmp(i) >= 0 ? (e.isub(i),
              s.isub(a)) : (i.isub(e),
              a.isub(s))
          }
          return (o = 0 === e.cmpn(1) ? s : a).cmpn(0) < 0 && o.iadd(t),
          o
      }
      ,
      n.prototype.gcd = function(t) {
          if (this.isZero())
              return t.abs();
          if (t.isZero())
              return this.abs();
          var e = this.clone()
            , r = t.clone();
          e.negative = 0,
          r.negative = 0;
          for (var i = 0; e.isEven() && r.isEven(); i++)
              e.iushrn(1),
              r.iushrn(1);
          for (; ; ) {
              for (; e.isEven(); )
                  e.iushrn(1);
              for (; r.isEven(); )
                  r.iushrn(1);
              var n = e.cmp(r);
              if (n < 0) {
                  var o = e;
                  e = r,
                  r = o
              } else if (0 === n || 0 === r.cmpn(1))
                  break;
              e.isub(r)
          }
          return r.iushln(i)
      }
      ,
      n.prototype.invm = function(t) {
          return this.egcd(t).a.umod(t)
      }
      ,
      n.prototype.isEven = function() {
          return 0 == (1 & this.words[0])
      }
      ,
      n.prototype.isOdd = function() {
          return 1 == (1 & this.words[0])
      }
      ,
      n.prototype.andln = function(t) {
          return this.words[0] & t
      }
      ,
      n.prototype.bincn = function(t) {
          r("number" == typeof t);
          var e = t % 26
            , i = (t - e) / 26
            , n = 1 << e;
          if (this.length <= i)
              return this._expand(i + 1),
              this.words[i] |= n,
              this;
          for (var o = n, s = i; 0 !== o && s < this.length; s++) {
              var a = 0 | this.words[s];
              o = (a += o) >>> 26,
              a &= 67108863,
              this.words[s] = a
          }
          return 0 !== o && (this.words[s] = o,
          this.length++),
          this
      }
      ,
      n.prototype.isZero = function() {
          return 1 === this.length && 0 === this.words[0]
      }
      ,
      n.prototype.cmpn = function(t) {
          var e, i = t < 0;
          if (0 !== this.negative && !i)
              return -1;
          if (0 === this.negative && i)
              return 1;
          if (this.strip(),
          this.length > 1)
              e = 1;
          else {
              i && (t = -t),
              r(t <= 67108863, "Number is too big");
              var n = 0 | this.words[0];
              e = n === t ? 0 : n < t ? -1 : 1
          }
          return 0 !== this.negative ? 0 | -e : e
      }
      ,
      n.prototype.cmp = function(t) {
          if (0 !== this.negative && 0 === t.negative)
              return -1;
          if (0 === this.negative && 0 !== t.negative)
              return 1;
          var e = this.ucmp(t);
          return 0 !== this.negative ? 0 | -e : e
      }
      ,
      n.prototype.ucmp = function(t) {
          if (this.length > t.length)
              return 1;
          if (this.length < t.length)
              return -1;
          for (var e = 0, r = this.length - 1; r >= 0; r--) {
              var i = 0 | this.words[r]
                , n = 0 | t.words[r];
              if (i !== n) {
                  i < n ? e = -1 : i > n && (e = 1);
                  break
              }
          }
          return e
      }
      ,
      n.prototype.gtn = function(t) {
          return 1 === this.cmpn(t)
      }
      ,
      n.prototype.gt = function(t) {
          return 1 === this.cmp(t)
      }
      ,
      n.prototype.gten = function(t) {
          return this.cmpn(t) >= 0
      }
      ,
      n.prototype.gte = function(t) {
          return this.cmp(t) >= 0
      }
      ,
      n.prototype.ltn = function(t) {
          return -1 === this.cmpn(t)
      }
      ,
      n.prototype.lt = function(t) {
          return -1 === this.cmp(t)
      }
      ,
      n.prototype.lten = function(t) {
          return this.cmpn(t) <= 0
      }
      ,
      n.prototype.lte = function(t) {
          return this.cmp(t) <= 0
      }
      ,
      n.prototype.eqn = function(t) {
          return 0 === this.cmpn(t)
      }
      ,
      n.prototype.eq = function(t) {
          return 0 === this.cmp(t)
      }
      ,
      n.red = function(t) {
          return new C(t)
      }
      ,
      n.prototype.toRed = function(t) {
          return r(!this.red, "Already a number in reduction context"),
          r(0 === this.negative, "red works only with positives"),
          t.convertTo(this)._forceRed(t)
      }
      ,
      n.prototype.fromRed = function() {
          return r(this.red, "fromRed works only with numbers in reduction context"),
          this.red.convertFrom(this)
      }
      ,
      n.prototype._forceRed = function(t) {
          return this.red = t,
          this
      }
      ,
      n.prototype.forceRed = function(t) {
          return r(!this.red, "Already a number in reduction context"),
          this._forceRed(t)
      }
      ,
      n.prototype.redAdd = function(t) {
          return r(this.red, "redAdd works only with red numbers"),
          this.red.add(this, t)
      }
      ,
      n.prototype.redIAdd = function(t) {
          return r(this.red, "redIAdd works only with red numbers"),
          this.red.iadd(this, t)
      }
      ,
      n.prototype.redSub = function(t) {
          return r(this.red, "redSub works only with red numbers"),
          this.red.sub(this, t)
      }
      ,
      n.prototype.redISub = function(t) {
          return r(this.red, "redISub works only with red numbers"),
          this.red.isub(this, t)
      }
      ,
      n.prototype.redShl = function(t) {
          return r(this.red, "redShl works only with red numbers"),
          this.red.shl(this, t)
      }
      ,
      n.prototype.redMul = function(t) {
          return r(this.red, "redMul works only with red numbers"),
          this.red._verify2(this, t),
          this.red.mul(this, t)
      }
      ,
      n.prototype.redIMul = function(t) {
          return r(this.red, "redMul works only with red numbers"),
          this.red._verify2(this, t),
          this.red.imul(this, t)
      }
      ,
      n.prototype.redSqr = function() {
          return r(this.red, "redSqr works only with red numbers"),
          this.red._verify1(this),
          this.red.sqr(this)
      }
      ,
      n.prototype.redISqr = function() {
          return r(this.red, "redISqr works only with red numbers"),
          this.red._verify1(this),
          this.red.isqr(this)
      }
      ,
      n.prototype.redSqrt = function() {
          return r(this.red, "redSqrt works only with red numbers"),
          this.red._verify1(this),
          this.red.sqrt(this)
      }
      ,
      n.prototype.redInvm = function() {
          return r(this.red, "redInvm works only with red numbers"),
          this.red._verify1(this),
          this.red.invm(this)
      }
      ,
      n.prototype.redNeg = function() {
          return r(this.red, "redNeg works only with red numbers"),
          this.red._verify1(this),
          this.red.neg(this)
      }
      ,
      n.prototype.redPow = function(t) {
          return r(this.red && !t.red, "redPow(normalNum)"),
          this.red._verify1(this),
          this.red.pow(this, t)
      }
      ;
      var g = {
          k256: null,
          p224: null,
          p192: null,
          p25519: null
      };
      function d(t, e) {
          this.name = t,
          this.p = new n(e,16),
          this.n = this.p.bitLength(),
          this.k = new n(1).iushln(this.n).isub(this.p),
          this.tmp = this._tmp()
      }
      function I() {
          d.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")
      }
      function m() {
          d.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")
      }
      function y() {
          d.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")
      }
      function w() {
          d.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")
      }
      function C(t) {
          if ("string" == typeof t) {
              var e = n._prime(t);
              this.m = e.p,
              this.prime = e
          } else
              r(t.gtn(1), "modulus must be greater than 1"),
              this.m = t,
              this.prime = null
      }
      function E(t) {
          C.call(this, t),
          this.shift = this.m.bitLength(),
          this.shift % 26 != 0 && (this.shift += 26 - this.shift % 26),
          this.r = new n(1).iushln(this.shift),
          this.r2 = this.imod(this.r.sqr()),
          this.rinv = this.r._invmp(this.m),
          this.minv = this.rinv.mul(this.r).isubn(1).div(this.m),
          this.minv = this.minv.umod(this.r),
          this.minv = this.r.sub(this.minv)
      }
      d.prototype._tmp = function() {
          var t = new n(null);
          return t.words = new Array(Math.ceil(this.n / 13)),
          t
      }
      ,
      d.prototype.ireduce = function(t) {
          var e, r = t;
          do {
              this.split(r, this.tmp),
              e = (r = (r = this.imulK(r)).iadd(this.tmp)).bitLength()
          } while (e > this.n);
          var i = e < this.n ? -1 : r.ucmp(this.p);
          return 0 === i ? (r.words[0] = 0,
          r.length = 1) : i > 0 ? r.isub(this.p) : r.strip(),
          r
      }
      ,
      d.prototype.split = function(t, e) {
          t.iushrn(this.n, 0, e)
      }
      ,
      d.prototype.imulK = function(t) {
          return t.imul(this.k)
      }
      ,
      i(I, d),
      I.prototype.split = function(t, e) {
          for (var r = 4194303, i = Math.min(t.length, 9), n = 0; n < i; n++)
              e.words[n] = t.words[n];
          if (e.length = i,
          t.length <= 9)
              return t.words[0] = 0,
              void (t.length = 1);
          var o = t.words[9];
          for (e.words[e.length++] = o & r,
          n = 10; n < t.length; n++) {
              var s = 0 | t.words[n];
              t.words[n - 10] = (s & r) << 4 | o >>> 22,
              o = s
          }
          o >>>= 22,
          t.words[n - 10] = o,
          0 === o && t.length > 10 ? t.length -= 10 : t.length -= 9
      }
      ,
      I.prototype.imulK = function(t) {
          t.words[t.length] = 0,
          t.words[t.length + 1] = 0,
          t.length += 2;
          for (var e = 0, r = 0; r < t.length; r++) {
              var i = 0 | t.words[r];
              e += 977 * i,
              t.words[r] = 67108863 & e,
              e = 64 * i + (e / 67108864 | 0)
          }
          return 0 === t.words[t.length - 1] && (t.length--,
          0 === t.words[t.length - 1] && t.length--),
          t
      }
      ,
      i(m, d),
      i(y, d),
      i(w, d),
      w.prototype.imulK = function(t) {
          for (var e = 0, r = 0; r < t.length; r++) {
              var i = 19 * (0 | t.words[r]) + e
                , n = 67108863 & i;
              i >>>= 26,
              t.words[r] = n,
              e = i
          }
          return 0 !== e && (t.words[t.length++] = e),
          t
      }
      ,
      n._prime = function(t) {
          if (g[t])
              return g[t];
          var e;
          if ("k256" === t)
              e = new I;
          else if ("p224" === t)
              e = new m;
          else if ("p192" === t)
              e = new y;
          else {
              if ("p25519" !== t)
                  throw new Error("Unknown prime " + t);
              e = new w
          }
          return g[t] = e,
          e
      }
      ,
      C.prototype._verify1 = function(t) {
          r(0 === t.negative, "red works only with positives"),
          r(t.red, "red works only with red numbers")
      }
      ,
      C.prototype._verify2 = function(t, e) {
          r(0 == (t.negative | e.negative), "red works only with positives"),
          r(t.red && t.red === e.red, "red works only with red numbers")
      }
      ,
      C.prototype.imod = function(t) {
          return this.prime ? this.prime.ireduce(t)._forceRed(this) : t.umod(this.m)._forceRed(this)
      }
      ,
      C.prototype.neg = function(t) {
          return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this)
      }
      ,
      C.prototype.add = function(t, e) {
          this._verify2(t, e);
          var r = t.add(e);
          return r.cmp(this.m) >= 0 && r.isub(this.m),
          r._forceRed(this)
      }
      ,
      C.prototype.iadd = function(t, e) {
          this._verify2(t, e);
          var r = t.iadd(e);
          return r.cmp(this.m) >= 0 && r.isub(this.m),
          r
      }
      ,
      C.prototype.sub = function(t, e) {
          this._verify2(t, e);
          var r = t.sub(e);
          return r.cmpn(0) < 0 && r.iadd(this.m),
          r._forceRed(this)
      }
      ,
      C.prototype.isub = function(t, e) {
          this._verify2(t, e);
          var r = t.isub(e);
          return r.cmpn(0) < 0 && r.iadd(this.m),
          r
      }
      ,
      C.prototype.shl = function(t, e) {
          return this._verify1(t),
          this.imod(t.ushln(e))
      }
      ,
      C.prototype.imul = function(t, e) {
          return this._verify2(t, e),
          this.imod(t.imul(e))
      }
      ,
      C.prototype.mul = function(t, e) {
          return this._verify2(t, e),
          this.imod(t.mul(e))
      }
      ,
      C.prototype.isqr = function(t) {
          return this.imul(t, t.clone())
      }
      ,
      C.prototype.sqr = function(t) {
          return this.mul(t, t)
      }
      ,
      C.prototype.sqrt = function(t) {
          if (t.isZero())
              return t.clone();
          var e = this.m.andln(3);
          if (r(e % 2 == 1),
          3 === e) {
              var i = this.m.add(new n(1)).iushrn(2);
              return this.pow(t, i)
          }
          for (var o = this.m.subn(1), s = 0; !o.isZero() && 0 === o.andln(1); )
              s++,
              o.iushrn(1);
          r(!o.isZero());
          var a = new n(1).toRed(this)
            , u = a.redNeg()
            , l = this.m.subn(1).iushrn(1)
            , c = this.m.bitLength();
          for (c = new n(2 * c * c).toRed(this); 0 !== this.pow(c, l).cmp(u); )
              c.redIAdd(u);
          for (var h = this.pow(c, o), A = this.pow(t, o.addn(1).iushrn(1)), f = this.pow(t, o), p = s; 0 !== f.cmp(a); ) {
              for (var g = f, d = 0; 0 !== g.cmp(a); d++)
                  g = g.redSqr();
              r(d < p);
              var I = this.pow(h, new n(1).iushln(p - d - 1));
              A = A.redMul(I),
              h = I.redSqr(),
              f = f.redMul(h),
              p = d
          }
          return A
      }
      ,
      C.prototype.invm = function(t) {
          var e = t._invmp(this.m);
          return 0 !== e.negative ? (e.negative = 0,
          this.imod(e).redNeg()) : this.imod(e)
      }
      ,
      C.prototype.pow = function(t, e) {
          if (e.isZero())
              return new n(1);
          if (0 === e.cmpn(1))
              return t.clone();
          var r = new Array(16);
          r[0] = new n(1).toRed(this),
          r[1] = t;
          for (var i = 2; i < r.length; i++)
              r[i] = this.mul(r[i - 1], t);
          var o = r[0]
            , s = 0
            , a = 0
            , u = e.bitLength() % 26;
          for (0 === u && (u = 26),
          i = e.length - 1; i >= 0; i--) {
              for (var l = e.words[i], c = u - 1; c >= 0; c--) {
                  var h = l >> c & 1;
                  o !== r[0] && (o = this.sqr(o)),
                  0 !== h || 0 !== s ? (s <<= 1,
                  s |= h,
                  (4 === ++a || 0 === i && 0 === c) && (o = this.mul(o, r[s]),
                  a = 0,
                  s = 0)) : a = 0
              }
              u = 26
          }
          return o
      }
      ,
      C.prototype.convertTo = function(t) {
          var e = t.umod(this.m);
          return e === t ? e.clone() : e
      }
      ,
      C.prototype.convertFrom = function(t) {
          var e = t.clone();
          return e.red = null,
          e
      }
      ,
      n.mont = function(t) {
          return new E(t)
      }
      ,
      i(E, C),
      E.prototype.convertTo = function(t) {
          return this.imod(t.ushln(this.shift))
      }
      ,
      E.prototype.convertFrom = function(t) {
          var e = this.imod(t.mul(this.rinv));
          return e.red = null,
          e
      }
      ,
      E.prototype.imul = function(t, e) {
          if (t.isZero() || e.isZero())
              return t.words[0] = 0,
              t.length = 1,
              t;
          var r = t.imul(e)
            , i = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m)
            , n = r.isub(i).iushrn(this.shift)
            , o = n;
          return n.cmp(this.m) >= 0 ? o = n.isub(this.m) : n.cmpn(0) < 0 && (o = n.iadd(this.m)),
          o._forceRed(this)
      }
      ,
      E.prototype.mul = function(t, e) {
          if (t.isZero() || e.isZero())
              return new n(0)._forceRed(this);
          var r = t.mul(e)
            , i = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m)
            , o = r.isub(i).iushrn(this.shift)
            , s = o;
          return o.cmp(this.m) >= 0 ? s = o.isub(this.m) : o.cmpn(0) < 0 && (s = o.iadd(this.m)),
          s._forceRed(this)
      }
      ,
      E.prototype.invm = function(t) {
          return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this)
      }
  }(t, this)
}
)),
parcelRequire.register("kgPQe", (function(t, e) {
  var r = parcelRequire("aLan1")
    , i = parcelRequire("69LxV");
  t.exports = function(t) {
      if ("string" == typeof t || "number" == typeof t) {
          var e = new r(1)
            , n = String(t).toLowerCase().trim()
            , o = "0x" === n.substr(0, 2) || "-0x" === n.substr(0, 3)
            , s = i(n);
          if ("-" === s.substr(0, 1) && (s = i(s.slice(1)),
          e = new r(-1,10)),
          !(s = "" === s ? "0" : s).match(/^-?[0-9]+$/) && s.match(/^[0-9A-Fa-f]+$/) || s.match(/^[a-fA-F]+$/) || !0 === o && s.match(/^[0-9A-Fa-f]+$/))
              return new r(s,16).mul(e);
          if ((s.match(/^-?[0-9]+$/) || "" === s) && !1 === o)
              return new r(s,10).mul(e)
      } else if ("object" == typeof t && t.toString && !t.pop && !t.push && t.toString(10).match(/^-?[0-9]+$/) && (t.mul || t.dividedToIntegerBy))
          return new r(t.toString(10),10);
      throw new Error("[number-to-bn] while converting number " + JSON.stringify(t) + " to BN.js instance, error: invalid number value. Value must be an integer, hex string, BN or BigNumber instance. Note, decimals are not supported.")
  }
}
)),
parcelRequire.register("aLan1", (function(t, e) {
  !function(t, e) {
      function r(t, e) {
          if (!t)
              throw new Error(e || "Assertion failed")
      }
      function i(t, e) {
          t.super_ = e;
          var r = function() {};
          r.prototype = e.prototype,
          t.prototype = new r,
          t.prototype.constructor = t
      }
      function n(t, e, r) {
          if (n.isBN(t))
              return t;
          this.negative = 0,
          this.words = null,
          this.length = 0,
          this.red = null,
          null !== t && ("le" !== e && "be" !== e || (r = e,
          e = 10),
          this._init(t || 0, e || 10, r || "be"))
      }
      var o;
      "object" == typeof t ? t.exports = n : e.BN = n,
      n.BN = n,
      n.wordSize = 26;
      try {
          o = parcelRequire("bdjQ6").Buffer
      } catch (t) {}
      function s(t, e, r) {
          for (var i = 0, n = Math.min(t.length, r), o = e; o < n; o++) {
              var s = t.charCodeAt(o) - 48;
              i <<= 4,
              i |= s >= 49 && s <= 54 ? s - 49 + 10 : s >= 17 && s <= 22 ? s - 17 + 10 : 15 & s
          }
          return i
      }
      function a(t, e, r, i) {
          for (var n = 0, o = Math.min(t.length, r), s = e; s < o; s++) {
              var a = t.charCodeAt(s) - 48;
              n *= i,
              n += a >= 49 ? a - 49 + 10 : a >= 17 ? a - 17 + 10 : a
          }
          return n
      }
      n.isBN = function(t) {
          return t instanceof n || null !== t && "object" == typeof t && t.constructor.wordSize === n.wordSize && Array.isArray(t.words)
      }
      ,
      n.max = function(t, e) {
          return t.cmp(e) > 0 ? t : e
      }
      ,
      n.min = function(t, e) {
          return t.cmp(e) < 0 ? t : e
      }
      ,
      n.prototype._init = function(t, e, i) {
          if ("number" == typeof t)
              return this._initNumber(t, e, i);
          if ("object" == typeof t)
              return this._initArray(t, e, i);
          "hex" === e && (e = 16),
          r(e === (0 | e) && e >= 2 && e <= 36);
          var n = 0;
          "-" === (t = t.toString().replace(/\s+/g, ""))[0] && n++,
          16 === e ? this._parseHex(t, n) : this._parseBase(t, e, n),
          "-" === t[0] && (this.negative = 1),
          this.strip(),
          "le" === i && this._initArray(this.toArray(), e, i)
      }
      ,
      n.prototype._initNumber = function(t, e, i) {
          t < 0 && (this.negative = 1,
          t = -t),
          t < 67108864 ? (this.words = [67108863 & t],
          this.length = 1) : t < 4503599627370496 ? (this.words = [67108863 & t, t / 67108864 & 67108863],
          this.length = 2) : (r(t < 9007199254740992),
          this.words = [67108863 & t, t / 67108864 & 67108863, 1],
          this.length = 3),
          "le" === i && this._initArray(this.toArray(), e, i)
      }
      ,
      n.prototype._initArray = function(t, e, i) {
          if (r("number" == typeof t.length),
          t.length <= 0)
              return this.words = [0],
              this.length = 1,
              this;
          this.length = Math.ceil(t.length / 3),
          this.words = new Array(this.length);
          for (var n = 0; n < this.length; n++)
              this.words[n] = 0;
          var o, s, a = 0;
          if ("be" === i)
              for (n = t.length - 1,
              o = 0; n >= 0; n -= 3)
                  s = t[n] | t[n - 1] << 8 | t[n - 2] << 16,
                  this.words[o] |= s << a & 67108863,
                  this.words[o + 1] = s >>> 26 - a & 67108863,
                  (a += 24) >= 26 && (a -= 26,
                  o++);
          else if ("le" === i)
              for (n = 0,
              o = 0; n < t.length; n += 3)
                  s = t[n] | t[n + 1] << 8 | t[n + 2] << 16,
                  this.words[o] |= s << a & 67108863,
                  this.words[o + 1] = s >>> 26 - a & 67108863,
                  (a += 24) >= 26 && (a -= 26,
                  o++);
          return this.strip()
      }
      ,
      n.prototype._parseHex = function(t, e) {
          this.length = Math.ceil((t.length - e) / 6),
          this.words = new Array(this.length);
          for (var r = 0; r < this.length; r++)
              this.words[r] = 0;
          var i, n, o = 0;
          for (r = t.length - 6,
          i = 0; r >= e; r -= 6)
              n = s(t, r, r + 6),
              this.words[i] |= n << o & 67108863,
              this.words[i + 1] |= n >>> 26 - o & 4194303,
              (o += 24) >= 26 && (o -= 26,
              i++);
          r + 6 !== e && (n = s(t, e, r + 6),
          this.words[i] |= n << o & 67108863,
          this.words[i + 1] |= n >>> 26 - o & 4194303),
          this.strip()
      }
      ,
      n.prototype._parseBase = function(t, e, r) {
          this.words = [0],
          this.length = 1;
          for (var i = 0, n = 1; n <= 67108863; n *= e)
              i++;
          i--,
          n = n / e | 0;
          for (var o = t.length - r, s = o % i, u = Math.min(o, o - s) + r, l = 0, c = r; c < u; c += i)
              l = a(t, c, c + i, e),
              this.imuln(n),
              this.words[0] + l < 67108864 ? this.words[0] += l : this._iaddn(l);
          if (0 !== s) {
              var h = 1;
              for (l = a(t, c, t.length, e),
              c = 0; c < s; c++)
                  h *= e;
              this.imuln(h),
              this.words[0] + l < 67108864 ? this.words[0] += l : this._iaddn(l)
          }
      }
      ,
      n.prototype.copy = function(t) {
          t.words = new Array(this.length);
          for (var e = 0; e < this.length; e++)
              t.words[e] = this.words[e];
          t.length = this.length,
          t.negative = this.negative,
          t.red = this.red
      }
      ,
      n.prototype.clone = function() {
          var t = new n(null);
          return this.copy(t),
          t
      }
      ,
      n.prototype._expand = function(t) {
          for (; this.length < t; )
              this.words[this.length++] = 0;
          return this
      }
      ,
      n.prototype.strip = function() {
          for (; this.length > 1 && 0 === this.words[this.length - 1]; )
              this.length--;
          return this._normSign()
      }
      ,
      n.prototype._normSign = function() {
          return 1 === this.length && 0 === this.words[0] && (this.negative = 0),
          this
      }
      ,
      n.prototype.inspect = function() {
          return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">"
      }
      ;
      var u = ["", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000"]
        , l = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
        , c = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];
      function h(t, e, r) {
          r.negative = e.negative ^ t.negative;
          var i = t.length + e.length | 0;
          r.length = i,
          i = i - 1 | 0;
          var n = 0 | t.words[0]
            , o = 0 | e.words[0]
            , s = n * o
            , a = 67108863 & s
            , u = s / 67108864 | 0;
          r.words[0] = a;
          for (var l = 1; l < i; l++) {
              for (var c = u >>> 26, h = 67108863 & u, A = Math.min(l, e.length - 1), f = Math.max(0, l - t.length + 1); f <= A; f++) {
                  var p = l - f | 0;
                  c += (s = (n = 0 | t.words[p]) * (o = 0 | e.words[f]) + h) / 67108864 | 0,
                  h = 67108863 & s
              }
              r.words[l] = 0 | h,
              u = 0 | c
          }
          return 0 !== u ? r.words[l] = 0 | u : r.length--,
          r.strip()
      }
      n.prototype.toString = function(t, e) {
          var i;
          if (e = 0 | e || 1,
          16 === (t = t || 10) || "hex" === t) {
              i = "";
              for (var n = 0, o = 0, s = 0; s < this.length; s++) {
                  var a = this.words[s]
                    , h = (16777215 & (a << n | o)).toString(16);
                  i = 0 !== (o = a >>> 24 - n & 16777215) || s !== this.length - 1 ? u[6 - h.length] + h + i : h + i,
                  (n += 2) >= 26 && (n -= 26,
                  s--)
              }
              for (0 !== o && (i = o.toString(16) + i); i.length % e != 0; )
                  i = "0" + i;
              return 0 !== this.negative && (i = "-" + i),
              i
          }
          if (t === (0 | t) && t >= 2 && t <= 36) {
              var A = l[t]
                , f = c[t];
              i = "";
              var p = this.clone();
              for (p.negative = 0; !p.isZero(); ) {
                  var g = p.modn(f).toString(t);
                  i = (p = p.idivn(f)).isZero() ? g + i : u[A - g.length] + g + i
              }
              for (this.isZero() && (i = "0" + i); i.length % e != 0; )
                  i = "0" + i;
              return 0 !== this.negative && (i = "-" + i),
              i
          }
          r(!1, "Base should be between 2 and 36")
      }
      ,
      n.prototype.toNumber = function() {
          var t = this.words[0];
          return 2 === this.length ? t += 67108864 * this.words[1] : 3 === this.length && 1 === this.words[2] ? t += 4503599627370496 + 67108864 * this.words[1] : this.length > 2 && r(!1, "Number can only safely store up to 53 bits"),
          0 !== this.negative ? -t : t
      }
      ,
      n.prototype.toJSON = function() {
          return this.toString(16)
      }
      ,
      n.prototype.toBuffer = function(t, e) {
          return r(void 0 !== o),
          this.toArrayLike(o, t, e)
      }
      ,
      n.prototype.toArray = function(t, e) {
          return this.toArrayLike(Array, t, e)
      }
      ,
      n.prototype.toArrayLike = function(t, e, i) {
          var n = this.byteLength()
            , o = i || Math.max(1, n);
          r(n <= o, "byte array longer than desired length"),
          r(o > 0, "Requested array length <= 0"),
          this.strip();
          var s, a, u = "le" === e, l = new t(o), c = this.clone();
          if (u) {
              for (a = 0; !c.isZero(); a++)
                  s = c.andln(255),
                  c.iushrn(8),
                  l[a] = s;
              for (; a < o; a++)
                  l[a] = 0
          } else {
              for (a = 0; a < o - n; a++)
                  l[a] = 0;
              for (a = 0; !c.isZero(); a++)
                  s = c.andln(255),
                  c.iushrn(8),
                  l[o - a - 1] = s
          }
          return l
      }
      ,
      Math.clz32 ? n.prototype._countBits = function(t) {
          return 32 - Math.clz32(t)
      }
      : n.prototype._countBits = function(t) {
          var e = t
            , r = 0;
          return e >= 4096 && (r += 13,
          e >>>= 13),
          e >= 64 && (r += 7,
          e >>>= 7),
          e >= 8 && (r += 4,
          e >>>= 4),
          e >= 2 && (r += 2,
          e >>>= 2),
          r + e
      }
      ,
      n.prototype._zeroBits = function(t) {
          if (0 === t)
              return 26;
          var e = t
            , r = 0;
          return 0 == (8191 & e) && (r += 13,
          e >>>= 13),
          0 == (127 & e) && (r += 7,
          e >>>= 7),
          0 == (15 & e) && (r += 4,
          e >>>= 4),
          0 == (3 & e) && (r += 2,
          e >>>= 2),
          0 == (1 & e) && r++,
          r
      }
      ,
      n.prototype.bitLength = function() {
          var t = this.words[this.length - 1]
            , e = this._countBits(t);
          return 26 * (this.length - 1) + e
      }
      ,
      n.prototype.zeroBits = function() {
          if (this.isZero())
              return 0;
          for (var t = 0, e = 0; e < this.length; e++) {
              var r = this._zeroBits(this.words[e]);
              if (t += r,
              26 !== r)
                  break
          }
          return t
      }
      ,
      n.prototype.byteLength = function() {
          return Math.ceil(this.bitLength() / 8)
      }
      ,
      n.prototype.toTwos = function(t) {
          return 0 !== this.negative ? this.abs().inotn(t).iaddn(1) : this.clone()
      }
      ,
      n.prototype.fromTwos = function(t) {
          return this.testn(t - 1) ? this.notn(t).iaddn(1).ineg() : this.clone()
      }
      ,
      n.prototype.isNeg = function() {
          return 0 !== this.negative
      }
      ,
      n.prototype.neg = function() {
          return this.clone().ineg()
      }
      ,
      n.prototype.ineg = function() {
          return this.isZero() || (this.negative ^= 1),
          this
      }
      ,
      n.prototype.iuor = function(t) {
          for (; this.length < t.length; )
              this.words[this.length++] = 0;
          for (var e = 0; e < t.length; e++)
              this.words[e] = this.words[e] | t.words[e];
          return this.strip()
      }
      ,
      n.prototype.ior = function(t) {
          return r(0 == (this.negative | t.negative)),
          this.iuor(t)
      }
      ,
      n.prototype.or = function(t) {
          return this.length > t.length ? this.clone().ior(t) : t.clone().ior(this)
      }
      ,
      n.prototype.uor = function(t) {
          return this.length > t.length ? this.clone().iuor(t) : t.clone().iuor(this)
      }
      ,
      n.prototype.iuand = function(t) {
          var e;
          e = this.length > t.length ? t : this;
          for (var r = 0; r < e.length; r++)
              this.words[r] = this.words[r] & t.words[r];
          return this.length = e.length,
          this.strip()
      }
      ,
      n.prototype.iand = function(t) {
          return r(0 == (this.negative | t.negative)),
          this.iuand(t)
      }
      ,
      n.prototype.and = function(t) {
          return this.length > t.length ? this.clone().iand(t) : t.clone().iand(this)
      }
      ,
      n.prototype.uand = function(t) {
          return this.length > t.length ? this.clone().iuand(t) : t.clone().iuand(this)
      }
      ,
      n.prototype.iuxor = function(t) {
          var e, r;
          this.length > t.length ? (e = this,
          r = t) : (e = t,
          r = this);
          for (var i = 0; i < r.length; i++)
              this.words[i] = e.words[i] ^ r.words[i];
          if (this !== e)
              for (; i < e.length; i++)
                  this.words[i] = e.words[i];
          return this.length = e.length,
          this.strip()
      }
      ,
      n.prototype.ixor = function(t) {
          return r(0 == (this.negative | t.negative)),
          this.iuxor(t)
      }
      ,
      n.prototype.xor = function(t) {
          return this.length > t.length ? this.clone().ixor(t) : t.clone().ixor(this)
      }
      ,
      n.prototype.uxor = function(t) {
          return this.length > t.length ? this.clone().iuxor(t) : t.clone().iuxor(this)
      }
      ,
      n.prototype.inotn = function(t) {
          r("number" == typeof t && t >= 0);
          var e = 0 | Math.ceil(t / 26)
            , i = t % 26;
          this._expand(e),
          i > 0 && e--;
          for (var n = 0; n < e; n++)
              this.words[n] = 67108863 & ~this.words[n];
          return i > 0 && (this.words[n] = ~this.words[n] & 67108863 >> 26 - i),
          this.strip()
      }
      ,
      n.prototype.notn = function(t) {
          return this.clone().inotn(t)
      }
      ,
      n.prototype.setn = function(t, e) {
          r("number" == typeof t && t >= 0);
          var i = t / 26 | 0
            , n = t % 26;
          return this._expand(i + 1),
          this.words[i] = e ? this.words[i] | 1 << n : this.words[i] & ~(1 << n),
          this.strip()
      }
      ,
      n.prototype.iadd = function(t) {
          var e, r, i;
          if (0 !== this.negative && 0 === t.negative)
              return this.negative = 0,
              e = this.isub(t),
              this.negative ^= 1,
              this._normSign();
          if (0 === this.negative && 0 !== t.negative)
              return t.negative = 0,
              e = this.isub(t),
              t.negative = 1,
              e._normSign();
          this.length > t.length ? (r = this,
          i = t) : (r = t,
          i = this);
          for (var n = 0, o = 0; o < i.length; o++)
              e = (0 | r.words[o]) + (0 | i.words[o]) + n,
              this.words[o] = 67108863 & e,
              n = e >>> 26;
          for (; 0 !== n && o < r.length; o++)
              e = (0 | r.words[o]) + n,
              this.words[o] = 67108863 & e,
              n = e >>> 26;
          if (this.length = r.length,
          0 !== n)
              this.words[this.length] = n,
              this.length++;
          else if (r !== this)
              for (; o < r.length; o++)
                  this.words[o] = r.words[o];
          return this
      }
      ,
      n.prototype.add = function(t) {
          var e;
          return 0 !== t.negative && 0 === this.negative ? (t.negative = 0,
          e = this.sub(t),
          t.negative ^= 1,
          e) : 0 === t.negative && 0 !== this.negative ? (this.negative = 0,
          e = t.sub(this),
          this.negative = 1,
          e) : this.length > t.length ? this.clone().iadd(t) : t.clone().iadd(this)
      }
      ,
      n.prototype.isub = function(t) {
          if (0 !== t.negative) {
              t.negative = 0;
              var e = this.iadd(t);
              return t.negative = 1,
              e._normSign()
          }
          if (0 !== this.negative)
              return this.negative = 0,
              this.iadd(t),
              this.negative = 1,
              this._normSign();
          var r, i, n = this.cmp(t);
          if (0 === n)
              return this.negative = 0,
              this.length = 1,
              this.words[0] = 0,
              this;
          n > 0 ? (r = this,
          i = t) : (r = t,
          i = this);
          for (var o = 0, s = 0; s < i.length; s++)
              o = (e = (0 | r.words[s]) - (0 | i.words[s]) + o) >> 26,
              this.words[s] = 67108863 & e;
          for (; 0 !== o && s < r.length; s++)
              o = (e = (0 | r.words[s]) + o) >> 26,
              this.words[s] = 67108863 & e;
          if (0 === o && s < r.length && r !== this)
              for (; s < r.length; s++)
                  this.words[s] = r.words[s];
          return this.length = Math.max(this.length, s),
          r !== this && (this.negative = 1),
          this.strip()
      }
      ,
      n.prototype.sub = function(t) {
          return this.clone().isub(t)
      }
      ;
      var A = function(t, e, r) {
          var i, n, o, s = t.words, a = e.words, u = r.words, l = 0, c = 0 | s[0], h = 8191 & c, A = c >>> 13, f = 0 | s[1], p = 8191 & f, g = f >>> 13, d = 0 | s[2], I = 8191 & d, m = d >>> 13, y = 0 | s[3], w = 8191 & y, C = y >>> 13, E = 0 | s[4], v = 8191 & E, B = E >>> 13, b = 0 | s[5], Q = 8191 & b, R = b >>> 13, M = 0 | s[6], _ = 8191 & M, x = M >>> 13, D = 0 | s[7], S = 8191 & D, k = D >>> 13, F = 0 | s[8], q = 8191 & F, N = F >>> 13, T = 0 | s[9], P = 8191 & T, O = T >>> 13, U = 0 | a[0], L = 8191 & U, H = U >>> 13, K = 0 | a[1], z = 8191 & K, G = K >>> 13, V = 0 | a[2], $ = 8191 & V, j = V >>> 13, Y = 0 | a[3], W = 8191 & Y, Z = Y >>> 13, X = 0 | a[4], J = 8191 & X, tt = X >>> 13, et = 0 | a[5], rt = 8191 & et, it = et >>> 13, nt = 0 | a[6], ot = 8191 & nt, st = nt >>> 13, at = 0 | a[7], ut = 8191 & at, lt = at >>> 13, ct = 0 | a[8], ht = 8191 & ct, At = ct >>> 13, ft = 0 | a[9], pt = 8191 & ft, gt = ft >>> 13;
          r.negative = t.negative ^ e.negative,
          r.length = 19;
          var dt = (l + (i = Math.imul(h, L)) | 0) + ((8191 & (n = (n = Math.imul(h, H)) + Math.imul(A, L) | 0)) << 13) | 0;
          l = ((o = Math.imul(A, H)) + (n >>> 13) | 0) + (dt >>> 26) | 0,
          dt &= 67108863,
          i = Math.imul(p, L),
          n = (n = Math.imul(p, H)) + Math.imul(g, L) | 0,
          o = Math.imul(g, H);
          var It = (l + (i = i + Math.imul(h, z) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, G) | 0) + Math.imul(A, z) | 0)) << 13) | 0;
          l = ((o = o + Math.imul(A, G) | 0) + (n >>> 13) | 0) + (It >>> 26) | 0,
          It &= 67108863,
          i = Math.imul(I, L),
          n = (n = Math.imul(I, H)) + Math.imul(m, L) | 0,
          o = Math.imul(m, H),
          i = i + Math.imul(p, z) | 0,
          n = (n = n + Math.imul(p, G) | 0) + Math.imul(g, z) | 0,
          o = o + Math.imul(g, G) | 0;
          var mt = (l + (i = i + Math.imul(h, $) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, j) | 0) + Math.imul(A, $) | 0)) << 13) | 0;
          l = ((o = o + Math.imul(A, j) | 0) + (n >>> 13) | 0) + (mt >>> 26) | 0,
          mt &= 67108863,
          i = Math.imul(w, L),
          n = (n = Math.imul(w, H)) + Math.imul(C, L) | 0,
          o = Math.imul(C, H),
          i = i + Math.imul(I, z) | 0,
          n = (n = n + Math.imul(I, G) | 0) + Math.imul(m, z) | 0,
          o = o + Math.imul(m, G) | 0,
          i = i + Math.imul(p, $) | 0,
          n = (n = n + Math.imul(p, j) | 0) + Math.imul(g, $) | 0,
          o = o + Math.imul(g, j) | 0;
          var yt = (l + (i = i + Math.imul(h, W) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, Z) | 0) + Math.imul(A, W) | 0)) << 13) | 0;
          l = ((o = o + Math.imul(A, Z) | 0) + (n >>> 13) | 0) + (yt >>> 26) | 0,
          yt &= 67108863,
          i = Math.imul(v, L),
          n = (n = Math.imul(v, H)) + Math.imul(B, L) | 0,
          o = Math.imul(B, H),
          i = i + Math.imul(w, z) | 0,
          n = (n = n + Math.imul(w, G) | 0) + Math.imul(C, z) | 0,
          o = o + Math.imul(C, G) | 0,
          i = i + Math.imul(I, $) | 0,
          n = (n = n + Math.imul(I, j) | 0) + Math.imul(m, $) | 0,
          o = o + Math.imul(m, j) | 0,
          i = i + Math.imul(p, W) | 0,
          n = (n = n + Math.imul(p, Z) | 0) + Math.imul(g, W) | 0,
          o = o + Math.imul(g, Z) | 0;
          var wt = (l + (i = i + Math.imul(h, J) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, tt) | 0) + Math.imul(A, J) | 0)) << 13) | 0;
          l = ((o = o + Math.imul(A, tt) | 0) + (n >>> 13) | 0) + (wt >>> 26) | 0,
          wt &= 67108863,
          i = Math.imul(Q, L),
          n = (n = Math.imul(Q, H)) + Math.imul(R, L) | 0,
          o = Math.imul(R, H),
          i = i + Math.imul(v, z) | 0,
          n = (n = n + Math.imul(v, G) | 0) + Math.imul(B, z) | 0,
          o = o + Math.imul(B, G) | 0,
          i = i + Math.imul(w, $) | 0,
          n = (n = n + Math.imul(w, j) | 0) + Math.imul(C, $) | 0,
          o = o + Math.imul(C, j) | 0,
          i = i + Math.imul(I, W) | 0,
          n = (n = n + Math.imul(I, Z) | 0) + Math.imul(m, W) | 0,
          o = o + Math.imul(m, Z) | 0,
          i = i + Math.imul(p, J) | 0,
          n = (n = n + Math.imul(p, tt) | 0) + Math.imul(g, J) | 0,
          o = o + Math.imul(g, tt) | 0;
          var Ct = (l + (i = i + Math.imul(h, rt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, it) | 0) + Math.imul(A, rt) | 0)) << 13) | 0;
          l = ((o = o + Math.imul(A, it) | 0) + (n >>> 13) | 0) + (Ct >>> 26) | 0,
          Ct &= 67108863,
          i = Math.imul(_, L),
          n = (n = Math.imul(_, H)) + Math.imul(x, L) | 0,
          o = Math.imul(x, H),
          i = i + Math.imul(Q, z) | 0,
          n = (n = n + Math.imul(Q, G) | 0) + Math.imul(R, z) | 0,
          o = o + Math.imul(R, G) | 0,
          i = i + Math.imul(v, $) | 0,
          n = (n = n + Math.imul(v, j) | 0) + Math.imul(B, $) | 0,
          o = o + Math.imul(B, j) | 0,
          i = i + Math.imul(w, W) | 0,
          n = (n = n + Math.imul(w, Z) | 0) + Math.imul(C, W) | 0,
          o = o + Math.imul(C, Z) | 0,
          i = i + Math.imul(I, J) | 0,
          n = (n = n + Math.imul(I, tt) | 0) + Math.imul(m, J) | 0,
          o = o + Math.imul(m, tt) | 0,
          i = i + Math.imul(p, rt) | 0,
          n = (n = n + Math.imul(p, it) | 0) + Math.imul(g, rt) | 0,
          o = o + Math.imul(g, it) | 0;
          var Et = (l + (i = i + Math.imul(h, ot) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, st) | 0) + Math.imul(A, ot) | 0)) << 13) | 0;
          l = ((o = o + Math.imul(A, st) | 0) + (n >>> 13) | 0) + (Et >>> 26) | 0,
          Et &= 67108863,
          i = Math.imul(S, L),
          n = (n = Math.imul(S, H)) + Math.imul(k, L) | 0,
          o = Math.imul(k, H),
          i = i + Math.imul(_, z) | 0,
          n = (n = n + Math.imul(_, G) | 0) + Math.imul(x, z) | 0,
          o = o + Math.imul(x, G) | 0,
          i = i + Math.imul(Q, $) | 0,
          n = (n = n + Math.imul(Q, j) | 0) + Math.imul(R, $) | 0,
          o = o + Math.imul(R, j) | 0,
          i = i + Math.imul(v, W) | 0,
          n = (n = n + Math.imul(v, Z) | 0) + Math.imul(B, W) | 0,
          o = o + Math.imul(B, Z) | 0,
          i = i + Math.imul(w, J) | 0,
          n = (n = n + Math.imul(w, tt) | 0) + Math.imul(C, J) | 0,
          o = o + Math.imul(C, tt) | 0,
          i = i + Math.imul(I, rt) | 0,
          n = (n = n + Math.imul(I, it) | 0) + Math.imul(m, rt) | 0,
          o = o + Math.imul(m, it) | 0,
          i = i + Math.imul(p, ot) | 0,
          n = (n = n + Math.imul(p, st) | 0) + Math.imul(g, ot) | 0,
          o = o + Math.imul(g, st) | 0;
          var vt = (l + (i = i + Math.imul(h, ut) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, lt) | 0) + Math.imul(A, ut) | 0)) << 13) | 0;
          l = ((o = o + Math.imul(A, lt) | 0) + (n >>> 13) | 0) + (vt >>> 26) | 0,
          vt &= 67108863,
          i = Math.imul(q, L),
          n = (n = Math.imul(q, H)) + Math.imul(N, L) | 0,
          o = Math.imul(N, H),
          i = i + Math.imul(S, z) | 0,
          n = (n = n + Math.imul(S, G) | 0) + Math.imul(k, z) | 0,
          o = o + Math.imul(k, G) | 0,
          i = i + Math.imul(_, $) | 0,
          n = (n = n + Math.imul(_, j) | 0) + Math.imul(x, $) | 0,
          o = o + Math.imul(x, j) | 0,
          i = i + Math.imul(Q, W) | 0,
          n = (n = n + Math.imul(Q, Z) | 0) + Math.imul(R, W) | 0,
          o = o + Math.imul(R, Z) | 0,
          i = i + Math.imul(v, J) | 0,
          n = (n = n + Math.imul(v, tt) | 0) + Math.imul(B, J) | 0,
          o = o + Math.imul(B, tt) | 0,
          i = i + Math.imul(w, rt) | 0,
          n = (n = n + Math.imul(w, it) | 0) + Math.imul(C, rt) | 0,
          o = o + Math.imul(C, it) | 0,
          i = i + Math.imul(I, ot) | 0,
          n = (n = n + Math.imul(I, st) | 0) + Math.imul(m, ot) | 0,
          o = o + Math.imul(m, st) | 0,
          i = i + Math.imul(p, ut) | 0,
          n = (n = n + Math.imul(p, lt) | 0) + Math.imul(g, ut) | 0,
          o = o + Math.imul(g, lt) | 0;
          var Bt = (l + (i = i + Math.imul(h, ht) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, At) | 0) + Math.imul(A, ht) | 0)) << 13) | 0;
          l = ((o = o + Math.imul(A, At) | 0) + (n >>> 13) | 0) + (Bt >>> 26) | 0,
          Bt &= 67108863,
          i = Math.imul(P, L),
          n = (n = Math.imul(P, H)) + Math.imul(O, L) | 0,
          o = Math.imul(O, H),
          i = i + Math.imul(q, z) | 0,
          n = (n = n + Math.imul(q, G) | 0) + Math.imul(N, z) | 0,
          o = o + Math.imul(N, G) | 0,
          i = i + Math.imul(S, $) | 0,
          n = (n = n + Math.imul(S, j) | 0) + Math.imul(k, $) | 0,
          o = o + Math.imul(k, j) | 0,
          i = i + Math.imul(_, W) | 0,
          n = (n = n + Math.imul(_, Z) | 0) + Math.imul(x, W) | 0,
          o = o + Math.imul(x, Z) | 0,
          i = i + Math.imul(Q, J) | 0,
          n = (n = n + Math.imul(Q, tt) | 0) + Math.imul(R, J) | 0,
          o = o + Math.imul(R, tt) | 0,
          i = i + Math.imul(v, rt) | 0,
          n = (n = n + Math.imul(v, it) | 0) + Math.imul(B, rt) | 0,
          o = o + Math.imul(B, it) | 0,
          i = i + Math.imul(w, ot) | 0,
          n = (n = n + Math.imul(w, st) | 0) + Math.imul(C, ot) | 0,
          o = o + Math.imul(C, st) | 0,
          i = i + Math.imul(I, ut) | 0,
          n = (n = n + Math.imul(I, lt) | 0) + Math.imul(m, ut) | 0,
          o = o + Math.imul(m, lt) | 0,
          i = i + Math.imul(p, ht) | 0,
          n = (n = n + Math.imul(p, At) | 0) + Math.imul(g, ht) | 0,
          o = o + Math.imul(g, At) | 0;
          var bt = (l + (i = i + Math.imul(h, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, gt) | 0) + Math.imul(A, pt) | 0)) << 13) | 0;
          l = ((o = o + Math.imul(A, gt) | 0) + (n >>> 13) | 0) + (bt >>> 26) | 0,
          bt &= 67108863,
          i = Math.imul(P, z),
          n = (n = Math.imul(P, G)) + Math.imul(O, z) | 0,
          o = Math.imul(O, G),
          i = i + Math.imul(q, $) | 0,
          n = (n = n + Math.imul(q, j) | 0) + Math.imul(N, $) | 0,
          o = o + Math.imul(N, j) | 0,
          i = i + Math.imul(S, W) | 0,
          n = (n = n + Math.imul(S, Z) | 0) + Math.imul(k, W) | 0,
          o = o + Math.imul(k, Z) | 0,
          i = i + Math.imul(_, J) | 0,
          n = (n = n + Math.imul(_, tt) | 0) + Math.imul(x, J) | 0,
          o = o + Math.imul(x, tt) | 0,
          i = i + Math.imul(Q, rt) | 0,
          n = (n = n + Math.imul(Q, it) | 0) + Math.imul(R, rt) | 0,
          o = o + Math.imul(R, it) | 0,
          i = i + Math.imul(v, ot) | 0,
          n = (n = n + Math.imul(v, st) | 0) + Math.imul(B, ot) | 0,
          o = o + Math.imul(B, st) | 0,
          i = i + Math.imul(w, ut) | 0,
          n = (n = n + Math.imul(w, lt) | 0) + Math.imul(C, ut) | 0,
          o = o + Math.imul(C, lt) | 0,
          i = i + Math.imul(I, ht) | 0,
          n = (n = n + Math.imul(I, At) | 0) + Math.imul(m, ht) | 0,
          o = o + Math.imul(m, At) | 0;
          var Qt = (l + (i = i + Math.imul(p, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(p, gt) | 0) + Math.imul(g, pt) | 0)) << 13) | 0;
          l = ((o = o + Math.imul(g, gt) | 0) + (n >>> 13) | 0) + (Qt >>> 26) | 0,
          Qt &= 67108863,
          i = Math.imul(P, $),
          n = (n = Math.imul(P, j)) + Math.imul(O, $) | 0,
          o = Math.imul(O, j),
          i = i + Math.imul(q, W) | 0,
          n = (n = n + Math.imul(q, Z) | 0) + Math.imul(N, W) | 0,
          o = o + Math.imul(N, Z) | 0,
          i = i + Math.imul(S, J) | 0,
          n = (n = n + Math.imul(S, tt) | 0) + Math.imul(k, J) | 0,
          o = o + Math.imul(k, tt) | 0,
          i = i + Math.imul(_, rt) | 0,
          n = (n = n + Math.imul(_, it) | 0) + Math.imul(x, rt) | 0,
          o = o + Math.imul(x, it) | 0,
          i = i + Math.imul(Q, ot) | 0,
          n = (n = n + Math.imul(Q, st) | 0) + Math.imul(R, ot) | 0,
          o = o + Math.imul(R, st) | 0,
          i = i + Math.imul(v, ut) | 0,
          n = (n = n + Math.imul(v, lt) | 0) + Math.imul(B, ut) | 0,
          o = o + Math.imul(B, lt) | 0,
          i = i + Math.imul(w, ht) | 0,
          n = (n = n + Math.imul(w, At) | 0) + Math.imul(C, ht) | 0,
          o = o + Math.imul(C, At) | 0;
          var Rt = (l + (i = i + Math.imul(I, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(I, gt) | 0) + Math.imul(m, pt) | 0)) << 13) | 0;
          l = ((o = o + Math.imul(m, gt) | 0) + (n >>> 13) | 0) + (Rt >>> 26) | 0,
          Rt &= 67108863,
          i = Math.imul(P, W),
          n = (n = Math.imul(P, Z)) + Math.imul(O, W) | 0,
          o = Math.imul(O, Z),
          i = i + Math.imul(q, J) | 0,
          n = (n = n + Math.imul(q, tt) | 0) + Math.imul(N, J) | 0,
          o = o + Math.imul(N, tt) | 0,
          i = i + Math.imul(S, rt) | 0,
          n = (n = n + Math.imul(S, it) | 0) + Math.imul(k, rt) | 0,
          o = o + Math.imul(k, it) | 0,
          i = i + Math.imul(_, ot) | 0,
          n = (n = n + Math.imul(_, st) | 0) + Math.imul(x, ot) | 0,
          o = o + Math.imul(x, st) | 0,
          i = i + Math.imul(Q, ut) | 0,
          n = (n = n + Math.imul(Q, lt) | 0) + Math.imul(R, ut) | 0,
          o = o + Math.imul(R, lt) | 0,
          i = i + Math.imul(v, ht) | 0,
          n = (n = n + Math.imul(v, At) | 0) + Math.imul(B, ht) | 0,
          o = o + Math.imul(B, At) | 0;
          var Mt = (l + (i = i + Math.imul(w, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(w, gt) | 0) + Math.imul(C, pt) | 0)) << 13) | 0;
          l = ((o = o + Math.imul(C, gt) | 0) + (n >>> 13) | 0) + (Mt >>> 26) | 0,
          Mt &= 67108863,
          i = Math.imul(P, J),
          n = (n = Math.imul(P, tt)) + Math.imul(O, J) | 0,
          o = Math.imul(O, tt),
          i = i + Math.imul(q, rt) | 0,
          n = (n = n + Math.imul(q, it) | 0) + Math.imul(N, rt) | 0,
          o = o + Math.imul(N, it) | 0,
          i = i + Math.imul(S, ot) | 0,
          n = (n = n + Math.imul(S, st) | 0) + Math.imul(k, ot) | 0,
          o = o + Math.imul(k, st) | 0,
          i = i + Math.imul(_, ut) | 0,
          n = (n = n + Math.imul(_, lt) | 0) + Math.imul(x, ut) | 0,
          o = o + Math.imul(x, lt) | 0,
          i = i + Math.imul(Q, ht) | 0,
          n = (n = n + Math.imul(Q, At) | 0) + Math.imul(R, ht) | 0,
          o = o + Math.imul(R, At) | 0;
          var _t = (l + (i = i + Math.imul(v, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(v, gt) | 0) + Math.imul(B, pt) | 0)) << 13) | 0;
          l = ((o = o + Math.imul(B, gt) | 0) + (n >>> 13) | 0) + (_t >>> 26) | 0,
          _t &= 67108863,
          i = Math.imul(P, rt),
          n = (n = Math.imul(P, it)) + Math.imul(O, rt) | 0,
          o = Math.imul(O, it),
          i = i + Math.imul(q, ot) | 0,
          n = (n = n + Math.imul(q, st) | 0) + Math.imul(N, ot) | 0,
          o = o + Math.imul(N, st) | 0,
          i = i + Math.imul(S, ut) | 0,
          n = (n = n + Math.imul(S, lt) | 0) + Math.imul(k, ut) | 0,
          o = o + Math.imul(k, lt) | 0,
          i = i + Math.imul(_, ht) | 0,
          n = (n = n + Math.imul(_, At) | 0) + Math.imul(x, ht) | 0,
          o = o + Math.imul(x, At) | 0;
          var xt = (l + (i = i + Math.imul(Q, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(Q, gt) | 0) + Math.imul(R, pt) | 0)) << 13) | 0;
          l = ((o = o + Math.imul(R, gt) | 0) + (n >>> 13) | 0) + (xt >>> 26) | 0,
          xt &= 67108863,
          i = Math.imul(P, ot),
          n = (n = Math.imul(P, st)) + Math.imul(O, ot) | 0,
          o = Math.imul(O, st),
          i = i + Math.imul(q, ut) | 0,
          n = (n = n + Math.imul(q, lt) | 0) + Math.imul(N, ut) | 0,
          o = o + Math.imul(N, lt) | 0,
          i = i + Math.imul(S, ht) | 0,
          n = (n = n + Math.imul(S, At) | 0) + Math.imul(k, ht) | 0,
          o = o + Math.imul(k, At) | 0;
          var Dt = (l + (i = i + Math.imul(_, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(_, gt) | 0) + Math.imul(x, pt) | 0)) << 13) | 0;
          l = ((o = o + Math.imul(x, gt) | 0) + (n >>> 13) | 0) + (Dt >>> 26) | 0,
          Dt &= 67108863,
          i = Math.imul(P, ut),
          n = (n = Math.imul(P, lt)) + Math.imul(O, ut) | 0,
          o = Math.imul(O, lt),
          i = i + Math.imul(q, ht) | 0,
          n = (n = n + Math.imul(q, At) | 0) + Math.imul(N, ht) | 0,
          o = o + Math.imul(N, At) | 0;
          var St = (l + (i = i + Math.imul(S, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(S, gt) | 0) + Math.imul(k, pt) | 0)) << 13) | 0;
          l = ((o = o + Math.imul(k, gt) | 0) + (n >>> 13) | 0) + (St >>> 26) | 0,
          St &= 67108863,
          i = Math.imul(P, ht),
          n = (n = Math.imul(P, At)) + Math.imul(O, ht) | 0,
          o = Math.imul(O, At);
          var kt = (l + (i = i + Math.imul(q, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(q, gt) | 0) + Math.imul(N, pt) | 0)) << 13) | 0;
          l = ((o = o + Math.imul(N, gt) | 0) + (n >>> 13) | 0) + (kt >>> 26) | 0,
          kt &= 67108863;
          var Ft = (l + (i = Math.imul(P, pt)) | 0) + ((8191 & (n = (n = Math.imul(P, gt)) + Math.imul(O, pt) | 0)) << 13) | 0;
          return l = ((o = Math.imul(O, gt)) + (n >>> 13) | 0) + (Ft >>> 26) | 0,
          Ft &= 67108863,
          u[0] = dt,
          u[1] = It,
          u[2] = mt,
          u[3] = yt,
          u[4] = wt,
          u[5] = Ct,
          u[6] = Et,
          u[7] = vt,
          u[8] = Bt,
          u[9] = bt,
          u[10] = Qt,
          u[11] = Rt,
          u[12] = Mt,
          u[13] = _t,
          u[14] = xt,
          u[15] = Dt,
          u[16] = St,
          u[17] = kt,
          u[18] = Ft,
          0 !== l && (u[19] = l,
          r.length++),
          r
      };
      function f(t, e, r) {
          return (new p).mulp(t, e, r)
      }
      function p(t, e) {
          this.x = t,
          this.y = e
      }
      Math.imul || (A = h),
      n.prototype.mulTo = function(t, e) {
          var r, i = this.length + t.length;
          return r = 10 === this.length && 10 === t.length ? A(this, t, e) : i < 63 ? h(this, t, e) : i < 1024 ? function(t, e, r) {
              r.negative = e.negative ^ t.negative,
              r.length = t.length + e.length;
              for (var i = 0, n = 0, o = 0; o < r.length - 1; o++) {
                  var s = n;
                  n = 0;
                  for (var a = 67108863 & i, u = Math.min(o, e.length - 1), l = Math.max(0, o - t.length + 1); l <= u; l++) {
                      var c = o - l
                        , h = (0 | t.words[c]) * (0 | e.words[l])
                        , A = 67108863 & h;
                      a = 67108863 & (A = A + a | 0),
                      n += (s = (s = s + (h / 67108864 | 0) | 0) + (A >>> 26) | 0) >>> 26,
                      s &= 67108863
                  }
                  r.words[o] = a,
                  i = s,
                  s = n
              }
              return 0 !== i ? r.words[o] = i : r.length--,
              r.strip()
          }(this, t, e) : f(this, t, e),
          r
      }
      ,
      p.prototype.makeRBT = function(t) {
          for (var e = new Array(t), r = n.prototype._countBits(t) - 1, i = 0; i < t; i++)
              e[i] = this.revBin(i, r, t);
          return e
      }
      ,
      p.prototype.revBin = function(t, e, r) {
          if (0 === t || t === r - 1)
              return t;
          for (var i = 0, n = 0; n < e; n++)
              i |= (1 & t) << e - n - 1,
              t >>= 1;
          return i
      }
      ,
      p.prototype.permute = function(t, e, r, i, n, o) {
          for (var s = 0; s < o; s++)
              i[s] = e[t[s]],
              n[s] = r[t[s]]
      }
      ,
      p.prototype.transform = function(t, e, r, i, n, o) {
          this.permute(o, t, e, r, i, n);
          for (var s = 1; s < n; s <<= 1)
              for (var a = s << 1, u = Math.cos(2 * Math.PI / a), l = Math.sin(2 * Math.PI / a), c = 0; c < n; c += a)
                  for (var h = u, A = l, f = 0; f < s; f++) {
                      var p = r[c + f]
                        , g = i[c + f]
                        , d = r[c + f + s]
                        , I = i[c + f + s]
                        , m = h * d - A * I;
                      I = h * I + A * d,
                      d = m,
                      r[c + f] = p + d,
                      i[c + f] = g + I,
                      r[c + f + s] = p - d,
                      i[c + f + s] = g - I,
                      f !== a && (m = u * h - l * A,
                      A = u * A + l * h,
                      h = m)
                  }
      }
      ,
      p.prototype.guessLen13b = function(t, e) {
          var r = 1 | Math.max(e, t)
            , i = 1 & r
            , n = 0;
          for (r = r / 2 | 0; r; r >>>= 1)
              n++;
          return 1 << n + 1 + i
      }
      ,
      p.prototype.conjugate = function(t, e, r) {
          if (!(r <= 1))
              for (var i = 0; i < r / 2; i++) {
                  var n = t[i];
                  t[i] = t[r - i - 1],
                  t[r - i - 1] = n,
                  n = e[i],
                  e[i] = -e[r - i - 1],
                  e[r - i - 1] = -n
              }
      }
      ,
      p.prototype.normalize13b = function(t, e) {
          for (var r = 0, i = 0; i < e / 2; i++) {
              var n = 8192 * Math.round(t[2 * i + 1] / e) + Math.round(t[2 * i] / e) + r;
              t[i] = 67108863 & n,
              r = n < 67108864 ? 0 : n / 67108864 | 0
          }
          return t
      }
      ,
      p.prototype.convert13b = function(t, e, i, n) {
          for (var o = 0, s = 0; s < e; s++)
              o += 0 | t[s],
              i[2 * s] = 8191 & o,
              o >>>= 13,
              i[2 * s + 1] = 8191 & o,
              o >>>= 13;
          for (s = 2 * e; s < n; ++s)
              i[s] = 0;
          r(0 === o),
          r(0 == (-8192 & o))
      }
      ,
      p.prototype.stub = function(t) {
          for (var e = new Array(t), r = 0; r < t; r++)
              e[r] = 0;
          return e
      }
      ,
      p.prototype.mulp = function(t, e, r) {
          var i = 2 * this.guessLen13b(t.length, e.length)
            , n = this.makeRBT(i)
            , o = this.stub(i)
            , s = new Array(i)
            , a = new Array(i)
            , u = new Array(i)
            , l = new Array(i)
            , c = new Array(i)
            , h = new Array(i)
            , A = r.words;
          A.length = i,
          this.convert13b(t.words, t.length, s, i),
          this.convert13b(e.words, e.length, l, i),
          this.transform(s, o, a, u, i, n),
          this.transform(l, o, c, h, i, n);
          for (var f = 0; f < i; f++) {
              var p = a[f] * c[f] - u[f] * h[f];
              u[f] = a[f] * h[f] + u[f] * c[f],
              a[f] = p
          }
          return this.conjugate(a, u, i),
          this.transform(a, u, A, o, i, n),
          this.conjugate(A, o, i),
          this.normalize13b(A, i),
          r.negative = t.negative ^ e.negative,
          r.length = t.length + e.length,
          r.strip()
      }
      ,
      n.prototype.mul = function(t) {
          var e = new n(null);
          return e.words = new Array(this.length + t.length),
          this.mulTo(t, e)
      }
      ,
      n.prototype.mulf = function(t) {
          var e = new n(null);
          return e.words = new Array(this.length + t.length),
          f(this, t, e)
      }
      ,
      n.prototype.imul = function(t) {
          return this.clone().mulTo(t, this)
      }
      ,
      n.prototype.imuln = function(t) {
          r("number" == typeof t),
          r(t < 67108864);
          for (var e = 0, i = 0; i < this.length; i++) {
              var n = (0 | this.words[i]) * t
                , o = (67108863 & n) + (67108863 & e);
              e >>= 26,
              e += n / 67108864 | 0,
              e += o >>> 26,
              this.words[i] = 67108863 & o
          }
          return 0 !== e && (this.words[i] = e,
          this.length++),
          this
      }
      ,
      n.prototype.muln = function(t) {
          return this.clone().imuln(t)
      }
      ,
      n.prototype.sqr = function() {
          return this.mul(this)
      }
      ,
      n.prototype.isqr = function() {
          return this.imul(this.clone())
      }
      ,
      n.prototype.pow = function(t) {
          var e = function(t) {
              for (var e = new Array(t.bitLength()), r = 0; r < e.length; r++) {
                  var i = r / 26 | 0
                    , n = r % 26;
                  e[r] = (t.words[i] & 1 << n) >>> n
              }
              return e
          }(t);
          if (0 === e.length)
              return new n(1);
          for (var r = this, i = 0; i < e.length && 0 === e[i]; i++,
          r = r.sqr())
              ;
          if (++i < e.length)
              for (var o = r.sqr(); i < e.length; i++,
              o = o.sqr())
                  0 !== e[i] && (r = r.mul(o));
          return r
      }
      ,
      n.prototype.iushln = function(t) {
          r("number" == typeof t && t >= 0);
          var e, i = t % 26, n = (t - i) / 26, o = 67108863 >>> 26 - i << 26 - i;
          if (0 !== i) {
              var s = 0;
              for (e = 0; e < this.length; e++) {
                  var a = this.words[e] & o
                    , u = (0 | this.words[e]) - a << i;
                  this.words[e] = u | s,
                  s = a >>> 26 - i
              }
              s && (this.words[e] = s,
              this.length++)
          }
          if (0 !== n) {
              for (e = this.length - 1; e >= 0; e--)
                  this.words[e + n] = this.words[e];
              for (e = 0; e < n; e++)
                  this.words[e] = 0;
              this.length += n
          }
          return this.strip()
      }
      ,
      n.prototype.ishln = function(t) {
          return r(0 === this.negative),
          this.iushln(t)
      }
      ,
      n.prototype.iushrn = function(t, e, i) {
          var n;
          r("number" == typeof t && t >= 0),
          n = e ? (e - e % 26) / 26 : 0;
          var o = t % 26
            , s = Math.min((t - o) / 26, this.length)
            , a = 67108863 ^ 67108863 >>> o << o
            , u = i;
          if (n -= s,
          n = Math.max(0, n),
          u) {
              for (var l = 0; l < s; l++)
                  u.words[l] = this.words[l];
              u.length = s
          }
          if (0 === s)
              ;
          else if (this.length > s)
              for (this.length -= s,
              l = 0; l < this.length; l++)
                  this.words[l] = this.words[l + s];
          else
              this.words[0] = 0,
              this.length = 1;
          var c = 0;
          for (l = this.length - 1; l >= 0 && (0 !== c || l >= n); l--) {
              var h = 0 | this.words[l];
              this.words[l] = c << 26 - o | h >>> o,
              c = h & a
          }
          return u && 0 !== c && (u.words[u.length++] = c),
          0 === this.length && (this.words[0] = 0,
          this.length = 1),
          this.strip()
      }
      ,
      n.prototype.ishrn = function(t, e, i) {
          return r(0 === this.negative),
          this.iushrn(t, e, i)
      }
      ,
      n.prototype.shln = function(t) {
          return this.clone().ishln(t)
      }
      ,
      n.prototype.ushln = function(t) {
          return this.clone().iushln(t)
      }
      ,
      n.prototype.shrn = function(t) {
          return this.clone().ishrn(t)
      }
      ,
      n.prototype.ushrn = function(t) {
          return this.clone().iushrn(t)
      }
      ,
      n.prototype.testn = function(t) {
          r("number" == typeof t && t >= 0);
          var e = t % 26
            , i = (t - e) / 26
            , n = 1 << e;
          return !(this.length <= i) && !!(this.words[i] & n)
      }
      ,
      n.prototype.imaskn = function(t) {
          r("number" == typeof t && t >= 0);
          var e = t % 26
            , i = (t - e) / 26;
          if (r(0 === this.negative, "imaskn works only with positive numbers"),
          this.length <= i)
              return this;
          if (0 !== e && i++,
          this.length = Math.min(i, this.length),
          0 !== e) {
              var n = 67108863 ^ 67108863 >>> e << e;
              this.words[this.length - 1] &= n
          }
          return this.strip()
      }
      ,
      n.prototype.maskn = function(t) {
          return this.clone().imaskn(t)
      }
      ,
      n.prototype.iaddn = function(t) {
          return r("number" == typeof t),
          r(t < 67108864),
          t < 0 ? this.isubn(-t) : 0 !== this.negative ? 1 === this.length && (0 | this.words[0]) < t ? (this.words[0] = t - (0 | this.words[0]),
          this.negative = 0,
          this) : (this.negative = 0,
          this.isubn(t),
          this.negative = 1,
          this) : this._iaddn(t)
      }
      ,
      n.prototype._iaddn = function(t) {
          this.words[0] += t;
          for (var e = 0; e < this.length && this.words[e] >= 67108864; e++)
              this.words[e] -= 67108864,
              e === this.length - 1 ? this.words[e + 1] = 1 : this.words[e + 1]++;
          return this.length = Math.max(this.length, e + 1),
          this
      }
      ,
      n.prototype.isubn = function(t) {
          if (r("number" == typeof t),
          r(t < 67108864),
          t < 0)
              return this.iaddn(-t);
          if (0 !== this.negative)
              return this.negative = 0,
              this.iaddn(t),
              this.negative = 1,
              this;
          if (this.words[0] -= t,
          1 === this.length && this.words[0] < 0)
              this.words[0] = -this.words[0],
              this.negative = 1;
          else
              for (var e = 0; e < this.length && this.words[e] < 0; e++)
                  this.words[e] += 67108864,
                  this.words[e + 1] -= 1;
          return this.strip()
      }
      ,
      n.prototype.addn = function(t) {
          return this.clone().iaddn(t)
      }
      ,
      n.prototype.subn = function(t) {
          return this.clone().isubn(t)
      }
      ,
      n.prototype.iabs = function() {
          return this.negative = 0,
          this
      }
      ,
      n.prototype.abs = function() {
          return this.clone().iabs()
      }
      ,
      n.prototype._ishlnsubmul = function(t, e, i) {
          var n, o, s = t.length + i;
          this._expand(s);
          var a = 0;
          for (n = 0; n < t.length; n++) {
              o = (0 | this.words[n + i]) + a;
              var u = (0 | t.words[n]) * e;
              a = ((o -= 67108863 & u) >> 26) - (u / 67108864 | 0),
              this.words[n + i] = 67108863 & o
          }
          for (; n < this.length - i; n++)
              a = (o = (0 | this.words[n + i]) + a) >> 26,
              this.words[n + i] = 67108863 & o;
          if (0 === a)
              return this.strip();
          for (r(-1 === a),
          a = 0,
          n = 0; n < this.length; n++)
              a = (o = -(0 | this.words[n]) + a) >> 26,
              this.words[n] = 67108863 & o;
          return this.negative = 1,
          this.strip()
      }
      ,
      n.prototype._wordDiv = function(t, e) {
          var r = (this.length,
          t.length)
            , i = this.clone()
            , o = t
            , s = 0 | o.words[o.length - 1];
          0 !== (r = 26 - this._countBits(s)) && (o = o.ushln(r),
          i.iushln(r),
          s = 0 | o.words[o.length - 1]);
          var a, u = i.length - o.length;
          if ("mod" !== e) {
              (a = new n(null)).length = u + 1,
              a.words = new Array(a.length);
              for (var l = 0; l < a.length; l++)
                  a.words[l] = 0
          }
          var c = i.clone()._ishlnsubmul(o, 1, u);
          0 === c.negative && (i = c,
          a && (a.words[u] = 1));
          for (var h = u - 1; h >= 0; h--) {
              var A = 67108864 * (0 | i.words[o.length + h]) + (0 | i.words[o.length + h - 1]);
              for (A = Math.min(A / s | 0, 67108863),
              i._ishlnsubmul(o, A, h); 0 !== i.negative; )
                  A--,
                  i.negative = 0,
                  i._ishlnsubmul(o, 1, h),
                  i.isZero() || (i.negative ^= 1);
              a && (a.words[h] = A)
          }
          return a && a.strip(),
          i.strip(),
          "div" !== e && 0 !== r && i.iushrn(r),
          {
              div: a || null,
              mod: i
          }
      }
      ,
      n.prototype.divmod = function(t, e, i) {
          return r(!t.isZero()),
          this.isZero() ? {
              div: new n(0),
              mod: new n(0)
          } : 0 !== this.negative && 0 === t.negative ? (a = this.neg().divmod(t, e),
          "mod" !== e && (o = a.div.neg()),
          "div" !== e && (s = a.mod.neg(),
          i && 0 !== s.negative && s.iadd(t)),
          {
              div: o,
              mod: s
          }) : 0 === this.negative && 0 !== t.negative ? (a = this.divmod(t.neg(), e),
          "mod" !== e && (o = a.div.neg()),
          {
              div: o,
              mod: a.mod
          }) : 0 != (this.negative & t.negative) ? (a = this.neg().divmod(t.neg(), e),
          "div" !== e && (s = a.mod.neg(),
          i && 0 !== s.negative && s.isub(t)),
          {
              div: a.div,
              mod: s
          }) : t.length > this.length || this.cmp(t) < 0 ? {
              div: new n(0),
              mod: this
          } : 1 === t.length ? "div" === e ? {
              div: this.divn(t.words[0]),
              mod: null
          } : "mod" === e ? {
              div: null,
              mod: new n(this.modn(t.words[0]))
          } : {
              div: this.divn(t.words[0]),
              mod: new n(this.modn(t.words[0]))
          } : this._wordDiv(t, e);
          var o, s, a
      }
      ,
      n.prototype.div = function(t) {
          return this.divmod(t, "div", !1).div
      }
      ,
      n.prototype.mod = function(t) {
          return this.divmod(t, "mod", !1).mod
      }
      ,
      n.prototype.umod = function(t) {
          return this.divmod(t, "mod", !0).mod
      }
      ,
      n.prototype.divRound = function(t) {
          var e = this.divmod(t);
          if (e.mod.isZero())
              return e.div;
          var r = 0 !== e.div.negative ? e.mod.isub(t) : e.mod
            , i = t.ushrn(1)
            , n = t.andln(1)
            , o = r.cmp(i);
          return o < 0 || 1 === n && 0 === o ? e.div : 0 !== e.div.negative ? e.div.isubn(1) : e.div.iaddn(1)
      }
      ,
      n.prototype.modn = function(t) {
          r(t <= 67108863);
          for (var e = 67108864 % t, i = 0, n = this.length - 1; n >= 0; n--)
              i = (e * i + (0 | this.words[n])) % t;
          return i
      }
      ,
      n.prototype.idivn = function(t) {
          r(t <= 67108863);
          for (var e = 0, i = this.length - 1; i >= 0; i--) {
              var n = (0 | this.words[i]) + 67108864 * e;
              this.words[i] = n / t | 0,
              e = n % t
          }
          return this.strip()
      }
      ,
      n.prototype.divn = function(t) {
          return this.clone().idivn(t)
      }
      ,
      n.prototype.egcd = function(t) {
          r(0 === t.negative),
          r(!t.isZero());
          var e = this
            , i = t.clone();
          e = 0 !== e.negative ? e.umod(t) : e.clone();
          for (var o = new n(1), s = new n(0), a = new n(0), u = new n(1), l = 0; e.isEven() && i.isEven(); )
              e.iushrn(1),
              i.iushrn(1),
              ++l;
          for (var c = i.clone(), h = e.clone(); !e.isZero(); ) {
              for (var A = 0, f = 1; 0 == (e.words[0] & f) && A < 26; ++A,
              f <<= 1)
                  ;
              if (A > 0)
                  for (e.iushrn(A); A-- > 0; )
                      (o.isOdd() || s.isOdd()) && (o.iadd(c),
                      s.isub(h)),
                      o.iushrn(1),
                      s.iushrn(1);
              for (var p = 0, g = 1; 0 == (i.words[0] & g) && p < 26; ++p,
              g <<= 1)
                  ;
              if (p > 0)
                  for (i.iushrn(p); p-- > 0; )
                      (a.isOdd() || u.isOdd()) && (a.iadd(c),
                      u.isub(h)),
                      a.iushrn(1),
                      u.iushrn(1);
              e.cmp(i) >= 0 ? (e.isub(i),
              o.isub(a),
              s.isub(u)) : (i.isub(e),
              a.isub(o),
              u.isub(s))
          }
          return {
              a: a,
              b: u,
              gcd: i.iushln(l)
          }
      }
      ,
      n.prototype._invmp = function(t) {
          r(0 === t.negative),
          r(!t.isZero());
          var e = this
            , i = t.clone();
          e = 0 !== e.negative ? e.umod(t) : e.clone();
          for (var o, s = new n(1), a = new n(0), u = i.clone(); e.cmpn(1) > 0 && i.cmpn(1) > 0; ) {
              for (var l = 0, c = 1; 0 == (e.words[0] & c) && l < 26; ++l,
              c <<= 1)
                  ;
              if (l > 0)
                  for (e.iushrn(l); l-- > 0; )
                      s.isOdd() && s.iadd(u),
                      s.iushrn(1);
              for (var h = 0, A = 1; 0 == (i.words[0] & A) && h < 26; ++h,
              A <<= 1)
                  ;
              if (h > 0)
                  for (i.iushrn(h); h-- > 0; )
                      a.isOdd() && a.iadd(u),
                      a.iushrn(1);
              e.cmp(i) >= 0 ? (e.isub(i),
              s.isub(a)) : (i.isub(e),
              a.isub(s))
          }
          return (o = 0 === e.cmpn(1) ? s : a).cmpn(0) < 0 && o.iadd(t),
          o
      }
      ,
      n.prototype.gcd = function(t) {
          if (this.isZero())
              return t.abs();
          if (t.isZero())
              return this.abs();
          var e = this.clone()
            , r = t.clone();
          e.negative = 0,
          r.negative = 0;
          for (var i = 0; e.isEven() && r.isEven(); i++)
              e.iushrn(1),
              r.iushrn(1);
          for (; ; ) {
              for (; e.isEven(); )
                  e.iushrn(1);
              for (; r.isEven(); )
                  r.iushrn(1);
              var n = e.cmp(r);
              if (n < 0) {
                  var o = e;
                  e = r,
                  r = o
              } else if (0 === n || 0 === r.cmpn(1))
                  break;
              e.isub(r)
          }
          return r.iushln(i)
      }
      ,
      n.prototype.invm = function(t) {
          return this.egcd(t).a.umod(t)
      }
      ,
      n.prototype.isEven = function() {
          return 0 == (1 & this.words[0])
      }
      ,
      n.prototype.isOdd = function() {
          return 1 == (1 & this.words[0])
      }
      ,
      n.prototype.andln = function(t) {
          return this.words[0] & t
      }
      ,
      n.prototype.bincn = function(t) {
          r("number" == typeof t);
          var e = t % 26
            , i = (t - e) / 26
            , n = 1 << e;
          if (this.length <= i)
              return this._expand(i + 1),
              this.words[i] |= n,
              this;
          for (var o = n, s = i; 0 !== o && s < this.length; s++) {
              var a = 0 | this.words[s];
              o = (a += o) >>> 26,
              a &= 67108863,
              this.words[s] = a
          }
          return 0 !== o && (this.words[s] = o,
          this.length++),
          this
      }
      ,
      n.prototype.isZero = function() {
          return 1 === this.length && 0 === this.words[0]
      }
      ,
      n.prototype.cmpn = function(t) {
          var e, i = t < 0;
          if (0 !== this.negative && !i)
              return -1;
          if (0 === this.negative && i)
              return 1;
          if (this.strip(),
          this.length > 1)
              e = 1;
          else {
              i && (t = -t),
              r(t <= 67108863, "Number is too big");
              var n = 0 | this.words[0];
              e = n === t ? 0 : n < t ? -1 : 1
          }
          return 0 !== this.negative ? 0 | -e : e
      }
      ,
      n.prototype.cmp = function(t) {
          if (0 !== this.negative && 0 === t.negative)
              return -1;
          if (0 === this.negative && 0 !== t.negative)
              return 1;
          var e = this.ucmp(t);
          return 0 !== this.negative ? 0 | -e : e
      }
      ,
      n.prototype.ucmp = function(t) {
          if (this.length > t.length)
              return 1;
          if (this.length < t.length)
              return -1;
          for (var e = 0, r = this.length - 1; r >= 0; r--) {
              var i = 0 | this.words[r]
                , n = 0 | t.words[r];
              if (i !== n) {
                  i < n ? e = -1 : i > n && (e = 1);
                  break
              }
          }
          return e
      }
      ,
      n.prototype.gtn = function(t) {
          return 1 === this.cmpn(t)
      }
      ,
      n.prototype.gt = function(t) {
          return 1 === this.cmp(t)
      }
      ,
      n.prototype.gten = function(t) {
          return this.cmpn(t) >= 0
      }
      ,
      n.prototype.gte = function(t) {
          return this.cmp(t) >= 0
      }
      ,
      n.prototype.ltn = function(t) {
          return -1 === this.cmpn(t)
      }
      ,
      n.prototype.lt = function(t) {
          return -1 === this.cmp(t)
      }
      ,
      n.prototype.lten = function(t) {
          return this.cmpn(t) <= 0
      }
      ,
      n.prototype.lte = function(t) {
          return this.cmp(t) <= 0
      }
      ,
      n.prototype.eqn = function(t) {
          return 0 === this.cmpn(t)
      }
      ,
      n.prototype.eq = function(t) {
          return 0 === this.cmp(t)
      }
      ,
      n.red = function(t) {
          return new C(t)
      }
      ,
      n.prototype.toRed = function(t) {
          return r(!this.red, "Already a number in reduction context"),
          r(0 === this.negative, "red works only with positives"),
          t.convertTo(this)._forceRed(t)
      }
      ,
      n.prototype.fromRed = function() {
          return r(this.red, "fromRed works only with numbers in reduction context"),
          this.red.convertFrom(this)
      }
      ,
      n.prototype._forceRed = function(t) {
          return this.red = t,
          this
      }
      ,
      n.prototype.forceRed = function(t) {
          return r(!this.red, "Already a number in reduction context"),
          this._forceRed(t)
      }
      ,
      n.prototype.redAdd = function(t) {
          return r(this.red, "redAdd works only with red numbers"),
          this.red.add(this, t)
      }
      ,
      n.prototype.redIAdd = function(t) {
          return r(this.red, "redIAdd works only with red numbers"),
          this.red.iadd(this, t)
      }
      ,
      n.prototype.redSub = function(t) {
          return r(this.red, "redSub works only with red numbers"),
          this.red.sub(this, t)
      }
      ,
      n.prototype.redISub = function(t) {
          return r(this.red, "redISub works only with red numbers"),
          this.red.isub(this, t)
      }
      ,
      n.prototype.redShl = function(t) {
          return r(this.red, "redShl works only with red numbers"),
          this.red.shl(this, t)
      }
      ,
      n.prototype.redMul = function(t) {
          return r(this.red, "redMul works only with red numbers"),
          this.red._verify2(this, t),
          this.red.mul(this, t)
      }
      ,
      n.prototype.redIMul = function(t) {
          return r(this.red, "redMul works only with red numbers"),
          this.red._verify2(this, t),
          this.red.imul(this, t)
      }
      ,
      n.prototype.redSqr = function() {
          return r(this.red, "redSqr works only with red numbers"),
          this.red._verify1(this),
          this.red.sqr(this)
      }
      ,
      n.prototype.redISqr = function() {
          return r(this.red, "redISqr works only with red numbers"),
          this.red._verify1(this),
          this.red.isqr(this)
      }
      ,
      n.prototype.redSqrt = function() {
          return r(this.red, "redSqrt works only with red numbers"),
          this.red._verify1(this),
          this.red.sqrt(this)
      }
      ,
      n.prototype.redInvm = function() {
          return r(this.red, "redInvm works only with red numbers"),
          this.red._verify1(this),
          this.red.invm(this)
      }
      ,
      n.prototype.redNeg = function() {
          return r(this.red, "redNeg works only with red numbers"),
          this.red._verify1(this),
          this.red.neg(this)
      }
      ,
      n.prototype.redPow = function(t) {
          return r(this.red && !t.red, "redPow(normalNum)"),
          this.red._verify1(this),
          this.red.pow(this, t)
      }
      ;
      var g = {
          k256: null,
          p224: null,
          p192: null,
          p25519: null
      };
      function d(t, e) {
          this.name = t,
          this.p = new n(e,16),
          this.n = this.p.bitLength(),
          this.k = new n(1).iushln(this.n).isub(this.p),
          this.tmp = this._tmp()
      }
      function I() {
          d.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")
      }
      function m() {
          d.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")
      }
      function y() {
          d.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")
      }
      function w() {
          d.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")
      }
      function C(t) {
          if ("string" == typeof t) {
              var e = n._prime(t);
              this.m = e.p,
              this.prime = e
          } else
              r(t.gtn(1), "modulus must be greater than 1"),
              this.m = t,
              this.prime = null
      }
      function E(t) {
          C.call(this, t),
          this.shift = this.m.bitLength(),
          this.shift % 26 != 0 && (this.shift += 26 - this.shift % 26),
          this.r = new n(1).iushln(this.shift),
          this.r2 = this.imod(this.r.sqr()),
          this.rinv = this.r._invmp(this.m),
          this.minv = this.rinv.mul(this.r).isubn(1).div(this.m),
          this.minv = this.minv.umod(this.r),
          this.minv = this.r.sub(this.minv)
      }
      d.prototype._tmp = function() {
          var t = new n(null);
          return t.words = new Array(Math.ceil(this.n / 13)),
          t
      }
      ,
      d.prototype.ireduce = function(t) {
          var e, r = t;
          do {
              this.split(r, this.tmp),
              e = (r = (r = this.imulK(r)).iadd(this.tmp)).bitLength()
          } while (e > this.n);
          var i = e < this.n ? -1 : r.ucmp(this.p);
          return 0 === i ? (r.words[0] = 0,
          r.length = 1) : i > 0 ? r.isub(this.p) : r.strip(),
          r
      }
      ,
      d.prototype.split = function(t, e) {
          t.iushrn(this.n, 0, e)
      }
      ,
      d.prototype.imulK = function(t) {
          return t.imul(this.k)
      }
      ,
      i(I, d),
      I.prototype.split = function(t, e) {
          for (var r = 4194303, i = Math.min(t.length, 9), n = 0; n < i; n++)
              e.words[n] = t.words[n];
          if (e.length = i,
          t.length <= 9)
              return t.words[0] = 0,
              void (t.length = 1);
          var o = t.words[9];
          for (e.words[e.length++] = o & r,
          n = 10; n < t.length; n++) {
              var s = 0 | t.words[n];
              t.words[n - 10] = (s & r) << 4 | o >>> 22,
              o = s
          }
          o >>>= 22,
          t.words[n - 10] = o,
          0 === o && t.length > 10 ? t.length -= 10 : t.length -= 9
      }
      ,
      I.prototype.imulK = function(t) {
          t.words[t.length] = 0,
          t.words[t.length + 1] = 0,
          t.length += 2;
          for (var e = 0, r = 0; r < t.length; r++) {
              var i = 0 | t.words[r];
              e += 977 * i,
              t.words[r] = 67108863 & e,
              e = 64 * i + (e / 67108864 | 0)
          }
          return 0 === t.words[t.length - 1] && (t.length--,
          0 === t.words[t.length - 1] && t.length--),
          t
      }
      ,
      i(m, d),
      i(y, d),
      i(w, d),
      w.prototype.imulK = function(t) {
          for (var e = 0, r = 0; r < t.length; r++) {
              var i = 19 * (0 | t.words[r]) + e
                , n = 67108863 & i;
              i >>>= 26,
              t.words[r] = n,
              e = i
          }
          return 0 !== e && (t.words[t.length++] = e),
          t
      }
      ,
      n._prime = function(t) {
          if (g[t])
              return g[t];
          var e;
          if ("k256" === t)
              e = new I;
          else if ("p224" === t)
              e = new m;
          else if ("p192" === t)
              e = new y;
          else {
              if ("p25519" !== t)
                  throw new Error("Unknown prime " + t);
              e = new w
          }
          return g[t] = e,
          e
      }
      ,
      C.prototype._verify1 = function(t) {
          r(0 === t.negative, "red works only with positives"),
          r(t.red, "red works only with red numbers")
      }
      ,
      C.prototype._verify2 = function(t, e) {
          r(0 == (t.negative | e.negative), "red works only with positives"),
          r(t.red && t.red === e.red, "red works only with red numbers")
      }
      ,
      C.prototype.imod = function(t) {
          return this.prime ? this.prime.ireduce(t)._forceRed(this) : t.umod(this.m)._forceRed(this)
      }
      ,
      C.prototype.neg = function(t) {
          return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this)
      }
      ,
      C.prototype.add = function(t, e) {
          this._verify2(t, e);
          var r = t.add(e);
          return r.cmp(this.m) >= 0 && r.isub(this.m),
          r._forceRed(this)
      }
      ,
      C.prototype.iadd = function(t, e) {
          this._verify2(t, e);
          var r = t.iadd(e);
          return r.cmp(this.m) >= 0 && r.isub(this.m),
          r
      }
      ,
      C.prototype.sub = function(t, e) {
          this._verify2(t, e);
          var r = t.sub(e);
          return r.cmpn(0) < 0 && r.iadd(this.m),
          r._forceRed(this)
      }
      ,
      C.prototype.isub = function(t, e) {
          this._verify2(t, e);
          var r = t.isub(e);
          return r.cmpn(0) < 0 && r.iadd(this.m),
          r
      }
      ,
      C.prototype.shl = function(t, e) {
          return this._verify1(t),
          this.imod(t.ushln(e))
      }
      ,
      C.prototype.imul = function(t, e) {
          return this._verify2(t, e),
          this.imod(t.imul(e))
      }
      ,
      C.prototype.mul = function(t, e) {
          return this._verify2(t, e),
          this.imod(t.mul(e))
      }
      ,
      C.prototype.isqr = function(t) {
          return this.imul(t, t.clone())
      }
      ,
      C.prototype.sqr = function(t) {
          return this.mul(t, t)
      }
      ,
      C.prototype.sqrt = function(t) {
          if (t.isZero())
              return t.clone();
          var e = this.m.andln(3);
          if (r(e % 2 == 1),
          3 === e) {
              var i = this.m.add(new n(1)).iushrn(2);
              return this.pow(t, i)
          }
          for (var o = this.m.subn(1), s = 0; !o.isZero() && 0 === o.andln(1); )
              s++,
              o.iushrn(1);
          r(!o.isZero());
          var a = new n(1).toRed(this)
            , u = a.redNeg()
            , l = this.m.subn(1).iushrn(1)
            , c = this.m.bitLength();
          for (c = new n(2 * c * c).toRed(this); 0 !== this.pow(c, l).cmp(u); )
              c.redIAdd(u);
          for (var h = this.pow(c, o), A = this.pow(t, o.addn(1).iushrn(1)), f = this.pow(t, o), p = s; 0 !== f.cmp(a); ) {
              for (var g = f, d = 0; 0 !== g.cmp(a); d++)
                  g = g.redSqr();
              r(d < p);
              var I = this.pow(h, new n(1).iushln(p - d - 1));
              A = A.redMul(I),
              h = I.redSqr(),
              f = f.redMul(h),
              p = d
          }
          return A
      }
      ,
      C.prototype.invm = function(t) {
          var e = t._invmp(this.m);
          return 0 !== e.negative ? (e.negative = 0,
          this.imod(e).redNeg()) : this.imod(e)
      }
      ,
      C.prototype.pow = function(t, e) {
          if (e.isZero())
              return new n(1);
          if (0 === e.cmpn(1))
              return t.clone();
          var r = new Array(16);
          r[0] = new n(1).toRed(this),
          r[1] = t;
          for (var i = 2; i < r.length; i++)
              r[i] = this.mul(r[i - 1], t);
          var o = r[0]
            , s = 0
            , a = 0
            , u = e.bitLength() % 26;
          for (0 === u && (u = 26),
          i = e.length - 1; i >= 0; i--) {
              for (var l = e.words[i], c = u - 1; c >= 0; c--) {
                  var h = l >> c & 1;
                  o !== r[0] && (o = this.sqr(o)),
                  0 !== h || 0 !== s ? (s <<= 1,
                  s |= h,
                  (4 === ++a || 0 === i && 0 === c) && (o = this.mul(o, r[s]),
                  a = 0,
                  s = 0)) : a = 0
              }
              u = 26
          }
          return o
      }
      ,
      C.prototype.convertTo = function(t) {
          var e = t.umod(this.m);
          return e === t ? e.clone() : e
      }
      ,
      C.prototype.convertFrom = function(t) {
          var e = t.clone();
          return e.red = null,
          e
      }
      ,
      n.mont = function(t) {
          return new E(t)
      }
      ,
      i(E, C),
      E.prototype.convertTo = function(t) {
          return this.imod(t.ushln(this.shift))
      }
      ,
      E.prototype.convertFrom = function(t) {
          var e = this.imod(t.mul(this.rinv));
          return e.red = null,
          e
      }
      ,
      E.prototype.imul = function(t, e) {
          if (t.isZero() || e.isZero())
              return t.words[0] = 0,
              t.length = 1,
              t;
          var r = t.imul(e)
            , i = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m)
            , n = r.isub(i).iushrn(this.shift)
            , o = n;
          return n.cmp(this.m) >= 0 ? o = n.isub(this.m) : n.cmpn(0) < 0 && (o = n.iadd(this.m)),
          o._forceRed(this)
      }
      ,
      E.prototype.mul = function(t, e) {
          if (t.isZero() || e.isZero())
              return new n(0)._forceRed(this);
          var r = t.mul(e)
            , i = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m)
            , o = r.isub(i).iushrn(this.shift)
            , s = o;
          return o.cmp(this.m) >= 0 ? s = o.isub(this.m) : o.cmpn(0) < 0 && (s = o.iadd(this.m)),
          s._forceRed(this)
      }
      ,
      E.prototype.invm = function(t) {
          return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this)
      }
  }(t, this)
}
)),
parcelRequire.register("69LxV", (function(t, e) {
  var r = parcelRequire("8DPQR");
  t.exports = function(t) {
      return "string" != typeof t ? t : r(t) ? t.slice(2) : t
  }
}
)),
parcelRequire.register("8DPQR", (function(t, e) {
  t.exports = function(t) {
      if ("string" != typeof t)
          throw new Error("[is-hex-prefixed] value must be type 'string', is currently type " + typeof t + ", while checking isHexPrefixed.");
      return "0x" === t.slice(0, 2)
  }
}
)),
parcelRequire.register("gdDvH", (function(t, e) {
  var r = parcelRequire("bdjQ6").Buffer
    , i = parcelRequire("aVh2m")
    , n = parcelRequire("kgPQe")
    , o = parcelRequire("jl6wR")
    , s = parcelRequire("dhTR8")
    , a = parcelRequire("3Q0ZQ")
    , u = function(t) {
      return i.isBN(t)
  }
    , l = function(t) {
      return t && t.constructor && "BigNumber" === t.constructor.name
  }
    , c = function(t) {
      try {
          return n.apply(null, arguments)
      } catch (e) {
          throw new Error(e + ' Given value: "' + t + '"')
      }
  }
    , h = function(t) {
      return !!/^(0x)?[0-9a-f]{40}$/i.test(t) && (!(!/^(0x|0X)?[0-9a-f]{40}$/.test(t) && !/^(0x|0X)?[0-9A-F]{40}$/.test(t)) || A(t))
  }
    , A = function(t) {
      t = t.replace(/^0x/i, "");
      for (var e = w(t.toLowerCase()).replace(/^0x/i, ""), r = 0; r < 40; r++)
          if (parseInt(e[r], 16) > 7 && t[r].toUpperCase() !== t[r] || parseInt(e[r], 16) <= 7 && t[r].toLowerCase() !== t[r])
              return !1;
      return !0
  }
    , f = function(t) {
      var e = "";
      t = (t = (t = (t = (t = o.encode(t)).replace(/^(?:\u0000)*/, "")).split("").reverse().join("")).replace(/^(?:\u0000)*/, "")).split("").reverse().join("");
      for (var r = 0; r < t.length; r++) {
          var i = t.charCodeAt(r).toString(16);
          e += i.length < 2 ? "0" + i : i
      }
      return "0x" + e
  }
    , p = function(t) {
      if (!t)
          return t;
      if ("string" == typeof t && !I(t))
          throw new Error('Given value "' + t + '" is not a valid hex string.');
      return c(t).toNumber()
  }
    , g = function(t) {
      if (null == t)
          return t;
      if (!isFinite(t) && !I(t))
          throw new Error('Given input "' + t + '" is not a number.');
      var e = c(t)
        , r = e.toString(16);
      return e.lt(new i(0)) ? "-0x" + r.slice(1) : "0x" + r
  }
    , d = function(t, e) {
      if (h(t))
          return e ? "address" : "0x" + t.toLowerCase().replace(/^0x/i, "");
      if ("boolean" == typeof t)
          return e ? "bool" : t ? "0x01" : "0x00";
      if (r.isBuffer(t))
          return "0x" + t.toString("hex");
      if ("object" == typeof t && t && !l(t) && !u(t))
          return e ? "string" : f(JSON.stringify(t));
      if ("string" == typeof t) {
          if (0 === t.indexOf("-0x") || 0 === t.indexOf("-0X"))
              return e ? "int256" : g(t);
          if (0 === t.indexOf("0x") || 0 === t.indexOf("0X"))
              return e ? "bytes" : t;
          if (!isFinite(t))
              return e ? "string" : f(t)
      }
      return e ? t < 0 ? "int256" : "uint256" : g(t)
  }
    , I = function(t) {
      return ("string" == typeof t || "number" == typeof t) && /^(-)?0x[0-9a-f]*$/i.test(t)
  }
    , m = function(t) {
      return ("string" == typeof t || "number" == typeof t) && /^(-0x|0x)?[0-9a-f]*$/i.test(t)
  }
    , y = "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470"
    , w = function(t) {
      u(t) && (t = t.toString()),
      I(t) && /^0x/i.test(t.toString()) ? t = s.toBuffer(t) : "string" == typeof t && (t = r.from(t, "utf-8"));
      var e = s.bufferToHex(s.keccak256(t));
      return e === y ? null : e
  };
  w._Hash = s.keccak256;
  var C = function(t) {
      if ("string" == typeof t && t.includes("0x")) {
          const [e,r] = t.toLocaleLowerCase().startsWith("-") ? ["-", t.slice(3)] : ["", t.slice(2)];
          return new i(e + r,16)
      }
      return new i(t)
  };
  Object.setPrototypeOf(C, i),
  Object.setPrototypeOf(C.prototype, i.prototype),
  t.exports = {
      BN: C,
      isBN: u,
      isBigNumber: l,
      toBN: c,
      isAddress: h,
      isBloom: function(t) {
          return a.isBloom(t)
      },
      isUserEthereumAddressInBloom: function(t, e) {
          return a.isUserEthereumAddressInBloom(t, e)
      },
      isContractAddressInBloom: function(t, e) {
          return a.isContractAddressInBloom(t, e)
      },
      isTopic: function(t) {
          return a.isTopic(t)
      },
      isTopicInBloom: function(t, e) {
          return a.isTopicInBloom(t, e)
      },
      isInBloom: function(t, e) {
          return a.isInBloom(t, e)
      },
      checkAddressChecksum: A,
      utf8ToHex: f,
      hexToUtf8: function(t) {
          if (!I(t))
              throw new Error('The parameter "' + t + '" must be a valid HEX string.');
          for (var e = "", r = 0, i = (t = (t = (t = (t = (t = t.replace(/^0x/i, "")).replace(/^(?:00)*/, "")).split("").reverse().join("")).replace(/^(?:00)*/, "")).split("").reverse().join("")).length, n = 0; n < i; n += 2)
              r = parseInt(t.slice(n, n + 2), 16),
              e += String.fromCharCode(r);
          return o.decode(e)
      },
      hexToNumber: p,
      hexToNumberString: function(t) {
          if (!t)
              return t;
          if ("string" == typeof t && !I(t))
              throw new Error('Given value "' + t + '" is not a valid hex string.');
          return c(t).toString(10)
      },
      numberToHex: g,
      toHex: d,
      hexToBytes: function(t) {
          if (t = t.toString(16),
          !I(t))
              throw new Error('Given value "' + t + '" is not a valid hex string.');
          t = t.replace(/^0x/i, "");
          for (var e = [], r = 0; r < t.length; r += 2)
              e.push(parseInt(t.slice(r, r + 2), 16));
          return e
      },
      bytesToHex: function(t) {
          for (var e = [], r = 0; r < t.length; r++)
              e.push((t[r] >>> 4).toString(16)),
              e.push((15 & t[r]).toString(16));
          return "0x" + e.join("")
      },
      isHex: m,
      isHexStrict: I,
      stripHexPrefix: function(t) {
          return 0 !== t && m(t) ? t.replace(/^(-)?0x/i, "$1") : t
      },
      leftPad: function(t, e, r) {
          var i = /^0x/i.test(t) || "number" == typeof t
            , n = e - (t = t.toString(16).replace(/^0x/i, "")).length + 1 >= 0 ? e - t.length + 1 : 0;
          return (i ? "0x" : "") + new Array(n).join(r || "0") + t
      },
      rightPad: function(t, e, r) {
          var i = /^0x/i.test(t) || "number" == typeof t
            , n = e - (t = t.toString(16).replace(/^0x/i, "")).length + 1 >= 0 ? e - t.length + 1 : 0;
          return (i ? "0x" : "") + t + new Array(n).join(r || "0")
      },
      toTwosComplement: function(t) {
          return "0x" + c(t).toTwos(256).toString(16, 64)
      },
      sha3: w,
      sha3Raw: function(t) {
          return null === (t = w(t)) ? y : t
      },
      toNumber: function(t) {
          return "number" == typeof t ? t : p(d(t))
      }
  }
}
)),
parcelRequire.register("jl6wR", (function(t, e) {
  !function(t) {
      var e, r, i, n = String.fromCharCode;
      function o(t) {
          for (var e, r, i = [], n = 0, o = t.length; n < o; )
              (e = t.charCodeAt(n++)) >= 55296 && e <= 56319 && n < o ? 56320 == (64512 & (r = t.charCodeAt(n++))) ? i.push(((1023 & e) << 10) + (1023 & r) + 65536) : (i.push(e),
              n--) : i.push(e);
          return i
      }
      function s(t) {
          if (t >= 55296 && t <= 57343)
              throw Error("Lone surrogate U+" + t.toString(16).toUpperCase() + " is not a scalar value")
      }
      function a(t, e) {
          return n(t >> e & 63 | 128)
      }
      function u(t) {
          if (0 == (4294967168 & t))
              return n(t);
          var e = "";
          return 0 == (4294965248 & t) ? e = n(t >> 6 & 31 | 192) : 0 == (4294901760 & t) ? (s(t),
          e = n(t >> 12 & 15 | 224),
          e += a(t, 6)) : 0 == (4292870144 & t) && (e = n(t >> 18 & 7 | 240),
          e += a(t, 12),
          e += a(t, 6)),
          e += n(63 & t | 128)
      }
      function l() {
          if (i >= r)
              throw Error("Invalid byte index");
          var t = 255 & e[i];
          if (i++,
          128 == (192 & t))
              return 63 & t;
          throw Error("Invalid continuation byte")
      }
      function c() {
          var t, n;
          if (i > r)
              throw Error("Invalid byte index");
          if (i == r)
              return !1;
          if (t = 255 & e[i],
          i++,
          0 == (128 & t))
              return t;
          if (192 == (224 & t)) {
              if ((n = (31 & t) << 6 | l()) >= 128)
                  return n;
              throw Error("Invalid continuation byte")
          }
          if (224 == (240 & t)) {
              if ((n = (15 & t) << 12 | l() << 6 | l()) >= 2048)
                  return s(n),
                  n;
              throw Error("Invalid continuation byte")
          }
          if (240 == (248 & t) && (n = (7 & t) << 18 | l() << 12 | l() << 6 | l()) >= 65536 && n <= 1114111)
              return n;
          throw Error("Invalid UTF-8 detected")
      }
      t.version = "3.0.0",
      t.encode = function(t) {
          for (var e = o(t), r = e.length, i = -1, n = ""; ++i < r; )
              n += u(e[i]);
          return n
      }
      ,
      t.decode = function(t) {
          e = o(t),
          r = e.length,
          i = 0;
          for (var s, a = []; !1 !== (s = c()); )
              a.push(s);
          return function(t) {
              for (var e, r = t.length, i = -1, o = ""; ++i < r; )
                  (e = t[i]) > 65535 && (o += n((e -= 65536) >>> 10 & 1023 | 55296),
                  e = 56320 | 1023 & e),
                  o += n(e);
              return o
          }(a)
      }
  }(t.exports)
}
)),
parcelRequire.register("3Q0ZQ", (function(t, e) {
  Object.defineProperty(t.exports, "__esModule", {
      value: !0
  });
  var r = parcelRequire("4x5CJ");
  function i(t) {
      return "string" == typeof t && (!!/^(0x)?[0-9a-f]{512}$/i.test(t) && !(!/^(0x)?[0-9a-f]{512}$/.test(t) && !/^(0x)?[0-9A-F]{512}$/.test(t)))
  }
  function n(t, e) {
      "object" == typeof e && e.constructor === Uint8Array && (e = r.bytesToHex(e));
      const i = r.keccak256(e).replace("0x", "");
      for (let e = 0; e < 12; e += 4) {
          const r = (parseInt(i.substr(e, 2), 16) << 8) + parseInt(i.substr(e + 2, 2), 16) & 2047
            , n = 1 << r % 4;
          if ((o(t.charCodeAt(t.length - 1 - Math.floor(r / 4))) & n) !== n)
              return !1
      }
      return !0
  }
  function o(t) {
      if (t >= 48 && t <= 57)
          return t - 48;
      if (t >= 65 && t <= 70)
          return t - 55;
      if (t >= 97 && t <= 102)
          return t - 87;
      throw new Error("invalid bloom")
  }
  function s(t) {
      return "string" == typeof t && (!!/^(0x)?[0-9a-f]{64}$/i.test(t) && !(!/^(0x)?[0-9a-f]{64}$/.test(t) && !/^(0x)?[0-9A-F]{64}$/.test(t)))
  }
  function a(t) {
      return "string" == typeof t && (!!t.match(/^(0x)?[0-9a-fA-F]{40}$/) || !!t.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/))
  }
  t.exports.isBloom = i,
  t.exports.isInBloom = n,
  t.exports.isUserEthereumAddressInBloom = function(t, e) {
      if (!i(t))
          throw new Error("Invalid bloom given");
      if (!a(e))
          throw new Error(`Invalid ethereum address given: "${e}"`);
      return n(t, r.padLeft(e, 64))
  }
  ,
  t.exports.isContractAddressInBloom = function(t, e) {
      if (!i(t))
          throw new Error("Invalid bloom given");
      if (!a(e))
          throw new Error(`Invalid contract address given: "${e}"`);
      return n(t, e)
  }
  ,
  t.exports.isTopicInBloom = function(t, e) {
      if (!i(t))
          throw new Error("Invalid bloom given");
      if (!s(e))
          throw new Error("Invalid topic");
      return n(t, e)
  }
  ,
  t.exports.isTopic = s,
  t.exports.isAddress = a
}
)),
parcelRequire.register("4x5CJ", (function(t, e) {
  Object.defineProperty(t.exports, "__esModule", {
      value: !0
  });
  var r = parcelRequire("3gx4l");
  function i(t) {
      if (null == t)
          throw new Error("cannot convert null value to array");
      if ("string" == typeof t) {
          const e = t.match(/^(0x)?[0-9a-fA-F]*$/);
          if (!e)
              throw new Error("invalid hexidecimal string");
          if ("0x" !== e[1])
              throw new Error("hex string must have 0x prefix");
          (t = t.substring(2)).length % 2 && (t = "0" + t);
          const r = [];
          for (let e = 0; e < t.length; e += 2)
              r.push(parseInt(t.substr(e, 2), 16));
          return n(new Uint8Array(r))
      }
      if (function(t) {
          if (!t || parseInt(String(t.length)) != t.length || "string" == typeof t)
              return !1;
          for (let e = 0; e < t.length; e++) {
              const r = t[e];
              if (r < 0 || r >= 256 || parseInt(String(r)) != r)
                  return !1
          }
          return !0
      }(t))
          return n(new Uint8Array(t));
      throw new Error("invalid arrayify value")
  }
  function n(t) {
      return void 0 !== t.slice || (t.slice = ()=>{
          const e = Array.prototype.slice.call(arguments);
          return n(new Uint8Array(Array.prototype.slice.apply(t, e)))
      }
      ),
      t
  }
  t.exports.keccak256 = function(t) {
      return "0x" + r.keccak_256(i(t))
  }
  ,
  t.exports.padLeft = (t,e)=>{
      const r = /^0x/i.test(t) || "number" == typeof t
        , i = e - (t = t.toString().replace(/^0x/i, "")).length + 1 >= 0 ? e - t.length + 1 : 0;
      return (r ? "0x" : "") + new Array(i).join("0") + t
  }
  ,
  t.exports.bytesToHex = function(t) {
      const e = [];
      for (let r = 0; r < t.length; r++)
          e.push((t[r] >>> 4).toString(16)),
          e.push((15 & t[r]).toString(16));
      return `0x${e.join("").replace(/^0+/, "")}`
  }
  ,
  t.exports.toByteArray = i
}
)),
parcelRequire.register("3gx4l", (function(t, e) {
  var r = parcelRequire("4ZL0H");
  /**
* [js-sha3]{@link https://github.com/emn178/js-sha3}
*
* @version 0.8.0
* @author Chen, Yi-Cyuan [emn178@gmail.com]
* @copyright Chen, Yi-Cyuan 2015-2018
* @license MIT
*/
  !function() {
      var e = "input is invalid type"
        , i = "object" == typeof window
        , n = i ? window : {};
      n.JS_SHA3_NO_WINDOW && (i = !1);
      var o = !i && "object" == typeof self;
      !n.JS_SHA3_NO_NODE_JS && "object" == typeof r && r.versions && r.versions.node ? n = $parcel$global : o && (n = self);
      var s = !n.JS_SHA3_NO_COMMON_JS && t.exports
        , a = "function" == typeof define && define.amd
        , u = !n.JS_SHA3_NO_ARRAY_BUFFER && "undefined" != typeof ArrayBuffer
        , l = "0123456789abcdef".split("")
        , c = [4, 1024, 262144, 67108864]
        , h = [0, 8, 16, 24]
        , A = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648, 2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648]
        , f = [224, 256, 384, 512]
        , p = [128, 256]
        , g = ["hex", "buffer", "arrayBuffer", "array", "digest"]
        , d = {
          128: 168,
          256: 136
      };
      !n.JS_SHA3_NO_NODE_JS && Array.isArray || (Array.isArray = function(t) {
          return "[object Array]" === Object.prototype.toString.call(t)
      }
      ),
      !u || !n.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW && ArrayBuffer.isView || (ArrayBuffer.isView = function(t) {
          return "object" == typeof t && t.buffer && t.buffer.constructor === ArrayBuffer
      }
      );
      for (var I = function(t, e, r) {
          return function(i) {
              return new S(t,e,t).update(i)[r]()
          }
      }, m = function(t, e, r) {
          return function(i, n) {
              return new S(t,e,n).update(i)[r]()
          }
      }, y = function(t, e, r) {
          return function(e, i, n, o) {
              return B["cshake" + t].update(e, i, n, o)[r]()
          }
      }, w = function(t, e, r) {
          return function(e, i, n, o) {
              return B["kmac" + t].update(e, i, n, o)[r]()
          }
      }, C = function(t, e, r, i) {
          for (var n = 0; n < g.length; ++n) {
              var o = g[n];
              t[o] = e(r, i, o)
          }
          return t
      }, E = function(t, e) {
          var r = I(t, e, "hex");
          return r.create = function() {
              return new S(t,e,t)
          }
          ,
          r.update = function(t) {
              return r.create().update(t)
          }
          ,
          C(r, I, t, e)
      }, v = [{
          name: "keccak",
          padding: [1, 256, 65536, 16777216],
          bits: f,
          createMethod: E
      }, {
          name: "sha3",
          padding: [6, 1536, 393216, 100663296],
          bits: f,
          createMethod: E
      }, {
          name: "shake",
          padding: [31, 7936, 2031616, 520093696],
          bits: p,
          createMethod: function(t, e) {
              var r = m(t, e, "hex");
              return r.create = function(r) {
                  return new S(t,e,r)
              }
              ,
              r.update = function(t, e) {
                  return r.create(e).update(t)
              }
              ,
              C(r, m, t, e)
          }
      }, {
          name: "cshake",
          padding: c,
          bits: p,
          createMethod: function(t, e) {
              var r = d[t]
                , i = y(t, 0, "hex");
              return i.create = function(i, n, o) {
                  return n || o ? new S(t,e,i).bytepad([n, o], r) : B["shake" + t].create(i)
              }
              ,
              i.update = function(t, e, r, n) {
                  return i.create(e, r, n).update(t)
              }
              ,
              C(i, y, t, e)
          }
      }, {
          name: "kmac",
          padding: c,
          bits: p,
          createMethod: function(t, e) {
              var r = d[t]
                , i = w(t, 0, "hex");
              return i.create = function(i, n, o) {
                  return new k(t,e,n).bytepad(["KMAC", o], r).bytepad([i], r)
              }
              ,
              i.update = function(t, e, r, n) {
                  return i.create(t, r, n).update(e)
              }
              ,
              C(i, w, t, e)
          }
      }], B = {}, b = [], Q = 0; Q < v.length; ++Q)
          for (var R = v[Q], M = R.bits, _ = 0; _ < M.length; ++_) {
              var x = R.name + "_" + M[_];
              if (b.push(x),
              B[x] = R.createMethod(M[_], R.padding),
              "sha3" !== R.name) {
                  var D = R.name + M[_];
                  b.push(D),
                  B[D] = B[x]
              }
          }
      function S(t, e, r) {
          this.blocks = [],
          this.s = [],
          this.padding = e,
          this.outputBits = r,
          this.reset = !0,
          this.finalized = !1,
          this.block = 0,
          this.start = 0,
          this.blockCount = 1600 - (t << 1) >> 5,
          this.byteCount = this.blockCount << 2,
          this.outputBlocks = r >> 5,
          this.extraBytes = (31 & r) >> 3;
          for (var i = 0; i < 50; ++i)
              this.s[i] = 0
      }
      function k(t, e, r) {
          S.call(this, t, e, r)
      }
      S.prototype.update = function(t) {
          if (this.finalized)
              throw new Error("finalize already called");
          var r, i = typeof t;
          if ("string" !== i) {
              if ("object" !== i)
                  throw new Error(e);
              if (null === t)
                  throw new Error(e);
              if (u && t.constructor === ArrayBuffer)
                  t = new Uint8Array(t);
              else if (!(Array.isArray(t) || u && ArrayBuffer.isView(t)))
                  throw new Error(e);
              r = !0
          }
          for (var n, o, s = this.blocks, a = this.byteCount, l = t.length, c = this.blockCount, A = 0, f = this.s; A < l; ) {
              if (this.reset)
                  for (this.reset = !1,
                  s[0] = this.block,
                  n = 1; n < c + 1; ++n)
                      s[n] = 0;
              if (r)
                  for (n = this.start; A < l && n < a; ++A)
                      s[n >> 2] |= t[A] << h[3 & n++];
              else
                  for (n = this.start; A < l && n < a; ++A)
                      (o = t.charCodeAt(A)) < 128 ? s[n >> 2] |= o << h[3 & n++] : o < 2048 ? (s[n >> 2] |= (192 | o >> 6) << h[3 & n++],
                      s[n >> 2] |= (128 | 63 & o) << h[3 & n++]) : o < 55296 || o >= 57344 ? (s[n >> 2] |= (224 | o >> 12) << h[3 & n++],
                      s[n >> 2] |= (128 | o >> 6 & 63) << h[3 & n++],
                      s[n >> 2] |= (128 | 63 & o) << h[3 & n++]) : (o = 65536 + ((1023 & o) << 10 | 1023 & t.charCodeAt(++A)),
                      s[n >> 2] |= (240 | o >> 18) << h[3 & n++],
                      s[n >> 2] |= (128 | o >> 12 & 63) << h[3 & n++],
                      s[n >> 2] |= (128 | o >> 6 & 63) << h[3 & n++],
                      s[n >> 2] |= (128 | 63 & o) << h[3 & n++]);
              if (this.lastByteIndex = n,
              n >= a) {
                  for (this.start = n - a,
                  this.block = s[c],
                  n = 0; n < c; ++n)
                      f[n] ^= s[n];
                  F(f),
                  this.reset = !0
              } else
                  this.start = n
          }
          return this
      }
      ,
      S.prototype.encode = function(t, e) {
          var r = 255 & t
            , i = 1
            , n = [r];
          for (r = 255 & (t >>= 8); r > 0; )
              n.unshift(r),
              r = 255 & (t >>= 8),
              ++i;
          return e ? n.push(i) : n.unshift(i),
          this.update(n),
          n.length
      }
      ,
      S.prototype.encodeString = function(t) {
          var r, i = typeof t;
          if ("string" !== i) {
              if ("object" !== i)
                  throw new Error(e);
              if (null === t)
                  throw new Error(e);
              if (u && t.constructor === ArrayBuffer)
                  t = new Uint8Array(t);
              else if (!(Array.isArray(t) || u && ArrayBuffer.isView(t)))
                  throw new Error(e);
              r = !0
          }
          var n = 0
            , o = t.length;
          if (r)
              n = o;
          else
              for (var s = 0; s < t.length; ++s) {
                  var a = t.charCodeAt(s);
                  a < 128 ? n += 1 : a < 2048 ? n += 2 : a < 55296 || a >= 57344 ? n += 3 : (a = 65536 + ((1023 & a) << 10 | 1023 & t.charCodeAt(++s)),
                  n += 4)
              }
          return n += this.encode(8 * n),
          this.update(t),
          n
      }
      ,
      S.prototype.bytepad = function(t, e) {
          for (var r = this.encode(e), i = 0; i < t.length; ++i)
              r += this.encodeString(t[i]);
          var n = e - r % e
            , o = [];
          return o.length = n,
          this.update(o),
          this
      }
      ,
      S.prototype.finalize = function() {
          if (!this.finalized) {
              this.finalized = !0;
              var t = this.blocks
                , e = this.lastByteIndex
                , r = this.blockCount
                , i = this.s;
              if (t[e >> 2] |= this.padding[3 & e],
              this.lastByteIndex === this.byteCount)
                  for (t[0] = t[r],
                  e = 1; e < r + 1; ++e)
                      t[e] = 0;
              for (t[r - 1] |= 2147483648,
              e = 0; e < r; ++e)
                  i[e] ^= t[e];
              F(i)
          }
      }
      ,
      S.prototype.toString = S.prototype.hex = function() {
          this.finalize();
          for (var t, e = this.blockCount, r = this.s, i = this.outputBlocks, n = this.extraBytes, o = 0, s = 0, a = ""; s < i; ) {
              for (o = 0; o < e && s < i; ++o,
              ++s)
                  t = r[o],
                  a += l[t >> 4 & 15] + l[15 & t] + l[t >> 12 & 15] + l[t >> 8 & 15] + l[t >> 20 & 15] + l[t >> 16 & 15] + l[t >> 28 & 15] + l[t >> 24 & 15];
              s % e == 0 && (F(r),
              o = 0)
          }
          return n && (t = r[o],
          a += l[t >> 4 & 15] + l[15 & t],
          n > 1 && (a += l[t >> 12 & 15] + l[t >> 8 & 15]),
          n > 2 && (a += l[t >> 20 & 15] + l[t >> 16 & 15])),
          a
      }
      ,
      S.prototype.arrayBuffer = function() {
          this.finalize();
          var t, e = this.blockCount, r = this.s, i = this.outputBlocks, n = this.extraBytes, o = 0, s = 0, a = this.outputBits >> 3;
          t = n ? new ArrayBuffer(i + 1 << 2) : new ArrayBuffer(a);
          for (var u = new Uint32Array(t); s < i; ) {
              for (o = 0; o < e && s < i; ++o,
              ++s)
                  u[s] = r[o];
              s % e == 0 && F(r)
          }
          return n && (u[o] = r[o],
          t = t.slice(0, a)),
          t
      }
      ,
      S.prototype.buffer = S.prototype.arrayBuffer,
      S.prototype.digest = S.prototype.array = function() {
          this.finalize();
          for (var t, e, r = this.blockCount, i = this.s, n = this.outputBlocks, o = this.extraBytes, s = 0, a = 0, u = []; a < n; ) {
              for (s = 0; s < r && a < n; ++s,
              ++a)
                  t = a << 2,
                  e = i[s],
                  u[t] = 255 & e,
                  u[t + 1] = e >> 8 & 255,
                  u[t + 2] = e >> 16 & 255,
                  u[t + 3] = e >> 24 & 255;
              a % r == 0 && F(i)
          }
          return o && (t = a << 2,
          e = i[s],
          u[t] = 255 & e,
          o > 1 && (u[t + 1] = e >> 8 & 255),
          o > 2 && (u[t + 2] = e >> 16 & 255)),
          u
      }
      ,
      k.prototype = new S,
      k.prototype.finalize = function() {
          return this.encode(this.outputBits, !0),
          S.prototype.finalize.call(this)
      }
      ;
      var F = function(t) {
          var e, r, i, n, o, s, a, u, l, c, h, f, p, g, d, I, m, y, w, C, E, v, B, b, Q, R, M, _, x, D, S, k, F, q, N, T, P, O, U, L, H, K, z, G, V, $, j, Y, W, Z, X, J, tt, et, rt, it, nt, ot, st, at, ut, lt, ct;
          for (i = 0; i < 48; i += 2)
              n = t[0] ^ t[10] ^ t[20] ^ t[30] ^ t[40],
              o = t[1] ^ t[11] ^ t[21] ^ t[31] ^ t[41],
              s = t[2] ^ t[12] ^ t[22] ^ t[32] ^ t[42],
              a = t[3] ^ t[13] ^ t[23] ^ t[33] ^ t[43],
              u = t[4] ^ t[14] ^ t[24] ^ t[34] ^ t[44],
              l = t[5] ^ t[15] ^ t[25] ^ t[35] ^ t[45],
              c = t[6] ^ t[16] ^ t[26] ^ t[36] ^ t[46],
              h = t[7] ^ t[17] ^ t[27] ^ t[37] ^ t[47],
              e = (f = t[8] ^ t[18] ^ t[28] ^ t[38] ^ t[48]) ^ (s << 1 | a >>> 31),
              r = (p = t[9] ^ t[19] ^ t[29] ^ t[39] ^ t[49]) ^ (a << 1 | s >>> 31),
              t[0] ^= e,
              t[1] ^= r,
              t[10] ^= e,
              t[11] ^= r,
              t[20] ^= e,
              t[21] ^= r,
              t[30] ^= e,
              t[31] ^= r,
              t[40] ^= e,
              t[41] ^= r,
              e = n ^ (u << 1 | l >>> 31),
              r = o ^ (l << 1 | u >>> 31),
              t[2] ^= e,
              t[3] ^= r,
              t[12] ^= e,
              t[13] ^= r,
              t[22] ^= e,
              t[23] ^= r,
              t[32] ^= e,
              t[33] ^= r,
              t[42] ^= e,
              t[43] ^= r,
              e = s ^ (c << 1 | h >>> 31),
              r = a ^ (h << 1 | c >>> 31),
              t[4] ^= e,
              t[5] ^= r,
              t[14] ^= e,
              t[15] ^= r,
              t[24] ^= e,
              t[25] ^= r,
              t[34] ^= e,
              t[35] ^= r,
              t[44] ^= e,
              t[45] ^= r,
              e = u ^ (f << 1 | p >>> 31),
              r = l ^ (p << 1 | f >>> 31),
              t[6] ^= e,
              t[7] ^= r,
              t[16] ^= e,
              t[17] ^= r,
              t[26] ^= e,
              t[27] ^= r,
              t[36] ^= e,
              t[37] ^= r,
              t[46] ^= e,
              t[47] ^= r,
              e = c ^ (n << 1 | o >>> 31),
              r = h ^ (o << 1 | n >>> 31),
              t[8] ^= e,
              t[9] ^= r,
              t[18] ^= e,
              t[19] ^= r,
              t[28] ^= e,
              t[29] ^= r,
              t[38] ^= e,
              t[39] ^= r,
              t[48] ^= e,
              t[49] ^= r,
              g = t[0],
              d = t[1],
              $ = t[11] << 4 | t[10] >>> 28,
              j = t[10] << 4 | t[11] >>> 28,
              _ = t[20] << 3 | t[21] >>> 29,
              x = t[21] << 3 | t[20] >>> 29,
              at = t[31] << 9 | t[30] >>> 23,
              ut = t[30] << 9 | t[31] >>> 23,
              K = t[40] << 18 | t[41] >>> 14,
              z = t[41] << 18 | t[40] >>> 14,
              q = t[2] << 1 | t[3] >>> 31,
              N = t[3] << 1 | t[2] >>> 31,
              I = t[13] << 12 | t[12] >>> 20,
              m = t[12] << 12 | t[13] >>> 20,
              Y = t[22] << 10 | t[23] >>> 22,
              W = t[23] << 10 | t[22] >>> 22,
              D = t[33] << 13 | t[32] >>> 19,
              S = t[32] << 13 | t[33] >>> 19,
              lt = t[42] << 2 | t[43] >>> 30,
              ct = t[43] << 2 | t[42] >>> 30,
              et = t[5] << 30 | t[4] >>> 2,
              rt = t[4] << 30 | t[5] >>> 2,
              T = t[14] << 6 | t[15] >>> 26,
              P = t[15] << 6 | t[14] >>> 26,
              y = t[25] << 11 | t[24] >>> 21,
              w = t[24] << 11 | t[25] >>> 21,
              Z = t[34] << 15 | t[35] >>> 17,
              X = t[35] << 15 | t[34] >>> 17,
              k = t[45] << 29 | t[44] >>> 3,
              F = t[44] << 29 | t[45] >>> 3,
              b = t[6] << 28 | t[7] >>> 4,
              Q = t[7] << 28 | t[6] >>> 4,
              it = t[17] << 23 | t[16] >>> 9,
              nt = t[16] << 23 | t[17] >>> 9,
              O = t[26] << 25 | t[27] >>> 7,
              U = t[27] << 25 | t[26] >>> 7,
              C = t[36] << 21 | t[37] >>> 11,
              E = t[37] << 21 | t[36] >>> 11,
              J = t[47] << 24 | t[46] >>> 8,
              tt = t[46] << 24 | t[47] >>> 8,
              G = t[8] << 27 | t[9] >>> 5,
              V = t[9] << 27 | t[8] >>> 5,
              R = t[18] << 20 | t[19] >>> 12,
              M = t[19] << 20 | t[18] >>> 12,
              ot = t[29] << 7 | t[28] >>> 25,
              st = t[28] << 7 | t[29] >>> 25,
              L = t[38] << 8 | t[39] >>> 24,
              H = t[39] << 8 | t[38] >>> 24,
              v = t[48] << 14 | t[49] >>> 18,
              B = t[49] << 14 | t[48] >>> 18,
              t[0] = g ^ ~I & y,
              t[1] = d ^ ~m & w,
              t[10] = b ^ ~R & _,
              t[11] = Q ^ ~M & x,
              t[20] = q ^ ~T & O,
              t[21] = N ^ ~P & U,
              t[30] = G ^ ~$ & Y,
              t[31] = V ^ ~j & W,
              t[40] = et ^ ~it & ot,
              t[41] = rt ^ ~nt & st,
              t[2] = I ^ ~y & C,
              t[3] = m ^ ~w & E,
              t[12] = R ^ ~_ & D,
              t[13] = M ^ ~x & S,
              t[22] = T ^ ~O & L,
              t[23] = P ^ ~U & H,
              t[32] = $ ^ ~Y & Z,
              t[33] = j ^ ~W & X,
              t[42] = it ^ ~ot & at,
              t[43] = nt ^ ~st & ut,
              t[4] = y ^ ~C & v,
              t[5] = w ^ ~E & B,
              t[14] = _ ^ ~D & k,
              t[15] = x ^ ~S & F,
              t[24] = O ^ ~L & K,
              t[25] = U ^ ~H & z,
              t[34] = Y ^ ~Z & J,
              t[35] = W ^ ~X & tt,
              t[44] = ot ^ ~at & lt,
              t[45] = st ^ ~ut & ct,
              t[6] = C ^ ~v & g,
              t[7] = E ^ ~B & d,
              t[16] = D ^ ~k & b,
              t[17] = S ^ ~F & Q,
              t[26] = L ^ ~K & q,
              t[27] = H ^ ~z & N,
              t[36] = Z ^ ~J & G,
              t[37] = X ^ ~tt & V,
              t[46] = at ^ ~lt & et,
              t[47] = ut ^ ~ct & rt,
              t[8] = v ^ ~g & I,
              t[9] = B ^ ~d & m,
              t[18] = k ^ ~b & R,
              t[19] = F ^ ~Q & M,
              t[28] = K ^ ~q & T,
              t[29] = z ^ ~N & P,
              t[38] = J ^ ~G & $,
              t[39] = tt ^ ~V & j,
              t[48] = lt ^ ~et & it,
              t[49] = ct ^ ~rt & nt,
              t[0] ^= A[i],
              t[1] ^= A[i + 1]
      };
      if (s)
          t.exports = B;
      else {
          for (Q = 0; Q < b.length; ++Q)
              n[b[Q]] = B[b[Q]];
          a && define((function() {
              return B
          }
          ))
      }
  }()
}
)),
parcelRequire.register("813YP", (function(t, e) {
  var r = parcelRequire("aVh2m")
    , i = parcelRequire("gdDvH")
    , n = function(t) {
      var e = typeof t;
      if ("string" === e)
          return i.isHexStrict(t) ? new r(t.replace(/0x/i, ""),16) : new r(t,10);
      if ("number" === e)
          return new r(t);
      if (i.isBigNumber(t))
          return new r(t.toString(10));
      if (i.isBN(t))
          return t;
      throw new Error(t + " is not a number")
  }
    , o = function(t, e, o) {
      var s, a, u;
      if ("bytes" === (t = (u = t).startsWith("int[") ? "int256" + u.slice(3) : "int" === u ? "int256" : u.startsWith("uint[") ? "uint256" + u.slice(4) : "uint" === u ? "uint256" : u.startsWith("fixed[") ? "fixed128x128" + u.slice(5) : "fixed" === u ? "fixed128x128" : u.startsWith("ufixed[") ? "ufixed128x128" + u.slice(6) : "ufixed" === u ? "ufixed128x128" : u)) {
          if (e.replace(/^0x/i, "").length % 2 != 0)
              throw new Error("Invalid bytes characters " + e.length);
          return e
      }
      if ("string" === t)
          return i.utf8ToHex(e);
      if ("bool" === t)
          return e ? "01" : "00";
      if (t.startsWith("address")) {
          if (s = o ? 64 : 40,
          !i.isAddress(e))
              throw new Error(e + " is not a valid address, or the checksum is invalid.");
          return i.leftPad(e.toLowerCase(), s)
      }
      if (s = function(t) {
          var e = /^\D+(\d+).*$/.exec(t);
          return e ? parseInt(e[1], 10) : null
      }(t),
      t.startsWith("bytes")) {
          if (!s)
              throw new Error("bytes[] not yet supported in solidity");
          if (o && (s = 32),
          s < 1 || s > 32 || s < e.replace(/^0x/i, "").length / 2)
              throw new Error("Invalid bytes" + s + " for " + e);
          return i.rightPad(e, 2 * s)
      }
      if (t.startsWith("uint")) {
          if (s % 8 || s < 8 || s > 256)
              throw new Error("Invalid uint" + s + " size");
          if ((a = n(e)).bitLength() > s)
              throw new Error("Supplied uint exceeds width: " + s + " vs " + a.bitLength());
          if (a.lt(new r(0)))
              throw new Error("Supplied uint " + a.toString() + " is negative");
          return s ? i.leftPad(a.toString("hex"), s / 8 * 2) : a
      }
      if (t.startsWith("int")) {
          if (s % 8 || s < 8 || s > 256)
              throw new Error("Invalid int" + s + " size");
          if ((a = n(e)).bitLength() > s)
              throw new Error("Supplied int exceeds width: " + s + " vs " + a.bitLength());
          return a.lt(new r(0)) ? a.toTwos(s).toString("hex") : s ? i.leftPad(a.toString("hex"), s / 8 * 2) : a
      }
      throw new Error("Unsupported or invalid type: " + t)
  }
    , s = function(t) {
      if (Array.isArray(t))
          throw new Error("Autodetection of array types is not supported.");
      var e, n, s = "";
      if (t && "object" == typeof t && (t.hasOwnProperty("v") || t.hasOwnProperty("t") || t.hasOwnProperty("value") || t.hasOwnProperty("type")) ? (e = t.hasOwnProperty("t") ? t.t : t.type,
      s = t.hasOwnProperty("v") ? t.v : t.value) : (e = i.toHex(t, !0),
      s = i.toHex(t),
      e.startsWith("int") || e.startsWith("uint") || (e = "bytes")),
      !e.startsWith("int") && !e.startsWith("uint") || "string" != typeof s || /^(-)?0x/i.test(s) || (s = new r(s)),
      Array.isArray(s)) {
          if (n = function(t) {
              var e = /^\D+\d*\[(\d+)\]$/.exec(t);
              return e ? parseInt(e[1], 10) : null
          }(e),
          n && s.length !== n)
              throw new Error(e + " is not matching the given array " + JSON.stringify(s));
          n = s.length
      }
      return Array.isArray(s) ? s.map((function(t) {
          return o(e, t, n).toString("hex").replace("0x", "")
      }
      )).join("") : o(e, s, n).toString("hex").replace("0x", "")
  };
  t.exports = {
      soliditySha3: function() {
          var t = Array.prototype.slice.call(arguments)
            , e = t.map(s);
          return i.sha3("0x" + e.join(""))
      },
      soliditySha3Raw: function() {
          return i.sha3Raw("0x" + Array.prototype.slice.call(arguments).map(s).join(""))
      },
      encodePacked: function() {
          var t = Array.prototype.slice.call(arguments)
            , e = t.map(s);
          return "0x" + e.join("").toLowerCase()
      }
  }
}
)),
parcelRequire.register("3aec6", (function(t, e) {
  var r, i, n, o;
  $parcel$export(t.exports, "getIV", (function() {
      return r
  }
  ), (function(t) {
      return r = t
  }
  )),
  $parcel$export(t.exports, "getConstants", (function() {
      return i
  }
  ), (function(t) {
      return i = t
  }
  )),
  $parcel$export(t.exports, "hash", (function() {
      return n
  }
  ), (function(t) {
      return n = t
  }
  )),
  $parcel$export(t.exports, "multiHash", (function() {
      return o
  }
  ), (function(t) {
      return o = t
  }
  ));
  var s = parcelRequire("1lbVy").bn128
    , a = parcelRequire("1lbVy").bigInt
    , u = parcelRequire("hNzKf");
  const l = s.Fr
    , c = "mimcsponge"
    , h = 220;
  r = t=>{
      void 0 === t && (t = c);
      const e = u.keccak256(t + "_iv");
      return a(u.toBN(e).toString()).mod(l.q)
  }
  ;
  const A = (i = (t,e)=>{
      void 0 === t && (t = c),
      void 0 === e && (e = h);
      const r = new Array(e);
      let i = u.keccak256(c);
      for (let t = 1; t < e; t++) {
          i = u.keccak256(i);
          const e = u.toBN(i).mod(u.toBN(l.q.toString()))
            , n = u.padLeft(u.toHex(e), 64);
          r[t] = a(u.toBN(n).toString())
      }
      return r[0] = a(0),
      r[r.length - 1] = a(0),
      r
  }
  )(c, h);
  n = (t,e,r)=>{
      let i = a(t)
        , n = a(e);
      const o = a(r);
      for (let t = 0; t < h; t++) {
          const e = A[t]
            , r = 0 == t ? l.add(i, o) : l.add(l.add(i, o), e)
            , s = a(n);
          t < 219 ? (n = i,
          i = l.add(s, l.exp(r, 5))) : n = l.add(s, l.exp(r, 5))
      }
      return {
          xL: l.affine(i),
          xR: l.affine(n)
      }
  }
  ,
  o = (t,e,r)=>{
      void 0 === r && (r = 1),
      void 0 === e && (e = l.zero);
      let i = l.zero
        , o = l.zero;
      for (let r = 0; r < t.length; r++) {
          i = l.add(i, a(t[r]));
          const s = n(i, o, e);
          i = s.xL,
          o = s.xR
      }
      let s = [i];
      for (let t = 1; t < r; t++) {
          const t = n(i, o, e);
          i = t.xL,
          o = t.xR,
          s.push(i)
      }
      return 1 == r ? l.affine(s[0]) : s.map((t=>l.affine(t)))
  }
}
)),
parcelRequire.register("aF2Fw", (function(t, e) {
  $parcel$export(t.exports, "DepositModal", (function() {
      return p
  }
  )),
  $parcel$export(t.exports, "Deposit", (function() {
      return d
  }
  ));
  var r = parcelRequire("bbzbN")
    , i = parcelRequire("7fPBF")
    , n = parcelRequire("3ux5a")
    , o = parcelRequire("jbMlT")
    , s = parcelRequire("lbHeE")
    , a = parcelRequire("4fHal")
    , u = parcelRequire("i0uae")
    , l = parcelRequire("aZ6L6")
    , c = parcelRequire("cubqg")
    , h = parcelRequire("2gWC8");
  function A(t) {
      const e = (0,
      a.useAnchorWallet)();
      if (!e)
          throw new Error("Wallet is null.");
      c.connection.getBalance(e.publicKey).then((e=>{
          null === t.stageZeroUserBalance && t.setStateCallback({
              stageZeroUserBalance: e
          })
      }
      ));
      const i = null !== t.stageZeroUserBalance && t.stageZeroUserBalance < 1000615e3
        , s = (0,
      o.useBreakpointValue)({
          base: !0,
          sm: !1
      })
        , u = i || s || !t.stageZeroWarningChecked;
      return (0,
      r.jsxs)(r.Fragment, {
          children: [(0,
          r.jsx)(o.ModalHeader, {
              children: "Deposit 1 SOL"
          }), (0,
          r.jsx)(o.ModalCloseButton, {}), (0,
          r.jsxs)(o.ModalBody, {
              children: [(0,
              r.jsx)(o.Text, {
                  children: "Depositing requires 3 separate approvals. If a transaction fails to reach the Solana network, the transaction will be retried, so 4 or 5 approvals may be required."
              }), (0,
              r.jsx)(o.Center, {
                  mt: "5%",
                  children: (0,
                  r.jsx)("img", {
                      src: $parcel$interopDefault(h)
                  })
              }), (0,
              r.jsx)(o.Text, {
                  mt: "5%",
                  children: "After the deposit transactions are sent, you will be given a secret note. If you lose this note or share it with anyone, your funds may be lost."
              }), (0,
              r.jsxs)(o.Flex, {
                  mt: "5%",
                  onClick: e=>{
                      "INPUT" !== e.target.tagName && t.setStateCallback({
                          stageZeroWarningChecked: !t.stageZeroWarningChecked
                      })
                  }
                  ,
                  sx: {
                      cursor: "pointer"
                  },
                  children: [(0,
                  r.jsx)(o.Checkbox, {
                      isChecked: t.stageZeroWarningChecked,
                      mr: "3%",
                      size: "lg",
                      colorScheme: "blackAlpha",
                      borderColor: "bistre"
                  }), (0,
                  r.jsx)(o.Text, {
                      w: "90%",
                      fontWeight: "700",
                      fontSize: "0.8em",
                      children: "I understand that if I lose my secret note or share it with anyone else, I will not be able to withdraw my funds."
                  })]
              })]
          }), (0,
          r.jsx)(o.Button, {
              variant: "fancy",
              p: "1em",
              opacity: u ? "40%" : null,
              m: "5% 10% 5% 10%",
              fontFamily: "Montserrat",
              border: "1px",
              onClick: async()=>{
                  if (u)
                      return;
                  let e;
                  $parcel$interopDefault(n).track("Deposit Init"),
                  t.setStateCallback({
                      stage: 1,
                      stageOneLoadingText: "Signing transaction 1 of 3"
                  });
                  try {
                      e = await (0,
                      l.deposit)(t.depositCallback, t.toast)
                  } catch (e) {
                      return console.error(e),
                      void t.onClose()
                  }
                  {
                      const t = document.createElement("a")
                        , r = new Blob([e + "\n"],{
                          type: "text/plain"
                      });
                      t.href = URL.createObjectURL(r);
                      let i = `otter-${e.split("-")[1].slice(0, 10)}`;
                      "devnet" === c.NETWORK && (i += "-dev"),
                      t.download = i + ".txt",
                      document.body.appendChild(t),
                      t.click()
                  }
                  t.setStateCallback({
                      stage: 2,
                      stageTwoNote: e
                  }),
                  t.fireConfetti(),
                  $parcel$interopDefault(n).track("Deposit Success")
              }
              ,
              children: s ? "Deposits on Mobile not Allowed" : i ? "Need 1.000615 SOL to Deposit" : "Send Deposit Transactions"
          })]
      })
  }
  function f(t) {
      const {hasCopied: e, onCopy: n} = (0,
      o.useClipboard)(t.note)
        , [a,u] = $parcel$interopDefault(i).useState(!1);
      return (0,
      r.jsxs)(r.Fragment, {
          children: [(0,
          r.jsx)(o.ModalHeader, {
              children: "Save Your Note"
          }), (0,
          r.jsxs)(o.ModalBody, {
              children: [(0,
              r.jsx)(o.Text, {
                  children: "Your deposit has been finalized!"
              }), (0,
              r.jsx)(o.Text, {
                  mt: "5%",
                  fontSize: "1.2em",
                  textAlign: "left",
                  children: "Secret Note"
              }), (0,
              r.jsxs)(o.Flex, {
                  justifyContent: "right",
                  mt: "1%",
                  border: "1px",
                  borderRadius: "5px",
                  borderColor: "bistre",
                  p: "3%",
                  focusBorderColor: "bistre",
                  onClick: ()=>{
                      n()
                  }
                  ,
                  children: [(0,
                  r.jsx)(o.Text, {
                      fontSize: "0.75em",
                      fontFamily: "Courier",
                      opacity: "70%",
                      sx: {
                          "word-break": "break-all"
                      },
                      align: "left",
                      children: t.note
                  }), (0,
                  r.jsx)(o.Tooltip, {
                      label: "Copied!",
                      placement: "top",
                      isOpen: e,
                      hasArrow: !0,
                      gutter: "12",
                      children: (0,
                      r.jsx)(s.CopyIcon, {
                          boxSize: "17px"
                      })
                  })]
              }), (0,
              r.jsxs)(o.Flex, {
                  mt: "5%",
                  onClick: t=>{
                      "INPUT" !== t.target.tagName && u(!a)
                  }
                  ,
                  sx: {
                      cursor: "pointer"
                  },
                  children: [(0,
                  r.jsx)(o.Checkbox, {
                      isChecked: a,
                      mr: "3%",
                      size: "lg",
                      colorScheme: "blackAlpha",
                      borderColor: "bistre"
                  }), (0,
                  r.jsx)(o.Text, {
                      fontWeight: "700",
                      fontSize: "0.8em",
                      children: "I have saved my secret note in a safe place."
                  })]
              }), (0,
              r.jsx)(o.Button, {
                  w: "80%",
                  m: "5% 10% 3% 10%",
                  variant: "plain",
                  opacity: a ? null : "40%",
                  border: "1px",
                  onClick: ()=>{
                      a && t.onClose()
                  }
                  ,
                  children: "Close"
              })]
          })]
      })
  }
  class p extends $parcel$interopDefault(i).Component {
      resetState() {
          this.setState({
              stage: 0,
              stageZeroWarningChecked: !1,
              stageZeroUserBalance: null,
              stageOneLoadingText: "",
              stageOneLoadingSubtext: "",
              stageTwoNote: null
          })
      }
      setStateCallback(t) {
          this.setState(t)
      }
      depositCallback(t, e) {
          this.setState({
              stageOneLoadingText: t,
              stageOneLoadingSubtext: void 0 === e ? "" : e
          })
      }
      stageOneContent() {
          const t = (0,
          r.jsx)(o.Text, {
              mt: "1%",
              children: this.state.stageOneLoadingSubtext
          });
          return (0,
          r.jsxs)(r.Fragment, {
              children: [(0,
              r.jsx)(o.ModalHeader, {
                  children: "Depositing 1 SOL"
              }), (0,
              r.jsxs)(o.ModalBody, {
                  children: [(0,
                  r.jsx)(o.Spinner, {
                      color: "bistre",
                      size: "xl"
                  }), (0,
                  r.jsx)(o.Text, {
                      mt: "5%",
                      children: this.state.stageOneLoadingText
                  }), "" === this.state.stageOneLoadingSubtext ? null : t]
              })]
          })
      }
      render() {
          return (0,
          r.jsxs)(o.Modal, {
              isOpen: this.props.isOpen,
              onClose: ()=>{
                  this.resetState(),
                  this.props.onClose()
              }
              ,
              closeOnOverlayClick: 0 === this.state.stage,
              closeOnEsc: 0 === this.state.stage,
              isCentered: !0,
              size: 2 === this.state.stage ? "xl" : "lg",
              children: [(0,
              r.jsx)(o.ModalOverlay, {}), (0,
              r.jsx)(o.ModalContent, {
                  bg: "champagne",
                  p: "1%",
                  borderRadius: "10px",
                  children: {
                      0: (0,
                      r.jsx)(A, {
                          setStateCallback: this.setStateCallback,
                          stageZeroWarningChecked: this.state.stageZeroWarningChecked,
                          stageZeroUserBalance: this.state.stageZeroUserBalance,
                          depositCallback: this.depositCallback,
                          fireConfetti: this.props.fireConfetti,
                          onClose: ()=>{
                              setTimeout(this.resetState, 1e3),
                              this.props.onClose()
                          }
                          ,
                          toast: this.props.toast
                      }),
                      1: this.stageOneContent(),
                      2: (0,
                      r.jsx)(f, {
                          note: this.state.stageTwoNote,
                          onClose: ()=>{
                              setTimeout(this.resetState, 1e3),
                              this.props.onClose()
                          }
                      })
                  }[this.state.stage]
              })]
          })
      }
      constructor(t) {
          super(t),
          this.state = {
              stage: 0,
              stageZeroWarningChecked: !1,
              stageZeroUserBalance: null,
              stageOneLoadingText: "",
              stageOneLoadingSubtext: "",
              stageTwoNote: null
          },
          this.resetState = this.resetState.bind(this),
          this.setStateCallback = this.setStateCallback.bind(this),
          this.depositCallback = this.depositCallback.bind(this)
      }
  }
  function g(t) {
      return (0,
      r.jsxs)(o.Stack, {
          direction: "column",
          w: ["15%", "18%"],
          sx: {
              cursor: "pointer"
          },
          onClick: t.callback,
          children: [(0,
          r.jsx)(o.Center, {
              w: ["4vw", "min(25px, 1.5vw)"],
              h: ["4vw", "min(25px, 1.5vw)"],
              borderRadius: ["2vw", "min(12.5px, 0.75vw)"],
              border: ["1px", "2px"],
              borderColor: "bistre",
              bg: "champagne",
              children: (0,
              r.jsx)(o.Box, {
                  w: ["2.4vw", "min(15px, 0.9vw)"],
                  h: ["2.4vw", "min(15px, 0.9vw)"],
                  borderRadius: ["1.2vw", "min(7.5px, 0.45vw)"],
                  bg: "bistre",
                  display: t.isSelected ? "inherit" : "none"
              })
          }), (0,
          r.jsx)(o.Text, {
              fontSize: ["0.5em", "0.8em"],
              children: t.text
          })]
      })
  }
  class d extends $parcel$interopDefault(i).Component {
      shakeOneSolCallback() {
          this.setState({
              shakeOneSol: !0
          })
      }
      componentDidMount() {}
      render() {
          return (0,
          r.jsxs)(o.Box, {
              mt: "10%",
              mb: "10%",
              children: [(0,
              r.jsx)(o.Text, {
                  fontSize: ["0.9em", "1.2em"],
                  children: "Amount to Deposit"
              }), (0,
              r.jsxs)(o.Center, {
                  mt: "6%",
                  position: "relative",
                  children: [(0,
                  r.jsx)(o.Box, {
                      position: "absolute",
                      top: ["20%", "22%"],
                      h: ["1px", "2px"],
                      w: "90%",
                      borderRadius: "2px",
                      bg: "bistre",
                      sx: {
                          "z-index": "-1"
                      }
                  }), (0,
                  r.jsxs)(o.Stack, {
                      direction: "row",
                      w: "100%",
                      children: [(0,
                      r.jsx)(g, {
                          callback: this.shakeOneSolCallback,
                          isSelected: !1,
                          text: "0.1 SOL"
                      }), (0,
                      r.jsx)(g, {
                          callback: this.shakeOneSolCallback,
                          isSelected: !0,
                          text: "1 SOL"
                      }), (0,
                      r.jsx)(g, {
                          callback: this.shakeOneSolCallback,
                          isSelected: !1,
                          text: "10 SOL"
                      }), (0,
                      r.jsx)(g, {
                          callback: this.shakeOneSolCallback,
                          isSelected: !1,
                          text: "100 SOL"
                      }), (0,
                      r.jsx)(g, {
                          callback: this.shakeOneSolCallback,
                          isSelected: !1,
                          text: "1000 SOL"
                      })]
                  })]
              }), (0,
              r.jsx)(o.Text, {
                  mt: ["6%", "2%"],
                  pl: ["0", "18%"],
                  pr: ["0", "57%"],
                  fontSize: ["0.5em", "0.6em"],
                  onAnimationEnd: ()=>this.setState({
                      shakeOneSol: !1
                  }),
                  sx: this.state.shakeOneSol ? {
                      animation: "shake 0.5s"
                  } : null,
                  children: "Only 1 SOL is available while Otter Cash is in beta."
              }), (0,
              r.jsx)(u.DepositWithdrawButton, {
                  isDeposit: !0,
                  isManuallyPaused: this.state.isManuallyPaused,
                  disableClick: !1,
                  onClick: this.props.onOpenModal,
                  text: "Perform Deposit",
                  style: {
                      w: ["80%", "55%"],
                      mt: "8%",
                      fontSize: ["0.8em", "1.0em"]
                  }
              })]
          })
      }
      constructor(t) {
          super(t),
          this.state = {
              isManuallyPaused: !1,
              shakeOneSol: !1
          },
          this.shakeOneSolCallback = this.shakeOneSolCallback.bind(this)
      }
  }
}
)),
parcelRequire.register("lbHeE", (function(t, e) {
  $parcel$export(t.exports, "CopyIcon", (function() {
      return n
  }
  )),
  $parcel$export(t.exports, "createIcon", (function() {
      return parcelRequire("61OPF").createIcon
  }
  ));
  var r = parcelRequire("7fPBF")
    , i = parcelRequire("61OPF")
    , n = (i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  i = parcelRequire("61OPF"),
  (0,
  (i = parcelRequire("61OPF")).createIcon)({
      d: "M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z",
      displayName: "CopyIcon"
  }));
  (0,
  i.createIcon)({
      d: "M23.384,21.619,16.855,15.09a9.284,9.284,0,1,0-1.768,1.768l6.529,6.529a1.266,1.266,0,0,0,1.768,0A1.251,1.251,0,0,0,23.384,21.619ZM2.75,9.5a6.75,6.75,0,1,1,6.75,6.75A6.758,6.758,0,0,1,2.75,9.5Z",
      displayName: "SearchIcon"
  }),
  (0,
  i.createIcon)({
      d: "M23.414,20.591l-4.645-4.645a10.256,10.256,0,1,0-2.828,2.829l4.645,4.644a2.025,2.025,0,0,0,2.828,0A2,2,0,0,0,23.414,20.591ZM10.25,3.005A7.25,7.25,0,1,1,3,10.255,7.258,7.258,0,0,1,10.25,3.005Z",
      displayName: "Search2Icon"
  }),
  (0,
  i.createIcon)({
      d: "M21.4,13.7C20.6,13.9,19.8,14,19,14c-5,0-9-4-9-9c0-0.8,0.1-1.6,0.3-2.4c0.1-0.3,0-0.7-0.3-1 c-0.3-0.3-0.6-0.4-1-0.3C4.3,2.7,1,7.1,1,12c0,6.1,4.9,11,11,11c4.9,0,9.3-3.3,10.6-8.1c0.1-0.3,0-0.7-0.3-1 C22.1,13.7,21.7,13.6,21.4,13.7z",
      displayName: "MoonIcon"
  }),
  (0,
  i.createIcon)({
      displayName: "SunIcon",
      path: $parcel$interopDefault(r).createElement("g", {
          strokeLinejoin: "round",
          strokeLinecap: "round",
          strokeWidth: "2",
          fill: "none",
          stroke: "currentColor"
      }, $parcel$interopDefault(r).createElement("circle", {
          cx: "12",
          cy: "12",
          r: "5"
      }), $parcel$interopDefault(r).createElement("path", {
          d: "M12 1v2"
      }), $parcel$interopDefault(r).createElement("path", {
          d: "M12 21v2"
      }), $parcel$interopDefault(r).createElement("path", {
          d: "M4.22 4.22l1.42 1.42"
      }), $parcel$interopDefault(r).createElement("path", {
          d: "M18.36 18.36l1.42 1.42"
      }), $parcel$interopDefault(r).createElement("path", {
          d: "M1 12h2"
      }), $parcel$interopDefault(r).createElement("path", {
          d: "M21 12h2"
      }), $parcel$interopDefault(r).createElement("path", {
          d: "M4.22 19.78l1.42-1.42"
      }), $parcel$interopDefault(r).createElement("path", {
          d: "M18.36 5.64l1.42-1.42"
      }))
  }),
  (0,
  i.createIcon)({
      d: "M0,12a1.5,1.5,0,0,0,1.5,1.5h8.75a.25.25,0,0,1,.25.25V22.5a1.5,1.5,0,0,0,3,0V13.75a.25.25,0,0,1,.25-.25H22.5a1.5,1.5,0,0,0,0-3H13.75a.25.25,0,0,1-.25-.25V1.5a1.5,1.5,0,0,0-3,0v8.75a.25.25,0,0,1-.25.25H1.5A1.5,1.5,0,0,0,0,12Z",
      displayName: "AddIcon"
  }),
  (0,
  i.createIcon)({
      displayName: "SmallAddIcon",
      viewBox: "0 0 20 20",
      path: $parcel$interopDefault(r).createElement("path", {
          fill: "currentColor",
          d: "M14 9h-3V6c0-.55-.45-1-1-1s-1 .45-1 1v3H6c-.55 0-1 .45-1 1s.45 1 1 1h3v3c0 .55.45 1 1 1s1-.45 1-1v-3h3c.55 0 1-.45 1-1s-.45-1-1-1z",
          fillRule: "evenodd"
      })
  }),
  (0,
  i.createIcon)({
      viewBox: "0 0 14 14",
      d: "M14,7.77 L14,6.17 L12.06,5.53 L11.61,4.44 L12.49,2.6 L11.36,1.47 L9.55,2.38 L8.46,1.93 L7.77,0.01 L6.17,0.01 L5.54,1.95 L4.43,2.4 L2.59,1.52 L1.46,2.65 L2.37,4.46 L1.92,5.55 L0,6.23 L0,7.82 L1.94,8.46 L2.39,9.55 L1.51,11.39 L2.64,12.52 L4.45,11.61 L5.54,12.06 L6.23,13.98 L7.82,13.98 L8.45,12.04 L9.56,11.59 L11.4,12.47 L12.53,11.34 L11.61,9.53 L12.08,8.44 L14,7.75 L14,7.77 Z M7,10 C5.34,10 4,8.66 4,7 C4,5.34 5.34,4 7,4 C8.66,4 10,5.34 10,7 C10,8.66 8.66,10 7,10 Z",
      displayName: "SettingsIcon"
  }),
  (0,
  i.createIcon)({
      displayName: "CheckCircleIcon",
      d: "M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
  }),
  (0,
  i.createIcon)({
      d: "M19.5,9.5h-.75V6.75a6.75,6.75,0,0,0-13.5,0V9.5H4.5a2,2,0,0,0-2,2V22a2,2,0,0,0,2,2h15a2,2,0,0,0,2-2V11.5A2,2,0,0,0,19.5,9.5Zm-9.5,6a2,2,0,1,1,3,1.723V19.5a1,1,0,0,1-2,0V17.223A1.994,1.994,0,0,1,10,15.5ZM7.75,6.75a4.25,4.25,0,0,1,8.5,0V9a.5.5,0,0,1-.5.5H8.25a.5.5,0,0,1-.5-.5Z",
      displayName: "LockIcon"
  }),
  (0,
  i.createIcon)({
      d: "M19.5,9.5h-.75V6.75A6.751,6.751,0,0,0,5.533,4.811a1.25,1.25,0,1,0,2.395.717A4.251,4.251,0,0,1,16.25,6.75V9a.5.5,0,0,1-.5.5H4.5a2,2,0,0,0-2,2V22a2,2,0,0,0,2,2h15a2,2,0,0,0,2-2V11.5A2,2,0,0,0,19.5,9.5Zm-9.5,6a2,2,0,1,1,3,1.723V19.5a1,1,0,0,1-2,0V17.223A1.994,1.994,0,0,1,10,15.5Z",
      displayName: "UnlockIcon"
  }),
  (0,
  i.createIcon)({
      displayName: "ViewIcon",
      path: $parcel$interopDefault(r).createElement("g", {
          fill: "currentColor"
      }, $parcel$interopDefault(r).createElement("path", {
          d: "M23.432,10.524C20.787,7.614,16.4,4.538,12,4.6,7.6,4.537,3.213,7.615.568,10.524a2.211,2.211,0,0,0,0,2.948C3.182,16.351,7.507,19.4,11.839,19.4h.308c4.347,0,8.671-3.049,11.288-5.929A2.21,2.21,0,0,0,23.432,10.524ZM7.4,12A4.6,4.6,0,1,1,12,16.6,4.6,4.6,0,0,1,7.4,12Z"
      }), $parcel$interopDefault(r).createElement("circle", {
          cx: "12",
          cy: "12",
          r: "2"
      }))
  }),
  (0,
  i.createIcon)({
      displayName: "ViewOffIcon",
      path: $parcel$interopDefault(r).createElement("g", {
          fill: "currentColor"
      }, $parcel$interopDefault(r).createElement("path", {
          d: "M23.2,10.549a20.954,20.954,0,0,0-4.3-3.6l4-3.995a1,1,0,1,0-1.414-1.414l-.018.018a.737.737,0,0,1-.173.291l-19.5,19.5c-.008.007-.018.009-.026.017a1,1,0,0,0,1.631,1.088l4.146-4.146a11.26,11.26,0,0,0,4.31.939h.3c4.256,0,8.489-2.984,11.051-5.8A2.171,2.171,0,0,0,23.2,10.549ZM16.313,13.27a4.581,4.581,0,0,1-3,3.028,4.3,4.3,0,0,1-3.1-.19.253.253,0,0,1-.068-.407l5.56-5.559a.252.252,0,0,1,.407.067A4.3,4.3,0,0,1,16.313,13.27Z"
      }), $parcel$interopDefault(r).createElement("path", {
          d: "M7.615,13.4a.244.244,0,0,0,.061-.24A4.315,4.315,0,0,1,7.5,12,4.5,4.5,0,0,1,12,7.5a4.276,4.276,0,0,1,1.16.173.244.244,0,0,0,.24-.062l1.941-1.942a.254.254,0,0,0-.1-.421A10.413,10.413,0,0,0,12,4.75C7.7,4.692,3.4,7.7.813,10.549a2.15,2.15,0,0,0-.007,2.9,21.209,21.209,0,0,0,3.438,3.03.256.256,0,0,0,.326-.029Z"
      }))
  }),
  (0,
  i.createIcon)({
      d: "M11.2857,6.05714 L10.08571,4.85714 L7.85714,7.14786 L7.85714,1 L6.14286,1 L6.14286,7.14786 L3.91429,4.85714 L2.71429,6.05714 L7,10.42857 L11.2857,6.05714 Z M1,11.2857 L1,13 L13,13 L13,11.2857 L1,11.2857 Z",
      displayName: "DownloadIcon",
      viewBox: "0 0 14 14"
  }),
  (0,
  i.createIcon)({
      displayName: "DeleteIcon",
      path: $parcel$interopDefault(r).createElement("g", {
          fill: "currentColor"
      }, $parcel$interopDefault(r).createElement("path", {
          d: "M19.452 7.5H4.547a.5.5 0 00-.5.545l1.287 14.136A2 2 0 007.326 24h9.347a2 2 0 001.992-1.819L19.95 8.045a.5.5 0 00-.129-.382.5.5 0 00-.369-.163zm-9.2 13a.75.75 0 01-1.5 0v-9a.75.75 0 011.5 0zm5 0a.75.75 0 01-1.5 0v-9a.75.75 0 011.5 0zM22 4h-4.75a.25.25 0 01-.25-.25V2.5A2.5 2.5 0 0014.5 0h-5A2.5 2.5 0 007 2.5v1.25a.25.25 0 01-.25.25H2a1 1 0 000 2h20a1 1 0 000-2zM9 3.75V2.5a.5.5 0 01.5-.5h5a.5.5 0 01.5.5v1.25a.25.25 0 01-.25.25h-5.5A.25.25 0 019 3.75z"
      }))
  }),
  (0,
  i.createIcon)({
      displayName: "RepeatIcon",
      path: $parcel$interopDefault(r).createElement("g", {
          fill: "currentColor"
      }, $parcel$interopDefault(r).createElement("path", {
          d: "M10.319,4.936a7.239,7.239,0,0,1,7.1,2.252,1.25,1.25,0,1,0,1.872-1.657A9.737,9.737,0,0,0,9.743,2.5,10.269,10.269,0,0,0,2.378,9.61a.249.249,0,0,1-.271.178l-1.033-.13A.491.491,0,0,0,.6,9.877a.5.5,0,0,0-.019.526l2.476,4.342a.5.5,0,0,0,.373.248.43.43,0,0,0,.062,0,.5.5,0,0,0,.359-.152l3.477-3.593a.5.5,0,0,0-.3-.844L5.15,10.172a.25.25,0,0,1-.2-.333A7.7,7.7,0,0,1,10.319,4.936Z"
      }), $parcel$interopDefault(r).createElement("path", {
          d: "M23.406,14.1a.5.5,0,0,0,.015-.526l-2.5-4.329A.5.5,0,0,0,20.546,9a.489.489,0,0,0-.421.151l-3.456,3.614a.5.5,0,0,0,.3.842l1.848.221a.249.249,0,0,1,.183.117.253.253,0,0,1,.023.216,7.688,7.688,0,0,1-5.369,4.9,7.243,7.243,0,0,1-7.1-2.253,1.25,1.25,0,1,0-1.872,1.656,9.74,9.74,0,0,0,9.549,3.03,10.261,10.261,0,0,0,7.369-7.12.251.251,0,0,1,.27-.179l1.058.127a.422.422,0,0,0,.06,0A.5.5,0,0,0,23.406,14.1Z"
      }))
  }),
  (0,
  i.createIcon)({
      displayName: "RepeatClockIcon",
      path: $parcel$interopDefault(r).createElement("g", {
          fill: "currentColor"
      }, $parcel$interopDefault(r).createElement("path", {
          d: "M12.965,6a1,1,0,0,0-1,1v5.5a1,1,0,0,0,1,1h5a1,1,0,0,0,0-2h-3.75a.25.25,0,0,1-.25-.25V7A1,1,0,0,0,12.965,6Z"
      }), $parcel$interopDefault(r).createElement("path", {
          d: "M12.567,1.258A10.822,10.822,0,0,0,2.818,8.4a.25.25,0,0,1-.271.163L.858,8.309a.514.514,0,0,0-.485.213.5.5,0,0,0-.021.53l2.679,4.7a.5.5,0,0,0,.786.107l3.77-3.746a.5.5,0,0,0-.279-.85L5.593,9.007a.25.25,0,0,1-.192-.35,8.259,8.259,0,1,1,7.866,11.59,1.25,1.25,0,0,0,.045,2.5h.047a10.751,10.751,0,1,0-.792-21.487Z"
      }))
  }),
  (0,
  i.createIcon)({
      displayName: "EditIcon",
      path: $parcel$interopDefault(r).createElement("g", {
          fill: "none",
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeWidth: "2"
      }, $parcel$interopDefault(r).createElement("path", {
          d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
      }), $parcel$interopDefault(r).createElement("path", {
          d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
      }))
  }),
  (0,
  i.createIcon)({
      d: "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z",
      displayName: "ChevronLeftIcon"
  }),
  (0,
  i.createIcon)({
      d: "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z",
      displayName: "ChevronRightIcon"
  }),
  (0,
  i.createIcon)({
      displayName: "ChevronDownIcon",
      d: "M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
  }),
  (0,
  i.createIcon)({
      d: "M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z",
      displayName: "ChevronUpIcon"
  }),
  (0,
  i.createIcon)({
      d: "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z",
      displayName: "ArrowBackIcon"
  }),
  (0,
  i.createIcon)({
      d: "M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z",
      displayName: "ArrowForwardIcon"
  }),
  (0,
  i.createIcon)({
      d: "M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z",
      displayName: "ArrowUpIcon"
  }),
  (0,
  i.createIcon)({
      viewBox: "0 0 16 16",
      d: "M11.891 9.992a1 1 0 1 1 1.416 1.415l-4.3 4.3a1 1 0 0 1-1.414 0l-4.3-4.3A1 1 0 0 1 4.71 9.992l3.59 3.591 3.591-3.591zm0-3.984L8.3 2.417 4.709 6.008a1 1 0 0 1-1.416-1.415l4.3-4.3a1 1 0 0 1 1.414 0l4.3 4.3a1 1 0 1 1-1.416 1.415z",
      displayName: "ArrowUpDownIcon"
  }),
  (0,
  i.createIcon)({
      d: "M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z",
      displayName: "ArrowDownIcon"
  }),
  (0,
  i.createIcon)({
      displayName: "ExternalLinkIcon",
      path: $parcel$interopDefault(r).createElement("g", {
          fill: "none",
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeWidth: "2"
      }, $parcel$interopDefault(r).createElement("path", {
          d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
      }), $parcel$interopDefault(r).createElement("path", {
          d: "M15 3h6v6"
      }), $parcel$interopDefault(r).createElement("path", {
          d: "M10 14L21 3"
      }))
  }),
  (0,
  i.createIcon)({
      displayName: "LinkIcon",
      path: $parcel$interopDefault(r).createElement("g", {
          fill: "currentColor"
      }, $parcel$interopDefault(r).createElement("path", {
          d: "M10.458,18.374,7.721,21.11a2.853,2.853,0,0,1-3.942,0l-.892-.891a2.787,2.787,0,0,1,0-3.941l5.8-5.8a2.789,2.789,0,0,1,3.942,0l.893.892A1,1,0,0,0,14.94,9.952l-.893-.892a4.791,4.791,0,0,0-6.771,0l-5.8,5.8a4.787,4.787,0,0,0,0,6.77l.892.891a4.785,4.785,0,0,0,6.771,0l2.736-2.735a1,1,0,1,0-1.414-1.415Z"
      }), $parcel$interopDefault(r).createElement("path", {
          d: "M22.526,2.363l-.892-.892a4.8,4.8,0,0,0-6.77,0l-2.905,2.9a1,1,0,0,0,1.414,1.414l2.9-2.9a2.79,2.79,0,0,1,3.941,0l.893.893a2.786,2.786,0,0,1,0,3.942l-5.8,5.8a2.769,2.769,0,0,1-1.971.817h0a2.766,2.766,0,0,1-1.969-.816,1,1,0,1,0-1.415,1.412,4.751,4.751,0,0,0,3.384,1.4h0a4.752,4.752,0,0,0,3.385-1.4l5.8-5.8a4.786,4.786,0,0,0,0-6.771Z"
      }))
  }),
  (0,
  i.createIcon)({
      displayName: "PlusSquareIcon",
      path: $parcel$interopDefault(r).createElement("g", {
          fill: "none",
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeWidth: "2"
      }, $parcel$interopDefault(r).createElement("rect", {
          height: "18",
          width: "18",
          rx: "2",
          ry: "2",
          x: "3",
          y: "3"
      }), $parcel$interopDefault(r).createElement("path", {
          d: "M12 8v8"
      }), $parcel$interopDefault(r).createElement("path", {
          d: "M8 12h8"
      }))
  }),
  (0,
  i.createIcon)({
      displayName: "CalendarIcon",
      viewBox: "0 0 14 14",
      d: "M10.8889,5.5 L3.11111,5.5 L3.11111,7.05556 L10.8889,7.05556 L10.8889,5.5 Z M12.4444,1.05556 L11.6667,1.05556 L11.6667,0 L10.1111,0 L10.1111,1.05556 L3.88889,1.05556 L3.88889,0 L2.33333,0 L2.33333,1.05556 L1.55556,1.05556 C0.692222,1.05556 0.00777777,1.75556 0.00777777,2.61111 L0,12.5 C0,13.3556 0.692222,14 1.55556,14 L12.4444,14 C13.3,14 14,13.3556 14,12.5 L14,2.61111 C14,1.75556 13.3,1.05556 12.4444,1.05556 Z M12.4444,12.5 L1.55556,12.5 L1.55556,3.94444 L12.4444,3.94444 L12.4444,12.5 Z M8.55556,8.61111 L3.11111,8.61111 L3.11111,10.1667 L8.55556,10.1667 L8.55556,8.61111 Z"
  }),
  (0,
  i.createIcon)({
      d: "M0.913134,0.920639 C1.49851,0.331726 2.29348,0 3.12342,0 L10.8766,0 C11.7065,0 12.5015,0.331725 13.0869,0.920639 C13.6721,1.50939 14,2.30689 14,3.13746 L14,8.12943 C13.9962,8.51443 13.9059,8.97125 13.7629,9.32852 C13.6128,9.683 13.3552,10.0709 13.0869,10.3462 C12.813,10.6163 12.4265,10.8761 12.0734,11.0274 C11.7172,11.1716 11.2607,11.263 10.8766,11.2669 L10.1234,11.2669 L10.1234,12.5676 L10.1209,12.5676 C10.1204,12.793 10.0633,13.0791 9.97807,13.262 C9.8627,13.466 9.61158,13.7198 9.40818,13.8382 L9.40824,13.8383 C9.4077,13.8386 9.40716,13.8388 9.40661,13.8391 C9.40621,13.8393 9.4058,13.8396 9.40539,13.8398 L9.40535,13.8397 C9.22958,13.9254 8.94505,13.9951 8.75059,14 L8.74789,14 C8.35724,13.9963 7.98473,13.8383 7.71035,13.5617 L5.39553,11.2669 L3.12342,11.2669 C2.29348,11.2669 1.49851,10.9352 0.913134,10.3462 C0.644826,10.0709 0.387187,9.683 0.23711,9.32852 C0.0941235,8.97125 0.00379528,8.51443 0,8.12943 L0,3.13746 C0,2.30689 0.327915,1.50939 0.913134,0.920639 Z M3.12342,1.59494 C2.71959,1.59494 2.33133,1.75628 2.04431,2.04503 C1.75713,2.33395 1.59494,2.72681 1.59494,3.13746 L1.59494,8.12943 C1.59114,8.35901 1.62114,8.51076 1.71193,8.72129 C1.79563,8.9346 1.88065,9.06264 2.04431,9.22185 C2.33133,9.5106 2.71959,9.67195 3.12342,9.67195 L5.72383,9.67195 C5.93413,9.67195 6.13592,9.75502 6.28527,9.90308 L8.52848,12.1269 L8.52848,10.4694 C8.52848,10.029 8.88552,9.67195 9.32595,9.67195 L10.8766,9.67195 C11.1034,9.67583 11.2517,9.64614 11.4599,9.55518 C11.6712,9.47132 11.7976,9.38635 11.9557,9.22185 C12.1193,9.06264 12.2044,8.9346 12.2881,8.72129 C12.3789,8.51076 12.4089,8.35901 12.4051,8.12943 L12.4051,3.13746 C12.4051,2.72681 12.2429,2.33394 11.9557,2.04503 C11.6687,1.75628 11.2804,1.59494 10.8766,1.59494 L3.12342,1.59494 Z",
      displayName: "ChatIcon",
      viewBox: "0 0 14 14"
  }),
  (0,
  i.createIcon)({
      displayName: "TimeIcon",
      path: $parcel$interopDefault(r).createElement("g", {
          fill: "currentColor"
      }, $parcel$interopDefault(r).createElement("path", {
          d: "M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z"
      }), $parcel$interopDefault(r).createElement("path", {
          d: "M17.134,15.81,12.5,11.561V6.5a1,1,0,0,0-2,0V12a1,1,0,0,0,.324.738l4.959,4.545a1.01,1.01,0,0,0,1.413-.061A1,1,0,0,0,17.134,15.81Z"
      }))
  }),
  (0,
  i.createIcon)({
      displayName: "ArrowRightIcon",
      path: $parcel$interopDefault(r).createElement("g", {
          fill: "currentColor"
      }, $parcel$interopDefault(r).createElement("path", {
          d: "M13.584,12a2.643,2.643,0,0,1-.775,1.875L3.268,23.416a1.768,1.768,0,0,1-2.5-2.5l8.739-8.739a.25.25,0,0,0,0-.354L.768,3.084a1.768,1.768,0,0,1,2.5-2.5l9.541,9.541A2.643,2.643,0,0,1,13.584,12Z"
      }), $parcel$interopDefault(r).createElement("path", {
          d: "M23.75,12a2.643,2.643,0,0,1-.775,1.875l-9.541,9.541a1.768,1.768,0,0,1-2.5-2.5l8.739-8.739a.25.25,0,0,0,0-.354L10.934,3.084a1.768,1.768,0,0,1,2.5-2.5l9.541,9.541A2.643,2.643,0,0,1,23.75,12Z"
      }))
  }),
  (0,
  i.createIcon)({
      displayName: "ArrowLeftIcon",
      path: $parcel$interopDefault(r).createElement("g", {
          fill: "currentColor"
      }, $parcel$interopDefault(r).createElement("path", {
          d: "M10.416,12a2.643,2.643,0,0,1,.775-1.875L20.732.584a1.768,1.768,0,0,1,2.5,2.5l-8.739,8.739a.25.25,0,0,0,0,.354l8.739,8.739a1.768,1.768,0,0,1-2.5,2.5l-9.541-9.541A2.643,2.643,0,0,1,10.416,12Z"
      }), $parcel$interopDefault(r).createElement("path", {
          d: "M.25,12a2.643,2.643,0,0,1,.775-1.875L10.566.584a1.768,1.768,0,0,1,2.5,2.5L4.327,11.823a.25.25,0,0,0,0,.354l8.739,8.739a1.768,1.768,0,0,1-2.5,2.5L1.025,13.875A2.643,2.643,0,0,1,.25,12Z"
      }))
  }),
  (0,
  i.createIcon)({
      displayName: "AtSignIcon",
      d: "M12,.5A11.634,11.634,0,0,0,.262,12,11.634,11.634,0,0,0,12,23.5a11.836,11.836,0,0,0,6.624-2,1.25,1.25,0,1,0-1.393-2.076A9.34,9.34,0,0,1,12,21a9.132,9.132,0,0,1-9.238-9A9.132,9.132,0,0,1,12,3a9.132,9.132,0,0,1,9.238,9v.891a1.943,1.943,0,0,1-3.884,0V12A5.355,5.355,0,1,0,12,17.261a5.376,5.376,0,0,0,3.861-1.634,4.438,4.438,0,0,0,7.877-2.736V12A11.634,11.634,0,0,0,12,.5Zm0,14.261A2.763,2.763,0,1,1,14.854,12,2.812,2.812,0,0,1,12,14.761Z"
  }),
  (0,
  i.createIcon)({
      displayName: "AttachmentIcon",
      d: "M21.843,3.455a6.961,6.961,0,0,0-9.846,0L1.619,13.832a5.128,5.128,0,0,0,7.252,7.252L17.3,12.653A3.293,3.293,0,1,0,12.646,8L7.457,13.184A1,1,0,1,0,8.871,14.6L14.06,9.409a1.294,1.294,0,0,1,1.829,1.83L7.457,19.67a3.128,3.128,0,0,1-4.424-4.424L13.411,4.869a4.962,4.962,0,1,1,7.018,7.018L12.646,19.67a1,1,0,1,0,1.414,1.414L21.843,13.3a6.96,6.96,0,0,0,0-9.846Z"
  }),
  (0,
  i.createIcon)({
      displayName: "UpDownIcon",
      viewBox: "-1 -1 9 11",
      d: "M 3.5 0L 3.98809 -0.569442L 3.5 -0.987808L 3.01191 -0.569442L 3.5 0ZM 3.5 9L 3.01191 9.56944L 3.5 9.98781L 3.98809 9.56944L 3.5 9ZM 0.488094 3.56944L 3.98809 0.569442L 3.01191 -0.569442L -0.488094 2.43056L 0.488094 3.56944ZM 3.01191 0.569442L 6.51191 3.56944L 7.48809 2.43056L 3.98809 -0.569442L 3.01191 0.569442ZM -0.488094 6.56944L 3.01191 9.56944L 3.98809 8.43056L 0.488094 5.43056L -0.488094 6.56944ZM 3.98809 9.56944L 7.48809 6.56944L 6.51191 5.43056L 3.01191 8.43056L 3.98809 9.56944Z"
  }),
  (0,
  i.createIcon)({
      d: "M23.555,8.729a1.505,1.505,0,0,0-1.406-.98H16.062a.5.5,0,0,1-.472-.334L13.405,1.222a1.5,1.5,0,0,0-2.81,0l-.005.016L8.41,7.415a.5.5,0,0,1-.471.334H1.85A1.5,1.5,0,0,0,.887,10.4l5.184,4.3a.5.5,0,0,1,.155.543L4.048,21.774a1.5,1.5,0,0,0,2.31,1.684l5.346-3.92a.5.5,0,0,1,.591,0l5.344,3.919a1.5,1.5,0,0,0,2.312-1.683l-2.178-6.535a.5.5,0,0,1,.155-.543l5.194-4.306A1.5,1.5,0,0,0,23.555,8.729Z",
      displayName: "StarIcon"
  }),
  (0,
  i.createIcon)({
      displayName: "EmailIcon",
      path: $parcel$interopDefault(r).createElement("g", {
          fill: "currentColor"
      }, $parcel$interopDefault(r).createElement("path", {
          d: "M11.114,14.556a1.252,1.252,0,0,0,1.768,0L22.568,4.87a.5.5,0,0,0-.281-.849A1.966,1.966,0,0,0,22,4H2a1.966,1.966,0,0,0-.289.021.5.5,0,0,0-.281.849Z"
      }), $parcel$interopDefault(r).createElement("path", {
          d: "M23.888,5.832a.182.182,0,0,0-.2.039l-6.2,6.2a.251.251,0,0,0,0,.354l5.043,5.043a.75.75,0,1,1-1.06,1.061l-5.043-5.043a.25.25,0,0,0-.354,0l-2.129,2.129a2.75,2.75,0,0,1-3.888,0L7.926,13.488a.251.251,0,0,0-.354,0L2.529,18.531a.75.75,0,0,1-1.06-1.061l5.043-5.043a.251.251,0,0,0,0-.354l-6.2-6.2a.18.18,0,0,0-.2-.039A.182.182,0,0,0,0,6V18a2,2,0,0,0,2,2H22a2,2,0,0,0,2-2V6A.181.181,0,0,0,23.888,5.832Z"
      }))
  }),
  (0,
  i.createIcon)({
      d: "M2.20731,0.0127209 C2.1105,-0.0066419 1.99432,-0.00664663 1.91687,0.032079 C0.871279,0.438698 0.212942,1.92964 0.0580392,2.95587 C-0.426031,6.28627 2.20731,9.17133 4.62766,11.0689 C6.77694,12.7534 10.9012,15.5223 13.3409,12.8503 C13.6507,12.5211 14.0186,12.037 13.9993,11.553 C13.9412,10.7397 13.186,10.1588 12.6051,9.71349 C12.1598,9.38432 11.2304,8.47427 10.6495,8.49363 C10.1267,8.51299 9.79754,9.05515 9.46837,9.38432 L8.88748,9.96521 C8.79067,10.062 7.55145,9.24878 7.41591,9.15197 C6.91248,8.8228 6.4284,8.45491 6.00242,8.04829 C5.57644,7.64167 5.18919,7.19632 4.86002,6.73161 C4.7632,6.59607 3.96933,5.41495 4.04678,5.31813 C4.04678,5.31813 4.72448,4.58234 4.91811,4.2919 C5.32473,3.67229 5.63453,3.18822 5.16982,2.45243 C4.99556,2.18135 4.78257,1.96836 4.55021,1.73601 C4.14359,1.34875 3.73698,0.942131 3.27227,0.612963 C3.02055,0.419335 2.59457,0.0708094 2.20731,0.0127209 Z",
      displayName: "PhoneIcon",
      viewBox: "0 0 14 14"
  }),
  (0,
  i.createIcon)({
      viewBox: "0 0 10 10",
      d: "M3,2 C2.44771525,2 2,1.55228475 2,1 C2,0.44771525 2.44771525,0 3,0 C3.55228475,0 4,0.44771525 4,1 C4,1.55228475 3.55228475,2 3,2 Z M3,6 C2.44771525,6 2,5.55228475 2,5 C2,4.44771525 2.44771525,4 3,4 C3.55228475,4 4,4.44771525 4,5 C4,5.55228475 3.55228475,6 3,6 Z M3,10 C2.44771525,10 2,9.55228475 2,9 C2,8.44771525 2.44771525,8 3,8 C3.55228475,8 4,8.44771525 4,9 C4,9.55228475 3.55228475,10 3,10 Z M7,2 C6.44771525,2 6,1.55228475 6,1 C6,0.44771525 6.44771525,0 7,0 C7.55228475,0 8,0.44771525 8,1 C8,1.55228475 7.55228475,2 7,2 Z M7,6 C6.44771525,6 6,5.55228475 6,5 C6,4.44771525 6.44771525,4 7,4 C7.55228475,4 8,4.44771525 8,5 C8,5.55228475 7.55228475,6 7,6 Z M7,10 C6.44771525,10 6,9.55228475 6,9 C6,8.44771525 6.44771525,8 7,8 C7.55228475,8 8,8.44771525 8,9 C8,9.55228475 7.55228475,10 7,10 Z",
      displayName: "DragHandleIcon"
  }),
  (0,
  i.createIcon)({
      displayName: "SpinnerIcon",
      path: $parcel$interopDefault(r).createElement($parcel$interopDefault(r).Fragment, null, $parcel$interopDefault(r).createElement("defs", null, $parcel$interopDefault(r).createElement("linearGradient", {
          x1: "28.154%",
          y1: "63.74%",
          x2: "74.629%",
          y2: "17.783%",
          id: "a"
      }, $parcel$interopDefault(r).createElement("stop", {
          stopColor: "currentColor",
          offset: "0%"
      }), $parcel$interopDefault(r).createElement("stop", {
          stopColor: "#fff",
          stopOpacity: "0",
          offset: "100%"
      }))), $parcel$interopDefault(r).createElement("g", {
          transform: "translate(2)",
          fill: "none"
      }, $parcel$interopDefault(r).createElement("circle", {
          stroke: "url(#a)",
          strokeWidth: "4",
          cx: "10",
          cy: "12",
          r: "10"
      }), $parcel$interopDefault(r).createElement("path", {
          d: "M10 2C4.477 2 0 6.477 0 12",
          stroke: "currentColor",
          strokeWidth: "4"
      }), $parcel$interopDefault(r).createElement("rect", {
          fill: "currentColor",
          x: "8",
          width: "4",
          height: "4",
          rx: "8"
      })))
  }),
  (0,
  i.createIcon)({
      displayName: "CloseIcon",
      d: "M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z"
  }),
  (0,
  i.createIcon)({
      displayName: "SmallCloseIcon",
      viewBox: "0 0 16 16",
      path: $parcel$interopDefault(r).createElement("path", {
          d: "M9.41 8l2.29-2.29c.19-.18.3-.43.3-.71a1.003 1.003 0 0 0-1.71-.71L8 6.59l-2.29-2.3a1.003 1.003 0 0 0-1.42 1.42L6.59 8 4.3 10.29c-.19.18-.3.43-.3.71a1.003 1.003 0 0 0 1.71.71L8 9.41l2.29 2.29c.18.19.43.3.71.3a1.003 1.003 0 0 0 .71-1.71L9.41 8z",
          fillRule: "evenodd",
          fill: "currentColor"
      })
  }),
  (0,
  i.createIcon)({
      d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z",
      displayName: "NotAllowedIcon"
  }),
  (0,
  i.createIcon)({
      d: "M21,5H3C2.621,5,2.275,5.214,2.105,5.553C1.937,5.892,1.973,6.297,2.2,6.6l9,12 c0.188,0.252,0.485,0.4,0.8,0.4s0.611-0.148,0.8-0.4l9-12c0.228-0.303,0.264-0.708,0.095-1.047C21.725,5.214,21.379,5,21,5z",
      displayName: "TriangleDownIcon"
  }),
  (0,
  i.createIcon)({
      d: "M12.8,5.4c-0.377-0.504-1.223-0.504-1.6,0l-9,12c-0.228,0.303-0.264,0.708-0.095,1.047 C2.275,18.786,2.621,19,3,19h18c0.379,0,0.725-0.214,0.895-0.553c0.169-0.339,0.133-0.744-0.095-1.047L12.8,5.4z",
      displayName: "TriangleUpIcon"
  }),
  (0,
  i.createIcon)({
      displayName: "InfoOutlineIcon",
      path: $parcel$interopDefault(r).createElement("g", {
          fill: "currentColor",
          stroke: "currentColor",
          strokeLinecap: "square",
          strokeWidth: "2"
      }, $parcel$interopDefault(r).createElement("circle", {
          cx: "12",
          cy: "12",
          fill: "none",
          r: "11",
          stroke: "currentColor"
      }), $parcel$interopDefault(r).createElement("line", {
          fill: "none",
          x1: "11.959",
          x2: "11.959",
          y1: "11",
          y2: "17"
      }), $parcel$interopDefault(r).createElement("circle", {
          cx: "11.959",
          cy: "7",
          r: "1",
          stroke: "none"
      }))
  }),
  (0,
  i.createIcon)({
      displayName: "BellIcon",
      d: "M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"
  }),
  (0,
  i.createIcon)({
      d: "M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm.25,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12.25,5ZM14.5,18.5h-4a1,1,0,0,1,0-2h.75a.25.25,0,0,0,.25-.25v-4.5a.25.25,0,0,0-.25-.25H10.5a1,1,0,0,1,0-2h1a2,2,0,0,1,2,2v4.75a.25.25,0,0,0,.25.25h.75a1,1,0,1,1,0,2Z"
  }),
  (0,
  i.createIcon)({
      d: "M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,19a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,12,19Zm1.6-6.08a1,1,0,0,0-.6.917,1,1,0,1,1-2,0,3,3,0,0,1,1.8-2.75A2,2,0,1,0,10,9.255a1,1,0,1,1-2,0,4,4,0,1,1,5.6,3.666Z",
      displayName: "QuestionIcon"
  }),
  (0,
  i.createIcon)({
      displayName: "QuestionOutlineIcon",
      path: $parcel$interopDefault(r).createElement("g", {
          stroke: "currentColor",
          strokeWidth: "1.5"
      }, $parcel$interopDefault(r).createElement("path", {
          strokeLinecap: "round",
          fill: "none",
          d: "M9,9a3,3,0,1,1,4,2.829,1.5,1.5,0,0,0-1,1.415V14.25"
      }), $parcel$interopDefault(r).createElement("path", {
          fill: "none",
          strokeLinecap: "round",
          d: "M12,17.25a.375.375,0,1,0,.375.375A.375.375,0,0,0,12,17.25h0"
      }), $parcel$interopDefault(r).createElement("circle", {
          fill: "none",
          strokeMiterlimit: "10",
          cx: "12",
          cy: "12",
          r: "11.25"
      }))
  }),
  (0,
  i.createIcon)({
      d: "M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z",
      displayName: "WarningIcon"
  }),
  (0,
  i.createIcon)({
      displayName: "WarningTwoIcon",
      d: "M23.119,20,13.772,2.15h0a2,2,0,0,0-3.543,0L.881,20a2,2,0,0,0,1.772,2.928H21.347A2,2,0,0,0,23.119,20ZM11,8.423a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Zm1.05,11.51h-.028a1.528,1.528,0,0,1-1.522-1.47,1.476,1.476,0,0,1,1.448-1.53h.028A1.527,1.527,0,0,1,13.5,18.4,1.475,1.475,0,0,1,12.05,19.933Z"
  }),
  (0,
  i.createIcon)({
      viewBox: "0 0 14 14",
      path: $parcel$interopDefault(r).createElement("g", {
          fill: "currentColor"
      }, $parcel$interopDefault(r).createElement("polygon", {
          points: "5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"
      }))
  }),
  (0,
  i.createIcon)({
      displayName: "MinusIcon",
      path: $parcel$interopDefault(r).createElement("g", {
          fill: "currentColor"
      }, $parcel$interopDefault(r).createElement("rect", {
          height: "4",
          width: "20",
          x: "2",
          y: "10"
      }))
  }),
  (0,
  i.createIcon)({
      displayName: "HamburgerIcon",
      viewBox: "0 0 24 24",
      d: "M 3 5 A 1.0001 1.0001 0 1 0 3 7 L 21 7 A 1.0001 1.0001 0 1 0 21 5 L 3 5 z M 3 11 A 1.0001 1.0001 0 1 0 3 13 L 21 13 A 1.0001 1.0001 0 1 0 21 11 L 3 11 z M 3 17 A 1.0001 1.0001 0 1 0 3 19 L 21 19 A 1.0001 1.0001 0 1 0 21 17 L 3 17 z"
  })
}
)),
parcelRequire.register("aZ6L6", (function(t, e) {
  $parcel$export(t.exports, "deposit", (function() {
      return u
  }
  ));
  var r = parcelRequire("8JMkz")
    , i = parcelRequire("6AcGf")
    , n = parcelRequire("6xYxg")
    , o = parcelRequire("cubqg")
    , s = parcelRequire("bdjQ6").Buffer;
  const a = 2 * o.LEVELS * (Math.ceil(20) + 1);
  async function u(t, e) {
      if (null === o.program)
          throw new Error("program is null");
      const [u,l] = await r.web3.PublicKey.findProgramAddress([s.from("merkle")], o.OTTER_PROGRAM_ID);
      if (null === await o.program.provider.connection.getAccountInfo(u)) {
          const t = await o.program.rpc.initialize(l, {
              accounts: {
                  merkleState: u,
                  user: o.program.provider.wallet.publicKey,
                  systemProgram: r.web3.SystemProgram.programId
              },
              signers: []
          });
          await o.program.provider.connection.confirmTransaction(t, "finalized")
      }
      const [c,h] = await async function(t, e, s, a) {
          const u = (0,
          i.randomBytes)(62);
          if (124 !== u.toString("hex").length)
              throw Error("Invalid generated preimage.");
          const l = n.babyJub.unpackPoint(n.pedersenHash.hash(u))[0].beInt2Buff(32)
            , c = r.web3.Keypair.generate()
            , h = new r.web3.Transaction;
          let A;
          h.add(o.program.instruction.depositInit(e, l, {
              accounts: {
                  depositState: c.publicKey,
                  merkleState: t,
                  user: o.program.provider.wallet.publicKey,
                  systemProgram: r.web3.SystemProgram.programId
              },
              signers: [c]
          })),
          h.feePayer = o.program.provider.wallet.publicKey,
          h.recentBlockhash = (await o.program.provider.connection.getRecentBlockhash()).blockhash,
          await (0,
          o.errorToast)(a, "Signature was rejected", (async()=>{
              A = await o.program.provider.wallet.signTransaction(h)
          }
          )),
          A.partialSign(c),
          s("Sending transaction 1 of 3");
          const f = await o.program.provider.connection.sendRawTransaction(A.serialize(), {
              skipPreflight: !1,
              maxRetries: 1024
          });
          let p;
          s("Confirming transaction 1 of 3"),
          await (0,
          o.errorToast)(a, "Failed to confirm transaction 1 of 3", (async()=>{
              await o.program.provider.connection.confirmTransaction(f, "confirmed")
          }
          )),
          await (0,
          o.sleep)(15e3),
          await (0,
          o.errorToast)(a, "Failed to fetch depositState", (async()=>{
              p = await o.program.account.depositState.fetch(c.publicKey)
          }
          ));
          const g = {
              preimage: u,
              startingFilledSubtrees: p.newFilledSubtrees
          };
          return [c, g]
      }(u, l, t, e);
      await async function(t, e, i) {
          const n = [];
          for (let e = 0; e < a; e++) {
              const r = o.program.instruction.depositAdvance(Math.floor(e / 7), {
                  accounts: {
                      depositState: t.publicKey
                  }
              });
              n.push(r)
          }
          const s = [];
          for (let t = 0; t < Math.ceil(a / 7); t++) {
              const e = new r.web3.Transaction;
              for (const r of n.slice(7 * t, 7 * (t + 1)))
                  e.add(r);
              s.push({
                  tx: e,
                  signers: []
              })
          }
          let u = 0;
          await async function t(r, n) {
              n && e("Signing transaction 2 of 3");
              const a = await o.program.provider.connection.getRecentBlockhash()
                , l = r.map((t=>{
                  const e = t.tx;
                  let r = t.signers;
                  return void 0 === r && (r = []),
                  e.feePayer = o.program.provider.wallet.publicKey,
                  e.recentBlockhash = a.blockhash,
                  r.filter((t=>void 0 !== t)).forEach((t=>{
                      e.partialSign(t)
                  }
                  )),
                  e
              }
              ));
              let c;
              await (0,
              o.errorToast)(i, "Signature was rejected", (async()=>{
                  c = await o.program.provider.wallet.signAllTransactions(l)
              }
              )),
              n && e("Sending transaction 2 of 3");
              const h = await Promise.all(c.map((async t=>{
                  const e = t.serialize();
                  return await o.program.provider.connection.sendRawTransaction(e, {
                      skipPreflight: !0,
                      maxRetries: 1024
                  })
              }
              )));
              n && e("Confirming transaction 2 of 3");
              const A = await Promise.all(h.map((async(t,r)=>{
                  let i = !1
                    , n = !1;
                  (async()=>{
                      for (; !i && !n; ) {
                          const t = c[r].serialize();
                          await o.program.provider.connection.sendRawTransaction(t, {
                              skipPreflight: !0,
                              maxRetries: 16
                          }),
                          await (0,
                          o.sleep)(300)
                      }
                  }
                  )();
                  try {
                      await o.program.provider.connection.confirmTransaction(t, "confirmed")
                  } catch (t) {
                      return n = !0,
                      !1
                  }
                  return i = !0,
                  u += 1,
                  e("Confirming transaction 2 of 3", `${(100 * u / s.length).toFixed(0)}% confirmed`),
                  !0
              }
              )))
                , f = r.filter(((t,e)=>!A[e]));
              f.length > 0 && await t(f, !1)
          }(s, !0)
      }(c, t, e);
      const A = await async function(t, e, i, n, a, u) {
          a("Signing transaction 3 of 3");
          const l = new r.web3.Transaction;
          let c, h;
          l.add(o.program.instruction.depositFinalize(e, {
              accounts: {
                  depositState: i.publicKey,
                  merkleState: t,
                  user: o.program.provider.wallet.publicKey,
                  systemProgram: r.web3.SystemProgram.programId
              }
          })),
          l.feePayer = o.program.provider.wallet.publicKey,
          l.recentBlockhash = (await o.program.provider.connection.getRecentBlockhash()).blockhash,
          await (0,
          o.errorToast)(u, "Signature was rejected", (async()=>{
              c = await o.program.provider.wallet.signTransaction(l)
          }
          )),
          a("Sending transaction 3 of 3"),
          await (0,
          o.errorToast)(u, "Error during finalization", (async()=>{
              h = await o.program.provider.connection.sendRawTransaction(c.serialize(), {
                  skipPreflight: !0,
                  maxRetries: 1024
              })
          }
          ));
          let A = s.alloc(0);
          for (const t of n.startingFilledSubtrees)
              A = s.concat([A, s.from(t)]);
          const f = `otter-${h}-${n.preimage.toString("hex")}-${A.toString("hex")}-${o.program.programId}`;
          return console.log("Note:", f),
          a("Confirming transaction 3 of 3"),
          await (0,
          o.errorToast)(u, "Failed to confirm transaction 3 of 3", (async()=>{
              await o.program.provider.connection.confirmTransaction(h, "confirmed")
          }
          )),
          f
      }(u, l, c, h, t, e);
      return A
  }
}
)),
parcelRequire.register("2gWC8", (function(t, e) {
  t.exports = new URL(parcelRequire("4SSe9").resolve("8Es5C"),import.meta.url).toString()
}
)),
parcelRequire.register("9EfUs", (function(t, e) {
  $parcel$export(t.exports, "RELAYER", (function() {
      return h
  }
  )),
  $parcel$export(t.exports, "WithdrawModal", (function() {
      return A
  }
  )),
  $parcel$export(t.exports, "Withdraw", (function() {
      return f
  }
  ));
  var r = parcelRequire("bbzbN")
    , i = parcelRequire("7fPBF")
    , n = parcelRequire("jbMlT")
    , o = parcelRequire("8JMkz")
    , s = parcelRequire("gkS1M")
    , a = parcelRequire("i0uae")
    , u = parcelRequire("cubqg")
    , l = parcelRequire("2gWC8");
  const c = new o.web3.PublicKey("58PwtjSDuFHuUkYjH9BYnnQKHfwo9reZhC2zMJv9JPkx")
    , h = "otter-relayer";
  function A(t) {
      return (0,
      r.jsxs)(n.Modal, {
          isOpen: t.isOpen,
          onClose: ()=>{
              t.withdrawResetState(),
              t.onClose()
          }
          ,
          closeOnOverlayClick: 1 === t.withdrawModalStage,
          closeOnEsc: 1 === t.withdrawModalStage,
          isCentered: !0,
          size: "lg",
          children: [(0,
          r.jsx)(n.ModalOverlay, {}), (0,
          r.jsx)(n.ModalContent, {
              bg: "champagne",
              p: "1% 1% 2% 1%",
              borderRadius: "10px",
              children: {
                  0: (0,
                  r.jsxs)(r.Fragment, {
                      children: [(0,
                      r.jsx)(n.ModalHeader, {
                          children: `Withdrawing ${1 - t.withdrawRelayerFee / o.web3.LAMPORTS_PER_SOL} SOL`
                      }), (0,
                      r.jsxs)(n.ModalBody, {
                          children: [(0,
                          r.jsx)(n.Spinner, {
                              color: "bistre",
                              size: "xl"
                          }), (0,
                          r.jsx)(n.Text, {
                              mt: "5%",
                              children: t.withdrawModalStageZeroLoadingText
                          })]
                      })]
                  }),
                  1: (0,
                  r.jsxs)(r.Fragment, {
                      children: [(0,
                      r.jsx)(n.ModalHeader, {
                          children: `Withdrew ${1 - t.withdrawRelayerFee / o.web3.LAMPORTS_PER_SOL} SOL!`
                      }), (0,
                      r.jsx)(n.ModalCloseButton, {}), (0,
                      r.jsxs)(n.ModalBody, {
                          children: [(0,
                          r.jsx)(n.Center, {
                              mt: "5%",
                              children: (0,
                              r.jsx)("img", {
                                  src: $parcel$interopDefault(l)
                              })
                          }), (0,
                          r.jsx)(n.Text, {
                              mt: "5%",
                              children: 1 - t.withdrawRelayerFee / o.web3.LAMPORTS_PER_SOL + " SOL has been credited to account"
                          }), (0,
                          r.jsx)(n.Text, {
                              mt: "0%",
                              fontFamily: "Courier",
                              children: t.withdrawInputRecipient
                          })]
                      })]
                  })
              }[t.withdrawModalStage]
          })]
      })
  }
  console.log("Relayer:", h + ".sol");
  class f extends $parcel$interopDefault(i).Component {
      async componentDidMount() {
          const t = await (0,
          s.getHashedName)(h)
            , e = await (0,
          s.getNameAccountKey)(t, void 0, c)
            , r = "https://" + (await s.NameRegistryState.retrieve(u.connection, e)).registry.data.toString().replace(/\0/g, "")
            , i = await fetch(r + "/feeAndAddress").then((t=>t.json()));
          this.props.withdrawSetState({
              withdrawRelayerFee: i.fee,
              withdrawRelayerAddress: i.address,
              withdrawRelayerUrlBase: r
          })
      }
      render() {
          const t = this.props.withdrawInputNote.length > 0 && (5 !== this.props.withdrawInputNote.split("-").length || this.props.withdrawInputNote.includes(" "))
            , e = this.props.withdrawInputRecipient.length > 0 && this.props.withdrawInputRecipient.includes(" ")
            , i = t || this.props.withdrawInputNoteIsSpent || this.props.withdrawInputNoteNeverDeposited || e || 0 === this.props.withdrawInputNote.length || 0 === this.props.withdrawInputRecipient.length;
          let s = "";
          return t ? s = "Invalid note." : this.props.withdrawInputNoteIsSpent ? s = "Note has already been spent." : this.props.withdrawInputNoteNeverDeposited && (s = "Note was never deposited."),
          (0,
          r.jsxs)(n.Box, {
              m: "6% 8% 6% 8%",
              children: [(0,
              r.jsx)(n.Text, {
                  fontSize: ["0.9em", "1.2em"],
                  textAlign: "left",
                  children: "Secret Note"
              }), (0,
              r.jsxs)(n.FormControl, {
                  isInvalid: t || this.props.withdrawInputNoteIsSpent || this.props.withdrawInputNoteNeverDeposited,
                  children: [(0,
                  r.jsx)(n.Input, {
                      value: this.props.withdrawInputNote,
                      onChange: t=>{
                          this.props.withdrawSetState({
                              withdrawInputNote: t.target.value
                          })
                      }
                      ,
                      placeholder: "Paste your secret note",
                      borderColor: "bistre",
                      focusBorderColor: "bistre",
                      fontSize: ["0.8em", "1.0em"],
                      fontFamily: "Courier",
                      color: "bistre",
                      opacity: "70%",
                      _hover: {
                          borderColor: "bistre"
                      },
                      _placeholder: {
                          color: "bistre"
                      }
                  }), (0,
                  r.jsx)(n.FormErrorMessage, {
                      children: s
                  })]
              }), (0,
              r.jsx)(n.Text, {
                  mt: "5%",
                  fontSize: ["0.9em", "1.2em"],
                  textAlign: "left",
                  children: "Withdraw Address"
              }), (0,
              r.jsxs)(n.FormControl, {
                  isInvalid: e,
                  children: [(0,
                  r.jsx)(n.Input, {
                      value: this.props.withdrawInputRecipient,
                      onChange: t=>{
                          this.props.withdrawSetState({
                              withdrawInputRecipient: t.target.value
                          })
                      }
                      ,
                      mt: "1%",
                      placeholder: "Address to receive the funds",
                      borderColor: "bistre",
                      focusBorderColor: "bistre",
                      fontSize: ["0.8em", "1.0em"],
                      fontFamily: "Courier",
                      color: "bistre",
                      opacity: "70%",
                      _hover: {
                          borderColor: "bistre"
                      },
                      _placeholder: {
                          color: "bistre"
                      }
                  }), (0,
                  r.jsx)(n.FormErrorMessage, {
                      children: "Invalid address."
                  })]
              }), (0,
              r.jsx)(a.DepositWithdrawButton, {
                  isDeposit: !1,
                  isManuallyPaused: this.state.isManuallyPaused,
                  disableClick: i,
                  onClick: async()=>{
                      "" !== this.props.withdrawRelayerAddress && null !== this.props.withdrawRelayerFee && (this.props.onOpenModal(),
                      await this.props.performWithdraw())
                  }
                  ,
                  text: null === this.props.withdrawRelayerFee ? "Withdraw SOL" : `Withdraw ${1 - this.props.withdrawRelayerFee / o.web3.LAMPORTS_PER_SOL} SOL`,
                  style: {
                      w: ["90%", "65%"],
                      mt: "8%",
                      fontSize: ["0.9em", "1.1em"]
                  }
              }), (0,
              r.jsx)(n.Text, {
                  mt: "2%",
                  fontSize: ["0.6em", "0.8em"],
                  opacity: "70%",
                  children: null === this.props.withdrawRelayerFee ? null : `${h}.sol charges a ${this.props.withdrawRelayerFee / o.web3.LAMPORTS_PER_SOL} SOL relay fee`
              })]
          })
      }
      constructor(t) {
          super(t),
          this.state = {
              isManuallyPaused: !1
          }
      }
  }
}
)),
parcelRequire.register("gkS1M", (function(t, e) {
  var r = t.exports && t.exports.__createBinding || (Object.create ? function(t, e, r, i) {
      void 0 === i && (i = r);
      var n = Object.getOwnPropertyDescriptor(e, r);
      n && !("get"in n ? !e.__esModule : n.writable || n.configurable) || (n = {
          enumerable: !0,
          get: function() {
              return e[r]
          }
      }),
      Object.defineProperty(t, i, n)
  }
  : function(t, e, r, i) {
      void 0 === i && (i = r),
      t[i] = e[r]
  }
  )
    , i = t.exports && t.exports.__exportStar || function(t, e) {
      for (var i in t)
          "default" === i || Object.prototype.hasOwnProperty.call(e, i) || r(e, t, i)
  }
  ;
  Object.defineProperty(t.exports, "__esModule", {
      value: !0
  }),
  i(parcelRequire("hAmoF"), t.exports),
  i(parcelRequire("lGN8w"), t.exports),
  i(parcelRequire("8y9KR"), t.exports),
  i(parcelRequire("hImnM"), t.exports),
  i(parcelRequire("lzOAy"), t.exports),
  i(parcelRequire("hAmoF"), t.exports),
  i(parcelRequire("4q37x"), t.exports),
  i(parcelRequire("2hvv8"), t.exports),
  i(parcelRequire("idgFu"), t.exports),
  i(parcelRequire("lkF0u"), t.exports),
  i(parcelRequire("cd1Oh"), t.exports),
  i(parcelRequire("bhYww"), t.exports),
  i(parcelRequire("702hk"), t.exports),
  i(parcelRequire("7q7VB"), t.exports)
}
)),
parcelRequire.register("hAmoF", (function(t, e) {
  var r = parcelRequire("bdjQ6").Buffer
    , i = t.exports && t.exports.__importDefault || function(t) {
      return t && t.__esModule ? t : {
          default: t
      }
  }
  ;
  Object.defineProperty(t.exports, "__esModule", {
      value: !0
  }),
  t.exports.getAllRegisteredDomains = t.exports.getAllDomains = t.exports.getDomainKey = t.exports.findSubdomains = t.exports.performReverseLookupBatch = t.exports.getDNSRecordAddress = t.exports.performReverseLookup = t.exports.getNameAccountKey = t.exports.getHashedName = t.exports.getNameOwner = void 0;
  var n = parcelRequire("1I0vV");
  const o = i(parcelRequire("aVh2m"));
  var s = parcelRequire("87sj1")
    , a = parcelRequire("lkF0u")
    , u = parcelRequire("8y9KR");
  a = parcelRequire("lkF0u");
  async function l(t) {
      const e = a.HASH_PREFIX + t
        , i = (0,
      s.sha256)(r.from(e, "utf8")).slice(2);
      return r.from(i, "hex")
  }
  async function c(t, e, i) {
      const o = [t];
      e ? o.push(e.toBuffer()) : o.push(r.alloc(32)),
      i ? o.push(i.toBuffer()) : o.push(r.alloc(32));
      const [s] = await n.PublicKey.findProgramAddress(o, a.NAME_PROGRAM_ID);
      return s
  }
  t.exports.getNameOwner = async function(t, e) {
      if (!await t.getAccountInfo(e))
          throw new Error("Unable to find the given account.");
      return u.NameRegistryState.retrieve(t, e)
  }
  ,
  t.exports.getHashedName = l,
  t.exports.getNameAccountKey = c,
  t.exports.performReverseLookup = async function(t, e) {
      const r = await l(e.toBase58())
        , i = await c(r, a.REVERSE_LOOKUP_CLASS)
        , {registry: n} = await u.NameRegistryState.retrieve(t, i);
      if (!n.data)
          throw "Could not retrieve name data";
      const s = new o.default(n.data.slice(0, 4),"le").toNumber();
      return n.data.slice(4, 4 + s).toString()
  }
  ,
  t.exports.getDNSRecordAddress = async function(t, e) {
      const r = await l("\0".concat(e));
      return await c(r, void 0, t)
  }
  ,
  t.exports.performReverseLookupBatch = async function(t, e) {
      let r = [];
      for (let t of e) {
          const e = await l(t.toBase58())
            , i = await c(e, a.REVERSE_LOOKUP_CLASS);
          r.push(i)
      }
      return (await u.NameRegistryState.retrieveBatch(t, r)).map((t=>{
          if (void 0 === t || void 0 === t.data)
              return;
          let e = new o.default(t.data.slice(0, 4),"le").toNumber();
          return t.data.slice(4, 4 + e).toString()
      }
      ))
  }
  ;
  t.exports.findSubdomains = async(t,e)=>{
      const r = [{
          memcmp: {
              offset: 0,
              bytes: e.toBase58()
          }
      }, {
          memcmp: {
              offset: 64,
              bytes: a.REVERSE_LOOKUP_CLASS.toBase58()
          }
      }];
      return (await t.getProgramAccounts(a.NAME_PROGRAM_ID, {
          filters: r
      })).map((t=>{
          var e;
          return null === (e = t.account.data.slice(97).toString("utf-8")) || void 0 === e ? void 0 : e.split("\0").join("")
      }
      ))
  }
  ;
  const h = async(t,e=a.ROOT_DOMAIN_ACCOUNT)=>{
      let r = await l(t);
      return {
          pubkey: await c(r, void 0, e),
          hashed: r
      }
  }
  ;
  t.exports.getDomainKey = async(t,e=!1)=>{
      t.endsWith(".sol") && (t = t.slice(0, -4));
      const i = t.split(".");
      if (2 === i.length) {
          const t = r.from([e ? 1 : 0]).toString().concat(i[0])
            , {pubkey: n} = await h(i[1]);
          return {
              ...await h(t, n),
              isSub: !0,
              parent: n
          }
      }
      if (i.length > 2)
          throw new Error("Invalid derivation input");
      return {
          ...await h(t, a.ROOT_DOMAIN_ACCOUNT),
          isSub: !1,
          parent: void 0
      }
  }
  ,
  t.exports.getAllDomains = async function(t, e) {
      const r = [{
          memcmp: {
              offset: 32,
              bytes: e.toBase58()
          }
      }, {
          memcmp: {
              offset: 0,
              bytes: a.ROOT_DOMAIN_ACCOUNT.toBase58()
          }
      }];
      return (await t.getProgramAccounts(a.NAME_PROGRAM_ID, {
          filters: r
      })).map((t=>t.pubkey))
  }
  ;
  t.exports.getAllRegisteredDomains = async t=>{
      const e = [{
          memcmp: {
              offset: 0,
              bytes: a.ROOT_DOMAIN_ACCOUNT.toBase58()
          }
      }];
      return await t.getProgramAccounts(a.NAME_PROGRAM_ID, {
          dataSlice: {
              offset: 32,
              length: 32
          },
          filters: e
      })
  }
}
)),
parcelRequire.register("87sj1", (function(t, e) {
  $parcel$export(t.exports, "sha256", (function() {
      return s
  }
  ));
  var r = parcelRequire("gVjbv")
    , i = parcelRequire("dRvGc")
    , n = (parcelRequire("4GDdA"),
  parcelRequire("7EMRo"))
    , o = parcelRequire("hEEIE");
  new (0,
  n.Logger)(o.version);
  function s(t) {
      return "0x" + $parcel$interopDefault(r).sha256().update((0,
      i.arrayify)(t)).digest("hex")
  }
}
)),
parcelRequire.register("dRvGc", (function(t, e) {
  $parcel$export(t.exports, "arrayify", (function() {
      return l
  }
  ));
  var r = parcelRequire("7EMRo")
    , i = parcelRequire("kJt1A");
  const n = new (0,
  r.Logger)(i.version);
  function o(t) {
      return !!t.toHexString
  }
  function s(t) {
      return t.slice || (t.slice = function() {
          const e = Array.prototype.slice.call(arguments);
          return s(new Uint8Array(Array.prototype.slice.apply(t, e)))
      }
      ),
      t
  }
  function a(t) {
      return "number" == typeof t && t == t && t % 1 == 0
  }
  function u(t) {
      if (null == t)
          return !1;
      if (t.constructor === Uint8Array)
          return !0;
      if ("string" == typeof t)
          return !1;
      if (!a(t.length) || t.length < 0)
          return !1;
      for (let e = 0; e < t.length; e++) {
          const r = t[e];
          if (!a(r) || r < 0 || r >= 256)
              return !1
      }
      return !0
  }
  function l(t, e) {
      if (e || (e = {}),
      "number" == typeof t) {
          n.checkSafeUint53(t, "invalid arrayify value");
          const e = [];
          for (; t; )
              e.unshift(255 & t),
              t = parseInt(String(t / 256));
          return 0 === e.length && e.push(0),
          s(new Uint8Array(e))
      }
      if (e.allowMissingPrefix && "string" == typeof t && "0x" !== t.substring(0, 2) && (t = "0x" + t),
      o(t) && (t = t.toHexString()),
      c(t)) {
          let r = t.substring(2);
          r.length % 2 && ("left" === e.hexPad ? r = "0" + r : "right" === e.hexPad ? r += "0" : n.throwArgumentError("hex data is odd-length", "value", t));
          const i = [];
          for (let t = 0; t < r.length; t += 2)
              i.push(parseInt(r.substring(t, t + 2), 16));
          return s(new Uint8Array(i))
      }
      return u(t) ? s(new Uint8Array(t)) : n.throwArgumentError("invalid arrayify value", "value", t)
  }
  function c(t, e) {
      return !("string" != typeof t || !t.match(/^0x[0-9A-Fa-f]*$/)) && (!e || t.length === 2 + 2 * e)
  }
}
)),
parcelRequire.register("7EMRo", (function(t, e) {
  $parcel$export(t.exports, "Logger", (function() {
      return p
  }
  ));
  var r = parcelRequire("fXl0V");
  let i = !1
    , n = !1;
  const o = {
      debug: 1,
      default: 2,
      info: 2,
      warning: 3,
      error: 4,
      off: 5
  };
  let s = o.default
    , a = null;
  const u = function() {
      try {
          const t = [];
          if (["NFD", "NFC", "NFKD", "NFKC"].forEach((e=>{
              try {
                  if ("test" !== "test".normalize(e))
                      throw new Error("bad normalize")
              } catch (r) {
                  t.push(e)
              }
          }
          )),
          t.length)
              throw new Error("missing " + t.join(", "));
          if (String.fromCharCode(233).normalize("NFD") !== String.fromCharCode(101, 769))
              throw new Error("broken implementation")
      } catch (t) {
          return t.message
      }
      return null
  }();
  var l, c, h, A;
  (c = l || (l = {})).DEBUG = "DEBUG",
  c.INFO = "INFO",
  c.WARNING = "WARNING",
  c.ERROR = "ERROR",
  c.OFF = "OFF",
  (A = h || (h = {})).UNKNOWN_ERROR = "UNKNOWN_ERROR",
  A.NOT_IMPLEMENTED = "NOT_IMPLEMENTED",
  A.UNSUPPORTED_OPERATION = "UNSUPPORTED_OPERATION",
  A.NETWORK_ERROR = "NETWORK_ERROR",
  A.SERVER_ERROR = "SERVER_ERROR",
  A.TIMEOUT = "TIMEOUT",
  A.BUFFER_OVERRUN = "BUFFER_OVERRUN",
  A.NUMERIC_FAULT = "NUMERIC_FAULT",
  A.MISSING_NEW = "MISSING_NEW",
  A.INVALID_ARGUMENT = "INVALID_ARGUMENT",
  A.MISSING_ARGUMENT = "MISSING_ARGUMENT",
  A.UNEXPECTED_ARGUMENT = "UNEXPECTED_ARGUMENT",
  A.CALL_EXCEPTION = "CALL_EXCEPTION",
  A.INSUFFICIENT_FUNDS = "INSUFFICIENT_FUNDS",
  A.NONCE_EXPIRED = "NONCE_EXPIRED",
  A.REPLACEMENT_UNDERPRICED = "REPLACEMENT_UNDERPRICED",
  A.UNPREDICTABLE_GAS_LIMIT = "UNPREDICTABLE_GAS_LIMIT",
  A.TRANSACTION_REPLACED = "TRANSACTION_REPLACED",
  A.ACTION_REJECTED = "ACTION_REJECTED";
  const f = "0123456789abcdef";
  class p {
      _log(t, e) {
          const r = t.toLowerCase();
          null == o[r] && this.throwArgumentError("invalid log level name", "logLevel", t),
          s > o[r] || console.log.apply(console, e)
      }
      debug(...t) {
          this._log(p.levels.DEBUG, t)
      }
      info(...t) {
          this._log(p.levels.INFO, t)
      }
      warn(...t) {
          this._log(p.levels.WARNING, t)
      }
      makeError(t, e, r) {
          if (n)
              return this.makeError("censored error", e, {});
          e || (e = p.errors.UNKNOWN_ERROR),
          r || (r = {});
          const i = [];
          Object.keys(r).forEach((t=>{
              const e = r[t];
              try {
                  if (e instanceof Uint8Array) {
                      let r = "";
                      for (let t = 0; t < e.length; t++)
                          r += f[e[t] >> 4],
                          r += f[15 & e[t]];
                      i.push(t + "=Uint8Array(0x" + r + ")")
                  } else
                      i.push(t + "=" + JSON.stringify(e))
              } catch (e) {
                  i.push(t + "=" + JSON.stringify(r[t].toString()))
              }
          }
          )),
          i.push(`code=${e}`),
          i.push(`version=${this.version}`);
          const o = t;
          let s = "";
          switch (e) {
          case h.NUMERIC_FAULT:
              {
                  s = "NUMERIC_FAULT";
                  const e = t;
                  switch (e) {
                  case "overflow":
                  case "underflow":
                  case "division-by-zero":
                      s += "-" + e;
                      break;
                  case "negative-power":
                  case "negative-width":
                      s += "-unsupported";
                      break;
                  case "unbound-bitwise-result":
                      s += "-unbound-result"
                  }
                  break
              }
          case h.CALL_EXCEPTION:
          case h.INSUFFICIENT_FUNDS:
          case h.MISSING_NEW:
          case h.NONCE_EXPIRED:
          case h.REPLACEMENT_UNDERPRICED:
          case h.TRANSACTION_REPLACED:
          case h.UNPREDICTABLE_GAS_LIMIT:
              s = e
          }
          s && (t += " [ See: https://links.ethers.org/v5-errors-" + s + " ]"),
          i.length && (t += " (" + i.join(", ") + ")");
          const a = new Error(t);
          return a.reason = o,
          a.code = e,
          Object.keys(r).forEach((function(t) {
              a[t] = r[t]
          }
          )),
          a
      }
      throwError(t, e, r) {
          throw this.makeError(t, e, r)
      }
      throwArgumentError(t, e, r) {
          return this.throwError(t, p.errors.INVALID_ARGUMENT, {
              argument: e,
              value: r
          })
      }
      assert(t, e, r, i) {
          t || this.throwError(e, r, i)
      }
      assertArgument(t, e, r, i) {
          t || this.throwArgumentError(e, r, i)
      }
      checkNormalize(t) {
          null == t && (t = "platform missing String.prototype.normalize"),
          u && this.throwError("platform missing String.prototype.normalize", p.errors.UNSUPPORTED_OPERATION, {
              operation: "String.prototype.normalize",
              form: u
          })
      }
      checkSafeUint53(t, e) {
          "number" == typeof t && (null == e && (e = "value not safe"),
          (t < 0 || t >= 9007199254740991) && this.throwError(e, p.errors.NUMERIC_FAULT, {
              operation: "checkSafeInteger",
              fault: "out-of-safe-range",
              value: t
          }),
          t % 1 && this.throwError(e, p.errors.NUMERIC_FAULT, {
              operation: "checkSafeInteger",
              fault: "non-integer",
              value: t
          }))
      }
      checkArgumentCount(t, e, r) {
          r = r ? ": " + r : "",
          t < e && this.throwError("missing argument" + r, p.errors.MISSING_ARGUMENT, {
              count: t,
              expectedCount: e
          }),
          t > e && this.throwError("too many arguments" + r, p.errors.UNEXPECTED_ARGUMENT, {
              count: t,
              expectedCount: e
          })
      }
      checkNew(t, e) {
          t !== Object && null != t || this.throwError("missing new", p.errors.MISSING_NEW, {
              name: e.name
          })
      }
      checkAbstract(t, e) {
          t === e ? this.throwError("cannot instantiate abstract class " + JSON.stringify(e.name) + " directly; use a sub-class", p.errors.UNSUPPORTED_OPERATION, {
              name: t.name,
              operation: "new"
          }) : t !== Object && null != t || this.throwError("missing new", p.errors.MISSING_NEW, {
              name: e.name
          })
      }
      static globalLogger() {
          return a || (a = new p(r.version)),
          a
      }
      static setCensorship(t, e) {
          if (!t && e && this.globalLogger().throwError("cannot permanently disable censorship", p.errors.UNSUPPORTED_OPERATION, {
              operation: "setCensorship"
          }),
          i) {
              if (!t)
                  return;
              this.globalLogger().throwError("error censorship permanent", p.errors.UNSUPPORTED_OPERATION, {
                  operation: "setCensorship"
              })
          }
          n = !!t,
          i = !!e
      }
      static setLogLevel(t) {
          const e = o[t.toLowerCase()];
          null != e ? s = e : p.globalLogger().warn("invalid log level - " + t)
      }
      static from(t) {
          return new p(t)
      }
      constructor(t) {
          Object.defineProperty(this, "version", {
              enumerable: !0,
              value: t,
              writable: !1
          })
      }
  }
  p.errors = h,
  p.levels = l
}
)),
parcelRequire.register("fXl0V", (function(t, e) {
  $parcel$export(t.exports, "version", (function() {
      return r
  }
  ));
  const r = "logger/5.7.0"
}
)),
parcelRequire.register("kJt1A", (function(t, e) {
  $parcel$export(t.exports, "version", (function() {
      return r
  }
  ));
  const r = "bytes/5.7.0"
}
)),
parcelRequire.register("4GDdA", (function(t, e) {
  var r, i;
  $parcel$export(t.exports, "SupportedAlgorithm", (function() {
      return r
  }
  )),
  (i = r || (r = {})).sha256 = "sha256",
  i.sha512 = "sha512"
}
)),
parcelRequire.register("hEEIE", (function(t, e) {
  $parcel$export(t.exports, "version", (function() {
      return r
  }
  ));
  const r = "sha2/5.7.0"
}
)),
parcelRequire.register("lkF0u", (function(t, e) {
  Object.defineProperty(t.exports, "__esModule", {
      value: !0
  }),
  t.exports.TWITTER_ROOT_PARENT_REGISTRY_KEY = t.exports.TWITTER_VERIFICATION_AUTHORITY = t.exports.REVERSE_LOOKUP_CLASS = t.exports.BONFIDA_FIDA_BNB = t.exports.PYTH_FIDDA_PRICE_ACC = t.exports.REGISTER_PROGRAM_ID = t.exports.ROOT_DOMAIN_ACCOUNT = t.exports.HASH_PREFIX = t.exports.NAME_PROGRAM_ID = void 0;
  var r = parcelRequire("1I0vV");
  t.exports.NAME_PROGRAM_ID = new r.PublicKey("namesLPneVptA9Z5rqUDD9tMTWEJwofgaYwp8cawRkX"),
  t.exports.HASH_PREFIX = "SPL Name Service",
  t.exports.ROOT_DOMAIN_ACCOUNT = new r.PublicKey("58PwtjSDuFHuUkYjH9BYnnQKHfwo9reZhC2zMJv9JPkx"),
  t.exports.REGISTER_PROGRAM_ID = new r.PublicKey("jCebN34bUfdeUYJT13J1yG16XWQpt5PDx6Mse9GUqhR"),
  t.exports.PYTH_FIDDA_PRICE_ACC = new r.PublicKey("ETp9eKXVv1dWwHSpsXRUuXHmw24PwRkttCGVgpZEY9zF"),
  t.exports.BONFIDA_FIDA_BNB = new r.PublicKey("AUoZ3YAhV3b2rZeEH93UMZHXUZcTramBvb4d9YEVySkc"),
  t.exports.REVERSE_LOOKUP_CLASS = new r.PublicKey("33m47vH6Eav6jr5Ry86XjhRft2jRBLDnDgPSHoquXi2Z"),
  t.exports.TWITTER_VERIFICATION_AUTHORITY = new r.PublicKey("FvPH7PrVrLGKPfqaf3xJodFTjZriqrAXXLTVWEorTFBi"),
  t.exports.TWITTER_ROOT_PARENT_REGISTRY_KEY = new r.PublicKey("4YcexoW3r78zz16J2aqmukBLRwGq6rAvWzJpkYAXqebv")
}
)),
parcelRequire.register("8y9KR", (function(t, e) {
  Object.defineProperty(t.exports, "__esModule", {
      value: !0
  }),
  t.exports.Mint = t.exports.TokenData = t.exports.NameRegistryState = void 0;
  var r = parcelRequire("1I0vV")
    , i = parcelRequire("fXZ66")
    , n = parcelRequire("2hvv8");
  class o {
      static async retrieve(t, e) {
          var r;
          const s = await t.getAccountInfo(e);
          if (!s)
              throw new Error("Invalid name account provided");
          let a = (0,
          i.deserializeUnchecked)(this.schema, o, s.data);
          a.data = null === (r = s.data) || void 0 === r ? void 0 : r.slice(this.HEADER_LEN);
          return {
              registry: a,
              nftOwner: await (0,
              n.retrieveNftOwner)(t, e)
          }
      }
      static async _retrieveBatch(t, e) {
          const r = await t.getMultipleAccountsInfo(e)
            , n = t=>{
              if (!t)
                  return;
              const e = (0,
              i.deserializeUnchecked)(this.schema, o, t);
              return e.data = null == t ? void 0 : t.slice(this.HEADER_LEN),
              e
          }
          ;
          return r.map((t=>n(null == t ? void 0 : t.data)))
      }
      static async retrieveBatch(t, e) {
          let r = [];
          for (; e.length > 0; )
              r.push(...await this._retrieveBatch(t, e.splice(0, 100)));
          return r
      }
      constructor(t) {
          this.parentName = new r.PublicKey(t.parentName),
          this.owner = new r.PublicKey(t.owner),
          this.class = new r.PublicKey(t.class)
      }
  }
  t.exports.NameRegistryState = o,
  o.HEADER_LEN = 96,
  o.schema = new Map([[o, {
      kind: "struct",
      fields: [["parentName", [32]], ["owner", [32]], ["class", [32]]]
  }]]);
  class s {
      serialize() {
          return (0,
          i.serialize)(s.schema, this)
      }
      static deserialize(t) {
          return (0,
          i.deserializeUnchecked)(s.schema, s, t)
      }
      constructor(t) {
          this.name = t.name,
          this.ticker = t.ticker,
          this.mint = t.mint,
          this.decimals = t.decimals,
          this.website = null == t ? void 0 : t.website,
          this.logoUri = null == t ? void 0 : t.logoUri
      }
  }
  t.exports.TokenData = s,
  s.schema = new Map([[s, {
      kind: "struct",
      fields: [["name", "string"], ["ticker", "string"], ["mint", [32]], ["decimals", "u8"], ["website", {
          kind: "option",
          type: "string"
      }], ["logoUri", {
          kind: "option",
          type: "string"
      }]]
  }]]);
  class a {
      serialize() {
          return (0,
          i.serialize)(a.schema, this)
      }
      static deserialize(t) {
          return (0,
          i.deserializeUnchecked)(a.schema, a, t)
      }
      constructor(t) {
          this.mint = t.mint
      }
  }
  t.exports.Mint = a,
  a.schema = new Map([[a, {
      kind: "struct",
      fields: [["mint", [32]]]
  }]])
}
)),
parcelRequire.register("2hvv8", (function(t, e) {
  var r = parcelRequire("bdjQ6").Buffer;
  Object.defineProperty(t.exports, "__esModule", {
      value: !0
  }),
  t.exports.retrieveNfts = t.exports.retrieveNftOwner = t.exports.MINT_PREFIX = t.exports.NAME_TOKENIZER_ID = void 0;
  var i = parcelRequire("1I0vV");
  parcelRequire("1PYYk");
  var n = parcelRequire("aTMmc");
  t.exports.NAME_TOKENIZER_ID = new i.PublicKey("nftD3vbNkNqfj2Sd3HZwbpw4BxxKWr4AjGb9X38JeZk"),
  t.exports.MINT_PREFIX = r.from("tokenized_name");
  t.exports.retrieveNftOwner = async(e,r)=>{
      var o;
      try {
          const [s] = await i.PublicKey.findProgramAddress([t.exports.MINT_PREFIX, r.toBuffer()], t.exports.NAME_TOKENIZER_ID);
          if ("0" === (await (0,
          n.getMint)(e, s)).supply.toString())
              return;
          const {value: a} = await e.getTokenLargestAccounts(s)
            , u = null === (o = a.find((t=>"1" === t.amount))) || void 0 === o ? void 0 : o.address;
          if (!u)
              return;
          const l = await e.getAccountInfo(u);
          if (!l || !l.data)
              return;
          return new i.PublicKey(l.data.slice(32, 64))
      } catch {
          return
      }
  }
  ;
  t.exports.retrieveNfts = async e=>{
      const r = await e.getProgramAccounts(t.exports.NAME_TOKENIZER_ID, {
          filters: [{
              memcmp: {
                  offset: 0,
                  bytes: "3"
              }
          }]
      });
      return r.map((t=>new i.PublicKey(t.account.data.slice(66, 98))))
  }
}
)),
parcelRequire.register("1PYYk", (function(t, e) {
  $parcel$export(t.exports, "getMint", (function() {
      return parcelRequire("aTMmc").getMint
  }
  )),
  $parcel$export(t.exports, "TOKEN_PROGRAM_ID", (function() {
      return parcelRequire("aRaan").TOKEN_PROGRAM_ID
  }
  )),
  parcelRequire("d7jCJ"),
  parcelRequire("ckCrM"),
  parcelRequire("3RO9G"),
  parcelRequire("aRaan"),
  parcelRequire("jmhfG")
}
)),
parcelRequire.register("d7jCJ", (function(t, e) {
  $parcel$export(t.exports, "createInitializeMintInstruction", (function() {
      return parcelRequire("dfyGi").createInitializeMintInstruction
  }
  )),
  $parcel$export(t.exports, "createInitializeAccountInstruction", (function() {
      return parcelRequire("6a2zX").createInitializeAccountInstruction
  }
  )),
  $parcel$export(t.exports, "createInitializeMultisigInstruction", (function() {
      return parcelRequire("wv179").createInitializeMultisigInstruction
  }
  )),
  $parcel$export(t.exports, "createTransferInstruction", (function() {
      return parcelRequire("bsR7n").createTransferInstruction
  }
  )),
  $parcel$export(t.exports, "createApproveInstruction", (function() {
      return parcelRequire("j9Ci5").createApproveInstruction
  }
  )),
  $parcel$export(t.exports, "createRevokeInstruction", (function() {
      return parcelRequire("VSV2S").createRevokeInstruction
  }
  )),
  $parcel$export(t.exports, "createSetAuthorityInstruction", (function() {
      return parcelRequire("9TNKN").createSetAuthorityInstruction
  }
  )),
  $parcel$export(t.exports, "createMintToInstruction", (function() {
      return parcelRequire("jgOdr").createMintToInstruction
  }
  )),
  $parcel$export(t.exports, "createBurnInstruction", (function() {
      return parcelRequire("9zJQ2").createBurnInstruction
  }
  )),
  $parcel$export(t.exports, "createCloseAccountInstruction", (function() {
      return parcelRequire("1H0FU").createCloseAccountInstruction
  }
  )),
  $parcel$export(t.exports, "createFreezeAccountInstruction", (function() {
      return parcelRequire("8wm4p").createFreezeAccountInstruction
  }
  )),
  $parcel$export(t.exports, "createThawAccountInstruction", (function() {
      return parcelRequire("aT8PN").createThawAccountInstruction
  }
  )),
  $parcel$export(t.exports, "createTransferCheckedInstruction", (function() {
      return parcelRequire("kb76L").createTransferCheckedInstruction
  }
  )),
  $parcel$export(t.exports, "createApproveCheckedInstruction", (function() {
      return parcelRequire("T2T7u").createApproveCheckedInstruction
  }
  )),
  $parcel$export(t.exports, "createMintToCheckedInstruction", (function() {
      return parcelRequire("dtA8t").createMintToCheckedInstruction
  }
  )),
  $parcel$export(t.exports, "createBurnCheckedInstruction", (function() {
      return parcelRequire("6nXdm").createBurnCheckedInstruction
  }
  )),
  $parcel$export(t.exports, "createSyncNativeInstruction", (function() {
      return parcelRequire("1rUnR").createSyncNativeInstruction
  }
  )),
  $parcel$export(t.exports, "createAssociatedTokenAccountInstruction", (function() {
      return parcelRequire("jEnHz").createAssociatedTokenAccountInstruction
  }
  )),
  parcelRequire("hr1dc"),
  parcelRequire("dfyGi"),
  parcelRequire("6a2zX"),
  parcelRequire("wv179"),
  parcelRequire("bsR7n"),
  parcelRequire("j9Ci5"),
  parcelRequire("VSV2S"),
  parcelRequire("9TNKN"),
  parcelRequire("jgOdr"),
  parcelRequire("9zJQ2"),
  parcelRequire("1H0FU"),
  parcelRequire("8wm4p"),
  parcelRequire("aT8PN"),
  parcelRequire("kb76L"),
  parcelRequire("T2T7u"),
  parcelRequire("dtA8t"),
  parcelRequire("6nXdm"),
  parcelRequire("14jDN"),
  parcelRequire("1rUnR"),
  parcelRequire("gJdaW"),
  parcelRequire("dtXDe"),
  parcelRequire("joiv7"),
  parcelRequire("QZVkW"),
  parcelRequire("jEnHz")
}
)),
parcelRequire.register("hr1dc", (function(t, e) {
  var r, i;
  $parcel$export(t.exports, "TokenInstruction", (function() {
      return r
  }
  )),
  (i = r || (r = {}))[i.InitializeMint = 0] = "InitializeMint",
  i[i.InitializeAccount = 1] = "InitializeAccount",
  i[i.InitializeMultisig = 2] = "InitializeMultisig",
  i[i.Transfer = 3] = "Transfer",
  i[i.Approve = 4] = "Approve",
  i[i.Revoke = 5] = "Revoke",
  i[i.SetAuthority = 6] = "SetAuthority",
  i[i.MintTo = 7] = "MintTo",
  i[i.Burn = 8] = "Burn",
  i[i.CloseAccount = 9] = "CloseAccount",
  i[i.FreezeAccount = 10] = "FreezeAccount",
  i[i.ThawAccount = 11] = "ThawAccount",
  i[i.TransferChecked = 12] = "TransferChecked",
  i[i.ApproveChecked = 13] = "ApproveChecked",
  i[i.MintToChecked = 14] = "MintToChecked",
  i[i.BurnChecked = 15] = "BurnChecked",
  i[i.InitializeAccount2 = 16] = "InitializeAccount2",
  i[i.SyncNative = 17] = "SyncNative",
  i[i.InitializeAccount3 = 18] = "InitializeAccount3",
  i[i.InitializeMultisig2 = 19] = "InitializeMultisig2",
  i[i.InitializeMint2 = 20] = "InitializeMint2"
}
)),
parcelRequire.register("dfyGi", (function(t, e) {
  $parcel$export(t.exports, "createInitializeMintInstruction", (function() {
      return c
  }
  )),
  $parcel$export(t.exports, "decodeInitializeMintInstruction", (function() {
      return h
  }
  ));
  var r = parcelRequire("TqRmH");
  parcelRequire("5cMDx");
  var i = parcelRequire("661cH")
    , n = parcelRequire("1I0vV")
    , o = parcelRequire("aRaan")
    , s = parcelRequire("jmhfG")
    , a = parcelRequire("hr1dc")
    , u = parcelRequire("bdjQ6").Buffer;
  const l = (0,
  r.struct)([(0,
  r.u8)("instruction"), (0,
  r.u8)("decimals"), (0,
  i.publicKey)("mintAuthority"), (0,
  r.u8)("freezeAuthorityOption"), (0,
  i.publicKey)("freezeAuthority")]);
  function c(t, e, r, i, s=o.TOKEN_PROGRAM_ID) {
      const c = [{
          pubkey: t,
          isSigner: !1,
          isWritable: !0
      }, {
          pubkey: n.SYSVAR_RENT_PUBKEY,
          isSigner: !1,
          isWritable: !1
      }]
        , h = u.alloc(l.span);
      return l.encode({
          instruction: a.TokenInstruction.InitializeMint,
          decimals: e,
          mintAuthority: r,
          freezeAuthorityOption: i ? 1 : 0,
          freezeAuthority: i || new (0,
          n.PublicKey)(0)
      }, h),
      new (0,
      n.TransactionInstruction)({
          keys: c,
          programId: s,
          data: h
      })
  }
  function h(t, e=o.TOKEN_PROGRAM_ID) {
      if (!t.programId.equals(e))
          throw new (0,
          s.TokenInvalidInstructionProgramError);
      if (t.data.length !== l.span)
          throw new (0,
          s.TokenInvalidInstructionDataError);
      const {keys: {mint: r, rent: i}, data: n} = function({programId: t, keys: [e,r], data: i}) {
          const {instruction: n, decimals: o, mintAuthority: s, freezeAuthorityOption: a, freezeAuthority: u} = l.decode(i);
          return {
              programId: t,
              keys: {
                  mint: e,
                  rent: r
              },
              data: {
                  instruction: n,
                  decimals: o,
                  mintAuthority: s,
                  freezeAuthority: a ? u : null
              }
          }
      }(t);
      if (n.instruction !== a.TokenInstruction.InitializeMint)
          throw new (0,
          s.TokenInvalidInstructionTypeError);
      if (!r || !i)
          throw new (0,
          s.TokenInvalidInstructionKeysError);
      return {
          programId: e,
          keys: {
              mint: r,
              rent: i
          },
          data: n
      }
  }
}
)),
parcelRequire.register("5cMDx", (function(t, e) {
  $parcel$export(t.exports, "u64", (function() {
      return parcelRequire("47UuN").u64
  }
  )),
  $parcel$export(t.exports, "bool", (function() {
      return parcelRequire("gmUNM").bool
  }
  )),
  $parcel$export(t.exports, "publicKey", (function() {
      return parcelRequire("661cH").publicKey
  }
  )),
  parcelRequire("7vMPK"),
  parcelRequire("47UuN"),
  parcelRequire("eSiZB"),
  parcelRequire("gmUNM"),
  parcelRequire("661cH")
}
)),
parcelRequire.register("7vMPK", (function(t, e) {
  $parcel$export(t.exports, "encodeDecode", (function() {
      return r
  }
  ));
  const r = t=>({
      decode: t.decode.bind(t),
      encode: t.encode.bind(t)
  })
}
)),
parcelRequire.register("47UuN", (function(t, e) {
  $parcel$export(t.exports, "u64", (function() {
      return u
  }
  )),
  $parcel$export(t.exports, "u128", (function() {
      return l
  }
  ));
  var r = parcelRequire("TqRmH")
    , i = parcelRequire("8eua2")
    , n = parcelRequire("7vMPK")
    , o = parcelRequire("bdjQ6").Buffer;
  const s = t=>e=>{
      const s = (0,
      r.blob)(t, e)
        , {encode: a, decode: u} = (0,
      n.encodeDecode)(s)
        , l = s;
      return l.decode = (t,e)=>{
          const r = u(t, e);
          return (0,
          i.toBigIntLE)(o.from(r))
      }
      ,
      l.encode = (e,r,n)=>{
          const o = (0,
          i.toBufferLE)(e, t);
          return a(o, r, n)
      }
      ,
      l
  }
    , a = t=>e=>{
      const s = (0,
      r.blob)(t, e)
        , {encode: a, decode: u} = (0,
      n.encodeDecode)(s)
        , l = s;
      return l.decode = (t,e)=>{
          const r = u(t, e);
          return (0,
          i.toBigIntBE)(o.from(r))
      }
      ,
      l.encode = (e,r,n)=>{
          const o = (0,
          i.toBufferBE)(e, t);
          return a(o, r, n)
      }
      ,
      l
  }
    , u = s(8)
    , l = (a(8),
  s(16));
  a(16),
  s(24),
  a(24),
  s(32),
  a(32)
}
)),
parcelRequire.register("eSiZB", (function(t, e) {
  var r = parcelRequire("fSLM1");
  parcelRequire("7vMPK"),
  parcelRequire("47UuN");
  new ($parcel$interopDefault(r))("1e+18")
}
)),
parcelRequire.register("gmUNM", (function(t, e) {
  $parcel$export(t.exports, "bool", (function() {
      return n
  }
  ));
  var r = parcelRequire("TqRmH")
    , i = parcelRequire("7vMPK");
  const n = t=>{
      const e = (0,
      r.u8)(t)
        , {encode: n, decode: o} = (0,
      i.encodeDecode)(e)
        , s = e;
      return s.decode = (t,e)=>!!o(t, e),
      s.encode = (t,e,r)=>{
          const i = Number(t);
          return n(i, e, r)
      }
      ,
      s
  }
}
)),
parcelRequire.register("661cH", (function(t, e) {
  $parcel$export(t.exports, "publicKey", (function() {
      return o
  }
  ));
  var r = parcelRequire("TqRmH")
    , i = parcelRequire("1I0vV")
    , n = parcelRequire("7vMPK");
  const o = t=>{
      const e = (0,
      r.blob)(32, t)
        , {encode: o, decode: s} = (0,
      n.encodeDecode)(e)
        , a = e;
      return a.decode = (t,e)=>{
          const r = s(t, e);
          return new (0,
          i.PublicKey)(r)
      }
      ,
      a.encode = (t,e,r)=>{
          const i = t.toBuffer();
          return o(i, e, r)
      }
      ,
      a
  }
}
)),
parcelRequire.register("aRaan", (function(t, e) {
  $parcel$export(t.exports, "TOKEN_PROGRAM_ID", (function() {
      return i
  }
  )),
  $parcel$export(t.exports, "ASSOCIATED_TOKEN_PROGRAM_ID", (function() {
      return n
  }
  )),
  $parcel$export(t.exports, "NATIVE_MINT", (function() {
      return o
  }
  ));
  var r = parcelRequire("1I0vV");
  const i = new (0,
  r.PublicKey)("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
    , n = new (0,
  r.PublicKey)("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL")
    , o = new (0,
  r.PublicKey)("So11111111111111111111111111111111111111112")
}
)),
parcelRequire.register("jmhfG", (function(t, e) {
  $parcel$export(t.exports, "TokenAccountNotFoundError", (function() {
      return i
  }
  )),
  $parcel$export(t.exports, "TokenInvalidAccountOwnerError", (function() {
      return n
  }
  )),
  $parcel$export(t.exports, "TokenInvalidAccountSizeError", (function() {
      return o
  }
  )),
  $parcel$export(t.exports, "TokenInvalidMintError", (function() {
      return s
  }
  )),
  $parcel$export(t.exports, "TokenInvalidOwnerError", (function() {
      return a
  }
  )),
  $parcel$export(t.exports, "TokenOwnerOffCurveError", (function() {
      return u
  }
  )),
  $parcel$export(t.exports, "TokenInvalidInstructionProgramError", (function() {
      return l
  }
  )),
  $parcel$export(t.exports, "TokenInvalidInstructionKeysError", (function() {
      return c
  }
  )),
  $parcel$export(t.exports, "TokenInvalidInstructionDataError", (function() {
      return h
  }
  )),
  $parcel$export(t.exports, "TokenInvalidInstructionTypeError", (function() {
      return A
  }
  ));
  class r extends Error {
      constructor(t) {
          super(t)
      }
  }
  class i extends r {
      constructor() {
          super(...arguments),
          this.name = "TokenAccountNotFoundError"
      }
  }
  class n extends r {
      constructor() {
          super(...arguments),
          this.name = "TokenInvalidAccountOwnerError"
      }
  }
  class o extends r {
      constructor() {
          super(...arguments),
          this.name = "TokenInvalidAccountSizeError"
      }
  }
  class s extends r {
      constructor() {
          super(...arguments),
          this.name = "TokenInvalidMintError"
      }
  }
  class a extends r {
      constructor() {
          super(...arguments),
          this.name = "TokenInvalidOwnerError"
      }
  }
  class u extends r {
      constructor() {
          super(...arguments),
          this.name = "TokenOwnerOffCurveError"
      }
  }
  class l extends r {
      constructor() {
          super(...arguments),
          this.name = "TokenInvalidInstructionProgramError"
      }
  }
  class c extends r {
      constructor() {
          super(...arguments),
          this.name = "TokenInvalidInstructionKeysError"
      }
  }
  class h extends r {
      constructor() {
          super(...arguments),
          this.name = "TokenInvalidInstructionDataError"
      }
  }
  class A extends r {
      constructor() {
          super(...arguments),
          this.name = "TokenInvalidInstructionTypeError"
      }
  }
}
)),
parcelRequire.register("6a2zX", (function(t, e) {
  $parcel$export(t.exports, "createInitializeAccountInstruction", (function() {
      return l
  }
  )),
  $parcel$export(t.exports, "decodeInitializeAccountInstruction", (function() {
      return c
  }
  ));
  var r = parcelRequire("TqRmH")
    , i = parcelRequire("1I0vV")
    , n = parcelRequire("aRaan")
    , o = parcelRequire("jmhfG")
    , s = parcelRequire("hr1dc")
    , a = parcelRequire("bdjQ6").Buffer;
  const u = (0,
  r.struct)([(0,
  r.u8)("instruction")]);
  function l(t, e, r, o=n.TOKEN_PROGRAM_ID) {
      const l = [{
          pubkey: t,
          isSigner: !1,
          isWritable: !0
      }, {
          pubkey: e,
          isSigner: !1,
          isWritable: !1
      }, {
          pubkey: r,
          isSigner: !1,
          isWritable: !1
      }, {
          pubkey: i.SYSVAR_RENT_PUBKEY,
          isSigner: !1,
          isWritable: !1
      }]
        , c = a.alloc(u.span);
      return u.encode({
          instruction: s.TokenInstruction.InitializeAccount
      }, c),
      new (0,
      i.TransactionInstruction)({
          keys: l,
          programId: o,
          data: c
      })
  }
  function c(t, e=n.TOKEN_PROGRAM_ID) {
      if (!t.programId.equals(e))
          throw new (0,
          o.TokenInvalidInstructionProgramError);
      if (t.data.length !== u.span)
          throw new (0,
          o.TokenInvalidInstructionDataError);
      const {keys: {account: r, mint: i, owner: a, rent: l}, data: c} = function({programId: t, keys: [e,r,i,n], data: o}) {
          return {
              programId: t,
              keys: {
                  account: e,
                  mint: r,
                  owner: i,
                  rent: n
              },
              data: u.decode(o)
          }
      }(t);
      if (c.instruction !== s.TokenInstruction.InitializeAccount)
          throw new (0,
          o.TokenInvalidInstructionTypeError);
      if (!(r && i && a && l))
          throw new (0,
          o.TokenInvalidInstructionKeysError);
      return {
          programId: e,
          keys: {
              account: r,
              mint: i,
              owner: a,
              rent: l
          },
          data: c
      }
  }
}
)),
parcelRequire.register("wv179", (function(t, e) {
  $parcel$export(t.exports, "createInitializeMultisigInstruction", (function() {
      return l
  }
  )),
  $parcel$export(t.exports, "decodeInitializeMultisigInstruction", (function() {
      return c
  }
  ));
  var r = parcelRequire("TqRmH")
    , i = parcelRequire("1I0vV")
    , n = parcelRequire("aRaan")
    , o = parcelRequire("jmhfG")
    , s = parcelRequire("hr1dc")
    , a = parcelRequire("bdjQ6").Buffer;
  const u = (0,
  r.struct)([(0,
  r.u8)("instruction"), (0,
  r.u8)("m")]);
  function l(t, e, r, o=n.TOKEN_PROGRAM_ID) {
      const l = [{
          pubkey: t,
          isSigner: !1,
          isWritable: !0
      }, {
          pubkey: i.SYSVAR_RENT_PUBKEY,
          isSigner: !1,
          isWritable: !1
      }];
      for (const t of e)
          l.push({
              pubkey: t,
              isSigner: !1,
              isWritable: !1
          });
      const c = a.alloc(u.span);
      return u.encode({
          instruction: s.TokenInstruction.InitializeMultisig,
          m: r
      }, c),
      new (0,
      i.TransactionInstruction)({
          keys: l,
          programId: o,
          data: c
      })
  }
  function c(t, e=n.TOKEN_PROGRAM_ID) {
      if (!t.programId.equals(e))
          throw new (0,
          o.TokenInvalidInstructionProgramError);
      if (t.data.length !== u.span)
          throw new (0,
          o.TokenInvalidInstructionDataError);
      const {keys: {account: r, rent: i, signers: a}, data: l} = function({programId: t, keys: [e,r,...i], data: n}) {
          return {
              programId: t,
              keys: {
                  account: e,
                  rent: r,
                  signers: i
              },
              data: u.decode(n)
          }
      }(t);
      if (l.instruction !== s.TokenInstruction.InitializeMultisig)
          throw new (0,
          o.TokenInvalidInstructionTypeError);
      if (!r || !i || !a.length)
          throw new (0,
          o.TokenInvalidInstructionKeysError);
      return {
          programId: e,
          keys: {
              account: r,
              rent: i,
              signers: a
          },
          data: l
      }
  }
}
)),
parcelRequire.register("bsR7n", (function(t, e) {
  $parcel$export(t.exports, "createTransferInstruction", (function() {
      return h
  }
  )),
  $parcel$export(t.exports, "decodeTransferInstruction", (function() {
      return A
  }
  ));
  var r = parcelRequire("TqRmH");
  parcelRequire("5cMDx");
  var i = parcelRequire("47UuN")
    , n = parcelRequire("1I0vV")
    , o = parcelRequire("aRaan")
    , s = parcelRequire("jmhfG")
    , a = parcelRequire("6yEk2")
    , u = parcelRequire("hr1dc")
    , l = parcelRequire("bdjQ6").Buffer;
  const c = (0,
  r.struct)([(0,
  r.u8)("instruction"), (0,
  i.u64)("amount")]);
  function h(t, e, r, i, s=[], h=o.TOKEN_PROGRAM_ID) {
      const A = (0,
      a.addSigners)([{
          pubkey: t,
          isSigner: !1,
          isWritable: !0
      }, {
          pubkey: e,
          isSigner: !1,
          isWritable: !0
      }], r, s)
        , f = l.alloc(c.span);
      return c.encode({
          instruction: u.TokenInstruction.Transfer,
          amount: BigInt(i)
      }, f),
      new (0,
      n.TransactionInstruction)({
          keys: A,
          programId: h,
          data: f
      })
  }
  function A(t, e=o.TOKEN_PROGRAM_ID) {
      if (!t.programId.equals(e))
          throw new (0,
          s.TokenInvalidInstructionProgramError);
      if (t.data.length !== c.span)
          throw new (0,
          s.TokenInvalidInstructionDataError);
      const {keys: {source: r, destination: i, owner: n, multiSigners: a}, data: l} = function({programId: t, keys: [e,r,i,...n], data: o}) {
          return {
              programId: t,
              keys: {
                  source: e,
                  destination: r,
                  owner: i,
                  multiSigners: n
              },
              data: c.decode(o)
          }
      }(t);
      if (l.instruction !== u.TokenInstruction.Transfer)
          throw new (0,
          s.TokenInvalidInstructionTypeError);
      if (!r || !i || !n)
          throw new (0,
          s.TokenInvalidInstructionKeysError);
      return {
          programId: e,
          keys: {
              source: r,
              destination: i,
              owner: n,
              multiSigners: a
          },
          data: l
      }
  }
}
)),
parcelRequire.register("6yEk2", (function(t, e) {
  function r(t, e, r) {
      if (r.length) {
          t.push({
              pubkey: e,
              isSigner: !1,
              isWritable: !1
          });
          for (const e of r)
              t.push({
                  pubkey: e.publicKey,
                  isSigner: !0,
                  isWritable: !1
              })
      } else
          t.push({
              pubkey: e,
              isSigner: !0,
              isWritable: !1
          });
      return t
  }
  $parcel$export(t.exports, "addSigners", (function() {
      return r
  }
  ))
}
)),
parcelRequire.register("j9Ci5", (function(t, e) {
  $parcel$export(t.exports, "createApproveInstruction", (function() {
      return h
  }
  )),
  $parcel$export(t.exports, "decodeApproveInstruction", (function() {
      return A
  }
  ));
  var r = parcelRequire("TqRmH");
  parcelRequire("5cMDx");
  var i = parcelRequire("47UuN")
    , n = parcelRequire("1I0vV")
    , o = parcelRequire("aRaan")
    , s = parcelRequire("jmhfG")
    , a = parcelRequire("6yEk2")
    , u = parcelRequire("hr1dc")
    , l = parcelRequire("bdjQ6").Buffer;
  const c = (0,
  r.struct)([(0,
  r.u8)("instruction"), (0,
  i.u64)("amount")]);
  function h(t, e, r, i, s=[], h=o.TOKEN_PROGRAM_ID) {
      const A = (0,
      a.addSigners)([{
          pubkey: t,
          isSigner: !1,
          isWritable: !0
      }, {
          pubkey: e,
          isSigner: !1,
          isWritable: !1
      }], r, s)
        , f = l.alloc(c.span);
      return c.encode({
          instruction: u.TokenInstruction.Approve,
          amount: BigInt(i)
      }, f),
      new (0,
      n.TransactionInstruction)({
          keys: A,
          programId: h,
          data: f
      })
  }
  function A(t, e=o.TOKEN_PROGRAM_ID) {
      if (!t.programId.equals(e))
          throw new (0,
          s.TokenInvalidInstructionProgramError);
      if (t.data.length !== c.span)
          throw new (0,
          s.TokenInvalidInstructionDataError);
      const {keys: {account: r, delegate: i, owner: n, multiSigners: a}, data: l} = function({programId: t, keys: [e,r,i,...n], data: o}) {
          return {
              programId: t,
              keys: {
                  account: e,
                  delegate: r,
                  owner: i,
                  multiSigners: n
              },
              data: c.decode(o)
          }
      }(t);
      if (l.instruction !== u.TokenInstruction.Approve)
          throw new (0,
          s.TokenInvalidInstructionTypeError);
      if (!r || !i || !n)
          throw new (0,
          s.TokenInvalidInstructionKeysError);
      return {
          programId: e,
          keys: {
              account: r,
              delegate: i,
              owner: n,
              multiSigners: a
          },
          data: l
      }
  }
}
)),
parcelRequire.register("VSV2S", (function(t, e) {
  $parcel$export(t.exports, "createRevokeInstruction", (function() {
      return c
  }
  )),
  $parcel$export(t.exports, "decodeRevokeInstruction", (function() {
      return h
  }
  ));
  var r = parcelRequire("TqRmH")
    , i = parcelRequire("1I0vV")
    , n = parcelRequire("aRaan")
    , o = parcelRequire("jmhfG")
    , s = parcelRequire("6yEk2")
    , a = parcelRequire("hr1dc")
    , u = parcelRequire("bdjQ6").Buffer;
  const l = (0,
  r.struct)([(0,
  r.u8)("instruction")]);
  function c(t, e, r=[], o=n.TOKEN_PROGRAM_ID) {
      const c = (0,
      s.addSigners)([{
          pubkey: t,
          isSigner: !1,
          isWritable: !0
      }], e, r)
        , h = u.alloc(l.span);
      return l.encode({
          instruction: a.TokenInstruction.Revoke
      }, h),
      new (0,
      i.TransactionInstruction)({
          keys: c,
          programId: o,
          data: h
      })
  }
  function h(t, e=n.TOKEN_PROGRAM_ID) {
      if (!t.programId.equals(e))
          throw new (0,
          o.TokenInvalidInstructionProgramError);
      if (t.data.length !== l.span)
          throw new (0,
          o.TokenInvalidInstructionDataError);
      const {keys: {account: r, owner: i, multiSigners: s}, data: u} = function({programId: t, keys: [e,r,...i], data: n}) {
          return {
              programId: t,
              keys: {
                  account: e,
                  owner: r,
                  multiSigners: i
              },
              data: l.decode(n)
          }
      }(t);
      if (u.instruction !== a.TokenInstruction.Revoke)
          throw new (0,
          o.TokenInvalidInstructionTypeError);
      if (!r || !i)
          throw new (0,
          o.TokenInvalidInstructionKeysError);
      return {
          programId: e,
          keys: {
              account: r,
              owner: i,
              multiSigners: s
          },
          data: u
      }
  }
}
)),
parcelRequire.register("9TNKN", (function(t, e) {
  $parcel$export(t.exports, "createSetAuthorityInstruction", (function() {
      return f
  }
  )),
  $parcel$export(t.exports, "decodeSetAuthorityInstruction", (function() {
      return p
  }
  ));
  var r = parcelRequire("TqRmH");
  parcelRequire("5cMDx");
  var i, n, o = parcelRequire("661cH"), s = parcelRequire("1I0vV"), a = parcelRequire("aRaan"), u = parcelRequire("jmhfG"), l = parcelRequire("6yEk2"), c = parcelRequire("hr1dc"), h = parcelRequire("bdjQ6").Buffer;
  (n = i || (i = {}))[n.MintTokens = 0] = "MintTokens",
  n[n.FreezeAccount = 1] = "FreezeAccount",
  n[n.AccountOwner = 2] = "AccountOwner",
  n[n.CloseAccount = 3] = "CloseAccount";
  const A = (0,
  r.struct)([(0,
  r.u8)("instruction"), (0,
  r.u8)("authorityType"), (0,
  r.u8)("newAuthorityOption"), (0,
  o.publicKey)("newAuthority")]);
  function f(t, e, r, i, n=[], o=a.TOKEN_PROGRAM_ID) {
      const u = (0,
      l.addSigners)([{
          pubkey: t,
          isSigner: !1,
          isWritable: !0
      }], e, n)
        , f = h.alloc(A.span);
      return A.encode({
          instruction: c.TokenInstruction.SetAuthority,
          authorityType: r,
          newAuthorityOption: i ? 1 : 0,
          newAuthority: i || new (0,
          s.PublicKey)(0)
      }, f),
      new (0,
      s.TransactionInstruction)({
          keys: u,
          programId: o,
          data: f
      })
  }
  function p(t, e=a.TOKEN_PROGRAM_ID) {
      if (!t.programId.equals(e))
          throw new (0,
          u.TokenInvalidInstructionProgramError);
      if (t.data.length !== A.span)
          throw new (0,
          u.TokenInvalidInstructionDataError);
      const {keys: {account: r, currentAuthority: i, multiSigners: n}, data: o} = function({programId: t, keys: [e,r,...i], data: n}) {
          const {instruction: o, authorityType: s, newAuthorityOption: a, newAuthority: u} = A.decode(n);
          return {
              programId: t,
              keys: {
                  account: e,
                  currentAuthority: r,
                  multiSigners: i
              },
              data: {
                  instruction: o,
                  authorityType: s,
                  newAuthority: a ? u : null
              }
          }
      }(t);
      if (o.instruction !== c.TokenInstruction.SetAuthority)
          throw new (0,
          u.TokenInvalidInstructionTypeError);
      if (!r || !i)
          throw new (0,
          u.TokenInvalidInstructionKeysError);
      return {
          programId: e,
          keys: {
              account: r,
              currentAuthority: i,
              multiSigners: n
          },
          data: o
      }
  }
}
)),
parcelRequire.register("jgOdr", (function(t, e) {
  $parcel$export(t.exports, "createMintToInstruction", (function() {
      return h
  }
  )),
  $parcel$export(t.exports, "decodeMintToInstruction", (function() {
      return A
  }
  ));
  var r = parcelRequire("TqRmH");
  parcelRequire("5cMDx");
  var i = parcelRequire("47UuN")
    , n = parcelRequire("1I0vV")
    , o = parcelRequire("aRaan")
    , s = parcelRequire("jmhfG")
    , a = parcelRequire("6yEk2")
    , u = parcelRequire("hr1dc")
    , l = parcelRequire("bdjQ6").Buffer;
  const c = (0,
  r.struct)([(0,
  r.u8)("instruction"), (0,
  i.u64)("amount")]);
  function h(t, e, r, i, s=[], h=o.TOKEN_PROGRAM_ID) {
      const A = (0,
      a.addSigners)([{
          pubkey: t,
          isSigner: !1,
          isWritable: !0
      }, {
          pubkey: e,
          isSigner: !1,
          isWritable: !0
      }], r, s)
        , f = l.alloc(c.span);
      return c.encode({
          instruction: u.TokenInstruction.MintTo,
          amount: BigInt(i)
      }, f),
      new (0,
      n.TransactionInstruction)({
          keys: A,
          programId: h,
          data: f
      })
  }
  function A(t, e=o.TOKEN_PROGRAM_ID) {
      if (!t.programId.equals(e))
          throw new (0,
          s.TokenInvalidInstructionProgramError);
      if (t.data.length !== c.span)
          throw new (0,
          s.TokenInvalidInstructionDataError);
      const {keys: {mint: r, destination: i, authority: n, multiSigners: a}, data: l} = function({programId: t, keys: [e,r,i,...n], data: o}) {
          return {
              programId: t,
              keys: {
                  mint: e,
                  destination: r,
                  authority: i,
                  multiSigners: n
              },
              data: c.decode(o)
          }
      }(t);
      if (l.instruction !== u.TokenInstruction.MintTo)
          throw new (0,
          s.TokenInvalidInstructionTypeError);
      if (!r || !i || !n)
          throw new (0,
          s.TokenInvalidInstructionKeysError);
      return {
          programId: e,
          keys: {
              mint: r,
              destination: i,
              authority: n,
              multiSigners: a
          },
          data: l
      }
  }
}
)),
parcelRequire.register("9zJQ2", (function(t, e) {
  $parcel$export(t.exports, "createBurnInstruction", (function() {
      return h
  }
  )),
  $parcel$export(t.exports, "decodeBurnInstruction", (function() {
      return A
  }
  ));
  var r = parcelRequire("TqRmH");
  parcelRequire("5cMDx");
  var i = parcelRequire("47UuN")
    , n = parcelRequire("1I0vV")
    , o = parcelRequire("aRaan")
    , s = parcelRequire("jmhfG")
    , a = parcelRequire("6yEk2")
    , u = parcelRequire("hr1dc")
    , l = parcelRequire("bdjQ6").Buffer;
  const c = (0,
  r.struct)([(0,
  r.u8)("instruction"), (0,
  i.u64)("amount")]);
  function h(t, e, r, i, s=[], h=o.TOKEN_PROGRAM_ID) {
      const A = (0,
      a.addSigners)([{
          pubkey: t,
          isSigner: !1,
          isWritable: !0
      }, {
          pubkey: e,
          isSigner: !1,
          isWritable: !0
      }], r, s)
        , f = l.alloc(c.span);
      return c.encode({
          instruction: u.TokenInstruction.Burn,
          amount: BigInt(i)
      }, f),
      new (0,
      n.TransactionInstruction)({
          keys: A,
          programId: h,
          data: f
      })
  }
  function A(t, e=o.TOKEN_PROGRAM_ID) {
      if (!t.programId.equals(e))
          throw new (0,
          s.TokenInvalidInstructionProgramError);
      if (t.data.length !== c.span)
          throw new (0,
          s.TokenInvalidInstructionDataError);
      const {keys: {account: r, mint: i, owner: n, multiSigners: a}, data: l} = function({programId: t, keys: [e,r,i,...n], data: o}) {
          return {
              programId: t,
              keys: {
                  account: e,
                  mint: r,
                  owner: i,
                  multiSigners: n
              },
              data: c.decode(o)
          }
      }(t);
      if (l.instruction !== u.TokenInstruction.Burn)
          throw new (0,
          s.TokenInvalidInstructionTypeError);
      if (!r || !i || !n)
          throw new (0,
          s.TokenInvalidInstructionKeysError);
      return {
          programId: e,
          keys: {
              account: r,
              mint: i,
              owner: n,
              multiSigners: a
          },
          data: l
      }
  }
}
)),
parcelRequire.register("1H0FU", (function(t, e) {
  $parcel$export(t.exports, "createCloseAccountInstruction", (function() {
      return c
  }
  )),
  $parcel$export(t.exports, "decodeCloseAccountInstruction", (function() {
      return h
  }
  ));
  var r = parcelRequire("TqRmH")
    , i = parcelRequire("1I0vV")
    , n = parcelRequire("aRaan")
    , o = parcelRequire("jmhfG")
    , s = parcelRequire("6yEk2")
    , a = parcelRequire("hr1dc")
    , u = parcelRequire("bdjQ6").Buffer;
  const l = (0,
  r.struct)([(0,
  r.u8)("instruction")]);
  function c(t, e, r, o=[], c=n.TOKEN_PROGRAM_ID) {
      const h = (0,
      s.addSigners)([{
          pubkey: t,
          isSigner: !1,
          isWritable: !0
      }, {
          pubkey: e,
          isSigner: !1,
          isWritable: !0
      }], r, o)
        , A = u.alloc(l.span);
      return l.encode({
          instruction: a.TokenInstruction.CloseAccount
      }, A),
      new (0,
      i.TransactionInstruction)({
          keys: h,
          programId: c,
          data: A
      })
  }
  function h(t, e=n.TOKEN_PROGRAM_ID) {
      if (!t.programId.equals(e))
          throw new (0,
          o.TokenInvalidInstructionProgramError);
      if (t.data.length !== l.span)
          throw new (0,
          o.TokenInvalidInstructionDataError);
      const {keys: {account: r, destination: i, authority: s, multiSigners: u}, data: c} = function({programId: t, keys: [e,r,i,...n], data: o}) {
          return {
              programId: t,
              keys: {
                  account: e,
                  destination: r,
                  authority: i,
                  multiSigners: n
              },
              data: l.decode(o)
          }
      }(t);
      if (c.instruction !== a.TokenInstruction.CloseAccount)
          throw new (0,
          o.TokenInvalidInstructionTypeError);
      if (!r || !i || !s)
          throw new (0,
          o.TokenInvalidInstructionKeysError);
      return {
          programId: e,
          keys: {
              account: r,
              destination: i,
              authority: s,
              multiSigners: u
          },
          data: c
      }
  }
}
)),
parcelRequire.register("8wm4p", (function(t, e) {
  $parcel$export(t.exports, "createFreezeAccountInstruction", (function() {
      return c
  }
  )),
  $parcel$export(t.exports, "decodeFreezeAccountInstruction", (function() {
      return h
  }
  ));
  var r = parcelRequire("TqRmH")
    , i = parcelRequire("1I0vV")
    , n = parcelRequire("aRaan")
    , o = parcelRequire("jmhfG")
    , s = parcelRequire("6yEk2")
    , a = parcelRequire("hr1dc")
    , u = parcelRequire("bdjQ6").Buffer;
  const l = (0,
  r.struct)([(0,
  r.u8)("instruction")]);
  function c(t, e, r, o=[], c=n.TOKEN_PROGRAM_ID) {
      const h = (0,
      s.addSigners)([{
          pubkey: t,
          isSigner: !1,
          isWritable: !0
      }, {
          pubkey: e,
          isSigner: !1,
          isWritable: !1
      }], r, o)
        , A = u.alloc(l.span);
      return l.encode({
          instruction: a.TokenInstruction.FreezeAccount
      }, A),
      new (0,
      i.TransactionInstruction)({
          keys: h,
          programId: c,
          data: A
      })
  }
  function h(t, e=n.TOKEN_PROGRAM_ID) {
      if (!t.programId.equals(e))
          throw new (0,
          o.TokenInvalidInstructionProgramError);
      if (t.data.length !== l.span)
          throw new (0,
          o.TokenInvalidInstructionDataError);
      const {keys: {account: r, mint: i, authority: s, multiSigners: u}, data: c} = function({programId: t, keys: [e,r,i,...n], data: o}) {
          return {
              programId: t,
              keys: {
                  account: e,
                  mint: r,
                  authority: i,
                  multiSigners: n
              },
              data: l.decode(o)
          }
      }(t);
      if (c.instruction !== a.TokenInstruction.FreezeAccount)
          throw new (0,
          o.TokenInvalidInstructionTypeError);
      if (!r || !i || !s)
          throw new (0,
          o.TokenInvalidInstructionKeysError);
      return {
          programId: e,
          keys: {
              account: r,
              mint: i,
              authority: s,
              multiSigners: u
          },
          data: c
      }
  }
}
)),
parcelRequire.register("aT8PN", (function(t, e) {
  $parcel$export(t.exports, "createThawAccountInstruction", (function() {
      return c
  }
  )),
  $parcel$export(t.exports, "decodeThawAccountInstruction", (function() {
      return h
  }
  ));
  var r = parcelRequire("TqRmH")
    , i = parcelRequire("1I0vV")
    , n = parcelRequire("aRaan")
    , o = parcelRequire("jmhfG")
    , s = parcelRequire("6yEk2")
    , a = parcelRequire("hr1dc")
    , u = parcelRequire("bdjQ6").Buffer;
  const l = (0,
  r.struct)([(0,
  r.u8)("instruction")]);
  function c(t, e, r, o=[], c=n.TOKEN_PROGRAM_ID) {
      const h = (0,
      s.addSigners)([{
          pubkey: t,
          isSigner: !1,
          isWritable: !0
      }, {
          pubkey: e,
          isSigner: !1,
          isWritable: !1
      }], r, o)
        , A = u.alloc(l.span);
      return l.encode({
          instruction: a.TokenInstruction.ThawAccount
      }, A),
      new (0,
      i.TransactionInstruction)({
          keys: h,
          programId: c,
          data: A
      })
  }
  function h(t, e=n.TOKEN_PROGRAM_ID) {
      if (!t.programId.equals(e))
          throw new (0,
          o.TokenInvalidInstructionProgramError);
      if (t.data.length !== l.span)
          throw new (0,
          o.TokenInvalidInstructionDataError);
      const {keys: {account: r, mint: i, authority: s, multiSigners: u}, data: c} = function({programId: t, keys: [e,r,i,...n], data: o}) {
          return {
              programId: t,
              keys: {
                  account: e,
                  mint: r,
                  authority: i,
                  multiSigners: n
              },
              data: l.decode(o)
          }
      }(t);
      if (c.instruction !== a.TokenInstruction.ThawAccount)
          throw new (0,
          o.TokenInvalidInstructionTypeError);
      if (!r || !i || !s)
          throw new (0,
          o.TokenInvalidInstructionKeysError);
      return {
          programId: e,
          keys: {
              account: r,
              mint: i,
              authority: s,
              multiSigners: u
          },
          data: c
      }
  }
}
)),
parcelRequire.register("kb76L", (function(t, e) {
  $parcel$export(t.exports, "createTransferCheckedInstruction", (function() {
      return h
  }
  )),
  $parcel$export(t.exports, "decodeTransferCheckedInstruction", (function() {
      return A
  }
  ));
  var r = parcelRequire("TqRmH");
  parcelRequire("5cMDx");
  var i = parcelRequire("47UuN")
    , n = parcelRequire("1I0vV")
    , o = parcelRequire("aRaan")
    , s = parcelRequire("jmhfG")
    , a = parcelRequire("6yEk2")
    , u = parcelRequire("hr1dc")
    , l = parcelRequire("bdjQ6").Buffer;
  const c = (0,
  r.struct)([(0,
  r.u8)("instruction"), (0,
  i.u64)("amount"), (0,
  r.u8)("decimals")]);
  function h(t, e, r, i, s, h, A=[], f=o.TOKEN_PROGRAM_ID) {
      const p = (0,
      a.addSigners)([{
          pubkey: t,
          isSigner: !1,
          isWritable: !0
      }, {
          pubkey: e,
          isSigner: !1,
          isWritable: !1
      }, {
          pubkey: r,
          isSigner: !1,
          isWritable: !0
      }], i, A)
        , g = l.alloc(c.span);
      return c.encode({
          instruction: u.TokenInstruction.TransferChecked,
          amount: BigInt(s),
          decimals: h
      }, g),
      new (0,
      n.TransactionInstruction)({
          keys: p,
          programId: f,
          data: g
      })
  }
  function A(t, e=o.TOKEN_PROGRAM_ID) {
      if (!t.programId.equals(e))
          throw new (0,
          s.TokenInvalidInstructionProgramError);
      if (t.data.length !== c.span)
          throw new (0,
          s.TokenInvalidInstructionDataError);
      const {keys: {source: r, mint: i, destination: n, owner: a, multiSigners: l}, data: h} = function({programId: t, keys: [e,r,i,n,...o], data: s}) {
          return {
              programId: t,
              keys: {
                  source: e,
                  mint: r,
                  destination: i,
                  owner: n,
                  multiSigners: o
              },
              data: c.decode(s)
          }
      }(t);
      if (h.instruction !== u.TokenInstruction.TransferChecked)
          throw new (0,
          s.TokenInvalidInstructionTypeError);
      if (!(r && i && n && a))
          throw new (0,
          s.TokenInvalidInstructionKeysError);
      return {
          programId: e,
          keys: {
              source: r,
              mint: i,
              destination: n,
              owner: a,
              multiSigners: l
          },
          data: h
      }
  }
}
)),
parcelRequire.register("T2T7u", (function(t, e) {
  $parcel$export(t.exports, "createApproveCheckedInstruction", (function() {
      return h
  }
  )),
  $parcel$export(t.exports, "decodeApproveCheckedInstruction", (function() {
      return A
  }
  ));
  var r = parcelRequire("TqRmH");
  parcelRequire("5cMDx");
  var i = parcelRequire("47UuN")
    , n = parcelRequire("1I0vV")
    , o = parcelRequire("aRaan")
    , s = parcelRequire("jmhfG")
    , a = parcelRequire("6yEk2")
    , u = parcelRequire("hr1dc")
    , l = parcelRequire("bdjQ6").Buffer;
  const c = (0,
  r.struct)([(0,
  r.u8)("instruction"), (0,
  i.u64)("amount"), (0,
  r.u8)("decimals")]);
  function h(t, e, r, i, s, h, A=[], f=o.TOKEN_PROGRAM_ID) {
      const p = (0,
      a.addSigners)([{
          pubkey: t,
          isSigner: !1,
          isWritable: !0
      }, {
          pubkey: e,
          isSigner: !1,
          isWritable: !1
      }, {
          pubkey: r,
          isSigner: !1,
          isWritable: !1
      }], i, A)
        , g = l.alloc(c.span);
      return c.encode({
          instruction: u.TokenInstruction.ApproveChecked,
          amount: BigInt(s),
          decimals: h
      }, g),
      new (0,
      n.TransactionInstruction)({
          keys: p,
          programId: f,
          data: g
      })
  }
  function A(t, e=o.TOKEN_PROGRAM_ID) {
      if (!t.programId.equals(e))
          throw new (0,
          s.TokenInvalidInstructionProgramError);
      if (t.data.length !== c.span)
          throw new (0,
          s.TokenInvalidInstructionDataError);
      const {keys: {account: r, mint: i, delegate: n, owner: a, multiSigners: l}, data: h} = function({programId: t, keys: [e,r,i,n,...o], data: s}) {
          return {
              programId: t,
              keys: {
                  account: e,
                  mint: r,
                  delegate: i,
                  owner: n,
                  multiSigners: o
              },
              data: c.decode(s)
          }
      }(t);
      if (h.instruction !== u.TokenInstruction.ApproveChecked)
          throw new (0,
          s.TokenInvalidInstructionTypeError);
      if (!(r && i && n && a))
          throw new (0,
          s.TokenInvalidInstructionKeysError);
      return {
          programId: e,
          keys: {
              account: r,
              mint: i,
              delegate: n,
              owner: a,
              multiSigners: l
          },
          data: h
      }
  }
}
)),
parcelRequire.register("dtA8t", (function(t, e) {
  $parcel$export(t.exports, "createMintToCheckedInstruction", (function() {
      return h
  }
  )),
  $parcel$export(t.exports, "decodeMintToCheckedInstruction", (function() {
      return A
  }
  ));
  var r = parcelRequire("TqRmH");
  parcelRequire("5cMDx");
  var i = parcelRequire("47UuN")
    , n = parcelRequire("1I0vV")
    , o = parcelRequire("aRaan")
    , s = parcelRequire("jmhfG")
    , a = parcelRequire("6yEk2")
    , u = parcelRequire("hr1dc")
    , l = parcelRequire("bdjQ6").Buffer;
  const c = (0,
  r.struct)([(0,
  r.u8)("instruction"), (0,
  i.u64)("amount"), (0,
  r.u8)("decimals")]);
  function h(t, e, r, i, s, h=[], A=o.TOKEN_PROGRAM_ID) {
      const f = (0,
      a.addSigners)([{
          pubkey: t,
          isSigner: !1,
          isWritable: !0
      }, {
          pubkey: e,
          isSigner: !1,
          isWritable: !0
      }], r, h)
        , p = l.alloc(c.span);
      return c.encode({
          instruction: u.TokenInstruction.MintToChecked,
          amount: BigInt(i),
          decimals: s
      }, p),
      new (0,
      n.TransactionInstruction)({
          keys: f,
          programId: A,
          data: p
      })
  }
  function A(t, e=o.TOKEN_PROGRAM_ID) {
      if (!t.programId.equals(e))
          throw new (0,
          s.TokenInvalidInstructionProgramError);
      if (t.data.length !== c.span)
          throw new (0,
          s.TokenInvalidInstructionDataError);
      const {keys: {mint: r, destination: i, authority: n, multiSigners: a}, data: l} = function({programId: t, keys: [e,r,i,...n], data: o}) {
          return {
              programId: t,
              keys: {
                  mint: e,
                  destination: r,
                  authority: i,
                  multiSigners: n
              },
              data: c.decode(o)
          }
      }(t);
      if (l.instruction !== u.TokenInstruction.MintToChecked)
          throw new (0,
          s.TokenInvalidInstructionTypeError);
      if (!r || !i || !n)
          throw new (0,
          s.TokenInvalidInstructionKeysError);
      return {
          programId: e,
          keys: {
              mint: r,
              destination: i,
              authority: n,
              multiSigners: a
          },
          data: l
      }
  }
}
)),
parcelRequire.register("6nXdm", (function(t, e) {
  $parcel$export(t.exports, "createBurnCheckedInstruction", (function() {
      return h
  }
  )),
  $parcel$export(t.exports, "decodeBurnCheckedInstruction", (function() {
      return A
  }
  ));
  var r = parcelRequire("TqRmH");
  parcelRequire("5cMDx");
  var i = parcelRequire("47UuN")
    , n = parcelRequire("1I0vV")
    , o = parcelRequire("aRaan")
    , s = parcelRequire("jmhfG")
    , a = parcelRequire("6yEk2")
    , u = parcelRequire("hr1dc")
    , l = parcelRequire("bdjQ6").Buffer;
  const c = (0,
  r.struct)([(0,
  r.u8)("instruction"), (0,
  i.u64)("amount"), (0,
  r.u8)("decimals")]);
  function h(t, e, r, i, s, h=[], A=o.TOKEN_PROGRAM_ID) {
      const f = (0,
      a.addSigners)([{
          pubkey: t,
          isSigner: !1,
          isWritable: !0
      }, {
          pubkey: e,
          isSigner: !1,
          isWritable: !0
      }], r, h)
        , p = l.alloc(c.span);
      return c.encode({
          instruction: u.TokenInstruction.BurnChecked,
          amount: BigInt(i),
          decimals: s
      }, p),
      new (0,
      n.TransactionInstruction)({
          keys: f,
          programId: A,
          data: p
      })
  }
  function A(t, e=o.TOKEN_PROGRAM_ID) {
      if (!t.programId.equals(e))
          throw new (0,
          s.TokenInvalidInstructionProgramError);
      if (t.data.length !== c.span)
          throw new (0,
          s.TokenInvalidInstructionDataError);
      const {keys: {account: r, mint: i, owner: n, multiSigners: a}, data: l} = function({programId: t, keys: [e,r,i,...n], data: o}) {
          return {
              programId: t,
              keys: {
                  account: e,
                  mint: r,
                  owner: i,
                  multiSigners: n
              },
              data: c.decode(o)
          }
      }(t);
      if (l.instruction !== u.TokenInstruction.BurnChecked)
          throw new (0,
          s.TokenInvalidInstructionTypeError);
      if (!r || !i || !n)
          throw new (0,
          s.TokenInvalidInstructionKeysError);
      return {
          programId: e,
          keys: {
              account: r,
              mint: i,
              owner: n,
              multiSigners: a
          },
          data: l
      }
  }
}
)),
parcelRequire.register("14jDN", (function(t, e) {}
)),
parcelRequire.register("1rUnR", (function(t, e) {
  $parcel$export(t.exports, "createSyncNativeInstruction", (function() {
      return l
  }
  )),
  $parcel$export(t.exports, "decodeSyncNativeInstruction", (function() {
      return c
  }
  ));
  var r = parcelRequire("TqRmH")
    , i = parcelRequire("1I0vV")
    , n = parcelRequire("aRaan")
    , o = parcelRequire("jmhfG")
    , s = parcelRequire("hr1dc")
    , a = parcelRequire("bdjQ6").Buffer;
  const u = (0,
  r.struct)([(0,
  r.u8)("instruction")]);
  function l(t, e=n.TOKEN_PROGRAM_ID) {
      const r = [{
          pubkey: t,
          isSigner: !1,
          isWritable: !0
      }]
        , o = a.alloc(u.span);
      return u.encode({
          instruction: s.TokenInstruction.SyncNative
      }, o),
      new (0,
      i.TransactionInstruction)({
          keys: r,
          programId: e,
          data: o
      })
  }
  function c(t, e=n.TOKEN_PROGRAM_ID) {
      if (!t.programId.equals(e))
          throw new (0,
          o.TokenInvalidInstructionProgramError);
      if (t.data.length !== u.span)
          throw new (0,
          o.TokenInvalidInstructionDataError);
      const {keys: {account: r}, data: i} = function({programId: t, keys: [e], data: r}) {
          return {
              programId: t,
              keys: {
                  account: e
              },
              data: u.decode(r)
          }
      }(t);
      if (i.instruction !== s.TokenInstruction.SyncNative)
          throw new (0,
          o.TokenInvalidInstructionTypeError);
      if (!r)
          throw new (0,
          o.TokenInvalidInstructionKeysError);
      return {
          programId: e,
          keys: {
              account: r
          },
          data: i
      }
  }
}
)),
parcelRequire.register("gJdaW", (function(t, e) {}
)),
parcelRequire.register("dtXDe", (function(t, e) {}
)),
parcelRequire.register("joiv7", (function(t, e) {}
)),
parcelRequire.register("QZVkW", (function(t, e) {
  parcelRequire("TqRmH"),
  parcelRequire("aRaan"),
  parcelRequire("jmhfG"),
  parcelRequire("j9Ci5"),
  parcelRequire("T2T7u"),
  parcelRequire("9zJQ2"),
  parcelRequire("6nXdm"),
  parcelRequire("1H0FU"),
  parcelRequire("8wm4p"),
  parcelRequire("6a2zX"),
  parcelRequire("dfyGi"),
  parcelRequire("wv179"),
  parcelRequire("jgOdr"),
  parcelRequire("dtA8t"),
  parcelRequire("VSV2S"),
  parcelRequire("9TNKN"),
  parcelRequire("1rUnR"),
  parcelRequire("aT8PN"),
  parcelRequire("bsR7n"),
  parcelRequire("kb76L"),
  parcelRequire("hr1dc")
}
)),
parcelRequire.register("jEnHz", (function(t, e) {
  $parcel$export(t.exports, "createAssociatedTokenAccountInstruction", (function() {
      return o
  }
  ));
  var r = parcelRequire("1I0vV")
    , i = parcelRequire("aRaan")
    , n = parcelRequire("bdjQ6").Buffer;
  function o(t, e, o, s, a=i.TOKEN_PROGRAM_ID, u=i.ASSOCIATED_TOKEN_PROGRAM_ID) {
      const l = [{
          pubkey: t,
          isSigner: !0,
          isWritable: !0
      }, {
          pubkey: e,
          isSigner: !1,
          isWritable: !0
      }, {
          pubkey: o,
          isSigner: !1,
          isWritable: !1
      }, {
          pubkey: s,
          isSigner: !1,
          isWritable: !1
      }, {
          pubkey: r.SystemProgram.programId,
          isSigner: !1,
          isWritable: !1
      }, {
          pubkey: a,
          isSigner: !1,
          isWritable: !1
      }, {
          pubkey: r.SYSVAR_RENT_PUBKEY,
          isSigner: !1,
          isWritable: !1
      }];
      return new (0,
      r.TransactionInstruction)({
          keys: l,
          programId: u,
          data: n.alloc(0)
      })
  }
}
)),
parcelRequire.register("ckCrM", (function(t, e) {
  $parcel$export(t.exports, "ACCOUNT_SIZE", (function() {
      return parcelRequire("8Ksj4").ACCOUNT_SIZE
  }
  )),
  $parcel$export(t.exports, "getAccount", (function() {
      return parcelRequire("8Ksj4").getAccount
  }
  )),
  $parcel$export(t.exports, "getMinimumBalanceForRentExemptAccount", (function() {
      return parcelRequire("8Ksj4").getMinimumBalanceForRentExemptAccount
  }
  )),
  $parcel$export(t.exports, "MINT_SIZE", (function() {
      return parcelRequire("aTMmc").MINT_SIZE
  }
  )),
  $parcel$export(t.exports, "getAssociatedTokenAddress", (function() {
      return parcelRequire("aTMmc").getAssociatedTokenAddress
  }
  )),
  $parcel$export(t.exports, "getMinimumBalanceForRentExemptMint", (function() {
      return parcelRequire("aTMmc").getMinimumBalanceForRentExemptMint
  }
  )),
  $parcel$export(t.exports, "getMint", (function() {
      return parcelRequire("aTMmc").getMint
  }
  )),
  $parcel$export(t.exports, "MULTISIG_SIZE", (function() {
      return parcelRequire("9xofQ").MULTISIG_SIZE
  }
  )),
  $parcel$export(t.exports, "getMinimumBalanceForRentExemptMultisig", (function() {
      return parcelRequire("9xofQ").getMinimumBalanceForRentExemptMultisig
  }
  )),
  parcelRequire("8Ksj4"),
  parcelRequire("aTMmc"),
  parcelRequire("9xofQ")
}
)),
parcelRequire.register("8Ksj4", (function(t, e) {
  $parcel$export(t.exports, "ACCOUNT_SIZE", (function() {
      return c
  }
  )),
  $parcel$export(t.exports, "getAccount", (function() {
      return h
  }
  )),
  $parcel$export(t.exports, "getMinimumBalanceForRentExemptAccount", (function() {
      return A
  }
  ));
  var r = parcelRequire("TqRmH");
  parcelRequire("5cMDx");
  var i, n, o = parcelRequire("661cH"), s = parcelRequire("47UuN"), a = parcelRequire("aRaan"), u = parcelRequire("jmhfG");
  (n = i || (i = {}))[n.Uninitialized = 0] = "Uninitialized",
  n[n.Initialized = 1] = "Initialized",
  n[n.Frozen = 2] = "Frozen";
  const l = (0,
  r.struct)([(0,
  o.publicKey)("mint"), (0,
  o.publicKey)("owner"), (0,
  s.u64)("amount"), (0,
  r.u32)("delegateOption"), (0,
  o.publicKey)("delegate"), (0,
  r.u8)("state"), (0,
  r.u32)("isNativeOption"), (0,
  s.u64)("isNative"), (0,
  s.u64)("delegatedAmount"), (0,
  r.u32)("closeAuthorityOption"), (0,
  o.publicKey)("closeAuthority")])
    , c = l.span;
  async function h(t, e, r, n=a.TOKEN_PROGRAM_ID) {
      const o = await t.getAccountInfo(e, r);
      if (!o)
          throw new (0,
          u.TokenAccountNotFoundError);
      if (!o.owner.equals(n))
          throw new (0,
          u.TokenInvalidAccountOwnerError);
      if (o.data.length != c)
          throw new (0,
          u.TokenInvalidAccountSizeError);
      const s = l.decode(o.data);
      return {
          address: e,
          mint: s.mint,
          owner: s.owner,
          amount: s.amount,
          delegate: s.delegateOption ? s.delegate : null,
          delegatedAmount: s.delegatedAmount,
          isInitialized: s.state !== i.Uninitialized,
          isFrozen: s.state === i.Frozen,
          isNative: !!s.isNativeOption,
          rentExemptReserve: s.isNativeOption ? s.isNative : null,
          closeAuthority: s.closeAuthorityOption ? s.closeAuthority : null
      }
  }
  async function A(t, e) {
      return await t.getMinimumBalanceForRentExemption(c, e)
  }
}
)),
parcelRequire.register("aTMmc", (function(t, e) {
  $parcel$export(t.exports, "MINT_SIZE", (function() {
      return c
  }
  )),
  $parcel$export(t.exports, "getMint", (function() {
      return h
  }
  )),
  $parcel$export(t.exports, "getMinimumBalanceForRentExemptMint", (function() {
      return A
  }
  )),
  $parcel$export(t.exports, "getAssociatedTokenAddress", (function() {
      return f
  }
  ));
  var r = parcelRequire("TqRmH");
  parcelRequire("5cMDx");
  var i = parcelRequire("661cH")
    , n = parcelRequire("47UuN")
    , o = parcelRequire("gmUNM")
    , s = parcelRequire("1I0vV")
    , a = parcelRequire("aRaan")
    , u = parcelRequire("jmhfG");
  const l = (0,
  r.struct)([(0,
  r.u32)("mintAuthorityOption"), (0,
  i.publicKey)("mintAuthority"), (0,
  n.u64)("supply"), (0,
  r.u8)("decimals"), (0,
  o.bool)("isInitialized"), (0,
  r.u32)("freezeAuthorityOption"), (0,
  i.publicKey)("freezeAuthority")])
    , c = l.span;
  async function h(t, e, r, i=a.TOKEN_PROGRAM_ID) {
      const n = await t.getAccountInfo(e, r);
      if (!n)
          throw new (0,
          u.TokenAccountNotFoundError);
      if (!n.owner.equals(i))
          throw new (0,
          u.TokenInvalidAccountOwnerError);
      if (n.data.length != c)
          throw new (0,
          u.TokenInvalidAccountSizeError);
      const o = l.decode(n.data);
      return {
          address: e,
          mintAuthority: o.mintAuthorityOption ? o.mintAuthority : null,
          supply: o.supply,
          decimals: o.decimals,
          isInitialized: o.isInitialized,
          freezeAuthority: o.freezeAuthorityOption ? o.freezeAuthority : null
      }
  }
  async function A(t, e) {
      return await t.getMinimumBalanceForRentExemption(c, e)
  }
  async function f(t, e, r=!1, i=a.TOKEN_PROGRAM_ID, n=a.ASSOCIATED_TOKEN_PROGRAM_ID) {
      if (!r && !s.PublicKey.isOnCurve(e.toBuffer()))
          throw new (0,
          u.TokenOwnerOffCurveError);
      const [o] = await s.PublicKey.findProgramAddress([e.toBuffer(), i.toBuffer(), t.toBuffer()], n);
      return o
  }
}
)),
parcelRequire.register("9xofQ", (function(t, e) {
  $parcel$export(t.exports, "MULTISIG_SIZE", (function() {
      return s
  }
  )),
  $parcel$export(t.exports, "getMinimumBalanceForRentExemptMultisig", (function() {
      return a
  }
  ));
  var r = parcelRequire("TqRmH");
  parcelRequire("5cMDx");
  var i = parcelRequire("gmUNM")
    , n = parcelRequire("661cH");
  parcelRequire("aRaan"),
  parcelRequire("jmhfG");
  const o = (0,
  r.struct)([(0,
  r.u8)("m"), (0,
  r.u8)("n"), (0,
  i.bool)("isInitialized"), (0,
  n.publicKey)("signer1"), (0,
  n.publicKey)("signer2"), (0,
  n.publicKey)("signer3"), (0,
  n.publicKey)("signer4"), (0,
  n.publicKey)("signer5"), (0,
  n.publicKey)("signer6"), (0,
  n.publicKey)("signer7"), (0,
  n.publicKey)("signer8"), (0,
  n.publicKey)("signer9"), (0,
  n.publicKey)("signer10"), (0,
  n.publicKey)("signer11")])
    , s = o.span;
  async function a(t, e) {
      return await t.getMinimumBalanceForRentExemption(s, e)
  }
}
)),
parcelRequire.register("3RO9G", (function(t, e) {
  parcelRequire("sthN2"),
  parcelRequire("hChX6"),
  parcelRequire("cQfSA"),
  parcelRequire("otu5h"),
  parcelRequire("2YI6N"),
  parcelRequire("62XH6"),
  parcelRequire("3pNlL"),
  parcelRequire("kYEUr"),
  parcelRequire("gOtUe"),
  parcelRequire("3JhmR"),
  parcelRequire("8QAhu"),
  parcelRequire("inJos"),
  parcelRequire("2F2ps"),
  parcelRequire("bhMZM"),
  parcelRequire("2sw8H"),
  parcelRequire("aKlU2"),
  parcelRequire("ci7Y1"),
  parcelRequire("dkuQ7"),
  parcelRequire("aC7EY"),
  parcelRequire("emcsW")
}
)),
parcelRequire.register("sthN2", (function(t, e) {
  parcelRequire("1I0vV"),
  parcelRequire("aRaan");
  parcelRequire("d7jCJ");
  parcelRequire("dfyGi");
  parcelRequire("ckCrM");
  parcelRequire("aTMmc")
}
)),
parcelRequire.register("hChX6", (function(t, e) {
  $parcel$export(t.exports, "createAccount", (function() {
      return a
  }
  ));
  var r = parcelRequire("1I0vV")
    , i = parcelRequire("aRaan");
  parcelRequire("d7jCJ");
  var n = parcelRequire("6a2zX");
  parcelRequire("ckCrM");
  var o = parcelRequire("8Ksj4")
    , s = parcelRequire("aC7EY");
  async function a(t, e, a, u, l, c, h=i.TOKEN_PROGRAM_ID) {
      if (!l)
          return await (0,
          s.createAssociatedTokenAccount)(t, e, a, u, c, h);
      const A = await (0,
      o.getMinimumBalanceForRentExemptAccount)(t)
        , f = (new (0,
      r.Transaction)).add(r.SystemProgram.createAccount({
          fromPubkey: e.publicKey,
          newAccountPubkey: l.publicKey,
          space: o.ACCOUNT_SIZE,
          lamports: A,
          programId: h
      }), (0,
      n.createInitializeAccountInstruction)(l.publicKey, a, u, h));
      return await (0,
      r.sendAndConfirmTransaction)(t, f, [e, l], c),
      l.publicKey
  }
}
)),
parcelRequire.register("aC7EY", (function(t, e) {
  $parcel$export(t.exports, "createAssociatedTokenAccount", (function() {
      return s
  }
  ));
  var r = parcelRequire("1I0vV")
    , i = parcelRequire("aRaan");
  parcelRequire("d7jCJ");
  var n = parcelRequire("jEnHz");
  parcelRequire("ckCrM");
  var o = parcelRequire("aTMmc");
  async function s(t, e, s, a, u, l=i.TOKEN_PROGRAM_ID, c=i.ASSOCIATED_TOKEN_PROGRAM_ID) {
      const h = await (0,
      o.getAssociatedTokenAddress)(s, a, !1, l, c)
        , A = (new (0,
      r.Transaction)).add((0,
      n.createAssociatedTokenAccountInstruction)(e.publicKey, h, a, s, l, c));
      return await (0,
      r.sendAndConfirmTransaction)(t, A, [e], u),
      h
  }
}
)),
parcelRequire.register("cQfSA", (function(t, e) {
  parcelRequire("1I0vV"),
  parcelRequire("aRaan");
  parcelRequire("d7jCJ");
  parcelRequire("jEnHz"),
  parcelRequire("1rUnR"),
  parcelRequire("6a2zX");
  parcelRequire("ckCrM");
  parcelRequire("aTMmc"),
  parcelRequire("8Ksj4"),
  parcelRequire("hChX6")
}
)),
parcelRequire.register("otu5h", (function(t, e) {
  parcelRequire("1I0vV"),
  parcelRequire("aRaan");
  parcelRequire("d7jCJ");
  parcelRequire("wv179");
  parcelRequire("ckCrM");
  parcelRequire("9xofQ")
}
)),
parcelRequire.register("2YI6N", (function(t, e) {
  parcelRequire("1I0vV"),
  parcelRequire("aRaan");
  parcelRequire("d7jCJ");
  parcelRequire("bsR7n"),
  parcelRequire("cwrrd")
}
)),
parcelRequire.register("cwrrd", (function(t, e) {
  $parcel$export(t.exports, "getSigners", (function() {
      return i
  }
  ));
  var r = parcelRequire("1I0vV");
  function i(t, e) {
      return t instanceof r.PublicKey ? [t, e] : [t.publicKey, [t]]
  }
}
)),
parcelRequire.register("62XH6", (function(t, e) {
  parcelRequire("1I0vV"),
  parcelRequire("aRaan");
  parcelRequire("d7jCJ");
  parcelRequire("j9Ci5"),
  parcelRequire("cwrrd")
}
)),
parcelRequire.register("3pNlL", (function(t, e) {
  parcelRequire("1I0vV"),
  parcelRequire("aRaan");
  parcelRequire("d7jCJ");
  parcelRequire("VSV2S"),
  parcelRequire("cwrrd")
}
)),
parcelRequire.register("kYEUr", (function(t, e) {
  parcelRequire("1I0vV"),
  parcelRequire("aRaan");
  parcelRequire("d7jCJ");
  parcelRequire("9TNKN"),
  parcelRequire("cwrrd")
}
)),
parcelRequire.register("gOtUe", (function(t, e) {
  parcelRequire("1I0vV"),
  parcelRequire("aRaan");
  parcelRequire("d7jCJ");
  parcelRequire("jgOdr"),
  parcelRequire("cwrrd")
}
)),
parcelRequire.register("3JhmR", (function(t, e) {
  parcelRequire("1I0vV"),
  parcelRequire("aRaan");
  parcelRequire("d7jCJ");
  parcelRequire("9zJQ2"),
  parcelRequire("cwrrd")
}
)),
parcelRequire.register("8QAhu", (function(t, e) {
  parcelRequire("1I0vV"),
  parcelRequire("aRaan");
  parcelRequire("d7jCJ");
  parcelRequire("1H0FU"),
  parcelRequire("cwrrd")
}
)),
parcelRequire.register("inJos", (function(t, e) {
  parcelRequire("1I0vV"),
  parcelRequire("aRaan");
  parcelRequire("d7jCJ");
  parcelRequire("8wm4p"),
  parcelRequire("cwrrd")
}
)),
parcelRequire.register("2F2ps", (function(t, e) {
  parcelRequire("1I0vV"),
  parcelRequire("aRaan");
  parcelRequire("d7jCJ");
  parcelRequire("aT8PN"),
  parcelRequire("cwrrd")
}
)),
parcelRequire.register("bhMZM", (function(t, e) {
  parcelRequire("1I0vV"),
  parcelRequire("aRaan");
  parcelRequire("d7jCJ");
  parcelRequire("kb76L"),
  parcelRequire("cwrrd")
}
)),
parcelRequire.register("2sw8H", (function(t, e) {
  parcelRequire("1I0vV"),
  parcelRequire("aRaan");
  parcelRequire("d7jCJ");
  parcelRequire("T2T7u"),
  parcelRequire("cwrrd")
}
)),
parcelRequire.register("aKlU2", (function(t, e) {
  parcelRequire("1I0vV"),
  parcelRequire("aRaan");
  parcelRequire("d7jCJ");
  parcelRequire("dtA8t"),
  parcelRequire("cwrrd")
}
)),
parcelRequire.register("ci7Y1", (function(t, e) {
  parcelRequire("1I0vV"),
  parcelRequire("aRaan");
  parcelRequire("d7jCJ");
  parcelRequire("6nXdm"),
  parcelRequire("cwrrd")
}
)),
parcelRequire.register("dkuQ7", (function(t, e) {
  parcelRequire("1I0vV"),
  parcelRequire("aRaan");
  parcelRequire("d7jCJ");
  parcelRequire("1rUnR")
}
)),
parcelRequire.register("emcsW", (function(t, e) {
  parcelRequire("1I0vV"),
  parcelRequire("aRaan"),
  parcelRequire("jmhfG");
  parcelRequire("d7jCJ");
  parcelRequire("jEnHz");
  parcelRequire("ckCrM");
  parcelRequire("aTMmc"),
  parcelRequire("8Ksj4")
}
)),
parcelRequire.register("lGN8w", (function(t, e) {
  Object.defineProperty(t.exports, "__esModule", {
      value: !0
  }),
  t.exports.registerDomainName = t.exports.deleteNameRegistry = t.exports.transferNameOwnership = t.exports.updateNameRegistryData = t.exports.createNameRegistry = void 0;
  var r = parcelRequire("1I0vV")
    , i = parcelRequire("4q37x")
    , n = parcelRequire("8y9KR")
    , o = parcelRequire("cd1Oh")
    , s = parcelRequire("hAmoF")
    , a = parcelRequire("lkF0u");
  t.exports.createNameRegistry = async function(t, e, n, u, l, c, h, A) {
      const f = await (0,
      s.getHashedName)(e)
        , p = await (0,
      s.getNameAccountKey)(f, h, A)
        , g = c || await t.getMinimumBalanceForRentExemption(n);
      let d;
      if (A) {
          const {registry: e} = await (0,
          s.getNameOwner)(t, A);
          d = e.owner
      }
      return (0,
      i.createInstruction)(a.NAME_PROGRAM_ID, r.SystemProgram.programId, p, l, u, f, new o.Numberu64(g), new o.Numberu32(n), h, A, d)
  }
  ,
  t.exports.updateNameRegistryData = async function(t, e, r, u, l, c) {
      const h = await (0,
      s.getHashedName)(e)
        , A = await (0,
      s.getNameAccountKey)(h, l, c);
      let f;
      return f = l || (await n.NameRegistryState.retrieve(t, A)).registry.owner,
      (0,
      i.updateInstruction)(a.NAME_PROGRAM_ID, A, new o.Numberu32(r), u, f)
  }
  ,
  t.exports.transferNameOwnership = async function(t, e, r, o, u, l) {
      const c = await (0,
      s.getHashedName)(e)
        , h = await (0,
      s.getNameAccountKey)(c, o, u);
      let A;
      return A = o || (await n.NameRegistryState.retrieve(t, h)).registry.owner,
      (0,
      i.transferInstruction)(a.NAME_PROGRAM_ID, h, r, A, o, u, l)
  }
  ,
  t.exports.deleteNameRegistry = async function(t, e, r, o, u) {
      const l = await (0,
      s.getHashedName)(e)
        , c = await (0,
      s.getNameAccountKey)(l, o, u);
      let h;
      return h = o || (await n.NameRegistryState.retrieve(t, c)).registry.owner,
      (0,
      i.deleteInstruction)(a.NAME_PROGRAM_ID, c, r, h)
  }
  ;
  t.exports.registerDomainName = async(t,e,n,o)=>{
      const [u] = await r.PublicKey.findProgramAddress([a.REGISTER_PROGRAM_ID.toBuffer()], a.REGISTER_PROGRAM_ID)
        , l = await (0,
      s.getHashedName)(t)
        , c = await (0,
      s.getNameAccountKey)(l, void 0, a.ROOT_DOMAIN_ACCOUNT)
        , h = await (0,
      s.getHashedName)(c.toBase58())
        , A = await (0,
      s.getNameAccountKey)(h, u)
        , [f] = await r.PublicKey.findProgramAddress([c.toBuffer()], a.REGISTER_PROGRAM_ID);
      return [[], [new i.createV2Instruction({
          name: t,
          space: e
      }).getInstruction(a.REGISTER_PROGRAM_ID, r.SYSVAR_RENT_PUBKEY, a.NAME_PROGRAM_ID, a.ROOT_DOMAIN_ACCOUNT, c, A, u, n, o, a.BONFIDA_FIDA_BNB, f)]]
  }
}
)),
parcelRequire.register("4q37x", (function(t, e) {
  var r = parcelRequire("bdjQ6").Buffer;
  Object.defineProperty(t.exports, "__esModule", {
      value: !0
  }),
  t.exports.createV2Instruction = t.exports.deleteInstruction = t.exports.transferInstruction = t.exports.updateInstruction = t.exports.createInstruction = void 0;
  var i = parcelRequire("1I0vV");
  parcelRequire("1PYYk");
  var n = parcelRequire("aRaan")
    , o = parcelRequire("cd1Oh")
    , s = parcelRequire("fXZ66")
    , a = parcelRequire("lkF0u");
  t.exports.createInstruction = function(t, e, n, s, a, u, l, c, h, A, f) {
      const p = [r.from(Int8Array.from([0])), new o.Numberu32(u.length).toBuffer(), u, l.toBuffer(), c.toBuffer()]
        , g = r.concat(p)
        , d = [{
          pubkey: e,
          isSigner: !1,
          isWritable: !1
      }, {
          pubkey: a,
          isSigner: !0,
          isWritable: !0
      }, {
          pubkey: n,
          isSigner: !1,
          isWritable: !0
      }, {
          pubkey: s,
          isSigner: !1,
          isWritable: !1
      }];
      return h ? d.push({
          pubkey: h,
          isSigner: !0,
          isWritable: !1
      }) : d.push({
          pubkey: new i.PublicKey(r.alloc(32)),
          isSigner: !1,
          isWritable: !1
      }),
      A ? d.push({
          pubkey: A,
          isSigner: !1,
          isWritable: !1
      }) : d.push({
          pubkey: new i.PublicKey(r.alloc(32)),
          isSigner: !1,
          isWritable: !1
      }),
      f && d.push({
          pubkey: f,
          isSigner: !0,
          isWritable: !1
      }),
      new i.TransactionInstruction({
          keys: d,
          programId: t,
          data: g
      })
  }
  ,
  t.exports.updateInstruction = function(t, e, n, s, a) {
      const u = [r.from(Int8Array.from([1])), n.toBuffer(), new o.Numberu32(s.length).toBuffer(), s]
        , l = r.concat(u)
        , c = [{
          pubkey: e,
          isSigner: !1,
          isWritable: !0
      }, {
          pubkey: a,
          isSigner: !0,
          isWritable: !1
      }];
      return new i.TransactionInstruction({
          keys: c,
          programId: t,
          data: l
      })
  }
  ,
  t.exports.transferInstruction = function(t, e, n, o, s, a, u) {
      const l = [r.from(Int8Array.from([2])), n.toBuffer()]
        , c = r.concat(l)
        , h = [{
          pubkey: e,
          isSigner: !1,
          isWritable: !0
      }, {
          pubkey: u || o,
          isSigner: !0,
          isWritable: !1
      }];
      return s && h.push({
          pubkey: s,
          isSigner: !0,
          isWritable: !1
      }),
      u && a && (s || h.push({
          pubkey: i.PublicKey.default,
          isSigner: !1,
          isWritable: !1
      }),
      h.push({
          pubkey: a,
          isSigner: !1,
          isWritable: !1
      })),
      new i.TransactionInstruction({
          keys: h,
          programId: t,
          data: c
      })
  }
  ,
  t.exports.deleteInstruction = function(t, e, n, o) {
      const s = [r.from(Int8Array.from([3]))]
        , a = r.concat(s)
        , u = [{
          pubkey: e,
          isSigner: !1,
          isWritable: !0
      }, {
          pubkey: o,
          isSigner: !0,
          isWritable: !1
      }, {
          pubkey: n,
          isSigner: !1,
          isWritable: !0
      }];
      return new i.TransactionInstruction({
          keys: u,
          programId: t,
          data: a
      })
  }
  ;
  class u {
      serialize() {
          return (0,
          s.serialize)(u.schema, this)
      }
      getInstruction(t, e, o, s, u, l, c, h, A, f, p) {
          const g = r.from(this.serialize())
            , d = [{
              pubkey: e,
              isSigner: !1,
              isWritable: !1
          }, {
              pubkey: o,
              isSigner: !1,
              isWritable: !1
          }, {
              pubkey: s,
              isSigner: !1,
              isWritable: !1
          }, {
              pubkey: u,
              isSigner: !1,
              isWritable: !0
          }, {
              pubkey: l,
              isSigner: !1,
              isWritable: !0
          }, {
              pubkey: i.SystemProgram.programId,
              isSigner: !1,
              isWritable: !1
          }, {
              pubkey: c,
              isSigner: !1,
              isWritable: !1
          }, {
              pubkey: h,
              isSigner: !0,
              isWritable: !0
          }, {
              pubkey: A,
              isSigner: !1,
              isWritable: !0
          }, {
              pubkey: a.PYTH_FIDDA_PRICE_ACC,
              isSigner: !1,
              isWritable: !1
          }, {
              pubkey: f,
              isSigner: !1,
              isWritable: !0
          }, {
              pubkey: n.TOKEN_PROGRAM_ID,
              isSigner: !1,
              isWritable: !1
          }, {
              pubkey: p,
              isSigner: !1,
              isWritable: !1
          }];
          return new i.TransactionInstruction({
              keys: d,
              programId: t,
              data: g
          })
      }
      constructor(t) {
          this.tag = 9,
          this.name = t.name,
          this.space = t.space
      }
  }
  t.exports.createV2Instruction = u,
  u.schema = new Map([[u, {
      kind: "struct",
      fields: [["tag", "u8"], ["name", "string"], ["space", "u32"]]
  }]])
}
)),
parcelRequire.register("cd1Oh", (function(t, e) {
  var r = parcelRequire("bdjQ6").Buffer
    , i = t.exports && t.exports.__importDefault || function(t) {
      return t && t.__esModule ? t : {
          default: t
      }
  }
  ;
  Object.defineProperty(t.exports, "__esModule", {
      value: !0
  }),
  t.exports.Numberu64 = t.exports.Numberu32 = void 0;
  const n = i(parcelRequire("aVh2m"));
  class o extends n.default {
      toBuffer() {
          const t = super.toArray().reverse()
            , e = r.from(t);
          if (4 === e.length)
              return e;
          if (e.length > 4)
              throw new Error("Numberu32 too large");
          const i = r.alloc(4);
          return e.copy(i),
          i
      }
      static fromBuffer(t) {
          if (4 !== t.length)
              throw new Error(`Invalid buffer length: ${t.length}`);
          return new n.default([...t].reverse().map((t=>`00${t.toString(16)}`.slice(-2))).join(""),16)
      }
  }
  t.exports.Numberu32 = o;
  class s extends n.default {
      toBuffer() {
          const t = super.toArray().reverse()
            , e = r.from(t);
          if (8 === e.length)
              return e;
          if (e.length > 8)
              throw new Error("Numberu64 too large");
          const i = r.alloc(8);
          return e.copy(i),
          i
      }
      static fromBuffer(t) {
          if (8 !== t.length)
              throw new Error(`Invalid buffer length: ${t.length}`);
          return new n.default([...t].reverse().map((t=>`00${t.toString(16)}`.slice(-2))).join(""),16)
      }
  }
  t.exports.Numberu64 = s
}
)),
parcelRequire.register("hImnM", (function(t, e) {
  var r = parcelRequire("bdjQ6").Buffer;
  Object.defineProperty(t.exports, "__esModule", {
      value: !0
  }),
  t.exports.createReverseTwitterRegistry = t.exports.ReverseTwitterRegistryState = t.exports.getTwitterRegistryData = t.exports.getTwitterHandleandRegistryKeyViaFilters = t.exports.getHandleAndRegistryKey = t.exports.getTwitterRegistry = t.exports.getTwitterRegistryKey = t.exports.deleteTwitterRegistry = t.exports.changeVerifiedPubkey = t.exports.changeTwitterRegistryData = t.exports.createVerifiedTwitterRegistry = void 0;
  var i = parcelRequire("1I0vV")
    , n = parcelRequire("lkF0u")
    , o = parcelRequire("lGN8w")
    , s = parcelRequire("4q37x")
    , a = parcelRequire("8y9KR")
    , u = parcelRequire("hAmoF")
    , l = parcelRequire("cd1Oh")
    , c = parcelRequire("fXZ66");
  t.exports.createVerifiedTwitterRegistry = async function(t, e, r, o, c) {
      const h = await (0,
      u.getHashedName)(e)
        , f = await (0,
      u.getNameAccountKey)(h, void 0, n.TWITTER_ROOT_PARENT_REGISTRY_KEY)
        , p = await t.getMinimumBalanceForRentExemption(o + a.NameRegistryState.HEADER_LEN);
      let g = [(0,
      s.createInstruction)(n.NAME_PROGRAM_ID, i.SystemProgram.programId, f, r, c, h, new l.Numberu64(p), new l.Numberu32(o), void 0, n.TWITTER_ROOT_PARENT_REGISTRY_KEY, n.TWITTER_VERIFICATION_AUTHORITY)];
      return g = g.concat(await A(t, e, f, r, c)),
      g
  }
  ,
  t.exports.changeTwitterRegistryData = async function(t, e, r, i) {
      const o = await (0,
      u.getHashedName)(t)
        , a = await (0,
      u.getNameAccountKey)(o, void 0, n.TWITTER_ROOT_PARENT_REGISTRY_KEY);
      return [(0,
      s.updateInstruction)(n.NAME_PROGRAM_ID, a, new l.Numberu32(r), i, e)]
  }
  ,
  t.exports.changeVerifiedPubkey = async function(t, e, r, i, a) {
      const l = await (0,
      u.getHashedName)(e)
        , c = await (0,
      u.getNameAccountKey)(l, void 0, n.TWITTER_ROOT_PARENT_REGISTRY_KEY);
      let h = [(0,
      s.transferInstruction)(n.NAME_PROGRAM_ID, c, i, r, void 0)];
      const f = await (0,
      u.getHashedName)(r.toString());
      return await (0,
      u.getNameAccountKey)(f, n.TWITTER_VERIFICATION_AUTHORITY, void 0),
      h.push(await (0,
      o.deleteNameRegistry)(t, r.toString(), a, n.TWITTER_VERIFICATION_AUTHORITY, n.TWITTER_ROOT_PARENT_REGISTRY_KEY)),
      h = h.concat(await A(t, e, c, i, a)),
      h
  }
  ,
  t.exports.deleteTwitterRegistry = async function(t, e) {
      const r = await (0,
      u.getHashedName)(t)
        , i = await (0,
      u.getNameAccountKey)(r, void 0, n.TWITTER_ROOT_PARENT_REGISTRY_KEY)
        , o = await (0,
      u.getHashedName)(e.toString())
        , a = await (0,
      u.getNameAccountKey)(o, n.TWITTER_VERIFICATION_AUTHORITY, n.TWITTER_ROOT_PARENT_REGISTRY_KEY);
      return [(0,
      s.deleteInstruction)(n.NAME_PROGRAM_ID, i, e, e), (0,
      s.deleteInstruction)(n.NAME_PROGRAM_ID, a, e, e)]
  }
  ,
  t.exports.getTwitterRegistryKey = async function(t) {
      const e = await (0,
      u.getHashedName)(t);
      return await (0,
      u.getNameAccountKey)(e, void 0, n.TWITTER_ROOT_PARENT_REGISTRY_KEY)
  }
  ,
  t.exports.getTwitterRegistry = async function(t, e) {
      const r = await (0,
      u.getHashedName)(e)
        , i = await (0,
      u.getNameAccountKey)(r, void 0, n.TWITTER_ROOT_PARENT_REGISTRY_KEY)
        , {registry: o} = await a.NameRegistryState.retrieve(t, i);
      return o
  }
  ,
  t.exports.getHandleAndRegistryKey = async function(t, e) {
      const r = await (0,
      u.getHashedName)(e.toString())
        , o = await (0,
      u.getNameAccountKey)(r, n.TWITTER_VERIFICATION_AUTHORITY, n.TWITTER_ROOT_PARENT_REGISTRY_KEY);
      let s = await h.retrieve(t, o);
      return [s.twitterHandle, new i.PublicKey(s.twitterRegistryKey)]
  }
  ,
  t.exports.getTwitterHandleandRegistryKeyViaFilters = async function(t, e) {
      const r = [{
          memcmp: {
              offset: 0,
              bytes: n.TWITTER_ROOT_PARENT_REGISTRY_KEY.toBase58()
          }
      }, {
          memcmp: {
              offset: 32,
              bytes: e.toBase58()
          }
      }, {
          memcmp: {
              offset: 64,
              bytes: n.TWITTER_VERIFICATION_AUTHORITY.toBase58()
          }
      }]
        , o = await t.getProgramAccounts(n.NAME_PROGRAM_ID, {
          filters: r
      });
      for (const t of o)
          if (t.account.data.length > a.NameRegistryState.HEADER_LEN + 32) {
              let e = t.account.data.slice(a.NameRegistryState.HEADER_LEN)
                , r = (0,
              c.deserializeUnchecked)(h.schema, h, e);
              return [r.twitterHandle, new i.PublicKey(r.twitterRegistryKey)]
          }
      throw new Error("Registry not found.")
  }
  ,
  t.exports.getTwitterRegistryData = async function(t, e) {
      const o = [{
          memcmp: {
              offset: 0,
              bytes: n.TWITTER_ROOT_PARENT_REGISTRY_KEY.toBase58()
          }
      }, {
          memcmp: {
              offset: 32,
              bytes: e.toBase58()
          }
      }, {
          memcmp: {
              offset: 64,
              bytes: new i.PublicKey(r.alloc(32, 0)).toBase58()
          }
      }]
        , s = await t.getProgramAccounts(n.NAME_PROGRAM_ID, {
          filters: o
      });
      if (s.length > 1)
          throw new Error("Found more than one registry.");
      return s[0].account.data.slice(a.NameRegistryState.HEADER_LEN)
  }
  ;
  class h {
      static async retrieve(t, e) {
          let r = await t.getAccountInfo(e, "processed");
          if (!r)
              throw new Error("Invalid reverse Twitter account provided");
          return (0,
          c.deserializeUnchecked)(this.schema, h, r.data.slice(a.NameRegistryState.HEADER_LEN))
      }
      constructor(t) {
          this.twitterRegistryKey = t.twitterRegistryKey,
          this.twitterHandle = t.twitterHandle
      }
  }
  async function A(t, e, o, A, f) {
      const p = await (0,
      u.getHashedName)(A.toString())
        , g = await (0,
      u.getNameAccountKey)(p, n.TWITTER_VERIFICATION_AUTHORITY, n.TWITTER_ROOT_PARENT_REGISTRY_KEY);
      let d = (0,
      c.serialize)(h.schema, new h({
          twitterRegistryKey: o.toBytes(),
          twitterHandle: e
      }));
      return [(0,
      s.createInstruction)(n.NAME_PROGRAM_ID, i.SystemProgram.programId, g, A, f, p, new l.Numberu64(await t.getMinimumBalanceForRentExemption(d.length + a.NameRegistryState.HEADER_LEN)), new l.Numberu32(d.length), n.TWITTER_VERIFICATION_AUTHORITY, n.TWITTER_ROOT_PARENT_REGISTRY_KEY, n.TWITTER_VERIFICATION_AUTHORITY), (0,
      s.updateInstruction)(n.NAME_PROGRAM_ID, g, new l.Numberu32(0), r.from(d), n.TWITTER_VERIFICATION_AUTHORITY)]
  }
  t.exports.ReverseTwitterRegistryState = h,
  h.schema = new Map([[h, {
      kind: "struct",
      fields: [["twitterRegistryKey", [32]], ["twitterHandle", "string"]]
  }]]),
  t.exports.createReverseTwitterRegistry = A
}
)),
parcelRequire.register("lzOAy", (function(t, e) {
  Object.defineProperty(t.exports, "__esModule", {
      value: !0
  }),
  t.exports.getTokenInfoFromName = t.exports.getTokenInfoFromMint = t.exports.TOKEN_TLD = void 0;
  var r = parcelRequire("1I0vV")
    , i = parcelRequire("hAmoF")
    , n = parcelRequire("8y9KR");
  t.exports.TOKEN_TLD = new r.PublicKey("6NSu2tci4apRKQtt257bAVcvqYjB3zV2H1dWo56vgpa6");
  t.exports.getTokenInfoFromMint = async(e,r)=>{
      const o = await (0,
      i.getNameAccountKey)(await (0,
      i.getHashedName)(r.toBase58()), void 0, t.exports.TOKEN_TLD)
        , {registry: s} = await n.NameRegistryState.retrieve(e, o);
      if (!s.data)
          throw new Error("Invalid account data");
      return n.TokenData.deserialize(s.data)
  }
  ;
  t.exports.getTokenInfoFromName = async(e,o)=>{
      const s = await (0,
      i.getNameAccountKey)(await (0,
      i.getHashedName)(o), void 0, t.exports.TOKEN_TLD)
        , {registry: a} = await n.NameRegistryState.retrieve(e, s);
      if (!a.data)
          throw new Error("Invalid account data");
      const u = new r.PublicKey(n.Mint.deserialize(a.data).mint);
      return await (0,
      t.exports.getTokenInfoFromMint)(e, u)
  }
}
)),
parcelRequire.register("idgFu", (function(t, e) {
  Object.defineProperty(t.exports, "__esModule", {
      value: !0
  }),
  t.exports.getFavoriteDomain = void 0;
  var r = parcelRequire("gqEni")
    , i = parcelRequire("hAmoF")
    , n = parcelRequire("1I0vV");
  t.exports.getFavoriteDomain = async(t,e)=>{
      const [o] = await r.FavouriteDomain.getKey(r.NAME_OFFERS_ID, new n.PublicKey(e))
        , s = await r.FavouriteDomain.retrieve(t, o)
        , a = await (0,
      i.performReverseLookup)(t, s.nameAccount);
      return {
          domain: s.nameAccount,
          reverse: a
      }
  }
}
)),
parcelRequire.register("gqEni", (function(t, e) {
  var r = t.exports && t.exports.__createBinding || (Object.create ? function(t, e, r, i) {
      void 0 === i && (i = r),
      Object.defineProperty(t, i, {
          enumerable: !0,
          get: function() {
              return e[r]
          }
      })
  }
  : function(t, e, r, i) {
      void 0 === i && (i = r),
      t[i] = e[r]
  }
  )
    , i = t.exports && t.exports.__exportStar || function(t, e) {
      for (var i in t)
          "default" === i || Object.prototype.hasOwnProperty.call(e, i) || r(e, t, i)
  }
  ;
  Object.defineProperty(t.exports, "__esModule", {
      value: !0
  }),
  i(parcelRequire("lOkKx"), t.exports),
  i(parcelRequire("bXHp5"), t.exports),
  i(parcelRequire("8D9KL"), t.exports),
  i(parcelRequire("fMCua"), t.exports)
}
)),
parcelRequire.register("lOkKx", (function(t, e) {
  var r = t.exports && t.exports.__importDefault || function(t) {
      return t && t.__esModule ? t : {
          default: t
      }
  }
  ;
  Object.defineProperty(t.exports, "__esModule", {
      value: !0
  }),
  t.exports.buyFixedPrice = t.exports.cancelFixedPriceOffer = t.exports.makeFixedPriceOffer = t.exports.registerFavourite = t.exports.acceptOffer = t.exports.cancelOffer = t.exports.makeOffer = t.exports.ROOT_DOMAIN = t.exports.FEE_OWNER = t.exports.NAME_OFFERS_ID_DEVNET = t.exports.NAME_OFFERS_ID = void 0;
  var i = parcelRequire("1I0vV")
    , n = parcelRequire("bXHp5");
  const o = r(parcelRequire("aVh2m"));
  var s = parcelRequire("8D9KL")
    , a = parcelRequire("24psY")
    , u = parcelRequire("gkS1M");
  t.exports.NAME_OFFERS_ID = new i.PublicKey("85iDfUvr3HJyLM2zcq5BXSiDvUWfw6cSE1FfNBo8Ap29"),
  t.exports.NAME_OFFERS_ID_DEVNET = new i.PublicKey("zugu92jR3kqgFiNEJywq7gbbc9NbaLmHLiQhsZRwd6J"),
  t.exports.FEE_OWNER = new i.PublicKey("GcWEQ9K78FV7LEHteFVciYApERk5YvQuFDQPk1yYJVXi"),
  t.exports.ROOT_DOMAIN = new i.PublicKey("58PwtjSDuFHuUkYjH9BYnnQKHfwo9reZhC2zMJv9JPkx");
  t.exports.makeOffer = async(t,e,r,u,l,c)=>{
      const [h] = await s.Offer.getKey(c, r, u, e)
        , [A] = await i.PublicKey.findProgramAddress([h.toBuffer()], c);
      return [new n.makeOfferInstruction({
          amount: new o.default(t),
          nameAccount: e.toBuffer()
      }).getInstruction(c, r, u, l, A, h, i.SystemProgram.programId, i.SYSVAR_RENT_PUBKEY, a.TOKEN_PROGRAM_ID)]
  }
  ;
  t.exports.cancelOffer = async(t,e,r,o)=>{
      const [s] = await i.PublicKey.findProgramAddress([r.toBuffer()], o);
      return [(new n.cancelOfferInstruction).getInstruction(o, t, e, s, r, a.TOKEN_PROGRAM_ID)]
  }
  ;
  t.exports.acceptOffer = async(e,r,i,o,l,c,h,A)=>{
      var f;
      const p = []
        , g = await s.Offer.retrieve(e, i)
        , d = await a.Token.getAssociatedTokenAddress(a.ASSOCIATED_TOKEN_PROGRAM_ID, a.TOKEN_PROGRAM_ID, g.quoteMint, t.exports.FEE_OWNER);
      if (!(null === (f = await e.getAccountInfo(d)) || void 0 === f ? void 0 : f.data)) {
          const e = a.Token.createAssociatedTokenAccountInstruction(a.ASSOCIATED_TOKEN_PROGRAM_ID, a.TOKEN_PROGRAM_ID, g.quoteMint, d, t.exports.FEE_OWNER, o);
          p.push(e)
      }
      const I = (new n.acceptOfferInstruction).getInstruction(r, i, l, c, h, A, d, a.TOKEN_PROGRAM_ID, u.NAME_PROGRAM_ID);
      return p.push(I),
      p
  }
  ;
  t.exports.registerFavourite = async(t,e,r)=>{
      const [o] = await s.FavouriteDomain.getKey(r, e);
      return [(new n.registerFavouriteInstruction).getInstruction(r, t, o, e, i.SystemProgram.programId)]
  }
  ;
  t.exports.makeFixedPriceOffer = async(t,e,r,l,c,h)=>{
      var A;
      const f = []
        , p = await a.Token.getAssociatedTokenAddress(a.ASSOCIATED_TOKEN_PROGRAM_ID, a.TOKEN_PROGRAM_ID, r, l);
      if (!(null === (A = await t.getAccountInfo(p)) || void 0 === A ? void 0 : A.data)) {
          const t = a.Token.createAssociatedTokenAccountInstruction(a.ASSOCIATED_TOKEN_PROGRAM_ID, a.TOKEN_PROGRAM_ID, r, p, l, l);
          f.push(t)
      }
      const [g] = await s.FixedPriceOffer.getKey(h, l, r, c)
        , d = new n.makeFixedPriceInstruction({
          amount: new o.default(e),
          quoteMint: r.toBuffer()
      }).getInstruction(h, g, l, c, p, u.NAME_PROGRAM_ID, i.SystemProgram.programId);
      return f.push(d),
      f
  }
  ;
  t.exports.cancelFixedPriceOffer = async(t,e,r)=>{
      const o = await s.FixedPriceOffer.retrieve(t, e);
      return [(new n.cancelFixedPriceInstruction).getInstruction(r, e, o.owner, o.nameAccount, u.NAME_PROGRAM_ID, i.SystemProgram.programId)]
  }
  ;
  t.exports.buyFixedPrice = async(e,r,i,o,l)=>{
      var c;
      const h = []
        , A = await s.FixedPriceOffer.retrieve(e, r)
        , f = await a.Token.getAssociatedTokenAddress(a.ASSOCIATED_TOKEN_PROGRAM_ID, a.TOKEN_PROGRAM_ID, A.quoteMint, t.exports.FEE_OWNER);
      if (!(null === (c = await e.getAccountInfo(f)) || void 0 === c ? void 0 : c.data)) {
          const e = a.Token.createAssociatedTokenAccountInstruction(a.ASSOCIATED_TOKEN_PROGRAM_ID, a.TOKEN_PROGRAM_ID, A.quoteMint, f, t.exports.FEE_OWNER, i);
          h.push(e)
      }
      const p = (new n.buyFixedPriceInstruction).getInstruction(l, r, i, A.nameAccount, A.tokenDestination, o, f, a.TOKEN_PROGRAM_ID, u.NAME_PROGRAM_ID);
      return h.push(p),
      h
  }
}
)),
parcelRequire.register("bXHp5", (function(t, e) {
  var r = parcelRequire("bdjQ6").Buffer;
  Object.defineProperty(t.exports, "__esModule", {
      value: !0
  }),
  t.exports.registerFavouriteInstruction = t.exports.makeOfferInstruction = t.exports.makeFixedPriceInstruction = t.exports.cancelOfferInstruction = t.exports.cancelFixedPriceInstruction = t.exports.buyFixedPriceInstruction = t.exports.acceptOfferInstruction = void 0;
  var i = parcelRequire("gK3Ca")
    , n = parcelRequire("1I0vV");
  class o {
      serialize() {
          return (0,
          i.serialize)(o.schema, this)
      }
      getInstruction(t, e, i, o, s, a, u, l, c) {
          const h = r.from(this.serialize());
          let A = [];
          return A.push({
              pubkey: e,
              isSigner: !1,
              isWritable: !0
          }),
          A.push({
              pubkey: i,
              isSigner: !0,
              isWritable: !1
          }),
          A.push({
              pubkey: o,
              isSigner: !1,
              isWritable: !0
          }),
          A.push({
              pubkey: s,
              isSigner: !1,
              isWritable: !0
          }),
          A.push({
              pubkey: a,
              isSigner: !1,
              isWritable: !0
          }),
          A.push({
              pubkey: u,
              isSigner: !1,
              isWritable: !0
          }),
          A.push({
              pubkey: l,
              isSigner: !1,
              isWritable: !1
          }),
          A.push({
              pubkey: c,
              isSigner: !1,
              isWritable: !1
          }),
          new n.TransactionInstruction({
              keys: A,
              programId: t,
              data: h
          })
      }
      constructor() {
          this.tag = 2
      }
  }
  t.exports.acceptOfferInstruction = o,
  o.schema = new Map([[o, {
      kind: "struct",
      fields: [["tag", "u8"]]
  }]]);
  class s {
      serialize() {
          return (0,
          i.serialize)(s.schema, this)
      }
      getInstruction(t, e, i, o, s, a, u, l, c) {
          const h = r.from(this.serialize());
          let A = [];
          return A.push({
              pubkey: e,
              isSigner: !1,
              isWritable: !0
          }),
          A.push({
              pubkey: i,
              isSigner: !0,
              isWritable: !1
          }),
          A.push({
              pubkey: o,
              isSigner: !1,
              isWritable: !0
          }),
          A.push({
              pubkey: s,
              isSigner: !1,
              isWritable: !0
          }),
          A.push({
              pubkey: a,
              isSigner: !1,
              isWritable: !0
          }),
          A.push({
              pubkey: u,
              isSigner: !1,
              isWritable: !0
          }),
          A.push({
              pubkey: l,
              isSigner: !1,
              isWritable: !1
          }),
          A.push({
              pubkey: c,
              isSigner: !1,
              isWritable: !1
          }),
          new n.TransactionInstruction({
              keys: A,
              programId: t,
              data: h
          })
      }
      constructor() {
          this.tag = 5
      }
  }
  t.exports.buyFixedPriceInstruction = s,
  s.schema = new Map([[s, {
      kind: "struct",
      fields: [["tag", "u8"]]
  }]]);
  class a {
      serialize() {
          return (0,
          i.serialize)(a.schema, this)
      }
      getInstruction(t, e, i, o, s, a) {
          const u = r.from(this.serialize());
          let l = [];
          return l.push({
              pubkey: e,
              isSigner: !1,
              isWritable: !0
          }),
          l.push({
              pubkey: i,
              isSigner: !0,
              isWritable: !1
          }),
          l.push({
              pubkey: o,
              isSigner: !1,
              isWritable: !0
          }),
          l.push({
              pubkey: s,
              isSigner: !1,
              isWritable: !1
          }),
          l.push({
              pubkey: a,
              isSigner: !1,
              isWritable: !1
          }),
          new n.TransactionInstruction({
              keys: l,
              programId: t,
              data: u
          })
      }
      constructor() {
          this.tag = 4
      }
  }
  t.exports.cancelFixedPriceInstruction = a,
  a.schema = new Map([[a, {
      kind: "struct",
      fields: [["tag", "u8"]]
  }]]);
  class u {
      serialize() {
          return (0,
          i.serialize)(u.schema, this)
      }
      getInstruction(t, e, i, o, s, a) {
          const u = r.from(this.serialize());
          let l = [];
          return l.push({
              pubkey: e,
              isSigner: !0,
              isWritable: !1
          }),
          l.push({
              pubkey: i,
              isSigner: !1,
              isWritable: !0
          }),
          l.push({
              pubkey: o,
              isSigner: !1,
              isWritable: !0
          }),
          l.push({
              pubkey: s,
              isSigner: !1,
              isWritable: !0
          }),
          l.push({
              pubkey: a,
              isSigner: !1,
              isWritable: !1
          }),
          new n.TransactionInstruction({
              keys: l,
              programId: t,
              data: u
          })
      }
      constructor() {
          this.tag = 1
      }
  }
  t.exports.cancelOfferInstruction = u,
  u.schema = new Map([[u, {
      kind: "struct",
      fields: [["tag", "u8"]]
  }]]);
  class l {
      serialize() {
          return (0,
          i.serialize)(l.schema, this)
      }
      getInstruction(t, e, i, o, s, a, u) {
          const l = r.from(this.serialize());
          let c = [];
          return c.push({
              pubkey: e,
              isSigner: !1,
              isWritable: !0
          }),
          c.push({
              pubkey: i,
              isSigner: !0,
              isWritable: !0
          }),
          c.push({
              pubkey: o,
              isSigner: !1,
              isWritable: !0
          }),
          c.push({
              pubkey: s,
              isSigner: !1,
              isWritable: !1
          }),
          c.push({
              pubkey: a,
              isSigner: !1,
              isWritable: !1
          }),
          c.push({
              pubkey: u,
              isSigner: !1,
              isWritable: !1
          }),
          new n.TransactionInstruction({
              keys: c,
              programId: t,
              data: l
          })
      }
      constructor(t) {
          this.tag = 3,
          this.amount = t.amount,
          this.quoteMint = t.quoteMint
      }
  }
  t.exports.makeFixedPriceInstruction = l,
  l.schema = new Map([[l, {
      kind: "struct",
      fields: [["tag", "u8"], ["amount", "u64"], ["quoteMint", [32]]]
  }]]);
  class c {
      serialize() {
          return (0,
          i.serialize)(c.schema, this)
      }
      getInstruction(t, e, i, o, s, a, u, l, c) {
          const h = r.from(this.serialize());
          let A = [];
          return A.push({
              pubkey: e,
              isSigner: !0,
              isWritable: !0
          }),
          A.push({
              pubkey: i,
              isSigner: !1,
              isWritable: !1
          }),
          A.push({
              pubkey: o,
              isSigner: !1,
              isWritable: !0
          }),
          A.push({
              pubkey: s,
              isSigner: !1,
              isWritable: !0
          }),
          A.push({
              pubkey: a,
              isSigner: !1,
              isWritable: !0
          }),
          A.push({
              pubkey: u,
              isSigner: !1,
              isWritable: !1
          }),
          A.push({
              pubkey: l,
              isSigner: !1,
              isWritable: !1
          }),
          A.push({
              pubkey: c,
              isSigner: !1,
              isWritable: !1
          }),
          new n.TransactionInstruction({
              keys: A,
              programId: t,
              data: h
          })
      }
      constructor(t) {
          this.tag = 0,
          this.amount = t.amount,
          this.nameAccount = t.nameAccount
      }
  }
  t.exports.makeOfferInstruction = c,
  c.schema = new Map([[c, {
      kind: "struct",
      fields: [["tag", "u8"], ["amount", "u64"], ["nameAccount", [32]]]
  }]]);
  class h {
      serialize() {
          return (0,
          i.serialize)(h.schema, this)
      }
      getInstruction(t, e, i, o, s) {
          const a = r.from(this.serialize());
          let u = [];
          return u.push({
              pubkey: e,
              isSigner: !1,
              isWritable: !1
          }),
          u.push({
              pubkey: i,
              isSigner: !1,
              isWritable: !0
          }),
          u.push({
              pubkey: o,
              isSigner: !0,
              isWritable: !0
          }),
          u.push({
              pubkey: s,
              isSigner: !1,
              isWritable: !1
          }),
          new n.TransactionInstruction({
              keys: u,
              programId: t,
              data: a
          })
      }
      constructor() {
          this.tag = 6
      }
  }
  t.exports.registerFavouriteInstruction = h,
  h.schema = new Map([[h, {
      kind: "struct",
      fields: [["tag", "u8"]]
  }]])
}
)),
parcelRequire.register("gK3Ca", (function(t, e) {
  var r = parcelRequire("bdjQ6").Buffer
    , i = t.exports && t.exports.__createBinding || (Object.create ? function(t, e, r, i) {
      void 0 === i && (i = r),
      Object.defineProperty(t, i, {
          enumerable: !0,
          get: function() {
              return e[r]
          }
      })
  }
  : function(t, e, r, i) {
      void 0 === i && (i = r),
      t[i] = e[r]
  }
  )
    , n = t.exports && t.exports.__setModuleDefault || (Object.create ? function(t, e) {
      Object.defineProperty(t, "default", {
          enumerable: !0,
          value: e
      })
  }
  : function(t, e) {
      t.default = e
  }
  )
    , o = t.exports && t.exports.__decorate || function(t, e, r, i) {
      var n, o = arguments.length, s = o < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
          s = Reflect.decorate(t, e, r, i);
      else
          for (var a = t.length - 1; a >= 0; a--)
              (n = t[a]) && (s = (o < 3 ? n(s) : o > 3 ? n(e, r, s) : n(e, r)) || s);
      return o > 3 && s && Object.defineProperty(e, r, s),
      s
  }
    , s = t.exports && t.exports.__importStar || function(t) {
      if (t && t.__esModule)
          return t;
      var e = {};
      if (null != t)
          for (var r in t)
              "default" !== r && Object.hasOwnProperty.call(t, r) && i(e, t, r);
      return n(e, t),
      e
  }
    , a = t.exports && t.exports.__importDefault || function(t) {
      return t && t.__esModule ? t : {
          default: t
      }
  }
  ;
  Object.defineProperty(t.exports, "__esModule", {
      value: !0
  }),
  t.exports.deserializeUnchecked = t.exports.deserialize = t.exports.serialize = t.exports.BinaryReader = t.exports.BinaryWriter = t.exports.BorshError = t.exports.baseDecode = t.exports.baseEncode = void 0;
  const u = a(parcelRequire("aVh2m"))
    , l = a(parcelRequire("7LTy6"))
    , c = s(parcelRequire("7bUqw"))
    , h = new ("function" != typeof $parcel$global.TextDecoder ? c.TextDecoder : $parcel$global.TextDecoder)("utf-8",{
      fatal: !0
  });
  t.exports.baseEncode = function(t) {
      return "string" == typeof t && (t = r.from(t, "utf8")),
      l.default.encode(r.from(t))
  }
  ,
  t.exports.baseDecode = function(t) {
      return r.from(l.default.decode(t))
  }
  ;
  const A = 1024;
  class f extends Error {
      addToFieldPath(t) {
          this.fieldPath.splice(0, 0, t),
          this.message = this.originalMessage + ": " + this.fieldPath.join(".")
      }
      constructor(t) {
          super(t),
          this.fieldPath = [],
          this.originalMessage = t
      }
  }
  t.exports.BorshError = f;
  class p {
      maybeResize() {
          this.buf.length < 16 + this.length && (this.buf = r.concat([this.buf, r.alloc(A)]))
      }
      writeU8(t) {
          this.maybeResize(),
          this.buf.writeUInt8(t, this.length),
          this.length += 1
      }
      writeU16(t) {
          this.maybeResize(),
          this.buf.writeUInt16LE(t, this.length),
          this.length += 2
      }
      writeU32(t) {
          this.maybeResize(),
          this.buf.writeUInt32LE(t, this.length),
          this.length += 4
      }
      writeU64(t) {
          this.maybeResize(),
          this.writeBuffer(r.from(new u.default(t).toArray("le", 8)))
      }
      writeU128(t) {
          this.maybeResize(),
          this.writeBuffer(r.from(new u.default(t).toArray("le", 16)))
      }
      writeU256(t) {
          this.maybeResize(),
          this.writeBuffer(r.from(new u.default(t).toArray("le", 32)))
      }
      writeU512(t) {
          this.maybeResize(),
          this.writeBuffer(r.from(new u.default(t).toArray("le", 64)))
      }
      writeBuffer(t) {
          this.buf = r.concat([r.from(this.buf.subarray(0, this.length)), t, r.alloc(A)]),
          this.length += t.length
      }
      writeString(t) {
          this.maybeResize();
          const e = r.from(t, "utf8");
          this.writeU32(e.length),
          this.writeBuffer(e)
      }
      writeFixedArray(t) {
          this.writeBuffer(r.from(t))
      }
      writeArray(t, e) {
          this.maybeResize(),
          this.writeU32(t.length);
          for (const r of t)
              this.maybeResize(),
              e(r)
      }
      toArray() {
          return this.buf.subarray(0, this.length)
      }
      constructor() {
          this.buf = r.alloc(A),
          this.length = 0
      }
  }
  function g(t, e, r) {
      const i = r.value;
      r.value = function(...t) {
          try {
              return i.apply(this, t)
          } catch (t) {
              if (t instanceof RangeError) {
                  const e = t.code;
                  if (["ERR_BUFFER_OUT_OF_BOUNDS", "ERR_OUT_OF_RANGE"].indexOf(e) >= 0)
                      throw new f("Reached the end of buffer when deserializing")
              }
              throw t
          }
      }
  }
  t.exports.BinaryWriter = p;
  class d {
      readU8() {
          const t = this.buf.readUInt8(this.offset);
          return this.offset += 1,
          t
      }
      readU16() {
          const t = this.buf.readUInt16LE(this.offset);
          return this.offset += 2,
          t
      }
      readU32() {
          const t = this.buf.readUInt32LE(this.offset);
          return this.offset += 4,
          t
      }
      readU64() {
          const t = this.readBuffer(8);
          return new u.default(t,"le")
      }
      readU128() {
          const t = this.readBuffer(16);
          return new u.default(t,"le")
      }
      readU256() {
          const t = this.readBuffer(32);
          return new u.default(t,"le")
      }
      readU512() {
          const t = this.readBuffer(64);
          return new u.default(t,"le")
      }
      readBuffer(t) {
          if (this.offset + t > this.buf.length)
              throw new f(`Expected buffer length ${t} isn't within bounds`);
          const e = this.buf.slice(this.offset, this.offset + t);
          return this.offset += t,
          e
      }
      readString() {
          const t = this.readU32()
            , e = this.readBuffer(t);
          try {
              return h.decode(e)
          } catch (t) {
              throw new f(`Error decoding UTF-8 string: ${t}`)
          }
      }
      readFixedArray(t) {
          return new Uint8Array(this.readBuffer(t))
      }
      readArray(t) {
          const e = this.readU32()
            , r = Array();
          for (let i = 0; i < e; ++i)
              r.push(t());
          return r
      }
      constructor(t) {
          this.buf = t,
          this.offset = 0
      }
  }
  function I(t) {
      return t.charAt(0).toUpperCase() + t.slice(1)
  }
  function m(t, e, r, i, n) {
      try {
          if ("string" == typeof i)
              n[`write${I(i)}`](r);
          else if (i instanceof Array)
              if ("number" == typeof i[0]) {
                  if (r.length !== i[0])
                      throw new f(`Expecting byte array of length ${i[0]}, but got ${r.length} bytes`);
                  n.writeFixedArray(r)
              } else if (2 === i.length && "number" == typeof i[1]) {
                  if (r.length !== i[1])
                      throw new f(`Expecting byte array of length ${i[1]}, but got ${r.length} bytes`);
                  for (let e = 0; e < i[1]; e++)
                      m(t, null, r[e], i[0], n)
              } else
                  n.writeArray(r, (r=>{
                      m(t, e, r, i[0], n)
                  }
                  ));
          else if (void 0 !== i.kind) {
              if ("option" !== i.kind)
                  throw new f(`FieldType ${i} unrecognized`);
              null == r ? n.writeU8(0) : (n.writeU8(1),
              m(t, e, r, i.type, n))
          } else
              y(t, r, n)
      } catch (t) {
          throw t instanceof f && t.addToFieldPath(e),
          t
      }
  }
  function y(t, e, r) {
      if ("function" == typeof e.borshSerialize)
          return void e.borshSerialize(r);
      const i = t.get(e.constructor);
      if (!i)
          throw new f(`Class ${e.constructor.name} is missing in schema`);
      if ("struct" === i.kind)
          i.fields.map((([i,n])=>{
              m(t, i, e[i], n, r)
          }
          ));
      else {
          if ("enum" !== i.kind)
              throw new f(`Unexpected schema kind: ${i.kind} for ${e.constructor.name}`);
          {
              const n = e[i.field];
              for (let o = 0; o < i.values.length; ++o) {
                  const [s,a] = i.values[o];
                  if (s === n) {
                      r.writeU8(o),
                      m(t, s, e[s], a, r);
                      break
                  }
              }
          }
      }
  }
  function w(t, e, r, i) {
      try {
          if ("string" == typeof r)
              return i[`read${I(r)}`]();
          if (r instanceof Array) {
              if ("number" == typeof r[0])
                  return i.readFixedArray(r[0]);
              if ("number" == typeof r[1]) {
                  const e = [];
                  for (let n = 0; n < r[1]; n++)
                      e.push(w(t, null, r[0], i));
                  return e
              }
              return i.readArray((()=>w(t, e, r[0], i)))
          }
          if ("option" === r.kind) {
              return i.readU8() ? w(t, e, r.type, i) : void 0
          }
          return C(t, r, i)
      } catch (t) {
          throw t instanceof f && t.addToFieldPath(e),
          t
      }
  }
  function C(t, e, r) {
      if ("function" == typeof e.borshDeserialize)
          return e.borshDeserialize(r);
      const i = t.get(e);
      if (!i)
          throw new f(`Class ${e.name} is missing in schema`);
      if ("struct" === i.kind) {
          const i = {};
          for (const [n,o] of t.get(e).fields)
              i[n] = w(t, n, o, r);
          return new e(i)
      }
      if ("enum" === i.kind) {
          const n = r.readU8();
          if (n >= i.values.length)
              throw new f(`Enum index: ${n} is out of range`);
          const [o,s] = i.values[n];
          return new e({
              [o]: w(t, o, s, r)
          })
      }
      throw new f(`Unexpected schema kind: ${i.kind} for ${e.constructor.name}`)
  }
  o([g], d.prototype, "readU8", null),
  o([g], d.prototype, "readU16", null),
  o([g], d.prototype, "readU32", null),
  o([g], d.prototype, "readU64", null),
  o([g], d.prototype, "readU128", null),
  o([g], d.prototype, "readU256", null),
  o([g], d.prototype, "readU512", null),
  o([g], d.prototype, "readString", null),
  o([g], d.prototype, "readFixedArray", null),
  o([g], d.prototype, "readArray", null),
  t.exports.BinaryReader = d,
  t.exports.serialize = function(t, e, r=p) {
      const i = new r;
      return y(t, e, i),
      i.toArray()
  }
  ,
  t.exports.deserialize = function(t, e, r, i=d) {
      const n = new i(r)
        , o = C(t, e, n);
      if (n.offset < r.length)
          throw new f(`Unexpected ${r.length - n.offset} bytes after deserialized data`);
      return o
  }
  ,
  t.exports.deserializeUnchecked = function(t, e, r, i=d) {
      return C(t, e, new i(r))
  }
}
)),
parcelRequire.register("8D9KL", (function(t, e) {
  var r = parcelRequire("bdjQ6").Buffer;
  Object.defineProperty(t.exports, "__esModule", {
      value: !0
  }),
  t.exports.FixedPriceOffer = t.exports.FavouriteDomain = t.exports.Offer = t.exports.Tag = void 0;
  var i, n = parcelRequire("gK3Ca"), o = parcelRequire("1I0vV");
  (i = t.exports.Tag || (t.exports.Tag = {}))[i.Uninitialized = 0] = "Uninitialized",
  i[i.ActiveOffer = 1] = "ActiveOffer",
  i[i.CancelledOffer = 2] = "CancelledOffer",
  i[i.AcceptedOffer = 3] = "AcceptedOffer",
  i[i.FavouriteDomain = 4] = "FavouriteDomain",
  i[i.FixedPriceOffer = 5] = "FixedPriceOffer",
  i[i.AcceptedFixedPriceOffer = 6] = "AcceptedFixedPriceOffer",
  i[i.CancelledFixedPriceOffer = 7] = "CancelledFixedPriceOffer";
  class s {
      static deserialize(t) {
          return (0,
          n.deserialize)(this.schema, s, t)
      }
      static async retrieve(t, e) {
          const r = await t.getAccountInfo(e);
          if (!r || !r.data)
              throw new Error("Offer not found");
          return this.deserialize(r.data)
      }
      static async getKey(t, e, i, n) {
          return await o.PublicKey.findProgramAddress([r.from("offer_account"), e.toBuffer(), i.toBuffer(), n.toBuffer()], t)
      }
      constructor(t) {
          this.tag = t.tag,
          this.nonce = t.nonce,
          this.nameAccount = new o.PublicKey(t.nameAccount),
          this.owner = new o.PublicKey(t.owner),
          this.quoteMint = new o.PublicKey(t.quoteMint),
          this.offerAmount = t.offerAmount,
          this.escrow = new o.PublicKey(t.escrow)
      }
  }
  t.exports.Offer = s,
  s.schema = new Map([[s, {
      kind: "struct",
      fields: [["tag", "u8"], ["nonce", "u8"], ["nameAccount", [32]], ["owner", [32]], ["quoteMint", [32]], ["offerAmount", "u64"], ["escrow", [32]]]
  }]]);
  class a {
      static deserialize(t) {
          return (0,
          n.deserialize)(this.schema, a, t)
      }
      static async retrieve(t, e) {
          const r = await t.getAccountInfo(e);
          if (!r || !r.data)
              throw new Error("Favourite domain not found");
          return this.deserialize(r.data)
      }
      static async getKey(t, e) {
          return await o.PublicKey.findProgramAddress([r.from("favourite_domain"), e.toBuffer()], t)
      }
      constructor(t) {
          this.tag = t.tag,
          this.nameAccount = new o.PublicKey(t.nameAccount)
      }
  }
  t.exports.FavouriteDomain = a,
  a.schema = new Map([[a, {
      kind: "struct",
      fields: [["tag", "u8"], ["nameAccount", [32]]]
  }]]);
  class u {
      static deserialize(t) {
          return (0,
          n.deserialize)(this.schema, u, t)
      }
      static async retrieve(t, e) {
          const r = await t.getAccountInfo(e);
          if (!r || !r.data)
              throw new Error("Fixed price offer not found");
          return this.deserialize(r.data)
      }
      static async getKey(t, e, i, n) {
          return await o.PublicKey.findProgramAddress([r.from("fixed_price_offer"), e.toBuffer(), i.toBuffer(), n.toBuffer()], t)
      }
      constructor(t) {
          this.tag = t.tag,
          this.nonce = t.nonce,
          this.nameAccount = new o.PublicKey(t.nameAccount),
          this.owner = new o.PublicKey(t.owner),
          this.quoteMint = new o.PublicKey(t.quoteMint),
          this.offerAmount = t.offerAmount,
          this.tokenDestination = new o.PublicKey(t.tokenDestination)
      }
  }
  t.exports.FixedPriceOffer = u,
  u.schema = new Map([[u, {
      kind: "struct",
      fields: [["tag", "u8"], ["nonce", "u8"], ["nameAccount", [32]], ["owner", [32]], ["quoteMint", [32]], ["offerAmount", "u64"], ["tokenDestination", [32]]]
  }]])
}
)),
parcelRequire.register("24psY", (function(t, e) {
  $parcel$export(t.exports, "TOKEN_PROGRAM_ID", (function() {
      return Gt
  }
  )),
  $parcel$export(t.exports, "ASSOCIATED_TOKEN_PROGRAM_ID", (function() {
      return Vt
  }
  )),
  $parcel$export(t.exports, "Token", (function() {
      return ie
  }
  ));
  for (var r = parcelRequire("8MJe2"), i = parcelRequire("aVh2m"), n = parcelRequire("1I0vV"), o = {}, s = {
      byteLength: function(t) {
          var e = f(t)
            , r = e[0]
            , i = e[1];
          return 3 * (r + i) / 4 - i
      },
      toByteArray: function(t) {
          var e, r, i = f(t), n = i[0], o = i[1], s = new l(function(t, e, r) {
              return 3 * (e + r) / 4 - r
          }(0, n, o)), a = 0, c = o > 0 ? n - 4 : n;
          for (r = 0; r < c; r += 4)
              e = u[t.charCodeAt(r)] << 18 | u[t.charCodeAt(r + 1)] << 12 | u[t.charCodeAt(r + 2)] << 6 | u[t.charCodeAt(r + 3)],
              s[a++] = e >> 16 & 255,
              s[a++] = e >> 8 & 255,
              s[a++] = 255 & e;
          2 === o && (e = u[t.charCodeAt(r)] << 2 | u[t.charCodeAt(r + 1)] >> 4,
          s[a++] = 255 & e);
          1 === o && (e = u[t.charCodeAt(r)] << 10 | u[t.charCodeAt(r + 1)] << 4 | u[t.charCodeAt(r + 2)] >> 2,
          s[a++] = e >> 8 & 255,
          s[a++] = 255 & e);
          return s
      },
      fromByteArray: function(t) {
          for (var e, r = t.length, i = r % 3, n = [], o = 16383, s = 0, u = r - i; s < u; s += o)
              n.push(p(t, s, s + o > u ? u : s + o));
          1 === i ? (e = t[r - 1],
          n.push(a[e >> 2] + a[e << 4 & 63] + "==")) : 2 === i && (e = (t[r - 2] << 8) + t[r - 1],
          n.push(a[e >> 10] + a[e >> 4 & 63] + a[e << 2 & 63] + "="));
          return n.join("")
      }
  }, a = [], u = [], l = "undefined" != typeof Uint8Array ? Uint8Array : Array, c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", h = 0, A = c.length; h < A; ++h)
      a[h] = c[h],
      u[c.charCodeAt(h)] = h;
  function f(t) {
      var e = t.length;
      if (e % 4 > 0)
          throw new Error("Invalid string. Length must be a multiple of 4");
      var r = t.indexOf("=");
      return -1 === r && (r = e),
      [r, r === e ? 0 : 4 - r % 4]
  }
  function p(t, e, r) {
      for (var i, n, o = [], s = e; s < r; s += 3)
          i = (t[s] << 16 & 16711680) + (t[s + 1] << 8 & 65280) + (255 & t[s + 2]),
          o.push(a[(n = i) >> 18 & 63] + a[n >> 12 & 63] + a[n >> 6 & 63] + a[63 & n]);
      return o.join("")
  }
  u["-".charCodeAt(0)] = 62,
  u["_".charCodeAt(0)] = 63;
  var g = {
      /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
      read: function(t, e, r, i, n) {
          var o, s, a = 8 * n - i - 1, u = (1 << a) - 1, l = u >> 1, c = -7, h = r ? n - 1 : 0, A = r ? -1 : 1, f = t[e + h];
          for (h += A,
          o = f & (1 << -c) - 1,
          f >>= -c,
          c += a; c > 0; o = 256 * o + t[e + h],
          h += A,
          c -= 8)
              ;
          for (s = o & (1 << -c) - 1,
          o >>= -c,
          c += i; c > 0; s = 256 * s + t[e + h],
          h += A,
          c -= 8)
              ;
          if (0 === o)
              o = 1 - l;
          else {
              if (o === u)
                  return s ? NaN : 1 / 0 * (f ? -1 : 1);
              s += Math.pow(2, i),
              o -= l
          }
          return (f ? -1 : 1) * s * Math.pow(2, o - i)
      },
      write: function(t, e, r, i, n, o) {
          var s, a, u, l = 8 * o - n - 1, c = (1 << l) - 1, h = c >> 1, A = 23 === n ? Math.pow(2, -24) - Math.pow(2, -77) : 0, f = i ? 0 : o - 1, p = i ? 1 : -1, g = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
          for (e = Math.abs(e),
          isNaN(e) || e === 1 / 0 ? (a = isNaN(e) ? 1 : 0,
          s = c) : (s = Math.floor(Math.log(e) / Math.LN2),
          e * (u = Math.pow(2, -s)) < 1 && (s--,
          u *= 2),
          (e += s + h >= 1 ? A / u : A * Math.pow(2, 1 - h)) * u >= 2 && (s++,
          u /= 2),
          s + h >= c ? (a = 0,
          s = c) : s + h >= 1 ? (a = (e * u - 1) * Math.pow(2, n),
          s += h) : (a = e * Math.pow(2, h - 1) * Math.pow(2, n),
          s = 0)); n >= 8; t[r + f] = 255 & a,
          f += p,
          a /= 256,
          n -= 8)
              ;
          for (s = s << n | a,
          l += n; l > 0; t[r + f] = 255 & s,
          f += p,
          s /= 256,
          l -= 8)
              ;
          t[r + f - p] |= 128 * g
      }
  };
  /*!
* The buffer module from node.js, for the browser.
*
* @author   Feross Aboukhadijeh <https://feross.org>
* @license  MIT
*/
  !function(t) {
      const e = s
        , r = g
        , i = "function" == typeof Symbol && "function" == typeof Symbol.for ? Symbol.for("nodejs.util.inspect.custom") : null;
      t.Buffer = a,
      t.SlowBuffer = function(t) {
          +t != t && (t = 0);
          return a.alloc(+t)
      }
      ,
      t.INSPECT_MAX_BYTES = 50;
      const n = 2147483647;
      function o(t) {
          if (t > n)
              throw new RangeError('The value "' + t + '" is invalid for option "size"');
          const e = new Uint8Array(t);
          return Object.setPrototypeOf(e, a.prototype),
          e
      }
      function a(t, e, r) {
          if ("number" == typeof t) {
              if ("string" == typeof e)
                  throw new TypeError('The "string" argument must be of type string. Received type number');
              return c(t)
          }
          return u(t, e, r)
      }
      function u(t, e, r) {
          if ("string" == typeof t)
              return function(t, e) {
                  "string" == typeof e && "" !== e || (e = "utf8");
                  if (!a.isEncoding(e))
                      throw new TypeError("Unknown encoding: " + e);
                  const r = 0 | p(t, e);
                  let i = o(r);
                  const n = i.write(t, e);
                  n !== r && (i = i.slice(0, n));
                  return i
              }(t, e);
          if (ArrayBuffer.isView(t))
              return function(t) {
                  if (Y(t, Uint8Array)) {
                      const e = new Uint8Array(t);
                      return A(e.buffer, e.byteOffset, e.byteLength)
                  }
                  return h(t)
              }(t);
          if (null == t)
              throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t);
          if (Y(t, ArrayBuffer) || t && Y(t.buffer, ArrayBuffer))
              return A(t, e, r);
          if ("undefined" != typeof SharedArrayBuffer && (Y(t, SharedArrayBuffer) || t && Y(t.buffer, SharedArrayBuffer)))
              return A(t, e, r);
          if ("number" == typeof t)
              throw new TypeError('The "value" argument must not be of type number. Received type number');
          const i = t.valueOf && t.valueOf();
          if (null != i && i !== t)
              return a.from(i, e, r);
          const n = function(t) {
              if (a.isBuffer(t)) {
                  const e = 0 | f(t.length)
                    , r = o(e);
                  return 0 === r.length || t.copy(r, 0, 0, e),
                  r
              }
              if (void 0 !== t.length)
                  return "number" != typeof t.length || W(t.length) ? o(0) : h(t);
              if ("Buffer" === t.type && Array.isArray(t.data))
                  return h(t.data)
          }(t);
          if (n)
              return n;
          if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof t[Symbol.toPrimitive])
              return a.from(t[Symbol.toPrimitive]("string"), e, r);
          throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t)
      }
      function l(t) {
          if ("number" != typeof t)
              throw new TypeError('"size" argument must be of type number');
          if (t < 0)
              throw new RangeError('The value "' + t + '" is invalid for option "size"')
      }
      function c(t) {
          return l(t),
          o(t < 0 ? 0 : 0 | f(t))
      }
      function h(t) {
          const e = t.length < 0 ? 0 : 0 | f(t.length)
            , r = o(e);
          for (let i = 0; i < e; i += 1)
              r[i] = 255 & t[i];
          return r
      }
      function A(t, e, r) {
          if (e < 0 || t.byteLength < e)
              throw new RangeError('"offset" is outside of buffer bounds');
          if (t.byteLength < e + (r || 0))
              throw new RangeError('"length" is outside of buffer bounds');
          let i;
          return i = void 0 === e && void 0 === r ? new Uint8Array(t) : void 0 === r ? new Uint8Array(t,e) : new Uint8Array(t,e,r),
          Object.setPrototypeOf(i, a.prototype),
          i
      }
      function f(t) {
          if (t >= n)
              throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + n.toString(16) + " bytes");
          return 0 | t
      }
      function p(t, e) {
          if (a.isBuffer(t))
              return t.length;
          if (ArrayBuffer.isView(t) || Y(t, ArrayBuffer))
              return t.byteLength;
          if ("string" != typeof t)
              throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof t);
          const r = t.length
            , i = arguments.length > 2 && !0 === arguments[2];
          if (!i && 0 === r)
              return 0;
          let n = !1;
          for (; ; )
              switch (e) {
              case "ascii":
              case "latin1":
              case "binary":
                  return r;
              case "utf8":
              case "utf-8":
                  return V(t).length;
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                  return 2 * r;
              case "hex":
                  return r >>> 1;
              case "base64":
                  return $(t).length;
              default:
                  if (n)
                      return i ? -1 : V(t).length;
                  e = ("" + e).toLowerCase(),
                  n = !0
              }
      }
      function d(t, e, r) {
          let i = !1;
          if ((void 0 === e || e < 0) && (e = 0),
          e > this.length)
              return "";
          if ((void 0 === r || r > this.length) && (r = this.length),
          r <= 0)
              return "";
          if ((r >>>= 0) <= (e >>>= 0))
              return "";
          for (t || (t = "utf8"); ; )
              switch (t) {
              case "hex":
                  return x(this, e, r);
              case "utf8":
              case "utf-8":
                  return Q(this, e, r);
              case "ascii":
                  return M(this, e, r);
              case "latin1":
              case "binary":
                  return _(this, e, r);
              case "base64":
                  return b(this, e, r);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                  return D(this, e, r);
              default:
                  if (i)
                      throw new TypeError("Unknown encoding: " + t);
                  t = (t + "").toLowerCase(),
                  i = !0
              }
      }
      function I(t, e, r) {
          const i = t[e];
          t[e] = t[r],
          t[r] = i
      }
      function m(t, e, r, i, n) {
          if (0 === t.length)
              return -1;
          if ("string" == typeof r ? (i = r,
          r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648),
          W(r = +r) && (r = n ? 0 : t.length - 1),
          r < 0 && (r = t.length + r),
          r >= t.length) {
              if (n)
                  return -1;
              r = t.length - 1
          } else if (r < 0) {
              if (!n)
                  return -1;
              r = 0
          }
          if ("string" == typeof e && (e = a.from(e, i)),
          a.isBuffer(e))
              return 0 === e.length ? -1 : y(t, e, r, i, n);
          if ("number" == typeof e)
              return e &= 255,
              "function" == typeof Uint8Array.prototype.indexOf ? n ? Uint8Array.prototype.indexOf.call(t, e, r) : Uint8Array.prototype.lastIndexOf.call(t, e, r) : y(t, [e], r, i, n);
          throw new TypeError("val must be string, number or Buffer")
      }
      function y(t, e, r, i, n) {
          let o, s = 1, a = t.length, u = e.length;
          if (void 0 !== i && ("ucs2" === (i = String(i).toLowerCase()) || "ucs-2" === i || "utf16le" === i || "utf-16le" === i)) {
              if (t.length < 2 || e.length < 2)
                  return -1;
              s = 2,
              a /= 2,
              u /= 2,
              r /= 2
          }
          function l(t, e) {
              return 1 === s ? t[e] : t.readUInt16BE(e * s)
          }
          if (n) {
              let i = -1;
              for (o = r; o < a; o++)
                  if (l(t, o) === l(e, -1 === i ? 0 : o - i)) {
                      if (-1 === i && (i = o),
                      o - i + 1 === u)
                          return i * s
                  } else
                      -1 !== i && (o -= o - i),
                      i = -1
          } else
              for (r + u > a && (r = a - u),
              o = r; o >= 0; o--) {
                  let r = !0;
                  for (let i = 0; i < u; i++)
                      if (l(t, o + i) !== l(e, i)) {
                          r = !1;
                          break
                      }
                  if (r)
                      return o
              }
          return -1
      }
      function w(t, e, r, i) {
          r = Number(r) || 0;
          const n = t.length - r;
          i ? (i = Number(i)) > n && (i = n) : i = n;
          const o = e.length;
          let s;
          for (i > o / 2 && (i = o / 2),
          s = 0; s < i; ++s) {
              const i = parseInt(e.substr(2 * s, 2), 16);
              if (W(i))
                  return s;
              t[r + s] = i
          }
          return s
      }
      function C(t, e, r, i) {
          return j(V(e, t.length - r), t, r, i)
      }
      function E(t, e, r, i) {
          return j(function(t) {
              const e = [];
              for (let r = 0; r < t.length; ++r)
                  e.push(255 & t.charCodeAt(r));
              return e
          }(e), t, r, i)
      }
      function v(t, e, r, i) {
          return j($(e), t, r, i)
      }
      function B(t, e, r, i) {
          return j(function(t, e) {
              let r, i, n;
              const o = [];
              for (let s = 0; s < t.length && !((e -= 2) < 0); ++s)
                  r = t.charCodeAt(s),
                  i = r >> 8,
                  n = r % 256,
                  o.push(n),
                  o.push(i);
              return o
          }(e, t.length - r), t, r, i)
      }
      function b(t, r, i) {
          return 0 === r && i === t.length ? e.fromByteArray(t) : e.fromByteArray(t.slice(r, i))
      }
      function Q(t, e, r) {
          r = Math.min(t.length, r);
          const i = [];
          let n = e;
          for (; n < r; ) {
              const e = t[n];
              let o = null
                , s = e > 239 ? 4 : e > 223 ? 3 : e > 191 ? 2 : 1;
              if (n + s <= r) {
                  let r, i, a, u;
                  switch (s) {
                  case 1:
                      e < 128 && (o = e);
                      break;
                  case 2:
                      r = t[n + 1],
                      128 == (192 & r) && (u = (31 & e) << 6 | 63 & r,
                      u > 127 && (o = u));
                      break;
                  case 3:
                      r = t[n + 1],
                      i = t[n + 2],
                      128 == (192 & r) && 128 == (192 & i) && (u = (15 & e) << 12 | (63 & r) << 6 | 63 & i,
                      u > 2047 && (u < 55296 || u > 57343) && (o = u));
                      break;
                  case 4:
                      r = t[n + 1],
                      i = t[n + 2],
                      a = t[n + 3],
                      128 == (192 & r) && 128 == (192 & i) && 128 == (192 & a) && (u = (15 & e) << 18 | (63 & r) << 12 | (63 & i) << 6 | 63 & a,
                      u > 65535 && u < 1114112 && (o = u))
                  }
              }
              null === o ? (o = 65533,
              s = 1) : o > 65535 && (o -= 65536,
              i.push(o >>> 10 & 1023 | 55296),
              o = 56320 | 1023 & o),
              i.push(o),
              n += s
          }
          return function(t) {
              const e = t.length;
              if (e <= R)
                  return String.fromCharCode.apply(String, t);
              let r = ""
                , i = 0;
              for (; i < e; )
                  r += String.fromCharCode.apply(String, t.slice(i, i += R));
              return r
          }(i)
      }
      t.kMaxLength = n,
      a.TYPED_ARRAY_SUPPORT = function() {
          try {
              const t = new Uint8Array(1)
                , e = {
                  foo: function() {
                      return 42
                  }
              };
              return Object.setPrototypeOf(e, Uint8Array.prototype),
              Object.setPrototypeOf(t, e),
              42 === t.foo()
          } catch (t) {
              return !1
          }
      }(),
      a.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),
      Object.defineProperty(a.prototype, "parent", {
          enumerable: !0,
          get: function() {
              if (a.isBuffer(this))
                  return this.buffer
          }
      }),
      Object.defineProperty(a.prototype, "offset", {
          enumerable: !0,
          get: function() {
              if (a.isBuffer(this))
                  return this.byteOffset
          }
      }),
      a.poolSize = 8192,
      a.from = function(t, e, r) {
          return u(t, e, r)
      }
      ,
      Object.setPrototypeOf(a.prototype, Uint8Array.prototype),
      Object.setPrototypeOf(a, Uint8Array),
      a.alloc = function(t, e, r) {
          return function(t, e, r) {
              return l(t),
              t <= 0 ? o(t) : void 0 !== e ? "string" == typeof r ? o(t).fill(e, r) : o(t).fill(e) : o(t)
          }(t, e, r)
      }
      ,
      a.allocUnsafe = function(t) {
          return c(t)
      }
      ,
      a.allocUnsafeSlow = function(t) {
          return c(t)
      }
      ,
      a.isBuffer = function(t) {
          return null != t && !0 === t._isBuffer && t !== a.prototype
      }
      ,
      a.compare = function(t, e) {
          if (Y(t, Uint8Array) && (t = a.from(t, t.offset, t.byteLength)),
          Y(e, Uint8Array) && (e = a.from(e, e.offset, e.byteLength)),
          !a.isBuffer(t) || !a.isBuffer(e))
              throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
          if (t === e)
              return 0;
          let r = t.length
            , i = e.length;
          for (let n = 0, o = Math.min(r, i); n < o; ++n)
              if (t[n] !== e[n]) {
                  r = t[n],
                  i = e[n];
                  break
              }
          return r < i ? -1 : i < r ? 1 : 0
      }
      ,
      a.isEncoding = function(t) {
          switch (String(t).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
              return !0;
          default:
              return !1
          }
      }
      ,
      a.concat = function(t, e) {
          if (!Array.isArray(t))
              throw new TypeError('"list" argument must be an Array of Buffers');
          if (0 === t.length)
              return a.alloc(0);
          let r;
          if (void 0 === e)
              for (e = 0,
              r = 0; r < t.length; ++r)
                  e += t[r].length;
          const i = a.allocUnsafe(e);
          let n = 0;
          for (r = 0; r < t.length; ++r) {
              let e = t[r];
              if (Y(e, Uint8Array))
                  n + e.length > i.length ? (a.isBuffer(e) || (e = a.from(e)),
                  e.copy(i, n)) : Uint8Array.prototype.set.call(i, e, n);
              else {
                  if (!a.isBuffer(e))
                      throw new TypeError('"list" argument must be an Array of Buffers');
                  e.copy(i, n)
              }
              n += e.length
          }
          return i
      }
      ,
      a.byteLength = p,
      a.prototype._isBuffer = !0,
      a.prototype.swap16 = function() {
          const t = this.length;
          if (t % 2 != 0)
              throw new RangeError("Buffer size must be a multiple of 16-bits");
          for (let e = 0; e < t; e += 2)
              I(this, e, e + 1);
          return this
      }
      ,
      a.prototype.swap32 = function() {
          const t = this.length;
          if (t % 4 != 0)
              throw new RangeError("Buffer size must be a multiple of 32-bits");
          for (let e = 0; e < t; e += 4)
              I(this, e, e + 3),
              I(this, e + 1, e + 2);
          return this
      }
      ,
      a.prototype.swap64 = function() {
          const t = this.length;
          if (t % 8 != 0)
              throw new RangeError("Buffer size must be a multiple of 64-bits");
          for (let e = 0; e < t; e += 8)
              I(this, e, e + 7),
              I(this, e + 1, e + 6),
              I(this, e + 2, e + 5),
              I(this, e + 3, e + 4);
          return this
      }
      ,
      a.prototype.toString = function() {
          const t = this.length;
          return 0 === t ? "" : 0 === arguments.length ? Q(this, 0, t) : d.apply(this, arguments)
      }
      ,
      a.prototype.toLocaleString = a.prototype.toString,
      a.prototype.equals = function(t) {
          if (!a.isBuffer(t))
              throw new TypeError("Argument must be a Buffer");
          return this === t || 0 === a.compare(this, t)
      }
      ,
      a.prototype.inspect = function() {
          let e = "";
          const r = t.INSPECT_MAX_BYTES;
          return e = this.toString("hex", 0, r).replace(/(.{2})/g, "$1 ").trim(),
          this.length > r && (e += " ... "),
          "<Buffer " + e + ">"
      }
      ,
      i && (a.prototype[i] = a.prototype.inspect),
      a.prototype.compare = function(t, e, r, i, n) {
          if (Y(t, Uint8Array) && (t = a.from(t, t.offset, t.byteLength)),
          !a.isBuffer(t))
              throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof t);
          if (void 0 === e && (e = 0),
          void 0 === r && (r = t ? t.length : 0),
          void 0 === i && (i = 0),
          void 0 === n && (n = this.length),
          e < 0 || r > t.length || i < 0 || n > this.length)
              throw new RangeError("out of range index");
          if (i >= n && e >= r)
              return 0;
          if (i >= n)
              return -1;
          if (e >= r)
              return 1;
          if (this === t)
              return 0;
          let o = (n >>>= 0) - (i >>>= 0)
            , s = (r >>>= 0) - (e >>>= 0);
          const u = Math.min(o, s)
            , l = this.slice(i, n)
            , c = t.slice(e, r);
          for (let t = 0; t < u; ++t)
              if (l[t] !== c[t]) {
                  o = l[t],
                  s = c[t];
                  break
              }
          return o < s ? -1 : s < o ? 1 : 0
      }
      ,
      a.prototype.includes = function(t, e, r) {
          return -1 !== this.indexOf(t, e, r)
      }
      ,
      a.prototype.indexOf = function(t, e, r) {
          return m(this, t, e, r, !0)
      }
      ,
      a.prototype.lastIndexOf = function(t, e, r) {
          return m(this, t, e, r, !1)
      }
      ,
      a.prototype.write = function(t, e, r, i) {
          if (void 0 === e)
              i = "utf8",
              r = this.length,
              e = 0;
          else if (void 0 === r && "string" == typeof e)
              i = e,
              r = this.length,
              e = 0;
          else {
              if (!isFinite(e))
                  throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
              e >>>= 0,
              isFinite(r) ? (r >>>= 0,
              void 0 === i && (i = "utf8")) : (i = r,
              r = void 0)
          }
          const n = this.length - e;
          if ((void 0 === r || r > n) && (r = n),
          t.length > 0 && (r < 0 || e < 0) || e > this.length)
              throw new RangeError("Attempt to write outside buffer bounds");
          i || (i = "utf8");
          let o = !1;
          for (; ; )
              switch (i) {
              case "hex":
                  return w(this, t, e, r);
              case "utf8":
              case "utf-8":
                  return C(this, t, e, r);
              case "ascii":
              case "latin1":
              case "binary":
                  return E(this, t, e, r);
              case "base64":
                  return v(this, t, e, r);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                  return B(this, t, e, r);
              default:
                  if (o)
                      throw new TypeError("Unknown encoding: " + i);
                  i = ("" + i).toLowerCase(),
                  o = !0
              }
      }
      ,
      a.prototype.toJSON = function() {
          return {
              type: "Buffer",
              data: Array.prototype.slice.call(this._arr || this, 0)
          }
      }
      ;
      const R = 4096;
      function M(t, e, r) {
          let i = "";
          r = Math.min(t.length, r);
          for (let n = e; n < r; ++n)
              i += String.fromCharCode(127 & t[n]);
          return i
      }
      function _(t, e, r) {
          let i = "";
          r = Math.min(t.length, r);
          for (let n = e; n < r; ++n)
              i += String.fromCharCode(t[n]);
          return i
      }
      function x(t, e, r) {
          const i = t.length;
          (!e || e < 0) && (e = 0),
          (!r || r < 0 || r > i) && (r = i);
          let n = "";
          for (let i = e; i < r; ++i)
              n += Z[t[i]];
          return n
      }
      function D(t, e, r) {
          const i = t.slice(e, r);
          let n = "";
          for (let t = 0; t < i.length - 1; t += 2)
              n += String.fromCharCode(i[t] + 256 * i[t + 1]);
          return n
      }
      function S(t, e, r) {
          if (t % 1 != 0 || t < 0)
              throw new RangeError("offset is not uint");
          if (t + e > r)
              throw new RangeError("Trying to access beyond buffer length")
      }
      function k(t, e, r, i, n, o) {
          if (!a.isBuffer(t))
              throw new TypeError('"buffer" argument must be a Buffer instance');
          if (e > n || e < o)
              throw new RangeError('"value" argument is out of bounds');
          if (r + i > t.length)
              throw new RangeError("Index out of range")
      }
      function F(t, e, r, i, n) {
          H(e, i, n, t, r, 7);
          let o = Number(e & BigInt(4294967295));
          t[r++] = o,
          o >>= 8,
          t[r++] = o,
          o >>= 8,
          t[r++] = o,
          o >>= 8,
          t[r++] = o;
          let s = Number(e >> BigInt(32) & BigInt(4294967295));
          return t[r++] = s,
          s >>= 8,
          t[r++] = s,
          s >>= 8,
          t[r++] = s,
          s >>= 8,
          t[r++] = s,
          r
      }
      function q(t, e, r, i, n) {
          H(e, i, n, t, r, 7);
          let o = Number(e & BigInt(4294967295));
          t[r + 7] = o,
          o >>= 8,
          t[r + 6] = o,
          o >>= 8,
          t[r + 5] = o,
          o >>= 8,
          t[r + 4] = o;
          let s = Number(e >> BigInt(32) & BigInt(4294967295));
          return t[r + 3] = s,
          s >>= 8,
          t[r + 2] = s,
          s >>= 8,
          t[r + 1] = s,
          s >>= 8,
          t[r] = s,
          r + 8
      }
      function N(t, e, r, i, n, o) {
          if (r + i > t.length)
              throw new RangeError("Index out of range");
          if (r < 0)
              throw new RangeError("Index out of range")
      }
      function T(t, e, i, n, o) {
          return e = +e,
          i >>>= 0,
          o || N(t, 0, i, 4),
          r.write(t, e, i, n, 23, 4),
          i + 4
      }
      function P(t, e, i, n, o) {
          return e = +e,
          i >>>= 0,
          o || N(t, 0, i, 8),
          r.write(t, e, i, n, 52, 8),
          i + 8
      }
      a.prototype.slice = function(t, e) {
          const r = this.length;
          (t = ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r),
          (e = void 0 === e ? r : ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r),
          e < t && (e = t);
          const i = this.subarray(t, e);
          return Object.setPrototypeOf(i, a.prototype),
          i
      }
      ,
      a.prototype.readUintLE = a.prototype.readUIntLE = function(t, e, r) {
          t >>>= 0,
          e >>>= 0,
          r || S(t, e, this.length);
          let i = this[t]
            , n = 1
            , o = 0;
          for (; ++o < e && (n *= 256); )
              i += this[t + o] * n;
          return i
      }
      ,
      a.prototype.readUintBE = a.prototype.readUIntBE = function(t, e, r) {
          t >>>= 0,
          e >>>= 0,
          r || S(t, e, this.length);
          let i = this[t + --e]
            , n = 1;
          for (; e > 0 && (n *= 256); )
              i += this[t + --e] * n;
          return i
      }
      ,
      a.prototype.readUint8 = a.prototype.readUInt8 = function(t, e) {
          return t >>>= 0,
          e || S(t, 1, this.length),
          this[t]
      }
      ,
      a.prototype.readUint16LE = a.prototype.readUInt16LE = function(t, e) {
          return t >>>= 0,
          e || S(t, 2, this.length),
          this[t] | this[t + 1] << 8
      }
      ,
      a.prototype.readUint16BE = a.prototype.readUInt16BE = function(t, e) {
          return t >>>= 0,
          e || S(t, 2, this.length),
          this[t] << 8 | this[t + 1]
      }
      ,
      a.prototype.readUint32LE = a.prototype.readUInt32LE = function(t, e) {
          return t >>>= 0,
          e || S(t, 4, this.length),
          (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
      }
      ,
      a.prototype.readUint32BE = a.prototype.readUInt32BE = function(t, e) {
          return t >>>= 0,
          e || S(t, 4, this.length),
          16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
      }
      ,
      a.prototype.readBigUInt64LE = X((function(t) {
          K(t >>>= 0, "offset");
          const e = this[t]
            , r = this[t + 7];
          void 0 !== e && void 0 !== r || z(t, this.length - 8);
          const i = e + 256 * this[++t] + 65536 * this[++t] + this[++t] * 2 ** 24
            , n = this[++t] + 256 * this[++t] + 65536 * this[++t] + r * 2 ** 24;
          return BigInt(i) + (BigInt(n) << BigInt(32))
      }
      )),
      a.prototype.readBigUInt64BE = X((function(t) {
          K(t >>>= 0, "offset");
          const e = this[t]
            , r = this[t + 7];
          void 0 !== e && void 0 !== r || z(t, this.length - 8);
          const i = e * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + this[++t]
            , n = this[++t] * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + r;
          return (BigInt(i) << BigInt(32)) + BigInt(n)
      }
      )),
      a.prototype.readIntLE = function(t, e, r) {
          t >>>= 0,
          e >>>= 0,
          r || S(t, e, this.length);
          let i = this[t]
            , n = 1
            , o = 0;
          for (; ++o < e && (n *= 256); )
              i += this[t + o] * n;
          return n *= 128,
          i >= n && (i -= Math.pow(2, 8 * e)),
          i
      }
      ,
      a.prototype.readIntBE = function(t, e, r) {
          t >>>= 0,
          e >>>= 0,
          r || S(t, e, this.length);
          let i = e
            , n = 1
            , o = this[t + --i];
          for (; i > 0 && (n *= 256); )
              o += this[t + --i] * n;
          return n *= 128,
          o >= n && (o -= Math.pow(2, 8 * e)),
          o
      }
      ,
      a.prototype.readInt8 = function(t, e) {
          return t >>>= 0,
          e || S(t, 1, this.length),
          128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
      }
      ,
      a.prototype.readInt16LE = function(t, e) {
          t >>>= 0,
          e || S(t, 2, this.length);
          const r = this[t] | this[t + 1] << 8;
          return 32768 & r ? 4294901760 | r : r
      }
      ,
      a.prototype.readInt16BE = function(t, e) {
          t >>>= 0,
          e || S(t, 2, this.length);
          const r = this[t + 1] | this[t] << 8;
          return 32768 & r ? 4294901760 | r : r
      }
      ,
      a.prototype.readInt32LE = function(t, e) {
          return t >>>= 0,
          e || S(t, 4, this.length),
          this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
      }
      ,
      a.prototype.readInt32BE = function(t, e) {
          return t >>>= 0,
          e || S(t, 4, this.length),
          this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
      }
      ,
      a.prototype.readBigInt64LE = X((function(t) {
          K(t >>>= 0, "offset");
          const e = this[t]
            , r = this[t + 7];
          void 0 !== e && void 0 !== r || z(t, this.length - 8);
          const i = this[t + 4] + 256 * this[t + 5] + 65536 * this[t + 6] + (r << 24);
          return (BigInt(i) << BigInt(32)) + BigInt(e + 256 * this[++t] + 65536 * this[++t] + this[++t] * 2 ** 24)
      }
      )),
      a.prototype.readBigInt64BE = X((function(t) {
          K(t >>>= 0, "offset");
          const e = this[t]
            , r = this[t + 7];
          void 0 !== e && void 0 !== r || z(t, this.length - 8);
          const i = (e << 24) + 65536 * this[++t] + 256 * this[++t] + this[++t];
          return (BigInt(i) << BigInt(32)) + BigInt(this[++t] * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + r)
      }
      )),
      a.prototype.readFloatLE = function(t, e) {
          return t >>>= 0,
          e || S(t, 4, this.length),
          r.read(this, t, !0, 23, 4)
      }
      ,
      a.prototype.readFloatBE = function(t, e) {
          return t >>>= 0,
          e || S(t, 4, this.length),
          r.read(this, t, !1, 23, 4)
      }
      ,
      a.prototype.readDoubleLE = function(t, e) {
          return t >>>= 0,
          e || S(t, 8, this.length),
          r.read(this, t, !0, 52, 8)
      }
      ,
      a.prototype.readDoubleBE = function(t, e) {
          return t >>>= 0,
          e || S(t, 8, this.length),
          r.read(this, t, !1, 52, 8)
      }
      ,
      a.prototype.writeUintLE = a.prototype.writeUIntLE = function(t, e, r, i) {
          if (t = +t,
          e >>>= 0,
          r >>>= 0,
          !i) {
              k(this, t, e, r, Math.pow(2, 8 * r) - 1, 0)
          }
          let n = 1
            , o = 0;
          for (this[e] = 255 & t; ++o < r && (n *= 256); )
              this[e + o] = t / n & 255;
          return e + r
      }
      ,
      a.prototype.writeUintBE = a.prototype.writeUIntBE = function(t, e, r, i) {
          if (t = +t,
          e >>>= 0,
          r >>>= 0,
          !i) {
              k(this, t, e, r, Math.pow(2, 8 * r) - 1, 0)
          }
          let n = r - 1
            , o = 1;
          for (this[e + n] = 255 & t; --n >= 0 && (o *= 256); )
              this[e + n] = t / o & 255;
          return e + r
      }
      ,
      a.prototype.writeUint8 = a.prototype.writeUInt8 = function(t, e, r) {
          return t = +t,
          e >>>= 0,
          r || k(this, t, e, 1, 255, 0),
          this[e] = 255 & t,
          e + 1
      }
      ,
      a.prototype.writeUint16LE = a.prototype.writeUInt16LE = function(t, e, r) {
          return t = +t,
          e >>>= 0,
          r || k(this, t, e, 2, 65535, 0),
          this[e] = 255 & t,
          this[e + 1] = t >>> 8,
          e + 2
      }
      ,
      a.prototype.writeUint16BE = a.prototype.writeUInt16BE = function(t, e, r) {
          return t = +t,
          e >>>= 0,
          r || k(this, t, e, 2, 65535, 0),
          this[e] = t >>> 8,
          this[e + 1] = 255 & t,
          e + 2
      }
      ,
      a.prototype.writeUint32LE = a.prototype.writeUInt32LE = function(t, e, r) {
          return t = +t,
          e >>>= 0,
          r || k(this, t, e, 4, 4294967295, 0),
          this[e + 3] = t >>> 24,
          this[e + 2] = t >>> 16,
          this[e + 1] = t >>> 8,
          this[e] = 255 & t,
          e + 4
      }
      ,
      a.prototype.writeUint32BE = a.prototype.writeUInt32BE = function(t, e, r) {
          return t = +t,
          e >>>= 0,
          r || k(this, t, e, 4, 4294967295, 0),
          this[e] = t >>> 24,
          this[e + 1] = t >>> 16,
          this[e + 2] = t >>> 8,
          this[e + 3] = 255 & t,
          e + 4
      }
      ,
      a.prototype.writeBigUInt64LE = X((function(t, e=0) {
          return F(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"))
      }
      )),
      a.prototype.writeBigUInt64BE = X((function(t, e=0) {
          return q(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"))
      }
      )),
      a.prototype.writeIntLE = function(t, e, r, i) {
          if (t = +t,
          e >>>= 0,
          !i) {
              const i = Math.pow(2, 8 * r - 1);
              k(this, t, e, r, i - 1, -i)
          }
          let n = 0
            , o = 1
            , s = 0;
          for (this[e] = 255 & t; ++n < r && (o *= 256); )
              t < 0 && 0 === s && 0 !== this[e + n - 1] && (s = 1),
              this[e + n] = (t / o >> 0) - s & 255;
          return e + r
      }
      ,
      a.prototype.writeIntBE = function(t, e, r, i) {
          if (t = +t,
          e >>>= 0,
          !i) {
              const i = Math.pow(2, 8 * r - 1);
              k(this, t, e, r, i - 1, -i)
          }
          let n = r - 1
            , o = 1
            , s = 0;
          for (this[e + n] = 255 & t; --n >= 0 && (o *= 256); )
              t < 0 && 0 === s && 0 !== this[e + n + 1] && (s = 1),
              this[e + n] = (t / o >> 0) - s & 255;
          return e + r
      }
      ,
      a.prototype.writeInt8 = function(t, e, r) {
          return t = +t,
          e >>>= 0,
          r || k(this, t, e, 1, 127, -128),
          t < 0 && (t = 255 + t + 1),
          this[e] = 255 & t,
          e + 1
      }
      ,
      a.prototype.writeInt16LE = function(t, e, r) {
          return t = +t,
          e >>>= 0,
          r || k(this, t, e, 2, 32767, -32768),
          this[e] = 255 & t,
          this[e + 1] = t >>> 8,
          e + 2
      }
      ,
      a.prototype.writeInt16BE = function(t, e, r) {
          return t = +t,
          e >>>= 0,
          r || k(this, t, e, 2, 32767, -32768),
          this[e] = t >>> 8,
          this[e + 1] = 255 & t,
          e + 2
      }
      ,
      a.prototype.writeInt32LE = function(t, e, r) {
          return t = +t,
          e >>>= 0,
          r || k(this, t, e, 4, 2147483647, -2147483648),
          this[e] = 255 & t,
          this[e + 1] = t >>> 8,
          this[e + 2] = t >>> 16,
          this[e + 3] = t >>> 24,
          e + 4
      }
      ,
      a.prototype.writeInt32BE = function(t, e, r) {
          return t = +t,
          e >>>= 0,
          r || k(this, t, e, 4, 2147483647, -2147483648),
          t < 0 && (t = 4294967295 + t + 1),
          this[e] = t >>> 24,
          this[e + 1] = t >>> 16,
          this[e + 2] = t >>> 8,
          this[e + 3] = 255 & t,
          e + 4
      }
      ,
      a.prototype.writeBigInt64LE = X((function(t, e=0) {
          return F(this, t, e, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"))
      }
      )),
      a.prototype.writeBigInt64BE = X((function(t, e=0) {
          return q(this, t, e, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"))
      }
      )),
      a.prototype.writeFloatLE = function(t, e, r) {
          return T(this, t, e, !0, r)
      }
      ,
      a.prototype.writeFloatBE = function(t, e, r) {
          return T(this, t, e, !1, r)
      }
      ,
      a.prototype.writeDoubleLE = function(t, e, r) {
          return P(this, t, e, !0, r)
      }
      ,
      a.prototype.writeDoubleBE = function(t, e, r) {
          return P(this, t, e, !1, r)
      }
      ,
      a.prototype.copy = function(t, e, r, i) {
          if (!a.isBuffer(t))
              throw new TypeError("argument should be a Buffer");
          if (r || (r = 0),
          i || 0 === i || (i = this.length),
          e >= t.length && (e = t.length),
          e || (e = 0),
          i > 0 && i < r && (i = r),
          i === r)
              return 0;
          if (0 === t.length || 0 === this.length)
              return 0;
          if (e < 0)
              throw new RangeError("targetStart out of bounds");
          if (r < 0 || r >= this.length)
              throw new RangeError("Index out of range");
          if (i < 0)
              throw new RangeError("sourceEnd out of bounds");
          i > this.length && (i = this.length),
          t.length - e < i - r && (i = t.length - e + r);
          const n = i - r;
          return this === t && "function" == typeof Uint8Array.prototype.copyWithin ? this.copyWithin(e, r, i) : Uint8Array.prototype.set.call(t, this.subarray(r, i), e),
          n
      }
      ,
      a.prototype.fill = function(t, e, r, i) {
          if ("string" == typeof t) {
              if ("string" == typeof e ? (i = e,
              e = 0,
              r = this.length) : "string" == typeof r && (i = r,
              r = this.length),
              void 0 !== i && "string" != typeof i)
                  throw new TypeError("encoding must be a string");
              if ("string" == typeof i && !a.isEncoding(i))
                  throw new TypeError("Unknown encoding: " + i);
              if (1 === t.length) {
                  const e = t.charCodeAt(0);
                  ("utf8" === i && e < 128 || "latin1" === i) && (t = e)
              }
          } else
              "number" == typeof t ? t &= 255 : "boolean" == typeof t && (t = Number(t));
          if (e < 0 || this.length < e || this.length < r)
              throw new RangeError("Out of range index");
          if (r <= e)
              return this;
          let n;
          if (e >>>= 0,
          r = void 0 === r ? this.length : r >>> 0,
          t || (t = 0),
          "number" == typeof t)
              for (n = e; n < r; ++n)
                  this[n] = t;
          else {
              const o = a.isBuffer(t) ? t : a.from(t, i)
                , s = o.length;
              if (0 === s)
                  throw new TypeError('The value "' + t + '" is invalid for argument "value"');
              for (n = 0; n < r - e; ++n)
                  this[n + e] = o[n % s]
          }
          return this
      }
      ;
      const O = {};
      function U(t, e, r) {
          O[t] = class extends r {
              get code() {
                  return t
              }
              set code(t) {
                  Object.defineProperty(this, "code", {
                      configurable: !0,
                      enumerable: !0,
                      value: t,
                      writable: !0
                  })
              }
              toString() {
                  return `${this.name} [${t}]: ${this.message}`
              }
              constructor() {
                  super(),
                  Object.defineProperty(this, "message", {
                      value: e.apply(this, arguments),
                      writable: !0,
                      configurable: !0
                  }),
                  this.name = `${this.name} [${t}]`,
                  this.stack,
                  delete this.name
              }
          }
      }
      function L(t) {
          let e = ""
            , r = t.length;
          const i = "-" === t[0] ? 1 : 0;
          for (; r >= i + 4; r -= 3)
              e = `_${t.slice(r - 3, r)}${e}`;
          return `${t.slice(0, r)}${e}`
      }
      function H(t, e, r, i, n, o) {
          if (t > r || t < e) {
              const i = "bigint" == typeof e ? "n" : "";
              let n;
              throw n = o > 3 ? 0 === e || e === BigInt(0) ? `>= 0${i} and < 2${i} ** ${8 * (o + 1)}${i}` : `>= -(2${i} ** ${8 * (o + 1) - 1}${i}) and < 2 ** ${8 * (o + 1) - 1}${i}` : `>= ${e}${i} and <= ${r}${i}`,
              new O.ERR_OUT_OF_RANGE("value",n,t)
          }
          !function(t, e, r) {
              K(e, "offset"),
              void 0 !== t[e] && void 0 !== t[e + r] || z(e, t.length - (r + 1))
          }(i, n, o)
      }
      function K(t, e) {
          if ("number" != typeof t)
              throw new O.ERR_INVALID_ARG_TYPE(e,"number",t)
      }
      function z(t, e, r) {
          if (Math.floor(t) !== t)
              throw K(t, r),
              new O.ERR_OUT_OF_RANGE(r || "offset","an integer",t);
          if (e < 0)
              throw new O.ERR_BUFFER_OUT_OF_BOUNDS;
          throw new O.ERR_OUT_OF_RANGE(r || "offset",`>= ${r ? 1 : 0} and <= ${e}`,t)
      }
      U("ERR_BUFFER_OUT_OF_BOUNDS", (function(t) {
          return t ? `${t} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds"
      }
      ), RangeError),
      U("ERR_INVALID_ARG_TYPE", (function(t, e) {
          return `The "${t}" argument must be of type number. Received type ${typeof e}`
      }
      ), TypeError),
      U("ERR_OUT_OF_RANGE", (function(t, e, r) {
          let i = `The value of "${t}" is out of range.`
            , n = r;
          return Number.isInteger(r) && Math.abs(r) > 2 ** 32 ? n = L(String(r)) : "bigint" == typeof r && (n = String(r),
          (r > BigInt(2) ** BigInt(32) || r < -(BigInt(2) ** BigInt(32))) && (n = L(n)),
          n += "n"),
          i += ` It must be ${e}. Received ${n}`,
          i
      }
      ), RangeError);
      const G = /[^+/0-9A-Za-z-_]/g;
      function V(t, e) {
          let r;
          e = e || 1 / 0;
          const i = t.length;
          let n = null;
          const o = [];
          for (let s = 0; s < i; ++s) {
              if (r = t.charCodeAt(s),
              r > 55295 && r < 57344) {
                  if (!n) {
                      if (r > 56319) {
                          (e -= 3) > -1 && o.push(239, 191, 189);
                          continue
                      }
                      if (s + 1 === i) {
                          (e -= 3) > -1 && o.push(239, 191, 189);
                          continue
                      }
                      n = r;
                      continue
                  }
                  if (r < 56320) {
                      (e -= 3) > -1 && o.push(239, 191, 189),
                      n = r;
                      continue
                  }
                  r = 65536 + (n - 55296 << 10 | r - 56320)
              } else
                  n && (e -= 3) > -1 && o.push(239, 191, 189);
              if (n = null,
              r < 128) {
                  if ((e -= 1) < 0)
                      break;
                  o.push(r)
              } else if (r < 2048) {
                  if ((e -= 2) < 0)
                      break;
                  o.push(r >> 6 | 192, 63 & r | 128)
              } else if (r < 65536) {
                  if ((e -= 3) < 0)
                      break;
                  o.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
              } else {
                  if (!(r < 1114112))
                      throw new Error("Invalid code point");
                  if ((e -= 4) < 0)
                      break;
                  o.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
              }
          }
          return o
      }
      function $(t) {
          return e.toByteArray(function(t) {
              if ((t = (t = t.split("=")[0]).trim().replace(G, "")).length < 2)
                  return "";
              for (; t.length % 4 != 0; )
                  t += "=";
              return t
          }(t))
      }
      function j(t, e, r, i) {
          let n;
          for (n = 0; n < i && !(n + r >= e.length || n >= t.length); ++n)
              e[n + r] = t[n];
          return n
      }
      function Y(t, e) {
          return t instanceof e || null != t && null != t.constructor && null != t.constructor.name && t.constructor.name === e.name
      }
      function W(t) {
          return t != t
      }
      const Z = function() {
          const t = "0123456789abcdef"
            , e = new Array(256);
          for (let r = 0; r < 16; ++r) {
              const i = 16 * r;
              for (let n = 0; n < 16; ++n)
                  e[i + n] = t[r] + t[n]
          }
          return e
      }();
      function X(t) {
          return "undefined" == typeof BigInt ? J : t
      }
      function J() {
          throw new Error("BigInt not supported")
      }
  }(o);
  var d = void 0 !== $parcel$global ? $parcel$global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}
    , I = "function" == typeof Object.create ? function(t, e) {
      t.super_ = e,
      t.prototype = Object.create(e.prototype, {
          constructor: {
              value: t,
              enumerable: !1,
              writable: !0,
              configurable: !0
          }
      })
  }
  : function(t, e) {
      t.super_ = e;
      var r = function() {};
      r.prototype = e.prototype,
      t.prototype = new r,
      t.prototype.constructor = t
  }
  ;
  function m(t, e) {
      var r = {
          seen: [],
          stylize: w
      };
      return arguments.length >= 3 && (r.depth = arguments[2]),
      arguments.length >= 4 && (r.colors = arguments[3]),
      B(e) ? r.showHidden = e : e && q(r, e),
      R(r.showHidden) && (r.showHidden = !1),
      R(r.depth) && (r.depth = 2),
      R(r.colors) && (r.colors = !1),
      R(r.customInspect) && (r.customInspect = !0),
      r.colors && (r.stylize = y),
      C(r, t, r.depth)
  }
  function y(t, e) {
      var r = m.styles[e];
      return r ? "[" + m.colors[r][0] + "m" + t + "[" + m.colors[r][1] + "m" : t
  }
  function w(t, e) {
      return t
  }
  function C(t, e, r) {
      if (t.customInspect && e && S(e.inspect) && e.inspect !== m && (!e.constructor || e.constructor.prototype !== e)) {
          var i = e.inspect(r, t);
          return Q(i) || (i = C(t, i, r)),
          i
      }
      var n = function(t, e) {
          if (R(e))
              return t.stylize("undefined", "undefined");
          if (Q(e)) {
              var r = "'" + JSON.stringify(e).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
              return t.stylize(r, "string")
          }
          if (i = e,
          "number" == typeof i)
              return t.stylize("" + e, "number");
          var i;
          if (B(e))
              return t.stylize("" + e, "boolean");
          if (b(e))
              return t.stylize("null", "null")
      }(t, e);
      if (n)
          return n;
      var o = Object.keys(e)
        , s = function(t) {
          var e = {};
          return t.forEach((function(t, r) {
              e[t] = !0
          }
          )),
          e
      }(o);
      if (t.showHidden && (o = Object.getOwnPropertyNames(e)),
      D(e) && (o.indexOf("message") >= 0 || o.indexOf("description") >= 0))
          return E(e);
      if (0 === o.length) {
          if (S(e)) {
              var a = e.name ? ": " + e.name : "";
              return t.stylize("[Function" + a + "]", "special")
          }
          if (M(e))
              return t.stylize(RegExp.prototype.toString.call(e), "regexp");
          if (x(e))
              return t.stylize(Date.prototype.toString.call(e), "date");
          if (D(e))
              return E(e)
      }
      var u, l, c = "", h = !1, A = ["{", "}"];
      (u = e,
      Array.isArray(u) && (h = !0,
      A = ["[", "]"]),
      S(e)) && (c = " [Function" + (e.name ? ": " + e.name : "") + "]");
      return M(e) && (c = " " + RegExp.prototype.toString.call(e)),
      x(e) && (c = " " + Date.prototype.toUTCString.call(e)),
      D(e) && (c = " " + E(e)),
      0 !== o.length || h && 0 != e.length ? r < 0 ? M(e) ? t.stylize(RegExp.prototype.toString.call(e), "regexp") : t.stylize("[Object]", "special") : (t.seen.push(e),
      l = h ? function(t, e, r, i, n) {
          for (var o = [], s = 0, a = e.length; s < a; ++s)
              N(e, String(s)) ? o.push(v(t, e, r, i, String(s), !0)) : o.push("");
          return n.forEach((function(n) {
              n.match(/^\d+$/) || o.push(v(t, e, r, i, n, !0))
          }
          )),
          o
      }(t, e, r, s, o) : o.map((function(i) {
          return v(t, e, r, s, i, h)
      }
      )),
      t.seen.pop(),
      function(t, e, r) {
          return t.reduce((function(t, e) {
              e.indexOf("\n");
              return t + e.replace(/\u001b\[\d\d?m/g, "").length + 1
          }
          ), 0) > 60 ? r[0] + ("" === e ? "" : e + "\n ") + " " + t.join(",\n  ") + " " + r[1] : r[0] + e + " " + t.join(", ") + " " + r[1]
      }(l, c, A)) : A[0] + c + A[1]
  }
  function E(t) {
      return "[" + Error.prototype.toString.call(t) + "]"
  }
  function v(t, e, r, i, n, o) {
      var s, a, u;
      if ((u = Object.getOwnPropertyDescriptor(e, n) || {
          value: e[n]
      }).get ? a = u.set ? t.stylize("[Getter/Setter]", "special") : t.stylize("[Getter]", "special") : u.set && (a = t.stylize("[Setter]", "special")),
      N(i, n) || (s = "[" + n + "]"),
      a || (t.seen.indexOf(u.value) < 0 ? (a = b(r) ? C(t, u.value, null) : C(t, u.value, r - 1)).indexOf("\n") > -1 && (a = o ? a.split("\n").map((function(t) {
          return "  " + t
      }
      )).join("\n").substr(2) : "\n" + a.split("\n").map((function(t) {
          return "   " + t
      }
      )).join("\n")) : a = t.stylize("[Circular]", "special")),
      R(s)) {
          if (o && n.match(/^\d+$/))
              return a;
          (s = JSON.stringify("" + n)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (s = s.substr(1, s.length - 2),
          s = t.stylize(s, "name")) : (s = s.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"),
          s = t.stylize(s, "string"))
      }
      return s + ": " + a
  }
  function B(t) {
      return "boolean" == typeof t
  }
  function b(t) {
      return null === t
  }
  function Q(t) {
      return "string" == typeof t
  }
  function R(t) {
      return void 0 === t
  }
  function M(t) {
      return _(t) && "[object RegExp]" === F(t)
  }
  function _(t) {
      return "object" == typeof t && null !== t
  }
  function x(t) {
      return _(t) && "[object Date]" === F(t)
  }
  function D(t) {
      return _(t) && ("[object Error]" === F(t) || t instanceof Error)
  }
  function S(t) {
      return "function" == typeof t
  }
  function k(t) {
      return null === t || "boolean" == typeof t || "number" == typeof t || "string" == typeof t || "symbol" == typeof t || void 0 === t
  }
  function F(t) {
      return Object.prototype.toString.call(t)
  }
  function q(t, e) {
      if (!e || !_(e))
          return t;
      for (var r = Object.keys(e), i = r.length; i--; )
          t[r[i]] = e[r[i]];
      return t
  }
  function N(t, e) {
      return Object.prototype.hasOwnProperty.call(t, e)
  }
  function T(t, e) {
      if (t === e)
          return 0;
      for (var r = t.length, i = e.length, n = 0, o = Math.min(r, i); n < o; ++n)
          if (t[n] !== e[n]) {
              r = t[n],
              i = e[n];
              break
          }
      return r < i ? -1 : i < r ? 1 : 0
  }
  m.colors = {
      bold: [1, 22],
      italic: [3, 23],
      underline: [4, 24],
      inverse: [7, 27],
      white: [37, 39],
      grey: [90, 39],
      black: [30, 39],
      blue: [34, 39],
      cyan: [36, 39],
      green: [32, 39],
      magenta: [35, 39],
      red: [31, 39],
      yellow: [33, 39]
  },
  m.styles = {
      special: "cyan",
      number: "yellow",
      boolean: "yellow",
      undefined: "grey",
      null: "bold",
      string: "green",
      date: "magenta",
      regexp: "red"
  };
  var P, O = Object.prototype.hasOwnProperty, U = Object.keys || function(t) {
      var e = [];
      for (var r in t)
          O.call(t, r) && e.push(r);
      return e
  }
  , L = Array.prototype.slice;
  function H() {
      return void 0 !== P ? P : P = "foo" === function() {}
      .name
  }
  function K(t) {
      return Object.prototype.toString.call(t)
  }
  function z(t) {
      return !o.isBuffer(t) && ("function" == typeof d.ArrayBuffer && ("function" == typeof ArrayBuffer.isView ? ArrayBuffer.isView(t) : !!t && (t instanceof DataView || !!(t.buffer && t.buffer instanceof ArrayBuffer))))
  }
  function G(t, e) {
      t || Z(t, !0, e, "==", X)
  }
  var V = /\s*function\s+([^\(\s]*)\s*/;
  function $(t) {
      if (S(t)) {
          if (H())
              return t.name;
          var e = t.toString().match(V);
          return e && e[1]
      }
  }
  function j(t) {
      var e;
      this.name = "AssertionError",
      this.actual = t.actual,
      this.expected = t.expected,
      this.operator = t.operator,
      t.message ? (this.message = t.message,
      this.generatedMessage = !1) : (this.message = Y(W((e = this).actual), 128) + " " + e.operator + " " + Y(W(e.expected), 128),
      this.generatedMessage = !0);
      var r = t.stackStartFunction || Z;
      if (Error.captureStackTrace)
          Error.captureStackTrace(this, r);
      else {
          var i = new Error;
          if (i.stack) {
              var n = i.stack
                , o = $(r)
                , s = n.indexOf("\n" + o);
              if (s >= 0) {
                  var a = n.indexOf("\n", s + 1);
                  n = n.substring(a + 1)
              }
              this.stack = n
          }
      }
  }
  function Y(t, e) {
      return "string" == typeof t ? t.length < e ? t : t.slice(0, e) : t
  }
  function W(t) {
      if (H() || !S(t))
          return m(t);
      var e = $(t);
      return "[Function" + (e ? ": " + e : "") + "]"
  }
  function Z(t, e, r, i, n) {
      throw new j({
          message: r,
          actual: t,
          expected: e,
          operator: i,
          stackStartFunction: n
      })
  }
  function X(t, e) {
      t || Z(t, !0, e, "==", X)
  }
  function J(t, e, r, i) {
      if (t === e)
          return !0;
      if (o.isBuffer(t) && o.isBuffer(e))
          return 0 === T(t, e);
      if (x(t) && x(e))
          return t.getTime() === e.getTime();
      if (M(t) && M(e))
          return t.source === e.source && t.global === e.global && t.multiline === e.multiline && t.lastIndex === e.lastIndex && t.ignoreCase === e.ignoreCase;
      if (null !== t && "object" == typeof t || null !== e && "object" == typeof e) {
          if (z(t) && z(e) && K(t) === K(e) && !(t instanceof Float32Array || t instanceof Float64Array))
              return 0 === T(new Uint8Array(t.buffer), new Uint8Array(e.buffer));
          if (o.isBuffer(t) !== o.isBuffer(e))
              return !1;
          var n = (i = i || {
              actual: [],
              expected: []
          }).actual.indexOf(t);
          return -1 !== n && n === i.expected.indexOf(e) || (i.actual.push(t),
          i.expected.push(e),
          function(t, e, r, i) {
              if (null == t || null == e)
                  return !1;
              if (k(t) || k(e))
                  return t === e;
              if (r && Object.getPrototypeOf(t) !== Object.getPrototypeOf(e))
                  return !1;
              var n = tt(t)
                , o = tt(e);
              if (n && !o || !n && o)
                  return !1;
              if (n)
                  return J(t = L.call(t), e = L.call(e), r);
              var s, a, u = U(t), l = U(e);
              if (u.length !== l.length)
                  return !1;
              for (u.sort(),
              l.sort(),
              a = u.length - 1; a >= 0; a--)
                  if (u[a] !== l[a])
                      return !1;
              for (a = u.length - 1; a >= 0; a--)
                  if (!J(t[s = u[a]], e[s], r, i))
                      return !1;
              return !0
          }(t, e, r, i))
      }
      return r ? t === e : t == e
  }
  function tt(t) {
      return "[object Arguments]" == Object.prototype.toString.call(t)
  }
  function et(t, e) {
      if (!t || !e)
          return !1;
      if ("[object RegExp]" == Object.prototype.toString.call(e))
          return e.test(t);
      try {
          if (t instanceof e)
              return !0
      } catch (t) {}
      return !Error.isPrototypeOf(e) && !0 === e.call({}, t)
  }
  function rt(t, e, r, i) {
      var n;
      if ("function" != typeof e)
          throw new TypeError('"block" argument must be a function');
      "string" == typeof r && (i = r,
      r = null),
      n = function(t) {
          var e;
          try {
              t()
          } catch (t) {
              e = t
          }
          return e
      }(e),
      i = (r && r.name ? " (" + r.name + ")." : ".") + (i ? " " + i : "."),
      t && !n && Z(n, r, "Missing expected exception" + i);
      var o = "string" == typeof i
        , s = !t && n && !r;
      if ((!t && D(n) && o && et(n, r) || s) && Z(n, r, "Got unwanted exception" + i),
      t && n && r && !et(n, r) || !t && n)
          throw n
  }
  G.AssertionError = j,
  I(j, Error),
  G.fail = Z,
  G.ok = X,
  G.equal = function t(e, r, i) {
      e != r && Z(e, r, i, "==", t)
  }
  ,
  G.notEqual = function t(e, r, i) {
      e == r && Z(e, r, i, "!=", t)
  }
  ,
  G.deepEqual = function t(e, r, i) {
      J(e, r, !1) || Z(e, r, i, "deepEqual", t)
  }
  ,
  G.deepStrictEqual = function t(e, r, i) {
      J(e, r, !0) || Z(e, r, i, "deepStrictEqual", t)
  }
  ,
  G.notDeepEqual = function t(e, r, i) {
      J(e, r, !1) && Z(e, r, i, "notDeepEqual", t)
  }
  ,
  G.notDeepStrictEqual = function t(e, r, i) {
      J(e, r, !0) && Z(e, r, i, "notDeepStrictEqual", t)
  }
  ,
  G.strictEqual = function t(e, r, i) {
      e !== r && Z(e, r, i, "===", t)
  }
  ,
  G.notStrictEqual = function t(e, r, i) {
      e === r && Z(e, r, i, "!==", t)
  }
  ,
  G.throws = function(t, e, r) {
      rt(!0, t, e, r)
  }
  ,
  G.doesNotThrow = function(t, e, r) {
      rt(!1, t, e, r)
  }
  ,
  G.ifError = function(t) {
      if (t)
          throw t
  }
  ;
  var it = {};
  class nt {
      makeDestinationObject() {
          return {}
      }
      decode(t, e) {
          throw new Error("Layout is abstract")
      }
      encode(t, e, r) {
          throw new Error("Layout is abstract")
      }
      getSpan(t, e) {
          if (0 > this.span)
              throw new RangeError("indeterminate span");
          return this.span
      }
      replicate(t) {
          const e = Object.create(this.constructor.prototype);
          return Object.assign(e, this),
          e.property = t,
          e
      }
      fromArray(t) {}
      constructor(t, e) {
          if (!Number.isInteger(t))
              throw new TypeError("span must be an integer");
          this.span = t,
          this.property = e
      }
  }
  function ot(t, e) {
      return e.property ? t + "[" + e.property + "]" : t
  }
  it.Layout = nt,
  it.nameWithProperty = ot,
  it.bindConstructorLayout = function(t, e) {
      if ("function" != typeof t)
          throw new TypeError("Class must be constructor");
      if (t.hasOwnProperty("layout_"))
          throw new Error("Class is already bound to a layout");
      if (!(e && e instanceof nt))
          throw new TypeError("layout must be a Layout");
      if (e.hasOwnProperty("boundConstructor_"))
          throw new Error("layout is already bound to a constructor");
      t.layout_ = e,
      e.boundConstructor_ = t,
      e.makeDestinationObject = ()=>new t,
      Object.defineProperty(t.prototype, "encode", {
          value: function(t, r) {
              return e.encode(this, t, r)
          },
          writable: !0
      }),
      Object.defineProperty(t, "decode", {
          value: function(t, r) {
              return e.decode(t, r)
          },
          writable: !0
      })
  }
  ;
  class st extends nt {
      isCount() {
          throw new Error("ExternalLayout is abstract")
      }
  }
  class at extends st {
      isCount() {
          return !0
      }
      decode(t, e) {
          void 0 === e && (e = 0);
          const r = t.length - e;
          return Math.floor(r / this.elementSpan)
      }
      encode(t, e, r) {
          return 0
      }
      constructor(t, e) {
          if (void 0 === t && (t = 1),
          !Number.isInteger(t) || 0 >= t)
              throw new TypeError("elementSpan must be a (positive) integer");
          super(-1, e),
          this.elementSpan = t
      }
  }
  class ut extends st {
      isCount() {
          return this.layout instanceof lt || this.layout instanceof ct
      }
      decode(t, e) {
          return void 0 === e && (e = 0),
          this.layout.decode(t, e + this.offset)
      }
      encode(t, e, r) {
          return void 0 === r && (r = 0),
          this.layout.encode(t, e, r + this.offset)
      }
      constructor(t, e, r) {
          if (!(t instanceof nt))
              throw new TypeError("layout must be a Layout");
          if (void 0 === e)
              e = 0;
          else if (!Number.isInteger(e))
              throw new TypeError("offset must be integer or undefined");
          super(t.span, r || t.property),
          this.layout = t,
          this.offset = e
      }
  }
  class lt extends nt {
      decode(t, e) {
          return void 0 === e && (e = 0),
          t.readUIntLE(e, this.span)
      }
      encode(t, e, r) {
          return void 0 === r && (r = 0),
          e.writeUIntLE(t, r, this.span),
          this.span
      }
      constructor(t, e) {
          if (super(t, e),
          6 < this.span)
              throw new RangeError("span must not exceed 6 bytes")
      }
  }
  class ct extends nt {
      decode(t, e) {
          return void 0 === e && (e = 0),
          t.readUIntBE(e, this.span)
      }
      encode(t, e, r) {
          return void 0 === r && (r = 0),
          e.writeUIntBE(t, r, this.span),
          this.span
      }
      constructor(t, e) {
          if (super(t, e),
          6 < this.span)
              throw new RangeError("span must not exceed 6 bytes")
      }
  }
  class ht extends nt {
      decode(t, e) {
          return void 0 === e && (e = 0),
          t.readIntLE(e, this.span)
      }
      encode(t, e, r) {
          return void 0 === r && (r = 0),
          e.writeIntLE(t, r, this.span),
          this.span
      }
      constructor(t, e) {
          if (super(t, e),
          6 < this.span)
              throw new RangeError("span must not exceed 6 bytes")
      }
  }
  class At extends nt {
      decode(t, e) {
          return void 0 === e && (e = 0),
          t.readIntBE(e, this.span)
      }
      encode(t, e, r) {
          return void 0 === r && (r = 0),
          e.writeIntBE(t, r, this.span),
          this.span
      }
      constructor(t, e) {
          if (super(t, e),
          6 < this.span)
              throw new RangeError("span must not exceed 6 bytes")
      }
  }
  const ft = Math.pow(2, 32);
  function pt(t) {
      const e = Math.floor(t / ft);
      return {
          hi32: e,
          lo32: t - e * ft
      }
  }
  function gt(t, e) {
      return t * ft + e
  }
  class dt extends nt {
      decode(t, e) {
          void 0 === e && (e = 0);
          const r = t.readUInt32LE(e);
          return gt(t.readUInt32LE(e + 4), r)
      }
      encode(t, e, r) {
          void 0 === r && (r = 0);
          const i = pt(t);
          return e.writeUInt32LE(i.lo32, r),
          e.writeUInt32LE(i.hi32, r + 4),
          8
      }
      constructor(t) {
          super(8, t)
      }
  }
  class It extends nt {
      decode(t, e) {
          void 0 === e && (e = 0);
          return gt(t.readUInt32BE(e), t.readUInt32BE(e + 4))
      }
      encode(t, e, r) {
          void 0 === r && (r = 0);
          const i = pt(t);
          return e.writeUInt32BE(i.hi32, r),
          e.writeUInt32BE(i.lo32, r + 4),
          8
      }
      constructor(t) {
          super(8, t)
      }
  }
  class mt extends nt {
      decode(t, e) {
          void 0 === e && (e = 0);
          const r = t.readUInt32LE(e);
          return gt(t.readInt32LE(e + 4), r)
      }
      encode(t, e, r) {
          void 0 === r && (r = 0);
          const i = pt(t);
          return e.writeUInt32LE(i.lo32, r),
          e.writeInt32LE(i.hi32, r + 4),
          8
      }
      constructor(t) {
          super(8, t)
      }
  }
  class yt extends nt {
      decode(t, e) {
          void 0 === e && (e = 0);
          return gt(t.readInt32BE(e), t.readUInt32BE(e + 4))
      }
      encode(t, e, r) {
          void 0 === r && (r = 0);
          const i = pt(t);
          return e.writeInt32BE(i.hi32, r),
          e.writeUInt32BE(i.lo32, r + 4),
          8
      }
      constructor(t) {
          super(8, t)
      }
  }
  class wt extends nt {
      decode(t, e) {
          return void 0 === e && (e = 0),
          t.readFloatLE(e)
      }
      encode(t, e, r) {
          return void 0 === r && (r = 0),
          e.writeFloatLE(t, r),
          4
      }
      constructor(t) {
          super(4, t)
      }
  }
  class Ct extends nt {
      decode(t, e) {
          return void 0 === e && (e = 0),
          t.readFloatBE(e)
      }
      encode(t, e, r) {
          return void 0 === r && (r = 0),
          e.writeFloatBE(t, r),
          4
      }
      constructor(t) {
          super(4, t)
      }
  }
  class Et extends nt {
      decode(t, e) {
          return void 0 === e && (e = 0),
          t.readDoubleLE(e)
      }
      encode(t, e, r) {
          return void 0 === r && (r = 0),
          e.writeDoubleLE(t, r),
          8
      }
      constructor(t) {
          super(8, t)
      }
  }
  class vt extends nt {
      decode(t, e) {
          return void 0 === e && (e = 0),
          t.readDoubleBE(e)
      }
      encode(t, e, r) {
          return void 0 === r && (r = 0),
          e.writeDoubleBE(t, r),
          8
      }
      constructor(t) {
          super(8, t)
      }
  }
  class Bt extends nt {
      getSpan(t, e) {
          if (0 <= this.span)
              return this.span;
          void 0 === e && (e = 0);
          let r = 0
            , i = this.count;
          if (i instanceof st && (i = i.decode(t, e)),
          0 < this.elementLayout.span)
              r = i * this.elementLayout.span;
          else {
              let n = 0;
              for (; n < i; )
                  r += this.elementLayout.getSpan(t, e + r),
                  ++n
          }
          return r
      }
      decode(t, e) {
          void 0 === e && (e = 0);
          const r = [];
          let i = 0
            , n = this.count;
          for (n instanceof st && (n = n.decode(t, e)); i < n; )
              r.push(this.elementLayout.decode(t, e)),
              e += this.elementLayout.getSpan(t, e),
              i += 1;
          return r
      }
      encode(t, e, r) {
          void 0 === r && (r = 0);
          const i = this.elementLayout
            , n = t.reduce(((t,n)=>t + i.encode(n, e, r + t)), 0);
          return this.count instanceof st && this.count.encode(t.length, e, r),
          n
      }
      constructor(t, e, r) {
          if (!(t instanceof nt))
              throw new TypeError("elementLayout must be a Layout");
          if (!(e instanceof st && e.isCount() || Number.isInteger(e) && 0 <= e))
              throw new TypeError("count must be non-negative integer or an unsigned integer ExternalLayout");
          let i = -1;
          !(e instanceof st) && 0 < t.span && (i = e * t.span),
          super(i, r),
          this.elementLayout = t,
          this.count = e
      }
  }
  class bt extends nt {
      getSpan(t, e) {
          if (0 <= this.span)
              return this.span;
          void 0 === e && (e = 0);
          let r = 0;
          try {
              r = this.fields.reduce(((r,i)=>{
                  const n = i.getSpan(t, e);
                  return e += n,
                  r + n
              }
              ), 0)
          } catch (t) {
              throw new RangeError("indeterminate span")
          }
          return r
      }
      decode(t, e) {
          void 0 === e && (e = 0);
          const r = this.makeDestinationObject();
          for (const i of this.fields)
              if (void 0 !== i.property && (r[i.property] = i.decode(t, e)),
              e += i.getSpan(t, e),
              this.decodePrefixes && t.length === e)
                  break;
          return r
      }
      encode(t, e, r) {
          void 0 === r && (r = 0);
          const i = r;
          let n = 0
            , o = 0;
          for (const i of this.fields) {
              let s = i.span;
              if (o = 0 < s ? s : 0,
              void 0 !== i.property) {
                  const n = t[i.property];
                  void 0 !== n && (o = i.encode(n, e, r),
                  0 > s && (s = i.getSpan(e, r)))
              }
              n = r,
              r += s
          }
          return n + o - i
      }
      fromArray(t) {
          const e = this.makeDestinationObject();
          for (const r of this.fields)
              void 0 !== r.property && 0 < t.length && (e[r.property] = t.shift());
          return e
      }
      layoutFor(t) {
          if ("string" != typeof t)
              throw new TypeError("property must be string");
          for (const e of this.fields)
              if (e.property === t)
                  return e
      }
      offsetOf(t) {
          if ("string" != typeof t)
              throw new TypeError("property must be string");
          let e = 0;
          for (const r of this.fields) {
              if (r.property === t)
                  return e;
              0 > r.span ? e = -1 : 0 <= e && (e += r.span)
          }
      }
      constructor(t, e, r) {
          if (!Array.isArray(t) || !t.reduce(((t,e)=>t && e instanceof nt), !0))
              throw new TypeError("fields must be array of Layout instances");
          "boolean" == typeof e && void 0 === r && (r = e,
          e = void 0);
          for (const e of t)
              if (0 > e.span && void 0 === e.property)
                  throw new Error("fields cannot contain unnamed variable-length layout");
          let i = -1;
          try {
              i = t.reduce(((t,e)=>t + e.getSpan()), 0)
          } catch (t) {}
          super(i, e),
          this.fields = t,
          this.decodePrefixes = !!r
      }
  }
  class Qt {
      decode() {
          throw new Error("UnionDiscriminator is abstract")
      }
      encode() {
          throw new Error("UnionDiscriminator is abstract")
      }
      constructor(t) {
          this.property = t
      }
  }
  class Rt extends Qt {
      decode(t, e) {
          return this.layout.decode(t, e)
      }
      encode(t, e, r) {
          return this.layout.encode(t, e, r)
      }
      constructor(t, e) {
          if (!(t instanceof st && t.isCount()))
              throw new TypeError("layout must be an unsigned integer ExternalLayout");
          super(e || t.property || "variant"),
          this.layout = t
      }
  }
  class Mt extends nt {
      getSpan(t, e) {
          if (0 <= this.span)
              return this.span;
          void 0 === e && (e = 0);
          const r = this.getVariant(t, e);
          if (!r)
              throw new Error("unable to determine span for unrecognized variant");
          return r.getSpan(t, e)
      }
      defaultGetSourceVariant(t) {
          if (t.hasOwnProperty(this.discriminator.property)) {
              if (this.defaultLayout && t.hasOwnProperty(this.defaultLayout.property))
                  return;
              const e = this.registry[t[this.discriminator.property]];
              if (e && (!e.layout || t.hasOwnProperty(e.property)))
                  return e
          } else
              for (const e in this.registry) {
                  const r = this.registry[e];
                  if (t.hasOwnProperty(r.property))
                      return r
              }
          throw new Error("unable to infer src variant")
      }
      decode(t, e) {
          let r;
          void 0 === e && (e = 0);
          const i = this.discriminator
            , n = i.decode(t, e);
          let o = this.registry[n];
          if (void 0 === o) {
              let s = 0;
              o = this.defaultLayout,
              this.usesPrefixDiscriminator && (s = i.layout.span),
              r = this.makeDestinationObject(),
              r[i.property] = n,
              r[o.property] = this.defaultLayout.decode(t, e + s)
          } else
              r = o.decode(t, e);
          return r
      }
      encode(t, e, r) {
          void 0 === r && (r = 0);
          const i = this.getSourceVariant(t);
          if (void 0 === i) {
              const i = this.discriminator
                , n = this.defaultLayout;
              let o = 0;
              return this.usesPrefixDiscriminator && (o = i.layout.span),
              i.encode(t[i.property], e, r),
              o + n.encode(t[n.property], e, r + o)
          }
          return i.encode(t, e, r)
      }
      addVariant(t, e, r) {
          const i = new _t(this,t,e,r);
          return this.registry[t] = i,
          i
      }
      getVariant(t, e) {
          let r = t;
          return o.Buffer.isBuffer(t) && (void 0 === e && (e = 0),
          r = this.discriminator.decode(t, e)),
          this.registry[r]
      }
      constructor(t, e, r) {
          const i = t instanceof lt || t instanceof ct;
          if (i)
              t = new Rt(new ut(t));
          else if (t instanceof st && t.isCount())
              t = new Rt(t);
          else if (!(t instanceof Qt))
              throw new TypeError("discr must be a UnionDiscriminator or an unsigned integer layout");
          if (void 0 === e && (e = null),
          !(null === e || e instanceof nt))
              throw new TypeError("defaultLayout must be null or a Layout");
          if (null !== e) {
              if (0 > e.span)
                  throw new Error("defaultLayout must have constant span");
              void 0 === e.property && (e = e.replicate("content"))
          }
          let n = -1;
          e && (n = e.span,
          0 <= n && i && (n += t.layout.span)),
          super(n, r),
          this.discriminator = t,
          this.usesPrefixDiscriminator = i,
          this.defaultLayout = e,
          this.registry = {};
          let o = this.defaultGetSourceVariant.bind(this);
          this.getSourceVariant = function(t) {
              return o(t)
          }
          ,
          this.configGetSourceVariant = function(t) {
              o = t.bind(this)
          }
      }
  }
  class _t extends nt {
      getSpan(t, e) {
          if (0 <= this.span)
              return this.span;
          void 0 === e && (e = 0);
          let r = 0;
          return this.union.usesPrefixDiscriminator && (r = this.union.discriminator.layout.span),
          r + this.layout.getSpan(t, e + r)
      }
      decode(t, e) {
          const r = this.makeDestinationObject();
          if (void 0 === e && (e = 0),
          this !== this.union.getVariant(t, e))
              throw new Error("variant mismatch");
          let i = 0;
          return this.union.usesPrefixDiscriminator && (i = this.union.discriminator.layout.span),
          this.layout ? r[this.property] = this.layout.decode(t, e + i) : this.property ? r[this.property] = !0 : this.union.usesPrefixDiscriminator && (r[this.union.discriminator.property] = this.variant),
          r
      }
      encode(t, e, r) {
          void 0 === r && (r = 0);
          let i = 0;
          if (this.union.usesPrefixDiscriminator && (i = this.union.discriminator.layout.span),
          this.layout && !t.hasOwnProperty(this.property))
              throw new TypeError("variant lacks property " + this.property);
          this.union.discriminator.encode(this.variant, e, r);
          let n = i;
          if (this.layout && (this.layout.encode(t[this.property], e, r + i),
          n += this.layout.getSpan(e, r + i),
          0 <= this.union.span && n > this.union.span))
              throw new Error("encoded variant overruns containing union");
          return n
      }
      fromArray(t) {
          if (this.layout)
              return this.layout.fromArray(t)
      }
      constructor(t, e, r, i) {
          if (!(t instanceof Mt))
              throw new TypeError("union must be a Union");
          if (!Number.isInteger(e) || 0 > e)
              throw new TypeError("variant must be a (non-negative) integer");
          if ("string" == typeof r && void 0 === i && (i = r,
          r = null),
          r) {
              if (!(r instanceof nt))
                  throw new TypeError("layout must be a Layout");
              if (null !== t.defaultLayout && 0 <= r.span && r.span > t.defaultLayout.span)
                  throw new Error("variant span exceeds span of containing union");
              if ("string" != typeof i)
                  throw new TypeError("variant must have a String property")
          }
          let n = t.span;
          0 > t.span && (n = r ? r.span : 0,
          0 <= n && t.usesPrefixDiscriminator && (n += t.discriminator.layout.span)),
          super(n, i),
          this.union = t,
          this.variant = e,
          this.layout = r || null
      }
  }
  function xt(t) {
      return 0 > t && (t += 4294967296),
      t
  }
  class Dt extends nt {
      decode(t, e) {
          const r = this.makeDestinationObject();
          void 0 === e && (e = 0);
          const i = this.word.decode(t, e);
          this._packedSetValue(i);
          for (const t of this.fields)
              void 0 !== t.property && (r[t.property] = t.decode(i));
          return r
      }
      encode(t, e, r) {
          void 0 === r && (r = 0);
          const i = this.word.decode(e, r);
          this._packedSetValue(i);
          for (const e of this.fields)
              if (void 0 !== e.property) {
                  const r = t[e.property];
                  void 0 !== r && e.encode(r)
              }
          return this.word.encode(this._packedGetValue(), e, r)
      }
      addField(t, e) {
          const r = new St(this,t,e);
          return this.fields.push(r),
          r
      }
      addBoolean(t) {
          const e = new kt(this,t);
          return this.fields.push(e),
          e
      }
      fieldFor(t) {
          if ("string" != typeof t)
              throw new TypeError("property must be string");
          for (const e of this.fields)
              if (e.property === t)
                  return e
      }
      constructor(t, e, r) {
          if (!(t instanceof lt || t instanceof ct))
              throw new TypeError("word must be a UInt or UIntBE layout");
          if ("string" == typeof e && void 0 === r && (r = e,
          e = void 0),
          4 < t.span)
              throw new RangeError("word cannot exceed 32 bits");
          super(t.span, r),
          this.word = t,
          this.msb = !!e,
          this.fields = [];
          let i = 0;
          this._packedSetValue = function(t) {
              return i = xt(t),
              this
          }
          ,
          this._packedGetValue = function() {
              return i
          }
      }
  }
  class St {
      decode() {
          return xt(this.container._packedGetValue() & this.wordMask) >>> this.start
      }
      encode(t) {
          if (!Number.isInteger(t) || t !== xt(t & this.valueMask))
              throw new TypeError(ot("BitField.encode", this) + " value must be integer not exceeding " + this.valueMask);
          const e = this.container._packedGetValue()
            , r = xt(t << this.start);
          this.container._packedSetValue(xt(e & ~this.wordMask) | r)
      }
      constructor(t, e, r) {
          if (!(t instanceof Dt))
              throw new TypeError("container must be a BitStructure");
          if (!Number.isInteger(e) || 0 >= e)
              throw new TypeError("bits must be positive integer");
          const i = 8 * t.span
            , n = t.fields.reduce(((t,e)=>t + e.bits), 0);
          if (e + n > i)
              throw new Error("bits too long for span remainder (" + (i - n) + " of " + i + " remain)");
          this.container = t,
          this.bits = e,
          this.valueMask = (1 << e) - 1,
          32 === e && (this.valueMask = 4294967295),
          this.start = n,
          this.container.msb && (this.start = i - n - e),
          this.wordMask = xt(this.valueMask << this.start),
          this.property = r
      }
  }
  class kt extends St {
      decode(t, e) {
          return !!St.prototype.decode.call(this, t, e)
      }
      encode(t) {
          return "boolean" == typeof t && (t = +t),
          St.prototype.encode.call(this, t)
      }
      constructor(t, e) {
          super(t, 1, e)
      }
  }
  class Ft extends nt {
      getSpan(t, e) {
          let r = this.span;
          return 0 > r && (r = this.length.decode(t, e)),
          r
      }
      decode(t, e) {
          void 0 === e && (e = 0);
          let r = this.span;
          return 0 > r && (r = this.length.decode(t, e)),
          t.slice(e, e + r)
      }
      encode(t, e, r) {
          let i = this.length;
          if (this.length instanceof st && (i = t.length),
          !o.Buffer.isBuffer(t) || i !== t.length)
              throw new TypeError(ot("Blob.encode", this) + " requires (length " + i + ") Buffer as src");
          if (r + i > e.length)
              throw new RangeError("encoding overruns Buffer");
          return e.write(t.toString("hex"), r, i, "hex"),
          this.length instanceof st && this.length.encode(i, e, r),
          i
      }
      constructor(t, e) {
          if (!(t instanceof st && t.isCount() || Number.isInteger(t) && 0 <= t))
              throw new TypeError("length must be positive integer or an unsigned integer ExternalLayout");
          let r = -1;
          t instanceof st || (r = t),
          super(r, e),
          this.length = t
      }
  }
  class qt extends nt {
      getSpan(t, e) {
          if (!o.Buffer.isBuffer(t))
              throw new TypeError("b must be a Buffer");
          void 0 === e && (e = 0);
          let r = e;
          for (; r < t.length && 0 !== t[r]; )
              r += 1;
          return 1 + r - e
      }
      decode(t, e, r) {
          void 0 === e && (e = 0);
          let i = this.getSpan(t, e);
          return t.slice(e, e + i - 1).toString("utf-8")
      }
      encode(t, e, r) {
          void 0 === r && (r = 0),
          "string" != typeof t && (t = t.toString());
          const i = new o.Buffer(t,"utf8")
            , n = i.length;
          if (r + n > e.length)
              throw new RangeError("encoding overruns Buffer");
          return i.copy(e, r),
          e[r + n] = 0,
          n + 1
      }
      constructor(t) {
          super(-1, t)
      }
  }
  class Nt extends nt {
      getSpan(t, e) {
          if (!o.Buffer.isBuffer(t))
              throw new TypeError("b must be a Buffer");
          return void 0 === e && (e = 0),
          t.length - e
      }
      decode(t, e, r) {
          void 0 === e && (e = 0);
          let i = this.getSpan(t, e);
          if (0 <= this.maxSpan && this.maxSpan < i)
              throw new RangeError("text length exceeds maxSpan");
          return t.slice(e, e + i).toString("utf-8")
      }
      encode(t, e, r) {
          void 0 === r && (r = 0),
          "string" != typeof t && (t = t.toString());
          const i = new o.Buffer(t,"utf8")
            , n = i.length;
          if (0 <= this.maxSpan && this.maxSpan < n)
              throw new RangeError("text length exceeds maxSpan");
          if (r + n > e.length)
              throw new RangeError("encoding overruns Buffer");
          return i.copy(e, r),
          n
      }
      constructor(t, e) {
          if ("string" == typeof t && void 0 === e && (e = t,
          t = void 0),
          void 0 === t)
              t = -1;
          else if (!Number.isInteger(t))
              throw new TypeError("maxSpan must be an integer");
          super(-1, e),
          this.maxSpan = t
      }
  }
  class Tt extends nt {
      decode(t, e, r) {
          return this.value
      }
      encode(t, e, r) {
          return 0
      }
      constructor(t, e) {
          super(0, e),
          this.value = t
      }
  }
  it.ExternalLayout = st,
  it.GreedyCount = at,
  it.OffsetLayout = ut,
  it.UInt = lt,
  it.UIntBE = ct,
  it.Int = ht,
  it.IntBE = At,
  it.Float = wt,
  it.FloatBE = Ct,
  it.Double = Et,
  it.DoubleBE = vt,
  it.Sequence = Bt,
  it.Structure = bt,
  it.UnionDiscriminator = Qt,
  it.UnionLayoutDiscriminator = Rt,
  it.Union = Mt,
  it.VariantLayout = _t,
  it.BitStructure = Dt,
  it.BitField = St,
  it.Boolean = kt,
  it.Blob = Ft,
  it.CString = qt,
  it.UTF8 = Nt,
  it.Constant = Tt,
  it.greedy = (t,e)=>new at(t,e),
  it.offset = (t,e,r)=>new ut(t,e,r);
  var Pt = it.u8 = t=>new lt(1,t);
  it.u16 = t=>new lt(2,t),
  it.u24 = t=>new lt(3,t);
  var Ot = it.u32 = t=>new lt(4,t);
  it.u40 = t=>new lt(5,t),
  it.u48 = t=>new lt(6,t),
  it.nu64 = t=>new dt(t),
  it.u16be = t=>new ct(2,t),
  it.u24be = t=>new ct(3,t),
  it.u32be = t=>new ct(4,t),
  it.u40be = t=>new ct(5,t),
  it.u48be = t=>new ct(6,t),
  it.nu64be = t=>new It(t),
  it.s8 = t=>new ht(1,t),
  it.s16 = t=>new ht(2,t),
  it.s24 = t=>new ht(3,t),
  it.s32 = t=>new ht(4,t),
  it.s40 = t=>new ht(5,t),
  it.s48 = t=>new ht(6,t),
  it.ns64 = t=>new mt(t),
  it.s16be = t=>new At(2,t),
  it.s24be = t=>new At(3,t),
  it.s32be = t=>new At(4,t),
  it.s40be = t=>new At(5,t),
  it.s48be = t=>new At(6,t),
  it.ns64be = t=>new yt(t),
  it.f32 = t=>new wt(t),
  it.f32be = t=>new Ct(t),
  it.f64 = t=>new Et(t),
  it.f64be = t=>new vt(t);
  var Ut = it.struct = (t,e,r)=>new bt(t,e,r);
  it.bits = (t,e,r)=>new Dt(t,e,r),
  it.seq = (t,e,r)=>new Bt(t,e,r),
  it.union = (t,e,r)=>new Mt(t,e,r),
  it.unionLayoutDiscriminator = (t,e)=>new Rt(t,e);
  var Lt = it.blob = (t,e)=>new Ft(t,e);
  it.cstr = t=>new qt(t),
  it.utf8 = (t,e)=>new Nt(t,e),
  it.const = (t,e)=>new Tt(t,e);
  const Ht = (t="publicKey")=>Lt(32, t)
    , Kt = (t="uint64")=>Lt(8, t);
  function zt(t, e, r, ...i) {
      return (0,
      n.sendAndConfirmTransaction)(e, r, i, {
          skipPreflight: !1
      })
  }
  const Gt = new (0,
  n.PublicKey)("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
    , Vt = new (0,
  n.PublicKey)("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL")
    , $t = "Failed to find account"
    , jt = "Invalid account owner";
  function Yt(t) {
      return o.Buffer.from(t.toBuffer())
  }
  class Wt extends ($parcel$interopDefault(i)) {
      toBuffer() {
          const t = super.toArray().reverse()
            , e = o.Buffer.from(t);
          if (8 === e.length)
              return e;
          G(e.length < 8, "u64 too large");
          const r = o.Buffer.alloc(8);
          return e.copy(r),
          r
      }
      static fromBuffer(t) {
          return G(8 === t.length, `Invalid buffer length: ${t.length}`),
          new Wt([...t].reverse().map((t=>`00${t.toString(16)}`.slice(-2))).join(""),16)
      }
  }
  function Zt(t) {
      return "publicKey"in t
  }
  const Xt = {
      MintTokens: 0,
      FreezeAccount: 1,
      AccountOwner: 2,
      CloseAccount: 3
  }
    , Jt = new (0,
  n.PublicKey)("So11111111111111111111111111111111111111112")
    , te = Ut([Ot("mintAuthorityOption"), Ht("mintAuthority"), Kt("supply"), Pt("decimals"), Pt("isInitialized"), Ot("freezeAuthorityOption"), Ht("freezeAuthority")])
    , ee = Ut([Ht("mint"), Ht("owner"), Kt("amount"), Ot("delegateOption"), Ht("delegate"), Pt("state"), Ot("isNativeOption"), Kt("isNative"), Kt("delegatedAmount"), Ot("closeAuthorityOption"), Ht("closeAuthority")])
    , re = Ut([Pt("m"), Pt("n"), Pt("is_initialized"), Ht("signer1"), Ht("signer2"), Ht("signer3"), Ht("signer4"), Ht("signer5"), Ht("signer6"), Ht("signer7"), Ht("signer8"), Ht("signer9"), Ht("signer10"), Ht("signer11")]);
  class ie {
      static async getMinBalanceRentForExemptMint(t) {
          return await t.getMinimumBalanceForRentExemption(te.span)
      }
      static async getMinBalanceRentForExemptAccount(t) {
          return await t.getMinimumBalanceForRentExemption(ee.span)
      }
      static async getMinBalanceRentForExemptMultisig(t) {
          return await t.getMinimumBalanceForRentExemption(re.span)
      }
      static async createMint(t, e, r, i, o, s) {
          const a = n.Keypair.generate()
            , u = new ie(t,a.publicKey,s,e)
            , l = await ie.getMinBalanceRentForExemptMint(t)
            , c = new (0,
          n.Transaction);
          return c.add(n.SystemProgram.createAccount({
              fromPubkey: e.publicKey,
              newAccountPubkey: a.publicKey,
              lamports: l,
              space: te.span,
              programId: s
          })),
          c.add(ie.createInitMintInstruction(s, a.publicKey, o, r, i)),
          await zt(0, t, c, e, a),
          u
      }
      async createAccount(t) {
          const e = await ie.getMinBalanceRentForExemptAccount(this.connection)
            , r = n.Keypair.generate()
            , i = new (0,
          n.Transaction);
          i.add(n.SystemProgram.createAccount({
              fromPubkey: this.payer.publicKey,
              newAccountPubkey: r.publicKey,
              lamports: e,
              space: ee.span,
              programId: this.programId
          }));
          const o = this.publicKey;
          return i.add(ie.createInitAccountInstruction(this.programId, o, r.publicKey, t)),
          await zt(0, this.connection, i, this.payer, r),
          r.publicKey
      }
      async createAssociatedTokenAccount(t) {
          const e = await ie.getAssociatedTokenAddress(this.associatedProgramId, this.programId, this.publicKey, t);
          return this.createAssociatedTokenAccountInternal(t, e)
      }
      async createAssociatedTokenAccountInternal(t, e) {
          return await zt(0, this.connection, (new (0,
          n.Transaction)).add(ie.createAssociatedTokenAccountInstruction(this.associatedProgramId, this.programId, this.publicKey, e, t, this.payer.publicKey)), this.payer),
          e
      }
      async getOrCreateAssociatedAccountInfo(t) {
          const e = await ie.getAssociatedTokenAddress(this.associatedProgramId, this.programId, this.publicKey, t);
          try {
              return await this.getAccountInfo(e)
          } catch (r) {
              if (r.message === $t || r.message === jt) {
                  try {
                      await this.createAssociatedTokenAccountInternal(t, e)
                  } catch (t) {}
                  return await this.getAccountInfo(e)
              }
              throw r
          }
      }
      static async createWrappedNativeAccount(t, e, r, i, o) {
          const s = await ie.getMinBalanceRentForExemptAccount(t)
            , a = n.Keypair.generate()
            , u = new (0,
          n.Transaction);
          return u.add(n.SystemProgram.createAccount({
              fromPubkey: i.publicKey,
              newAccountPubkey: a.publicKey,
              lamports: s,
              space: ee.span,
              programId: e
          })),
          u.add(n.SystemProgram.transfer({
              fromPubkey: i.publicKey,
              toPubkey: a.publicKey,
              lamports: o
          })),
          u.add(ie.createInitAccountInstruction(e, Jt, a.publicKey, r)),
          await zt(0, t, u, i, a),
          a.publicKey
      }
      async createMultisig(t, e) {
          const r = n.Keypair.generate()
            , i = await ie.getMinBalanceRentForExemptMultisig(this.connection)
            , s = new (0,
          n.Transaction);
          s.add(n.SystemProgram.createAccount({
              fromPubkey: this.payer.publicKey,
              newAccountPubkey: r.publicKey,
              lamports: i,
              space: re.span,
              programId: this.programId
          }));
          let a = [{
              pubkey: r.publicKey,
              isSigner: !1,
              isWritable: !0
          }, {
              pubkey: n.SYSVAR_RENT_PUBKEY,
              isSigner: !1,
              isWritable: !1
          }];
          e.forEach((t=>a.push({
              pubkey: t,
              isSigner: !1,
              isWritable: !1
          })));
          const u = Ut([Pt("instruction"), Pt("m")])
            , l = o.Buffer.alloc(u.span);
          return u.encode({
              instruction: 2,
              m: t
          }, l),
          s.add({
              keys: a,
              programId: this.programId,
              data: l
          }),
          await zt(0, this.connection, s, this.payer, r),
          r.publicKey
      }
      async getMintInfo() {
          const t = await this.connection.getAccountInfo(this.publicKey);
          if (null === t)
              throw new Error("Failed to find mint account");
          if (!t.owner.equals(this.programId))
              throw new Error(`Invalid mint owner: ${JSON.stringify(t.owner)}`);
          if (t.data.length != te.span)
              throw new Error("Invalid mint size");
          const e = o.Buffer.from(t.data)
            , r = te.decode(e);
          return 0 === r.mintAuthorityOption ? r.mintAuthority = null : r.mintAuthority = new (0,
          n.PublicKey)(r.mintAuthority),
          r.supply = Wt.fromBuffer(r.supply),
          r.isInitialized = 0 != r.isInitialized,
          0 === r.freezeAuthorityOption ? r.freezeAuthority = null : r.freezeAuthority = new (0,
          n.PublicKey)(r.freezeAuthority),
          r
      }
      async getAccountInfo(t, e) {
          const r = await this.connection.getAccountInfo(t, e);
          if (null === r)
              throw new Error($t);
          if (!r.owner.equals(this.programId))
              throw new Error(jt);
          if (r.data.length != ee.span)
              throw new Error("Invalid account size");
          const i = o.Buffer.from(r.data)
            , s = ee.decode(i);
          if (s.address = t,
          s.mint = new (0,
          n.PublicKey)(s.mint),
          s.owner = new (0,
          n.PublicKey)(s.owner),
          s.amount = Wt.fromBuffer(s.amount),
          0 === s.delegateOption ? (s.delegate = null,
          s.delegatedAmount = new Wt) : (s.delegate = new (0,
          n.PublicKey)(s.delegate),
          s.delegatedAmount = Wt.fromBuffer(s.delegatedAmount)),
          s.isInitialized = 0 !== s.state,
          s.isFrozen = 2 === s.state,
          1 === s.isNativeOption ? (s.rentExemptReserve = Wt.fromBuffer(s.isNative),
          s.isNative = !0) : (s.rentExemptReserve = null,
          s.isNative = !1),
          0 === s.closeAuthorityOption ? s.closeAuthority = null : s.closeAuthority = new (0,
          n.PublicKey)(s.closeAuthority),
          !s.mint.equals(this.publicKey))
              throw new Error(`Invalid account mint: ${JSON.stringify(s.mint)} !== ${JSON.stringify(this.publicKey)}`);
          return s
      }
      async getMultisigInfo(t) {
          const e = await this.connection.getAccountInfo(t);
          if (null === e)
              throw new Error("Failed to find multisig");
          if (!e.owner.equals(this.programId))
              throw new Error("Invalid multisig owner");
          if (e.data.length != re.span)
              throw new Error("Invalid multisig size");
          const r = o.Buffer.from(e.data)
            , i = re.decode(r);
          return i.signer1 = new (0,
          n.PublicKey)(i.signer1),
          i.signer2 = new (0,
          n.PublicKey)(i.signer2),
          i.signer3 = new (0,
          n.PublicKey)(i.signer3),
          i.signer4 = new (0,
          n.PublicKey)(i.signer4),
          i.signer5 = new (0,
          n.PublicKey)(i.signer5),
          i.signer6 = new (0,
          n.PublicKey)(i.signer6),
          i.signer7 = new (0,
          n.PublicKey)(i.signer7),
          i.signer8 = new (0,
          n.PublicKey)(i.signer8),
          i.signer9 = new (0,
          n.PublicKey)(i.signer9),
          i.signer10 = new (0,
          n.PublicKey)(i.signer10),
          i.signer11 = new (0,
          n.PublicKey)(i.signer11),
          i
      }
      async transfer(t, e, r, i, o) {
          let s, a;
          return Zt(r) ? (s = r.publicKey,
          a = [r]) : (s = r,
          a = i),
          await zt("Transfer", this.connection, (new (0,
          n.Transaction)).add(ie.createTransferInstruction(this.programId, t, e, s, i, o)), this.payer, ...a)
      }
      async approve(t, e, r, i, o) {
          let s, a;
          Zt(r) ? (s = r.publicKey,
          a = [r]) : (s = r,
          a = i),
          await zt("Approve", this.connection, (new (0,
          n.Transaction)).add(ie.createApproveInstruction(this.programId, t, e, s, i, o)), this.payer, ...a)
      }
      async revoke(t, e, r) {
          let i, o;
          Zt(e) ? (i = e.publicKey,
          o = [e]) : (i = e,
          o = r),
          await zt("Revoke", this.connection, (new (0,
          n.Transaction)).add(ie.createRevokeInstruction(this.programId, t, i, r)), this.payer, ...o)
      }
      async setAuthority(t, e, r, i, o) {
          let s, a;
          Zt(i) ? (s = i.publicKey,
          a = [i]) : (s = i,
          a = o),
          await zt("SetAuthority", this.connection, (new (0,
          n.Transaction)).add(ie.createSetAuthorityInstruction(this.programId, t, e, r, s, o)), this.payer, ...a)
      }
      async mintTo(t, e, r, i) {
          let o, s;
          Zt(e) ? (o = e.publicKey,
          s = [e]) : (o = e,
          s = r),
          await zt("MintTo", this.connection, (new (0,
          n.Transaction)).add(ie.createMintToInstruction(this.programId, this.publicKey, t, o, r, i)), this.payer, ...s)
      }
      async burn(t, e, r, i) {
          let o, s;
          Zt(e) ? (o = e.publicKey,
          s = [e]) : (o = e,
          s = r),
          await zt("Burn", this.connection, (new (0,
          n.Transaction)).add(ie.createBurnInstruction(this.programId, this.publicKey, t, o, r, i)), this.payer, ...s)
      }
      async closeAccount(t, e, r, i) {
          let o, s;
          Zt(r) ? (o = r.publicKey,
          s = [r]) : (o = r,
          s = i),
          await zt("CloseAccount", this.connection, (new (0,
          n.Transaction)).add(ie.createCloseAccountInstruction(this.programId, t, e, o, i)), this.payer, ...s)
      }
      async freezeAccount(t, e, r) {
          let i, o;
          Zt(e) ? (i = e.publicKey,
          o = [e]) : (i = e,
          o = r),
          await zt("FreezeAccount", this.connection, (new (0,
          n.Transaction)).add(ie.createFreezeAccountInstruction(this.programId, t, this.publicKey, i, r)), this.payer, ...o)
      }
      async thawAccount(t, e, r) {
          let i, o;
          Zt(e) ? (i = e.publicKey,
          o = [e]) : (i = e,
          o = r),
          await zt("ThawAccount", this.connection, (new (0,
          n.Transaction)).add(ie.createThawAccountInstruction(this.programId, t, this.publicKey, i, r)), this.payer, ...o)
      }
      async transferChecked(t, e, r, i, o, s) {
          let a, u;
          return Zt(r) ? (a = r.publicKey,
          u = [r]) : (a = r,
          u = i),
          await zt("TransferChecked", this.connection, (new (0,
          n.Transaction)).add(ie.createTransferCheckedInstruction(this.programId, t, this.publicKey, e, a, i, o, s)), this.payer, ...u)
      }
      async approveChecked(t, e, r, i, o, s) {
          let a, u;
          Zt(r) ? (a = r.publicKey,
          u = [r]) : (a = r,
          u = i),
          await zt("ApproveChecked", this.connection, (new (0,
          n.Transaction)).add(ie.createApproveCheckedInstruction(this.programId, t, this.publicKey, e, a, i, o, s)), this.payer, ...u)
      }
      async mintToChecked(t, e, r, i, o) {
          let s, a;
          Zt(e) ? (s = e.publicKey,
          a = [e]) : (s = e,
          a = r),
          await zt("MintToChecked", this.connection, (new (0,
          n.Transaction)).add(ie.createMintToCheckedInstruction(this.programId, this.publicKey, t, s, r, i, o)), this.payer, ...a)
      }
      async burnChecked(t, e, r, i, o) {
          let s, a;
          Zt(e) ? (s = e.publicKey,
          a = [e]) : (s = e,
          a = r),
          await zt("BurnChecked", this.connection, (new (0,
          n.Transaction)).add(ie.createBurnCheckedInstruction(this.programId, this.publicKey, t, s, r, i, o)), this.payer, ...a)
      }
      async syncNative(t) {
          await zt(0, this.connection, (new (0,
          n.Transaction)).add(ie.createSyncNativeInstruction(this.programId, t)), this.payer)
      }
      static createInitMintInstruction(t, e, r, i, s) {
          let a = [{
              pubkey: e,
              isSigner: !1,
              isWritable: !0
          }, {
              pubkey: n.SYSVAR_RENT_PUBKEY,
              isSigner: !1,
              isWritable: !1
          }];
          const u = Ut([Pt("instruction"), Pt("decimals"), Ht("mintAuthority"), Pt("option"), Ht("freezeAuthority")]);
          let l = o.Buffer.alloc(1024);
          {
              const t = u.encode({
                  instruction: 0,
                  decimals: r,
                  mintAuthority: Yt(i),
                  option: null === s ? 0 : 1,
                  freezeAuthority: Yt(s || new (0,
                  n.PublicKey)(0))
              }, l);
              l = l.slice(0, t)
          }
          return new (0,
          n.TransactionInstruction)({
              keys: a,
              programId: t,
              data: l
          })
      }
      static createInitAccountInstruction(t, e, r, i) {
          const s = [{
              pubkey: r,
              isSigner: !1,
              isWritable: !0
          }, {
              pubkey: e,
              isSigner: !1,
              isWritable: !1
          }, {
              pubkey: i,
              isSigner: !1,
              isWritable: !1
          }, {
              pubkey: n.SYSVAR_RENT_PUBKEY,
              isSigner: !1,
              isWritable: !1
          }]
            , a = Ut([Pt("instruction")])
            , u = o.Buffer.alloc(a.span);
          return a.encode({
              instruction: 1
          }, u),
          new (0,
          n.TransactionInstruction)({
              keys: s,
              programId: t,
              data: u
          })
      }
      static createTransferInstruction(t, e, r, i, s, a) {
          const u = Ut([Pt("instruction"), Kt("amount")])
            , l = o.Buffer.alloc(u.span);
          u.encode({
              instruction: 3,
              amount: new Wt(a).toBuffer()
          }, l);
          let c = [{
              pubkey: e,
              isSigner: !1,
              isWritable: !0
          }, {
              pubkey: r,
              isSigner: !1,
              isWritable: !0
          }];
          return 0 === s.length ? c.push({
              pubkey: i,
              isSigner: !0,
              isWritable: !1
          }) : (c.push({
              pubkey: i,
              isSigner: !1,
              isWritable: !1
          }),
          s.forEach((t=>c.push({
              pubkey: t.publicKey,
              isSigner: !0,
              isWritable: !1
          })))),
          new (0,
          n.TransactionInstruction)({
              keys: c,
              programId: t,
              data: l
          })
      }
      static createApproveInstruction(t, e, r, i, s, a) {
          const u = Ut([Pt("instruction"), Kt("amount")])
            , l = o.Buffer.alloc(u.span);
          u.encode({
              instruction: 4,
              amount: new Wt(a).toBuffer()
          }, l);
          let c = [{
              pubkey: e,
              isSigner: !1,
              isWritable: !0
          }, {
              pubkey: r,
              isSigner: !1,
              isWritable: !1
          }];
          return 0 === s.length ? c.push({
              pubkey: i,
              isSigner: !0,
              isWritable: !1
          }) : (c.push({
              pubkey: i,
              isSigner: !1,
              isWritable: !1
          }),
          s.forEach((t=>c.push({
              pubkey: t.publicKey,
              isSigner: !0,
              isWritable: !1
          })))),
          new (0,
          n.TransactionInstruction)({
              keys: c,
              programId: t,
              data: l
          })
      }
      static createRevokeInstruction(t, e, r, i) {
          const s = Ut([Pt("instruction")])
            , a = o.Buffer.alloc(s.span);
          s.encode({
              instruction: 5
          }, a);
          let u = [{
              pubkey: e,
              isSigner: !1,
              isWritable: !0
          }];
          return 0 === i.length ? u.push({
              pubkey: r,
              isSigner: !0,
              isWritable: !1
          }) : (u.push({
              pubkey: r,
              isSigner: !1,
              isWritable: !1
          }),
          i.forEach((t=>u.push({
              pubkey: t.publicKey,
              isSigner: !0,
              isWritable: !1
          })))),
          new (0,
          n.TransactionInstruction)({
              keys: u,
              programId: t,
              data: a
          })
      }
      static createSetAuthorityInstruction(t, e, r, i, s, a) {
          const u = Ut([Pt("instruction"), Pt("authorityType"), Pt("option"), Ht("newAuthority")]);
          let l = o.Buffer.alloc(1024);
          {
              const t = u.encode({
                  instruction: 6,
                  authorityType: Xt[i],
                  option: null === r ? 0 : 1,
                  newAuthority: Yt(r || new (0,
                  n.PublicKey)(0))
              }, l);
              l = l.slice(0, t)
          }
          let c = [{
              pubkey: e,
              isSigner: !1,
              isWritable: !0
          }];
          return 0 === a.length ? c.push({
              pubkey: s,
              isSigner: !0,
              isWritable: !1
          }) : (c.push({
              pubkey: s,
              isSigner: !1,
              isWritable: !1
          }),
          a.forEach((t=>c.push({
              pubkey: t.publicKey,
              isSigner: !0,
              isWritable: !1
          })))),
          new (0,
          n.TransactionInstruction)({
              keys: c,
              programId: t,
              data: l
          })
      }
      static createMintToInstruction(t, e, r, i, s, a) {
          const u = Ut([Pt("instruction"), Kt("amount")])
            , l = o.Buffer.alloc(u.span);
          u.encode({
              instruction: 7,
              amount: new Wt(a).toBuffer()
          }, l);
          let c = [{
              pubkey: e,
              isSigner: !1,
              isWritable: !0
          }, {
              pubkey: r,
              isSigner: !1,
              isWritable: !0
          }];
          return 0 === s.length ? c.push({
              pubkey: i,
              isSigner: !0,
              isWritable: !1
          }) : (c.push({
              pubkey: i,
              isSigner: !1,
              isWritable: !1
          }),
          s.forEach((t=>c.push({
              pubkey: t.publicKey,
              isSigner: !0,
              isWritable: !1
          })))),
          new (0,
          n.TransactionInstruction)({
              keys: c,
              programId: t,
              data: l
          })
      }
      static createBurnInstruction(t, e, r, i, s, a) {
          const u = Ut([Pt("instruction"), Kt("amount")])
            , l = o.Buffer.alloc(u.span);
          u.encode({
              instruction: 8,
              amount: new Wt(a).toBuffer()
          }, l);
          let c = [{
              pubkey: r,
              isSigner: !1,
              isWritable: !0
          }, {
              pubkey: e,
              isSigner: !1,
              isWritable: !0
          }];
          return 0 === s.length ? c.push({
              pubkey: i,
              isSigner: !0,
              isWritable: !1
          }) : (c.push({
              pubkey: i,
              isSigner: !1,
              isWritable: !1
          }),
          s.forEach((t=>c.push({
              pubkey: t.publicKey,
              isSigner: !0,
              isWritable: !1
          })))),
          new (0,
          n.TransactionInstruction)({
              keys: c,
              programId: t,
              data: l
          })
      }
      static createCloseAccountInstruction(t, e, r, i, s) {
          const a = Ut([Pt("instruction")])
            , u = o.Buffer.alloc(a.span);
          a.encode({
              instruction: 9
          }, u);
          let l = [{
              pubkey: e,
              isSigner: !1,
              isWritable: !0
          }, {
              pubkey: r,
              isSigner: !1,
              isWritable: !0
          }];
          return 0 === s.length ? l.push({
              pubkey: i,
              isSigner: !0,
              isWritable: !1
          }) : (l.push({
              pubkey: i,
              isSigner: !1,
              isWritable: !1
          }),
          s.forEach((t=>l.push({
              pubkey: t.publicKey,
              isSigner: !0,
              isWritable: !1
          })))),
          new (0,
          n.TransactionInstruction)({
              keys: l,
              programId: t,
              data: u
          })
      }
      static createFreezeAccountInstruction(t, e, r, i, s) {
          const a = Ut([Pt("instruction")])
            , u = o.Buffer.alloc(a.span);
          a.encode({
              instruction: 10
          }, u);
          let l = [{
              pubkey: e,
              isSigner: !1,
              isWritable: !0
          }, {
              pubkey: r,
              isSigner: !1,
              isWritable: !1
          }];
          return 0 === s.length ? l.push({
              pubkey: i,
              isSigner: !0,
              isWritable: !1
          }) : (l.push({
              pubkey: i,
              isSigner: !1,
              isWritable: !1
          }),
          s.forEach((t=>l.push({
              pubkey: t.publicKey,
              isSigner: !0,
              isWritable: !1
          })))),
          new (0,
          n.TransactionInstruction)({
              keys: l,
              programId: t,
              data: u
          })
      }
      static createThawAccountInstruction(t, e, r, i, s) {
          const a = Ut([Pt("instruction")])
            , u = o.Buffer.alloc(a.span);
          a.encode({
              instruction: 11
          }, u);
          let l = [{
              pubkey: e,
              isSigner: !1,
              isWritable: !0
          }, {
              pubkey: r,
              isSigner: !1,
              isWritable: !1
          }];
          return 0 === s.length ? l.push({
              pubkey: i,
              isSigner: !0,
              isWritable: !1
          }) : (l.push({
              pubkey: i,
              isSigner: !1,
              isWritable: !1
          }),
          s.forEach((t=>l.push({
              pubkey: t.publicKey,
              isSigner: !0,
              isWritable: !1
          })))),
          new (0,
          n.TransactionInstruction)({
              keys: l,
              programId: t,
              data: u
          })
      }
      static createTransferCheckedInstruction(t, e, r, i, s, a, u, l) {
          const c = Ut([Pt("instruction"), Kt("amount"), Pt("decimals")])
            , h = o.Buffer.alloc(c.span);
          c.encode({
              instruction: 12,
              amount: new Wt(u).toBuffer(),
              decimals: l
          }, h);
          let A = [{
              pubkey: e,
              isSigner: !1,
              isWritable: !0
          }, {
              pubkey: r,
              isSigner: !1,
              isWritable: !1
          }, {
              pubkey: i,
              isSigner: !1,
              isWritable: !0
          }];
          return 0 === a.length ? A.push({
              pubkey: s,
              isSigner: !0,
              isWritable: !1
          }) : (A.push({
              pubkey: s,
              isSigner: !1,
              isWritable: !1
          }),
          a.forEach((t=>A.push({
              pubkey: t.publicKey,
              isSigner: !0,
              isWritable: !1
          })))),
          new (0,
          n.TransactionInstruction)({
              keys: A,
              programId: t,
              data: h
          })
      }
      static createApproveCheckedInstruction(t, e, r, i, s, a, u, l) {
          const c = Ut([Pt("instruction"), Kt("amount"), Pt("decimals")])
            , h = o.Buffer.alloc(c.span);
          c.encode({
              instruction: 13,
              amount: new Wt(u).toBuffer(),
              decimals: l
          }, h);
          let A = [{
              pubkey: e,
              isSigner: !1,
              isWritable: !0
          }, {
              pubkey: r,
              isSigner: !1,
              isWritable: !1
          }, {
              pubkey: i,
              isSigner: !1,
              isWritable: !1
          }];
          return 0 === a.length ? A.push({
              pubkey: s,
              isSigner: !0,
              isWritable: !1
          }) : (A.push({
              pubkey: s,
              isSigner: !1,
              isWritable: !1
          }),
          a.forEach((t=>A.push({
              pubkey: t.publicKey,
              isSigner: !0,
              isWritable: !1
          })))),
          new (0,
          n.TransactionInstruction)({
              keys: A,
              programId: t,
              data: h
          })
      }
      static createMintToCheckedInstruction(t, e, r, i, s, a, u) {
          const l = Ut([Pt("instruction"), Kt("amount"), Pt("decimals")])
            , c = o.Buffer.alloc(l.span);
          l.encode({
              instruction: 14,
              amount: new Wt(a).toBuffer(),
              decimals: u
          }, c);
          let h = [{
              pubkey: e,
              isSigner: !1,
              isWritable: !0
          }, {
              pubkey: r,
              isSigner: !1,
              isWritable: !0
          }];
          return 0 === s.length ? h.push({
              pubkey: i,
              isSigner: !0,
              isWritable: !1
          }) : (h.push({
              pubkey: i,
              isSigner: !1,
              isWritable: !1
          }),
          s.forEach((t=>h.push({
              pubkey: t.publicKey,
              isSigner: !0,
              isWritable: !1
          })))),
          new (0,
          n.TransactionInstruction)({
              keys: h,
              programId: t,
              data: c
          })
      }
      static createBurnCheckedInstruction(t, e, r, i, s, a, u) {
          const l = Ut([Pt("instruction"), Kt("amount"), Pt("decimals")])
            , c = o.Buffer.alloc(l.span);
          l.encode({
              instruction: 15,
              amount: new Wt(a).toBuffer(),
              decimals: u
          }, c);
          let h = [{
              pubkey: r,
              isSigner: !1,
              isWritable: !0
          }, {
              pubkey: e,
              isSigner: !1,
              isWritable: !0
          }];
          return 0 === s.length ? h.push({
              pubkey: i,
              isSigner: !0,
              isWritable: !1
          }) : (h.push({
              pubkey: i,
              isSigner: !1,
              isWritable: !1
          }),
          s.forEach((t=>h.push({
              pubkey: t.publicKey,
              isSigner: !0,
              isWritable: !1
          })))),
          new (0,
          n.TransactionInstruction)({
              keys: h,
              programId: t,
              data: c
          })
      }
      static createSyncNativeInstruction(t, e) {
          const r = Ut([Pt("instruction")])
            , i = o.Buffer.alloc(r.span);
          r.encode({
              instruction: 17
          }, i);
          let s = [{
              pubkey: e,
              isSigner: !1,
              isWritable: !0
          }];
          return new (0,
          n.TransactionInstruction)({
              keys: s,
              programId: t,
              data: i
          })
      }
      static async getAssociatedTokenAddress(t, e, r, i, o=!1) {
          if (!o && !n.PublicKey.isOnCurve(i.toBuffer()))
              throw new Error(`Owner cannot sign: ${i.toString()}`);
          return (await n.PublicKey.findProgramAddress([i.toBuffer(), e.toBuffer(), r.toBuffer()], t))[0]
      }
      static createAssociatedTokenAccountInstruction(t, e, r, i, s, a) {
          const u = o.Buffer.alloc(0);
          let l = [{
              pubkey: a,
              isSigner: !0,
              isWritable: !0
          }, {
              pubkey: i,
              isSigner: !1,
              isWritable: !0
          }, {
              pubkey: s,
              isSigner: !1,
              isWritable: !1
          }, {
              pubkey: r,
              isSigner: !1,
              isWritable: !1
          }, {
              pubkey: n.SystemProgram.programId,
              isSigner: !1,
              isWritable: !1
          }, {
              pubkey: e,
              isSigner: !1,
              isWritable: !1
          }, {
              pubkey: n.SYSVAR_RENT_PUBKEY,
              isSigner: !1,
              isWritable: !1
          }];
          return new (0,
          n.TransactionInstruction)({
              keys: l,
              programId: t,
              data: u
          })
      }
      constructor(t, e, i, n) {
          $parcel$interopDefault(r)(this, "connection", void 0),
          $parcel$interopDefault(r)(this, "publicKey", void 0),
          $parcel$interopDefault(r)(this, "programId", void 0),
          $parcel$interopDefault(r)(this, "associatedProgramId", void 0),
          $parcel$interopDefault(r)(this, "payer", void 0),
          Object.assign(this, {
              connection: t,
              publicKey: e,
              programId: i,
              payer: n,
              associatedProgramId: Vt
          })
      }
  }
}
)),
parcelRequire.register("fMCua", (function(t, e) {
  Object.defineProperty(t.exports, "__esModule", {
      value: !0
  }),
  t.exports.signAndSendTransactionInstructions = t.exports.sleep = t.exports.getAllFixedPrice = t.exports.getFixedPriceOffersForOwner = t.exports.getFixedPriceOffersForName = t.exports.getOffersForOwner = t.exports.getOffersForName = void 0;
  var r = parcelRequire("1I0vV")
    , i = parcelRequire("lOkKx")
    , n = parcelRequire("8D9KL");
  t.exports.getOffersForName = async(t,e)=>{
      const r = [{
          memcmp: {
              offset: 2,
              bytes: e.toBase58()
          }
      }, {
          memcmp: {
              offset: 0,
              bytes: "2"
          }
      }];
      return (await t.getProgramAccounts(i.NAME_OFFERS_ID, {
          filters: r
      })).map((t=>({
          pubkey: t.pubkey,
          offer: n.Offer.deserialize(t.account.data)
      })))
  }
  ;
  t.exports.getOffersForOwner = async(t,e)=>{
      const r = [{
          memcmp: {
              offset: 34,
              bytes: e.toBase58()
          }
      }, {
          memcmp: {
              offset: 0,
              bytes: "2"
          }
      }];
      return (await t.getProgramAccounts(i.NAME_OFFERS_ID, {
          filters: r
      })).map((t=>({
          pubkey: t.pubkey,
          offer: n.Offer.deserialize(t.account.data)
      })))
  }
  ;
  t.exports.getFixedPriceOffersForName = async(t,e)=>{
      const r = [{
          memcmp: {
              offset: 2,
              bytes: e.toBase58()
          }
      }, {
          memcmp: {
              offset: 0,
              bytes: "6"
          }
      }];
      return (await t.getProgramAccounts(i.NAME_OFFERS_ID, {
          filters: r
      })).map((t=>({
          pubkey: t.pubkey,
          offer: n.FixedPriceOffer.deserialize(t.account.data)
      })))
  }
  ;
  t.exports.getFixedPriceOffersForOwner = async(t,e)=>{
      const r = [{
          memcmp: {
              offset: 34,
              bytes: e.toBase58()
          }
      }, {
          memcmp: {
              offset: 0,
              bytes: "6"
          }
      }];
      return (await t.getProgramAccounts(i.NAME_OFFERS_ID, {
          filters: r
      })).map((t=>({
          pubkey: t.pubkey,
          offer: n.FixedPriceOffer.deserialize(t.account.data)
      })))
  }
  ;
  t.exports.getAllFixedPrice = async t=>(await t.getProgramAccounts(i.NAME_OFFERS_ID, {
      filters: [{
          memcmp: {
              offset: 0,
              bytes: "6"
          }
      }]
  })).map((t=>({
      pubkey: t.pubkey,
      offer: n.FixedPriceOffer.deserialize(t.account.data)
  }))),
  t.exports.sleep = async function(t) {
      return console.log("Sleeping for ", t, " ms"),
      await new Promise((e=>setTimeout(e, t)))
  }
  ;
  t.exports.signAndSendTransactionInstructions = async(t,e,i,n)=>{
      const o = new r.Transaction;
      return o.feePayer = i.publicKey,
      e.push(i),
      o.add(...n),
      await t.sendTransaction(o, e, {
          skipPreflight: !1
      })
  }
}
)),
parcelRequire.register("bhYww", (function(t, e) {
  Object.defineProperty(t.exports, "__esModule", {
      value: !0
  }),
  t.exports.getPointRecord = t.exports.getSolRecord = t.exports.getShdwRecord = t.exports.getPicRecord = t.exports.getTelegramRecord = t.exports.getTwitterRecord = t.exports.getRedditRecord = t.exports.getGithubRecord = t.exports.getDiscordRecord = t.exports.getUrlRecord = t.exports.getEmailRecord = t.exports.getDogeRecord = t.exports.getLtcRecord = t.exports.getBtcRecord = t.exports.getEthRecord = t.exports.getArweaveRecord = t.exports.getIpfsRecord = t.exports.getRecord = void 0;
  var r = parcelRequire("702hk")
    , i = parcelRequire("hAmoF")
    , n = parcelRequire("8y9KR");
  t.exports.getRecord = async(t,e,r)=>{
      var o, s;
      const {pubkey: a} = await (0,
      i.getDomainKey)(r + "." + e, !0);
      let {registry: u} = await n.NameRegistryState.retrieve(t, a);
      const l = null === (o = u.data) || void 0 === o ? void 0 : o.indexOf(0);
      return u.data = null === (s = u.data) || void 0 === s ? void 0 : s.slice(0, l),
      u
  }
  ;
  t.exports.getIpfsRecord = async(e,i)=>await (0,
  t.exports.getRecord)(e, i, r.Record.IPFS);
  t.exports.getArweaveRecord = async(e,i)=>await (0,
  t.exports.getRecord)(e, i, r.Record.ARWV);
  t.exports.getEthRecord = async(e,i)=>await (0,
  t.exports.getRecord)(e, i, r.Record.ETH);
  t.exports.getBtcRecord = async(e,i)=>await (0,
  t.exports.getRecord)(e, i, r.Record.BTC);
  t.exports.getLtcRecord = async(e,i)=>await (0,
  t.exports.getRecord)(e, i, r.Record.LTC);
  t.exports.getDogeRecord = async(e,i)=>await (0,
  t.exports.getRecord)(e, i, r.Record.DOGE);
  t.exports.getEmailRecord = async(e,i)=>await (0,
  t.exports.getRecord)(e, i, r.Record.Email);
  t.exports.getUrlRecord = async(e,i)=>await (0,
  t.exports.getRecord)(e, i, r.Record.Url);
  t.exports.getDiscordRecord = async(e,i)=>await (0,
  t.exports.getRecord)(e, i, r.Record.Discord);
  t.exports.getGithubRecord = async(e,i)=>await (0,
  t.exports.getRecord)(e, i, r.Record.Github);
  t.exports.getRedditRecord = async(e,i)=>await (0,
  t.exports.getRecord)(e, i, r.Record.Reddit);
  t.exports.getTwitterRecord = async(e,i)=>await (0,
  t.exports.getRecord)(e, i, r.Record.Twitter);
  t.exports.getTelegramRecord = async(e,i)=>await (0,
  t.exports.getRecord)(e, i, r.Record.Telegram);
  t.exports.getPicRecord = async(e,i)=>await (0,
  t.exports.getRecord)(e, i, r.Record.Pic);
  t.exports.getShdwRecord = async(e,i)=>await (0,
  t.exports.getRecord)(e, i, r.Record.SHDW);
  t.exports.getSolRecord = async(e,i)=>await (0,
  t.exports.getRecord)(e, i, r.Record.SOL);
  t.exports.getPointRecord = async(e,i)=>await (0,
  t.exports.getRecord)(e, i, r.Record.POINT)
}
)),
parcelRequire.register("702hk", (function(t, e) {
  var r;
  Object.defineProperty(t.exports, "__esModule", {
      value: !0
  }),
  t.exports.Record = void 0,
  (r = t.exports.Record || (t.exports.Record = {})).IPFS = "IPFS",
  r.ARWV = "ARWV",
  r.SOL = "SOL",
  r.ETH = "ETH",
  r.BTC = "BTC",
  r.LTC = "LTC",
  r.DOGE = "DOGE",
  r.Email = "email",
  r.Url = "url",
  r.Discord = "discord",
  r.Github = "github",
  r.Reddit = "reddit",
  r.Twitter = "twitter",
  r.Telegram = "telegram",
  r.Pic = "pic",
  r.SHDW = "SHDW",
  r.POINT = "POINT"
}
)),
parcelRequire.register("7q7VB", (function(t, e) {
  var r = parcelRequire("bdjQ6").Buffer;
  Object.defineProperty(t.exports, "__esModule", {
      value: !0
  }),
  t.exports.resolve = t.exports.checkSolRecord = void 0;
  var i = parcelRequire("1I0vV")
    , n = parcelRequire("bhYww")
    , o = parcelRequire("hAmoF")
    , s = parcelRequire("8y9KR")
    , a = parcelRequire("4qjqW")
    , u = parcelRequire("702hk");
  t.exports.checkSolRecord = (t,e,r)=>a.sign.detached.verify(t, e, r.toBytes());
  t.exports.resolve = async(e,a)=>{
      var l;
      const {pubkey: c} = await (0,
      o.getDomainKey)(a)
        , {registry: h, nftOwner: A} = await s.NameRegistryState.retrieve(e, c);
      if (A)
          return A;
      try {
          const s = await (0,
          o.getDomainKey)(u.Record.SOL + "." + a, !0)
            , c = await (0,
          n.getSolRecord)(e, a);
          if (96 !== (null === (l = c.data) || void 0 === l ? void 0 : l.length))
              throw new Error("Invalid SOL record data");
          const A = new TextEncoder
            , f = r.concat([c.data.slice(0, 32), s.pubkey.toBuffer()])
            , p = A.encode(f.toString("hex"));
          if (!(0,
          t.exports.checkSolRecord)(p, c.data.slice(32), h.owner))
              throw new Error("Signature invalid");
          return new i.PublicKey(c.data.slice(0, 32))
      } catch (t) {
          console.log(t)
      }
      return h.owner
  }
}
)),
parcelRequire.register("lJqU5", (function(t, e) {
  $parcel$export(t.exports, "withdraw", (function() {
      return I
  }
  ));
  var r = parcelRequire("8JMkz")
    , i = parcelRequire("jAarg")
    , n = parcelRequire("6xYxg")
    , o = parcelRequire("7LTy6")
    , s = parcelRequire("6AcGf")
    , a = parcelRequire("5TgOo")
    , u = parcelRequire("fAZ7d")
    , l = parcelRequire("cubqg")
    , c = parcelRequire("cMZA5")
    , h = parcelRequire("bdjQ6").Buffer;
  const A = parcelRequire("6ZjrG");
  let f = null;
  const p = fetch($parcel$interopDefault(c)).then((t=>t.arrayBuffer()));
  let g = null;
  const d = [21663839004416932945382355908790599225266501822907911457504978515578255421292n, 16923532097304556005972200564242292693309333953544141029519619077135960040221n, 7833458610320835472520144237082236871909694928684820466656733259024982655488n, 14506027710748750947258687001455876266559341618222612722926156490737302846427n, 4766583705360062980279572762279781527342845808161105063909171241304075622345n, 16640205414190175414380077665118269450294358858897019640557533278896634808665n, 13024477302430254842915163302704885770955784224100349847438808884122720088412n, 11345696205391376769769683860277269518617256738724086786512014734609753488820n, 17235543131546745471991808272245772046758360534180976603221801364506032471936n, 155962837046691114236524362966874066300454611955781275944230309195800494087n, 14030416097908897320437553787826300082392928432242046897689557706485311282736n, 12626316503845421241020584259526236205728737442715389902276517188414400172517n, 6729873933803351171051407921027021443029157982378522227479748669930764447503n, 12963910739953248305308691828220784129233893953613908022664851984069510335421n, 8697310796973811813791996651816817650608143394255750603240183429036696711432n, 9001816533475173848300051969191408053495003693097546138634479732228054209462n, 13882856022500117449912597249521445907860641470008251408376408693167665584212n, 6167697920744083294431071781953545901493956884412099107903554924846764168938n, 16572499860108808790864031418434474032816278079272694833180094335573354127261n, 11544818037702067293688063426012553693851444915243122674915303779243865603077n];
  async function I(t, e, c, I, m, y, w) {
      let C, E;
      await (0,
      l.errorToast)(w, "Failed to load circuit", (async()=>{
          null === f && (f = await A)
      }
      )),
      await (0,
      l.errorToast)(w, "Failed to load proving key", (async()=>{
          null === g && (g = await p)
      }
      )),
      await (0,
      l.errorToast)(w, "Failed to generate the proof", (async()=>{
          C = await async function(t, e, r, c, A) {
              A("Fetching transaction history");
              const [p,I,m,y,w] = t.split("-");
              if ("otter" !== p)
                  throw Error("Invalid note: Should start with 'otter'.");
              if (124 !== m.length)
                  throw Error("Invalid note: Preimage is not the correct length.");
              if (w !== l.OTTER_PROGRAM_ID.toString())
                  throw Error("Invalid note: Incorrect programId.");
              const C = h.from(m.slice(0, 62), "hex")
                , E = h.from(m.slice(62, 124), "hex")
                , v = i.bigInt.leBuff2int(C)
                , B = i.bigInt.leBuff2int(E)
                , b = n.babyJub.unpackPoint(n.pedersenHash.hash(v.leInt2Buff(31)))[0]
                , Q = h.from(y, "hex")
                , R = [];
              for (let T = 0; T < l.LEVELS; T++)
                  R.push(i.bigInt.beBuff2int(Q.slice(32 * T, 32 * (T + 1))));
              let M = {};
              try {
                  if ("devnet" === l.NETWORK)
                      throw Error("The otter-statistics service only performs a mainnet cache.");
                  const P = await fetch("https://statistics.otter.cash/allDeposits");
                  if (!P.ok)
                      throw Error("Response is not OK.");
                  M = await P.json();
                  for (let O = 0; O < Math.max(...Object.keys(M)) && M[O].signature !== I; O++)
                      delete M[O]
              } catch (U) {
                  console.log("Retrieving /allDeposits from otter-statistics failed. Manually retrieving from the RPC instead.");
                  const L = await l.connection.getSignaturesForAddress(l.OTTER_MERKLE_STATE_ID, {
                      until: I
                  }, "confirmed");
                  if (1e3 === L.length)
                      for (; ; ) {
                          const K = await l.connection.getSignaturesForAddress(l.OTTER_MERKLE_STATE_ID, {
                              before: L[L.length - 1].signature,
                              until: I
                          }, "confirmed");
                          if (L.push(...K.slice(1)),
                          K.length < 1e3)
                              break
                      }
                  L.push({
                      signature: I
                  });
                  const H = (0,
                  s.createHash)("sha256").update("global:deposit_finalize").digest().slice(0, 8);
                  async function _(t) {
                      await Promise.all(t.map((async t=>{
                          let e = await l.connection.getTransaction(t.signature, {
                              commitment: "confirmed"
                          });
                          for (; null === e; )
                              e = await l.connection.getTransaction(t.signature, {
                                  commitment: "confirmed"
                              });
                          await Promise.all(e.transaction.message.instructions.map((async t=>{
                              if (!(0,
                              o.decode)(t.data).slice(0, 8).equals(H) || null !== e.meta.err)
                                  return;
                              let r = e.meta.logMessages;
                              r = r.filter((t=>"Program log: Instruction: DepositFinalize" !== t));
                              let i = 0;
                              for (const t of r) {
                                  if (t.startsWith(`Program ${l.OTTER_PROGRAM_ID.toString()} invoke`))
                                      break;
                                  i += 1
                              }
                              if (r = r.slice(i),
                              -1 === r.indexOf(`Program ${l.OTTER_PROGRAM_ID.toString()} success`))
                                  throw Error("Invalid Logs.");
                              const n = parseInt(r[1].split(" = ")[1])
                                , s = JSON.parse(r[2].split(" = ")[1])
                                , a = JSON.parse(r[3].split(" = ")[1]);
                              M[n] = {
                                  hashPath: s,
                                  root: a
                              }
                          }
                          )))
                      }
                      )))
                  }
                  for (let z = 0; z < Math.ceil(L.length / 500); z++)
                      await _(L.slice(500 * z, 500 * (z + 1)))
              }
              const x = Math.min(...Object.keys(M))
                , D = Math.max(...Object.keys(M));
              A("Generating zero-knowledge proof");
              const S = []
                , k = [];
              for (let G = 0; G < l.LEVELS; G++) {
                  const V = x >> G & 1;
                  if (S.push(V),
                  0 === V) {
                      const $ = x - x % Math.pow(2, G) + Math.pow(2, G)
                        , j = $ + Math.pow(2, G) - 1;
                      if ($ > D)
                          k.push(d[G]);
                      else {
                          const Y = Math.min(D, j);
                          k.push(i.bigInt.beBuff2int(M[Y].hashPath[G]))
                      }
                  } else
                      k.push(R[G])
              }
              const F = {
                  root: i.bigInt.beBuff2int(M[D].root),
                  nullifierHash: b,
                  recipient: i.bigInt.beBuff2int(e.encode()),
                  relayer: i.bigInt.beBuff2int(r.encode()),
                  fee: c,
                  refund: 0,
                  nullifier: v,
                  secret: B,
                  pathElements: k,
                  pathIndices: S
              }
                , q = await $parcel$interopDefault(u)()
                , N = await (0,
              a.genWitnessAndProve)(q, F, f, g);
              return (0,
              a.toSolidityInput)(N)
          }(t, new r.web3.PublicKey(e), new r.web3.PublicKey(c), I, y)
      }
      )),
      y("Sending proof to relayer"),
      await (0,
      l.errorToast)(w, "Invalid response from relayer", (async()=>{
          if (E = await fetch(`${m}/relay`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(C)
          }).then((t=>t.json())),
          !E.ok)
              throw new Error("Response from /relay was not a 2XX.")
      }
      )),
      await (0,
      l.sleep)(1e4);
      const v = Date.now();
      for (; ; ) {
          await (0,
          l.sleep)(2500);
          const t = await l.program.account.withdrawState.getAccountInfo(new r.web3.PublicKey(E.withdrawState));
          if (null === t) {
              if (Date.now() - v > 6e4)
                  return;
              continue
          }
          const e = t.data
            , i = e.readUInt8(456)
            , n = e.readUInt8(457)
            , o = e.readUInt16LE(458)
            , s = e.readUInt8(460)
            , a = e.readUInt16LE(462);
          let u = 0;
          switch (i) {
          case 0:
              u = 257 * n + o;
              break;
          case 1:
              u = 1542 + 4635 * s + a;
              break;
          case 2:
              u = 20086;
              break;
          default:
              throw new Error("Unreachable.")
          }
          let c = "";
          c = 20086 === u ? "Finalizing the withdraw" : `Confirmed ${(100 * u / 20086).toFixed(0)}% of the transactions`,
          y(c)
      }
  }
}
)),
parcelRequire.register("5TgOo", (function(t, e) {
  var r = parcelRequire("1cWWu")
    , i = parcelRequire("7lL2X")
    , n = parcelRequire("bjKYs")
    , o = parcelRequire("lRyXv").hexifyBigInts
    , s = (parcelRequire("lRyXv").unhexifyBigInts,
  parcelRequire("lRyXv").stringifyBigInts,
  parcelRequire("lRyXv").unstringifyBigInts)
    , a = parcelRequire("lM7ls").stringifyBigInts
    , u = parcelRequire("lM7ls").unstringifyBigInts;
  t.exports = {
      bigInt2BytesLE: function(t, e) {
          const i = Array(e);
          let n = r(t);
          for (let t = 0; t < e; t++)
              i[t] = n.and(255).toJSNumber(),
              n = n.shiftRight(8);
          return i
      },
      bigInt2U32LE: function(t, e) {
          const i = Array(e);
          let n = r(t);
          for (let t = 0; t < e; t++)
              i[t] = n.and(4294967295).toJSNumber(),
              n = n.shiftRight(32);
          return i
      },
      toSolidityInput: function(t) {
          const e = {
              proof: "0x" + s([t.pi_a[0], t.pi_a[1], t.pi_b[0][1], t.pi_b[0][0], t.pi_b[1][1], t.pi_b[1][0], t.pi_c[0], t.pi_c[1]]).map((t=>function(t) {
                  let e = t.toString(16);
                  for (; e.length < 64; )
                      e = "0" + e;
                  return e
              }(t))).join("")
          };
          return t.publicSignals && (e.publicSignals = o(s(t.publicSignals))),
          e
      },
      genWitnessAndProve: async function(t, e, r, o) {
          const s = function(t, e) {
              const r = new i(u(e))
                , n = r.calculateWitness(u(t))
                , o = n.slice(1, r.nPubInputs + r.nOutputs + 1);
              return {
                  witness: n,
                  publicSignals: o
              }
          }(e, r)
            , l = function(t) {
              const e = 32 * t.length
                , r = new ArrayBuffer(e)
                , i = {
                  dataView: new DataView(r),
                  offset: 0
              }
                , o = n(4294967295);
              for (let e = 0; e < t.length; e++)
                  for (let r = 0; r < 8; r++) {
                      const n = Number(t[e].shr(32 * r).and(o));
                      i.dataView.setUint32(i.offset, n, !0),
                      i.offset += 4
                  }
              return r
          }(s.witness)
            , c = await t.proof(l, o);
          return c.publicSignals = a(s.publicSignals),
          c
      }
  }
}
)),
parcelRequire.register("lRyXv", (function(t, e) {
  var r, i, n, o;
  $parcel$export(t.exports, "stringifyBigInts", (function() {
      return r
  }
  ), (function(t) {
      return r = t
  }
  )),
  $parcel$export(t.exports, "unstringifyBigInts", (function() {
      return i
  }
  ), (function(t) {
      return i = t
  }
  )),
  $parcel$export(t.exports, "hexifyBigInts", (function() {
      return n
  }
  ), (function(t) {
      return n = t
  }
  )),
  $parcel$export(t.exports, "unhexifyBigInts", (function() {
      return o
  }
  ), (function(t) {
      return o = t
  }
  ));
  var s = parcelRequire("1cWWu");
  r = function t(e) {
      if ("bigint" == typeof e || e instanceof s)
          return e.toString(10);
      if (Array.isArray(e))
          return e.map(t);
      if ("object" == typeof e) {
          const r = {};
          for (let i in e)
              r[i] = t(e[i]);
          return r
      }
      return e
  }
  ,
  i = function t(e) {
      if ("string" == typeof e && /^[0-9]+$/.test(e))
          return s(e);
      if (Array.isArray(e))
          return e.map(t);
      if ("object" != typeof e || e instanceof s)
          return e;
      {
          const r = {};
          for (let i in e)
              r[i] = t(e[i]);
          return r
      }
  }
  ,
  n = function t(e) {
      if ("bigInt" == typeof e || e instanceof s) {
          let t = e.toString(16);
          for (; t.length < 64; )
              t = "0" + t;
          return t = "0x" + t,
          t
      }
      if (Array.isArray(e))
          return e.map(t);
      if ("object" == typeof e) {
          const r = {};
          for (let i in e)
              r[i] = t(e[i]);
          return r
      }
      return e
  }
  ,
  o = function t(e) {
      if ("string" == typeof e && /^0x[0-9a-fA-F]+$/.test(e))
          return s(e);
      if (Array.isArray(e))
          return e.map(t);
      if ("object" == typeof e) {
          const r = {};
          for (let i in e)
              r[i] = t(e[i]);
          return r
      }
      return e
  }
}
)),
parcelRequire.register("fAZ7d", (function(t, e) {
  var r = parcelRequire("4ZL0H")
    , i = parcelRequire("1cWWu")
    , n = parcelRequire("jYCm8")
    , o = parcelRequire("h1RhN");
  const s = "undefined" != typeof window;
  let a, u;
  s || (a = parcelRequire("ifbub").Worker,
  u = parcelRequire("6AcGf"));
  class l {
      constructor() {
          this.promise = new Promise(((t,e)=>{
              this.reject = e,
              this.resolve = t
          }
          ))
      }
  }
  function c(t) {
      let e, i, n;
      function o(t) {
          for (; 3 & n[0]; )
              n[0]++;
          const e = n[0];
          for (n[0] += t; n[0] > i.buffer.byteLength; )
              i.grow(100);
          return n = new Uint32Array(i.buffer),
          e
      }
      function s(t) {
          const e = o(t.byteLength)
            , r = new Uint32Array(t);
          return n.set(r, e / 4),
          e
      }
      function a(t, e) {
          return i.buffer.slice(t, t + e)
      }
      t.onmessage = function(u) {
          let l;
          if (l = u.data ? u.data : u,
          "INIT" == l.command)
              (async function(t) {
                  const r = new Uint8Array(t.code)
                    , o = await WebAssembly.compile(r);
                  i = new WebAssembly.Memory({
                      initial: t.init
                  }),
                  n = new Uint32Array(i.buffer),
                  e = await WebAssembly.instantiate(o, {
                      env: {
                          memory: i
                      }
                  })
              }
              )(l).then((function() {
                  t.postMessage(l.result)
              }
              ));
          else if ("G1_MULTIEXP" == l.command) {
              const r = n[0]
                , i = s(l.scalars)
                , u = s(l.points)
                , c = o(96);
              e.exports.g1_zero(c),
              e.exports.g1_multiexp2(i, u, l.n, 7, c),
              l.result = a(c, 96),
              n[0] = r,
              t.postMessage(l.result, [l.result])
          } else if ("G2_MULTIEXP" == l.command) {
              const r = n[0]
                , i = s(l.scalars)
                , u = s(l.points)
                , c = o(192);
              e.exports.g2_zero(c),
              e.exports.g2_multiexp(i, u, l.n, 7, c),
              l.result = a(c, 192),
              n[0] = r,
              t.postMessage(l.result, [l.result])
          } else if ("CALC_H" == l.command) {
              const r = n[0]
                , i = s(l.signals)
                , u = s(l.polsA)
                , c = s(l.polsB)
                , h = l.nSignals
                , A = l.domainSize
                , f = o(32 * h)
                , p = o(32 * A)
                , g = o(32 * A)
                , d = o(64 * A)
                , I = o(64 * A);
              e.exports.fft_toMontgomeryN(i, f, h),
              e.exports.pol_zero(p, A),
              e.exports.pol_zero(g, A),
              e.exports.pol_constructLC(u, f, h, p),
              e.exports.pol_constructLC(c, f, h, g),
              e.exports.fft_copyNInterleaved(p, d, A),
              e.exports.fft_copyNInterleaved(g, I, A),
              e.exports.fft_ifft(p, A, 0),
              e.exports.fft_ifft(g, A, 0),
              e.exports.fft_fft(p, A, 1),
              e.exports.fft_fft(g, A, 1),
              e.exports.fft_copyNInterleaved(p, d + 32, A),
              e.exports.fft_copyNInterleaved(g, I + 32, A),
              e.exports.fft_mulN(d, I, 2 * A, d),
              e.exports.fft_ifft(d, 2 * A, 0),
              e.exports.fft_fromMontgomeryN(d + 32 * A, d + 32 * A, A),
              l.result = a(d + 32 * A, 32 * A),
              n[0] = r,
              t.postMessage(l.result, [l.result])
          } else
              "TERMINATE" == l.command && r.exit()
      }
  }
  class h {
      postAction(t, e, r, i) {
          return o(0 == this.working[t]),
          this.working[t] = !0,
          this.pendingDeferreds[t] = i || new l,
          this.workers[t].postMessage(e, r),
          this.pendingDeferreds[t].promise
      }
      processWorks() {
          for (let t = 0; t < this.workers.length && this.actionQueue.length > 0; t++)
              if (0 == this.working[t]) {
                  const e = this.actionQueue.shift();
                  this.postAction(t, e.data, e.transfers, e.deferred)
              }
      }
      queueAction(t, e) {
          const r = new l;
          return this.actionQueue.push({
              data: t,
              transfers: e,
              deferred: r
          }),
          this.processWorks(),
          r.promise
      }
      alloc(t) {
          for (; 3 & this.i32[0]; )
              this.i32[0]++;
          const e = this.i32[0];
          return this.i32[0] += t,
          e
      }
      putBin(t, e) {
          const r = new Uint32Array(e);
          this.i32.set(r, t / 4)
      }
      getBin(t, e) {
          return this.memory.buffer.slice(t, t + e)
      }
      bin2int(t) {
          const e = new Uint32Array(t);
          let r = i(e[7]);
          for (let t = 6; t >= 0; t--)
              r = r.shiftLeft(32),
              r = r.add(e[t]);
          return r.toString()
      }
      bin2g1(t) {
          return [this.bin2int(t.slice(0, 32)), this.bin2int(t.slice(32, 64)), this.bin2int(t.slice(64, 96))]
      }
      bin2g2(t) {
          return [[this.bin2int(t.slice(0, 32)), this.bin2int(t.slice(32, 64))], [this.bin2int(t.slice(64, 96)), this.bin2int(t.slice(96, 128))], [this.bin2int(t.slice(128, 160)), this.bin2int(t.slice(160, 192))]]
      }
      async g1_multiexp(t, e) {
          const r = t.byteLength / 32
            , i = Math.floor(r / this.workers.length)
            , n = [];
          for (let o = 0; o < this.workers.length; o++) {
              const s = o < this.workers.length - 1 ? i : r - i * (this.workers.length - 1)
                , a = t.slice(o * i * 32, o * i * 32 + 32 * s)
                , u = e.slice(o * i * 64, o * i * 64 + 64 * s);
              n.push(this.queueAction({
                  command: "G1_MULTIEXP",
                  scalars: a,
                  points: u,
                  n: s
              }, [a, u]))
          }
          const o = await Promise.all(n);
          this.instance.exports.g1_zero(this.pr0);
          for (let t = 0; t < o.length; t++)
              this.putBin(this.pr1, o[t]),
              this.instance.exports.g1_add(this.pr0, this.pr1, this.pr0);
          return this.getBin(this.pr0, 96)
      }
      async g2_multiexp(t, e) {
          const r = t.byteLength / 32
            , i = Math.floor(r / this.workers.length)
            , n = [];
          for (let o = 0; o < this.workers.length; o++) {
              const s = o < this.workers.length - 1 ? i : r - i * (this.workers.length - 1)
                , a = t.slice(o * i * 32, o * i * 32 + 32 * s)
                , u = e.slice(o * i * 128, o * i * 128 + 128 * s);
              n.push(this.queueAction({
                  command: "G2_MULTIEXP",
                  scalars: a,
                  points: u,
                  n: s
              }, [a, u]))
          }
          const o = await Promise.all(n);
          this.instance.exports.g2_zero(this.pr0);
          for (let t = 0; t < o.length; t++)
              this.putBin(this.pr1, o[t]),
              this.instance.exports.g2_add(this.pr0, this.pr1, this.pr0);
          return this.getBin(this.pr0, 192)
      }
      g1_affine(t) {
          return this.putBin(this.pr0, t),
          this.instance.exports.g1_affine(this.pr0, this.pr0),
          this.getBin(this.pr0, 96)
      }
      g2_affine(t) {
          return this.putBin(this.pr0, t),
          this.instance.exports.g2_affine(this.pr0, this.pr0),
          this.getBin(this.pr0, 192)
      }
      g1_fromMontgomery(t) {
          return this.putBin(this.pr0, t),
          this.instance.exports.g1_fromMontgomery(this.pr0, this.pr0),
          this.getBin(this.pr0, 96)
      }
      g2_fromMontgomery(t) {
          return this.putBin(this.pr0, t),
          this.instance.exports.g2_fromMontgomery(this.pr0, this.pr0),
          this.getBin(this.pr0, 192)
      }
      loadPoint1(t) {
          const e = this.alloc(96);
          return this.putBin(e, t),
          this.instance.exports.f1m_one(e + 64),
          e
      }
      loadPoint2(t) {
          const e = this.alloc(192);
          return this.putBin(e, t),
          this.instance.exports.f2m_one(e + 128),
          e
      }
      terminate() {
          for (let t = 0; t < this.workers.length; t++)
              this.workers[t].postMessage({
                  command: "TERMINATE"
              })
      }
      async calcH(t, e, r, i, n) {
          return this.queueAction({
              command: "CALC_H",
              signals: t,
              polsA: e,
              polsB: r,
              nSignals: i,
              domainSize: n
          }, [t, e, r])
      }
      async proof(t, e) {
          const r = new Uint32Array(e)
            , i = r[0]
            , n = r[1]
            , o = r[2]
            , a = r[3]
            , l = r[4]
            , c = r[5]
            , h = r[6]
            , A = r[7]
            , f = r[8]
            , p = r[9]
            , g = e.slice(a, a + l)
            , d = e.slice(l, l + c)
            , I = e.slice(c, c + 64 * i)
            , m = e.slice(h, h + 64 * i)
            , y = e.slice(A, A + 128 * i)
            , w = e.slice(f, f + 64 * (i - n - 1))
            , C = e.slice(p, p + 64 * o)
            , E = e.slice(40, 104)
            , v = e.slice(104, 168)
            , B = e.slice(168, 232)
            , b = e.slice(232, 360)
            , Q = e.slice(360, 488)
            , R = this.calcH(t.slice(0), g, d, i, o).then((t=>this.g1_multiexp(t, C)))
            , M = this.g1_multiexp(t.slice(0), I)
            , _ = this.g1_multiexp(t.slice(0), m)
            , x = this.g2_multiexp(t.slice(0), y)
            , D = this.g1_multiexp(t.slice(32 * (n + 1)), w)
            , S = await Promise.all([M, _, x, D, R])
            , k = this.alloc(96)
            , F = this.alloc(192)
            , q = this.alloc(96)
            , N = this.alloc(96);
          this.putBin(k, S[0]),
          this.putBin(N, S[1]),
          this.putBin(F, S[2]),
          this.putBin(q, S[3]);
          const T = this.loadPoint1(E)
            , P = this.loadPoint1(v)
            , O = this.loadPoint1(B)
            , U = this.loadPoint2(b)
            , L = this.loadPoint2(Q);
          let H = new Uint32Array(8);
          const K = this.alloc(96)
            , z = this.alloc(192)
            , G = this.alloc(32)
            , V = this.alloc(32);
          if (s)
              window.crypto.getRandomValues(H),
              this.putBin(G, H),
              window.crypto.getRandomValues(H),
              this.putBin(V, H);
          else {
              const t = u.randomBytes(32);
              this.putBin(G, t);
              const e = u.randomBytes(32);
              this.putBin(V, e)
          }
          this.instance.exports.g1_add(T, k, k),
          this.instance.exports.g1_timesScalar(O, G, 32, K),
          this.instance.exports.g1_add(K, k, k),
          this.instance.exports.g2_add(U, F, F),
          this.instance.exports.g2_timesScalar(L, V, 32, z),
          this.instance.exports.g2_add(z, F, F),
          this.instance.exports.g1_add(P, N, N),
          this.instance.exports.g1_timesScalar(O, V, 32, K),
          this.instance.exports.g1_add(K, N, N),
          this.putBin(K, S[4]),
          this.instance.exports.g1_add(K, q, q),
          this.instance.exports.g1_timesScalar(k, V, 32, K),
          this.instance.exports.g1_add(K, q, q),
          this.instance.exports.g1_timesScalar(N, G, 32, K),
          this.instance.exports.g1_add(K, q, q);
          const $ = this.alloc(64);
          return this.instance.exports.int_mul(G, V, $),
          this.instance.exports.g1_timesScalar(O, $, 64, K),
          this.instance.exports.g1_neg(K, K),
          this.instance.exports.g1_add(K, q, q),
          this.instance.exports.g1_affine(k, k),
          this.instance.exports.g2_affine(F, F),
          this.instance.exports.g1_affine(q, q),
          this.instance.exports.g1_fromMontgomery(k, k),
          this.instance.exports.g2_fromMontgomery(F, F),
          this.instance.exports.g1_fromMontgomery(q, q),
          {
              pi_a: this.bin2g1(this.getBin(k, 96)),
              pi_b: this.bin2g2(this.getBin(F, 192)),
              pi_c: this.bin2g1(this.getBin(q, 96))
          }
      }
      constructor() {
          this.actionQueue = []
      }
  }
  t.exports = async function(t) {
      const e = {
          wasmInitialMemory: 5e3
      };
      Object.assign(e, t);
      const r = new h;
      r.q = i("21888242871839275222246405745257275088696311157297823662689037894645226208583"),
      r.r = i("21888242871839275222246405745257275088548364400416034343698204186575808495617"),
      r.n64 = Math.floor((r.q.minus(1).bitLength() - 1) / 64) + 1,
      r.n32 = 2 * r.n64,
      r.n8 = 8 * r.n64,
      r.memory = new WebAssembly.Memory({
          initial: e.wasmInitialMemory
      }),
      r.i32 = new Uint32Array(r.memory.buffer);
      const o = await WebAssembly.compile(n.code);
      let u;
      function l(t) {
          return function(e) {
              let i;
              i = e && e.data ? e.data : e,
              r.working[t] = !1,
              r.pendingDeferreds[t].resolve(i),
              r.processWorks()
          }
      }
      r.instance = await WebAssembly.instantiate(o, {
          env: {
              memory: r.memory
          }
      }),
      r.pq = n.pq,
      r.pr = n.pr,
      r.pr0 = r.alloc(192),
      r.pr1 = r.alloc(192),
      r.workers = [],
      r.pendingDeferreds = [],
      r.working = [],
      u = "object" == typeof navigator && navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 8;
      for (let t = 0; t < u; t++) {
          if (s) {
              const e = new Blob(["(", c.toString(), ")(self);"],{
                  type: "text/javascript"
              })
                , i = URL.createObjectURL(e);
              r.workers[t] = new Worker(i),
              r.workers[t].onmessage = l(t)
          } else
              r.workers[t] = new a("(" + c.toString() + ")(require('worker_threads').parentPort);",{
                  eval: !0
              }),
              r.workers[t].on("message", l(t));
          r.working[t] = !1
      }
      const A = [];
      for (let t = 0; t < r.workers.length; t++) {
          const i = n.code.buffer.slice(0);
          A.push(r.postAction(t, {
              command: "INIT",
              init: e.wasmInitialMemory,
              code: i
          }, [i]))
      }
      return await Promise.all(A),
      r
  }
}
)),
parcelRequire.register("jYCm8", (function(t, e) {
  var r, i, n;
  $parcel$export(t.exports, "code", (function() {
      return r
  }
  ), (function(t) {
      return r = t
  }
  )),
  $parcel$export(t.exports, "pq", (function() {
      return i
  }
  ), (function(t) {
      return i = t
  }
  )),
  $parcel$export(t.exports, "pr", (function() {
      return n
  }
  ), (function(t) {
      return n = t
  }
  ));
  var o = parcelRequire("bdjQ6").Buffer;
  r = new o("AGFzbQEAAAABPApgAn9/AGABfwBgAX8Bf2ACf38Bf2ADf39/AX9gA39/fwBgA39+fwBgAn9+AGAEf39/fwBgBX9/f39/AAIQAQNlbnYGbWVtb3J5AgDoBwNsawABAgEDAwQEBQUGBwgFBQUAAAUFAAAAAQUFAAAFBQAAAAEFAAIBAAAFAAUAAAAIAQIAAgUICQgABQkDAAUFBQUAAgUFCAAIAgEBAAUFBQAAAAMAAgEAAAUABQAAAAgBAgACBQgJCAAFCQgIB8gJYghpbnRfY29weQAACGludF96ZXJvAAEHaW50X29uZQADCmludF9pc1plcm8AAgZpbnRfZXEABAdpbnRfZ3RlAAUHaW50X2FkZAAGB2ludF9zdWIABwppbnRfbXVsT2xkAAkHaW50X211bAAIB2ludF9kaXYADA5pbnRfaW52ZXJzZU1vZAANB2YxbV9hZGQADgdmMW1fc3ViAA8HZjFtX25lZwAQC2YxbV9tUmVkdWN0ABEHZjFtX211bAASCmYxbV9tdWxPbGQAExJmMW1fZnJvbU1vbnRnb21lcnkAFRBmMW1fdG9Nb250Z29tZXJ5ABQLZjFtX2ludmVyc2UAFghmMW1fY29weQAACGYxbV96ZXJvAAEKZjFtX2lzWmVybwACBmYxbV9lcQAEB2YxbV9vbmUAFwdmcm1fYWRkABgHZnJtX3N1YgAZB2ZybV9uZWcAGgtmcm1fbVJlZHVjdAAbB2ZybV9tdWwAHApmcm1fbXVsT2xkAB0SZnJtX2Zyb21Nb250Z29tZXJ5AB8QZnJtX3RvTW9udGdvbWVyeQAeC2ZybV9pbnZlcnNlACAIZnJtX2NvcHkAAAhmcm1femVybwABCmZybV9pc1plcm8AAgZmcm1fZXEABAdmcm1fb25lACEGZnJfYWRkABgGZnJfc3ViABkGZnJfbmVnABoGZnJfbXVsACIKZnJfaW52ZXJzZQAjB2ZyX2NvcHkAAAdmcl96ZXJvAAEGZnJfb25lACEJZnJfaXNaZXJvAAIFZnJfZXEABAlnMV9pc1plcm8AJAdnMV9jb3B5ACYHZzFfemVybwAlCWcxX2RvdWJsZQAnBmcxX2FkZAAoBmcxX25lZwApBmcxX3N1YgAqEWcxX2Zyb21Nb250Z29tZXJ5ACsPZzFfdG9Nb250Z29tZXJ5ACwJZzFfYWZmaW5lAC0OZzFfdGltZXNTY2FsYXIALgtnMV9tdWx0aWV4cAA1DGcxX211bHRpZXhwMgA5B2ZmdF9mZnQAQghmZnRfaWZmdABDEWZmdF90b01vbnRnb21lcnlOAD8TZmZ0X2Zyb21Nb250Z29tZXJ5TgA+FGZmdF9jb3B5TkludGVybGVhdmVkAD0IZmZ0X211bE4ARAhwb2xfemVybwBFD3BvbF9jb25zdHJ1Y3RMQwBGCmYybV9pc1plcm8ARwhmMm1femVybwBIB2YybV9vbmUASQhmMm1fY29weQBKB2YybV9tdWwASwdmMm1fYWRkAEwHZjJtX3N1YgBNB2YybV9uZWcAThJmMm1fZnJvbU1vbnRnb21lcnkAUBBmMm1fdG9Nb250Z29tZXJ5AE8GZjJtX2VxAFELZjJtX2ludmVyc2UAUglnMl9pc1plcm8AUwdnMl9jb3B5AFUHZzJfemVybwBUCWcyX2RvdWJsZQBWBmcyX2FkZABXBmcyX25lZwBYBmcyX3N1YgBZEWcyX2Zyb21Nb250Z29tZXJ5AFoPZzJfdG9Nb250Z29tZXJ5AFsJZzJfYWZmaW5lAFwOZzJfdGltZXNTY2FsYXIAXQtnMl9tdWx0aWV4cABkDGcyX211bHRpZXhwMgBoDHRlc3RfZjFtX211bABpD3Rlc3RfZjFtX211bE9sZABqCsfEAWsqACABIAApAwA3AwAgASAAKQMINwMIIAEgACkDEDcDECABIAApAxg3AxgLHgAgAEIANwMAIABCADcDCCAAQgA3AxAgAEIANwMYCzMAIAApAxhQBEAgACkDEFAEQCAAKQMIUARAIAApAwBQDwVBAA8LBUEADwsFQQAPC0EADwseACAAQgE3AwAgAEIANwMIIABCADcDECAAQgA3AxgLRwAgACkDGCABKQMYUQRAIAApAxAgASkDEFEEQCAAKQMIIAEpAwhRBEAgACkDACABKQMAUQ8FQQAPCwVBAA8LBUEADwtBAA8LfQAgACkDGCABKQMYVARAQQAPBSAAKQMYIAEpAxhWBEBBAQ8FIAApAxAgASkDEFQEQEEADwUgACkDECABKQMQVgRAQQEPBSAAKQMIIAEpAwhUBEBBAA8FIAApAwggASkDCFYEQEEBDwUgACkDACABKQMAWg8LCwsLCwtBAA8L1AEBAX4gADUCACABNQIAfCEDIAIgAz4CACAANQIEIAE1AgR8IANCIIh8IQMgAiADPgIEIAA1AgggATUCCHwgA0IgiHwhAyACIAM+AgggADUCDCABNQIMfCADQiCIfCEDIAIgAz4CDCAANQIQIAE1AhB8IANCIIh8IQMgAiADPgIQIAA1AhQgATUCFHwgA0IgiHwhAyACIAM+AhQgADUCGCABNQIYfCADQiCIfCEDIAIgAz4CGCAANQIcIAE1Ahx8IANCIIh8IQMgAiADPgIcIANCIIinC4wCAQF+IAA1AgAgATUCAH0hAyACIANC/////w+DPgIAIAA1AgQgATUCBH0gA0Igh3whAyACIANC/////w+DPgIEIAA1AgggATUCCH0gA0Igh3whAyACIANC/////w+DPgIIIAA1AgwgATUCDH0gA0Igh3whAyACIANC/////w+DPgIMIAA1AhAgATUCEH0gA0Igh3whAyACIANC/////w+DPgIQIAA1AhQgATUCFH0gA0Igh3whAyACIANC/////w+DPgIUIAA1AhggATUCGH0gA0Igh3whAyACIANC/////w+DPgIYIAA1AhwgATUCHH0gA0Igh3whAyACIANC/////w+DPgIcIANCIIenC48QEgF+AX4BfgF+AX4BfgF+AX4BfgF+AX4BfgF+AX4BfgF+AX4BfiADQv////8PgyAANQIAIgUgATUCACIGfnwhAyAEIANCIIh8IQQgAiADPgIAIARCIIghAyAEQv////8PgyAFIAE1AgQiCH58IQQgAyAEQiCIfCEDIARC/////w+DIAA1AgQiByAGfnwhBCADIARCIIh8IQMgAiAEPgIEIANCIIghBCADQv////8PgyAFIAE1AggiCn58IQMgBCADQiCIfCEEIANC/////w+DIAcgCH58IQMgBCADQiCIfCEEIANC/////w+DIAA1AggiCSAGfnwhAyAEIANCIIh8IQQgAiADPgIIIARCIIghAyAEQv////8PgyAFIAE1AgwiDH58IQQgAyAEQiCIfCEDIARC/////w+DIAcgCn58IQQgAyAEQiCIfCEDIARC/////w+DIAkgCH58IQQgAyAEQiCIfCEDIARC/////w+DIAA1AgwiCyAGfnwhBCADIARCIIh8IQMgAiAEPgIMIANCIIghBCADQv////8PgyAFIAE1AhAiDn58IQMgBCADQiCIfCEEIANC/////w+DIAcgDH58IQMgBCADQiCIfCEEIANC/////w+DIAkgCn58IQMgBCADQiCIfCEEIANC/////w+DIAsgCH58IQMgBCADQiCIfCEEIANC/////w+DIAA1AhAiDSAGfnwhAyAEIANCIIh8IQQgAiADPgIQIARCIIghAyAEQv////8PgyAFIAE1AhQiEH58IQQgAyAEQiCIfCEDIARC/////w+DIAcgDn58IQQgAyAEQiCIfCEDIARC/////w+DIAkgDH58IQQgAyAEQiCIfCEDIARC/////w+DIAsgCn58IQQgAyAEQiCIfCEDIARC/////w+DIA0gCH58IQQgAyAEQiCIfCEDIARC/////w+DIAA1AhQiDyAGfnwhBCADIARCIIh8IQMgAiAEPgIUIANCIIghBCADQv////8PgyAFIAE1AhgiEn58IQMgBCADQiCIfCEEIANC/////w+DIAcgEH58IQMgBCADQiCIfCEEIANC/////w+DIAkgDn58IQMgBCADQiCIfCEEIANC/////w+DIAsgDH58IQMgBCADQiCIfCEEIANC/////w+DIA0gCn58IQMgBCADQiCIfCEEIANC/////w+DIA8gCH58IQMgBCADQiCIfCEEIANC/////w+DIAA1AhgiESAGfnwhAyAEIANCIIh8IQQgAiADPgIYIARCIIghAyAEQv////8PgyAFIAE1AhwiFH58IQQgAyAEQiCIfCEDIARC/////w+DIAcgEn58IQQgAyAEQiCIfCEDIARC/////w+DIAkgEH58IQQgAyAEQiCIfCEDIARC/////w+DIAsgDn58IQQgAyAEQiCIfCEDIARC/////w+DIA0gDH58IQQgAyAEQiCIfCEDIARC/////w+DIA8gCn58IQQgAyAEQiCIfCEDIARC/////w+DIBEgCH58IQQgAyAEQiCIfCEDIARC/////w+DIAA1AhwiEyAGfnwhBCADIARCIIh8IQMgAiAEPgIcIANCIIghBCADQv////8PgyAHIBR+fCEDIAQgA0IgiHwhBCADQv////8PgyAJIBJ+fCEDIAQgA0IgiHwhBCADQv////8PgyALIBB+fCEDIAQgA0IgiHwhBCADQv////8PgyANIA5+fCEDIAQgA0IgiHwhBCADQv////8PgyAPIAx+fCEDIAQgA0IgiHwhBCADQv////8PgyARIAp+fCEDIAQgA0IgiHwhBCADQv////8PgyATIAh+fCEDIAQgA0IgiHwhBCACIAM+AiAgBEIgiCEDIARC/////w+DIAkgFH58IQQgAyAEQiCIfCEDIARC/////w+DIAsgEn58IQQgAyAEQiCIfCEDIARC/////w+DIA0gEH58IQQgAyAEQiCIfCEDIARC/////w+DIA8gDn58IQQgAyAEQiCIfCEDIARC/////w+DIBEgDH58IQQgAyAEQiCIfCEDIARC/////w+DIBMgCn58IQQgAyAEQiCIfCEDIAIgBD4CJCADQiCIIQQgA0L/////D4MgCyAUfnwhAyAEIANCIIh8IQQgA0L/////D4MgDSASfnwhAyAEIANCIIh8IQQgA0L/////D4MgDyAQfnwhAyAEIANCIIh8IQQgA0L/////D4MgESAOfnwhAyAEIANCIIh8IQQgA0L/////D4MgEyAMfnwhAyAEIANCIIh8IQQgAiADPgIoIARCIIghAyAEQv////8PgyANIBR+fCEEIAMgBEIgiHwhAyAEQv////8PgyAPIBJ+fCEEIAMgBEIgiHwhAyAEQv////8PgyARIBB+fCEEIAMgBEIgiHwhAyAEQv////8PgyATIA5+fCEEIAMgBEIgiHwhAyACIAQ+AiwgA0IgiCEEIANC/////w+DIA8gFH58IQMgBCADQiCIfCEEIANC/////w+DIBEgEn58IQMgBCADQiCIfCEEIANC/////w+DIBMgEH58IQMgBCADQiCIfCEEIAIgAz4CMCAEQiCIIQMgBEL/////D4MgESAUfnwhBCADIARCIIh8IQMgBEL/////D4MgEyASfnwhBCADIARCIIh8IQMgAiAEPgI0IANCIIghBCADQv////8PgyATIBR+fCEDIAQgA0IgiHwhBCACIAM+AjggBEIgiCEDIAIgBD4CPAv0EAEBfkEoIAA1AgAgATUCAH43AwBBKCAANQIAIAE1AgR+NwMIQSggADUCACABNQIIfjcDEEEoIAA1AgAgATUCDH43AxhBKCAANQIAIAE1AhB+NwMgQSggADUCACABNQIUfjcDKEEoIAA1AgAgATUCGH43AzBBKCAANQIAIAE1Ahx+NwM4QSggADUCBCABNQIAfjcDQEEoIAA1AgQgATUCBH43A0hBKCAANQIEIAE1Agh+NwNQQSggADUCBCABNQIMfjcDWEEoIAA1AgQgATUCEH43A2BBKCAANQIEIAE1AhR+NwNoQSggADUCBCABNQIYfjcDcEEoIAA1AgQgATUCHH43A3hBKCAANQIIIAE1AgB+NwOAAUEoIAA1AgggATUCBH43A4gBQSggADUCCCABNQIIfjcDkAFBKCAANQIIIAE1Agx+NwOYAUEoIAA1AgggATUCEH43A6ABQSggADUCCCABNQIUfjcDqAFBKCAANQIIIAE1Ahh+NwOwAUEoIAA1AgggATUCHH43A7gBQSggADUCDCABNQIAfjcDwAFBKCAANQIMIAE1AgR+NwPIAUEoIAA1AgwgATUCCH43A9ABQSggADUCDCABNQIMfjcD2AFBKCAANQIMIAE1AhB+NwPgAUEoIAA1AgwgATUCFH43A+gBQSggADUCDCABNQIYfjcD8AFBKCAANQIMIAE1Ahx+NwP4AUEoIAA1AhAgATUCAH43A4ACQSggADUCECABNQIEfjcDiAJBKCAANQIQIAE1Agh+NwOQAkEoIAA1AhAgATUCDH43A5gCQSggADUCECABNQIQfjcDoAJBKCAANQIQIAE1AhR+NwOoAkEoIAA1AhAgATUCGH43A7ACQSggADUCECABNQIcfjcDuAJBKCAANQIUIAE1AgB+NwPAAkEoIAA1AhQgATUCBH43A8gCQSggADUCFCABNQIIfjcD0AJBKCAANQIUIAE1Agx+NwPYAkEoIAA1AhQgATUCEH43A+ACQSggADUCFCABNQIUfjcD6AJBKCAANQIUIAE1Ahh+NwPwAkEoIAA1AhQgATUCHH43A/gCQSggADUCGCABNQIAfjcDgANBKCAANQIYIAE1AgR+NwOIA0EoIAA1AhggATUCCH43A5ADQSggADUCGCABNQIMfjcDmANBKCAANQIYIAE1AhB+NwOgA0EoIAA1AhggATUCFH43A6gDQSggADUCGCABNQIYfjcDsANBKCAANQIYIAE1Ahx+NwO4A0EoIAA1AhwgATUCAH43A8ADQSggADUCHCABNQIEfjcDyANBKCAANQIcIAE1Agh+NwPQA0EoIAA1AhwgATUCDH43A9gDQSggADUCHCABNQIQfjcD4ANBKCAANQIcIAE1AhR+NwPoA0EoIAA1AhwgATUCGH43A/ADQSggADUCHCABNQIcfjcD+AMgA0IgiEEoNQIAfCEDIAIgAz4CACADQiCIQSg1AgR8QSg1Agh8QSg1AkB8IQMgAiADPgIEIANCIIhBKDUCDHxBKDUCRHxBKDUCEHxBKDUCSHxBKDUCgAF8IQMgAiADPgIIIANCIIhBKDUCFHxBKDUCTHxBKDUChAF8QSg1Ahh8QSg1AlB8QSg1AogBfEEoNQLAAXwhAyACIAM+AgwgA0IgiEEoNQIcfEEoNQJUfEEoNQKMAXxBKDUCxAF8QSg1AiB8QSg1Alh8QSg1ApABfEEoNQLIAXxBKDUCgAJ8IQMgAiADPgIQIANCIIhBKDUCJHxBKDUCXHxBKDUClAF8QSg1AswBfEEoNQKEAnxBKDUCKHxBKDUCYHxBKDUCmAF8QSg1AtABfEEoNQKIAnxBKDUCwAJ8IQMgAiADPgIUIANCIIhBKDUCLHxBKDUCZHxBKDUCnAF8QSg1AtQBfEEoNQKMAnxBKDUCxAJ8QSg1AjB8QSg1Amh8QSg1AqABfEEoNQLYAXxBKDUCkAJ8QSg1AsgCfEEoNQKAA3whAyACIAM+AhggA0IgiEEoNQI0fEEoNQJsfEEoNQKkAXxBKDUC3AF8QSg1ApQCfEEoNQLMAnxBKDUChAN8QSg1Ajh8QSg1AnB8QSg1AqgBfEEoNQLgAXxBKDUCmAJ8QSg1AtACfEEoNQKIA3xBKDUCwAN8IQMgAiADPgIcIANCIIhBKDUCPHxBKDUCdHxBKDUCrAF8QSg1AuQBfEEoNQKcAnxBKDUC1AJ8QSg1AowDfEEoNQLEA3xBKDUCeHxBKDUCsAF8QSg1AugBfEEoNQKgAnxBKDUC2AJ8QSg1ApADfEEoNQLIA3whAyACIAM+AiAgA0IgiEEoNQJ8fEEoNQK0AXxBKDUC7AF8QSg1AqQCfEEoNQLcAnxBKDUClAN8QSg1AswDfEEoNQK4AXxBKDUC8AF8QSg1AqgCfEEoNQLgAnxBKDUCmAN8QSg1AtADfCEDIAIgAz4CJCADQiCIQSg1ArwBfEEoNQL0AXxBKDUCrAJ8QSg1AuQCfEEoNQKcA3xBKDUC1AN8QSg1AvgBfEEoNQKwAnxBKDUC6AJ8QSg1AqADfEEoNQLYA3whAyACIAM+AiggA0IgiEEoNQL8AXxBKDUCtAJ8QSg1AuwCfEEoNQKkA3xBKDUC3AN8QSg1ArgCfEEoNQLwAnxBKDUCqAN8QSg1AuADfCEDIAIgAz4CLCADQiCIQSg1ArwCfEEoNQL0AnxBKDUCrAN8QSg1AuQDfEEoNQL4AnxBKDUCsAN8QSg1AugDfCEDIAIgAz4CMCADQiCIQSg1AvwCfEEoNQK0A3xBKDUC7AN8QSg1ArgDfEEoNQLwA3whAyACIAM+AjQgA0IgiEEoNQK8A3xBKDUC9AN8QSg1AvgDfCEDIAIgAz4COCADQiCIQSg1AvwDfCEDIAIgAz4CPAu2AQEBfiAANQAAIAF+IQMgAiADPgAAIAA1AAQgAX4gA0IgiHwhAyACIAM+AAQgADUACCABfiADQiCIfCEDIAIgAz4ACCAANQAMIAF+IANCIIh8IQMgAiADPgAMIAA1ABAgAX4gA0IgiHwhAyACIAM+ABAgADUAFCABfiADQiCIfCEDIAIgAz4AFCAANQAYIAF+IANCIIh8IQMgAiADPgAYIAA1ABwgAX4gA0IgiHwhAyACIAM+ABwLTgIBfgF/IAAhAyADNQAAIAF8IQIgAyACPgAAIAJCIIghAgJAA0AgAlANASADQQRqIQMgAzUAACACfCECIAMgAj4AACACQiCIIQIMAAsLC7ACBwF/AX8BfwF/AX4BfgF/IAIEQCACIQUFQcgEIQULIAMEQCADIQQFQegEIQQLIAAgBBAAIAFBqAQQACAFEAFBiAUQAUEfIQZBHyEHAkADQEGoBCAHai0AACAHQQNGcg0BIAdBAWshBwwACwtBqAQgB2pBA2s1AABCAXwhCCAIQgFRBEBCAEIAgBoLAkADQAJAA0AgBCAGai0AACAGQQdGcg0BIAZBAWshBgwACwsgBCAGakEHaykAACEJIAkgCIAhCSAGIAdrQQRrIQoCQANAIAlCgICAgHCDUCAKQQBOcQ0BIAlCCIghCSAKQQFqIQoMAAsLIAlQBEAgBEGoBBAFRQ0CQgEhCUEAIQoLQagEIAlBqAUQCiAEQagFIAprIAQQBxogBSAKaiAJEAsMAAsLC7UCCwF/AX8BfwF/AX8BfwF/AX8BfwF/AX9ByAUhA0HIBRABQQAhC0HoBSEFIAFB6AUQAEGIBiEEQYgGEANBACEMQagGIQggAEGoBhAAQcgGIQZB6AYhB0HIByEKAkADQCAIEAINASAFIAggBiAHEAwgBiAEQYgHEAggCwRAIAwEQEGIByADEAUEQEGIByADIAoQBxpBACENBSADQYgHIAoQBxpBASENCwVBiAcgAyAKEAYaQQEhDQsFIAwEQEGIByADIAoQBhpBACENBSADQYgHEAUEQCADQYgHIAoQBxpBACENBUGIByADIAoQBxpBASENCwsLIAMhCSAEIQMgCiEEIAkhCiAMIQsgDSEMIAUhCSAIIQUgByEIIAkhBwwACwsgCwRAIAEgAyACEAcaBSADIAIQAAsLLAAgACABIAIQBgRAIAJB6AcgAhAHGgUgAkHoBxAFBEAgAkHoByACEAcaCwsLFwAgACABIAIQBwRAIAJB6AcgAhAGGgsLFAAgABACRQRAQegHIAAgARAHGgsLnBEDAX4BfgF+QonHmaQOIQJCACEDIAA1AgAgAn5C/////w+DIQQgADUCACADQiCIfEHoBzUCACAEfnwhAyAAIAM+AgAgADUCBCADQiCIfEHoBzUCBCAEfnwhAyAAIAM+AgQgADUCCCADQiCIfEHoBzUCCCAEfnwhAyAAIAM+AgggADUCDCADQiCIfEHoBzUCDCAEfnwhAyAAIAM+AgwgADUCECADQiCIfEHoBzUCECAEfnwhAyAAIAM+AhAgADUCFCADQiCIfEHoBzUCFCAEfnwhAyAAIAM+AhQgADUCGCADQiCIfEHoBzUCGCAEfnwhAyAAIAM+AhggADUCHCADQiCIfEHoBzUCHCAEfnwhAyAAIAM+AhxB6AggA0IgiD4CAEIAIQMgADUCBCACfkL/////D4MhBCAANQIEIANCIIh8QegHNQIAIAR+fCEDIAAgAz4CBCAANQIIIANCIIh8QegHNQIEIAR+fCEDIAAgAz4CCCAANQIMIANCIIh8QegHNQIIIAR+fCEDIAAgAz4CDCAANQIQIANCIIh8QegHNQIMIAR+fCEDIAAgAz4CECAANQIUIANCIIh8QegHNQIQIAR+fCEDIAAgAz4CFCAANQIYIANCIIh8QegHNQIUIAR+fCEDIAAgAz4CGCAANQIcIANCIIh8QegHNQIYIAR+fCEDIAAgAz4CHCAANQIgIANCIIh8QegHNQIcIAR+fCEDIAAgAz4CIEHoCCADQiCIPgIEQgAhAyAANQIIIAJ+Qv////8PgyEEIAA1AgggA0IgiHxB6Ac1AgAgBH58IQMgACADPgIIIAA1AgwgA0IgiHxB6Ac1AgQgBH58IQMgACADPgIMIAA1AhAgA0IgiHxB6Ac1AgggBH58IQMgACADPgIQIAA1AhQgA0IgiHxB6Ac1AgwgBH58IQMgACADPgIUIAA1AhggA0IgiHxB6Ac1AhAgBH58IQMgACADPgIYIAA1AhwgA0IgiHxB6Ac1AhQgBH58IQMgACADPgIcIAA1AiAgA0IgiHxB6Ac1AhggBH58IQMgACADPgIgIAA1AiQgA0IgiHxB6Ac1AhwgBH58IQMgACADPgIkQegIIANCIIg+AghCACEDIAA1AgwgAn5C/////w+DIQQgADUCDCADQiCIfEHoBzUCACAEfnwhAyAAIAM+AgwgADUCECADQiCIfEHoBzUCBCAEfnwhAyAAIAM+AhAgADUCFCADQiCIfEHoBzUCCCAEfnwhAyAAIAM+AhQgADUCGCADQiCIfEHoBzUCDCAEfnwhAyAAIAM+AhggADUCHCADQiCIfEHoBzUCECAEfnwhAyAAIAM+AhwgADUCICADQiCIfEHoBzUCFCAEfnwhAyAAIAM+AiAgADUCJCADQiCIfEHoBzUCGCAEfnwhAyAAIAM+AiQgADUCKCADQiCIfEHoBzUCHCAEfnwhAyAAIAM+AihB6AggA0IgiD4CDEIAIQMgADUCECACfkL/////D4MhBCAANQIQIANCIIh8QegHNQIAIAR+fCEDIAAgAz4CECAANQIUIANCIIh8QegHNQIEIAR+fCEDIAAgAz4CFCAANQIYIANCIIh8QegHNQIIIAR+fCEDIAAgAz4CGCAANQIcIANCIIh8QegHNQIMIAR+fCEDIAAgAz4CHCAANQIgIANCIIh8QegHNQIQIAR+fCEDIAAgAz4CICAANQIkIANCIIh8QegHNQIUIAR+fCEDIAAgAz4CJCAANQIoIANCIIh8QegHNQIYIAR+fCEDIAAgAz4CKCAANQIsIANCIIh8QegHNQIcIAR+fCEDIAAgAz4CLEHoCCADQiCIPgIQQgAhAyAANQIUIAJ+Qv////8PgyEEIAA1AhQgA0IgiHxB6Ac1AgAgBH58IQMgACADPgIUIAA1AhggA0IgiHxB6Ac1AgQgBH58IQMgACADPgIYIAA1AhwgA0IgiHxB6Ac1AgggBH58IQMgACADPgIcIAA1AiAgA0IgiHxB6Ac1AgwgBH58IQMgACADPgIgIAA1AiQgA0IgiHxB6Ac1AhAgBH58IQMgACADPgIkIAA1AiggA0IgiHxB6Ac1AhQgBH58IQMgACADPgIoIAA1AiwgA0IgiHxB6Ac1AhggBH58IQMgACADPgIsIAA1AjAgA0IgiHxB6Ac1AhwgBH58IQMgACADPgIwQegIIANCIIg+AhRCACEDIAA1AhggAn5C/////w+DIQQgADUCGCADQiCIfEHoBzUCACAEfnwhAyAAIAM+AhggADUCHCADQiCIfEHoBzUCBCAEfnwhAyAAIAM+AhwgADUCICADQiCIfEHoBzUCCCAEfnwhAyAAIAM+AiAgADUCJCADQiCIfEHoBzUCDCAEfnwhAyAAIAM+AiQgADUCKCADQiCIfEHoBzUCECAEfnwhAyAAIAM+AiggADUCLCADQiCIfEHoBzUCFCAEfnwhAyAAIAM+AiwgADUCMCADQiCIfEHoBzUCGCAEfnwhAyAAIAM+AjAgADUCNCADQiCIfEHoBzUCHCAEfnwhAyAAIAM+AjRB6AggA0IgiD4CGEIAIQMgADUCHCACfkL/////D4MhBCAANQIcIANCIIh8QegHNQIAIAR+fCEDIAAgAz4CHCAANQIgIANCIIh8QegHNQIEIAR+fCEDIAAgAz4CICAANQIkIANCIIh8QegHNQIIIAR+fCEDIAAgAz4CJCAANQIoIANCIIh8QegHNQIMIAR+fCEDIAAgAz4CKCAANQIsIANCIIh8QegHNQIQIAR+fCEDIAAgAz4CLCAANQIwIANCIIh8QegHNQIUIAR+fCEDIAAgAz4CMCAANQI0IANCIIh8QegHNQIYIAR+fCEDIAAgAz4CNCAANQI4IANCIIh8QegHNQIcIAR+fCEDIAAgAz4COEHoCCADQiCIPgIcQegIIABBIGogARAOC74fIwF+AX4BfgF+AX4BfgF+AX4BfgF+AX4BfgF+AX4BfgF+AX4BfgF+AX4BfgF+AX4BfgF+AX4BfgF+AX4BfgF+AX4BfgF+AX5CiceZpA4hBSADQv////8PgyAANQIAIgYgATUCACIHfnwhAyAEIANCIIh8IQQgA0L/////D4MgBX5C/////w+DIQggA0L/////D4NBADUC6AciCSAIfnwhAyAEIANCIIh8IQQgBEIgiCEDIARC/////w+DIAYgATUCBCILfnwhBCADIARCIIh8IQMgBEL/////D4MgADUCBCIKIAd+fCEEIAMgBEIgiHwhAyAEQv////8Pg0EANQLsByINIAh+fCEEIAMgBEIgiHwhAyAEQv////8PgyAFfkL/////D4MhDCAEQv////8PgyAJIAx+fCEEIAMgBEIgiHwhAyADQiCIIQQgA0L/////D4MgBiABNQIIIg9+fCEDIAQgA0IgiHwhBCADQv////8PgyAKIAt+fCEDIAQgA0IgiHwhBCADQv////8PgyAANQIIIg4gB358IQMgBCADQiCIfCEEIANC/////w+DIA0gDH58IQMgBCADQiCIfCEEIANC/////w+DQQA1AvAHIhEgCH58IQMgBCADQiCIfCEEIANC/////w+DIAV+Qv////8PgyEQIANC/////w+DIAkgEH58IQMgBCADQiCIfCEEIARCIIghAyAEQv////8PgyAGIAE1AgwiE358IQQgAyAEQiCIfCEDIARC/////w+DIAogD358IQQgAyAEQiCIfCEDIARC/////w+DIA4gC358IQQgAyAEQiCIfCEDIARC/////w+DIAA1AgwiEiAHfnwhBCADIARCIIh8IQMgBEL/////D4MgDSAQfnwhBCADIARCIIh8IQMgBEL/////D4MgESAMfnwhBCADIARCIIh8IQMgBEL/////D4NBADUC9AciFSAIfnwhBCADIARCIIh8IQMgBEL/////D4MgBX5C/////w+DIRQgBEL/////D4MgCSAUfnwhBCADIARCIIh8IQMgA0IgiCEEIANC/////w+DIAYgATUCECIXfnwhAyAEIANCIIh8IQQgA0L/////D4MgCiATfnwhAyAEIANCIIh8IQQgA0L/////D4MgDiAPfnwhAyAEIANCIIh8IQQgA0L/////D4MgEiALfnwhAyAEIANCIIh8IQQgA0L/////D4MgADUCECIWIAd+fCEDIAQgA0IgiHwhBCADQv////8PgyANIBR+fCEDIAQgA0IgiHwhBCADQv////8PgyARIBB+fCEDIAQgA0IgiHwhBCADQv////8PgyAVIAx+fCEDIAQgA0IgiHwhBCADQv////8Pg0EANQL4ByIZIAh+fCEDIAQgA0IgiHwhBCADQv////8PgyAFfkL/////D4MhGCADQv////8PgyAJIBh+fCEDIAQgA0IgiHwhBCAEQiCIIQMgBEL/////D4MgBiABNQIUIht+fCEEIAMgBEIgiHwhAyAEQv////8PgyAKIBd+fCEEIAMgBEIgiHwhAyAEQv////8PgyAOIBN+fCEEIAMgBEIgiHwhAyAEQv////8PgyASIA9+fCEEIAMgBEIgiHwhAyAEQv////8PgyAWIAt+fCEEIAMgBEIgiHwhAyAEQv////8PgyAANQIUIhogB358IQQgAyAEQiCIfCEDIARC/////w+DIA0gGH58IQQgAyAEQiCIfCEDIARC/////w+DIBEgFH58IQQgAyAEQiCIfCEDIARC/////w+DIBUgEH58IQQgAyAEQiCIfCEDIARC/////w+DIBkgDH58IQQgAyAEQiCIfCEDIARC/////w+DQQA1AvwHIh0gCH58IQQgAyAEQiCIfCEDIARC/////w+DIAV+Qv////8PgyEcIARC/////w+DIAkgHH58IQQgAyAEQiCIfCEDIANCIIghBCADQv////8PgyAGIAE1AhgiH358IQMgBCADQiCIfCEEIANC/////w+DIAogG358IQMgBCADQiCIfCEEIANC/////w+DIA4gF358IQMgBCADQiCIfCEEIANC/////w+DIBIgE358IQMgBCADQiCIfCEEIANC/////w+DIBYgD358IQMgBCADQiCIfCEEIANC/////w+DIBogC358IQMgBCADQiCIfCEEIANC/////w+DIAA1AhgiHiAHfnwhAyAEIANCIIh8IQQgA0L/////D4MgDSAcfnwhAyAEIANCIIh8IQQgA0L/////D4MgESAYfnwhAyAEIANCIIh8IQQgA0L/////D4MgFSAUfnwhAyAEIANCIIh8IQQgA0L/////D4MgGSAQfnwhAyAEIANCIIh8IQQgA0L/////D4MgHSAMfnwhAyAEIANCIIh8IQQgA0L/////D4NBADUCgAgiISAIfnwhAyAEIANCIIh8IQQgA0L/////D4MgBX5C/////w+DISAgA0L/////D4MgCSAgfnwhAyAEIANCIIh8IQQgBEIgiCEDIARC/////w+DIAYgATUCHCIjfnwhBCADIARCIIh8IQMgBEL/////D4MgCiAffnwhBCADIARCIIh8IQMgBEL/////D4MgDiAbfnwhBCADIARCIIh8IQMgBEL/////D4MgEiAXfnwhBCADIARCIIh8IQMgBEL/////D4MgFiATfnwhBCADIARCIIh8IQMgBEL/////D4MgGiAPfnwhBCADIARCIIh8IQMgBEL/////D4MgHiALfnwhBCADIARCIIh8IQMgBEL/////D4MgADUCHCIiIAd+fCEEIAMgBEIgiHwhAyAEQv////8PgyANICB+fCEEIAMgBEIgiHwhAyAEQv////8PgyARIBx+fCEEIAMgBEIgiHwhAyAEQv////8PgyAVIBh+fCEEIAMgBEIgiHwhAyAEQv////8PgyAZIBR+fCEEIAMgBEIgiHwhAyAEQv////8PgyAdIBB+fCEEIAMgBEIgiHwhAyAEQv////8PgyAhIAx+fCEEIAMgBEIgiHwhAyAEQv////8Pg0EANQKECCIlIAh+fCEEIAMgBEIgiHwhAyAEQv////8PgyAFfkL/////D4MhJCAEQv////8PgyAJICR+fCEEIAMgBEIgiHwhAyADQiCIIQQgA0L/////D4MgCiAjfnwhAyAEIANCIIh8IQQgA0L/////D4MgDiAffnwhAyAEIANCIIh8IQQgA0L/////D4MgEiAbfnwhAyAEIANCIIh8IQQgA0L/////D4MgFiAXfnwhAyAEIANCIIh8IQQgA0L/////D4MgGiATfnwhAyAEIANCIIh8IQQgA0L/////D4MgHiAPfnwhAyAEIANCIIh8IQQgA0L/////D4MgIiALfnwhAyAEIANCIIh8IQQgA0L/////D4MgDSAkfnwhAyAEIANCIIh8IQQgA0L/////D4MgESAgfnwhAyAEIANCIIh8IQQgA0L/////D4MgFSAcfnwhAyAEIANCIIh8IQQgA0L/////D4MgGSAYfnwhAyAEIANCIIh8IQQgA0L/////D4MgHSAUfnwhAyAEIANCIIh8IQQgA0L/////D4MgISAQfnwhAyAEIANCIIh8IQQgA0L/////D4MgJSAMfnwhAyAEIANCIIh8IQQgAiADPgIAIARCIIghAyAEQv////8PgyAOICN+fCEEIAMgBEIgiHwhAyAEQv////8PgyASIB9+fCEEIAMgBEIgiHwhAyAEQv////8PgyAWIBt+fCEEIAMgBEIgiHwhAyAEQv////8PgyAaIBd+fCEEIAMgBEIgiHwhAyAEQv////8PgyAeIBN+fCEEIAMgBEIgiHwhAyAEQv////8PgyAiIA9+fCEEIAMgBEIgiHwhAyAEQv////8PgyARICR+fCEEIAMgBEIgiHwhAyAEQv////8PgyAVICB+fCEEIAMgBEIgiHwhAyAEQv////8PgyAZIBx+fCEEIAMgBEIgiHwhAyAEQv////8PgyAdIBh+fCEEIAMgBEIgiHwhAyAEQv////8PgyAhIBR+fCEEIAMgBEIgiHwhAyAEQv////8PgyAlIBB+fCEEIAMgBEIgiHwhAyACIAQ+AgQgA0IgiCEEIANC/////w+DIBIgI358IQMgBCADQiCIfCEEIANC/////w+DIBYgH358IQMgBCADQiCIfCEEIANC/////w+DIBogG358IQMgBCADQiCIfCEEIANC/////w+DIB4gF358IQMgBCADQiCIfCEEIANC/////w+DICIgE358IQMgBCADQiCIfCEEIANC/////w+DIBUgJH58IQMgBCADQiCIfCEEIANC/////w+DIBkgIH58IQMgBCADQiCIfCEEIANC/////w+DIB0gHH58IQMgBCADQiCIfCEEIANC/////w+DICEgGH58IQMgBCADQiCIfCEEIANC/////w+DICUgFH58IQMgBCADQiCIfCEEIAIgAz4CCCAEQiCIIQMgBEL/////D4MgFiAjfnwhBCADIARCIIh8IQMgBEL/////D4MgGiAffnwhBCADIARCIIh8IQMgBEL/////D4MgHiAbfnwhBCADIARCIIh8IQMgBEL/////D4MgIiAXfnwhBCADIARCIIh8IQMgBEL/////D4MgGSAkfnwhBCADIARCIIh8IQMgBEL/////D4MgHSAgfnwhBCADIARCIIh8IQMgBEL/////D4MgISAcfnwhBCADIARCIIh8IQMgBEL/////D4MgJSAYfnwhBCADIARCIIh8IQMgAiAEPgIMIANCIIghBCADQv////8PgyAaICN+fCEDIAQgA0IgiHwhBCADQv////8PgyAeIB9+fCEDIAQgA0IgiHwhBCADQv////8PgyAiIBt+fCEDIAQgA0IgiHwhBCADQv////8PgyAdICR+fCEDIAQgA0IgiHwhBCADQv////8PgyAhICB+fCEDIAQgA0IgiHwhBCADQv////8PgyAlIBx+fCEDIAQgA0IgiHwhBCACIAM+AhAgBEIgiCEDIARC/////w+DIB4gI358IQQgAyAEQiCIfCEDIARC/////w+DICIgH358IQQgAyAEQiCIfCEDIARC/////w+DICEgJH58IQQgAyAEQiCIfCEDIARC/////w+DICUgIH58IQQgAyAEQiCIfCEDIAIgBD4CFCADQiCIIQQgA0L/////D4MgIiAjfnwhAyAEIANCIIh8IQQgA0L/////D4MgJSAkfnwhAyAEIANCIIh8IQQgAiADPgIYIARCIIghAyACIAQ+AhwgA6cEQCACQegHIAIQBxoFIAJB6AcQBQRAIAJB6AcgAhAHGgsLCxIAIAAgAUHoDBAJQegMIAIQEQsLACAAQYgIIAEQEgsVACAAQagNEABByA0QAUGoDSABEBELFwAgACABEBUgAUHoByABEA0gASABEBQLCQBBqAggABAACywAIAAgASACEAYEQCACQegNIAIQBxoFIAJB6A0QBQRAIAJB6A0gAhAHGgsLCxcAIAAgASACEAcEQCACQegNIAIQBhoLCxQAIAAQAkUEQEHoDSAAIAEQBxoLC5wRAwF+AX4BfkL/////DiECQgAhAyAANQIAIAJ+Qv////8PgyEEIAA1AgAgA0IgiHxB6A01AgAgBH58IQMgACADPgIAIAA1AgQgA0IgiHxB6A01AgQgBH58IQMgACADPgIEIAA1AgggA0IgiHxB6A01AgggBH58IQMgACADPgIIIAA1AgwgA0IgiHxB6A01AgwgBH58IQMgACADPgIMIAA1AhAgA0IgiHxB6A01AhAgBH58IQMgACADPgIQIAA1AhQgA0IgiHxB6A01AhQgBH58IQMgACADPgIUIAA1AhggA0IgiHxB6A01AhggBH58IQMgACADPgIYIAA1AhwgA0IgiHxB6A01AhwgBH58IQMgACADPgIcQegOIANCIIg+AgBCACEDIAA1AgQgAn5C/////w+DIQQgADUCBCADQiCIfEHoDTUCACAEfnwhAyAAIAM+AgQgADUCCCADQiCIfEHoDTUCBCAEfnwhAyAAIAM+AgggADUCDCADQiCIfEHoDTUCCCAEfnwhAyAAIAM+AgwgADUCECADQiCIfEHoDTUCDCAEfnwhAyAAIAM+AhAgADUCFCADQiCIfEHoDTUCECAEfnwhAyAAIAM+AhQgADUCGCADQiCIfEHoDTUCFCAEfnwhAyAAIAM+AhggADUCHCADQiCIfEHoDTUCGCAEfnwhAyAAIAM+AhwgADUCICADQiCIfEHoDTUCHCAEfnwhAyAAIAM+AiBB6A4gA0IgiD4CBEIAIQMgADUCCCACfkL/////D4MhBCAANQIIIANCIIh8QegNNQIAIAR+fCEDIAAgAz4CCCAANQIMIANCIIh8QegNNQIEIAR+fCEDIAAgAz4CDCAANQIQIANCIIh8QegNNQIIIAR+fCEDIAAgAz4CECAANQIUIANCIIh8QegNNQIMIAR+fCEDIAAgAz4CFCAANQIYIANCIIh8QegNNQIQIAR+fCEDIAAgAz4CGCAANQIcIANCIIh8QegNNQIUIAR+fCEDIAAgAz4CHCAANQIgIANCIIh8QegNNQIYIAR+fCEDIAAgAz4CICAANQIkIANCIIh8QegNNQIcIAR+fCEDIAAgAz4CJEHoDiADQiCIPgIIQgAhAyAANQIMIAJ+Qv////8PgyEEIAA1AgwgA0IgiHxB6A01AgAgBH58IQMgACADPgIMIAA1AhAgA0IgiHxB6A01AgQgBH58IQMgACADPgIQIAA1AhQgA0IgiHxB6A01AgggBH58IQMgACADPgIUIAA1AhggA0IgiHxB6A01AgwgBH58IQMgACADPgIYIAA1AhwgA0IgiHxB6A01AhAgBH58IQMgACADPgIcIAA1AiAgA0IgiHxB6A01AhQgBH58IQMgACADPgIgIAA1AiQgA0IgiHxB6A01AhggBH58IQMgACADPgIkIAA1AiggA0IgiHxB6A01AhwgBH58IQMgACADPgIoQegOIANCIIg+AgxCACEDIAA1AhAgAn5C/////w+DIQQgADUCECADQiCIfEHoDTUCACAEfnwhAyAAIAM+AhAgADUCFCADQiCIfEHoDTUCBCAEfnwhAyAAIAM+AhQgADUCGCADQiCIfEHoDTUCCCAEfnwhAyAAIAM+AhggADUCHCADQiCIfEHoDTUCDCAEfnwhAyAAIAM+AhwgADUCICADQiCIfEHoDTUCECAEfnwhAyAAIAM+AiAgADUCJCADQiCIfEHoDTUCFCAEfnwhAyAAIAM+AiQgADUCKCADQiCIfEHoDTUCGCAEfnwhAyAAIAM+AiggADUCLCADQiCIfEHoDTUCHCAEfnwhAyAAIAM+AixB6A4gA0IgiD4CEEIAIQMgADUCFCACfkL/////D4MhBCAANQIUIANCIIh8QegNNQIAIAR+fCEDIAAgAz4CFCAANQIYIANCIIh8QegNNQIEIAR+fCEDIAAgAz4CGCAANQIcIANCIIh8QegNNQIIIAR+fCEDIAAgAz4CHCAANQIgIANCIIh8QegNNQIMIAR+fCEDIAAgAz4CICAANQIkIANCIIh8QegNNQIQIAR+fCEDIAAgAz4CJCAANQIoIANCIIh8QegNNQIUIAR+fCEDIAAgAz4CKCAANQIsIANCIIh8QegNNQIYIAR+fCEDIAAgAz4CLCAANQIwIANCIIh8QegNNQIcIAR+fCEDIAAgAz4CMEHoDiADQiCIPgIUQgAhAyAANQIYIAJ+Qv////8PgyEEIAA1AhggA0IgiHxB6A01AgAgBH58IQMgACADPgIYIAA1AhwgA0IgiHxB6A01AgQgBH58IQMgACADPgIcIAA1AiAgA0IgiHxB6A01AgggBH58IQMgACADPgIgIAA1AiQgA0IgiHxB6A01AgwgBH58IQMgACADPgIkIAA1AiggA0IgiHxB6A01AhAgBH58IQMgACADPgIoIAA1AiwgA0IgiHxB6A01AhQgBH58IQMgACADPgIsIAA1AjAgA0IgiHxB6A01AhggBH58IQMgACADPgIwIAA1AjQgA0IgiHxB6A01AhwgBH58IQMgACADPgI0QegOIANCIIg+AhhCACEDIAA1AhwgAn5C/////w+DIQQgADUCHCADQiCIfEHoDTUCACAEfnwhAyAAIAM+AhwgADUCICADQiCIfEHoDTUCBCAEfnwhAyAAIAM+AiAgADUCJCADQiCIfEHoDTUCCCAEfnwhAyAAIAM+AiQgADUCKCADQiCIfEHoDTUCDCAEfnwhAyAAIAM+AiggADUCLCADQiCIfEHoDTUCECAEfnwhAyAAIAM+AiwgADUCMCADQiCIfEHoDTUCFCAEfnwhAyAAIAM+AjAgADUCNCADQiCIfEHoDTUCGCAEfnwhAyAAIAM+AjQgADUCOCADQiCIfEHoDTUCHCAEfnwhAyAAIAM+AjhB6A4gA0IgiD4CHEHoDiAAQSBqIAEQGAu+HyMBfgF+AX4BfgF+AX4BfgF+AX4BfgF+AX4BfgF+AX4BfgF+AX4BfgF+AX4BfgF+AX4BfgF+AX4BfgF+AX4BfgF+AX4BfgF+Qv////8OIQUgA0L/////D4MgADUCACIGIAE1AgAiB358IQMgBCADQiCIfCEEIANC/////w+DIAV+Qv////8PgyEIIANC/////w+DQQA1AugNIgkgCH58IQMgBCADQiCIfCEEIARCIIghAyAEQv////8PgyAGIAE1AgQiC358IQQgAyAEQiCIfCEDIARC/////w+DIAA1AgQiCiAHfnwhBCADIARCIIh8IQMgBEL/////D4NBADUC7A0iDSAIfnwhBCADIARCIIh8IQMgBEL/////D4MgBX5C/////w+DIQwgBEL/////D4MgCSAMfnwhBCADIARCIIh8IQMgA0IgiCEEIANC/////w+DIAYgATUCCCIPfnwhAyAEIANCIIh8IQQgA0L/////D4MgCiALfnwhAyAEIANCIIh8IQQgA0L/////D4MgADUCCCIOIAd+fCEDIAQgA0IgiHwhBCADQv////8PgyANIAx+fCEDIAQgA0IgiHwhBCADQv////8Pg0EANQLwDSIRIAh+fCEDIAQgA0IgiHwhBCADQv////8PgyAFfkL/////D4MhECADQv////8PgyAJIBB+fCEDIAQgA0IgiHwhBCAEQiCIIQMgBEL/////D4MgBiABNQIMIhN+fCEEIAMgBEIgiHwhAyAEQv////8PgyAKIA9+fCEEIAMgBEIgiHwhAyAEQv////8PgyAOIAt+fCEEIAMgBEIgiHwhAyAEQv////8PgyAANQIMIhIgB358IQQgAyAEQiCIfCEDIARC/////w+DIA0gEH58IQQgAyAEQiCIfCEDIARC/////w+DIBEgDH58IQQgAyAEQiCIfCEDIARC/////w+DQQA1AvQNIhUgCH58IQQgAyAEQiCIfCEDIARC/////w+DIAV+Qv////8PgyEUIARC/////w+DIAkgFH58IQQgAyAEQiCIfCEDIANCIIghBCADQv////8PgyAGIAE1AhAiF358IQMgBCADQiCIfCEEIANC/////w+DIAogE358IQMgBCADQiCIfCEEIANC/////w+DIA4gD358IQMgBCADQiCIfCEEIANC/////w+DIBIgC358IQMgBCADQiCIfCEEIANC/////w+DIAA1AhAiFiAHfnwhAyAEIANCIIh8IQQgA0L/////D4MgDSAUfnwhAyAEIANCIIh8IQQgA0L/////D4MgESAQfnwhAyAEIANCIIh8IQQgA0L/////D4MgFSAMfnwhAyAEIANCIIh8IQQgA0L/////D4NBADUC+A0iGSAIfnwhAyAEIANCIIh8IQQgA0L/////D4MgBX5C/////w+DIRggA0L/////D4MgCSAYfnwhAyAEIANCIIh8IQQgBEIgiCEDIARC/////w+DIAYgATUCFCIbfnwhBCADIARCIIh8IQMgBEL/////D4MgCiAXfnwhBCADIARCIIh8IQMgBEL/////D4MgDiATfnwhBCADIARCIIh8IQMgBEL/////D4MgEiAPfnwhBCADIARCIIh8IQMgBEL/////D4MgFiALfnwhBCADIARCIIh8IQMgBEL/////D4MgADUCFCIaIAd+fCEEIAMgBEIgiHwhAyAEQv////8PgyANIBh+fCEEIAMgBEIgiHwhAyAEQv////8PgyARIBR+fCEEIAMgBEIgiHwhAyAEQv////8PgyAVIBB+fCEEIAMgBEIgiHwhAyAEQv////8PgyAZIAx+fCEEIAMgBEIgiHwhAyAEQv////8Pg0EANQL8DSIdIAh+fCEEIAMgBEIgiHwhAyAEQv////8PgyAFfkL/////D4MhHCAEQv////8PgyAJIBx+fCEEIAMgBEIgiHwhAyADQiCIIQQgA0L/////D4MgBiABNQIYIh9+fCEDIAQgA0IgiHwhBCADQv////8PgyAKIBt+fCEDIAQgA0IgiHwhBCADQv////8PgyAOIBd+fCEDIAQgA0IgiHwhBCADQv////8PgyASIBN+fCEDIAQgA0IgiHwhBCADQv////8PgyAWIA9+fCEDIAQgA0IgiHwhBCADQv////8PgyAaIAt+fCEDIAQgA0IgiHwhBCADQv////8PgyAANQIYIh4gB358IQMgBCADQiCIfCEEIANC/////w+DIA0gHH58IQMgBCADQiCIfCEEIANC/////w+DIBEgGH58IQMgBCADQiCIfCEEIANC/////w+DIBUgFH58IQMgBCADQiCIfCEEIANC/////w+DIBkgEH58IQMgBCADQiCIfCEEIANC/////w+DIB0gDH58IQMgBCADQiCIfCEEIANC/////w+DQQA1AoAOIiEgCH58IQMgBCADQiCIfCEEIANC/////w+DIAV+Qv////8PgyEgIANC/////w+DIAkgIH58IQMgBCADQiCIfCEEIARCIIghAyAEQv////8PgyAGIAE1AhwiI358IQQgAyAEQiCIfCEDIARC/////w+DIAogH358IQQgAyAEQiCIfCEDIARC/////w+DIA4gG358IQQgAyAEQiCIfCEDIARC/////w+DIBIgF358IQQgAyAEQiCIfCEDIARC/////w+DIBYgE358IQQgAyAEQiCIfCEDIARC/////w+DIBogD358IQQgAyAEQiCIfCEDIARC/////w+DIB4gC358IQQgAyAEQiCIfCEDIARC/////w+DIAA1AhwiIiAHfnwhBCADIARCIIh8IQMgBEL/////D4MgDSAgfnwhBCADIARCIIh8IQMgBEL/////D4MgESAcfnwhBCADIARCIIh8IQMgBEL/////D4MgFSAYfnwhBCADIARCIIh8IQMgBEL/////D4MgGSAUfnwhBCADIARCIIh8IQMgBEL/////D4MgHSAQfnwhBCADIARCIIh8IQMgBEL/////D4MgISAMfnwhBCADIARCIIh8IQMgBEL/////D4NBADUChA4iJSAIfnwhBCADIARCIIh8IQMgBEL/////D4MgBX5C/////w+DISQgBEL/////D4MgCSAkfnwhBCADIARCIIh8IQMgA0IgiCEEIANC/////w+DIAogI358IQMgBCADQiCIfCEEIANC/////w+DIA4gH358IQMgBCADQiCIfCEEIANC/////w+DIBIgG358IQMgBCADQiCIfCEEIANC/////w+DIBYgF358IQMgBCADQiCIfCEEIANC/////w+DIBogE358IQMgBCADQiCIfCEEIANC/////w+DIB4gD358IQMgBCADQiCIfCEEIANC/////w+DICIgC358IQMgBCADQiCIfCEEIANC/////w+DIA0gJH58IQMgBCADQiCIfCEEIANC/////w+DIBEgIH58IQMgBCADQiCIfCEEIANC/////w+DIBUgHH58IQMgBCADQiCIfCEEIANC/////w+DIBkgGH58IQMgBCADQiCIfCEEIANC/////w+DIB0gFH58IQMgBCADQiCIfCEEIANC/////w+DICEgEH58IQMgBCADQiCIfCEEIANC/////w+DICUgDH58IQMgBCADQiCIfCEEIAIgAz4CACAEQiCIIQMgBEL/////D4MgDiAjfnwhBCADIARCIIh8IQMgBEL/////D4MgEiAffnwhBCADIARCIIh8IQMgBEL/////D4MgFiAbfnwhBCADIARCIIh8IQMgBEL/////D4MgGiAXfnwhBCADIARCIIh8IQMgBEL/////D4MgHiATfnwhBCADIARCIIh8IQMgBEL/////D4MgIiAPfnwhBCADIARCIIh8IQMgBEL/////D4MgESAkfnwhBCADIARCIIh8IQMgBEL/////D4MgFSAgfnwhBCADIARCIIh8IQMgBEL/////D4MgGSAcfnwhBCADIARCIIh8IQMgBEL/////D4MgHSAYfnwhBCADIARCIIh8IQMgBEL/////D4MgISAUfnwhBCADIARCIIh8IQMgBEL/////D4MgJSAQfnwhBCADIARCIIh8IQMgAiAEPgIEIANCIIghBCADQv////8PgyASICN+fCEDIAQgA0IgiHwhBCADQv////8PgyAWIB9+fCEDIAQgA0IgiHwhBCADQv////8PgyAaIBt+fCEDIAQgA0IgiHwhBCADQv////8PgyAeIBd+fCEDIAQgA0IgiHwhBCADQv////8PgyAiIBN+fCEDIAQgA0IgiHwhBCADQv////8PgyAVICR+fCEDIAQgA0IgiHwhBCADQv////8PgyAZICB+fCEDIAQgA0IgiHwhBCADQv////8PgyAdIBx+fCEDIAQgA0IgiHwhBCADQv////8PgyAhIBh+fCEDIAQgA0IgiHwhBCADQv////8PgyAlIBR+fCEDIAQgA0IgiHwhBCACIAM+AgggBEIgiCEDIARC/////w+DIBYgI358IQQgAyAEQiCIfCEDIARC/////w+DIBogH358IQQgAyAEQiCIfCEDIARC/////w+DIB4gG358IQQgAyAEQiCIfCEDIARC/////w+DICIgF358IQQgAyAEQiCIfCEDIARC/////w+DIBkgJH58IQQgAyAEQiCIfCEDIARC/////w+DIB0gIH58IQQgAyAEQiCIfCEDIARC/////w+DICEgHH58IQQgAyAEQiCIfCEDIARC/////w+DICUgGH58IQQgAyAEQiCIfCEDIAIgBD4CDCADQiCIIQQgA0L/////D4MgGiAjfnwhAyAEIANCIIh8IQQgA0L/////D4MgHiAffnwhAyAEIANCIIh8IQQgA0L/////D4MgIiAbfnwhAyAEIANCIIh8IQQgA0L/////D4MgHSAkfnwhAyAEIANCIIh8IQQgA0L/////D4MgISAgfnwhAyAEIANCIIh8IQQgA0L/////D4MgJSAcfnwhAyAEIANCIIh8IQQgAiADPgIQIARCIIghAyAEQv////8PgyAeICN+fCEEIAMgBEIgiHwhAyAEQv////8PgyAiIB9+fCEEIAMgBEIgiHwhAyAEQv////8PgyAhICR+fCEEIAMgBEIgiHwhAyAEQv////8PgyAlICB+fCEEIAMgBEIgiHwhAyACIAQ+AhQgA0IgiCEEIANC/////w+DICIgI358IQMgBCADQiCIfCEEIANC/////w+DICUgJH58IQMgBCADQiCIfCEEIAIgAz4CGCAEQiCIIQMgAiAEPgIcIAOnBEAgAkHoDSACEAcaBSACQegNEAUEQCACQegNIAIQBxoLCwsSACAAIAFB6BIQCUHoEiACEBsLCwAgAEGIDiABEBwLFQAgAEGoExAAQcgTEAFBqBMgARAbCxcAIAAgARAfIAFB6A0gARANIAEgARAeCwkAQagOIAAQAAsVACAAIAFB6BMQHEHoE0GIDiACEBwLCwAgAEHoDSABEA0LCgAgAEHAAGoQAgsVACAAEAEgAEEgahAXIABBwABqEAELIgAgACABEAAgAEEgaiABQSBqEAAgAEHAAGogAUHAAGoQAAuGAgAgABAkBEAgACABECYPCyAAIABBiBQQEiAAQSBqIABBIGpBqBQQEkGoFEGoFEHIFBASIABBqBRB6BQQDkHoFEHoFEHoFBASQegUQYgUQegUEA9B6BRByBRB6BQQD0HoFEHoFEHoFBAOQYgUQYgUQYgVEA5BiBVBiBRBiBUQDkGIFUGIFUGoFRASIABBIGogAEHAAGpByBUQEkHoFEHoFCABEA5BqBUgASABEA9ByBRByBRB6BUQDkHoFUHoFUHoFRAOQegVQegVQegVEA5B6BQgASABQSBqEA8gAUEgakGIFSABQSBqEBIgAUEgakHoFSABQSBqEA9ByBVByBUgAUHAAGoQDgusAwIBfwF/IABBwABqIQMgAUHAAGohBCAAECQEQCABIAIQJg8LIAEQJARAIAAgAhAmDwsgAyADQYgWEBIgBCAEQagWEBIgAEGoFkHIFhASIAFBiBZB6BYQEiADQYgWQYgXEBIgBEGoFkGoFxASIABBIGpBqBdByBcQEiABQSBqQYgXQegXEBJByBZB6BYQBARAQcgXQegXEAQEQCAAIAIQJw8LC0HoFkHIFkGIGBAPQegXQcgXQagYEA9BiBhBiBhByBgQDkHIGEHIGEHIGBASQYgYQcgYQegYEBJBqBhBqBhBiBkQDkHIFkHIGEHIGRASQYgZQYgZQagZEBJByBlByBlB6BkQDkGoGUHoGCACEA8gAkHoGSACEA9ByBdB6BhBiBoQEkGIGkGIGkGIGhAOQcgZIAIgAkEgahAPIAJBIGpBiBkgAkEgahASIAJBIGpBiBogAkEgahAPIAMgBCACQcAAahAOIAJBwABqIAJBwABqIAJBwABqEBIgAkHAAGpBiBYgAkHAAGoQDyACQcAAakGoFiACQcAAahAPIAJBwABqQYgYIAJBwABqEBILIgAgACABEAAgAEEgaiABQSBqEBAgAEHAAGogAUHAAGoQAAsQACABIAIQKSAAIAIgAhAoCyIAIAAgARAVIABBIGogAUEgahAVIABBwABqIAFBwABqEBULIgAgACABEBQgAEEgaiABQSBqEBQgAEHAAGogAUHAAGoQFAtPACAAECQEQCABECUFIABBwABqQagaEBZBqBpBqBpByBoQEkGoGkHIGkHoGhASIABByBogARASIABBIGpB6BogAUEgahASIAFBwABqEBcLC6cCAgF/AX8gAEGIGxAmIAMQJSACIQQCQANAIARBAWshBCABIARqLQAAIQUgAyADECcgBUGAAU8EQCAFQYABayEFQYgbIAMgAxAoCyADIAMQJyAFQcAATwRAIAVBwABrIQVBiBsgAyADECgLIAMgAxAnIAVBIE8EQCAFQSBrIQVBiBsgAyADECgLIAMgAxAnIAVBEE8EQCAFQRBrIQVBiBsgAyADECgLIAMgAxAnIAVBCE8EQCAFQQhrIQVBiBsgAyADECgLIAMgAxAnIAVBBE8EQCAFQQRrIQVBiBsgAyADECgLIAMgAxAnIAVBAk8EQCAFQQJrIQVBiBsgAyADECgLIAMgAxAnIAVBAU8EQCAFQQFrIQVBiBsgAyADECgLIARFDQEMAAsLCysCAX8BfyAAQQV2QQJ0IQFBASAAQR9xdCECIAEgASgC6NsBIAJyNgLo2wELJAIBfwF/IABBBXZBAnQhAUEBIABBH3F0IQIgASgC6NsBIAJxC6ABBAF/AX8BfwF/IAAhAkHoGxAlQQAhBAJAA0AgBCABRg0BQegbQQEgBHRB4ABsaiEDIAIQAiEFIAIgAxAAIAJBIGohAiADQSBqIQMgAiADEAAgAkEgaiECIANBIGohAyAFBEAgAxABBSADEBcLIARBAWohBAwACwtB6NsBQpeChIAQNwMAQfDbAUIBNwMAQfjbAUIBNwMAQYDcAUIANwMAC0ADAX8BfwF/QegbIABB4ABsaiEBIAAQMEUEQCAALQCI3AEQMiECIAAtAIjeARAyIQMgAiADIAEQKCAAEC8LIAELpQEEAX8BfwF+AX5BACEDAkADQCADQSBGDQFCACEGQQAhBAJAA0AgBCABRg0BIAAgBEEgbCADamoxAAAhBSAFIAVCHIaEQo+AgIDwAYMhBSAFIAVCDoaEQoOAjICwgMABgyEFIAUgBUIHhoRCgYKEiJCgwIABgyEFIAYgBSAErYaEIQYgBEEBaiEEDAALCyACIANBCGxqIAY3AwAgA0EBaiEDDAALCwtLAQF/IAAgAkGI4AEQMyADECUgASACEDFBACEEAkADQCAEQYACRg0BIAMgAxAnIANBh+IBIARrLQAAEDIgAxAoIARBAWohBAwACwsLfgQBfwF/AX8BfyAAIQUgASEGIAUgAiADbiADbEEgbGohCAJAA0AgBSAIRg0BIAUgBiADQYjiARA0QYjiASAEIAQQKCAFQSAgA2xqIQUgBkHAACADbGohBgwACwsgAiADcCEHIAcEQCAFIAYgB0GI4gEQNEGI4gEgBCAEECgLC04CAX8BfyAAIAJB6OIBEDMgASACEDFBACEEAkADQCAEQYACRg0BIAMgBEHgAGxqIQUgBUHn5AEgBGstAAAQMiAFECggBEEBaiEEDAALCwspAQF/QQAhAgJAA0AgAiABRg0BIAAgAkHgAGxqECUgAkEBaiECDAALCwtIAgF/AX8gACEEIAQgAhAmIARB4ABqIQRBASEDAkADQCADIAFGDQEgAiACECcgBCACIAIQKCAEQeAAaiEEIANBAWohAwwACwsLigEEAX8BfwF/AX9B6OQBQYACEDcgACEFIAEhBiAFIAIgA24gA2xBIGxqIQgCQANAIAUgCEYNASAFIAYgA0Ho5AEQNiAFQSAgA2xqIQUgBkHAACADbGohBgwACwsgAiADcCEHIAcEQCAFIAYgB0Ho5AEQNgtB6OQBQYACQeikAxA4QeikAyAEIAQQKAtGACAAQf8BcS0AiLQDQRh0IABBCHZB/wFxLQCItANBEHRqIABBEHZB/wFxLQCItANBCHQgAEEYdkH/AXEtAIi0A2pqIAF3C2cFAX8BfwF/AX8Bf0EBIAF0IQJBACEDAkADQCADIAJGDQEgACADQSBsaiEFIAMgARA6IQQgACAEQSBsaiEGIAMgBEkEQCAFQYi2AxAAIAYgBRAAQYi2AyAGEAALIANBAWohAwwACwsL7wEJAX8BfwF/AX8BfwF/AX8BfwF/IAAgARA7QQEgAXQhCEEBIQMCQANAIAMgAUsNAUEBIAN0IQZByKUDIANBIGxqIQlBACEEAkADQCAEIAhPDQEgAgRAIAlBIGpBqLYDEAAFQai2AxAhCyAGQQF2IQdBACEFAkADQCAFIAdPDQEgACAEIAVqQSBsaiEKIAogB0EgbGohC0GotgMgC0HItgMQHCAKQei2AxAAQei2A0HItgMgChAYQei2A0HItgMgCxAZQai2AyAJQai2AxAcIAVBAWohBQwACwsgBCAGaiEEDAALCyADQQFqIQMMAAsLCz4DAX8BfwF/IAAhAyABIQQgACACQSBsaiEFAkADQCADIAVGDQEgAyAEEAAgA0EgaiEDIARBwABqIQQMAAsLCz0DAX8BfwF/IAAhAyABIQQgACACQSBsaiEFAkADQCADIAVGDQEgAyAEEB8gA0EgaiEDIARBIGohBAwACwsLPQMBfwF/AX8gACEDIAEhBCAAIAJBIGxqIQUCQANAIAMgBUYNASADIAQQHiADQSBqIQMgBEEgaiEEDAALCwuWAQcBfwF/AX8BfwF/AX8Bf0EBIAF0IQJB6KwDIAFBIGxqIQQgAkEBayEGQQEhBSACQQF2IQMCQANAIAUgA0YNASAAIAVBIGxqIQcgACACIAVrQSBsaiEIIAdBiLcDEAAgCCAEIAcQHEGItwMgBCAIEBwgBUEBaiEFDAALCyAAIAQgABAcIAAgA0EgbGohCCAIIAQgCBAcC0MCAX8BfyAAQQF2IQJBACEBAkADQCACRQ0BIAJBAXYhAiABQQFqIQEMAAsLIABBASABdEcEQAALIAFBHEsEQAALIAELEgEBfyABEEEhAyAAIAMgAhA8CxgBAX8gARBBIQMgACADIAIQPCAAIAMQQAtMBAF/AX8BfwF/IAAhBCABIQUgAyEGIAAgAkEgbGohBwJAA0AgBCAHRg0BIAQgBSAGEBwgBEEgaiEEIAVBIGohBSAGQSBqIQYMAAsLCy4CAX8BfyAAIQMgACABQSBsaiECAkADQCADIAJGDQEgAxABIANBIGohAwwACwsLjgEGAX8BfwF/AX8BfwF/QQAhBCAAIQYgASEHAkADQCAEIAJGDQEgBigCACEJIAZBBGohBkEAIQUCQANAIAUgCUYNASADIAYoAgBBIGxqIQggBkEEaiEGIAcgBkGotwMQHEGotwMgCCAIEBggBkEgaiEGIAVBAWohBQwACwsgB0EgaiEHIARBAWohBAwACwsLDgAgABACIABBIGoQAnELDQAgABABIABBIGoQAQsNACAAEBcgAEEgahABCxQAIAAgARAAIABBIGogAUEgahAAC3kAIAAgAUHotwMQEiAAQSBqIAFBIGpBiLgDEBIgACAAQSBqQai4AxAOIAEgAUEgakHIuAMQDkGouANByLgDQai4AxASQYi4A0HItwMgAhASQei3AyACIAIQDkHotwNBiLgDIAJBIGoQDkGouAMgAkEgaiACQSBqEA8LGwAgACABIAIQDiAAQSBqIAFBIGogAkEgahAOCxsAIAAgASACEA8gAEEgaiABQSBqIAJBIGoQDwsUACAAIAEQECAAQSBqIAFBIGoQEAsUACAAIAEQFCAAQSBqIAFBIGoQFAsUACAAIAEQFSAAQSBqIAFBIGoQFQsVACAAIAEQBCAAQSBqIAFBIGoQBHELaAAgACAAQei4AxASIABBIGogAEEgakGIuQMQEkGIuQNByLcDQai5AxASQei4A0GouQNBqLkDEA9BqLkDQci5AxAWIABByLkDIAEQEiAAQSBqQci5AyABQSBqEBIgAUEgaiABQSBqEBALCgAgAEGAAWoQRwsWACAAEEggAEHAAGoQSSAAQYABahBICyQAIAAgARBKIABBwABqIAFBwABqEEogAEGAAWogAUGAAWoQSgu8AgAgABBTBEAgACABEFUPCyAAIABB6LkDEEsgAEHAAGogAEHAAGpBqLoDEEtBqLoDQai6A0HougMQSyAAQai6A0GouwMQTEGouwNBqLsDQai7AxBLQai7A0HouQNBqLsDEE1BqLsDQei6A0GouwMQTUGouwNBqLsDQai7AxBMQei5A0HouQNB6LsDEExB6LsDQei5A0HouwMQTEHouwNB6LsDQai8AxBLIABBwABqIABBgAFqQei8AxBLQai7A0GouwMgARBMQai8AyABIAEQTUHougNB6LoDQai9AxBMQai9A0GovQNBqL0DEExBqL0DQai9A0GovQMQTEGouwMgASABQcAAahBNIAFBwABqQei7AyABQcAAahBLIAFBwABqQai9AyABQcAAahBNQei8A0HovAMgAUGAAWoQTAvvAwIBfwF/IABBgAFqIQMgAUGAAWohBCAAEFMEQCABIAIQVQ8LIAEQUwRAIAAgAhBVDwsgAyADQei9AxBLIAQgBEGovgMQSyAAQai+A0HovgMQSyABQei9A0GovwMQSyADQei9A0HovwMQSyAEQai+A0GowAMQSyAAQcAAakGowANB6MADEEsgAUHAAGpB6L8DQajBAxBLQei+A0GovwMQUQRAQejAA0GowQMQUQRAIAAgAhBWDwsLQai/A0HovgNB6MEDEE1BqMEDQejAA0GowgMQTUHowQNB6MEDQejCAxBMQejCA0HowgNB6MIDEEtB6MEDQejCA0GowwMQS0GowgNBqMIDQejDAxBMQei+A0HowgNB6MQDEEtB6MMDQejDA0GoxAMQS0HoxANB6MQDQajFAxBMQajEA0GowwMgAhBNIAJBqMUDIAIQTUHowANBqMMDQejFAxBLQejFA0HoxQNB6MUDEExB6MQDIAIgAkHAAGoQTSACQcAAakHowwMgAkHAAGoQSyACQcAAakHoxQMgAkHAAGoQTSADIAQgAkGAAWoQTCACQYABaiACQYABaiACQYABahBLIAJBgAFqQei9AyACQYABahBNIAJBgAFqQai+AyACQYABahBNIAJBgAFqQejBAyACQYABahBLCyQAIAAgARBKIABBwABqIAFBwABqEE4gAEGAAWogAUGAAWoQSgsQACABIAIQWCAAIAIgAhBXCyQAIAAgARBQIABBwABqIAFBwABqEFAgAEGAAWogAUGAAWoQUAskACAAIAEQTyAAQcAAaiABQcAAahBPIABBgAFqIAFBgAFqEE8LWgAgABBTBEAgARBUBSAAQYABakGoxgMQUkGoxgNBqMYDQejGAxBLQajGA0HoxgNBqMcDEEsgAEHoxgMgARBLIABBwABqQajHAyABQcAAahBLIAFBgAFqEEkLC7ACAgF/AX8gAEHoxwMQVSADEFQgAiEEAkADQCAEQQFrIQQgASAEai0AACEFIAMgAxBWIAVBgAFPBEAgBUGAAWshBUHoxwMgAyADEFcLIAMgAxBWIAVBwABPBEAgBUHAAGshBUHoxwMgAyADEFcLIAMgAxBWIAVBIE8EQCAFQSBrIQVB6McDIAMgAxBXCyADIAMQViAFQRBPBEAgBUEQayEFQejHAyADIAMQVwsgAyADEFYgBUEITwRAIAVBCGshBUHoxwMgAyADEFcLIAMgAxBWIAVBBE8EQCAFQQRrIQVB6McDIAMgAxBXCyADIAMQViAFQQJPBEAgBUECayEFQejHAyADIAMQVwsgAyADEFYgBUEBTwRAIAVBAWshBUHoxwMgAyADEFcLIARFDQEMAAsLCysCAX8BfyAAQQV2QQJ0IQFBASAAQR9xdCECIAEgASgCqMkGIAJyNgKoyQYLJAIBfwF/IABBBXZBAnQhAUEBIABBH3F0IQIgASgCqMkGIAJxC6YBBAF/AX8BfwF/IAAhAkGoyQMQVEEAIQQCQANAIAQgAUYNAUGoyQNBASAEdEHAAWxqIQMgAhBHIQUgAiADEEogAkHAAGohAiADQcAAaiEDIAIgAxBKIAJBwABqIQIgA0HAAGohAyAFBEAgAxBIBSADEEkLIARBAWohBAwACwtBqMkGQpeChIAQNwMAQbDJBkIBNwMAQbjJBkIBNwMAQcDJBkIANwMAC0EDAX8BfwF/QajJAyAAQcABbGohASAAEF9FBEAgAC0AyMkGEGEhAiAALQDIywYQYSEDIAIgAyABEFcgABBeCyABC6UBBAF/AX8BfgF+QQAhAwJAA0AgA0EgRg0BQgAhBkEAIQQCQANAIAQgAUYNASAAIARBIGwgA2pqMQAAIQUgBSAFQhyGhEKPgICA8AGDIQUgBSAFQg6GhEKDgIyAsIDAAYMhBSAFIAVCB4aEQoGChIiQoMCAAYMhBSAGIAUgBK2GhCEGIARBAWohBAwACwsgAiADQQhsaiAGNwMAIANBAWohAwwACwsLSwEBfyAAIAJByM0GEGIgAxBUIAEgAhBgQQAhBAJAA0AgBEGAAkYNASADIAMQViADQcfPBiAEay0AABBhIAMQVyAEQQFqIQQMAAsLC34EAX8BfwF/AX8gACEFIAEhBiAFIAIgA24gA2xBIGxqIQgCQANAIAUgCEYNASAFIAYgA0HIzwYQY0HIzwYgBCAEEFcgBUEgIANsaiEFIAZBgAEgA2xqIQYMAAsLIAIgA3AhByAHBEAgBSAGIAdByM8GEGNByM8GIAQgBBBXCwtOAgF/AX8gACACQYjRBhBiIAEgAhBgQQAhBAJAA0AgBEGAAkYNASADIARBwAFsaiEFIAVBh9MGIARrLQAAEGEgBRBXIARBAWohBAwACwsLKQEBf0EAIQICQANAIAIgAUYNASAAIAJBwAFsahBUIAJBAWohAgwACwsLSAIBfwF/IAAhBCAEIAIQVSAEQcABaiEEQQEhAwJAA0AgAyABRg0BIAIgAhBWIAQgAiACEFcgBEHAAWohBCADQQFqIQMMAAsLC4oBBAF/AX8BfwF/QYjTBkGAAhBmIAAhBSABIQYgBSACIANuIANsQSBsaiEIAkADQCAFIAhGDQEgBSAGIANBiNMGEGUgBUEgIANsaiEFIAZBgAEgA2xqIQYMAAsLIAIgA3AhByAHBEAgBSAGIAdBiNMGEGULQYjTBkGAAkGI0wkQZ0GI0wkgBCAEEFcLJAEBfyADIQQCQANAIAAgASACEBIgBEEBayEEIARFDQEMAAsLCyQBAX8gAyEEAkADQCAAIAEgAhATIARBAWshBCAERQ0BDAALCwsL/hsSAEEACwRIagIAAEEICyABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABB6AcLIEf9fNgWjCA8jcpxaJFqgZddWIGBtkVQuCmgMeFyTmQwAEGICAsgifqKU1v8LPP7AUXUERnntfZ/QQr/HqtHHzW4ynGf2AYAQagICyCdDY/FjUNd0z0Lx/Uo63gKLEZ5eG+jbmYv3weawXcKDgBByAgLIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEHoDQsgAQAA8JP14UORcLl5SOgzKF1YgYG2RVC4KaAx4XJOZDAAQYgOCyCnbSGuRea4G+NZXOOxOv5ThYC7Uz2DSYylRE5/sdAWAgBBqA4LIPv//08cNJasKc1gn5V2/DYuRnl4b6NuZi/fB5rBdwoOAEHIDgsgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQYjcAQuAAgAAAAIABAQGAAgICggMDAwAEBASEBQUFBAYGBgYGBgcACAgIiAkJCQgKCgoKCgoLCAwMDAwMDA0MDAwODA4ODgAQEBCQEREREBISEhISEhMQFBQUFBQUFRQUFBYUFhYWEBgYGBgYGBkYGBgaGBoaGhgYGBwYHBwcGBwcHBwcHB4AICAgoCEhISAiIiIiIiIjICQkJCQkJCUkJCQmJCYmJiAoKCgoKCgpKCgoKigqKiooKCgsKCwsLCgsLCwsLCwuIDAwMDAwMDEwMDAyMDIyMjAwMDQwNDQ0MDQ0NDQ0NDYwMDA4MDg4ODA4ODg4ODg6MDg4ODg4ODw4ODg8ODw8PAAQYjeAQuAAgAAAAEAAQIBAAECAQQBAgMAAQIBBAECAwgBAgMEBQYDAAECAQQBAgMIAQIDBAUGAxABAgMEBQYDCAkKAwwFBgcAAQIBBAECAwgBAgMEBQYDEAECAwQFBgMICQoDDAUGByABAgMEBQYDCAkKAwwFBgcQERIDFAUGBxgJCgsMDQ4HAAECAQQBAgMIAQIDBAUGAxABAgMEBQYDCAkKAwwFBgcgAQIDBAUGAwgJCgMMBQYHEBESAxQFBgcYCQoLDA0OB0ABAgMEBQYDCAkKAwwFBgcQERIDFAUGBxgJCgsMDQ4HICEiAyQFBgcoCQoLDA0OBzAREhMUFRYHGBkaCxwNDg8AQcilAwugB/v//08cNJasKc1gn5V2/DYuRnl4b6NuZi/fB5rBdwoOBgAAoHfBS5dno1jasnE38S4SCAlHouFR+sApR7HWWSKL79yelz11fyCRR7EsFz9fbmwJdHlisY3PCME5NXs3Kz98rbXiSq34voXLg//GYC33KZRdK/122anZmj/nfEAkA48vdHx9tvTMaNBj3C0baGpX+xvvvOWM/jy20lEpfBZkTFe/sfcUIvJ9MfcvI/kozXWtsKiEdeUDbRfcWfuBK0KecG6u8VG1znHA3RMpmJsOBYBC6VZzZO31B/wGuNMJgFNdsQYNFKuXWzG8zDovjE+ZBJIlN1l4NCbiWfDzshwAnKOeMZOPf4JXzPlZECV7fFP7zWe9g1asm6gYrsbsFzMECZKPksjJo/TZf6YBR9mLJ4/9+1Xmzt4OLRdwRY4VE6UgZnX5WZ2ZVwHqo0XnM2zdv2C/4paJx+I1twLvpiIudgBd/OlRSeWuZMGCrX128iJOQvGv4V+XE7D47etlI9kBPlZnQaSjJboMUrpemCwhbXCfkuALYy7ljTRjrYwPGmYZCIlu6JiUND20wnGJpQyvbkFNfcvYJ1nvfCLUBAERlgf+kG8TKjJxjFo7lZGQN1CWNzfy380mlBQCXqEpDNRyDoJMZGltDMJyc8g9YzCdm1pCQQw7VxcnCqB/QlgeELjTUZK0AZScwI809Zg83oOT1AeLGbXPYwx/RlvO7CngQ+GA5vdXj3vbSsX5Loork99rO4/jEMoAAl1nXrctKecj6qy4yOYv8R6NjwW1zvfwzRJ8H4QnUTCoubd9byIhzi1+AHOxdSTqeQVkX6otYtxn8e7Xdq71fylqiLEQ7iUzR54WRLPrASD4tYlq3XaJ3TQOTAP7n6IA4mGcFayzGX0R+krdZAdiV5Mti3GsHJG6+FYYISp3CMFg9aFV9WgXZIs6zEmo7UWQbqVH9LpafStbw6/v4Ua/Pkg47qP9/RfvaMRqvM7HsG9Jryf2s34eEapUzcyjkkpfuMOubR1HFMwGf4lFmV7tafi5x3bRxWN5uYLSR51EFtxVzV1/hyoj2h08y2o/HLkYoHNUZKTEngzfD2tkXfnp9i7EyNy6ei9uxcz31cVAdqfy89gf8xbnR/8w9Pae3HbbOE42ZfQcIrN9xQ6tQO/ha7dA7s7CGs1m0ftNi8+MHDB7M+wTiPEQuP45tsXHMpaZ8g8NQONcmNjssAEAiN2yKc6YbQ0HaR0AQeisAwugB/v//08cNJasKc1gn5V2/DYuRnl4b6NuZi/fB5rBdwoO/v//H9gUPHjdHo0Mby+Yr0VP/fySdF+PrL+cPRpjNx////8PbAoevG6PRoa3F8zXoqd+fkm6r0fWX84ejbGbDwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAQYi0AwuAAgCAQMAgoGDgEJBQ0DCwcPAIiEjIKKho6BiYWNg4uHj4BIRExCSkZOQUlFTUNLR09AyMTMwsrGzsHJxc3Dy8fPwCgkLCIqJi4hKSUtIysnLyCopKyiqqauoamlraOrp6+gaGRsYmpmbmFpZW1ja2dvYOjk7OLq5u7h6eXt4+vn7+AYFBwSGhYeERkVHRMbFx8QmJSckpqWnpGZlZ2Tm5efkFhUXFJaVl5RWVVdU1tXX1DY1NzS2tbe0dnV3dPb19/QODQ8Mjo2PjE5NT0zOzc/MLi0vLK6tr6xubW9s7u3v7B4dHxyenZ+cXl1fXN7d39w+PT88vr2/vH59f3z+/f/8AQci3Awsgqu/tEolIw2hPv6pyaH8IjTESCAlHouFR+sApR7HWWSIAQcjJBguAAgAAAAIABAQGAAgICggMDAwAEBASEBQUFBAYGBgYGBgcACAgIiAkJCQgKCgoKCgoLCAwMDAwMDA0MDAwODA4ODgAQEBCQEREREBISEhISEhMQFBQUFBQUFRQUFBYUFhYWEBgYGBgYGBkYGBgaGBoaGhgYGBwYHBwcGBwcHBwcHB4AICAgoCEhISAiIiIiIiIjICQkJCQkJCUkJCQmJCYmJiAoKCgoKCgpKCgoKigqKiooKCgsKCwsLCgsLCwsLCwuIDAwMDAwMDEwMDAyMDIyMjAwMDQwNDQ0MDQ0NDQ0NDYwMDA4MDg4ODA4ODg4ODg6MDg4ODg4ODw4ODg8ODw8PAAQcjLBguAAgAAAAEAAQIBAAECAQQBAgMAAQIBBAECAwgBAgMEBQYDAAECAQQBAgMIAQIDBAUGAxABAgMEBQYDCAkKAwwFBgcAAQIBBAECAwgBAgMEBQYDEAECAwQFBgMICQoDDAUGByABAgMEBQYDCAkKAwwFBgcQERIDFAUGBxgJCgsMDQ4HAAECAQQBAgMIAQIDBAUGAxABAgMEBQYDCAkKAwwFBgcgAQIDBAUGAwgJCgMMBQYHEBESAxQFBgcYCQoLDA0OB0ABAgMEBQYDCAkKAwwFBgcQERIDFAUGBxgJCgsMDQ4HICEiAyQFBgcoCQoLDA0OBzAREhMUFRYHGBkaCxwNDg8=","base64"),
  i = 1e3,
  n = 1768
}
)),
parcelRequire.register("cMZA5", (function(t, e) {
  t.exports = new URL(parcelRequire("4SSe9").resolve("5dDMi"),import.meta.url).toString()
}
)),
parcelRequire.register("6ZjrG", (function(t, e) {
  t.exports = import("./" + parcelRequire("4SSe9").resolve("6qCmB")).then((()=>parcelRequire("baGVQ")))
}
)),
parcelRequire.register("hZAGE", (function(t, e) {
  t.exports = new URL(parcelRequire("4SSe9").resolve("1UVP4"),import.meta.url).toString()
}
)),
parcelRequire.register("lsvJY", (function(t, e) {
  t.exports = new URL(parcelRequire("4SSe9").resolve("bxzJ1"),import.meta.url).toString()
}
));
//# sourceMappingURL=Application.da2d5786.js.map
