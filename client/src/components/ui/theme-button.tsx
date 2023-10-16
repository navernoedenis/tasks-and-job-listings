import { useTheme, type Theme } from '@/features/theme';
import { LuSun, LuMoon } from 'react-icons/lu';
import { MdBrightnessAuto } from 'react-icons/md';

export function ThemeButton() {
  const { theme, setTheme } = useTheme();

  let nextTheme: Theme;
  switch (theme) {
    case 'dark': {
      nextTheme = 'light';
      break;
    }
    case 'light':
    case 'system':
      nextTheme = 'dark';
      break;
  }

  return (
    <button className='text-[20px]' onClick={() => setTheme(nextTheme)}>
      {theme === 'dark' && <LuMoon />}
      {theme === 'light' && <LuSun />}
      {theme === 'system' && <MdBrightnessAuto />}
    </button>
  );
}
