import jsPDF from "jspdf";
export function generateInvestorPDF(deal) {
  const doc = new jsPDF();
  doc.text(`Brik by Brik Deal Analysis`, 10, 10);
  doc.text(`Address: ${deal.address}`, 10, 20);
  doc.text(`GDV: ${deal.gdv}`, 10, 30);
  doc.text(`Refurb: ${deal.refurb}`, 10, 40);
  doc.text(`Fees: ${deal.fees}`, 10, 50);
  doc.text(`Finance: ${deal.finance}`, 10, 60);
  doc.text(`Profit Margin: ${deal.profit}%`, 10, 70);
  doc.text(`True MAO: ${deal.mao}`, 10, 80);
  doc.save(`BrikByBrik_Deal_${deal.id}.pdf`);
}
