
'use server'
 
import { redirect } from 'next/navigation'
 
export async function handleSearch(formData: FormData) {
  const searchParams = new URLSearchParams();
  const category = formData.get('category') as string || 'cars';

  for (const [key, value] of formData.entries()) {
    if (value && key !== 'category' && value !== 'all' && value !== 'same') {
      searchParams.set(key, value as string);
    }
  }

  const queryString = searchParams.toString();
  const finalUrl = `/search/${category}?${queryString}`;
  
  redirect(finalUrl);
}

