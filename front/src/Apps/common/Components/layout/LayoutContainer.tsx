import React, { lazy, Suspense } from "react";
import {
  Route,
  Switch,
  Redirect,
  generatePath,
  RouteChildrenProps,
  useRouteMatch
} from "react-router-dom";
import PrivateRoute from "../../../../login/PrivateRoute";
import * as Sentry from "@sentry/browser";
import Loader from "../Loader/Loaders";
import Layout from "./Layout";
import routes from "../../../routes";
import { useQuery, gql } from "@apollo/client";
import { Query } from "codegen-ui";
import ResendActivationEmail from "../../../../login/ResendActivationEmail";
import Login from "../../../../login/Login";
import SurveyBanner from "../SurveyBanner/SurveyBanner";

const Admin = lazy(() => import("../../../../admin/Admin"));
const Dashboard = lazy(() => import("../../../../dashboard/Dashboard"));
const DashboardV2Routes = lazy(
  () => import("../../../Dashboard/DashboardRoutes")
);
const Account = lazy(() => import("../../../../account/Account"));
const AccountMembershipRequest = lazy(
  () => import("../../../../account/AccountMembershipRequest")
);
const FormContainer = lazy(() => import("../../../../form/bsdd/FormContainer"));
const BsvhuFormContainer = lazy(
  () => import("../../../../form/bsvhu/FormContainer")
);
const BsffFormContainer = lazy(
  () => import("../../../../form/bsff/FormContainer")
);
const BsdasriFormContainer = lazy(
  () => import("../../../../form/bsdasri/FormContainer")
);
const BsdaFormContainer = lazy(
  () => import("../../../../form/bsda/FormContainer")
);
const WasteSelector = lazy(() => import("../../../../login/WasteSelector"));

const Invite = lazy(() => import("../../../../login/Invite"));
const UserActivation = lazy(() => import("../../../../login/UserActivation"));
const PasswordResetRequest = lazy(
  () => import("../../../../login/PasswordResetRequest")
);
const PasswordReset = lazy(() => import("../../../../login/PasswordReset"));
const Signup = lazy(() => import("../../../../login/Signup"));
const OauthDialog = lazy(() => import("../../../../oauth/Oauth2Dialog"));
const OidcDialog = lazy(() => import("../../../../oauth/OidcDialog"));
const Company = lazy(() => import("../../../../company/Company"));
const WasteTree = lazy(() => import("../../../../search/WasteTree"));

const GET_ME = gql`
  query GetMe {
    me {
      id
      email
      isAdmin
      companies {
        orgId
        siret
      }
      featureFlags
    }
  }
`;

