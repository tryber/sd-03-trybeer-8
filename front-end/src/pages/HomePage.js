import React from 'react';
import { Redirect } from 'react-router-dom';
import MenuTop from '../components/MenuTop';

function HomePage() {
  return <Redirect to="/login" />;
}

export default HomePage;
