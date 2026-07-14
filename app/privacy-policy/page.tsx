export const metadata = {
  title: 'Privacy Policy | Cybexonics',
  description: 'Privacy policy for Cybexonics IT Consultants Pvt. Ltd. and its apps and products.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: July 15, 2026</p>

      <p className="mb-6">
        This Privacy Policy applies to Cybexonics IT Consultants Pvt. Ltd. 
        ("Cybexonics", "we", "our") and the apps and products we develop, 
        including BMI Calculator.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">BMI Calculator App</h2>
      <p className="mb-4">
        BMI Calculator does not collect, store, or transmit any personal data. 
        All calculations (height, weight, and BMI results) are performed 
        entirely on your device and are never sent to any server, database, 
        or third party.
      </p>
      <p className="mb-4">
        The app does not require sign-up, login, or any personal information 
        to function. Since no data is collected, none is shared with 
        advertisers, analytics providers, or any other third party.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">Children's Privacy</h2>
      <p className="mb-4">
        Our apps are not directed at children and do not knowingly collect 
        information from anyone under 18.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">Changes to This Policy</h2>
      <p className="mb-4">
        Any future changes to this policy will be posted on this page.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">Contact</h2>
      <p className="mb-2">Cybexonics IT Consultants Pvt. Ltd.</p>
      <p className="mb-2">
        Email:{' '}
        <a href="mailto:Cybexonicsitconsultants@gmail.com" className="text-blue-600 underline">
          Cybexonicsitconsultants@gmail.com
        </a>
      </p>
      <p>
        Address: Office No. 4, 1st Floor, Vidya Tower, Pencil Chowk, 
        Baramati – 413133
      </p>
    </main>
  );
}