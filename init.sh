echo -e "which file would you like to use?\nc: deploycommands.js | d: dbInit.js"

read CHOICE
cd ~/social-credit-bot-haha/shfiles

case $CHOICE in

  c | C)
    ./c.sh
  ;;

  d | D)
    ./d.sh
  ;;

  **)
    echo -e "invalid input"
    exit
  ;;

esac

# this program uses d.sh and c.sh, or rather calls upon them to run. why did i make this? im lazy and would rather only have 1 command to key in than 2 possible ones, and its in the main directory so its just overall easier.