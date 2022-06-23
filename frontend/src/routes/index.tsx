import { Button } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Button variant="contained" color="primary">
            Olá
          </Button>
        }
      />
      <Route path="/my" element={<Button>My Home Page</Button>} />
      <Route path="/auth" element={<Button>Authentication</Button>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
