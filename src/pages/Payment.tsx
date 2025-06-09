import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CreditCard, Smartphone, Building2, QrCode, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Payment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const courseId = searchParams.get("courseId");
  const courseName = searchParams.get("courseName") || "Complete Options Trading Mastery";
  const amount = searchParams.get("amount") || "₹12,999";
  const instructor = searchParams.get("instructor") || "Rajesh Kumar";

  const paymentMethods = [
    {
      id: "upi",
      name: "UPI",
      icon: <Smartphone className="w-6 h-6" />,
      description: "Pay using UPI ID or QR code",
      popular: true
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: <CreditCard className="w-6 h-6" />,
      description: "Visa, Mastercard, RuPay accepted"
    },
    {
      id: "netbanking",
      name: "Net Banking",
      icon: <Building2 className="w-6 h-6" />,
      description: "Pay directly from your bank account"
    },
    {
      id: "wallet",
      name: "Digital Wallet",
      icon: <QrCode className="w-6 h-6" />,
      description: "Paytm, PhonePe, Google Pay"
    }
  ];

  const handlePayment = async () => {
    if (!selectedMethod) {
      toast({
        title: "Select Payment Method",
        description: "Please select a payment method to continue",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: "Payment Successful!",
        description: `Enrolled in ${courseName} successfully`,
      });
      setIsProcessing(false);
      navigate(`/course/${courseId}?enrolled=true`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Course
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Payment</h1>
          <p className="text-gray-600 mt-2">Secure payment powered by Razorpay</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Choose Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-blue-300 ${
                      selectedMethod === method.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200"
                    }`}
                    onClick={() => setSelectedMethod(method.id)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${
                        selectedMethod === method.id ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                      }`}>
                        {method.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900">{method.name}</h3>
                          {method.popular && (
                            <Badge className="bg-green-100 text-green-800 text-xs">Popular</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                      {selectedMethod === method.id && (
                        <CheckCircle className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{courseName}</h3>
                  <p className="text-sm text-gray-600">by {instructor}</p>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Course Price</span>
                    <span>{amount}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Platform Fee</span>
                    <span>₹0</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg text-gray-900 border-t pt-2">
                    <span>Total</span>
                    <span>{amount}</span>
                  </div>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {isProcessing ? "Processing..." : `Pay ${amount}`}
                </Button>

                <div className="text-xs text-gray-500 text-center">
                  <p>🔒 Secured by Razorpay</p>
                  <p>Your payment information is encrypted and secure</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
