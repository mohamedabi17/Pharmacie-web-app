"use client"
import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function ToggleBtn() {
  const [theme, setTheme] = useState<string>('night');
  const { theme: activeTheme, setTheme: setActiveTheme } = useTheme();

  const toggleTheme = () => {
    let newTheme;
    if (theme === 'night') {
      newTheme = 'aqua';
    } else if (theme === 'aqua') {
      newTheme = 'lemonade';
    } else {
      newTheme = 'night';
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
            <span className="label-text">aqua </span>
            <input
              onClick={toggleTheme}
              type="checkbox"
              checked={theme === 'aqua'}
              className={`toggle toggle-primary ${
                theme === 'aqua' ? 'toggle-checked' : ''
              }`}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="cursor-pointer label">
            <span className="label-text">night</span>
            <input
              onClick={toggleTheme}
              type="checkbox"
          
              className={`toggle toggle-secondary ${
                theme === 'night' ? 'toggle-checked' : ''
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
                theme === 'lemonade' ? 'toggle-checked' : ''
              }`}
            />
          </label>
        </div>
      </div>
    </main>

    
  );
}