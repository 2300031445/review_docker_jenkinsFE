import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { backend_url } from "@/lib/backend_url";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navbar from "@/components/Layout/Navbar";
import {
  Vote,
  Calendar,
  Users,
  CheckCircle,
  AlertTriangle,
  Clock,
  Shield,
  ArrowLeft,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Candidate {
  id: string;
  name: string;
  party: string;
  description: string;
  avatar?: string;
  experience: string;
}

interface Election {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  totalVotes: number;
  candidates: Candidate[];
}

export default function VotingPage() {
  const { electionId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  useEffect(() => {
    if (!user || user.role !== "user") navigate("/login");
  }, [user, navigate]);

  const [election, setElection] = useState<Election>({
    id: "1",
    title: "Presidential Election 2024",
    description: "National presidential election for the next term. Choose your candidate carefully as this will determine the leadership for the next four years.",
    startDate: "2024-03-15T08:00:00",
    endDate: "2024-03-15T18:00:00",
    status: "active",
    totalVotes: 1245,
    candidates: [
      {
        id: "1",
        name: "Sarah Johnson",
        party: "Democratic Party",
        description: "Former Governor with 15 years of public service experience",
        experience: "Governor (2018-2023), State Senator (2010-2018), City Council Member (2006-2010)",
      },
      {
        id: "2",
        name: "Michael Chen",
        party: "Republican Party", 
        description: "Business leader and former military officer",
        experience: "CEO Tech Solutions Inc. (2015-2024), Military Officer (2008-2015), Small Business Owner (2005-2008)",
      },
      {
        id: "3",
        name: "Elena Rodriguez",
        party: "Green Party",
        description: "Environmental activist and university professor",
        experience: "Environmental Law Professor (2012-2024), Climate Policy Advisor (2010-2012), Environmental Lawyer (2005-2010)",
      },
      {
        id: "4",
        name: "Robert Williams",
        party: "Independent",
        description: "Healthcare professional and community organizer",
        experience: "Hospital Administrator (2016-2024), Community Health Advocate (2010-2016), Registered Nurse (2005-2010)",
      },
    ],
  });

  const [selectedCandidate, setSelectedCandidate] = useState<string>("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState("");

  // Calculate time remaining
  useEffect(() => {
    const updateTimeRemaining = () => {
      const endTime = new Date(election.endDate).getTime();
      const now = new Date().getTime();
      const difference = endTime - now;

      if (difference > 0) {
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        setTimeRemaining(`${hours}h ${minutes}m remaining`);
      } else {
        setTimeRemaining("Voting has ended");
      }
    };

    updateTimeRemaining();
    const interval = setInterval(updateTimeRemaining, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [election.endDate]);

  const handleSubmitVote = async () => {
    setIsSubmitting(true);
    try {
  const response = await fetch(`${backend_url}/api/elections/${electionId}/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          candidateId: selectedCandidate,
        }),
      });

      if (response.ok) {
        toast({
          title: "Vote cast successfully!",
          description: "Your vote has been recorded securely.",
        });
        navigate("/dashboard");
      } else {
        throw new Error("Failed to cast vote");
      }
    } catch (error) {
      toast({
        title: "Error casting vote",
        description: "Please try again or contact support if the problem persists.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setShowConfirmDialog(false);
    }
  };

  const selectedCandidateData = election.candidates.find(c => c.id === selectedCandidate);

  return (
    <div className="min-h-screen bg-background">
  <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard")}
            className="shrink-0"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Cast Your Vote</h1>
            <p className="text-muted-foreground">
              Voter ID: {user.voterId} • Make your choice carefully
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Election Info Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg">{election.title}</CardTitle>
                <CardDescription>{election.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Voting Period</div>
                    <div className="text-muted-foreground">
                      {new Date(election.startDate).toLocaleDateString()} - {new Date(election.endDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-warning" />
                  <div>
                    <div className="font-medium text-warning">{timeRemaining}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Total Votes Cast</div>
                    <div className="text-muted-foreground">{election.totalVotes.toLocaleString()}</div>
                  </div>
                </div>

                <Separator />

                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    Your vote is secret and secure. Once cast, it cannot be changed.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>

          {/* Candidates Section */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Select Your Candidate</h2>
              <p className="text-muted-foreground">
                Choose one candidate to cast your vote. Review their information carefully.
              </p>
            </div>

            <div className="bg-booth border border-booth-border rounded-lg p-6">
              <RadioGroup
                value={selectedCandidate}
                onValueChange={setSelectedCandidate}
                className="space-y-4"
              >
                {election.candidates.map((candidate) => (
                  <div key={candidate.id}>
                    <Label
                      htmlFor={candidate.id}
                      className="cursor-pointer block"
                    >
                      <Card className={`transition-all hover:shadow-md ${
                        selectedCandidate === candidate.id 
                          ? "ring-2 ring-primary border-primary bg-primary/5" 
                          : "hover:border-primary/50"
                      }`}>
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <RadioGroupItem
                              value={candidate.id}
                              id={candidate.id}
                              className="mt-1"
                            />
                            <Avatar className="h-16 w-16 shrink-0">
                              <AvatarImage src={candidate.avatar} alt={candidate.name} />
                              <AvatarFallback className="text-lg">
                                {candidate.name.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="text-xl font-semibold text-foreground">
                                    {candidate.name}
                                  </h3>
                                  <Badge variant="outline" className="mt-1">
                                    {candidate.party}
                                  </Badge>
                                </div>
                              </div>
                              <p className="text-muted-foreground mb-3">
                                {candidate.description}
                              </p>
                              <div className="text-sm">
                                <div className="font-medium text-foreground mb-1">Experience:</div>
                                <div className="text-muted-foreground">
                                  {candidate.experience}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Vote Button */}
            <div className="mt-8 flex justify-center">
              <Button
                onClick={() => setShowConfirmDialog(true)}
                disabled={!selectedCandidate}
                className="px-12 py-6 text-lg bg-gradient-success hover:opacity-90"
              >
                <Vote className="mr-3 h-6 w-6" />
                Cast Vote
              </Button>
            </div>
          </div>
        </div>

        {/* Confirmation Dialog */}
        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Vote className="h-5 w-5" />
                Confirm Your Vote
              </DialogTitle>
              <DialogDescription>
                Please confirm your vote selection. This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            
            {selectedCandidateData && (
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={selectedCandidateData.avatar} alt={selectedCandidateData.name} />
                      <AvatarFallback>
                        {selectedCandidateData.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{selectedCandidateData.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {selectedCandidateData.party}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Once you cast your vote, it cannot be changed or withdrawn.
              </AlertDescription>
            </Alert>

            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => setShowConfirmDialog(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitVote}
                disabled={isSubmitting}
                className="bg-gradient-success hover:opacity-90"
              >
                {isSubmitting ? (
                  "Casting Vote..."
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Confirm Vote
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}