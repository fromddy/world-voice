import { auth } from '@/auth';
import { Page } from '@/components/PageLayout';
import { UserInfo } from '@/components/UserInfo';
import { VoiceRecorder } from '@/components/VoiceRecorder';
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
        <UserInfo />
        <div className="w-full">
          <div className="mb-4 p-4 bg-gray-50 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">User Information</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium text-gray-600">Username: </span>
                <span className="capitalize">{session?.user.username || 'Not set'}</span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Wallet Address: </span>
                <span className="font-mono text-xs break-all">
                  {session?.user.walletAddress || 'Not connected'}
                </span>
              </div>
            </div>
          </div>
        </div>
        <VoiceRecorder />
      </Page.Main>
    </>
  );
}

