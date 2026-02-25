import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ArrowLeft, AlertCircle } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function TermsOfServicePage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-sage-green/20 to-cream">
        <div className="container mx-auto px-4">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-earth-green hover:text-earth-green/80 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          <div className="text-center max-w-4xl mx-auto">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sage-green/30 to-earth-green/20 flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-earth-green" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-earth-green mb-4 font-serif">
              Terms of Service
            </h1>
            <p className="text-lg text-warm-brown/80 leading-relaxed">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      {/* Medical Disclaimer Alert */}
      <section className="py-8 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Alert className="border-2 border-gold/50 bg-gold/10">
              <AlertCircle className="h-5 w-5 text-earth-green" />
              <AlertDescription className="text-warm-brown/90">
                <strong>Medical Disclaimer:</strong> The information provided on AyurGlow Secrets is for educational and informational purposes only. It is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or qualified healthcare provider with any questions you may have regarding a medical condition.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Agreement to Terms */}
            <Card className="border-2 border-sage-green/30 bg-white shadow-lg">
              <CardHeader className="bg-sage-green/10">
                <CardTitle className="text-2xl text-earth-green font-serif">Agreement to Terms</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-warm-brown/80 leading-relaxed">
                  By accessing and using AyurGlow Secrets ("the Website"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these Terms of Service, please do not use this Website.
                </p>
                <p className="text-warm-brown/80 leading-relaxed">
                  We reserve the right to update, change, or replace any part of these Terms of Service by posting updates on our Website. It is your responsibility to check this page periodically for changes.
                </p>
              </CardContent>
            </Card>

            {/* Use of Website */}
            <Card className="border-2 border-sage-green/30 bg-white shadow-lg">
              <CardHeader className="bg-sage-green/10">
                <CardTitle className="text-2xl text-earth-green font-serif">Use of Website</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-warm-brown/80 leading-relaxed">
                  You may use our Website for lawful purposes only. You agree not to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-warm-brown/80 ml-4">
                  <li>Use the Website in any way that violates any applicable laws or regulations</li>
                  <li>Attempt to gain unauthorized access to any portion of the Website</li>
                  <li>Interfere with or disrupt the Website or servers connected to the Website</li>
                  <li>Use any automated system to access the Website in a manner that sends more requests than a human can reasonably produce</li>
                  <li>Collect or harvest any personally identifiable information from the Website</li>
                  <li>Use the Website to transmit any harmful code, viruses, or malware</li>
                </ul>
              </CardContent>
            </Card>

            {/* Intellectual Property */}
            <Card className="border-2 border-sage-green/30 bg-white shadow-lg">
              <CardHeader className="bg-sage-green/10">
                <CardTitle className="text-2xl text-earth-green font-serif">Intellectual Property Rights</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-warm-brown/80 leading-relaxed">
                  The Website and its original content, features, and functionality are owned by AyurGlow Secrets and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                </p>
                <p className="text-warm-brown/80 leading-relaxed">
                  You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Website without prior written consent, except for:
                </p>
                <ul className="list-disc list-inside space-y-2 text-warm-brown/80 ml-4">
                  <li>Personal, non-commercial use</li>
                  <li>Sharing links to our content on social media with proper attribution</li>
                  <li>Brief quotations with proper citation and link back to the original source</li>
                </ul>
              </CardContent>
            </Card>

            {/* User Responsibilities */}
            <Card className="border-2 border-sage-green/30 bg-white shadow-lg">
              <CardHeader className="bg-sage-green/10">
                <CardTitle className="text-2xl text-earth-green font-serif">User Responsibilities</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-warm-brown/80 leading-relaxed">
                  As a user of this Website, you are responsible for:
                </p>
                <ul className="list-disc list-inside space-y-2 text-warm-brown/80 ml-4">
                  <li>Maintaining the confidentiality of any account information</li>
                  <li>Ensuring all information you provide is accurate and current</li>
                  <li>Using the remedies and information at your own risk</li>
                  <li>Consulting with healthcare professionals before trying any remedies</li>
                  <li>Reporting any adverse reactions or concerns to appropriate medical authorities</li>
                  <li>Understanding that individual results may vary</li>
                </ul>
              </CardContent>
            </Card>

            {/* Medical Disclaimer */}
            <Card className="border-2 border-gold/50 bg-gold/5 shadow-lg">
              <CardHeader className="bg-gold/10">
                <CardTitle className="text-2xl text-earth-green font-serif flex items-center gap-2">
                  <AlertCircle className="w-6 h-6" />
                  Medical Disclaimer
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-warm-brown/90 leading-relaxed font-medium">
                  The content on AyurGlow Secrets is provided for informational and educational purposes only and is not intended as medical advice.
                </p>
                <div className="space-y-3">
                  <p className="text-warm-brown/80 leading-relaxed">
                    <strong className="text-earth-green">Not Medical Advice:</strong> The remedies, tips, and information shared on this Website are based on traditional Ayurvedic practices and general wellness knowledge. They are not intended to diagnose, treat, cure, or prevent any disease or medical condition.
                  </p>
                  <p className="text-warm-brown/80 leading-relaxed">
                    <strong className="text-earth-green">Consult Healthcare Professionals:</strong> Always consult with a qualified healthcare provider before starting any new health regimen, remedy, or treatment, especially if you have existing medical conditions, are pregnant or nursing, or are taking medications.
                  </p>
                  <p className="text-warm-brown/80 leading-relaxed">
                    <strong className="text-earth-green">Individual Results Vary:</strong> Results from using any remedies or following advice on this Website may vary from person to person. What works for one individual may not work for another.
                  </p>
                  <p className="text-warm-brown/80 leading-relaxed">
                    <strong className="text-earth-green">Allergies and Sensitivities:</strong> Always perform a patch test before applying any remedy to your skin or hair. Discontinue use immediately if you experience any adverse reactions.
                  </p>
                  <p className="text-warm-brown/80 leading-relaxed">
                    <strong className="text-earth-green">Emergency Situations:</strong> In case of a medical emergency, call your local emergency services immediately. Do not rely on information from this Website in emergency situations.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Limitation of Liability */}
            <Card className="border-2 border-sage-green/30 bg-white shadow-lg">
              <CardHeader className="bg-sage-green/10">
                <CardTitle className="text-2xl text-earth-green font-serif">Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-warm-brown/80 leading-relaxed">
                  To the maximum extent permitted by applicable law, AyurGlow Secrets and its owners, employees, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
                </p>
                <ul className="list-disc list-inside space-y-2 text-warm-brown/80 ml-4">
                  <li>Your use or inability to use the Website</li>
                  <li>Any conduct or content of any third party on the Website</li>
                  <li>Any content obtained from the Website</li>
                  <li>Unauthorized access, use, or alteration of your transmissions or content</li>
                  <li>Use of any remedies, tips, or information provided on the Website</li>
                  <li>Any adverse reactions or health issues arising from following advice on the Website</li>
                </ul>
              </CardContent>
            </Card>

            {/* Disclaimer of Warranties */}
            <Card className="border-2 border-sage-green/30 bg-white shadow-lg">
              <CardHeader className="bg-sage-green/10">
                <CardTitle className="text-2xl text-earth-green font-serif">Disclaimer of Warranties</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-warm-brown/80 leading-relaxed">
                  The Website is provided on an "AS IS" and "AS AVAILABLE" basis without any warranties of any kind, either express or implied, including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-warm-brown/80 ml-4">
                  <li>Warranties of merchantability or fitness for a particular purpose</li>
                  <li>Warranties that the Website will be uninterrupted, secure, or error-free</li>
                  <li>Warranties regarding the accuracy, reliability, or completeness of content</li>
                  <li>Warranties that defects will be corrected</li>
                </ul>
                <p className="text-warm-brown/80 leading-relaxed">
                  We do not warrant that the Website or any content will meet your requirements or expectations.
                </p>
              </CardContent>
            </Card>

            {/* Third-Party Links */}
            <Card className="border-2 border-sage-green/30 bg-white shadow-lg">
              <CardHeader className="bg-sage-green/10">
                <CardTitle className="text-2xl text-earth-green font-serif">Third-Party Links and Content</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-warm-brown/80 leading-relaxed">
                  Our Website may contain links to third-party websites or services that are not owned or controlled by AyurGlow Secrets. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.
                </p>
                <p className="text-warm-brown/80 leading-relaxed">
                  We strongly advise you to read the terms and conditions and privacy policies of any third-party websites or services that you visit.
                </p>
              </CardContent>
            </Card>

            {/* Advertising */}
            <Card className="border-2 border-sage-green/30 bg-white shadow-lg">
              <CardHeader className="bg-sage-green/10">
                <CardTitle className="text-2xl text-earth-green font-serif">Advertising and Sponsorships</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-warm-brown/80 leading-relaxed">
                  AyurGlow Secrets may display advertisements and sponsored content. We are not responsible for the content of advertisements or the products/services advertised. Your interactions with advertisers are solely between you and the advertiser.
                </p>
                <p className="text-warm-brown/80 leading-relaxed">
                  We use Google AdSense to serve advertisements. Google may use cookies to display ads based on your browsing history. You can opt out of personalized advertising through your Google Ads Settings.
                </p>
              </CardContent>
            </Card>

            {/* Indemnification */}
            <Card className="border-2 border-sage-green/30 bg-white shadow-lg">
              <CardHeader className="bg-sage-green/10">
                <CardTitle className="text-2xl text-earth-green font-serif">Indemnification</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-warm-brown/80 leading-relaxed">
                  You agree to defend, indemnify, and hold harmless AyurGlow Secrets and its owners, employees, contractors, and affiliates from and against any claims, damages, obligations, losses, liabilities, costs, or debt, and expenses arising from:
                </p>
                <ul className="list-disc list-inside space-y-2 text-warm-brown/80 ml-4">
                  <li>Your use of and access to the Website</li>
                  <li>Your violation of any term of these Terms of Service</li>
                  <li>Your violation of any third-party right, including intellectual property rights</li>
                  <li>Any harm caused to any third party through your use of the Website</li>
                </ul>
              </CardContent>
            </Card>

            {/* Governing Law */}
            <Card className="border-2 border-sage-green/30 bg-white shadow-lg">
              <CardHeader className="bg-sage-green/10">
                <CardTitle className="text-2xl text-earth-green font-serif">Governing Law and Dispute Resolution</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-warm-brown/80 leading-relaxed">
                  These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in which AyurGlow Secrets operates, without regard to its conflict of law provisions.
                </p>
                <p className="text-warm-brown/80 leading-relaxed">
                  Any disputes arising out of or relating to these Terms of Service or the use of the Website shall be resolved through good faith negotiations. If negotiations fail, disputes may be resolved through binding arbitration or in the courts of competent jurisdiction.
                </p>
              </CardContent>
            </Card>

            {/* Severability */}
            <Card className="border-2 border-sage-green/30 bg-white shadow-lg">
              <CardHeader className="bg-sage-green/10">
                <CardTitle className="text-2xl text-earth-green font-serif">Severability</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-warm-brown/80 leading-relaxed">
                  If any provision of these Terms of Service is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms of Service will otherwise remain in full force and effect.
                </p>
              </CardContent>
            </Card>

            {/* Termination */}
            <Card className="border-2 border-sage-green/30 bg-white shadow-lg">
              <CardHeader className="bg-sage-green/10">
                <CardTitle className="text-2xl text-earth-green font-serif">Termination</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-warm-brown/80 leading-relaxed">
                  We may terminate or suspend your access to the Website immediately, without prior notice or liability, for any reason, including if you breach these Terms of Service.
                </p>
                <p className="text-warm-brown/80 leading-relaxed">
                  Upon termination, your right to use the Website will immediately cease. All provisions of these Terms of Service which by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-2 border-sage-green/30 bg-white shadow-lg">
              <CardHeader className="bg-sage-green/10">
                <CardTitle className="text-2xl text-earth-green font-serif">Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-warm-brown/80 leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-gold/10 p-4 rounded-lg border border-gold/30">
                  <p className="text-warm-brown/80">
                    <strong className="text-earth-green">Email:</strong> legal@ayurglowsecrets.com
                  </p>
                  <p className="text-warm-brown/80 mt-2">
                    <strong className="text-earth-green">Website:</strong> www.ayurglowsecrets.com
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
