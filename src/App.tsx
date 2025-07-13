import { Component, type ReactNode } from 'react';
import Main from './pages/Main';
import './App.css';
import Header from './components/Header';

class App extends Component {
  render(): ReactNode {
    return (
      <>
        <Header />
        <Main />
      </>
    );
  }
}

export default App;
