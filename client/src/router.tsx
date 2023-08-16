import { createHashRouter, redirect } from 'react-router-dom'
import { BaseLayout } from '@/layouts/BaseLayout'
import { Home } from '@/pages/Home'
import { ErrorBoundary } from '@/screens/ErrorBoundary'
import { ChatList } from '@/pages/messenger/ChatList'
import { Chat } from '@/pages/messenger/chat/Chat'
import { Profile } from '@/pages/profile/Profile'
import { CallLayout } from '@/layouts/CallLayout'
import { Call } from '@/pages/call/Call'

export const router = createHashRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        path: '',
        loader: async () => {
          redirect('/messenger')
          return null
        },
        element: <ErrorBoundary />,
        children: [],
      },
      {
        path: 'messenger/',
        element: <ChatList />,
        children: [],
      },

      {
        path: 'messenger/:userId',
        element: <Chat />,
        children: [],
      },

      {
        path: 'profile',
        element: <Profile />,
        children: [],
      },

      {
        path: 'contacts',
        element: <Home />,
        children: [],
      },
    ],
  },
  {
    path: '/call',
    element: <CallLayout />,
    children: [
      {
        path: '',
        element: <Call />,
        children: [],
      },
    ],
  },
])
