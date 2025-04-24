import { BrowserRouter, Routes, Route } from 'react-router-dom';

import router from '../../configs/routes.jsx';

import { LoadingPage, NotFoundPage } from '../../pages';
import { Suspense } from 'react';
import AdminLayout from '../../layouts/AdminLayout.jsx';
import CategoriesPage from '../../pages/CategoriesPage.jsx';
import PetTypeManagement from '../Categories/PetTypeManagementPage.jsx';
import PetBreedManagement from '../Categories/PetBreedManagement.jsx';
import ServiceTypeManagement from '../Categories/ServiceTypeManagement.jsx';
import RoomTypeManagement from '../Categories/RoomTypeManagement.jsx';

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

          <Route
            path='/quan-ly-danh-muc'
            element={
              <AdminLayout>
                <CategoriesPage />
              </AdminLayout>
            }
          >
            <Route index element={<CategoriesPage />} />
            <Route path='loai-thu-cung' element={<PetTypeManagement />} />
            <Route path='giong-thu-cung' element={<PetBreedManagement />} />
            <Route path='loai-dich-vu' element={<ServiceTypeManagement />} />
            <Route path='loai-phong' element={<RoomTypeManagement />} />
          </Route>

          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
