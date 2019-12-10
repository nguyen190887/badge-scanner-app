STAGE=${1:-dev}
ENV_STAGE=${2:-$STAGE}
TEMP_FILE=sls-info.temp
ENV_FILE=../app/.env.development

if [ "$ENV_STAGE" = "prod" ]; then
    ENV_FILE=../app/.env.production
fi

cd ../stack
sls info -v -s $STAGE > $TEMP_FILE
getValue () {
    echo "$(grep $1: $TEMP_FILE | sed s/$1\:\ //g)"
}
printf "REGION=$(getValue region)"> $ENV_FILE
printf "\nCOGNITO_IDENTITYPOOL_ID=$(getValue IdentityPoolId)" >> $ENV_FILE
printf "\nCOGNITO_USERPOOL_ID=$(getValue UserPoolId)" >> $ENV_FILE
printf "\nCOGNITO_USERPOOL_CLIENT_ID=$(getValue UserPoolClientId)" >> $ENV_FILE
printf "\nAPPSYNC_ENDPOINT=$(getValue GraphQlApiUrl)" >> $ENV_FILE
printf "\nAPPSYNC_API_KEY=$(getValue GraphQlApiKeyDefault)" >> $ENV_FILE
printf "\nIMAGE_BUCKET=$(getValue ImageBucket)" >> $ENV_FILE
cd ../app
