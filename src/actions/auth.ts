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


export async function resetPasswordAction(email: string) {
  const supabase = await createClient();
  
  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) return { success: false, message: error.message };

  redirect(`/confirmation-window?email=${encodeURIComponent(email)}`);
}

export async function verifyOtpAction(email: string, token: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: 'recovery',
  });

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true };
}

export async function updatePasswordAction(password: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, message: "Password updated successfully." };
}
