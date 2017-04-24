New-Item -ItemType Directory -Name .\build\development
npm run build:production  -- --output-path ./build --output-public-path /orbit/
npm run build:development -- --output-path ./build/development --output-public-path /orbit/development/
gh-pages -d build
Remove-Item -Path .\build -Recurse
