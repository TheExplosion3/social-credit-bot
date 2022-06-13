echo -e "initializing db..."
echo -e "\nreset db? y/n/b(exit)\n"
read INPUT

if [[ $INPUT == 'y' || $INPUT == 'Y' ]]
then

  echo -e "\nreseting db..."

  cd ~/social-credit-bot-haha/db
  > database.sqlite
  cd ~/social-credit-bot-haha

  echo "db was reset successfully"

elif [[ $INPUT == 'b' || $INPUT == 'B' ]]
then

  echo -e "\nprocess canceled\n"
  exit

fi

node ~/social-credit-bot-haha/init\ files/dbinit.js --f
echo -e "\nprocess complete.\n"
# a simple script to initialize the database, or reset it fully if wanted. much faster than typing out the actual command, especially with wiping the database itself.