import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Subscriptions() {
  const { toast } = useToast();

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: [
        '5 Daily Topics',
        '3 Quizzes per week',
        'Basic AI Pronunciation',
        'Community Forum Access',
      ],
      icon: <Check className="h-6 w-6" />,
      popular: false,
    },
    {
      name: 'Premium',
      price: '$49.99',
      period: 'per month',
      features: [
        'Unlimited Daily Topics',
        'Unlimited Quizzes',
        'Advanced AI Pronunciation',
        'Voice Calling Feature',
        'Priority Support',
        '20% Referral Cashback',
      ],
      icon: <Crown className="h-6 w-6" />,
      popular: true,
    },
    {
      name: 'Yearly',
      price: '$399.99',
      period: 'per year',
      features: [
        'All Premium Features',
        'Save $200 per year',
        '30% Referral Cashback',
        'Exclusive Content',
        'Personal Learning Coach',
        'Certificate of Completion',
      ],
      icon: <Zap className="h-6 w-6" />,
      popular: false,
    },
  ];

  const handleSubscribe = (planName: string) => {
    toast({
      title: 'Subscription updated',
      description: `You've subscribed to the ${planName} plan`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Choose Your Plan</h1>
        <p className="text-muted-foreground">Select the perfect plan for your learning journey</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card 
            key={plan.name}
            className={plan.popular ? 'border-primary border-2 relative' : ''}
          >
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-hero">
                Most Popular
              </Badge>
            )}
            <CardHeader>
              <div className="w-12 h-12 gradient-hero rounded-lg flex items-center justify-center text-white mb-4">
                {plan.icon}
              </div>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>
                <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground"> {plan.period}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                onClick={() => handleSubscribe(plan.name)}
                className={plan.popular ? 'w-full gradient-hero' : 'w-full'}
                variant={plan.popular ? 'default' : 'outline'}
              >
                {plan.name === 'Free' ? 'Current Plan' : 'Subscribe Now'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
