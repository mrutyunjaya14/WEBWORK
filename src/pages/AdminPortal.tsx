import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Shield, Check, X, FileText, Eye, Building, Utensils } from 'lucide-react';

interface NGORequest {
  id: string;
  email: string;
  foundationName: string;
  area: string;
  chairpersonName: string;
  contactNumber: string;
  capacity: string;
  certificate: string;
  submittedAt: string;
}

interface RestaurantRequest {
  id: string;
  email: string;
  restaurantName: string;
  ownerName: string;
  contactNumber: string;
  location: string;
  submittedAt: string;
}

export const AdminPortal = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });

  // Mock data for pending requests
  const [ngoRequests] = useState<NGORequest[]>([
    {
      id: '1',
      email: 'hope@ngo.org',
      foundationName: 'Hope Foundation',
      area: 'Downtown',
      chairpersonName: 'John Smith',
      contactNumber: '+1234567890',
      capacity: '500',
      certificate: 'certificate1.pdf',
      submittedAt: '2024-01-15',
    },
    {
      id: '2',
      email: 'care@ngo.org',
      foundationName: 'Community Care',
      area: 'Westside',
      chairpersonName: 'Jane Doe',
      contactNumber: '+0987654321',
      capacity: '300',
      certificate: 'certificate2.pdf',
      submittedAt: '2024-01-16',
    },
  ]);

  const [restaurantRequests] = useState<RestaurantRequest[]>([
    {
      id: '1',
      email: 'green@restaurant.com',
      restaurantName: 'The Green Kitchen',
      ownerName: 'Mike Johnson',
      contactNumber: '+1122334455',
      location: 'Main Street',
      submittedAt: '2024-01-14',
    },
    {
      id: '2',
      email: 'sunset@restaurant.com',
      restaurantName: 'Sunset Bistro',
      ownerName: 'Sarah Williams',
      contactNumber: '+5544332211',
      location: 'Park Avenue',
      submittedAt: '2024-01-15',
    },
  ]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Check for admin credentials
    if (loginForm.username === 'admin@foodwaste.com' && loginForm.password === 'admin123') {
      await login(loginForm.username, loginForm.password, 'admin');
      toast({
        title: "Admin Login Successful",
        description: "Welcome to the admin portal.",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid admin credentials.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const handleApprove = (type: 'ngo' | 'restaurant', id: string) => {
    toast({
      title: "Request Approved",
      description: `${type === 'ngo' ? 'NGO' : 'Restaurant'} has been approved successfully.`,
    });
  };

  const handleReject = (type: 'ngo' | 'restaurant', id: string) => {
    toast({
      title: "Request Rejected",
      description: `${type === 'ngo' ? 'NGO' : 'Restaurant'} request has been rejected.`,
      variant: "destructive",
    });
  };

  // If not logged in as admin
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <Card className="w-full max-w-md shadow-large">
          <CardHeader className="text-center">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle className="text-2xl">Admin Portal</CardTitle>
            <CardDescription>
              Login with admin credentials to manage requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="email"
                  placeholder="admin@foodwaste.com"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter admin password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login as Admin'}
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-4">
                Demo credentials: admin@foodwaste.com / admin123
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gradient-subtle py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage NGO and Restaurant approval requests</p>
        </div>

        <Tabs defaultValue="ngo" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="ngo">
              <Building className="h-4 w-4 mr-2" />
              NGO Requests ({ngoRequests.length})
            </TabsTrigger>
            <TabsTrigger value="restaurant">
              <Utensils className="h-4 w-4 mr-2" />
              Restaurant Requests ({restaurantRequests.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ngo" className="space-y-4">
            {ngoRequests.map((request) => (
              <Card key={request.id} className="shadow-medium">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{request.foundationName}</CardTitle>
                      <CardDescription>{request.email}</CardDescription>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Submitted: {request.submittedAt}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium">Chairperson</p>
                      <p className="text-sm text-muted-foreground">{request.chairpersonName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Contact</p>
                      <p className="text-sm text-muted-foreground">{request.contactNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Area</p>
                      <p className="text-sm text-muted-foreground">{request.area}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Capacity</p>
                      <p className="text-sm text-muted-foreground">{request.capacity} plates/day</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Certificate: {request.certificate}</span>
                    <Button size="sm" variant="ghost">
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </Button>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleApprove('ngo', request.id)}
                      className="flex-1"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Accept
                    </Button>
                    <Button 
                      onClick={() => handleReject('ngo', request.id)}
                      variant="destructive"
                      className="flex-1"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="restaurant" className="space-y-4">
            {restaurantRequests.map((request) => (
              <Card key={request.id} className="shadow-medium">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{request.restaurantName}</CardTitle>
                      <CardDescription>{request.email}</CardDescription>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Submitted: {request.submittedAt}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium">Owner</p>
                      <p className="text-sm text-muted-foreground">{request.ownerName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Contact</p>
                      <p className="text-sm text-muted-foreground">{request.contactNumber}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">{request.location}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleApprove('restaurant', request.id)}
                      variant="secondary"
                      className="flex-1"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Accept
                    </Button>
                    <Button 
                      onClick={() => handleReject('restaurant', request.id)}
                      variant="destructive"
                      className="flex-1"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};