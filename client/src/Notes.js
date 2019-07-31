import React, {Component} from 'react';
import './App.css';

class Notes extends Component{
    constructor(){
        super();
        this.state = {
            notes : []
        }
    }

    render(){
        return (
            <div>
                <h3>Notas</h3>
                {this.state.notes.map(note =>
                    <div className="note" key={note._id}>
                        <div>{note.title}</div>
                        <p>{note.description}</p>
                    </div>
                )}
                <button onClick={this.handleSubmit.bind(this)} type="submit">Create</button>
            </div>
        )
    }

    handleSubmit(){
      this.props.history.push('/create');
    }

    async componentDidMount(){
        let response = await fetch("http://localhost:3456/notes");
        let data = await response.json();
        this.setState({notes : data});
        console.log(this.state.notes)
    }
}

export default Notes;
