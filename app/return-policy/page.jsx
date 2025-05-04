import Navbar from "@/components/Navbar";

export default function ReturnPolicy() {
  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 py-16 space-y-6">
        <h1 className="text-3xl font-semibold mb-6">Return and Exchange Policy – A Square</h1>

        <p>Thank you for shopping with A Square! We are committed to ensuring your satisfaction with every purchase. Please review our policy below:</p>

        <h2 className="text-xl font-semibold mt-6">No Refund Policy:</h2>
        <ul className="list-disc pl-6 space-y-1 text-gray-700">
          <li>We do not offer refunds on any purchases.</li>
          <li>Eligible returns will be issued A Square Coupons or A Square Points, which can be used for your next purchase.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">Returns and Exchanges:</h2>
        <ul className="list-disc pl-6 space-y-1 text-gray-700">
          <li>Returns must be requested within 5 days of receiving your order.</li>
          <li>Items must be in unused condition, with original packaging intact.</li>
          <li>Only defective, damaged, or incorrectly delivered items are eligible for return or exchange.</li>
          <li>If the original item is unavailable, A Square Coupons or Points will be issued.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">Non-Returnable Items:</h2>
        <ul className="list-disc pl-6 space-y-1 text-gray-700">
          <li>Sale items, gift cards, and personalized/customized products are not eligible for return or exchange.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">How to Initiate a Return or Exchange:</h2>
        <ol className="list-decimal pl-6 space-y-1 text-gray-700">
          <li>Contact us within 5 days of delivery at <strong>8884999644</strong> or <strong>asquareteam9@gmail.com</strong>.</li>
          <li>Provide your order number and details of the issue.</li>
          <li>We will guide you through the return process if your item is eligible.</li>
          <li>Upon receiving and verifying the item, store credit will be issued in the form of A Square Coupon or A Square Points.</li>
        </ol>

        <h2 className="text-xl font-semibold mt-6">Store Credit:</h2>
        <ul className="list-disc pl-6 space-y-1 text-gray-700">
          <li>A Square Coupons or Points can only be redeemed on future purchases.</li>
          <li>They are non-refundable, non-transferable, and have no cash value.</li>
        </ul>

        <p className="mt-6">We appreciate your understanding and continued support!</p>
      </div>
      );
    </>
  );
}
