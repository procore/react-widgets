'use strict';

module.exports = function(widgetName){
var code =
`
var ${widgetName} = ReactWidgets.${widgetName}
  , TetheredPopup = ReactWidgets.TetheredPopup
  , colors = ['orange', 'red', 'blue', 'purple'];

var Example = React.createClass({


  render() {
    return (
    	<span>
    		<${widgetName}
    			data={colors}
    			popupComponent={TetheredPopup}
    			popupClassName='tether-className-prop'
    			/>
    		<${widgetName}
    			data={colors}
          filter="contains"
    			popupComponent={TetheredPopup}
    			popupClassName='tether-className-prop'
    			/>
    	</span>
    )
  }
});

ReactDOM.render(<Example/>, mountNode);`

return code
}
