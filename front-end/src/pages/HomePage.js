import React from 'react';
<<<<<<< HEAD

function HomePage() {
  return (
    <div className="HomePage">
      <h1 className="text-center">Trybeer - Grupo 8</h1>
    </div>
  );
}

export default HomePage;
=======
import { Redirect } from 'react-router-dom';

function HomePage() {
  return <Redirect to="/login" />;
}

export default HomePage;
>>>>>>> 416142b399cfbe8cfa42e8b35cba3b04317dd319
