import { expect }   from "chai"

import Router       from "../../bin/app/Router"

describe('App: Router', () => {
    describe('#getRoute', () => {
        it('should return handler for a given path', () => {

            let callback = () => { /* Do Nothing */ };
            let router = new Router();
            router.addRoute('some_path', callback);

            let returned = router.getRoute('some_path');

            expect(returned).to.not.be.null;
            expect(returned).is.a('function');

            expect(returned).to.equal(callback);
        });
    });
});
