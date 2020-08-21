import {convertProPlayer, filterProPlayers, getPlayerDAO} from "./utils";

import {proPlayersFieldsToFilter} from "./enums";

class OpenDotaService {

    _apiBase = "https://api.opendota.com/api"

    _getResources = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Couldn't fetch: ${url}, status is: ${res.status}`)
        }
        return await res.json();
    }

    getHeroes = async () => {
        return this._getResources("/heroes");
    }

    getHeroStats = async () => {
        return this._getResources("/heroStats");
    }

    getProPlayer = async (accountId) => {
        if (typeof accountId !== 'number') {
            if (!parseInt(accountId, 10)) {
                throw new Error(`Player id must be number, provided: ${typeof accountId}, value is: ${accountId}`);
            }
        }

        const proPlayers = await this._getResources("/proPlayers");
        return proPlayers.find(proPlayer => proPlayer['account_id'] === accountId);
    }

    getProPlayers = async () => {
        const proPlayers = await this._getResources("/proPlayers");
        return filterProPlayers(proPlayers)(...proPlayersFieldsToFilter)
            .map(player => convertProPlayer(player));
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
                throw new Error(`Player id must be number, provided: ${typeof accountId}, value is: ${accountId}`);
            }
        }

        const [player, proPlayer, teams] = await Promise.all([
            this._getResources(`/players/${accountId}`),
            this.getProPlayer(accountId),
            this.getTeams(),
        ]);

        return getPlayerDAO(proPlayer, player, teams);
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
                throw new Error(`Team id must be number, provided: ${typeof teamId}, value is: ${teamId}`);
            }
        }

        const teams = this._getResources("/teams");
        return teams.find(team => team['team_id'] === teamId);
    }
}


export default OpenDotaService;