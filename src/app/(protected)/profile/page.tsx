import { auth } from '@/auth';
import { Page } from '@/components/PageLayout';
import { Marble, TopBar } from '@worldcoin/mini-apps-ui-kit-react';

export default async function Profile() {
  const session = await auth();

  return (
    <>
      <Page.Header className="p-0">
        <TopBar
          title="Profile"
          endAdornment={
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold capitalize">
                {session?.user.username}
              </p>
              <Marble src={session?.user.profilePictureUrl} className="w-12" />
            </div>
          }
        />
      </Page.Header>
      <Page.Main className="flex flex-col items-center justify-start gap-4 mb-16">
        <div className="w-full max-w-md p-4">
          <div className="flex flex-col items-center gap-4 mb-6">
            <Marble
              src={session?.user.profilePictureUrl}
              className="w-24 h-24"
            />
            <h2 className="text-2xl font-semibold capitalize">
              {session?.user.username}
            </h2>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 space-y-4">
            <div>
              <p className="text-sm text-gray-600">Username</p>
              <p className="text-sm font-semibold capitalize">
                {session?.user.username || 'Not available'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Wallet Address</p>
              <p className="text-sm font-mono break-all">
                {session?.user.walletAddress || 'Not available'}
              </p>
            </div>
          </div>
        </div>
      </Page.Main>
    </>
  );
}

