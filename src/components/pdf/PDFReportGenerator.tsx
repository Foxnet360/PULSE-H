import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { AssessmentResult } from '../../types/assessment';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { trackPDFDownload } from '../../utils/analytics';

interface PDFReportGeneratorProps {
  result: AssessmentResult;
}

const dimensionLabels: Record<string, string> = {
  energia: 'Mi Energía (Agotamiento Emocional)',
  conexion: 'Mi Conexión (Relación & Empatía)',
  proposito: 'Mi Propósito (Realización Personal)',
  entorno: 'Mi Entorno (Factores de Clima)',
  equilibrio: 'Mi Equilibrio (Vida - Trabajo)',
  fortaleza: 'Mi Fortaleza (Resiliencia & Recursos)',
  ae: 'Agotamiento Emocional',
  dp: 'Despersonalización',
  rp: 'Realización Personal',
  for: 'Factores Organizacionales',
  cvt: 'Conciliación Vida-Trabajo',
  rri: 'Resiliencia & Recursos',
};

async function loadLogoImage(): Promise<{ dataUrl: string; width: number; height: number } | null> {
  try {
    const response = await fetch('/logo.png');
    if (!response.ok) return null;
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        const img = new Image();
        img.onload = () => {
          resolve({
            dataUrl,
            width: img.naturalWidth || 100,
            height: img.naturalHeight || 100,
          });
        };
        img.onerror = () => resolve(null);
        img.src = dataUrl;
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

const PDFReportGenerator: React.FC<PDFReportGeneratorProps> = ({ result }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    trackPDFDownload();

    try {
      const doc = new jsPDF('p', 'mm', 'a4');
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 16;
      const contentWidth = pageWidth - margin * 2;

      // Color Tokens
      const NAVY = [13, 17, 26];       // #0D111A Deep Night Navy
      const PRIMARY = [46, 134, 171];  // #2E86AB Primary Teal
      const GOLD = [245, 166, 35];     // #F5A623 Warm Accent Gold
      const SLATE = [100, 116, 139];   // #64748B Slate Text
      const LIGHT_BG = [248, 250, 252]; // #F8FAFC
      const BORDER = [226, 232, 240];  // #E2E8F0

      const logoInfo = await loadLogoImage();

      // Header renderer
      const addHeader = (subtitle: string = 'Diagnóstico de Bienestar Laboral & Clima') => {
        doc.setFillColor(NAVY[0], NAVY[1], NAVY[2]);
        doc.rect(0, 0, pageWidth, 22, 'F');

        doc.setFillColor(GOLD[0], GOLD[1], GOLD[2]);
        doc.rect(0, 22, pageWidth, 1, 'F');

        if (logoInfo) {
          const maxH = 12;
          const aspect = logoInfo.width / logoInfo.height;
          const logoW = maxH * aspect;
          doc.addImage(logoInfo.dataUrl, 'PNG', margin, 5, logoW, maxH);
        } else {
          doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
          doc.setFontSize(12);
          doc.setFont('helvetica', 'bold');
          doc.text('ACRUX ✦', margin, 14);
        }

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('PULSO-H | Diagnóstico Humano de Bienestar', pageWidth - margin, 12, { align: 'right' });

        doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.text(subtitle, pageWidth - margin, 17, { align: 'right' });
      };

      // Footer renderer
      const addFooters = () => {
        const totalPages = (doc.internal as any).getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
          doc.setPage(i);
          doc.setDrawColor(BORDER[0], BORDER[1], BORDER[2]);
          doc.setLineWidth(0.5);
          doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

          doc.setTextColor(SLATE[0], SLATE[1], SLATE[2]);
          doc.setFontSize(8);
          doc.setFont('helvetica', 'normal');
          doc.text('ACRUX Consultores S.A.S. • NIT 900.230.435-1 • acrux.life', margin, pageHeight - 6);
          doc.text(`Página ${i} de ${totalPages}`, pageWidth - margin, pageHeight - 6, { align: 'right' });
        }
      };

      // PAGE 1: Cover & Score Summary
      addHeader();
      let y = 30;

      doc.setTextColor(NAVY[0], NAVY[1], NAVY[2]);
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text('Informe Ejecutivo de Bienestar Laboral', margin, y);

      y += 6;
      doc.setTextColor(PRIMARY[0], PRIMARY[1], PRIMARY[2]);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('Metodología Organizacional Humano-Centrada ACRUX', margin, y);

      y += 8;

      // Metadata Card
      doc.setFillColor(LIGHT_BG[0], LIGHT_BG[1], LIGHT_BG[2]);
      doc.setDrawColor(BORDER[0], BORDER[1], BORDER[2]);
      doc.roundedRect(margin, y, contentWidth, 22, 3, 3, 'FD');

      doc.setFontSize(9);
      doc.setTextColor(NAVY[0], NAVY[1], NAVY[2]);

      doc.setFont('helvetica', 'bold');
      doc.text('Perfil Evaluado:', margin + 6, y + 7);
      doc.setFont('helvetica', 'normal');
      doc.text(result.profileName || 'Evaluación Personal', margin + 34, y + 7);

      doc.setFont('helvetica', 'bold');
      doc.text('Fecha:', margin + 110, y + 7);
      doc.setFont('helvetica', 'normal');
      doc.text(new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' }), margin + 124, y + 7);

      doc.setFont('helvetica', 'bold');
      doc.text('Código Análisis:', margin + 6, y + 14);
      doc.setFont('helvetica', 'normal');
      doc.text(`PH-${Math.floor(100000 + Math.random() * 900000)}`, margin + 34, y + 14);

      doc.setFont('helvetica', 'bold');
      doc.text('Metodología:', margin + 110, y + 14);
      doc.setFont('helvetica', 'normal');
      doc.text('MBI-HSS Validado', margin + 133, y + 14);

      y += 28;

      // Score Banner Card
      doc.setFillColor(NAVY[0], NAVY[1], NAVY[2]);
      doc.roundedRect(margin, y, contentWidth, 32, 4, 4, 'F');

      doc.setFillColor(PRIMARY[0], PRIMARY[1], PRIMARY[2]);
      doc.roundedRect(margin + 6, y + 5, 36, 22, 3, 3, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text(`${result.irp}%`, margin + 24, y + 17, { align: 'center' });
      doc.setFontSize(7);
      doc.text('ÍNDICE IRP', margin + 24, y + 23, { align: 'center' });

      doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(`Estado: ${result.profileName}`, margin + 48, y + 12);

      doc.setTextColor(230, 240, 250);
      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'normal');
      const splitDesc = doc.splitTextToSize(result.profileDescription, contentWidth - 56);
      doc.text(splitDesc, margin + 48, y + 18);

      y += 38;

      // Dimension Breakdown Table
      doc.setTextColor(NAVY[0], NAVY[1], NAVY[2]);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Desglose de Resultados por Dimensión', margin, y);

      y += 4;

      const tableData = Object.entries(result.dimensions).map(([key, dim]) => {
        const label = dimensionLabels[key] || dimensionLabels[key.toLowerCase()] || key;
        const val = dim.score !== undefined ? (dim.score <= 5 ? Math.round((dim.score / 5) * 100) : dim.score) : dim.percentage || 60;
        const status = val >= 70 ? 'Fortaleza' : val >= 50 ? 'En Equilibrio' : 'Cuidado Requerido';
        return [label, `${val}%`, status];
      });

      autoTable(doc, {
        startY: y,
        head: [['Dimensión de Bienestar', 'Puntaje (%)', 'Estado de Sostenibilidad']],
        body: tableData,
        theme: 'grid',
        headStyles: {
          fillColor: [NAVY[0], NAVY[1], NAVY[2]],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          fontSize: 8.5,
          cellPadding: 4,
        },
        alternateRowStyles: {
          fillColor: [LIGHT_BG[0], LIGHT_BG[1], LIGHT_BG[2]],
        },
        styles: {
          fontSize: 8.5,
          cellPadding: 4,
          textColor: [30, 41, 59],
        },
        columnStyles: {
          0: { fontStyle: 'bold', cellWidth: 90 },
          1: { halign: 'center', cellWidth: 35 },
          2: { halign: 'center', cellWidth: 53, fontStyle: 'bold' },
        },
        didParseCell: (dataCell) => {
          if (dataCell.section === 'body' && dataCell.column.index === 2) {
            const text = String(dataCell.cell.raw);
            if (text === 'Cuidado Requerido') {
              dataCell.cell.styles.textColor = [220, 38, 38];
            } else if (text === 'Fortaleza') {
              dataCell.cell.styles.textColor = [16, 185, 129];
            } else {
              dataCell.cell.styles.textColor = [217, 119, 6];
            }
          }
        }
      });

      // PAGE 2: Holistic Action Plan
      doc.addPage();
      addHeader('PULSO-H | Guía de Sostenibilidad & Liderazgo');
      y = 30;

      doc.setTextColor(NAVY[0], NAVY[1], NAVY[2]);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Plan de Acción para la Sostenibilidad del Talento', margin, y);

      y += 8;

      const actions = [
        {
          title: '1. Desconexión Digital & Gestión de Pausas',
          desc: 'Establecer horarios claros de finalización de jornada y promover pausas activas para restaurar la capacidad cognitiva.',
          focus: 'Inmediato (Semana 1)'
        },
        {
          title: '2. Alineación de Expectativas & Carga Laboral',
          desc: 'Revisar la distribución de tareas y prioridades para evitar sobrecargas sostenidas que agoten la energía emocional.',
          focus: 'Corto Plazo (Mes 1)'
        },
        {
          title: '3. Seguridad Psicológica & Espacios de Escucha',
          desc: 'Fomentar una cultura donde se puedan manifestar alertas de estrés sin temor, fortaleciendo la confianza en el equipo.',
          focus: 'Sostenibilidad (Trimestral)'
        }
      ];

      actions.forEach((act) => {
        doc.setFillColor(LIGHT_BG[0], LIGHT_BG[1], LIGHT_BG[2]);
        doc.setDrawColor(BORDER[0], BORDER[1], BORDER[2]);
        doc.roundedRect(margin, y, contentWidth, 24, 3, 3, 'FD');

        doc.setTextColor(NAVY[0], NAVY[1], NAVY[2]);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text(act.title, margin + 5, y + 7);

        doc.setFillColor(PRIMARY[0], PRIMARY[1], PRIMARY[2]);
        doc.roundedRect(pageWidth - margin - 38, y + 4, 33, 5.5, 1.5, 1.5, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(7);
        doc.setFont('helvetica', 'bold');
        doc.text(act.focus, pageWidth - margin - 21.5, y + 7.8, { align: 'center' });

        doc.setTextColor(SLATE[0], SLATE[1], SLATE[2]);
        doc.setFontSize(8.5);
        doc.setFont('helvetica', 'normal');
        const descLines = doc.splitTextToSize(act.desc, contentWidth - 10);
        doc.text(descLines, margin + 5, y + 14);

        y += 28;
      });

      y += 6;

      // Final Call to Action Box
      doc.setFillColor(NAVY[0], NAVY[1], NAVY[2]);
      doc.roundedRect(margin, y, contentWidth, 26, 3, 3, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('¿Querés llevar la transformación del bienestar a tu organización?', pageWidth / 2, y + 9, { align: 'center' });

      doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text('Agendá una sesión de consultoría con los especialistas de ACRUX en acrux.life/agendar', pageWidth / 2, y + 17, { align: 'center' });

      addFooters();
      doc.save(`Diagnostico_PULSO-H_${result.profileName.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={generatePDF}
      disabled={isGenerating}
      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-primary-900 font-bold text-xs sm:text-sm rounded-xl hover:bg-slate-100 transition-all border border-slate-200 shadow-md disabled:opacity-50"
    >
      <Download className="w-4 h-4 text-primary-600" />
      <span>{isGenerating ? 'Generando PDF...' : 'Descargar Informe PDF'}</span>
    </button>
  );
};

export default PDFReportGenerator;
