import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, ArrowLeft } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function PrivacyPolicyPage() {
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
              <Shield className="w-10 h-10 text-earth-green" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-earth-green mb-4 font-serif">
              Privacy Policy
            </h1>
            <p className="text-lg text-warm-brown/80 leading-relaxed">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Introduction */}
            <Card className="border-2 border-sage-green/30 bg-white shadow-lg">
              <CardHeader className="bg-sage-green/10">
                <CardTitle className="text-2xl text-earth-green font-serif">Introduction</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-warm-brown/80 leading-relaxed">
                  Welcome to AyurGlow Secrets. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website.
                </p>
                <p className="text-warm-brown/80 leading-relaxed">
                  By using our website, you agree to the collection and use of information in accordance with this policy.
                </p>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card className="border-2 border-sage-green/30 bg-white shadow-lg">
              <CardHeader className="bg-sage-green/10">
                <CardTitle className="text-2xl text-earth-green font-serif">Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-earth-green mb-3">Automatically Collected Information</h3>
                  <p className="text-warm-brown/80 leading-relaxed mb-2">
                    When you visit our website, we may automatically collect certain information about your device, including:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-warm-brown/80 ml-4">
                    <li>Browser type and version</li>
                    <li>Operating system</li>
                    <li>IP address</li>
                    <li>Pages visited and time spent on pages</li>
                    <li>Referring website addresses</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-earth-green mb-3">Information You Provide</h3>
                  <p className="text-warm-brown/80 leading-relaxed">
                    We may collect information that you voluntarily provide when you subscribe to our newsletter, contact us, or interact with our content.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Your Information */}
            <Card className="border-2 border-sage-green/30 bg-white shadow-lg">
              <CardHeader className="bg-sage-green/10">
                <CardTitle className="text-2xl text-earth-green font-serif">How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-warm-brown/80 leading-relaxed">
                  We use the collected information for various purposes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-warm-brown/80 ml-4">
                  <li>To provide and maintain our website</li>
                  <li>To improve user experience and website functionality</li>
                  <li>To analyze website usage and trends</li>
                  <li>To send newsletters and updates (if you've subscribed)</li>
                  <li>To respond to your inquiries and support requests</li>
                  <li>To detect and prevent technical issues</li>
                </ul>
              </CardContent>
            </Card>

            {/* Cookies and Tracking */}
            <Card className="border-2 border-sage-green/30 bg-white shadow-lg">
              <CardHeader className="bg-sage-green/10">
                <CardTitle className="text-2xl text-earth-green font-serif">Cookies and Tracking Technologies</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-warm-brown/80 leading-relaxed">
                  We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data that are sent to your browser from a website and stored on your device.
                </p>
                <div>
                  <h3 className="text-lg font-semibold text-earth-green mb-3">Types of Cookies We Use</h3>
                  <ul className="list-disc list-inside space-y-2 text-warm-brown/80 ml-4">
                    <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                    <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                    <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                  </ul>
                </div>
                <p className="text-warm-brown/80 leading-relaxed">
                  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
                </p>
              </CardContent>
            </Card>

            {/* Third-Party Services */}
            <Card className="border-2 border-sage-green/30 bg-white shadow-lg">
              <CardHeader className="bg-sage-green/10">
                <CardTitle className="text-2xl text-earth-green font-serif">Third-Party Services</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-warm-brown/80 leading-relaxed">
                  We may use third-party services that collect, monitor, and analyze information to improve our website functionality and user experience:
                </p>
                <div>
                  <h3 className="text-lg font-semibold text-earth-green mb-3">Google AdSense</h3>
                  <p className="text-warm-brown/80 leading-relaxed">
                    We use Google AdSense to display advertisements on our website. Google may use cookies to serve ads based on your prior visits to our website or other websites. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-earth-green hover:text-gold underline">Google Ads Settings</a>.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-earth-green mb-3">Analytics Services</h3>
                  <p className="text-warm-brown/80 leading-relaxed">
                    We may use analytics services to monitor and analyze web traffic. These services may use cookies and similar technologies to collect information about your use of our website.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card className="border-2 border-sage-green/30 bg-white shadow-lg">
              <CardHeader className="bg-sage-green/10">
                <CardTitle className="text-2xl text-earth-green font-serif">Data Security</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-warm-brown/80 leading-relaxed">
                  The security of your data is important to us. We strive to use commercially acceptable means to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card className="border-2 border-sage-green/30 bg-white shadow-lg">
              <CardHeader className="bg-sage-green/10">
                <CardTitle className="text-2xl text-earth-green font-serif">Your Data Protection Rights</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-warm-brown/80 leading-relaxed">
                  Depending on your location, you may have the following rights regarding your personal data:
                </p>
                <ul className="list-disc list-inside space-y-2 text-warm-brown/80 ml-4">
                  <li><strong>Right to Access:</strong> Request copies of your personal data</li>
                  <li><strong>Right to Rectification:</strong> Request correction of inaccurate data</li>
                  <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
                  <li><strong>Right to Restrict Processing:</strong> Request limitation of data processing</li>
                  <li><strong>Right to Data Portability:</strong> Request transfer of your data</li>
                  <li><strong>Right to Object:</strong> Object to our processing of your data</li>
                </ul>
                <p className="text-warm-brown/80 leading-relaxed">
                  If you make a request, we have one month to respond to you. To exercise any of these rights, please contact us using the information provided below.
                </p>
              </CardContent>
            </Card>

            {/* Children's Privacy */}
            <Card className="border-2 border-sage-green/30 bg-white shadow-lg">
              <CardHeader className="bg-sage-green/10">
                <CardTitle className="text-2xl text-earth-green font-serif">Children's Privacy</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-warm-brown/80 leading-relaxed">
                  Our website is not intended for children under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and believe your child has provided us with personal data, please contact us so we can delete such information.
                </p>
              </CardContent>
            </Card>

            {/* Changes to Privacy Policy */}
            <Card className="border-2 border-sage-green/30 bg-white shadow-lg">
              <CardHeader className="bg-sage-green/10">
                <CardTitle className="text-2xl text-earth-green font-serif">Changes to This Privacy Policy</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-warm-brown/80 leading-relaxed">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this policy.
                </p>
                <p className="text-warm-brown/80 leading-relaxed">
                  You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
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
                  If you have any questions about this Privacy Policy or wish to exercise your data protection rights, please contact us:
                </p>
                <div className="bg-gold/10 p-4 rounded-lg border border-gold/30">
                  <p className="text-warm-brown/80">
                    <strong className="text-earth-green">Email:</strong> privacy@ayurglowsecrets.com
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
