var React = require('react');
var NoteEditor = require('./NoteEditor.jsx');
var NotesGrid = require('./NotesGrid.jsx');

require('./NotesApp.css');

var NotesApp = React.createClass({
    getInitialState() {
        return {
            notes: [],
            filteredBy: ''
        };
    },

    handleNoteAdd(newNote) {
        var newNotes = this.state.notes.slice();
        newNotes.unshift(newNote);

        this.setState({ notes: newNotes },
        this._saveLastId(newNote.id));         
    },

    handleNoteDelete(note) {
        var noteId = note.id;
        var newNotes = this.state.notes.filter((note) => {
            return note.id !== noteId;
        });

        this.setState({ notes: newNotes });           
    },

    handleFilter(event) {
        var searchQuery = event.target ? event.target.value.toLowerCase() : event;        
        this.setState({ filteredBy: searchQuery });
    },

    handleShowAll() {
        this.setState({ filteredBy: '' });
    },

    componentDidMount() {
        var localNotes = JSON.parse(localStorage.getItem('notes'));
        if (localNotes) {
            this.setState({ notes: localNotes });
        }
    },

    componentDidUpdate() {
        this._updateLocalStorage();
    },

    render() {
        var visibleNotes = this._getVisibleNotes(this.state.notes, this.state.filteredBy);
        return (
            <div className='notes-app'>
                <h2>NotesApp</h2>
                <input type="text" placeholder="Search" className="search-field" value={this.state.filteredBy} onChange={this.handleFilter} />
                <NoteEditor onNoteAdd={this.handleNoteAdd} />
                <NotesGrid notes={visibleNotes} onNoteDelete={this.handleNoteDelete} filterByDate={this.handleFilter} />
                <div className="notes-actions">
                    <p id="notes-filter-nothing-found">
                        {!this.state.notes.length ? 'Add new notes...' : visibleNotes.length == 0 ? 'Nothing found...' : ''}
                    </p>
                    <p id="notes-filter-nothing-found">
                        <a href="#" onClick={this.handleShowAll}> {this.state.filteredBy ? 'show all' : ''} </a>
                    </p>                    
                </div>
            </div>
        );
    },

    _updateLocalStorage() {
        var notes = JSON.stringify(this.state.notes);
        localStorage.setItem('notes', notes);
    },

    _saveLastId(lastId) {
        localStorage.setItem('lastId', lastId);
    },

    _getVisibleNotes(notes, filter) {
        if (filter) { 
            return notes.filter((note) => { 
                return note.text.toLowerCase().indexOf(filter) !== -1 || note.createdDate === filter 
            });
        } 
        return notes;  
    }
});

module.exports = NotesApp;