export const getRefurbCost = (useBuilderCalc, refurbOption, builderCalc) => {
  if (useBuilderCalc) {
    const base = builderCalc.rate * builderCalc.duration * builderCalc.teamSize;
    return base + base * 0.05;
  }
  const tierCosts = {
    light: 10000,
    medium: 20000,
    heavy: 30000,
  };
  return tierCosts[refurbOption] + tierCosts[refurbOption] * 0.05;
};

export const getLeaseAdjustment = (leaseYears) => {
  if (leaseYears < 55) return 35000;
  if (leaseYears < 60) return 30000;
  if (leaseYears < 70) return 16000;
  if (leaseYears < 80) return 9000;
  return 0;
};

export const getOtherCosts = ({
  purchasePrice,
  builderCalc,
  refinanceFee,
  leaseYears,
  refurbCost,
}) => {
  const stampDuty = purchasePrice * 0.05;
  const bridgingInterest =
    ((purchasePrice * 0.15) / 12) * (builderCalc.duration || 6);
  const contingency = refurbCost * 0.1;

  return (
    500 + // RICS Survey Fee
    1500 + // Legal Fees
    stampDuty +
    bridgingInterest +
    refinanceFee +
    contingency +
    getLeaseAdjustment(leaseYears)
  );
};

export const calculateMAO = ({ gdv, roiPercent, refurbCost, otherCosts }) => {
  const profitTarget = gdv * roiPercent;
  const mao = gdv - (refurbCost + otherCosts + profitTarget);
  return Math.round(mao / 100) * 100;
};
