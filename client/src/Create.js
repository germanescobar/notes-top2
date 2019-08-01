import React, {Component} from 'react';

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: ""
    }
  }

    render() {
        return (
            <div>
                <h3>Crear nueva nota</h3>
                <form onSubmit={this.createNote.bind(this)}>
                    <label>Titulo</label>
                    <input id="title" type="text" onChange={this.updateTitle.bind(this)} placeholder="Ingresa un titulo"/>
                    <label>Descripcion</label>
                    <textarea id="description" onChange={this.updateDescription.bind(this)}></textarea>
                    <button type="submit">Create</button>
                </form>
            </div>
        )
    }

    async createNote(e) {
      e.preventDefault();

      try {
        await fetch("http://localhost:3456/notes", {
          method: "POST",
          body: JSON.stringify(this.state),
          headers:{
            'Content-Type': 'application/json'
          }
        });

        this.props.history.push('/');
      } catch (e) {
        console.log(e);
      }
    }

    updateTitle(e) {
      this.setState({ title: e.target.value });
    }

    updateDescription(e) {
      this.setState({ description: e.target.value })
    }
}

export default Create;
