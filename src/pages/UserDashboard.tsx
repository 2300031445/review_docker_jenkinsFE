import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Layout/Navbar";
import {
  Vote,
  Calendar,
  Clock,
  CheckCircle,
  Users,
  TrendingUp,
  Award,
  ArrowRight,
} from "lucide-react";

interface Election {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "upcoming" | "active" | "completed";
  totalVotes: number;
  hasVoted?: boolean;
  candidates: number;
}

export default function UserDashboard() {
  const { user, setUser } = useAuth();
  const handleLogout = () => {
    setUser(null);
    sessionStorage.clear();
  };

  const [stats, setStats] = useState({
    totalElectionsParticipated: 5,
    activeElections: 2,
    upcomingElections: 3,
    completedElections: 2,
  });

  const [elections, setElections] = useState<Election[]>([
    {
      id: "1",
      title: "Presidential Election 2024",
      description: "National presidential election for the next term",
      startDate: "2024-03-15T08:00:00",
      endDate: "2024-03-15T18:00:00",
      status: "active",
      totalVotes: 1245,
      hasVoted: false,
      candidates: 4,
    },
    {
      id: "2",
      title: "Local Mayor Election",
      description: "City mayor election for local governance",
      startDate: "2024-04-10T09:00:00",
      endDate: "2024-04-10T17:00:00",
      status: "upcoming",
      totalVotes: 0,
      candidates: 3,
    },
    {
      id: "3",
      title: "Senate Elections 2024",
      description: "State senate representative elections",
      startDate: "2024-02-20T08:00:00",
      endDate: "2024-02-20T20:00:00",
      status: "completed",
      totalVotes: 2341,
      hasVoted: true,
      candidates: 6,
    },
  ]);

  const activeElections = elections.filter(e => e.status === "active");
  const upcomingElections = elections.filter(e => e.status === "upcoming");
  const completedElections = elections.filter(e => e.status === "completed");

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success text-success-foreground">Active</Badge>;
      case "upcoming":
        return <Badge className="bg-warning text-warning-foreground">Upcoming</Badge>;
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
  {/* <Navbar /> */}
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.name || "User"}
          </h1>
          <p className="text-muted-foreground">
            Voter ID: {user?.voterId || "-"} • Track your elections and cast your votes
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Elections Participated</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalElectionsParticipated}</div>
              <p className="text-xs text-muted-foreground">
                +2 from last year
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Elections</CardTitle>
              <Vote className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{stats.activeElections}</div>
              <p className="text-xs text-muted-foreground">
                Ready for voting
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Elections</CardTitle>
              <Calendar className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{stats.upcomingElections}</div>
              <p className="text-xs text-muted-foreground">
                Scheduled ahead
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Elections</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedElections}</div>
              <p className="text-xs text-muted-foreground">
                Results available
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Active Elections */}
        {activeElections.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-foreground">Active Elections</h2>
              <Badge className="bg-success text-success-foreground">
                {activeElections.length} Active
              </Badge>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {activeElections.map((election) => (
                <Card key={election.id} className="border-success/20 bg-success-light">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{election.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {election.description}
                        </CardDescription>
                      </div>
                      {getStatusBadge(election.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Voting Period</span>
                        <span className="font-medium">
                          {formatDate(election.startDate)} - {formatDate(election.endDate)}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Candidates</span>
                        <span className="font-medium">{election.candidates}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Total Votes</span>
                        <span className="font-medium">{election.totalVotes.toLocaleString()}</span>
                      </div>

                      {election.hasVoted ? (
                        <Button variant="outline" className="w-full" disabled>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Vote Cast
                        </Button>
                      ) : (
                        <Button asChild className="w-full bg-gradient-success hover:opacity-90">
                          <Link to={`/vote/${election.id}`}>
                            <Vote className="mr-2 h-4 w-4" />
                            Cast Vote
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Elections */}
        {upcomingElections.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-foreground">Upcoming Elections</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {upcomingElections.map((election) => (
                <Card key={election.id} className="border-warning/20 bg-warning-light">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{election.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {election.description}
                        </CardDescription>
                      </div>
                      {getStatusBadge(election.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Voting Opens</span>
                        <span className="font-medium text-warning">
                          {formatDate(election.startDate)}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Candidates</span>
                        <span className="font-medium">{election.candidates}</span>
                      </div>
                      
                      <Button variant="outline" className="w-full" disabled>
                        <Calendar className="mr-2 h-4 w-4" />
                        Voting Opens Soon
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Completed Elections */}
        {completedElections.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-foreground">Completed Elections</h2>
              <Link to="/voting-history">
                <Button variant="outline">
                  View All History
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {completedElections.slice(0, 2).map((election) => (
                <Card key={election.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{election.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {election.description}
                        </CardDescription>
                      </div>
                      {getStatusBadge(election.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Voting Period</span>
                        <span className="font-medium">
                          {formatDate(election.startDate)}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Total Votes</span>
                        <span className="font-medium">{election.totalVotes.toLocaleString()}</span>
                      </div>

                      <Button variant="outline" className="w-full" asChild>
                        <Link to={`/results/${election.id}`}>
                          <TrendingUp className="mr-2 h-4 w-4" />
                          View Results
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}