import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import './App.css';
import 'react-quill/dist/quill.snow.css';

const App: React.FC = () => {
  const [text, setText] = useState('');

  return (
    <ReactQuill value={text}
                  onChange={setText} />
  );
}

export default App;
