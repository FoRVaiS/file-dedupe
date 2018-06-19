const signatureProcessing = require('../lib/signature-processing');

describe('Signature Processing', () => {
    const fakeTarget = 'path/to/folder';
    const fakeExclusions = ['ignore/directory1', 'ignore/file2.txt'];
    const fakeOptions = { option1: false };

    let fakeRun;

    beforeEach(() => {
        fakeRun = jest.fn();
    });

    it('should demand a directory string', () => {
        expect(signatureProcessing()).toThrowError('You must define a target directory!');
    });

    it('should return the run function', () => {
        fakeRun = jest.fn().mockReturnValue(1);

        expect(signatureProcessing(fakeRun)('filler')).toBe(1);
    });

    describe('Target Directory', () => {
        it('should run checks against target', () => {
            signatureProcessing(fakeRun)(fakeTarget);

            expect(fakeRun.mock.calls[0]).toEqual([
                '',
                fakeTarget,
                [],
                {},
            ]);
        });

        it('should be able to tell if no exclusions were passed in', () => {
            signatureProcessing(fakeRun)(fakeTarget, fakeOptions);

            expect(fakeRun.mock.calls[0]).toEqual([
                '',
                fakeTarget,
                [],
                fakeOptions,
            ]);
        });

        it('should exclude specified paths', () => {
            signatureProcessing(fakeRun)(fakeTarget, fakeExclusions);

            expect(fakeRun.mock.calls[0]).toEqual([
                '',
                fakeTarget,
                fakeExclusions,
                {},
            ]);
        });

        it('should exclude specified paths with options', () => {
            signatureProcessing(fakeRun)(fakeTarget, fakeExclusions, fakeOptions);

            expect(fakeRun.mock.calls[0]).toEqual([
                '',
                fakeTarget,
                fakeExclusions,
                fakeOptions,
            ]);
        });
    });

    describe('Source & Target Directory', () => {
        const fakeSource = 'path/to/src/folder';

        it('should run checks against target while comparing to source', () => {
            signatureProcessing(fakeRun)(fakeSource, fakeTarget);

            expect(fakeRun.mock.calls[0]).toEqual([
                fakeSource,
                fakeTarget,
                [],
                {},
            ]);
        });

        it('should be able to tell if no exclusions were passed in', () => {
            signatureProcessing(fakeRun)(fakeSource, fakeTarget, fakeOptions);

            expect(fakeRun.mock.calls[0]).toEqual([
                fakeSource,
                fakeTarget,
                [],
                fakeOptions,
            ]);
        });

        it('should exclude specified paths', () => {
            signatureProcessing(fakeRun)(fakeSource, fakeTarget, fakeExclusions);

            expect(fakeRun.mock.calls[0]).toEqual([
                fakeSource,
                fakeTarget,
                fakeExclusions,
                {},
            ]);
        });

        it('should exclude specified paths with options', () => {
            signatureProcessing(fakeRun)(fakeSource, fakeTarget, fakeExclusions, fakeOptions);

            expect(fakeRun.mock.calls[0]).toEqual([
                fakeSource,
                fakeTarget,
                fakeExclusions,
                fakeOptions,
            ]);
        });
    });
});
