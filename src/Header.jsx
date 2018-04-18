import React from 'react';
import PropTypes from 'prop-types';
import Btn from './WidgetButton';

export default React.createClass({
  displayName: 'Header',
  propTypes: {
    label:          PropTypes.string.isRequired,
    labelId:        PropTypes.string,

    upDisabled:     PropTypes.bool.isRequired,
    prevDisabled:   PropTypes.bool.isRequired,
    nextDisabled:   PropTypes.bool.isRequired,
    onViewChange:   PropTypes.func.isRequired,
    onMoveLeft:     PropTypes.func.isRequired,
    onMoveRight:    PropTypes.func.isRequired,

    messages:       PropTypes.shape({
      moveBack:     PropTypes.string,
      moveForward:  PropTypes.string
    })
  },

  mixins: [
    require('./mixins/PureRenderMixin'),
    require('./mixins/RtlChildContextMixin')
  ],

  getDefaultProps(){
    return {
      messages: {
        moveBack:     'navigate back',
        moveForward:  'navigate forward'
      }
    }
  },

  render(){
    let {
        messages, label, labelId
      , onMoveRight, onMoveLeft, onViewChange
      , prevDisabled, upDisabled, nextDisabled } = this.props;

    let rtl = this.isRtl();

    return (
      <div className='rw-header'>
        <Btn className="rw-btn-left"
          tabIndex='-1'
          onClick={onMoveLeft}
          disabled={prevDisabled}
          aria-disabled={prevDisabled}
          aria-label={messages.moveBack}
          title={messages.moveBack}
        >
          <i aria-hidden='false'
            className={'rw-i rw-i-caret-' + (rtl ? 'right' : 'left')}
          />
        </Btn>
        <Btn
          id={labelId}
          tabIndex='-1'
          className="rw-btn-view"
          disabled={upDisabled}
          aria-disabled={upDisabled}
          aria-live="polite"
          aria-atomic="true"
          onClick={onViewChange}
        >
          { label }
        </Btn>
        <Btn className="rw-btn-right"
          tabIndex='-1'
          onClick={onMoveRight}
          disabled={nextDisabled}
          title={messages.moveForward}
          aria-label={messages.moveForward}
          aria-disabled={nextDisabled}
        >
          <i aria-hidden='false'
            className={'rw-i rw-i-caret-' + (rtl ? 'left' : 'right')}
          />
        </Btn>
      </div>
    )
  }
})
