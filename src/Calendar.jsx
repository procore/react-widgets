import React    from 'react';
import PropTypes from 'prop-types';
import cx       from 'classnames';
import createReactClass from 'create-react-class';
import compat   from './util/compat';
import Header   from './Header';
import Footer   from './Footer';
import Month    from './Month';
import Year     from './Year';
import Decade   from './Decade';
import Century  from './Century';
import { date as dateLocalizer } from './util/localizers';
import CustomPropTypes from './util/propTypes';
import createUncontrolledWidget from 'uncontrollable';
import SlideTransition from './SlideTransition';
import dates from './util/dates';
import constants from './util/constants';
import _ from './util/_'; //values, omit
import { instanceId, notify } from './util/widgetHelpers';
import { widgetEditable, widgetEnabled } from './util/interaction';

let dir    = constants.directions
  , values = obj => Object.keys(obj).map( k => obj[k] )
  , invert = obj => _.transform(obj, (o, val, key) => { o[val] = key }, {});

let views        = constants.calendarViews
  , VIEW_OPTIONS = values(views)
  , ALT_VIEW     = invert(constants.calendarViewHierarchy)
  , NEXT_VIEW    = constants.calendarViewHierarchy
  , VIEW_UNIT    = constants.calendarViewUnits
  , VIEW  = {
      [views.MONTH]:   Month,
      [views.YEAR]:    Year,
      [views.DECADE]:  Decade,
      [views.CENTURY]: Century
    };

let ARROWS_TO_DIRECTION = {
  ArrowDown:  dir.DOWN,
  ArrowUp:    dir.UP,
  ArrowRight: dir.RIGHT,
  ArrowLeft:  dir.LEFT
}

let OPPOSITE_DIRECTION = {
  [dir.LEFT]:  dir.RIGHT,
  [dir.RIGHT]: dir.LEFT
};

let MULTIPLIER = {
      [views.YEAR]:    1,
      [views.DECADE]:  10,
      [views.CENTURY]: 100
    };

let format = (props, f) => dateLocalizer.getFormat(f, props[f + 'Format'])


let propTypes = {

  disabled:       CustomPropTypes.disabled,
  readOnly:       CustomPropTypes.readOnly,

  onChange:      PropTypes.func,
  value:         PropTypes.instanceOf(Date),

  min:           PropTypes.instanceOf(Date),
  max:           PropTypes.instanceOf(Date),

  initialView:   PropTypes.oneOf(VIEW_OPTIONS),

  finalView(props, propname, componentName){
    var err = PropTypes.oneOf(VIEW_OPTIONS)(props, propname, componentName)

    if (err) return err
    if (VIEW_OPTIONS.indexOf(props[propname]) < VIEW_OPTIONS.indexOf(props.initialView))
      return new Error(`The \`${propname}\` prop: \`${props[propname]}\` cannot be 'lower' than the \`initialView\`
        prop. This creates a range that cannot be rendered.`.replace(/\n\t/g, ''))
  },

  culture:       PropTypes.string,

  footer:        PropTypes.bool,

  dayComponent:  CustomPropTypes.elementType,
  headerFormat:  CustomPropTypes.dateFormat,
  footerFormat:  CustomPropTypes.dateFormat,

  dayFormat:     CustomPropTypes.dateFormat,
  dateFormat:    CustomPropTypes.dateFormat,
  monthFormat:   CustomPropTypes.dateFormat,
  yearFormat:    CustomPropTypes.dateFormat,
  decadeFormat:  CustomPropTypes.dateFormat,
  centuryFormat: CustomPropTypes.dateFormat,

  messages:      PropTypes.shape({
    moveBack:     PropTypes.string,
    moveForward:  PropTypes.string
  })
}

