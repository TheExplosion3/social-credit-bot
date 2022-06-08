echo "deploying comands..."
echo -e "\nare you sure? y/n\n"

read input
if [[ $input == 'n' || $input == 'N' ]]
then
  echo -e "\nprocess canceled\n"
  exit
fi
node init\ files/deploycommands.js
echo -e "process complete\n"