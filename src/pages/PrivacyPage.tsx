import { useState, useEffect } from 'react';
import { Menu, X, Shield, Clock, FileText } from 'lucide-react';

function PrivacyPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      const sections = document.querySelectorAll('[data-section]');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActiveSection(section.getAttribute('data-section') || '');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const sections = [
    { id: 'interpretation', title: 'Interpretation & Definitions' },
    { id: 'collecting', title: 'Collecting Your Data' },
    { id: 'tracking', title: 'Tracking Technologies' },
    { id: 'use', title: 'Use of Your Data' },
    { id: 'retention', title: 'Data Retention' },
    { id: 'disclosure', title: 'Data Disclosure' },
    { id: 'security', title: 'Data Security' },
    { id: 'children', title: "Children's Privacy" },
    { id: 'changes', title: 'Policy Changes' },
    { id: 'contact', title: 'Contact Us' },
  ];

  return (
    <>
      <div className="min-h-screen bg-white text-gray-900">
        {/* Navigation */}
        <nav
          className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            scrollY > 50
              ? 'bg-white/95 backdrop-blur-sm border-b border-gray-200'
              : 'bg-white border-b border-gray-200'
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <img
                  src="https://res.cloudinary.com/djbokbrgd/image/upload/v1761204095/WhatsApp_Image_2025-10-22_at_09.45.51_8b65409b_kccec1.jpg"
                  alt="Zenstrin Logo"
                  className="h-16 w-auto"
                />
              </div>

              <div className="hidden md:flex items-center space-x-8">
                <a href="/" className="text-gray-700 hover:text-[#f7961c] transition-colors font-medium">
                  Home
                </a>
                <a href="/blog" className="text-gray-700 hover:text-[#f7961c] transition-colors font-medium">
                  Blog
                </a>
                <a href="/contact" className="text-gray-700 hover:text-[#f7961c] transition-colors font-medium">
                  Contact Us
                </a>
                <button className="px-6 py-2 bg-[#f7961c] hover:bg-[#e08515] text-white font-medium transition-colors duration-200 rounded-full">
                  Get Started
                </button>
              </div>

              <button className="md:hidden text-gray-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {isMenuOpen && (
              <div className="md:hidden mt-4 pb-4 space-y-4">
                <a href="/" className="block text-gray-700 hover:text-orange-500 transition-colors">
                  Home
                </a>
                <a href="/blog" className="block text-gray-700 hover:text-orange-500 transition-colors">
                  Blog
                </a>
                <a href="/contact" className="block text-gray-700 hover:text-orange-500 transition-colors">
                  Contact Us
                </a>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-12 px-6 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#f7961c] text-white rounded-full mb-6">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-gray-900">Privacy Policy</h1>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>Last Updated: July 1, 2023</span>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Table of Contents - Sticky Sidebar */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-[#f7961c]" />
                    Table of Contents
                  </h3>
                  <nav className="space-y-2">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`block w-full text-left text-sm py-2 px-3 rounded transition-colors ${
                          activeSection === section.id
                            ? 'bg-[#f7961c] text-white font-medium'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-[#f7961c]'
                        }`}
                      >
                        {section.title}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-9">
              <div className="bg-white border border-gray-200 rounded-lg p-8 md:p-12">
                {/* Introduction */}
                <div className="mb-12 pb-8 border-b border-gray-200">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in
                    accordance with this Privacy Policy.
                  </p>
                </div>

                {/* Interpretation and Definitions */}
                <section id="interpretation" data-section="interpretation" className="mb-12">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-900">Interpretation and Definitions</h2>

                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Interpretation</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall
                    have the same meaning regardless of whether they appear in singular or in plural.
                  </p>

                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Definitions</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">For the purposes of this Privacy Policy:</p>

                  <div className="space-y-4">
                    <DefinitionItem term="Account" definition="means a unique account created for You to access our Service or parts of our Service." />
                    <DefinitionItem
                      term="Company"
                      definition='(referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Zenstrin Technologies.'
                    />
                    <DefinitionItem
                      term="Cookies"
                      definition="are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses."
                    />
                    <DefinitionItem term="Country" definition="refers to: Nigeria" />
                    <DefinitionItem term="Device" definition="means any device that can access the Service such as a computer, a cellphone or a digital tablet." />
                    <DefinitionItem term="Personal Data" definition="is any information that relates to an identified or identifiable individual." />
                    <DefinitionItem term="Service" definition="refers to the Website." />
                    <DefinitionItem
                      term="Service Provider"
                      definition="means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used."
                    />
                    <DefinitionItem
                      term="Usage Data"
                      definition="refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit)."
                    />
                    <DefinitionItem term="Website" definition="refers to Zenstrin, accessible from https://zenstrin.com" />
                    <DefinitionItem
                      term="You"
                      definition="means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable."
                    />
                  </div>
                </section>

                {/* Collecting and Using Your Personal Data */}
                <section id="collecting" data-section="collecting" className="mb-12">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-900">Collecting and Using Your Personal Data</h2>

                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Types of Data Collected</h3>

                  <h4 className="text-lg font-semibold mb-3 text-gray-900">Personal Data</h4>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify
                    You. Personally identifiable information may include, but is not limited to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
                    <li>Email address</li>
                    <li>First name and last name</li>
                    <li>Phone number</li>
                    <li>Address, State, Province, ZIP/Postal code, City</li>
                    <li>Usage Data</li>
                  </ul>

                  <h4 className="text-lg font-semibold mb-3 text-gray-900">Usage Data</h4>
                  <p className="text-gray-700 mb-4 leading-relaxed">Usage Data is collected automatically when using the Service.</p>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages
                    of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic
                    data.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the
                    type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of
                    mobile Internet browser You use, unique device identifiers and other diagnostic data.
                  </p>
                </section>

                {/* Tracking Technologies and Cookies */}
                <section id="tracking" data-section="tracking" className="mb-12">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-900">Tracking Technologies and Cookies</h2>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used
                    are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service.
                  </p>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Types of Cookies We Use:</h4>
                    <div className="space-y-4">
                      <CookieType
                        name="Necessary / Essential Cookies"
                        type="Session Cookies"
                        purpose="These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts."
                      />
                      <CookieType
                        name="Cookies Policy / Notice Acceptance"
                        type="Persistent Cookies"
                        purpose="These Cookies identify if users have accepted the use of cookies on the Website."
                      />
                      <CookieType
                        name="Functionality Cookies"
                        type="Persistent Cookies"
                        purpose="These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference."
                      />
                    </div>
                  </div>
                </section>

                {/* Use of Your Personal Data */}
                <section id="use" data-section="use" className="mb-12">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-900">Use of Your Personal Data</h2>
                  <p className="text-gray-700 mb-4 leading-relaxed">The Company may use Personal Data for the following purposes:</p>

                  <ul className="space-y-3 text-gray-700">
                    <li className="flex">
                      <span className="text-[#f7961c] mr-3 mt-1">•</span>
                      <span>
                        <strong>To provide and maintain our Service:</strong> including to monitor the usage of our Service.
                      </span>
                    </li>
                    <li className="flex">
                      <span className="text-[#f7961c] mr-3 mt-1">•</span>
                      <span>
                        <strong>To manage Your Account:</strong> to manage Your registration as a user of the Service.
                      </span>
                    </li>
                    <li className="flex">
                      <span className="text-[#f7961c] mr-3 mt-1">•</span>
                      <span>
                        <strong>For the performance of a contract:</strong> the development, compliance and undertaking of the purchase contract for the products,
                        items or services You have purchased.
                      </span>
                    </li>
                    <li className="flex">
                      <span className="text-[#f7961c] mr-3 mt-1">•</span>
                      <span>
                        <strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication.
                      </span>
                    </li>
                    <li className="flex">
                      <span className="text-[#f7961c] mr-3 mt-1">•</span>
                      <span>
                        <strong>To provide You with news:</strong> special offers and general information about other goods, services and events which we offer.
                      </span>
                    </li>
                    <li className="flex">
                      <span className="text-[#f7961c] mr-3 mt-1">•</span>
                      <span>
                        <strong>To manage Your requests:</strong> To attend and manage Your requests to Us.
                      </span>
                    </li>
                  </ul>
                </section>

                {/* Retention */}
                <section id="retention" data-section="retention" className="mb-12">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-900">Retention of Your Personal Data</h2>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and
                    use Your Personal Data to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our legal agreements and
                    policies.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except
                    when this data is used to strengthen the security or to improve the functionality of Our Service.
                  </p>
                </section>

                {/* Disclosure */}
                <section id="disclosure" data-section="disclosure" className="mb-12">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-900">Disclosure of Your Personal Data</h2>

                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Business Transactions</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your
                    Personal Data is transferred and becomes subject to a different Privacy Policy.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Law Enforcement</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid
                    requests by public authorities.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Other Legal Requirements</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>Comply with a legal obligation</li>
                    <li>Protect and defend the rights or property of the Company</li>
                    <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
                    <li>Protect the personal safety of Users of the Service or the public</li>
                    <li>Protect against legal liability</li>
                  </ul>
                </section>

                {/* Security */}
                <section id="security" data-section="security" className="mb-12">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-900">Security of Your Personal Data</h2>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                    <p className="text-gray-700 leading-relaxed">
                      The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic
                      storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute
                      security.
                    </p>
                  </div>
                </section>

                {/* Children's Privacy */}
                <section id="children" data-section="children" className="mb-12">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-900">Children's Privacy</h2>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the
                    age of 13.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware
                    that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to remove that
                    information from Our servers.
                  </p>
                </section>

                {/* Changes to Privacy Policy */}
                <section id="changes" data-section="changes" className="mb-12">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-900">Changes to this Privacy Policy</h2>
                  <p className="text-gray-700 mb-4 leading-relaxed">We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.</p>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the "Last updated"
                    date at the top of this Privacy Policy.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted
                    on this page.
                  </p>
                </section>

                {/* Contact Us */}
                <section id="contact" data-section="contact">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-900">Contact Us</h2>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <p className="text-gray-700 mb-4 leading-relaxed">If you have any questions about this Privacy Policy, You can contact us:</p>
                    <a href="mailto:support@zenstrin.com" className="text-[#f7961c] hover:text-[#e08515] font-medium transition-colors">
                      support@zenstrin.com
                    </a>
                  </div>
                </section>
              </div>
            </main>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 py-12 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="mb-4">
                  <img
                    src="https://res.cloudinary.com/djbokbrgd/image/upload/v1761204095/WhatsApp_Image_2025-10-22_at_09.45.51_8b65409b_kccec1.jpg"
                    alt="Zenstrin Logo"
                    className="h-20 w-auto"
                  />
                </div>
                <p className="text-gray-600 text-sm font-light">Empowering the future of real estate and AI-driven commerce</p>
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-gray-900">Products</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>
                    <a href="/#zenstrin-features" className="hover:text-[#f7961c] transition-colors">
                      Zenstrin
                    </a>
                  </li>
                  <li>
                    <a href="/#zenfinder-features" className="hover:text-[#f7961c] transition-colors">
                      ZenFinder
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#f7961c] transition-colors">
                      Pricing
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-gray-900">Company</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>
                    <a href="#" className="hover:text-[#f7961c] transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="/blog" className="hover:text-[#f7961c] transition-colors">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#f7961c] transition-colors">
                      Careers
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-gray-900">Legal</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>
                    <a href="/privacy" className="hover:text-[#f7961c] transition-colors">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#f7961c] transition-colors">
                      Terms
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#f7961c] transition-colors">
                      Security
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
              <p>&copy; 2025 Zenstrin Technologies. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

function DefinitionItem({ term, definition }: { term: string; definition: string }) {
  return (
    <div className="bg-gray-50 border-l-4 border-[#f7961c] p-4 rounded">
      <span className="font-semibold text-gray-900">{term}</span>
      <span className="text-gray-700"> {definition}</span>
    </div>
  );
}

function CookieType({ name, type, purpose }: { name: string; type: string; purpose: string }) {
  return (
    <div className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
      <h5 className="font-semibold text-gray-900 mb-1">{name}</h5>
      <p className="text-sm text-gray-600 mb-2">Type: {type}</p>
      <p className="text-sm text-gray-700">{purpose}</p>
    </div>
  );
}

export default PrivacyPage;
