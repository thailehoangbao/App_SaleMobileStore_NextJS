'use client'
import authApiRequest from "@/apiRequest/auth";
import { Button } from "../ui/button";
import { handleErrorApi } from "@/lib/utils";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { sessionTokenClient } from "@/lib/http";
import {differenceInHours} from 'date-fns'

function SlideSession() {
    const router = useRouter()
    // useEffect(() => {
    //     const interval = setInterval(async() => {
    //         const now = new Date()
    //         const expireAt = new Date(sessionTokenClient.expiresAt)
    //         if(differenceInHours(now, expireAt) < 1) {
    //             const result = await authApiRequest.slideSessionNextClientToNextServer();
    //             sessionTokenClient.expiresAt = result.payload.data.expiresAt
    //         }
    //     }, 1000 * 60 * 60)
    //     return () => {
    //         clearInterval(interval)
    //     }
    // },[])
    const handleSlide = async () => { 
        try {
            const result = await authApiRequest.slideSessionNextClientToNextServer();
            sessionTokenClient.expiresAt = result.payload.data.expiresAt
            router.refresh()
        } catch (error) {
            handleErrorApi({error})
            authApiRequest.slideSessionNextClientToNextServer(true).then(res => {
                redirect('/login?=redirectLogin=/logout')
            })
        }
    }

    return ( <div>
        <Button onClick={handleSlide} className="mt-2 bg-pink-500 text-white hover:bg-pink-950 hover:text-pink-400">
            Tăng thời gian hết hạn token
        </Button>
    </div> );
}

export default SlideSession;