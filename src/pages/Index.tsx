import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Users, MessageSquare, Trophy, Mic, Phone } from 'lucide-react';

export default function Index() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: 'Voice Calling',
      description: 'Connect with real learners worldwide for practice conversations',
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: 'Daily Topics',
      description: 'Fresh learning content delivered every day to keep you engaged',
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      title: 'Daily Quizzes',
      description: 'Test your knowledge and track your progress with daily challenges',
    },
    {
      icon: <Mic className="h-6 w-6" />,
      title: 'AI Pronunciation',
      description: 'Get instant feedback on your pronunciation with AI technology',
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Referral Rewards',
      description: 'Earn rewards by inviting friends to join the learning community',
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: 'Expert Instructors',
      description: 'Learn from experienced educators and industry professionals',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Master Communication Skills
              <span className="block gradient-hero bg-clip-text text-transparent mt-2">
                Through Real Conversations
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of learners improving their English and communication skills through
              daily practice, AI feedback, and real-time conversations.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" onClick={() => navigate('/login')} className="gradient-hero text-lg px-8">
                Start Learning Free
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/login')} className="text-lg px-8">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">
            Everything You Need to
            <span className="gradient-hero bg-clip-text text-transparent"> Excel</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Comprehensive tools and features designed to accelerate your learning journey
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-elevation-high transition-all hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/50"
              >
                <div className="w-12 h-12 gradient-hero rounded-lg flex items-center justify-center mb-4 text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="gradient-hero p-12 text-center text-white max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Skills?</h2>
            <p className="text-lg mb-8 opacity-90">
              Join our community today and start your journey towards fluent communication
            </p>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate('/login')}
              className="bg-white text-primary hover:bg-white/90 text-lg px-8"
            >
              Get Started Now
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
}
