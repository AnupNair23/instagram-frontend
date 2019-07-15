import React, {
  Component
} from 'react';
import './App.css';

import Post from './components/Post';

class App extends Component {
  render() {
    return (
      <div>
          <Post/>
      </div>
    );
  }
}
export default App;