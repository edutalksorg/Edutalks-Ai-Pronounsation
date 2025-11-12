import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Phone, PhoneOff, Star, Ban, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const VoiceCalling = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isInCall, setIsInCall] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [callPartner, setCallPartner] = useState('');
  const { toast } = useToast();

  const startCall = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setIsInCall(true);
      setCallPartner(`User_${Math.floor(Math.random() * 9999)}`);
      toast({
        title: 'Connected',
        description: 'You are now connected with a partner',
      });
    }, 2000);
  };

  const endCall = () => {
    setIsInCall(false);
    setShowRating(true);
  };

  const submitRating = () => {
    toast({
      title: 'Thank you for your feedback',
      description: 'Your rating has been submitted',
    });
    setShowRating(false);
    setRating(0);
    setFeedback('');
  };

  const blockUser = () => {
    toast({
      title: 'User blocked',
      description: 'You will not be matched with this user again',
    });
    setShowRating(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Voice Calling Feature
          </CardTitle>
          <CardDescription>
            Connect with real users to practice your communication skills
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Privacy Notice:</strong> Do not share personal information during calls.
              EduLearnDevelop is not responsible for any losses resulting from shared information.
            </AlertDescription>
          </Alert>

          <div className="flex flex-col items-center justify-center space-y-6 py-8">
            {!isInCall && !isConnecting && (
              <div className="text-center space-y-4">
                <div className="w-24 h-24 gradient-hero rounded-full flex items-center justify-center mx-auto">
                  <Phone className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Ready to Practice?</h3>
                <p className="text-muted-foreground max-w-md">
                  Click the button below to connect with another learner for a practice conversation
                </p>
                <Button size="lg" onClick={startCall} className="gradient-hero">
                  <Phone className="h-5 w-5 mr-2" />
                  Start Call
                </Button>
              </div>
            )}

            {isConnecting && (
              <div className="text-center space-y-4">
                <div className="w-24 h-24 gradient-hero rounded-full flex items-center justify-center mx-auto animate-pulse">
                  <Phone className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Connecting...</h3>
                <p className="text-muted-foreground">Finding a practice partner for you</p>
              </div>
            )}

            {isInCall && (
              <div className="text-center space-y-6 w-full max-w-md">
                <div className="w-24 h-24 gradient-success rounded-full flex items-center justify-center mx-auto animate-pulse">
                  <Phone className="h-12 w-12 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Connected with {callPartner}</h3>
                  <p className="text-muted-foreground">Call in progress...</p>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Call Duration: 00:45</p>
                </div>
                <Button size="lg" variant="destructive" onClick={endCall}>
                  <PhoneOff className="h-5 w-5 mr-2" />
                  End Call
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={showRating} onOpenChange={setShowRating}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rate Your Experience</DialogTitle>
            <DialogDescription>
              Please rate your conversation with {callPartner}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label>Rating</Label>
              <div className="flex gap-2 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button
                    key={star}
                    variant="ghost"
                    size="lg"
                    onClick={() => setRating(star)}
                    className="p-0 w-12 h-12"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="feedback">Feedback (Optional)</Label>
              <Textarea
                id="feedback"
                placeholder="Share your experience..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <Button onClick={submitRating} className="flex-1">
                Submit Rating
              </Button>
              <Button variant="destructive" onClick={blockUser}>
                <Ban className="h-4 w-4 mr-2" />
                Block User
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
