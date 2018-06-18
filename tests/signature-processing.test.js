const signatureProcessing = require('../lib/signature-processing');

describe('Signature Processing', () => {
    it('should demand a directory string', () => {
        expect(signatureProcessing()).toThrowError('You must define a target directory!');
    });

    it('should return the run function', () => {
        const fakeRun = jest.fn().mockReturnValue(1);

        expect(signatureProcessing(fakeRun)('filler')).toBe(1);
    });

    describe('Single Target Directory', () => {
        describe('Exclusions', () => {
            const fakeTarget = 'path/to/file';
            const fakeExclusions = ['ignore/directory1', 'ignore/file2.txt'];
            const fakeOptions = { option1: false };

            let fakeRun;

            beforeEach(() => {
                fakeRun = jest.fn();
            });

            it('should run checks against target', () => {
                signatureProcessing(fakeRun)(fakeTarget);

                expect(fakeRun.mock.calls[0][0]).toEqual(fakeTarget);
            });

            it('should be able to tell if no exclusions were passed in', () => {
                signatureProcessing(fakeRun)(fakeTarget, fakeOptions);

                expect(fakeRun.mock.calls[0]).toEqual([
                    fakeTarget,
                    [],
                    fakeOptions,
                ]);
            });

            it('should exclude specified paths', () => {
                signatureProcessing(fakeRun)(fakeTarget, fakeExclusions);

                expect(fakeRun.mock.calls[0][1]).toEqual(fakeExclusions);
            });
        });
    });
});
