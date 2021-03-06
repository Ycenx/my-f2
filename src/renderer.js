/**
 * f2 专为适配微信小程序绘图上下文 context 而封装的伪 Canvas
 * @authors (sima.zhang1990@gmail.com)
 * @version 1.0.0
 */

const CAPITALIZED_ATTRS_MAP = {
  fillStyle: 'FillStyle',
  fontSize: 'FontSize',
  globalAlpha: 'GlobalAlpha',
  opacity: 'GlobalAlpha',
  lineCap: 'LineCap',
  lineJoin: 'LineJoin',
  lineWidth: 'LineWidth',
  miterLimit: 'MiterLimit',
  strokeStyle: 'StrokeStyle',
  textAlign: 'TextAlign',
  textBaseline: 'TextBaseline'
};

class Renderer {
  constructor(myCtx) {
    const self = this;
    self.ctx = myCtx;
    self.style = {}; // just mock
    self._initContext(myCtx);
  }

  getContext(type) {
    if (type === '2d') {
      return this.ctx;
    }
  }

  _initContext(myCtx) {
    Object.keys(CAPITALIZED_ATTRS_MAP).map(key => {
      Object.defineProperty(myCtx, key, {
        set(value) {
          const name = 'set' + CAPITALIZED_ATTRS_MAP[key];
          myCtx[name](value);
        }
      });
      return key;
    });
  }
}

module.exports = Renderer;
