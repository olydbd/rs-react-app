import { Component, type ReactNode } from 'react';
import Main from './pages/Main/Main';
import Header from './components/Header/Header';

class App extends Component {
  state = {
    isError: false,
  };

  throwError = (): void => {
    this.setState({ isError: true });
  };

  render(): ReactNode {
    if (this.state.isError) {
      throw new Error('Test Error for App');
    }

    return (
      <>
        <Header />
        <button
          className="absolute top-0 left-0 cursor-pointer rounded bg-amber-800 px-6 py-2 text-xs font-medium text-white uppercase hover:bg-amber-900"
          onClick={this.throwError}
        >
          Error App
        </button>
        <Main />
      </>
    );
  }
}

export default App;
