import { expect }           from "chai";

import { dictReducer }          from "../../../../bin/bonsai-engine/state/reducers/helpers";

describe('Engine: State: Reducer Helpers', () => {

    describe('#dictReducer', () => {

        function addReducer(state, action) {
            return null;
        }

        function updateReducer(state, action) {
            return null;
        }

        function filter(state, action) {
            return true;
        }

        it('should call add reducer with state & action', () => {

            var initialState = {initial: "state"};
            var initialAction = {initial: "action"};

            var reducer = dictReducer((s,a) => {

                expect(s).to.deep.equal(initialState);
                expect(a).to.deep.equal(initialAction);

                return [];
            }, updateReducer, filter);

            var result = reducer(initialState, initialAction);
        });

        it('should add returned items from add reducer by id', () => {

            var item1 = {
                id: "one",
                number: 1
            };

            var item2 = {
                id: "two",
                number: 2
            };

            var reducer = dictReducer((s,a) => {
                return [
                    item1,
                    item2
                ]
            }, updateReducer, filter);

            var result = reducer({}, {});

            expect(result).to.exist;
            expect(result).to.have.keys("one", "two");

            expect(result["one"]).to.deep.equal(item1);
            expect(result["two"]).to.deep.equal(item2);
        });

        it('should add items without changing existing items', () => {

            var item1 = {
                id: "one",
                number: 1
            };

            var item2 = {
                id: "two",
                number: 2
            };

            var reducer = dictReducer((s,a) => {
                return [
                    item2
                ]
            }, updateReducer, filter);

            var result = reducer({
                "one": item1
            }, {});

            expect(result).to.exist;
            expect(result).to.have.keys("one", "two");

            expect(result["one"]).to.deep.equal(item1);
            expect(result["two"]).to.deep.equal(item2);
        });

        it('should reduce all items', () => {

            var item1 = {
                id: "one",
                number: 1
            };

            var item2 = {
                id: "two",
                number: 2
            };

            var reduced = [];

            var reducer = dictReducer(addReducer, (s, a) => {
                reduced.push({state: s, action: a});
                return null;
            }, filter);

            var action = {initial: "action"};

            var result = reducer({
                "one": item1,
                "two": item2
            }, action);

            expect(reduced).to.have.length(2);
            expect(reduced[0].state).to.deep.equal(item1);
            expect(reduced[0].action).to.deep.equal(action);
            expect(reduced[1].state).to.deep.equal(item2);
            expect(reduced[1].action).to.deep.equal(action);
        });

        it('should not modify items if updateReducer returns null', () => {

            var item1 = {
                id: "one",
                number: 1
            };

            var item2 = {
                id: "two",
                number: 2
            };

            var reducer = dictReducer(addReducer, (s, a) => {
                return null;
            }, filter);

            var action = {initial: "action"};

            var result = reducer({
                "one": item1,
                "two": item2
            }, action);

            expect(result).to.exist;
            expect(result).to.deep.equal({
                "one": item1,
                "two": item2
            });
        });

        it('should call updateReducer with item', () => {

            var item1 = {
                id: "one",
                number: 1
            };

            var item2 = {
                id: "two",
                number: 2
            };

            var calledWith = null;

            var reducer = dictReducer(addReducer, (s, a) => {
                calledWith = [s, a];
                return null;
            }, filter);

            var action = {initial: "action"};

            var result = reducer({
                "one": item1
            }, action);

            expect(calledWith).to.exist;
            expect(calledWith).to.deep.equal([
                item1,
                action
            ]);
        });

        it('should replace items with matching ids', () => {

            var item1 = {
                id: "one",
                number: 1
            };

            var item2 = {
                id: "two",
                number: 2
            };

            var newItem2 = {
                id: "two",
                thing: "else"
            };

            var reducer = dictReducer(addReducer, (s, a) => {
                return s.id == "two"
                    ? newItem2
                    : null;
            }, filter);

            var action = {initial: "action"};

            var result = reducer({
                "one": item1,
                "two": item2
            }, action);

            expect(result).to.exist;
            expect(result).to.deep.equal({
                "one": item1,
                "two": newItem2
            });
        });

        it('should remove items not matched by filter', () => {

            var item1 = {
                id: "one",
                number: 1
            };

            var item2 = {
                id: "two",
                number: 2
            };

            var reducer = dictReducer(addReducer, updateReducer, (i,a) => {
                return i.id != 'one';
            });

            var action = {initial: "action"};

            var result = reducer({
                "one": item1,
                "two": item2
            }, action);

            expect(result).to.exist;
            expect(result).to.deep.equal({
                "two": item2
            });
        });

    });

});
