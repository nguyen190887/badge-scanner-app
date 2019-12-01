
# URL="$(serverless info --verbose | grep UserPoolClientId | sed s/UserPoolClientId\:\ //g)"
cd stack
TEMP_FILE=sls-info.temp
ENV_FILE=.env.development

# sls info -v > $TEMP_FILE
getValue () {
    echo "$(grep $1: $TEMP_FILE | sed s/$1\:\ //g)"
}
printf "REGION=$(getValue region)"> $ENV_FILE
printf "\nIDENTITYPOOL_ID=$(getValue IdentityPoolId)" >> $ENV_FILE
printf "\nUSERPOOL_ID=$(getValue UserPoolId)" >> $ENV_FILE
printf "\nCLIENT_ID=$(getValue UserPoolClientId)" >> $ENV_FILE
printf "\nAPPSYNC_ENDPOINT=$(getValue GraphQlApiUrl)" >> $ENV_FILE
printf "\nAPPSYNC_API=$(getValue GraphQlApiKeyDefault)" >> $ENV_FILE
printf "\nBUCKET_NAME=badge-scanner-store-image-dev" >> $ENV_FILE
cd ..
