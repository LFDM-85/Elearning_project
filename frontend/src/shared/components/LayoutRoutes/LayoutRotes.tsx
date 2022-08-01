import { Outlet } from 'react-router-dom';

const LayoutRoutes = () => {
  return (
    <main className="App">
      <Outlet />
    </main>
  );
};

export default LayoutRoutes;
