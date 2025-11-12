import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, TrendingUp, Clock } from 'lucide-react';

export default function TopicCategories() {
  const categories = [
    {
      name: 'Business English',
      description: 'Professional communication and business vocabulary',
      topics: 45,
      learners: 1234,
      level: 'Intermediate',
      icon: <TrendingUp className="h-6 w-6" />,
    },
    {
      name: 'Conversational English',
      description: 'Everyday conversations and casual communication',
      topics: 62,
      learners: 2156,
      level: 'Beginner',
      icon: <Users className="h-6 w-6" />,
    },
    {
      name: 'Grammar Fundamentals',
      description: 'Essential grammar rules and structures',
      topics: 38,
      learners: 1567,
      level: 'All Levels',
      icon: <BookOpen className="h-6 w-6" />,
    },
    {
      name: 'Pronunciation Practice',
      description: 'Improve your accent and pronunciation',
      topics: 28,
      learners: 892,
      level: 'All Levels',
      icon: <Clock className="h-6 w-6" />,
    },
    {
      name: 'IELTS Preparation',
      description: 'Complete IELTS exam preparation',
      topics: 72,
      learners: 3421,
      level: 'Advanced',
      icon: <TrendingUp className="h-6 w-6" />,
    },
    {
      name: 'Academic Writing',
      description: 'Essays, research papers, and academic communication',
      topics: 34,
      learners: 756,
      level: 'Advanced',
      icon: <BookOpen className="h-6 w-6" />,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Topic Categories</h1>
        <p className="text-muted-foreground">Explore learning topics organized by category</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.name} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 gradient-hero rounded-lg flex items-center justify-center text-white mb-3">
                {category.icon}
              </div>
              <CardTitle>{category.name}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Topics</span>
                  <Badge variant="outline">{category.topics}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Learners</span>
                  <Badge variant="outline">{category.learners.toLocaleString()}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Level</span>
                  <Badge>{category.level}</Badge>
                </div>
                <Button className="w-full gradient-hero">Explore Topics</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
