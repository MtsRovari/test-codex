'use client';

import { Button } from '@/components/ui/button';
import { jsPDF } from 'jspdf';
import { useTranslations } from 'next-intl';

export function ChecklistPDFButton({ title, items }: { title: string; items: string[] }) {
  const t = useTranslations('common');
  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(title, 14, 20);
    doc.setFontSize(12);
    doc.text('Checklist generated for interview preparation. Estimates only.', 14, 30);
    items.forEach((item, index) => {
      const y = 40 + index * 10;
      doc.text(`☐ ${item}`, 14, y);
    });
    doc.save(`${title.replace(/\s+/g, '-').toLowerCase()}-checklist.pdf`);
  };

  return (
    <Button type="button" onClick={handleDownload} variant="secondary">
      {t('downloadChecklist')} (PDF)
    </Button>
  );
}
