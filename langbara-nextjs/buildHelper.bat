@echo off

IF "%1"=="_app.tsx" goto keepFile 
IF "%1"=="_document.tsx" goto keepFile 
IF "%1"=="home.tsx" goto keepFile 
IF "%1"=="links.tsx" goto keepFile 

del pages\%1

:keepFile