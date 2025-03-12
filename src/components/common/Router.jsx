import { BrowserRouter, Routes, Route } from 'react-router-dom';

import router from '../../configs/routes.jsx';

import { LoadingPage, NotFoundPage } from '../../pages';
import { Suspense } from 'react';
import AdminLayout from '../../layouts/AdminLayout.jsx';

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          {router?.map(({ id, path, element }) => {
            return (
              <Route
                key={id}
                path={path}
                element={<AdminLayout>{element}</AdminLayout>}
              />
            );
          })}

          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
