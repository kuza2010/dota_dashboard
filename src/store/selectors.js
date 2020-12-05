export const selectedHeroSelectors = {
    GET_SELECTED_HERO: (state) => state.heroes.selectedHero,
    GET_BENCHMARKS: (state) => state.heroes.selectedHero.benchmarks,
    GET_BENCHMARK_ERROR: (state) => state.heroes.selectedHero.benchmarkError,
}

export const heroSelectors = {
    GET_ALL_HEROES: (state) => state.heroes.allHeroes.heroes,
    GET_ALL_HEROES_LOADING: (state) => state.heroes.selectedHero.benchmarks,
    GET_ALL_HEROES_ERROR: (state) => state.heroes.selectedHero.benchmarkError,
}

export const teamSelectors = {
    GET_ALL_TEAMS: (state) => state.teams.allTeams,
}

export const playerSelectors = {
    GET_ALL_PLAYERS: (state) => state.players.players,
    GET_PLAYERS_ERROR: (state) => state.players.error,
    GET_PLAYERS_LOADING: (state) => state.players.loading,

    GET_PLAYER: (state) => state.player.player,
    GET_PLAYER_ERROR: (state) => state.player.error,
    GET_PLAYER_LOADING: (state) => state.player.loading,
}

export const playerStatsSelector = {
    GET_PLAYER_STATS: (state) => state.playerStats,
    GET_PLAYER_FULL_STATS: (state) => state.playerStats.fullStat,
}