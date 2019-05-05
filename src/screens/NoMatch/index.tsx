import React from 'react';
import GithubCorner from 'react-github-corner';

import Footer from '../../components/Footer';
import styles from './styles.module.scss';

const NoMatchScreen: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>404 Not Found.</h1>
      <p className={styles.message}>は？俺は404ページやぞ</p>
      <Footer />
      <GithubCorner href="https://github.com/TinyKitten/ReceiptGenerator" />
    </div>
  );
};

export default NoMatchScreen;
