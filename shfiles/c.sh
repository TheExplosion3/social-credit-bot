echo "deploying comands..."
echo -e "\nare you sure? y/n\n"

read INPUT

case $INPUT in

  n | N)
    echo -e "\nprocess canceled\n"
    exit
  ;;

  y | Y)
    node ~/social-credit-bot-haha/init\ files/deploycommands.js
  ;;

  **)
    echo -e "\ninvalid input\n"
    exit
  ;;

esac

echo -e "\nprocess complete\n"