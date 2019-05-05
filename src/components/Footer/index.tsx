import React from 'react';
import styles from './styles.module.scss';

const Footer = () => (
  <footer className={styles.footer}>
    <p className={styles.credit}>
      こんなゴミアプリを作ったのはね:{' '}
      <a href="https://tinykitten.me" rel="noreferrer noopener" target="_blank">
        TinyKitten
      </a>
    </p>
    <p className={styles.credit}>
      Copyright &copy; {new Date().getFullYear()} TinyKitten
    </p>
  </footer>
);

export default Footer;
