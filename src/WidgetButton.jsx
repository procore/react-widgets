import React from 'react';
import createReactClass from 'create-react-class';
import cn from 'classnames';

export default createReactClass({

  render(){
    var { className, children, ...props} = this.props;

    return (
      <button {...props} type='button' className={cn(className, 'rw-btn')}>
        { children }
      </button>
    )
  }
})
