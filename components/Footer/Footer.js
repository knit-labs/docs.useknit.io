"use client";
import { useState , useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { HashLoader } from "react-spinners";
import { Dialog } from "@material-tailwind/react";
import Success from "../success";

export default function Footer() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);

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

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await fetch("/api/send-email/");
  //       const result = await response.json();
  //       // setData(result);
  //     } catch (error) {
  //       console.error("Error fetching API:", error);
  //     } finally {
  //       // setLoading(false);
  //     }
  //   }

  //   fetchData();
  // }, []);

  return (
    <>
      <div className="bg-[#050313] px-4 sm:px-8 lg:px-16 py-4">
        <div className="max-w-[75rem] mx-auto py-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 items-start justify-stretch">
            {/* <div>
              <h3 className="text-white mb-4 font-medium text-[.9rem]">
                Company
              </h3>
              <div className="space-y-3 text-[rgba(255,255,255,0.6)]">
                <Link className=" block font-medium text-sm" href="">
                  About
                </Link>
                <Link className="block font-medium text-sm" href="">
                  Leadership
                </Link>
               
              </div>
            </div> */}

            <div>
              <h3 className="text-white mb-4 font-medium text-[.9rem]">
                Products
              </h3>
              <div className="space-y-3 text-[rgba(255,255,255,0.6)]">
                {/* <Link className=" block font-medium text-sm" href="">
                Overview
              </Link>
              <Link className="block font-medium text-sm" href="">
                Features{" "}
              </Link>
              <Link className="block font-medium text-sm" href="">
                Pricing
              </Link> */}
                <Link
                  className="block font-medium text-sm"
                  target="_blank"
                  href="https://docs.useknit.io"
                >
                  Documentation
                </Link>
                <Link className="block font-medium text-sm" href="">
                  Status
                </Link>
              </div>
            </div>

            {/* <div>
              <h3 className="text-white mb-4 font-medium text-[.9rem]">
                Support
              </h3>
              <div className="space-y-3 text-[rgba(255,255,255,0.6)]">
                 <Link
                className=" block font-medium text-sm"
                href={
                  "https://www.notion.so/For-Merchants-79e257e8959b4c8eb757ead6b7d3ebf3?pvs=4"
                }
              >
                FAQ
              </Link>
                <Link className="block font-medium text-sm" href="">
                  Contact
                </Link>
                <Link className="block font-medium text-sm" href="">
                  Status
                </Link>
              </div>
            </div> */}

            <div>
              <h3 className="text-white mb-4 font-medium text-[.9rem]">
                Socials
              </h3>
              <div className="space-y-3 text-[rgba(255,255,255,0.6)]">
                {/* <Link className=" block font-medium text-sm" href="">
                Instagram
              </Link> */}
                <Link className="block font-medium text-sm" href="">
                  Twitter{" "}
                </Link>
                <Link
                  className="block font-medium text-sm"
                  target="_blank"
                  href="https://www.linkedin.com/company/knit-labs/"
                >
                  Linkedin
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-white mb-4 font-medium text-[.9rem]">
                Legal
              </h3>
              <div className="space-y-3 text-[rgba(255,255,255,0.6)]">
                <Link className=" block font-medium text-sm" href="">
                  Legal Notice
                </Link>
                <Link
                  // target="_blank"
                  className="block font-medium text-sm"
                  href="/privacy-policy"
                  // href="https://www.notion.so/Privacy-Security-a8fd95813e0043278b820ad28e33e202?pvs=4"
                >
                  Privacy Policy
                </Link>
                <Link
                  // target="_blank"
                  className="block font-medium text-sm"
                  href="/terms-and-conditions"
                  // href="https://www.notion.so/Terms-Conditions-0b867bfd0ec243398dde03e79c50f4a7?pvs=4"
                >
                  Terms of Use
                </Link>
              </div>
            </div>

            <div className="">
              <h3 className="text-white mb-4 font-medium text-[.9rem]">
                Contact
              </h3>
              <div className="space-y-3 text-[rgba(255,255,255,0.6)]">
                <p className="block font-medium text-sm">business@useknit.io</p>

                {/* <p className="block font-medium text-sm">
                  <b>Knit Business Technologies Ltd.</b>
                  <br />
                  27 Old Gloucester Street, <br />
                  London, United Kingdom, WC1N 3AX
                </p> */}
                <p className="block font-medium text-sm">
                  <b>Knit Business Financial Services Ltd.</b>
                  <br />
                  3080 Yonge St <br />
                  Toronto ON, M4N 3N1, Canada
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 border-y border-[rgba(255,255,255,0.24)] py-6 block md:flex justify-between items-center">
            <div>
              <h3 className="text-xs text-white uppercase">
                Subscribe to our newsletter
              </h3>
              <p className="text-[rgba(255,255,255,0.6)] text-sm">
                A monthly digest of the latest news, articles, and resources.
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="mt-12 md:mt-0 grid md:flex items-center md:items-start gap-2"
            >
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="enter your email address"
                  className="px-4 placeholder:text-[rgba(255,255,255,0.23)] text-white w-full md:w-[20rem] rounded-xl outline-none h-12 border border-[rgba(255,255,255,0.2)] bg-transparent"
                />
                {status && (
                  <p className="text-xs text-[#DC2626] font-[500]">{status}</p>
                )}
              </div>

              <button
                type="submit"
                className="flex items-center justify-center transition-all sm:hover:scale-90 w-full md:w-fit mx-auto font-[500] !bg-[#4C38CB] text-sm text-white border border-[#4C38CB] h-12 px-7 rounded-xl shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
              >
                {isLoading ? (
                  <HashLoader
                    color={"#fff"}
                    loading={true}
                    size={25}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  "Subscribe"
                )}
              </button>
            </form>
          </div>

          <div className="mt-4 flex flex-col md:flex-row justify-center md:justify-between items-center">
            <div className="h-8 w-14 lg:w-16 object-contain relative">
              <Image
                src="/knit-white.svg"
                alt="knit logo"
                layout="fill"
                objectFit="contain"
                objectPosition="center"
              />
            </div>

            <p className="text-[rgba(255,255,255,0.6)] max-w-[30rem] text-center sm:text-left text-xs">
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
            heading="Your subscribed!"
            desc="Thanks for joining our community! Keep an eye on your inbox for the latest news and updates"
          />
        </Dialog>
      </div>
    </>
  );
}
