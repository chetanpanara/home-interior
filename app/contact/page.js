"use client";
import { motion } from "framer-motion";
import { PhoneCall, Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 mt-20 bg-white">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-gray-500 mb-4">Send us email</p>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Enter Name"
                className="bg-gray-100 p-4 rounded-md w-full outline-none"
              />
              <input
                type="email"
                placeholder="Enter Email"
                className="bg-gray-100 p-4 rounded-md w-full outline-none"
              />
              <input
                type="text"
                placeholder="Enter Subject"
                className="bg-gray-100 p-4 rounded-md w-full outline-none"
              />
              <input
                type="tel"
                placeholder="Enter Phone"
                className="bg-gray-100 p-4 rounded-md w-full outline-none"
              />
            </div>
            <textarea
              rows={5}
              placeholder="Enter Message"
              className="bg-gray-100 p-4 rounded-md w-full outline-none"
            ></textarea>
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-900 transition"
              >
                SEND MESSAGE
              </button>
              <button
                type="reset"
                className="bg-black text-white px-5 py-3 rounded-md font-semibold hover:bg-gray-900 transition"
              >
                RESET
              </button>
            </div>
          </form>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-gray-500 mb-2">Need any help?</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get in <span className="text-orange-300">touch with us</span>
          </h2>
          <p className="text-gray-500 mb-8 text-sm">
            Have a project in mind or need expert interior design advice? We’re
            here to help you create the space you’ve always dreamed of. Contact
            us today!
          </p>

          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="bg-[#bc9e69] text-white rounded-full p-4">
                <PhoneCall />
              </div>
              <div>
                <p className="font-semibold">Have any question?</p>
                <p className="text-gray-700">Free +92 (020)-9850</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-[#bc9e69] text-white rounded-full p-4">
                <Mail />
              </div>
              <div>
                <p className="font-semibold">Write email</p>
                <p className="text-gray-700">info@yourinteriors.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-[#bc9e69] text-white rounded-full p-4">
                <MapPin />
              </div>
              <div>
                <p className="font-semibold">Visit anytime</p>
                <p className="text-gray-700">your location information</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
