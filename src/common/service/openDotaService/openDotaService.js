import {filterProPlayers, toCommonMatchesStatsDTO, toMatchDTO, toPlayerDTO, toProPlayerDTO, toTeamsDTO} from "./utils";

import {proPlayersFieldsToFilter} from "./enums";
import Cache from "../cache";

import NotFoundException from "../../error/not-found";


class OpenDotaService {

    _apiBase = "https://api.opendota.com/api"
    _cache = new Cache();

    _getResources = async (url) => {
        let res;

        if (this._cache.has(url)) {
            return this._cache.get(url);
        }

        res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`Couldn't fetch: ${url}, status is: ${res.status}`)
        }

        return this._cache.put(url, await res.json());
    }

    _getPlayer = async (accountId) => {
        return this._getResources(`/players/${accountId}`)
            .then(res => {
                // if there is no player with id it will return empty object, not code 404
                if (!res || !res.profile) {
                    console.error(`_getPlayer (${accountId}), player with accountId: ${accountId} was not found`);
                    throw new NotFoundException(`Player with accountId: ${accountId} was not found!`)
                }
                return res;
            });
    };

    getHeroes = async () => {
        return this._getResources("/heroes");
    }

    getHeroStats = async () => {
        return this._getResources("/heroStats");
    }


    getProPlayer = async (accountId) => {
        if (typeof accountId !== 'number') {
            if (!parseInt(accountId, 10)) {
                console.error(`getProPlayer (${accountId}), player id must be number, provided: ${typeof accountId}, value is: ${accountId}`);
                throw new Error(`Player id must be number, provided: ${typeof accountId}, value is: ${accountId}`);
            }
        }

        const proPlayers = await this._getResources("/proPlayers");
        return proPlayers.find(proPlayer => proPlayer['account_id'] === parseInt(accountId));
    }

    getProPlayers = async () => {
        const proPlayers = await this._getResources("/proPlayers");
        return filterProPlayers(proPlayers)(...proPlayersFieldsToFilter)
            .map(player => toProPlayerDTO(player));
    }


    /**
     * This function compose general information about
     * player. For this we need call to different endpoint and
     * merge responses.
     *
     * @param accountId - account id
     */
    getPlayer = async (accountId) => {
        if (typeof accountId !== 'number') {
            if (!parseInt(accountId, 10)) {
                console.error(`getPlayer (${accountId}), player id must be number, provided: ${typeof accountId}, value is: ${accountId}`);
                throw new Error(`Player id must be number, provided: ${typeof accountId}, value is: ${accountId}`);
            }
        }

        const [player, proPlayer, teams] = await Promise.all([
            this._getPlayer(accountId),
            this.getProPlayer(accountId),
            this.getTeams(),
        ]);

        return toPlayerDTO(proPlayer, player, teams);
    }


    /**
     * This functions return all available teams
     */
    getTeams = async () => {
        const teams = await this._getResources("/teams");
        return toTeamsDTO(...teams);
    }

    getTeam = async (teamId) => {
        if (typeof teamId !== 'number') {
            if (!parseInt(teamId, 10)) {
                console.error(`getTeam (${teamId}), team id must be number, provided: ${typeof teamId}, value is: ${teamId}`);
                throw new Error(`Team id must be number, provided: ${typeof teamId}, value is: ${teamId}`);
            }
        }

        const teams = this._getResources("/teams");
        return teams.find(team => team['team_id'] === teamId);
    }


    _getRecentMatches = async (accountId) => {
        return this._getResources(`/players/${accountId}/recentmatches`);
    }

    getRecentPlayerMatchesStats = async (accountId) => {
        if (typeof accountId !== 'number') {
            if (!parseInt(accountId, 10)) {
                console.error(`getPlayer (${accountId}), player id must be number, provided: ${typeof accountId}, value is: ${accountId}`);
                throw new Error(`Player id must be number, provided: ${typeof accountId}, value is: ${accountId}`);
            }
        }

        const last20Matches = await this._getRecentMatches(accountId);
        return toCommonMatchesStatsDTO(last20Matches.slice(0, 5));
    }


    _getMatch = async (matchId) => {
        return await this._getResources(`/matches/${matchId}`)
    }

    _getMatchStat = async (matchId, accountId) => {
        if (typeof matchId !== 'number') {
            if (!parseInt(matchId, 10)) {
                console.error(`getMatchStat (${matchId}), match id must be number, provided: ${typeof matchId}, value is: ${matchId}`);
                throw new Error(`Match id must be number, provided: ${typeof matchId}, value is: ${matchId}`);
            }
        }
        if (typeof accountId !== 'number') {
            if (!parseInt(accountId, 10)) {
                console.error(`getPlayer (${accountId}), player id must be number, provided: ${typeof accountId}, value is: ${accountId}`);
                throw new Error(`Player id must be number, provided: ${typeof accountId}, value is: ${accountId}`);
            }
        }

        const [heroes, match] = await Promise.all([
            this.getHeroStats(),
            this._getMatch(matchId),
        ]);

        return toMatchDTO(match, heroes, accountId);
    }

    getLastMatchesStats = async (matchesIds = [], accountId) => {
        if (typeof accountId !== 'number') {
            if (!parseInt(accountId, 10)) {
                console.error(`getPlayer (${accountId}), player id must be number, provided: ${typeof accountId}, value is: ${accountId}`);
                throw new Error(`Player id must be number, provided: ${typeof accountId}, value is: ${accountId}`);
            }
        }

        if (matchesIds.length > 20) {
            console.error("To many matches requested! It may cause some trouble on API side. (There is restriction on number of requests)")
        }

        return await Promise.all([
            ...matchesIds.map(matchId => this._getMatchStat(matchId, accountId)),
        ]);
    }
}


export default OpenDotaService;