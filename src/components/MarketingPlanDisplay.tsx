import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Copy, Check } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const MarketingPlanDisplay: React.FC = () => {
  const { isDarkMode, marketingPlan, clearMarketingPlan } = useAppStore();
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleCopy = async () => {
    if (marketingPlan) {
      await navigator.clipboard.writeText(marketingPlan);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadPDF = async () => {
    if (!marketingPlan) return;
    
    setIsDownloading(true);
    
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const maxWidth = pageWidth - (margin * 2);
      
      // Add title
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      pdf.text('7-Day Marketing Plan', margin, margin + 10);
      
      // Add content
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      
      // Split the marketing plan into lines and format
      const lines = marketingPlan.split('\n');
      let yPosition = margin + 25;
      
      for (const line of lines) {
        if (yPosition > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
        }
        
        if (line.startsWith('#')) {
          // Header
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(line.startsWith('##') ? 12 : 14);
          const headerText = line.replace(/^#+\s*/, '');
          pdf.text(headerText, margin, yPosition);
          yPosition += 8;
        } else if (line.startsWith('•') || line.startsWith('*')) {
          // Bullet point
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(10);
          const bulletText = line.replace(/^[•*]\s*/, '• ');
          const splitText = pdf.splitTextToSize(bulletText, maxWidth - 10);
          pdf.text(splitText, margin + 5, yPosition);
          yPosition += splitText.length * 4;
        } else if (line.trim()) {
          // Regular text
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(10);
          const splitText = pdf.splitTextToSize(line, maxWidth);
          pdf.text(splitText, margin, yPosition);
          yPosition += splitText.length * 4;
        } else {
          // Empty line
          yPosition += 4;
        }
      }
      
      pdf.save('marketing-plan.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const formatMarkdownContent = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('# ')) {
          return (
            <h1 key={index} className={`text-2xl font-bold mb-4 mt-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {line.replace('# ', '')}
            </h1>
          );
        }
        if (line.startsWith('## ')) {
          return (
            <h2 key={index} className={`text-xl font-semibold mb-3 mt-5 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-800'
            }`}>
              {line.replace('## ', '')}
            </h2>
          );
        }
        if (line.startsWith('### ')) {
          return (
            <h3 key={index} className={`text-lg font-medium mb-2 mt-4 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {line.replace('### ', '')}
            </h3>
          );
        }
        if (line.startsWith('**') && line.endsWith('**')) {
          return (
            <p key={index} className={`font-semibold mb-2 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-800'
            }`}>
              {line.replace(/\*\*/g, '')}
            </p>
          );
        }
        if (line.startsWith('• ') || line.startsWith('* ')) {
          return (
            <li key={index} className={`mb-1 ml-4 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {line.replace(/^[•*] /, '')}
            </li>
          );
        }
        if (line.trim() === '') {
          return <br key={index} />;
        }
        if (line.startsWith('---')) {
          return (
            <hr key={index} className={`my-6 border-t ${
              isDarkMode ? 'border-gray-700' : 'border-gray-300'
            }`} />
          );
        }
        return (
          <p key={index} className={`mb-2 leading-relaxed ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {line}
          </p>
        );
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="flex items-center justify-between mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={clearMarketingPlan}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-colors ${
            isDarkMode
              ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Create New Plan</span>
        </motion.button>

        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-colors ${
              isDarkMode
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-colors ${
              isDownloading
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : isDarkMode
                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>{isDownloading ? 'Generating...' : 'Download PDF'}</span>
          </motion.button>
        </div>
      </div>

      <div className={`p-8 rounded-2xl border backdrop-blur-sm ${
        isDarkMode
          ? 'bg-gray-800/50 border-gray-700'
          : 'bg-white/50 border-gray-200'
      }`}>
        <div className="prose prose-lg max-w-none">
          {marketingPlan && formatMarkdownContent(marketingPlan)}
        </div>
      </div>
    </motion.div>
  );
};