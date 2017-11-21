var React = require('react');
var Note = require('./Note.jsx');

require('./NotesGrid.css');

var NotesGrid = React.createClass({
    componentDidMount() {
        var grid = this.refs.grid;
        this.msnry = new Masonry( grid, {
            itemSelector: '.note',
            columnWidth: 200,
            gutter: 10
        });
    },

    componentDidUpdate(prevProps) {
        if (this.props.notes.length !== prevProps.notes.length) { 
            this.msnry.reloadItems(); 
            this.msnry.layout(); 
        };
    },

    render() {
        var onNoteDelete = this.props.onNoteDelete;
        var filterByDate = this.props.filterByDate;

        return (
            <div className='notes-grid' ref='grid'>
                {
                    this.props.notes.map((note) => {
                        return (
                            <Note key={note.id} 
                                color={note.color}
                                createdDate={note.createdDate}
                                goToDate={filterByDate.bind(null, note.createdDate)} 
                                onDelete={onNoteDelete.bind(null, note)}> 
                                    {note.text} 
                            </Note>
                        );
                    })
                }
            </div>
        );
    }
});

module.exports = NotesGrid;