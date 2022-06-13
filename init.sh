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


