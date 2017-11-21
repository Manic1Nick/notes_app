var React = require('react');
var ColorBlock = require('./ColorBlock.jsx');

require('./NoteEditor.css');

var NoteEditor = React.createClass({
    getInitialState() {
        return {
            text: '',
            color: ''
        };
    },

    handleTextChange(event) {
        this.setState({
            text: event.target.value
        });
    },

    handleColorChange(color) {
        this.setState({ color });
    },

    handleNoteAdd() {
        var localLastId = +localStorage.getItem('lastId');

        var currentDateText = () => {
            var options={ year: '2-digit', month: '2-digit', day: '2-digit' };
            return new Date().toLocaleString("ru",options);
        };

        var newNote = {
            text: this.state.text,
            color: this.state.color,
            id: localLastId ? localLastId + 1 : 1,
            createdDate: currentDateText()
        };

        this.setState({
            text: '',
            color: ''
        });

        this.props.onNoteAdd(newNote);
    },

    render() {
        var styleTextarea = { backgroundColor: this.state.color };
        return (
            <div className='note-editor'> 
                <textarea 
                    placeholder='Enter your note here...' 
                    rows={5} 
                    className='textarea' 
                    style={styleTextarea}
                    value={this.state.text} 
                    onChange={this.handleTextChange}
                />
                <div className='tools-block'>
                    <ColorBlock selectColor={this.handleColorChange}/>
                    <button className='add-button' onClick={this.handleNoteAdd}> Add </button>
                </div>
            </div>
        );
    }
});

module.exports = NoteEditor;