"use client"
import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function ToggleBtn() {
  const [theme, setTheme] = useState<string>('dark');
  const { theme: activeTheme, setTheme: setActiveTheme } = useTheme();

  const toggleTheme = () => {
    let newTheme;
    if (theme === 'dark') {
      newTheme = 'luxury';
    } else if (theme === 'luxury') {
      newTheme = 'synthwave';
    } else {
      newTheme = 'dark';
    }
    setTheme(newTheme);
    setActiveTheme(newTheme);
  };

  useEffect(() => {
    document.querySelector('html')?.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <main>
      <div className="flex flex-row justify-center">
        <div className="form-control ">
          <label className="cursor-pointer label">
            <span className="label-text">Luxury </span>
            <input
              onClick={toggleTheme}
              type="checkbox"
              checked={theme === 'luxury'}
              className={`toggle toggle-primary ${
                theme === 'luxury' ? 'toggle-checked' : ''
              }`}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="cursor-pointer label">
            <span className="label-text">Dark</span>
            <input
              onClick={toggleTheme}
              type="checkbox"
          
              className={`toggle toggle-secondary ${
                theme === 'dark' ? 'toggle-checked' : ''
              }`}
            />
          </label>
        </div>
        
        <div className="form-control">
          <label className="cursor-pointer label">
            <span className="label-text">Grapsy</span>
            <input
              onClick={toggleTheme}
              type="checkbox"
             
              className={`toggle toggle-accent ${
                theme === 'synthwave' ? 'toggle-checked' : ''
              }`}
            />
          </label>
        </div>
      </div>
    </main>

    
  );
}