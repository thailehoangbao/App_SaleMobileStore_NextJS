'use client'
import authApiRequest from '@/apiRequest/auth'
import { sessionTokenClient } from '@/lib/http'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

export default function Logout() {
    const searchParams = useSearchParams()
    const pathname = usePathname() // pathname = /logout
    const router = useRouter()
    
    const sessionToken = searchParams.get('sessionToken')
    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
        if(sessionToken === sessionTokenClient.value) {
            authApiRequest.logoutFormNextClientToNextServer(true,signal)
            .then(res  => {
                router.push(`/login?redirectLogin=${pathname}`)
            })
        }
        return () => {
            controller.abort()
        }
    }, [sessionToken,pathname,router])
    return (
        <div>
            Logout
        </div>
    )
}
