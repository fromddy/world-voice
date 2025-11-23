'use client';

import { TabItem, Tabs } from '@worldcoin/mini-apps-ui-kit-react';
// import { Bank, Home, MusicNote, User } from 'iconoir-react';
import { MusicNote } from 'iconoir-react';
import { usePathname, useRouter } from 'next/navigation';

/**
 * This component uses the UI Kit to navigate between pages
 * Bottom navigation is the most common navigation pattern in Mini Apps
 * We require mobile first design patterns for mini apps
 * Read More: https://docs.world.org/mini-apps/design/app-guidelines#mobile-first
 */

const routeMap: Record<string, string> = {
  home: '/home',
  wallet: '/wallet',
  podcast: '/podcast',
  profile: '/profile',
};

const pathToValue = (pathname: string): string => {
  if (pathname.startsWith('/wallet')) return 'wallet';
  if (pathname.startsWith('/podcast')) return 'podcast';
  if (pathname.startsWith('/profile')) return 'profile';
  return 'home';
};

export const Navigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentValue = pathToValue(pathname);

  const handleValueChange = (value: string) => {
    const route = routeMap[value];
    if (route && route !== pathname) {
      router.push(route);
    }
  };

  return (
    <Tabs value={currentValue} onValueChange={handleValueChange}>
      {/* <TabItem value="home" icon={<Home />} label="Home" />
      <TabItem value="wallet" icon={<Bank />} label="Wallet" /> */}
      <TabItem value="podcast" icon={<MusicNote />} label="Podcast" />
      {/* <TabItem value="profile" icon={<User />} label="Profile" /> */}
    </Tabs>
  );
};
