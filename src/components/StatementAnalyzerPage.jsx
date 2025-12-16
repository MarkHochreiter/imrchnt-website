import React, { useState, useCallback } from 'react';
import { Upload, Download, FileText, CheckCircle2, AlertCircle, TrendingUp, DollarSign, CreditCard, ArrowLeft, PieChart, BarChart3, Loader2, Eye, EyeOff } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// UI Components
const Button = ({ children, className = '', size = 'default', variant = 'default', onClick, disabled, ...props }) => {
  const sizeClasses = {
    default: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
    sm: 'px-3 py-1.5 text-sm'
  }
  
  const variantClasses = {
    default: 'bg-[#f08e80] hover:bg-[#e07d70] text-white disabled:bg-gray-300 disabled:cursor-not-allowed',
    outline: 'border-2 border-[#f08e80] text-[#f08e80] hover:bg-[#f08e80] hover:text-white bg-transparent disabled:border-gray-300 disabled:text-gray-300'
  }
  
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#f08e80] focus:ring-offset-2 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
    {children}
  </div>
)

const CardHeader = ({ children }) => (
  <div className="px-6 py-4 border-b border-gray-200">
    {children}
  </div>
)

const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-xl font-bold text-gray-900 ${className}`}>
    {children}
  </h3>
)

const CardDescription = ({ children }) => (
  <p className="text-sm text-gray-600 mt-1">
    {children}
  </p>
)

const CardContent = ({ children, className = '' }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
)

const toast = {
  success: (title, options) => {
    console.log('Success:', title, options?.description);
  },
  error: (title, options) => {
    console.error('Error:', title, options?.description);
    alert(`❌ ${title}\n${options?.description || ''}`);
  },
  warning: (title, options) => {
    console.warn('Warning:', title, options?.description);
  }
}

function StatementAnalyzerPage({ onNavigateBack }) {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [showExtractedText, setShowExtractedText] = useState(false);
  const [manualData, setManualData] = useState({
    totalSales: '',
    totalFees: ''
  });

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      handleFileUpload(droppedFile);
    } else {
      toast.error('Invalid file type', {
        description: 'Please upload a PDF file'
      });
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback((e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileUpload(selectedFile);
    }
  }, []);

  const extractTextFromPDF = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    let fullText = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + '\n';
    }
    
    return fullText;
  };

  const parseCurrency = (text) => {
    // Remove currency symbols, commas, parentheses, and convert to number
    const cleaned = text.replace(/[$,()]/g, '').trim();
    return parseFloat(cleaned) || 0;
  };

  const extractDataFromText = (text) => {
    const data = {
      merchantName: '',
      statementPeriod: '',
      totalSales: 0,
      totalFees: 0,
      chargebacks: 0,
      transactionCount: 0,
      visaSales: 0,
      visaFees: 0,
      mastercardSales: 0,
      mastercardFees: 0,
      amexSales: 0,
      amexFees: 0,
      discoverSales: 0,
      discoverFees: 0,
      interchangeFees: 0,
      processorFees: 0,
      monthlyFees: 0
    };

    // Extract merchant name (enhanced patterns)
    const merchantPatterns = [
      /Merchant\s+Name[:\s]+([^\n]+)/i,
      /Business\s+Name[:\s]+([^\n]+)/i,
      /DBA[:\s]+([^\n]+)/i,
      /Location[:\s]+([^\n]+)/i
    ];
    for (const pattern of merchantPatterns) {
      const match = text.match(pattern);
      if (match) {
        data.merchantName = match[1].trim();
        break;
      }
    }

    // Extract statement period (enhanced patterns)
    const periodPatterns = [
      /Statement\s+Period[:\s]+([^\n]+)/i,
      /Period[:\s]+([^\n]+)/i,
      /(\d{1,2}\/\d{1,2}\/\d{2,4}\s*[-–]\s*\d{1,2}\/\d{1,2}\/\d{2,4})/,
      /(\w+\s+\d{1,2},?\s+\d{4}\s*[-–]\s*\w+\s+\d{1,2},?\s+\d{4})/
    ];
    for (const pattern of periodPatterns) {
      const match = text.match(pattern);
      if (match) {
        data.statementPeriod = match[1].trim();
        break;
      }
    }

    // Extract total sales/volume (ENHANCED with many more patterns)
    const salesPatterns = [
      // CardConnect specific - MUST come first to avoid YTD numbers
      /Total\s+Amount\s+Submitted[\s\S]{0,50}\$([\d,]+\.\d{2})/i,
      /^\s*Total\s+Amount\s+Submitted\s+\$?([\d,]+\.\d{2})/im,
      
      // Standard patterns
      /Total\s+(?:Sales|Volume|Charged?)[:\s]+\$?\s*([\d,]+\.?\d*)/i,
      /Gross\s+Sales[:\s]+\$?\s*([\d,]+\.?\d*)/i,
      /Total\s+Transactions?[:\s]+\$?\s*([\d,]+\.?\d*)/i,
      /Sales\s+Volume[:\s]+\$?\s*([\d,]+\.?\d*)/i,
      /Total\s+Card\s+Sales[:\s]+\$?\s*([\d,]+\.?\d*)/i,
      
      // Other processor patterns
      /Gross\s+Amount[:\s]+\$?\s*([\d,]+\.?\d*)/i,
      /Total\s+Deposits?[:\s]+\$?\s*([\d,]+\.?\d*)/i,
      
      // Summary section patterns
      /Summary[\s\S]{0,200}(?:Sales|Volume)[:\s]+\$?\s*([\d,]+\.?\d*)/i
    ];
    
    // Try patterns in order, stop at first reasonable match
    for (const pattern of salesPatterns) {
      const match = text.match(pattern);
      if (match) {
        const value = parseCurrency(match[1]);
        if (value > 100) { // Reasonable threshold for total sales
          data.totalSales = value;
          break; // Take the first match (patterns are ordered by priority)
        }
      }
    }

    // Extract total fees (ENHANCED for CardConnect and other formats)
    const feePatterns = [
      // CardConnect specific - fees shown as negative in summary table
      /Fees[\s\S]{0,50}-\$?\s*([\d,]+\.\d{2})/i,
      /^\s*Fees\s+[-\$]\s*([\d,]+\.\d{2})/im,
      
      // Standard patterns
      /Total\s+Fees[:\s]+[-\$]?\s*([\d,]+\.?\d*)/i,
      /Total\s+Service\s+Charges?[:\s]+[-\$]?\s*([\d,]+\.?\d*)/i,
      /Processing\s+Fees[:\s]+[-\$]?\s*([\d,]+\.?\d*)/i,
      /Total\s+Charges?[:\s]+[-\$]?\s*([\d,]+\.?\d*)/i,
      /Fees\s+(?:and\s+)?Charges?[:\s]+[-\$]?\s*([\d,]+\.?\d*)/i,
      /Net\s+Fees[:\s]+[-\$]?\s*([\d,]+\.?\d*)/i,
      /(?:Total\s+)?Discount[:\s]+[-\$]?\s*([\d,]+\.?\d*)/i,
      
      // Look for fees in parentheses (accounting format)
      /Total\s+Fees[:\s]+\(\$?\s*([\d,]+\.?\d*)\)/i,
      /Fees[:\s]+\(\$?\s*([\d,]+\.?\d*)\)/i,
      
      // Summary section
      /Summary[\s\S]{0,200}Fees[:\s]+[-\$]?\s*([\d,]+\.?\d*)/i
    ];
    
    const foundFees = [];
    for (const pattern of feePatterns) {
      const matches = text.matchAll(new RegExp(pattern.source, 'gi'));
      for (const match of matches) {
        const value = parseCurrency(match[1]);
        if (value > 0 && value < data.totalSales * 0.1) { // Fees should be < 10% of sales
          foundFees.push(value);
        }
      }
    }
    
    if (foundFees.length > 0) {
      data.totalFees = Math.max(...foundFees);
    }

    // Extract transaction count (enhanced)
    const txnPatterns = [
      // CardConnect - look for total items in Summary By Card Type
      /Total[\s\S]{0,100}(\d{3,})\s+\$[\d,]+\.[\d]{2}/i,
      /(\d{3,})\s+transactions?/i,
      /Transaction\s+Count[:\s]+(\d{3,})/i,
      /Number\s+of\s+Transactions[:\s]+(\d{3,})/i,
      /Total\s+Transactions[:\s]+(\d{3,})/i
    ];
    
    for (const pattern of txnPatterns) {
      const match = text.match(pattern);
      if (match) {
        const count = parseInt(match[1]);
        if (count > 0 && count < 1000000) { // Reasonable range
          data.transactionCount = count;
          break;
        }
      }
    }

    // Extract card type data (enhanced)
    const visaPatterns = [
      /VISA[\s\S]{0,50}\$?\s*([\d,]+\.?\d*)/i,
      /Visa\s+Sales[:\s]+\$?\s*([\d,]+\.?\d*)/i
    ];
    for (const pattern of visaPatterns) {
      const match = text.match(pattern);
      if (match) {
        const value = parseCurrency(match[1]);
        if (value > 0) {
          data.visaSales = value;
          break;
        }
      }
    }

    const mcPatterns = [
      /(?:MASTERCARD|MasterCard|MC)[\s\S]{0,50}\$?\s*([\d,]+\.?\d*)/i,
      /Mastercard\s+Sales[:\s]+\$?\s*([\d,]+\.?\d*)/i
    ];
    for (const pattern of mcPatterns) {
      const match = text.match(pattern);
      if (match) {
        const value = parseCurrency(match[1]);
        if (value > 0) {
          data.mastercardSales = value;
          break;
        }
      }
    }

    const amexPatterns = [
      /(?:AMEX|American\s+Express)[\s\S]{0,50}\$?\s*([\d,]+\.?\d*)/i,
      /Amex\s+Sales[:\s]+\$?\s*([\d,]+\.?\d*)/i
    ];
    for (const pattern of amexPatterns) {
      const match = text.match(pattern);
      if (match) {
        const value = parseCurrency(match[1]);
        if (value > 0) {
          data.amexSales = value;
          break;
        }
      }
    }

    const discoverPatterns = [
      /DISCOVER[\s\S]{0,50}\$?\s*([\d,]+\.?\d*)/i,
      /Discover\s+Sales[:\s]+\$?\s*([\d,]+\.?\d*)/i
    ];
    for (const pattern of discoverPatterns) {
      const match = text.match(pattern);
      if (match) {
        const value = parseCurrency(match[1]);
        if (value > 0) {
          data.discoverSales = value;
          break;
        }
      }
    }

    // Extract interchange fees (CardConnect specific)
    // CardConnect shows: TOTAL TRANSACTION FEES (mostly interchange) + DEBIT NETWORK FEES
    let totalTransactionFees = 0;
    let debitNetworkFees = 0;
    
    // Look for TOTAL TRANSACTION FEES
    const txnFeesMatch = text.match(/TOTAL\s+TRANSACTION\s+FEES[\s\S]{0,50}-?\$?([\d,]+\.\d{2})/i);
    if (txnFeesMatch) {
      totalTransactionFees = parseCurrency(txnFeesMatch[1]);
    }
    
    // Look for TOTAL DEBIT NETWORK FEES
    const debitFeesMatch = text.match(/TOTAL\s+DEBIT\s+NETWORK\s+FEES[\s\S]{0,50}-?\$?([\d,]+\.\d{2})/i);
    if (debitFeesMatch) {
      debitNetworkFees = parseCurrency(debitFeesMatch[1]);
    }
    
    // Interchange = Transaction Fees + Debit Network Fees
    if (totalTransactionFees > 0 || debitNetworkFees > 0) {
      data.interchangeFees = totalTransactionFees + debitNetworkFees;
    } else {
      // Fallback to generic patterns for other processors
      const interchangePatterns = [
        /Interchange[\s\S]{0,50}[-\$]?\s*([\d,]+\.?\d*)/i,
        /IC\s+Fees?[:\s]+[-\$]?\s*([\d,]+\.?\d*)/i,
        /Interchange\s+Fees?[:\s]+[-\$]?\s*([\d,]+\.?\d*)/i
      ];
      for (const pattern of interchangePatterns) {
        const match = text.match(pattern);
        if (match) {
          const value = parseCurrency(match[1]);
          if (value > 0) {
            data.interchangeFees = value;
            break;
          }
        }
      }
    }

    // Extract monthly/equipment fees (CardConnect specific)
    // CardConnect has an ACCOUNT FEES section with multiple line items
    const accountFeesSection = text.match(/ACCOUNT\s+FEES[\s\S]{0,2000}?(?=TOTAL|$)/i);
    
    if (accountFeesSection) {
      // Extract all individual fee amounts from the ACCOUNT FEES section
      const feeMatches = accountFeesSection[0].matchAll(/-\$([\d,]+\.\d{2})/g);
      let totalAccountFees = 0;
      
      for (const match of feeMatches) {
        const feeAmount = parseCurrency(match[1]);
        if (feeAmount > 0 && feeAmount < 1000) { // Individual fees typically under $1000
          totalAccountFees += feeAmount;
        }
      }
      
      if (totalAccountFees > 0) {
        data.monthlyFees = totalAccountFees;
      }
    } else {
      // Fallback to generic patterns for other processors
      const monthlyPatterns = [
        /(?:Monthly|Equipment|Account)\s+Fee[s]?[:\s]+[-\$]?\s*([\d,]+\.?\d*)/i,
        /Statement\s+Fee[:\s]+[-\$]?\s*([\d,]+\.?\d*)/i,
        /Service\s+Fee[:\s]+[-\$]?\s*([\d,]+\.?\d*)/i
      ];
      for (const pattern of monthlyPatterns) {
        const match = text.match(pattern);
        if (match) {
          const value = parseCurrency(match[1]);
          if (value > 0 && value < 1000) {
            data.monthlyFees = value;
            break;
          }
        }
      }
    }

    return data;
  };

  const handleFileUpload = async (uploadedFile) => {
    setFile(uploadedFile);
    setIsProcessing(true);
    setShowManualEntry(false);
    setAnalysisData(null);
    
    try {
      // Extract text from PDF
      const pdfText = await extractTextFromPDF(uploadedFile);
      setExtractedText(pdfText);
      
      // Parse the extracted text
      const extractedData = extractDataFromText(pdfText);
      
      // If we got meaningful data, analyze it
      if (extractedData.totalSales > 0 && extractedData.totalFees > 0) {
        analyzeData(extractedData);
        toast.success('Statement analyzed successfully');
      } else {
        // Show manual entry form with extracted text
        toast.warning('Could not auto-extract all data', {
          description: 'Please enter the key values manually'
        });
        setShowManualEntry(true);
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Error processing PDF:', error);
      toast.error('Error processing PDF', {
        description: 'There was an error reading the PDF file. Please try again.'
      });
      setIsProcessing(false);
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    
    const totalSales = parseFloat(manualData.totalSales);
    const totalFees = parseFloat(manualData.totalFees);
    
    if (!totalSales || !totalFees || totalSales <= 0 || totalFees <= 0) {
      toast.error('Invalid input', {
        description: 'Please enter valid positive numbers for both fields'
      });
      return;
    }
    
    if (totalFees > totalSales) {
      toast.error('Invalid input', {
        description: 'Total fees cannot exceed total sales'
      });
      return;
    }
    
    const formData = {
      merchantName: '',
      statementPeriod: '',
      totalSales,
      totalFees,
      chargebacks: 0,
      transactionCount: 0,
      visaSales: 0,
      visaFees: 0,
      mastercardSales: 0,
      mastercardFees: 0,
      amexSales: 0,
      amexFees: 0,
      discoverSales: 0,
      discoverFees: 0,
      interchangeFees: 0,
      processorFees: 0,
      monthlyFees: 0
    };
    
    analyzeData(formData);
    setShowManualEntry(false);
  };

  const analyzeData = (formData) => {
    const totalSales = formData.totalSales;
    const totalFees = formData.totalFees;
    const chargebacks = formData.chargebacks || 0;
    
    const visaSales = formData.visaSales;
    const visaFees = formData.visaFees || (visaSales > 0 ? totalFees * (visaSales / totalSales) : 0);
    const mastercardSales = formData.mastercardSales;
    const mastercardFees = formData.mastercardFees || (mastercardSales > 0 ? totalFees * (mastercardSales / totalSales) : 0);
    const amexSales = formData.amexSales;
    const amexFees = formData.amexFees || (amexSales > 0 ? totalFees * (amexSales / totalSales) : 0);
    const discoverSales = formData.discoverSales;
    const discoverFees = formData.discoverFees || (discoverSales > 0 ? totalFees * (discoverSales / totalSales) : 0);
    
    const interchangeFees = formData.interchangeFees;
    const processorFees = formData.processorFees || (totalFees - interchangeFees - formData.monthlyFees);
    const monthlyFees = formData.monthlyFees;
    const transactionCount = formData.transactionCount;

    const effectiveRate = totalSales > 0 ? (totalFees / totalSales) * 100 : 0;
    const netAmount = totalSales - totalFees + chargebacks;
    const avgTicket = transactionCount > 0 ? totalSales / transactionCount : 0;

    const cardTypeBreakdown = [];
    if (visaSales > 0) {
      cardTypeBreakdown.push({
        type: 'Visa',
        sales: visaSales,
        fees: visaFees,
        rate: (visaFees / visaSales) * 100,
        percentage: (visaSales / totalSales) * 100
      });
    }
    if (mastercardSales > 0) {
      cardTypeBreakdown.push({
        type: 'Mastercard',
        sales: mastercardSales,
        fees: mastercardFees,
        rate: (mastercardFees / mastercardSales) * 100,
        percentage: (mastercardSales / totalSales) * 100
      });
    }
    if (amexSales > 0) {
      cardTypeBreakdown.push({
        type: 'American Express',
        sales: amexSales,
        fees: amexFees,
        rate: (amexFees / amexSales) * 100,
        percentage: (amexSales / totalSales) * 100
      });
    }
    if (discoverSales > 0) {
      cardTypeBreakdown.push({
        type: 'Discover',
        sales: discoverSales,
        fees: discoverFees,
        rate: (discoverFees / discoverSales) * 100,
        percentage: (discoverSales / totalSales) * 100
      });
    }

    const feeBreakdown = [];
    if (interchangeFees > 0) {
      feeBreakdown.push({
        category: 'Interchange Fees',
        amount: interchangeFees,
        percentage: (interchangeFees / totalFees) * 100,
        description: 'Fees paid to card-issuing banks (non-negotiable)'
      });
    }
    if (processorFees > 0) {
      feeBreakdown.push({
        category: 'Processor Markup',
        amount: processorFees,
        percentage: (processorFees / totalFees) * 100,
        description: 'Your processor\'s markup (negotiable)'
      });
    }
    if (monthlyFees > 0) {
      feeBreakdown.push({
        category: 'Monthly/Fixed Fees',
        amount: monthlyFees,
        percentage: (monthlyFees / totalFees) * 100,
        description: 'Account maintenance and equipment fees'
      });
    }

    const processorMarkupRate = totalSales > 0 ? (processorFees / totalSales) * 100 : 0;
    const interchangeRate = totalSales > 0 ? (interchangeFees / totalSales) * 100 : 0;

    const recommendations = generateRecommendations({
      effectiveRate,
      processorMarkupRate,
      monthlyFees,
      avgTicket,
      totalSales,
      cardTypeBreakdown
    });

    setAnalysisData({
      merchantName: formData.merchantName || 'Your Business',
      statementPeriod: formData.statementPeriod || 'N/A',
      summary: {
        totalSales,
        totalFees,
        chargebacks,
        adjustments: 0,
        netAmount,
        effectiveRate,
        transactionCount,
        avgTicket
      },
      cardTypeBreakdown,
      feeBreakdown,
      rates: {
        effectiveRate,
        interchangeRate,
        processorMarkupRate
      },
      recommendations
    });

    setIsProcessing(false);
  };

  const generateRecommendations = (data) => {
    const recommendations = [];

    if (data.effectiveRate > 3.0) {
      recommendations.push({
        type: 'warning',
        title: 'High Processing Rate',
        description: `Your effective rate of ${data.effectiveRate.toFixed(2)}% is above the industry average of 2.5-3.0%. Consider getting quotes from other processors.`,
        potentialSavings: ((data.effectiveRate - 2.5) / 100) * data.totalSales
      });
    } else if (data.effectiveRate < 2.0) {
      recommendations.push({
        type: 'success',
        title: 'Excellent Processing Rate',
        description: `Your effective rate of ${data.effectiveRate.toFixed(2)}% is better than industry average. You have a competitive agreement.`,
        potentialSavings: 0
      });
    } else {
      recommendations.push({
        type: 'info',
        title: 'Competitive Processing Rate',
        description: `Your effective rate of ${data.effectiveRate.toFixed(2)}% is within the typical range for retail businesses.`,
        potentialSavings: 0
      });
    }

    if (data.processorMarkupRate > 1.0) {
      recommendations.push({
        type: 'warning',
        title: 'High Processor Markup',
        description: `Your processor is charging ${data.processorMarkupRate.toFixed(2)}% over interchange. Industry standard is 0.30-0.75%. This is negotiable.`,
        potentialSavings: ((data.processorMarkupRate - 0.5) / 100) * data.totalSales
      });
    } else if (data.processorMarkupRate < 0.5 && data.processorMarkupRate > 0) {
      recommendations.push({
        type: 'success',
        title: 'Excellent Processor Markup',
        description: `Your processor markup of ${data.processorMarkupRate.toFixed(2)}% is very competitive.`,
        potentialSavings: 0
      });
    }

    if (data.monthlyFees > 200) {
      recommendations.push({
        type: 'warning',
        title: 'High Monthly Fees',
        description: `Monthly fees of $${data.monthlyFees.toFixed(2)} seem high. Review equipment rental and account fees for potential savings.`,
        potentialSavings: (data.monthlyFees - 100) * 12
      });
    }

    if (data.avgTicket < 10 && data.avgTicket > 0) {
      recommendations.push({
        type: 'info',
        title: 'Low Average Ticket',
        description: `Your average ticket of $${data.avgTicket.toFixed(2)} means transaction fees have a bigger impact. Consider encouraging larger purchases or setting minimums.`,
        potentialSavings: 0
      });
    }

    const amexCard = data.cardTypeBreakdown.find(c => c.type === 'American Express');
    if (amexCard && amexCard.percentage > 20) {
      recommendations.push({
        type: 'info',
        title: 'High Amex Volume',
        description: `${amexCard.percentage.toFixed(1)}% of your sales are Amex, which typically has higher fees. This is normal for certain business types.`,
        potentialSavings: 0
      });
    }

    return recommendations;
  };

  const handleDownloadReport = () => {
    if (!analysisData) return;

    const reportContent = generateReportText(analysisData);
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    const timestamp = new Date().toISOString().split('T')[0];
    a.download = `processing-analysis-${timestamp}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateReportText = (data) => {
    let report = `CREDIT CARD PROCESSING ANALYSIS REPORT\n`;
    report += `${'='.repeat(60)}\n\n`;
    report += `Merchant: ${data.merchantName}\n`;
    report += `Statement Period: ${data.statementPeriod}\n`;
    report += `Generated: ${new Date().toLocaleDateString()}\n\n`;
    
    report += `SUMMARY\n`;
    report += `${'-'.repeat(60)}\n`;
    report += `Total Sales:              $${data.summary.totalSales.toLocaleString('en-US', {minimumFractionDigits: 2})}\n`;
    report += `Total Fees:               $${data.summary.totalFees.toLocaleString('en-US', {minimumFractionDigits: 2})}\n`;
    report += `Effective Rate:           ${data.summary.effectiveRate.toFixed(2)}%\n`;
    if (data.summary.transactionCount > 0) {
      report += `Transaction Count:        ${data.summary.transactionCount.toLocaleString()}\n`;
      report += `Average Ticket:           $${data.summary.avgTicket.toFixed(2)}\n`;
    }
    report += `Net Amount Processed:     $${data.summary.netAmount.toLocaleString('en-US', {minimumFractionDigits: 2})}\n\n`;
    
    if (data.cardTypeBreakdown.length > 0) {
      report += `BREAKDOWN BY CARD TYPE\n`;
      report += `${'-'.repeat(60)}\n`;
      data.cardTypeBreakdown.forEach(card => {
        report += `${card.type}:\n`;
        report += `  Sales:      $${card.sales.toLocaleString('en-US', {minimumFractionDigits: 2})} (${card.percentage.toFixed(1)}% of total)\n`;
        report += `  Fees:       $${card.fees.toLocaleString('en-US', {minimumFractionDigits: 2})}\n`;
        report += `  Rate:       ${card.rate.toFixed(2)}%\n\n`;
      });
    }
    
    if (data.feeBreakdown.length > 0) {
      report += `FEE BREAKDOWN\n`;
      report += `${'-'.repeat(60)}\n`;
      data.feeBreakdown.forEach(fee => {
        report += `${fee.category}:\n`;
        report += `  Amount:     $${fee.amount.toLocaleString('en-US', {minimumFractionDigits: 2})} (${fee.percentage.toFixed(1)}% of total fees)\n`;
        report += `  ${fee.description}\n\n`;
      });
    }
    
    report += `RATE ANALYSIS\n`;
    report += `${'-'.repeat(60)}\n`;
    report += `Effective Rate:           ${data.rates.effectiveRate.toFixed(2)}%\n`;
    if (data.rates.interchangeRate > 0) {
      report += `Interchange Component:    ${data.rates.interchangeRate.toFixed(2)}%\n`;
    }
    if (data.rates.processorMarkupRate > 0) {
      report += `Processor Markup:         ${data.rates.processorMarkupRate.toFixed(2)}%\n`;
    }
    report += `\n`;
    
    if (data.recommendations.length > 0) {
      report += `RECOMMENDATIONS\n`;
      report += `${'-'.repeat(60)}\n`;
      data.recommendations.forEach((rec, idx) => {
        report += `${idx + 1}. ${rec.title}\n`;
        report += `   ${rec.description}\n`;
        if (rec.potentialSavings > 0) {
          report += `   Potential Savings: $${rec.potentialSavings.toLocaleString('en-US', {minimumFractionDigits: 2})}\n`;
        }
        report += `\n`;
      });
    }
    
    return report;
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={onNavigateBack}
            className="flex items-center text-gray-600 hover:text-[#f08e80] mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </button>
          
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <TrendingUp className="h-12 w-12 text-[#f08e80]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Credit Card Statement Analyzer
            </h1>
            <p className="text-xl text-gray-600">
              Upload your processing statement and get instant insights into your rates, fees, and potential savings
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Upload Section */}
        {!analysisData && !isProcessing && !showManualEntry && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-[#f08e80]" />
                Upload Statement
              </CardTitle>
              <CardDescription>
                Upload your credit card processing statement (PDF format) for automatic analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                  isDragging
                    ? 'border-[#f08e80] bg-[#f08e80]/5'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input
                  type="file"
                  id="file-upload"
                  accept=".pdf"
                  onChange={handleFileInput}
                  className="hidden"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <FileText className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    {file ? file.name : 'Drop your statement here or click to browse'}
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports PDF statements from CardConnect, Square, Stripe, Clover, and more
                  </p>
                </label>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Processing Indicator */}
        {isProcessing && (
          <Card className="mb-8">
            <CardContent className="py-12">
              <div className="flex flex-col items-center justify-center">
                <Loader2 className="h-16 w-16 text-[#f08e80] animate-spin mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Analyzing Your Statement...</h3>
                <p className="text-gray-600">This may take a few moments</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Manual Entry Form (Fallback) */}
        {showManualEntry && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Manual Entry Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                  Enter Key Values
                </CardTitle>
                <CardDescription>
                  We couldn't auto-extract all data. Please enter the total sales and total fees from your statement.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleManualSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Sales / Volume
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                      <input
                        type="number"
                        step="0.01"
                        value={manualData.totalSales}
                        onChange={(e) => setManualData({...manualData, totalSales: e.target.value})}
                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:ring-[#f08e80] focus:border-[#f08e80]"
                        placeholder="0.00"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Fees / Charges
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                      <input
                        type="number"
                        step="0.01"
                        value={manualData.totalFees}
                        onChange={(e) => setManualData({...manualData, totalFees: e.target.value})}
                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:ring-[#f08e80] focus:border-[#f08e80]"
                        placeholder="0.00"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <Button type="submit" className="flex-1">
                      Analyze
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => {
                        setShowManualEntry(false);
                        setFile(null);
                        setExtractedText('');
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Extracted Text Display */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-[#f08e80]" />
                    Extracted Text
                  </CardTitle>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowExtractedText(!showExtractedText)}
                  >
                    {showExtractedText ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <CardDescription>
                  Text extracted from your PDF - use this to find the values
                </CardDescription>
              </CardHeader>
              {showExtractedText && (
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-md max-h-96 overflow-y-auto">
                    <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono">
                      {extractedText || 'No text extracted'}
                    </pre>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        )}

        {/* Analysis Results */}
        {analysisData && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Effective Rate</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">
                        {analysisData.summary.effectiveRate.toFixed(2)}%
                      </p>
                    </div>
                    <div className="h-12 w-12 bg-[#f08e80]/10 rounded-full flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-[#f08e80]" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Industry avg: 2.5-3.0%
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Fees</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">
                        {formatCurrency(analysisData.summary.totalFees)}
                      </p>
                    </div>
                    <div className="h-12 w-12 bg-[#f08e80]/10 rounded-full flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-[#f08e80]" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    On {formatCurrency(analysisData.summary.totalSales)} sales
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {analysisData.summary.transactionCount > 0 ? 'Avg Ticket' : 'Net Amount'}
                      </p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">
                        {analysisData.summary.transactionCount > 0 
                          ? formatCurrency(analysisData.summary.avgTicket)
                          : formatCurrency(analysisData.summary.netAmount)
                        }
                      </p>
                    </div>
                    <div className="h-12 w-12 bg-[#f08e80]/10 rounded-full flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-[#f08e80]" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {analysisData.summary.transactionCount > 0 
                      ? `${analysisData.summary.transactionCount.toLocaleString()} transactions`
                      : 'After fees'
                    }
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Card Type Breakdown */}
            {analysisData.cardTypeBreakdown.length > 0 && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-[#f08e80]" />
                    Breakdown by Card Type
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Card Type</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Sales</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">% of Total</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Fees</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Rate</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {analysisData.cardTypeBreakdown.map((card, idx) => (
                          <tr key={idx}>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{card.type}</td>
                            <td className="px-4 py-3 text-sm text-gray-700 text-right">{formatCurrency(card.sales)}</td>
                            <td className="px-4 py-3 text-sm text-gray-700 text-right">{card.percentage.toFixed(1)}%</td>
                            <td className="px-4 py-3 text-sm text-gray-700 text-right">{formatCurrency(card.fees)}</td>
                            <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-right">{card.rate.toFixed(2)}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Fee Breakdown */}
            {analysisData.feeBreakdown.length > 0 && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-[#f08e80]" />
                    Fee Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysisData.feeBreakdown.map((fee, idx) => (
                      <div key={idx} className="border-b border-gray-200 pb-4 last:border-0">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{fee.category}</h4>
                            <p className="text-sm text-gray-600 mt-1">{fee.description}</p>
                          </div>
                          <div className="text-right ml-4">
                            <p className="font-semibold text-gray-900">{formatCurrency(fee.amount)}</p>
                            <p className="text-sm text-gray-600">{fee.percentage.toFixed(1)}% of fees</p>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#f08e80] h-2 rounded-full"
                            style={{ width: `${fee.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recommendations */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#f08e80]" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysisData.recommendations.map((rec, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg border-l-4 ${
                        rec.type === 'success'
                          ? 'bg-green-50 border-green-500'
                          : rec.type === 'warning'
                          ? 'bg-yellow-50 border-yellow-500'
                          : 'bg-blue-50 border-blue-500'
                      }`}
                    >
                      <h4 className="font-semibold text-gray-900 mb-2">{rec.title}</h4>
                      <p className="text-sm text-gray-700">{rec.description}</p>
                      {rec.potentialSavings > 0 && (
                        <p className="text-sm font-semibold text-green-700 mt-2">
                          💰 Potential Savings: {formatCurrency(rec.potentialSavings)}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <Button
                onClick={handleDownloadReport}
                size="lg"
              >
                <Download className="h-5 w-5 mr-2" />
                Download Report
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setAnalysisData(null);
                  setFile(null);
                  setExtractedText('');
                  setManualData({ totalSales: '', totalFees: '' });
                }}
              >
                Analyze Another Statement
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default StatementAnalyzerPage;
