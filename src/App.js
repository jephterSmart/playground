import React from 'react';
import AssemblyLine from './AssemblyLine';
import SpellingFixer from './SpellFixer';


const App = () => {
  return (
    <>
    <h1>
      Assembly Line
    </h1>
    <AssemblyLine stages={["Ideas","Development","Testing","Deploy"]} />
    <SpellingFixer corpus='helllo woirld' />
    </>
  )
}

export default App;