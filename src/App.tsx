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
        <Main />
        <div className="flex justify-center p-10">
          <button
            className="cursor-pointer rounded bg-[#BFDE42] px-6 py-2 text-xs font-medium text-white uppercase hover:bg-[#abc449]"
            onClick={this.throwError}
          >
            Error App
          </button>
        </div>
      </>
    );
  }
}

export default App;
