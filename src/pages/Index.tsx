import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Vote, Shield, Users, ChevronRight, CheckCircle } from "lucide-react";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      {/* Navigation */}
      {/* <nav className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
                <Vote className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">VoteSecure</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav> */}

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-primary shadow-lg">
              <Vote className="h-10 w-10 text-primary-foreground" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Secure Digital <span className="text-primary">Voting Platform</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience democracy in the digital age with our secure, transparent, and accessible electronic voting system.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90">
              <Link to="/signup">
                Register to Vote
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/login">Access Your Account</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose VoteSecure?</h2>
          <p className="text-muted-foreground text-lg">
            Built with security, transparency, and accessibility at its core
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center border-0 shadow-lg">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-success-light">
                  <Shield className="h-8 w-8 text-success" />
                </div>
              </div>
              <CardTitle className="text-xl">Secure & Private</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                End-to-end encryption and blockchain verification ensure your vote remains private and tamper-proof.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
                  <Vote className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-xl">Easy to Use</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Intuitive interface designed for voters of all ages and technical backgrounds. Vote from anywhere, anytime.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-warning-light">
                  <Users className="h-8 w-8 text-warning" />
                </div>
              </div>
              <CardTitle className="text-xl">Transparent</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Real-time results, audit trails, and public verification mechanisms ensure complete transparency.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg">
              Simple steps to participate in secure digital voting
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Register",
                description: "Create your secure voter account with identity verification"
              },
              {
                step: "2", 
                title: "Get Approved",
                description: "Wait for admin approval to activate your voting privileges"
              },
              {
                step: "3",
                title: "Vote",
                description: "Cast your ballot securely during active election periods"
              },
              {
                step: "4",
                title: "Track Results",
                description: "Monitor election results and view your voting history"
              }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground font-bold text-lg">
                    {item.step}
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Make Your Voice Heard?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Join thousands of citizens using VoteSecure to participate in democratic processes securely and efficiently.
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <CheckCircle className="h-5 w-5 text-success" />
            <span className="text-sm text-muted-foreground">Verified Secure</span>
            <CheckCircle className="h-5 w-5 text-success" />
            <span className="text-sm text-muted-foreground">Audit Compliant</span>
            <CheckCircle className="h-5 w-5 text-success" />
            <span className="text-sm text-muted-foreground">Privacy Protected</span>
          </div>
          
          <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90">
            <Link to="/signup">
              Start Voting Today
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <Vote className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">VoteSecure</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 VoteSecure. Securing democracy through technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
