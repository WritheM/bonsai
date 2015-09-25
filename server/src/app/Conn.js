class Conn {
    constructor(user, rules) {
        this.user = user;
        this.rules = [];
        rules.forEach(rule => {
            let pattern = "^"+(rule.replace('/\./g', '\\.').replace('/\*/g', '.*'))+"$";
            this.rules.push(new RegExp(rule));
        })

    }

    hasPermission(node) {
        rules.forEach(rule => {
           if (rule.test(node)) {
               return true;
           }
        });
        return false;
    }

}