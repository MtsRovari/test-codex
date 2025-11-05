'use client';

import { usePreferences } from '@/stores/usePreferences';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function FavoriteButton({ id, type }: { id: string; type: 'country' | 'visa' }) {
  const t = useTranslations('common');
  const favorites = usePreferences((state) => state.favorites);
  const toggleCountry = usePreferences((state) => state.toggleFavoriteCountry);
  const toggleVisa = usePreferences((state) => state.toggleFavoriteVisa);

  const isFavorite =
    type === 'country' ? favorites.countries.includes(id) : favorites.visas.includes(id);

  const handleClick = () => {
    if (type === 'country') {
      toggleCountry(id);
    } else {
      toggleVisa(id);
    }
  };

  return (
    <Button
      type="button"
      variant={isFavorite ? 'default' : 'outline'}
      onClick={handleClick}
      className="flex items-center gap-2"
      aria-pressed={isFavorite}
    >
      <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} aria-hidden />
      {isFavorite ? t('saved') : t(type === 'country' ? 'favoriteCountry' : 'favoriteVisa')}
    </Button>
  );
}
