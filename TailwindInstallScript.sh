#!/bin/bash
# Create an empty index.html and style.css and install Tailwind
# You juste have to use the dist/style.css in html

# Variables:
cssBaseFolder="css"
cssBaseFile="style.css"
cssTailwindFolder="dist"
cssTailwindFile="style.css"
configContent="['./**/*.{html,js}']"

# Script:
touch index.html
npm init -y
npm install -D tailwindcss
npx tailwindcss init
sed -i "\|content|s|\[.*\]|$configContent|" tailwind.config.js
mkdir $cssBaseFolder
touch $cssBaseFile
mv $cssBaseFile $cssBaseFolder
echo "@tailwind base;" > $cssBaseFolder/$cssBaseFile
echo "@tailwind components;" >> $cssBaseFolder/$cssBaseFile
echo "@tailwind utilities;" >> $cssBaseFolder/$cssBaseFile
sed -i '7 s/.*/\t\t"Watch": "'"npx tailwindcss -i .\/$cssBaseFolder\/$cssBaseFile -o .\/$cssTailwindFolder\/$cssTailwindFile --watch"'"/g' package.json
npx tailwindcss -i ./$cssBaseFolder/$cssBaseFile -o ./$cssTailwindFolder/$cssTailwindFile --watch