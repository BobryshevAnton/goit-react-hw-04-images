import React from 'react';

import css from './button.module.css';

const Button = ({ loadMore }) => {
  const onClick = () => {
    loadMore();
  };

  return (
    <footer className={css.footerSection}>
      <button type="button" className={css.button} onClick={onClick}>
        Load More
      </button>
    </footer>
  );
};
export default Button;
