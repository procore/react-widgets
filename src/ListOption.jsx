import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import createReactClass from 'create-react-class';

let ListOption = createReactClass({
  propTypes: {
    dataItem: PropTypes.any,
    focused:  PropTypes.bool,
    selected: PropTypes.bool
  },

  render() {
    let { className, children, focused, selected, ...props } = this.props;
    let classes = {
      'rw-state-focus':    focused,
      'rw-state-selected': selected
    };

    return (
      <li
        role='option'
        tabIndex='-1'
        aria-selected={!!selected}
        className={cn('rw-list-option', className, classes)}
        {...props}
      >
        {children}
      </li>
    );
  }
});

export default ListOption;
