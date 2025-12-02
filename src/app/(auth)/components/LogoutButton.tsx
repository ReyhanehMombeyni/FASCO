'use client';

import { useUserStore } from '@/src/store';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function LogoutButton() {
  const router = useRouter();
  const clearUser = useUserStore((state) => state.clearUser);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('/logout', {
        method: 'POST',
      });
      
      const data = await response.json();

      if (data.success) {
        clearUser(); 
        
        router.push('/login');
      } else {
        alert(data.message || "Failed to log out.");
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      alert('An unexpected error occurred during logout.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handleLogout} 
      disabled={isLoading}
    >
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  );
}