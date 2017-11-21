var React = require('react');

require('./Note.css');

var Note = React.createClass({
    render() {
        var styleNote = { backgroundColor: this.props.color };
        return (
            <div className='note' style={styleNote}> 
                <div className='note-date'>
                    <a href="#" onClick={this.props.goToDate}>{this.props.createdDate}</a>
                </div>                
                <div className='note-text'>
                     <span className='delete-note' onClick={this.props.onDelete}> x </span>
                        {this.props.children}
                </div>                
            </div>
        );
    }
});

module.exports = Note;