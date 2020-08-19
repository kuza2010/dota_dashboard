import PropTypes from 'prop-types';

export const tableFilterShape = PropTypes.shape({
    globalFilter: PropTypes.func.isRequired,                                            // global filter function, it must be momoized
    popupText: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
    ]),                                                                                 // popup text for filter
    popupDelay: PropTypes.number,                                                       // popup delay
});