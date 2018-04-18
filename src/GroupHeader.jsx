import React from 'react';
import PropTypes from 'prop-types';
import CustomPropTypes from './util/propTypes';

function GroupHeader(props) {
  const {
    groupComponent: GroupComponent,
    label,
  } = props;
  return (
    <li
      className={props.className}
      id={props.id}
      role="separator"
      tabIndex="-1"
    >
      { GroupComponent ? <GroupComponent item={label} /> : label }
    </li>
  );
}

GroupHeader.propTypes = {
  className: PropTypes.string,
  groupComponent: CustomPropTypes.elementType,
  id: PropTypes.string,
  key: PropTypes.string,
  label: PropTypes.string,
};

export default GroupHeader;
