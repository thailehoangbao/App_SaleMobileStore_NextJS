'use client'
import authApiRequest from '@/apiRequest/auth'
import { useAppContext } from '@/app/AppProvider'
// import { sessionTokenClient } from '@/lib/http'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect } from 'react'

async function LogoutLogic() {
    const searchParams = useSearchParams()
    const pathname = usePathname() // pathname = /logout
    const router = useRouter()
    const {setUser} : any = useAppContext();
    
    const sessionToken = searchParams.get('sessionToken')
    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
        // const sessionTokenStore = sessionTokenClient.value;
        if(sessionToken === localStorage.getItem('sessionToken')) {
            authApiRequest
            .logoutFormNextClientToNextServer(true,signal)
            .then(res  => {
                setUser(null)
                router.push(`/login?redirectLogin=${pathname}`)
            })
        }
        return () => {
            controller.abort()
        }
    }, [sessionToken,pathname,router,setUser])
    return (
        <div>
            Logout
        </div>
    )
}

export default function Logout() {
    return (
        <Suspense>
            <LogoutLogic />
        </Suspense>
    )
}
