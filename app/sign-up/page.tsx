import React, { useState } from 'react'
import { useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { CodeSquare } from 'lucide-react'
const SignUp = () => {
    const{isLoaded,signUp,setActive}=useSignUp();
    const[emailAddress,setEmailAddress]=useState();
    const[password,setPassword]=useState()
    const[pendingVerification,setPendingVerication]=useState(false);
    const[code,setCode]=useState();
    const[error,setError]=useState();
    const[showPassword,setShowPassword]=useState();
    const router=useRouter();

    if(isLoaded){
        return null
    }
    async function submit(e:React.FormEvent) {
        e.preventDefault()
        try {
            await signUp?.create({
                emailAddress,
                password
            })

            await signUp?.prepareEmailAddressVerification({
                strategy:"email_code",

            });
            setPendingVerication(true);

            
        } catch (error:any) {
            console.log(JSON.stringify(error,null,2),"error while submit user");
            setError(error.errors[0].message);

            
        }
    }

    async function onPressVerify(e:React.FormEvent) {
        e.preventDefault();
        if(!isLoaded){
            return null
        }
        try {
            const completeSignUp=await signUp.attemptEmailAddressVerification({code});
            if(completeSignUp.status!="complete"){
                await setActive({session:completeSignUp.createdSessionId});
                router.push("/dashboard")
                console.log(JSON.stringify(completeSignUp,null,2));
                
            }
            
        } catch (error:any) {
            console.log(JSON.stringify(error,null,2),"error while submit user");
            setError(error.errors[0].message);
            


            
        }
        
    }

    return (
        <div>page</div>
      )

  
}

export default SignUp