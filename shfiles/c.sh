echo "deploying comands..."
echo -e "\nare you sure? y/n\n"

read INPUT

if [[ $INPUT == 'n' || $INPUT == 'N' ]]
then
  echo -e "\nprocess canceled\n"
  exit
fi
node ~/social-credit-bot-haha/init\ files/deploycommands.js
echo -e "process complete\n"