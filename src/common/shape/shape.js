import PropTypes from 'prop-types';

export const tableFilterShape = PropTypes.shape({
    globalFilter: PropTypes.func.isRequired,                                            // global filter function, it must be momoized
    popupText: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
    ]),                                                                                 // popup text for filter
    popupDelay: PropTypes.number,                                                       // popup delay
});

export const proPlayerShape = PropTypes.shape({
    account_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    steamid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    avatar: PropTypes.string.isRequired,
    avatarmedium: PropTypes.string.isRequired,
    country_code: PropTypes.string.isRequired,
    last_match_time: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    team_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    team_name: PropTypes.string.isRequired,
    rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
});

export const playerShape = PropTypes.shape({
    accountId: PropTypes.number.isRequired,
    avatar: PropTypes.string,
    countryCode: PropTypes.string.isRequired,
    lastMatch: PropTypes.string,
    nickname: PropTypes.string.isRequired,
    personName: PropTypes.string.isRequired,
    rank: PropTypes.number.isRequired,
    steamId: PropTypes.string.isRequired,
    team: PropTypes.shape({
        id: PropTypes.number.isRequired,
        logo: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        tag: PropTypes.string.isRequired,
    }).isRequired,
});