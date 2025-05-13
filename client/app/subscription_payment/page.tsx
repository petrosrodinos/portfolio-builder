"use client";

import { Suspense } from "react";
import Subscription from "./components/subscription";
import Loading from "./components/loading";

const SubscriptionPaymentPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Subscription />
    </Suspense>
  );
};

export default SubscriptionPaymentPage;
