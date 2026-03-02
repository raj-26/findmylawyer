import React, { useState } from 'react';
import { FileText, Upload, Download, Trash2, Eye, Search, Folder, File, HardDrive } from 'lucide-react';
import { Card, CardHeader, CardTitle, Button, Input } from '../ui';
import { PageHeader } from '../components/PageHeader';

export const CaseFilesPage = ({ onNavigate }) => {
  const [files, setFiles] = useState([
    {
      id: 1,
      name: 'Property Deed - Final.pdf',
      size: '2.4 MB',
      uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      type: 'PDF',
      category: 'Evidence',
    },
    {
      id: 2,
      name: 'Statement of Witness.docx',
      size: '1.2 MB',
      uploadedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      type: 'DOCX',
      category: 'Statements',
    },
    {
      id: 3,
      name: 'Court Notice - March 2026.pdf',
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
    // Simulate file upload
    setTimeout(() => {
      const newFile = {
        id: files.length + 1,
        name: 'New Document.pdf',
        size: '1.8 MB',
        uploadedAt: new Date(),
        type: 'PDF',
        category: 'Evidence',
      };
      setFiles([newFile, ...files]);
      setIsUploading(false);
    }, 1500);
  };

  const handleDeleteFile = (fileId) => {
    setFiles(files.filter((f) => f.id !== fileId));
  };

  const totalStorageUsed = files.reduce((acc, file) => {
    const size = parseFloat(file.size);
    const unit = file.size.split(' ')[1];
    if (unit === 'MB') return acc + size;
    if (unit === 'KB') return acc + size / 1024;
    return acc;
  }, 0).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PageHeader
        title="Case File Management"
        subtitle="Organize and manage all your case documents"
        showBack={true}
        onBack={() => onNavigate('dashboard')}
        rightAction={
          <Button onClick={handleFileUpload} loading={isUploading}>
            <Upload size={16} className="mr-2" />
            {isUploading ? 'Uploading...' : 'Upload File'}
          </Button>
        }
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <div className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <File size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-primary-600">Total Files</p>
                <p className="text-2xl font-bold text-primary-900">{files.length}</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                <Folder size={24} className="text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-primary-600">Categories</p>
                <p className="text-2xl font-bold text-primary-900">{categories.length - 1}</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                <HardDrive size={24} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-primary-600">Storage Used</p>
                <p className="text-2xl font-bold text-primary-900">{totalStorageUsed} MB</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-8">
          <div className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-400" />
                <Input
                  placeholder="Search files by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    variant={selectedCategory === category ? 'primary' : 'secondary'}
                    size="sm"
                    className="whitespace-nowrap"
                  >
                    {category === 'all' ? 'All Files' : category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Files List */}
        <Card>
          <CardHeader>
            <CardTitle>Files ({filteredFiles.length})</CardTitle>
          </CardHeader>
          {filteredFiles.length === 0 ? (
            <div className="text-center py-16">
              <FileText size={48} className="mx-auto text-primary-300 mb-4" />
              <h3 className="text-lg font-bold text-primary-900">No Files Found</h3>
              <p className="text-primary-600">Try adjusting your search or filter.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-primary-700">File Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-primary-700">Category</th>
                    <th className="text-left py-3 px-4 font-semibold text-primary-700">Size</th>
                    <th className="text-left py-3 px-4 font-semibold text-primary-700">Uploaded</th>
                    <th className="text-right py-3 px-4 font-semibold text-primary-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredFiles.map((file) => (
                    <tr key={file.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <FileText size={20} className="text-primary-500" />
                          <span className="font-medium text-primary-900">{file.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-primary-600">{file.category}</td>
                      <td className="py-3 px-4 text-primary-600">{file.size}</td>
                      <td className="py-3 px-4 text-primary-600">
                        {file.uploadedAt.toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-1 justify-end">
                          <Button variant="ghost" size="icon">
                            <Eye size={16} />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Download size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteFile(file.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
};
