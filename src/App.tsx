import type { Component } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
          Learn Solid
      </header>
    </div>
  );
};

export default App;
