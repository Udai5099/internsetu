import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

// Mock data for applicants - in a real app, this would come from an API
const mockApplicants = [
  { id: 'S001', name: 'Priya Sharma', matchScore: 92, status: 'Pending Review', appliedDate: '2025-09-15' },
  { id: 'S002', name: 'Rohan Verma', matchScore: 88, status: 'Shortlisted', appliedDate: '2025-09-14' },
  { id: 'S003', name: 'Anjali Das', matchScore: 85, status: 'Pending Review', appliedDate: '2025-09-16' },
  { id: 'S004', name: 'Vikram Singh', matchScore: 78, status: 'Rejected', appliedDate: '2025-09-13' },
  { id: 'S005', name: 'Sneha Gupta', matchScore: 95, status: 'Shortlisted', appliedDate: '2025-09-17' },
];

// Helper to get color based on match score
const getScoreColor = (score: number) => {
  if (score >= 90) return 'bg-green-500';
  if (score >= 80) return 'bg-blue-500';
  if (score >= 70) return 'bg-yellow-500';
  return 'bg-red-500';
};

const statusColors = {
  'Pending Review': 'bg-gray-500',
  'Shortlisted': 'bg-green-600',
  'Rejected': 'bg-red-600',
};

export default function CompanyApplicantsPage() {
  // In a real app, you'd use the ID from the URL to fetch the correct internship applicants
  // For now, we'll just display a static title.
  const { internshipId } = useParams(); 

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <Link to="/company/dashboard" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Applicants for Frontend Developer Intern</h1>
            <p className="text-muted-foreground">Review and manage candidates who have applied for this role.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AI Match Score</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied On</th>
                  <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockApplicants.map((applicant) => (
                  <tr key={applicant.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{applicant.name}</div>
                      <div className="text-sm text-gray-500">{applicant.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className={`h-2.5 w-2.5 rounded-full ${getScoreColor(applicant.matchScore)}`}></span>
                        <span className="text-sm font-semibold">{applicant.matchScore}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={`${statusColors[applicant.status]} text-white`}>{applicant.status}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{applicant.appliedDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/student/profile/${applicant.id}`} className="text-primary hover:underline">
                        View Profile
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
