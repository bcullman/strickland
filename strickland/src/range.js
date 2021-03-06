import validate from './validate';
import minValidator from './min';
import maxValidator from './max';

export default function rangeValidator(validatorProps, maxProp) {
    return function validateRange(value, context) {
        let props;

        if (typeof validatorProps === 'function') {
            props = validatorProps(context);
        } else if (typeof validatorProps === 'number' && typeof maxProp === 'number') {
            props = {
                min: validatorProps,
                max: maxProp
            };
        } else {
            props = validatorProps;
        }

        const {min, max} = props;

        const result = validate([
            minValidator({min}),
            maxValidator({max})
        ], value, context);

        return {
            ...props,
            ...result
        };
    };
}
