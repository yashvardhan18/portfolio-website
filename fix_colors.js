const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'Hero.tsx', 'Experience.tsx', 'Skills.tsx', 'Achievements.tsx', 'Contact.tsx'
];

filesToUpdate.forEach(file => {
  const filepath = path.join('/Users/yashvardhan/Documents/GitHub/portfolio-website/components', file);
  if (fs.existsSync(filepath)) {
    let content = fs.readFileSync(filepath, 'utf8');
    
    // Text colors
    content = content.replace(/(?<!hover:)text-white/g, 'text-[var(--foreground)]');
    content = content.replace(/text-gray-300/g, 'text-[var(--foreground)] opacity-80');
    content = content.replace(/text-gray-400/g, 'text-[var(--foreground)] opacity-60');
    
    // Backgrounds
    content = content.replace(/(?<!border-|_)bg-black/g, 'bg-[var(--background)]');
    content = content.replace(/bg-\[\#121212\]/g, 'bg-[var(--background)]');
    content = content.replace(/bg-gray-900/g, 'bg-[var(--background)]');
    
    // Borders
    content = content.replace(/(?<!-)border-black/g, 'border-[var(--foreground)]');
    
    // Shadows
    content = content.replace(/_black\]/g, '_var(--foreground)]');
    
    fs.writeFileSync(filepath, content);
  }
});
console.log("Fixes applied!");
