import React, { useState } from 'react';
import { Card, Input } from '../ui';
import { PageHeader } from '../components/PageHeader';

export const DemandDraftPage = ({ onNavigate }) => {
  const [query, setQuery] = useState('');
  const rows = [
    ['Marriage Certificate.pdf', 'Rajesh Kumar', 'Family Law', 'evidence', '1.2 MB', 'Mar 3'],
    ['Partnership Contract.pdf', 'Priya Patel', 'Corporate Law', 'contract', '2.8 MB', 'Mar 1'],
    ['Property Deed.pdf', 'Amit Singh', 'Property Law', 'deed', '4.1 MB', 'Feb 28'],
    ['Employment Agreement.pdf', 'Suresh Joshi', 'Labour Law', 'contract', '0.9 MB', 'Feb 20'],
  ];

  return (
    <div>
      <PageHeader
        title="Documents"
        subtitle="All client-uploaded documents in one place"
        showBack={false}
        rightAction={<button className="px-5 py-2.5 rounded-xl bg-[#071b33] text-white font-semibold">+ Upload</button>}
      />

      <div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-5">
          <div className="lg:col-span-3">
            <Input
              placeholder="Search documents..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <select className="w-full px-4 rounded-xl border border-slate-300 bg-white">
            <option>All Clients</option>
          </select>
        </div>

        <Card className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {['Document', 'Client', 'Case Type', 'Tag', 'Size', 'Date', 'Actions'].map((head) => (
                  <th key={head} className="text-left px-5 py-4 font-bold text-slate-600">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.filter((r) => r[0].toLowerCase().includes(query.toLowerCase())).map((row) => (
                <tr key={row[0]} className="border-b border-slate-100">
                  <td className="px-5 py-4 font-semibold text-slate-900">📄 {row[0]}</td>
                  <td className="px-5 py-4">{row[1]}</td>
                  <td className="px-5 py-4">{row[2]}</td>
                  <td className="px-5 py-4"><span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700">{row[3]}</span></td>
                  <td className="px-5 py-4">{row[4]}</td>
                  <td className="px-5 py-4">{row[5]}</td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 border border-slate-300 rounded-lg">View</button>
                      <button className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg">AI Read</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};