let Calendar = createReactClass({

  displayName: 'Calendar',

  mixins: [
    require('./mixins/TimeoutMixin'),
    require('./mixins/PureRenderMixin'),
    require('./mixins/RtlParentContextMixin'),
    require('./mixins/AriaDescendantMixin')()
  ],

  propTypes,

  getInitialState(){
    var value = this.inRangeValue(this.props.value);

    return {
      selectedIndex: 0,
      view:          this.props.initialView || 'month',
      currentDate:   value ? new Date(value) : this.inRangeValue(new Date())
    }
  },

  getDefaultProps(){
    return {

      value:        null,
      min:          new Date(1900, 0, 1),
      max:          new Date(2099, 11, 31),

      initialView:  'month',
      finalView:    'century',

      tabIndex:     '0',
      footer:        false,

      ariaActiveDescendantKey: 'calendar',
      messages: msgs({})
    }
  },

  componentWillReceiveProps(nextProps) {
    var bottom  = VIEW_OPTIONS.indexOf(nextProps.initialView)
      , top     = VIEW_OPTIONS.indexOf(nextProps.finalView)
      , current = VIEW_OPTIONS.indexOf(this.state.view)
      , view    = this.state.view
      , val     = this.inRangeValue(nextProps.value);

    if( current < bottom )
      this.setState({ view: view = nextProps.initialView })
    else if (current > top)
      this.setState({ view: view = nextProps.finalView })

    //if the value changes reset views to the new one
    if ( !dates.eq(val, dateOrNull(this.props.value), VIEW_UNIT[view]))
      this.setState({
        currentDate: val ? new Date(val) : new Date()
      })
  },

  render() {

    let {
        className, value, footerFormat
      , disabled, readOnly, finalView, footer
      , messages, min, max, culture, duration } = this.props

    let { view, currentDate, slideDirection, focused } = this.state;

    var View = VIEW[view]
      , unit = VIEW_UNIT[view]
      , todaysDate = new Date()
      , todayNotInRange = !dates.inRange(todaysDate, min, max, view)

    unit = unit === 'day' ? 'date' : unit

    let viewID = instanceId(this, '_calendar')
      , labelID = instanceId(this, '_calendar_label')
      , key = view + '_' + dates[view](currentDate);

    let elementProps = _.omit(this.props, Object.keys(propTypes))
      , viewProps  = _.pick(this.props, Object.keys(View.propTypes))

    let isDisabled = disabled || readOnly

    messages = msgs(this.props.messages)

    return (
      <div {...elementProps}
        role='group'
        onKeyDown={this._keyDown}
        onFocus={this._focus.bind(null, true)}
        onBlur ={this._focus.bind(null, false)}
        className={cx(className, 'rw-calendar', 'rw-widget', {
          'rw-state-focus':    focused,
          'rw-state-disabled': disabled,
          'rw-state-readonly': readOnly,
          'rw-rtl':            this.isRtl()
        })}
      >
        <Header
          label={this._label()}
          labelId={labelID}
          messages={messages}
          upDisabled={  isDisabled || view === finalView}
          prevDisabled={isDisabled || !dates.inRange(this.nextDate(dir.LEFT), min, max, view)}
          nextDisabled={isDisabled || !dates.inRange(this.nextDate(dir.RIGHT), min, max, view)}
          onViewChange={this.navigate.bind(null, dir.UP, null)}
          onMoveLeft ={this.navigate.bind(null,  dir.LEFT, null)}
          onMoveRight={this.navigate.bind(null,  dir.RIGHT, null)}
        />
        <SlideTransition
          ref={(ref) => this.animationRef = ref}
          duration={duration}
          direction={slideDirection}
          onAnimate={() => focused && this.focus()}
        >
          <View {...viewProps}
            tabIndex='-1'
            key={key}
            id={viewID}
            className='rw-calendar-grid'
            aria-labelledby={labelID}
            today={todaysDate}
            value={value}
            focused={currentDate}
            onChange={this.change}
            onKeyDown={this._keyDown}
            ariaActiveDescendantKey='calendarView'
          />
        </SlideTransition>
        { footer &&
          <Footer
            value={todaysDate}
            format={footerFormat}
            culture={culture}
            disabled={disabled || todayNotInRange}
            readOnly={readOnly}
            onClick={this.select}
          />
        }
      </div>
    )
  },

  @widgetEditable
  navigate(direction, date){
    var view     =  this.state.view
      , slideDir = (direction === dir.LEFT || direction === dir.UP)
          ? 'right'
          : 'left';

    if ( !date )
      date = [ dir.LEFT, dir.RIGHT ].indexOf(direction) !== -1
        ? this.nextDate(direction)
        : this.state.currentDate

    if (direction === dir.DOWN )
      view = ALT_VIEW[view] || view

    if (direction === dir.UP )
      view = NEXT_VIEW[view] || view

    if ( this.isValidView(view) && dates.inRange(date, this.props.min, this.props.max, view)) {
      notify(this.props.onNavigate, [date, slideDir, view])
      this.focus(true);

      this.setState({
        currentDate:    date,
        slideDirection: slideDir,
        view: view
      })
    }
  },

  focus() {
    if (+this.props.tabIndex > -1)
      compat.findDOMNode(this).focus()

    //console.log(document.activeElement)
  },

  @widgetEnabled
  _focus(focused, e){
    if ( +this.props.tabIndex === -1)
      return

    this.setTimeout('focus', () => {
      if( focused !== this.state.focused){
        notify(this.props[focused ? 'onFocus' : 'onBlur'], e)
        this.setState({ focused })
      }
    })
  },

  @widgetEditable
  change(date){
    if (this.state.view === this.props.initialView){
      notify(this.props.onChange, date)
      this.focus();
      return;
    }

    this.navigate(dir.DOWN, date)
  },

  @widgetEditable
  select(date){
    var view = this.props.initialView
      , slideDir = view !== this.state.view || dates.gt(date, this.state.currentDate)
          ? 'left' // move down to a the view
          : 'right';

    notify(this.props.onChange, date)

    if ( this.isValidView(view) && dates.inRange(date, this.props.min, this.props.max, view)) {
      this.focus();

      this.setState({
        currentDate:    date,
        slideDirection: slideDir,
        view: view
      })
    }
  },

  nextDate(direction){
    var method = direction === dir.LEFT ? 'subtract' : 'add'
      , view   = this.state.view
      , unit   = view === views.MONTH ? view : views.YEAR
      , multi  = MULTIPLIER[view] || 1;

    return dates[method](this.state.currentDate, 1 * multi, unit)
  },

   @widgetEditable
  _keyDown(e){
    var ctrl = e.ctrlKey
      , key  = e.key
      , direction = ARROWS_TO_DIRECTION[key]
      , current = this.state.currentDate
      , view = this.state.view
      , unit = VIEW_UNIT[view]
      , currentDate = current;

    if ( key === 'Enter'){
      e.preventDefault()
      return this.change(current)
    }

    if ( direction ) {
      if ( ctrl ) {
        e.preventDefault()
        this.navigate(direction)
      }
      else {
        if ( this.isRtl() && OPPOSITE_DIRECTION[direction] )
          direction = OPPOSITE_DIRECTION[direction]

        currentDate = dates.move(currentDate, this.props.min, this.props.max, view, direction)

        if (!dates.eq(current, currentDate, unit)) {
          e.preventDefault()

          if ( dates.gt(currentDate, current, view))
            this.navigate(dir.RIGHT, currentDate)

          else if ( dates.lt(currentDate, current, view))
            this.navigate(dir.LEFT, currentDate)

          else
            this.setState({ currentDate })
        }
      }
    }

    notify(this.props.onKeyDown, [e])
  },

  _label() {
    var {
        culture
      , ...props } = this.props
      , view = this.state.view
      , dt   = this.state.currentDate;

    if ( view === 'month')
      return dateLocalizer.format(dt, format(props, 'header'), culture)

    else if ( view === 'year')
      return dateLocalizer.format(dt, format(props, 'year'), culture)

    else if ( view === 'decade')
      return dateLocalizer.format(dates.startOf(dt, 'decade'), format(props, 'decade'), culture)

    else if ( view === 'century')
      return dateLocalizer.format(dates.startOf(dt, 'century'), format(props, 'century'), culture)
  },

  inRangeValue(_value){
    var value = dateOrNull(_value)

    if( value === null) return value

    return dates.max(
        dates.min(value, this.props.max)
      , this.props.min)
  },

  isValidView(next) {
    var bottom  = VIEW_OPTIONS.indexOf(this.props.initialView)
      , top     = VIEW_OPTIONS.indexOf(this.props.finalView)
      , current = VIEW_OPTIONS.indexOf(next);

    return current >= bottom && current <= top
  }
});

function dateOrNull(dt){
  if(dt && !isNaN(dt.getTime())) return dt
  return null
}

function msgs(msgs){
  return {
    moveBack:     'navigate back',
    moveForward:  'navigate forward',
    ...msgs
  }
}


export default createUncontrolledWidget(
    Calendar, { value: 'onChange' });
