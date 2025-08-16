import { useTranslations } from 'next-intl';
import { redirect } from 'next/navigation';

export default function HomePage() {
  // Redirect to default locale
  redirect('/vi');
}