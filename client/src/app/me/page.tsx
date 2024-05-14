import { cookies } from 'next/headers';
import Profile from './profile';
import accountApiRequest from '@/apiRequest/account';
import { AccountResType } from '@/components/schemaValidations/account.schema';
import ProfileForm from './profile-form';
import { cache } from 'react';
import { Metadata, ResolvingMetadata } from 'next';
const getProfile = cache(accountApiRequest.meServer)
type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}
//Chỉ dùng được ở server component
export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('sessionToken');

    const { payload }: { payload: AccountResType } = await getProfile(sessionToken?.value ?? '');

    return {
        title: "Xin Chào: " + payload.data.name,
        description: "Email: " + payload.data.email,
    }
}
//gọi Api từ server Next component
async function MeProfile() {
    //khi đã set cookie vào next server (file api/auth/route.ts) thì component server có thể lấy dc cookie và sư dung
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('sessionToken')?.value;
    // console.log(sessionToken)
    const { payload }: { payload: AccountResType } = await getProfile(sessionToken ?? "");
    return (
        <>
            <h1>Me Profile: {payload.data.name}</h1>
            {/* <Profile /> */}
            <ProfileForm profile={payload.data} />
        </>
    );
}

export default MeProfile;
