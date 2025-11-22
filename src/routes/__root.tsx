import {
    Outlet,
    createRootRoute,
    HeadContent,
    Scripts,
    createRootRouteWithContext,
    useRouteContext,
  } from "@tanstack/react-router"
import appCss from "@/globals.css?url";
import { BreadcrumbNav } from '@/components/breadcrumb-nav';
import { Providers } from '@/components/providers';

import { createServerFn } from '@tanstack/react-start'
import { QueryClient } from '@tanstack/react-query'
import { ConvexQueryClient } from '@convex-dev/react-query'
import { ConvexReactClient } from 'convex/react'
import { getCookie, getRequest } from '@tanstack/react-start/server'
import { fetchSession, getCookieName } from '@convex-dev/better-auth/react-start'
// Get auth information for SSR using available cookies
const fetchAuth = createServerFn({ method: 'GET' }).handler(async () => {
  const { createAuth } = await import('../../convex/auth')
  const { session } = await fetchSession(getRequest())
  const sessionCookieName = getCookieName(createAuth)
  const token = getCookie(sessionCookieName)
  return {
    userId: session?.user.id,
    token,
  }
})

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
  convexClient: ConvexReactClient
  convexQueryClient: ConvexQueryClient
}>()({
    head: () => ({
      meta: [
        { charSet: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        { title: "TanStack Start Starter" }
      ],
      links: [
        {
          rel: 'stylesheet',
          href: appCss,
        },
      ],
    }),
    beforeLoad: async (ctx) => {
      // all queries, mutations and action made with TanStack Query will be
      // authenticated by an identity token.
      const { userId, token } = await fetchAuth()
      // During SSR only (the only time serverHttpClient exists),
      // set the auth token to make HTTP queries with.
      if (token) {
        ctx.context.convexQueryClient.serverHttpClient?.setAuth(token)
      }
      return { userId, token }
    },
    component: RootLayout,
  })

function RootLayout() {
  const { token } = useRouteContext({ from: Route.id })
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Providers token={token}>
          <BreadcrumbNav />
          <Outlet />
        </Providers>
        <Scripts />
      </body>
    </html>
  );
}
