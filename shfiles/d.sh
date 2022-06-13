echo -e "initializing db..."
echo -e "\nreset db? y/n/b(exit)\n"

read INPUT

case $INPUT in

  y | Y)
    echo -e "\nreseting db..."

    cd ~/social-credit-bot-haha/db
    > database.sqlite
    cd ~/social-credit-bot-haha
    node ~/social-credit-bot-haha/init\ files/dbinit.js --f

    echo "db was reset successfully"
  ;;

  b | B)
    echo -e "\nprocess canceled\n"
    exit
  ;;

  n | N)
    node ~/social-credit-bot-haha/init\ files/dbinit.js --f
  ;;

  **)
    echo -e "\ninvalid input\n"
  ;;

esac

echo -e "\nprocess complete.\n"
# a simple script to initialize the database, or reset it fully if wanted. much faster than typing out the actual command, especially with wiping the database itself.