import fieldValue from './fieldValue';
import { lte } from 'lodash';

export default function lengthValidator(min = 0, max = min, props) {
    props = props || {};

    if (lte(max, min)) {
        max = min;
    }

    if (min === max) {
        props.message = props.message || `Length of ${min}`;
    } else {
        props.message = props.message || `Length between ${min} and ${max}`;
    }

    return fieldValue('length', min, max, props);
}