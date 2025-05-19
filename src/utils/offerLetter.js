export function generateOfferLetter(deal) {
  return `
Brik by Brik Offer Letter
Property: ${deal.address}
Our calculated True MAO: ${deal.mao}
Dear Seller/Agent,
Following thorough analysis and due diligence, we are pleased to present our formal offer for your
property at ${deal.address}.
This offer reflects all current market conditions, required refurbishment, professional fees, and
our need for a fair investment margin.
Offer: ${deal.mao}
We are cash/bridging-ready and can move quickly to exchange and completion. We believe this is a
highly competitive offer, and we would welcome a conversation to progress.
Kind regards,
Brik by Brik Team
 `;
}
