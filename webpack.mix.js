const mix = require('laravel-mix');

mix.ts('resources/js/dashboard.tsx', 'public/js').react()
   .ts('resources/js/main.tsx', 'public/js').react()
   .postCss('resources/css/tailwind.css', 'public/css', [
       require('tailwindcss'),
       require('autoprefixer'),
   ])
   .version();