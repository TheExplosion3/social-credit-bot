echo -e "\nreset db? y/n\n"
read input
if [[ $input -eq 'y' ]]
then
  echo -e "\nreseting db..."
  > db/database.sqlite
  echo "db was reset successfully"
fi
node init\ files/dbInit.js
echo -e "process complete.\n"
# a simple script to initialize the database, or reset it fully if wanted
