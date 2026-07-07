const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'Hero.tsx', 'Experience.tsx', 'Skills.tsx', 'Achievements.tsx', 'Contact.tsx', 'ThemeToggle.tsx'
];

filesToUpdate.forEach(file => {
  const filepath = path.join('/Users/yashvardhan/Documents/GitHub/portfolio-website/components', file);
  if (fs.existsSync(filepath)) {
    let content = fs.readFileSync(filepath, 'utf8');
    
    // Replace all panel backgrounds to use the new --panel-bg variable
    content = content.replace(/bg-\[var\(--background\)\]/g, 'bg-[var(--panel-bg)]');
    
    fs.writeFileSync(filepath, content);
  }
});
console.log("Panel backgrounds updated!");
