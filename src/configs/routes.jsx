import { v4 as uuidv4 } from 'uuid';
import {
  AddBookingPage,
  AuthorPage,
  BookingPage,
  ComboPage,
  HomePage,
  PetPage,
  ProductPage,
  RoomPage,
  ServicePage,
  UserPage,
} from '../pages';
import PaymentPage from '../pages/PaymentPage';
import CategoriesPage from '../pages/CategoriesPage';

export default [
  {
    id: `admin-route-${uuidv4()}`,
    path: '/',
    element: <HomePage />,
  },
  {
    id: `admin-route-${uuidv4()}`,
    path: '/quan-ly-booking',
    element: <BookingPage />,
  },
  {
    id: `admin-route-${uuidv4()}`,
    path: '/quan-ly-dich-vu',
    element: <ServicePage />,
  },
  {
    id: `admin-route-${uuidv4()}`,
    path: '/quan-ly-combo',
    element: <ComboPage />,
  },
  {
    id: `admin-route-${uuidv4()}`,
    path: '/quan-ly-phong',
    element: <RoomPage />,
  },
  {
    id: `admin-route-${uuidv4()}`,
    path: '/quan-ly-san-pham',
    element: <ProductPage />,
  },
  {
    id: `admin-route-${uuidv4()}`,
    path: '/quan-ly-thu-cung',
    element: <PetPage />,
  },
  {
    id: `admin-route-${uuidv4()}`,
    path: '/quan-ly-nguoi-dung',
    element: <UserPage />,
  },
  {
    id: `admin-route-${uuidv4()}`,
    path: '/quan-ly-thanh-toan',
    element: <PaymentPage />,
  },
  {
    id: `admin-route-${uuidv4()}`,
    path: '/quan-ly-booking/them-moi',
    element: <AddBookingPage />,
  },
  {
    id: `admin-route-${uuidv4()}`,
    path: '/quan-ly-danh-muc',
    element: <CategoriesPage />,
  },
];
