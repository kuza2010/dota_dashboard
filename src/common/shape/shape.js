import PropTypes from 'prop-types';

export const tableFilterShape = PropTypes.shape({
    globalFilter: PropTypes.func.isRequired,                                            // global filter function, it must be momoized
    popupText: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
    ]),                                                                                 // popup text for filter
    popupDelay: PropTypes.number,                                                       // popup delay
});

/**
 * Describe pro player model:
 *
 *  account_id - pro player account id
 *  steamid - pro player steam id
 *  avatar - avatar url (steam)
 *  avatarmedium - avatar medium
 *  country_code - ISO2 or ISO3 country code format
 *  last_match_time - last match date
 *  name - nickname
 *  team_id - team id
 *  team_name - team name
 *  rating - solo rating
 */
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

/**
 * Describe team model with is used inside playerShape:
 *
 *  id - team id
 *  logo - team banner
 *  name - team name
 *  tag - team tag aka shortcut name
 */
export const playerTeamShape = PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    logo: PropTypes.string,
})

/**
 * Describe player model with is used in player-page:
 *
 *  accountId - pro player account id
 *  avatar - avatar url (steam)
 *  countryCode - ISO2 or ISO3 country code format
 *  lastMatch - last match date
 *  nickname - nickname
 *  personName - i dont know what is it
 *  rank - solo rating
 *  steamId - steam id
 *  team - playerTeamShape
 */
export const playerShape = PropTypes.shape({
    accountId: PropTypes.number.isRequired,
    avatar: PropTypes.string,
    countryCode: PropTypes.string.isRequired,
    lastMatch: PropTypes.string,
    nickname: PropTypes.string.isRequired,
    personName: PropTypes.string.isRequired,
    steamId: PropTypes.string.isRequired,
    team: playerTeamShape.isRequired,
    rank: PropTypes.number,
    EstimateRank: PropTypes.number,
});

/**
 *
 * Describe player recent matched. It is used for calculating user
 * player role (mid, offlane, support or carry)
 *
 *  matchId - match id
 *  playerSlot - player slot
 *  gameMode - game mode (rating, lobby, regular match)
 *  lobbyType - lobby type
 *  kills - number of kills
 *  deaths - number of deaths
 *  assists - number of assists
 *  lane - number lane
 *  laneRole - lane role
 */
export const commonStatsShape = PropTypes.arrayOf(
    PropTypes.shape({
        matchId: PropTypes.number.isRequired,
        playerSlot: PropTypes.number.isRequired,
        gameMode: PropTypes.number.isRequired,
        lobbyType: PropTypes.number.isRequired,
        kills: PropTypes.number.isRequired,
        deaths: PropTypes.number.isRequired,
        assists: PropTypes.number.isRequired,
        lane: PropTypes.number,
        laneRole: PropTypes.number,
    }).isRequired
);

/**
 * Describe teams shape. It used on Teams page.
 */
export const teamsShape = PropTypes.arrayOf(
    PropTypes.shape({
        teamId: PropTypes.number.isRequired,
        rating: PropTypes.number.isRequired,
        wins: PropTypes.number.isRequired,
        losses: PropTypes.number.isRequired,
        lastMatchTime: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        tag: PropTypes.string.isRequired,
        logo: PropTypes.string.isRequired,
    })
)

export const recentMatchesShape = PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    stats: commonStatsShape.isRequired,
    error: PropTypes.instanceOf(Error),     // or null if there is no error
});