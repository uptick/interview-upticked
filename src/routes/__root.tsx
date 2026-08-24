import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { AppShell, NAV_LINK_ACTIVE_CLASS_NAME, NAV_LINK_CLASS_NAME } from '~/ui/AppShell'
import { translate } from '~/lib/i18n'
import { navigationPages } from '~/pages/page-registry'

const RootLayout = () => (
  <AppShell
    productName={translate('app.name')}
    navigation={
      <ul>
        {navigationPages.map((page) => (
          <li key={page.id}>
            <Link
              to={page.path}
              className={NAV_LINK_CLASS_NAME}
              activeProps={{ className: `${NAV_LINK_CLASS_NAME} ${NAV_LINK_ACTIVE_CLASS_NAME}` }}
              activeOptions={{ exact: true }}
            >
              {translate(page.navLabelKey)}
            </Link>
          </li>
        ))}
      </ul>
    }
  >
    <Outlet />
  </AppShell>
)

const Route = createRootRoute({ component: RootLayout })

export { Route }
