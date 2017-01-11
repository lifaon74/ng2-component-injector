REM This script finds all *.ts files (recursivly in all sub directories)
REM and removes the associated *.js and *.js.map files.
REM the folder "node_modules" is excluded from this process.

@echo off
echo Removing transpiled files. Please wait...

for /R %%I in (*.ts) do (
	echo "%%~pI%%~nI"

    (echo "%%~pI" | FIND /I "node_modules" 1>NUL) || (
        if exist %%~pI%%~nI.js del %%~pI%%~nI.js
        if exist %%~pI%%~nI.js.map del %%~pI%%~nI.js.map
        if exist %%~pI%%~nI.d.ts del %%~pI%%~nI.d.ts
        if exist %%~pI%%~nI.ngfactory.ts del %%~pI%%~nI.ngfactory.ts
        if exist %%~pI%%~nI.metadata.json del %%~pI%%~nI.metadata.json
    )
)

echo Done
@pause