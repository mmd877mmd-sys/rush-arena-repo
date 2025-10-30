// app/profile/page.jsx or components/ProfilePage.jsx
export default function ProfilePage() {
  return (
    <div className="min-h-screen my-18 bg-[#0A0127] flex flex-col items-center text-white px-4 py-6">
      {/* Header */}
      <div className="w-full max-w-md flex items-center mb-4">
        <button className="text-white text-2xl mr-2">{"←"}</button>
        <h1 className="text-xl font-semibold">My Profile</h1>
      </div>

      {/* Profile Card */}
      <div className="w-full max-w-md bg-white/10 rounded-2xl p-6 mb-4">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-3">
            {/* Profile Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="#3B82F6"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A8 8 0 1118.88 17.8M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold">Yanur</h2>
          <p className="text-gray-300 text-sm break-all">
            mdyanur01990681247@gmail.com
          </p>
        </div>
      </div>

      {/* Basic Details */}
      <div className="w-full max-w-md bg-white/10 rounded-2xl p-6 mb-4">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-5 h-5 mr-2 text-gray-300"
            viewBox="0 0 16 16"
          >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 100-6 3 3 0 000 6z" />
          </svg>
          Basic Details
        </h3>

        {/* Username */}
        <div className="mb-3">
          <p className="text-gray-400 text-sm">Username</p>
          <div className="flex items-center mt-1">
            <div className="bg-gray-300/10 p-2 rounded-full mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4 text-gray-300"
                viewBox="0 0 24 24"
              >
                <path d="M13 16h-1v-4h-1m1-4h.01M12 20h.01M19 12h.01M5 12h.01M12 4h.01" />
              </svg>
            </div>
            <p className="text-white text-sm">Yanur</p>
          </div>
        </div>

        {/* Email */}
        <div className="mb-3">
          <p className="text-gray-400 text-sm">Email</p>
          <div className="flex items-center mt-1">
            <div className="bg-gray-300/10 p-2 rounded-full mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4 text-gray-300"
                viewBox="0 0 24 24"
              >
                <path d="M4 4h16v16H4z" />
                <path d="M22,6l-10,7L2,6" />
              </svg>
            </div>
            <p className="text-white text-sm break-all">mdyanur01990681247@</p>
          </div>
        </div>

        {/* Mobile Number */}
        <div>
          <p className="text-gray-400 text-sm">Mobile Number</p>
          <div className="flex items-center mt-1">
            <div className="bg-gray-300/10 p-2 rounded-full mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4 text-gray-300"
                viewBox="0 0 24 24"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013 5.18 2 2 0 015 3h3a2 2 0 012 1.72c.12.81.3 1.61.57 2.39a2 2 0 01-.45 2.11L9.91 10.09a16.06 16.06 0 006 6l1.87-1.18a2 2 0 012.11-.45c.78.27 1.58.45 2.39.57A2 2 0 0122 16.92z" />
              </svg>
            </div>
            <p className="text-white text-sm">1939972558</p>
          </div>
        </div>
      </div>

      {/* Password Change */}
      <div className="w-full max-w-md bg-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            className="w-5 h-5 mr-2 text-gray-300"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M12 11c0-1.1.9-2 2-2h8v10H2V9h10z" />
          </svg>
          Password Change
        </h3>

        {["Current Password", "New Password", "Confirm Password"].map(
          (label, index) => (
            <div className="mb-3" key={index}>
              <p className="text-gray-400 text-sm mb-1">{label}</p>
              <div className="flex items-center bg-gray-900 rounded-lg px-3 py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4 mr-2 text-gray-400"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17a2 2 0 100-4 2 2 0 000 4z" />
                  <path d="M6 21h12V10H6z" />
                  <path d="M9 10V7a3 3 0 016 0v3" />
                </svg>
                <input
                  type="password"
                  placeholder={label}
                  className="bg-transparent outline-none flex-1 text-white text-sm"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4 text-gray-400 cursor-pointer"
                  viewBox="0 0 24 24"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
            </div>
          )
        )}

        <button className="w-full bg-gray-900 hover:bg-gray-800 mt-4 text-white font-semibold py-2 rounded-lg">
          Change Password
        </button>
      </div>
    </div>
  );
}
