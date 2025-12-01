import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Palette, RotateCcw } from 'lucide-react';

function ColorCustomizer() {
  const { theme, updateColor, resetTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('primary.main');

  const colorOptions = [
    { label: 'Primary Main', key: 'primary.main' },
    { label: 'Primary Dark', key: 'primary.dark' },
    { label: 'Secondary Main', key: 'secondary.main' },
    { label: 'Success', key: 'status.success.main' },
    { label: 'Warning', key: 'status.warning.main' },
    { label: 'Error', key: 'status.error.main' },
    { label: 'Info', key: 'status.info.main' },
  ];

  const getColorValue = (key) => {
    const keys = key.split('.');
    let value = theme.colors;
    for (const k of keys) {
      value = value[k];
    }
    return value;
  };

  const handleColorChange = (e) => {
    updateColor(selectedColor, e.target.value);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Color Customizer trigger removed per request */}

      {/* Color Customizer Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white border border-gray-200 rounded-xl shadow-xl p-6 w-80">
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Color Customizer</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Color Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Color
              </label>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {colorOptions.map((option) => (
                  <option key={option.key} value={option.key}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Color Picker */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color Value
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={getColorValue(selectedColor)}
                  onChange={handleColorChange}
                  className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
                />
                <input
                  type="text"
                  value={getColorValue(selectedColor)}
                  onChange={handleColorChange}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono text-sm"
                />
              </div>
            </div>

            {/* Color Preview */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preview
              </label>
              <div
                className="w-full h-20 rounded-lg border-2 border-gray-200 transition-colors"
                style={{ backgroundColor: getColorValue(selectedColor) }}
              />
            </div>

            {/* Reset Button */}
            <button
              onClick={() => {
                resetTheme();
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset to Default
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ColorCustomizer;
