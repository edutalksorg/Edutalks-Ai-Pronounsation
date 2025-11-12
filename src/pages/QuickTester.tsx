import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Play, Code2 } from 'lucide-react';

export default function QuickTester() {
  const [method, setMethod] = useState('GET');
  const [response, setResponse] = useState<any>(null);

  const handleTest = () => {
    // Simulate API response
    setResponse({
      status: 200,
      statusText: 'OK',
      data: {
        success: true,
        message: 'API test successful',
        timestamp: new Date().toISOString(),
      },
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Quick API Tester</h1>
        <p className="text-muted-foreground">Test API endpoints quickly</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="h-5 w-5" />
              Request Configuration
            </CardTitle>
            <CardDescription>Configure your API test request</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>HTTP Method</Label>
              <Select value={method} onValueChange={setMethod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GET">GET</SelectItem>
                  <SelectItem value="POST">POST</SelectItem>
                  <SelectItem value="PUT">PUT</SelectItem>
                  <SelectItem value="DELETE">DELETE</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="endpoint">Endpoint URL</Label>
              <Textarea
                id="endpoint"
                placeholder="/api/users"
                className="font-mono text-sm"
                rows={1}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="headers">Headers (JSON)</Label>
              <Textarea
                id="headers"
                placeholder='{"Content-Type": "application/json"}'
                className="font-mono text-sm"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="body">Request Body (JSON)</Label>
              <Textarea
                id="body"
                placeholder='{"key": "value"}'
                className="font-mono text-sm"
                rows={5}
              />
            </div>

            <Button onClick={handleTest} className="w-full gradient-hero">
              <Play className="h-4 w-4 mr-2" />
              Send Request
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Response</CardTitle>
            <CardDescription>API response will appear here</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {response ? (
              <>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800">
                    {response.status} {response.statusText}
                  </Badge>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <pre className="text-sm overflow-auto">
                    {JSON.stringify(response.data, null, 2)}
                  </pre>
                </div>
              </>
            ) : (
              <div className="text-center text-muted-foreground py-12">
                No response yet. Send a request to see results.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
