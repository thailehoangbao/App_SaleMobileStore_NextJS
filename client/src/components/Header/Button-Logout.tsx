"use client"
import authApiRequest from "@/apiRequest/auth";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { handleErrorApi } from "@/lib/utils";
import { useAppContext } from "@/app/AppProvider";

function ButtonLogOut() {
    // const {user} = useAppContext()
    const router = useRouter()
    const {setUser} : any = useAppContext()
    const hanldeLogOut = async () => {
        try {
            await authApiRequest.logoutFormNextClientToNextServer()
            router.push('/login')
        } catch (error) {
            handleErrorApi({error})
        } finally {
            setUser(null)
            router.refresh()
            localStorage.removeItem('sessionToken')
            localStorage.removeItem('expiresAt')
        }
    }
    return (<Button size='sm' className="bg-red-500 text-white hover:bg-red-950 hover:text-red-200" onClick={hanldeLogOut}>
        Đăng Xuất
    </Button>);
}

export default ButtonLogOut;