import React, { useState } from 'react';
import { FaFilePdf, FaFileExcel, FaDownload, FaCheckCircle, FaSpinner } from 'react-icons/fa';

const ExportReports = () => {
  const [selectedReport, setSelectedReport] = useState('');
  const [exportType, setExportType] = useState('pdf');
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const reportOptions = [
    {
      value: 'system-wide-pdf',
      label: 'System-wide PDF Report',
      description: 'Complete system overview including all NGOs, supervisors, and patients'
    },
    {
      value: 'ngo-wise-pdf',
      label: 'NGO-wise PDF Reports',
      description: 'Individual PDF reports for each NGO with detailed analytics'
    },
    {
      value: 'supervisor-level',
      label: 'Supervisor-level Report',
      description: 'Performance reports for all supervisors across organizations'
    },
    {
      value: 'patient-level',
      label: 'Patient-level Summary',
      description: 'Aggregated patient data and recovery statistics'
    }
  ];

  const handleExport = async () => {
    if (!selectedReport) {
      alert('Please select a report type');
      return;
    }

    setIsExporting(true);
    setExportComplete(false);

    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);

      // Reset after showing success
      setTimeout(() => {
        setExportComplete(false);
      }, 3000);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Export Reports</h2>
        <p className="text-gray-600 mt-2">Generate and download comprehensive system reports</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Report Type</h3>

          <div className="space-y-4">
            {reportOptions.map((option) => (
              <label
                key={option.value}
                className={`block p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedReport === option.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <input
                    type="radio"
                    name="report"
                    value={option.value}
                    checked={selectedReport === option.value}
                    onChange={(e) => setSelectedReport(e.target.value)}
                    className="mt-1 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{option.label}</div>
                    <div className="text-sm text-gray-600 mt-1">{option.description}</div>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Export Format</h3>

          <div className="flex space-x-6">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="format"
                value="pdf"
                checked={exportType === 'pdf'}
                onChange={(e) => setExportType(e.target.value)}
                className="text-blue-600 focus:ring-blue-500"
              />
              <FaFilePdf className="text-red-500 text-xl" />
              <span className="font-medium text-gray-900">PDF Document</span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="format"
                value="excel"
                checked={exportType === 'excel'}
                onChange={(e) => setExportType(e.target.value)}
                className="text-blue-600 focus:ring-blue-500"
              />
              <FaFileExcel className="text-green-500 text-xl" />
              <span className="font-medium text-gray-900">Excel Spreadsheet</span>
            </label>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Selected Configuration</h4>
              <p className="text-sm text-gray-600 mt-1">
                {selectedReport
                  ? `${reportOptions.find(opt => opt.value === selectedReport)?.label} (${exportType.toUpperCase()})`
                  : 'No report selected'
                }
              </p>
            </div>

            <button
              onClick={handleExport}
              disabled={!selectedReport || isExporting}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
                !selectedReport || isExporting
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {isExporting ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <span>Generating Report...</span>
                </>
              ) : exportComplete ? (
                <>
                  <FaCheckCircle className="text-green-500" />
                  <span>Download Complete</span>
                </>
              ) : (
                <>
                  <FaDownload />
                  <span>Export Report</span>
                </>
              )}
            </button>
          </div>
        </div>

        {isExporting && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <FaSpinner className="animate-spin text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-900">Generating Report</p>
                <p className="text-sm text-blue-700">Please wait while we compile your data...</p>
              </div>
            </div>
            <div className="mt-3 bg-blue-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
          </div>
        )}

        {exportComplete && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <FaCheckCircle className="text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-900">Export Complete</p>
                <p className="text-sm text-green-700">Your report has been generated and is ready for download.</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Report Contents Preview</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <h5 className="font-medium text-gray-900 mb-2">System-wide PDF includes:</h5>
              <ul className="space-y-1">
                <li>• Executive summary</li>
                <li>• KPI dashboards</li>
                <li>• NGO performance rankings</li>
                <li>• Alert statistics</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-gray-900 mb-2">NGO-wise reports include:</h5>
              <ul className="space-y-1">
                <li>• Individual NGO analytics</li>
                <li>• Supervisor performance</li>
                <li>• Patient progress reports</li>
                <li>• Custom metrics</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportReports;