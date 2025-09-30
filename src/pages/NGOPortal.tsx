import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Building, MapPin, User, Phone, FileText, Globe, Instagram, Youtube, Shield } from 'lucide-react';

export const NGOPortal = () => {
  const { user, login, register, updateProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ email: '', password: '', confirmPassword: '' });
  const [profileForm, setProfileForm] = useState({
    foundationName: '',
    area: '',
    chairpersonName: '',
    contactNumber: '',
    address: '',
    capacity: '',
    certificate: null as File | null,
    instagramLink: '',
    youtubeLink: '',
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(loginForm.email, loginForm.password, 'ngo');
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Please check your credentials.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    try {
      await register(registerForm.email, registerForm.password, 'ngo');
      toast({
        title: "Registration Successful",
        description: "Please complete your profile.",
      });
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileForm);
    toast({
      title: "Profile Submitted",
      description: "Your profile has been sent for admin approval.",
    });
  };

  // If user is not logged in, show login/register
  if (!user || user.role !== 'ngo') {
    return (
      <div className="min-h-screen bg-gradient-subtle py-12">
        <div className="container mx-auto px-4 max-w-md">
          <Card className="shadow-large">
            <CardHeader className="text-center">
              <Building className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle className="text-2xl">NGO Portal</CardTitle>
              <CardDescription>
                Login or register to manage your NGO profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="login-email">Email</Label>
                      <Input
                        id="login-email"
                        type="email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        id="login-password"
                        type="password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Logging in...' : 'Login'}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <Label htmlFor="register-email">Email</Label>
                      <Input
                        id="register-email"
                        type="email"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="register-password">Password</Label>
                      <Input
                        id="register-password"
                        type="password"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={registerForm.confirmPassword}
                        onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Registering...' : 'Register'}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // If user is logged in but not approved
  if (!user.isApproved) {
    // Show profile form if no profile exists
    if (!user.profile) {
      return (
        <div className="min-h-screen bg-gradient-subtle py-12">
          <div className="container mx-auto px-4 max-w-2xl">
            <Card className="shadow-large">
              <CardHeader>
                <CardTitle className="text-2xl">Complete Your NGO Profile</CardTitle>
                <CardDescription>
                  Please provide your organization details for verification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="foundation-name">
                        <Building className="inline h-4 w-4 mr-1" />
                        Foundation Name
                      </Label>
                      <Input
                        id="foundation-name"
                        value={profileForm.foundationName}
                        onChange={(e) => setProfileForm({ ...profileForm, foundationName: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="area">
                        <MapPin className="inline h-4 w-4 mr-1" />
                        Area/Location
                      </Label>
                      <Input
                        id="area"
                        value={profileForm.area}
                        onChange={(e) => setProfileForm({ ...profileForm, area: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="chairperson">
                        <User className="inline h-4 w-4 mr-1" />
                        Chairperson Name
                      </Label>
                      <Input
                        id="chairperson"
                        value={profileForm.chairpersonName}
                        onChange={(e) => setProfileForm({ ...profileForm, chairpersonName: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact">
                        <Phone className="inline h-4 w-4 mr-1" />
                        Contact Number
                      </Label>
                      <Input
                        id="contact"
                        type="tel"
                        value={profileForm.contactNumber}
                        onChange={(e) => setProfileForm({ ...profileForm, contactNumber: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">
                      <MapPin className="inline h-4 w-4 mr-1" />
                      Full Address
                    </Label>
                    <Input
                      id="address"
                      value={profileForm.address}
                      onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="capacity">
                        <User className="inline h-4 w-4 mr-1" />
                        Capacity (plates/day)
                      </Label>
                      <Input
                        id="capacity"
                        type="number"
                        value={profileForm.capacity}
                        onChange={(e) => setProfileForm({ ...profileForm, capacity: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="certificate">
                        <FileText className="inline h-4 w-4 mr-1" />
                        Certificate (PDF/JPEG)
                      </Label>
                      <Input
                        id="certificate"
                        type="file"
                        accept=".pdf,.jpg,.jpeg"
                        onChange={(e) => setProfileForm({ ...profileForm, certificate: e.target.files?.[0] || null })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="instagram">
                        <Instagram className="inline h-4 w-4 mr-1" />
                        Instagram Link (optional)
                      </Label>
                      <Input
                        id="instagram"
                        type="url"
                        value={profileForm.instagramLink}
                        onChange={(e) => setProfileForm({ ...profileForm, instagramLink: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="youtube">
                        <Youtube className="inline h-4 w-4 mr-1" />
                        YouTube Link (optional)
                      </Label>
                      <Input
                        id="youtube"
                        type="url"
                        value={profileForm.youtubeLink}
                        onChange={(e) => setProfileForm({ ...profileForm, youtubeLink: e.target.value })}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Save Profile
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }

    // Show pending approval message
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <Card className="max-w-md shadow-large">
          <CardContent className="p-12 text-center">
            <Shield className="h-16 w-16 text-secondary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Account Under Review</h2>
            <p className="text-muted-foreground">
              Your NGO profile is being reviewed by our admin team. 
              You will be notified once your account is approved.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Approved NGO Dashboard
  return (
    <div className="min-h-screen bg-gradient-subtle py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">NGO Dashboard</h1>
        <Card className="shadow-large">
          <CardContent className="p-8">
            <p className="text-xl">Welcome back, {user.email}!</p>
            <p className="text-muted-foreground mt-2">
              Your NGO is approved and active. Dashboard features coming soon...
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};