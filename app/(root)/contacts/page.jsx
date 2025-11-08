"use client";

import useRemoteConfig from "@/hooks/useRemoteConfig";

export default function ContactPage() {
  const { config, configLoading } = useRemoteConfig();

  useEffect(() => {
    async function fetchLinks() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_WEB_URL}/config.json`
        );
        setallLink(res.data.links);
      } catch (err) {
        console.error("Error fetching links:", err);
      }
    }

    fetchLinks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 flex p-4 justify-center">
      <div className="bg-gray-900 text-white rounded-2xl shadow-lg w-full max-w-md overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-700 text-center">
          <h2 className="text-lg font-bold">CONTACT SUPPORT</h2>
          <p className="text-sm text-gray-400">We’re here to help you 24/7</p>
        </div>

        {/* Contact Options */}
        <div className="p-6 flex-1 space-y-6">
          {/* Telegram */}
          <div className="bg-gray-800 border border-gray-700 p-4 rounded-xl hover:bg-gray-700 transition-all duration-200 flex flex-col">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-500/20 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-blue-400 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M9.999 15.208 9.889 19c.389 0 .558-.167.76-.367l1.82-1.737 3.779 2.773c.693.383 1.187.182 1.36-.641l2.462-11.574c.252-1.143-.414-1.59-1.086-1.31L3.912 9.541C2.799 9.991 2.806 10.633 3.71 10.91l4.576 1.427 8.653-5.456c.408-.25.78-.112.474.138l-6.414 8.19z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-blue-400">Telegram Support</p>
                <p className="text-sm text-gray-300">
                  Chat with us directly on Telegram
                </p>
              </div>
            </div>
            <a
              href={config.pages.telegramlink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-center px-4 py-2 rounded-lg text-sm font-medium w-full"
            >
              Message on Telegram
            </a>
          </div>

          {/* Facebook Page */}
          <div className="bg-gray-800 border border-gray-700 p-4 rounded-xl hover:bg-gray-700 transition-all duration-200 flex flex-col">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-600/20 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-blue-500 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12.07C22 6.52 17.52 2 12 2S2 6.52 2 12.07c0 5 3.66 9.13 8.44 9.93v-7.02H8.1v-2.91h2.34V9.85c0-2.31 1.38-3.59 3.48-3.59.99 0 2.02.18 2.02.18v2.22h-1.14c-1.13 0-1.48.7-1.48 1.42v1.7h2.52l-.4 2.91h-2.12V22c4.78-.8 8.44-4.93 8.44-9.93z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-blue-500">Facebook Page</p>
                <p className="text-sm text-gray-300">
                  Visit our official Facebook page
                </p>
              </div>
            </div>
            <a
              href={config.pages.facebooklink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-center px-4 py-2 rounded-lg text-sm font-medium w-full"
            >
              Visit Page
            </a>
          </div>

          {/* ✅ YouTube Channel (official look & balanced height) */}
          <div className="bg-gray-800 border border-gray-700 p-4 rounded-xl hover:bg-gray-700 transition-all duration-200 flex flex-col">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-red-600/20 p-4 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  className="w-9 h-9"
                >
                  <path
                    fill="#FF0000"
                    d="M549.7 124.1c-6.3-23.7-24.9-42.3-48.6-48.6C458.1 64 288 64 288 64S117.9 64 74.9 75.5c-23.7 6.3-42.3 24.9-48.6 48.6C15.7 167.1 15.7 256 15.7 256s0 88.9 10.6 131.9c6.3 23.7 24.9 42.3 48.6 48.6C117.9 448 288 448 288 448s170.1 0 213.1-11.5c23.7-6.3 42.3-24.9 48.6-48.6 10.6-43 10.6-131.9 10.6-131.9s0-88.9-10.6-131.9zM232 334V178l142 78-142 78z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-red-500 text-base">
                  YouTube Channel
                </p>
                <p className="text-sm text-gray-300">
                  Watch tutorials and updates on YouTube
                </p>
              </div>
            </div>
            <a
              href={config.pages.youtubelink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-center px-4 py-2 rounded-lg text-sm font-medium w-full"
            >
              Visit Channel
            </a>
          </div>

          {/* WhatsApp */}
          <div className="bg-gray-800 border border-gray-700 p-4 rounded-xl hover:bg-gray-700 transition-all duration-200 flex flex-col">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-green-500/20 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-green-400 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.04 2C6.55 2 2 6.55 2 12.04c0 2.12.63 4.09 1.81 5.77L2 22l4.34-1.78c1.6.88 3.41 1.34 5.27 1.34 5.49 0 10.04-4.55 10.04-10.04C21.65 6.55 17.12 2 12.04 2zm0 18.33c-1.61 0-3.17-.44-4.53-1.27l-.32-.19-2.58 1.06.99-2.66-.21-.33c-1.07-1.58-1.64-3.42-1.64-5.34 0-5.04 4.1-9.14 9.14-9.14 5.03 0 9.14 4.1 9.14 9.14s-4.1 9.13-9.13 9.13zm5.03-6.89c-.27-.14-1.58-.78-1.83-.87-.25-.09-.43-.14-.62.14-.18.27-.71.87-.87 1.05-.16.18-.32.2-.59.07-.27-.14-1.15-.43-2.2-1.38-.81-.72-1.35-1.6-1.51-1.87-.16-.27-.02-.41.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.62-1.49-.85-2.03-.22-.53-.45-.46-.62-.47-.16 0-.34-.02-.52-.02s-.48.07-.73.34c-.25.27-.95.93-.95 2.27 0 1.33.97 2.62 1.1 2.8.14.18 1.91 2.92 4.63 4.1.65.28 1.15.45 1.55.58.65.21 1.25.18 1.72.11.52-.08 1.58-.64 1.81-1.26.22-.62.22-1.15.16-1.26-.07-.11-.25-.18-.52-.32z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-green-400">WhatsApp Support</p>
                <p className="text-sm text-gray-300">
                  Get instant replies on WhatsApp
                </p>
              </div>
            </div>
            <a
              href={config.pages.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-center px-4 py-2 rounded-lg text-sm font-medium w-full"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
