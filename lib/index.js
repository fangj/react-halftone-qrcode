"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _dither = require("./lib/dither");

var _dither2 = _interopRequireDefault(_dither);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var qrcode = require("./lib/qrcode");
var halftoneQR = require("./lib/halftoneQR");

var HalftoneQRCode = function (_React$Component) {
  _inherits(HalftoneQRCode, _React$Component);

  function HalftoneQRCode(props) {
    _classCallCheck(this, HalftoneQRCode);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(HalftoneQRCode).call(this, props));
  }

  _createClass(HalftoneQRCode, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.update();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.update();
    }
  }, {
    key: "update",
    value: function update() {
      var _this2 = this;

      var _props = this.props;
      var src = _props.src;
      var text = _props.text;
      var colorLight = _props.colorLight;
      var colorDark = _props.colorDark;

      var img = new Image();
      img.src = src;
      img.onload = function () {
        var c = _this2.refs.canvas;
        var ctx = c.getContext("2d");
        ctx.fillStyle = "#808080";
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.drawImage(img, 0, 0, c.width, c.height);
        var imageData = ctx.getImageData(0, 0, c.width, c.height);
        imageData = (0, _dither2.default)(imageData);
        ctx.putImageData(imageData, 0, 0);

        var qr = qrcode(6, "H");
        qr.addData(text);
        qr.make();

        var controls = qrcode(6, "H");
        controls.addData(text);
        controls.make(true);

        var halftoneQRArray = halftoneQR(qr.returnByteArray(), controls.returnByteArray());

        var qrc = drawArrayToCanvas(halftoneQRArray, colorLight, colorDark);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(qrc, 0, 0, c.width, c.height);
      };
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement("canvas", { ref: "canvas",
        height: this.props.size,
        width: this.props.size });
    }
  }]);

  return HalftoneQRCode;
}(_react2.default.Component);

HalftoneQRCode.propTypes = {
  text: _react2.default.PropTypes.string.isRequired,
  src: _react2.default.PropTypes.string.isRequired,
  size: _react2.default.PropTypes.number,
  pixelSize: _react2.default.PropTypes.number,
  level: _react2.default.PropTypes.oneOf(['L', 'M', 'Q', 'H']),
  colorLight: _react2.default.PropTypes.string,
  colorDark: _react2.default.PropTypes.string
};
HalftoneQRCode.defaultProps = {
  pixelSize: 2,
  size: 246,
  level: "H",
  colorLight: "#FFFFFF",
  colorDark: "#000000"
};

function drawArrayToCanvas(arr, colorLight, colorDark) {
  var c = document.createElement('canvas');
  var size = arr.length;
  c.setAttribute('width', size);
  c.setAttribute('height', size);
  var ctx = c.getContext("2d");
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length; j++) {
      if (arr[i][j] === undefined) {
        continue;
      }
      if (arr[i][j] === true) {
        ctx.fillStyle = colorDark;
      } else {
        ctx.fillStyle = colorLight;
      }
      ctx.fillRect(i, j, 1, 1);
    }
  }
  return c;
}
module.exports = HalftoneQRCode;