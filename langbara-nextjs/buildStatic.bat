for /f %%f in ('dir /b pages\ ') do cmd /c buildHelper.bat %%f
ren pages\home.tsx index.tsx
cmd /c npm run static
git reset --hard