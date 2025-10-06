// components/Footer/Footer.js
"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { HashLoader } from "react-spinners";
import { Dialog } from "@material-tailwind/react";
import { useTheme } from "nextra-theme-docs";
import Success from "./success";

export default function Footer() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);
  const { theme } = useTheme();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await axios.post("/api/send-email/", {
        subject: "From website: Subscription",
        from: email,
        text: `Subscription. Email: ${email}`,
        html: `<p> Subscription. Email: ${email}</p>`,
      });
      setSuccess(true);
      setEmail("");
    } catch (error) {
      console.error("Error:", error);
      setStatus("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-[#111111] border-t border-gray-200 dark:border-gray-800 px-4 sm:px-8 lg:px-16 py-4">
        <div className="max-w-7xl mx-auto py-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 items-start justify-stretch">
            <div>
              <h3 className="text-gray-900 dark:text-white mb-4 font-medium text-sm">
                Products
              </h3>
              <div className="space-y-3 text-gray-600 dark:text-gray-400">
                <Link
                  className="block font-medium text-sm hover:text-gray-900 dark:hover:text-white transition-colors"
                  target="_blank"
                  href="https://docs.useknit.io"
                >
                  Documentation
                </Link>
                <Link
                  className="block font-medium text-sm hover:text-gray-900 dark:hover:text-white transition-colors"
                  href=""
                >
                  Status
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-gray-900 dark:text-white mb-4 font-medium text-sm">
                Socials
              </h3>
              <div className="space-y-3 text-gray-600 dark:text-gray-400">
                <Link
                  className="block font-medium text-sm hover:text-gray-900 dark:hover:text-white transition-colors"
                  href=""
                >
                  Twitter
                </Link>
                <Link
                  className="block font-medium text-sm hover:text-gray-900 dark:hover:text-white transition-colors"
                  target="_blank"
                  href="https://www.linkedin.com/company/knit-labs/"
                >
                  LinkedIn
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-gray-900 dark:text-white mb-4 font-medium text-sm">
                Legal
              </h3>
              <div className="space-y-3 text-gray-600 dark:text-gray-400">
                <Link
                  className="block font-medium text-sm hover:text-gray-900 dark:hover:text-white transition-colors"
                  href=""
                >
                  Legal Notice
                </Link>
                <Link
                  className="block font-medium text-sm hover:text-gray-900 dark:hover:text-white transition-colors"
                  href="/privacy-policy"
                >
                  Privacy Policy
                </Link>
                <Link
                  className="block font-medium text-sm hover:text-gray-900 dark:hover:text-white transition-colors"
                  href="/terms-and-conditions"
                >
                  Terms of Use
                </Link>
              </div>
            </div>

            <div className="">
              <h3 className="text-gray-900 dark:text-white mb-4 font-medium text-sm">
                Contact
              </h3>
              <div className="space-y-3 text-gray-600 dark:text-gray-400">
                <p className="block font-medium text-sm">business@useknit.io</p>
                <p className="block font-medium text-sm">
                  <span className="">
                    Knit Business Financial Services Ltd.
                  </span>
                  <br />
                  3080 Yonge St <br />
                  Toronto ON, M4N 3N1, Canada
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 border-y border-gray-200 dark:border-gray-700 py-6 block md:flex justify-between items-center">
            <div>
              <h3 className="text-xs text-gray-900 dark:text-white uppercase font-semibold">
                Subscribe to our newsletter
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                A monthly digest of the latest news, articles, and resources.
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="mt-6 md:mt-0 grid md:flex items-center md:items-start gap-2"
            >
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email address"
                  className="px-4 py-3 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-white w-full md:w-80 rounded-lg outline-none border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
                />
                {status && (
                  <p className="text-xs text-red-600 dark:text-red-400 font-medium mt-1">
                    {status}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="flex items-center justify-center transition-all sm:hover:scale-90 w-full md:w-fit mx-auto font-[500] !bg-[#4C38CB]  text-sm text-white border border-[#4C38CB] h-12 px-7 rounded-xl shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <HashLoader
                    color={"#fff"}
                    loading={true}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  "Subscribe"
                )}
              </button>
            </form>
          </div>

          <div className="mt-6 flex flex-col md:flex-row justify-center md:justify-between items-center gap-4">
            <div className="h-8 w-16 relative">
              <Image
                src={theme === "dark" ? "/knit-white.svg" : "/knit.svg"}
                alt="Knit logo"
                fill
                className="object-contain"
              />
            </div>

            <p className="text-gray-500 dark:text-gray-400 max-w-lg text-center md:text-right text-xs leading-relaxed">
              © KNIT BUSINESS FINANCIAL SERVICES LIMITED is duly registered by
              the Financial Transactions and Reports Analysis Centre of Canada
              (FINTRAC) as a Money Service Business (C100000256)
            </p>
          </div>
        </div>
      </div>

      <div>
        <Dialog
          open={success}
          size="xl"
          handler={() => setSuccess(!success)}
          className="shadow-none bg-transparent overflow-y-auto p-3 px-0"
        >
          <Success
            setShowModal={setSuccess}
            heading="You're subscribed!"
            desc="Thanks for joining our community! Keep an eye on your inbox for the latest news and updates"
          />
        </Dialog>
      </div>
    </>
  );
}
