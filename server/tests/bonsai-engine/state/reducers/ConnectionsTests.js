import { expect }           from "chai";

import { ActionTypes }      from "../../../../bin/bonsai-engine/state/constants";
import connections          from "../../../../bin/bonsai-engine/state/reducers/connections";

describe('Engine: State: Connections Reducer', () => {

    describe('#connections.', () => {

        it('should return empty list by default', () => {
            let result = connections({}, {
                type: 'None'
            });

            expect(result).not.to.be.null;
            expect(result).to.be.an('object');
            expect(result).to.be.empty;
        });

        it('should create new empty connection on open', () => {
            let result = connections({}, {
                type: ActionTypes.CONNECTION_OPEN,
                id: 'abcd',
                session: null,
                user: null
            });

            expect(result).to.exist;
            expect(result).to.be.an('object');
            expect(result).to.have.keys('abcd');

            let item = result['abcd'];

            expect(item).to.exist;
            expect(item).to.deep.equals({
                id: 'abcd',
                session: null,
                user: null
            });
        });

        it('should not change others when adding', () => {
            let result = connections({
                'other': {
                    id: 'other',
                    session: 'sess',
                    user: 'user'
                }
            }, {
                type: ActionTypes.CONNECTION_OPEN,
                id: 'abcd',
                session: null,
                user: null
            });

            expect(result).to.exist;
            expect(result).to.be.an('object');
            expect(result).to.have.keys('other', 'abcd');

            let item = result['other'];

            expect(item).to.exist;
            expect(item).to.deep.equals({
                id: 'other',
                session: 'sess',
                user: 'user'
            });
        });

        it('should remove connection by id', () => {
            let result = connections({
                'abcd': {
                    id: 'abcd',
                    session: null,
                    user: null
                }
            }, {
                type: ActionTypes.CONNECTION_CLOSE,
                id: 'abcd',
            });

            expect(result).to.exist;
            expect(result).to.be.an('object');
            expect(result).to.not.have.keys('abcd');
        });

        it('should not change others when removing', () => {
            let result = connections({
                'other': {
                    id: 'other',
                    session: 'sess',
                    user: 'user'
                },
                'abcd': {
                    id: 'abcd',
                    session: null,
                    user: null
                }
            }, {
                type: ActionTypes.CONNECTION_CLOSE,
                id: 'abcd',
            });

            expect(result).to.exist;
            expect(result).to.be.an('object');
            expect(result).to.have.keys('other');

            var item = result['other'];

            expect(item).to.exist;
            expect(item).to.deep.equal({
                id: 'other',
                session: 'sess',
                user: 'user'
            });
        });

        it('should update session & user on attach', () => {
            let result = connections({
                'abcd': {
                    id: 'abcd',
                    session: null,
                    user: null
                },
                'other': {
                    id: 'other',
                    session: null,
                    user: null
                }
            }, {
                type: ActionTypes.SESSION_ATTACH,
                id: 'sessA',
                connection: 'abcd',
                user: 'userA'
            });

            expect(result).to.exist;
            expect(result).to.deep.equal({
                abcd: {
                    id: "abcd",
                    session: "sessA",
                    user: "userA"
                },
                other: {
                    id: "other",
                    session: null,
                    user: null
                }
            });
        });

        it('should update session & user on detach', () => {
            let result = connections({
                'abcd': {
                    id: 'abcd',
                    session: 'sessA',
                    user: 'userA'
                },
                'other': {
                    id: 'other',
                    session: 'sessO',
                    user: 'userO'
                }
            }, {
                type: ActionTypes.SESSION_DETACH,
                id: 'sessA'
            });

            expect(result).to.exist;
            expect(result).to.deep.equal({
                abcd: {
                    id: "abcd",
                    session: null,
                    user: null
                },
                other: {
                    id: "other",
                    session: "sessO",
                    user: "userO"
                }
            });
        });


    });

});