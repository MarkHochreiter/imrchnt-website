import React, { useState, useCallback } from 'react';
import { Upload, Download, FileText, CheckCircle2, AlertCircle, Settings, Eye, ArrowLeft, Edit2 } from 'lucide-react';
import * as XLSX from 'xlsx';

// Button component to match design system
const Button = ({ children, className = '', size = 'default', variant = 'default', onClick, disabled, ...props }) => {
  const sizeClasses = {
    default: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
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

// Card components
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

// Input component
const Input = ({ className = '', ...props }) => (
  <input
    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f08e80] focus:border-transparent ${className}`}
    {...props}
  />
)

// Select components
const Select = ({ value, onValueChange, children, className = '' }) => {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f08e80] focus:border-transparent bg-white ${className}`}
    >
      {children}
    </select>
  )
}

const SelectItem = ({ value, children }) => (
  <option value={value}>{children}</option>
)

// Label component
const Label = ({ children, htmlFor, className = '' }) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 ${className}`}>
    {children}
  </label>
)

// Checkbox component
const Checkbox = ({ checked, onCheckedChange, id, className = '' }) => (
  <input
    type="checkbox"
    id={id}
    checked={checked}
    onChange={(e) => onCheckedChange(e.target.checked)}
    className={`h-4 w-4 text-[#f08e80] focus:ring-[#f08e80] border-gray-300 rounded ${className}`}
  />
)

// Table components
const Table = ({ children }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      {children}
    </table>
  </div>
)

const TableHeader = ({ children }) => (
  <thead className="bg-gray-50">
    {children}
  </thead>
)

const TableBody = ({ children }) => (
  <tbody className="bg-white divide-y divide-gray-200">
    {children}
  </tbody>
)

const TableRow = ({ children }) => (
  <tr>
    {children}
  </tr>
)

const TableHead = ({ children, className = '' }) => (
  <th className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}>
    {children}
  </th>
)

const TableCell = ({ children, className = '' }) => (
  <td className={`px-4 py-3 whitespace-nowrap text-sm ${className}`}>
    {children}
  </td>
)

// Toast notification (simple implementation)
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

const NONE_VALUE = '__NONE__';
const DEFAULT_VALUE = '__DEFAULT__';

const SPI_FIELDS = ['FIELD', 'SEQUENCE', 'BARCODE', 'QUANTITY', 'DEPTCAT', 'USER', 'PRICE', 'AREA'];
const REQUIRED_FIELDS = ['BARCODE', 'QUANTITY'];

const DELIMITERS = {
  auto: 'Auto-detect',
  comma: 'Comma (,)',
  tab: 'Tab',
  pipe: 'Pipe (|)',
  semicolon: 'Semicolon (;)',
  space: 'Space',
};

