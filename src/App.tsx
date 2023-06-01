import './styles/index.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage';
import FaqPage from './pages/faq-page/FaqPage';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import CartPage from './pages/cart-page/CartPage';
import ContactsPage from './pages/contacts-page/ContactsPage';
import ReviewPage from './pages/review-page/ReviewPage';
import AccountPage from './pages/account-page/AccountPage';
import BagPage from './pages/bag-page/BagPage';
import LoginPage from './pages/auth-pages/login-page/LoginPage';
import SignupPage from './pages/auth-pages/signup-page/SignupPage';
import AdminLoginPage from './pages/auth-pages/admin-login-page/AdminLoginPage';
import AdminPanelBagsPage from './pages/admin-panel-page/bags/AdminPanelBagsPage';
import AdminPanelUsersPage from './pages/admin-panel-page/users/AdminPanelUsersPage';
import AdminPanelNewBagPage from './pages/admin-panel-page/bags/AdminPanelNewBagPage';
import HelperPanelPage from './pages/helper-panel-page/HelperPanelPage';
import HelperLoginPage from './pages/auth-pages/helper-login-page/HelperLoginPage';
import AdminPanelChangeBagPage from './pages/admin-panel-page/bags/AdminPanelChangeBagPage';
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmailVerifictaionPage from './pages/auth-pages/email-verification-page/EmailVerificationPage';
import FavouritesPage from './pages/favourites-page/FavouritesPage';
import ApplyForAdministrator from './pages/auth-pages/apply-for-administrator-page/ApplyForAdministratorPage';
function App() {
  return (
    <>
    <ToastContainer/>
    <Header/>
    <Router>
      <Routes>
        <Route path="/" Component={HomePage}/>
        <Route path="/faq" Component={FaqPage}/>
        <Route path="/cart" Component={CartPage}/>
        <Route path="/favourite" Component={FavouritesPage}/>
        <Route path="/contacts" Component={ContactsPage}/>
        <Route path="/review" Component={ReviewPage}/>
        <Route path="/account" Component={AccountPage}/>
        <Route path="/bag" Component={BagPage}/>
        <Route path="/login" Component={LoginPage}/>
        <Route path='/signup' Component={SignupPage}/>
        <Route path='/admin-login' Component={AdminLoginPage}/>
        <Route path='/admin-panel' Component={AdminPanelBagsPage}/>
        <Route path='/admin-panel/users' Component={AdminPanelUsersPage}/>
        <Route path="/admin-panel/bags/new" Component={AdminPanelNewBagPage}/>
        <Route path="/admin-panel/bag/change" Component={AdminPanelChangeBagPage}/>
        <Route path="/auth/administrator-apply" Component={ApplyForAdministrator}/>
        <Route path="/helper-panel" Component={HelperPanelPage}/>
        <Route path="/helper-login" Component={HelperLoginPage}/>
        <Route path="/verify" Component={EmailVerifictaionPage}/>
      </Routes>
    </Router>
    <Footer/>
    </>
  );
}

export default App;
