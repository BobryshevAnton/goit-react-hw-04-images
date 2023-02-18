import { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './searchbar.module.css';

export class Searchbar extends Component {
  state = {
    page: 1,
    name: '',
  };
  nameId = nanoid();

  handlerChange = evt => {
    const { name, value } = evt.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.setState({ page: 1 });
    this.props.onForm(this.state.name);
    this.reset();
  };

  reset = () => {
    setTimeout(() => {
      this.setState({ name: '' });
    }, 500);
  };

  render() {
    const { name } = this.state;
    return (
      <header className={css.searchbar}>
        <form
          htmlFor={this.nameId}
          className={css.form}
          onSubmit={this.handleSubmit}
        >
          <button type="submit" className={css.button}>
            <span className="button-label"></span>
          </button>

          <input
            id={this.nameId}
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="name"
            value={name}
            onChange={this.handlerChange}
          />
        </form>
      </header>
    );
  }
}
