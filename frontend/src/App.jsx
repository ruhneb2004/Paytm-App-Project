import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignUpPage } from "./SignUpPage";
import { Dashboard } from "./Dashboard";
import { SignInPage } from "./SignInPage";
import { RecoilRoot } from "recoil";
import { Suspense } from "react";
function App() {
  return (
    <div>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route
              path="/signup"
              element={
                <Suspense fallback="loading...">
                  <SignUpPage />
                </Suspense>
              }
            />
            <Route
              path="/signin"
              element={
                <Suspense fallback="loading...">
                  <SignInPage />
                </Suspense>
              }
            />
            <Route
              path="/dashboard"
              element={
                <Suspense fallback="loading...">
                  <Dashboard />
                </Suspense>
              }
            />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;
