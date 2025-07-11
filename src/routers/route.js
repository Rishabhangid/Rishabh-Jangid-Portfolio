import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Loading page
import { LoadingPage } from "../pages/loading-page";

// Pages
import { HomePage } from "../pages/homePage";
import { Layout } from "../features/common/components/layout/layout";
import { LoginPage } from "../pages/login-page";
import { RegsiterPage } from "../pages/register-page";
import { ProductDetail } from "../pages/product-detail";
import { CartPage } from "../pages/CardPage";
import { FOrgotPassword } from "../pages/forgot-password-page";
import { VerifyNumber } from "../pages/verify-number";
import { UserProfilePage } from "../pages/user-profile";
import { ContactUsPage } from "../pages/contactus-page";
import { CatagoryPage } from "../pages/catagory-page";
import { BestSellingScreen } from "../pages/best-selling-page";
import { AddAdressPageScreen } from "../pages/add-address-page";
import { PaymentPage } from "../pages/payment-page";
import { OrderSummeryPage } from "../pages/order-success-page";
import { RefundPage } from "../pages/refund-page";
import { Privacy } from "../pages/privacy-page";
import { TermsPage } from "../pages/terms-page";
import { ViewTicketInfoPage } from "../pages/view-ticket-info-page";
import { PageNotFound } from "../pages/not-found";


// Redux actions
import { disableLoading } from "../redux/slices/loading/loadingSlice";
import { testSkeleton } from "../pages/test";
import { OrderDetailScreen } from "../pages/order-detail-page";
import { TrackOrderScreen } from "../pages/track-order-page";
import { ReturnPolicyScreen } from "../pages/retun-policy-page";
import { CancellationScreen } from "../pages/cancellation-policy-page";
import { AboutUsScreen } from "../pages/about-ous-page";
import { FAQScreen } from "../pages/faq-page";

export const Routers = () => {

  const isLoading = useSelector((state) => state.loading.isLoading);
  console.log(isLoading, "---------------isLoading broooooooooo from route---------------");
  // const is_loading = useSelector((state) => state.loading.isLoading);
  const dispatch = useDispatch();
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      dispatch(disableLoading()); // Ensure loading state resets after 3 seconds
      setShowLoading(false);
    }, 2000);
  }, [dispatch]);

  if (showLoading) {
    return <LoadingPage />;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/detail/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/userprofile" element={<UserProfilePage />} />
        <Route path="/bestselling" element={<BestSellingScreen />} />
        <Route path="/catagory/:id" element={<CatagoryPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/add-address" element={<AddAdressPageScreen />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/summery" element={<OrderSummeryPage />} />
        <Route path="/order-details/:id" element={<OrderDetailScreen />} />
        <Route path="/track-order/:id" element={<TrackOrderScreen />} />
        <Route path="/refund" element={<RefundPage />} />
        <Route path="/return-policy" element={<ReturnPolicyScreen />} />
        <Route path="/cancellation-policy" element={<CancellationScreen />} />
        <Route path="/faq" element={<FAQScreen />} />
        <Route path="/about_us" element={<AboutUsScreen />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/term-and-condition" element={<TermsPage />} />
        <Route path="/ticket-detail/:id" element={<ViewTicketInfoPage />} />
      </Route>

      <Route path="/tt" element={<testSkeleton />} />
      <Route path="/forgotpassword" element={<FOrgotPassword />} />
      <Route path="/loading" element={<LoadingPage />} />
      <Route path="/verify-phone" element={<VerifyNumber />} />
      <Route path="/register" element={<RegsiterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};
