import { Button } from "@app/ui";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function StoreProfilePicker() {
  const [selectedProfile, setSelectedProfile] = useState<string>('');
  const profiles = [
    { id: '1', name: "Perfil 1" },
    { id: '2', name: "Perfil 2" },
    { id: '3', name: "Perfil 3" },
  ];

  const handleProfileSelect = (id: string) => {
    setSelectedProfile(id);
  };

  return (
    <>
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <h1 className="text-5xl text-white font-bold mb-6">Escolha um Perfil</h1>
        <div className="py-20 flex space-x-6">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              onClick={() => handleProfileSelect(profile.id)}
              className={`flex flex-col items-center cursor-pointer p-4 rounded-lg hover:bg-white-dark hover:text-white shadow-md transition ${selectedProfile === profile.id
                ? "bg-white-dark text-white"
                : "bg-white text-gray-700"
                } hover:shadow-lg`}
            >
              <div
                className={`w-[10rem] h-[10rem] flex hover:bg-gray-200 hover:border-white items-center justify-center rounded-full border-2 ${selectedProfile === profile.id
                  ? "bg-gray-200 border-white"
                  : "border-gray-300"
                  }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-12 h-12 text-black"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 21v-2a4 4 0 00-8 0v2m8 0H8m8 0a4 4 0 00-8 0m4-10a4 4 0 100-8 4 4 0 000 8z"
                  />
                </svg>
              </div>
              <p className={`mt-4 font-extrabold text-lg ${selectedProfile === profile.id
                ? "text-gray-700"
                : "border-gray-300"
                }`}>{profile.name}</p>
            </div>
          ))}
        </div>
        <Link to="/dashboard">
          <Button disabled={selectedProfile === ''} className="text-lg btn-primary">Continuar</Button>
        </Link>
      </div>
    </>
  );
}
