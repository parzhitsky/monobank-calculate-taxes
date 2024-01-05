import { calculateTaxes } from './calculate-taxes/calculate-taxes.js'

await calculateTaxes({
  year: 2023,
  quarter: 'Fourth',
})
