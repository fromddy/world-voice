import { auth } from '@/auth';
import { Navigation } from '@/components/Navigation';
import { Page } from '@/components/PageLayout';

export default async function TabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // If the user is not authenticated, redirect to the login page
  if (!session) {
    console.log('Not authenticated');
    // redirect('/');
  }

  return (
    <Page>
      <div className="flex-1 flex flex-col pb-24">
        {children}
      </div>
      <Page.Footer className="px-0 fixed bottom-0 w-full bg-white border-t border-gray-100 z-50">
        <Navigation />
      </Page.Footer>
    </Page>
  );
}
