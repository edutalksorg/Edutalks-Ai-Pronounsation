import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import WalletAPI from "@/lib/api/types/wallet";
import { DollarSign, PlusCircle, MinusCircle } from "lucide-react";

export default function Wallet() {
  const { toast } = useToast();
  const [balance, setBalance] = useState<number | null>(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  /** ✅ Fetch wallet balance on page load */
  const fetchBalance = async () => {
    setLoading(true);
    try {
      const data = await WalletAPI.getWalletBalance();
      setBalance(data?.balance ?? 0);
    } catch (err: any) {
      toast({
        title: "Failed to fetch wallet",
        description: err?.response?.data?.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  /** ✅ Add funds */
  const handleAddFunds = async () => {
    if (!amount) return;

    setLoading(true);
    try {
      await WalletAPI.addFunds(parseFloat(amount));
      toast({ title: "Funds added successfully" });
      fetchBalance();
    } catch (err: any) {
      toast({
        title: "Failed to add funds",
        description: err?.response?.data?.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  /** ✅ Withdraw funds */
  const handleWithdraw = async () => {
    if (!amount) return;

    setLoading(true);
    try {
      await WalletAPI.withdrawFunds(parseFloat(amount));
      toast({ title: "Withdrawal requested successfully" });
      fetchBalance();
    } catch (err: any) {
      toast({
        title: "Failed to withdraw",
        description: err?.response?.data?.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Wallet</CardTitle>
          <CardDescription>View balance and manage funds</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {balance !== null && (
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-3xl font-bold flex items-center justify-center gap-2">
                <DollarSign /> {balance.toFixed(2)}
              </p>
              <span className="text-muted-foreground">Current Balance</span>
            </div>
          )}

          <Label>Amount</Label>
          <Input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <div className="flex gap-4">
            <Button
              onClick={handleAddFunds}
              disabled={loading}
              className="flex items-center gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              Add Funds
            </Button>

            <Button
              variant="destructive"
              onClick={handleWithdraw}
              disabled={loading}
              className="flex items-center gap-2"
            >
              <MinusCircle className="h-4 w-4" />
              Withdraw
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
