export const selectedHeroSelectors = {
    GET_SELECTED_HERO: (state) => state.heroes.selectedHero,
    GET_BENCHMARKS: (state) => state.heroes.selectedHero.benchmarks,
    GET_BENCHMARK_ERROR: (state) => state.heroes.selectedHero.benchmarkError,
}
