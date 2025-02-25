
"use client";

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { authFormSchema } from "@/lib/utils";
import CustomInput from "./CustomInput";
import { Loader2 } from 'lucide-react';
import { data } from "autoprefixer";
import SignUp from "@/app/(auth)/sign-up/page";
import SignIn from "@/app/(auth)/sign-in/page";
import { useRouter } from "next/navigation";
import { signUp, signIn } from "@/lib/actions/user.actions";

const formSchema = z.object({
  email: z.string().email(),
})

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password:''
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true)

    try {
      // Sign up with Appwrite & create plaid link token

      if (type === 'sign-up'){
        const newUser = await signUp(data);

        setUser(newUser);
      }

      if (type === 'sign-in'){
        const response = await signIn({
          email: data.email,
          password: data.password
        })

        if(response) router.push('/')
      }

    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className='auth-form'>
      <header className='flex flex-col gap-5 md:gap-8'>
          <Link href="/" className='flex cursor-pointer items-center gap-1'>
            <Image
              src="/icons/tether_logo.svg"
              width={35}
              height={35}
              alt="Tether logo"
            />
            <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>
              Tether
            </h1>
          </Link>
          <div className="flex flex-col gap-1 md:gap-3">
            <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
              {user
                ? 'Link account'
                : type === 'sign-in'
                  ? 'Sign In'
                  : 'Sign Up'
              }
            </h1>
            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Link your account to get started"
                : "Please enter your details"
              }
            </p>
          </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          {/* playd */}
        </div>
      ): (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === 'sign-up' && (
                <>
                  <div className="flex gap-4">
                    <CustomInput 
                      control={form.control} 
                      name="firstName"
                      label="First Name"
                      placeholder="Enter your first name"
                    />  
                    <CustomInput 
                      control={form.control} 
                      name="lastName"
                      label="Last Name"
                      placeholder="Enter your last name"
                    />  
                  </div>

                  <CustomInput 
                    control={form.control} 
                    name="address1"
                    label="Address"
                    placeholder="Enter your address"
                  />  

                  <CustomInput 
                    control={form.control} 
                    name="city"
                    label="City"
                    placeholder="Enter your city"
                  />  

                  <div className="flex gap-4">
                    <CustomInput 
                      control={form.control} 
                      name="state"
                      label="State/Province"
                      placeholder="Example: CA"
                    />  
                    <CustomInput 
                      control={form.control} 
                      name="postalCode"
                      label="Postal Code"
                      placeholder="Enter your postal code"
                    />
                  </div>

                  <div className="flex gap-4">
                  <CustomInput 
                    control={form.control} 
                    name="dateOfBirth"
                    label="Date of Birth"
                    placeholder="YYYY-MM-DD"
                  />    
                  <CustomInput 
                    control={form.control} 
                    name="ssn"
                    label="SSN/SIN"
                    placeholder="Enter your SSN"
                  />    
                  </div>

                </>
              )}

              <CustomInput 
                control={form.control} 
                name="email"
                label="Email"
                placeholder="Enter your email"
              />
              <CustomInput 
                control={form.control} 
                name="password"
                label="Password"
                placeholder="Enter your password"
              />
              <div className="flex flex-col gap-4">
                <Button type="submit" className="form-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin"/> &nbsp;
                      Loading...
                    </>
                  ) : type === 'sign-in'
                    ? 'Sign in' : 'Sign up'}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === 'sign-in'
              ? "Don't have an account?"
              : "Already have an account"}
            </p>
            <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'}
            className='form-link'
            >
              {type === 'sign-in' ? 'Sign Up' : 'Sign in'}
            </Link>
          </footer>
        </>
      )}
    </section>
  )
}

export default AuthForm