import { AccountResType, UpdateMeBodyType } from "@/components/schemaValidations/account.schema";
import http from "@/lib/http";

const accountApiRequest = {
    meServer: (sessionToken: string) => http.get<AccountResType>('account/me', {
        headers: {
            Authorization: `Bearer ${sessionToken}`
        }
    }),
    meClient: () => http.get<AccountResType>('account/me'),
    updateMe: (update: UpdateMeBodyType) => http.put<AccountResType>('account/me', update),
}

export default accountApiRequest;