import { useState } from 'react';
import { CatsContext } from '../Context/CatsContext';
import { CatsList } from './CatsList/CatsList';
import { CatContext } from '../types/app';

function App() {
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(1);
  const [updated, setUpdated] = useState(true);

  const defaultState: CatContext = {
    id: id,
    setId: setId,
    catUpdateFn: setEdit,
    catUpdate: edit,
    updated: updated,
    setUpdated: setUpdated,
  };

  return (
    <CatsContext.Provider value={defaultState}>
      <CatsList />
    </CatsContext.Provider>
  );
}

export default App;
