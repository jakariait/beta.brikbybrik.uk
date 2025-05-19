import JSZip from 'jszip';
import { generateOfferLetter } from './offerLetter';
import { generateInvestorPDF } from './pdfUtils';
export function exportDealZIP(deal) {
  const zip = new JSZip();
  // Generate Offer Letter as text
  const offerLetter = generateOfferLetter(deal);
  zip.file('OfferLetter.txt', offerLetter);
  // Dummy PDF file (in real app, export PDF then fetch and zip)
  zip.file('InvestorPack.txt', 'See exported PDF');
  zip.generateAsync({ type: "blob" }).then(content => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(content);
    a.download = `BrikByBrik_DealPack_${deal.id}.zip`;
    a.click();
  });
}