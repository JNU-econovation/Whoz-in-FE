npm run build
aws s3 sync ./build s3://whozin-front --profile=abas-be
