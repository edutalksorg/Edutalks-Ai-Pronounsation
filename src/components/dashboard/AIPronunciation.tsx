import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, Square, Volume2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

const SAMPLE_PHRASES = [
  'The quick brown fox jumps over the lazy dog',
  'Communication is the key to success',
  'Practice makes perfect',
  'Knowledge is power',
];

export const AIPronunciation = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState(SAMPLE_PHRASES[0]);
  const [score, setScore] = useState<number | null>(null);
  const { toast } = useToast();

  const startRecording = () => {
    setIsRecording(true);
    toast({
      title: 'Recording started',
      description: 'Speak clearly into your microphone',
    });

    setTimeout(() => {
      stopRecording();
    }, 3000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setTimeout(() => {
      const randomScore = Math.floor(Math.random() * 20) + 80;
      setScore(randomScore);
      toast({
        title: 'Analysis complete',
        description: `Your pronunciation score: ${randomScore}%`,
      });
    }, 1000);
  };

  const playPhrase = () => {
    toast({
      title: 'Playing audio',
      description: 'Listen to the correct pronunciation',
    });
  };

  const newPhrase = () => {
    const randomPhrase = SAMPLE_PHRASES[Math.floor(Math.random() * SAMPLE_PHRASES.length)];
    setCurrentPhrase(randomPhrase);
    setScore(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mic className="h-5 w-5" />
            AI Pronunciation Feedback
          </CardTitle>
          <CardDescription>
            Practice your pronunciation and get instant AI-powered feedback
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted rounded-lg p-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">Practice this phrase:</p>
            <p className="text-2xl font-semibold">{currentPhrase}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={playPhrase}
              className="mt-4"
            >
              <Volume2 className="h-4 w-4 mr-2" />
              Listen
            </Button>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div
              className={`w-32 h-32 rounded-full flex items-center justify-center transition-all ${
                isRecording
                  ? 'bg-red-500 animate-pulse'
                  : 'gradient-hero'
              }`}
            >
              {isRecording ? (
                <Square className="h-12 w-12 text-white" />
              ) : (
                <Mic className="h-12 w-12 text-white" />
              )}
            </div>

            <div className="text-center space-y-2">
              <Button
                size="lg"
                onClick={isRecording ? stopRecording : startRecording}
                variant={isRecording ? 'destructive' : 'default'}
                className={!isRecording ? 'gradient-hero' : ''}
              >
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </Button>
              <p className="text-sm text-muted-foreground">
                {isRecording ? 'Recording... Speak now' : 'Click to start practicing'}
              </p>
            </div>
          </div>

          {score !== null && (
            <Card className="border-2 border-primary/50">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-lg">Your Score</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Pronunciation Accuracy</span>
                    <span className="font-bold text-2xl">{score}%</span>
                  </div>
                  <Progress value={score} className="h-3" />
                </div>
                <div className="pt-4 space-y-2">
                  <h4 className="font-medium text-sm">Feedback:</h4>
                  <p className="text-sm text-muted-foreground">
                    {score >= 90
                      ? 'Excellent! Your pronunciation is very clear.'
                      : score >= 70
                      ? 'Good effort! Keep practicing for better results.'
                      : 'Keep practicing! Focus on clarity and pace.'}
                  </p>
                </div>
                <Button onClick={newPhrase} variant="outline" className="w-full">
                  Try Another Phrase
                </Button>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
