'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';

const languages = [
  { code: 'uz-CYRL', name: 'UZ', flag: '/uzbekistan.svg' },
  { code: 'ru', name: 'RU', flag: '/russia.svg' },
  { code: 'en', name: 'EN', flag: '/usa.svg' },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleLanguageChange = async (value: string) => {
    await i18n.changeLanguage(value);
  };

  const currentLang = languages.find((lang) => lang.code === i18n.language);

  return (
    <Select value={i18n.language} onValueChange={handleLanguageChange}>
      <SelectTrigger className=" h-8 bg-transparent border-none hover:bg-accent justify-end gap-2">
        <div className="flex items-center gap-2">
          <SelectValue placeholder={currentLang?.name} />
        </div>
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem
            key={lang.code}
            value={lang.code}
            className="cursor-pointer hover:bg-accent"
          >
            <div className="flex items-center gap-1">
              <Image
                src={lang.flag}
                alt={lang.name}
                width={16}
                height={16}
                className="rounded-sm"
              />
              <span>{lang.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
