import React, { cloneElement } from 'react';
import css from 'dom-helpers/style';
import getHeight from 'dom-helpers/query/height';
import config from './util/configuration';
import cn from 'classnames';
import compat from './util/compat';
import TetherTarget from './TetherTarget';
import { isFunction } from './util/_';

var transform = config.animate.transform

function properties(prop, value){
  var TRANSLATION_MAP = config.animate.TRANSLATION_MAP

  if( TRANSLATION_MAP && TRANSLATION_MAP[prop])
    return { [transform]: `${TRANSLATION_MAP[prop]}(${value})` }

  return { [prop]: value }
}

var PopupContent = React.createClass({
  render: function(){
    const props = this.props;
    var child = props.children;

    if ( !child ) return <span className='rw-popup rw-widget' />

    child = React.Children.only(props.children);

    return cloneElement(child, {
      ... props,
      className: cn(this.props.className, child.props.className, 'rw-popup rw-widget')
    });
  }
})


module.exports = React.createClass({

  displayName: 'TetheredPopup',

  propTypes: {
    open:           React.PropTypes.bool,
    dropUp:         React.PropTypes.bool,
    duration:       React.PropTypes.number,

    onRequestClose: React.PropTypes.func.isRequired,
    onClosing:      React.PropTypes.func,
    onOpening:      React.PropTypes.func,
    onClose:        React.PropTypes.func,
    onOpen:         React.PropTypes.func,
    onKeyDown:      React.PropTypes.func,
    dropDownHeight: React.PropTypes.number,
  },

  getDefaultProps(){
    return {
      duration:    200,
      open:        false,
      onClosing:   function(){},
      onOpening:   function(){},
      onClose:     function(){},
      onOpen:      function(){}
    }
  },

  getInitialState(){
    return {
      width: 'auto',
    }
  },

  // componentDidMount(){
  //   !this.props.open && this.close(0)
  // },
  componentWillMount(){
    !this.props.open && (this._initialPosition = true)
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      contentChanged: childKey(nextProps.children) !== childKey(this.props.children)
    })
  },

  componentDidMount(){
    const { placeholder } = this.refs;

    const placeholderEl = compat.findDOMNode(placeholder);
    if(!placeholder) return null;
    const width = placeholderEl.offsetWidth;

    this.setState({ width });
  },

  componentDidUpdate(pvProps){
    var closing =  pvProps.open && !this.props.open
      , opening = !pvProps.open && this.props.open

    const { placeholder } = this.refs;

    const placeholderEl = compat.findDOMNode(placeholder);

    if (!placeholderEl) return null;

    const width = placeholderEl.offsetWidth;

    if(width !== this.state.width) this.setState({ width });
    else if (opening) this.open();
    else if (closing) this.close();
  },

  render() {
    var {
        className
      , open
      , dropUp
      , style: propStyle
      , onBlur
      , ...props } = this.props;

    const opacity = open ? 1 : 0;
    const pointerEvents = open ? 'all' : 'none';
    const { width } = this.state;

    if (!open) return null;

    return (
      <div {...props}
        style={{
          ... propStyle
        }}
        className={cn(className, 'rw-popup-container', 'rw-tether', { 'rw-dropup': dropUp })}
      >
        <TetherTarget
          tether={
            <PopupContent className={className} tabIndex={1} ref='content' style={{ width, opacity, pointerEvents  }}>
              { this.props.children }
            </PopupContent>
          }
          options={{
            attachment: 'bottom right',
            classes: {
              element: 'rw-popup-tether-element'
            }
          }}
          >
          {open && <div className='rw-tether-scrim' onClick={onBlur}/>}
          <div ref='placeholder' style={{ width: '100%'}} />
        </TetherTarget>
      </div>
    )
  },

  onResize(){

    const { placeholder } = this.refs;

    if(!placeholder) return false;

    const el = compat.findDOMNode(placeholder);
    const width = el.offsetWidth;

    if(width !== this.state.width) this.setState({ width });
  },



  reset(){
    var container = compat.findDOMNode(this)
      , content   = compat.findDOMNode(this.refs.content)
      , style = { display: 'block', overflow: 'hidden'}

    css(container, style);
    css(content, properties('opacity', 0))
  },


  open() {
    const { content } = this.refs;
    var self = this
      , anim = compat.findDOMNode(this)
      , contentEl   = compat.findDOMNode(content);

    const { onOpen, onKeyDown, getTetherFocus } = this.props;

    let focusComponent = content;
    let focusEl;

    if(isFunction(getTetherFocus)) focusComponent = getTetherFocus();
    if(focusComponent) focusEl = compat.findDOMNode(focusComponent);

    this._isOpening = true

    if (this._initialPosition) {
      this._initialPosition = false
      this.reset();
    }

    this.props.onOpening();

    anim.className += ' rw-popup-animating'

    config.animate(contentEl
      , { opacity: 1 }
      , self.props.duration
      , 'ease'
      , () => {
          if ( !self._isOpening ) return;

          anim.className = anim.className.replace(/ ?rw-popup-animating/g, '')
          anim.style.overflofw = 'visible';

          if (onOpen) onOpen();

          if (!focusEl) return false;

          focusEl.addEventListener('keydown', onKeyDown);
          focusEl.focus();
      })
  },

  close(dur) {
    var self = this
      , el   = compat.findDOMNode(this.refs.content)
      , anim = compat.findDOMNode(this);

    this._isOpening = false;
    this.props.onClosing();

    anim.style.overflow = 'hidden';
    anim.className += ' rw-popup-animating';

    config.animate(el
      , { opacity: 0 }
      , dur === undefined ? this.props.duration : dur
      , 'ease'
      , function() {
          if ( self._isOpening ) return
          anim.className = anim.className.replace(/ ?rw-popup-animating/g, '')
          self.props.onClose()
        })
  }

})


function childKey(children){
  var nextChildMapping = React.Children.map(children, c => c );
  for(var key in nextChildMapping) return key
}
