import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, CheckCircle } from 'lucide-react';

const DUMMY_TOPICS = [
  {
    id: 1,
    title: 'Business Communication Etiquette',
    category: 'Professional',
    duration: '15 min',
    completed: true,
    description: 'Learn professional communication skills for the workplace',
  },
  {
    id: 2,
    title: 'Small Talk and Social Conversations',
    category: 'Social',
    duration: '12 min',
    completed: false,
    description: 'Master the art of casual conversations and networking',
  },
  {
    id: 3,
    title: 'Presentation Skills',
    category: 'Professional',
    duration: '20 min',
    completed: false,
    description: 'Deliver impactful presentations with confidence',
  },
];

export const DailyTopics = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Today's Topics
          </CardTitle>
          <CardDescription>Fresh learning content curated for you today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {DUMMY_TOPICS.map((topic) => (
              <Card key={topic.id} className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-semibold">{topic.title}</h3>
                        {topic.completed && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{topic.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <Badge variant="outline">{topic.category}</Badge>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {topic.duration}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant={topic.completed ? 'outline' : 'default'}
                      className={!topic.completed ? 'gradient-hero' : ''}
                    >
                      {topic.completed ? 'Review' : 'Start Learning'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
