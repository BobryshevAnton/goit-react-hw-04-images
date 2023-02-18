import React from 'react';
import { Component } from 'react';

import css from './button.module.css';

export default class Button extends Component {
  onClick = () => {
    this.props.loadMore();
  };

  render() {
    return (
      <footer className={css.footerSection}>
        <button type="button" className={css.button} onClick={this.onClick}>
          Load More
        </button>
      </footer>
    );
  }
}
