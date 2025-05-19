export function calculateTrueMAO({ gdv, refurb, fees, finance, profitMargin }) {
  const profit = gdv * (profitMargin / 100);
  const totalCosts = refurb + fees + finance + profit;
  return Math.round(gdv - totalCosts);
}