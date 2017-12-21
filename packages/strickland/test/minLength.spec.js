import deepFreeze from 'deep-freeze';
import minLength from '../src/minLength';

describe('minLength', () => {
    describe('throws', () => {
        it('when minLength is non-numeric', () => {
            const validate = minLength('non-numeric');
            expect(() => validate()).toThrow();
        });
    });

    describe('with a single props argument', () => {
        const validate = minLength({minLength: 3, message: 'Custom message'});
        const result = validate('123');

        it('uses the min prop', () => {
            expect(result.minLength).toBe(3);
        });

        it('retains extra props', () => {
            expect(result.message).toBe('Custom message');
        });
    });

    describe('with the first argument as a number and the second as an object', () => {
        const validate = minLength(3, {message: 'Custom message'});
        const result = validate('123');

        it('sets the min prop', () => {
            expect(result.minLength).toBe(3);
        });

        it('retains extra props', () => {
            expect(result.message).toBe('Custom message');
        });
    });

    describe('returns the length on the result', () => {
        const validate = minLength(3);

        it('when the value is a string', () => {
            const result = validate('1234');
            expect(result.length).toBe(4);
        });

        it('when the value is null', () => {
            const result = validate(null);
            expect(result.length).toBe(0);
        });

        it('when the value is an empty string', () => {
            const result = validate('');
            expect(result.length).toBe(0);
        });

        it('when the value is 0 as a string', () => {
            const result = validate('0');
            expect(result.length).toBe(1);
        });

        it('when the value has leading spaces', () => {
            const result = validate('   1234');
            expect(result.length).toBe(7);
        });

        it('when the value has trailing spaces', () => {
            const result = validate('1234   ');
            expect(result.length).toBe(7);
        });

        it('when the value has leading and trailing spaces', () => {
            const result = validate('   1234   ');
            expect(result.length).toBe(10);
        });
    });

    describe('with minLength as a function', () => {
        let getMinLengthCalls = 0;

        const getMinLength = () => {
            return ++getMinLengthCalls;
        };

        beforeEach(() => {
            getMinLengthCalls = 0;
        });

        it('does not call the function during validator construction', () => {
            minLength(getMinLength);
            expect(getMinLengthCalls).toBe(0);
        });

        it('the function is called at the time of validation', () => {
            const validate = minLength(getMinLength);
            validate('A');

            expect(getMinLengthCalls).toBe(1);
        });

        it('validates using the function result', () => {
            getMinLengthCalls = 5;

            const validate = minLength(getMinLength);
            const result = validate('1234567');

            expect(result).toMatchObject({
                isValid: true,
                minLength: 6,
                value: '1234567',
                length: 7
            });
        });
    });

    describe('validates', () => {
        const validate = minLength(3);

        it('with the string length equal to the minLength, it is valid', () => {
            const result = validate('123');
            expect(result.isValid).toBe(true);
        });

        it('with the string length greater than the minLength, it is valid', () => {
            const result = validate('1234');
            expect(result.isValid).toBe(true);
        });

        it('with the string length less than the minLength, it is invalid', () => {
            const result = validate('12');
            expect(result.isValid).toBe(false);
        });

        it('with a null value, it is valid', () => {
            const result = validate(null);
            expect(result.isValid).toBe(true);
        });

        it('with an undefined value, it is valid', () => {
            const result = validate();
            expect(result.isValid).toBe(true);
        });
    });

    describe('with props passed into validation', () => {
        it('allows the minLength value to be specified at time of validation', () => {
            const validatorProps = {minLength: 6};
            const validate = minLength(validatorProps);
            const result = validate('12345', {minLength: 5});

            expect(result).toMatchObject({
                isValid: true,
                minLength: 5
            });
        });
    });

    describe('does not mutate props', () => {
        it('when a single props argument is used', () => {
            const props = {minLength: 5};
            deepFreeze(props);

            expect(() => minLength(props)('12345')).not.toThrow();
        });

        it('when a minLength value and props are used', () => {
            const props = {message: 'Custom message'};
            deepFreeze(props);

            expect(() => minLength(5, props)('12345')).not.toThrow();
        });
    });
});
