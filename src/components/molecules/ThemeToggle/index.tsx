import React from 'react';
import { Moon, Sun, Laptop, Palette } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/atoms/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';

export function ThemeToggle() {
  const { theme, themeColor, setTheme, setThemeColor } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
          {theme === 'light' && <span className="ml-auto">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
          {theme === 'dark' && <span className="ml-auto">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          <Laptop className="mr-2 h-4 w-4" />
          <span>System</span>
          {theme === 'system' && <span className="ml-auto">✓</span>}
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Theme Color</DropdownMenuLabel>
        
        <DropdownMenuRadioGroup value={themeColor} onValueChange={(value) => setThemeColor(value as any)}>
          <DropdownMenuRadioItem value="green">
            <div className="mr-2 h-4 w-4 rounded-full bg-green-500" />
            <span>Green</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="blue">
            <div className="mr-2 h-4 w-4 rounded-full bg-blue-500" />
            <span>Blue</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="purple">
            <div className="mr-2 h-4 w-4 rounded-full bg-purple-500" />
            <span>Purple</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="orange">
            <div className="mr-2 h-4 w-4 rounded-full bg-orange-500" />
            <span>Orange</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="red">
            <div className="mr-2 h-4 w-4 rounded-full bg-red-500" />
            <span>Red</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
