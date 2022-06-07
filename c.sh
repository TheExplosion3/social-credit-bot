echo "deploying comands..."
echo "\nare you sure? y/n\n"

read input
if [[ $input == 'n' || $input == 'N' ]]
then
  echo "\nprocess canceled\n"
  exit
fi
node init\ files/deploycommands.js
echo "process complete\n"