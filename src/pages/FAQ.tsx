
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How do I know if a trader is verified?",
      answer: "All traders on our platform go through a strict verification process. Look for the green SEBI badge next to their name, which indicates they are registered with the Securities and Exchange Board of India."
    },
    {
      question: "What's the difference between a full course and mentorship?",
      answer: "A full course includes structured video lessons (15-20 hours), live sessions, recorded content, and 1-month group chat access. Mentorship focuses on personalized guidance with weekly 1:1 calls and portfolio reviews."
    },
    {
      question: "Can I get a refund if I'm not satisfied?",
      answer: "Yes, we offer a 7-day money-back guarantee for full courses and mentorship programs. For 1:1 sessions, refunds are available if cancelled 24 hours before the session."
    },
    {
      question: "How do group chats work?",
      answer: "Group chats are exclusive to students enrolled in full courses. You'll have direct access to your mentor and fellow students for 1 month, where you can ask questions and share trading insights."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit/debit cards, UPI, net banking, and digital wallets. All transactions are secure and encrypted."
    },
    {
      question: "How do I schedule a 1:1 session?",
      answer: "After booking a 1:1 session, you'll be redirected to the mentor's calendar where you can choose from their available time slots. You'll receive a confirmation email with the meeting link."
    },
    {
      question: "Can I access recorded sessions?",
      answer: "Yes, all live sessions in full courses are recorded and available for lifetime access. You can watch them anytime from your student dashboard."
    },
    {
      question: "What if I miss a live session?",
      answer: "Don't worry! All live sessions are recorded. You can catch up by watching the recording in your dashboard. For 1:1 sessions, you can reschedule with your mentor."
    },
    {
      question: "How do I become a mentor on the platform?",
      answer: "To become a mentor, you need to have relevant trading experience and certifications. Apply through our mentor application form, and our team will review your credentials and trading history."
    },
    {
      question: "Is there technical support available?",
      answer: "Yes, our support team is available 24/7 to help with any technical issues, payment problems, or general questions. Contact us through the chat widget or email support@tradingplatform.com"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-600">Find answers to common questions about our trading education platform</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Common Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
              <p className="text-gray-600 mb-4">Our support team is here to help you 24/7</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:support@tradingplatform.com" 
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Email Support
                </a>
                <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                  Live Chat
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
