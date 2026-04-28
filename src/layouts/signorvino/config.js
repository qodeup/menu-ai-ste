export const schema = {
  buttonShape:  { type: 'select', options: ['rounded', 'square', 'pill'], label: 'Forma dei bottoni' },
  accentColor:  { type: 'color', label: 'Colore accento' },
}

export const defaults = {
  buttonShape:  'rounded',
  accentColor:  '#8B1A1A',
}
