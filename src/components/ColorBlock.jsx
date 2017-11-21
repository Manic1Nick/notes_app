var React = require('react');

require('./ColorBlock.css');

var COLORS = [
    '#FF7373', '#90EE90', '#87CEFA', '#FFBC61', '#FFFF73', '#ccff00', '#E4A9E6', 'white'
];

var ColorBlock = React.createClass({    
    getInitialState() {
        return {
            colors: COLORS
        };
    },

    render() {
        var selectColor = this.props.selectColor;

        var colorsWithIds = this._createArrayObjFromArray(this.state.colors);
        return (
            <div className='color-block'>
                {
                    colorsWithIds.map((color) => {
                        var styleColor = { backgroundColor: color.value };
                        return (
                            <button key={color.id} 
                                    className='add-color' 
                                    style={styleColor} 
                                    onClick={selectColor.bind(null, color.value)} 
                            />
                        );
                    })
                }   
            </div>
        );
    },

    _createArrayObjFromArray(array) {
        var result = [];
        array.forEach((color) => {
            result.push({
                id: array.indexOf(color),
                value: color
            });
        });
        return result;
    }
});

module.exports = ColorBlock;