export default function LayoutContainer() {
  const { data, loading } = useQuery<Pick<Query, "me">>(GET_ME, {
    onCompleted: ({ me }) => {
      if (import.meta.env.VITE_SENTRY_DSN && me.email) {
        Sentry.setUser({ email: me.email });
      }
    }
  });
  const isAuthenticated = !loading && data != null;
  const isAdmin = isAuthenticated && Boolean(data?.me?.isAdmin);

  const isV2Routes = !!useRouteMatch("/v2/dashboard/");
  const isDashboardRoutes = !!useRouteMatch("/dashboard/");
  const dashboardRoutePrefix = isV2Routes ? "dashboardv2" : "dashboard";

  if (loading) {
    return <Loader />;
  }

  const v2banner =
    isV2Routes || isDashboardRoutes ? (
      <SurveyBanner
        message="« Mes bordereaux » vous permet de découvrir le nouveau tableau de bord. Découvrez-le et partagez-nous vos suggestions."
        button={{
          title: "Partagez vos suggestions",
          href: "https://tally.so/r/3xDDy9"
        }}
      ></SurveyBanner>
    ) : undefined;

  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <PrivateRoute
          exact
          path="/oauth2/authorize/dialog"
          isAuthenticated={isAuthenticated}
        >
          <OauthDialog />
        </PrivateRoute>
        <PrivateRoute
          exact
          path="/oidc/authorize/dialog"
          isAuthenticated={isAuthenticated}
        >
          <OidcDialog />
        </PrivateRoute>
        <Route>
          <Layout
            isAuthenticated={isAuthenticated}
            isAdmin={isAdmin}
            v2banner={v2banner}
            defaultOrgId={data?.me.companies[0]?.orgId}
          >
            <Switch>
              <PrivateRoute
                path={routes.admin.index}
                isAuthenticated={isAuthenticated}
              >
                {isAdmin ? (
                  <Admin />
                ) : (
                  <div>Vous n'êtes pas autorisé à consulter cette page</div>
                )}
              </PrivateRoute>

              <Route exact path={routes.login}>
                <Login />
              </Route>

              <Route exact path={routes.invite}>
                <Invite />
              </Route>

              <Route exact path={routes.signup.index}>
                <Signup />
              </Route>

              <Route exact path={routes.signup.details}>
                <WasteSelector />
              </Route>

              <Route exact path={routes.passwordResetRequest}>
                <PasswordResetRequest />
              </Route>

              <Route exact path={routes.passwordReset}>
                <PasswordReset />
              </Route>

              <Route exact path={routes.userActivation}>
                <UserActivation />
              </Route>
              <Route exact path={routes.resendActivationEmail}>
                <ResendActivationEmail />
              </Route>

              <Route exact path={routes.company}>
                <Company />
              </Route>

              <Route exact path={routes.wasteTree}>
                <WasteTree />
              </Route>

              <Route
                path={[
                  "/dashboard/:siret/bsds/edit/:id",
                  "/v2/dashboard/:siret/bsds/edit/:id"
                ]}
                exact
              >
                {({
                  match
                }: RouteChildrenProps<{ siret: string; id: string }>) => (
                  <Redirect
                    to={generatePath(routes[dashboardRoutePrefix].bsdds.edit, {
                      siret: match!.params.siret,
                      id: match!.params.id
                    })}
                  />
                )}
              </Route>

              <PrivateRoute
                path={routes[dashboardRoutePrefix].bsdds.edit}
                isAuthenticated={isAuthenticated}
                exact
              >
                <FormContainer />
              </PrivateRoute>

              <Route
                path={[
                  "/dashboard/:siret/bsds/create",
                  "/v2/dashboard/:siret/bsds/create"
                ]}
                exact
              >
                {({ match }: RouteChildrenProps<{ siret: string }>) => (
                  <Redirect
                    to={generatePath(
                      routes[dashboardRoutePrefix].bsdds.create,
                      {
                        siret: match!.params.siret
                      }
                    )}
                  />
                )}
              </Route>
              <PrivateRoute
                path={routes[dashboardRoutePrefix].bsdds.create}
                isAuthenticated={isAuthenticated}
                exact
              >
                <FormContainer />
              </PrivateRoute>

              <PrivateRoute
                path={routes[dashboardRoutePrefix].bsvhus.create}
                isAuthenticated={isAuthenticated}
                exact
              >
                <BsvhuFormContainer />
              </PrivateRoute>

              <PrivateRoute
                path={routes[dashboardRoutePrefix].bsvhus.edit}
                isAuthenticated={isAuthenticated}
                exact
              >
                <BsvhuFormContainer />
              </PrivateRoute>

              <PrivateRoute
                path={routes[dashboardRoutePrefix].bsffs.create}
                isAuthenticated={isAuthenticated}
                exact
              >
                <BsffFormContainer />
              </PrivateRoute>

              <PrivateRoute
                path={routes[dashboardRoutePrefix].bsffs.edit}
                isAuthenticated={isAuthenticated}
                exact
              >
                <BsffFormContainer />
              </PrivateRoute>

              <PrivateRoute
                path={routes[dashboardRoutePrefix].bsdasris.create}
                isAuthenticated={isAuthenticated}
                exact
              >
                <BsdasriFormContainer />
              </PrivateRoute>

              <PrivateRoute
                path={routes[dashboardRoutePrefix].bsdasris.edit}
                isAuthenticated={isAuthenticated}
                exact
              >
                <BsdasriFormContainer />
              </PrivateRoute>

              <PrivateRoute
                path={routes[dashboardRoutePrefix].bsdas.create}
                isAuthenticated={isAuthenticated}
                exact
              >
                <BsdaFormContainer />
              </PrivateRoute>

              <PrivateRoute
                path={routes[dashboardRoutePrefix].bsdas.edit}
                isAuthenticated={isAuthenticated}
                exact
              >
                <BsdaFormContainer />
              </PrivateRoute>

              <PrivateRoute
                path={routes.dashboard.index}
                isAuthenticated={isAuthenticated}
              >
                <Dashboard />
              </PrivateRoute>

              <PrivateRoute
                path={routes.dashboardv2.index}
                isAuthenticated={isAuthenticated}
              >
                <DashboardV2Routes />
              </PrivateRoute>

              <PrivateRoute
                path={routes.account.index}
                isAuthenticated={isAuthenticated}
              >
                <Account />
              </PrivateRoute>
              <PrivateRoute
                path={routes.membershipRequest}
                isAuthenticated={isAuthenticated}
              >
                <AccountMembershipRequest />
              </PrivateRoute>
              <Redirect
                to={
                  data
                    ? data.me.companies.length > 0
                      ? generatePath(routes.dashboardv2.index, {
                          siret: data.me.companies[0].orgId
                        })
                      : routes.account.companies.list
                    : routes.login
                }
              />
            </Switch>
          </Layout>
        </Route>
      </Switch>
    </Suspense>
  );
}
