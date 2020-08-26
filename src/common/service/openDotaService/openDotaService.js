import {filterProPlayers, toCommonStatsDTO, toPlayerDTO, toProPlayerDTO} from "./utils";

import {proPlayersFieldsToFilter} from "./enums";

import NotFoundException from "../../error/not-found";


class OpenDotaService {

    _apiBase = "https://api.opendota.com/api"

    _getResources = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Couldn't fetch: ${url}, status is: ${res.status}`)
        }
        return await res.json();
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
        return this._getResources("/teams");
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

    getPlayerStats = async (accountId) => {
        if (typeof accountId !== 'number') {
            if (!parseInt(accountId, 10)) {
                console.error(`getPlayer (${accountId}), player id must be number, provided: ${typeof accountId}, value is: ${accountId}`);
                throw new Error(`Player id must be number, provided: ${typeof accountId}, value is: ${accountId}`);
            }
        }

        const last20Matches = await this._getResources(`/players/${accountId}/recentmatches`)
        return toCommonStatsDTO(last20Matches);
    }

}


export default OpenDotaService;