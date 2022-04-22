export default class Dotline {
  private opt: any
  private c: any
  private ctx: any
  private dotSum: any
  private radius: any
  private disMax: any
  private dots: any
  protected mousedot: any
  protected RAF: any
  constructor(props: any) {
    const _self = this
    _self.opt = {
      dom: props.dom,////画布id
      cw: props.cw,////画布宽
      ch: props.ch,////画布高
      ds: props.ds,////点的个数
      r: props.r,////圆点半径
      dis: props.dis,////触发连线的距离,
    }

    _self.c = document.getElementById(_self.opt.dom);//canvas元素id
    _self.ctx = _self.c.getContext('2d');
    _self.c.width = _self.opt.cw;//canvas宽
    _self.c.height = _self.opt.ch;//canvas高
    _self.dotSum = _self.opt.ds;//点的数量
    _self.radius = _self.opt.r;//圆点的半径
    _self.disMax = _self.opt.dis * _self.opt.dis;//点与点触发连线的间距		
    _self.dots = [];
    _self.mousedot = { x: null, y: null, label: 'mouse' }

    _self.c.onmousemove = function (e) {
      // debugger
      e = e || window.event;
      // debugger
      _self.mousedot.x = e.clientX - _self.c.offsetLeft;
      _self.mousedot.y = e.clientY - _self.c.offsetTop;
    };
    _self.c.onmouseout = function (e) {
      // debugger
      _self.mousedot.x = null;
      _self.mousedot.y = null;
    }
    // debugger
    //@ts-ignore
    _self.RAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  }

  extend(o, e) {
    for (let key in e) {
      if (e[key]) {
        o[key] = e[key]
      }
    }
    return o;
  }

  addDots() {
    for (let i = 0; i < this.dotSum; i++) {//参数
      const dot = {
        x: Math.floor(Math.random() * this.c.width) - this.radius,
        y: Math.floor(Math.random() * this.c.height) - this.radius,
        ax: (Math.random() * 2 - 1) / 1.5,
        ay: (Math.random() * 2 - 1) / 1.5
      }
      this.dots.push(dot);
    }
  }
  move(dot) {
    dot.x += dot.ax;
    dot.y += dot.ay;
    //点碰到边缘返回
    dot.ax *= (dot.x > (this.c.width - this.radius) || dot.x < this.radius) ? -1 : 1;
    dot.ay *= (dot.y > (this.c.height - this.radius) || dot.y < this.radius) ? -1 : 1;
    //绘制点
    this.ctx.beginPath();
    this.ctx.arc(dot.x, dot.y, this.radius, 0, Math.PI * 2, true);
    this.ctx.lineWidth = 11;
    this.ctx.strokeStyle = 'red';
    this.ctx.fillStyle = "red";
    // console.log(road)
    this.ctx.stroke();
  }

  drawLine(dots) {
    let nowDot;
    let _that = this;
    //自己的思路：遍历两次所有的点，比较点之间的距离，函数的触发放在animate里
    this.dots.forEach(function (dot) {

      _that.move(dot);
      for (let j = 0; j < dots.length; j++) {
        nowDot = dots[j];
        if (nowDot === dot || nowDot.x === null || nowDot.y === null) continue;//continue跳出当前循环开始新的循环
        let dx = dot.x - nowDot.x,//别的点坐标减当前点坐标
          dy = dot.y - nowDot.y;
        let dc = dx * dx + dy * dy;
        if (Math.sqrt(dc) > Math.sqrt(_that.disMax)) continue;
        // 如果是鼠标，则让粒子向鼠标的位置移动
        if (nowDot.label && Math.sqrt(dc) > Math.sqrt(_that.disMax) / 2) {
          dot.x -= dx * 1;
          dot.y -= dy * 1;
        }
        let ratio;
        ratio = (_that.disMax - dc) / _that.disMax;

        _that.ctx.beginPath();
        // _that.ctx.lineWidth = ratio / 2;
        _that.ctx.lineWidth = 3;
        _that.ctx.strokeStyle = 'rgba(255,255,255,' + (ratio + 0.2) + ')';
        _that.ctx.moveTo(dot.x, dot.y);
        _that.ctx.lineTo(nowDot.x, nowDot.y);
        _that.ctx.stroke();//不描边看不出效果

      }
    });
  }
  start() {
    const _that = this;
    _that.addDots();
    setTimeout(function () {
      _that.animate();
    }, 100);
  }


  animate() {
    const _that = this;
    _that.ctx.clearRect(0, 0, _that.c.width, _that.c.height);
    _that.drawLine([_that.mousedot].concat(_that.dots));
    // _that.RAF(_that.animate);
    setTimeout(function () {
      _that.animate();
    }, 16);
  }
}