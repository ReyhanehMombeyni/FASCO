'use server';

import { createClient } from '@/src/supabase/server';
import { SignUpFormData } from '../schemas/SignupSchema';
import { LoginFormData } from '../schemas/LoginSchema';
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export async function signUpUser({username, password, email}: SignUpFormData) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
        data: { 
            username, 
        }
    }
  });

  if (error) {
    console.error(error);
    return { success: false, message: error.message };
  }

  return {
    success: true,
    user: data.user
  }
}


export async function signInUser({ email, password }: LoginFormData) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Login Error:', error);
    return { 
      success: false, 
      message: error.message || "Failed to sign in. Please check your credentials." 
    };
  }
  
  return {
    success: true,
    user: data.user
  };
}


export async function signOutUser() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Logout Error:', error);
  }

  redirect('/login'); 
}


export async function signInWithGoogle() {
  const supabase = await createClient()
  const origin = (await headers()).get('origin')

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/callback`, 
    },
  })

  if (error) {
    console.error('Login Error:', error.message)
    return 
  }

  return redirect(data.url)
}