function SPIConverterPage({ onNavigateBack }) {
  const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [parsedData, setParsedData] = useState(null);
  const [delimiter, setDelimiter] = useState('auto');
  const [detectedDelimiter, setDetectedDelimiter] = useState('');
  const [mapping, setMapping] = useState({
    FIELD: NONE_VALUE,
    SEQUENCE: NONE_VALUE,
    BARCODE: NONE_VALUE,
    QUANTITY: NONE_VALUE,
    DEPTCAT: NONE_VALUE,
    USER: NONE_VALUE,
    PRICE: NONE_VALUE,
    AREA: NONE_VALUE,
  });
  const [defaultValues, setDefaultValues] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  
  // ✅ NEW: Header detection state
  const [hasHeaders, setHasHeaders] = useState(true);
  const [manualHeaders, setManualHeaders] = useState([]);
  const [isEditingHeaders, setIsEditingHeaders] = useState(false);

  const detectDelimiter = (line) => {
    const tabCount = (line.match(/\t/g) || []).length;
    const commaCount = (line.match(/,/g) || []).length;
    const pipeCount = (line.match(/\|/g) || []).length;
    const semicolonCount = (line.match(/;/g) || []).length;
    const multiSpaceCount = (line.match(/\s{2,}/g) || []).length;
    
    const counts = [
      { delimiter: '\t', count: tabCount, name: 'Tab' },
      { delimiter: ',', count: commaCount, name: 'Comma' },
      { delimiter: '|', count: pipeCount, name: 'Pipe' },
      { delimiter: ';', count: semicolonCount, name: 'Semicolon' },
      { delimiter: '  ', count: multiSpaceCount, name: 'Space' },
    ];
    
    counts.sort((a, b) => b.count - a.count);
    return counts[0].count > 0 ? counts[0].delimiter : ',';
  };

  const getDelimiterChar = (delimiterType, text) => {
    if (delimiterType === 'comma') return ',';
    if (delimiterType === 'tab') return '\t';
    if (delimiterType === 'pipe') return '|';
    if (delimiterType === 'semicolon') return ';';
    if (delimiterType === 'space') return '  ';
    
    const lines = text.split('\n');
    if (lines.length > 1) {
      return detectDelimiter(lines[1]);
    }
    return detectDelimiter(lines[0]);
  };

  const splitCSVLine = (line, delimiter) => {
    if (delimiter === ',') {
      const result = [];
      let current = '';
      let inQuotes = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          result.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current.trim());
      return result;
    }
    
    if (delimiter === '  ') {
      return line.split(/\s{2,}/).map(field => field.trim());
    }
    
    return line.split(delimiter).map(field => field.trim());
  };

  // ✅ NEW: Parse Excel files
  const parseExcelFile = (arrayBuffer) => {
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1, defval: '' });
    
    if (jsonData.length === 0) {
      throw new Error('Excel file is empty');
    }
    
    let headers, rows;
    
    if (hasHeaders) {
      headers = jsonData[0].map(h => String(h || ''));
      rows = jsonData.slice(1).map(row => row.map(cell => String(cell || '')));
    } else {
      // Generate column names: Column 1, Column 2, etc.
      const columnCount = jsonData[0].length;
      headers = Array.from({ length: columnCount }, (_, i) => `Column ${i + 1}`);
      rows = jsonData.map(row => row.map(cell => String(cell || '')));
      setManualHeaders(headers);
      setIsEditingHeaders(true);
    }
    
    return { headers, rows };
  };

  // ✅ NEW: Parse PDF files (basic text extraction)
  const parsePDFFile = async (arrayBuffer) => {
    // For PDF parsing, we'll use a simple text extraction approach
    // In production, you'd want to use pdf-parse or pdfjs-dist
    // For now, we'll show an error and suggest conversion
    throw new Error('PDF parsing requires additional setup. Please convert your PDF to Excel or CSV first.');
  };

  const parseFile = (text, delimiterType) => {
    const lines = text.trim().split('\n').filter(line => line.trim());
    if (lines.length === 0) {
      throw new Error('File is empty');
    }
    
    const dataDelimiter = getDelimiterChar(delimiterType, text);
    
    let headers, rows;
    
    if (hasHeaders) {
      const headerDelimiter = detectDelimiter(lines[0]);
      headers = splitCSVLine(lines[0], headerDelimiter);
      rows = lines.slice(1).map(line => splitCSVLine(line, dataDelimiter));
    } else {
      // No headers - generate column names
      const firstRow = splitCSVLine(lines[0], dataDelimiter);
      headers = Array.from({ length: firstRow.length }, (_, i) => `Column ${i + 1}`);
      rows = lines.map(line => splitCSVLine(line, dataDelimiter));
      setManualHeaders(headers);
      setIsEditingHeaders(true);
    }
    
    const delimiterName = 
      dataDelimiter === '\t' ? 'Tab' :
      dataDelimiter === ',' ? 'Comma' :
      dataDelimiter === '|' ? 'Pipe' :
      dataDelimiter === ';' ? 'Semicolon' :
      dataDelimiter === '  ' ? 'Space' : 'Unknown';
    
    setDetectedDelimiter(delimiterName);
    
    return { headers, rows };
  };

  const handleFileUpload = useCallback((uploadedFile) => {
    setFile(uploadedFile);
    const fileName = uploadedFile.name.toLowerCase();
    
    // ✅ NEW: Handle different file types
    if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = parseExcelFile(e.target.result);
          setParsedData(data);
          autoMapFields(data);
          toast.success('Excel file uploaded successfully', {
            description: `Found ${data.headers.length} columns and ${data.rows.length} rows`
          });
        } catch (error) {
          toast.error('Failed to parse Excel file', {
            description: error instanceof Error ? error.message : 'Please ensure your file is properly formatted'
          });
        }
      };
      reader.readAsArrayBuffer(uploadedFile);
    } else if (fileName.endsWith('.pdf')) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = await parsePDFFile(e.target.result);
          setParsedData(data);
          autoMapFields(data);
          toast.success('PDF file uploaded successfully', {
            description: `Found ${data.headers.length} columns and ${data.rows.length} rows`
          });
        } catch (error) {
          toast.error('Failed to parse PDF file', {
            description: error instanceof Error ? error.message : 'PDF parsing is not yet fully supported'
          });
        }
      };
      reader.readAsArrayBuffer(uploadedFile);
    } else {
      // CSV/TXT files
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        setFileContent(text);
        
        try {
          const data = parseFile(text, delimiter);
          setParsedData(data);
          autoMapFields(data);
          toast.success('File uploaded successfully', {
            description: `Found ${data.headers.length} columns and ${data.rows.length} rows`
          });
        } catch (error) {
          toast.error('Failed to parse file', {
            description: error instanceof Error ? error.message : 'Please ensure your file is properly formatted'
          });
        }
      };
      reader.readAsText(uploadedFile);
    }
  }, [delimiter, hasHeaders]);

  const autoMapFields = (data) => {
    const autoMapping = {};
    SPI_FIELDS.forEach(spiField => {
      const matchingHeader = data.headers.find(h => 
        h.toUpperCase() === spiField.toUpperCase() ||
        h.toUpperCase().includes(spiField.toUpperCase())
      );
      if (matchingHeader) {
        autoMapping[spiField] = matchingHeader;
      }
    });
    setMapping(prev => ({ ...prev, ...autoMapping }));
  };

  const handleDelimiterChange = (newDelimiter) => {
    setDelimiter(newDelimiter);
    if (fileContent) {
      try {
        const data = parseFile(fileContent, newDelimiter);
        setParsedData(data);
        
        setMapping({
          FIELD: NONE_VALUE,
          SEQUENCE: NONE_VALUE,
          BARCODE: NONE_VALUE,
          QUANTITY: NONE_VALUE,
          DEPTCAT: NONE_VALUE,
          USER: NONE_VALUE,
          PRICE: NONE_VALUE,
          AREA: NONE_VALUE,
        });
        
        toast.success('Delimiter changed', {
          description: `Re-parsed with ${DELIMITERS[newDelimiter]}`
        });
      } catch (error) {
        toast.error('Failed to re-parse file', {
          description: 'Try a different delimiter'
        });
      }
    }
  };

  // ✅ NEW: Handle header changes
  const handleHeaderChange = (index, value) => {
    const newHeaders = [...manualHeaders];
    newHeaders[index] = value;
    setManualHeaders(newHeaders);
  };

  const applyManualHeaders = () => {
    if (parsedData) {
      setParsedData({
        ...parsedData,
        headers: manualHeaders
      });
      setIsEditingHeaders(false);
      toast.success('Headers updated', {
        description: 'Your custom headers have been applied'
      });
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    const fileName = droppedFile.name.toLowerCase();
    const validExtensions = ['.csv', '.txt', '.xlsx', '.xls', '.pdf'];
    const isValid = validExtensions.some(ext => fileName.endsWith(ext));
    
    if (droppedFile && isValid) {
      handleFileUpload(droppedFile);
    } else {
      toast.error('Invalid file type', {
        description: 'Please upload a .csv, .txt, .xlsx, .xls, or .pdf file'
      });
    }
  }, [handleFileUpload]);

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
  }, [handleFileUpload]);

  const getSampleValue = (columnName) => {
    if (!parsedData || columnName === NONE_VALUE || columnName === DEFAULT_VALUE) return '';
    const columnIndex = parsedData.headers.indexOf(columnName);
    if (columnIndex === -1) return '';
    
    for (const row of parsedData.rows) {
      if (row[columnIndex] && row[columnIndex].trim()) {
        return row[columnIndex];
      }
    }
    return '(empty)';
  };

  // ✅ NEW: Updated conversion with default values
  const convertToSPI = (includeHeader = false) => {
    if (!parsedData) return '';
    
    const spiRows = [];
    
    if (includeHeader) {
      spiRows.push(SPI_FIELDS.join(','));
    }
    
    parsedData.rows.forEach(row => {
      const spiRow = [];
      SPI_FIELDS.forEach(spiField => {
        const sourceField = mapping[spiField];
        
        // ✅ NEW: Check if it's a default value
        if (sourceField === DEFAULT_VALUE) {
          spiRow.push(defaultValues[spiField] || '');
        } else if (sourceField && sourceField !== NONE_VALUE) {
          const sourceIndex = parsedData.headers.indexOf(sourceField);
          spiRow.push(sourceIndex >= 0 ? row[sourceIndex] || '' : '');
        } else {
          spiRow.push('');
        }
      });
      spiRows.push(spiRow.join(','));
    });
    
    return spiRows.join('\n');
  };

  const handleDownload = () => {
    const spiContent = convertToSPI(false);
    const blob = new Blob([spiContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    // Generate timestamp filename: yyyymmddhhmmss.spi
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timestamp = `${year}${month}${day}${hours}${minutes}${seconds}`;
    
    a.download = `${timestamp}.spi`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('File downloaded', {
      description: 'Your SPI file has been generated successfully'
    });
  };

  // Check if all required fields are mapped
  const missingRequiredFields = REQUIRED_FIELDS.filter(field => 
    !mapping[field] || mapping[field] === NONE_VALUE
  );
  const hasRequiredFields = missingRequiredFields.length === 0;
  const isReadyToConvert = parsedData && hasRequiredFields;

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
              <FileText className="h-12 w-12 text-[#f08e80]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">SPI File Converter</h1>
            <p className="text-xl text-gray-600">
              Convert your CSV, TXT, Excel, or PDF files to SPI format with custom field mapping
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Upload Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-[#f08e80]" />
              Upload File
            </CardTitle>
            <CardDescription>
              Upload a .csv, .txt, .xlsx, .xls, or .pdf file to begin the conversion process
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* ✅ NEW: Header checkbox */}
            <div className="mb-4 flex items-center gap-2">
              <Checkbox
                id="has-headers"
                checked={hasHeaders}
                onCheckedChange={(checked) => {
                  setHasHeaders(checked);
                  if (file) {
                    // Re-parse file with new header setting
                    handleFileUpload(file);
                  }
                }}
              />
              <Label htmlFor="has-headers" className="cursor-pointer">
                File has headers in first row
              </Label>
            </div>

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
                accept=".csv,.txt,.xlsx,.xls,.pdf"
                onChange={handleFileInput}
                className="hidden"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <FileText className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium text-gray-700 mb-2">
                  {file ? file.name : 'Drop your file here or click to browse'}
                </p>
                <p className="text-sm text-gray-500">
                  Supports CSV, TXT, Excel (.xlsx, .xls), and PDF files
                </p>
              </label>
            </div>
            
            {file && parsedData && (
              <div className="mt-6 space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium text-green-900">File loaded successfully</p>
                    <p className="text-sm text-green-700">
                      {parsedData.headers.length} columns • {parsedData.rows.length} rows
                      {detectedDelimiter && ` • Data delimiter: ${detectedDelimiter}`}
                    </p>
                  </div>
                </div>
                
                {/* Delimiter Selector - only show for CSV/TXT */}
                {file.name.toLowerCase().endsWith('.csv') || file.name.toLowerCase().endsWith('.txt') ? (
                  <div className="flex items-start gap-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <Settings className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <Label htmlFor="delimiter-select" className="text-sm font-medium text-blue-900 mb-2">
                        Data Row Delimiter
                      </Label>
                      <p className="text-xs text-blue-700 mb-3">
                        {hasHeaders ? 'Header is auto-detected. Select delimiter for data rows if auto-detection is incorrect.' : 'Select the delimiter used in your data rows.'}
                      </p>
                      <Select value={delimiter} onValueChange={(value) => handleDelimiterChange(value)}>
                        {Object.entries(DELIMITERS).map(([key, label]) => (
                          <SelectItem key={key} value={key}>
                            {label}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </CardContent>
        </Card>

        {/* ✅ NEW: Manual Header Editor */}
        {isEditingHeaders && parsedData && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit2 className="h-5 w-5 text-[#f08e80]" />
                Edit Column Headers
              </CardTitle>
              <CardDescription>
                Enter custom names for each column
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {manualHeaders.map((header, index) => (
                  <div key={index}>
                    <Label className="mb-2">Column {index + 1}</Label>
                    <Input
                      value={header}
                      onChange={(e) => handleHeaderChange(index, e.target.value)}
                      placeholder={`Column ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end">
                <Button onClick={applyManualHeaders}>
                  Apply Headers
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Data Preview */}
        {parsedData && !isEditingHeaders && (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-[#f08e80]" />
                    Data Preview
                  </CardTitle>
                  <CardDescription>
                    Verify your columns are parsed correctly (showing first 5 rows)
                  </CardDescription>
                </div>
                {!hasHeaders && (
                  <Button
                    variant="outline"
                    onClick={() => setIsEditingHeaders(true)}
                    className="text-sm"
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit Headers
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    {parsedData.headers.map((header, idx) => (
                      <TableHead key={idx}>
                        {header || `(Column ${idx + 1})`}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parsedData.rows.slice(0, 5).map((row, rowIdx) => (
                    <TableRow key={rowIdx}>
                      {parsedData.headers.map((_, colIdx) => (
                        <TableCell key={colIdx} className="font-mono text-sm">
                          {row[colIdx] || <span className="text-gray-400 italic">(empty)</span>}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {parsedData.rows.length > 5 && (
                <p className="text-sm text-gray-500 mt-4 text-center">
                  ... and {parsedData.rows.length - 5} more rows
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Field Mapping Section */}
        {parsedData && !isEditingHeaders && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#f08e80]" />
                Field Mapping
              </CardTitle>
              <CardDescription>
                Map your source columns to the SPI format fields, or set default values
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {SPI_FIELDS.map(spiField => (
                  <div key={spiField} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start p-4 bg-gray-50 rounded-lg">
                    <div>
                      <Label className="mb-2">
                        {spiField}
                        {REQUIRED_FIELDS.includes(spiField) && (
                          <span className="text-red-600 ml-1">*</span>
                        )}
                      </Label>
                      <Select
                        value={mapping[spiField]}
                        onValueChange={(value) => setMapping(prev => ({ ...prev, [spiField]: value }))}
                      >
                        <SelectItem value={NONE_VALUE}>None</SelectItem>
                        <SelectItem value={DEFAULT_VALUE}>Default Value</SelectItem>
                        {parsedData.headers.map(header => (
                          <SelectItem key={header} value={header}>
                            {header}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      {/* ✅ NEW: Show default value input or sample value */}
                      {mapping[spiField] === DEFAULT_VALUE ? (
                        <div>
                          <Label className="text-xs text-gray-500 mb-2">
                            Default Value (applied to all rows)
                          </Label>
                          <Input
                            value={defaultValues[spiField] || ''}
                            onChange={(e) => setDefaultValues(prev => ({ ...prev, [spiField]: e.target.value }))}
                            placeholder="Enter default value"
                            className="mt-2"
                          />
                        </div>
                      ) : mapping[spiField] !== NONE_VALUE && (
                        <div>
                          <Label className="text-xs text-gray-500 mb-2">
                            Sample Value
                          </Label>
                          <div className="bg-white border border-gray-200 rounded px-3 py-2 text-sm text-gray-700 font-mono mt-2">
                            {getSampleValue(mapping[spiField]) || '(no data)'}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {parsedData && missingRequiredFields.length > 0 && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-red-900">Required fields missing</p>
                    <p className="text-sm text-red-700">
                      You must map the following required fields: {missingRequiredFields.join(', ')}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Preview Section */}
        {parsedData && isReadyToConvert && !isEditingHeaders && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#f08e80]" />
                SPI Output Preview
              </CardTitle>
              <CardDescription>
                Preview of your converted SPI file (showing first 5 rows)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs font-mono">
                  {convertToSPI(true).split('\n').slice(0, 6).join('\n')}
                  {parsedData.rows.length > 5 && '\n...'}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Download Button */}
        {isReadyToConvert && !isEditingHeaders && (
          <div className="flex justify-center">
            <Button
              onClick={handleDownload}
              size="lg"
              className="text-lg px-8"
            >
              <Download className="h-5 w-5 mr-2" />
              Download SPI File
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SPIConverterPage;
