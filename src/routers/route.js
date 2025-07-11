import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Loading page
import { LoadingPage } from "../pages/loading-page";

// Pages
import { HomePage } from "../pages/homePage";
import { Layout } from "../features/common/components/layout/layout";
import { PageNotFound } from "../pages/not-found";


// Redux actions
import { disableLoading } from "../redux/slices/loading/loadingSlice";


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
      </Route>
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};
