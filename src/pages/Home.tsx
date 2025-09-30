import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Heart, Users, Utensils, ArrowRight, Globe, Shield, Clock } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export const Home = () => {
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    setContactForm({ name: '', email: '', message: '' });
  };

  const recentActivities = [
    { id: 1, restaurant: "The Green Kitchen", ngo: "Feed the Hungry Foundation", plates: 150, time: "2 hours ago" },
    { id: 2, restaurant: "Sunset Bistro", ngo: "Community Care NGO", plates: 80, time: "5 hours ago" },
    { id: 3, restaurant: "Urban Delights", ngo: "Hope for All", plates: 200, time: "8 hours ago" },
    { id: 4, restaurant: "Family Restaurant", ngo: "Children's Welfare Society", plates: 120, time: "1 day ago" },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="container mx-auto px-4 py-24 relative">
          <div className="text-center max-w-4xl mx-auto animate-fade-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Bridge the Gap Between Surplus and Need
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Connecting restaurants with surplus food to NGOs serving communities in need.
              Together, we can reduce food waste and feed the hungry.
            </p>
            <Button asChild variant="hero">
              <Link to="/ngo-portal">
                Join Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Platform Overview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              FoodBridge is dedicated to creating a sustainable solution to food waste by facilitating
              connections between restaurants with excess food and NGOs that distribute meals to those in need.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border shadow-medium hover:shadow-large transition-all">
              <CardHeader>
                <Utensils className="h-12 w-12 text-primary mb-4" />
                <CardTitle>For Restaurants</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Reduce food waste and contribute to your community by donating surplus food
                  instead of throwing it away.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border shadow-medium hover:shadow-large transition-all">
              <CardHeader>
                <Users className="h-12 w-12 text-secondary mb-4" />
                <CardTitle>For NGOs</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Access quality surplus food from restaurants to help feed more people in your
                  community efficiently.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border shadow-medium hover:shadow-large transition-all">
              <CardHeader>
                <Heart className="h-12 w-12 text-destructive mb-4" />
                <CardTitle>Impact Together</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Every meal saved is a meal shared. Join us in creating a sustainable and
                  compassionate food ecosystem.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Activities */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Recent Activities</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {recentActivities.map((activity) => (
              <Card key={activity.id} className="shadow-soft hover:shadow-medium transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{activity.restaurant}</p>
                      <p className="text-sm text-muted-foreground">donated to</p>
                      <p className="font-medium text-primary">{activity.ngo}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-secondary">{activity.plates}</p>
                      <p className="text-sm text-muted-foreground">plates</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {activity.time}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">About Us</h2>
          <div className="space-y-6 text-muted-foreground">
            <p className="text-lg">
              FoodBridge was born from a simple observation: while restaurants often have surplus food
              at the end of each day, millions go hungry. We believe that technology can bridge this gap.
            </p>
            <p className="text-lg">
              Our platform streamlines the process of food donation by connecting verified restaurants
              with authenticated NGOs. We ensure that quality food reaches those who need it most,
              reducing waste and building stronger communities.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <Globe className="h-12 w-12 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Global Impact</h3>
                <p className="text-sm">Creating sustainable solutions for food security worldwide</p>
              </div>
              <div className="text-center">
                <Shield className="h-12 w-12 text-secondary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Verified Partners</h3>
                <p className="text-sm">All restaurants and NGOs are thoroughly verified</p>
              </div>
              <div className="text-center">
                <Heart className="h-12 w-12 text-destructive mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Community First</h3>
                <p className="text-sm">Building bridges between surplus and need</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
          <Card className="shadow-large">
            <CardContent className="p-8">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    required
                    rows={5}
                    className="mt-1"
                  />
                </div>
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};