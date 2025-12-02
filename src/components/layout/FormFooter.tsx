'use client'

import { Button, Input } from "@/components/ui"

export const FormFooter = () => {

    const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e.currentTarget.email.value);
        
    }

  return (
    <form onSubmit={formHandler} className="w-full">
            
            <div style={{boxShadow: '20px 70px 70px rgba(0, 0, 0, 0.2)'}}>
                <Input
                    type="email"
                    name="email"
                    placeholder="michael@ymail.com"
                    className="w-full text-[8px] sm:text-xs lg:text-lg border-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-0"
                />
            </div>
            
            <div className="mt-4">
                <Button
                    type="submit"
                    className="text-[8px] sm:py-3 sm:px-5 sm:text-xs lg:text-base lg:py-6 lg:px-8 rounded-md transition-colors"
                >
                    Subscribe Now
                </Button>
            </div>
          </form>
  )
}
