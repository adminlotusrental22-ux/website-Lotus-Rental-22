// Keep previously shared links working while new navigation uses #city-tour.
export function isCityTourRoute(hash: string) {
  return hash === '#city-tour' || hash === '#private-tour' || hash.startsWith('#tour-');
}
