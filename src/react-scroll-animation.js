import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Radium, {StyleRoot} from 'radium';

const Animate = require('react-animations');

const ScrollAnimation = props => {
  const {
    time,
    animateIn,
    animateOut,
    offset,
    scrollParent,
    children,
    style
  } = props;

  const [appeared, setAppeared] = useState(false);
  const [visibleIn, setVisibleIn] = useState(false);
  const [visibleOut, setVisibleOut] = useState(false);
  let historyClientBottom = 0;

  const contentRefs = React.createRef();
  // 获取滚动盒子
  const boxContent = scrollParent || window;

  // 计算该元素距离顶部高度
  let contentOffsetTop = 0;
  const addOffsetTop = e => {
    if (e.offsetParent && e.offsetParent.offsetTop) {
      contentOffsetTop += e.offsetParent.offsetTop;
    }
    if (e.offsetParent.offsetParent) addOffsetTop(e.offsetParent);
  };

  useEffect(() => {
    // 初始状态
    if (contentRefs.current) {
      contentOffsetTop = contentRefs.current.offsetTop;
      if (contentRefs.current.offsetParent) addOffsetTop(contentRefs.current);
      // 如果元素距离顶部距离小于窗口大小 在当前可视范围内
      if (contentOffsetTop < boxContent.clientHeight) setVisibleIn(true);
    }
  }, []);

  // 监听滚动事件
  boxContent.addEventListener('scroll', () => {
    if (!contentRefs.current) return;

    contentOffsetTop = contentRefs.current.offsetTop;
    if (contentRefs.current.offsetParent) addOffsetTop(contentRefs.current);

    const contentHeight = contentRefs.current.clientHeight;

    const boxScrollTop = scrollParent
      ? boxContent.scrollTop
      : document.documentElement.scrollTop;
    const documentHeight = scrollParent
      ? boxContent.clientHeight
      : document.documentElement.clientHeight;

    // 计算当前元素距离浏览器底部的距离
    const clientBottom =
      documentHeight - (contentOffsetTop - boxScrollTop) - contentHeight;

    // 进入
    const visibleInStatus = clientBottom > 0 && clientBottom >= offset;
    if (!appeared && visibleInStatus !== visibleIn) {
      setVisibleIn(visibleInStatus);
      setVisibleOut(false);
      if (!appeared) setAppeared(true);
    }

    // appeared  进去之后往下滑 保持显示
    // appeared： 是否出现过 消失后 作为没出现过
    if (clientBottom < -contentHeight) {
      setAppeared(false);
      setVisibleOut(false);
      setVisibleIn(false);
    }

    // 淡出
    const visibleOutStatus =
      clientBottom > 0 &&
      clientBottom < offset &&
      clientBottom < historyClientBottom;
    if (animateOut && appeared && visibleOutStatus !== visibleOut) {
      setVisibleOut(visibleOutStatus);
      setAppeared(false);
      setTimeout(() => {
        setVisibleOut(false);
        setAppeared(false);
      }, time * 1000 - 100);
    }

    historyClientBottom = clientBottom;
  });

  return (
    <div style={style} ref={contentRefs}>
      <StyleRoot>
        <div
          className="test"
          style={(() => {
            if (visibleIn) {
              return {
                animation: `x ${time}s`,
                animationName: Radium.keyframes(Animate[animateIn], animateIn)
              };
            }
            if (visibleOut) {
              return {
                animation: `x ${time}s`,
                animationName: Radium.keyframes(Animate[animateOut], animateOut)
              };
            }
          })()}
        >
          <div
            style={{
              visibility:
                visibleIn || visibleOut || appeared ? 'visible' : 'hidden'
            }}
          >
            {children}
          </div>
        </div>
      </StyleRoot>
    </div>
  );
};

export default ScrollAnimation;

ScrollAnimation.defaultProps = {
  animateIn: 'slideInUp',
  animateOut: null,
  time: 1,
  offset: 100,
  scrollParent: null,
  children: null,
  style: {}
};

ScrollAnimation.propTypes = {
  animateIn: PropTypes.string,
  animateOut: PropTypes.string,
  time: PropTypes.number,
  offset: PropTypes.number,
  scrollParent: PropTypes.instanceOf(Element),
  children: PropTypes.element,
  style: PropTypes.object
};
