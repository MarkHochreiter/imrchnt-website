import React, { useState, useCallback } from 'react';
import { Upload, Download, FileText, CheckCircle2, AlertCircle, TrendingUp, DollarSign, CreditCard, ArrowLeft, PieChart, BarChart3 } from 'lucide-react';

// UI Components (matching your existing design system)
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

const Input = ({ className = '', ...props }) => (
  <input
    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f08e80] focus:border-transparent ${className}`}
    {...props}
  />
)

const Label = ({ children, htmlFor, className = '' }) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 mb-2 ${className}`}>
    {children}
  </label>
)

const toast = {
  success: (title, options) => {
    console.log('Success:', title, options?.description);
    alert(`✅ ${title}\n${options?.description || ''}`);
  },
  error: (title, options) => {
    console.error('Error:', title, options?.description);
    alert(`❌ ${title}\n${options?.description || ''}`);
  }
}

function StatementAnalyzerPage({ onNavigateBack }) {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [manualEntry, setManualEntry] = useState(false);
  
  // Manual entry fields
  const [formData, setFormData] = useState({
    merchantName: '',
    statementPeriod: '',
    totalSales: '',
    totalFees: '',
    chargebacks: '',
    adjustments: '',
    // Card type breakdowns
    visaSales: '',
    visaFees: '',
    mastercardSales: '',
    mastercardFees: '',
    amexSales: '',
    amexFees: '',
    discoverSales: '',
    discoverFees: '',
    // Fee categories
    interchangeFees: '',
    assessmentFees: '',
    processorFees: '',
    monthlyFees: '',
    transactionCount: '',
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

  const handleFileUpload = (uploadedFile) => {
    setFile(uploadedFile);
    
    // For now, we'll show manual entry since PDF parsing is complex
    // In production, you'd attempt to parse the PDF first
    toast.success('File uploaded', {
      description: 'Please enter the key figures from your statement below'
    });
    setManualEntry(true);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateAnalysis = () => {
    // Parse numeric values
    const totalSales = parseFloat(formData.totalSales) || 0;
    const totalFees = parseFloat(formData.totalFees) || 0;
    const chargebacks = parseFloat(formData.chargebacks) || 0;
    const adjustments = parseFloat(formData.adjustments) || 0;
    
    const visaSales = parseFloat(formData.visaSales) || 0;
    const visaFees = parseFloat(formData.visaFees) || 0;
    const mastercardSales = parseFloat(formData.mastercardSales) || 0;
    const mastercardFees = parseFloat(formData.mastercardFees) || 0;
    const amexSales = parseFloat(formData.amexSales) || 0;
    const amexFees = parseFloat(formData.amexFees) || 0;
    const discoverSales = parseFloat(formData.discoverSales) || 0;
    const discoverFees = parseFloat(formData.discoverFees) || 0;
    
    const interchangeFees = parseFloat(formData.interchangeFees) || 0;
    const assessmentFees = parseFloat(formData.assessmentFees) || 0;
    const processorFees = parseFloat(formData.processorFees) || 0;
    const monthlyFees = parseFloat(formData.monthlyFees) || 0;
    const transactionCount = parseInt(formData.transactionCount) || 0;

    // Validate
    if (totalSales === 0) {
      toast.error('Missing data', {
        description: 'Please enter at least the total sales amount'
      });
      return;
    }

    // Calculate effective rate
    const effectiveRate = totalSales > 0 ? (totalFees / totalSales) * 100 : 0;
    const netAmount = totalSales - totalFees + chargebacks + adjustments;
    const avgTicket = transactionCount > 0 ? totalSales / transactionCount : 0;

    // Calculate by card type
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

    // Fee breakdown
    const feeBreakdown = [];
    if (interchangeFees > 0) {
      feeBreakdown.push({
        category: 'Interchange Fees',
        amount: interchangeFees,
        percentage: (interchangeFees / totalFees) * 100,
        description: 'Fees paid to card-issuing banks (non-negotiable)'
      });
    }
    if (assessmentFees > 0) {
      feeBreakdown.push({
        category: 'Assessment Fees',
        amount: assessmentFees,
        percentage: (assessmentFees / totalFees) * 100,
        description: 'Fees paid to card networks (Visa, Mastercard, etc.)'
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

    // Calculate processor markup rate
    const processorMarkupRate = totalSales > 0 ? (processorFees / totalSales) * 100 : 0;
    const interchangeRate = totalSales > 0 ? (interchangeFees / totalSales) * 100 : 0;

    // Generate recommendations
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
        adjustments,
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

    toast.success('Analysis complete', {
      description: 'Your statement has been analyzed'
    });
  };

  const generateRecommendations = (data) => {
    const recommendations = [];

    // Rate comparison
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

    // Processor markup
    if (data.processorMarkupRate > 1.0) {
      recommendations.push({
        type: 'warning',
        title: 'High Processor Markup',
        description: `Your processor is charging ${data.processorMarkupRate.toFixed(2)}% over interchange. Industry standard is 0.30-0.75%. This is negotiable.`,
        potentialSavings: ((data.processorMarkupRate - 0.5) / 100) * data.totalSales
      });
    } else if (data.processorMarkupRate < 0.5) {
      recommendations.push({
        type: 'success',
        title: 'Excellent Processor Markup',
        description: `Your processor markup of ${data.processorMarkupRate.toFixed(2)}% is very competitive.`,
        potentialSavings: 0
      });
    }

    // Monthly fees
    if (data.monthlyFees > 200) {
      recommendations.push({
        type: 'warning',
        title: 'High Monthly Fees',
        description: `Monthly fees of $${data.monthlyFees.toFixed(2)} seem high. Review equipment rental and account fees for potential savings.`,
        potentialSavings: (data.monthlyFees - 100) * 12 // Annual savings
      });
    }

    // Average ticket
    if (data.avgTicket < 10) {
      recommendations.push({
        type: 'info',
        title: 'Low Average Ticket',
        description: `Your average ticket of $${data.avgTicket.toFixed(2)} means transaction fees have a bigger impact. Consider encouraging larger purchases or setting minimums.`,
        potentialSavings: 0
      });
    }

    // Card mix
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
    
    toast.success('Report downloaded', {
      description: 'Your analysis report has been saved'
    });
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
    report += `Transaction Count:        ${data.summary.transactionCount.toLocaleString()}\n`;
    report += `Average Ticket:           $${data.summary.avgTicket.toFixed(2)}\n`;
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
    report += `Interchange Component:    ${data.rates.interchangeRate.toFixed(2)}%\n`;
    report += `Processor Markup:         ${data.rates.processorMarkupRate.toFixed(2)}%\n\n`;
    
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
        {!manualEntry && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-[#f08e80]" />
                Upload Statement
              </CardTitle>
              <CardDescription>
                Upload your credit card processing statement (PDF format)
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
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 mb-4">Or enter your data manually</p>
                <Button
                  variant="outline"
                  onClick={() => setManualEntry(true)}
                >
                  Manual Entry
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Manual Entry Form */}
        {manualEntry && !analysisData && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#f08e80]" />
                Enter Statement Data
              </CardTitle>
              <CardDescription>
                Fill in the key figures from your processing statement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Basic Info */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Basic Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="merchantName">Merchant Name</Label>
                      <Input
                        id="merchantName"
                        value={formData.merchantName}
                        onChange={(e) => handleInputChange('merchantName', e.target.value)}
                        placeholder="Your Business Name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="statementPeriod">Statement Period</Label>
                      <Input
                        id="statementPeriod"
                        value={formData.statementPeriod}
                        onChange={(e) => handleInputChange('statementPeriod', e.target.value)}
                        placeholder="e.g., December 2024"
                      />
                    </div>
                  </div>
                </div>

                {/* Summary Figures */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Summary Figures <span className="text-red-600">*</span></h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="totalSales">Total Sales <span className="text-red-600">*</span></Label>
                      <Input
                        id="totalSales"
                        type="number"
                        step="0.01"
                        value={formData.totalSales}
                        onChange={(e) => handleInputChange('totalSales', e.target.value)}
                        placeholder="923961.37"
                      />
                    </div>
                    <div>
                      <Label htmlFor="totalFees">Total Fees <span className="text-red-600">*</span></Label>
                      <Input
                        id="totalFees"
                        type="number"
                        step="0.01"
                        value={formData.totalFees}
                        onChange={(e) => handleInputChange('totalFees', e.target.value)}
                        placeholder="21091.06"
                      />
                    </div>
                    <div>
                      <Label htmlFor="transactionCount">Transaction Count</Label>
                      <Input
                        id="transactionCount"
                        type="number"
                        value={formData.transactionCount}
                        onChange={(e) => handleInputChange('transactionCount', e.target.value)}
                        placeholder="14568"
                      />
                    </div>
                    <div>
                      <Label htmlFor="chargebacks">Chargebacks (if any)</Label>
                      <Input
                        id="chargebacks"
                        type="number"
                        step="0.01"
                        value={formData.chargebacks}
                        onChange={(e) => handleInputChange('chargebacks', e.target.value)}
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>

                {/* Card Type Breakdown */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Breakdown by Card Type (Optional)</h4>
                  <p className="text-sm text-gray-600 mb-4">If your statement shows breakdown by card brand, enter it here for more detailed analysis</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="visaSales">Visa Sales</Label>
                      <Input
                        id="visaSales"
                        type="number"
                        step="0.01"
                        value={formData.visaSales}
                        onChange={(e) => handleInputChange('visaSales', e.target.value)}
                        placeholder="498706.12"
                      />
                    </div>
                    <div>
                      <Label htmlFor="visaFees">Visa Fees</Label>
                      <Input
                        id="visaFees"
                        type="number"
                        step="0.01"
                        value={formData.visaFees}
                        onChange={(e) => handleInputChange('visaFees', e.target.value)}
                        placeholder="8800.00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="mastercardSales">Mastercard Sales</Label>
                      <Input
                        id="mastercardSales"
                        type="number"
                        step="0.01"
                        value={formData.mastercardSales}
                        onChange={(e) => handleInputChange('mastercardSales', e.target.value)}
                        placeholder="254691.82"
                      />
                    </div>
                    <div>
                      <Label htmlFor="mastercardFees">Mastercard Fees</Label>
                      <Input
                        id="mastercardFees"
                        type="number"
                        step="0.01"
                        value={formData.mastercardFees}
                        onChange={(e) => handleInputChange('mastercardFees', e.target.value)}
                        placeholder="4900.00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="amexSales">American Express Sales</Label>
                      <Input
                        id="amexSales"
                        type="number"
                        step="0.01"
                        value={formData.amexSales}
                        onChange={(e) => handleInputChange('amexSales', e.target.value)}
                        placeholder="147769.62"
                      />
                    </div>
                    <div>
                      <Label htmlFor="amexFees">American Express Fees</Label>
                      <Input
                        id="amexFees"
                        type="number"
                        step="0.01"
                        value={formData.amexFees}
                        onChange={(e) => handleInputChange('amexFees', e.target.value)}
                        placeholder="3100.00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="discoverSales">Discover Sales</Label>
                      <Input
                        id="discoverSales"
                        type="number"
                        step="0.01"
                        value={formData.discoverSales}
                        onChange={(e) => handleInputChange('discoverSales', e.target.value)}
                        placeholder="22793.81"
                      />
                    </div>
                    <div>
                      <Label htmlFor="discoverFees">Discover Fees</Label>
                      <Input
                        id="discoverFees"
                        type="number"
                        step="0.01"
                        value={formData.discoverFees}
                        onChange={(e) => handleInputChange('discoverFees', e.target.value)}
                        placeholder="520.00"
                      />
                    </div>
                  </div>
                </div>

                {/* Fee Category Breakdown */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Fee Categories (Optional)</h4>
                  <p className="text-sm text-gray-600 mb-4">If your statement breaks down fees by category, enter them here</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="interchangeFees">Interchange Fees</Label>
                      <Input
                        id="interchangeFees"
                        type="number"
                        step="0.01"
                        value={formData.interchangeFees}
                        onChange={(e) => handleInputChange('interchangeFees', e.target.value)}
                        placeholder="17569.66"
                      />
                    </div>
                    <div>
                      <Label htmlFor="assessmentFees">Assessment/Network Fees</Label>
                      <Input
                        id="assessmentFees"
                        type="number"
                        step="0.01"
                        value={formData.assessmentFees}
                        onChange={(e) => handleInputChange('assessmentFees', e.target.value)}
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="processorFees">Processor Service Charges</Label>
                      <Input
                        id="processorFees"
                        type="number"
                        step="0.01"
                        value={formData.processorFees}
                        onChange={(e) => handleInputChange('processorFees', e.target.value)}
                        placeholder="1841.97"
                      />
                    </div>
                    <div>
                      <Label htmlFor="monthlyFees">Monthly/Equipment Fees</Label>
                      <Input
                        id="monthlyFees"
                        type="number"
                        step="0.01"
                        value={formData.monthlyFees}
                        onChange={(e) => handleInputChange('monthlyFees', e.target.value)}
                        placeholder="549.52"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setManualEntry(false);
                      setFile(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={calculateAnalysis}>
                    Analyze Statement
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
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
                      <p className="text-sm font-medium text-gray-600">Avg Ticket</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">
                        {formatCurrency(analysisData.summary.avgTicket)}
                      </p>
                    </div>
                    <div className="h-12 w-12 bg-[#f08e80]/10 rounded-full flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-[#f08e80]" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {analysisData.summary.transactionCount.toLocaleString()} transactions
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
                  setManualEntry(false);
                  setFile(null);
                  setFormData({
                    merchantName: '',
                    statementPeriod: '',
                    totalSales: '',
                    totalFees: '',
                    chargebacks: '',
                    adjustments: '',
                    visaSales: '',
                    visaFees: '',
                    mastercardSales: '',
                    mastercardFees: '',
                    amexSales: '',
                    amexFees: '',
                    discoverSales: '',
                    discoverFees: '',
                    interchangeFees: '',
                    assessmentFees: '',
                    processorFees: '',
                    monthlyFees: '',
                    transactionCount: '',
                  });
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
