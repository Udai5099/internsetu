import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // 1. IMPORT LINK
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Eye } from 'lucide-react';

// ... (Your initialInternships and statusColors objects are the same)
const initialInternships = [
    { id: 'frontend101', title: 'Frontend Developer Intern', location: 'Remote', applicants: 15, status: 'Active' },
    { id: 'backend201', title: 'Backend Engineer Intern', location: 'Bhubaneswar, OD', applicants: 8, status: 'Active' },
    { id: 'datasci301', title: 'Data Science Intern', location: 'Bhubaneswar, OD', applicants: 22, status: 'Closed' },
];

const statusColors = {
    Active: 'bg-green-500',
    Closed: 'bg-red-500',
};

export default function CompanyDashboard() {
  const [internships, setInternships] = useState(initialInternships);
  const [newInternship, setNewInternship] = useState({ title: '', location: '', description: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewInternship(prev => ({ ...prev, [name]: value }));
  };

  const handlePostInternship = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInternship.title || !newInternship.location || !newInternship.description) {
      alert('Please fill out all fields.');
      return;
    }
    const newEntry = {
      id: `${newInternship.title.toLowerCase().replace(/\s+/g, '')}${Date.now()}`,
      ...newInternship,
      applicants: 0,
      status: 'Active',
    };
    setInternships([newEntry, ...internships]);
    setNewInternship({ title: '', location: '', description: '' });
    setIsModalOpen(false);
  };

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Company Dashboard</h1>
              <p className="text-muted-foreground">Manage your posted internships and view applicants.</p>
            </div>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <PlusCircle size={18} />
                  Post New Internship
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Post a New Internship</DialogTitle>
                </DialogHeader>
                <form onSubmit={handlePostInternship} className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">Title</Label>
                    <Input id="title" name="title" value={newInternship.title} onChange={handleInputChange} className="col-span-3" placeholder="e.g., Frontend Developer Intern" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="location" className="text-right">Location</Label>
                    <Input id="location" name="location" value={newInternship.location} onChange={handleInputChange} className="col-span-3" placeholder="e.g., Remote or Bhubaneswar, OD" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">Description</Label>
                    <Textarea id="description" name="description" value={newInternship.description} onChange={handleInputChange} className="col-span-3" placeholder="Describe the role and responsibilities..." />
                  </div>
                  <DialogFooter>
                    <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                    <Button type="submit">Post Internship</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role Title</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicants</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {internships.map((internship) => (
                  <tr key={internship.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{internship.title}</div>
                      <div className="text-sm text-gray-500">{internship.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{internship.applicants}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={`${statusColors[internship.status]} text-white`}>{internship.status}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {/* --- 2. UPDATE THE BUTTON TO BE A LINK --- */}
                      <Link to={`/company/dashboard/${internship.id}/applicants`}>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <Eye size={14} /> View Applicants
                        </Button>
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

