import React, { useState } from 'react';
import { FileText, Upload, Download, Trash2, Eye, Search, Filter } from 'lucide-react';
import { Card, CardHeader, CardTitle, Button, Input, Skeleton } from '../ui';

export const CaseFilesPage = ({ onNavigate }) => {
  const [files, setFiles] = useState([
    {
      id: 1,
      name: 'Property Deed - Final',
      size: '2.4 MB',
      uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      type: 'PDF',
      category: 'Evidence',
    },
    {
      id: 2,
      name: 'Statement of Witness',
      size: '1.2 MB',
      uploadedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      type: 'PDF',
      category: 'Statements',
    },
    {
      id: 3,
      name: 'Court Notice - March 2026',
      size: '856 KB',
      uploadedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      type: 'PDF',
      category: 'Court Documents',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isUploading, setIsUploading] = useState(false);

  const categories = ['all', 'Evidence', 'Statements', 'Court Documents', 'Agreements'];

  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || file.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleFileUpload = (e) => {
    setIsUploading(true);
    setTimeout(() => {
      const newFile = {
        id: files.length + 1,
        name: 'New Document.pdf',
        size: '0 B',
        uploadedAt: new Date(),
        type: 'PDF',
        category: 'Evidence',
      };
      setFiles([newFile, ...files]);
      setIsUploading(false);
    }, 1000);
  };

  const handleDeleteFile = (fileId) => {
    setFiles(files.filter((f) => f.id !== fileId));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary-900 mb-2">Case File Management</h1>
        <p className="text-primary-600">Organize and manage all your case documents in one place</p>
      </div>

      {/* Upload Section */}
      <Card className="border-2 border-dashed border-primary-300 bg-primary-50">
        <div className="text-center py-8">
          <Upload className="mx-auto text-primary-400 mb-3" size={36} />
          <h3 className="font-bold text-primary-900 mb-1">Upload Case Files</h3>
          <p className="text-sm text-primary-600 mb-4">
            Drag and drop files or click to browse
          </p>
          <Button
            onClick={handleFileUpload}
            variant="primary"
            loading={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Select Files'}
          </Button>
          <p className="text-xs text-primary-500 mt-4">
            Max file size: 50MB. Supported: PDF, DOC, DOCX, TXT, JPG, PNG
          </p>
        </div>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="text-3xl">📁</div>
            <div>
              <p className="text-sm text-primary-600">Total Files</p>
              <p className="text-2xl font-bold text-primary-900">{files.length}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="text-3xl">💾</div>
            <div>
              <p className="text-sm text-primary-600">Storage Used</p>
              <p className="text-2xl font-bold text-primary-900">
                {(files.length * 1.5).toFixed(1)} MB
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="text-3xl">📊</div>
            <div>
              <p className="text-sm text-primary-600">Total Storage</p>
              <p className="text-2xl font-bold text-primary-900">5.0 GB</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Files</CardTitle>
        </CardHeader>
        <div className="space-y-4">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-3 text-primary-400" />
            <Input
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div>
            <p className="text-sm font-medium text-primary-900 mb-2">Category</p>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? 'primary' : 'secondary'}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Files List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              Files ({filteredFiles.length})
            </CardTitle>
          </div>
        </CardHeader>

        {filteredFiles.length === 0 ? (
          <div className="text-center py-12">
            <FileText size={48} className="mx-auto text-primary-300 mb-4" />
            <h3 className="text-lg font-bold text-primary-900 mb-2">No files found</h3>
            <p className="text-primary-600">Try adjusting your filters or upload new files</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-primary-100">
                  <th className="text-left py-3 px-4 font-bold text-primary-900">File Name</th>
                  <th className="text-left py-3 px-4 font-bold text-primary-900">Category</th>
                  <th className="text-left py-3 px-4 font-bold text-primary-900">Size</th>
                  <th className="text-left py-3 px-4 font-bold text-primary-900">Uploaded</th>
                  <th className="text-right py-3 px-4 font-bold text-primary-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFiles.map((file) => (
                  <tr key={file.id} className="border-b border-primary-100 hover:bg-primary-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">📄</span>
                        <span className="font-medium text-primary-900">{file.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-primary-600">{file.category}</td>
                    <td className="py-3 px-4 text-sm text-primary-600">{file.size}</td>
                    <td className="py-3 px-4 text-sm text-primary-600">
                      {file.uploadedAt.toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex gap-2 justify-end">
                        <button className="p-1.5 hover:bg-blue-100 rounded text-accent-blue">
                          <Eye size={18} />
                        </button>
                        <button className="p-1.5 hover:bg-emerald-100 rounded text-accent-emerald">
                          <Download size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteFile(file.id)}
                          className="p-1.5 hover:bg-red-100 rounded text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};
