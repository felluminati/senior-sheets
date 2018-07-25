import React from 'react';
import styles from './index.css';

const options = [
  '🤯',
  '🤢',
  '😨',
  '😣',
  '😕',
  '😏',
  '😊',
  '🤓',
  '😎',
  '🤩',
];

const EmojiKey = () => {
  return (
    <div className={styles.emojiKey}>
      {options.map((elem, idx) => {
        return <div key={elem} title={idx + 1}>{elem}</div>;
      })}
    </div>
  );
};

export default EmojiKey;
